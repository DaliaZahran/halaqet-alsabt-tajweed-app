import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Answer from "../components/Answer";
import Question from "../components/Question";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { questions } from "../constants/dummy_data";

const FinishScreen = () => {
  // const [questions, setQuestions] = useState(questions);
  const navigation = useNavigation();
  const route = useRoute();
  const goToHome = () => {
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.score}>Your score is: {route.params.score} </Text>
      <Button style={styles.button} title="Finish" onPress={goToHome} />
    </SafeAreaView>
  );
};

export default FinishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    fontSize: 35,
    fontWeight: "600",
  },
});
