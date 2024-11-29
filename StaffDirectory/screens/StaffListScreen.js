import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  FlatList, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { getApiUrl } from '../config/api';
import { useFocusEffect } from '@react-navigation/native';
import useOrientation from '../hooks/useOrientation';

export default function StaffListScreen({navigation}) {
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const orientation = useOrientation();

  useFocusEffect( // replaced 
    React.useCallback(() => {
      fetchStaffData();
    }, [])
  );

  const fetchStaffData = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/staff`);
      const data = await response.json(); // extracts JSON data from the response, convers to JS object
      setStaffList(data); // updates component's state, triggers a re-render with new data
    } catch (error) {
      console.error('Error fetching staff data:', error);
    } finally {
      setIsLoading(false);
    }
  };

// Renders each staff member
  const renderStaffItem = ({ item }) => (
    <TouchableOpacity
    style={[
      styles.staffItem,
      orientation === 'LANDSCAPE' && styles.staffItemLandscape
    ]}
    onPress={() => navigation.navigate('StaffDetail', {
      staffId: item.id,
      name: item.name
    })}
  >
    <View style={orientation === 'LANDSCAPE' ? styles.staffInfoLandscape : styles.staffInfo}>
      <Text style={styles.staffName}>{item.name}</Text>
      <Text style={styles.staffDepartment}>{item.departmentName}</Text>
      <Text style={styles.staffPhone}>{item.phone}</Text>
    </View>
    {orientation === 'LANDSCAPE' && (
      <View style={styles.staffAddressLandscape}>
        <Text style={styles.addressText}>{item.address.city}, {item.address.state}</Text>
      </View>
    )}
  </TouchableOpacity>
);

  if (isLoading) { 
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
      key={orientation} // Force re-render when orientation changes
      numColumns={orientation === 'LANDSCAPE' ? 2 : 1}
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
    flex: 1,
  },
  staffItemLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  staffInfo: {
    flex: 1,
  },
  staffInfoLandscape: {
    flex: 2,
  },
  staffAddressLandscape: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#D9D9D9',
    paddingLeft: 16,
  },
  staffName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#941a1d',
    marginBottom: 4,
    fontFamily: 'Trebuchet MS',
  },
  staffDepartment: {
    fontSize: 14,
    color: '#262626',
    marginBottom: 2,
    fontFamily: 'Trebuchet MS',
  },
  staffPhone: {
    fontSize: 14,
    color: '#595959',
    fontFamily: 'Trebuchet MS',
  },
  addressText: {
    fontSize: 14,
    color: '#595959',
    fontFamily: 'Trebuchet MS',
  },
  separator: {
    height: 1,
    backgroundColor: '#D9D9D9',
  }
});