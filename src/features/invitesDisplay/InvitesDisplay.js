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

  const acceptedInvites = invites?.filter((item) => item.status == "accepted");
  const pendingInvites = invites?.filter((item) => item.status == "pending");

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
  // console.log({ pendingInvites });

  return (
    <SafeAreaView style={styles.container}>



      {pendingInvites?.length <= 0 && (
        <SubtitleText style={styles.subtitle}>
          No pending invites, invite some friends to BiteParty to get started!
        </SubtitleText>
      )}
      <View>
        <FlatList
          data={pendingInvites && pendingInvites}
          style={{ paddingTop: 15 }}
          // horizontal
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
