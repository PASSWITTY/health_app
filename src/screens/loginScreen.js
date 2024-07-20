import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { login } from '../api/authService';
import Button from '../components/Button';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    dispatch(loginStart());

    try {
      const userData = await login(email, password);
      dispatch(loginSuccess(userData));
      navigation.navigate('Main');
    } catch (error) {
      dispatch(loginFailure(error.message));
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-6">Login</Text>
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-2 mb-6"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} style="w-full" />
      <Text className="mt-4">
        Don't have an account? 
        <Text className="text-blue-500" onPress={() => navigation.navigate('Register')}> Register</Text>
      </Text>
    </View>
  );
};

export default LoginScreen;