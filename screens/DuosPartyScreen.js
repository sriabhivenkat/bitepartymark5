import React, { useContext, useState, useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../navigation/AuthProvider.js";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { Avatar } from "react-native-paper";
import SwipeCards from "react-native-swipe-cards-deck";
import Geolocation from "@react-native-community/geolocation";
import LinearGradient from "react-native-linear-gradient";
import { Alert } from "react-native";
import { matches } from "lodash";

function Card({ data }) {
  return (
    <View style={[styles.card, { backgroundColor: "#fcfcfc" }]}>
      <View>
        <Text style={styles.cardsText2}>{data.name}</Text>
        <Text style={styles.cardsText3}>{data.address} </Text>
        <Text style={styles.cardsText3}>{data.city + "," + data.state}</Text>
        <Text style={styles.cardsText4}>{data.cuisine}</Text>
        {data.cuisine.includes("American") && (
          <Image
            source={require("../images/american_image.png")}
            style={styles.images}
          />
        )}
        {data.cuisine.includes("Restaurant") && (
          <Image
            source={require("../images/frenchfry.png")}
            style={styles.images}
          />
        )}
      </View>
    </View>
  );
}

function StatusCard({ text }) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

const DuosPartyScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const [party, setParty] = useState({});
  const [selections, setSelection] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  const { partyID } = route.params;

  const partyRef = firebase.firestore().collection("Parties").doc(partyID);
  const partyMemberRef = partyRef.collection("members").doc(user.uid);

  // derived data...r
  const { restaurants } = party;

  // const hasCompletedSwiping =
  //   party && participants.map(({ uidvalue }) => uidvalue).includes(user.uid);

  // subscribe to current party data, unsubscribe on unmount
  useEffect(() => {
    const unsubscribe = partyRef.onSnapshot(
      (snapshot) => setParty(snapshot.data()),
      (err) => console.error(err)
    );
    return () => unsubscribe();
  }, [partyID]);

  useEffect(() => console.log(JSON.stringify(selections, null, 2)), [
    selections,
  ]);


  // handle swiping complete
  useEffect(() => {
    (async () => {
      try {
        if (Object.keys(selections).length == restaurants?.length) {
          const data = (await partyRef.get()).data();
          console.log(data)
          const updatedData = data.restaurants.map((item) => ({
            ...item,
            matches: item.matches + selections[item.id],
          }));
          console.log(data)
          console.log(updatedData)
          await partyRef.set({restaurants: updatedData})
          await partyMemberRef.set({status: 'complete'})
          navigation.navigate("test", { partyID })
        }
      } catch (error) {
        console.error(error)
      }
    })();
  }, [selections]);

  // redirect if swiping is already done
  useEffect(() => {
    (async () => {
      try {
        const { status } = (await partyMemberRef.get()).data();
        if (status == "complete") navigation.navigate("test", { partyID });
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    })();
  });

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
      {!isLoading &&
        <SwipeCards
          cards={restaurants}
          renderCard={(item) => <Card data={item} />}
          keyExtractor={(item) => item.id}
          handleYup={handleYes}
          handleNope={handleNo}
          stack={true}
          dragY={false}
        />
      }
      {/* // ) : (
      //   <StatusCard text="No more cards..." />
      // )} */}
    </View>
  );
};

export default DuosPartyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginTop: 27,
    justifyContent: "flex-start",
    alignItems: "center",
    textShadowColor: "#585858",
    width: 400,
    height: 750,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#5C42FF",
  },
  cardsText2: {
    fontSize: 50,
    display: "flex",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "20%",
    fontFamily: "PingFangHK-Medium",
  },
  cardsText3: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "200",
    fontFamily: "PingFangHK-Medium",
  },
  cardsText4: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "300",
    marginTop: 5,
    fontFamily: "PingFangHK-Medium",
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
});
