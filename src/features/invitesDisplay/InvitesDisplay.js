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
      <View style={{ paddingTop: 5, flexDirection: "row" }}>
        {acceptInvite?.length > 0 && (
          <FlatList
            data={acceptedInvites}
            style={{ paddingTop: 5 }}
            scrollEnabled="false"
            snapToInterval={Dimensions.get("window").width}
            indicatorStyle="black"
            decelerationRate="fast"
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 45,
                }}
              >
                <Text
                  style={{ fontWeight: "400", fontSize: 22, paddingLeft: 10 }}
                >
                  You have an active party!
                </Text>
                <GradientButton
                  onPress={() =>
                    navigation.navigate("joinParty", {
                      screen: "joinParty/swiping",
                      params: { partyID: item.docID },
                    })
                  }
                  style={{ paddingLeft: 25 }}
                >
                  <Text>Resume</Text>
                </GradientButton>
              </View>
            )}
            keyExtractor={(item) => item.partyID}
          />
        )}
      </View>

      <TitleText style={[styles.subtitle, styles.title]}>Invites</TitleText>
      {pendingInvites?.length <= 0 && (
        <SubtitleText style={styles.subtitle}>
          No pending invites, invite some friends to BiteParty to get started!
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
    marginTop: 30,
  },
  subtitle: {
    color: "#ee0979",
  },
  card: {
    borderRadius: 25,
    shadowRadius: 2,
    width: Dimensions.get("window").width - 20 * 2,
  },
});
