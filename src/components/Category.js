import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Category = (props) => {
  return (
    <View style={styles.container}>
      <Image source={props.image} style={styles.image} />
      <Text style={styles.title}>{props.title}</Text>
    </View>
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
    fontWeight: '500',
    marginRight: 10,
  },
});
