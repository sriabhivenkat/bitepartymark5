import React, { useContext, useState, useEffect } from 'react';
import { View, Image, StyleSheet} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider.js';
import firestore, { firebase } from "@react-native-firebase/firestore";
import {Avatar} from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import {Text, Button} from 'galio-framework';
import {Card} from 'react-native-paper';
import SwipeCards from 'react-native-swipe-cards-deck';


const AddSquadsViewController = () => {
    
    const [participant, setParticipants] = useState([]);
    const [array, setArray] = useState([]);

    var localArray = [];
    useEffect(() => {
        const main = async() => {
            const refVal = firebase.firestore().collection("Parties").doc('zv3i23');

            const doc = await refVal.get()
            const {participants} = doc.data();

            setParticipants(participants[0]);
        };
        main();
    }, [])
    //colors={['#9796f0','#fbc7d4', 'white']}
    console.log(participant[0])

    
    return (
        <LinearGradient
        colors={['#9796f0','#fbc7d4', 'white']}
        locations={[0,0.8,1]}
        style={styles.container}
        >
                <Avatar.Image size={64} source={{uri: participant.imageUrlPath}} style={{marginTop: "20%"}}/>
                <Text h5 style={{marginTop: "5%", fontFamily: "PingFangHK-Regular", fontWeight: "bold", color: "white"}}>Party with {participant.firstName}</Text>

        </LinearGradient>
    );
}

export default AddSquadsViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
     },
});