import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList} from 'react-native';
import {Text} from 'galio-framework';
import {Searchbar} from 'react-native-paper';
import firestore, { firebase } from "@react-native-firebase/firestore";

const AddFriendsViewController = () => {
    const B = (props) => <Text style={{fontWeight: "bold"}}>{props.children}</Text>
    const [query, setQuery] = useState("");
    const [handlearr, setHandleArr] = useState([]);
    const [urlarr, setUrlArr] = useState([]);
    const onChangeSearch = queryval => setQuery(queryval);

    useEffect(() => {
        const main = async() => {
            const refval = firebase.firestore().collection("Users");
            const queryList = await refval.where('handle, firstName, lastName', '==', query).get();
            let handleArray = [];
            let urlArray = [];
            if (queryList.empty) {
                console.log("No records found.")
            } else {
                queryList.forEach((doc) => {
                    const {handle} = doc.data();
                    const {uid} = doc.id;
                    handleArray = handleArray.push(handle)
                    urlArray = urlArray.push(uid);
                })
                setHandleArr(handleArray);
                setUrlArr(urlArray);
                console.log(handlearr, urlarr);
            }
        }
        main();
    }, []);
    return(
        <View style={styles.container}>
            <Text h3 style={styles.text}>Add <B>Friends</B></Text>
            <Searchbar 
                placeholder="Enter name or handle."
                onChangeText={onChangeSearch}
                value = {query}
                style={styles.searchbar}
                autoCapitalize={false}
            />
        </View>
    );
}

export default AddFriendsViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16335e"
    },
    text: {
        padding: 20,
        color: "#f76f6d",
        fontSize: 45
    },
    searchbar: {
        marginLeft: 20,
        marginRight: 20
    }
});