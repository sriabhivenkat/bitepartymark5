import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {Switch} from 'react-native-paper'
import {Text} from 'galio-framework';
import {Slider} from 'react-native-elements';
import {AuthContext} from '../navigation/AuthProvider.js';
import {TouchableOpacity} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from '@react-native-community/async-storage';
import firestore, { firebase } from "@react-native-firebase/firestore";

const FiltersViewController = ({navigation}) => {
    const [sliderval1, setSliderVal1] = useState(0);
    const [sliderval2, setSliderVal2] = useState(0);
    const [sliderval3, setSliderVal3] = useState(0);
    const { user } = useContext(AuthContext);
    const [switch1, setSwitch1] = useState(false);
    const [switch2, setSwitch2] = useState(false);
    const [handleval, setHandleVal] = useState("");
    const toggleSwitch1 = () => setSwitch1(previousState => !previousState);
    const toggleSwitch2 = () => setSwitch2(previousState => !previousState);

    useEffect(() => {
        AsyncStorage.getItem('handlequeryval')
            .then((value) => {
                setHandleVal(value);
            })
    });

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Build-A-Restaurant</Text>
            
            <View style={{flex:0.5, marginTop: "10%"}}>
            <Text p style={{marginLeft: "10%", color:"#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium"}}>How far are you willing to go?</Text>
                <Slider 
                    value={sliderval1}
                    onValueChange={(value) => setSliderVal1(value)}
                    maximumValue={300}
                    animateTransitions={true}
                    thumbStyle={{width: "9%", height: "72%",}}
                    thumbTintColor={"#f76f6d"}
                    style={{width: "80%", marginLeft: "10%", marginTop: "2.5%", color: "#f76f6d"}}
                />
                <Text p style={{marginLeft: "10%", color:"#f76f6d", fontWeight: "300", fontFamily: "PingFangHK-Medium"}}>{Math.round(sliderval1)} miles</Text>

                <Text p style={{marginLeft: "10%", color:"#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium", marginTop: "10%"}}>How long do you want to eat?</Text>
                <Slider 
                    value={sliderval2}
                    onValueChange={(value) => setSliderVal2(value)}
                    maximumValue={300}
                    step={30}
                    animateTransitions={true}
                    thumbStyle={{width: "9%", height: "72%",}}
                    thumbTintColor={"#f76f6d"}
                    style={{width: "80%", marginLeft: "10%", marginTop: "2.5%", color: "#f76f6d"}}
                />
                <Text p style={{marginLeft: "10%", color:"#f76f6d", fontWeight: "300", fontFamily: "PingFangHK-Medium"}}>{Math.round(sliderval2)} minutes</Text>
            </View>

            <View style={{flex: 0.3, flexDirection: "row", justifyContent: "center"}}>
                <View style={{flex: 0.5, flexDirection: "column", alignItems: "center"}}>
                    <Text p style={{marginLeft: "10%", color:"#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium"}}>Family-Friendly?</Text>
                    <Switch 
                        value={switch1} 
                        onValueChange={toggleSwitch1} 
                        style={{marginTop: "4%"}}
                        color="#f76f6d"
                    />
                </View>

                <View style={{flex: 0.5, flexDirection: "column", alignItems: "center", marginRight: "4%"}}>
                    <Text p style={{marginLeft: "10%", color:"#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium"}}>Want Fast Food?</Text>
                    <Switch 
                        value={switch2} 
                        onValueChange={toggleSwitch2} 
                        style={{marginTop: "4%"}}
                        color="#f76f6d"
                    />
                </View>
            </View>

            <View style={{flex: 0.2, alignItems: "center"}}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.9}
                    onPress={()=>{
                        firestore()
                            .collection("Users")
                            .doc(user.uid)
                            .collection("pastParties")
                            .doc(handleval)
                            .update({
                                "restrictions": [Math.round(sliderval1), Math.round(sliderval2), switch1, switch2]
                            })
                            .then(navigation.navigate("DuosPartyScreen"))
                    }}
                    style={{width: "80%", height: "40%", marginBottom: "5%"}}
                >
                    <LinearGradient
                        start={{x:0, y:0}}
                        end={{x:1, y:0}}
                        colors={['#7f00ff', '#e100ff', '#ffaf7b']}
                        style={{height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15}}>
                            <Text style={{color: "white", fontFamily: "PingFangHK-Regular", fontSize: 17, }}>Start party!</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FiltersViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
     },
     title: {
        padding: "5%",
        fontFamily: "PingFangHK-Medium",
        color: "#f76f6d",
        textAlign: "center",
        marginTop: "20%",
        fontSize: 35,
        
    },
    subheading: {
        fontFamily: "PingFangHK-Medium",
        color: "#f76f6d",
        textAlign: "center",
    },
});