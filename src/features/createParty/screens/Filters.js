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
import Icon from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { filterOptions } from "../filterOptions";

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
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const handleTap = (value, title) => {
    const exists = filters.find((item) => item == value);
    const exists1 = titles.find((item) => item == title);
    if (exists && exists1) {
      setFilters(filters.filter((i) => i != value));
      setTitles(titles.filter((x) => x != title));
    } else {
      setFilters([value, ...filters]);
      setTitles([title, ...titles]);
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
  const { selectedFriends, partyId, link } = route.params;

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
    console.log("data for selected friends is: ", selectedFriends);
  }, []);
  useEffect(() => {
    const main = async () => {
      const position = await getUserLocation();
      // console.log(position);
      setCurrentLat(position[0]);
      setCurrentLong(position[1]);
      // console.log(currentLat, currentLong);
      Geocoder.from(currentLat, currentLong)
        .then((json) => {
          var addressComponent = json.results[4].formatted_address; // new commen
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
        autoResolve: !link,
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
      <View
        display="flex"
        flexDirection="column"
        marginTop={-25}
        paddingRight={30}
      >
        {selectedFriends.length != 0 && <SectionLabel label="Party with:" />}
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
          {selectedFriends.length != 0 &&
            selectedFriends.map((item) => (
              <Chip
                avatar={
                  <Image
                    source={{ uri: item?.imageUrl }}
                    style={{
                      height: 35,
                      width: 35,
                      borderRadius: 25,
                      right: 1,
                      borderColor: "black",
                      borderWidth: 1,
                      backgroundColor: "purple",
                      marginLeft: 3,
                    }}
                  />
                }
                style={{
                  width: 125,
                  left: 40,
                  height: 50,
                  alignItems: "center",
                  marginRight: 4,
                  marginVertical: 2.5,
                }}
                textStyle={{ fontFamily: "Kollektif", fontSize: 15 }}
                mode="outlined"
              >
                {item?.firstName}
              </Chip>
            ))}
        </ScrollView>
      </View>
      {selectedFriends.length === 0 && (
        <View display="flex" flexDirection="column" alignItems="center" bottom={10}>
          <Text
            style={{
              fontFamily: "Kollektif",
              fontSize: 24,
              color: "#f76f6d",
            }}
          >
            Solo Mode
          </Text>
        </View>
      )}
      <View display="flex" flexDirection="column" justifyContent="center" style={{
        marginTop: selectedFriends.length === 0 ? -20 : 0
      }}>
        <SectionLabel label="Price" />
        <PricingSelector value={price} onChange={(val) => setPrice(val)} />
      </View>
      <Divider style={{ marginTop: 10 }} />
      <View flexDirection="column" flex={1}>
        <SectionLabel label="Location" paddingHorizontal={-10} />
        <View
          style={{ alignItems: "center", marginTop: 10 }}
          flex={1}
          // backgroundColor="red"
          // paddingLeft={0}
          // paddingRight={0}
          paddingHorizontal={20}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("createParty/filters/changeLocation");
            }}
            style={{
              height: 40,
              borderWidth: 1,
              borderRadius: 15,
              paddingHorizontal: 20,
              flex: 1,
              alignSelf: "stretch",
            }}
          >
            <View
              flexDirection="row"
              alignItems="center"
              // position="relative"
              flex={1}
            // top={8}
            >
              <Icon name="locate-outline" size={20} />

              <Text
                // style={{ }}
                numberOfLines={1}
                style={{
                  marginLeft: 20,
                  fontSize: 18,
                  fontFamily: "Kollektif",
                }}
              >
                {selectionval != "" ? selectionval : longName}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
      <View justifyContent='center' paddingLeft={-20} paddingRight={60} marginTop={5}>
        <List.Section>
          <List.Accordion
            expanded={isDropdownOpen}
            onPress={() => setIsDropDownOpen((old) => !old)}
            title="Select a cuisine"
            left={(props) => (
              <List.Icon {...props} icon="food" color={"black"} />
            )}
            titleStyle={{
              color: "black",
              fontSize: 18,
              fontFamily: "Kollektif",
            }}
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 15,
              borderBottomLeftRadius: isDropdownOpen ? 0 : 15,
              borderBottomRightRadius: isDropdownOpen ? 0 : 15,

              maxHeight: 40,
              left: 40,
              justifyContent: "center",
            }}
          >
            {filterOptions.map(({ label, value }) => (
              <TouchableOpacity
                key={value}
                flex={1}
                left={40}
                style={{
                  left: 40,
                  borderWidth: 1,
                  borderTopWidth: 0,
                }}
                onPress={() => {
                  handleTap(value, label);
                }}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={
                    filters.includes(value)
                      ? ["#ee0979", "#f76f6d", "#ff6a00"]
                      : ["#fff", "#fff", "#fff"]
                  }
                  style={[
                    {
                      minHeight: 38,
                      justifyContent: "center",
                      paddingHorizontal: 60,
                      flex: 1,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "Kollektif",
                      fontSize: 18,
                      textAlign: "left",
                      color: filters.includes(value) ? "#fff" : "#000",
                    }}
                  >
                    {label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
            {/* <List.Item
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
                  borderLeftWidth: 1,
                  borderLeftColor: "black",
                  borderRightWidth: 1,
                  borderRightColor: "black",
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                  // width: "80%",
                  left: 40,
                },
              ]}
            /> */}
          </List.Accordion>
        </List.Section>
      </View>

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
            <View>
              <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={["#ee0979", "#ff6a00"]}
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
                    color: "white",
                    fontFamily: "kollektif",
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
