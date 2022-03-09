import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PocketAmount } from '../atoms/PocketAmount';
import { PocketTitle } from '../atoms/PocketTitle';
import { PocketProps } from '../../types';


export const PocketItem: React.FC<PocketProps> = ({
  name, 
  value,
  goal,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.pocketInfo}>
        <PocketTitle>{name}</PocketTitle>
        <PocketAmount>
          R$ {Number(value).toFixed(2).replace('.', ',')}
          {goal && (<Text>/{goal}</Text>)}
        </PocketAmount>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pocketInfo: { padding: 16, paddingBottom: 16, marginTop: 12 },
});