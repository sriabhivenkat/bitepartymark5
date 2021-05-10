import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
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

const Swiping = ({ navigation, route, data }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [selections, setSelection] = useState({});
  const { partyID } = route.params;
  const { party, partyMember, partyMeta, addPartySelections } = useParty(
    partyID
  );
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "75%"], []);

  const hasNavigated = useRef(false);

  const [visible, setVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  // // // handle swiping complete
  useEffect(() => {
    addPartySelections(selections)
      // .then(() => navigation.replace("joinParty/completed", { partyID }))
      .catch((err) => console.error(err));
  }, [selections]);

  useEffect(() => {
    if (partyMember?.status == "complete" && !hasNavigated.current) {
      hasNavigated.current = true;
      navigation.replace("joinParty/completed", { partyID });
    }
  }, [partyMember]);

  const handleYes = (item) => {
    setSelection((val) => ({
      ...val,
      [item.id]: 1,
    }));
  };

  const handleNo = (item) => {
    setSelection((val) => ({
      ...val,
      [item.id]: 0,
    }));
  };

  const handleTap = (item) => {
    setVisible(true);
    setModalData(item);
    console.log(modalData);
  };

  const handleSwipeUp = (item) => {
    setInfoVisible(true);
    setModalData(item);
  };
  const containerStyle = {
    flex: 0.95,
    backgroundColor: "white",
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

  return (
    <SafeAreaView style={styles.container}>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={containerStyle}
          >
            {/* <Image
              source={{ uri: modalData.image_url }}
              style={[styles.image, { marginTop: 10 }]}
            /> */}
            <Text>{JSON.stringify(modalData, null, 2)}</Text>
          </Modal>
        </Portal>
        <Portal>
          <Modal
            visible={infoVisible}
            onDismiss={() => setInfoVisible(false)}
            contentContainerStyle={containerStyle}
          >
            <Text h2>chortle my balls</Text>
          </Modal>
        </Portal>
        <View justifyContent="center" alignItems="center">
          <Image
            style={{ width: 100, height: 75, alignItems: "center" }}
            source={require("assets/images/headerlogo.png")}
          />
        </View>

        {!partyMeta.isLoading && partyMember && (
          <Swiper
            backgroundColor="#fff"
            borderWidth={2}
            borderWidth="black"
            marginTop={150}
            marginBottom={20}
            cardVerticalMargin={0}
            // onSwipedAll={handleComplete}
            verticalSwipe={true}
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
            renderCard={(item) => <RestarauntCard data={item} key={item.id} />}
            containerStyle={{
              position: "absolute",
              backgroundColor: "white",
              marginBottom: "10%",
            }}
            // onSwipedAll={this.onSwipedAllCards}
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
        <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
          <BottomSheetScrollView style={styles.bottomSheetContainer}>
            <View style={{top: 10, left: 22, marginBottom: 30, marginTop: 10}}>
                <Text h4 style={{fontFamily: "Kollektif", color: "#f76f6d"}}>Address</Text>
                <Text style={{fontFamily: "Kollektif", top: 5, fontSize: 25}}>{modalData.location.address1}</Text>
                <Text style={{fontFamily: "Kollektif", top: 5, fontSize: 25}}>{modalData.location.city+", "+modalData.location.state+" "+modalData.location.zip_code}</Text>
              </View>
              <Divider />
              <View style={{top: 10, left: 22, marginBottom: 22.5, }}>
                <Text h4 style={{fontFamily: "Kollektif", color: "#f76f6d"}}>Hours</Text>
                <Text style={{fontFamily: "Kollektif", top: 5, fontSize: 25}}>{modalData.location.address1}</Text>
                <Text style={{fontFamily: "Kollektif", top: 5, fontSize: 25}}>{modalData.location.city+", "+modalData.location.state+" "+modalData.location.zip_code}</Text>
              </View>
              <Divider />
              <View style={{top: 10, left: 22, marginBottom: 22.5, marginTop: 10}}>
                <Text h4 style={{fontFamily: "Kollektif", color: "#f76f6d"}}>Phone</Text>
                <Text style={{fontFamily: "Kollektif", top: 5, fontSize: 25}}>{modalData.display_phone}</Text>
              </View>
              <Divider />
              <View style={{top: 10, left: 22, marginBottom: 22.5, marginTop: 10}}>
                <Text h4 style={{fontFamily: "Kollektif", color: "#f76f6d"}}>Filters</Text>
                <View flexDirection="row" flexWrap="wrap-reverse" style={{marginTop: 5}}>
                  {modalData.categories.map((item, i) => (
                    <Chip
                      key={i}
                      textAlign="center"
                      marginRight={10}
                      flex={0}
                      marginVertical={2}
                      style={{ justifyContent: "center", alignItems: "center", marginTop: "1.5%",}}
                      textStyle={{ fontSize: 17, fontWeight: "bold", fontFamily: "Kollektif" }}
                    >
                      {item.title}
                    </Chip>
                  ))}
                </View>
                <View flexDirection="row" flexWrap="wrap-reverse" >
                  {modalData.price != " " && 
                    <Chip
                      textAlign="center"
                      marginRight={10}
                      flex={0}
                      marginVertical={2}
                      style={{ justifyContent: "center", alignItems: "center", marginTop: "1.5%",}}
                      textStyle={{ fontSize: 17, fontWeight: "bold", fontFamily: "Kollektif" }}
                    >
                      {modalData.price}
                    </Chip>
                  }
                </View>
              </View>
          </BottomSheetScrollView>
        </BottomSheet>
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
