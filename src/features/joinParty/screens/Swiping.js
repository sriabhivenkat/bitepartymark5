import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { FAB, Chip } from "react-native-paper";
import SwipeCards from "react-native-swipe-cards-deck";
import LinearGradient from "react-native-linear-gradient";
import { useParty } from "lib";

const Card = ({ data }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    colors={["#ee0979", "#f76f6d", "#ff6a00"]}
    style={[styles.background, styles.card]}
  >
    <View>
      <Text style={styles.titleText}>{data.name}</Text>
      <View
        flexDirection="row"
        marginVertical={15}
        flexWrap="wrap"
        justifyContent="center"
      >
        {data.categories.map((item, i) => (
          <Chip
            key={i}
            maxWidth={100}
            textAlign="center"
            marginHorizontal={10}
            marginVertical={5}
          >
            {item.title}
          </Chip>
        ))}
      </View>
      {/* <Text style={styles.cuisineText}>{data.cuisine}</Text> */}
    </View>
    <View>
      {data.location.display_address.map((item, i) => (
        <Text key={i} style={styles.addressText}>
          {item}
        </Text>
      ))}
    </View>
  </LinearGradient>
);

const Swiping = ({ navigation, route }) => {
  const [selections, setSelection] = useState({});
  const { partyID } = route.params;
  const { party, partyMember, partyMeta, addPartySelections } = useParty(
    partyID
  );
  const swiperRef = useRef(null);
  const hasNavigated = useRef(false);

  // handle swiping complete
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
    return true;
  };

  const handleNo = (item) => {
    setSelection((val) => ({
      ...val,
      [item.id]: 0,
    }));
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {!partyMeta.isLoading && partyMember && (
          <SwipeCards
            ref={swiperRef}
            cards={party.restaurants}
            renderCard={(item) => <Card data={item} />}
            keyExtractor={(item) => item.id}
            handleYup={handleYes}
            handleNope={handleNo}
            stack={true}
            dragY={false}
            showYup={false}
            showNope={false}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
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
      </View>
    </View>
  );
};

export default Swiping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    height: Dimensions.get("window").height - 400,
  },
  card: {
    // marginTop: 27,
    justifyContent: "space-between",
    alignItems: "center",
    textShadowColor: "#585858",
    width: Dimensions.get("window").width - 100,
    height: Dimensions.get("window").height - 400,
    // flexGrow: 0,
    borderRadius: 20,
    color: "#fff",
    paddingVertical: 50,
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 35,
    display: "flex",
    textAlign: "center",
    fontWeight: "400",
    // marginTop: "20%",
    fontFamily: "PingFangHK-Medium",
    color: "#fff",
    // position: "relative",
    // top: 0,
  },
  addressText: {
    fontSize: 21,
    textAlign: "center",
    fontWeight: "300",
    fontFamily: "PingFangHK-Medium",
    color: "#fff",
  },
  cuisineText: {
    fontSize: 21,
    textAlign: "center",
    // fontWeight: "300",
    marginTop: 5,
    fontFamily: "PingFangHK-Medium",
    color: "#fff",
    fontWeight: "300",
  },
  images: {
    display: "flex",
    alignItems: "center",
    margin: "auto",
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 200,
    width: 350,
  },
  buttonContainer: {
    width: "80%",
    flexDirection: "row",
    // backgroundColor: "blue",
    // marginBottom: 50,
    justifyContent: "space-around",
    // position: "relative",
    // bottom: 70,
    marginTop: 50,
  },
});
