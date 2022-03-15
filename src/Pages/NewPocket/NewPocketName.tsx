import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Colors, fontFamily } from '../../config/styles';
import { useNavigation } from '@react-navigation/native';
import { ArrowBack } from '../../components/atoms/ArrowBack';
import { NextButton } from '../../components/atoms/NextButton';
import { Screens } from '../../enums/Screens';

export const NewPocketName = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  function handlePressNext() {
    navigation.navigate(Screens.NEW_POCKET_INITIAL_VALUE, { name });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ArrowBack type="dark" />
        <Text style={styles.headerText}>
          Dê um nome a sua nova carteira
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          autoFocus
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <Text style={styles.label}>
          Esse nome será usado para identificar sua carteira
        </Text>
      </View>

      <View style={styles.button}>
        <NextButton onPress={handlePressNext} disabled={!name} />
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