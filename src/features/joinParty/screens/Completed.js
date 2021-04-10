import React, { useContext, useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Text } from "galio-framework";
import { SafeAreaView } from "react-native";
import { FlatList, StatusBar, Dimensions } from "react-native";
import MemberCard from "components/MemberCard";
import LinearGradient from "react-native-linear-gradient";
import { Avatar } from "react-native-paper";
import { Button } from "react-native-paper";
import { Divider } from "react-native-elements";
import { useParty, usePartyMembers } from "lib";

const Completed = ({ navigation, route }) => {
  const { partyID } = route.params;
  const { party } = useParty(partyID);
  const { partyMembers } = usePartyMembers(partyID);

  const currentWinner = party.winner
    ? party.winner
    : party.restaurants &&
      party.restaurants.sort((a, b) => b.matches - a.matches)[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ height: 50 }} />

        <View style={{ flex: 0.4 }}>
          <View style={{ height: 60 }}>
            <Text
              h3
              style={{ fontFamily: "PingFangHK-Medium", textAlign: "center" }}
            >
              {party.winner ? "Winner" : "Running Winner"}
            </Text>
          </View>
          {party.restaurants && (
            <View
              style={{
                flex: 0.3,
                justifyContent: "center",
                paddingVertical: 100,
              }}
            >
              <Text h3 style={{ textAlign: "center", color: "#ee0979" }}>
                {currentWinner.name}
              </Text>
            </View>
          )}
          <Divider />

          <View style={{ height: 60 }}>
            <Text
              h3
              style={{ fontFamily: "PingFangHK-Medium", textAlign: "center" }}
            >
              Party Stats
            </Text>
          </View>

          <FlatList
            data={partyMembers}
            style={{ paddingTop: 5 }}
            snapToInterval={Dimensions.get("window").width}
            decelerationRate="fast"
            indicatorStyle="black"
            renderItem={({ item }) => <MemberCard data={item} />}
            keyExtractor={(item) => item.docId}
          />
        </View>
        <View style={{ height: 40 }} />

        {/* <Text>{JSON.stringify(party.restaurants, null, 2)}</Text> */}
        {/* {winner1 &&
                <Image source={require('../images/waitingPic.png')} >

                <Text h3 style={{ color: "#f76f6d", fontFamily: "PingFangHK-Medium" }}>{winner1.nameR} Selected!</Text>
                </Image>
            }
            {!winner1 &&
             <Image source={require('../images/waitingPic.png')} >
                <Text h3 style={{ color: "#f76f6d", fontFamily: "PingFangHK-Medium" }}>Keep waiting!</Text>
            </Image>} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Completed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    justifyContent: "center",
  },
  card: {
    borderRadius: 25,
    shadowRadius: 2,
    marginHorizontal: 20,
    width: Dimensions.get("window").width - 20 * 2,
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
  buttonStyle: {
    minWidth: 150,
    marginVertical: 20,
  },
});
