import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StyleSheet, FlatList, StatusBar, Dimensions, View } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { Text } from "galio-framework";
import firestore from "@react-native-firebase/firestore";
import InviteCard from "../component/InviteCard";
import PartyCard from "../component/PartyCard.js";
import { SafeAreaView } from "react-native";

const HomeViewController = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [invites, setData] = useState([]);

  const partyCollection = firestore().collection("Parties");
  const inviteCollection = firestore()
    .collection("Users")
    .doc(user.uid)
    .collection("invitations");

  // subscribe to invites list, remove subscription on unmount
  useEffect(() => {
    const unsubscribe = inviteCollection.onSnapshot(
      (snapshot) => {
        const results = snapshot.docs.map((x) => ({ ...x.data(), id: x.id }));
        setData(results);
      },
      (err) => console.error(err)
    );
    return () => unsubscribe();
  }, []);

  const handleAccept = async (invite) => {
    try {
      // update user status in the party
      await partyCollection
        .doc(invite.docID)
        .collection("members")
        .doc(user.uid)
        .update({ status: "accepted" });
      // update my invite status
      await inviteCollection.doc(invite.id).update({
        status: "accepted",
      });

      navigation.navigate("DuosPartyScreen", {
        partyID: invite.docID,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text h2 style={[styles.title, { marginTop: 30 }]}>
        Parties
      </Text>
      <View>
      <FlatList
        data={invites.filter((item) => item.status == "accepted")}
        style={{ paddingTop: 5}}
        snapToInterval={Dimensions.get('window').width}
        horizontal
        // persistentScrollbar
        // disableIntervalMomentum
        decelerationRate="fast"
        indicatorStyle="black"
        renderItem={({item}) => (
          <PartyCard
            // id={docID}
            invite={item}
            // onPress={(id) =>
            //   navigation.navigate("DuosPartyScreen", {
            //     partyID: id,
            //   })
            // }
          />
          // <Text>Foo</Text>
        )}
        keyExtractor={(item) => item.docId}
      />
      </View>
     
      {/* {invites
        .filter((item) => item.status == "accepted")
        .map(({ docID }) => (
          <PartyCard key={docID} id={docID} onPress={() =>  navigation.navigate("DuosPartyScreen", {
            partyID: docID,
          }) }/>
        ))} */}

      <Text h3 style={[styles.title, styles.subtitle]}>
        Pending
      </Text>
      <View>
      <FlatList
        data={invites.filter((item) => item.status == "pending")}
        style={{ paddingTop: 5}}
        horizontal
        snapToInterval={Dimensions.get('window').width}
        indicatorStyle="black"
        decelerationRate="fast"
        renderItem={({ item }) => (
          <InviteCard invite={item} onAccept={handleAccept} />
        )}
        keyExtractor={(item) => item.id}
      />
            {/* <Text>Foo</Text> */}

      </View>
     
    </SafeAreaView>
  );
};

export default HomeViewController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    color: "black",
    justifyContent: "center",
    marginLeft: "5%",
    fontSize: 43,
    fontFamily: "PingFangHK-Medium",
    letterSpacing: 0.1,
    marginBottom: 10,
  },
  subtitle: {
    color: "#ee0979",
  },
});
