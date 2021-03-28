import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StyleSheet, FlatList, StatusBar } from "react-native";
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
      const increment = firestore.FieldValue.increment(1);
      await partyCollection
        .doc(invite.docID)
        .update({ participantCount: increment });
      await inviteCollection.doc(invite.id).update({
        accepted: true,
      });
      navigation.navigate("DuosPartyScreen", {
        partyID: invite.docID,
        inviteID: invite.id,
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text h2 style={[styles.title,  {marginTop: 30}]}>
        Parties
      </Text>
      {invites
        .filter((item) => item.accepted)
        .map(({ docID }) => (
          <PartyCard key={docID} id={docID} />
        ))}

      <Text h3 style={[styles.title, styles.subtitle]}>
        Pending
      </Text>
      <FlatList
        data={invites.filter((item) => !item.accepted)}
        style={{ paddingTop: 5 }}
        renderItem={({ item }) => (
          <InviteCard invite={item} onAccept={handleAccept} />
        )}
        keyExtractor={(item) => item.id}
      />
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
