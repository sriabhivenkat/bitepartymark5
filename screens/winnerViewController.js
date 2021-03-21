import React, { useContext, useState, useEffect } from 'react';
import { View, Image, StyleSheet,} from 'react-native';
import {Text} from 'galio-framework'
import firestore, { firebase } from "@react-native-firebase/firestore";


const test = ({navigation, route}) => {
    const [winner, setWinner] = useState();
    const { partyID } = route.params;
    useEffect(() => {
        const refVal = firestore().collection("Parties").doc(partyID);
        const doc = refVal.get()
        setWinner(doc.data().winner)


        firestore()
        .collection("Parties")
        .doc(partyID)
        .onSnapshot(onResult3, onError);
    
    }, [])

    function onError(error) {
        console.error(error);
      }
    

    function onResult3(QuerySnapshot) {
        const refVal = firebase.firestore().collection("Parties").doc(partyID);
        const doc = refVal.get()

       
        setWinner(doc.data())
      
      }


   return(
        <View style={styles.container}>
            {winner &&
                <Text h3 style={{color: "#f76f6d", fontFamily: "PingFangHK-Medium"}}>Restaurant Selected!</Text>
            }
            {!winner &&
                <Text h3 style={{color: "#f76f6d", fontFamily: "PingFangHK-Medium"}}>Keep waiting!</Text>
            }
        </View>
    )
}

export default test;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
})