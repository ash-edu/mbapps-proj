import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import FontSizeControls from './components/FontSizeControls';
import { FontSizeProvider, useFontSize } from './context/FontSizeContext';

import StaffListScreen from './screens/StaffListScreen';
import StaffDetailScreen from './screens/StaffDetailScreen';
import AddStaffScreen from './screens/AddStaffScreen';
import UpdateStaffScreen from './screens/UpdateStaffScreen';

const Stack = createNativeStackNavigator();

const LogoTitle = () => {
  const { fontSizeMultiplier } = useFontSize();
  
  const dynamicStyles = {
    headerText: {
      color: '#ffffff',
      fontSize: 20 * fontSizeMultiplier,
      fontFamily: 'Trebuchet MS',
      marginLeft: -12,
    },
    addButtonText: {
      color: '#ffffff', 
      fontSize: 16 * fontSizeMultiplier, 
      fontFamily: 'Trebuchet MS'
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.logo}
        source={require('./assets/logo.png')}
        resizeMode="contain"
      />
      <Text style={dynamicStyles.headerText}>
        Staff Directory
      </Text>
    </View>
  );
};

export default function App() {
  return (
    <FontSizeProvider>
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
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontSizeControls />
            </View>
            ),
          animation: 'slide_from_right',
          orientation: 'default',
        }}>        
        <Stack.Screen 
          name="StaffList" 
          component={StaffListScreen}
          options={({ navigation }) => ({
            title: 'Staff Directory',
            headerRight: () => (
              <View style={{ marginRight: -12 }}>
                <FontSizeControls />
               </View>
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
    </FontSizeProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
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
