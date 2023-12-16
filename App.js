import React, { useEffect } from 'react';

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ExamScreen from './src/screens/ExamScreen';
import ExamResultScreen from './src/screens/ExamResultScreen';
import ProfileScreen from './src/screens/ProfileScreen';
// import QuizScreen from "./src/screens/QuizScreen";


import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/redux/reducers/rootReducer'; // Update with the correct path

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const store = configureStore({
  reducer: rootReducer,
  // Additional middleware or configuration can be added here if needed
});

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
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Exam" component={ExamScreen} />
            <Stack.Screen name="Result" component={ExamResultScreen} />
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
