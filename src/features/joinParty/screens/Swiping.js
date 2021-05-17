import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
// import Clipboard from "@react-native-community/clipboard";
import SwipeCards from "react-native-swipe-cards-deck";
import LinearGradient from "react-native-linear-gradient";
import { RestarauntCard } from "components";
import { Text } from "galio-framework";
import { useParty } from "lib";
import Swiper from "react-native-deck-swiper";
import { Modal, Portal, Provider, Divider, Chip } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { DeckSwiper, Block } from "galio-framework";
import { Alert } from "react-native";
import { LoadingRestarauntCard } from "../../../components";

const Swiping = ({ navigation, route, data }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [selections, setSelection] = useState({});
  const { partyID } = route.params;
  const { party, partyMember, partyMeta, addPartySelections } =
    useParty(partyID);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "75%"], []);

  const hasNavigated = useRef(false);

  const [visible, setVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  // const [modalData, setModalData] = useState({});
  const [cardIdx, setCardIdx] = useState(0);

  // // // handle swiping complete
  useEffect(() => {
    addPartySelections(selections)
      // .then(() => navigation.replace("joinParty/completed", { partyID }))
      .catch((err) => console.error(err));
  }, [selections]);

  useEffect(() => {
    if (partyMember?.status == "complete" && !hasNavigated.current) {
      hasNavigated.current = true;
      navigation.navigate("joinParty/completed", { partyID });
    }
  }, [partyMember]);

  const handleYes = (item) => {
    setCardIdx((val) => val + 1);
    setSelection((val) => ({
      ...val,
      [item.id]: 1,
    }));
  };

  const handleNo = (item) => {
    setCardIdx((val) => val + 1);
    setSelection((val) => ({
      ...val,
      [item.id]: 0,
    }));
  };

  const handleTap = (item) => {
    setVisible(true);
    // setModalData(item);
    // console.log(modalData);
  };

  const handleSwipeUp = (item) => {
    setInfoVisible(true);
    // setModalData(item);
  };
  const containerStyle = {
    flex: 0.85,
    backgroundColor: "black",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    width: windowWidth,
    height: windowHeight,
  };

  // const handleComplete = () => {
  //   addPartySelections(selections)
  //     // .then(() => navigation.replace("joinParty/completed", { partyID }))
  //     .catch((err) => console.error(err));
  // };

  let hasLoaded = party && party.restaurants && partyMember;
  // hasLoaded = false;

  console.log({ hasLoaded });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Provider>
        {/* <Portal>
          <Modal
            visible={infoVisible}
            onDismiss={() => setInfoVisible(false)}
            contentContainerStyle={containerStyle}
          >
            <Text h2>chortle my balls</Text>
          </Modal>
        </Portal> */}
        <View justifyContent="center" alignItems="center">
          <Image
            style={{ width: 100, height: 75, alignItems: "center" }}
            source={require("assets/images/headerlogo.png")}
          />
        </View>

        {hasLoaded && (
          <>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={() => setVisible(false)}
                contentContainerStyle={containerStyle}
                animationType="fade"
                transparent={true}
              >
                <Image
                  source={{ uri: party?.restaurants[cardIdx]?.image_url }}
                  style={[styles.image, { marginTop: 10 }]}
                />
                {/* <Text>{JSON.stringify(party?.restaurants[cardIdx], null, 2)}</Text> */}
              </Modal>
            </Portal>
            <Swiper
              marginTop={80}
              marginBottom={Dimensions.get("screen").height < 700 ? 5 : 70}
              // cardVerticalMargin={0}
              // onSwipedAll={handleComplete}
              verticalSwipe={false}
              disableTopSwipe
              disableBottomSwipe
              useViewOverflow={false}
              keyExtractor={(item) => item.id}
              onSwipedLeft={(idx) => handleNo(party.restaurants[idx])}
              onSwipedRight={(idx) => handleYes(party.restaurants[idx])}
              onSwipedTop={(idx) => handleSwipeUp(party.restaurants[idx])}
              // onSwiped={() => this.onSwiped("general")}
              // onSwipedLeft={() => this.onSwiped("left")}
              // onSwipedRight={() => this.onSwiped("right")}
              // onSwipedTop={() => this.onSwiped("top")}
              // onSwipedBottom={() => this.onSwiped("bottom")}
              onTapCard={(idx) => handleTap(party.restaurants[idx])}
              cards={party.restaurants}
              // cardIndex={this.state.cardIndex}
              // cardVerticalMargin={80}
              renderCard={(item) => (
                <RestarauntCard data={item} key={item.id} />
              )}
              containerStyle={{
                position: "absolute",
                backgroundColor: "white",
                marginBottom: "10%",
              }}
              onSwipedAll={() => {
                addPartySelections(selections, true)
                  .then(() =>
                    navigation.replace("joinParty/completed", { partyID })
                  )
                  .then(() => (hasNavigated.current = true));
              }}
              stackSize={party.restaurants.length}
              // stackAnimationTension={100}
              // stackAnimationFriction={1}
              stackScale={0}
              stackSeparation={0}
              // stackAnimationTension={10}
              overlayLabels={{
                bottom: {
                  title: "BLEAH",
                  style: {
                    label: {
                      backgroundColor: "black",
                      borderColor: "black",
                      color: "white",
                      borderWidth: 1,
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                },
                left: {
                  title: "NOPE",
                  style: {
                    label: {
                      backgroundColor: "black",
                      borderColor: "black",
                      color: "white",
                      borderWidth: 1,
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      marginTop: 30,
                      marginLeft: -30,
                    },
                  },
                },
                right: {
                  title: "LIKE",
                  style: {
                    label: {
                      backgroundColor: "black",
                      borderColor: "black",
                      color: "white",
                      borderWidth: 1,
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      marginTop: 30,
                      marginLeft: 30,
                    },
                  },
                },
              }}
              animateOverlayLabelsOpacity
              animateCardOpacity
              // swipeBackCard
            >
              <></>
            </Swiper>
            <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
              <BottomSheetScrollView style={styles.bottomSheetContainer}>
                <View
                  style={{ top: 10, left: 22, marginBottom: 30, marginTop: 10 }}
                >
                  <Text
                    h4
                    style={{ fontFamily: "Kollektif", color: "#f76f6d" }}
                  >
                    Address
                  </Text>
                  <TouchableOpacity
                  // onPress={() =>
                  //   Clipboard.setString(
                  //     party?.restaurants[cardIdx]?.location.address1
                  //   )
                  // }
                  >
                    <Text
                      style={{ fontFamily: "Kollektif", top: 5, fontSize: 20 }}
                    >
                      {party?.restaurants[cardIdx]?.location.address1}
                    </Text>
                    <Text
                      style={{ fontFamily: "Kollektif", top: 5, fontSize: 20 }}
                    >
                      {party?.restaurants[cardIdx]?.location.city +
                        ", " +
                        party?.restaurants[cardIdx]?.location.state +
                        " " +
                        party?.restaurants[cardIdx]?.location?.zip_code}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Divider />
                <View
                  style={{
                    top: 10,
                    left: 22,
                    marginBottom: 22.5,
                    marginTop: 10,
                  }}
                >
                  <Text
                    h4
                    style={{ fontFamily: "Kollektif", color: "#f76f6d" }}
                  >
                    Phone
                  </Text>
                  <Text
                    style={{ fontFamily: "Kollektif", top: 5, fontSize: 20 }}
                  >
                    {party?.restaurants[cardIdx]?.display_phone}
                  </Text>
                </View>
                <Divider />
                <View
                  style={{
                    top: 10,
                    left: 22,
                    marginBottom: 22.5,
                    marginTop: 10,
                  }}
                >
                  <Text
                    h4
                    style={{ fontFamily: "Kollektif", color: "#f76f6d" }}
                  >
                    Filters
                  </Text>
                  <View
                    flexDirection="row"
                    flexWrap="wrap-reverse"
                    style={{ marginTop: 5 }}
                  >
                    {party?.restaurants[cardIdx]?.categories.map((item, i) => (
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
                    {party?.restaurants[cardIdx]?.price != null && (
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
                        {party?.restaurants[cardIdx]?.price}
                      </Chip>
                    )}
                  </View>
                </View>
              </BottomSheetScrollView>
            </BottomSheet>
          </>
        )}
        {!hasLoaded && (
          <Swiper
            marginTop={80}
            marginBottom={Dimensions.get("screen").height < 700 ? 5 : 70}
            // cardVerticalMargin={0}
            // onSwipedAll={handleComplete}
            verticalSwipe={true}
            disableTopSwipe
            disableBottomSwipe
            // useViewOverflow={false}
            // keyExtractor={(item) => item.id}
            // onSwipedLeft={(idx) => handleNo(party.restaurants[idx])}
            // onSwipedRight={(idx) => handleYes(party.restaurants[idx])}
            // onSwipedTop={(idx) => handleSwipeUp(party.restaurants[idx])}
            // // onSwiped={() => this.onSwiped("general")}
            // // onSwipedLeft={() => this.onSwiped("left")}
            // // onSwipedRight={() => this.onSwiped("right")}
            // // onSwipedTop={() => this.onSwiped("top")}
            // // onSwipedBottom={() => this.onSwiped("bottom")}
            cards={[{ id: 0 }]}
            // cardIndex={this.state.cardIndex}
            // cardVerticalMargin={80}
            renderCard={(item) => (
              <LoadingRestarauntCard data={item} key={item.id} />
            )}
            containerStyle={{
              position: "absolute",
              backgroundColor: "white",
              marginBottom: "10%",
            }}
            onSwipedAll={() => {
              addPartySelections(selections, true).then(() =>
                navigation.navigate("joinParty/completed", { partyID })
              );
            }}
            stackSize={1}
            // stackAnimationTension={100}
            // stackAnimationFriction={1}
            stackScale={0}
            stackSeparation={0}
            // // stackAnimationTension={10}

            // animateOverlayLabelsOpacity
            // animateCardOpacity
          />
        )}
        {/* </View> */}
        {/* {!partyMeta.isLoading && partyMember && (
            <DeckSwiper
              components={party.restaurants.map((item) => (
                <RestarauntCard data={item} />
              ))}
            />
          )} */}
        {/* <View style={styles.buttonContainer}>
            <FAB
              style={[styles.fab, { backgroundColor: "red" }]}
              large
              icon="close-thick"
              onPress={() => {
                swiperRef.current._forceLeftSwipe();
                handleNo(swiperRef.current.state.card);
              }}
            />
            <FAB
              style={[styles.fab, { backgroundColor: "green" }]}
              large
              icon="check-bold"
              onPress={() => {
                swiperRef.current._forceRightSwipe();
                handleYes(swiperRef.current.state.card);
              }}
            />
          </View> */}
      </Provider>
    </SafeAreaView>
  );
};

export default Swiping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
    // paddingBottom: 60,
    // paddingVertical: 15,
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 15,
  },
  bottomSheetContainer: {
    backgroundColor: "white",
  },
});
