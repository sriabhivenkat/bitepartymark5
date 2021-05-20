import React from "react";
import { Image, Dimensions, Platform } from "react-native";
const height = Dimensions.get("window").height;

const isSmall = height < 700 || Platform.OS === "android";

export const logoHeaderOptions = {
  headerTitle: (props) => (
    <Image
      style={{
        aspectRatio: 10 / 7,
        height: isSmall ? 50 : 70,
        alignItems: "center",
      }}
      source={require("assets/images/headerlogo.png")}
    />
  ),
  headerStyle: {
    height: isSmall ? 75 : 120,
  },
};
