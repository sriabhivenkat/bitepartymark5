import React, { useContext, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider.js';
import firestore, { firebase } from "@react-native-firebase/firestore";
import {Avatar} from 'react-native-paper';


const acceptInvite = (inviteId, uId) =>
    firestore()
        .collection("Users")
        .doc(uId)
        .collection("invitations")
        .doc(inviteId)
        .set({
            accepted: true,
        })


const DuosPartyScreen = ({ route }) => {
    const { partyID, inviteID } = route.params

    const { user } = useContext(AuthContext);
    const [participant, setParticipants] = useState([]);
    console.log({partyID, inviteID})


    useEffect(() => (
        acceptInvite(inviteID, user.uid)
            .then(() => console.log('Invite accepted'))
            .catch(err => alert(err))
    ), [inviteID, partyID])

    useEffect(() => {
        const main = async() => {
            const refVal = firebase.firestore().collection("Parties").doc(partyID);

            const doc = await refVal.get()
            const {participants} = doc.data();

            setParticipants(participants[0]);
        };
        main();
    }, [])

    console.log(participant[0])
    return (
        <View style={styles.container}>
            <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Avatar.Image size={64} source={{uri: participant.imageUrlPath}} style={{marginTop: "20%"}}/>
                <Text>Howdy</Text>
            </View>
            <Text>{partyID}</Text>
        </View>
    );
}

export default DuosPartyScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    button: {
        marginTop: 20,
        height: 37,
        width: "50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
    },
});