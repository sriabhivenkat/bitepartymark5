import React, { useContext, useState, useEffect } from 'react';
import { View, Image, StyleSheet, } from 'react-native';
import { Text } from 'galio-framework'
import firestore, { firebase } from "@react-native-firebase/firestore";
x

const test = ({ navigation, route }) => {
    const [winner1, setWinner] = useState();
    const { partyID } = route.params;
    useEffect(() => {
        const refVal = firestore().collection("Parties").doc(partyID);
        refVal.get().then(doc => {
            const { winner } = doc.data()
            setWinner(winner)
        })

        firestore()
            .collection("Parties")
            .doc(partyID)
            .onSnapshot(() => {
                const refVal = firebase.firestore().collection("Parties").doc(partyID);
                const doc = 
                    refVal.get()
                    .then(doc => {
                        const { winner } = doc.data()
                        setWinner(winner)
                    }, () => console.error(err))
            })
    }, [])

    // function onError(error) {
    //     console.error(error);
    //   }


    // function onResult3(QuerySnapshot) {
    //     const refVal = firebase.firestore().collection("Parties").doc(partyID);
    //     const doc = refVal.get()

    //     setWinner(doc.data().winner)

    //   }


    return (
        <View style={styles.container}>
            {winner1 &&
                <Text h3 style={{ color: "#f76f6d", fontFamily: "PingFangHK-Medium" }}>Restaurant Selected!</Text>
            }
            {!winner1 &&
                <Text h3 style={{ color: "#f76f6d", fontFamily: "PingFangHK-Medium" }}>Keep waiting!</Text>
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