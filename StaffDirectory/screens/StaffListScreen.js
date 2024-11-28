// useState - managing state, useEffect - side effects eg data fetching
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

export default function StaffListScreen({navigation}) {
  // State setup
  const [staffList, setStaffList] = useState([]);     // stores staff data array
  const [isLoading, setIsLoading] = useState(true);   // tracks loading state as bool

  // 1. Effect Hook Setup
  useEffect(() => {       
    fetchStaffData();     // makes API call to backend
  }, []); // Dependency array "only run once when component mounts"

  // 2. Fetch func
  const fetchStaffData = async () => {
    try {
      // 3. API call
      const response = await fetch('http://localhost:3000/api/staff');

      // 4. Parse response
      const data = await response.json(); // extracts JSON data from the response, convers to JS object
      setStaffList(data); // updates component's state, triggers a re-render with new data
    } catch (error) {
      console.error('Error fetching staff data:', error);
    } finally { // runs whether fetch succeeds or fails 
      setIsLoading(false);
    }
  };

// Renders each staff member
  const renderStaffItem = ({ item }) => (
  <TouchableOpacity // makes whole item tappable
    style={styles.staffItem}
    onPress={() => navigation.navigate('StaffDetail', { // Navigate to StaffDetail screen with staff ID and name when tapped
      staffId: item.id,
      name: item.name
    })}
  >
  <View>
  <Text style={styles.staffName}>{item.name}</Text>
  <Text style={styles.staffDepartment}>{item.departmentName}</Text>
  <Text style={styles.staffPhone}>{item.phone}</Text>
  </View>
</TouchableOpacity>
);

  if (isLoading) { // Shows loading spinner while data is being fetched 
    return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#941a1d"/>
    </View>
  );
}
/*
FlatList component takes:
data:  staffList array
renderItem: renderStaffItem function
keyExtractor: generates unique key for each item
ItemSeparatorComponent: renders line between items
*/
return (
  <View style={styles.container}>
    <FlatList
    data={staffList}
    renderItem={renderStaffItem}
    keyExtractor={item => item.id.toString()}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  staffItem: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  staffName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#941a1d', // ROI Red
    marginBottom: 4,
    fontFamily: 'Trebuchet MS',
  },
  staffDepartment: {
    fontSize: 14,
    color: '#262626', // ROI Charcoal
    marginBottom: 2,
    fontFamily: 'Trebuchet MS',
  },
  staffPhone: {
    fontSize: 14,
    color: '#595959', // ROI Grey
    fontFamily: 'Trebuchet MS',
  },
  separator: {
    height: 1,
    backgroundColor: '#D9D9D9', // ROI Light Grey
  }
});