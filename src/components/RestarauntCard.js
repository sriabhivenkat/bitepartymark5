import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { FAB, Chip } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { YelpRating } from "./YelpRating";

export const RestarauntCard = ({ data }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    colors={["#ee0979", "#f76f6d", "#ff6a00"]}
    style={[styles.background, styles.card]}
  >
    <View>
      <Image
        style={styles.image}
        source={{
          uri: data.image_url,
        }}
      />
      <View
        backgroundColor="#fff"
        borderRadius={15}
        paddingHorizontal={15}
        paddingTop={5}
        flex={0}
        alignSelf="center"
        position="absolute"
        bottom={-30}
        right={-20}
      >
        <View flexDirection="row" alignItems="center">
          <View>
            <YelpRating rating={data.rating} />

            <Text
              style={[styles.text, styles.reviews]}
            >{`${data.review_count} Reviews`}</Text>
          </View>

          <Image
            style={{
              height: 60,
              width: undefined,
              aspectRatio: 1000 / 637,
              position: "relative",
              bottom: 5,
            }}
            source={require("assets/images/yelp/logo.png")}
            // backgroundColor="yellow"
          />
        </View>
      </View>
    </View>

    <View style={styles.textContainer}>
      <View>
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit
          style={[styles.text, styles.name]}
        >
          {data.name}
        </Text>
      </View>
      <View>
        <ScrollView horizontal style={styles.categoriesContainer}>
          {data.categories.map((item, i) => (
            <Chip
              key={i}
              textAlign="center"
              marginRight={10}
              flex={0}
              style={{ justifyContent: "center", alignItems: "center" }}
              textStyle={{ fontSize: 15, fontWeight: "600" }}
            >
              {item.title}
            </Chip>
          ))}
        </ScrollView>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ position: "absolute", width: 60, height: 60, right: 0 }}
          colors={["#ff6a0000", "#ff6a00F0"]}
          pointerEvents={"none"}
        />
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    color: "#fff",
    paddingVertical: 30,
    paddingBottom: 40,
    maxHeight: 650,
    paddingHorizontal: 30,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  categoriesContainer: {
    alignSelf: "stretch",
    marginTop: 15,
    maxHeight: 30,
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
    fontSize: 16,
    marginTop: 5,
    color: "#000",
    position: "relative",
    // bottom: 15,
    right: 1,
    fontWeight: "500",
  },
});
