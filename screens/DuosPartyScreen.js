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

function Card({ data }) {
  return (
    <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
      <View>
        <Text style={styles.cardsText2}>{data.text}</Text>
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
  const [party, setParty] = useState();

  const { partyID } = route.params;

  const partyRef = firebase.firestore().collection("Parties");

  var count = -1; // wtf?

  // derived data...
  const { restaurants, participants } = party;

  const hasCompletedSwiping =
    party && participants.map(({ uidvalue }) => uidvalue).includes(user.uid);

  // subscribe to current party data, unsubscribe on unmount
  useEffect(() => {
    const unsubscribe = partyRef.doc(partyID).onSnapshot(
      (snapshot) => setParty(snapshot.data()),
      (err) => console.error(err)
    );
    return () => unsubscribe();
  }, [partyID]);


  // replace with real remote data fetching
  //   useEffect(() => {
  //     const refVal = firebase.firestore().collection("Parties").doc(partyID);
  //     refVal
  //       .get()
  //       .then(function (doc) {
  //         if (doc.exists) {
  //           console.log("Document data:", doc.data());
  //           const { restaurants } = doc.data();
  //           console.log(restaurants);
  //           setData(restaurants);
  //         } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log("Error getting document:", error);
  //       });

  //     firestore()
  //       .collection("Parties")
  //       .doc(partyID)
  //       .onSnapshot(onResult3, onError);
  //   }, []);

  //   function onResult3(QuerySnapshot) {
  //     const refVal = firestore().collection("Parties").doc(partyID);
  //     const doc = refVal.get();
  //     refVal
  //       .get()
  //       .then(function (querySnapshot) {
  //         if (querySnapshot.exists) {
  //           const { restaurants } = doc.data();
  //           console.log(restaurants);
  //           setData(restaurants);
  //         } else {
  //           // doc.data() will be undefined in this case
  //           console.log("No such document!");
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log("Error getting document:", error);
  //       });
  //   }

  //   function onError(error) {
  //     console.error(error);
  //   }


  

  function handleYes(card) {
    console.log(card);
    const refVal = firebase.firestore().collection("Parties").doc(partyID);
    refVal
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          const { restaurants } = doc.data();
          console.log(restaurants);
          restaurants[count]["yesCount"] += 1;
          restaurants[count]["totalSwipes"] += 1;
          firestore().collection("Parties").doc(partyID).update({
            restaurants: restaurants,
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    count += 1; // what the fuck???
    console.log("Count is", count);
    return true; // returnfalse if you wi
  }

  function handleNo(card) {
    const refVal = firebase.firestore().collection("Parties").doc(partyID);
    refVal
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          const { restaurants } = doc.data();
          console.log(restaurants);
          restaurants[count]["totalSwipes"] += 1;
          firestore().collection("Parties").doc(partyID).update({
            restaurants: restaurants,
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    count += 1;
    return true;
  }

  return (
    // <View style={styles.container}>
    //   {data ? (
    //     <SwipeCards
    //       cards={data.map((x) => ({
    //         text: x.nameR,
    //         backgroundColor: "#fcfcfc",
    //         address: x.address,
    //         city: x.city,
    //         state: x.state,
    //         zip: x.zip,
    //         yesCount: x.yesCount,
    //         cuisine: x.cuisine,
    //       }))}
    //       renderCard={(cardData) => <Card data={cardData} />}
    //       keyExtractor={(cardData) => String(cardData.text)}
    //       renderNoMoreCards={() => (
    //         <Button onPress={() => navigation.navigate("test", { partyID })}>
    //           See Results
    //         </Button>
    //       )}
    //       handleYup={handleYes}
    //       handleNope={handleNo}
    //       stack={true}
    //       dragY={false}
    //     />
    //   ) : (
    //     <StatusCard text="No more cards..." />
    //   )}
    // </View>
    <></>
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
