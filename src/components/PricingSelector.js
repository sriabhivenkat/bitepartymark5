import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

const data = [
  { value: 1, label: "$" },
  { value: 2, label: "$$" },
  { value: 3, label: "$$$" },
  { value: 4, label: "$$$$" },
];

const PriceButton = ({ value, label, style, textStyle, ...rest }) => (
  <TouchableOpacity
    onPress={() => {}}
    {...rest}
    style={[
      //   filters.includes("4") && { backgroundColor: "lightgray" },
      {
        padding: 0,
        borderWidth: 1,
        borderColor: "gray",
        width: 80,
        height: 40,
        borderRadius: 25,
        // left: 30,
        // marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
        // marginRight: 8,
      },
    ]}
  >
    <Text p>{label}</Text>
  </TouchableOpacity>
);
export const PricingSelector = () => {
  const [values, setValues] = useState([]);

  return (
    <View
      flexDirection="row"
      backgroundColor="red"
      alignItems="center"
      justifyContent="space-between"
    >
      {data.map((item) => (
        <PriceButton {...item} />
      ))}
    </View>
  );
};
