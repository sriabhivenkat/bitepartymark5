import React, { useContext } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import {Button} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider.js';
import {Text} from 'galio-framework';
import {Divider} from 'react-native-elements';


const SettingsButton = ({children, right, style, textStyle, ...rest}) => (
    <TouchableOpacity {...rest} style={[styles.button, style]}>
        <Text  style={[styles.buttonText, textStyle]}>{children}</Text>
        {right}
    </TouchableOpacity>
)
const SettingsViewController = () => {
    const {logout} = useContext(AuthContext);
    return(
        <View style={styles.container}>
            <SettingsButton 
                right={
                    <Switch/>
                }
            >
                Push Notifications
                
            </SettingsButton>
            <Divider style={styles.divider} />
            <SettingsButton>
                Privacy
            </SettingsButton>
            <SettingsButton>
                Terms of Service
            </SettingsButton>
            <Divider style={styles.divider}/>
            <SettingsButton onPew>
                Log Out
            </SettingsButton>
            <SettingsButton
                style={{borderWidth: 1, borderRadius: 20, borderColor: 'red', justifyContent: 'center', marginTop: 20}}
                textStyle={{color: 'red'}}
            >
                Delete Account
            </SettingsButton>

            {/* <TouchableOpacity>
                <Text h5 style={{marginTop: "20%", fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text h5 style={{marginTop: "2.5%", fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => logout()}>
                <Text h5 style={{marginTop: "2.5%", fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Log Out</Text>
            </TouchableOpacity> */}
        </View>
    );
}

export default SettingsViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 50,
        paddingVertical: 30
    },
    button: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    buttonText: { 
        // marginTop: "2.5%", 
        fontFamily: "PingFangHK-Medium", 
        textAlign: "left", 
        paddingHorizontal: 10, 
        paddingVertical: 10,
        fontWeight: "300",
        fontSize: 22
        // backgroundColor: 'blue'
    },
    divider: {
        borderWidth: 0.3,
        marginVertical: 15

    }
});