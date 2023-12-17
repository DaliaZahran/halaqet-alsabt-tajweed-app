import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Answer from "../components/Answer";
import Question from "../components/Question";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { questions } from "../constants/dummy_data";

const ExamScreen = () => {
  // const [questions, setQuestions] = useState(questions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  console.log(questions);

  const navigation = useNavigation();
  const route = useRoute();
  let allOptions = [];

  // will be used to retrieve exam questions
  const examId = route.params.examId;

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigation.navigate("Finish", { score: score });
    }
  };

  if (questions) {
    allOptions = [
      ...questions[currentQuestion].incorrect_answers,
      questions[currentQuestion].correct_answer,
    ];
    allOptions = allOptions.sort(() => 0.5 - Math.random());
  }

  return (
    <SafeAreaView>
      <Text style={styles.score}>Score: {score} </Text>
      {questions.length > 0 ? (
        <>
          {questions && (
            <Question question={questions[currentQuestion].title} />
          )}

          {allOptions &&
            allOptions.map((item, index) => (
              <Answer
                answer={item}
                key={index}
                correct_answer={questions[currentQuestion].correct_answer}
                setScore={setScore}
                nextQuestion={nextQuestion}
              />
            ))}
        </>
      ) : (
        <Text>Please Wait</Text>
      )}
    </SafeAreaView>
  );
};

export default ExamScreen;

const styles = StyleSheet.create({
  score: {
    fontSize: 30,
    color: "green",
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
  },
});
