import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Answer from "../components/Answer";
import Question from "../components/Question";

const QuizScreen = () => {
  return (
    <View>
      <Question />
      <Answer />
      <Answer />
      <Answer />
      <Answer />
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({});
