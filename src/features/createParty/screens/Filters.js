import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Divider, Switch, List } from "react-native-paper";
import { Text } from "galio-framework";
import { Slider } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useParty, getUserLocation } from "lib";
import { ScrollView } from "react-native";
import Geocoder from 'react-native-geocoding';
import DateTimePicker from '@react-native-community/datetimepicker';

const Filters = ({ route, navigation }) => {
  const [radius, setRadius] = useState(5);
  const [count, setCount] = useState(10);
  const [isFamily, setIsFamily] = useState(false);
  const [isFastFood, setIsFastFood] = useState(false);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLong, setCurrentLong] = useState(0);
  const [longName, setName] = useState("");
  const [time, setTime] = useState(new Date());
  const [filters, setFilters] = useState([]);
  const [restriction, setRestrictions] = useState([]);

  const handleTap = (value) => {
    const exists = filters.find(
      (item) => item == value
    );

    if (exists) {
      setFilters(
        filters.filter((i) => i != value)
      );
    } else {
      setFilters([value, ...filters]);
    }
  }

  const handleRestricts = (value) => {
    const exists = restriction.find(
      (item) => item == value
    );

    if (exists) {
      setRestrictions(
        restriction.filter((i) => i != value)
      );
    } else {
      setRestrictions([value, ...filters]);
    }
  }
  const onChange = (event, selectedTime) => {
    const currentDate = selectedTime || time;
    setTime(currentDate);
    console.log(time)
  };

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
          setName(addressComponent)
        })
        .catch(error => console.warn(error))
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
        filters,
        restriction,
        time,
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
      <View style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <Text 
          style={{
            marginLeft: "10%",
            marginTop: "3%",
            fontSize: 20,
            fontFamily: "PingFangHK-Medium",
          }}
        >
          Time
        </Text>
        <DateTimePicker 
          value={time}
          mode='time'
          display='spinner'
          onChange={onChange}
          style={{alignItems: "center"}}
        />
      </View>
      <Divider />
        <Text 
          style={{
            marginLeft: "10%",
            marginTop: "3%",
            fontSize: 20,
            fontFamily: "PingFangHK-Medium",
          }}
        >
          Food
        </Text>
        <List.Section>
          <List.Accordion
            title="Select a cuisine"
            left={props => <List.Icon {...props} icon="food" />}
          >
            <List.Item title="American" value="tradamerican" onPress={() => {handleTap("tradamerican")}} style={filters.includes("tradamerican") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Boba" value="bubbletea" onPress={() => {handleTap("bubbletea")}} style={filters.includes("bubbletea") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Food Trucks" value="foodtrucks" onPress={() => {handleTap("foodtrucks")}} style={filters.includes("foodtrucks") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Breakfast" value="breakfast_brunch" onPress={() => {handleTap("breakfast_brunch")}} style={filters.includes("breakfast_brunch") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Chinese" value="chinese" onPress={() => {handleTap("chinese")}} style={filters.includes("chinese") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Fast Food" value="hotdogs" onPress={() => {handleTap("hotdogs")}} style={filters.includes("hotdogs") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Indian" value="indpak" onPress={() => {handleTap("indpak")}} style={filters.includes("indpak") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Japanese" value="japanese" onPress={() => {handleTap("japanese")}} style={filters.includes("japanese") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Mexican" value="mexican" onPress={() => {handleTap("mexican")}} style={filters.includes("mexican") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Thai" value="thai" onPress={() => {handleTap("thai")}} style={filters.includes("thai") && {backgroundColor: "lightgray"}}/>
          </List.Accordion>
        </List.Section>
      <Divider />
        <Text 
          style={{
            marginLeft: "10%",
            marginTop: "3%",
            fontSize: 20,
            fontFamily: "PingFangHK-Medium",
          }}
        >
          Restrictions
        </Text>
        <List.Section>
          <List.Accordion
            title="Select a dietary restriction"
            left={props => <List.Icon {...props} icon="tree" />}
          >
            <List.Item title="Halal" value="halal" onPress={() => {handleRestricts("halal")}} style={restriction.includes("halal") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Vegan" value="vegan" onPress={() => {handleRestricts("vegan")}} style={restriction.includes("vegan") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Vegetarian" value="vegetarian" onPress={() => {handleRestricts("vegetarian")}} style={restriction.includes("vegetarian") && {backgroundColor: "lightgray"}}/>
            <List.Item title="Kosher" value="kosher" onPress={() => {handleRestricts("kosher")}} style={restriction.includes("kosher") && {backgroundColor: "lightgray"}}/>
          </List.Accordion>
        </List.Section>
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
