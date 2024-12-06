import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  FlatList, 
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useFontSize } from '../context/FontSizeContext';
import { staffStorage } from '../services/staffStorage';
import useOrientation from '../hooks/useOrientation';

export default function StaffListScreen({navigation}) {
  // hooks
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const orientation = useOrientation();
  const { fontSizeMultiplier } = useFontSize();

  // dynamic styles for font
  const dynamicStyles = {
    searchInput: {
      fontSize: 14 * fontSizeMultiplier,
      height: 40,
      borderWidth: 1,
      borderColor: '#D9D9D9',
      borderRadius: 8,
      paddingHorizontal: 16,
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: '#ffffff',
      color: '#262626',
      fontFamily: 'Trebuchet MS',
    },
    staffName: {
      fontSize: 16 * fontSizeMultiplier,
      fontWeight: 'bold',
      color: '#941a1d',
      marginBottom: 4,
      fontFamily: 'Trebuchet MS',
    },
    staffDepartment: {
      fontSize: 14 * fontSizeMultiplier,
      color: '#262626',
      marginBottom: 2,
      fontFamily: 'Trebuchet MS',
    },
    staffPhone: {
      fontSize: 14 * fontSizeMultiplier,
      color: '#595959',
      fontFamily: 'Trebuchet MS',
    },
    addressText: {
      fontSize: 14 * fontSizeMultiplier,
      color: '#595959',
      fontFamily: 'Trebuchet MS',
    }
  };

  // comp logic
  useFocusEffect(
    React.useCallback(() => {
      fetchStaffData();
    }, [])
  );

  const fetchStaffData = async () => {
    try {
      const data = await staffStorage.getStaffList(); // updated to use staff storage service
      setStaffList(data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredStaff = staffList.filter(staff => {
    const searchLower = searchQuery.toLowerCase();
    return (
      staff.name.toLowerCase().includes(searchLower) ||
      staff.departmentName.toLowerCase().includes(searchLower)
    );
  });

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
        <Text style={dynamicStyles.staffName}>{item.name}</Text>
        <Text style={dynamicStyles.staffDepartment}>{item.departmentName}</Text>
        <Text style={dynamicStyles.staffPhone}>{item.phone}</Text>
      </View>
      {orientation === 'LANDSCAPE' && (
        <View style={styles.staffAddressLandscape}>
          <Text style={dynamicStyles.addressText}>{item.address.city}, {item.address.state}</Text>
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

  return (
    <View style={styles.container}>
      <View style={dynamicStyles.searchContainer}>
        <TextInput
          style={dynamicStyles.searchInput}
          placeholder="Search by name or department..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#595959"
        />
      </View>
      <FlatList
        data={filteredStaff}
        renderItem={renderStaffItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        key={orientation}
        numColumns={orientation === 'LANDSCAPE' ? 2 : 1}
      />
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddStaff')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

// static styles -- outside component
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
  searchContainer: {
    padding: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
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
  separator: {
    height: 1,
    backgroundColor: '#D9D9D9',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#941a1d',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6, // shadow
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
  }
});