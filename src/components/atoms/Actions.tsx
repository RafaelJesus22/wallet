import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../config/styles';
import { ActionItem } from './ActionItem';
import { Screens } from '../../enums/Screens';

const ACTIONS = [
  {
    name: 'Adicionar\nbolso',
    img: <Feather name="plus-circle" size={36} color={Colors.text} />,
    route: Screens.NEW_POCKET,
  }
]

export const Actions: React.FC = () => {
  const navigation = useNavigation();

  function handlePress(route: Screens) {
    navigation.navigate(route);
  }

  return (
    <ScrollView contentContainerStyle={styles.actions} horizontal showsHorizontalScrollIndicator={false}>
      {ACTIONS.map((action, index) => (
        <ActionItem
          key={index}
          onPress={() => handlePress(action.route)}
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