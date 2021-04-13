import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { Text, Card } from "galio-framework";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { Title, Caption } from "react-native-paper";
import { Modal, Portal, Provider, Button } from "react-native-paper";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import { SafeAreaView } from "react-native";
import { useFriends, useUser, useInvites } from "lib";

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
          imageUrl: url,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} />

      <Text h2 style={styles.title}>
        My Profile
      </Text>
      <View
        style={{
          justifyContent: "space-between",
          flexGrow: 1,
          paddingTop: 35,
          paddingBottom: 50,
        }}
      >
        <View>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={showModal}>
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
                  marginVertical: 20,
                  fontSize: 26,
                  fontWeight: "normal",
                }}
              >
                @{user?.handle}
              </Text>
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox]}>
              <Title
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 22,
                  fontWeight: "normal",
                }}
              >
                {friends?.length}
              </Title>
              <Caption style={{ color: "black", fontSize: 20 }}>
                Friends
              </Caption>
            </View>
            <View style={styles.infoBox}>
              <Title
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 22,
                  fontWeight: "normal",
                }}
              >
                {invites?.filter(({ status }) => status == "accepted").length}
              </Title>
              <Caption style={{ color: "black", fontSize: 20 }}>
                Parties
              </Caption>
            </View>
          </View>
        </View>
        <View style={styles.containercolumn}>
          <Button
            mode="outlined"
            style={styles.button}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Add Friends")}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "PingFangHK-Medium",
                fontSize: 17,
              }}
            >
              Add Friends
            </Text>
          </Button>

          <Button mode="outlined" style={styles.button} activeOpacity={0.9}>
            <Text
              style={{
                color: "black",
                fontFamily: "PingFangHK-Medium",
                fontSize: 17,
              }}
            >
              Edit Profile
            </Text>
          </Button>

          <Button
            mode="outlined"
            style={styles.button}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("profile/settings")}
          >
            <Text
              style={{
                color: "black",
                fontFamily: "PingFangHK-Medium",
                fontSize: 17,
              }}
            >
              Settings
            </Text>
          </Button>
        </View>
      </View>

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

export default ProfileDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileContainer: {
    // flex: 0.5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: "10%",
  },
  text: {
    marginBottom: "5%",
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
    marginTop: -5,
    // backgroundColor: "blue"
  },
  infoBox: {
    width: "37.5%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    // marginTop: "23%",
    // backgroundColor:"green"
  },
  buttonBox: {
    width: "37.5%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
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
    fontFamily: "PingFangHK-Medium",
    marginTop: 30,
    // marginTop: "15%",
  },
  column: {
    marginTop: -5,
  },
});
