import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { Colors, fontFamily } from '../../config/styles';

interface Props {
  name: string;
  img?: React.ReactNode;
  onPress: () => void;
}

export const ActionItem: React.FC<Props> = ({name, img, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {img}
      </View>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    padding: 12,
    marginBottom: 8,
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  text: {
    color: Colors.text,
    textAlign: 'center',
    fontFamily: fontFamily.medium
  },
});
