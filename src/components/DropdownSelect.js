import React, { useState } from "react";
import { View } from "react-native";
import { TouchableOpacity, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { List } from "react-native-paper";

export const DropdownSelect = ({ data, selections, onChange, multi, title, icon="food" }) => {
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
        }}
        style={{
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 15,
          borderBottomLeftRadius: open ? 0 : 15,
          borderBottomRightRadius: open ? 0 : 15,

          maxHeight: 40,
          //   left: 40,
          justifyContent: "center",
        }}
      >
        {data.map(({ label, value }) => (
        //   <View key={value}>
            <LinearGradient
            key={value}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={
                selections.includes(value)
                  ? ["#ee0979", "#f76f6d", "#ff6a00"]
                  : ["#fff", "#fff", "#fff"]
              }
              style={[
                {
                  minHeight: 38,
                  justifyContent: "center",
                  //   paddingHorizontal: 60,
                  backgroundColor: "black",
                  borderWidth: 0.5,
                //   borderLeftWidth: 1,
                  borderColor: "#000",
                //   borderTopWidth: 0.1,
                  //   flex: 1,
                  //   width: '100%',
                },
              ]}
            >
              <TouchableOpacity
                key={value}
                flex={1}
                // left={40}
                style={
                  {
                    // width: 10,
                    // backgroundColor: "red",
                    // borderWidth: 1,
                    // borderTopWidth: 0,
                  }
                }
                onPress={() => {
                  handleTap(value, label);
                }}
              >
                <Text
                  style={{
                    fontFamily: "Kollektif",
                    fontSize: 18,
                    textAlign: "left",
                    color: selections.includes(value) ? "#fff" : "#000",
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
        //   </View>
        ))}
      </List.Accordion>
    </List.Section>
  );
};
