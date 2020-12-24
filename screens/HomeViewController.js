import React from 'react';
import { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider.js';


const HomeViewController = () => {
    const {user, logout} = useContext(AuthContext);

    return(
    <View style = {styles.container}>
        <Text style={styles.title}>Welcome {user.email}</Text>
    </View>
    );
}


export default HomeViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#16335e"
    },
    title: {
        color: "#f7a146",
        fontWeight: "bold",
        
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
    },
});