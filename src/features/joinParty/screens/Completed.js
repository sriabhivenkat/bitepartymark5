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
import { Divider, Chip, Modal } from "react-native-paper";
import {
  usePartyData,
  usePartyMembers,
  useParty,
  useUser,
  useAsyncStorage,
} from "lib";
import { TitleText, SubtitleText } from "components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ImageBackground } from "react-native";
import { GradientButton, PartyCard, RestarauntCard } from "../../../components";
import LinearGradient from "react-native-linear-gradient";
import { Alert } from "react-native";
import InAppReview, { RequestInAppReview } from "react-native-in-app-review";
import uuid from "react-native-uuid";
import ImagePicker from "react-native-image-crop-picker";

import firestore, { firebase } from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import CustomRate from "components/CustomRate";

const Completed = ({ route, navigation }) => {
  const { partyID } = route.params;
  const { resolveParty, endParty, leaveParty } = useParty(partyID);
  const { partyMembers } = usePartyMembers(partyID);
  const { user } = useUser();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "80%"], []);

  const { party } = usePartyData(partyID);

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [rating, setRating] = useState(1);

  const [ratingHistory, setRatingHistory] = useAsyncStorage("ratingHistory", {
    count: 0,
    total: 0,
  });

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const show2Modal = () => setModal2Visible(true);
  const hide2Modal = () => setModal2Visible(false);

  const currentWinner = party?.winner
    ? party?.winner
    : party?.restaurants &&
    party?.restaurants.sort((a, b) => b.matches - a.matches)[0];

  // links for opening maps
  const url = Platform.select({
    ios: `maps:0,0?q=${currentWinner?.location.display_address}`,
    android: `geo:0,0?q=${currentWinner?.location.display_address}`,
  });

  const handleClick = () => {
    console.log({ ratingHistory });

    const shouldRate = ratingHistory.count == 4 && ratingHistory.total >= 4 * 3;

    if (!shouldRate) {
      setModalVisible(false);
      setModal2Visible(true);
      return; // don't run the rest of the function
    } else {
      setRatingHistory((old) => ({
        total: old.total + rating,
        count: old.total + 1,
      }));
    }

    InAppReview.isAvailable();

    // trigger UI InAppreview
    InAppReview.RequestInAppReview().then((hasFlowFinishedSuccessfully) => {
      // when return true in android it means user finished or close review flow
      console.log("InAppReview in android", hasFlowFinishedSuccessfully);

      // when return true in ios it means review flow lanuched to user.
      console.log(
        "InAppReview in ios has lanuched successfully",
        hasFlowFinishedSuccessfully
      );

      // 1- you have option to do something ex: (navigate Home page) (in android).
      // 2- you have option to do something,
      // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

      // 3- another option:
      if (hasFlowFinishedSuccessfully) {
        // do something for ios
        // do something for android
        setModalVisible(false);
        setModal2Visible(true);
      }
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        // console.log(image);
        // setImage(image.path);
        uploadMenu(image.path);

        Alert.alert(
          "Submit another?",
          "If the menu has multiple pages, please submit them individually",

          [
            {
              text: "Nope!",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Yes!",
              onPress: () => openCamera(),
            },
          ]
        );
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const uploadMenu = async (imagepath) => {
    let filename = uuid.v4();

    try {
      await storage().ref(filename).putFile(imagepath);
      const storageRef = firebase.storage().ref(filename);
      storageRef.getDownloadURL().then((url) => {
        // firestore().collection("Users").doc(user.uidvalue).update({
        //   // My Profile
        //   imageUrl: url,
        // });

        firestore()
          .collection("Menu Images")
          .doc(currentWinner?.location.address1)
          .set({
            restaurantName: currentWinner?.name,
            address: currentWinner?.location.address1,
            zip: currentWinner?.location.zip_code,
          });

        firestore()
          .collection("Menu Images")
          .doc(currentWinner?.location.address1)
          .collection("Menu")
          .doc()
          .set({
            imageUrl: url,
            submittedBy: user.uidvalue
          });
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView backgroundColor="#fff" flex={1}>
      <StatusBar barStyle="dark-content" />
      <View flex={1}>
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

              {/* <Modal
                style={{ padding: 30 }}
                visible={modalVisible}
                onDismiss={hideModal}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    alignItems: "center",
                    borderRadius: 15,
                  }}
                  padding={20}
                >
                  <Text style={{ fontWeight: "600", fontSize: 20, marginBottom: 10 }}>
                    Rate your party!
                  </Text> */}
              {/* <Rating
                    type="custom"
                    ratingImage={starImg}
                    ratingCount={5}
                    imageSize={50}
                    onFinishRating={setRatingVal}
                    ratingColor="#F76F6D"
                    startingValue="0"
                    jumpValue="1"
                  />
                  <AirbnbRating
                    selectedColor="#F76F6D"
                    reviewColor="#F76F6D"
                    starImage={starImg}
                    starContainerStyle={{}}
                  ></AirbnbRating> */}
              {/* 
                  <CustomRate rating={rating} setRating={setRating} />
                  <GradientButton
                    containerStyle={{ marginTop: 20 }}
                    onPress={() => handleClick()}
                  >
                    <Text>Submit</Text>
                  </GradientButton>
                </View>
              </Modal> */}

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
                      onPress={() => show2Modal()}
                    >
                      Next
                </GradientButton>
                  </View>
                )}

              <Modal
                style={{ padding: 30, }}
                visible={modal2Visible}
                onDismiss={hide2Modal}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    alignItems: "center",
                    borderRadius: 15,
                    height: 225,
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{ fontWeight: "600", fontSize: 15, marginTop: 10, fontFamily: 'Kollektif' }}>
                    Would you like to submit a photo of the menu?
                  </Text>

                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => openCamera()}
                  >
                    <Ionicons name="camera" size={80} />
                    <Text>Add Image of Menu</Text>
                  </TouchableOpacity>

                  <GradientButton
                    containerStyle={{ marginTop: 10, paddingHorizontal: 10, marginBottom: 10 }}
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
                    <Text>Leave Party</Text>
                  </GradientButton>


                </View>

              </Modal>
            </>
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
                  onPress={() => show2Modal()}
                >
                  Next
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
                style={{ top: 10, left: 22, marginBottom: 30, marginTop: 10 }}
              >
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
              <View alignItems="center" justifyContent="center">
                <GradientButton
                  containerStyle={{
                    position: "relative",
                    width: "95%",
                    top: 15,
                  }}
                  innerStyle={{ paddingVertical: 15 }}
                  textStyle={{ fontSize: 22 }}
                  onPress={() => {
                    Linking.openURL(url); //idk comment
                  }}
                >
                  Take me here!
              </GradientButton>
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
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
