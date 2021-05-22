import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "galio-framework";
import { Card, Avatar } from "react-native-paper";
import { GradientButton } from "./";
import moment from "moment";

export const InviteCard = ({ onAccept, onReject, invite }) => (
  <View style={styles.container}>
    <Card style={[styles.card, { marginBottom: 20 }]} elevation={1}>
      <Card.Content style={styles.innerCard}>
        <View flexDirection="row" flex={1} alignItems="center">
          <Avatar.Image
            size={65}
            source={{ uri: invite.imagePath }}
            style={{ marginRight: 15 }}
          />
          <View flex={1}>
            <Text
              style={[styles.text, { fontSize: 24 }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {invite.inviter}
            </Text>
            <Text
              style={[styles.text, { fontSize: 20, marginTop: 5 }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {moment(invite.timestamp.toDate()).fromNow()}
            </Text>
          </View>
        </View>

        <View width={100}>
          <GradientButton
            onPress={() => onAccept(invite)}
            containerStyle={{ marginBottom: 5 }}
          >
            Accept
          </GradientButton>
          <GradientButton
            onPress={() => onReject(invite)}
            outline
            containerStyle={{ marginTop: 5 }}
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
    // padding: 10,
    // width: "100%",
    // width: Dimensions.get("window").width - 20 * 2.1,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  innerCard: { flexDirection: "row", justifyContent: "space-between", flex: 1 },
  subText: {
    fontFamily: "PingFangHK-Semibold",
    color: "#f76f6d",
    // marginBottom: "7%",
  },
  text: {
    fontFamily: "Kollektif",
  },
  text2: {
    fontFamily: "PingFangHK-Light",
    // marginTop: "5%",
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "500",
  },
  buttonStyle: {
    minWidth: 50,
    marginVertical: 10,
  },
});
