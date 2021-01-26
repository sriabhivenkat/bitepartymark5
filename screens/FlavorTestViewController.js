import React, { useContext, useEffect, useState, useRef} from 'react';
import { View, Image, StyleSheet,StatusBar, Animated, TouchableWithoutFeedback} from 'react-native';
import {Icon} from 'react-native-elements';
import {Text} from 'galio-framework';
import {RadioButton} from 'react-native-paper'
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../navigation/AuthProvider.js";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import TouchableScale from 'react-native-touchable-scale';


const FlavorTestViewController = (props) => {
    const {user} = useContext(AuthContext);
    const opacity = useState(new Animated.Value(1))[0]
    const [message, setMessage] = useState("Find out what you're into.");
    const [buttonText, setButtonText] = useState("Let's go!")
    const [stateval, setStateVal] = useState(false);
    const [value, setValue] = React.useState('first');
    const introOpacity = useRef(new Animated.Value(0)).current
    const textOpacity = useRef(new Animated.Value(0)).current


    const fadeInIntro = Animated.timing(introOpacity,
        {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
        }
    )

    const fadeOutIntro = Animated.timing(introOpacity,
        {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true
        }
    )

    const fadeInText = Animated.timing(textOpacity,
        {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
        }
    )

    // fade in on mount
    useEffect(() => {
        fadeInIntro.start()
      }, [])


    const handleTransition = () => {
        fadeOutIntro.start()
        fadeInText.start()
        setStateVal(true);
    }    
    return(
        <View style={styles.container}>
            <Animated.View
                style={{opacity: introOpacity, marginTop: "50%"}}
            >
                <Text numberOfLines={1} style={styles.fadingText}>{message}</Text>
                <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleTransition}
                style={{width: "80%", height: '30%', marginLeft: "10%", justifyContent: "center",}}
                >
                    <LinearGradient
                        start={{x:0, y:0}}
                        end={{x:1, y:0}}
                        colors={["#ee0979","#f76f6d",'#ff6a00']}
                        style={{height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15, }}>
                        <Text style={{color: "white", fontFamily: "PingFangHK-Medium", fontSize: 17}}>Let's go!</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View
                pointerEvents="none"
                style={[{opacity: textOpacity, bottom: 400}]}
            >
                <Text numberOfLines={1} style={styles.fadingText}>Rate your sweet tooth</Text>
                <View>
                    <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                        <RadioButton.Item label="First item" value="first" />
                        <RadioButton.Item label="Second item" value="second" />
                    </RadioButton.Group>
                </View>
            </Animated.View>
        </View>
    );
}

export default FlavorTestViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white"
    },
    fadingContainer: {
        backgroundColor: "white",
        justifyContent: "center",
        
    },
    fadingContainer1: {
        backgroundColor: "white",
        justifyContent: "center",
        
    },
    title: {
        color: "black",
        justifyContent: "center",
        marginLeft: "5%",
        fontSize: 43,
        fontFamily: "PingFangHK-Medium",
        marginTop: "15%"
    },
    fadingText: {
        fontSize: 28,
        textAlign: "center",
        justifyContent: "center",
        marginBottom: "5%",
        marginTop: "35%",
        color : "#f76f6d",
        fontFamily: "PingFangHK-Medium"
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
     },
});