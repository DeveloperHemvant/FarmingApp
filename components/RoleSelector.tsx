import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const roles = ['Farmer', 'Expert', 'Supplier'];

export default function RoleSelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Role:</Text>
      <View style={styles.options}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role}
            style={[styles.option, selected === role && styles.optionSelected]}
            onPress={() => onSelect(role)}
          >
            <Text style={selected === role ? styles.textSelected : styles.text}>
              {role}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  options: { flexDirection: 'row', justifyContent: 'space-around' },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  text: { color: '#333' },
  textSelected: { color: '#fff' },
});
