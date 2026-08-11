import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Checkbox = ({ checked, onChange, label }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onChange(!checked)}>
      <View style={[styles.box, checked && styles.checkedBox]}>
        {checked && <View style={styles.innerBox} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: '#007AFF',
  },
  innerBox: {
    width: 10,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
});

export default Checkbox;
