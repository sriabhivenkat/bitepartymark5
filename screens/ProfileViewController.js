import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions
} from "react-native";
import { Text, Card } from "galio-framework";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { AuthContext } from "../navigation/AuthProvider.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Title, Caption } from "react-native-paper";
import { Modal, Portal, Provider, Button } from "react-native-paper";
import { Icon } from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native";

const ProfileViewController = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [userFirst, setUserFirst] = useState("");
  const [userLast, setUserLast] = useState("");
  const [userHandle, setUserHandle] = useState("");

  const [friendssize, setFriendsSize] = useState(0);
  const [partynumber, setPartyNumber] = useState(0);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const B = (props) => (
    <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  );
  useEffect(() => {
    const main = async () => {
      const refVal = firestore().collection("Users").doc(user.uid);
      const doc = await refVal.get();
      console.log(doc.data());
      const { firstName } = doc.data();
      const { lastName } = doc.data();
      const { handle } = doc.data();

      refVal
        .collection("friends")
        .get()
        .then(function (querySnapshot) {
          setFriendsSize(querySnapshot.docs.length);
        });

      refVal
        .collection("pastParties")
        .get()
        .then(function (querySnapshot1) {
          setPartyNumber(querySnapshot1.docs.length);
        });
      setUserFirst(firstName);
      setUserLast(lastName);
      setUserHandle(handle);

      // Code for new friends Listener: Look at onResult for more info
      firestore()
        .collection("Users")
        .doc(user.uid)
        .collection("friends")
        .onSnapshot(onResult, onError);

      firestore()
        .collection("Users")
        .doc(user.uid)
        .collection("pastParties")
        .onSnapshot(onResult2, onError);

      // Code for Image Listener: Look at onResult3 for more info
      firestore()
        .collection("Users")
        .doc(user.uid)
        .onSnapshot(onResult3, onError);
    };
    main();
  }, []);

  function onResult(QuerySnapshot) {
    const refVal = firestore().collection("Users").doc(user.uid);
    const doc = refVal.get();

    refVal
      .collection("friends")
      .get()
      .then(function (querySnapshot) {
        setFriendsSize(querySnapshot.docs.length);
      });
  }

  function onError(error) {
    console.error(error);
  }

  function onResult2(QuerySnapshot) {
    const refVal = firestore().collection("Users").doc(user.uid);
    const doc = refVal.get();
    refVal
      .collection("pastParties")
      .get()
      .then(function (querySnapshot) {
        setPartyNumber(querySnapshot.docs.length);
      });
  }

  function onResult3(QuerySnapshot) {
    const refVal = firestore().collection("Users").doc(user.uid);
    const doc = refVal.get();
    refVal.get().then(function (querySnapshot) {
      const refVal = firestore().collection("Users").doc(user.uid);
      const doc = refVal.get();
      console.log(doc.data());
      const { firstName } = doc.data();
      const { lastName } = doc.data();
      const { handle } = doc.data();
      const { imageURL } = doc.data();

      const storageRef = firebase.storage().ref(user.uid);
      storageRef
        .getDownloadURL()
        .then((url) => {
          setProfileImageUrl(url);
          firestore().collection("Users").doc(user.uid).update({
            imageUrl: url,
          });
        })
        .catch((e) => console.log(e));

      setUserFirst(firstName);
      setUserLast(lastName);
      setUserHandle(handle);
      setProfileImageUrl(imageURL);
      setImage(imageURL);
    });
  }

  const selectFromPhone = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        setImage(image.path);
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
        setImage(image.path);
        uploadPfp(image.path);
        hideModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const uploadPfp = async (imagepath) => {
    const uploadUri = imagepath;
    let filename = user.uid;
    console.log(uploadUri);
    //console.log(filename);
    setUploading(true);
    try {
      await storage().ref(filename).putFile(uploadUri);
      setUploading(false);
      // Alert.alert("Image uploaded.");
    } catch (e) {
      console.log(e);
    }

    const storageRef = firebase.storage().ref(user.uid);
    storageRef.getDownloadURL().then((url) => {
      setProfileImageUrl(url);
      firestore().collection("Users").doc(user.uid).update({
        imageUrl: url,
      });
    });
  };

  useEffect(() => {
    const storageRef = firebase.storage().ref(user.uid);
    storageRef
      .getDownloadURL()
      .then((url) => {
        setProfileImageUrl(url);
        firestore().collection("Users").doc(user.uid).update({
          imageUrl: url,
        });
      })
      .catch((e) => console.log(e));
  }, [user]);

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} />
      
      <Text h2 style={styles.title}>
        My Profile
      </Text>
      <View style={{justifyContent: 'space-between', flexGrow: 1, paddingTop: 35, paddingBottom: 50 }}>
      <View>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={showModal}>
          <Image
            source={{ uri: profileImageUrl }}
            style={{
              width: Dimensions.get('screen').width * .40,
              height: Dimensions.get('screen').width * .40,
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
            style={{ color: "black", textAlign: "center", marginVertical: 20, fontSize: 26, fontWeight: "normal" }}
          >
            @{userHandle}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,

          ]}
        >
          <Title style={{ fontWeight: "bold", color: "black", fontSize: 22, fontWeight: "normal" }}>
            {friendssize}
          </Title>
          <Caption style={{ color: "black", fontSize: 20 }}>Friends</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={{ fontWeight: "bold", color: "black", fontSize: 22, fontWeight: "normal" }}>
            {partynumber}
          </Title>
          <Caption style={{ color: "black", fontSize: 20 }}>Parties</Caption>
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

        <Button
          mode="outlined"
          style={styles.button}
          activeOpacity={0.9}
        >

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
          onPress={() => navigation.navigate("Settings")}

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


      { modalVisible && <Provider >
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
      </Provider>}
    </SafeAreaView>
  );
};

export default ProfileViewController;

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
    width: "80%"

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
    marginTop: -5
  }
});
