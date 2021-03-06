import React from "react";
import { Image, Dimensions, Platform } from "react-native";
const height = Dimensions.get("window").height;

const isSmall = height < 700 || Platform.OS === "android";

export const logoHeaderOptions = {
  headerTitle: (props) => (
    isSmall && (
      <Image
        style={{
          aspectRatio: 2 / 3,
          height: height / 18,
        }}
        source={require("assets/images/newHeaderLogo.png")}
      />
    )),

  headerStyle: {
    height: height / 7,
  },
};
