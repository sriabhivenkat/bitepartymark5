import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {Text} from 'galio-framework';
import {Button} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider.js';

const AddDuosViewController = () => {
    return(
        <View style={styles.container}>
            <Text h3 style={styles.title}>Who's coming?</Text>
        </View>
    );
}

export default AddDuosViewController;


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
    title: {
        padding: "5%",
        fontFamily: "PingFangHK-Light",
        color: "#f76f6d",
        textAlign: "center",
        marginTop: "10%"
    },
});