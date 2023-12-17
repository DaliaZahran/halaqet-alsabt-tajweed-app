//use rnfes -> es7 code snippets to populate file structure
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import { categories } from "../constants/dummy_data";
import Category from "../components/Category";
import { fetchExams } from "../services/firebaseService"; // Import the fetchExams function

const HomeScreen = () => {
  /** Next lines are commented to avoid calling the firebase server alot while development
   * TODO: uncomment to use firebase server after installing a local fake server
   */
  // const [exams, setExams] = useState([]);
  // useEffect(() => {
  //   // Fetch exams when the component mounts
  //   async function loadExams() {
  //     try {
  //       const fetchedExams = await fetchExams();
  //       setExams(fetchedExams);
  //     } catch (error) {
  //       console.error("Error fetching exams:", error);
  //     }
  //   }
  //   loadExams();
  //   console.log("fetched Exams => ", exams);
  // }, []); // Run once when the component mounts

  return (
    <SafeAreaView>
      <FlatList
        data={categories}
        renderItem={({ item }) => <Category examCategory={item} />}
        keyExtractor={(item) => item.id}
        // showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
