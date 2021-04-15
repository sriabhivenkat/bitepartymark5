import React from "react";
import { View, Image } from "react-native";

const imageMap = {
  0: require("assets/images/yelp/stars/0.png"),
  1: require("assets/images/yelp/stars/0.png"),
  2: require("assets/images/yelp/stars/2.png"),
  3: require("assets/images/yelp/stars/3.png"),
  4: require("assets/images/yelp/stars/4.png"),
  5: require("assets/images/yelp/stars/5.png"),
  6: require("assets/images/yelp/stars/6.png"),
  7: require("assets/images/yelp/stars/7.png"),
  8: require("assets/images/yelp/stars/8.png"),
  9: require("assets/images/yelp/stars/9.png"),
  10: require("assets/images/yelp/stars/10.png"),
};

export const YelpRating = ({ rating = 3, ...rest }) => {
  return (
    <View {...rest}>
      <Image
        style={{
          // width: "100%",
          height: 18,
          aspectRatio: 306 / 54,
          resizeMode: "cover",
          // borderRadius: 10,
        }}
        source={imageMap[rating * 2]}
      />
    </View>
  );
};
