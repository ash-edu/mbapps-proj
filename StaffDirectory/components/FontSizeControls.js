import React from 'react';
import { View,TouchableOpacity,Text,StyleSheet } from 'react-native';
import {useFontSize} from '../context/FontSizeContext';

export default function FontSizeControls() {
    const {increaseFontSize, decreaseFontSize } = useFontSize();
    return (
        <View style={styles.containter}>
            <TouchableOpacity onPress={decreaseFontSize} styles={styles.button}>
                <Text style={styles.button}>A-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={increaseFontSize} styles={styles.button}>
                <Text style={styles.button}>A+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    button: {
        padding: 4,
        marginHorizontal: 2,
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Trebuchet MS',
      },    
});