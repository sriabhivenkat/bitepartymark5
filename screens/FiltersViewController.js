import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch } from 'react-native-paper'
import { Text } from 'galio-framework';
import { Slider } from 'react-native-elements';
import { AuthContext } from '../navigation/AuthProvider.js';
import { TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { firebase } from "@react-native-firebase/firestore";
import algoliasearch from 'algoliasearch';
import Geolocation from '@react-native-community/geolocation';
import { pick } from "lodash";

const getUserLocation = () =>
    // Promisify Geolocation.getCurrentPosition since it relies on outdated callbacks
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          resolve([30.626549768953662, -96.35597622531617])
          // resolve([latitude, longitude]);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 5,
        },
      );
    });

const FiltersViewController = ({ route, navigation }) => {
    const { user } = useContext(AuthContext);
    const [radius, setRadius] = useState(0);
    const [count, setCount] = useState(1);
    const [isFamily, setIsFamily] = useState(false);
    const [isFastFood, setIsFastFood] = useState(false);

    const toggleSwitch1 = () => setIsFamily(previousState => !previousState);
    const toggleSwitch2 = () => setIsFastFood(previousState => !previousState);

    const { partyID, members, admin} = route.params;

    const partyRef = firebase.firestore().collection("Parties").doc(partyID);
    const usersRef = firebase.firestore().collection("Users");
    
    const getNearby = async (radius, count) => {
      const client = algoliasearch(
        "09UQ1K8B5P",
        "8acae8abeccfb55267b40a5d231b31e6"
      );
      const index = client.initIndex("restaurants");
      const loc = await getUserLocation();
      console.log(loc) 

      const results = await index.search("", {
        aroundLatLng: loc.join(","),
        aroundRadius: Math.round(radius * 1609.34),
        hitsPerPage: Math.round(count),
      });

      console.log(results)

      return results.hits.map((hit) => ({
        ...pick(hit, [
          "name",
          "address",
          "_geoloc",
          "city",
          "website",
          "state",
          "zip_code",
          "cuisine",
        ]),
        matches: 0,
        id: hit.objectID
      }));
    };

    console.info(partyID);

    const handlePress = async () => {
      try {
        const restaurants = await getNearby(radius, count);
        await partyRef.set({
          admin: user.uid,
          restrictions: {
            radius,
            count,
            switch1: isFamily,
            switch2: isFastFood,
          },
          isDuo: members.length <= 1,
          restaurants
        });

        // voodoo magic to add all members at once
        let membersBatch = firebase.firestore().batch();
        members.forEach((doc) => {
          const docRef = partyRef.collection("members").doc(doc.uidvalue); 
          membersBatch.set(docRef, { ...doc, status: "pending" });
        });
        const currentUser = (await usersRef.doc(user.uid).get()).data();
        const docRef = partyRef.collection("members").doc(user.uid);
        membersBatch.set(docRef, { ...currentUser, status: "pending" });
        await membersBatch.commit();

        let invitesBatch = firebase.firestore().batch();
        [...members, {uidvalue: user.uid}].forEach((doc) => {
          const docRef = usersRef.doc(doc.uidvalue).collection("invitations").doc(doc.uidvalue);
          invitesBatch.set(docRef, {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            inviter: admin.handle,
            isDuo: members.length <= 1,
            status: user.uid == doc.uidvalue ? "accepted" : "pending",
            imagePath: admin.profileImage,
            docID: partyID,
          });
        });
        
        await invitesBatch.commit()
        navigation.navigate("DuosPartyScreen", { partyID, data: restaurants })

      } catch (error) {
        console.error(error);
      }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set some filters</Text>

            <View style={{ flex: 0.5, marginTop: "10%" }}>
                <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium" }}>How far are you willing to go?</Text>
                <Slider
                    value={radius}
                    onValueChange={(value) => setRadius(value)}
                    maximumValue={50}
                    animateTransitions={true}
                    thumbStyle={{ width: "9%", height: "72%", }}
                    thumbTintColor={"#f76f6d"}
                    style={{ width: "80%", marginLeft: "10%", marginTop: "2.5%", color: "#f76f6d" }}
                />
                <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "300", fontFamily: "PingFangHK-Medium" }}>{Math.round(radius)} miles</Text>

                <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium", marginTop: "10%" }}>How many restaurant do you want recommended?</Text>
                <Slider
                    value={count}
                    onValueChange={(value) => setCount(value)}
                    maximumValue={10}
                    animateTransitions={true}
                    thumbStyle={{ width: "9%", height: "72%", }}
                    thumbTintColor={"#f76f6d"}
                    style={{ width: "80%", marginLeft: "10%", marginTop: "2.5%", color: "#f76f6d" }}
                />
                <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "300", fontFamily: "PingFangHK-Medium" }}>{Math.round(count)} restaurants</Text>
            </View>

            <View style={{ flex: 0.3, flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flex: 0.5, flexDirection: "column", alignItems: "center" }}>
                    <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium" }}>Family-Friendly?</Text>
                    <Switch
                        value={isFamily}
                        onValueChange={toggleSwitch1}
                        style={{ marginTop: "4%" }}
                        color="#f76f6d"
                    />
                </View>

                <View style={{ flex: 0.5, flexDirection: "column", alignItems: "center", marginRight: "4%" }}>
                    <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium" }}>Want Fast Food?</Text>
                    <Switch
                        value={isFastFood}
                        onValueChange={toggleSwitch2}
                        style={{ marginTop: "4%" }}
                        color="#f76f6d"
                    />
                </View>
            </View>

            <View style={{ flex: 0.2, alignItems: "center" }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      handlePress()  

                    }}
                    style={[styles.button, { width: "80%", height: "40%", marginBottom: "5%" }]}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#7f00ff', '#e100ff', '#ffaf7b']}
                        style={{ height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                        <Text style={{ color: "white", fontFamily: "PingFangHK-Regular", fontSize: 17, }}>Start party!</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FiltersViewController;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    button: {
        marginTop: 20,
        height: 37,
        width: "50%",
        backgroundColor: "#F76F6D",
        borderRadius: 15
    },
    title: {
        padding: "5%",
        fontFamily: "PingFangHK-Medium",
        color: "#f76f6d",
        textAlign: "center",
        marginTop: "20%",
        fontSize: 35,

    },
    subheading: {
        fontFamily: "PingFangHK-Medium",
        color: "#f76f6d",
        textAlign: "center",
    },
});