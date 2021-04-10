import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
// import { AuthContext } from "navigation/AuthProvider.js";
// import firestore, { firebase } from "@react-native-firebase/firestore";
import { FAB } from "react-native-paper";
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
      <Text style={styles.cuisineText}>{data.cuisine}</Text>
    </View>
    <View>
      <Text style={styles.addressText}>{data.address} </Text>
      <Text style={styles.addressText}>{data.city + "," + data.state}</Text>
    </View>
  </LinearGradient>
);

const Swiping = ({ navigation, route }) => {
  // const { user } = useContext(AuthContext);
  // const [party, setParty] = useState({});
  const [selections, setSelection] = useState({});
  // const [isLoading, setIsLoading] = useState(true);

  const { partyID } = route.params;
  const { party, partyMeta, addPartySelections } = useParty(partyID);

  const swiperRef = useRef(null);

  // alert(JSON.stringify(partyID, null, 2))

  // const partyRef = firebase.firestore().collection("Parties").doc(partyID);
  // const partyMemberRef = partyRef.collection("members").doc(user.uid);

  // console.log({ partyID, uid: user.uid });

  // derived data...r
  // const { restaurants } = party;

  // const hasCompletedSwiping =
  //   party && participants.map(({ uidvalue }) => uidvalue).includes(user.uid);

  // subscribe to current party data, unsubscribe on unmount
  // useEffect(() => {
  //   const unsubscribe = partyRef.onSnapshot(
  //     (snapshot) => setParty(snapshot.data()),
  //     (err) => console.error(err)
  //   );
  //   return () => unsubscribe();
  // }, [partyID]);

  useEffect(() => console.log(JSON.stringify(selections, null, 2)), [
    selections,
  ]);

  // handle swiping complete
  useEffect(() => {
    addPartySelections(selections)
      .then(() => navigation.replace("joinParty/completed", { partyID }))
      .catch((err) => console.error(err));
  }, [selections]);

  // // redirect if swiping is already done
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       // console.log(JSON.stringify(partyMemberRef., null, 2))
  //       const data = (await partyMemberRef.get()).data();
  //       // console.log({data});
  //       const status = data.status;
  //       if (status == "complete")
  //         navigation.replace("joinParty/completed", { partyID });
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // });

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

  console.log({ party, err: partyMeta.partyError });

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(party, null, 2)}</Text> */}
      {!partyMeta.isLoading && (
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
    justifyContent: "space-around",
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
    paddingVertical: 70,
    paddingHorizontal: 10,
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
    // flex: 1,
    width: "70%",
    flexDirection: "row",
    // backgroundColor: "blue",
    // marginBottom: 50,
    justifyContent: "space-around",
    position: "relative",
    bottom: 70,
  },
});
