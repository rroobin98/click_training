import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ScoreScreen from "./screens/ScoreScreen";
import LeaderboardScreen from './screens/LeaderboardScreen';




const Stack = createNativeStackNavigator();





export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Fast Shoot' }} />
      <Stack.Screen name="ScoreScreen" component={ScoreScreen} options={{ title: 'Fast Shoot' }} />
      <Stack.Screen name="LeaderboardScreen" component={LeaderboardScreen} options={{ title: 'Fast Shoot' }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}


