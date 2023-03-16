import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/screens/HomeScreen"
import Profile from "./src/screens/Profile"
import PinScreen from './src/screens/PinScreen';
import CreatePin from './src/screens/CreatePin';
import { NhostClient,NhostProvider, useAuthenticationStatus } from '@nhost/react';
import * as SecureStore from "expo-secure-store"
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";
import { Entypo } from '@expo/vector-icons';
import Navigation from './src/navigation';



const Tab = createBottomTabNavigator()

const nhost = new NhostClient({
  backendUrl:"https://whqvcynnknldfcnkjeek.nhost.run",
  clientStorageType:"expo-secure-storage",
  clientStorage:SecureStore
}) 

export default function App() {



  return (
    <NhostProvider nhost={nhost}>
     <Navigation />
   </NhostProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
