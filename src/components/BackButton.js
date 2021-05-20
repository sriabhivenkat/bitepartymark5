import React from "react";
import { Platform } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export const BackButton = ({ label, ...rest }) => (
  <TouchableOpacity
    style={{ flexDirection: "row", alignItems: "center" }}
    {...rest}
  >
    <Ionicons name="chevron-back-sharp" color="#F76F6D" size={28} />
    {Platform.OS == "ios" && (
      <Text style={{ fontFamily: "Kollektif", fontSize: 18, color: "#F76F6D" }}>
        {label}
      </Text>
    )}
  </TouchableOpacity>
);
