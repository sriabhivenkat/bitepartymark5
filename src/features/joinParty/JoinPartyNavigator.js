import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Completed from "./screens/Completed";
import Swiping from "./screens/Swiping";
// import Start from "./screens/Start";

const Stack = createStackNavigator();

export default ({ route }) => {
  // console.log({ bar: route.params });
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="joinParty/swiping"
        component={Swiping}
        initialParams={{ route }}
        options={{ title: "Swiping", headerShown: false }}
      />
      <Stack.Screen
        name="joinParty/completed"
        component={Completed}
        options={{ title: "Party", headerShown: false }}
      />
    </Stack.Navigator>
  );
};
