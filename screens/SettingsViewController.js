import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider.js';

const SettingsViewController = () => {
    const {logout} = useContext(AuthContext);
    return(
        <View style={styles.container}>
            <Text>Howdy</Text>
            <Button icon="logout"
                mode="contained"
                onPress={() => logout()}
                style={styles.button}
            >
                Log Out!
            </Button>
        </View>
    );
}

export default SettingsViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#16335e"
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
     },
});