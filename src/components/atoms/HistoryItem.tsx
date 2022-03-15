import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';

import { Colors, fontFamily } from '../../config/styles';
import { HistoryItemProps, TransactionType } from '../../types';
import { currencyFormat } from '../../utils';

const TODAY = moment().format('DD/MM/YYYY');
const YESTERDAY = moment().subtract(1, 'days').format('DD/MM/YYYY');

export const HistoryItem: React.FC<HistoryItemProps> = ({
  date,
  type,
  value,
}) => {
  const getTitle = (): string => {
    switch (type) {
      case "creation":
        return 'Carteira Criada';
      case "redeem":
        return 'Dinheiro Resgatado';
      case "save":
        return 'Dinheiro Guardado';
      default:
        return '';
    }
  };

  const getDate = (): string => {
    if (moment(date).format('DD/MM/YYYY') === TODAY) {
      return 'Hoje';
    }
    if (moment(date).format('DD/MM/YYYY') === YESTERDAY) {
      return 'Hoje';
    }

    return moment(date).format('DD/MM/YYYY');
  };

  return (
    <View style={styles.container}>
      <View>
        <HistoryIcon type={type} />
      </View>
      <View>
        <Text style={styles.title}>{getTitle()}</Text>
        <Text style={styles.date}>{getDate()}</Text>
        <Text style={styles.value}>{currencyFormat(value)}</Text>
      </View>
    </View>
  );
}

const HistoryIcon: React.FC<{ type: TransactionType }> = ({ type }) => {
  const backgroundColor = type === 'redeem' ? Colors.placeholder : Colors.successLight;
  const icons = {
    save: <Feather name="trending-up" size={24} color={Colors.success} />,
    redeem: <Feather name="trending-down" size={24} color={Colors.text} />,
    creation: <Feather name="plus-circle" size={24} color={Colors.success} />,
  }

  return (
    <View style={[styles.icon, { backgroundColor }]}>
      {icons[type]}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.placeholder,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 48,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    color: Colors.text,
  },
  date: {
    fontSize: 18,
    fontFamily: fontFamily.primary,
    color: Colors.secondatyText,
  },
  value: {
    fontSize: 18,
    fontFamily: fontFamily.primary,
    color: Colors.secondatyText,
  },
});