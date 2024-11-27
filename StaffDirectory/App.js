import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

//  screens
import StaffListScreen from './screens/StaffListScreen';
import StaffDetailScreen from './screens/StaffDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#941a1d', 
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'Trebuchet MS',
          },
        }}>
        <Stack.Screen 
          name="StaffList" 
          component={StaffListScreen}
          options={{
            title: 'Staff Directory',
          }}
        />
        <Stack.Screen 
          name="StaffDetail" 
          component={StaffDetailScreen}
          options={({ route }) => ({ 
            title: route.params?.name || 'Staff Details' 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});