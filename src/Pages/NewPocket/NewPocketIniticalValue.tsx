import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, fontFamily } from '../../config/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'

import { ArrowBack } from '../../components/atoms/ArrowBack';
import { NextButton } from '../../components/atoms/NextButton';
import { Screens } from '../../enums/Screens';

interface PreviousRouteParams {
  name: string;
}

export const NewPocketInitialValue = () => {
  const [initialValue, setInitialValue] = useState('R$0,00');
  const navigation = useNavigation();
  const { name } = useRoute().params as PreviousRouteParams;

  function handlePressNext() {
    navigation.navigate(Screens.NEW_POCKET_GOAL, { name, initialValue });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowBack type="dark" />
        <Text style={styles.headerText}>
          Quanto dinheiro você já tem guardado?
        </Text>
      </View>

      <View style={styles.form}>
        <TextInputMask
          type={'money'}
          value={initialValue}
          onChangeText={setInitialValue}
          style={styles.input}
          placeholder="R$ 0,00"
          autoFocus
        />
        <Text style={styles.label}>
          Se ainda não tiver nada, tudo bem.
        </Text>
      </View>

      <View style={styles.button}>
        <NextButton onPress={handlePressNext} />
      </View>
    </View>
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