import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { getApiUrl } from '../config/api';
import useOrientation from '../hooks/useOrientation';

export default function StaffDetailScreen({ route, navigation }) { // add nav prop
  const [staffMember, setStaffMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get staffId passed from StaffList screen
  const { staffId, refresh } = route.params;
  const orientation = useOrientation();

  console.log('staffId received:', staffId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateStaff', {
            staffMember,
            staffId
          })}
        >
          <Text style={{
            color: '#ffffff', 
            fontSize: 16, 
            fontFamily: 'Trebuchet MS', 
            padding: 10
           }}>Update details</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, staffMember]);

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
        <Text style={styles.errorText}>Could not load staff details</Text>
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
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{staffMember.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{staffMember.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Department</Text>
              <Text style={styles.value}>{staffMember.departmentName}</Text>
            </View>
          </View>
      </View>

      {/* Address Section */}
      <View style={[
          styles.section,
          orientation === 'LANDSCAPE' && styles.sectionLandscape
        ]}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Street</Text>
              <Text style={styles.value}>{staffMember.address.street}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>City</Text>
              <Text style={styles.value}>{staffMember.address.city}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>State</Text>
              <Text style={styles.value}>{staffMember.address.state}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Postcode</Text>
              <Text style={styles.value}>{staffMember.address.postcode}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Country</Text>
              <Text style={styles.value}>{staffMember.address.country}</Text>
            </View>
          </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#941a1d',
    marginBottom: 16,
    fontFamily: 'Trebuchet MS',
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
  label: {
    flex: 1,
    fontSize: 14,
    color: '#262626',
    fontFamily: 'Trebuchet MS',
  },
  value: {
    flex: 2,
    fontSize: 14,
    color: '#595959',
    fontFamily: 'Trebuchet MS',
  },
  errorText: {
    color: '#941a1d',
    fontSize: 16,
    fontFamily: 'Trebuchet MS',
  },
  headerButton: {
    color: '#ffffff', 
    fontSize: 16, 
    fontFamily: 'Trebuchet MS', 
    padding: 10
  },
});