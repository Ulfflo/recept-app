import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderLeftButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity
      style={styles.headerButton}
      onPress={onPress}
    >
      <View style={styles.headerButtonContent}>
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color="#4CAF50" 
        />
        {text && <Text style={styles.headerButtonText}>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginLeft: 0,
  },
  headerButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonText: {
    marginLeft: 3,
    color: '#4CAF50',
    fontSize: 16,
  },
});

export default CustomHeaderLeftButton;
