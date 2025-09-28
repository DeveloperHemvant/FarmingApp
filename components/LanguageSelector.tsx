import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Theme } from '../themes/theme';
import { useLanguage } from '../src/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.languageButton,
          language === 'English' && styles.selectedLanguage
        ]}
        onPress={() => setLanguage('English')}
      >
        <Text style={styles.languageText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.languageButton,
          language === 'Hindi' && styles.selectedLanguage
        ]}
        onPress={() => setLanguage('Hindi')}
      >
        <Text style={styles.languageText}>हिंदी</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Theme.spacing.md,
  },
  languageButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    marginHorizontal: Theme.spacing.xs,
    borderRadius: Theme.borders.radius.sm,
    borderWidth: Theme.borders.width.thin,
    borderColor: Theme.colors.border,
  },
  selectedLanguage: {
    backgroundColor: Theme.colors.primaryLight,
    borderColor: Theme.colors.primary,
  },
  languageText: {
    fontSize: Theme.typography.bodyMedium.fontSize,
  },
});

export default LanguageSelector;