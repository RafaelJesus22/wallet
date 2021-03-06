import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, fontFamily } from '../../config/styles';
import { useAppContext } from '../../Contexts/AppContext';
import { HistoryItemProps } from '../../types';
import { HistoryItem } from '../atoms/HistoryItem';

export const PocketHistory = () => {
  const [loading, setLoading] = useState(false);
  const { getPocketHistory, pocketHistory } = useAppContext();

  async function getHistory() {
    setLoading(true);
    await getPocketHistory();
    setLoading(false);
  }

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      <View style={styles.content}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
          />
        )}

        {pocketHistory && pocketHistory.map(h => (
          <HistoryItem {...h} key={h.id} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  title: {
    paddingHorizontal: 16,
    fontSize: 20,
    fontFamily: fontFamily.medium,
    color: Colors.text
  },
  content: {
    paddingVertical: 16,
  }
});