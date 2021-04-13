import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import { Text } from "galio-framework";
import { Slider } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useParty, getUserLocation } from "lib";
import { ScrollView } from "react-native";

const Filters = ({ route, navigation }) => {
  const [radius, setRadius] = useState(5);
  const [count, setCount] = useState(10);
  const [isFamily, setIsFamily] = useState(false);
  const [isFastFood, setIsFastFood] = useState(false);

  const { selectedFriends, partyId } = route.params;
  console.log({ partyId });

  const { createParty } = useParty(partyId);

  const toggleSwitch1 = () => setIsFamily((previousState) => !previousState);
  const toggleSwitch2 = () => setIsFastFood((previousState) => !previousState);

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
      <Text style={styles.title}>Set some filters</Text>

      <View style={{ marginTop: "5%" }}>
        <Text
          p
          style={{
            marginLeft: "10%",
            color: "#f76f6d",
            fontWeight: "bold",
            fontFamily: "PingFangHK-Medium",
          }}
        >
          How far are you willing to go?
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
          }}
        />
        <Text
          p
          style={{
            marginLeft: "10%",
            color: "#f76f6d",
            fontWeight: "300",
            fontFamily: "PingFangHK-Medium",
          }}
        >
          {Math.round(radius)} miles
        </Text>

        <Text
          p
          style={{
            marginLeft: "10%",
            color: "#f76f6d",
            fontWeight: "bold",
            fontFamily: "PingFangHK-Medium",
            marginTop: "10%",
          }}
        >
          How many restaurant do you want recommended?
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
        <Text
          p
          style={{
            marginLeft: "10%",
            color: "#f76f6d",
            fontWeight: "300",
            fontFamily: "PingFangHK-Medium",
          }}
        >
          {Math.round(count)} restaurants
        </Text>
      </View>

      <View
        style={{
          // flex: 0.3,
          flexDirection: "row",
          justifyContent: "center",
          // marginTop: 80,
        }}
      >
        <View
          style={{
            flex: 0.5,
            flexDirection: "column",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text
            p
            style={{
              marginLeft: "10%",
              color: "#f76f6d",
              fontWeight: "bold",
              fontFamily: "PingFangHK-Medium",
            }}
          >
            Family-Friendly?
          </Text>
          <Switch
            value={isFamily}
            onValueChange={toggleSwitch1}
            style={{ marginTop: "4%" }}
            color="#f76f6d"
          />
        </View>

        <View
          style={{
            flex: 0.5,
            flexDirection: "column",
            alignItems: "center",
            marginRight: "4%",
          }}
        >
          <Text
            p
            style={{
              marginLeft: "10%",
              color: "#f76f6d",
              fontWeight: "bold",
              fontFamily: "PingFangHK-Medium",
            }}
          >
            Want Fast Food?
          </Text>
          <Switch
            value={isFastFood}
            onValueChange={toggleSwitch2}
            style={{ marginTop: "4%" }}
            color="#f76f6d"
          />
        </View>
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
