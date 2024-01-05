import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import firebaseConfig from "../constants/env";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const currentUser = auth.currentUser;

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     console.log("currentUser =>>> ", uid);
//   } else {
//     // User is signed out
//     console.log("  User is signed out");
//   }
// });

// Function to register a new user
const registerUser = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update the user's display name (name)
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    return userCredential.user;
  } catch (error) {
    console.error("Error signing up - service:", error);
  }
};

// Function to sign in a user
const signInUser = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// Function to fetch exams from Firestore
const fetchExams = async () => {
  try {
    const examCollection = collection(db, "exams");
    let allExams = await getDocs(examCollection);
    const exams = [];
    allExams.forEach((doc) => {
      exams.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return exams;
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw error;
  }
};

// const fetchQuizDataFromStorage = async (quizId) => {
//   try {
//     const storage = getStorage();
//     const url = await getDownloadURL(ref(storage, `quizData/${quizId}.json`));
//     const response = await fetch(url);
//     return response.json();
//   } catch (error) {
//     console.error(`Error fetching quiz data for ${quizId}:`, error);
//     return null;
//   }
// };

// const fetchAllQuizzesFromStorage = async () => {
//   const storage = getStorage(app);
//   const directoryPath = "Exams/";

//   try {
//     const filesList = await listAll(ref(storage, directoryPath));
//     console.log("filesList => ", filesList);

//     const jsonDataArray = [];
//     for (const fileRef of filesList.items) {
//       const downloadURL = await getDownloadURL(fileRef);
//       const response = await fetch(downloadURL);
//       const jsonData = await response.json();
//       jsonDataArray.push(jsonData);
//     }

//     return jsonDataArray;
//   } catch (error) {
//     console.error("Error fetching or parsing JSON data:", error);
//     return null;
//   }
// };

const fetchAllQuizzesFromStorage = async (directoryPath = "Exams/") => {
  const storage = getStorage(app);

  try {
    const jsonDataArray = await fetchJsonData(storage, directoryPath);
    console.log("jsonDataArray => ", filesList);
    return jsonDataArray;
  } catch (error) {
    console.error("Error fetching or parsing JSON data:", error);
    return null;
  }
};

const fetchJsonData = async (storage, directoryPath) => {
  const filesList = await listAll(ref(storage, directoryPath));
  const jsonDataArray = [];

  for (const item of filesList.items) {
    if (item.isDirectory) {
      // Recursive call for subdirectory
      const subdirectoryPath = `${directoryPath}${item.name}/`;
      const subdirectoryData = await fetchJsonData(storage, subdirectoryPath);
      jsonDataArray.push(...subdirectoryData);
    } else {
      // Fetch and parse JSON for files
      const downloadURL = await getDownloadURL(item);
      const response = await fetch(downloadURL);
      const jsonData = await response.json();
      jsonDataArray.push(jsonData);
    }
  }

  return jsonDataArray;
};

export { registerUser, signInUser, fetchExams, fetchAllQuizzesFromStorage };
