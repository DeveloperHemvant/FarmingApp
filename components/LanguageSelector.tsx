import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const languages = ['English', 'Hindi', 'Tamil', 'Bengali'];

export default function LanguageSelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Language:</Text>
      <View style={styles.options}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.option,
              selected === lang && styles.optionSelected,
            ]}
            onPress={() => onSelect(lang)}
          >
            <Text style={selected === lang ? styles.textSelected : styles.text}>
              {lang}
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
  options: { flexDirection: 'row', flexWrap: 'wrap' },
  option: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
  },
  optionSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  text: { color: '#333' },
  textSelected: { color: '#fff' },
});
