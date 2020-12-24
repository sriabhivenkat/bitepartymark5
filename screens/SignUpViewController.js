import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Subheading} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper'
import {TouchableOpacity} from 'react-native-gesture-handler';
import { AuthContext } from '../navigation/AuthProvider.js';
import { useContext } from 'react';

const SignUpViewController = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    
    const [handle, setHandle] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const {register} = useContext(AuthContext);

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
                onChangeText={(userEmail) => setEmail(userEmail)}
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
                onChangeText={(userPass) => setPass(userPass)}
                autoCapitalize="none"
                style={styles.input}
                value={pass}
                theme={{ colors: {primary: '#F76F6D', underlineColor:'#F7A146',}}}
            />
            <TextInput 
                mode="outlined"
                placeholder="Enter a handle"
                selectionColor="#000"
                underlineColor="#F76F6D"
                autoCapitalize="none"
                onChangeText={(userHandle) => setHandle(userHandle)}
                style={styles.input}
                value={handle}
                theme={{ colors: {primary: '#F76F6D', underlineColor:'#F7A146',}}}
            />
            <TextInput 
                mode="outlined"
                placeholder="Enter your first name"
                selectionColor="#000"
                underlineColor="#F76F6D"
                onChangeText={(userFirst) => setFirst(userFirst)}
                style={styles.input}
                value={first}
                theme={{ colors: {primary: '#F76F6D', underlineColor:'#F7A146',}}}
            />
            <TextInput 
                mode="outlined"
                placeholder="Enter your last name"
                selectionColor="#000"
                underlineColor="#F76F6D"
                onChangeText={(userLast) => setLast(userLast)}
                style={styles.input}
                value={last}
                theme={{ colors: {primary: '#F76F6D', underlineColor:'#F7A146',}}}
            />

            <Button icon="hiking" 
                mode="contained"
                onPress={() => register(email, pass, handle, first, last)}
                style={styles.button}>
                    Register
            </Button>

            <TouchableOpacity style={styles.forgotPass} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.navButton}>Have an account? Sign In.</Text>
            </TouchableOpacity>
            
        </View>
    );
};


export default SignUpViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#16335e"
    },
    input: {
        padding: 10,
        width: '85%',
        height: 45,
        borderRadius: 25
    },
    text: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 35,
        color: "#F76F6D"
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
});