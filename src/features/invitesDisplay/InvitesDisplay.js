import React from "react";
import {
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  TitleText,
  InviteCard,
  PartyCard,
  SubtitleText,
  resumeCard,
  GradientButton,
} from "components";
import { SafeAreaView } from "react-native";
import { useInvites } from "lib/invites.js";
import { Card } from "react-native-paper";
import { useCurrentParty } from "../../lib/invites";

const InvitesDisplay = ({ navigation }) => {
  const { invites, rejectInvite, acceptInvite } = useInvites();
  const { currParties } = useCurrentParty();
  console.log("Current Party is", currParties);

  const acceptedInvites = invites?.filter((item) => item.status == "accepted");
  const pendingInvites = invites?.filter((item) => item.status == "pending");

  const handleAccept = (invite) => {
    if (acceptedInvites?.length <= 0) {
      acceptInvite(invite)
        .then(() =>
          navigation.navigate("joinParty", {
            screen: "joinParty/swiping",
            params: { partyID: invite.docID },
          })
        )
        .catch((err) => console.error(err));
    } else {
      alert("Please finish your active party before starting a new one!");
    }
  };
  const handleReject = (invite) => {
    rejectInvite(invite).catch((err) => console.error(err));
  };

  const handleResume = (invite) => {
    navigation
      .navigate("joinParty/swiping", {
        partyID: invite.docID,
      })
      .catch((err) => console.error(err));
    // console.log({ pendingInvites });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        {acceptedInvites?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              // height: 45,
              // borderTopWidth: 1,
              // borderBottomWidth: 2,
              backgroundColor: "rgba(0,0,0,0.05)",
              paddingVertical: 20,
              paddingHorizontal: 20,
              width: Dimensions.get("screen").width,
              // ...StyleSheet.absoluteFill,
              // borderColor: "rgba(0,0,0,0.1)",
              position: "relative",
              right: 20,
              marginBottom: 10,
              top: -2,
            }}
          >
            <Text style={{ fontWeight: "400", fontSize: 22 }}>
              You have an active party!
            </Text>
            <GradientButton
              onPress={() =>
                navigation.navigate("joinParty", {
                  screen: "joinParty/swiping",
                  params: { partyID: acceptedInvites[0].item.docID },
                })
              }
              containerStyle={{ width: 100 }}
              innerStyle={{ borderRadius: 7, paddingVertical: 15 }}
              textStyle={{ fontSize: 19 }}
            >
              <Text>Resume</Text>
            </GradientButton>
          </View>
        )}
      </View>

      <TitleText style={[styles.title]}>Invites</TitleText>
      {pendingInvites?.length <= 0 && (
        <SubtitleText style={styles.subtitle}>
          No pending invites. Start a party!
        </SubtitleText>
      )}
      <View>
        <FlatList
          data={pendingInvites && pendingInvites}
          style={{ paddingTop: 5 }}
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
    marginTop: 7.5,
    fontSize: 37,
  },
  subtitle: {
    color: "black",
    left: 2.5,
  },
  card: {
    borderRadius: 25,
    shadowRadius: 2,
    width: Dimensions.get("window").width - 20 * 2,
  },
});
