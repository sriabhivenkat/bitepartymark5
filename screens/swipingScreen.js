import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SwipeCards from "react-native-swipe-cards-deck";
import firestore from "@react-native-firebase/firestore";

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

    useEffect(() => {
        const main = async () => {
            firestore()
                .collection("Restaurants")
                .get()
                .then((res) => {
                    const results = res.docs.map((x) => ({ ...x.data(), id: x.id }))
                    setData(results);

                })

                .catch((err) => alert(err));



        }
        main()
    }, []);



    // replace with real remote data fetching
    useEffect(() => {
        const main = async () => {
            setTimeout(() => {
                const cardDict = data.map((x) => (
                    { text: x.name, backgroundColor: "red", address: x.address, city: x.city, state: x.province, zip: x.postalCode }

                ))
                console.log("The restaurants are:" + cardDict)
                setCards(cardDict);
            }, 3000);
        }
        main()
    }, []);

    function handleYes(card) {
        console.log(`Yes for ${card.text}`);
        return true; // return false if you wish to cancel the action
    }
    function handleNo(card) {
        console.log(`No for ${card.text}`);
        return true;
    }
    function handleMaybe(card) {
        console.log(`Maybe for ${card.text}`);
        return true;
    }

    return (
        <View style={styles.container}>
            {cards ? (
                <SwipeCards
                    cards={data.map((x) => (
                        { text: x.name, backgroundColor: "red", address: x.address, city: x.city, state: x.province, zip: x.postalCode }

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

