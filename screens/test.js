import React, { useContext, useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView} from "react-native";
import { Text } from "galio-framework";
import firestore, { firebase } from "@react-native-firebase/firestore";

const test = ({ navigation, route }) => {
  const [party, setParty] = useState({});
  const [members, setMembers] = useState([]);

  const { partyID } = route.params;

  const partyRef = firebase.firestore().collection("Parties").doc(partyID);

  useEffect(() => {
    const unsubscribe = partyRef.onSnapshot(
      (snapshot) => setParty(snapshot.data()),
      (err) => console.error(err)
    );
    return () => unsubscribe();
  }, [partyID]);

  useEffect(() => {
    const unsubscribe = partyRef.collection("members").onSnapshot(
      (snapshot) => setMembers(snapshot.docs.map((x) => x.data())),
      (err) => console.error(err)
    );
    return () => unsubscribe();
  }, [partyID]);

  // const [winner1, setWinner] = useState();
  // const [winnerName, setName] = useState()
  // const { partyID } = route.params;
  // useEffect(() => {
  //     const refVal = firestore().collection("Parties").doc(partyID);
  //     refVal.get().then(doc => {
  //         const { winner } = doc.data()

  //         setWinner(winner)
  //     })

  //     firestore()
  //         .collection("Parties")
  //         .doc(partyID)
  //         .onSnapshot(() => {
  //             const refVal = firebase.firestore().collection("Parties").doc(partyID);
  //             const doc =
  //                 refVal.get()
  //                     .then(doc => {
  //                         const { winner } = doc.data()
  //                         setWinner(winner)
  //                     }, () => console.error(err))
  //         })
  // }, [])

  // function onError(error) {
  //     console.error(error);
  //   }

  // function onResult3(QuerySnapshot) {
  //     const refVal = firebase.firestore().collection("Parties").doc(partyID);
  //     const doc = refVal.get()

  //     setWinner(doc.data().winner)

  //   }

  return (
    <View style={styles.container}>
    <ScrollView>
      <Text>{JSON.stringify(members, null, 2)}</Text>
      <Text>{JSON.stringify(party.restaurants, null, 2)}</Text>
      {/* {winner1 &&
                <Image source={require('../images/waitingPic.png')} >

                <Text h3 style={{ color: "#f76f6d", fontFamily: "PingFangHK-Medium" }}>{winner1.nameR} Selected!</Text>
                </Image>
            }
            {!winner1 &&
             <Image source={require('../images/waitingPic.png')} >
                <Text h3 style={{ color: "#f76f6d", fontFamily: "PingFangHK-Medium" }}>Keep waiting!</Text>
            </Image>} */}
    </ScrollView>
    </View>
  );
};

export default test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
