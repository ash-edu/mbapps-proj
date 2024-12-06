import React from 'react';
import { View,TouchableOpacity,Text,StyleSheet } from 'react-native';
import {useFontSize} from '../context/FontSizeContext';

export default function FontSizeControls() {
    const {increaseFontSize, decreaseFontSize } = useFontSize();
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={decreaseFontSize}>
            <Text style={styles.buttonText}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={increaseFontSize}>
            <Text style={styles.buttonText}>A+</Text>
          </TouchableOpacity>
        </View>
    );     
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,  // space btn A- and A+
    },
    button: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    buttonText: {
      color: '#ffff',
      fontFamily: 'Trebuchet MS',
      fontSize: 14,
    }
  });  