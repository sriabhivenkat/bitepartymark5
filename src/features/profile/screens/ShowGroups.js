import React, {useState} from "react";
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

const ShowGroups = ({ navigation, route }) => {
    const {user} = useUser();
    const {groups} = route?.params;
    console.log(groups)
    const [query, setQuery] = useState("");

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