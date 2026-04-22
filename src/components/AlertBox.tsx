import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = { message: string };

export default function AlertBox({ message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  text: { color: '#B91C1C', fontSize: 13, fontWeight: '500' },
});
