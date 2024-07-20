import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ onPress, title, style, textStyle }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      className={`bg-blue-500 py-2 px-4 rounded-lg ${style}`}
    >
      <Text className={`text-white text-center font-bold ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;