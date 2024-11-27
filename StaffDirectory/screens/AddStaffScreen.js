import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddStaffScreen() {
  return (
    <View style={styles.container}>
      <Text>Add/Edit Staff Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

