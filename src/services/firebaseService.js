import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const FIREBASE_API_KEY = 'AIzaSyCuqSk349-ftAsHgf3Tm8qFjvLfVPsCQXs';
const FIREBASE_AUTH_DOMAIN = 'quran-circle-app-23.firebaseapp.com';
const FIREBASE_DATABASE_URL = 'https://quran-circle-app-23-default-rtdb.europe-west1.firebasedatabase.app';
const FIREBASE_PROJECT_ID = 'quran-circle-app-23';
const FIREBASE_STORAGE_BUCKET = 'quran-circle-app-23.appspot.com';
const FIREBASE_MESSAGING_SENDER_ID = '843363821605';
const FIREBASE_APP_ID = '1:843363821605:web:18039cb4631e9ffd7337cc';
const FIREBASE_MEASUREMENT_ID = 'G-L60FDQ065T';

export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

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
const registerUser = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error };
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

const fetchAllQuizzesFromStorage = async () => {
  const storage = getStorage(app);
  const directoryPath = 'Exams/';

  try {
    const filesList = await listAll(ref(storage, directoryPath));

    const jsonDataArray = [];
    for (const fileRef of filesList.items) {
      const downloadURL = await getDownloadURL(fileRef);
      const response = await fetch(downloadURL);
      const jsonData = await response.json();
      jsonDataArray.push(jsonData);
    }

    return jsonDataArray;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
    return null;
  }
};

export { registerUser, signInUser, fetchExams, fetchAllQuizzesFromStorage };
