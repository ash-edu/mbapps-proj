import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    Alert,
    Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDepartments } from '../config/api';
import { staffStorage } from '../services/staffStorage';


export default function UpdateStaffScreen({ route, navigation }) {
  const { staffMember, staffId } = route.params;
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: staffMember.name,
    phone: staffMember.phone,
    department: staffMember.department.toString(),
    address: {
      street: staffMember.address.street,
      city: staffMember.address.city,
      state: staffMember.address.state,
      postcode: staffMember.address.postcode,
      country: staffMember.address.country
    }
  });

  const updateFormData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const deptData = await getDepartments();
        setDepartments(deptData);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async () => {
    try {
      const updatedStaff = await staffStorage.updateStaffMember(staffId, {
        ...formData,
        department: parseInt(formData.department)
      });
  
      // If we get here, the update was successful (otherwise it would have thrown an error)
      if (Platform.OS === 'web') {
        window.alert('Staff member updated successfully');
      } else {
        Alert.alert(
          'Success',
          'Staff member updated successfully',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset navigation stack
                navigation.reset({
                  index: 1,
                  routes: [
                    { name: 'StaffList' },
                    { 
                      name: 'StaffDetail',
                      params: {
                        staffId,
                        name: formData.name,
                        refresh: true
                      }
                    }
                  ],
                });
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error updating staff:', error);
      const errorMessage = error.message || 'Failed to update staff member';
      if (Platform.OS === 'web') {
        window.alert(`Error: ${errorMessage}`);
      } else {
        Alert.alert('Error', errorMessage);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(value) => updateFormData('name', value)}
            placeholder="Enter name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(value) => updateFormData('phone', value)}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Department</Text>
          <View style={styles.pickerContainer}>
            <Picker
            selectedValue={formData.department}
            onValueChange={(value) => updateFormData('department', parseInt(value))}
            style={styles.picker}
            >
              {departments.map((dept) => (
                <Picker.Item 
                key={dept.id} 
                label={dept.name} 
                value={dept.id}
                />
                ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Street</Text>
          <TextInput
            style={styles.input}
            value={formData.address.street}
            onChangeText={(value) => updateFormData('address.street', value)}
            placeholder="Enter street address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={formData.address.city}
            onChangeText={(value) => updateFormData('address.city', value)}
            placeholder="Enter city"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            value={formData.address.state}
            onChangeText={(value) => updateFormData('address.state', value)}
            placeholder="Enter state"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Postcode</Text>
          <TextInput
            style={styles.input}
            value={formData.address.postcode}
            onChangeText={(value) => updateFormData('address.postcode', value)}
            placeholder="Enter postcode"
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Update Staff Member</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    section: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#D9D9D9',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#941a1d',
      marginBottom: 16,
      fontFamily: 'Trebuchet MS',
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: '#262626',
      marginBottom: 8,
      fontFamily: 'Trebuchet MS',
    },
    input: {
      borderWidth: 1,
      borderColor: '#D9D9D9',
      borderRadius: 4,
      padding: 8,
      fontSize: 14,
      color: '#595959',
      fontFamily: 'Trebuchet MS',
    },
    submitButton: {
      backgroundColor: '#941a1d',
      padding: 16,
      margin: 16,
      borderRadius: 4,
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Trebuchet MS',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#D9D9D9',
      borderRadius: 4,
      backgroundColor: '#ffffff',
    },
    picker: {
      height: 50,
      width: '100%',
      color: '#595959',
      fontFamily: 'Trebuchet MS',
    },
});