import React, { useContext, useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "galio-framework";
import { Card } from "react-native-paper";
import TouchableScale from "react-native-touchable-scale";
import { ImageBackground } from "react-native";

const Start = ({ navigation }) => {
  var hour = new Date().getHours()



  const image = { source: "assets/images/bfast2.jpg" };
  return (
    <View style={styles.container}>

      <Card
        style={styles.image}
        onPress={() => navigation.navigate("createParty/selectFriends")}
        Component={TouchableScale}
        tension={100}
        activeScale={0.95}

      >
        {hour <= 9 && (<ImageBackground source={require("assets/images/bfast1.jpg")} style={styles.image}>
          <Card.Content >
            <View style={styles.textContainer}>
              <Text
                h2
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Let's Party
            </Text>
              <Text
                h5
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "#f76f6d",
                  textAlign: "center",

                }}
              >
                Start partying with friends!
          </Text>
            </View>


          </Card.Content>
        </ImageBackground>
        )}
        {hour <= 10 && hour > 9 && (<ImageBackground source={require("assets/images/bfast2.jpg")} style={styles.image}>
          <Card.Content >
            <View style={styles.textContainer}>
              <Text
                h2
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Let's Party
            </Text>
              <Text
                h5
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "#f76f6d",
                  textAlign: "center",

                }}
              >
                Start partying with friends!
          </Text>
            </View>


          </Card.Content>
        </ImageBackground>
        )}

        {hour <= 11 && hour > 10 && (<ImageBackground source={require("assets/images/bfast3.jpg")} style={styles.image}>
          <Card.Content >
            <View style={styles.textContainer}>
              <Text
                h2
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Let's Party
            </Text>
              <Text
                h5
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "#f76f6d",
                  textAlign: "center",

                }}
              >
                Start partying with friends!
          </Text>
            </View>


          </Card.Content>
        </ImageBackground>
        )}

        {hour <= 15 && hour >= 12 && (<ImageBackground source={require("assets/images/lunch1.jpg")} style={styles.image}>
          <Card.Content >
            <View style={styles.textContainer}>
              <Text
                h2
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Let's Party
            </Text>
              <Text
                h5
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "#f76f6d",
                  textAlign: "center",

                }}
              >
                Start partying with friends!
          </Text>
            </View>


          </Card.Content>
        </ImageBackground>
        )}

        {hour <= 18 && hour > 15 && (<ImageBackground source={require("assets/images/lunch2.jpg")} style={styles.image}>
          <Card.Content >
            <View style={styles.textContainer}>
              <Text
                h2
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Let's Party
            </Text>
              <Text
                h5
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "#f76f6d",
                  textAlign: "center",

                }}
              >
                Start partying with friends!
          </Text>
            </View>


          </Card.Content>
        </ImageBackground>
        )}


        {hour <= 21 && hour > 18 && (<ImageBackground source={require("assets/images/lunch3.jpg")} style={styles.image}>
          <Card.Content >
            <View style={styles.textContainer}>
              <Text
                h2
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Let's Party
            </Text>
              <Text
                h5
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "#f76f6d",
                  textAlign: "center",

                }}
              >
                Start partying with friends!
          </Text>
            </View>


          </Card.Content>
        </ImageBackground>
        )}


        {hour > 21 && (<ImageBackground source={require("assets/images/lunch4.jpg")} style={styles.image}>
          <Card.Content >
            <View style={styles.textContainer}>
              <Text
                h2
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Let's Party
            </Text>
              <Text
                h5
                style={{
                  fontFamily: "PingFangHK-Medium",
                  fontWeight: "bold",
                  color: "#f76f6d",
                  textAlign: "center",

                }}
              >
                Start partying with friends!
          </Text>
            </View>


          </Card.Content>
        </ImageBackground>
        )}
      </Card>

    </View>

    //   {/* <View style={styles.container}>
    // <Card
    //   style={styles.card}
    //   onPress={() => navigation.navigate("createParty/selectFriends")}
    //   Component={TouchableScale}
    //   tension={100}
    //   activeScale={0.95}
    //   ImageBackground={require("assets/images/bfast1.jpg")}
    // >
    //   <Card.Content >

    //     <Text
    //       h4
    //       style={{
    //         fontFamily: "PingFangHK-Medium",
    //         fontWeight: "bold",
    //         color: "black",
    //         textAlign: "center",
    //       }}
    //     >
    //       { }
    //     </Text>
    //     <Text
    //       style={{
    //         fontFamily: "PingFangHK-Medium",
    //         fontWeight: "bold",
    //         color: "#f76f6d",
    //         textAlign: "center",
    //       }}
    //     >
    //       Start a party with friends!
    //   </Text>



    //   </Card.Content>
    // </Card>
    //   </View>


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
    fontFamily: "PingFangHK-Medium",
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
    margin: 0
  },
  textContainer: {
    marginBottom: "10%"

  }
});
