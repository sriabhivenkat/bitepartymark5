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
import {useUser} from "lib";
import {GradientButton, GroupCard} from "components";
import { Appbar, Button, IconButton, Divider} from 'react-native-paper';
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { FriendInvites } from "./FriendsInvites";

const FriendRequests = () => {
    const isSmall = height < 700;
    const height = Dimensions.get("window").height;
    const [groups, setGroups] = useState([]);
    const {user} = useUser();
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

    return(
    <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={
          ["#FFD0E4", "#FFCFBB", "#FFFFFF"]
        }
        style={styles.container}
    >
        <SafeAreaView>
          <View flexDirection="row" paddingHorizontal={20}>
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
          <View style={{left: 10, top: 20, marginBottom: 25, paddingHorizontal: 20}}>
              <Text style={{fontFamily: "Kollektif", fontSize: 30}}>Friend Requests</Text>
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