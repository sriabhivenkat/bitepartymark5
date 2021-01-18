import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet,StatusBar } from 'react-native';


const NearbyViewController = () => {
    return(
        <View style={styles.container}>
            <StatusBar translucent={true}/>
            <Text>Howdy</Text>
        </View>
    );
}

export default NearbyViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#16335e"
    },
});