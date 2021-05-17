import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Text,
} from "react-native";
// import { Text, Card } from "galio-framework";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { Title, Caption } from "react-native-paper";
import { Modal, Portal, Provider, Button } from "react-native-paper";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import { SafeAreaView } from "react-native";
import { useFriends, useUser, useInvites } from "lib";
import { TitleText } from "../../../components";

const ProfileButton = ({ children, ...rest }) => (
  <TouchableOpacity
    style={{
      borderRadius: 14,
      borderWidth: 1.5,
      alignSelf: "stretch",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      marginVertical: 7,
    }}
    {...rest}
  >
    <Text
      style={{
        fontSize: 18,
        textTransform: "capitalize",
        fontFamily: "Kollektif",
      }}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

const ProfileDisplay = ({ navigation }) => {
  const { user } = useUser();
  const { friends } = useFriends();
  const { invites } = useInvites();

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
        // console.log(image);
        // setImage(image.path);
        uploadPfp(image.path);

        hideModal();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        // console.log(image);
        // setImage(image.path);
        uploadPfp(image.path);
        hideModal();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const uploadPfp = async (imagepath) => {
    let filename = user.uidvalue;
    try {
      await storage().ref(filename).putFile(imagepath);
      const storageRef = firebase.storage().ref(user.uidvalue);
      storageRef.getDownloadURL().then((url) => {
        firestore().collection("Users").doc(user.uidvalue).update({
          imageUrl: url,
        });
      });
    } catch (e) {
      console.error(e);
    }
  };
  const height = Dimensions.get("screen").height;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} barStyle="dark-content" />
      <View paddingHorizontal={20}>
        <TitleText>@{user?.handle}</TitleText>
      </View>
      <View backgroundColor="" marginTop={15}>
        <View alignItems="center">
          <TouchableOpacity onPress={showModal}>
            <Image
              source={{ uri: user?.imageUrl }}
              style={{
                width: 150,
                height: 150,
                backgroundColor: "yellow",
                borderRadius: 500,
                resizeMode: "cover",
              }}
            />
          </TouchableOpacity>
          <View>
            <Text
              h5
              style={{
                color: "black",
                textAlign: "center",
                fontFamily: "Kollektif",
                // marginVertical: 20,
                marginTop: 20,
                fontSize: 30,
                fontWeight: "normal",
              }}
            >
              {`${user?.firstName} ${user?.lastName}`}
            </Text>
          </View>
        </View>
        <View
          marginTop={0}
          flexDirection="row"
          justifyContent="space-around"
          marginTop={20}
          marginBottom={15}
          // justifyContent="center"
          // backgroundColor="blue"
          // alignItems="space-around"
        >
          <View alignItems="center">
            <Title
              style={{
                fontWeight: "bold",
                color: "black",
                fontFamily: "Kollektif",
                fontSize: height < 700 ? 25 : 30,
                fontWeight: "normal",
              }}
            >
              {friends?.length}
            </Title>
            <Caption
              style={{
                color: "black",
                fontSize: 20,
                fontFamily: "Kollektif",
              }}
            >
              Friends
            </Caption>
          </View>
          <View alignItems="center">
            <Title
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: height < 700 ? 25 : 30,
                fontWeight: "normal",
                fontFamily: "Kollektif",
              }}
            >
              {invites?.filter(({ status }) => status == "completed").length}
            </Title>
            <Caption
              style={{
                color: "black",
                fontSize: 20,
                fontFamily: "Kollektif",
              }}
            >
              Parties
            </Caption>
          </View>
        </View>
        <View
          // style={styles.containercolumn}
          // marginTop={10}
          paddingHorizontal={40}
          justifyContent="space-around"
          // backgroundColor="red"
        >
          <ProfileButton onPress={() => navigation.navigate("Add Friends")}>
            Add Friends
          </ProfileButton>
          <ProfileButton onPress={() => navigation.navigate("profile/edit")}>
            Edit Profile
          </ProfileButton>
          <ProfileButton
            onPress={() => navigation.navigate("profile/settings")}
          >
            Settings
          </ProfileButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileContainer: {
    // flex: 0.5,
    flexDirection: "column",
    // justifyContent: "space-around",
    alignItems: "center",
    // marginTop: "10%",
  },
  text: {
    // marginBottom: "5%",
    fontFamily: "Kollektif",
    marginLeft: "5%",
    color: "black",
    fontWeight: "bold",
  },
  text1: {
    color: "#f76f6d",
    fontWeight: "bold",
    marginLeft: 20,
  },
  pfp: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderLeftColor: "black",
  },
  positioning: {
    alignContent: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  containercolumn: {
    // flex: 0.25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // backgroundColor: 'purple'
    // marginTop: "25%",
  },
  infoSect: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  infoBoxWrapper: {
    // marginTop: "35%",
    // backgroundColor: 'red',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: -5,
    // backgroundColor: "blue"
  },
  infoBox: {
    width: "37.5%",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: "5%",
    // marginTop: "23%",
    // backgroundColor:"green"
  },
  buttonBox: {
    width: "37.5%",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: "5%",
    // marginTop: "23%",
    // backgroundColor:"purple"
  },

  button: {
    marginBottom: 20,
    // height: "200%",
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 15,
    width: "80%",
  },
  modalStyling: {
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    color: "black",
    justifyContent: "center",
    marginLeft: "5%",
    fontSize: 43,
    fontFamily: "Kollektif",
    marginTop: 30,
    // marginTop: "15%",
  },
  column: {
    marginTop: -5,
  },
});
