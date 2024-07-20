import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from '../api/axiosConfig';

const MedicationsScreen = () => {
  const [medications, setMedications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', time: '' });

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await axios.get('/api/medications');
      setMedications(response.data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  const renderMedicationItem = ({ item }) => (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4">
      <Text className="text-lg font-semibold">{item.name}</Text>
      <Text>Dosage: {item.dosage}</Text>
      <Text>Frequency: {item.frequency}</Text>
      <Text>Time: {item.time}</Text>
      <TouchableOpacity 
        className="bg-blue-500 py-2 px-4 rounded-lg mt-2"
        onPress={() => logMedicationIntake(item.id)}
      >
        <Text className="text-white text-center">Log Intake</Text>
      </TouchableOpacity>
    </View>
  );

  const logMedicationIntake = async (medicationId) => {
    try {
      await axios.post(`/api/medications/${medicationId}/log`);
      fetchMedications(); // Refresh the list
    } catch (error) {
      console.error('Error logging medication intake:', error);
    }
  };

  const addMedication = async () => {
    try {
      await axios.post('/api/medications', newMedication);
      setModalVisible(false);
      setNewMedication({ name: '', dosage: '', frequency: '', time: '' });
      fetchMedications(); // Refresh the list
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Medications</Text>
      <TouchableOpacity 
        className="bg-green-500 py-2 px-4 rounded-lg mb-4"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-center">Add New Medication</Text>
      </TouchableOpacity>
      <FlatList
        data={medications}
        renderItem={renderMedicationItem}
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
              placeholder="Medication Name"
              value={newMedication.name}
              onChangeText={(text) => setNewMedication({...newMedication, name: text})}
            />
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-2"
              placeholder="Dosage"
              value={newMedication.dosage}
              onChangeText={(text) => setNewMedication({...newMedication, dosage: text})}
            />
            <Picker
              selectedValue={newMedication.frequency}
              onValueChange={(itemValue) => setNewMedication({...newMedication, frequency: itemValue})}
            >
              <Picker.Item label="Daily" value="daily" />
              <Picker.Item label="Weekly" value="weekly" />
              <Picker.Item label="Monthly" value="monthly" />
            </Picker>
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-2"
              placeholder="Time (e.g., 08:00)"
              value={newMedication.time}
              onChangeText={(text) => setNewMedication({...newMedication, time: text})}
            />
            <TouchableOpacity 
              className="bg-blue-500 py-2 px-4 rounded-lg mt-2"
              onPress={addMedication}
            >
              <Text className="text-white text-center">Add Medication</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MedicationsScreen;