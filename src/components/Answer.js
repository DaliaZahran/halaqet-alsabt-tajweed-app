import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Answer = ({ answer, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );
};
// Dalia Version
// const Answer = (props) => {
//   const isItTrue = () => {
//     if (props.answer == props.correct_answer) {
//       alert("Correct answer");
//       props.setScore((prev) => prev + 1);
//     } else {
//       alert(`Incorrect answer, the correct answer is ${props.correct_answer}`);
//     }
//     props.nextQuestion();
//   };

//   return (
//     <Pressable style={styles.container} onPress={isItTrue}>
//       <Text style={styles.answer}>{props.answer}</Text>
//     </Pressable>
//   );
// };

export default Answer;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "yellow",
    // padding: 10,
    // marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  answer: {
    fontSize: 20,
    fontWeight: "500",
  },
});
