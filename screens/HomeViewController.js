import React from 'react';
import { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider.js';
import { Text } from 'galio-framework';
import firestore from '@react-native-firebase/firestore';

const HomeViewController = () => {
    const {user} = useContext(AuthContext);
    const refVal = firestore().collection("Users").doc(user.uid);
    const docvals = refVal.get()
        .then(function(docvals){
            if(docvals.exists) {
                var handle = docvals.data['handle'];
                console.log("suck my dick");
            } else {
                console.log("the document doesn't exist.");
            }
        }) .catch(function(error){
            console.log("Wtf, this happened: ", error);
        });
    return(
    <View style = {styles.container}>
        <Text h3 style={styles.title}>Welcome, {handle}!</Text>
    </View>
    );
}


export default HomeViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#16335e"
    },
    title: {
        color: "#f7a146",
        fontWeight: "bold",
        padding: 20
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
    },
});