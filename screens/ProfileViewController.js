import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const ProfileViewController = () => {
    return(
        <View style={styles.container}>
            <Text>Howdy</Text>
        </View>
    );
}

export default ProfileViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#16335e"
    },
});