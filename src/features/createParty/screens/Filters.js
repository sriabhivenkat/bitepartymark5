import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Divider, Switch, List, ToggleButton } from "react-native-paper";
import { Text } from "galio-framework";
import { Slider } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useParty, getUserLocation, reverseGeocode } from "lib";
import { ScrollView } from "react-native";
import Geocoder from "react-native-geocoding";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GradientButton } from "components/GradientButton.js";
import { Alert } from "react-native";
import { PricingSelector, TitleText } from "../../../components";

const Filters = ({ route, navigation }) => {
  const [radius, setRadius] = useState(5);
  const [count, setCount] = useState(10);
  const [time, setTime] = useState(new Date());
  const [filters, setFilters] = useState([]);
  const [restriction, setRestrictions] = useState([]);
  const [price, setPrice] = useState([1, 2, 3, 4]);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLong, setCurrentLong] = useState(0);
  const [longName, setName] = useState("");

  const handleTap = (value) => {
    const exists = filters.find((item) => item == value);

    if (exists) {
      setFilters(filters.filter((i) => i != value));
    } else {
      setFilters([value, ...filters]);
    }
  };

  const handleRestricts = (value) => {
    const exists = restriction.find((item) => item == value);

    if (exists) {
      setRestrictions(restriction.filter((i) => i != value));
    } else {
      setRestrictions([value, ...filters]);
    }
  };
  const onChange = (event, selectedTime) => {
    const currentDate = selectedTime || time;
    setTime(currentDate);
    console.log(time);
  };

  Geocoder.init("AIzaSyBudsRFHgcT7lqUV3xQ9oiM0MquRynmGzI", { language: "en" });
  const { selectedFriends, partyId } = route.params;

  const [selectionval, setSelectionVal] = useState("");
  //passing data back from changelocation screen
  useEffect(() => {
    if (route.params?.selection) {
      setSelectionVal(route.params?.selection);
      console.log(selectionval);
    }
  }, [route.params?.selection]);

  console.log({ partyId });

  const { createParty } = useParty(partyId);

  useEffect(() => {
    const main = async () => {
      const position = await getUserLocation();
      console.log(position);
      setCurrentLat(position[0]);
      setCurrentLong(position[1]);
      console.log(currentLat, currentLong);
      Geocoder.from(currentLat, currentLong)
        .then(json => {
                var addressComponent = json.results[4].formatted_address; // new commen
                console.log(addressComponent)
          setName(addressComponent);
        })
        .catch((error) => console.warn(error));
    };
    main();
  }, [currentLat, currentLong]);

  const startParty = async () => {
    try {
      if (selectionval === "") {
        const loc = await getUserLocation();
        const id = await createParty(selectedFriends, {
          loc,
          count,
          radius,
          filters,
          restriction,
          price,
          // pricing,
          time,
        });
        navigation.navigate("joinParty", {
          screen: "joinParty/swiping",
          params: { partyID: id },
        });
      } else {
        Geocoder.from(selectionval)
          .then((json) => {
            var location = json.results[0].geometry.location;
            var loc = [location.lat, location.lng];
            return createParty(selectedFriends, {
              loc,
              count,
              radius,

              filters,
              restriction,
              price,
              time,
            });
          })
          .then((id) =>
            navigation.replace("joinParty", {
              screen: "joinParty/swiping",
              params: { partyID: id },
            })
          )
          .catch((error) =>
            Alert.alert(
              "No matches!",
              "We couldn't find anything that matched your filters. Try again with less restrictive filters"
            )
          );
      }
    } catch (err) {
      Alert.alert(
        "No matches!",
        "We couldn't find anything that matched your filters. Try again with less restrictive filters"
      );
      console.error(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View paddingHorizontal={20}>
        <TitleText>Filters</TitleText>
      </View>
      <View display="flex" flexDirection="column" justifyContent="center">
        <SectionLabel label="Price" />
        <PricingSelector value={price} onChange={(val) => setPrice(val)} />
      </View>
      <Divider style={{ marginTop: 10 }} />
      <View flexDirection="column" justifyContent="center">
        <SectionLabel label="Location" />
        {selectionval === "" && ( //what
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                marginTop: "3%",
                fontSize: 19,
                fontFamily: "Kollektif",
              }}
            >
              {/* Search in {longName} */}
              Current Location
            </Text>
            <Text style={{ top: 3, fontFamily: "Kollektif", fontSize: 17 }}>
              or
            </Text>
            <GradientButton
              style={{ minWidth: 30, marginVertical: 10, width: "80%" }}
              onPress={() => {
                navigation.navigate("createParty/filters/changeLocation");
              }}
            >
              Change my location!
            </GradientButton>
          </View>
        )}
        {selectionval != "" && (
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text
              style={{
                fontFamily: "Kollektif",
                fontSize: 20,
              }}
            >
              Find restaurants in
            </Text>
            <Text
              p
              style={{
                fontFamily: "Kollektif",
                paddingVertical: 5,
              }}
            >
              {selectionval}
            </Text>
            <GradientButton
              style={{ minWidth: 30, marginVertical: 10, width: "80%" }}
              onPress={() => {
                navigation.navigate("createParty/filters/changeLocation");
              }}
            >
              Change my location!
            </GradientButton>
          </View>
        )}
      </View>
      {/* <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <SectionLabel label="Time" />
        <View
          style={{ display: "flex", flexDirection: "row", marginBottom: "2%" }}
        >
          <Text
            style={{
              fontFamily: "Kollektif",
              fontSize: 17.5,
              marginTop: "3%",
              marginLeft: "10%",
            }}
          >
            Select a time:
          </Text>
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onChange}
            style={{ right: 40, position: "absolute", width: "25%" }}
          />
        </View>
      </View> */}
      <Divider style={{ marginTop: 10 }} />
      <SectionLabel label="Cuisine" />
      <List.Section>
        <List.Accordion
          title="Select a cuisine"
          left={(props) => (
            <List.Icon {...props} icon="food" color={"#f76f6d"} />
          )}
          titleStyle={{ color: "#f76f6d" }}
        >
          <List.Item
            title="Alcohol"
            value="bars"
            onPress={() => {
              handleTap("bars");
            }}
            style={
              filters.includes("bars") && {
                backgroundColor: "lightgray",
              }
            }
          />
          <List.Item
            title="American"
            value="tradamerican"
            onPress={() => {
              handleTap("tradamerican");
            }}
            style={
              filters.includes("tradamerican") && {
                backgroundColor: "lightgray",
              }
            }
          />
          <List.Item
            title="Boba"
            value="bubbletea"
            onPress={() => {
              handleTap("bubbletea");
            }}
            style={
              filters.includes("bubbletea") && { backgroundColor: "lightgray" }
            }
          />
          <List.Item
            title="Breakfast"
            value="breakfast_brunch"
            onPress={() => {
              handleTap("breakfast_brunch");
            }}
            style={
              filters.includes("breakfast_brunch") && {
                backgroundColor: "lightgray",
              }
            }
          />
          <List.Item
            title="Chinese"
            value="chinese"
            onPress={() => {
              handleTap("chinese");
            }}
            style={
              filters.includes("chinese") && { backgroundColor: "lightgray" }
            }
          />
          <List.Item
            title="Coffee and Tea"
            value="coffee"
            onPress={() => {
              handleTap("coffee");
            }}
            style={
              filters.includes("coffee") && {
                backgroundColor: "lightgray",
              }
            }
          />
          <List.Item
            title="Desserts"
            value="desserts"
            onPress={() => {
              handleTap("desserts");
            }}
            style={
              filters.includes("desserts") && {
                backgroundColor: "lightgray",
              }
            }
          />
          <List.Item
            title="Food Trucks"
            value="foodtrucks"
            onPress={() => {
              handleTap("foodtrucks");
            }}
            style={
              filters.includes("foodtrucks") && { backgroundColor: "lightgray" }
            }
          />
          <List.Item
            title="Fast Food"
            value="hotdogs"
            onPress={() => {
              handleTap("hotdogs");
            }}
            style={
              filters.includes("hotdogs") && { backgroundColor: "lightgray" }
            }
          />
          <List.Item
            title="Indian"
            value="indpak"
            onPress={() => {
              handleTap("indpak");
            }}
            style={
              filters.includes("indpak") && { backgroundColor: "lightgray" }
            }
          />
          <List.Item
            title="Japanese"
            value="japanese"
            onPress={() => {
              handleTap("japanese");
            }}
            style={
              filters.includes("japanese") && { backgroundColor: "lightgray" }
            }
          />
          <List.Item
            title="Mexican"
            value="mexican"
            onPress={() => {
              handleTap("mexican");
            }}
            style={
              filters.includes("mexican") && { backgroundColor: "lightgray" }
            }
          />
          <List.Item
            title="Thai"
            value="thai"
            onPress={() => {
              handleTap("thai");
            }}
            style={filters.includes("thai") && { backgroundColor: "lightgray" }}
          />
        </List.Accordion>
      </List.Section>
      <Divider />
      <SectionLabel label="Dietary Restrictions" />
      <List.Section>
        <List.Accordion
          title="Select a dietary restriction"
          left={(props) => (
            <List.Icon {...props} icon="tree" color={"#f76f6d"} />
          )}
          titleStyle={{ color: "#f76f6d" }}
        >
          <List.Item
            title="Halal"
            value="halal"
            onPress={() => {
              handleRestricts("halal");
            }}
            style={
              restriction.includes("halal") && { backgroundColor: "lightgray" }
            }
          />
          <List.Item
            title="Vegan"
            value="vegan"
            onPress={() => {
              handleRestricts("vegan");
            }}
            style={
              restriction.includes("vegan") && { backgroundColor: "lightgray" }
            }
          />
          <List.Item
            title="Vegetarian"
            value="vegetarian"
            onPress={() => {
              handleRestricts("vegetarian");
            }}
            style={
              restriction.includes("vegetarian") && {
                backgroundColor: "lightgray",
              }
            }
          />
          <List.Item
            title="Kosher"
            value="kosher"
            onPress={() => {
              handleRestricts("kosher");
            }}
            style={
              restriction.includes("kosher") && { backgroundColor: "lightgray" }
            }
          />
        </List.Accordion>
      </List.Section>
      <Divider />
      <View style={{ marginTop: "5%" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <SectionLabel label="Radius" />
        </View>
        <View>
          <Text
            p
            style={{
              position: "absolute",
              right: 40,
              bottom: 60,
              fontWeight: "300",
              fontFamily: "Kollektif",
            }}
          >
            {Math.round(radius)} miles
          </Text>
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
              marginBottom: "5%",
            }}
          />
        </View>

        <Divider />
        <View style={{ display: "flex", flexDirection: "row" }}>
          <SectionLabel label="Count" />
        </View>
        <View>
          <Text
            p
            style={{
              position: "absolute",
              right: 40,
              bottom: 40,
              fontWeight: "300",
              fontFamily: "Kollektif",
            }}
          >
            {Math.round(count)} restaurants
          </Text>
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
      </View>

      <View flex={1} paddingHorizontal={40} paddingVertical={30}>
        <GradientButton onPress={startParty}>Start Party!</GradientButton>
      </View>
    </ScrollView>
  );
};

export default Filters;

const SectionLabel = ({ label }) => (
  <Text
    style={{
      marginLeft: 40,
      marginTop: 20,
      fontSize: 22.5,
      fontFamily: "Kollektif",
    }}
  >
    {label}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    padding: "5%",
    fontFamily: "Kollektif",
    color: "black",
    fontSize: 35,
  },
});
