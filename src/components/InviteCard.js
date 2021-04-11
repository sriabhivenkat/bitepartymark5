import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "galio-framework";
import { Card, Avatar } from "react-native-paper";
import { GradientButton } from "./";

export const InviteCard = ({ onAccept, onReject, invite }) => (
  <View style={styles.container}>
    <Card style={[styles.card, { marginBottom: 20 }]} elevation={1}>
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
  },
  buttonStyle: {
    minWidth: 150,
    marginVertical: 10,
  },
});
