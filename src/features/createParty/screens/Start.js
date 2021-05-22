import React from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Text } from "galio-framework";
import TouchableScale from "react-native-touchable-scale";
import { ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { startImages } from "../startImages";
import { useInvites } from "lib/invites.js";
import { Alert } from "react-native";
import { useUser } from "lib";
import { GradientButton } from "components";
import { Appbar } from "react-native-paper";
import { logoHeaderOptions } from "../../../components";
import { useEffect } from "react";

const Start = ({ navigation }) => {
  const hour = new Date().getHours();
  const { invites, rejectInvite, acceptInvite } = useInvites();
  const { user } = useUser();
  const acceptedInvites = invites?.filter((item) => item.status == "accepted");
  const height = Dimensions.get("window").height;
  useEffect(() => {
    console.log(height);
  }, []);
  const isSmall = height < 700;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {height >= 896 && (
        <Appbar.Header style={[styles.bottom, { height: 70 }]}>
          <Appbar.Content
            title={
              <Image
                source={require("assets/images/newheaderLogo.jpeg")}
                style={{
                  width: 29.333,
                  height: 44,
                }}
              />
            }
            titleStyle={{ backgroundColor: "white", right: 40 }}
            style={{ alignItems: "flex-start", top: 5 }}
          />

          <Appbar.Content
            title={`Welcome, ${user?.firstName}!`}
            titleStyle={{
              fontFamily: "Kollektif",
              fontSize: 20,
              marginRight: -60,
              right: 150,
            }}
            style={{ alignItems: "flex-start", top: 5 }}
          />

          <Appbar.Action
            icon={"account-plus"}
            size={30}
            onPress={() => navigation.navigate("createParty/addFriends")}
            style={{ top: 3 }}
          />
        </Appbar.Header>
      )}
      {height <= 667 && (
        <Appbar.Header style={[styles.bottom, { height: 60 }]}>
          <Appbar.Content
            title={
              <Image
                source={require("assets/images/newheaderLogo.jpeg")}
                style={{
                  width: 26.4,
                  height: 39.6,
                  aspectRatio: 2 / 3,
                }}
              />
            }
            titleStyle={{ backgroundColor: "white", right: 40 }}
            style={{ alignItems: "flex-start", top: 5 }}
          />

          <Appbar.Content
            title={`Welcome, ${user?.firstName}!`}
            titleStyle={{
              fontFamily: "Kollektif",
              fontSize: 20,
              marginRight: -60,
              right: 140,
            }}
            style={{ alignItems: "flex-start", top: 3 }}
          />

          <Appbar.Action
            icon={"account-plus"}
            size={27.5}
            onPress={() =>
              navigation.navigate("profile", { screen: "profile/addFriends" })
            }
            style={{ top: 2 }}
          />
        </Appbar.Header>
      )}
      {acceptedInvites?.length != 0 && (
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <GradientButton
            onPress={() =>
              navigation.navigate("joinParty", {
                screen: "joinParty/swiping",
                params: { partyID: acceptedInvites[0].docID },
              })
            }
            style={{
              width: "90%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3.5 },
              shadowOpacity: 0.5,
              shadowRadius: 2.5,
            }}
            innerStyle={{
              borderRadius: 14,
            }}
          >
            Resume your active party!
          </GradientButton>
        </View>
      )}
      {acceptedInvites?.length != 0 && (
        <TouchableOpacity
          style={[
            styles.image,
            {
              marginTop: 50,
              shadowColor: "#000",
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 1,
              shadowRadius: 4,
            },
          ]}
          onPress={() => {
            if (acceptedInvites?.length == 0) {
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
              locations={[0.5, 1]}
              // start={{ x: 0, y: 0 }}
              // end={{ x: 0, y: 1 }}
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
      )}
      {acceptedInvites?.length === 0 && (
        <TouchableOpacity
          style={[styles.image, { marginTop: 10 }]}
          onPress={() => {
            if (acceptedInvites?.length == 0) {
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
              locations={[0.5, 1]}
              // start={{ x: 0, y: 0 }}
              // end={{ x: 0, y: 1 }}
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
      )}
      {/* {acceptedInvites?.length > 0 && (
        <TouchableOpacity
          style={styles.image}
          onPress={() =>
            alert(
              "You have an active party! Please finish that before staring a new one"
            )
          }
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
      )} */}
    </SafeAreaView>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    alignContent: "flex-end",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
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
    //resizeMode: "cover",
    justifyContent: "flex-end",
    margin: 0,
    borderRadius: 15,
  },
  textContainer: {
    marginBottom: "10%",
  },
  bottom: {
    backgroundColor: "white",
    elevation: 0,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
});
