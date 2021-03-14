import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SwipeCards from "react-native-swipe-cards-deck";

function Card({ data }) {
    return (
        <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
            <View>
                <Text style={styles.cardsText2}>{data.text}</Text>
                <Text style={styles.cardsText3}>{data.distance} miles away </Text>
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

export default function App() {
    const [cards, setCards] = useState();

    // replace with real remote data fetching
    useEffect(() => {
        setTimeout(() => {
            setCards([
                { text: "McDonalds", backgroundColor: "red", distance: 0.5 },
                { text: "Whatabuger", backgroundColor: "purple", distance: 20 },
                { text: "Chic-fil-A", backgroundColor: "green", distance: 3.7 },
                { text: "Chipotle", backgroundColor: "blue", distance: 4.5 },
                { text: "Mod Pizza", backgroundColor: "cyan", distance: 0.7 },
                { text: "Taco Bell", backgroundColor: "orange", distance: 1.3 },
            ]);
        }, 3000);
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
                    cards={cards}
                    renderCard={(cardData) => <Card data={cardData} />}
                    keyExtractor={(cardData) => String(cardData.text)}
                    renderNoMoreCards={() => <StatusCard text="No more cards..." />}
                    handleYup={handleYes}
                    handleNope={handleNo}
                    handleMaybe={handleMaybe}
                    hasMaybeAction={true}

                // If you want a stack of cards instead of one-per-one view, activate stack mode
                // stack={true}
                // stackDepth={3}
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

