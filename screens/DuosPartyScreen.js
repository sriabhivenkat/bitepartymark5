import React, { useContext, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider.js';
import firestore, { firebase } from "@react-native-firebase/firestore";
import { Avatar } from 'react-native-paper';


import SwipeCards from "react-native-swipe-cards-deck";
import Geolocation from '@react-native-community/geolocation';

function Card({ data }) {
    return (
        <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
            <View>
                <Text style={styles.cardsText2}>{data.text}</Text>
                <Text style={styles.cardsText3}>{data.address} </Text>
                <Text style={styles.cardsText3}>{data.city + "," + data.state + ' ' + data.zip} </Text>
            </View>
        </View>
    );
}

function StatusCard({ text }) {
    return (
        <View>
            <Text style={styles.cardsText}>{text}</Text>
        </View>
    );
}


const acceptInvite = (inviteId, uId) =>
    firestore()
        .collection("Users")
        .doc(uId)
        .collection("invitations")
        .doc(inviteId)
        .set({
            accepted: true,
        })


const DuosPartyScreen = ({ route }) => {
    const { partyID, inviteID } = route.params
    var count = -1;
    const { user } = useContext(AuthContext);
    const [participant, setParticipants] = useState([]);
    console.log({ partyID, inviteID })


    const [cards, setCards] = useState();
    const [data2, setData] = useState();
    const [carrd, setCardDict] = useState()
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()


    Geolocation.getCurrentPosition(info => setLat(info.coords.latitude))
    Geolocation.getCurrentPosition(info => setLon(info.coords.longitude))

    const algoliasearch = require("algoliasearch");

    const client = algoliasearch("09UQ1K8B5P", "8acae8abeccfb55267b40a5d231b31e6");
    const index = client.initIndex("restaurants");




    // replace with real remote data fetching
    useEffect(() => {
        const main = async () => {
            setTimeout(() => {
                const refVal = firebase.firestore().collection("Parties").doc(partyID);
                refVal.get()
                    .then(function (doc) {

                        if (doc.exists) {
                            console.log("Document data:", doc.data());
                            const { restaurants } = doc.data()
                            console.log(restaurants)
                            setData(restaurants)
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });

                setCards(data2)



            }, 3000);
        }
        main()
    }, []);

    function handleYes(card) {

        console.log(card)
        const refVal = firebase.firestore().collection("Parties").doc(partyID);
        refVal.get()
            .then(function (doc) {

                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    const { restaurants } = doc.data()
                    console.log(restaurants)
                    restaurants[count]["yesCount"] += 1
                    firestore()
                        .collection("Parties")
                        .doc(partyID)
                        .update({
                            'restaurants': restaurants,
                        })

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });




        count += 1
        console.log("Count is", count)
        return true; // returnfalse if you wish to cancel the action
    }

    function handleNo(card) {
        console.log(card)
        console.log(`No for ${card.text}`);
        count += 1
        return true;

    }
    function handleMaybe(card) {
        console.log(`Maybe for ${card.text}`);
        return true;
    }


    // useEffect(() => (
    //     acceptInvite(inviteID, user.uid)
    //         .then(() => console.log('Invite accepted'))
    //         .catch(err => alert(err))
    // ), [inviteID, partyID])



    console.log(participant[0])
    return (
        <View style={styles.container}>
            {cards ? (
                <SwipeCards
                    cards={
                        data2.map((x) => (
                            { text: x.nameR, backgroundColor: "red", address: x.address, city: x.city, state: x.state, zip: x.zip, yesCount: x.yesCount }

                        ))}
                    renderCard={(cardData) => <Card data={cardData} />}
                    keyExtractor={(cardData) => String(cardData.text)}
                    renderNoMoreCards={() => <StatusCard text="No more cards..." />}
                    handleYup={handleYes}
                    handleNope={handleNo}
                    handleMaybe={handleMaybe}
                    hasMaybeAction={true}

                    // If you want a stack of cards instead of one-per-one view, activate stack mode
                    stack={true}

                />
            ) : (
                    <StatusCard text="Loading..." />
                )}
        </View>
    );
}

export default DuosPartyScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        marginTop: 27,
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: 400,
        height: 750,
        borderRadius: 10
    },
    cardsText: {
        fontSize: 22,
    },
    cardsText2: {
        fontSize: 60,
        marginTop: 5
    },
    cardsText3: {
        fontSize: 45,
        marginTop: 5
    },
});

