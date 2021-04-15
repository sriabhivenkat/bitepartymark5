import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FAB, Chip } from "react-native-paper";
import SwipeCards from "react-native-swipe-cards-deck";
import LinearGradient from "react-native-linear-gradient";
import { RestarauntCard } from "components";
import { useParty } from "lib";
import Swiper from "react-native-deck-swiper";

import { DeckSwiper, Block } from "galio-framework";

const Swiping = ({ navigation, route }) => {
  const [selections, setSelection] = useState({});
  const { partyID } = route.params;
  const { party, partyMember, partyMeta, addPartySelections } = useParty(
    partyID
  );
  const swiperRef = useRef(null);
  const hasNavigated = useRef(false);

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

  // const handleComplete = () => {
  //   addPartySelections(selections)
  //     // .then(() => navigation.replace("joinParty/completed", { partyID }))
  //     .catch((err) => console.error(err));
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View justifyContent="center" alignItems="center">
        <Image
          style={{ width: 100, height: 75, alignItems: "center" }}
          source={require("assets/images/headerlogo.png")}
        />
      </View>
      {/* <View style={styles.container}> */}
      {/* {!partyMeta.isLoading && partyMember && (
        <DeckSwiper
          components={party.restaurants.map((item) => (
            // <View backgroundColor="red">
            <RestarauntCard data={item} />
            // </View>
          ))}
        />
      )} */}
      {/* </View> */}
      {/* <View style={styles.container}> */}
      {!partyMeta.isLoading && partyMember && (
        // <SwipeCards
        //   // ref={swiperRef}
        //   cards={party.restaurants}
        //   renderCard={(item) => <RestarauntCard data={item} />}
        // keyExtractor={(item) => item.id}
        //   handleYup={handleYes}
        //   handleNope={handleNo}
        //   stack={true}
        //   dragY={false}
        //   // showYup={false}
        //   // showNope={false}
        // />
        <Swiper
          backgroundColor="#fff"
          marginTop={150}
          marginBottom={20}
          cardVerticalMargin={0}
          // onSwipedAll={handleComplete}
          verticalSwipe={false}
          disableBottomSwipe
          disableTopSwipe
          useViewOverflow={false}
          keyExtractor={(item) => item.id}
          onSwipedLeft={(idx) => handleNo(party.restaurants[idx])}
          onSwipedRight={(idx) => handleYes(party.restaurants[idx])}
          // onSwiped={() => this.onSwiped("general")}
          // onSwipedLeft={() => this.onSwiped("left")}
          // onSwipedRight={() => this.onSwiped("right")}
          // onSwipedTop={() => this.onSwiped("top")}
          // onSwipedBottom={() => this.onSwiped("bottom")}
          // onTapCard={this.swipeLeft}
          cards={party.restaurants}
          // cardIndex={this.state.cardIndex}
          // cardVerticalMargin={80}
          renderCard={(item) => <RestarauntCard data={item} key={item.id} />}
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
});
