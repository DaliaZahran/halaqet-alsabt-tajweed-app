// ExamScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Answer from "../components/Answer";
import Question from "../components/Question";

const ExamScreen = ({ route }) => {
  const { exam } = route.params;
  const navigation = useNavigation(); // Hook for navigation

  const [selectedAnswers, setSelectedAnswers] = useState(Array(exam.questions.length).fill(null));

  const handleAnswerSelection = (questionIndex, choiceIndex) => {
    setSelectedAnswers(prevState => {
      const newSelectedAnswers = [...prevState];
      newSelectedAnswers[questionIndex] = choiceIndex;
      return newSelectedAnswers;
    });
  };

  const calculateScore = () => {
    const totalQuestions = exam.questions.length;
    let correctAnswers = 0;

    for (let i = 0; i < totalQuestions; i++) {
      const question = exam.questions[i];
  
      // Assuming selectedAnswer is an array with the user's selected answers
      const selectedAnswer = selectedAnswers[i];


  
      // Check if the selected answer is correct
      if (question.choices[selectedAnswer] == question.correctChoice) {
        correctAnswers++;
      }
    }

    // Calculate the percentage of correct answers
    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    return `${scorePercentage.toFixed(2)}%`;
  };

  const handleSubmission = () => {
    // Calculate score, correct answers, etc.
    const score = calculateScore(); // Implement your scoring logic

    // Navigate to the result screen with necessary data
    navigation.navigate('Result', {
      score,
      exam,
      selectedAnswers,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.examTitle}>{exam.title}</Text>
      <FlatList
        data={exam.questions}
        renderItem={({ item, index: questionIndex }) => (
          <View style={styles.questionContainer}>
            <Question question={item.questionBody}/>
            <FlatList
                data={item.choices}
                renderItem={({ item: choice, index: choiceIndex }) => (
                  <TouchableOpacity
                    onPress={() => handleAnswerSelection(questionIndex, choiceIndex)}
                    style={[
                      styles.choiceContainer,
                      selectedAnswers[questionIndex] === choiceIndex ? styles.selectedAnswers : null,
                    ]}
                  >
                    <Answer answer={choice} index={choiceIndex} />
                  </TouchableOpacity>
                )}
                keyExtractor={(choice, choiceIndex) => choiceIndex.toString()}
            />
          </View>
        )}
        keyExtractor={(question, index) => index.toString()}
      />
    <Button title="Submit" onPress={handleSubmission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  examTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 16,
  },
  choiceContainer: {
    backgroundColor: 'white', // Default background color for choices
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  selectedAnswers: {
    backgroundColor: 'black', // Default background color for choices
  },
});

export default ExamScreen;
