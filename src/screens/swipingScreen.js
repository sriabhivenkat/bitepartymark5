import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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





export default function swipingScreen() {
    const [cards, setCards] = useState();
    const [data, setData] = useState([]);
    const [carrd, setCardDict] = useState()
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()

    Geolocation.getCurrentPosition(info => setLat(info.coords.latitude))
    Geolocation.getCurrentPosition(info => setLon(info.coords.longitude))

    const algoliasearch = require("algoliasearch");

    const client = algoliasearch("09UQ1K8B5P", "8acae8abeccfb55267b40a5d231b31e6");
    const index = client.initIndex("restaurants");

    useEffect(() => {
        Geolocation.getCurrentPosition(info => setLat(info.coords.latitude.toString()))
        Geolocation.getCurrentPosition(info => setLon(info.coords.longitude.toString()))

        index
            .search("", {

                aroundLatLng: "30.6384293, -96.3332523"

            })
            .then(({ hits }) => {
                setData(hits)

                console.log(data)
            });


    }

        , []);



    // replace with real remote data fetching
    useEffect(() => {
        const main = async () => {
            setTimeout(() => {
                const cardDict = data.map((x) => (
                    { text: x.name, backgroundColor: "blue", address: x.address, city: x.cit, state: x.state, zip: x.zip_score }
                ))

                setCards(cardDict)

            }, 3000);
        }
        main()
    }, []);

    function handleYes(card) {

        // console.log(`Yes for ${card.text}`);
        // console.log(lat)
        // console.log(lon)
        // console.log(lat + ', ' + lon)
        // console.log("30.6384293, -96.3332523")
        return true; // return false if you wish to cancel the action
    }
    function handleNo(card) {
        // console.log(lon)
        // console.log(`No for ${card.text}`);
        return true;
    }
    function handleMaybe(card) {
        // console.log(`Maybe for ${card.text}`);
        return true;
    }

    return (

        <View style={styles.container}>
            {cards ? (
                <SwipeCards
                    cards={data.map((x) => (
                        { text: x.name, backgroundColor: "red", address: x.address, city: x.city, state: x.state, zip: x.zip_code }

                    ))}
                    renderCard={(cardData) => <Card data={cardData} />}
                    keyExtractor={(cardData) => String(cardData.text)}
                    renderNoMoreCards={() => <StatusCard text="No more cards..." />}
                    handleYup={handleYes}
                    handleNope={handleNo}
                    handleMaybe={handleMaybe}
                    hasMaybeAction={true}

                // If you want a stack of cards instead of one-per-one view, activate stack mode
                // stack={true}

                />
            ) : (
                    <StatusCard text="Loading..." />
                )}
        </View>
    );
}

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

