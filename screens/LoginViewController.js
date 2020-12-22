import React, {useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {Headline, TextInput, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider.js';

const LoginViewController = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const {login} = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <Image source={require('../images/logo.png')} style={styles.logo} />
            
            <TextInput
                mode="outlined"
                name="user"
                icon="user"
                placeholder="Email"
                selectionColor="#000"
                underlineColor="#F76F6D"
                onChangeText={email => setEmail(email)}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                theme={{ colors: {primary: '#F76F6D', underlineColor:'#F7A146',}}}
            />
            <TextInput 
                mode="outlined"
                placeholder="Password"
                selectionColor="#000"
                underlineColor="#F76F6D"
                onChangeText={pass => setPass(pass)}
                
                style={styles.input}
                value={pass}
                theme={{ colors: {primary: '#F76F6D', underlineColor:'#F7A146',}}}
            />

            <Button icon="rocket" 
                mode="contained"
                onPress={() => login(email, pass)}
                style={styles.button}>
                    Log In!
                </Button>
            
            <Button icon="rocket" 
                mode="contained"
                onPress={() => navigation.navigate("Sign Up")}
                style={styles.button}>
                    Sign Up!
            </Button>

            <TouchableOpacity style={styles.forgotPass}>
                <Text style={styles.navButton}>Forgot Password? No Worries!</Text>
            </TouchableOpacity>

            <Button icon="google" mode="contained" onPress={() => {}} style={styles.googButton}>
                Log In with Google
            </Button>

            <Button icon="facebook" mode="contained" onPress={() => {}} style={styles.fbButton}>
                Log In with Facebook
            </Button>
        </View>
    );
};


export default LoginViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000"
    },
    logo: {
        height: "25%",
        width: 250,
        resizeMode: 'cover',
        position: "relative"
    },
    input: {
        padding: 10,
        width: '85%',
        height: 45,
        borderRadius: 25,
        
    },
    button: {
       marginTop: 20,
       height: 37,
       width:"50%",
       backgroundColor: "#F76F6D",
       borderRadius: 15
    },
    forgotPass: {
        marginVertical: 35
    },
    navButton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "white"
    },
    googButton: {
       marginTop: 20,
       height: 37,
       width:"75%",
       backgroundColor: "#DB4437",
    },
    text: {
        fontWeight: "bold",
        fontSize: 35,
        color: "white"
    },
    fbButton: {
       marginTop: 20,
       height: 37,
       width:"75%",
       backgroundColor: "#4267B2"
    }
});