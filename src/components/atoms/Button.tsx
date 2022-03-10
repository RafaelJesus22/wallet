import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps
} from 'react-native';
import { Colors, fontFamily } from '../../config/styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading,
  disabled,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator size={'small'} color={Colors.backGround} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 100,
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.backGround,
    fontFamily: fontFamily.primary,
    fontSize: 18,
  }
});

