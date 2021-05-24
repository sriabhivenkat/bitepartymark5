import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { Text, Button } from "galio-framework";
import { Modal, Portal, Provider, Avatar } from "react-native-paper";
import { ListItem } from "react-native-elements";
import { Input } from "galio-framework";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TitleText, MemberCard } from "components";
import { SafeAreaView } from "react-native";
import { useFriends, useUser } from "lib";
import { times } from "lodash";
import { Alert } from "react-native";
import { Divider } from "react-native-elements";

const FriendsView = () => {
    const [query, setQuery] = useState("");


    const { friends, addFriend } = useFriends();
    const [data, setData] = useState([]);



    const { user, setUser } = useUser()
    // const { user } = useUser();



    useEffect(() => {
        if (query.length > 0) {
            firestore()
                .collection("Users")
                .doc(user.uidvalue)
                .collection('friends')
                .where("handle", ">=", query)
                .where("handle", "<=", query + "\uf8ff")
                .get()
                .then((res) => {
                    const results = res.docs.map((x) => x.data());
                    console.log(results);
                    setData(results);
                })
                .catch((err) => alert(err));
        } else {
            setData([]);
        }
    }, [query]);
    // console.log(friends);

    // useEffect(() => {
    //   firestore()
    //     .collection("Users")
    //     .doc(user.uid)
    //     .collection("friends")
    //     .get()
    //     .then((resvals) => {
    //       const resarr = resvals.docs.map((y) => y.data());
    //       setCheckHandle(resarr);
    //     })
    //     .catch((err) => alert(err));
    // }, []);
    // console.log(
    //   friends.filter(
    //     ({ uidvalue }) => uidvalue == "6P9FzWvSVoNZtz7TOQ6cs86UbJN2"
    //   ) > 0
    // );
    // console.log(
    //   friends
    //     .map(({ uidvalue }) => uidvalue)
    //     .includes("6P9FzWvSVoNZtz7TOQ6cs86UbJN2")
    // );

    // console.log(data.map((item) => item.uidvalue));

    // const addFriend = (item) => {
    //   firestore()
    //     .collection("Users")
    //     .doc(user.uidvalue)
    //     .collection("friends")
    //     .doc(item.uidvalue)
    //     .set({
    //       handle: item.handle,
    //       firstName: item.firstName,
    //       lastName: item.lastName,
    //       imageUrlPath: item.imageUrl,
    //       uidvalue: item.uidvalue,
    //     });
    //   Alert.alert("Added friend", `${item.handle} was added!`);
    // };

    //  add

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <TitleText> My Friends</TitleText>
                <Divider style={styles.divider} />

                {/* <TitleText style={{ marginTop: 30 }}>Add Friends</TitleText> */}
                <Input
                    placeholder="Search Friends"
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

                {data.length != 0 && (
                    <View marginTop={15}>
                        {data.map((item) => {

                            return (
                                <MemberCard
                                    key={item.uidvalue}
                                    data={item}
                                    disabled
                                />
                            );
                        })}
                    </View>
                )}
                {data.length == 0 && (
                    <View marginTop={15}>
                        {friends?.map((item) => {
                            return (
                                <MemberCard
                                    key={item.uidvalue}
                                    data={item}

                                    disabled
                                />
                            );
                        })}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default FriendsView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 10,
        // paddingTop: 30,
    },
    queryView: {
        flex: 0.13,
        backgroundColor: "white",
        marginTop: 20,
    },
    modalContainer: {
        flex: 0.5,
    },
    text: {
        padding: 20,
        color: "black",
        fontSize: 36,
        marginTop: "20%",
        fontFamily: "Kollektif",
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
    queryResults: {
        // marginTop: 20,
        backgroundColor: "#16335e",
    },
    pfp: {
        alignItems: "center",
    },
    querytitle: {
        fontWeight: "bold",
        color: "black",
        fontSize: 20,
        marginBottom: "1%",
        fontFamily: "Kollektif",
    },
    querysubtitle: {
        color: "black",
        fontFamily: "Kollektif",
        fontSize: 18,
    },
    modalStyling: {
        display: "flex",
        backgroundColor: "white",
        padding: 20,
    },
    divider: {
        // borderWidth: 0,
        marginVertical: "1.5%",
        marginBottom: 15,
    },
});