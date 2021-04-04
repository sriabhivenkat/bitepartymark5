import React, { useContext, useState, useEffect } from "react";
import { View, Image, StyleSheet, ScrollView} from "react-native";
import {Text } from "galio-framework";
import {Card} from 'react-native-paper'
import firestore, { firebase } from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native";
import { FlatList, StatusBar, Dimensions} from "react-native";
import PartyCard from "../components/PartyCard.js";
import LinearGradient from "react-native-linear-gradient";
import { Avatar } from "react-native-paper";
import { Button } from 'react-native-paper';
import {Divider} from 'react-native-elements';


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


  const currentWinner = party.winner ?  party.winner : party.restaurants.sort(() => 0.5-Math.random()).sort((a, b) => b.matches - a.matches)[0]

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={{height:50}}/>
      <View style={{height: 60}}>
        <Text h3 style={{fontFamily: "PingFangHK-Medium", textAlign: "center"}}>Party Stats</Text>
      </View>
      <View style={{flex: 0.4}}>
      <FlatList
          data={members}
          style={{ paddingTop: 5}}
          snapToInterval={Dimensions.get('window').width}
          horizontal
          // persistentScrollbar
          // disableIntervalMomentum
          decelerationRate="fast"
          indicatorStyle="black"
          renderItem={({item}) => (
            <Card
              style={[styles.card, {maxHeight: 250, marginBottom: 20}]}
              elevation={1}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#ee0979", "#f76f6d", "#ff6a00"]}
                style={[styles.background]}
              >
                <Card.Content style={styles.innerCard}>
                  <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <View>
                    <Avatar.Image size={50} source={{uri: item.imageUrlPath}} style={{marginRight: "5%"}}/>
                      <Text p style={[styles.subText, {fontSize: 20, }]}>@{item.handle}</Text>
                      <Text style={[styles.subText, {fontSize: 15, fontWeight: "300"}]}>{item.firstName+" "+item.lastName}</Text>
                    </View>
                    <View style={[styles.buttonContainer, {flexDirection: "column"}]}>
                      {item.status==="complete" &&
                        <Button mode="contained" style={[styles.buttonStyle, {backgroundColor: "green", borderRadius: 25}]}>
                          Completed
                        </Button>
                      }
                      {item.status==="pending" &&
                        <Button mode="contained" style={[styles.buttonStyle, {backgroundColor: "#ffcc00", borderRadius: 25}]}>
                          Pending
                        </Button>
                      }
                    </View>
                  </View>
                </Card.Content>
              </LinearGradient>
            </Card>
          )}
          keyExtractor={(item) => item.docId}
        />
      </View>
      <Divider />
     <View style={{height:40}}/>
     <View style={{height: 60}}>
        <Text h3 style={{fontFamily: "PingFangHK-Medium", textAlign: "center"}}>{party.winner ? "Winner" : "Running Winner"}</Text>
     </View>
      {party.restaurants &&
        <View style={{flex:0.3, justifyContent: "center", paddingVertical: 100}}>
          <Text h3 style={{textAlign: "center", color: "#ee0979",}}>{currentWinner.name}</Text> 
        </View>
      }
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
  buttonContainer: {
    justifyContent: "center",
  },
  card: {
    borderRadius: 25,
    shadowRadius: 2,
    marginHorizontal: 20,
    width: Dimensions.get("window").width - 20 * 2,
  },
  innerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 25,
  },
  background: {
    flexDirection: "row",
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  subText: {
    fontFamily: "PingFangHK-Semibold",
    color: "#fff",
    // marginBottom: "7%",
  },
  buttonStyle: {
    minWidth: 150,
    marginVertical: 20,
  },
});
