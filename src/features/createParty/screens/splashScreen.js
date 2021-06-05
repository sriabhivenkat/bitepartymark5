import React, { useState, useRef, useMemo, useCallback } from "react";
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Text } from "galio-framework";
import TouchableScale from "react-native-touchable-scale";
import { ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { startImages } from "../startImages";
import { useInvites } from "lib/invites.js";
import { Alert } from "react-native";
import { useUser } from "lib";
import { GradientButton, PhoneInput } from "components";
import { Modal, Portal, Provider } from "react-native-paper";
import { Appbar, Button, Divider } from "react-native-paper";
import { Input } from "galio-framework";
import { logoHeaderOptions } from "../../../components";
import { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import firestore from "@react-native-firebase/firestore";
import { HeaderComp } from "../../../components/Header";

const SplashScreen = ({ navigation }) => {

    const height = Dimensions.get("window").height;
    const isSmall = height < 700;

    return (


        <SafeAreaView style={{ justifyContent: 'center', backgroundColor: 'blue', alignItems: 'center', height: height }}>

            <StatusBar barStyle="dark-content" />
            <View style={{ backgroundColor: 'red' }}>
                <Image
                    style={{
                        aspectRatio: 5 / 10,
                        height: isSmall ? 250 : 350,
                        backgroundColor: 'green'
                    }}
                    source={require("assets/images/newheaderLogo.jpeg")}
                />

            </View>

        </SafeAreaView>

    )
};

export default SplashScreen
