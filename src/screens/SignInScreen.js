// SignInScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/actions/authActions"; // Update with the correct path
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import specific auth functions

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      // Basic validation
      if (!email || !password) {
        console.error("Invalid input");
        return;
      }

      // Get the auth instance
      const auth = getAuth();

      // Sign in the user with the provided email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Dispatch the signIn action with the user data
      dispatch(signIn(userCredential.user));

      // Optionally, you can perform additional actions after sign-in, such as navigating to the home screen
      navigation.navigate("Home");

      console.log("User signed in successfully!");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Function to navigate to the SignIn screen
  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>تسجيل الدخول</Text>
      <TextInput
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="كلمة السر"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>تسجيل الدخول</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.signUpButtonText}>
          ليس لديك حساب؟
          <Text style={styles.signUpButtonSubtext}> تسجيل حساب جديد</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const commonSignUpTextStyle = {
  fontSize: 15,
  fontStyle: "normal",
  fontWeight: "400",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  titleText: {
    fontSize: 24,
    textAlign: "right",
    margin: 16,
  },
  input: {
    marginBottom: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
    textAlign: "right",
  },
  signInButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
    backgroundColor: "#9A98FF",
    marginTop: 4,
    marginBottom: 12,
  },
  signInButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  signUpButtonText: {
    ...commonSignUpTextStyle,
    color: "#333",
    textAlign: "center",
  },
  signUpButtonSubtext: {
    ...commonSignUpTextStyle,
    color: "#6E85E3",
  },
});

export default SignInScreen;
