import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Subheading, TextInput, Button} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';


const SignUpViewController = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Glad you're joining us.</Text>
            <Subheading style={styles.subheading}>Create an account and you'll be on your way!</Subheading>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            
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
            <TextInput 
                mode="outlined"
                placeholder="Confirm password"
                selectionColor="#000"
                underlineColor="#F76F6D"
                onChangeText={confirm => setConfirm(confirm)}
                
                style={styles.input}
                value={confirm}
                theme={{ colors: {primary: '#F76F6D', underlineColor:'#F7A146',}}}
            />

            <Button icon="microsoft" 
                mode="contained"
                onPress={() => alert("good job dipshit. you pressed a button")}
                style={styles.button}>
                    Register
            </Button>

            <TouchableOpacity style={styles.forgotPass} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.navButton}>Have an account? Sign In.</Text>
            </TouchableOpacity>

            <Button icon="google" mode="contained" onPress={() => {}} style={styles.googButton}>
                Sign Up with Google
            </Button>

            <Button icon="facebook" mode="contained" onPress={() => {}} style={styles.fbButton}>
                Sign Up with Facebook
            </Button>
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
    input: {
        padding: 10,
        width: '85%',
        height: 45,
        borderRadius: 25
    },
    googButton: {
        marginTop: 20,
        height: 37,
        width:"75%",
        backgroundColor: "#DB4437",
    },
    text: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 35,
        color: "#4CC3CD"
    },
    subheading: {
        color: '#4CC3CD'
    },
    fbButton: {
        marginTop: 20,
        height: 37,
        width:"75%",
        backgroundColor: "#4267B2"
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
    },
    forgotPass: {
        marginVertical: 25
    },
    navButton: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "white"
    },
});