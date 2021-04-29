import React, { useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, FlatList,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback } from "react-native";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { Text, Button } from "galio-framework";
import {Modal, Portal, Provider, Avatar} from "react-native-paper";
import {ListItem} from 'react-native-elements';
import {Input} from 'galio-framework'
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

    <TouchableWithoutFeedback 
    accessible = {false}
    onPress={() => Keyboard.dismiss()}> 

    <KeyboardAvoidingView
    behavior = "padding"
    style = {styles.container}>

    <View style={styles.container}>
      <Text h3 style={styles.text}>
        Add Friends
      </Text>
      <Input
        placeholder="Enter a handle"
        onChangeText={(txt) => setQuery(txt)}
        left
        icon="search"
        family="ionicons"
        iconSize={25}
        autoCapitalize="none"
        style={styles.searchbar}
        value={query}
      />
      {data.map((item) => (
        <View style={styles.queryView}>
          <TouchableOpacity onPress={showPanel} style={{backgroundColor: "white", paddingHorizontal: "4%", marginTop: "-3%"}}>
                <ListItem containerStyle={{borderWidth: 1, borderRadius: 20, backgroundColor: "white", paddingHorizontal: "4%"}}>
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
                           
                               .then(setVisible(false))
                               .then(alert("You added " + item.firstName + " as a friend!"))
                            }
                            
                           }>
                              {buttonMessage}
                          </Button>
                        
                    </Modal>
              </Portal>
          </Provider>
      ))}
    </View>
    </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
    backgroundColor: "white",
    marginTop: 20
  },
  modalContainer: {
      flex: 0.5
  },
  text: {
    padding: 20,
    color: "black",
    fontSize: 36,
    marginTop: "20%",
    fontFamily: "Kollektif",
  },
  searchbar: {
    width: "92.5%",
    borderColor: "black",
    borderWidth: 1.5,
    marginLeft: "4%",
    alignItems: "center",
    shadowColor: "black",
    shadowRadius: 30,
    borderRadius: 14,
    marginTop: "-5%",
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
    fontSize: 20,
    marginBottom: "1%",
    fontFamily: "Kollektif"
  },
  querysubtitle: {
    color: "black",
    fontFamily: "Kollektif",
    fontSize: 18,
  },
  modalStyling: {
    display: "flex",
    backgroundColor: "white",
    padding: 20,  
  },
});