//use rnfes -> es7 code snippets to populate file structure
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { fetchAllQuizzesFromStorage } from "../services/firebaseService"; // Import the fetchExams function
import { categories as data, randomExam } from "../constants/dummy_data";

import Category from "../components/Category";

const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);

  const handleProfilePage = () => {
    navigation.navigate("Profile");
  };

  const [exams, setExams] = useState([]);

  // Fetch exams when the component mounts
  useEffect(() => {
    async function loadExams() {
      try {
        /** Next line is commented to avoid calling the firebase server alot while development
         * TODO: uncomment to use firebase server after installing a local fake server
         */
        // const data1 = await fetchAllQuizzesFromStorage();
        // console.log("data1 => ", data1);
        setExams(data); // Update the state with fetched exams
        console.log(">>fetched Exams => ", data);
      } catch (error) {
        console.error(">>Error fetching exams:", error);
      }
    }
    loadExams();
  }, []);

  function handleRandomExamPress() {
    navigation.navigate("Exam", { exam: randomExam });
  }

  function handleViewAllExamsPress() {
    navigation.navigate("ExamsList");
  }
  function handleOnExamBoxPress(exam) {
    navigation.navigate("Exam", { exam });
  }

  return (
    <SafeAreaView>
      {user ? (
        <View>
          <View style={styles.challengeBox}>
            <Text style={styles.challengeBoxTitle}>معلومة اليوم</Text>
            <Text style={styles.challengeBoxtext}>
              حروف الإظهار هي {"\n"} ء ه ع ح غ خ
            </Text>
          </View>
          <TouchableOpacity
            title="اختبار عشوائي"
            style={styles.randomExamBtn}
            onPress={handleRandomExamPress}
          >
            <Text style={styles.randomExamBtnText}>اختبار عشوائي</Text>
          </TouchableOpacity>

          <View style={styles.ExamsTitleBar}>
            <Text style={styles.ExamsTitle}>اختبارات</Text>
            <TouchableOpacity onPress={handleViewAllExamsPress}>
              <Text style={styles.viewAllButton}>الكل {"->"} </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            // inverted
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.slider}
          >
            {exams.map((item) => (
              <Pressable
                key={item.id}
                style={styles.box}
                onPress={() => handleOnExamBoxPress(item)}
              >
                <Text style={styles.boxTitle}>{item.title}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : (
        <Text>User Not signed in</Text>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  challengeBox: {
    height: 215,
    borderRadius: 20,
    backgroundColor: "#9A98FF",
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  challengeBoxTitle: {
    color: "white",
    fontSize: 32,
    textAlign: "center",
    paddingBottom: 15,
  },
  challengeBoxtext: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
  },
  randomExamBtn: {
    backgroundColor: "#FF8058",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 20,
  },
  randomExamBtnText: {
    color: "white",
    fontSize: 18,
  },
  ExamsTitleBar: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 40,
  },
  ExamsTitle: {
    fontSize: 32,
  },
  slider: {
    flexDirection: "row-reverse",
    marginTop: 20,
    transform: [{ scaleX: -1 }],
  },
  box: {
    width: 130,
    height: 130,
    borderRadius: 10,
    backgroundColor: "lightblue",
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    // transform: [{ scaleX: -1 }],
  },
  boxTitle: { fontSize: 16, textAlign: "center" },
});
