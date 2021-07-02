import React from "react";
import {
    StyleSheet,
    FlatList,
    StatusBar,
    Dimensions,
    View,
    Text
} from "react-native";
import { TitleText, InviteCard, PartyCard, SubtitleText } from "components";
import { SafeAreaView } from "react-native";
import { useInvites } from "lib/invites.js";

const randomSpinner = ({ navigation }) => {
    const { invites, rejectInvite, acceptInvite } = useInvites();

    const acceptedInvites = invites?.filter((item) => item.status == "accepted");
    const pendingInvites = invites?.filter((item) => item.status == "pending");


    // console.log({ pendingInvites });


    const startParty = async () => {
        try {
            navigation.navigate("joinParty", {
                screen: "joinParty/swiping",
                params: { partyID: partyId },
            });

            let loc;
            if (selectionval.length == 0) {
                loc = await getUserLocation();
            } else {
                const res = await Geocoder.from(selectionval);
                const data = res.results[0].geometry.location;
                loc = [data.lat, data.lng];
            }
            const id = await createParty(selectedFriends, {
                loc,
                count,
                radius,
                filters,
                price,
                time,
                showOpen,
                restrictions,
                autoResolve: !link,
            });
        } catch (err) {
            Alert.alert(
                "No matches!",
                "We couldn't find anything that matched your filters. Try again with less restrictive filters",
                [
                    {
                        text: "Ok",
                        onPress: () =>
                            navigation.navigate("createParty/filters", {
                                partyID: partyId,
                                selectedFriends,
                            }),
                    },
                ]
            );
            console.error(err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle="dark-content" />

            <View>
                <Text>
                    Hello
                </Text>


            </View>
        </SafeAreaView>
    );
};

export default randomSpinner;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        flex: 1,
    },
    title: {
        marginTop: 30,
    },
    subtitle: {
        color: "#ee0979",
    },
});
