import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, fontFamily } from '../../config/styles';

export const PocketHistory = () => {
  const [loading, setLoading] = useState(false);

  async function getHistory() {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 5000));
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.medium,
    color: Colors.text
  },
  content: {
    paddingVertical: 16,
  }
});