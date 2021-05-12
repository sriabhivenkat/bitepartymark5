import React, { useContext, useEffect, useState, useRef } from "react";
import { View, Image, StyleSheet, FlatList,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback } from "react-native";
import { Text, Input } from "galio-framework";
import Geocoder from 'react-native-geocoding';
import {getUserLocation } from "lib";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Alert } from "react-native";

const ChangeLocation = ({ route, navigation }) => {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [currentLat, setCurrentLat] = useState(0);
    const [currentLong, setCurrentLong] = useState(0);
    const [longName, setName] = useState("");
    const [fullName, setFullName] = useState("");
    const ref = useRef();
    const [selection, setSelection] = useState("");
    

    Geocoder.init("AIzaSyBudsRFHgcT7lqUV3xQ9oiM0MquRynmGzI", {language : "en"});
    useEffect(() => {
        const main = async() => {
          const position = await getUserLocation();
          console.log(position);
          setCurrentLat(position[0]);
          setCurrentLong(position[1]);
          console.log(currentLat, currentLong)
          Geocoder.from(29.7174, -95.4018)
            .then(json => {
                    var addressComponent = json.results[4].formatted_address;
                    var fullAddress = json.results[0].formatted_address;
                    console.log(addressComponent)
              setName(addressComponent);
              setFullName(fullAddress);
            })
            .catch(error => console.warn(error))
        };
        main();
      }, [currentLat, currentLong]);

      useEffect(() => {
        ref.current?.setAddressText(fullName)
      }, [])
    return(
        <View style={styles.container}>
            <Text h3 style={styles.text}>
                Location
            </Text>
            {/* <Input
                placeholder={"You're in "+longName}
                onChangeText={(txt) => setQuery(txt)}
                left
                icon="search"
                family="ionicons"
                iconSize={25}
                autoCapitalize="none"
                style={styles.searchbar}
                value={query}
            /> */}
            <GooglePlacesAutocomplete
                placeholder={"You're in "+longName+" right now."}
                minLength={3}
                autoFocus={false}
                returnKeyType={'default'}
                isRowScrollable={true}
                currentLocation={true}
                enablePoweredByContainer={false}
                onPress={(data=null) => {
                    console.log(data.description)
                    navigation.navigate({
                        name: "createParty/filters",
                        params: {selection: data.description},
                        merge: true,
                    })
                }}
                query={{
                    key: 'AIzaSyBudsRFHgcT7lqUV3xQ9oiM0MquRynmGzI',
                    language: 'en',
                }}
                textInputProps={{
                    width: "92.5%",
                    borderColor: "black",
                    borderWidth: 2,
                    color: "black",
                    marginLeft: "2%",
                    marginRight: "5%",
                    left: 5,
                    alignItems: "center",
                    shadowColor: "black",
                    shadowRadius: 30,
                    borderRadius: 14,
                    leftIcon: { type: 'ionicons', name: 'search' },
                }}
                styles={{
                    listView: {
                        backgroundColor: "white",
                    },
                    row: {
                        backgroundColor: 'white',
                        height: 50,
                        flexDirection: 'row',
                        alignItems: "center"
                    },
                    description: {
                        fontFamily: "Kollektif",
                        display: "flex",
                        fontSize: 17,
                    },
                    textInput: {
                        color: "black"
                    }
                }}
            />
        </View>

    );
}

export default ChangeLocation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
})