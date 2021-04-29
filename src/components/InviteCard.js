import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "galio-framework";
import { Card, Avatar } from "react-native-paper";
import { GradientButton } from "./";

export const InviteCard = ({ onAccept, onReject, invite }) => (

  <View style={styles.container}>
    <Card style={[styles.card, { marginBottom: 20 }]} elevation={1}>
      <Card.Content style={styles.innerCard}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignContent: 'center' }}>
          <Avatar.Image size={65} source={{ uri: invite.imagePath }} style={{ marginTop: 18 }} />
          <View style={{ marginTop: 18 }}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
              {invite.inviter}
            </Text>
            <View
              style={{ flexDirection: "row" }}
            >
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>
                {invite.timestamp.toDate().getMonth() + 1}/{invite.timestamp.toDate().getDate()} at
            </Text>
              {(invite.timestamp.toDate().getHours() + 12) % 12 == 0 && (
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text2}>
                  {invite.timestamp.toDate().getHours() % 12 + 12}:{invite.timestamp.toDate().getMinutes()}
                </Text>
              )}
              {(invite.timestamp.toDate().getHours() + 12) % 12 != 0 && (
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text2}>
                  {invite.timestamp.toDate().getHours() % 12}:{invite.timestamp.toDate().getMinutes()}
                </Text>
              )}
              {invite.timestamp.toDate().getHours() >= 12 && (
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text2}>
                  PM
                </Text>
              )}
              {invite.timestamp.toDate().getHours() < 12 && (
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text2}>
                  AM
                </Text>
              )}

            </View>


          </View>



        </View>

        <View style={styles.buttonContainer}>
          <GradientButton
            style={styles.buttonStyle}
            onPress={() => onAccept(invite)}
          >
            Accept
          </GradientButton>
          <GradientButton
            style={styles.buttonStyle}
            onPress={() => onReject(invite)}
            outline
          >
            Decline
          </GradientButton>
        </View>
      </Card.Content>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    // backgroundColor: "red",
    // flex: 1,
    // justifyContent: "center",
    // height: 10,
    // backgroundColor: "red",
    width: Dimensions.get("window").width - 20 * 2,
  },
  card: {
    borderRadius: 15,
    shadowRadius: 2,
    // flex: 1,
    // padding: 1,
    // marginHorizontal: 20,
    padding: 10,
    // width: "100%",
    // width: Dimensions.get("window").width - 20 * 2.1,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  innerCard: { flexDirection: "row", justifyContent: "space-between" },
  subText: {
    fontFamily: "PingFangHK-Semibold",
    color: "#f76f6d",
    // marginBottom: "7%",
  },
  text: {
    fontFamily: "PingFangHK-Light",
    // marginTop: "5%",
    fontSize: 20,
    marginLeft: 15,
    fontWeight: "500"
  },
  text2: {
    fontFamily: "PingFangHK-Light",
    // marginTop: "5%",
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "500"
  },
  buttonStyle: {
    minWidth: 50,
    marginVertical: 10,
  },
});
