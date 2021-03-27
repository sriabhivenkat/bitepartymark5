import React  from "react";
import { View, StyleSheet } from "react-native";

import { Text } from "galio-framework";
// import { Button } from "react-native-paper";
import { Card, Avatar } from "react-native-paper";
import GradientButton from "./GradientButton";
import { Button } from 'galio-framework';
import LinearGradient from "react-native-linear-gradient";



const PartyCard = ({ onAccept, invite }) => 
  <Card style={[styles.card, { maxHeight: 250, marginBottom: 20 }]} elevation={1}>
     <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#ee0979", "#f76f6d", "#ff6a00"]}
      style={[{
        minHeight: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    
      }, styles.background]}
    >
    <Card.Content style={styles.innerCard}>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Avatar.Image size={65} source={{ uri: invite.imagePath }} style={{marginBottom: 8}}/>
        {/* <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
          {invite.inviter}
        </Text> */}
        {invite.isDuo && <Text style={styles.subText}>DUO</Text>}
        {!invite.isDuo && <Text style={styles.subText}>GROUP</Text>}
      </View>

      <View style={styles.buttonContainer}>
        {/* <GradientButton style={styles.buttonStyle}> 
            Accept
        </GradientButton> */}
        <GradientButton style={styles.buttonStyle} outline bg="#fff"> 
            Go!
        </GradientButton>
      </View>
      {invite.acc}
    </Card.Content>
    </LinearGradient>
  </Card>;


export default PartyCard;

const styles = StyleSheet.create({
  card: {
    // height: "35%",
    // width: "100%",
    borderRadius: 25,
    shadowRadius: 2,
    marginHorizontal: 20,
    // borderRadius: 15,
    // padding: 10,
    // backgroundColor: 'red'
    // marginBottom: "5%",
    // marginRight: "5%",
  },
  buttonContainer: {
    // flexDirection: "column",
    // justifyContent: "flex-end",
    // backgroundColor:'red',
    // marginLeft: "5%",
    justifyContent: "center"
  },
  innerCard: {flexDirection: "row", justifyContent: 'space-between', width: "100%", paddingHorizontal: 25, paddingVertical: 25 },
  background: {flexDirection: "row", justifyContent: 'space-between'},
  subText: {
    fontFamily: "PingFangHK-Semibold",
    color: "#fff",
    marginBottom: "7%",
  },
  text: {
    fontFamily: "PingFangHK-Light",
    marginTop: "5%",
    fontSize: 20,
  },
  buttonStyle: {
    minWidth: 150,
    marginVertical: 10
  }
});
