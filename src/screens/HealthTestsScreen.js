import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from '../api/axiosConfig';

const HealthTestsScreen = () => {
  const [healthTests, setHealthTests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTest, setNewTest] = useState({ name: '', date: new Date(), result: '', type: 'physical' });

  useEffect(() => {
    fetchHealthTests();
  }, []);

  const fetchHealthTests = async () => {
    try {
      const response = await axios.get('/api/healthtests');
      setHealthTests(response.data);
    } catch (error) {
      console.error('Error fetching health tests:', error);
    }
  };

  const addHealthTest = async () => {
    try {
      await axios.post('/api/healthtests', newTest);
      setModalVisible(false);
      setNewTest({ name: '', date: new Date(), result: '', type: 'physical' });
      fetchHealthTests();
    } catch (error) {
      console.error('Error adding health test:', error);
    }
  };

  const renderHealthTestItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-md p-4 mb-4"
      onPress={() => {/* Navigate to test details */}}
    >
      <Text className="text-lg font-semibold">{item.name}</Text>
      <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Text>Result: {item.result}</Text>
      <Text>Type: {item.type}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Health Tests</Text>
      <TouchableOpacity 
        className="bg-blue-500 py-2 px-4 rounded-lg mb-4"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-center">Add New Health Test</Text>
      </TouchableOpacity>
      <FlatList
        data={healthTests}
        renderItem={renderHealthTestItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView className="flex-1 bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded-lg m-4">
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-2"
              placeholder="Test Name"
              value={newTest.name}
              onChangeText={(text) => setNewTest({...newTest, name: text})}
            />
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-2"
              placeholder="Result"
              value={newTest.result}
              onChangeText={(text) => setNewTest({...newTest, result: text})}
            />
            <Picker
              selectedValue={newTest.type}
              onValueChange={(itemValue) => setNewTest({...newTest, type: itemValue})}
            >
              <Picker.Item label="Physical" value="physical" />
              <Picker.Item label="Mental" value="mental" />
            </Picker>
            <TouchableOpacity 
              className="bg-blue-500 py-2 px-4 rounded-lg mt-2"
              onPress={addHealthTest}
            >
              <Text className="text-white text-center">Add Health Test</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default HealthTestsScreen;