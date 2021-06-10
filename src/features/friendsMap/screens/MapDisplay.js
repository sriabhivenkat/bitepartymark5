import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  SafeAreaView
} from "react-native";
import { Text, Input } from "galio-framework";
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken("pk.eyJ1Ijoia2FzdGVjaCIsImEiOiJja3BxMWJjMnYwNmVoMm5wZnBlcnBvMmJlIn0.Y0qFDmugd3SNzCOHKdHyXQ");
const MapDisplay = ({ route, navigation }) => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>hola</Text>
        </SafeAreaView>
    )
}
export default MapDisplay;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center"
    },
}
)