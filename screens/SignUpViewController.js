import React, {useState} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {Subheading} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {Button, Card} from 'react-native-paper'
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, Input} from 'galio-framework';
import { AuthContext } from '../navigation/AuthProvider.js';
import { useContext } from 'react';


const SignUpViewController = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const {register} = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <Text h2 style={[styles.text, {padding: 10, marginBottom: "5%"}]}>Enter email and password.</Text>
                        <Input
                            placeholder="Email"
                            placeholderTextColor="grey"
                            onChangeText={(userEmail) => setEmail(userEmail)}
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                        />
                        <Input 
                            placeholder="Password"
                            placeholderTextColor="grey"
                            onChangeText={(userPass) => setPass(userPass)}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            style={styles.input}
                            value={pass}
                        />
                {(email != '' && pass != "") &&
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate("Sign Up 1", {electronicmail: email, password: pass})}
                        style={styles.button}
                    >
                            Next
                    </Button>
                }
        </View>
    );
};


export default SignUpViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black"
    },
    card: {
        height: "50%",
        width: "80%",
        borderRadius: 25,
        shadowRadius: 40,
        alignContent: "center",
        marginBottom: "3%",
        marginTop: "8%",
        backgroundColor: "#D7D5ED"
    }, 
    image: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        width: "100%"
    },
    input: {
        padding: 10,
        width: '90%',
        marginLeft: "5%",
        height: 45,
        borderRadius: 25,
    },
    text: {
        marginTop: "30%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 32,
        color: "white",
        fontFamily: "PingFangHK-Medium"
    },
    subheading: {
        color: '#f7a146',
        
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
    },
    forgotPass: {
        marginVertical: 25,
        marginBottom: 100
    },
    navButton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "white"
    },
    logo: {
        height: "33%",
        width: "50%",
        resizeMode: 'cover',
        position: "relative",
    },
});