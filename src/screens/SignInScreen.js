// SignInScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/actions/authActions'; // Update with the correct path
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import specific auth functions


const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {

        // Basic validation
        if (!email || !password) {
            console.error('Invalid input');
            return;
        }

        // Get the auth instance
        const auth = getAuth();

        // Sign in the user with the provided email and password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Dispatch the signIn action with the user data
        dispatch(signIn(userCredential.user));
    
        // Optionally, you can perform additional actions after sign-in, such as navigating to the home screen
        navigation.navigate('Home');

        console.log('User signed in successfully!');
    } catch (error) {
        console.error('Error signing in:', error);
    }
  };

    // Function to navigate to the SignIn screen
    const navigateToSignUp = () => {
        navigation.navigate('SignUp');
    };

  return (
    <View style={styles.container}>
      {/* Your UI components for sign-in */}
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
      <Button title="Sign In" onPress={handleSignIn} />
      <TouchableOpacity onPress={navigateToSignUp}>
        <Text style={styles.signUpButton}>You don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
  },
  signUpButton: {
    marginTop: 16,
    color: 'blue', // You can customize the color
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
