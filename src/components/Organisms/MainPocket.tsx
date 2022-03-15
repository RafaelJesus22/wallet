import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../config/styles';
import { useAppContext } from '../../Contexts/AppContext';
import { PocketAmount } from '../atoms/PocketAmount';
import { PocketTitle } from '../atoms/PocketTitle';
import { Actions } from '../atoms/Actions';
import { ActionItemProps } from '../atoms/ActionItem';
import { Screens } from '../../enums/Screens';

export const MainPocket: React.FC = () => {
  const { total } = useAppContext();
  const navigation = useNavigation();

  const ACTIONS: ActionItemProps[] = [
    {
      name: 'Adicionar\nbolso',
      img: <Feather name="plus-circle" size={36} color={Colors.text} />,
      onPress: () => navigation.navigate(Screens.NEW_POCKET_NAME),
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pocketInfo}>
        <PocketTitle>Total guardado</PocketTitle>
        <PocketAmount>R$ {Number(total).toFixed(2).replace('.', ',')}</PocketAmount>
      </View>
      <Actions actions={ACTIONS} />
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