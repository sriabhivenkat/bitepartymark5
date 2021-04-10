import React from "react";
import {
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  View,
} from "react-native";
import { Text } from "galio-framework";
import InviteCard from "components/InviteCard";
import PartyCard from "components/PartyCard.js";
import { SafeAreaView } from "react-native";
import { useInvites } from "lib/invites.js";

const HomeViewController = ({ navigation }) => {
  const { invites, rejectInvite, acceptInvite } = useInvites();

  const handleAccept = (invite) =>
    acceptInvite(invite)
      .then(() =>
        navigation.navigate("joinParty/swiping", {
          partyID: invite.docID,
        })
      )
      .catch((err) => console.error(err));

  const handleReject = (invite) => {
    rejectInvite(invite).catch((err) => console.error(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text h2 style={[styles.title, { marginTop: 30 }]}>
        Parties
      </Text>
      <View>
        <FlatList
          data={invites && invites.filter((item) => item.status == "accepted")}
          style={{ paddingTop: 5 }}
          snapToInterval={Dimensions.get("window").width}
          horizontal
          decelerationRate="fast"
          indicatorStyle="black"
          renderItem={({ item }) => <PartyCard invite={item} />}
          keyExtractor={(item) => item.docId}
        />
      </View>

      <Text h3 style={[styles.title, styles.subtitle]}>
        Pending
      </Text>
      <View>
        <FlatList
          data={invites && invites.filter((item) => item.status == "pending")}
          style={{ paddingTop: 5 }}
          horizontal
          snapToInterval={Dimensions.get("window").width}
          indicatorStyle="black"
          decelerationRate="fast"
          renderItem={({ item }) => (
            <InviteCard
              invite={item}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          )}
          keyExtractor={(item) => item.id}
        />
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
