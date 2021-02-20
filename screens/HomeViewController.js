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
        <Text h2 style={styles.title}>Invitations</Text>
        <View style={styles.invitationscontainer}>
          <ScrollView 
            pagingEnabled 
            showsHorizontalScrollIndicator={true}
            snapToStart={false}
            contentContainerStyle={{flex: 1, borderWidth:1, borderColor: "white", flexDirection: "column", marginBottom: "5%"}}>
            {data.map((item) => (
              <Card style={styles.card}>
                <Card.Content style={{marginLeft: "4%", marginTop: "5%", flexDirection: "row"}}>
                    <View style={{flexDirection: "column", justifyContent: "center"}}>
                      <Avatar.Image size={65} source={{uri: item.imagePath}}/>
                      <Text 
                        adjustsFontSizeToFit 
                        numberOfLines={1}
                        style={
                                {
                                  fontFamily: "PingFangHK-Light",
                                  marginTop: "5%", 
                                  fontSize: 20
                                }
                              }>
                                {item.inviter}
                      </Text>
                      {item.isDuo==true &&
                        <Text style={{fontFamily: "PingFangHK-Semibold", color: "#f76f6d", marginBottom: "7%"}}>Duo</Text>
                      }
                    </View>

                    <View style={{flexDirection: "column", justifyContent: "flex-end", marginLeft: "5%"}}>
                      <Button mode="outlined" style={{marginBottom: "20%", width: "200%"}} labelStyle={{color: "green"}}>Accept</Button>
                      <Button mode="outlined" style={{width:"200%"}} labelStyle={{color: "red"}}>Decline</Button>
                    </View>
                  {item.acc}
                  
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
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
    flex:0.95, 
    borderWidth:1, 
    borderRadius:25, 
    marginTop: "5%", 
    borderColor: "white",
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
    height: "35%",
    width: "100%",
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
