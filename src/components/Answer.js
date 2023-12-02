import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Answer = ({answer, index}) => {
  return (
    <View style={styles.container} key={index}>
      <Text style={styles.answer}>{answer}</Text>
    </View>
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
  answer: { 
    fontSize: 20,
    fontWeight: '500' 
  },
});
