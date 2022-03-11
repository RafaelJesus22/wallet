/* eslint-disable prettier/prettier */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Header } from '../components/molecules/Header';
import { MainPocket } from '../components/Organisms/MainPocket';
import { Pockets } from '../components/Organisms/Pockets';
import { Colors } from '../config/styles';
import { useAppContext } from '../Contexts/AppContext';

export const Home = () => {
  const { pockets } = useAppContext();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused){
      console.log('Home is focused', pockets);
    }
  }, [])

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#8c22d0'} />
      <Header />
      <MainPocket />
      <Pockets />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backGround
  },
});
