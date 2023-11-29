import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Answer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.answer}>Answer</Text>
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
