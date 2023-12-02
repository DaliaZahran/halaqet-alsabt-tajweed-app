// ExamScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';

import Answer from "../components/Answer";
import Question from "../components/Question";

const ExamScreen = ({ route }) => {
  const { exam } = route.params;

  const [selectedAnswers, setSelectedAnswers] = useState(Array(exam.questions.length).fill(null));

  const handleAnswerSelection = (questionIndex, choiceIndex) => {
    console.log(`Selected answer for question ${questionIndex}: choice ${choiceIndex}`);
    setSelectedAnswers(prevState => {
      console.log('>> old selectedAnswers:', prevState);
      const newSelectedAnswers = [...prevState];
      newSelectedAnswers[questionIndex] = choiceIndex;
      console.log('>> new selectedAnswers:', newSelectedAnswers);
      return newSelectedAnswers;
    });
  };

  const handleSubmission = () => {
    console.log('>> Selected answers to submit: ', selectedAnswers);
    // Implement your logic for handling the submission
    // For example, you can compare selectedAnswers with correct answers
    // and update the UI accordingly
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
