import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import { Colors, fontFamily } from '../../config/styles';
import { useAppContext } from '../../Contexts/AppContext';

export const PocketAmount: React.FC = ({ children }) => {
  const { isShowingUserInfo } = useAppContext();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isShowingUserInfo ? children : 'R$ ******'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    justifyContent: 'flex-end',
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: 22,
    color: Colors.text,
  },
});