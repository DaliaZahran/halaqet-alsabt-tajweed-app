//use rnfes -> es7 code snippets to populate file structure
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import { categories } from "../constants/dummy_data";
import Category from "../components/Category";
import { fetchExams } from "../services/firebaseService"; // Import the fetchExams function

const HomeScreen = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch exams when the component mounts
    async function loadExams() {
      try {
        const fetchedExams = await fetchExams();
        setExams(fetchedExams);
        console.log("fetched Exams => ", exams);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    }

    loadExams();
  }, []); // Run once when the component mounts

  return (
    <SafeAreaView>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Category image={item.image} title={item.title} />
        )}
        keyExtractor={(item) => item.id}
        // showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
