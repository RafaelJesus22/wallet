import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAppContext } from '../Contexts/AppContext';
import { Colors, fontFamily } from '../config/styles';
import { currencyFormat } from '../utils';
import { ActionItemProps } from '../components/atoms/ActionItem';
import { Actions } from '../components/atoms/Actions';

export const PocketDetails = () => {
  const { selectedPocket } = useAppContext();
  const navigation = useNavigation();

  const handlePressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handlePressSaveMoney = useCallback(() => {}, []);

  const handlePressRedeemMoney = useCallback(() => {}, []);

  const handlePressDelete = useCallback(() => {}, []);

  const ACTIONS: ActionItemProps[] = [
    {
      name: 'Guardar\nDinheiro',
      img: <Feather name="trending-up" size={36} color={'#39823E'} />,
      onPress: handlePressSaveMoney,
    },
    {
      name: 'Resgatar\nDinheiro',
      img: <Feather name="trending-down" size={36} color={Colors.text} />,
      onPress: handlePressRedeemMoney,
    },
    {
      name: 'Apagar\nCarteira',
      img: <AntDesign name="delete" size={24} color={'#EB033B'} />,
      onPress: handlePressDelete,
    },
  ];

  return (
    <View>
      <View style={styles.header}>
        <Entypo name="chevron-left" color={Colors.text} size={32} onPress={handlePressBack} />
        <View style={styles.headerContent}>
          <Text style={styles.pocketName}>{selectedPocket?.name}</Text>
          <Text style={styles.label}>Total guardado</Text>
          <Text style={styles.pocketValue}>{currencyFormat(selectedPocket?.value)}</Text>
        </View>

        <Actions actions={ACTIONS} />

      </View>
      {/* <PocketHistory /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomColor: Colors.placeholder,
    borderBottomWidth: 1,
  },
  headerContent: {
    padding: 8
  },
  pocketName: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    color: Colors.text,
  },
  label: {
    fontSize: 14,
    color: Colors.secondatyText,
    fontFamily: fontFamily.primary,
  },
  pocketValue: {
    fontSize: 36,
    fontFamily: fontFamily.semiBold,
    color: Colors.text,
  },
});