// ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/actions/authActions'; // Update with the correct path

const ProfileScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
  
    const handleSignOut = () => {
        // Perform sign-out logic and dispatch the signOut action
        // Update with your sign-out logic
        dispatch(signOut());
    
        navigation.navigate('SignUp');
      };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, {user?.name}!</Text>
            <Text style={styles.text}>Email: {user?.email}</Text>
            {/* Add more profile information as needed */}
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
        );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    text: {
      marginBottom: 12,
      fontSize: 16,
    },
  });
  
export default ProfileScreen;
