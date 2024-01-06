// SignUpScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/actions/authActions";
import { registerUser } from "../services/firebaseService";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const user = await registerUser(name, email, password);

      if (user) {
        console.log("userCredential - screen => ", user);
        console.log("User registered successfully!");
        dispatch(signIn(user));
        navigation.navigate("Home");
      } else {
        console.log("User undefined => ", user);
      }
    } catch (error) {
      console.error("Error signing up - screen:", error);
    }
  };

  const navigateToSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>تسجيل حساب جديد</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>تسجيل حساب جديد</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToSignIn}>
        <Text style={styles.signInButtonText}>
          لديك حساب؟
          <Text style={styles.signInButtonSubtext}> تسجيل الدخول</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const commonSignInTextStyle = {
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
  signUpButton: {
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
  signUpButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  signInButtonText: {
    ...commonSignInTextStyle,
    color: "#333",
    textAlign: "center",
  },
  signInButtonSubtext: {
    ...commonSignInTextStyle,
    color: "#6E85E3",
  },
});

export default SignUpScreen;
