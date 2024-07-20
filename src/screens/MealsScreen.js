import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from '../api/axiosConfig';

const MealsScreen = () => {
  const [mealReminders, setMealReminders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', time: new Date() });

  useEffect(() => {
    fetchMealReminders();
  }, []);

  const fetchMealReminders = async () => {
    try {
      const response = await axios.get('/api/mealreminders');
      setMealReminders(response.data);
    } catch (error) {
      console.error('Error fetching meal reminders:', error);
    }
  };

  const toggleMealReminder = async (id) => {
    try {
      await axios.put(`/api/mealreminders/${id}/toggle`);
      fetchMealReminders();
    } catch (error) {
      console.error('Error toggling meal reminder:', error);
    }
  };

  const addMealReminder = async () => {
    try {
      await axios.post('/api/mealreminders', newMeal);
      setModalVisible(false);
      setNewMeal({ name: '', time: new Date() });
      fetchMealReminders();
    } catch (error) {
      console.error('Error adding meal reminder:', error);
    }
  };

  const renderMealReminderItem = ({ item }) => (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4 flex-row justify-between items-center">
      <View>
        <Text className="text-lg font-semibold">{item.name}</Text>
        <Text>Time: {new Date(item.time).toLocaleTimeString()}</Text>
      </View>
      <TouchableOpacity 
        className={`py-2 px-4 rounded-lg ${item.active ? 'bg-green-500' : 'bg-red-500'}`}
        onPress={() => toggleMealReminder(item.id)}
      >
        <Text className="text-white">{item.active ? 'Active' : 'Inactive'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Meal Reminders</Text>
      <TouchableOpacity 
        className="bg-blue-500 py-2 px-4 rounded-lg mb-4"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-center">Add New Meal Reminder</Text>
      </TouchableOpacity>
      <FlatList
        data={mealReminders}
        renderItem={renderMealReminderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded-lg w-4/5">
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-2"
              placeholder="Meal Name"
              value={newMeal.name}
              onChangeText={(text) => setNewMeal({...newMeal, name: text})}
              />
            <DateTimePicker
              value={newMeal.time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event, selectedTime) => setNewMeal({...newMeal, time: selectedTime || newMeal.time})}
            />
            <TouchableOpacity 
              className="bg-blue-500 py-2 px-4 rounded-lg mt-2"
              onPress={addMealReminder}
            >
              <Text className="text-white text-center">Add Meal Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MealsScreen;