// MainNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ExamScreen from "../screens/ExamScreen";
import ExamResultScreen from "../screens/ExamResultScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FinishScreen from "../screens/FinishScreen";
import ExamsListScreen from "../screens/ExamsListScreen";

const MainStack = createStackNavigator();

const MainNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="Home" component={HomeScreen} />
    <MainStack.Screen name="ExamsList" component={ExamsListScreen} />
    <MainStack.Screen name="Profile" component={ProfileScreen} />
    <MainStack.Screen name="Exam" component={ExamScreen} />
    <MainStack.Screen name="Result" component={ExamResultScreen} />
    <MainStack.Screen name="Finish" component={FinishScreen} />
  </MainStack.Navigator>
);

export default MainNavigator;
