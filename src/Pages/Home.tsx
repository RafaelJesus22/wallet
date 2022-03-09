/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Header } from '../components/molecules/Header';
import { MainPocket } from '../components/Organisms/MainPocket';
import { Pockets } from '../components/Organisms/Pockets';
import { Colors } from '../config/styles';

export const Home = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#8c22d0'} />
      <Header />
      <MainPocket />
      <Pockets />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backGround
  },
});
