import React, { useState } from "react";
import { View, StyleSheet, Share } from "react-native";
import { Text } from "galio-framework";
import { Avatar } from "react-native-paper";
import { ListItem } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import TouchableScale from "react-native-touchable-scale";
import { Input } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { useFriends, useParty } from "lib";
import MemberCard from "components/MemberCard";
import { ScrollView } from "react-native";
import { Alert } from "react-native";
import { GradientButton, TitleText } from "../../../components";
import { SafeAreaView } from "react-native";

const SelectFriends = ({ route, navigation }) => {
  const { friends } = useFriends();
  const { partyId } = useParty();
  const [query, setQuery] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);

  const generateLink = async (groupId) => {
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
    // alert(link)
    console.log(link);

    return link;
  };

  const onShare = async ({ url }) => {
    try {
      const result = await Share.share({
        message: `BiteParty | Join the party! ${url}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleSelection = (friend) => {
    const exists = selectedFriends.find(
      (item) => item.uidvalue == friend.uidvalue
    );

    if (exists) {
      setSelectedFriends(
        selectedFriends.filter((i) => i.uidvalue != friend.uidvalue)
      );
    } else {
      setSelectedFriends([{ ...friend }, ...selectedFriends]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TitleText marginTop={30}>Invite Friends</TitleText>
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
            placeholderTextColor="rgba(0,0,0,0.5)"
          />
        </View>
        <ScrollView>
          {friends &&
            [...friends, ...friends]
              .filter(
                (item) => item?.handle?.indexOf(query) >= 0 || query.length < 2
              )
              .map((item) => (
                <MemberCard
                  key={item.uidvalue}
                  data={item}
                  onPress={() => toggleSelection(item)}
                  selected={selectedFriends.some(
                    (friend) => friend.uidvalue == item.uidvalue
                  )}
                />
              ))}
        </ScrollView>

        <View alignItems="center" justifyContent="center" paddingTop={10}>
          <GradientButton
            // style={{ backgroundColor: "red" }}
            innerStyle={{ paddingVertical: 15 }}
            containerStyle={{ maxWidth: 250 }}
            onPress={() =>
              navigation.navigate("createParty/filters", {
                partyId,
                selectedFriends,
              })
            }
          >
            Done
          </GradientButton>
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
    marginTop: 20,
  },
  queryContent: {
    width: "80%",
  },
  containercolumn: {
    flex: 0.25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
  },
  title: {
    fontFamily: "Kollektif",
    paddingBottom: "10%",
    color: "#f76f6d",
    marginTop: "5%",
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
