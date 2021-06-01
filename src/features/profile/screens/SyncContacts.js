import React, { useContext, useEffect, useState } from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native";
import Contacts from 'react-native-contacts';
import { ScrollView } from "react-native";
import { ContactsCard } from "../../../components";
import { useFriends, useUser } from "lib";


const AddFriends = () => {
    
    const [contacts, setContacts] = useState([]);
    const { friends, addFriend } = useFriends();

    useEffect(() => {
        Contacts.getAllWithoutPhotos().then(contactval => {
            // const filtered = contactval.filter(
            //     contact => !friends.some(friend => {
            //         //console.log(contact?.phoneNumbers[0].number.slice(-4), friend?.sliced)
            //         return(contact?.phoneNumbers[0].number.slice(-4) == friend?.sliced)
            //     }))
            console.log(JSON.stringify(contactval, null, 2))
            console.log(JSON.stringify(friends, null, 2))
            setContacts(contactval);
            //console.log(contacts[0].phoneNumbers[0].number)
        })
    }, [])

    return(
        <SafeAreaView style={styles.container}>
        <View 
            style={{
                left: 22,
                top: 39.5,
            }}
        >
            <Text 
                style={{
                    fontFamily: "Kollektif",
                    fontSize: 33,
                }}
            >
                Contacts
            </Text>
        </View>
        <ScrollView
            style={{
                left: 20,
                top: 60,
            }}
            snapToAlignment="start"
        >
            {contacts.map((item) => {
                const isAdded = friends
                .map(({ uidvalue }) => uidvalue)
                .includes(item.uidvalue);
                return(
                <ContactsCard 
                    data={item}
                    onPress={() => 
                        !isAdded && 
                        addFriend(item)
                    }
                />)

                })}
        </ScrollView>
        </SafeAreaView>
    )
}

export default AddFriends;

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})