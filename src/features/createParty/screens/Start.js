import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "galio-framework";
import TouchableScale from "react-native-touchable-scale";
import { ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { startImages } from "../startImages";
import { useInvites } from "lib/invites.js";
import { Alert } from "react-native";

const Start = ({ navigation }) => {
  const hour = new Date().getHours();
  const { invites, rejectInvite, acceptInvite } = useInvites();
  const acceptedInvites = invites?.filter((item) => item.status == "accepted");
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.image}
        onPress={() => {
          if (acceptedInvites?.length > 0) {
            navigation.navigate("createParty/selectFriends");
          } else {
            Alert.alert(
              "You have an active Party!",
              "Complete it before starting a new one!"
            );
          }
        }}
        Component={TouchableScale}
        tension={100}
        activeScale={0.95}
      >
        <ImageBackground
          source={startImages.find(({ end }) => hour < end).image}
          style={styles.image}
          borderRadius={15}
          marginHorizontal={20}
          marginBottom={15}
          blurRadius={5}
        >
          <LinearGradient
            style={styles.image}
            marginHorizontal={20}
            marginBottom={15}
            locations={[0.5]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
          >
            <View style={styles.textContainer}>
              <Text
                h2
                style={{
                  fontFamily: "Kollektif",
                  fontWeight: "800",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Let's Party
              </Text>
              <Text
                h5
                style={{
                  fontFamily: "Kollektif",
                  fontWeight: "bold",
                  color: "#f76f6d",
                  textAlign: "center",
                }}
              >
                Start partying with friends!
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    alignContent: "flex-end",
    backgroundColor: "white",
  },
  input: {
    color: "white",
  },
  title: {
    padding: "5%",
    marginTop: "2.5%",
    marginBottom: "2.5%",
    fontFamily: "Kollektif",
    color: "#f76f6d",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    height: 37,
    width: "50%",
    backgroundColor: "#F76F6D",
    borderRadius: 15,
  },
  card: {
    height: "35%",
    width: "85%",
    borderRadius: 25,
    shadowRadius: 10,
    marginBottom: "5%",
    backgroundColor: "white",
  },
  image: {
    flex: 3,
    resizeMode: "cover",
    justifyContent: "flex-end",
    margin: 0,
    borderRadius: 15,
  },
  textContainer: {
    marginBottom: "10%",
  },
});
