import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { Text, Button } from "galio-framework";
import {Modal, Portal, Provider, Avatar} from "react-native-paper";
import {ListItem, Input} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../navigation/AuthProvider.js";

const AddFriendsViewController = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const showPanel = () => setVisible(true);
  const hidePanel = () => setVisible(false);
  const [userHandle, setUserHandle] = useState("");
  const [checkHandle, setCheckHandle] = useState([]);
  const [friendssize, setFriendsSize] = useState(0);
  const [buttonMessage, setButtonMessage] = useState("Add Friend");
  const [errorMessage, setErrorMessage] = useState("Friend added");

  useEffect(() => {
    const main = async() => {
        const refVal = firestore().collection("Users").doc(user.uid);
        const doc = await refVal.get();
        const {handle} = doc.data();

        refVal.collection("friends").get()
            .then(function(querySnapshot) {
                setFriendsSize(querySnapshot.docs.length);
            })
        setUserHandle(handle); 
    };
    main();
  }, []);


  useEffect(() => {
    firestore()
      .collection("Users")
      .where("handle", '!=', userHandle)
      .where("handle", "==", query)
      .get()
      .then((res) => {
        const results = res.docs.map((x) => x.data());
        setData(results);
      })
      .catch((err) => alert(err));
  }, [query]);

  const B = (props) => (
    <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  );
  
  useEffect(() => {
    firestore()
      .collection("Users")
      .doc(user.uid)
      .collection("friends")
      .get()
      .then((resvals) => {
        const resarr = resvals.docs.map((y) => y.data());
        setCheckHandle(resarr);
      })
      .catch((err) => alert(err));
  }, [])
  

  return (
    <View style={styles.container}>
      <Text h3 style={styles.text}>
        Add <B>Friends</B>
      </Text>
      <Input
        placeholder="Enter a handle"
        onChangeText={(txt) => setQuery(txt)}
        autoCapitalize="none"
        style={styles.searchbar}
        value={query}
      />
      {data.map((item) => (
        <View style={styles.queryView}>
            <TouchableOpacity onPress={showPanel} >
                <ListItem
                    Component={TouchableScale}
                    friction={90}
                    tension={100}
                    activeScale={0.95}
                    linearGradientProps= {{
                        colors: ["#FF9800", "#F44336"],
                        start: {x:1, y:0},
                        end: {x: 0.2, y:0},
                    }} 
                    ViewComponent = {LinearGradient}
                >
                    <Avatar.Image size={45} source={{uri: item.imageUrl}}/>
                    <ListItem.Content style={styles.queryContent}>                    
                        <ListItem.Title style={styles.querytitle}>{"@"+item.handle}</ListItem.Title>
                        <ListItem.Subtitle style={styles.querysubtitle}>{item.firstName+" "+item.lastName}</ListItem.Subtitle>                   
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>
        </View>
      ))}

      {data.map((item) => (
          <Provider>
              <Portal>
                    <Modal visible={visible} onDismiss={hidePanel} contentContainerStyle={styles.modalStyling}>
                        <Avatar.Image size={90} source={{uri: item.imageUrl}} style={{marginLeft: "auto", marginRight: "auto", marginBottom: 9}}/>
                        <Text h5 style={{textAlign: "center", fontWeight: "bold", color: "#f76f6d", marginBottom: 5}}>@{item.handle}</Text>
                        <Text p style={{textAlign: "center", marginBottom: 10}}>{item.firstName+" "+item.lastName}</Text>
                          <Button 
                            style={{backgroundColor: "#F06960", marginLeft: "auto", marginRight: "auto", width:"90%"}} 
                            onPress={() => {
                              var uidval = 
                              firestore()
                              .collection("Users")
                              .doc(user.uid)
                              .collection("friends")
                              .doc(item.uidvalue)
                              .set({
                                handle: item.handle,
                                firstName: item.firstName,
                                lastName: item.lastName,
                                imageUrlPath: item.imageUrl,
                                uidvalue: item.uidvalue
                              })
                              .then(
                                alert("Friend Added")
                              )
                              
                            }}>
                              {buttonMessage}
                          </Button>
                        
                    </Modal>
              </Portal>
          </Provider>
      ))}
    </View>
  );
};

export default AddFriendsViewController; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  queryView: {
    flex: 0.13,
    backgroundColor: "#16335e",
    marginTop: 20
  },
  modalContainer: {
      flex: 0.5
  },
  text: {
    padding: 20,
    color: "#f76f6d",
    fontSize: 45,
    marginTop: "20%",
    fontFamily: "PingFangHK-Medium",
  },
  searchbar: {
    marginLeft: 20,
    marginRight: 40,
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
    color: "white"
  },
  querysubtitle: {
    color: "white"
  },
  modalStyling: {
    display: "flex",
    backgroundColor: "white",
    padding: 20,  
  },
});