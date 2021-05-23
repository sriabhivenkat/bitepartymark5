import React from "react";
import { Image, Dimensions, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Filters from "./screens/Filters";
import SelectFriends from "./screens/SelectFriends";
import CreateGroup from "./screens/CreateGroup";
import Start from "./screens/Start";
import ChangeLocation from "./screens/ChangeLocation";
import { logoHeaderOptions } from "components";
import { BackButton, GradientButton } from "../../components";
import { View } from "react-native";
import AddFriends from "features/profile/screens/AddFriends";
import { useUser } from "lib";
const Stack = createStackNavigator();


export default ({navigation}) => {
  const { user } = useUser();
  const isSmall = height < 700;
  const height = Dimensions.get("window").height;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="createParty/begin"
        component={Start}
        options={{
          title: `Home`,
          headerShown: false,
          //   headerTitleStyle: {
          //     fontFamily: "Kollektif",
          //     fontSize: 20,
          //     alignItems: "flex-start"
          //   },
          //   headerLeft: (props) => (
          //     <Image
          //       style={{
          //         aspectRatio: 5 / 10,
          //         height: isSmall ? 50 : 70,
          //       }}
          //       source={require("assets/images/newheaderLogo.jpeg")}
          //     />
          //   ),
          //   headerLeftContainerStyle: {
          //     backgroundColor: "black"
          //   }
          //   // ...logoHeaderOptions,
          //   // headerStyle: {
          //   //   backgroundColor: "white"
          //   // }
        }}
      />

      <Stack.Screen 
        name="createParty/createGroup"
        component={CreateGroup}
        options={{
          title: "Group Creation",
          headerShown: false,
          headerLeft: BackButton,
          headerBackTitle: "",
          headerRight: () => (
            <TouchableOpacity
              style={{
                right: 20,
              }}
              onPress={() => {navigation.goBack()}}
            >
              <Text
                style={{
                  fontSize: 23,
                  fontFamily: "Kollektif",
                  color: "#f76f6d"
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ),
          ...logoHeaderOptions
        }}
      />

      <Stack.Screen
        name="createParty/selectFriends"
        component={SelectFriends}
        options={{
          title: "Friends",
          headerShown: true,
          headerLeft: BackButton,
          headerBackTitle: "",
          // headerRight: () => (
          //   <View marginRight={10}>
          //     <GradientButton
          //       innerStyle={{ paddingHorizontal: 20 }}
          //       textStyle={{ fontSize: 16 }}
          //     >
          //       Add Friends
          //     </GradientButton>
          //   </View>
          // ),

          ...logoHeaderOptions,
        }}
      />
      <Stack.Screen
        name="createParty/addFriends"
        component={AddFriends}
        options={{
          title: "Friends",
          headerShown: true,
          headerLeft: BackButton,
          // headerRight: () => (
          //   <View marginRight={10}>
          //     <GradientButton
          //       innerStyle={{ paddingHorizontal: 20 }}
          //       textStyle={{ fontSize: 16 }}
          //     >
          //       Add Friends
          //     </GradientButton>
          //   </View>
          // ),

          ...logoHeaderOptions,
        }}
      />

      <Stack.Screen
        name="createParty/filters"
        component={Filters}
        options={{
          title: "Filters",
          headerShown: true,
          headerLeft: BackButton,
          ...logoHeaderOptions,
        }}
      />
      <Stack.Screen
        name="createParty/filters/changeLocation"
        component={ChangeLocation}
        options={{
          title: "ChangeLocation",
          headerLeft: BackButton,
          ...logoHeaderOptions,
          // headerShown: false,
          // ...logoHeader,
        }}
      />
    </Stack.Navigator>
  );
};
