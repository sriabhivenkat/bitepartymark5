import React, { useState } from "react";
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView
} from "react-native";
import { Text } from "galio-framework";
import { TitleText } from "../../../components";
import { Input } from "galio-framework";
import { GradientButton, MemberCard, BackButton } from "../../../components";
import { Divider, Chip } from "react-native-paper";
import { useFriends, useParty, useUser } from "lib";
import { ScrollView } from "react-native";
import { Alert } from "react-native";
import { createGroup } from "../../../lib/groups";

const CreateGroup = ({ navigation }) => {

    const [selectedFriends, setSelectedFriends] = useState([]);
    const [query, setQuery] = useState("");
    const [name, setName] = useState("");

    const { friends } = useFriends();
    const { user } = useUser();
    const { partyId } = useParty();

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
    const height = Dimensions.get("window").height;
    const isSmall = height < 700;
    return (
        <SafeAreaView style={styles.container}>
            <View
                paddingHorizontal={20}
            >
                <View
                    flexDirection="row"
                    paddingTop={10}
                >
                    <BackButton
                        onPress={() => Alert.alert(
                            'Leave without saving?',
                            'Your group creation will not be saved.',
                            [
                                {
                                    text: "Ok",
                                    onPress: () => navigation.goBack(),
                                    style: "destructive"
                                },
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                            ]
                        )}
                    />
                    {selectedFriends.length > 1 && name != "" &&
                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                right: 0,
                                top: 5,
                                paddingTop: 10
                            }}
                            onPress={() => {
                                createGroup(selectedFriends, name, user)
                                    .catch((err) => console.log(err))
                                navigation.goBack();
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Kollektif",
                                    fontSize: 20,
                                    color: "#f76f6d"
                                }}
                            >
                                Save
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
                <TitleText fontSize={25}>Create Group</TitleText>
                <Input
                    placeholder="Type Group name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    autoCapitalize="none"
                    placeholderTextColor="lightgray"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    fontFamily="Kollektif"
                    fontSize={20}
                    style={{
                        borderRadius: 14,
                        shadowColor: "black",
                        shadowRadius: 30,
                        borderColor: "black",
                        borderWidth: 1.5,
                    }}
                />
                <Text
                    style={{
                        fontFamily: "Kollektif",
                        fontSize: 25,
                        marginTop: isSmall ? 10 : 20,
                    }}
                >
                    Current Members
                </Text>
                <View
                    flexDirection="row"
                >
                    <ScrollView
                        flexDirection="row"
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                        paddingBottom={10}
                        width="100%"
                        style={{
                            height: 60
                        }}
                    >
                        {selectedFriends.length != 0 &&
                            selectedFriends.map((item) => (
                                <Chip
                                    avatar={
                                        <Image
                                            source={{ uri: item?.imageUrl }}
                                            style={{
                                                height: 35,
                                                width: 35,
                                                borderRadius: 25,
                                                right: 1,
                                                borderColor: "black",
                                                borderWidth: 1,
                                                backgroundColor: "purple",
                                                marginLeft: 3,
                                            }}
                                        />
                                    }
                                    style={{
                                        width: 125,
                                        left: 0,
                                        height: 50,
                                        alignItems: "center",
                                        marginRight: 4,
                                        marginVertical: 2.5,
                                        top: 5,
                                    }}
                                    textStyle={{ fontFamily: "Kollektif", fontSize: 15 }}
                                    mode="outlined"
                                >
                                    {item?.firstName}
                                </Chip>
                            ))}
                    </ScrollView>
                </View>
                <Divider
                    marginTop={10}
                    style={{
                        height: 1,
                        backgroundColor: "lightgray",

                    }}
                />
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
                <ScrollView marginTop={10} >
                    {friends &&
                        [...friends]
                            .filter(
                                (item) => item?.handle?.indexOf(query) >= 0 || query.length < 2
                            )
                            .map((item) => (
                                <MemberCard
                                    key={item.uidvalue}
                                    data={item}
                                    onPress={() => {
                                        toggleSelection(item);
                                        console.log(item);
                                        console.log(selectedFriends)
                                    }}
                                    selected={selectedFriends.some(
                                        (friend) => friend.uidvalue == item.uidvalue
                                    )}
                                />
                            ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default CreateGroup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
    },
});