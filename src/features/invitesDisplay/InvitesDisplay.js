import React from "react";
import {
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  View,
  Text,
  Button,
  Image,
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
import { Appbar } from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";

const InvitesDisplay = ({ navigation }) => {
  const { invites, rejectInvite, acceptInvite } = useInvites();

  const acceptedInvites = invites?.filter((item) => item.status == "accepted");
  const pendingInvites = invites?.filter((item) => item.status == "pending");
  const height = Dimensions.get("window").height;
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
  console.log({ acceptedInvites });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {height>=896 &&
          <Appbar.Header style={[styles.bottom, {height: 70}]}>
            <Appbar.Content
                title={
                      <Image source={require("assets/images/newheaderLogo.jpeg")}
                                    style={{
                                        width: 29.333,
                                        height: 44,
                                        
                                    }}
                            />
                          }
                        titleStyle={{backgroundColor: "white", right: 40}}
                        style={{alignItems: "flex-start", top: 5}}
              />
            <Appbar.Action icon={'account-plus'} size={30} onPress={() => navigation.navigate("profile", {screen: "profile/addFriends"})} style={{top: 3}}/>
          </Appbar.Header>
      }
      {height<=667 &&
        <Appbar.Header style={[styles.bottom, {height: 60,}]}>
          <Appbar.Content
              title={
                    <Image source={require("assets/images/newheaderLogo.jpeg")}
                                  style={{
                                      width: 26.4,
                                      height: 39.6,
                                      aspectRatio: 2/3
                                  }}
                          />
                        }
                      titleStyle={{backgroundColor: "white", right: 40}}
                      style={{alignItems: "flex-start", top: 5}}
            />
          
          <Appbar.Action icon={'account-plus'} size={27.5} onPress={() => navigation.navigate("profile", {screen: "profile/addFriends"})} style={{top: 2}}/>
        </Appbar.Header>
      }
      <TitleText style={[styles.title, { marginTop: 15, left: 20 }]}>Invites</TitleText>
      {pendingInvites?.length <= 0 && (
        <SubtitleText style={styles.subtitle}>
          No pending invites. Start a party!
        </SubtitleText>
      )}
      <View style={{
        alignItems: "center"
      }}>
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
    marginTop: 17.5,
    fontSize: 37,
  },
  subtitle: {
    color: "black",
    paddingLeft: 20,
  },
  card: {
    borderRadius: 25,
    shadowRadius: 2,
    width: Dimensions.get("window").width - 20 * 2,
  },
  bottom: {
    backgroundColor: "white",
    elevation: 0,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1
  },
});
