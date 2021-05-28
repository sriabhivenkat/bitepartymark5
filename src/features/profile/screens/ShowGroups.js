import React, {useEffect, useState} from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaViuyew
} from "react-native";
import { Text } from "galio-framework";
import { TitleText, InviteCard, SubtitleText, GroupCard } from "components";
import {useUser} from 'lib';
import { Input } from "galio-framework";
import { ScrollView } from "react-native";
import { stubFalse } from "lodash";
import {useGroup} from 'lib';
import firestore, {firebase} from "@react-native-firebase/firestore";

const ShowGroups = ({ navigation, route }) => {
    const {user} = useUser();
    const {groups} = route?.params;
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [members, setMembers] = useState([]);
    var localArray = [];

    useEffect(() => {
        groups.map((item) => {
            localArray.push(item?.groupID)
        })
    })

    useEffect(() => {
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
    return(
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
                <FlatList 
                    data={groups}
                    style={{paddingTop: 5}}
                    snapToInterval={Dimensions.get("window").width}
                    indicatorStyle="black"
                    decelerationRate="fast"
                    renderItem={({item}) => (
                        <GroupCard 
                            id={item.groupID}
                            request={false}
                        />
                    )}
                />
            </View>
        </View>
    )
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