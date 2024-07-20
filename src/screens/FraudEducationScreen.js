import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import axios from '../api/axiosConfig';

const FraudEducationScreen = () => {
  const [fraudContent, setFraudContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchFraudContent();
  }, []);

  const fetchFraudContent = async () => {
    try {
      const response = await axios.get('/api/fraud-education');
      setFraudContent(response.data);
    } catch (error) {
      console.error('Error fetching fraud education content:', error);
    }
  };

  const renderFraudContentItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-md p-4 mb-4"
      onPress={() => {
        setSelectedContent(item);
        setModalVisible(true);
      }}
    >
      <Text className="text-lg font-semibold">{item.title}</Text>
      <Text numberOfLines={2}>{item.summary}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Fraud Prevention Education</Text>
      <FlatList
        data={fraudContent}
        renderItem={renderFraudContentItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-white">
          <ScrollView className="p-4">
            <Text className="text-2xl font-bold mb-4">{selectedContent?.title}</Text>
            <Text className="mb-4">{selectedContent?.content}</Text>
            {selectedContent?.quiz && (
              <View>
                <Text className="text-xl font-bold mb-2">Quiz</Text>
                {selectedContent.quiz.map((question, index) => (
                  <View key={index} className="mb-4">
                    <Text className="font-semibold">{question.question}</Text>
                    {question.options.map((option, optionIndex) => (
                      <TouchableOpacity 
                        key={optionIndex}
                        className="bg-gray-200 p-2 rounded-lg mt-2"
                        onPress={() => {
                          // Handle quiz answer
                        }}
                      >
                        <Text>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
          <TouchableOpacity 
            className="bg-blue-500 py-2 px-4 m-4 rounded-lg"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-white text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default FraudEducationScreen;