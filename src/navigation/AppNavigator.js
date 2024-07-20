import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import MedicationsScreen from '../screens/MedicationsScreen';
import HydrationScreen from '../screens/HydrationScreen';
import MealsScreen from '../screens/MealsScreen';
import HealthTestsScreen from '../screens/HealthTestsScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import FraudEducationScreen from '../screens/FraudEducationScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Medications') {
          iconName = focused ? 'medical' : 'medical-outline';
        } else if (route.name === 'Hydration') {
          iconName = focused ? 'water' : 'water-outline';
        } else if (route.name === 'Meals') {
          iconName = focused ? 'restaurant' : 'restaurant-outline';
        } else if (route.name === 'Health Tests') {
          iconName = focused ? 'fitness' : 'fitness-outline';
        } else if (route.name === 'Emergency') {
          iconName = focused ? 'alert-circle' : 'alert-circle-outline';
        } else if (route.name === 'Fraud Education') {
          iconName = focused ? 'school' : 'school-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Medications" component={MedicationsScreen} />
    <Tab.Screen name="Hydration" component={HydrationScreen} />
    <Tab.Screen name="Meals" component={MealsScreen} />
    <Tab.Screen name="Health Tests" component={HealthTestsScreen} />
    <Tab.Screen name="Emergency" component={EmergencyScreen} />
    <Tab.Screen name="Fraud Education" component={FraudEducationScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AppNavigator;