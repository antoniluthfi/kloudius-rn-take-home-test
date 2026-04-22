import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  label: string;
  loadingLabel?: string;
  loading?: boolean;
  color?: string;
  fullWidth?: boolean;
  onPress: () => void;
};

export default function PrimaryButton({
  label,
  loadingLabel,
  loading,
  color = '#6366F1',
  fullWidth = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color },
        fullWidth && styles.fullWidth,
        loading && styles.disabled,
      ]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}>
      <Text style={styles.text}>{loading ? (loadingLabel ?? label) : label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  fullWidth: {
    width: '100%',
    marginTop: 0
  },
  disabled: {
    opacity: 0.6
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3
  },
});
