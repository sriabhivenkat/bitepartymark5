import React from "react";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text } from "galio-framework";

export const GradientButton = ({
  innerStyle,
  containerStyle,
  textStyle,
  children,
  onPress,
  outline,
  bg,
  ...rest
}) => (
  <TouchableOpacity
    // style={styles.button}
    activeOpacity={0.5}
    onPress={onPress}
    style={[{ flexDirection: "row" }, containerStyle]}
    backgroundColor="red"
    {...rest}
  >
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={outline ? ["#ffffff00"] : ["#ee0979", "#f76f6d", "#ff6a00"]}
      style={[
        {
          minHeight: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
          backgroundColor: bg ? bg : "#ffffff00",
          alignSelf: "stretch",
          flex: 1,
          flexDirection: "row",
        },
        outline && {
          borderWidth: 1,
          borderColor: "black",
        },
        innerStyle,
      ]}
    >
      <Text
        style={[
          {
            fontFamily: "Kollektif",
            fontSize: 18,
            // textTransform: "uppercase",
            letterSpacing: 1,
            fontWeight: "500",
            color: outline ? "black" : "#fff",
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);
