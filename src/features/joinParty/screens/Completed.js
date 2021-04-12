import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { Text } from "galio-framework";
import { FlatList, Dimensions } from "react-native";
import MemberCard from "components/MemberCard";
import { Divider } from "react-native-elements";
import { usePartyData, usePartyMembers } from "lib";
import { TitleText, SubtitleText } from "components";

const Completed = ({ route }) => {
  const { partyID } = route.params;
  // const { party, partyMeta } = useParty(partyID);
  const { partyMembers } = usePartyMembers(partyID);

  const { party } = usePartyData(partyID);

  const currentWinner = party?.winner
    ? party?.winner
    : party?.restaurants &&
      party?.restaurants.sort((a, b) => b.matches - a.matches)[0];

  // console.log({ party: party.winner, partyMembers });

  // useEffect(() => {
  //   console.error(partyMeta.error);
  // }, [partyMeta]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <View style={{ height: 50 }} />

          <View style={{ flex: 0.4 }}>
            {/* <Button onPress={() => setFoo()} title="Press Me!" /> */}
            <View>
              <TitleText>
                {party?.winner ? "Winner" : "Running Winner"}
              </TitleText>
              {!party.winner && (
                <SubtitleText>
                  Your friends are still voting, but here's what's in the
                  lead...
                </SubtitleText>
              )}
            </View>
            {party && (
              <View
                style={{
                  flex: 0.2,
                  justifyContent: "center",
                  paddingVertical: 50,
                  marginVertical: 50,
                  borderWidth: 3,
                  borderRadius: 25,
                  paddingHorizontal: 15,
                  borderColor: "#ee0979",
                  // paddingVertical: 20,
                }}
              >
                <Text h3 style={{ textAlign: "center", color: "#ee0979" }}>
                  {currentWinner?.name}
                </Text>
              </View>
            )}
            {/* <Divider /> */}
            <TitleText>Members</TitleText>

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
      </View>
    </SafeAreaView>
  );
};

export default Completed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    // alignItems: "center",
    // justifyContent: "center",
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
    // justifyContent: "center",
    // alignItems: "center",
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
