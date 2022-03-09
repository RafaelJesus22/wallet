import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { UserAvatar } from '../atoms/Avatar';
import { Colors, fontFamily } from '../../config/styles';
import { useAppContext } from '../../Contexts/AppContext';

export const Header = () => {
  const { isShowingUserInfo, updateIsShowingUserInfo  } = useAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.userPhoto}>
        <UserAvatar />
        <FontAwesome5
          name={isShowingUserInfo ? 'eye-slash' : 'eye'}
          onPress={updateIsShowingUserInfo}
          size={18}
          color={'#fff'}
        />
      </View>
      <View>
        <Text style={styles.greeting}>Olá, Rafa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  userPhoto: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 22,
    fontFamily: fontFamily.medium,
    color: '#fff',
  },
});