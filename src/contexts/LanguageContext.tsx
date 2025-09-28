import React, { createContext, useState } from 'react';

const translations = {
  en: {
    farmerRegistration: 'Farmer Registration',
    name: 'Name',
    mobileNumber: 'Mobile Number',
    sendOtp: 'Send OTP',
    state: 'State',
    district: 'District',
    village: 'Village',
    next: 'Next',
    soilType: 'Soil Type',
    irrigation: 'Irrigation Type',
    cropsGrown: 'Crops Grown',
    addCrop: 'Add Crop',
    submit: 'Submit',
    enterOtp: 'Enter OTP',
    verify: 'Verify OTP',
  },
  hi: {
    farmerRegistration: 'किसान पंजीकरण',
    name: 'नाम',
    mobileNumber: 'मोबाइल नंबर',
    sendOtp: 'ओटीपी भेजें',
    state: 'राज्य',
    district: 'जिला',
    village: 'गाँव',
    next: 'आगे',
    soilType: 'मिट्टी का प्रकार',
    irrigation: 'सिंचाई प्रकार',
    cropsGrown: 'उगाई गई फसलें',
    addCrop: 'फसल जोड़ें',
    submit: 'जमा करें',
    enterOtp: 'ओटीपी दर्ज करें',
    verify: 'ओटीपी सत्यापित करें',
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = key => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};