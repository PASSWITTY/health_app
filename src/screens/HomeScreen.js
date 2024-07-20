import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from '../api/axiosConfig';

const HomeScreen = ({ navigation }) => {
  const [summary, setSummary] = useState({});
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axios.get('/api/summary');
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Welcome, {user?.name}</Text>
      <View className="bg-white rounded-lg shadow-md p-4 mb-4">
        <Text className="text-lg font-semibold mb-2">Today's Summary</Text>
        <Text>Medications taken: {summary.medicationsTaken}/{summary.totalMedications}</Text>
        <Text>Water intake: {summary.waterIntake} ml</Text>
        <Text>Upcoming meals: {summary.upcomingMeals}</Text>
        <Text>Next health test: {summary.nextHealthTest}</Text>
      </View>
      <TouchableOpacity 
        className="bg-red-500 py-2 px-4 rounded-lg mb-4"
        onPress={() => navigation.navigate('Emergency')}
      >
        <Text className="text-white text-center font-bold">Emergency</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className="bg-blue-500 py-2 px-4 rounded-lg mb-4"
        onPress={() => navigation.navigate('Fraud Education')}
      >
        <Text className="text-white text-center font-bold">Fraud Prevention Tips</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;