import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

import { PocketProps } from '../types';
import { useAppContext } from '../Contexts/AppContext';
import { Colors, fontFamily } from '../config/styles';
import { currencyFormat, removeDots } from '../utils';
import { ArrowBack } from '../components/atoms/ArrowBack';
import { Button } from '../components/atoms/Button';

export interface UpdatePocketParams {
  actionType: 'save' | 'redeem';
}

export const UpdatePocket: React.FC = () => {
  const navigation = useNavigation();
  const { actionType } = useRoute().params as UpdatePocketParams;
  const [value, setValue] = useState('0');
  const [loading, setLoading] = useState(false);
  const {
    selectedPocket,
    updateSelectedPocket,
    updatePocket
  } = useAppContext()

  async function handleSubmit () {
    setLoading(true);

    const formattedValue = removeDots(value).replace(',', '.').replace('R$', '');
    let newValue = selectedPocket?.value || 0;

    if (actionType === 'save') {
      newValue += parseFloat(formattedValue);
    } else if (actionType === 'redeem') {
      newValue -= parseFloat(formattedValue);
    }

    const updatedPocket = {
      ...selectedPocket,
      value: newValue,
    } as PocketProps

    await updatePocket(updatedPocket, actionType);
    updateSelectedPocket(updatedPocket);
    Alert.alert('Sucesso', 'Carteira atualizada com sucesso!');

    navigation.goBack();
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowBack type="dark" />
        <Text style={styles.headerText}>
          {actionType === 'save' 
            ? 'Qual valor você gostaria de adicionar a carteira?'
            : 'Qual valor você gostaria de resgatar da carteira?'
          }
          </Text>
      </View>

      <View style={styles.form}>
        <TextInputMask
          autoFocus
          type={'money'}
          value={value}
          onChangeText={text => {
            setValue(text)
            console.log('text', text, 'state', value);
          }}
          style={styles.input}
        />
        <View>
          <Text style={styles.balance}>Saldo disponível: {currencyFormat(selectedPocket?.value)}</Text>
        </View>
      </View>

      <View style={styles.button}>
        <Button
          loading={loading}
          disabled={loading || value === '0'}
          title={actionType === 'save' ? 'Guardar' : 'Resgatar'}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    padding: 16,
  },
  headerText: {
    paddingHorizontal: 8,
    marginVertical: 24,
    fontSize: 22,
    fontFamily: fontFamily.primary,
  },
  form: {
    padding: 16,
  },
  input: {
    fontSize: 44,
    fontFamily: fontFamily.primary,
    color: Colors.text,
    marginVertical: 16,
  },
  balance: {
    fontSize: 16,
    fontFamily: fontFamily.primary,
    color: Colors.secondatyText,
  },
  button: {
    padding: 16,

  },
});
