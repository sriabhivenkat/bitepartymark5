import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const AddFriendsViewController = () => {
    return(
        <View style={styles.container}>
            <Text>Howdy</Text>
        </View>
    );
}

export default AddFriendsViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#16335e"
    },
});