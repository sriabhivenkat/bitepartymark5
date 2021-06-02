import React, { useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
  View,
  Image,
} from "react-native";
import { TitleText, InviteCard, SubtitleText } from "components";
import { SafeAreaView } from "react-native";
import { Button, Divider, IconButton } from "react-native-paper";
import { useInvites, useParty} from "lib";
import LinearGradient from "react-native-linear-gradient";
import { Appbar } from "react-native-paper";
import { FriendInvites } from "./FriendsInvites";
import {GradientButton} from "components";

 
const InvitesDisplay = ({ navigation, route }) => {
  const { invites, rejectInvite, acceptInvite } = useInvites();
  const { addSelfToParty } = useParty();

  // const { partyID, linkInvite } = route.params

  const isSmall = height < 700;

 
  // const { partyID, linkInvite } = route.params

  // if(linkInvite) {
    
  // }

  const acceptedInvites = invites?.filter((item) => item.status == "accepted");
  const pendingInvites = invites?.filter((item) => item.status == "pending");
  const height = Dimensions.get("window").height;


  useEffect(() => {
    if (route?.params?.linkInvite) {
      addSelfToParty(route.params.partyID).then(() => 
        navigation.navigate("joinParty", {
          screen: "joinParty/swiping",
          params: { partyID: route.params.partyID },
        })
      )
    }
  }, route.params)

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
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={
          ["#FFD0E4", "#FFCFBB", "#FFFFFF"]
        }
        style={styles.container}
      >
        <SafeAreaView>
          <View flexDirection="row">
            <View
              style={{
                // backgroundColor: "red",
                height: isSmall ? 60 : 70,
                // height: 10,
                justifyContent: "space-between",
                flex: 1,
                flexDirection: "row",
              }}
            >
              {/* <Appbar.Content
                title={
    
                }
                titleStyle={{ backgroundColor: "white", right: 40 }}
                style={{ alignItems: "flex-start", top: 5 }}
              /> */}
              <View
                flexDirection="row"
                alignItems="center"
                paddingHorizontal={10}
                flex={1}
              >
                <Image
                  source={require("assets/images/newHeaderLogo.png")}
                  style={{
                    width: 29.333,
                    height: 44,
                  }}
                />
              </View>
              <View flexDirection="row" alignItems="center" paddingLeft={10}>
                <Button 
                  icon="account-multiple-plus" 
                  mode="outlined"
                  labelStyle={{color: "black"}}
                  style={{borderRadius: 20, borderColor: "black" }} 
                  uppercase={false}
                  onPress={() => navigation.navigate("createParty/createGroup")}
                  color="black"
                >
                  Group
                </Button>
                <IconButton
                  icon="account-plus"
                  size={30}
                  onPress={() =>
                    navigation.navigate("profile", { screen: "profile/addFriends" })
                  }
                />
              </View>
            </View>
          </View>
          <Divider style={{width: 600, right:30, backgroundColor: "gray"}}/>
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <GradientButton
                onPress={() => navigation.navigate("invitesDisplay/friendRequests")}
                style={{
                  width: "100%",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 3.5 },
                  shadowOpacity: 0.5,
                  shadowRadius: 2.5,
                }}
                textStyle={{
                  left: 20,
                }}
                innerStyle={{
                  borderRadius: 14,
                  justifyContent: "flex-start",
                }}

              >
                Friend Requests
              </GradientButton>
            </View>
          <TitleText style={[styles.title, { marginTop: 70, left: 5}]}>Notifications</TitleText>
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
          {/* <View
            height={1}
            width="100%"
            backgroundColor="#00000020"
            // marginHorizontal={20}
            // marginVertical={20}
          /> */}
          {/* <View> */}
          {/* <TitleText style={[styles.title, { fontSize: 25, marginTop: 15, left: 20 }]}>
            Friend and Group Requests
          </TitleText>

          <FriendInvites /> */}
          {/* </View> */}
        </SafeAreaView>
      </LinearGradient>

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
    fontSize: 30,
  },
  subtitle: {
    color: "black",
    paddingLeft: 20,
    marginBottom: 15,
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
    borderBottomWidth: 1,
  },
});