import React, { useContext, useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import {Text} from 'galio-framework';
import {Button, Provider, Portal, Avatar} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider.js';
import {Input, ListItem, } from 'react-native-elements';
import firestore, { firebase } from "@react-native-firebase/firestore";
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import { Alert } from 'react-native';

const AddDuosViewController = () => {
    const [duosmember, setDuosMember] = useState([]);
    const [query, setQuery] = useState("");
    const { user } = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);

    const showView = () => setIsVisible(true);
    const hideView = () => setIsVisible(false);
    
    useEffect(() => {
        firestore()
          .collection("Users")
          .doc(user.uid)
          .collection("friends")
          .where("handle", "==", query)
          .get()
          .then((res) => {
            const results = res.docs.map((x) => x.data());
            setDuosMember(results);
          })
          .catch((err) => alert(err));
      }, [query]);
    return(
        <View style={styles.container}>
            <Text h3 style={styles.title}>Who's coming?</Text>
            <Input 
                placeholder="Pick a partner"
                onChangeText={(txt) => setQuery(txt)}
                autoCapitalize="none"
                value={query}
                containerStyle={{width: "90%",marginLeft: "4%"}}
            />
            {duosmember.map((item) => (           
                <View style={{marginTop: "-2%"}}>
                    <ListItem
                        Component={TouchableScale}
                        friction={90}
                        tension={100}
                        activeScale={0.95}
                        style={{borderBottomColor: "lightgray", borderBottomWidth: 1, borderTopColor: "lightgray", borderTopWidth: 1}}
                    >
                        <Avatar.Image size={45} source={{uri: item.imageUrlPath}}/>
                        <ListItem.Content style={styles.queryContent}>                    
                            <ListItem.Title style={styles.querytitle}>{"@"+item.handle}</ListItem.Title>
                            <ListItem.Subtitle style={styles.querysubtitle}>{item.firstName+" "+item.lastName}</ListItem.Subtitle>                   
                        </ListItem.Content>
                    </ListItem>
                </View>
            ))}
        </View>
    );
}
1
export default AddDuosViewController;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    queryView: {
        flex: 0.13,
        backgroundColor: "#16335e",
        marginTop: 20
    },
    queryContent: {
        width: "80%"
    },
    button: {
        marginTop: 20,
        height: 37,
        width:"50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
     },
    title: {
        padding: "5%",
        fontFamily: "PingFangHK-Medium",
        color: "#f76f6d",
        textAlign: "center",
        marginTop: "10%"
    },
    queryResults: {
        marginTop: 20,
        backgroundColor: "#16335e"
    },
    pfp: {
      alignItems: "center"
    },
    querytitle: {
      fontWeight: "bold",
      color: "black",
      textAlign: "center"
    },
    querysubtitle: {
      color: "black"
    },
});