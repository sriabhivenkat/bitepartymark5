import React from "react";
import { useFriends } from "lib";
import { View } from "react-native";
import { FlatList } from "react-native";
import { FriendRequestCard } from "components";

export const FriendInvites = () => {
  const { friends } = useFriends();

  return (
    <View paddingHorizontal={20} marginBottom={10}>
      {/* <View backgroundColor="red" height={400} /> */}
      <FlatList
        contentInset={{ bottom: 0, top: 5 }}
        data={friends?.filter(({ friendStatus }) => friendStatus == "pending")}
        renderItem={({ item }) => <FriendRequestCard data={item} />}
      />
    </View>
  );
};
