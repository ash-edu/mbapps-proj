import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDepartments } from '../config/api';
import { useFontSize } from '../context/FontSizeContext';
import { staffStorage } from '../services/staffStorage';

export default function AddStaffScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: '',
    address: {
      street: '',
      city: '',
      state: '',
      postcode: '',
      country: 'Australia'
    }
  });
  const [departments, setDepartments] = useState([]);
  const { fontSizeMultiplier } = useFontSize();

  // dynamic styles for font
  const dynamicStyles = {
    sectionTitle: {
      fontSize: 18 * fontSizeMultiplier,
      fontWeight: 'bold',
      color: '#941a1d',
      marginBottom: 16,
      fontFamily: 'Trebuchet MS',
    },
    input: {
      borderWidth: 1,
      borderColor: '#D9D9D9',
      borderRadius: 4,
      padding: 8,
      fontSize: 14 * fontSizeMultiplier,
      color: '#595959',
      fontFamily: 'Trebuchet MS',
    },
    label: {
      fontSize: 14 * fontSizeMultiplier,
      color: '#262626',
      marginBottom: 8,
      fontFamily: 'Trebuchet MS',
    },
    submitButtonText: {
      color: '#ffffff',
      fontSize: 16 * fontSizeMultiplier,
      fontWeight: 'bold',
      fontFamily: 'Trebuchet MS',
    }
  }

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
      await staffStorage.addStaffMember(formData);
      Alert.alert(
        'Success',
        'Staff member added successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('StaffList')
          }
        ]
      );
    } catch (error) {
      console.error('Error adding staff:', error);
      Alert.alert('Error', 'Failed to add staff member');
    }
  };

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={dynamicStyles.sectionTitle}>Personal Information</Text>
        <View style={styles.inputGroup}>
          <Text style={dynamicStyles.label}>Name</Text>
          <TextInput
            style={dynamicStyles.input}
            value={formData.name}
            onChangeText={(value) => updateFormData('name', value)}
            placeholder="Enter name"
          />
        </View>
      

        <View style={styles.inputGroup}>
          <Text style={dynamicStyles.label}>Phone</Text>
          <TextInput
            style={dynamicStyles.input}
            value={formData.phone}
            onChangeText={(value) => updateFormData('phone', value)}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={dynamicStyles.label}>Department</Text>
          <View style={styles.pickerContainer}>
            <Picker
            selectedValue={formData.department}
            onValueChange={(value) => updateFormData('department', parseInt(value))}
            style={styles.picker}
            >
              <Picker.Item label="Select Department" value="" />
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
        <Text style={dynamicStyles.sectionTitle}>Address</Text>
        <View style={styles.inputGroup}>
          <Text style={dynamicStyles.label}>Street</Text>
          <TextInput
            style={dynamicStyles.input}
            value={formData.address.street}
            onChangeText={(value) => updateFormData('address.street', value)}
            placeholder="Enter street address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={dynamicStyles.label}>City</Text>
          <TextInput
            style={dynamicStyles.input}
            value={formData.address.city}
            onChangeText={(value) => updateFormData('address.city', value)}
            placeholder="Enter city"
          />
        </View>

      <View style={styles.inputGroup}>
          <Text style={dynamicStyles.label}>State</Text>
          <TextInput
            style={dynamicStyles.input}
            value={formData.address.state}
            onChangeText={(value) => updateFormData('address.state', value)}
            placeholder="Enter state"
          />
      </View>

      <View style={styles.inputGroup}>
        <Text style={dynamicStyles.label}>Postcode</Text>
          <TextInput
            style={dynamicStyles.input}
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
        <Text style={dynamicStyles.submitButtonText}>Add Staff Member</Text>
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
  inputGroup: {
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#941a1d',
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: 'center',
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