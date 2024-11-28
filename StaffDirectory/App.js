import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Touchable, TouchableOpacity } from 'react-native';

//  screens
import StaffListScreen from './screens/StaffListScreen';
import StaffDetailScreen from './screens/StaffDetailScreen';
import AddStaffScreen from './screens/AddStaffScreen';

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
          options={({ navigation }) => ({
            title: 'Staff Directory',
            headerRight: () => (
              <TouchableOpacity
              onPress={() => navigation.navigate('AddStaff')}
              style={{ marginRight: 10 }}
              >
                <Text style={{ color: '#ffffff', fontSize: 16, fontFamily: 'Trebuchet MS' }}>Add</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen 
          name="StaffDetail" 
          component={StaffDetailScreen}
          options={({ route }) => ({ 
            title: route.params?.name || 'Staff Details' 
          })}
        />
        <Stack.Screen
          name="AddStaff" 
          component={AddStaffScreen}
          options={{
            title: 'Add Staff Member'
          }}
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