// ResultScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';

import Answer from "../components/Answer";
import Question from "../components/Question";

const ResultScreen = ({ route }) => {
  const { score, exam, selectedAnswers } = route.params;

  const choiceStyleClass = (questionIndex, question, choiceIndex, selectedAnswers) => {
    correctAnswer = question.correctChoice;
    if (question.choices[choiceIndex] == correctAnswer) {
        return styles.correctAnswerText;
    }
    if (selectedAnswers[questionIndex] == choiceIndex) {
        return styles.wrongAnswerText;
    }
    return null;
  };

  return (
    <View style={styles.container}>
        <Text>Your Score is {score}</Text>
        <FlatList
            data={exam.questions}
            renderItem={({ item, index: questionIndex }) => (
            <View style={styles.questionContainer}>
                <Question question={item.questionBody}/>
                <FlatList
                    data={item.choices}
                    renderItem={({ item: choice, index: choiceIndex }) => (
                    <View
                        style={[
                        styles.choiceContainer,
                        choiceStyleClass(questionIndex, item, choiceIndex, selectedAnswers)
                        ]}
                    >
                        <Answer answer={choice} index={choiceIndex} />
                    </View>
                    )}
                    keyExtractor={(choice, choiceIndex) => choiceIndex.toString()}
                />
            </View>
            )}
            keyExtractor={(question, index) => index.toString()}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  answerText: {
    fontSize: 14,
    marginBottom: 4,
  },
  correctAnswerText: {
    backgroundColor: 'green', // Default background color for choices
  },
  wrongAnswerText: {
    backgroundColor: 'red', // Default background color for choices
  },
});

export default ResultScreen;
