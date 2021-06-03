import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { View } from "react-native";
import { Button, Divider, IconButton } from "react-native-paper";
import { TitleText } from "./TitleText";

export const HeaderComp = ({
    isHomeScreen,
    height,
    name,
    navigation,
    route,
    isProfile,
    handle,
    ...rest
}) => (



    <View flexDirection="row">
        <View
            style={{
                // backgroundColor: "red",
                height: height / 11,
                // height: 10,
                justifyContent: "space-between",
                flex: 1,
                flexDirection: "row",
            }}
        >
            {/* <Appbar.Content
        title={

        }
        titleStyle={{ backgroundColor: "white", right: 40 }}
        style={{ alignItems: "flex-start", top: 5 }}
      /> */}
            <View
                flexDirection="row"
                alignItems="center"
                paddingHorizontal={10}
                flex={1}
            >
                {!isProfile && (<Image
                    source={require("assets/images/newHeaderLogo.png")}
                    style={{
                        width: 29.333,
                        height: 44,
                    }}
                />)}
                {!isProfile && isHomeScreen && (
                    <View style={{
                        paddingLeft: 10
                    }}>
                        <Text adjustsFontSizeToFit={true} style={{


                            fontFamily: "Kollektif",
                            fontSize: 22,
                            color: "black"
                        }}>
                            Welcome, {name}!
                        </Text>
                    </View>
                )}
                {isProfile && (
                    <TitleText>
                        @{handle}
                    </TitleText>

                )}
            </View>

            <View flexDirection="row" alignItems="center" paddingLeft={10}>

                {height >= 896 && (
                    <Button
                        icon="account-multiple-plus"
                        iconSize={30}
                        mode="outlined"
                        labelStyle={{ color: "black" }}
                        style={{ borderRadius: 20, borderColor: "black" }}
                        uppercase={false}
                        onPress={() => navigation.navigate("createParty/createGroup")}
                        color="gray"
                    >
                        Group

                    </Button>
                )}

                {height <= 812 && (
                    <IconButton icon='account-multiple-plus' size={30} style={{ left: 5, borderWidth: 1, borderColor: "gray" }} onPress={() => navigation.navigate("createParty/createGroup")} />


                )}
                <IconButton
                    icon="account-plus"
                    size={30}
                    style={{
                        borderWidth: 1,
                        borderColor: "grey",
                    }}
                    onPress={() =>
                        navigation.navigate("profile", { screen: "profile/addFriends" })
                    }
                />
            </View>
        </View>
    </View >
);
