import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { List } from "react-native-paper";

export const DropdownSelect = ({
  data,
  selections,
  onChange,
  multi,
  title,
  icon = "food",
}) => {
  const [open, setOpen] = useState(false);

  const handleTap = (value) => {
    const exists = selections.find((item) => item == value);
    if (exists) {
      onChange((old) => old.filter((i) => i != value));
    } else {
      onChange((old) => (multi ? [value, ...old] : [value]));
    }
  };

  return (
    <List.Section>
      <List.Accordion
        expanded={open}
        onPress={() => setOpen((old) => !old)}
        title={title}
        left={(props) => (
          <List.Icon
            {...props}
            icon={icon}
            color={"black"}
            style={{ right: 5 }}
          />
        )}
        titleStyle={{
          color: "black",
          fontSize: 18,
          fontFamily: "Kollektif",
          right: 10,
          backgroundColor: "transparent",
        }}
        style={{
          borderWidth: 1.5,
          borderColor: "black",
          borderRadius: 15,
          borderBottomLeftRadius: open ? 0 : 15,
          borderBottomRightRadius: open ? 0 : 15,
          maxHeight: 40,
          justifyContent: "center",
        }}
      >
        {data.map(({ label, value }, i) => (
          <ItemContainer
            key={value}
            selected={selections.includes(value)}
            last={i == data.length - 1}
          >
            <TouchableOpacity
              key={value}
              style={{
                borderBottomLeftRadius: i == data.length - 1 ? 15 : 0,
                borderBottomRightRadius: i == data.length - 1 ? 15 : 0,
              }}
              onPress={() => {
                handleTap(value, label);
              }}
            >
              <Text
                style={{
                  fontFamily: "Kollektif",
                  fontSize: 18,
                  textAlign: "left",
                  marginLeft: 60,
                  color: selections.includes(value) ? "#fff" : "#000",
                  borderBottomLeftRadius: i == data.length - 1 ? 15 : 0,
                  borderBottomRightRadius: i == data.length - 1 ? 15 : 0,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          </ItemContainer>
        ))}
      </List.Accordion>
    </List.Section>
  );
};

const ItemContainer = ({ selected, last, children }) => {
  if (selected) {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#ee0979", "#f76f6d", "#ff6a00"]}
        minHeight={38}
        justifyContent="center"
        style={[
          {
            // borderWidth: 1,
            borderLeftWidth: 1,
            borderBottomLeftRadius: last ? 15 : 0,
            borderBottomRightRadius: last ? 15 : 0,
            // borderColor: "#000",
            // paddingLeft: 30,
          },
        ]}
      >
        {children}
      </LinearGradient>
    );
  } else {
    return (
      <View
        minHeight={38}
        justifyContent="center"
        style={[
          {
            borderWidth: 1.5,
            borderTopWidth: 0,
            borderBottomLeftRadius: last ? 15 : 0,
            borderBottomRightRadius: last ? 15 : 0,
            borderColor: "#000",
          },
        ]}
      >
        {children}
      </View>
    );
  }
};
