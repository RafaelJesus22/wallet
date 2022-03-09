import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Entypo } from '@expo/vector-icons';
import { Colors, fontFamily } from '../config/styles';
import { useNavigation } from '@react-navigation/native';

export const NewPocket = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('0');
  const [goal, setGoal] = useState('0');
  const navigation = useNavigation();

  function handlePressBack() {
    navigation.goBack();
  }

  return (
    <ScrollView>
      <View style={styles.pageHeader}>
        <View>
          <Entypo name="chevron-left" color={Colors.backGround} size={32} onPress={handlePressBack} />
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.headerLabel}>Nova Carteira</Text>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome da Carteira</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Insira o nome da carteira"
          placeholderTextColor={Colors.placeholder}
        />
        <Text style={styles.label}>Valor Inicial</Text>
        <TextInputMask
          type={'money'}
          value={value}
          onChangeText={setValue}
          style={styles.input}
          placeholder="R$ 0,00"
        />
        <Text style={styles.label}>Objetivo</Text>
        <TextInputMask
          type={'money'}
          value={goal}
          onChangeText={setGoal}
          style={styles.input}
          placeholder="R$ 0,00"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    padding: 16,
    backgroundColor: Colors.primary
  },
  headerTitle: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerLabel: {
    fontSize: 28,
    color: Colors.backGround,
    fontFamily: fontFamily.primary
  },
  form: {
    padding: 16,
  },
  label: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: fontFamily.primary,
    color: Colors.secondatyText
  },
  input: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Colors.primaryLight,
    marginBottom: 24,
    fontFamily: fontFamily.primary,
    fontSize: 24,
    color: Colors.secondatyText
  }
});