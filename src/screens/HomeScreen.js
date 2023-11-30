//use rnfes -> es7 code snippets to populate file structure
import { FlatList, SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";

import { categories } from "../constants/dummy_data";
import Category from "../components/Category";
import { fetchAllQuizzesFromStorage } from "../services/firebaseService"; // Import the fetchExams function

import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/actions/authActions'; // Update with the correct path


const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleSignOut = () => {
    // Perform sign-out logic and dispatch the signOut action
    // Update with your sign-out logic
    dispatch(signOut());

    navigation.navigate('SignUp');
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
          <Text>Welcome, {user.email}!</Text>
          <Button title="Sign Out" onPress={handleSignOut} />
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
          <View style={styles.examContainer}>
            <Text style={styles.examTitle}>{item.title}</Text>
            {/* Render questions for each exam */}
            <FlatList
              data={item.questions}
              renderItem={({ item: question }) => (
                <View style={styles.questionContainer}>
                  <Text style={styles.questionBody}>{question.questionBody}</Text>
                  <FlatList
                    data={question.choices}
                    renderItem={({ item: choice, index }) => (
                      <Text key={index} style={styles.choiceItem}>
                        {choice}
                      </Text>
                    )}
                    keyExtractor={(choice, index) => index.toString()}
                  />
                </View>
              )}
              keyExtractor={(question, index) => index.toString()}
            />
          </View>
        )}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
      // showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
