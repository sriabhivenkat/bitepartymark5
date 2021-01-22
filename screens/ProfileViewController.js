import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import {Text, Button, Card} from 'galio-framework';
import firestore, { firebase } from "@react-native-firebase/firestore";
import { AuthContext } from "../navigation/AuthProvider.js";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Title, Caption} from 'react-native-paper';
import {Modal, Portal, Provider} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import LinearGradient from "react-native-linear-gradient";

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
            <StatusBar translucent={true} />
            <View style={styles.container2}>
                <TouchableOpacity onPress={showModal}>
                    <Image source={{uri: profileImageUrl}} style={{width: 125, height: 125, backgroundColor: "yellow", borderRadius: 60, resizeMode: "cover", marginRight: "2.5%",}} />
                </TouchableOpacity>
                <View style={styles.column}>
                    <Text h5 style={{textAlign:"center", marginLeft:20, color: "black", fontWeight: "bold", marginTop: "-5%", padding: "1.5%"}}>{userFirst} {userLast}</Text>
                    <Text h5 style={{color: "black", textAlign: "center", marginLeft: "7.5%"}}>@{userHandle}</Text>
                </View>
            </View>
            
            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: "black",
                    borderRightWidth: 3.5
                }]}>
                    <Title style={{fontWeight: "bold", color: "black" }}>{friendssize}</Title>
                    <Caption style={{color: "black"}}>Friends</Caption>
                </View>
                <View style={styles.infoBox}>
                <Title style={{fontWeight: "bold", color: "black" }}>{partynumber}</Title>
                    <Caption style={{color: "black"}}>Parties</Caption>
                </View>
            </View>
            <View style={styles.containercolumn}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.9}
                    onPress={()=>navigation.navigate("Add Friends")}
                    style={{width: "90%", height: '45%', marginBottom: "5%"}}
                    >
                    <LinearGradient
                        start={{x:0, y:0}}
                        end={{x:1, y:0}}
                        colors={["#ee0979","#f76f6d",'#ff6a00']}
                        style={{height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15}}>
                        <Text style={{color: "white", fontFamily: "PingFangHK-Regular", fontSize: 17, }}>Add Friends 🧑‍🤝‍🧑 </Text>
                    </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.9}
                    onPress={()=>navigation.navigate("Settings")}
                    style={{width: "90%", height: '45%', marginBottom: "5%"}}
                    >
                    <LinearGradient
                        start={{x:0, y:0}}
                        end={{x:1, y:0}}
                        colors={["#ee0979","#f76f6d",'#ff6a00']}
                        style={{height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15}}>
                        <Text style={{color: "white", fontFamily: "PingFangHK-Medium", fontSize: 17}}>Settings 📖</Text>
                    </LinearGradient>
                </TouchableOpacity>
                

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.9}
                    onPress={()=>logout()}
                    style={{width: "90%", height: '45%', marginBottom: "5%"}}
                    >
                    <LinearGradient
                        start={{x:0, y:0}}
                        end={{x:1, y:0}}
                        colors={["#ee0979","#f76f6d",'#ff6a00']}
                        style={{height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15}}>
                        <Text style={{color: "white", fontFamily: "PingFangHK-Medium", fontSize: 17}}>Log Out 🚪</Text>
                    </LinearGradient>
                </TouchableOpacity>
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
        backgroundColor: "white"
    },
    container2: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20%"
    },  
    text: {
        marginBottom: "5%",
        marginLeft: "5%",
        color: "black",
        fontWeight: "bold"
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
        marginTop: "15%",
    },
    infoSect: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    infoBoxWrapper: {
        marginTop: "2%",
        flexDirection: "row",
    },
    infoBox: {
        width: '50%',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5%"
    },
    button: {
        marginBottom:10
    },
    modalStyling: {
        backgroundColor: "white",
        padding: 20,
        
    },
});