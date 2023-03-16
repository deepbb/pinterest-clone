import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen"
import Profile from "../screens/Profile"
import PinScreen from '../screens/PinScreen';
import CreatePin from '../screens/CreatePin';
import { NhostClient,NhostProvider, useAuthenticationStatus } from '@nhost/react';
import * as SecureStore from "expo-secure-store"
import AuthStackNavigator from "./AuthStackNavigator";
import { Entypo } from '@expo/vector-icons';



const Tab = createBottomTabNavigator()

export default function Navigation() {

  const {isLoading,isAuthenticated} = useAuthenticationStatus()

  if(isLoading) {
    return <ActivityIndicator />
  }



  return (
   <NavigationContainer style={styles.container}>
   
     <Tab.Navigator 
        screenOptions={{
          tabBarLabelPosition:true,
          tabBarActiveTintColor:"#02c3d9",
          tabBarShowLabel:false,
        }}
        >
  {!isAuthenticated ? (
    <Tab.Screen 
            name='Auth'
            component={AuthStackNavigator}
            options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-sharp" size={24} />
            )
          }}
             />
  ) : (
    <>
    <Tab.Screen 
            name='Feeds'
            component={HomeScreen}
            options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            )
          }}
             />
               <Tab.Screen
            name='Create Pin'
            component={CreatePin}
            options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-outline" size={26} color={color} />
            )
          }}
             />
                 <Tab.Screen
            name='profile'
            component={Profile}
            options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-person-circle" size={24} color={color} />
            )
          }}
             />
          
             <Tab.Screen name="pinscreen" component={PinScreen} options={{
              tabBarButton: () => null,
              tabBarVisible: false,
              headerShown:false,
              headerTitle:false
            }} />
    </>

  )}
          
        
       
          </Tab.Navigator>
        
  </NavigationContainer>
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
