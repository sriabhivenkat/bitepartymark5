import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList} from 'react-native';
import {Text} from 'galio-framework';
import {SearchBar, ListItem} from 'react-native-elements';

const AddFriendsViewController = () => {
    const B = (props) => <Text style={{fontWeight: "bold"}}>{props.children}</Text>
    


    
    return(
        <View style={styles.container}>
            <Text h3 style={styles.text}>Add <B>Friends</B></Text>
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