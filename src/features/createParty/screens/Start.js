import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text } from "galio-framework";
import TouchableScale from "react-native-touchable-scale";
import { ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { startImages } from "../startImages";
import { useInvites } from "lib/invites.js";
import { Alert } from "react-native";
import { useUser } from "lib";
import { GradientButton, PhoneInput } from "components";
import { Modal, Portal, Provider } from "react-native-paper";
import { Appbar, Button, Divider } from "react-native-paper";
import { Input } from "galio-framework";
import { logoHeaderOptions } from "../../../components";
import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import firestore from "@react-native-firebase/firestore";
import { HeaderComp } from "../../../components/Header";
import { getUserLocation, createRandom, useRandom, useParty } from "lib";
import Geocoder from "react-native-geocoding";

const Start = ({ navigation }) => {
  const hour = new Date().getHours();
  const { invites, rejectInvite, acceptInvite } = useInvites();
  const { user } = useUser();
  const acceptedInvites = invites?.filter((item) => item.status == "accepted");
  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;

  const [phoneNumber, setPhoneNumber] = useState("");
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["0%", "100%"], []);
  const [radius, setRadius] = useState(5);
  const [count, setCount] = useState(10);
  const [filters, setFilters] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [price, setPrice] = useState([]);
  const [longName, setName] = useState("");
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [showOpen, setShowOpen] = useState(true);
  const [time, setTime] = useState(new Date());

  // const onChange = (event, selectedTime) => {
  //   const currentDate = selectedTime || time;
  //   setTime(currentDate);
  //   // console.log(time);
  // };

  Geocoder.init("AIzaSyBudsRFHgcT7lqUV3xQ9oiM0MquRynmGzI", { language: "en" });
  useEffect(() => {
    const main = async () => {
      const position = await getUserLocation();
      console.log(position);
      Geocoder.from(position[0], position[1])
        .then((json) => {
          var addressComponent = json.results[4].formatted_address;
          console.log(addressComponent);
          setName(addressComponent);
        })
        .catch((error) => console.warn(error));
    };
    main();
  }, []);

  const [partyId, setPartyId] = useState(Math.random().toString(36).substring(7))
  const [selectionval, setSelectionVal] = useState("");
  //passing data back from changelocation screen


  const { createParty } = useParty(partyId);

  useEffect(() => {
    const main = async () => {
      const position = await getUserLocation();
      setCurrentLat(position[0]);
      setCurrentLong(position[1]);
      Geocoder.from(currentLat, currentLong)
        .then((json) => {
          var addressComponent = json.results[4].formatted_address; // new commen
          console.log(addressComponent);
          setName(addressComponent);
        })
        .catch((error) => console.warn(error));
    };
    main();
  }, [currentLat, currentLong]);

  const startParty = async () => {
    try {
      navigation.navigate("joinParty", {
        screen: "joinParty/swiping",
        params: { partyID: partyId },
      });

      let loc;
      if (selectionval.length == 0) {
        loc = await getUserLocation();
      } else {
        const res = await Geocoder.from(selectionval);
        const data = res.results[0].geometry.location;
        loc = [data.lat, data.lng];
      }
      const id = await createParty(selectedFriends, {
        loc,
        count,
        radius,
        filters,
        price,
        time,
        showOpen,
        restrictions,
        autoResolve: !link,
      });
    } catch (err) {
      Alert.alert(
        "No matches!",
        "We couldn't find anything that matched your filters. Try again with less restrictive filters",
        [
          {
            text: "Ok",
            onPress: () =>
              navigation.navigate("createParty/filters", {
                partyID: partyId,
                selectedFriends,
              }),
          },
        ]
      );
      console.error(err);
    }
  };







  const isSmall = height < 700;
  return (
    <SafeAreaView style={styles.container}>

      <StatusBar barStyle="dark-content" />

      {!user && (
        <View height={height} width={width} style={{ justifyContent: 'center', alignItems: 'center' }}>


        </View>


      )}
      {user && (
        <HeaderComp
          isHomeScreen={true}
          name={user?.firstName}
          height={height}
          navigation={navigation}
        />
      )}
      {user && (<Divider style={{ height: 1.5 }} />)}

      {acceptedInvites?.length != 0 && user && (
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <GradientButton
            onPress={() =>
              navigation.navigate("joinParty", {
                screen: "joinParty/swiping",
                params: { partyID: acceptedInvites[0].docID },
              })
            }
            style={{
              width: "90%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3.5 },
              shadowOpacity: 0.5,
              shadowRadius: 2.5,
            }}
            innerStyle={{
              borderRadius: 14,
            }}
          >
            Resume your active party!
          </GradientButton>
        </View>
      )}
      {acceptedInvites?.length != 0 && !user?.phoneNumber && user && (
        <GradientButton
          outline
          style={{
            width: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3.5 },
            left: 20,
            marginTop: 50,
          }}
          innerStyle={{
            borderRadius: 14,
          }}
          textStyle={{
            color: "black",
          }}
          onPress={() => bottomSheetRef.current.expand()}
        >
          Verify phone number!
        </GradientButton>
      )}
      {acceptedInvites?.length === 0 && !user?.phoneNumber && user && (
        <GradientButton
          outline
          style={{
            width: "90%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3.5 },
            left: 20,
            marginTop: 50,
            bottom: 40,
          }}
          innerStyle={{
            borderRadius: 14,
          }}
          textStyle={{
            color: "black",
          }}
          onPress={() => bottomSheetRef.current.expand()}
        >
          Verify phone number!
        </GradientButton>
      )}
      {acceptedInvites?.length != 0 && user && (
        <TouchableOpacity
          style={[
            styles.image,
            {
              marginTop: 50,
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 1,
              shadowRadius: 4,
            },
          ]}
          onPress={() => {
            if (acceptedInvites?.length == 0) {
              navigation.navigate("createParty/selectFriends");
            } else {
              Alert.alert(
                "You have an active Party!",
                "Complete it before starting a new one!"
              );
            }
          }}
          Component={TouchableScale}
          tension={100}
          activeScale={0.95}
        >
          <ImageBackground
            source={startImages.find(({ end }) => hour < end).image}
            style={styles.image}
            borderRadius={15}
            marginHorizontal={20}
            marginBottom={15}
            blurRadius={5}
          >
            <LinearGradient
              style={styles.image}
              marginHorizontal={20}
              marginBottom={15}
              locations={[0.5, 1]}
              // start={{ x: 0, y: 0 }}
              // end={{ x: 0, y: 1 }}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
            >
              <View style={styles.textContainer}>
                <Text
                  h2
                  style={{
                    fontFamily: "Kollektif",
                    fontWeight: "800",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Let's Party
                </Text>
                <Text
                  h5
                  style={{
                    fontFamily: "Kollektif",
                    color: "#f76f6d",
                    textAlign: "center",
                  }}
                >
                  Start partying with friends!
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      )}
      {acceptedInvites?.length === 0 && user && (
        <TouchableOpacity
          style={[styles.image, { marginTop: 10 }]}
          onPress={() => {
            if (acceptedInvites?.length == 0) {
              navigation.navigate("createParty/selectFriends");
            } else {
              Alert.alert(
                "You have an active Party!",
                "Complete it before starting a new one!"
              );
            }
          }}
          Component={TouchableScale}
          tension={100}
          activeScale={0.95}
        >
          <ImageBackground
            source={startImages.find(({ end }) => hour < end).image}
            style={styles.image}
            borderRadius={15}
            marginHorizontal={20}
            marginBottom={15}
            blurRadius={5}
          >
            <LinearGradient
              style={styles.image}
              marginHorizontal={20}
              marginBottom={15}
              locations={[0.5, 1]}
              // start={{ x: 0, y: 0 }}
              // end={{ x: 0, y: 1 }}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
            >
              <View style={styles.textContainer}>
                <Text
                  h2
                  style={{
                    fontFamily: "Kollektif",
                    fontWeight: "800",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Let's Party
                </Text>
                <Text
                  h5
                  style={{
                    fontFamily: "Kollektif",
                    color: "#f76f6d",
                    textAlign: "center",
                  }}
                >
                  Start partying with friends!
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>





      )}

      {acceptedInvites?.length === 0 && user && (
        <TouchableOpacity
          style={[styles.image, { marginTop: 10 }]}
          onPress={() => {
            startParty()
          }}
          Component={TouchableScale}
          tension={100}
          activeScale={0.95}
        >
          <ImageBackground
            source={startImages.find(({ end }) => hour < end).image}
            style={styles.image}
            borderRadius={15}
            marginHorizontal={20}
            marginBottom={15}
            blurRadius={5}
          >
            <LinearGradient
              style={styles.image}
              marginHorizontal={20}
              marginBottom={15}
              locations={[0.5, 1]}
              // start={{ x: 0, y: 0 }}
              // end={{ x: 0, y: 1 }}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
            >
              <View style={styles.textContainer}>
                <Text
                  h2
                  style={{
                    fontFamily: "Kollektif",
                    fontWeight: "800",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Random Mode
                </Text>
                <Text
                  h5
                  style={{
                    fontFamily: "Kollektif",
                    color: "#f76f6d",
                    textAlign: "center",
                  }}
                >
                  Start partying with friends!
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>





      )}



      {/* {acceptedInvites?.length > 0 && (
        <TouchableOpacity
          style={styles.image}
          onPress={() =>
            alert(
              "You have an active party! Please finish that before staring a new one"
            )
          }
          Component={TouchableScale}
          tension={100}
          activeScale={0.95}
        >
          <ImageBackground
            source={startImages.find(({ end }) => hour < end).image}
            style={styles.image}
            borderRadius={15}
            marginHorizontal={20}
            marginBottom={15}
            blurRadius={5}
          >
            <LinearGradient
              style={styles.image}
              marginHorizontal={20}
              marginBottom={15}
              locations={[0.5]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
            >
              <View style={styles.textContainer}>
                <Text
                  h2
                  style={{
                    fontFamily: "Kollektif",
                    fontWeight: "800",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Let's Party
                </Text>
                <Text
                  h5
                  style={{
                    fontFamily: "Kollektif",
                    fontWeight: "bold",
                    color: "#f76f6d",
                    textAlign: "center",
                  }}
                >
                  Start partying with friends!
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      )} */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enableHandlePanningGesture={false}
        handleComponent={null}
      >
        <BottomSheetView style={styles.contentContainer}>
          <TouchableWithoutFeedback
            accessible={false}
            onPress={() => Keyboard.dismiss()}
          >
            <View style={{ paddingHorizontal: 20 }}>
              <StatusBar barStyle="dark-content" />
              {user?.uidvalue && !user?.phoneNumber && (
                <View>
                  <Text
                    style={[
                      {
                        marginTop: 80,
                        // left: 15,
                        marginBottom: 10,
                        fontSize: 30,
                        fontFamily: "Kollektif",
                      },
                    ]}
                  >
                    Verify phone number
                  </Text>
                  <View style={{ alignItems: "center" }}>
                    <PhoneInput
                      value={phoneNumber}
                      onChangeFormattedText={(phone) => setPhoneNumber(phone)}
                    />
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 20,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "Kollektif",
                        color: "lightgray",
                      }}
                    >
                      {/* SMS will be sent for verification, and standard messaging
                      and data rates may apply */}
                    </Text>
                  </View>

                  <View style={{ alignItems: "center" }} marginTop={0}>
                    {phoneNumber.length > 5 && (
                      <GradientButton innerStyle={{ paddingVertical: 15 }} onPress={handlePhone}>
                        Verify!
                      </GradientButton>
                    )}
                  </View>
                  <View style={{ alignItems: "center" }} marginTop={15}>
                    <GradientButton
                      onPress={() => bottomSheetRef.current?.close()}
                      innerStyle={{ paddingVertical: 15 }}
                      textStyle={{ color: "#000" }}
                      outline
                    >
                      Dismiss
                    </GradientButton>
                  </View>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    alignContent: "flex-end",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  input: {
    color: "white",
  },
  title: {
    padding: "5%",
    marginTop: "2.5%",
    marginBottom: "2.5%",
    fontFamily: "Kollektif",
    color: "#f76f6d",
    textAlign: "center",
  },
  button: {
    // marginTop: 20,
    // height: 37,
    width: "100%",
    // backgroundColor: "#F76F6D",
    // borderRadius: 15,
  },
  card: {
    height: "35%",
    width: "85%",
    borderRadius: 25,
    shadowRadius: 10,
    marginBottom: "5%",
    backgroundColor: "white",
  },
  image: {
    flex: 3,
    //resizeMode: "cover",
    justifyContent: "flex-end",
    margin: 0,
    borderRadius: 15,
  },
  textContainer: {
    marginBottom: "10%",
  },
  bottom: {
    backgroundColor: "white",
    elevation: 0,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  input1: {
    // width: "90%",
    height: 45,
    // marginTop: 20,
    // marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
  },
  //   bottomSheetontainer: {
  //     flex: 1,
  //     backgroundColor: "#fff",
  // },
});