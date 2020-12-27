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

const ProfileViewController = ({navigation}) => {
    const { user, logout } = useContext(AuthContext);
    const [userFirst, setUserFirst] = useState("");
    const [userLast, setUserLast] = useState("");
    const [userHandle, setUserHandle] = useState("");
    const [friendsHandle, setFriendsHandle] = useState("");
    const [partiesHandle, setPartiesHandle] = useState("");

    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);


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
        const {friends} = doc.data();
        const {pastParties} = doc.data();
        setUserFirst(firstName)
        setUserLast(lastName);
        setUserHandle(handle);
        setFriendsHandle(friends);
        setPartiesHandle(pastParties);
        
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
            //uploadPfp();
            hideModal();
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
            hideModal(); 
        });
    }
    
    /*const uploadPfp = async() => {
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/')+1);

        setUploading(true);
        try {
            await storage().ref(filename).putFile(uploadUri);
            setUploading(false);
            Alert.alert('Image uploaded.')
        } catch(e) {
            console.log(e);
        }
        setImage(uploadUri);
    }*/

    return(
        <View style={styles.container}>
            <Text h3 size={45} style={styles.text}>
                <B>{userFirst}'s</B> Profile
            </Text>
            <View style={styles.container2}>
                <TouchableOpacity onPress={showModal}>
                    <Image source={{uri: image}} style={{width: 100, height: 100, backgroundColor: "yellow", borderRadius: 50, resizeMode: "cover"}} />
                </TouchableOpacity>
                <Text h5 style={styles.text1}>@{userHandle}</Text>
            </View>
            <View style={styles.column}>
                    <Text h5 style={{color:"#777777", textAlign:"center", marginLeft:20, color: "#f76f6d", fontWeight: "bold", padding: 20}}>{userFirst} {userLast}</Text>
            </View>
            
            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: "#dddddd",
                    borderRightWidth: 2

                }]}>
                    <Title style={{fontWeight: "bold", color: "#f76f6d" }}>{friendsHandle.length}</Title>
                    <Caption style={{color: "#f76f6d", fontWeight: "bold"}}>Friends</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title style={{fontWeight: "bold", color: "#f76f6d" }}>{partiesHandle.length}</Title>
                    <Caption style={{color: "#f76f6d", fontWeight: "bold"}}>Parties</Caption>
                </View>
            </View>
            <View style={styles.containercolumn}>
                <Button color="#f76f6d" icon="person-add" iconSize={15} iconFamily="ionicons" round uppercase size="large" onPress={()=>{}}> Add friends here</Button>
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
                            onPress={() => selectFromPhone()}
                        >
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
        padding: 20,
        color: "#f76f6d",
        
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
        borderBottomColor: "#dddddd",
        borderBottomWidth: 2,
        borderTopColor: '#dddddd',
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