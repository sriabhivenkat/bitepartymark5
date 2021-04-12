import React, { useState } from "react";
import { View, StyleSheet, Share } from "react-native";
import { Text } from "galio-framework";
import { Avatar } from "react-native-paper";
import { ListItem } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import TouchableScale from "react-native-touchable-scale";
import { TouchableOpacity } from "react-native-gesture-handler";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { useFriends, useParty } from "lib";
import MemberCard from "components/MemberCard";

const SelectFriends = ({ route, navigation }) => {
  const { friends } = useFriends();
  const { partyId } = useParty();
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
    <View style={styles.container}>
      <Text h3 style={styles.title}>
        {`Who's coming?`}
      </Text>

      {/* {friends.map((item) => (
        <View style={{ marginTop: "-2%" }} key={item.uidvalue}>
          <ListItem
            Component={TouchableScale}
            friction={90}
            tension={100}
            containerStyle={
              selectedFriends.some(
                (friend) => friend.uidvalue == item.uidvalue
              ) && {
                backgroundColor: "#edf0f5",
              }
            }
            activeScale={1.05}
            onPress={() => toggleSelection(item)}
            style={{
              borderBottomColor: "lightgray",
              borderBottomWidth: 1,
              borderTopColor: "lightgray",
              borderTopWidth: 1,
            }}
          >
            <Avatar.Image size={45} source={{ uri: item.imageUrlPath }} />
            <ListItem.Content style={styles.queryContent}>
              <ListItem.Title style={styles.querytitle}>
                {"@" + item.handle}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.querysubtitle}>
                {item.firstName + " " + item.lastName}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      ))} */}

      {friends &&
        friends.map((item) => (
          <MemberCard
            key={item.uidvalue}
            data={item}
            onPress={() => toggleSelection(item)}
            selected={selectedFriends.some(
              (friend) => friend.uidvalue == item.uidvalue
            )}
          />
        ))}

      <View style={[styles.buttonContainer]}>
        {selectedFriends.length != 0 && (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate("createParty/filters", {
                partyId,
                selectedFriends,
              });
            }}
            // style={{ height: 50, marginHorizontal: "20%", marginVertical: 15 }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#ee0979", "#f76f6d", "#ff6a00"]}
              style={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "PingFangHK-Regular",
                  fontSize: 17,
                }}
              >
                Done
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {/* <GradientButton>
          Foo
         </GradientButton> */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={async () => onShare({ url: await generateLink() })}
          style={{ height: 50, marginHorizontal: "20%", marginVertical: 15 }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#ee0979", "#f76f6d", "#ff6a00"]}
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "PingFangHK-Regular",
                fontSize: 17,
              }}
            >
              Share link 🔗
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
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
    padding: "5%",
    fontFamily: "PingFangHK-Medium",
    color: "#f76f6d",
    textAlign: "center",
    marginTop: "10%",
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
    fontFamily: "PingFangHK-Medium",
    color: "#f76f6d",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    height: 50,
    marginHorizontal: "20%",
    marginVertical: 15,
  },
});
