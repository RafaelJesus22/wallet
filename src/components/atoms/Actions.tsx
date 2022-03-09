import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Colors } from '../../config/styles';
import { ActionItem } from './ActionItem';

const ACTIONS = [
  {
    name: 'Adicionar\nbolso',
    img: <Feather name="plus-circle" size={36} color={Colors.text} />,
  }
]

export const Actions: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.actions} horizontal showsHorizontalScrollIndicator={false}>
      {ACTIONS.map((action, index) => (
        <ActionItem
          key={index}
          onPress={() => { }}
          {...action}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  }
});