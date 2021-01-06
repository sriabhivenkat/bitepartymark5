import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {Text, Button, Card} from 'galio-framework';
import firestore, { firebase } from "@react-native-firebase/firestore";
import { AuthContext } from "../navigation/AuthProvider.js";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Title, Caption} from 'react-native-paper';
import {Modal, Portal, Provider} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import ModernHeader from 'react-native-modern-header';

const ProfileViewController = ({navigation}) => {
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
    const B = (props) => <Text style={{fontWeight: "bold"}}>{props.children}</Text>
    useEffect(() => {
      const main = async () => {
        const refVal = firestore().collection("Users").doc(user.uid);
        const doc = await refVal.get();
        const {firstName} = doc.data();
        const {lastName} = doc.data();
        const {handle} = doc.data();
        
        refVal.collection("friends").get()
            .then(function(querySnapshot) {
                setFriendsSize(querySnapshot.docs.length);
            })
        
        refVal.collection("pastParties").get()
            .then(function(querySnapshot1) {
                setPartyNumber(querySnapshot1.docs.length);
            })
        setUserFirst(firstName)
        setUserLast(lastName);
        setUserHandle(handle);
        
        
      };
      main();
    }, []);


    const selectFromPhone = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            console.log(image);
            setImage(image.path);
            uploadPfp(image.path);
            
            hideModal();
        }).catch(e => {
            console.log(e);
        });
    }

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            console.log(image);
            setImage(image.path);
            uploadPfp(image.path);
            hideModal();
        }).catch(e => {
            console.log(e);
        });
    }
    
    const uploadPfp = async(imagepath) => {
        const uploadUri = imagepath;
        let filename = user.uid;
        console.log(uploadUri);
        //console.log(filename);
        setUploading(true);
        try {
            await storage().ref(filename).putFile(uploadUri);
            setUploading(false);
            Alert.alert('Image uploaded.')
        } catch(e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
        const storageRef = firebase.storage().ref(user.uid);
        storageRef.
            getDownloadURL()
            .then((url) => {
                setProfileImageUrl(url);
                firestore()
                    .collection("Users")
                    .doc(user.uid)
                    .update({
                        imageUrl: url
                    })
            })
            .catch((e) => console.log(e))
    }, [user]);
    return(
        <View style={styles.container}>
            <Text h2 style={styles.text}>@{userHandle}</Text>
            <View style={styles.container2}>
                <TouchableOpacity onPress={showModal}>
                    <Image source={{uri: profileImageUrl}} style={{width: 100, height: 100, backgroundColor: "yellow", borderRadius: 50, resizeMode: "cover"}} />
                </TouchableOpacity>
            </View>
            <View style={styles.column}>
                    <Text h5 style={{color:"#777777", textAlign:"center", marginLeft:20, color: "#f76f6d", fontWeight: "bold", padding: 20,}}>{userFirst} {userLast}</Text>
            </View>
            
            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: "#f76f6d",
                    borderRightWidth: 2
                }]}>
                    <Title style={{fontWeight: "bold", color: "#f76f6d" }}>{friendssize}</Title>
                    <Caption style={{color: "#f76f6d", fontWeight: "bold"}}>Friends</Caption>
                </View>
                <View style={styles.infoBox}>
                <Title style={{fontWeight: "bold", color: "#f76f6d" }}>{partynumber}</Title>
                    <Caption style={{color: "#f76f6d", fontWeight: "bold"}}>Parties</Caption>
                </View>
            </View>
            <View style={styles.containercolumn}>
                <Button color="#f76f6d" icon="person-add" iconSize={15} iconFamily="ionicons" round uppercase size="large" onPress={()=>navigation.navigate("Add Friends")}> Add friends here</Button>
                <Button color="#f76f6d" icon="logout" iconSize={15} iconFamily="ionicons" round uppercase size="large" onPress={()=>logout()}> Logout</Button>
            </View>

            <Provider>
                <Portal>
                    <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalStyling}>
                        <Text h5 style={{textAlign: "center", fontWeight: "bold"}}>Choose Profile Image</Text>
                        <Text p style={{textAlign: 'center', fontSize: 15}}>So that your friends recognize you.</Text>
                        <Button 
                            color="#f76f6d" 
                            uppercase size="large" 
                            onPress={() => selectFromPhone()}>
                            Select from phone
                        </Button>
                        <Button color="#f76f6d" uppercase size="large" onPress={()=>openCamera()}>Take a picture</Button>
                    </Modal>
                </Portal>
            </Provider>
        </View>
    );
}

export default ProfileViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16335e"
    },
    container2: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },  
    text: {
        marginBottom: "5%",
        marginLeft: "5%",
        color: "#ff9685",
    },
    text1: {
        color: "#f76f6d",
        fontWeight: "bold",
        marginLeft: 20
    },
    pfp: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        borderLeftColor: "black",
    },
    positioning: {
        alignContent: 'center',
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    containercolumn: {
        flex: 0.25,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    infoSect: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    infoBoxWrapper: {
        borderBottomColor: "#f76f6d",
        borderBottomWidth: 2,
        borderTopColor: '#f76f6d',
        borderTopWidth: 2,
        flexDirection: "row",
        marginBottom: 20,
        height:100,
    },
    infoBox: {
        width: '50%',
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        marginBottom:10
    },
    modalStyling: {
        backgroundColor: "white",
        padding: 20,
        
    },
});