import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { getApiUrl } from '../config/api';
import { useFontSize } from '../context/FontSizeContext';
import useOrientation from '../hooks/useOrientation';

export default function StaffDetailScreen({ route, navigation }) { // add nav prop
  // hooks
  const [staffMember, setStaffMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { staffId, refresh } = route.params;  // get staffId passed from StaffList screen
  const orientation = useOrientation();
  const { fontSizeMultiplier } = useFontSize();

  // dynamic styles for font
  const dynamicStyles = {
    sectionTitle: {
      fontSize: 18* fontSizeMultiplier,
      fontWeight: 'bold',
      color: '#941a1d',
      marginBottom: 16,
      fontFamily: 'Trebuchet MS',
    },
    label: {
      flex: 1,
      fontSize: 14 * fontSizeMultiplier,
      color: '#262626',
      fontFamily: 'Trebuchet MS',
    },
    value: {
      flex: 2,
      fontSize: 14 * fontSizeMultiplier,
      color: '#595959',
      fontFamily: 'Trebuchet MS',
    },
    errorText: {
      color: '#941a1d',
      fontSize: 16 * fontSizeMultiplier,
      fontFamily: 'Trebuchet MS',
    },
    // headerButton: {   clean up
    //   color: '#ffffff', 
    //   fontSize: 16 * fontSizeMultiplier, 
    //   fontFamily: 'Trebuchet MS', 
    //   padding: 10
    // },
    updateButtonText: {
      color: '#ffffff',
      fontSize: 16 * fontSizeMultiplier,
      fontFamily: 'Trebuchet MS',
      fontWeight: 'bold',
    }
  };

  //console.log('staffId received:', staffId);

  useEffect(() => {
    fetchStaffDetails();
  },[staffId, refresh]);

  const fetchStaffDetails = async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/staff/${staffId}`); // change path 
      const data = await response.json();
      setStaffMember(data);
    } catch (error) {
      console.error('Error fetching staff details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#941a1d" />
      </View>
    );
  }

  if (!staffMember) {
    return (
      <View style={styles.centered}>
        <Text style={dynamicStyles.errorText}>Could not load staff details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Personal Information Section */}
      <View style={[
          styles.section,
          orientation === 'LANDSCAPE' && styles.sectionLandscape
        ]}>
          <Text style={dynamicStyles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={dynamicStyles.label}>Name</Text>
              <Text style={dynamicStyles.value}>{staffMember.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={dynamicStyles.label}>Phone</Text>
              <Text style={dynamicStyles.value}>{staffMember.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={dynamicStyles.label}>Department</Text>
              <Text style={dynamicStyles.value}>{staffMember.departmentName}</Text>
            </View>
          </View>
      </View>

      {/* Address Section */}
      <View style={[
          styles.section,
          orientation === 'LANDSCAPE' && styles.sectionLandscape
        ]}>
          <Text style={dynamicStyles.sectionTitle}>Address</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={dynamicStyles.label}>Street</Text>
              <Text style={dynamicStyles.value}>{staffMember.address.street}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={dynamicStyles.label}>City</Text>
              <Text style={dynamicStyles.value}>{staffMember.address.city}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={dynamicStyles.label}>State</Text>
              <Text style={dynamicStyles.value}>{staffMember.address.state}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={dynamicStyles.label}>Postcode</Text>
              <Text style={dynamicStyles.value}>{staffMember.address.postcode}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={dynamicStyles.label}>Country</Text>
              <Text style={dynamicStyles.value}>{staffMember.address.country}</Text>
            </View>
          </View>
      </View>
      <View style={[
        styles.section,
        orientation === 'LANDSCAPE' && styles.sectionLandscape
        ]}>
          <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate('UpdateStaff', {
            staffMember,
            staffId
          })}
          >
            <Text style={dynamicStyles.updateButtonText}>Update Details</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  contentLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionLandscape: {
    flex: 1,
    marginHorizontal: 8,
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  infoRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  updateButton: {
    backgroundColor: '#941a1d',
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
    marginHorizontal: 16,
  },
});