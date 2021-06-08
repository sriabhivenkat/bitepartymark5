import React from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Text } from "galio-framework";
import TouchableScale from "react-native-touchable-scale";
import { ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useInvites } from "lib/invites.js";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { useUser } from "lib";
import { GradientButton, GroupCard } from "components";
import { Appbar, Button, IconButton, Divider } from 'react-native-paper';
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { FriendInvites } from "./FriendsInvites";
import { HeaderComp } from "../../components/Header";

const FriendRequests = () => {
  const isSmall = height < 700;
  const height = Dimensions.get("window").height;
  const [groups, setGroups] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    const unsub = firestore()
      .collectionGroup('members')
      .where("isGroup", '==', true)
      .where('status', '==', "pending") //filter by user uidvalue 
      .onSnapshot(
        (snapshot) => {
          const results = snapshot.docs.map((x) => x.data());
          console.log(results);
          const filtered = results.filter(resval => resval?.uidval === user?.uidvalue)
          console.log(filtered);
          setGroups(filtered);
          console.log("groups array is: ", groups)
        },
        (err) => console.error(err)
      )
    // .get()
    // .then((res) => {
    //   const results = res.docs.map((x) => x.data());
    //   console.log(results);
    //   const filtered = results.filter(resval => resval?.uidval === user?.uidvalue)
    //   console.log(filtered);
    //   setGroups(filtered);
    //   console.log("groups array is: ", groups)
    // })
    // .catch((err) => console.log(err));
    return unsub;
  }, [])

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
        <HeaderComp height={height} isHomeScreen={false} baseRoute='invitesDisplay' />
        <Divider style={{ width: 600, right: 30, backgroundColor: "gray" }} />
        <View style={{ left: 10, top: 20, marginBottom: 25, paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: "Kollektif", fontSize: 30 }}>Friend Requests</Text>
        </View>
        <ScrollView width={Dimensions.get("window").width * 2}>
          <FriendInvites />
          <View paddingHorizontal={20}>
            {groups.map((x) => (
              <GroupCard
                id={x?.groupID}
                request={true}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default FriendRequests;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  }
})