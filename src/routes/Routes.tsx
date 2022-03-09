import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigation } from "./AppNavigation";
import { AppProvider } from "../Contexts/AppContext";

export const Router = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AppProvider>
  );
}