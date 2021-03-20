import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { View, Image, StyleSheet, ImageBackground, StatusBar, ScrollView } from "react-native";
import { AuthContext } from "../navigation/AuthProvider.js";
import { Text } from "galio-framework";
import { Icon } from 'react-native-elements';
import firestore from "@react-native-firebase/firestore";
import { Button } from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import TouchableScale from 'react-native-touchable-scale';
import { Card, Avatar } from 'react-native-paper';

const HomeViewController = ({ navigation }) => {

  const B = (props) => <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [duos, setDuos] = useState(false);
  const scrollViewRef = useRef();
  const increment = firestore.FieldValue.increment(1);

  useEffect(() => {
    alert(user.uid)
    firestore()
      .collection("Users")
      .doc(user.uid)
      .collection("invitations")
      .get()
      .then((res) => {
        const results = res.docs.map((x) => ({ ...x.data(), id: x.id }))
        setData(results);
      })
      .catch((err) => alert(err));
    console.log(data)

    firestore()
      .collection("Users")
      .doc(user.uid)
      .collection("invitations")
      .onSnapshot(onResult2, onError);


  }, []);
  function onError(error) {
    console.error(error);
  }

  function onResult2(QuerySnapshot) {
    const refVal =
      firestore().collection("Users").doc(user.uid);
    const doc = refVal.get();
    refVal
      .collection("invitations")
      .get()
      .then(function (querySnapshot) {
        const results = querySnapshot.docs.map((x) => ({ ...x.data(), id: x.id }))
        setData(results);
      });
  }

  // console.log(data[0].uid)
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
                  <Button mode="outlined" style={{ marginBottom: "20%", width: "200%" }} labelStyle={{ color: "green" }} onPress={() => navigation.navigate("DuosPartyScreen", { partyID: item.docID, inviteID: item.id })
                    .then(firestore().collection("Parties").doc(item.docID).update({ "participantCount": increment }))}
                  >Accept</Button>
                  {/* <Button mode="outlined" style={{width:"200%"}} labelStyle={{color: "red"}} onPress={() => {
                        firestore().collection("Users").doc(user.uid).collection("Invitations")
                      }}>Decline</Button> */}
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
