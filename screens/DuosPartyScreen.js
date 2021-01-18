import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider.js';


const DuosPartyScreen = () => {


    return(
        <View style={styles.container}>
            
        </View>
    );
}

export default DuosPartyScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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