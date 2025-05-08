import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import LanguageSelector from '../components/LanguageSelector';
import RoleSelector from '../components/RoleSelector';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../themes/theme'; // Import the Theme

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [language, setLanguage] = useState<string>('English');
  const [role, setRole] = useState<string>('Farmer');
  const [mobile, setMobile] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [otpModalVisible, setOtpModalVisible] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const otpInputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const loadLocation = async () => {
      try {
        await AsyncStorage.removeItem('userLocation');
    
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Toast.show({
            type: 'error',
            text1: 'Permission to access location was denied',
            position: 'bottom',
          });
          return;
        }
    
        let loc = await Location.getCurrentPositionAsync({});
        let geocode = await Location.reverseGeocodeAsync(loc.coords);
    
        if (geocode && geocode.length > 0) {
          const place = geocode[0];
          console.log('Geocode:', place);
          const placeName = `${place.formattedAddress}`;
          setLocation(placeName.trim());
          await AsyncStorage.setItem('userLocation', placeName.trim());
        } else {
          throw new Error('Could not fetch location name.');
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Error detecting location',
          position: 'bottom',
        });
      }
    };
    
    loadLocation();
  }, []);

  const showToast = (type: string, message: string) => {
    Toast.show({
      type: type,
      text1: message,
      position: 'bottom',
    });
  };

  const handleSendOtp = async () => {
    if (!mobile) {
      showToast('error', 'Please enter a valid mobile number.');
      return;
    }
  
    try {
      showToast('success', 'OTP sent successfully!');
      setOtpModalVisible(true);
      // Auto-focus the first OTP input when modal opens
      setTimeout(() => otpInputs.current[0]?.focus(), 100);
    } catch (error: any) {
      showToast('error', error.message || 'Network error. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      showToast('error', 'Please enter the complete OTP.');
      return;
    }
    showToast('success', 'OTP verified successfully!');
    setOtpModalVisible(false);
    navigation.navigate('Home');
  };

  const handleOtpChange = (text: string, index: number) => {
    // Only allow numbers
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);
    
    // Auto focus next input if a number was entered
    if (numericValue && index < 3) {
      otpInputs.current[index + 1]?.focus();
    }
    
    // Submit automatically if last digit is entered
    if (index === 3 && numericValue) {
      handleVerifyOtp();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace to move to previous input
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleLocationDetect = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        showToast('error', 'Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      const locString = `Lat: ${loc.coords.latitude.toFixed(4)}, Lon: ${loc.coords.longitude.toFixed(4)}`;
      setLocation(locString);
      await AsyncStorage.setItem('userLocation', locString);
      showToast('success', 'Location detected and saved');
    } catch (error) {
      showToast('error', 'Error detecting location');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Theme.colors.background }]}>
      <Image source={{ uri: 'https://example.com/farming-logo.png' }} style={styles.logo} />
      <Text style={styles.title}>🌾 Smart Farming App</Text>

      <LanguageSelector selected={language} onSelect={setLanguage} />
      <RoleSelector selected={role} onSelect={setRole} style={styles.roleSelector} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Mobile Number:</Text>
        <TextInput
          style={[styles.input, { borderColor: Theme.colors.border }]}
          placeholder="e.g. 9876543210"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={[styles.input, { borderColor: Theme.colors.border }]}
          placeholder="Enter manually or use GPS"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity onPress={handleLocationDetect}>
          <Text style={[styles.detectLink, { color: Theme.colors.primary }]}>📍 Detect via GPS</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.loginBtn, { backgroundColor: Theme.colors.primary }]} onPress={handleSendOtp}>
        <Text style={styles.loginText}>Send OTP</Text>
      </TouchableOpacity>

      <Text style={styles.or}>OR</Text>

      <View style={styles.social}>
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: Theme.colors.primaryLight }]}>
          <Text style={styles.socialText}>🔵 Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: Theme.colors.primaryLight }]}>
          <Text style={styles.socialText}>🔴 Login with Google</Text>
        </TouchableOpacity>
      </View>

      {/* OTP Modal */}
      <Modal
        visible={otpModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOtpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeIcon} 
              onPress={() => {
                setOtpModalVisible(false);
                setOtp(['', '', '', '']);
              }}
            >
              <Ionicons name="close" size={24} color={Theme.colors.primary} />
            </TouchableOpacity>

            <Text style={[styles.modalTitle, { color: Theme.colors.primary }]}>Enter OTP</Text>
            <Text style={styles.modalSubtitle}>We've sent a verification code to {mobile}</Text>
            
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    otpInputs.current[index] = ref;
                  }}
                  style={[styles.otpInput, { borderColor: Theme.colors.border }]}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  autoFocus={index === 0}
                  selectionColor={Theme.colors.primaryLight}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.resendLink}>
              <Text style={[styles.resendText, { color: Theme.colors.textSecondary }]}>Didn't receive code? <Text style={[styles.resendHighlight, { color: Theme.colors.primary }]}>Resend</Text></Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.verifyBtn, { backgroundColor: Theme.colors.primary }]} onPress={handleVerifyOtp}>
              <Text style={styles.verifyText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.md,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginBottom: Theme.spacing.lg,
    resizeMode: 'contain',
  },
  title: {
    fontSize: Theme.typography.heading1.fontSize,
    fontWeight: Theme.typography.heading1.fontWeight,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
    color: Theme.colors.primary,
  },
  roleSelector: {
    backgroundColor: Theme.colors.secondary, // Change the background color for the Role Selector
    padding: Theme.spacing.sm,
    borderRadius: Theme.borders.radius.sm,
    marginBottom: Theme.spacing.sm,
  },
  inputContainer: {
    marginBottom: Theme.spacing.sm,
  },
  label: {
    marginTop: Theme.spacing.xs,
    fontWeight: '600',
    color: Theme.colors.primary,
    fontSize: Theme.typography.bodyMedium.fontSize,
    marginBottom: Theme.spacing.xs,
  },
  input: {
    borderWidth: Theme.borders.width.thin,
    borderRadius: Theme.borders.radius.sm,
    padding: Theme.spacing.sm,
    backgroundColor: Theme.colors.white,
    fontSize: Theme.typography.bodyMedium.fontSize,
  },
  detectLink: {
    textAlign: 'right',
    marginTop: Theme.spacing.xs,
    fontWeight: '600',
    fontSize: Theme.typography.bodySmall.fontSize,
  },
  loginBtn: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.borders.radius.sm,
    marginVertical: Theme.spacing.md,
    alignItems: 'center',
  },
  loginText: {
    color: Theme.colors.white,
    fontWeight: 'bold',
    fontSize: Theme.typography.bodyMedium.fontSize,
  },
  or: {
    textAlign: 'center',
    marginVertical: Theme.spacing.md,
    fontWeight: '600',
    color: Theme.colors.textSecondary,
    fontSize: Theme.typography.bodySmall.fontSize,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialBtn: {
    padding: Theme.spacing.sm,
    borderRadius: Theme.borders.radius.sm,
    flex: 1,
    marginHorizontal: Theme.spacing.xs,
    alignItems: 'center',
  },
  socialText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.bodySmall.fontSize,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.overlay,
  },
  modalContent: {
    backgroundColor: Theme.colors.white,
    padding: Theme.spacing.lg,
    borderRadius: Theme.borders.radius.lg,
    width: '80%',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
  },
  modalTitle: {
    fontSize: Theme.typography.heading2.fontSize,
    fontWeight: Theme.typography.heading2.fontWeight,
    marginBottom: Theme.spacing.sm,
  },
  modalSubtitle: {
    fontSize: Theme.typography.bodySmall.fontSize,
    textAlign: 'center',
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.md,
  },
  otpInput: {
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: Theme.typography.bodyLarge.fontSize,
    borderWidth: Theme.borders.width.thin,
    borderRadius: Theme.borders.radius.sm,
    marginHorizontal: Theme.spacing.xs,
  },
  resendLink: {
    marginBottom: Theme.spacing.md,
  },
  resendText: {
    fontSize: Theme.typography.bodySmall.fontSize,
  },
  resendHighlight: {
    fontWeight: 'bold',
  },
  verifyBtn: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borders.radius.sm,
    marginTop: Theme.spacing.sm,
    alignItems: 'center',
  },
  verifyText: {
    color: Theme.colors.white,
    fontWeight: 'bold',
    fontSize: Theme.typography.bodyMedium.fontSize,
  },
});
