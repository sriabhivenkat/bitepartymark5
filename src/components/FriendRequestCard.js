import React from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import { Text } from "galio-framework";
import { Card, Avatar, Chip, IconButton } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useFriends } from "lib";
export const FriendRequestCard = ({
  onPress,
  data,
  selected,
  status,
  ...rest
}) => {
  const { acceptFriend, rejectFriend } = useFriends();
  return (
    <View style={styles.container}>
      <Card
        style={[
          styles.card,
          { height: 70, marginBottom: 15 },
          selected && {
            backgroundColor: "#e0e0e0",
          },
        ]}
        elevation={1}
        onPress={onPress}
        accessible={false}
      >
        <Card.Content style={[styles.innerCard]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar.Image size={35} source={{ uri: data?.imageUrl }} />

            <View style={styles.nameContainer}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.text, styles.name]}
              >
                {`${data.firstName} ${data.lastName}`}
              </Text>
              <Text
                // adjustsFontSizeToFit
                numberOfLines={1}
                style={[styles.text, styles.handle]}
              >
                Friend Request
              </Text>
            </View>
            <View style={styles.chipContainer}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => acceptFriend(data)}
              >
                <Text style={[styles.text, styles.confirmButtonText]}>
                  Accept
                </Text>
              </TouchableOpacity>
              <IconButton icon="close" onPress={() => rejectFriend(data)} />
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default FriendRequestCard;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 20 * 2,
    paddingHorizontal: 2,
  },
  card: {
    borderRadius: 15,
    shadowRadius: 2,
    // paddingHorizontal: 10,
  },
  buttonContainer: {
    justifyContent: "center",
  },
  innerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  subText: {
    fontFamily: "Kollektif",
    color: "#f76f6d",
    // marginBottom: "7%",
  },
  text: {
    fontFamily: "Kollektif",
    // marginTop: "5%",
    fontSize: 18,
    fontWeight: "bold",
  },
  handle: { fontSize: 14, position: "relative", top: 4 },
  name: {
    // fontWeight: "700",
  },
  nameContainer: {
    marginHorizontal: 15,
    flex: 1,
    // backgroundColor: "red",
  },
  buttonStyle: {
    minWidth: 150,
    marginVertical: 10,
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    position: "relative",
    left: 10,
    // backgroundColor: "red",
  },
  confirmButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 40,
    height: 35,
    backgroundColor: "#E77771",
  },
  confirmButtonText: { color: "#fff", fontSize: 15 },
});
