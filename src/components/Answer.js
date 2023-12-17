import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Answer = (props) => {
  const isItTrue = () => {
    if (props.answer == props.correct_answer) {
      alert("Correct answer");
      props.setScore((prev) => prev + 1);
    } else {
      alert(`Incorrect answer, the correct answer is ${props.correct_answer}`);
    }
    props.nextQuestion();
  };

  return (
    <Pressable style={styles.container} onPress={isItTrue}>
      <Text style={styles.answer}>{props.answer}</Text>
    </Pressable>
  );
};

export default Answer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  answer: { fontSize: 20, fontWeight: 500 },
});
