import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSelector, Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import AuthNavigator from "./src/navigation/AuthNavigator";
import MainNavigator from "./src/navigation/MainNavigator";
import store from "./src/redux/store";

function NavigatorsWrapper() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    cortoba: require("./src/assets/fonts/cortoba.ttf"),
    // Add other font variations if needed
  });
  useEffect(() => {
    // You may perform any initialization or checks here
  }, []);

  return (
    <Provider store={store}>
      <NavigatorsWrapper />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
