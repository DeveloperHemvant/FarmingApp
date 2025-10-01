import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Bilingual text content
const translations = {
  en: {
    appName: 'KrishiGPT',
    subtitle: 'AI-Powered Agriculture Revolution',
    language: 'Language',
    mobileNumber: 'Mobile Number',
    mobilePlaceholder: '+91 98765 43210',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    sendLogin: 'Login',
    footerText: 'By continuing, you agree to our',
    terms: 'Terms',
    and: 'and',
    privacy: 'Privacy Policy',
    forgotPassword: 'Forgot Password?',
    errors: {
      mobile: 'Mobile number must be at least 10 digits',
      password: 'Password must be at least 8 characters, include 1 capital, 1 number & 1 special character',
    },
  },
  hi: {
    appName: 'KrishiGPT',
    subtitle: 'कृषि के लिए एआई सहायक',
    language: 'भाषा',
    mobileNumber: 'मोबाइल नंबर',
    mobilePlaceholder: '+91 98765 43210',
    password: 'पासवर्ड',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    sendLogin: 'लॉगिन करें',
    footerText: 'जारी रखकर, आप हमारी',
    terms: 'नियम',
    and: 'और',
    privacy: 'गोपनीयता नीति',
    forgotPassword: 'पासवर्ड भूल गए?',
    errors: {
      mobile: 'मोबाइल नंबर कम से कम 10 अंक का होना चाहिए',
      password: 'पासवर्ड कम से कम 8 वर्ण, 1 बड़ा अक्षर, 1 संख्या और 1 विशेष वर्ण होना चाहिए',
    },
  },
};

export default function KrishiGPTLogin() {
  const navigation = useNavigation();
  const [language, setLanguage] = useState('en');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errorMobile, setErrorMobile] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const t = translations[language];

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
    setErrorMobile('');
    setErrorPassword('');
  };

  // Validation
  const validate = () => {
    let valid = true;

    if (mobile.length < 10) {
      setErrorMobile(t.errors.mobile);
      valid = false;
    } else {
      setErrorMobile('');
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorPassword(t.errors.password);
      valid = false;
    } else {
      setErrorPassword('');
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      navigation.navigate('Home');

      const response = await axios.post('https://your-api.com/login', {
        mobile,
        password,
      });

      if (response.data.success) {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', response.data.message || 'Login failed');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#066040" />
      <LinearGradient colors={['#cde4cd', '#cde4cd']} style={styles.backgroundGradient}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.languageToggle} onPress={handleLanguageToggle} activeOpacity={0.7}>
              <Ionicons name="language" size={20} color="#066040" />
              <Text style={styles.languageText}>{language === 'en' ? 'हिं' : 'EN'}</Text>
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <LinearGradient colors={['#066040', '#044a30']} style={styles.logoGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <Text style={styles.logoEmoji}>🌱</Text>
                <Ionicons name="flash" size={24} color="white" />
              </LinearGradient>
            </View>

            <Text style={styles.appName}>{t.appName}</Text>
            <Text style={styles.subtitle}>{t.subtitle}</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t.mobileNumber}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call" size={20} color="#066040" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={mobile}
                  onChangeText={setMobile}
                  placeholder={t.mobilePlaceholder}
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                  maxLength={13}
                />
              </View>
              {errorMobile ? <Text style={styles.errorText}>{errorMobile}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t.password}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={20} color="#066040" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={t.passwordPlaceholder}
                  placeholderTextColor="#666"
                  secureTextEntry
                />
              </View>
              {errorPassword ? <Text style={styles.errorText}>{errorPassword}</Text> : null}
            </View>

            <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 20 }} onPress={handleForgotPassword} activeOpacity={0.7}>
              <Text style={{ color: '#066040', fontWeight: '600' }}>{t.forgotPassword}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sendOtpButton} onPress={handleLogin} activeOpacity={0.8}>
              <LinearGradient colors={['#066040', '#044a30']} style={styles.buttonGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.buttonText}>{loading ? 'Loading...' : t.sendLogin}</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </LinearGradient>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginVertical: 15 }}>
              <Text style={{ fontSize: 14, color: '#374151' }}>
                Don’t have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.7}>
                <Text style={{ color: '#066040', fontWeight: '700', fontSize: 16 }}>
                  Register as Farmer
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {t.footerText} <Text style={styles.linkText}>{t.terms}</Text> {t.and} <Text style={styles.linkText}>{t.privacy}</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#cde4cd' },
  backgroundGradient: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 20 },
  header: { alignItems: 'center', paddingTop: 40, paddingBottom: 30 },
  languageToggle: {
    position: 'absolute',
    top: 10,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20
  },
  languageText: { marginLeft: 4, color: '#066040', fontWeight: '600', fontSize: 14 },
  logoContainer: { marginBottom: 20 },
  logoGradient: { width: 80, height: 80, borderRadius: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  logoEmoji: { fontSize: 28, marginRight: 4 },
  appName: { fontSize: 42, fontWeight: 'bold', color: '#066040', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#044a30', textAlign: 'center', fontWeight: '500' },
  formContainer: { backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 25, padding: 24 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 8 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#cde4cd',
    paddingHorizontal: 16,
    paddingVertical: 4
  },
  inputIcon: { marginRight: 12 },
  textInput: { flex: 1, fontSize: 16, color: '#374151', paddingVertical: 12 },
  errorText: { color: 'red', fontSize: 12, marginTop: 4 },
  sendOtpButton: { borderRadius: 18, elevation: 6 },
  buttonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 18 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 8 },
  footer: { alignItems: 'center' },
  footerText: { fontSize: 14, color: '#374151', textAlign: 'center', lineHeight: 20 },
  linkText: { color: '#066040', fontWeight: '600' },
});
