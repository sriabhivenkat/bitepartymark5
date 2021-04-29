import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "galio-framework";
import { Card, Avatar } from "react-native-paper";
import { GradientButton } from "./";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export const PartyCard = ({ invite = {}, onPress }) => {
  const navigation = useNavigation();
  return (
    <Card
      style={[styles.card, { maxHeight: 250, marginBottom: 20 }]}

    >

      <Card.Content style={styles.innerCard}>
        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
          <Avatar.Image
            size={65}
            source={{ uri: invite.imagePath }}
            style={{ marginTop: 8 }}
          />
          <View style={{ marginTop: 12 }}>
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
            // outline
            // bg="#fff"
            onPress={() =>
              navigation.navigate("joinParty", {
                screen: "joinParty/swiping",
                params: { partyID: invite.docID },
              })
            }
          >
            Go!
            </GradientButton>
        </View>
      </Card.Content>

    </Card>
  );
};

// export default PartyCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 25,
    shadowRadius: 2,
    width: Dimensions.get("window").width - 20 * 2,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  innerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  background: {
    flexDirection: "row",
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  subText: {
    fontFamily: "PingFangHK-Semibold",
    color: "#fff",
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
    minWidth: 70,
    marginVertical: 10,
  },
});
