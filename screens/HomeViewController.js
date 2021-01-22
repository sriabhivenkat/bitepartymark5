import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { View, Image, StyleSheet, ImageBackground, StatusBar, ScrollView} from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { Text } from "galio-framework";
import {Icon} from 'react-native-elements';
import firestore from "@react-native-firebase/firestore";
import {Button} from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import TouchableScale from 'react-native-touchable-scale';
import {Card, Avatar} from 'react-native-paper';
import { Platform } from "react-native";

const HomeViewController = ({navigation}) => {
  
  const B = (props) => <Text style={{fontWeight: "bold"}}>{props.children}</Text>
  const {user} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [duos, setDuos] = useState(false);

  useEffect(() => {
    firestore()
      .collection("Users")
      .doc(user.uid)
      .collection("invitations")
      .get()
      .then((res) => {
        const results = res.docs.map((x) => x.data());
        setData(results);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent={true}/>
        <Text h2 style={styles.title}>Your Feed</Text>
        <View style={styles.invitationscontainer}>
          <Text h4 style={styles.title1}>Invitations</Text>
          <ScrollView 
            pagingEnabled 
            showsHorizontalScrollIndicator={true} 
            horizontal={true} 
            snapToStart={true}
            contentContainerStyle={{flex: 1, justifyContent: "center", borderWidth:1, borderColor: "white", flexDirection: "row", marginBottom: "5%"}}>
            {data.map((item) => (
              <Card style={styles.card}>
                <Card.Content style={{alignItems: "center"}}>
                  <Avatar.Image size={65} source={{uri: item.imagePath}}/>
                  <Text 
                    adjustsFontSizeToFit 
                    numberOfLines={1}
                    style={
                            {
                              fontFamily: "PingFangHK-Light", 
                              textAlign: "center", 
                              marginTop: "5%", 
                              fontSize: 17.5
                            }
                          }>
                            {item.inviter}
                  </Text>
                  {item.isDuo==true &&
                    <Text style={{fontFamily: "PingFangHK-Semibold", color: "#f76f6d", marginBottom: "7%"}}>Duo</Text>
                  }

                  {item.accepted==false &&
                    <Icon name="thumbs-up" type="feather" color="#F52549" size={40}/> 
                  }
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>
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
                colors={['#7f00ff', '#e100ff', '#ffaf7b']}
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
  invitationscontainer: {
    flex:0.425, 
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
  title1: {
    marginTop: "2.5%",
    fontFamily: "PingFangHK-Medium",
    marginBottom: "2%",
    color: "#f76f6d",
    marginLeft: "5%",
  },
  button: {
    width: "80%",
    height: "75%",
  },  
  card: {
    height: "100%",
    width: "35%",
    borderRadius: 25,
    shadowRadius: 4,
    marginBottom: "5%",
    marginRight: "5%",
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
