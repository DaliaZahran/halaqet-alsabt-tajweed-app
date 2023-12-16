import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Question = ({question}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    fontSize: 23,
    fontWeight: '500',
  },
});
