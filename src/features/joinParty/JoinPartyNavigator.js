import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Completed from "./screens/Completed";
import Swiping from "./screens/Swiping";
import { Image } from "react-native";
// import Start from "./screens/Start";

const Stack = createStackNavigator();

const LogoTitle = () => (
  <Image
    style={{ width: 100, height: 75, alignItems: "center" }}
    source={require("assets/images/headerlogo.png")}
  />
);

export default ({ route }) => {
  // console.log({ bar: route.params });
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="joinParty/swiping"
        component={Swiping}
        initialParams={{ route }}
        options={{
          title: "Swiping",
          headerShown: false,
          // headerTitle: (props) => <LogoTitle {...props} />,
          headerLeft: null,
          // headerStyle: {
          //   height: 80,
          // },
        }}
      />
      <Stack.Screen
        name="joinParty/completed"
        component={Completed}
        options={{
          title: "Party",
          headerShown: false,

          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};