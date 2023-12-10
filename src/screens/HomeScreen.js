//use rnfes -> es7 code snippets to populate file structure
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";

import { categories } from "../constants/dummy_data";
import Category from "../components/Category";
import { fetchAllQuizzesFromStorage } from "../services/firebaseService"; // Import the fetchExams function

import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {

  const user = useSelector((state) => state.auth.user);

  const handleProfilePage = () => {
    navigation.navigate('Profile');
  };

  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Fetch exams when the component mounts
    async function loadExams() {
      try {
        const data = await fetchAllQuizzesFromStorage();
        setExams(data); // Update the state with fetched exams
        console.log(">>fetched Exams => ", data);
      } catch (error) {
        console.error(">>Error fetching exams:", error);
      }
    }

    loadExams();
  }, []); // Run once when the component mounts

  return (
    <SafeAreaView>
      {user ? (
        <>
          <Text>Welcome, {user.name}!</Text>
          <Button title="My Profile" onPress={handleProfilePage} />
        </>
      ) : (
        <Text>Not signed in</Text>
      )}
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <Category image={item.image} title={item.title} />
        )}
        keyExtractor={(item) => item.id}
      // showsVerticalScrollIndicator={false}
      />
      <FlatList
        data={exams}
        renderItem={({ item }) => (
          <Button
            title={item.title}
            onPress={() => navigation.navigate('Exam', { exam: item })}
          />
        )}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
      // showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
