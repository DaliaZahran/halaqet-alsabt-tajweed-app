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
  const [name, setName] = useState(""); // New state for Name
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <TouchableOpacity onPress={navigateToSignIn}>
        <Text style={styles.signInButton}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
  },
  signInButton: {
    marginTop: 16,
    color: "blue",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;
