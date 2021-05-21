import React, { useRef, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  StatusBar,
  Linking,
  Platform,
} from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { FlatList, Dimensions } from "react-native";
import MemberCard from "components/MemberCard";
import { Divider, Chip } from "react-native-paper";
import { usePartyData, usePartyMembers, useParty, useUser } from "lib";
import { TitleText, SubtitleText } from "components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ImageBackground } from "react-native";
import { GradientButton, PartyCard, RestarauntCard } from "../../../components";
import LinearGradient from "react-native-linear-gradient";
import { Alert } from "react-native";

const Completed = ({ route, navigation }) => {
  const { partyID } = route.params;
  const { resolveParty, endParty, leaveParty } = useParty(partyID);
  const { partyMembers } = usePartyMembers(partyID);
  const { user } = useUser();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "80%"], []);

  const { party } = usePartyData(partyID);

  const currentWinner = party?.winner
    ? party?.winner
    : party?.restaurants &&
      party?.restaurants.sort((a, b) => b.matches - a.matches)[0];

  // links for opening maps
  const url = Platform.select({
    ios: `maps:0,0?q=${currentWinner?.location.display_address}`,
    android: `geo:0,0?q=${currentWinner?.location.display_address}`,
  });

  return (
    <SafeAreaView backgroundColor="#fff" flex={1}>
      <StatusBar barStyle="dark-content" />
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
            <GradientButton onPress={() => bottomSheetRef.current.expand()}>
              View Restaurant Details
            </GradientButton>
          </ImageBackground>
        </View>
      )}

      <View style={styles.container}>
        {party && party.winner && (
          <>
            <View marginTop={10}>
              {/* <TitleText
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{ color: "#F76F6D", fontSize: 60, textAlign: "center" }}
              >
                Cheers!
              </TitleText> */}
              {/* <SubtitleText
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
              </SubtitleText> */}
              <TitleText
                style={{
                  marginTop: 10,
                  marginBottom: 15,
                  textAlign: "center",
                  fontSize: 25,
                }}
              >
                Restaurant Chosen!
              </TitleText>
              {/* <View backgroundColor="#00000050" height={1} marginBottom={15} /> */}
            </View>
            <View flex={1} marginTop={25} position="relative" top={30}>
              <RestarauntCard
                style={{ flexShrink: 0 }}
                data={currentWinner}
                compact
              />
            </View>
            <GradientButton
              containerStyle={{
                position: "relative",
                top: -5,
              }}
              innerStyle={{ paddingVertical: 15 }}
              textStyle={{ fontSize: 22 }}
              onPress={() => bottomSheetRef.current.expand()}
            >
              View Restaurant Details
            </GradientButton>
          </>
        )}
        {party &&
          partyMembers &&
          party.winner &&
          user &&
          user.uidvalue == party.admin && (
            <View alignItems="center">
              <GradientButton
                // containerStyle={{ maxWidth: 200, marginBottom: 10 }}
                containerStyle={{
                  // position: "relative",
                  // top: -5,
                  marginTop: 10,
                }}
                innerStyle={{ paddingVertical: 15 }}
                textStyle={{ fontSize: 22 }}
                outline
                onPress={() =>
                  endParty()
                    .then(
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "home" }],
                      })
                    )
                    .catch((err) => console.error(err))
                }
              >
                End Party
              </GradientButton>
            </View>
          )}
        {party &&
          partyMembers &&
          party.winner &&
          user &&
          user.uidvalue != party.admin && (
            <View alignItems="center">
              <GradientButton
                // containerStyle={{ maxWidth: 200, marginBottom: 10 }}
                containerStyle={{
                  // position: "relative",
                  // top: -5,
                  marginTop: 10,
                }}
                innerStyle={{ paddingVertical: 15 }}
                textStyle={{ fontSize: 22 }}
                outline
                onPress={() =>
                  Alert.alert(
                    "Leave Party?",
                    "If you leave before the host ends the party, it may affect the results, ",
                    [
                      {
                        text: "Nope!",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "Leave",
                        onPress: () =>
                          leaveParty()
                            .then(
                              navigation.reset({
                                index: 0,
                                routes: [{ name: "home" }],
                              })
                            )
                            .catch((err) => console.error(err)),
                      },
                    ]
                  )
                }
              >
                Leave Party
              </GradientButton>
            </View>
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
            {/* <LinearGradient
              style={{
                position: "absolute",
                bottom: 0,
                width: Dimensions.get("screen").width,
                height: 20,
              }}
              colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
              pointerEvents={"none"}
            /> */}
          </>
        )}
      </View>
      {party &&
        partyMembers &&
        !party.winner &&
        user &&
        user.uidvalue == party.admin && (
          <View alignItems="center">
            <GradientButton
              containerStyle={{ maxWidth: 200, marginBottom: 10 }}
              onPress={() => resolveParty().catch((err) => console.error(err))}
            >
              Pick Winner!
            </GradientButton>
          </View>
        )}

      {party &&
        partyMembers &&
        !party.winner &&
        user &&
        user.uidvalue != party.admin && (
          <View alignItems="center">
            <GradientButton
              containerStyle={{ maxWidth: 200, marginBottom: 10 }}
              onPress={() =>
                Alert.alert(
                  "Leave Party?",
                  "This will remove you from the party with no way to get back!",
                  [
                    {
                      text: "Nope!",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Leave",
                      onPress: () =>
                        leaveParty()
                          .then(() =>
                            navigation.reset({
                              index: 0,
                              routes: [{ name: "home" }],
                            })
                          )
                          .catch((err) => console.error(err)),
                    },
                  ]
                )
              }
            >
              Leave Party!
            </GradientButton>
          </View>
        )}
      {party && party.winner && <View height={30} />}

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
        handleComponent={null}
      >
        <BottomSheetScrollView>
          <View style={{ top: 10, left: 22, marginBottom: 30, marginTop: 10 }}>
            <Text h4 style={{ fontFamily: "Kollektif", color: "#f76f6d" }}>
              Address
            </Text>
            <Text style={{ fontFamily: "Kollektif", top: 5, fontSize: 25 }}>
              {currentWinner?.location.address1}
              {/* <Text>{JSON.stringify(currentWinner, null, 2)}</Text> */}
            </Text>
            <Text style={{ fontFamily: "Kollektif", top: 5, fontSize: 25 }}>
              {currentWinner?.location.city +
                ", " +
                currentWinner?.location.state +
                " " +
                currentWinner?.location?.zip_code}
            </Text>
          </View>
          <Divider />
          <View
            style={{ top: 10, left: 22, marginBottom: 22.5, marginTop: 10 }}
          >
            <Text h4 style={{ fontFamily: "Kollektif", color: "#f76f6d" }}>
              Phone
            </Text>
            <Text style={{ fontFamily: "Kollektif", top: 5, fontSize: 25 }}>
              {currentWinner?.display_phone}
            </Text>
          </View>
          <Divider />
          <View
            style={{ top: 10, left: 22, marginBottom: 22.5, marginTop: 10 }}
          >
            <Text h4 style={{ fontFamily: "Kollektif", color: "#f76f6d" }}>
              Filters
            </Text>
            <View
              flexDirection="row"
              flexWrap="wrap-reverse"
              style={{ marginTop: 5 }}
            >
              {currentWinner?.categories.map((item, i) => (
                <Chip
                  key={i}
                  textAlign="center"
                  marginRight={10}
                  flex={0}
                  marginVertical={2}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1.5%",
                  }}
                  textStyle={{
                    fontSize: 17,
                    fontWeight: "bold",
                    fontFamily: "Kollektif",
                  }}
                >
                  {item.title}
                </Chip>
              ))}
            </View>
            <View flexDirection="row" flexWrap="wrap-reverse">
              {currentWinner?.price != null && (
                <Chip
                  textAlign="center"
                  marginRight={10}
                  flex={0}
                  marginVertical={2}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1.5%",
                  }}
                  textStyle={{
                    fontSize: 17,
                    fontWeight: "bold",
                    fontFamily: "Kollektif",
                  }}
                >
                  {currentWinner?.price}
                </Chip>
              )}
            </View>
          </View>
          <Divider />
          <View paddingHorizontal={20} height={80}>
            <GradientButton
              containerStyle={{
                position: "relative",
                // width: "95%",
                top: 15,
              }}
              innerStyle={{ paddingVertical: 15 }}
              textStyle={{ fontSize: 22 }}
              onPress={() => {
                Linking.openURL(url); //idk comme
              }}
            >
              Take me here!
            </GradientButton>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
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
