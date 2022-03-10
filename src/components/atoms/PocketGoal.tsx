import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fontFamily } from '../../config/styles';

interface PocketGoalProps {
  goal: number;
}

export const PocketGoal: React.FC<PocketGoalProps> = ({
  goal,
}) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      Objetivo: R$ {Number(goal).toFixed(2).replace('.', ',')}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  text: {
    fontFamily: fontFamily.primary,
    fontSize: 16,
  }
});