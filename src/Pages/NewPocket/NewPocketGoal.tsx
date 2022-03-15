import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Entypo } from '@expo/vector-icons';
import { Colors, fontFamily } from '../../config/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { Button } from '../../components/atoms/Button';
import { useAppContext } from '../../Contexts/AppContext';
import { PocketProps } from '../../types';
import { delay, removeDots } from '../../utils';
import { ArrowBack } from '../../components/atoms/ArrowBack';
import { Screens } from '../../enums/Screens';

interface PreviousRouteParams {
  name: string;
  initialValue: string;
}

export const NewPocketGoal = () => {
  const { addPocket } = useAppContext();
  const [goal, setGoal] = useState('0');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { initialValue, name } = useRoute().params as PreviousRouteParams;

  async function handleAddPocket() {
    setLoading(true);
    const formattedValue = removeDots(initialValue)
      .replace(',', '.')
      .replace('R$', '');
    const formattedGoal = removeDots(goal)
      .replace(',', '.')
      .replace('R$', '');

    const pocket: PocketProps = {
      id: uuid.v4().toString(),
      name,
      value: Number(formattedValue),
      goal: Number(formattedGoal),
    }

    await addPocket(pocket);
    setLoading(false);
    Alert.alert('Sucesso', `Carteira adicionada com sucesso`);
    navigation.navigate(Screens.HOME as never);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <ArrowBack type="dark" />
        <Text style={styles.headerText}>
          Quanto dinheiro precisa guardar?
        </Text>
      </View>

      <View style={styles.form}>
        <TextInputMask
          type={'money'}
          value={goal}
          onChangeText={setGoal}
          style={styles.input}
          placeholder="R$ 0,00"
          autoFocus
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Criar Carteira"
          onPress={handleAddPocket}
          loading={loading}
          disabled={loading || goal === '0'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.backGround,
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
  label: {
    fontSize: 16,
    fontFamily: fontFamily.primary,
    color: Colors.secondatyText,
  },
  button: {
    width: '100%',
    padding: 16,
    alignItems: 'flex-end',
  },
});