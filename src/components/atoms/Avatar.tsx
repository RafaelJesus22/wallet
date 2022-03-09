import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export const UserAvatar: React.FC = () => (
  <View>
    <Image
      source={{uri: 'https://github.com/RafaelJesus22.png'}}
      style={styles.image}
    />
  </View>
);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 12,
  },
});
