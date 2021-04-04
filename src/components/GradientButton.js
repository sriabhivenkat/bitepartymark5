import React from "react";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Text } from "galio-framework";

const GradientButton = ({ style, children, onPress, outline, bg, ...rest }) => (
  <TouchableOpacity
    // style={styles.button}
    activeOpacity={0.5}
    onPress={onPress}
    style={[style]}
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
        },
        outline && {
          borderWidth: 1,
          borderColor: "#ee0979",
        },
      ]}
    >
      <Text
        style={{
          fontFamily: "PingFangHK-Medium",
          fontSize: 15,
          textTransform: "uppercase",
          letterSpacing: 1,
          fontWeight: "500",
          color: outline ? "#ee0979" : "#fff",
        }}
      >
        {children}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default GradientButton;
