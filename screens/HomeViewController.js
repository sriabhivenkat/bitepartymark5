import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { View, Image, StyleSheet, FlatList, StatusBar, ScrollView } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { Text } from "galio-framework";
import firestore from "@react-native-firebase/firestore";
import { Button } from 'react-native-paper';
import { Card, Avatar } from 'react-native-paper';

const HomeViewController = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  const partyCollection = firestore().collection("Parties");
  const inviteCollection = firestore()
    .collection("Users")
    .doc(user.uid)
    .collection("invitations");

  // subscribe to invites list, remove subscription on mount
  useEffect(() => {
    const unsubscribe = inviteCollection.onSnapshot(
      (snapshot) => {
        const results = snapshot.docs.map((x) => ({ ...x.data(), id: x.id }));
        setData(results);
      },
      (err) => alert(err)
    );
    
    return () => unsubscribe();
  }, []);

  const handleAccept = async (invite) => {
    try {
      const increment = firestore.FieldValue.increment(1);
      await partyCollection
        .doc(invite.docID)
        .update({ participantCount: increment });

      await inviteCollection.doc(invite.id).update({
        accepted: true,
      });

      navigation.navigate("DuosPartyScreen", {
        partyID: invite.docID,
        inviteID: invite.id,
      });
    } catch (error) {
      console.error(error);
    }
   
  };
 
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <Text h2 style={styles.title}>Invitations</Text>
      <View style={styles.invitationscontainer}>
        <ScrollView
          contentInset={{ top: 0, left: 0, bottom: 300, right: 0 }}
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ flex: 1, borderWidth: 1, borderColor: "white", flexDirection: "column", marginBottom: "5%" }}>
          {data.map((item) => (
            <Card style={[styles.card, { maxHeight: 250, marginBottom: 20 }]}>
              <Card.Content style={{ marginLeft: "4%", marginTop: "5%", flexDirection: "row" }}>
                <View style={{ flexDirection: "column", justifyContent: "center" }}>
                  <Avatar.Image size={65} source={{ uri: item.imagePath }} />
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={
                      {
                        fontFamily: "PingFangHK-Light",
                        marginTop: "5%",
                        fontSize: 20
                      }
                    }>
                    {item.inviter}
                  </Text>
                  {item.isDuo == true &&
                    <Text style={{ fontFamily: "PingFangHK-Semibold", color: "#f76f6d", marginBottom: "7%" }}>Duo</Text>
                  }
                </View>

                <View style={{ flexDirection: "column", justifyContent: "flex-end", marginLeft: "5%" }}>
                  <Button
                    mode="outlined"
                    style={{ marginBottom: "20%", width: "200%" }}
                    labelStyle={{ color: "green" }}
                    onPress={() => handleAccept(item)}
                  >
                    Accept
                  </Button> 
                </View>
                {item.acc}
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeViewController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    color: "black",
    justifyContent: "center",
    marginLeft: "5%",
    fontSize: 43,
    fontFamily: "PingFangHK-Medium",
    marginTop: "15%"
  },
  invitationscontainer: {
    flex: 0.95,
    borderWidth: 1,
    borderRadius: 25,
    marginTop: "5%",
    borderColor: "white",
    marginLeft: "3%",
    marginRight: "3%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 100,
    elevation: 1,
  },
  title1: {
    marginTop: "2.5%",
    fontFamily: "PingFangHK-Medium",
    marginBottom: "2%",
    color: "#f76f6d",
    marginLeft: "5%",
  },
  button: {
    width: "80%",
    height: "75%",
  },
  card: {
    height: "35%",
    width: "100%",
    borderRadius: 25,
    shadowRadius: 4,
    marginBottom: "5%",
    marginRight: "5%",
  },
  bottomView: {
    width: '100%',
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
    position: "absolute",
    bottom: 0
  },

});
