import React from "react";
import {
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  View,
} from "react-native";
import { TitleText, InviteCard, PartyCard, SubtitleText } from "components";
import { SafeAreaView } from "react-native";
import { useInvites } from "lib/invites.js";

const InvitesDisplay = ({ navigation }) => {
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
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <TitleText style={styles.title}>Parties</TitleText>
        <View>
          <FlatList
            data={
              invites && invites.filter((item) => item.status == "accepted")
            }
            style={{ paddingTop: 5 }}
            snapToInterval={Dimensions.get("window").width}
            horizontal
            decelerationRate="fast"
            indicatorStyle="black"
            renderItem={({ item }) => <PartyCard invite={item} />}
            keyExtractor={(item) => item.docId}
          />
        </View>

        <TitleText style={styles.subtitle}>Invites</TitleText>
        <SubtitleText style={styles.subtitle}>
          No pending invites, invite some friends to BiteParty to get started!
        </SubtitleText>
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
            keyExtractor={(item) => item.docID}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InvitesDisplay;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    marginTop: 30,
  },
  subtitle: {
    color: "#ee0979",
  },
});
