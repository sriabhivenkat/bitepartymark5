import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

const data = [
  { value: 1, label: "$" },
  { value: 2, label: "$$" },
  { value: 3, label: "$$$" },
  { value: 4, label: "$$$$" },
];

const PriceButton = ({ value, label, selected, style, textStyle, ...rest }) => (
  <TouchableOpacity
    onPress={() => {}}
    {...rest}
    style={[
      {
        borderWidth: 1,
        alignSelf: "stretch",
        flex: 1,
        marginHorizontal: 5,
        height: 40,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
      },
      selected && { backgroundColor: "rgba(0,0,0, 0.2)" },
    ]}
  >
    <Text p style={{ fontFamily: "Kollektif" }}>
      {label}
    </Text>
  </TouchableOpacity>
);
export const PricingSelector = ({ value, onChange }) => {
  const [data, setData] = useState(value);
  const handleClick = (val) => {
    const doesExist = data.includes(val);
    if (doesExist) {
      setData((old) => old.filter((item) => item != val));
    } else {
      setData((old) => [...old, value]);
    }
  };
  return (
    <View
      flexDirection="row"
      // backgroundColor="red"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={30}
      marginVertical={10}
    >
      {data.map((item, i) => (
        <PriceButton key={i} selected={value.includes(item.value)} {...item} />
      ))}
    </View>
  );
};
