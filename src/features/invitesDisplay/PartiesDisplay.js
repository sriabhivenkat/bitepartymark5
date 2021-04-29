import React from "react";
import {
    StyleSheet,
    FlatList,
    StatusBar,
    Dimensions,
    View,
} from "react-native";
import { TitleText, InviteCard, PartyCard, SubtitleText } from "components";
import { SafeAreaView } from "react-native";
import { useInvites } from "lib/invites.js";

const PartiesDisplay = ({ navigation }) => {
    const { invites, rejectInvite, acceptInvite } = useInvites();

    const acceptedInvites = invites?.filter((item) => item.status == "accepted");
    const pendingInvites = invites?.filter((item) => item.status == "pending");

    const handleAccept = (invite) =>
        acceptInvite(invite)
            .then(() =>
                navigation.navigate("joinParty/swiping", {
                    partyID: invite.docID,
                })
            )
            .catch((err) => console.error(err));

    const handleReject = (invite) => {
        rejectInvite(invite).catch((err) => console.error(err));
    };
    // console.log({ pendingInvites });

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar barStyle="dark-content" />

            <View>
                <FlatList
                    data={invites && acceptedInvites}
                    style={{ paddingTop: 10 }}
                    decelerationRate="fast"
                    indicatorStyle="black"
                    renderItem={({ item }) => <PartyCard invite={item} />}
                    keyExtractor={(item) => item.docId}
                />



            </View>
        </SafeAreaView>
    );
};

export default PartiesDisplay;

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
