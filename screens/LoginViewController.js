import React, {useState} from 'react';
import { View,  Image, StyleSheet, ImageBackground } from 'react-native';
import {Text} from 'galio-framework';
import {Headline, TextInput, Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider.js';
import {Card} from 'react-native-paper';

const LoginViewController = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const {login} = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../images/background_img.jpg')} style={styles.image}>
                <Image source={require('../images/logo.png')} style={styles.logo} />
                <Card style={styles.card}>
                    <Card.Content>
                        <Text h3 style={{textAlign: "center", fontWeight: "bold", marginTop: "12%", color: "#0095f1"}}>Log In</Text>
                        <TextInput
                            mode="outlined"
                            name="user"
                            icon="user"
                            placeholder="Email"
                            selectionColor="#000"
                            underlineColor="#F76F6D"
                            onChangeText={email => setEmail(email)}
                            style={{padding: 10, width: "100%", height: 45, borderRadius: 25, marginTop: "2%"}}
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
                            secureTextEntry={true}
                            onChangeText={pass => setPass(pass)}
                            
                            style={styles.input}
                            value={pass}
                            theme={{ colors: {primary: '#F76F6D', underlineColor:'#F7A146',}}}
                        />
                    </Card.Content>
                    
                </Card>
                        <Button icon="rocket" 
                            mode="contained"
                            onPress={() => login(email, pass)}
                            style={styles.button}>
                                Log In
                        </Button>
                        
                        
                        <Button icon="rocket" 
                            mode="contained"
                            onPress={() => navigation.navigate("Sign Up")}
                            style={styles.button}>
                                Sign Up
                        </Button>
                <TouchableOpacity style={styles.forgotPass}>
                    <Text style={styles.navButton}>Forgot Password? No Worries!</Text>
                </TouchableOpacity>

           </ImageBackground> 
        </View>
    );
};


export default LoginViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
        width: "100%"
    },
    card: {
        height: "35%",
        width: "80%",
        borderRadius: 25,
        shadowRadius: 40,
        alignContent: "center",
        marginBottom: "5%",
        backgroundColor: "#D7D5ED"
    },  
    logo: {
        height: "25%",
        width: 250,
        resizeMode: 'cover',
        position: "relative",
        marginBottom: "8%",
        marginTop: "10%"
    },
    input: {
        padding: 10,
        width: '100%',
        height: 45,
        borderRadius: 25,
        
    },
    button: {
       marginTop: 20,
       height: 37,
       width:"60%",
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
    text: {
        fontWeight: "bold",
        alignItems: "center"
    },
});