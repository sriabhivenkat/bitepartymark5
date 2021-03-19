import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Switch } from 'react-native-paper'
import { Text } from 'galio-framework';
import { Slider } from 'react-native-elements';
import { AuthContext } from '../navigation/AuthProvider.js';
import { TouchableOpacity } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from '@react-native-community/async-storage';
import firestore, { firebase } from "@react-native-firebase/firestore";
import GetLocation from 'react-native-get-location';

const FiltersViewController = ({ route, navigation }) => {
    const [sliderval1, setSliderVal1] = useState(0);
    const [sliderval2, setSliderVal2] = useState(1);
    const [sliderval3, setSliderVal3] = useState(0);
    const { user } = useContext(AuthContext);
    const [switch1, setSwitch1] = useState(false);
    const [switch2, setSwitch2] = useState(false);
    const [handleval, setHandleVal] = useState("");


    const [locationval, setLocation] = useState({});
    const [userLat, setUserLat] = useState(0);
    const [userLong, setUserLong] = useState(0);

    const [geoPointNorth, setGeoPointNorth] = useState([]);
    const [geoPointSouth, setGeoPointSouth] = useState([]);
    const [geoPointEast, setGeoPointEast] = useState([]);
    const [geoPointWest, setGeoPointWest] = useState([]);
    const [data, setData] = useState([]);

    const [exportArray, setExportArray] = useState([]);
    const toggleSwitch1 = () => setSwitch1(previousState => !previousState);
    const toggleSwitch2 = () => setSwitch2(previousState => !previousState);

    const { partyID, imagePath, members, userHandle, admin } = route.params;

    useEffect(() => {
        AsyncStorage.getItem('handlequeryval')
            .then((value) => {
                setHandleVal(value);
            })
    }, []);
    const algoliasearch = require("algoliasearch");

    const client = algoliasearch("09UQ1K8B5P", "8acae8abeccfb55267b40a5d231b31e6");
    const index = client.initIndex("restaurants");

    useEffect(() => {

        index
            .search("", {

                aroundLatLng: "30.6384293, -96.3332523"

            })
            .then(({ hits }) => {
                setData(hits.map((x) => (
                    { address: x.address, city: x.city, cuisine: x.cuisine, nameR: x.name, objectId: x.objectId, state: x.state, web: x.website, zip: x.zip_code, yesCount: 0 }
                )))

            })


    }

        , []);





    function miles_to_latitude(miles) {
        return miles / 69
    }

    function miles_to_longitude(miles) {
        return miles / 54.6
    }
    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 1000,
        })
            .then(location => {
                setLocation(location);
                setUserLat(locationval.latitude);
                setUserLong(locationval.longitude);
                console.log(userLat, userLong)
            })
            .catch(error => console.log(error))
    }, [])


    useEffect(() => {
        setGeoPointNorth([userLat, userLong + miles_to_longitude(Math.round(sliderval1))])
        setGeoPointSouth([userLat, userLong - miles_to_longitude(Math.round(sliderval1))])
        setGeoPointEast([userLat + miles_to_latitude(Math.round(sliderval1)), userLong])
        setGeoPointWest([userLat - miles_to_latitude(Math.round(sliderval1)), userLong])
        console.log([geoPointNorth, geoPointSouth, geoPointEast, geoPointWest])
    }, [sliderval1, userLat, userLong])
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set some filters</Text>

            <View style={{ flex: 0.5, marginTop: "10%" }}>
                <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium" }}>How far are you willing to go?</Text>
                <Slider
                    value={sliderval1}
                    onValueChange={(value) => setSliderVal1(value)}
                    maximumValue={50}
                    animateTransitions={true}
                    thumbStyle={{ width: "9%", height: "72%", }}
                    thumbTintColor={"#f76f6d"}
                    style={{ width: "80%", marginLeft: "10%", marginTop: "2.5%", color: "#f76f6d" }}
                />
                <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "300", fontFamily: "PingFangHK-Medium" }}>{Math.round(sliderval1)} miles</Text>

                <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium", marginTop: "10%" }}>How many restaurant do you want recommended?</Text>
                <Slider
                    value={sliderval2}
                    onValueChange={(value) => setSliderVal2(value)}
                    maximumValue={10}
                    animateTransitions={true}
                    thumbStyle={{ width: "9%", height: "72%", }}
                    thumbTintColor={"#f76f6d"}
                    style={{ width: "80%", marginLeft: "10%", marginTop: "2.5%", color: "#f76f6d" }}
                />
                <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "300", fontFamily: "PingFangHK-Medium" }}>{Math.round(sliderval2)} restaurants</Text>
            </View>

            <View style={{ flex: 0.3, flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flex: 0.5, flexDirection: "column", alignItems: "center" }}>
                    <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium" }}>Family-Friendly?</Text>
                    <Switch
                        value={switch1}
                        onValueChange={toggleSwitch1}
                        style={{ marginTop: "4%" }}
                        color="#f76f6d"
                    />
                </View>

                <View style={{ flex: 0.5, flexDirection: "column", alignItems: "center", marginRight: "4%" }}>
                    <Text p style={{ marginLeft: "10%", color: "#f76f6d", fontWeight: "bold", fontFamily: "PingFangHK-Medium" }}>Want Fast Food?</Text>
                    <Switch
                        value={switch2}
                        onValueChange={toggleSwitch2}
                        style={{ marginTop: "4%" }}
                        color="#f76f6d"
                    />
                </View>
            </View>

            <View style={{ flex: 0.2, alignItems: "center" }}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.9}
                    onPress={() => {
                        firestore()
                            .collection("Users")
                            .doc(user.uid)
                            .collection("pastParties")
                            .doc(handleval)
                            .set({
                                "restrictions": [Math.round(sliderval1), Math.round(sliderval2), switch1, switch2]
                            })
                            .then(
                                firestore()
                                    .collection("Parties")
                                    .doc(partyID)
                                    .set({
                                        admin,
                                        restrictions: [Math.round(sliderval1), Math.round(sliderval2), switch1, switch2],
                                        participants: members,
                                        isDuo: members.length <= 1,
                                    }
                                    ))
                            .then(() => {
                                firestore()
                                    .collection("Users")
                                    .doc(user.uid)
                                    .collection("pastParties")
                                    .doc(members[0].handle)
                                    .set({
                                        location: "To be decided",
                                        isDuos: true,
                                        buddy: members[0].handle,
                                    })

                            })
                            .then(() => {
                                return AsyncStorage.setItem('handlequeryval', members[0].handle);
                            })
                            .then(() => {
                                console.log({ user, member: members[0] })
                                firestore()
                                    .collection("Users")
                                    .doc(members[0].uidvalue)
                                    .collection("invitations")
                                    .doc()
                                    .set({
                                        inviter: userHandle,
                                        isDuo: true,
                                        accepted: false,
                                        imagePath: imagePath,
                                        docID: partyID,
                                    })
                            })
                            .then(() => {
                                firestore()
                                    .collection("Restaurants")
                                    .where("latitude", '<=', geoPointEast[0] && "latitude", '>=', geoPointWest[0] && "longitude", '>=', geoPointSouth[1] && "longitude", '<=', geoPointNorth[1])
                                    .limit(Math.round(sliderval2))
                                    .get()
                                    .then((data) => {
                                        const query_results = data.docs.map((x) => x.data())
                                        console.log(query_results)
                                        setExportArray(query_results)
                                    })
                                    .then(() => {
                                        firestore()
                                            .collection("Parties")
                                            .doc(partyID)
                                            .update({
                                                'restaurants': data,
                                            })
                                    })
                            })
                            .then(navigation.navigate("DuosPartyScreen", { partyID, data }))
                            .catch(err => console.error(err))

                    }}
                    style={{ width: "80%", height: "40%", marginBottom: "5%" }}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#7f00ff', '#e100ff', '#ffaf7b']}
                        style={{ height: "100%", justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                        <Text style={{ color: "white", fontFamily: "PingFangHK-Regular", fontSize: 17, }}>Start party!</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                    console.log(data)}>
                    <Text>
                        press me
                        </Text>
                </TouchableOpacity>
                <Text>
                    {partyID}
                </Text>
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