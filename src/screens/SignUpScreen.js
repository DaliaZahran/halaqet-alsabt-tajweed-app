// SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import specific auth functions
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/actions/authActions';



const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {

        // Get the auth instance
      const auth = getAuth();

      // Create a new user with the provided email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      
      console.log('User registered successfully!');

      // Dispatch the signIn action with the user data
      dispatch(signIn(userCredential.user));


      // Wait for the state to be updated before navigating
      navigation.navigate('Home');

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

    // Function to navigate to the SignIn screen
    const navigateToSignIn = () => {
        navigation.navigate('SignIn');
    };

  return (
    <View style={styles.container}>
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
        <Text style={styles.signInButton}>Already have an account? Sign In</Text>
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
    signInButton: {
      marginTop: 16,
      color: 'blue', // You can customize the color
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
  });

export default SignUpScreen;
