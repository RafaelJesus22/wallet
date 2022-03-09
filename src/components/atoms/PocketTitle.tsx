import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import { Colors, fontFamily } from '../../config/styles';
import { Entypo } from '@expo/vector-icons'; 

export const PocketTitle: React.FC = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {children}
      </Text>
      <Entypo name="chevron-right" size={24} color={Colors.secondatyText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fontFamily.primary,
    fontSize: 18,
    color: Colors.text
  },
});