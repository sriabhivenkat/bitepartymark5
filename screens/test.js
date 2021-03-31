import React, { useContext, useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView} from "react-native";
import { Text } from "galio-framework";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native";

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

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={{height:50}}/>

      {members.map((item, i) =>  <Text key={i}>{`${item.handle}'s status: ${item.status}`}</Text>)}
     <View style={{height:40}}/>
      {party.restaurants && party.restaurants.sort((a, b) => b.matches - a.matches).map((item, i) => <>
        <Text key={i}>{`${item.name} | matches: ${item.matches}`}</Text> 
      </>)}
      {/* <Text>{JSON.stringify(party.restaurants.length, null, 2)}</Text> */}
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
    </SafeAreaView>
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
