import React, { useContext, useEffect, useState} from 'react';
import { View, Image, StyleSheet,StatusBar } from 'react-native';
import {Icon} from 'react-native-elements';
import {Text} from 'galio-framework';
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../navigation/AuthProvider.js";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import TouchableScale from 'react-native-touchable-scale';

const NearbyViewController = ({navigation}) => {
    const [flavorProfile, setFlavorProfile] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const main = async () => {
          const refVal = firestore().collection("Users").doc(user.uid);
          const doc = await refVal.get();
          const {flavorProfileCreated} = doc.data();
          setFlavorProfile(flavorProfileCreated);
        };
        main();
    }, []);
    
    return(
        <View style={styles.container}>
            <Text h2 style={styles.title}>FlavorProfile</Text>
            <View style={styles.flavorcontainer}>
                <Text h4 style={styles.subheading1}>
                    Your Tastes
                </Text>
                {flavorProfile==false &&
                    <View style={{flex:1, alignItems: "center"}}>
                        <Image source={require('../assets/images/empty_street.png')} style={{width: "80%", height: "60%"}}/>
                        <Text p numberOfLines={1} style={{fontFamily: "PingFangHK-Light", fontSize:20, marginTop: "2%", marginBottom: "2%"}}>Soooo empty... 😞</Text>
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate("FlavorTest")}
                            style={{width: 312, height: '40%', marginBottom: "-2%"}}
                            >
                            <LinearGradient
                                start={{x:0, y:0}}
                                end={{x:1, y:0}}
                                colors={["#ee0979","#f76f6d",'#ff6a00']}
                                style={{height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15, width: "110%", marginLeft: "-5%"}}
                                Component={TouchableScale}
                                friction={90}
                                tension={100}
                                activeScale={0.95}>
                                <Text style={{color: "white", fontFamily: "PingFangHK-Medium", fontSize: 17}}>Create a flavor profile</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                }
            </View>

            <View style={styles.flavorcontainer1}>
                <Text h4 style={styles.subheading1}>
                    Nearby FlavorBuddies
                </Text>
                {flavorProfile==false &&  
                    <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
                        <Icon name="holiday-village" type="fontisto" size={40} reverse color="#f76f6d"/>
                        <Text p numberOfLines={1} style={{fontFamily: "PingFangHK-Light", fontSize:20}}>You haven't made a flavor profile yet!</Text>
                    </View>
                }
                
            </View>
        </View>
    );
}

export default NearbyViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    title: {
        color: "black",
        justifyContent: "center",
        marginLeft: "5%",
        fontSize: 43,
        fontFamily: "PingFangHK-Medium",
        marginTop: "15%"
    },
    subheading1: {
        marginTop: "2.5%",
        fontFamily: "PingFangHK-Medium",
        marginBottom: "2%",
        color: "#f76f6d",
        marginLeft: "5%",
    },
    flavorcontainer: {
        flex:0.45, 
        borderWidth:1, 
        borderRadius:25, 
        marginTop: "5%", 
        borderColor: "#ddd",
        marginLeft: "3%",
        marginRight: "3%",
        shadowColor: "#000",
        shadowOffset: {width:0, height:2},
        shadowRadius: 100,
        elevation:1,
    },
    flavorcontainer1: {
        flex:0.45, 
        borderWidth:1, 
        borderRadius:25, 
        marginTop: "5%", 
        borderColor: "#ddd",
        marginLeft: "3%",
        marginRight: "3%",
        shadowColor: "#000",
        shadowOffset: {width:0, height:2},
        shadowRadius: 100,
        elevation:1,
    },    
});