import React, { useContext, useEffect, useState, useRef} from 'react';
import { View, Image, StyleSheet,StatusBar, Animated, TouchableWithoutFeedback} from 'react-native';
import {Icon, Slider} from 'react-native-elements';
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
    const [stateval, setStateVal] = useState(false)
    const introOpacity = useRef(new Animated.Value(0)).current
    const textOpacity = useRef(new Animated.Value(0)).current
    const slide2Opacity = useRef(new Animated.Value(0)).current
    const [value, setValue] = useState('first');


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

    const fadeOutText = Animated.timing(textOpacity,
        {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true
        }    
    )
    const fadeInSlide2 = Animated.timing(slide2Opacity,
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

    const movetoSlide2 = () => {
        setStateVal(false);
        fadeOutText.start()
        fadeInSlide2.start()
        setStateVal(true);
    }
    return(
        <View style={styles.container}>
            <Animated.View
                style={{opacity: introOpacity, marginTop: "50%", marginTop: "90%"}}
            >
                <Text numberOfLines={1} style={styles.fadingText}>What are your tastes?</Text>
                <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleTransition}
                style={{width: "80%", height: '35%', marginLeft: "10%", justifyContent: "center", marginTop: "2%"}}
                >
                    <LinearGradient
                        start={{x:0, y:0}}
                        end={{x:1, y:0}}
                        colors={["#ee0979","#f76f6d",'#ff6a00']}
                        style={{height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15, }}>
                        <Text style={{color: "white", fontFamily: "Kollektif", fontSize: 17}}>Let's go!</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View
                pointerEvents={stateval ? "auto":"none"}
                style={[{opacity: textOpacity, bottom: "30%", marginLeft: "5%", marginRight: "5%"}]}>
                <View>
                    <Text h5 style={{textAlign: "center", color: "#f76f6d", fontFamily: "Kollektif"}}>Picture this. You've just broken up with your significant other and you want ice cream. What flavor are you going to pick?</Text>
                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <RadioButton.Item label="Vanilla, of course???" value="first" labelStyle={{fontFamily: "Kollektif", color: "#f76f6d", fontSize: 20}} style={{marginTop: "5%"}}/>
                        <RadioButton.Item label="Chocolate" value="second" labelStyle={{fontFamily: "Kollektif", color: "#f76f6d", fontSize: 20}}/>
                    </RadioButton.Group>
                </View>
            </Animated.View>
            <Animated.View
                pointerEvents={stateval ? "auto":"none"}
                style={[{opacity: slide2Opacity, justifyContent: "center"}]}
            >
                <Text numberOfLines={1} style={styles.fadingText1}>Rate your sweet tooth</Text>
                <View style={{justifyContent: "center", marginBottom: "10%"}}>
                    <Text style={{color: "black", bottom: 750, textAlign: "center"}}>howdy kachowdy</Text>
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
        fontFamily: "Kollektif",
        marginTop: "15%"
    },
    fadingText: {
        fontSize: 28,
        textAlign: "center",
        justifyContent: "center",
        marginBottom: "5%",
        marginTop: "32%",
        color : "#f76f6d",
        fontFamily: "Kollektif"
    },
    fadingText1: {
        fontSize: 28,
        textAlign: "center",
        justifyContent: "center",
        marginTop: "35%",
        color : "#f76f6d",
        fontFamily: "Kollektif"
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
     },
});