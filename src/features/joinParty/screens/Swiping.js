import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FAB, Chip } from "react-native-paper";
import SwipeCards from "react-native-swipe-cards-deck";
import LinearGradient from "react-native-linear-gradient";
import { RestarauntCard } from "components";
import { Text } from "galio-framework";
import { useParty } from "lib";
import Swiper from "react-native-deck-swiper";
import { Modal, Portal, Provider } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

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
  };

  const handleSwipeUp = (item) => {
    setInfoVisible(true);
    setModalData(item);
  };
  const containerStyle = {
    flex: 0.95,
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

  return (
    <SafeAreaView style={styles.container}>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={containerStyle}
          >
            <Image
              source={{ uri: modalData.image_url }}
              style={[styles.image, { marginTop: 10 }]}
            />
            {/* <Text>{JSON.stringify(modalData, null, 2)}</Text> */}
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
});
