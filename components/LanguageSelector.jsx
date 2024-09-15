// LanguageSelector.js
import React from 'react';
import { View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
      <Button title="English" onPress={() => changeLanguage('en')} />
      <Button title="Español" onPress={() => changeLanguage('es')} />
    </View>
  );
};

export default LanguageSelector;
