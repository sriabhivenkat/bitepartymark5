import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { FAB, Chip } from "react-native-paper";
import { Text } from "galio-framework";
import LinearGradient from "react-native-linear-gradient";
import { YelpRating } from "./YelpRating";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Modal, Portal, Provider } from "react-native-paper";

export const RestarauntCard = ({ data, style, compact }) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  const containerStyle = {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
  };
  return (
    <View
      // start={{ x: 0, y: 0 }}
      // end={{ x: 1, y: 1 }}
      // colors={["#ee0979", "#f76f6d", "#ff6a00"]}
      // backgroundColor="blue"
      style={[
        {
          flex: 1,
          borderRadius: 15,
          // color: "#fff",
          // paddingVertical: 30,
          // paddingBottom: 40,
          maxHeight: 700,
          bottom: 50,
          backgroundColor: "#00000050",
          marginTop: -20,
          // paddingHorizontal: 30,
        },
        style,
      ]}
      // style={[styles.background]}
    >
      <ImageBackground
        source={{ uri: data?.image_url }}
        style={[
          {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "flex-end",
            margin: 0,
            borderRadius: 15,
          },
        ]}
        borderRadius={15}
        // marginHorizontal={20}
        // marginBottom={15}
      >
        <LinearGradient
          style={[
            {
              flex: 1,
              resizeMode: "cover",
              justifyContent: "flex-end",
              margin: 0,
              borderRadius: 15,
            },
            styles.card,
            styles.background,
            compact && { paddingBottom: 10 },
          ]}
          // marginHorizontal={20}
          // marginBottom={15}
          locations={[0.4, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
        >
          <View
            style={[styles.textContainer, { top: 40, right: 10 }]}
            marginBottom={50}
          >
            <View
              flexDirection="row"
              flexWrap="wrap-reverse"
              style={{ alignItems: "flex-start" }}
            >
              {data?.categories.map((item, i) => (
                <Chip
                  key={i}
                  textAlign="center"
                  marginRight={10}
                  flex={0}
                  marginVertical={2}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1.5%",
                  }}
                  textStyle={{
                    fontSize: 17,
                    fontWeight: "bold",
                    fontFamily: "Kollektif",
                  }}
                >
                  {item.title}
                </Chip>
              ))}
            </View>
            <Text h3 style={[styles.text, { marginTop: "2%" }]}>
              {data?.name}
            </Text>
            <View flexDirection="row" marginTop="4%">
              <YelpRating rating={data?.rating} />
              <Text
                p
                style={styles.reviews}
              >{`${data?.review_count} Reviews`}</Text>
            </View>
          </View>
          <View
            // backgroundColor="red"
            position="absolute"
            bottom={10}
            right={5}
          >
            <Image
              style={{
                height: 50,
                width: undefined,
                top: 10,
                left: 10,
                aspectRatio: 1000 / 637,
                // position: "absolute",
                // bottom: 0,
                // right: 100,
                // left: 275,
              }}
              source={require("assets/images/yelp/logo.png")}
              // backgroundColor="yellow"
            />
          </View>
          {/* <View style={styles.chevron}>
            <Ionicons name="chevron-up-outline" color="white" size={35} />
          </View> */}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // backgroundColor: "purple",
    borderRadius: 15,
    color: "#fff",
    // paddingVertical: 20,
    paddingBottom: 40,
    maxHeight: 700,
    paddingHorizontal: 30,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 15,
  },
  text: {
    color: "#fff",
    fontFamily: "Kollektif",
  },
  textContainer: {
    // flex: 0.3,
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  categoriesContainer: {
    alignSelf: "stretch",
    marginTop: 15,
    maxHeight: 30,
  },
  chevron: {
    ...StyleSheet.absoluteFill,
    width: 100,
    height: 100,
    top: 575,
    left: 135,
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 40,
    fontWeight: "600",
  },
  categories: {
    fontSize: 32,
    fontWeight: "300",
  },
  reviews: {
    fontSize: 20,
    marginTop: 5,
    color: "#fff",
    fontFamily: "Kollektif",
    position: "relative",
    bottom: "1.5%",
    left: "100%",
    right: 1,
    fontWeight: "500",
  },
});
