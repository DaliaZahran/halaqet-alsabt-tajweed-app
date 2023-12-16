import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Answer from '../components/Answer';
import Question from '../components/Question';

const ProgressBarBubbles = ({ totalQuestions, currentQuestion }) => {
  const bubbles = Array.from({ length: totalQuestions }, (_, index) => (
    <View key={index} style={[styles.bubble, index === currentQuestion ? styles.activeBubble : null]} />
  ));

  return <View style={styles.progressBar}>{bubbles}</View>;
};

const ExamScreen = ({ route }) => {
  const { exam } = route.params;
  const navigation = useNavigation();

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState(Array(exam.questions.length).fill(null));

  const handleAnswerSelection = (choiceIndex) => {
    setSelectedAnswers((prevState) => {
      const newSelectedAnswers = [...prevState];
      newSelectedAnswers[currentQuestion] = choiceIndex;
      return newSelectedAnswers;
    });
  };

  const calculateScore = () => {
    const totalQuestions = exam.questions.length;
    let correctAnswers = 0;

    for (let i = 0; i < totalQuestions; i++) {
      const question = exam.questions[i];
      const selectedAnswer = selectedAnswers[i];

      if (question.choices[selectedAnswer] === question.correctChoice) {
        correctAnswers++;
      }
    }

    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    return `${scorePercentage.toFixed(2)}%`;
  };

  const handleSubmission = () => {
    const score = calculateScore();
    navigation.navigate('Result', {
      score,
      exam,
      selectedAnswers,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.examTitle}>{exam.title}</Text>
      <View>
        <ProgressBarBubbles totalQuestions={exam.questions.length} currentQuestion={currentQuestion} />
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={handlePreviousQuestion} disabled={currentQuestion === 0} style={{ flex: 1 }}>
            <Text style={[styles.navigationText, { color: currentQuestion === 0 ? '#dbd8e3' : 'black' }]}>{'<'}</Text>
          </TouchableOpacity>
          <View style={{ flex: 7 }}>
            <View style={styles.questionContainer}>
              <Question question={exam.questions[currentQuestion].questionBody}/>
              <FlatList
                data={exam.questions[currentQuestion].choices}
                renderItem={({ item: choice, index: choiceIndex }) => (
                  <TouchableOpacity
                    onPress={() => handleAnswerSelection(choiceIndex)}
                    style={[
                      styles.choiceContainer,
                      selectedAnswers[currentQuestion] === choiceIndex ? styles.selectedAnswers : null,
                    ]}
                  >
                    <Answer answer={choice} index={choiceIndex} />
                  </TouchableOpacity>
                )}
                keyExtractor={(choice, choiceIndex) => choiceIndex.toString()}
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleNextQuestion} disabled={currentQuestion === exam.questions.length - 1} style={{ flex: 1 }}>
            <Text style={[styles.navigationText, { color: currentQuestion === exam.questions.length - 1 ? '#dbd8e3' : 'black' }]}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmission}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingBottom: 50,
    paddingTop:60,
    paddingHorizontal: 16,
    justifyContent: 'space-between', // Align content vertically
  },
  examTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  bubble: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3498db',
    marginHorizontal: 5,
  },
  activeBubble: {
    backgroundColor: '#2ecc71',
  },
  questionContainer: {
    padding: 16,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  choiceContainer: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3498db', 
    marginVertical: 10, 
  },
  selectedAnswers: {
    borderColor: '#2ecc71', 
    backgroundColor: '#c1f2bc',
  },
  navigationText: {
    fontSize: 50,
    color: 'black',
  },
  submitButton: {
    alignSelf: 'center',
    backgroundColor: '#3498db',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 120,
    marginVertical: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExamScreen;
