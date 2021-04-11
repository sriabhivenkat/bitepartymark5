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
      elevation={1}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#ee0979", "#f76f6d", "#ff6a00"]}
        style={[styles.background]}
      >
        <Card.Content style={styles.innerCard}>
          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Avatar.Image
              size={65}
              source={{ uri: invite.imagePath }}
              style={{ marginBottom: 8 }}
            />
            {invite.isDuo && (
              <Text style={styles.subText}>{`DUO (${invite.docID})`}</Text>
            )}
            {!invite.isDuo && (
              <Text style={styles.subText}>{`GROUP (${invite.docID})`}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton
              style={styles.buttonStyle}
              outline
              bg="#fff"
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
      </LinearGradient>
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
    marginTop: "5%",
    fontSize: 20,
  },
  buttonStyle: {
    minWidth: 150,
    marginVertical: 10,
  },
});
