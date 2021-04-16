import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Divider, Switch } from "react-native-paper";
import { Text } from "galio-framework";
import { Slider } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useParty, getUserLocation } from "lib";
import { ScrollView } from "react-native";
import Geocoder from 'react-native-geocoding';

const Filters = ({ route, navigation }) => {
  const [radius, setRadius] = useState(5);
  const [count, setCount] = useState(10);
  const [isFamily, setIsFamily] = useState(false);
  const [isFastFood, setIsFastFood] = useState(false);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLong, setCurrentLong] = useState(0);
  const [longName, setName] = useState("");
  Geocoder.init("AIzaSyBA1ZXfKjDXPiHrT3L2Hnut3ez38_Ww4S8", {language : "en"});
  const { selectedFriends, partyId } = route.params;
  console.log({ partyId });

  const { createParty } = useParty(partyId);

  const toggleSwitch1 = () => setIsFamily((previousState) => !previousState);
  const toggleSwitch2 = () => setIsFastFood((previousState) => !previousState);
  
  
  useEffect(() => {
    const main = async() => {
      const position = await getUserLocation();
      console.log(position);
      setCurrentLat(position[0]);
      setCurrentLong(position[1]);
      Geocoder.from(currentLat, currentLong)
        .then(json => {
                var addressComponent = json.results[2].formatted_address;
          console.log(json.results)
          setName(addressComponent)
        })
        .catch(error => console.warn(error));
    };
    main();
  }, [currentLat, currentLong]);

  const handlePress = async () => {
    try {
      const loc = await getUserLocation();
      const id = await createParty(selectedFriends, {
        loc,
        count,
        radius,
        isFamily,
        isFastFood,
      });
      navigation.navigate("joinParty", {
        screen: "joinParty/swiping",
        params: { partyID: id },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Party Details</Text>
      <Divider />
      <Text 
        style={{
          marginLeft: "10%",
          marginTop: "3%",
          fontSize: 20,
          fontFamily: "PingFangHK-Medium",
        }}
      >
        Location
      </Text>
      <Text
        style={{
          fontSize: 17.5,
          textAlign: "center",
          fontFamily: "PingFangHK-Medium",
          padding: "3%",
          paddingBottom: "4%"
        }}
        numberOfLines={2}
      >
        {longName}
      </Text>
      <Divider />
      <View style={{ marginTop: "5%", }}>
        <View style={{display: "flex", flexDirection: "row"}}>
          <Text
            p
            style={{
              marginLeft: "10%",
              fontWeight: "bold",
              fontFamily: "PingFangHK-Medium",
            }}
          >
            Radius
          </Text>
          <Text
          p
          style={{
            position: "absolute",
            right: "11%",
            fontWeight: "300",
            fontFamily: "PingFangHK-Medium",
          }}
        >
          {Math.round(radius)} miles
        </Text>
        </View>
        <Slider
          value={radius}
          onValueChange={(value) => setRadius(value)}
          minimumValue={1}
          maximumValue={24}
          animateTransitions={true}
          thumbStyle={{ width: "9%", height: "72%" }}
          thumbTintColor={"#f76f6d"}
          style={{
            width: "80%",
            marginLeft: "10%",
            marginTop: "2.5%",
            color: "#f76f6d",
            marginBottom: "5%"
          }}
        />
        <Divider />
        <View style={{display: "flex", flexDirection: "row"}}>
          <Text
            p
            style={{
              marginLeft: "10%",
              fontWeight: "bold",
              fontFamily: "PingFangHK-Medium",
              marginTop: "10%",
            }}
          >
            Count
          </Text>
          <Text
            p
            style={{
              marginTop: "10%",
              position: "absolute",
              right: "11%",
              fontWeight: "300",
              fontFamily: "PingFangHK-Medium",
            }}
          >
            {Math.round(count)} restaurants
          </Text>
        </View>
          <Slider
            value={count}
            onValueChange={(value) => setCount(value)}
            minimumValue={3}
            maximumValue={15}
            animateTransitions={true}
            thumbStyle={{ width: "9%", height: "72%" }}
            thumbTintColor={"#f76f6d"}
            style={{
              width: "80%",
              marginLeft: "10%",
              marginTop: "2.5%",
              color: "#f76f6d",
            }}
          />
          
        </View>
      <View
        style={{
          // flex: 0.3,
          flexDirection: "row",
          justifyContent: "center",
          // marginTop: 80,
        }}
      >
        

        
      </View>

      <View style={{ maxHeight: 150, alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            handlePress();
          }}
          style={[
            styles.button,
            { width: "80%", height: "40%", marginBottom: "5%" },
          ]}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#7f00ff", "#e100ff", "#ffaf7b"]}
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "PingFangHK-Regular",
                fontSize: 17,
              }}
            >
              Start party!
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  button: {
    marginTop: 20,
    height: 37,
    width: "50%",
    backgroundColor: "#F76F6D",
    borderRadius: 15,
  },
  title: {
    padding: "5%",
    fontFamily: "PingFangHK-Medium",
    color: "black",
    fontSize: 35,
  },
  subheading: {
    fontFamily: "PingFangHK-Medium",
    color: "#f76f6d",
    textAlign: "center",
  },
});
