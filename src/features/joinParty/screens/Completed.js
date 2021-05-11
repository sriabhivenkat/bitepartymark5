import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { FlatList, Dimensions } from "react-native";

import MemberCard from "components/MemberCard";
import { Divider } from "react-native-paper";
import { usePartyData, usePartyMembers } from "lib";
import { TitleText, SubtitleText } from "components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ImageBackground } from "react-native";
import { GradientButton, PartyCard, RestarauntCard } from "../../../components";
import LinearGradient from "react-native-linear-gradient";

const Completed = ({ route, navigation }) => {
  const { partyID } = route.params;
  // const { party, partyMeta } = useParty(partyID);
  const { partyMembers } = usePartyMembers(partyID);

  const { party } = usePartyData(partyID);

  const currentWinner = party?.winner
    ? party?.winner
    : party?.restaurants &&
      party?.restaurants.sort((a, b) => b.matches - a.matches)[0];

  return (
    <SafeAreaView backgroundColor="#fff" flex={1}>
      {party && !party?.winner && (
        <View>
          <ImageBackground
            style={{
              height: 230,
              width: Dimensions.get("screen").width,
              paddingHorizontal: 50,
              paddingVertical: 10,
              justifyContent: "space-around",
            }}
            source={{ uri: currentWinner?.image_url }}
          >
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "rgba(0,0,0,0.65)",
              }}
            />
            <View>
              <Text
                numberOfLines={2}
                adjustsFontSizeToFit
                style={[
                  styles.text,
                  {
                    color: "#fff",
                    fontSize: 50,
                    fontWeight: "700",
                    textAlign: "center",
                  },
                ]}
              >
                {currentWinner?.name}
              </Text>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[
                  styles.text,
                  {
                    color: "#fff",
                    fontSize: 25,
                    textAlign: "center",
                    marginTop: 5,
                  },
                ]}
              >
                is currently in the lead!
              </Text>
            </View>
            <GradientButton>View Restaurant Details</GradientButton>
          </ImageBackground>
        </View>
      )}

      <View style={styles.container}>
        {party && party.winner && (
          <>
            <View marginTop={10}>
              <TitleText
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{ color: "#F76F6D", fontSize: 60, textAlign: "center" }}
              >
                Cheers!
              </TitleText>
              <SubtitleText
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  position: "relative",
                  bottom: 10,
                }}
              >
                Restaraunt Chosen
              </SubtitleText>
            </View>
            <View flex={1} marginTop={25} position="relative" top={30}>
              <RestarauntCard style={{ flexShrink: 0 }} data={currentWinner} />
            </View>
            <GradientButton
              containerStyle={{
                position: "relative",
                top: -5,
              }}
              innerStyle={{ paddingVertical: 20 }}
              textStyle={{ fontSize: 22 }}
            >
              View Restaurant Details
            </GradientButton>
          </>
        )}

        {party && partyMembers && !party.winner && (
          <>
            <TitleText
              style={{
                marginTop: 20,
                marginBottom: 15,
                textAlign: "center",
                fontSize: 25,
              }}
            >
              Party Members
            </TitleText>
            <View backgroundColor="#00000050" height={1} marginBottom={15} />

            <ScrollView>
              {/* <Divider style={{ borderWidth: 0.8, marginBottom: 15 }} /> */}

              <FlatList
                data={partyMembers}
                style={{ paddingTop: 5 }}
                snapToInterval={Dimensions.get("window").width}
                decelerationRate="fast"
                indicatorStyle="black"
                renderItem={({ item }) => <MemberCard data={item} />}
                keyExtractor={(item) => item.docId}
              />
            </ScrollView>
            <LinearGradient
              style={{
                position: "absolute",
                bottom: 0,
                width: Dimensions.get("screen").width,
                height: 20,
              }}
              colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
              pointerEvents={"none"}
            />
          </>
        )}
      </View>
      <View justifyContent="center" alignItems="center" marginVertical={10}>
        <TouchableOpacity
          justifyContent="center"
          onPress={() => navigation.navigate({ name: "home" })}
        >
          <Ionicons name="home" size={25} />
        </TouchableOpacity>
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
    borderRadius: 15,
  },
  text: {
    fontFamily: "Kollektif",
  },
  subText: {
    fontFamily: "PingFangHK-Semibold",
    color: "#fff",
  },
  buttonStyle: {
    minWidth: 150,
    marginVertical: 20,
  },
});
