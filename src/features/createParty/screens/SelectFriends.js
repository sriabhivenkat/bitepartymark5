import React, { useState, useEffect } from "react";
import { View, StyleSheet, Share, StatusBar } from "react-native";
import { Text } from "galio-framework";
import { Avatar } from "react-native-paper";
import { ListItem } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import TouchableScale from "react-native-touchable-scale";
import { Input } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { useFriends, useParty, useUser, useGroup } from "lib";
import MemberCard from "components/MemberCard";
import { ScrollView } from "react-native";
import { Alert } from "react-native";
import {
  GradientButton,
  SubtitleText,
  TitleText,
  GroupCard,
} from "../../../components";
import { SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { getGroups, useGroups } from "../../../lib/groups";
// import { cos } from "react-native-reanimated";

const SelectFriends = ({ route, navigation }) => {
  const { friends } = useFriends();
  const { partyId } = useParty();
  const [query, setQuery] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);

  const { groups } = useGroups();
  const { user } = useUser();
  // console.log({ groups });

  const onShareLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink({
        link: `https://biteparty.app/join?id=${partyId}`,
        domainUriPrefix: "https://biteparty.page.link",
        androidInfo: {
          androidPackageName: "com.kastech.biteparty",
        },
        iosInfo: {
          iosBundleId: "com.kastech.biteparty",
        },
      });
      const result = await Share.share({
        message: `BiteParty | Join the party! ${link}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const getGroupList = (group) =>
    Object.keys(group.members)
      .map((uidvalue) => ({
        uidvalue,
        ...group.members[uidvalue],
      }))
      .filter((m) => m.uidvalue != user.uidvalue);

  const handleAddFriend = (friend) => {
    const exists = selectedFriends.some((m) => m.uidvalue == friend.uidvalue);
    setSelectedFriends((old) =>
      exists
        ? old.filter((m) => m.uidvalue != friend.uidvalue)
        : [...old, friend]
    );
  };

  const handleAddGroup = (members) => {
    const selected = members.every((m) =>
      selectedFriends.some((f) => f.uidvalue == m.uidvalue)
    );
    console.log({
      selected: selectedFriends.filter((m) => !members.includes(m.uidvalue)),
    });
    // console.log(selectedFriends)
    // ;
    setSelectedFriends((old) =>
      selected
        ? old.filter((m) => members.every((f) => f.uidvalue != m.uidvalue))
        : [...old, ...members]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View
          flexDirection="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop={-25}
        >
          <View flex={1}>
            <TitleText style={{ fontSize: 37 }} >Invite Friends</TitleText>
          </View>
          <View flex={0} position="relative" top={10}>
            <GradientButton innerStyle={{flex: 0, paddingHorizontal: 10}} onPress={onShareLink}>Share Link</GradientButton>
          </View>
        </View>
        <View>
          <Input
            placeholder="Enter a handle"
            onChangeText={(txt) => setQuery(txt)}
            left
            icon="search"
            family="ionicons"
            iconSize={25}
            autoCapitalize="none"
            style={styles.searchbar}
            value={query}
            fontFamily="Kollektif"
            fontSize={20}
            placeholderTextColor="rgba(0,0,0,0.5)"
          />
        </View>
        {/* <LinearGradient
          style={{
            // position: "absolute",
            // bottom: 0,
            width: Dimensions.get("screen").width,
            height: 20,
          }}
          colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.5)"]}
          pointerEvents={"none"}
        /> */}
        {friends?.length < 1 && (
          <>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Kollektif",
                marginTop: 30,
                textAlign: "center",
                // lineHeigh: 50,
              }}
            >
              <Text>{`You haven't added any friends. \n`}</Text>
              <Text
                onPress={() => navigation.navigate("createParty/addFriends")}
                style={{ color: "#f76f6d", textDecorationLine: "underline" }}
              >{`Add some `}</Text>

              <Text>to get started!</Text>
            </Text>
          </>
        )}
        <ScrollView marginTop={10} paddingVertical={1}>
          {groups?.filter(
              (item) => item?.partyName?.indexOf(query) >= 0 || query.length < 2
            )
            .map((item) => (
              <GroupCard
                key={item.groupid}
                id={item.groupid}
                request={false}
                groupName={item.partyName}
                groupMembers={getGroupList(item)}
                onPress={() => handleAddGroup(getGroupList(item))}
                selected={getGroupList(item).every((m) =>
                  selectedFriends.some((f) => f.uidvalue == m.uidvalue)
                )}
              />
            ))}
          {friends &&
            friends
              // .filter(({ friendStatus }) => friendStatus != "sent")
              .filter(
                (item) => item?.handle?.indexOf(query) >= 0 || query.length < 2
              )
              .map((item) => (
                <MemberCard
                  key={item.uidvalue}
                  data={{
                    ...item,
                    status:
                      item.friendStatus == "sent" ? "friendPending" : undefined,
                  }}
                  onPress={() =>
                    item.friendStatus != "sent" && handleAddFriend(item)
                  }
                  selected={selectedFriends.some(
                    (friend) => friend.uidvalue == item.uidvalue
                  )}
                />
              ))}
        </ScrollView>
        {/* <LinearGradient
          style={{
            // position: "absolute",
            // bottom: 0,
            width: Dimensions.get("screen").width,
            height: 40,
          }}
          colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]}
          pointerEvents={"none"}
        /> */}
        <View alignItems="center" justifyContent="center" paddingTop={10}>
          {selectedFriends.length === 0 && (
            <GradientButton
              // style={{ backgroundColor: "red" }}
              innerStyle={{ paddingVertical: 15 }}
              containerStyle={{ width: "95%" }}
              onPress={() =>
                navigation.navigate("createParty/filters", {
                  partyId,
                  selectedFriends,
                })
              }
            >
              Or, go solo!
            </GradientButton>
          )}
          {selectedFriends.length != 0 && (
            <GradientButton
              // style={{ backgroundColor: "red" }}
              innerStyle={{ paddingVertical: 15 }}
              containerStyle={{ width: "95%" }}
              onPress={() =>
                navigation.navigate("createParty/filters", {
                  partyId,
                  selectedFriends,
                })
              }
            >
              Start Party!
            </GradientButton>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  queryView: {
    flex: 0.13,
    backgroundColor: "#16335e",
  },
  queryContent: {
    width: "80%",
  },
  containercolumn: {
    flex: 0.25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: "15%",
  },
  title: {
    fontFamily: "Kollektif",
    paddingBottom: "10%",
    color: "#f76f6d",
    // marginTop: "5%",
  },
  queryResults: {
    marginTop: 20,
    backgroundColor: "#16335e",
  },
  pfp: {
    alignItems: "center",
  },
  querytitle: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  querysubtitle: {
    color: "black",
  },
  modalStyling: {
    display: "flex",
    backgroundColor: "white",
    position: "absolute",
    padding: "20%",
    bottom: "-7%",
    left: 0,
    right: "-2.5%",
  },
  modalTitle: {
    padding: "5%",
    fontFamily: "Kollektif",
    color: "#f76f6d",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: "red",
  },
  button: {
    height: 50,
    width: 100,
    // marginHorizontal: "20%",
    marginVertical: 15,
  },
  searchbar: {
    borderColor: "black",
    borderWidth: 1.5,
    alignItems: "center",
    shadowColor: "black",
    shadowRadius: 30,
    borderRadius: 14,
    fontFamily: "Kollektif",
  },
});
