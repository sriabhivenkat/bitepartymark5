import React from 'react';
import { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider.js';
import { Text } from 'galio-framework';

const HomeViewController = () => {
    const {user, logout} = useContext(AuthContext);

    return(
    <View style = {styles.container}>
        <Text h3 style={styles.title}>Welcome, {user.first}!</Text>
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