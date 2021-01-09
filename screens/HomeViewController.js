import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { Text } from "galio-framework";
import {Divider} from 'react-native-elements';
import firestore from "@react-native-firebase/firestore";
import {Button} from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import TouchableScale from 'react-native-touchable-scale';

const HomeViewController = ({navigation}) => {
  const { user } = useContext(AuthContext);
  const [userHandle, setUserHandle] = useState("");
  const [profileBool, setProfileBool] = useState("");
  
  const B = (props) => <Text style={{fontWeight: "bold"}}>{props.children}</Text>


  useEffect(() => {
    const main = async () => {
      const refVal = firestore().collection("Users").doc(user.uid);
      const doc = await refVal.get();
      const {handle} = doc.data();
      const {flavorProfileCreated} = doc.data();

      setUserHandle(handle);
      setProfileBool(flavorProfileCreated);
    };
    main();
  }, []);

  var message;
    if(profileBool==false) {
        message="You have not created a flavor profile. Tap this card to set it up!"
    } else {
        message="suck my dick"
    }

  return (
    <View style={styles.container}>
        <Text h2 style={styles.title}>Your Feed</Text>
        
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Begin Party")}
            style={{width: 312, height: '80%', marginBottom: "3%"}}
            >
              <LinearGradient
                start={{x:0, y:0}}
                end={{x:1, y:0}}
                colors={['#8a2387', '#e94057', '#f27121']}
                style={{height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15, width: "110%", marginLeft: "-5%"}}
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}>
                  <Text style={{color: "white", fontFamily: "PingFangHK-Medium", fontSize: 17}}>Let's Party 🥳 </Text>
                </LinearGradient>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default HomeViewController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    color: "black",
    justifyContent: "center",
    marginLeft: "5%",
    fontSize: 43,
    fontFamily: "PingFangHK-Medium",
    marginTop: "15%"
  },
  button: {
    width: "80%",
    height: "75%",
    
  },  
  bottomView: {
    width: '100%',
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    position: "absolute",
    bottom: 0
  },  

});
