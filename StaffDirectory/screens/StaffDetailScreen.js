// useState - managing state, useEffect - side effects eg data fetching
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

export default function StaffDetailScreen( {route} ) {
  // State setup
  const [staffMember, setStaffMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get staffId passed from StaffList screen
  const { staffId } = route.params;

  // 1. Effect Hook Setup
  useEffect(() => {
    fetchStaffDetails();
  },[staffId]);

  // 2. Fetch func
  const fetchStaffDetails = async () => {
    try {
      // 3. API call
      const response = await fetch(`http://localhost:3000/api/staff/${staffId}`);

      // 4. Parse resp
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
      <View style={styles.section}>
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
      <View style={styles.section}>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  infoContainer: {
    backgroundColor: '#ffffff',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 8,
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
});