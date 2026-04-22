import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Divider() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>or</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  text: { marginHorizontal: 12, color: '#94A3B8', fontSize: 13 },
});
