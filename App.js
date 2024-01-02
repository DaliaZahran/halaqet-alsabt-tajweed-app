import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ExamScreen from "./src/screens/ExamScreen";
import ExamResultScreen from "./src/screens/ExamResultScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import FinishScreen from "./src/screens/FinishScreen";
import ExamsListScreen from "./src/screens/ExamsListScreen";

import store from "./src/redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // You may perform any initialization or checks here
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false, // Set this option to hide the header for all screens
          }}
        >
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ExamsList" component={ExamsListScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Exam" component={ExamScreen} />
          <Stack.Screen name="Result" component={ExamResultScreen} />
          <Stack.Screen name="Finish" component={FinishScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
