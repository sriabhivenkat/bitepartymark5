import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    SafeAreaView
} from "react-native";
import { Text } from "galio-framework";
import { TitleText, InviteCard, SubtitleText, GroupCard } from "components";
import { useUser } from 'lib';
import { Input } from "galio-framework";
import { ScrollView } from "react-native";
import { stubFalse } from "lodash";
import { useGroups, useFriends, useParty } from 'lib';
import firestore, { firebase } from "@react-native-firebase/firestore";
import { GradientButton } from "../../../components";

const ShowGroups = ({ navigation, route }) => {

    const { friends } = useFriends();
    const { partyId } = useParty();

    const [selectedFriends, setSelectedFriends] = useState([]);
    const { user } = useUser();
    const { groups } = useGroups()
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [members, setMembers] = useState([]);
    var localArray = [];


    // console.log({ groups });



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


        <View style={styles.container}>
            <TitleText style={styles.title}>
                {user?.firstName}'s Groups
            </TitleText>
            <View
                alignItems="center"
            >
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
            <View alignItems="center" marginTop={10}>
                {/* <ScrollView marginTop={10} paddingVertical={1}>
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
                </ScrollView> */}
                <FlatList
                    data={groups}
                    style={{ paddingTop: 5 }}
                    snapToInterval={Dimensions.get("window").width}
                    indicatorStyle="black"
                    decelerationRate="fast"
                    renderItem={({ item }) => (
                        <GroupCard
                            key={item.groupid}
                            id={item.groupID}
                            request={false}
                            groupName={item.partyName}
                            groupMembers={getGroupList(item)}
                        />
                    )}
                />


            </View>
        </View>
    )


    //     <SafeAreaView style={styles.container}>
    //         <StatusBar barStyle="dark-content" />
    //         <View style={styles.container}>
    //             <View
    //                 flexDirection="row"
    //                 display="flex"
    //                 alignItems="center"
    //                 justifyContent="space-between"
    //                 marginTop={-25}
    //             >
    //                 <View flex={1}>
    //                     <TitleText style={{ fontSize: 37 }} >Invite Friends</TitleText>
    //                 </View>
    //                 <View flex={0} position="relative" top={10}>
    //                     <GradientButton innerStyle={{ flex: 0, paddingHorizontal: 10 }} onPress={onShareLink}>Share Link</GradientButton>
    //                 </View>
    //             </View>
    //             <View>
    //                 <Input
    //                     placeholder="Enter a handle"
    //                     onChangeText={(txt) => setQuery(txt)}
    //                     left
    //                     icon="search"
    //                     family="ionicons"
    //                     iconSize={25}
    //                     autoCapitalize="none"
    //                     style={styles.searchbar}
    //                     value={query}
    //                     fontFamily="Kollektif"
    //                     fontSize={20}
    //                     placeholderTextColor="rgba(0,0,0,0.5)"
    //                 />
    //             </View>
    //             {/* <LinearGradient
    //         style={{
    //           // position: "absolute",
    //           // bottom: 0,
    //           width: Dimensions.get("screen").width,
    //           height: 20,
    //         }}
    //         colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.5)"]}
    //         pointerEvents={"none"}
    //       /> */}
    //             {friends?.length < 1 && groups?.length < 1 && (
    //                 <>
    //                     <Text
    //                         style={{
    //                             fontSize: 20,
    //                             fontFamily: "Kollektif",
    //                             marginTop: 30,
    //                             textAlign: "center",
    //                             // lineHeigh: 50,
    //                         }}
    //                     >
    //                         <Text>{`You haven't added any friends. \n`}</Text>
    //                         <Text
    //                             onPress={() => navigation.navigate("addFriends")}
    //                             style={{ color: "#f76f6d", textDecorationLine: "underline" }}
    //                         >{`Add some `}</Text>

    //                         <Text>to get started!</Text>
    //                     </Text>
    //                 </>
    //             )}
    //             <ScrollView marginTop={10} paddingVertical={1}>
    //                 {groups?.filter(
    //                     (item) => item?.partyName?.indexOf(query) >= 0 || query.length < 2
    //                 )
    //                     .map((item) => (
    //                         <GroupCard
    //                             key={item.groupid}
    //                             id={item.groupid}
    //                             request={false}
    //                             groupName={item.partyName}
    //                             groupMembers={getGroupList(item)}
    //                             onPress={() => handleAddGroup(getGroupList(item))}
    //                             selected={getGroupList(item).every((m) =>
    //                                 selectedFriends.some((f) => f.uidvalue == m.uidvalue)
    //                             )}
    //                         />
    //                     ))}
    //                 {friends &&
    //                     friends
    //                         // .filter(({ friendStatus }) => friendStatus != "sent")
    //                         .filter(
    //                             (item) => item?.handle?.indexOf(query) >= 0 || query.length < 2
    //                         )
    //                         .map((item) => (
    //                             <MemberCard
    //                                 key={item.uidvalue}
    //                                 data={{
    //                                     ...item,
    //                                     status:
    //                                         item.friendStatus == "sent" ? "friendPending" : undefined,
    //                                 }}
    //                                 onPress={() =>
    //                                     item.friendStatus != "sent" && handleAddFriend(item)
    //                                 }
    //                                 selected={selectedFriends.some(
    //                                     (friend) => friend.uidvalue == item.uidvalue
    //                                 )}
    //                             />
    //                         ))}
    //             </ScrollView>
    //             {/* <LinearGradient
    //         style={{
    //           // position: "absolute",
    //           // bottom: 0,
    //           width: Dimensions.get("screen").width,
    //           height: 40,
    //         }}
    //         colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]}
    //         pointerEvents={"none"}
    //       /> */}
    //             <View alignItems="center" justifyContent="center" paddingTop={10}>
    //                 {selectedFriends.length === 0 && (
    //                     <GradientButton
    //                         // style={{ backgroundColor: "red" }}
    //                         innerStyle={{ paddingVertical: 15 }}
    //                         containerStyle={{ width: "95%" }}
    //                         onPress={() =>
    //                             navigation.navigate("createParty/filters", {
    //                                 partyId,
    //                                 selectedFriends,
    //                             })
    //                         }
    //                     >
    //                         Or, go solo!
    //                     </GradientButton>
    //                 )}
    //                 {selectedFriends.length != 0 && (
    //                     <GradientButton
    //                         // style={{ backgroundColor: "red" }}
    //                         innerStyle={{ paddingVertical: 15 }}
    //                         containerStyle={{ width: "95%" }}
    //                         onPress={() =>
    //                             navigation.navigate("createParty/filters", {
    //                                 partyId,
    //                                 selectedFriends,
    //                             })
    //                         }
    //                     >
    //                         Start Party!
    //                     </GradientButton>
    //                 )}
    //             </View>
    //         </View>
    //     </SafeAreaView>
    // );







    useEffect(() => {
        console.log("This is groups array 1", groups)
        groups.map((item) => {
            localArray.push(item?.groupID)
        })
    })

    useEffect(() => {
        console.log(localArray, "This is local array")
        firestore()
            .collection("Groups")
            .where(firebase.firestore.FieldPath.documentId(), 'in', localArray)
            .get()
            .then((res) => {
                const results = res.docs.map((x) => x.data());
                // console.log("yuh yuh yuh")
                console.log("this is results", results)
                setData(results)
            })
            .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        firestore()
            .collectionGroup('members')
            .where('isGroup', '==', 'true')
            .where('groupID', 'array-contains-any', localArray)
            .get()
            .then((res) => {
                const results = res.docs.map((x) => x.data());
                console.log("yuh yuh yuh")
                console.log("this is results", results)
                setMembers(results)
            })
            .catch((err) => console.log(err));
    }, [])

}

export default ShowGroups;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    title: {
        left: 20,
    },
    searchbar: {
        borderColor: "black",
        borderWidth: 1.5,
        alignItems: "center",
        shadowColor: "black",
        shadowRadius: 30,
        borderRadius: 14,
        top: 5,
        fontFamily: "Kollektif",
        width: "95%",
    },
})