import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { AuthContext } from "navigation/AuthProvider";
import { Text } from "galio-framework";
import { Divider } from "react-native-elements";
import { Modal, Portal, Provider, Button } from "react-native-paper";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { TitleText } from "components";
import { SafeAreaView, TextInput, Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";
import firestore, { firebase } from "@react-native-firebase/firestore";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import { useUser } from "lib";
import { pick } from "lodash";
import { useMemo } from "react";
import { GradientButton } from "../../../components";
import { Alert } from "react-native";
import { ScrollView } from "react-native";

const SettingsButton = ({ children, right, style, textStyle, ...rest }) => (
  <TouchableOpacity {...rest} style={[styles.button, style]}>
    <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    {right}
  </TouchableOpacity>
);

const Input = ({
  style,
  label,
  containerStyle,
  control,
  name,
  at,
  ...rest
}) => (
  <View style={[{ marginVertical: 10 }, containerStyle]}>
    {label && (
      <Text style={{ fontFamily: "Kollektif", fontSize: 22, marginBottom: 10 }}>
        {label}
      </Text>
    )}
    {/* {at && (
      <Text
        style={[
          {
            backgroundColor: "red",
            fontSize: 20,
            fontFamily: "Kollektif",
            position: "relative",
            top: 32,
            left: 20,
          },
        ]}
      >
        @
      </Text>
    )} */}

    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholderTextColor="#00000090"
          onChangeText={(text) => onChange(text)}
          value={value}
          style={[
            {
              height: 45,
              fontSize: 20,
              borderWidth: 1,
              borderRadius: 15,
              paddingHorizontal: 20,
              //   paddingLeft: at ? 38 : 20,
              fontFamily: "Kollektif",
            },
            style,
          ]}
          {...rest}
        />
      )}
    />
  </View>
);
const EditProfile = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { user, updateUser } = useUser();
  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return pick(user, ["firstName", "lastName", "handle"]);
    }, [user]),
  });

  //   useEffect(() => {
  //     user.handle &&
  //       setValue([
  //         { firstName: "foo" },
  //         { lastName: "foo" },
  //         { handle: "foo" },
  //         { email: "foo" },
  //       ]);
  //   }, [user]);

  useEffect(() => {
    reset(user);
  }, [user]);

  const onSubmit = (data) => {
    updateUser(data);
    navigation.goBack();
  };
  const onErr = (data) => {
    Alert.alert("Invalid entry!", "Try again");
  };

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const selectFromPhone = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        // setImage(image.path);
        uploadPfp(image.path);

        hideModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        // setImage(image.path);
        uploadPfp(image.path);
        hideModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const uploadPfp = async (imagepath) => {
    let filename = user.uidvalue;
    try {
      await storage().ref(filename).putFile(imagepath);
      const storageRef = firebase.storage().ref(user.uidvalue);
      storageRef.getDownloadURL().then((url) => {
        firestore().collection("Users").doc(user.uidvalue).update({
          // My Profile
          imageUrl: url,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TitleText>Edit Profile</TitleText>
        <Divider style={styles.divider} />
        <View
          style={styles.profileContainer}
          justifyContent="center"
          alignItems="center"
          marginTop={20}
        >
          <TouchableOpacity
            onPress={showModal}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              source={{ uri: user?.imageUrl }}
              style={{
                width: Dimensions.get("screen").width * 0.4,
                height: Dimensions.get("screen").width * 0.4,
                backgroundColor: "yellow",
                borderRadius: 120,
                resizeMode: "cover",
                // marginRight: "2.5%",
                // marginTop: "50%",
              }}
            />
          </TouchableOpacity>
          <View style={styles.column}>
            <Text
              h5
              style={{
                color: "black",
                textAlign: "center",
                fontFamily: "Kollektif",
                marginVertical: 20,
                fontSize: 26,
                fontWeight: "normal",
              }}
            >
              @{user?.handle}
            </Text>
          </View>
        </View>
        <Input
          placeholder="Enter first name"
          label="First Name"
          name="firstName"
          control={control}
        />

        <Input
          placeholder="Enter Handle"
          label="Last Name"
          name="lastName"
          control={control}
        />
        <Input
          placeholder="Enter Handle"
          label="Username"
          name="handle"
          at
          control={control}
        />

        {/* <Input
          placeholder="Enter Handle"
          label="Email"
          name="email"
          control={control}
          editable={false}
        /> */}

        {/* <Divider style={styles.divider} /> */}
        {/* <SettingsButton
          onPress={() =>
            openLink("https://www.kas-tech.com/privacy").catch((err) =>
              console.error(err)
            )
          }
          style={{ marginLeft: "-2%" }}
        >
          Privacy
        </SettingsButton>
        <SettingsButton
          onPress={() => openLink("https://www.kas-tech.com/terms")}
          style={{ marginLeft: "-2%" }}
        >
          Terms of Service
        </SettingsButton> */}
        <Divider style={styles.divider} />

        <GradientButton
          containerStyle={{ marginTop: 10 }}
          innerStyle={{ paddingVertical: 12 }}
          onPress={handleSubmit(onSubmit, onErr)}
        >
          Save
        </GradientButton>
        {/* <SettingsButton
          style={{
            borderWidth: 1.5,
            borderRadius: 14,
            borderColor: "red",
            justifyContent: "center",
            marginTop: 20,
          }}
          textStyle={{ color: "red" }}
        >
          Save
        </SettingsButton> */}

        {/* <TouchableOpacity>
                <Text h5 style={{marginTop: "20%", fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text h5 style={{marginTop: "2.5%", fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => logout()}>
                <Text h5 style={{marginTop: "2.5%", fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Log Out</Text>
            </TouchableOpacity> */}
      </ScrollView>
      {modalVisible && (
        <Provider>
          <Portal>
            <Modal
              visible={modalVisible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modalStyling}
            >
              <Text h5 style={{ textAlign: "center", fontWeight: "bold" }}>
                Choose Profile Image
              </Text>
              <Text p style={{ textAlign: "center", fontSize: 15 }}>
                So that your friends recognize you.
              </Text>
              <Button
                color="#f76f6d"
                uppercase
                size="large"
                onPress={() => selectFromPhone()}
              >
                Select from phone
              </Button>
              <Button
                color="#f76f6d"
                uppercase
                size="large"
                onPress={() => openCamera()}
              >
                Take a picture
              </Button>
            </Modal>
          </Portal>
        </Provider>
      )}
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    // paddingVertical: 30,
  },
  button: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'red'
  },
  modalStyling: {
    backgroundColor: "white",
    padding: 20,
  },
  buttonText: {
    // marginTop: "2.5%",
    fontFamily: "Kollektif",
    textAlign: "left",
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "300",
    fontSize: 22,
    // backgroundColor: 'blue'
  },
  divider: {
    borderWidth: 0.3,
    marginVertical: "1.5%",
  },
});
