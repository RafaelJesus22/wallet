import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useAppContext } from '../../Contexts/AppContext';
import { PocketAmount } from '../atoms/PocketAmount';
import { PocketTitle } from '../atoms/PocketTitle';
import { Actions } from '../atoms/Actions';

export const MainPocket: React.FC = () => {
  const { total } = useAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.pocketInfo}>
        <PocketTitle>Total guardado</PocketTitle>
        <PocketAmount>R$ {Number(total).toFixed(2).replace('.', ',')}</PocketAmount>
      </View>
      <Actions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pocketInfo: {
    padding: 16,
    paddingBottom: 0,
    marginTop: 12
  },
});