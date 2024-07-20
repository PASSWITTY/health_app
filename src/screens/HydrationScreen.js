import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from '../api/axiosConfig';

const HydrationScreen = () => {
  const [hydrationLog, setHydrationLog] = useState([]);
  const [waterIntake, setWaterIntake] = useState('');
  const [dailyGoal, setDailyGoal] = useState(2000); // Default 2000ml

  useEffect(() => {
    fetchHydrationLog();
    fetchDailyGoal();
  }, []);

  const fetchHydrationLog = async () => {
    try {
      const response = await axios.get('/api/hydration');
      setHydrationLog(response.data);
    } catch (error) {
      console.error('Error fetching hydration log:', error);
    }
  };

  const fetchDailyGoal = async () => {
    try {
      const response = await axios.get('/api/hydration/goal');
      setDailyGoal(response.data.goal);
    } catch (error) {
      console.error('Error fetching daily goal:', error);
    }
  };

  const logWaterIntake = async () => {
    try {
      await axios.post('/api/hydration', { amount: parseInt(waterIntake) });
      setWaterIntake('');
      fetchHydrationLog();
    } catch (error) {
      console.error('Error logging water intake:', error);
    }
  };

  const updateDailyGoal = async () => {
    try {
      await axios.put('/api/hydration/goal', { goal: dailyGoal });
    } catch (error) {
      console.error('Error updating daily goal:', error);
    }
  };

  const renderHydrationItem = ({ item }) => (
    <View className="bg-white rounded-lg shadow-md p-2 mb-2 flex-row justify-between">
      <Text>{item.amount} ml</Text>
      <Text>{new Date(item.timestamp).toLocaleTimeString()}</Text>
    </View>
  );

  const chartData = {
    labels: hydrationLog.map(log => new Date(log.timestamp).getHours().toString()),
    datasets: [
      {
        data: hydrationLog.map(log => log.amount),
      },
    ],
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Hydration Tracker</Text>
      <View className="flex-row mb-4">
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
          placeholder="Water intake (ml)"
          value={waterIntake}
          onChangeText={setWaterIntake}
          keyboardType="numeric"
        />
        <TouchableOpacity 
          className="bg-blue-500 py-2 px-4 rounded-lg"
          onPress={logWaterIntake}
        >
          <Text className="text-white">Log</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row mb-4 items-center">
        <Text className="mr-2">Daily Goal (ml):</Text>
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
          value={dailyGoal.toString()}
          onChangeText={setDailyGoal}
          keyboardType="numeric"
        />
        <TouchableOpacity 
          className="bg-green-500 py-2 px-4 rounded-lg"
          onPress={updateDailyGoal}
        >
          <Text className="text-white">Update</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-lg font-semibold mb-2">Today's Hydration Log:</Text>
      <FlatList
        data={hydrationLog}
        renderItem={renderHydrationItem}
        keyExtractor={(item, index) => index.toString()}
        className="mb-4"
      />
      <Text className="text-lg font-semibold mb-2">Hydration Chart:</Text>
      <LineChart
        data={chartData}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        }}
        bezier
      />
    </View>
  );
};

export default HydrationScreen;