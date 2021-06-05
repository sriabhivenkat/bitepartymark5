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
import { useInvites, useParty, useFriends } from "lib";
import LinearGradient from "react-native-linear-gradient";
import { Appbar } from "react-native-paper";
import { FriendInvites } from "./FriendsInvites";
import { GradientButton } from "components";
import { HeaderComp } from "../../components/Header";


const InvitesDisplay = ({ navigation, route }) => {
  const { invites, rejectInvite, acceptInvite } = useInvites();
  const { addSelfToParty } = useParty();
  const { friends } = useFriends();

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
      <SafeAreaView paddingHorizontal={20} >
        <HeaderComp height={height} isHomeScreen={false} navigation={navigation} route={route} baseRoute='invitesDisplay' />
        <Divider style={{ width: 600, right: 30, backgroundColor: "gray" }} />
        {friends?.filter(({ friendStatus }) => friendStatus == "pending").length != 0 &&
          <View style={{ alignItems: "center", marginTop: 10, marginBottom: 40 }}>
            <GradientButton
              onPress={() => navigation.navigate("invitesDisplay/friendRequests")}
              style={{
                width: "100%",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3.5 },
                shadowOpacity: 0.5,
                shadowRadius: 2.5,
                paddingHorizontal: 20
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
        }
        {pendingInvites?.length <= 0 && (
          <>
            <TitleText style={[styles.title]}>Notifications</TitleText>
            <SubtitleText style={[styles.subtitle, { fontSize: 20 }]}>
              No pending invites. Start a party!
              </SubtitleText>
          </>
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
    </LinearGradient >

  );
};

export default InvitesDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    alignContent: "flex-end",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    // paddingHorizontal: 20,
  },
  title: {
    marginTop: 17.5,
    fontSize: 30,
    paddingLeft: 20
  },
  subtitle: {
    color: "black",
    marginBottom: 15,
    paddingLeft: 20
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