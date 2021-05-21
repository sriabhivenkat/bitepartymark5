import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export const CustomRate = ({ rating, setRating }) => {
  const starImgFilled = require("assets/images/StarImage.png");
  //   const starImgCorner = require("assets/images/logo.png");

  const vals = [1, 2, 3, 4, 5];

  return (
    <View flexDirection="row">
      {vals.map((item, key) => (
        <TouchableWithoutFeedback onPress={() => setRating(item)} key={key}>
          {item <= rating ? (
            <Image
              source={starImgFilled}
              style={{
                aspectRatio: 1,
                height: 40,
                width: 40,
                position: "relative",
                marginHorizontal: 5,
                // botttom: 10,
              }}
            />
          ) : (
            <View
              height={40}
              aspectRatio={1}
              backgroundColor="#fff"
              borderRadius={5}
              borderWidth={1}
              marginHorizontal={5}
            />
          )}
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};
export default CustomRate;
