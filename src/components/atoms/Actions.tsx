import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../config/styles';
import { ActionItem, ActionItemProps } from './ActionItem';
import { Screens } from '../../enums/Screens';

interface Props {
  actions: ActionItemProps[];
}

export const Actions: React.FC<Props> = ({
  actions,
}) => {

  return (
    <ScrollView contentContainerStyle={styles.actions} horizontal showsHorizontalScrollIndicator={false}>
      {!!actions && actions.map((action, index) => (
        <ActionItem
          key={index}
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