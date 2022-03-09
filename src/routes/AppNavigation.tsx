import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Screens } from "../enums/Screens";
import { Home } from "../Pages/Home";
import { NewPocket } from "../Pages/NewPocket";

const Stack = createNativeStackNavigator()

export const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.HOME} component={Home} />
      <Stack.Screen name={Screens.NEW_POCKET} component={NewPocket} />
    </Stack.Navigator>
  );
}