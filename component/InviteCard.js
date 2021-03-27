import React  from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "galio-framework";
// import { Button } from "react-native-paper";
import { Card, Avatar } from "react-native-paper";
import GradientButton from "./GradientButton";
import { Button } from 'galio-framework';



const InviteCard = ({ onAccept, invite }) => 
  <Card style={[styles.card, { maxHeight: 250, marginBottom: 20 }]} elevation={1}>
    <Card.Content style={styles.innerCard}>
      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        <Avatar.Image size={65} source={{ uri: invite.imagePath }} />
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
          {invite.inviter}
        </Text>
        {invite.isDuo && <Text style={styles.subText}>DUO</Text>}
        {!invite.isDuo && <Text style={styles.subText}>GROUP</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <GradientButton style={styles.buttonStyle}> 
            Accept
        </GradientButton>
        <GradientButton style={styles.buttonStyle} outline> 
            Decline
        </GradientButton>
      </View>
      {invite.acc}
    </Card.Content>
  </Card>;


export default InviteCard;

const styles = StyleSheet.create({
  card: {
    // height: "35%",
    // width: "100%",
    borderRadius: 15,
    shadowRadius: 2,
    marginHorizontal: 20,
    padding: 10
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
  innerCard: {flexDirection: "row", justifyContent: 'space-between' },
  subText: {
    fontFamily: "PingFangHK-Semibold",
    color: "#f76f6d",
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
