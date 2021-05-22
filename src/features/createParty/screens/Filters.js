import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, StatusBar, Image } from "react-native";
import { Divider, Switch, List, ToggleButton, Chip } from "react-native-paper";
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
import Icon from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearTextGradient } from "react-native-text-gradient";


const Filters = ({ route, navigation }) => {
  const [radius, setRadius] = useState(5);
  const [count, setCount] = useState(10);
  const [time, setTime] = useState(new Date());
  const [filters, setFilters] = useState([]);
  const [price, setPrice] = useState([]);
  const [longName, setName] = useState("");
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [titles, setTitles] = useState([]);

  const handleTap = (value, title) => {
    const exists = filters.find((item) => item == value);
    const exists1 = titles.find((item) => item == title);
    if (exists && exists1) {
      setFilters(filters.filter((i) => i != value));
      setTitles(titles.filter((x) => x != title));
    } else {
      setFilters([value, ...filters]);
      setTitles([title, ...titles])
    }
    // if (exists1) {
    //   setFilters(titles.filter((i) => i != title));
    // } else {
    //   setFilters([title, ...titles]);
    // }
  };

  const onChange = (event, selectedTime) => {
    const currentDate = selectedTime || time;
    setTime(currentDate);
    // console.log(time);
  };

  Geocoder.init("AIzaSyBudsRFHgcT7lqUV3xQ9oiM0MquRynmGzI", { language: "en" });
  useEffect(() => {
    const main = async () => {
      const position = await getUserLocation();
      console.log(position);
      Geocoder.from(position[0], position[1])
        .then((json) => {
          var addressComponent = json.results[4].formatted_address;
          console.log(addressComponent);
          setName(addressComponent);
        })
        .catch((error) => console.warn(error));
    };
    main();
  }, []);
  const { selectedFriends, partyId } = route.params;

  const [selectionval, setSelectionVal] = useState("");
  //passing data back from changelocation screen
  useEffect(() => {
    if (route.params?.selection) {
      setSelectionVal(route.params?.selection);
      // console.log(selectionval);
    }
  }, [route.params?.selection]);

  // console.log({ partyId });

  const { createParty } = useParty(partyId);
  useEffect(() => {
    console.log("data for selected friends is: ",selectedFriends)
  }, [])
  useEffect(() => {
    const main = async () => {
      const position = await getUserLocation();
      // console.log(position);
      setCurrentLat(position[0]);
      setCurrentLong(position[1]);
      // console.log(currentLat, currentLong);
      Geocoder.from(currentLat, currentLong)
        .then((json) => {
          var addressComponent = json.results[5].formatted_address; // new commen
          console.log(addressComponent);
          setName(addressComponent);
        })
        .catch((error) => console.warn(error));
    };
    main();
  }, [currentLat, currentLong]);

  const startParty = async () => {
    try {
      navigation.navigate("joinParty", {
        screen: "joinParty/swiping",
        params: { partyID: partyId },
      });

      // if (selectionval === "") {
      let loc;
      if (selectionval.length == 0) {
        loc = await getUserLocation();
      } else {
        const res = await Geocoder.from(selectionval);
        const data = res.results[0].geometry.location;
        loc = [data.lat, data.lng];
      }
      const id = await createParty(selectedFriends, {
        loc,
        count,
        radius,
        filters,
        price,
        // pricing,
        time,
      });
      // } else {
      //   Geocoder.from(selectionval)
      //     .then((json) => {
      //       var location = json.results[0].geometry.location;
      //       var loc = [location.lat, location.lng];
      //       return createParty(selectedFriends, {
      //         loc,
      //         count,
      //         radius,

      //         filters,
      //         restriction,
      //         price,
      //         time,
      //       });
      //     })
      //     .catch(
      //       (error) =>
      //         navigation.navigate("joinParty/filters", {
      //            partyID: partyId, selectedFriends
      //         })
      // navigation.replace("joinParty", {
      //   screen: "joinParty/filters",
      //   params: { partyID: partyId, selectedFriends },
      // })
      // );
      // Alert.alert(
      //   "No matches!",
      //   "We couldn't find anything that matched your filters. Try again with less restrictive filters",
      //   [
      //     {
      //       text: "Ok",
      //       onPress: () =>
      //         navigation.replace("joinParty", {
      //           screen: "joinParty/filters",
      //           params: { partyID: partyId, selectedFriends },
      //         }),
      //     },
      //   ]
      // )
      // );
      // }
    } catch (err) {
      Alert.alert(
        "No matches!",
        "We couldn't find anything that matched your filters. Try again with less restrictive filters",
        [
          {
            text: "Ok",
            onPress: () =>
              navigation.navigate("createParty/filters", {
                partyID: partyId,
                selectedFriends,
              }),
          },
        ]
      );
      // navigation.navigate("joinParty/filters", {
      //   partyID: partyId,
      //   selectedFriends,
      // });
      // Alert.alert(
      //   "No matches!",
      //   "We couldn't find anything that matched your filters. Try again with less restrictive filters",
      //   [
      //     {
      //       text: "Ok",
      //       onPress: () =>
      //         navigation.replace("joinParty", {
      //           screen: "joinParty/filters",
      //           params: { partyID: partyId, selectedFriends },
      //         }),
      //     },
      //   ]
      // );
      console.error(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View paddingHorizontal={20} alignItems="center">
        <TitleText fontSize={21}>Filters</TitleText>
      </View>
      <View display="flex" flexDirection="column" marginTop={-25} paddingRight={30}>
        {selectedFriends.length!=0 &&
          <SectionLabel label="Party with:" />
        }
        <ScrollView 
            flexDirection="row" 
            marginBottom={10} 
            marginTop={10} 
            right={5} 
            horizontal={true} 
            showsHorizontalScrollIndicator={true}
            paddingBottom={10}
            width="100%"
          >
      {selectedFriends.length!=0 && selectedFriends.map((item) => (
            <Chip 
              avatar={
                <Image 
                  source={{uri: item?.imageUrlPath}} 
                  style={
                    {
                      height: 35, 
                      width: 35, 
                      borderRadius: 25, 
                      right: 1, 
                      borderColor: "black", 
                      borderWidth: 1, 
                      backgroundColor: "purple",
                      marginLeft: 3}
                  }/>
                }
              style={{width: 125, left: 40, height: 50, alignItems: "center", marginRight: 4, marginVertical: 2.5}}
              textStyle={{fontFamily: "Kollektif", fontSize: 15}}
              mode="outlined"
            >
              {item?.firstName}
            </Chip>
      ))}
        </ScrollView>
      </View>
      {selectedFriends.length===0 &&
        <View display="flex" flexDirection="column" alignItems="center">
          <Text
            style={{
              fontFamily: "Kollektif",
              fontSize: 24,
              color: "#f76f6d"
            }}
          >
            Solo Mode
          </Text>
        </View>
      }
      <View display="flex" flexDirection="column" justifyContent="center">
        <SectionLabel label="Price" />
        <PricingSelector value={price} onChange={(val) => setPrice(val)} />
      </View>
      <Divider style={{ marginTop: 10 }} />
      <View flexDirection="column" justifyContent="center">
        <SectionLabel label="Location" />
        {selectionval === "" && ( //what
          <View style={{ alignItems: "center" }}>
            <GradientButton
              style={{ minWidth: 30, marginVertical: 10, width: "80%", alignItems: "flex-start", height: 34 }}
              textStyle={{textAlign: "left", flex: 1, marginLeft: 10,}}
              containerStyle={{height: 50}}
              // containerStyle={{justifyContent: ""}}
              outline
              onPress={() => {
                navigation.navigate("createParty/filters/changeLocation");
              }}
            >
              <Icon name="location-outline" size={20}/>
              {longName}
            </GradientButton>
          </View>
        )}
        {selectionval != "" && (
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <GradientButton
              style={{ minWidth: 30, marginVertical: 10, width: "80%", alignItems: "flex-start", height: 34 }}
              textStyle={{textAlign: "left", flex: 1, marginLeft: 10,}}
              containerStyle={{height: 50}}
              // containerStyle={{justifyContent: ""}}
              outline
              onPress={() => {
                navigation.navigate("createParty/filters/changeLocation");
              }}
            >
              <Icon name="location-outline" size={20}/>
              {selectionval}
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
      <SectionLabel label="Cuisine and Restrictions" />
      {/* <View style={{alignItems: "center"}}>
        <DropDownPicker
          multiple={true}
          min={0}
          max={5}
          containerStyle={{width: "90%"}}
        />
      </View> */}
      <List.Section>
        <List.Accordion
          title="Select a cuisine"
          left={(props) => (
            <List.Icon {...props} icon="food" color={"black"} />
          )}
          titleStyle={{ color: "black", fontSize: 15 }}
          style={{
            borderWidth: 1, 
            borderColor: "black",
            borderRadius: 15,
            width: "80%",
            maxHeight: 42.5,
            left: 40,
            justifyContent: "center"
          }}
        >
          <List.Item
            title="Alcohol"
            value="bars"
            onPress={() => {
              handleTap("bars", "Alcohol");
            }}
            style={[
              filters.includes("bars") && {
                backgroundColor: "lightgray",
              },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="American"
            value="tradamerican"
            onPress={() => {
              handleTap("tradamerican", "American");
            }}
            style={[
              filters.includes("tradamerican") && {
                backgroundColor: "lightgray",
              },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Boba"
            value="bubbletea"
            onPress={() => {
              handleTap("bubbletea", "Boba");
            }}
            style={[
              filters.includes("bubbletea") && { backgroundColor: "lightgray" },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Breakfast"
            value="breakfast_brunch"
            onPress={() => {
              handleTap("breakfast_brunch", "Breakfast");
            }}
            style={[
              filters.includes("breakfast_brunch") && {
                backgroundColor: "lightgray",
              },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Chinese"
            value="chinese"
            onPress={() => {
              handleTap("chinese", "Chinese");
            }}
            style={[
              filters.includes("chinese") && { backgroundColor: "lightgray" },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Coffee and Tea"
            value="coffee"
            onPress={() => {
              handleTap("coffee", "Coffee and Tea");
            }}
            style={
              [filters.includes("coffee") && {
                backgroundColor: "lightgray",
                },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }]}
          />
          <List.Item
            title="Desserts"
            value="desserts"
            onPress={() => {
              handleTap("desserts", "Desserts");
            }}
            style={[
              filters.includes("desserts") && {
                backgroundColor: "lightgray",
              },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Food Trucks"
            value="foodtrucks"
            onPress={() => {
              handleTap("foodtrucks", "Food Trucks");
            }}
            style={[
              filters.includes("foodtrucks") && { backgroundColor: "lightgray" },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Fast Food"
            value="hotdogs"
            onPress={() => {
              handleTap("hotdogs", "Fast Food");
            }}
            style={[
              filters.includes("hotdogs") && { backgroundColor: "lightgray" },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Indian"
            value="indpak"
            onPress={() => {
              handleTap("indpak", "Indian");
            }}
            style={[
              filters.includes("indpak") && { backgroundColor: "lightgray" },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Japanese"
            value="japanese"
            onPress={() => {
              handleTap("japanese", "Japanese");
            }}
            style={[
              filters.includes("japanese") && { backgroundColor: "lightgray" },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Mexican"
            value="mexican"
            onPress={() => {
              handleTap("mexican", "Mexican");
            }}
            style={[
              filters.includes("mexican") && { backgroundColor: "lightgray" }
            ],
            {
              borderLeftWidth:1,
              borderLeftColor: "black",
              borderRightWidth:1,
              borderRightColor: "black",
              borderBottomColor: "black",
              borderBottomWidth: 1,
              width: "80%",
              left: 40,
            }
          }
          />
          <List.Item
            title="Thai"
            value="thai"
            onPress={() => {
              handleTap("thai", "Thai");
            }}
            style={[filters.includes("thai") && { backgroundColor: "lightgray" },
            {
              borderLeftWidth:1,
              borderLeftColor: "black",
              borderRightWidth:1,
              borderRightColor: "black",
              borderBottomColor: "black",
              borderBottomWidth: 1,
              width: "80%",
              left: 40,
            }
          ]}
          />
          <List.Item
            title="Halal"
            value="halal"
            onPress={() => {
              handleTap("halal", "Halal");
            }}
            style={[
              filters.includes("halal") && { backgroundColor: "lightgray" },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Vegan"
            value="vegan"
            onPress={() => {
              handleTap("vegan", "Vegan");
            }}
            style={[
              filters.includes("vegan") && { backgroundColor: "lightgray" },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Vegetarian"
            value="vegetarian"
            onPress={() => {
              handleTap("vegetarian", "Vegetarian");
            }}
            style={[
              filters.includes("vegetarian") && {
                backgroundColor: "lightgray",
              },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: "80%",
                left: 40,
              }
            ]}
          />
          <List.Item
            title="Kosher"
            value="kosher"
            onPress={() => {
              handleTap("kosher", "Kosher");
            }}
            style={[
              filters.includes("kosher") && { backgroundColor: "lightgray" },
              {
                borderLeftWidth:1,
                borderLeftColor: "black",
                borderRightWidth:1,
                borderRightColor: "black",
                borderBottomColor: "black",
                borderBottomWidth: 1,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                width: "80%",
                left: 40,
              }
            ]}
          />
        </List.Accordion>
      </List.Section>
      <View
        style={{
          left: 40,
          paddingVertical: 10,
        }}
      >
        {/* <Text>chortle my balls</Text> */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            width: "80%",
          }}
        >
          {titles.map((items) => (
            // <LinearGradient
            //   start={{x:0, y:0}}
            //   end={{x:1, y:0}}
            //   color={["#ee0979", "#f76f6d", "#ff6a00"]}
            // >
            <View 
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#ee0979", "#f76f6d", "#ff6a00"]}
                style={[
                    {
                      borderRadius: 25,
                      marginRight: 5,
                    },
                ]}
              >
                <Chip
                  style={{
                    backgroundColor: "transparent",
                  }}
                  textStyle={{
                    color: "white"
                  }}
                >
                  {items}
                </Chip>
              </LinearGradient>
            </View>
          ))}
        </View>
      </View>
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
