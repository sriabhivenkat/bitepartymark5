import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "galio-framework";

export const TitleText = ({ children, style, ...rest }) => (
  <Text h2 style={[styles.title, style]} {...rest}>
    {children}
  </Text>
);

export const SubtitleText = ({ children, style, ...rest }) => (
  <Text style={[styles.subtitle, style]} {...rest}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    color: "black",
    justifyContent: "center",
    fontSize: 30,
    fontFamily: "Kollektif",
    letterSpacing: 0.1,
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "400",
    fontFamily: "Kollektif",
  },
});
