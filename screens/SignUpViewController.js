import React, {useState} from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
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
    
    const [handle, setHandle] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const {register} = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../images/background_img.jpg')} style={styles.image}>
                <Text h3 style={styles.text}>Glad you're joining us!</Text>
                
                <Card style={styles.card}>
                    <Card.Content>
                        <Text h3 style={{fontWeight: "bold", color: "black", textAlign: "center", marginBottom: "5%", marginTop: "5%", fontFamily: "PingFangHK-Medium"}}>Sign Up</Text>
                        <Input
                            placeholder="Email"
                            onChangeText={(userEmail) => setEmail(userEmail)}
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                        />
                        <Input 
                            placeholder="Password"
                            onChangeText={(userPass) => setPass(userPass)}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            style={styles.input}
                            value={pass}
                        />
                        <Input 
                            placeholder="Enter your first name"
                            onChangeText={(userFirst) => setFirst(userFirst)}
                            style={styles.input}
                            value={first}
                        />
                        <Input 
                            placeholder="Enter your last name"
                            onChangeText={(userLast) => setLast(userLast)}
                            style={styles.input}
                            value={last}
                        />
                        <Input 
                            placeholder="Enter a handle"
                            autoCapitalize="none"
                            onChangeText={(userHandle) => setHandle(userHandle)}
                            style={styles.input}
                            value={handle}
                        />
                    </Card.Content>
                </Card>
                <Button icon="hiking" 
                    mode="contained"
                    onPress={() => register(email, pass, first, last, handle)}
                    style={styles.button}>
                        Register
                </Button>
                
                <TouchableOpacity style={styles.forgotPass} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.navButton}>Have an account? Sign In.</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};


export default SignUpViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        
        backgroundColor: "#16335e"
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
});