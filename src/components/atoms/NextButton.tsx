import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../config/styles';

export const NextButton: React.FC<TouchableOpacityProps> = ({
  ...props
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      {...props}
      activeOpacity={0.8}
    >
      <AntDesign name="arrowright" size={24} color={Colors.backGround} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    borderRadius: 30,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    elevation: 1,
  },
});