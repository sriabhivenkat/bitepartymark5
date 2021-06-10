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
import { PricingSelector, TitleText, DropdownSelect } from "components";
import Icon from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { filterOptions } from "../filterOptions";
import { restrictionOptions } from "../restrictionOptions";
import { SubtitleText } from "../../../components";


const Filters = ({ route, navigation }) => {
  const [radius, setRadius] = useState(5);
  const [count, setCount] = useState(10);
  const [filters, setFilters] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [price, setPrice] = useState([]);
  const [longName, setName] = useState("");
  const [currentLat, setCurrentLat] = useState();
  const [currentLong, setCurrentLong] = useState();
  const [showOpen, setShowOpen] = useState(true);
  const [time, setTime] = useState(new Date());

  // const onChange = (event, selectedTime) => {
  //   const currentDate = selectedTime || time;
  //   setTime(currentDate);
  //   // console.log(time);
  // };

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

  const { createParty } = useParty(partyId);
  useEffect(() => {
    console.log("data for selected friends is: ", selectedFriends);
  }, []);
  useEffect(() => {
    const main = async () => {
      const position = await getUserLocation();
      setCurrentLat(position[0]);
      setCurrentLong(position[1]);
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
        time,
        showOpen,
        restrictions,
        autoResolve: !link,
      });
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
      // paddingRight={30}
      >
        {selectedFriends.length != 0 && <SectionLabel label="Party with:" />}
        <ScrollView
          flexDirection="row"
          marginBottom={10}
          marginTop={10}
          // right={5}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          paddingBottom={10}
        // width="100%"
        // paddingHorizontal={20}
        >
          {selectedFriends.length != 0 &&
            selectedFriends.map((item) => (
              <Chip
                key={item.uidvalue}
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
        <View
          display="flex"
          flexDirection="column"
          alignItems="center"
          bottom={10}
        >
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
      <View
        display="flex"
        flexDirection="column"
        justifyContent="center"
        style={{
          marginTop: selectedFriends.length === 0 ? -20 : 0,
        }}
      >
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
      <Divider style={{ marginTop: 10 }} />
      {/* 
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <SectionLabel label="Show Closed Restaurants" />
        <SubtitleText style={{ paddingLeft: 20 }}>
          Help
        </SubtitleText>
        <View
          paddingHorizontal={20}
          flexDirection="row"
          marginTop={10}
          justifyContent="space-around"
        >
          <Switch style={{ flex: 1 }} value={!showOpen} onValueChange={c => setShowOpen(!c)} color="#f76f6d" />
          {/* <View flexDirection="column">
            <DateTimePicker
              value={time}
              mode="time"
              // display="inline"
              disabled={!showOpen}  
              style={{ width: 100 }}
              onChange={(_,c) => setTime(c)}
              // style={{ right: 40}}
            />
      //     </View> */}
      {/* </View> */}
      {/* // </View> */}
      {/* // <Divider style={{ marginTop: 10 }} /> */}
      <SectionLabel label="Cuisine" />

      <View justifyContent="center" marginTop={5} paddingHorizontal={20}>
        <DropdownSelect
          data={restrictionOptions}
          selections={restrictions}
          onChange={setRestrictions}
          title="Set Restrictions"
        />
      </View>

      <View justifyContent="center" marginTop={5} paddingHorizontal={20}>
        <DropdownSelect
          data={filterOptions}
          selections={filters}
          onChange={setFilters}
          title="Set Cuisines"
          multi

        />
      </View>

      <View
        style={{
          left: 40,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            width: "80%",
          }}
        >
          {filterOptions
            .filter((f) => filters.includes(f.value))
            .map((items) => (
              <View key={items.value}>
                <LinearGradient
                  start={{ x: 1, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={["#ee0979", "#ff6a00"]}
                  style={[
                    {
                      borderRadius: 25,
                      left: -20,
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
                    {items.label}
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
      {time.getHours() <= 6 && (
        <Divider />
      )}

      {time.getHours() >= 6 && (

        <View flex={1} paddingHorizontal={20} style={{ paddingTop: 20 }}>
          <Text style={{ color: '#db4848', fontSize: 16, fontFamily: 'Kollektif' }}>
            Note: We only show restaurants that are open - for more variety of restaurants, we recommend swiping at a later time
   </Text>
        </View>

      )}

      {time.getHours() >= 21 && (
        <Divider />
      )}

      {time.getHours() >= 21 && (

        <View flex={1} paddingHorizontal={20} paddingVertical={30}>
          <Text style={{ color: 'red', fontSize: 16, fontFamily: 'Kollektif' }}>
            Note: We only show restaurants that are open - for more variety of restaurants, we recommend swiping at a later time
   </Text>
        </View>

      )}

      <View flex={1} paddingHorizontal={40} paddingVertical={40}>
        <GradientButton onPress={startParty}>Start Party!</GradientButton>
        {/* <GradientButton onPress={() => console.log(time.getHours())}>Test</GradientButton> */}

      </View>
    </ScrollView >
  );
};

export default Filters;

const SectionLabel = ({ label }) => (
  <Text
    style={{
      marginLeft: 20,
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
