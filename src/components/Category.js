import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Category = (props) => {
  const [exam, setExam] = useState(props.examCategory);
  const navigation = useNavigation();

  const goToExam = () => {
    navigation.navigate("Exam", { exam: props.examCategory });
  };
  return (
    <Pressable style={styles.container} onPress={goToExam}>
      <Image
        source={require("../assets/images/favicon.png")}
        style={styles.image}
      />
      <Text style={styles.title}>{exam.title}</Text>
    </Pressable>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row-reverse",
    // justifyContent: "right",
    alignItems: "center",
    padding: 10,
    backgroundColor: "beige",
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    marginVertical: 10,
  },
  image: {
    height: 50,
    width: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginRight: 10,
  },
});
