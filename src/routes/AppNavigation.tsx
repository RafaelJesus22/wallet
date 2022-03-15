import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Screens } from "../enums/Screens";
import { Home } from "../Pages/Home";
import { NewPocketName } from "../Pages/NewPocket/NewPocketName";
import { NewPocketInitialValue } from "../Pages/NewPocket/NewPocketIniticalValue";
import { NewPocketGoal } from "../Pages/NewPocket/NewPocketGoal";
import { PocketDetails } from "../Pages/PocketDetails";
import { UpdatePocket } from "../Pages/UpdatePocket";

const Stack = createNativeStackNavigator()

export const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.HOME} component={Home} />
      <Stack.Screen name={Screens.NEW_POCKET_NAME} component={NewPocketName} />
      <Stack.Screen name={Screens.NEW_POCKET_INITIAL_VALUE} component={NewPocketInitialValue} />
      <Stack.Screen name={Screens.NEW_POCKET_GOAL} component={NewPocketGoal} />
      <Stack.Screen name={Screens.POCKET_DETAILS} component={PocketDetails} />
      <Stack.Screen name={Screens.POCKET_EDIT} component={UpdatePocket} />
    </Stack.Navigator>
  );
}