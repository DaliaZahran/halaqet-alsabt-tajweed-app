import { initializeApp } from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import { initializeAuth } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

// do not upload to GitHub
export const firebaseConfig = {};
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

export { registerUser, signInUser, fetchExams };
