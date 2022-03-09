/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { PocketAmount } from '../components/atoms/PocketAmount';
import { PocketTitle } from '../components/atoms/PocketTitle';
import { Header } from '../components/molecules/Header';
import { MainPocket } from '../components/molecules/MainPocket';
import { PocketItem } from '../components/molecules/PocketItem';
import { Colors } from '../config/styles';
import { useAppContext } from '../Contexts/AppContext';

const Home = () => {
  const { pockets } = useAppContext();
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#8c22d0'} />
      <Header />

      <MainPocket />
      {pockets.map((pocket) => (
        <PocketItem {...pocket} key={pocket.name}/>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.backGround },
});

export default Home;
