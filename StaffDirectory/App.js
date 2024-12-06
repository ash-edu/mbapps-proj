import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

//  screens
import StaffListScreen from './screens/StaffListScreen';
import StaffDetailScreen from './screens/StaffDetailScreen';
import AddStaffScreen from './screens/AddStaffScreen';
import UpdateStaffScreen from './screens/UpdateStaffScreen';

const Stack = createNativeStackNavigator();

const LogoTitle = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.logo}
        source={require('./assets/logo.png')}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>
        Staff Directory
      </Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#a30414', 
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontFamily: 'Trebuchet MS',
          },
          headerTitle: (props) => <LogoTitle {...props} />,
          headerLeftContainerStyle: {
            paddingLeft: 8
          },
          headerTitleContainerStyle: {
            paddingLeft: 0,
            marginLeft: -16  // pull content left
          },
          animation: 'slide_from_right',
          orientation: 'default',
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
        <Stack.Screen
          name="UpdateStaff" 
          component={UpdateStaffScreen}
          options={{
            title: 'Update Staff Member'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    marginLeft: -10, // reduce left padding
  },
  logo: {
    width: 120,
    height: 36,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Trebuchet MS',
    marginLeft: -12, // space between logo and text
  }
});
