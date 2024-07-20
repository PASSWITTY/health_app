import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import axios from '../api/axiosConfig';

const EmergencyScreen = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phoneNumber: '', relationship: '' });

  useEffect(() => {
    fetchEmergencyContacts();
  }, []);

  const fetchEmergencyContacts = async () => {
    try {
      const response = await axios.get('/api/emergencycontacts');
      setEmergencyContacts(response.data);
    } catch (error) {
      console.error('Error fetching emergency contacts:', error);
    }
  };

  const addEmergencyContact = async () => {
    try {
      await axios.post('/api/emergencycontacts', newContact);
      setModalVisible(false);
      setNewContact({ name: '', phoneNumber: '', relationship: '' });
      fetchEmergencyContacts();
    } catch (error) {
      console.error('Error adding emergency contact:', error);
    }
  };

  const callEmergencyContact = (contact) => {
    Alert.alert(
      'Emergency Call',
      `Are you sure you want to call ${contact.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { 
          text: 'Call', 
          onPress: () => {
            // Implement actual call functionality here
            console.log(`Calling ${contact.name} at ${contact.phoneNumber}`);
          }
        }
      ]
    );
  };

  const renderEmergencyContactItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-md p-4 mb-4"
      onPress={() => callEmergencyContact(item)}
    >
      <Text className="text-lg font-semibold">{item.name}</Text>
      <Text>{item.phoneNumber}</Text>
      <Text>{item.relationship}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Emergency Contacts</Text>
      <TouchableOpacity 
        className="bg-red-500 py-4 px-4 rounded-lg mb-4"
        onPress={() => Alert.alert('Emergency', 'Calling emergency services...')}
      >
        <Text className="text-white text-center text-lg font-bold">Call Emergency Services</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className="bg-blue-500 py-2 px-4 rounded-lg mb-4"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-center">Add New Emergency Contact</Text>
      </TouchableOpacity>
      <FlatList
        data={emergencyContacts}
        renderItem={renderEmergencyContactItem}
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
              placeholder="Contact Name"
              value={newContact.name}
              onChangeText={(text) => setNewContact({...newContact, name: text})}
            />
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-2"
              placeholder="Phone Number"
              value={newContact.phoneNumber}
              onChangeText={(text) => setNewContact({...newContact, phoneNumber: text})}
              keyboardType="phone-pad"
            />
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-2"
              placeholder="Relationship"
              value={newContact.relationship}
              onChangeText={(text) => setNewContact({...newContact, relationship: text})}
            />
            <TouchableOpacity 
              className="bg-blue-500 py-2 px-4 rounded-lg mt-2"
              onPress={addEmergencyContact}
            >
              <Text className="text-white text-center">Add Emergency Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EmergencyScreen;