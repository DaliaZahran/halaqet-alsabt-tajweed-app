import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const ExamScreen = ({ route }) => {
  const { exam } = route.params;
  const navigation = useNavigation();

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState(
    Array(exam.questions.length).fill(null)
  );

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

  const handleExit = () => {
    navigation.goBack();
  };

  const handleSubmission = () => {
    // alert("Are you sure?");
    const score = calculateScore();
    navigation.navigate("Result", {
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

  const ProgressBarBubbles = ({ totalQuestions, currentQuestion }) => {
    const bubbles = Array.from({ length: totalQuestions }, (_, index) => (
      <View
        key={index}
        style={[
          styles.bubble,
          index === currentQuestion ? styles.activeBubble : null,
        ]}
      />
    ));

    return <View style={styles.progressBar}>{bubbles}</View>;
  };

  const renderChoice = ({ item: choice, index: choiceIndex }) => (
    <TouchableOpacity
      onPress={() => handleAnswerSelection(choiceIndex)}
      style={[
        styles.choiceContainer,
        selectedAnswers[currentQuestion] === choiceIndex
          ? styles.selectedAnswers
          : null,
      ]}
    >
      <Text style={styles.choice}>{choice}</Text>
    </TouchableOpacity>
  );

  const renderNavigationButton = (text, onPress) => (
    <TouchableOpacity style={styles.navigationButton} onPress={onPress}>
      <Text style={styles.navigationButtonsText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.curvedBackgroundBox}>
        <Text style={styles.examTitleText}>{exam.title}</Text>
        <ProgressBarBubbles
          totalQuestions={exam.questions.length}
          currentQuestion={currentQuestion}
        />
        <View style={styles.questionBodyContainer}>
          <Text style={styles.questionBodyText}>
            {exam.questions[currentQuestion].questionBody}
          </Text>
        </View>
      </View>
      <View>
        <FlatList
          data={exam.questions[currentQuestion].choices}
          renderItem={renderChoice}
          keyExtractor={(choice, choiceIndex) => choiceIndex.toString()}
        />
        <View style={styles.navigationButtons}>
          {currentQuestion === 0
            ? renderNavigationButton("الخروج", handleExit)
            : renderNavigationButton("السابق", handlePreviousQuestion)}
          {exam.questions.length !== currentQuestion + 1
            ? renderNavigationButton("التالي", handleNextQuestion)
            : renderNavigationButton("تسليم الاختبار", handleSubmission)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  curvedBackgroundBox: {
    backgroundColor: "#6E85E3",
    width: "100%",
    height: windowHeight / 2,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
    justifyContent: "flex-start", // Align ProgressBarBubbles to the top
    marginBottom: 18,
  },
  examTitleText: {
    marginTop: 80,
    marginBottom: 24,
    // paddingTop: 60,
    fontSize: 28,
    color: "#fff",
    fontFamily: "Helvetica Neue",
    fontWeight: "bold",
    textAlign: "center",
  },
  questionBodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  questionBodyText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 40,
    // paddingTop: 10,
  },
  bubble: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF8058",
    marginHorizontal: 5,
  },
  activeBubble: {
    backgroundColor: "#fff",
  },
  choiceContainer: {
    backgroundColor: "#BFCFF7",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 40,
    minHeight: 48,
  },
  selectedAnswers: {
    borderColor: "#2ecc71",
    backgroundColor: "#c1f2bc",
    borderWidth: 1,
  },
  choice: {
    fontSize: 16,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 40,
    width: windowWidth - 80,
  },
  navigationButton: {
    alignSelf: "center",
    backgroundColor: "#2F80ED",
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 20,
    width: (windowWidth - 80 - 24) / 2,
  },
  navigationButtonsText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ExamScreen;
