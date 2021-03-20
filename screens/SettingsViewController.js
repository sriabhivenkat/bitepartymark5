import React, { useContext } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {Button} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider.js';
import {Text} from 'galio-framework';
import {Divider} from 'react-native-elements';

const SettingsViewController = () => {
    const {logout} = useContext(AuthContext);
    return(
        <View style={styles.container}>
            <TouchableOpacity>
                <Text h5 style={{marginTop: "20%", fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text h5 style={{marginTop: "2.5%", fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Terms of Service</Text>
            </TouchableOpacity>
            <Divider style={{marginTop: "3%"}} />
        </View>
    );
}

export default SettingsViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
     },
});