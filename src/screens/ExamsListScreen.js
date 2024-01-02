//use rnfes -> es7 code snippets to populate file structure
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";

import { fetchAllQuizzesFromStorage } from "../services/firebaseService"; // Import the fetchExams function
import { categories as data } from "../constants/dummy_data";

import Category from "../components/Category";

const ExamsListScreen = ({ navigation }) => {
  const [exams, setExams] = useState([]);

  // Fetch exams when the component mounts
  useEffect(() => {
    async function loadExams() {
      try {
        /** Next line is commented to avoid calling the firebase server alot while development
         * TODO: uncomment to use firebase server after installing a local fake server
         */
        // const data = await fetchAllQuizzesFromStorage();
        // console.log("data => ", data);
        setExams(data); // Update the state with fetched exams
        console.log(">>fetched Exams => ", data);
      } catch (error) {
        console.error(">>Error fetching exams:", error);
      }
    }
    loadExams();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={exams}
        renderItem={({ item }) => <Category examCategory={item} />}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        // showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ExamsListScreen;

const styles = StyleSheet.create({});
