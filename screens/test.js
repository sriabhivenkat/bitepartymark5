import React, { useContext, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';


const test = () => {
    return(
        <View style={styles.container}>
            <Text>hola</Text>
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