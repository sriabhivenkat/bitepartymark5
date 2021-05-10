import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Divider, Switch, List, ToggleButton } from "react-native-paper";
import { Text } from "galio-framework";
import { Slider } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useParty, getUserLocation } from "lib";
import { ScrollView } from "react-native";
import Geocoder from 'react-native-geocoding';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GradientButton } from "components/GradientButton.js";
import { Alert } from "react-native";

const Filters = ({ route, navigation }) => {
  const [radius, setRadius] = useState(5);
  const [count, setCount] = useState(10);
  const [isFamily, setIsFamily] = useState(false);
  const [isFastFood, setIsFastFood] = useState(false);
  const [loc, setLocVal] = useState([]);
  const [longName, setName] = useState("");
  const [time, setTime] = useState(new Date());
  const [filters, setFilters] = useState([]);
  const [restriction, setRestrictions] = useState([]);
  const [pricingvalue, setPricingValue] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(false)

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

  Geocoder.init("AIzaSyBudsRFHgcT7lqUV3xQ9oiM0MquRynmGzI", {language : "en"});
  const { selectedFriends, partyId } = route.params;

  const [selectionval, setSelectionVal] = useState("");
  //passing data back from changelocation screen
  useEffect(() => {
    if(route.params?.selection) {
      setSelectionVal(route.params?.selection)
      console.log(selectionval)
    }
  }, [route.params?.selection])

  

  console.log({ partyId });

  const { createParty } = useParty(partyId);

  const toggleSwitch1 = () => setIsFamily((previousState) => !previousState);
  const toggleSwitch2 = () => setIsFastFood((previousState) => !previousState);
  const [pricing, setPricing] = useState(0)

  

  const handlePress = async () => {
    try {
      if(selectionval===""){
        const loc = await getUserLocation();
        const id = await createParty(selectedFriends, {
          loc,
          count,
          radius,
          isFamily,
          isFastFood,
          filters,
          restriction,
          pricingvalue,
          time,
        });
        navigation.navigate("joinParty", {
          screen: "joinParty/swiping",
          params: { partyID: id },
        });
      } else {
        Geocoder.from(selectionval).then(json => {
          var location = json.results[0].geometry.location;
          var loca = [location.lat, location.lng];
          setLocVal(loca);
        }).catch(error => console.warn(error));
        const id = await createParty(selectedFriends, {
          loc,
          count,
          radius,
          isFamily,
          isFastFood,
          filters,
          restriction,
          pricingvalue,
          time,
        });
        navigation.navigate("joinParty", {
          screen: "joinParty/swiping",
          params: { partyID: id },
        });
        Alert.alert(loc)
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Filters</Text>
      
      <View style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <Text 
          style={{
            marginLeft: "10%",
            marginTop: "3%",
            fontSize: 22.5,
            fontFamily: "Kollektif",
          }}
        >
          Price
        </Text>
        <View style={{display: "flex", flexDirection: "row", marginLeft: 5}}>
          <TouchableOpacity 
            onPress={() => {handleTap("1")}}
            style={[filters.includes("1") && {backgroundColor: "lightgray",}, {padding: 0.5, borderWidth: 1, borderColor: "gray", width: 80, height:40, borderRadius: 25, left: 30, marginTop: 15, alignItems: "center", justifyContent: "center", marginRight: 8}]}
          >
            <Text p style={[filters.includes("1") && {color: "black"}]}>$</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {handleTap("2")}}
            style={[filters.includes("2") && {backgroundColor: "lightgray"}, {padding: 0.5, borderWidth: 1, borderColor: "gray", width: 80, height:40, borderRadius: 25, left: 30, marginTop: 15, alignItems: "center", justifyContent: "center", marginRight: 8}]}
          >
            <Text p>$$</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {handleTap("3")}}
            style={[filters.includes("3") && {backgroundColor: "lightgray"}, {padding: 0.5, borderWidth: 1, borderColor: "gray", width: 80, height:40, borderRadius: 25, left: 30, marginTop: 15, alignItems: "center", justifyContent: "center", marginRight: 8}]}
          >
            <Text p>$$$</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {handleTap("4")}}
            style={[filters.includes("4") && {backgroundColor: "lightgray"}, {padding: 0.5, borderWidth: 1, borderColor: "gray", width: 80, height:40, borderRadius: 25, left: 30, marginTop: 15, alignItems: "center", justifyContent: "center", marginRight: 8}]}
          >
            <Text p>$$$$</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={{marginTop: 10}}/>
        <View style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Text 
            style={{
              marginLeft: "10%",
              marginTop: "3%",
              fontSize: 22.5,
              fontFamily: "Kollektif",
            }}
          >
            Location
          </Text>
          {selectionval==="" &&
            <View style={{alignItems: "center"}}>
              <Text 
                style={{
                  marginTop: "3%",
                  fontSize: 19,
                  fontFamily: "Kollektif",
                }}
              >
                Use my current location
              </Text>
              <Text
                style={{top: 3, fontFamily: "Kollektif", fontSize: 17,}}
              >
                or
              </Text>
              <GradientButton
                style={{minWidth: 30, marginVertical: 10, width: "80%", }}
                onPress={() => {
                  navigation.navigate("createParty/filters/changeLocation")
              }}
              >
                Change my location!
              </GradientButton>
            </View>
          }
          {selectionval != "" &&
            <View style={{alignItems: "center", marginTop: 10}}>
              <Text 
                style={{
                  fontFamily: "Kollektif",
                  fontSize: 20
                }}
              >
                Find restaurants in
              </Text>
              <Text p
                style={{
                  fontFamily: "Kollektif",
                  paddingVertical: 5
                }}
              >
                {selectionval}
              </Text>
              <GradientButton
                style={{minWidth: 30, marginVertical: 10, width: "80%", }}
                onPress={() => {
                  navigation.navigate("createParty/filters/changeLocation")
                }}
              >
                Change my location!
              </GradientButton>
            </View>
          }
        </View>
      <Divider style={{marginTop: 10}}/>
        <View style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <Text 
            style={{
              marginLeft: "10%",
              marginTop: "3%",
              fontSize: 22.5,
              fontFamily: "Kollektif",
            }}
          >
            Time
          </Text>
          <View style={{display: "flex", flexDirection: "row", marginBottom: "2%"}}>
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
              mode='time'
              display="default"
              onChange={onChange}
              style={{right: 40, position: "absolute", width: "25%",}}
            />
          </View>
        </View>
      <Divider style={{marginTop: 10,}}/>
        <Text 
          style={{
            marginLeft: "10%",
            marginTop: "3%",
            fontSize: 22.5,
            fontFamily: "Kollektif",
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
            fontSize: 22.5,
            fontFamily: "Kollektif",
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
      <View style={{ marginTop: "5%", }}>
        <View style={{display: "flex", flexDirection: "row"}}>
          <Text
            p
            style={{
              marginLeft: "10%",
              marginTop: "1%",
              fontWeight: "bold",
              fontFamily: "Kollektif",
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
            fontFamily: "Kollektif",
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
              fontFamily: "Kollektif",
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
              fontFamily: "Kollektif",
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
                fontFamily: "Kollektif",
                fontWeight: "300",
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
    fontFamily: "Kollektif",
    color: "black",
    fontSize: 35,
  },
  subheading: {
    fontFamily: "Kollektif",
    color: "#f76f6d",
    textAlign: "center",
  },
  chip: {
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: "1.5%", 
    paddingHorizontal: 20, 
    paddingVertical: 5, 
    bottom: 10
  },
  buttonStyle: {
    minWidth: 30,
    marginVertical: 10,
  },
});
