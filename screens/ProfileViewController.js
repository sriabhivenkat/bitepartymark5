import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {Text, Button} from 'galio-framework';
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../navigation/AuthProvider.js";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Title, Caption} from 'react-native-paper';
import AddFriendsViewController from '../screens/AddFriendsViewController.js';
import { ListAccordionGroupContext } from 'react-native-paper/lib/typescript/components/List/ListAccordionGroup';


const ProfileViewController = ({navigation}) => {
    const { user, logout } = useContext(AuthContext);
    const [userFirst, setUserFirst] = useState("");
    const [userLast, setUserLast] = useState("");
    const [userHandle, setUserHandle] = useState("");
    const [friendsHandle, setFriendsHandle] = useState("");
    const [partiesHandle, setPartiesHandle] = useState("");

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

    return(
        <View style={styles.container}>
            <Text h3 size={45} style={styles.text}>
                <B>{userFirst}'s</B> Profile
            </Text>
            <View style={styles.container2}>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons 
                        name="person-circle"
                        color={"#f76f6d"}
                        size={120}
                    />
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
            <View style={styles.container2}>
                <Button color="warning" round uppercase size="large" onPress={()=>{}}>Add friends here</Button>
            </View>
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
        flex: 0.25,
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
    },
    pfp: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        tintColor: "#999",
    },
    positioning: {
        alignContent: 'center',
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    column: {
        flexDirection: "column",
        marginBottom: 10,
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
        height:100,
    },
    infoBox: {
        width: '50%',
        alignItems: "center",
        justifyContent: "center",
    }
});