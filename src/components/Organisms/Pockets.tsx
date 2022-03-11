import React from 'react';
import { View } from 'react-native';
import { useAppContext } from '../../Contexts/AppContext';
import { PocketItem } from '../molecules/PocketItem';

export const Pockets = () => {
  const { pockets } = useAppContext();

  return (
    <View>
      {pockets && pockets.map((pocket) => (
        <PocketItem pocket={pocket} key={pocket.id} />
      ))}
    </View>
  );
}