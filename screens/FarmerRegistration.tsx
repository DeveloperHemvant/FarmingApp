import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Color constants
const COLORS = {
  primary: '#066040',
  secondary: '#cde4cd',
  white: '#ffffff',
  black: '#000000',
  gray: '#6b7280',
  lightGray: '#9ca3af',
  darkGray: '#374151',
  error: '#ef4444',
  success: '#10b981',
  lightPrimary: '#08855f',
  darkPrimary: '#054d34',
};

interface PersonalInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  village: string;
  district: string;
  state: string;
  pincode: string;
}

interface FarmInfo {
  id: string;
  farmName: string;
  totalArea: string;
  soilType: string;
  irrigationType: string;
  crops: CropInfo[];
}

interface CropInfo {
  id: string;
  cropName: string;
  variety: string;
  areaAllocated: string;
  sowingDate: string;
  expectedHarvest: string;
  purpose: string; // commercial, consumption, both
}

interface LivestockInfo {
  hasCow: boolean;
  cowCount: string;
  hasBuffalo: boolean;
  buffaloCount: string;
  hasGoat: boolean;
  goatCount: string;
  hasPoultry: boolean;
  poultryCount: string;
  hasOther: boolean;
  otherType: string;
  otherCount: string;
}

interface AdditionalInfo {
  experience: string;
  primaryIncome: string;
  annualIncome: string;
  bankAccount: string;
  ifscCode: string;
  hasKisanCard: boolean;
  kisanCardNumber: string;
  hasCropInsurance: boolean;
  insuranceProvider: string;
  preferredLanguage: string;
  receiveUpdates: boolean;
  receiveWeatherAlerts: boolean;
  joinCommunity: boolean;
}

const FarmerRegistration: React.FC = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showFarmModal, setShowFarmModal] = useState(false);
  const [currentFarmIndex, setCurrentFarmIndex] = useState(0);
  const [currentCropIndex, setCurrentCropIndex] = useState(0);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showSoilModal, setShowSoilModal] = useState(false);
  const [showIrrigationModal, setShowIrrigationModal] = useState(false);
  const [showCropSelectionModal, setShowCropSelectionModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Form Data States
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    village: '',
    district: '',
    state: '',
    pincode: '',
  });

  const [farms, setFarms] = useState<FarmInfo[]>([
    {
      id: '1',
      farmName: '',
      totalArea: '',
      soilType: '',
      irrigationType: '',
      crops: [],
    },
  ]);

  const [livestock, setLivestock] = useState<LivestockInfo>({
    hasCow: false,
    cowCount: '0',
    hasBuffalo: false,
    buffaloCount: '0',
    hasGoat: false,
    goatCount: '0',
    hasPoultry: false,
    poultryCount: '0',
    hasOther: false,
    otherType: '',
    otherCount: '0',
  });

  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>({
    experience: '',
    primaryIncome: '',
    annualIncome: '',
    bankAccount: '',
    ifscCode: '',
    hasKisanCard: false,
    kisanCardNumber: '',
    hasCropInsurance: false,
    insuranceProvider: '',
    preferredLanguage: 'English',
    receiveUpdates: true,
    receiveWeatherAlerts: true,
    joinCommunity: true,
  });

  const cropOptions = [
    'Wheat', 'Rice', 'Corn', 'Barley', 'Sorghum', 'Millet',
    'Tomato', 'Potato', 'Onion', 'Cabbage', 'Cauliflower', 'Carrot',
    'Sugarcane', 'Cotton', 'Jute', 'Sunflower', 'Mustard', 'Groundnut',
    'Soybean', 'Chickpea', 'Lentil', 'Black Gram', 'Green Gram',
    'Other'
  ];

  const soilTypes = ['Black Soil', 'Red Soil', 'Alluvial Soil', 'Clay Soil', 'Sandy Soil', 'Loamy Soil', 'Mixed'];
  const irrigationTypes = ['Drip Irrigation', 'Sprinkler', 'Canal', 'Tube Well', 'Rain Fed', 'Mixed'];
  const genderOptions = ['Male', 'Female', 'Other'];
  const experienceOptions = ['0-2 years', '3-5 years', '6-10 years', '11-20 years', '20+ years'];
  const incomeRanges = ['Below 1 Lakh', '1-3 Lakh', '3-5 Lakh', '5-10 Lakh', '10+ Lakh'];
  const languages = ['English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Kannada', 'Odia', 'Punjabi'];

  const addNewFarm = () => {
    const newFarm: FarmInfo = {
      id: Date.now().toString(),
      farmName: '',
      totalArea: '',
      soilType: '',
      irrigationType: '',
      crops: [],
    };
    setFarms([...farms, newFarm]);
  };

  const removeFarm = (farmId: string) => {
    if (farms.length > 1) {
      setFarms(farms.filter(farm => farm.id !== farmId));
    }
  };

  const addCropToFarm = (farmIndex: number) => {
    const newCrop: CropInfo = {
      id: Date.now().toString(),
      cropName: '',
      variety: '',
      areaAllocated: '',
      sowingDate: '',
      expectedHarvest: '',
      purpose: 'commercial',
    };

    const updatedFarms = [...farms];
    updatedFarms[farmIndex].crops.push(newCrop);
    setFarms(updatedFarms);
  };

  const removeCropFromFarm = (farmIndex: number, cropId: string) => {
    const updatedFarms = [...farms];
    updatedFarms[farmIndex].crops = updatedFarms[farmIndex].crops.filter(crop => crop.id !== cropId);
    setFarms(updatedFarms);
  };

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const updateFarmInfo = (farmIndex: number, field: keyof FarmInfo, value: string) => {
    const updatedFarms = [...farms];
    (updatedFarms[farmIndex] as any)[field] = value;
    setFarms(updatedFarms);
  };

  const updateCropInfo = (farmIndex: number, cropIndex: number, field: keyof CropInfo, value: string) => {
    const updatedFarms = [...farms];
    (updatedFarms[farmIndex].crops[cropIndex] as any)[field] = value;
    setFarms(updatedFarms);
  };

  const updateLivestock = (field: keyof LivestockInfo, value: boolean | string) => {
    setLivestock(prev => ({ ...prev, [field]: value }));
  };

  const updateAdditionalInfo = (field: keyof AdditionalInfo, value: string | boolean) => {
    setAdditionalInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return personalInfo.fullName !== '' &&
          personalInfo.phoneNumber !== '' &&
          personalInfo.village !== '' &&
          personalInfo.district !== '' &&
          personalInfo.state !== '';
      case 2:
        return farms.every(farm =>
          farm.farmName !== '' &&
          farm.totalArea !== '' &&
          farm.soilType !== '' &&
          farm.crops.length > 0 &&
          farm.crops.every(crop => crop.cropName !== '' && crop.areaAllocated !== '')
        );
      case 3:
        return true; // Livestock is optional
      case 4:
        return additionalInfo.experience !== '' &&
          additionalInfo.primaryIncome !== '' &&
          additionalInfo.bankAccount !== '';
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((currentStep + 1) as 1 | 2 | 3 | 4);
      } else {
        handleSubmit();
      }
    } else {
      Alert.alert('Incomplete Information', 'Please fill all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleSubmit = () => {
    const registrationData = {
      personalInfo,
      farms,
      livestock,
      additionalInfo,
      registrationDate: new Date().toISOString(),
    };

    console.log('Registration Data:', JSON.stringify(registrationData, null, 2));
    Alert.alert(
      'Registration Successful!',
      'Welcome to KrishiGPT! Your account has been created successfully.',
      [{ text: 'Continue', onPress: () => navigation.navigate('Home' as never) }]
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((step) => (
        <View key={step} style={styles.stepIndicatorContainer}>
          <View style={[
            styles.stepCircle,
            currentStep >= step && styles.stepCircleActive,
            currentStep === step && styles.stepCircleCurrent
          ]}>
            <Text style={[
              styles.stepNumber,
              currentStep >= step && styles.stepNumberActive
            ]}>
              {step}
            </Text>
          </View>
          {step < 4 && <View style={[
            styles.stepLine,
            currentStep > step && styles.stepLineActive
          ]} />}
        </View>
      ))}
    </View>
  );

  const renderModal = (visible: boolean, onClose: () => void, title: string, options: string[], onSelect: (value: string) => void, selectedValue: string) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={COLORS.darkGray} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalOptions}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.modalOption,
                  selectedValue === option && styles.modalOptionSelected
                ]}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}
              >
                <Text style={[
                  styles.modalOptionText,
                  selectedValue === option && styles.modalOptionTextSelected
                ]}>
                  {option}
                </Text>
                {selectedValue === option && (
                  <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepSubtitle}>Tell us about yourself</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Full Name *</Text>
        <TextInput
          style={styles.textInput}
          value={personalInfo.fullName}
          onChangeText={(value) => updatePersonalInfo('fullName', value)}
          placeholder="Enter your full name"
          placeholderTextColor={COLORS.lightGray}
        />
      </View>

      <View style={styles.inputRow}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.inputLabel}>Phone Number *</Text>
          <TextInput
            style={styles.textInput}
            value={personalInfo.phoneNumber}
            onChangeText={(value) => updatePersonalInfo('phoneNumber', value)}
            placeholder="+91 9876543210"
            placeholderTextColor={COLORS.lightGray}
            keyboardType="phone-pad"
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
          <Text style={styles.inputLabel}>Gender</Text>
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setShowGenderModal(true)}
          >
            <Text style={styles.dropdownValue}>{personalInfo.gender || 'Select Gender'}</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>

      {renderModal(
        showGenderModal,
        () => setShowGenderModal(false),
        'Select Gender',
        genderOptions,
        (value) => updatePersonalInfo('gender', value),
        personalInfo.gender
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={personalInfo.email}
          onChangeText={(value) => updatePersonalInfo('email', value)}
          placeholder="your.email@example.com"
          placeholderTextColor={COLORS.lightGray}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Complete Address</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          value={personalInfo.address}
          onChangeText={(value) => updatePersonalInfo('address', value)}
          placeholder="House/Plot number, Street, Area"
          placeholderTextColor={COLORS.lightGray}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.inputRow}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.inputLabel}>Village *</Text>
          <TextInput
            style={styles.textInput}
            value={personalInfo.village}
            onChangeText={(value) => updatePersonalInfo('village', value)}
            placeholder="Village name"
            placeholderTextColor={COLORS.lightGray}
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
          <Text style={styles.inputLabel}>Pincode</Text>
          <TextInput
            style={styles.textInput}
            value={personalInfo.pincode}
            onChangeText={(value) => updatePersonalInfo('pincode', value)}
            placeholder="123456"
            placeholderTextColor={COLORS.lightGray}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.inputLabel}>District *</Text>
          <TextInput
            style={styles.textInput}
            value={personalInfo.district}
            onChangeText={(value) => updatePersonalInfo('district', value)}
            placeholder="District name"
            placeholderTextColor={COLORS.lightGray}
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
          <Text style={styles.inputLabel}>State *</Text>
          <TextInput
            style={styles.textInput}
            value={personalInfo.state}
            onChangeText={(value) => updatePersonalInfo('state', value)}
            placeholder="State name"
            placeholderTextColor={COLORS.lightGray}
          />
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Farm Information</Text>
      <Text style={styles.stepSubtitle}>Details about your farming land</Text>

      {farms.map((farm, farmIndex) => (
        <View key={farm.id} style={styles.farmCard}>
          <View style={styles.farmHeader}>
            <Text style={styles.farmTitle}>Farm {farmIndex + 1}</Text>
            {farms.length > 1 && (
              <TouchableOpacity
                onPress={() => removeFarm(farm.id)}
                style={styles.removeFarmButton}
              >
                <Ionicons name="trash-outline" size={20} color={COLORS.error} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Farm Name *</Text>
            <TextInput
              style={styles.textInput}
              value={farm.farmName}
              onChangeText={(value) => updateFarmInfo(farmIndex, 'farmName', value)}
              placeholder="e.g., North Field, Main Farm"
              placeholderTextColor={COLORS.lightGray}
            />
          </View>

          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Total Area (Acres) *</Text>
              <TextInput
                style={styles.textInput}
                value={farm.totalArea}
                onChangeText={(value) => updateFarmInfo(farmIndex, 'totalArea', value)}
                placeholder="e.g., 3.5"
                placeholderTextColor={COLORS.lightGray}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.inputLabel}>Soil Type</Text>
              <TouchableOpacity
                style={styles.dropdownContainer}
                onPress={() => setShowSoilModal(true)}
              >
                <Text style={styles.dropdownValue}>{farm.soilType || 'Select Soil Type'}</Text>
                <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
          </View>

          {renderModal(
            showSoilModal,
            () => setShowSoilModal(false),
            'Select Soil Type',
            soilTypes,
            (value) => updateFarmInfo(currentFarmIndex, 'soilType', value),
            farms[currentFarmIndex]?.soilType || ''
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Irrigation Type</Text>
            <TouchableOpacity
              style={styles.dropdownContainer}
              onPress={() => setShowIrrigationModal(true)}
            >
              <Text style={styles.dropdownValue}>{farm.irrigationType || 'Select Irrigation Type'}</Text>
              <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

          {renderModal(
            showIrrigationModal,
            () => setShowIrrigationModal(false),
            'Select Irrigation Type',
            irrigationTypes,
            (value) => updateFarmInfo(currentFarmIndex, 'irrigationType', value),
            farms[currentFarmIndex]?.irrigationType || ''
          )}

          {/* Crops Section */}
          <View style={styles.cropsSection}>
            <View style={styles.cropsSectionHeader}>
              <Text style={styles.cropsTitle}>Crops ({farm.crops.length})</Text>
              <TouchableOpacity
                onPress={() => addCropToFarm(farmIndex)}
                style={styles.addCropButton}
              >
                <Ionicons name="add" size={20} color={COLORS.primary} />
                <Text style={styles.addCropButtonText}>Add Crop</Text>
              </TouchableOpacity>
            </View>

            {farm.crops.map((crop, cropIndex) => (
              <View key={crop.id} style={styles.cropCard}>
                <View style={styles.cropCardHeader}>
                  <Text style={styles.cropCardTitle}>Crop {cropIndex + 1}</Text>
                  <TouchableOpacity
                    onPress={() => removeCropFromFarm(farmIndex, crop.id)}
                    style={styles.removeCropButton}
                  >
                    <Ionicons name="close" size={16} color={COLORS.error} />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.inputLabel}>Crop Name *</Text>
                    <TouchableOpacity
                      style={styles.dropdownContainer}
                      onPress={() => {
                        setCurrentFarmIndex(farmIndex);
                        setCurrentCropIndex(cropIndex);
                        setShowCropSelectionModal(true);
                      }}
                    >
                      <Text style={styles.dropdownValue}>{crop.cropName || 'Select Crop'}</Text>
                      <Ionicons name="chevron-down" size={16} color={COLORS.gray} />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                    <Text style={styles.inputLabel}>Area (Acres) *</Text>
                    <TextInput
                      style={styles.textInput}
                      value={crop.areaAllocated}
                      onChangeText={(value) => updateCropInfo(farmIndex, cropIndex, 'areaAllocated', value)}
                      placeholder="1.5"
                      placeholderTextColor={COLORS.lightGray}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                {renderModal(
                  showCropSelectionModal,
                  () => setShowCropSelectionModal(false),
                  'Select Crop',
                  cropOptions,
                  (value) => updateCropInfo(currentFarmIndex, currentCropIndex, 'cropName', value),
                  farms[currentFarmIndex]?.crops[currentCropIndex]?.cropName || ''
                )}

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Variety</Text>
                  <TextInput
                    style={styles.textInput}
                    value={crop.variety}
                    onChangeText={(value) => updateCropInfo(farmIndex, cropIndex, 'variety', value)}
                    placeholder="e.g., Basmati, HD-2967"
                    placeholderTextColor={COLORS.lightGray}
                  />
                </View>

                <View style={styles.inputRow}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.inputLabel}>Sowing Date</Text>
                    <TouchableOpacity style={styles.dateInput}>
                      <Text style={styles.dateValue}>{crop.sowingDate || 'Select Date'}</Text>
                      <Ionicons name="calendar-outline" size={16} color={COLORS.gray} />
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                    <Text style={styles.inputLabel}>Expected Harvest</Text>
                    <TouchableOpacity style={styles.dateInput}>
                      <Text style={styles.dateValue}>{crop.expectedHarvest || 'Select Date'}</Text>
                      <Ionicons name="calendar-outline" size={16} color={COLORS.gray} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.purposeContainer}>
                  <Text style={styles.inputLabel}>Purpose</Text>
                  <View style={styles.purposeButtons}>
                    {['commercial', 'consumption', 'both'].map((purpose) => (
                      <TouchableOpacity
                        key={purpose}
                        style={[
                          styles.purposeButton,
                          crop.purpose === purpose && styles.purposeButtonActive
                        ]}
                        onPress={() => updateCropInfo(farmIndex, cropIndex, 'purpose', purpose)}
                      >
                        <Text style={[
                          styles.purposeButtonText,
                          crop.purpose === purpose && styles.purposeButtonTextActive
                        ]}>
                          {purpose.charAt(0).toUpperCase() + purpose.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            ))}

            {farm.crops.length === 0 && (
              <View style={styles.noCropsContainer}>
                <Ionicons name="leaf-outline" size={48} color={COLORS.lightGray} />
                <Text style={styles.noCropsText}>No crops added yet</Text>
                <Text style={styles.noCropsSubtext}>Add crops to continue</Text>
              </View>
            )}
          </View>
        </View>
      ))}

      <TouchableOpacity onPress={addNewFarm} style={styles.addFarmButton}>
        <LinearGradient
          colors={['#e8f5e8', '#d4ecd4']}
          style={styles.addFarmGradient}
        >
          <Ionicons name="add" size={24} color={COLORS.primary} />
          <Text style={styles.addFarmText}>Add Another Farm</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Livestock Information</Text>
      <Text style={styles.stepSubtitle}>Do you have any livestock? (Optional)</Text>

      <View style={styles.livestockGrid}>
        {/* Cow */}
        <View style={styles.livestockCard}>
          <View style={styles.livestockHeader}>
            <View style={styles.livestockIconContainer}>
              <Text style={styles.livestockIcon}>🐄</Text>
            </View>
            <View style={styles.livestockInfo}>
              <Text style={styles.livestockName}>Cows</Text>
              <Text style={styles.livestockDescription}>Dairy or beef cattle</Text>
            </View>
            <TouchableOpacity
              style={[styles.livestockToggle, livestock.hasCow && styles.livestockToggleActive]}
              onPress={() => updateLivestock('hasCow', !livestock.hasCow)}
            >
              <Text style={[
                styles.livestockToggleText,
                livestock.hasCow && styles.livestockToggleTextActive
              ]}>
                {livestock.hasCow ? 'YES' : 'NO'}
              </Text>
            </TouchableOpacity>
          </View>
          {livestock.hasCow && (
            <View style={styles.livestockCountContainer}>
              <Text style={styles.countLabel}>Number of cows:</Text>
              <TextInput
                style={styles.countInput}
                value={livestock.cowCount}
                onChangeText={(value) => updateLivestock('cowCount', value)}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
          )}
        </View>

        {/* Buffalo */}
        <View style={styles.livestockCard}>
          <View style={styles.livestockHeader}>
            <View style={styles.livestockIconContainer}>
              <Text style={styles.livestockIcon}>🐃</Text>
            </View>
            <View style={styles.livestockInfo}>
              <Text style={styles.livestockName}>Buffaloes</Text>
              <Text style={styles.livestockDescription}>Water buffalo</Text>
            </View>
            <TouchableOpacity
              style={[styles.livestockToggle, livestock.hasBuffalo && styles.livestockToggleActive]}
              onPress={() => updateLivestock('hasBuffalo', !livestock.hasBuffalo)}
            >
              <Text style={[
                styles.livestockToggleText,
                livestock.hasBuffalo && styles.livestockToggleTextActive
              ]}>
                {livestock.hasBuffalo ? 'YES' : 'NO'}
              </Text>
            </TouchableOpacity>
          </View>
          {livestock.hasBuffalo && (
            <View style={styles.livestockCountContainer}>
              <Text style={styles.countLabel}>Number of buffaloes:</Text>
              <TextInput
                style={styles.countInput}
                value={livestock.buffaloCount}
                onChangeText={(value) => updateLivestock('buffaloCount', value)}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
          )}
        </View>

        {/* Goat */}
        <View style={styles.livestockCard}>
          <View style={styles.livestockHeader}>
            <View style={styles.livestockIconContainer}>
              <Text style={styles.livestockIcon}>🐐</Text>
            </View>
            <View style={styles.livestockInfo}>
              <Text style={styles.livestockName}>Goats</Text>
              <Text style={styles.livestockDescription}>Goat farming</Text>
            </View>
            <TouchableOpacity
              style={[styles.livestockToggle, livestock.hasGoat && styles.livestockToggleActive]}
              onPress={() => updateLivestock('hasGoat', !livestock.hasGoat)}
            >
              <Text style={[
                styles.livestockToggleText,
                livestock.hasGoat && styles.livestockToggleTextActive
              ]}>
                {livestock.hasGoat ? 'YES' : 'NO'}
              </Text>
            </TouchableOpacity>
          </View>
          {livestock.hasGoat && (
            <View style={styles.livestockCountContainer}>
              <Text style={styles.countLabel}>Number of goats:</Text>
              <TextInput
                style={styles.countInput}
                value={livestock.goatCount}
                onChangeText={(value) => updateLivestock('goatCount', value)}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
          )}
        </View>

        {/* Poultry */}
        <View style={styles.livestockCard}>
          <View style={styles.livestockHeader}>
            <View style={styles.livestockIconContainer}>
              <Text style={styles.livestockIcon}>🐔</Text>
            </View>
            <View style={styles.livestockInfo}>
              <Text style={styles.livestockName}>Poultry</Text>
              <Text style={styles.livestockDescription}>Chickens, ducks, etc.</Text>
            </View>
            <TouchableOpacity
              style={[styles.livestockToggle, livestock.hasPoultry && styles.livestockToggleActive]}
              onPress={() => updateLivestock('hasPoultry', !livestock.hasPoultry)}
            >
              <Text style={[
                styles.livestockToggleText,
                livestock.hasPoultry && styles.livestockToggleTextActive
              ]}>
                {livestock.hasPoultry ? 'YES' : 'NO'}
              </Text>
            </TouchableOpacity>
          </View>
          {livestock.hasPoultry && (
            <View style={styles.livestockCountContainer}>
              <Text style={styles.countLabel}>Number of birds:</Text>
              <TextInput
                style={styles.countInput}
                value={livestock.poultryCount}
                onChangeText={(value) => updateLivestock('poultryCount', value)}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
          )}
        </View>

        {/* Other */}
        <View style={styles.livestockCard}>
          <View style={styles.livestockHeader}>
            <View style={styles.livestockIconContainer}>
              <Text style={styles.livestockIcon}>🐑</Text>
            </View>
            <View style={styles.livestockInfo}>
              <Text style={styles.livestockName}>Other Livestock</Text>
              <Text style={styles.livestockDescription}>Sheep, pigs, etc.</Text>
            </View>
            <TouchableOpacity
              style={[styles.livestockToggle, livestock.hasOther && styles.livestockToggleActive]}
              onPress={() => updateLivestock('hasOther', !livestock.hasOther)}
            >
              <Text style={[
                styles.livestockToggleText,
                livestock.hasOther && styles.livestockToggleTextActive
              ]}>
                {livestock.hasOther ? 'YES' : 'NO'}
              </Text>
            </TouchableOpacity>
          </View>
          {livestock.hasOther && (
            <View style={styles.livestockCountContainer}>
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                  <Text style={styles.countLabel}>Type:</Text>
                  <TextInput
                    style={styles.countInput}
                    value={livestock.otherType}
                    onChangeText={(value) => updateLivestock('otherType', value)}
                    placeholder="e.g., Sheep"
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                  <Text style={styles.countLabel}>Count:</Text>
                  <TextInput
                    style={styles.countInput}
                    value={livestock.otherCount}
                    onChangeText={(value) => updateLivestock('otherCount', value)}
                    placeholder="0"
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Additional Information</Text>
      <Text style={styles.stepSubtitle}>Help us serve you better</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Farming Experience *</Text>
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setShowExperienceModal(true)}
        >
          <Text style={styles.dropdownValue}>{additionalInfo.experience || 'Select Experience Level'}</Text>
          <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      {renderModal(
        showExperienceModal,
        () => setShowExperienceModal(false),
        'Select Experience',
        experienceOptions,
        (value) => updateAdditionalInfo('experience', value),
        additionalInfo.experience
      )}

      <View style={styles.inputRow}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.inputLabel}>Primary Income Source *</Text>
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setShowIncomeModal(true)}
          >
            <Text style={styles.dropdownValue}>{additionalInfo.primaryIncome || 'Select Income'}</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
        <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
          <Text style={styles.inputLabel}>Annual Income Range</Text>
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setShowIncomeModal(true)}
          >
            <Text style={styles.dropdownValue}>{additionalInfo.annualIncome || 'Select Range'}</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>

      {renderModal(
        showIncomeModal,
        () => setShowIncomeModal(false),
        'Select Income Range',
        incomeRanges,
        (value) => updateAdditionalInfo('annualIncome', value),
        additionalInfo.annualIncome
      )}

      <View style={styles.bankingSection}>
        <Text style={styles.sectionTitle}>Banking Information</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Bank Account Number *</Text>
          <TextInput
            style={styles.textInput}
            value={additionalInfo.bankAccount}
            onChangeText={(value) => updateAdditionalInfo('bankAccount', value)}
            placeholder="Enter your bank account number"
            placeholderTextColor={COLORS.lightGray}
            keyboardType="numeric"
            secureTextEntry
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>IFSC Code</Text>
          <TextInput
            style={styles.textInput}
            value={additionalInfo.ifscCode}
            onChangeText={(value) => updateAdditionalInfo('ifscCode', value)}
            placeholder="e.g., SBIN0001234"
            placeholderTextColor={COLORS.lightGray}
            autoCapitalize="characters"
          />
        </View>
      </View>

      <View style={styles.governmentSection}>
        <Text style={styles.sectionTitle}>Government Schemes</Text>

        <View style={styles.schemeCard}>
          <View style={styles.schemeHeader}>
            <View style={styles.schemeInfo}>
              <Text style={styles.schemeName}>Kisan Credit Card</Text>
              <Text style={styles.schemeDescription}>Do you have a Kisan Credit Card?</Text>
            </View>
            <TouchableOpacity
              style={[styles.schemeToggle, additionalInfo.hasKisanCard && styles.schemeToggleActive]}
              onPress={() => updateAdditionalInfo('hasKisanCard', !additionalInfo.hasKisanCard)}
            >
              <Text style={[
                styles.schemeToggleText,
                additionalInfo.hasKisanCard && styles.schemeToggleTextActive
              ]}>
                {additionalInfo.hasKisanCard ? 'YES' : 'NO'}
              </Text>
            </TouchableOpacity>
          </View>
          {additionalInfo.hasKisanCard && (
            <View style={styles.schemeDetails}>
              <Text style={styles.inputLabel}>Kisan Card Number</Text>
              <TextInput
                style={styles.textInput}
                value={additionalInfo.kisanCardNumber}
                onChangeText={(value) => updateAdditionalInfo('kisanCardNumber', value)}
                placeholder="Enter card number"
                placeholderTextColor={COLORS.lightGray}
                keyboardType="numeric"
              />
            </View>
          )}
        </View>

        <View style={styles.schemeCard}>
          <View style={styles.schemeHeader}>
            <View style={styles.schemeInfo}>
              <Text style={styles.schemeName}>Crop Insurance</Text>
              <Text style={styles.schemeDescription}>Do you have crop insurance?</Text>
            </View>
            <TouchableOpacity
              style={[styles.schemeToggle, additionalInfo.hasCropInsurance && styles.schemeToggleActive]}
              onPress={() => updateAdditionalInfo('hasCropInsurance', !additionalInfo.hasCropInsurance)}
            >
              <Text style={[
                styles.schemeToggleText,
                additionalInfo.hasCropInsurance && styles.schemeToggleTextActive
              ]}>
                {additionalInfo.hasCropInsurance ? 'YES' : 'NO'}
              </Text>
            </TouchableOpacity>
          </View>
          {additionalInfo.hasCropInsurance && (
            <View style={styles.schemeDetails}>
              <Text style={styles.inputLabel}>Insurance Provider</Text>
              <TextInput
                style={styles.textInput}
                value={additionalInfo.insuranceProvider}
                onChangeText={(value) => updateAdditionalInfo('insuranceProvider', value)}
                placeholder="e.g., ICICI Lombard, HDFC Ergo"
                placeholderTextColor={COLORS.lightGray}
              />
            </View>
          )}
        </View>
      </View>

      <View style={styles.preferencesSection}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Preferred Language</Text>
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setShowLanguageModal(true)}
          >
            <Text style={styles.dropdownValue}>{additionalInfo.preferredLanguage}</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        {renderModal(
          showLanguageModal,
          () => setShowLanguageModal(false),
          'Select Language',
          languages,
          (value) => updateAdditionalInfo('preferredLanguage', value),
          additionalInfo.preferredLanguage
        )}

        <View style={styles.notificationSettings}>
          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationName}>App Updates & Tips</Text>
              <Text style={styles.notificationDescription}>Receive farming tips and app updates</Text>
            </View>
            <TouchableOpacity
              style={[styles.notificationToggle, additionalInfo.receiveUpdates && styles.notificationToggleActive]}
              onPress={() => updateAdditionalInfo('receiveUpdates', !additionalInfo.receiveUpdates)}
            >
              <View style={[styles.toggleSlider, additionalInfo.receiveUpdates && styles.toggleSliderActive]} />
            </TouchableOpacity>
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationName}>Weather Alerts</Text>
              <Text style={styles.notificationDescription}>Get weather warnings and forecasts</Text>
            </View>
            <TouchableOpacity
              style={[styles.notificationToggle, additionalInfo.receiveWeatherAlerts && styles.notificationToggleActive]}
              onPress={() => updateAdditionalInfo('receiveWeatherAlerts', !additionalInfo.receiveWeatherAlerts)}
            >
              <View style={[styles.toggleSlider, additionalInfo.receiveWeatherAlerts && styles.toggleSliderActive]} />
            </TouchableOpacity>
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationName}>Join Community</Text>
              <Text style={styles.notificationDescription}>Connect with other farmers</Text>
            </View>
            <TouchableOpacity
              style={[styles.notificationToggle, additionalInfo.joinCommunity && styles.notificationToggleActive]}
              onPress={() => updateAdditionalInfo('joinCommunity', !additionalInfo.joinCommunity)}
            >
              <View style={[styles.toggleSlider, additionalInfo.joinCommunity && styles.toggleSliderActive]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />

      <LinearGradient
        colors={[COLORS.secondary, '#e0ece0']}
        style={styles.backgroundGradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => currentStep > 1 ? prevStep() : navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Farmer Registration</Text>
            <Text style={styles.headerSubtitle}>Step {currentStep} of 4</Text>
          </View>

          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form Content */}
        <ScrollView
          style={styles.formContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formContent}
        >
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          {currentStep > 1 && (
            <TouchableOpacity onPress={prevStep} style={styles.prevButton}>
              <Text style={styles.prevButtonText}>Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={nextStep} style={styles.nextButton}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.lightPrimary]}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>
                {currentStep === 4 ? 'Complete Registration' : 'Next Step'}
              </Text>
              <Ionicons
                name={currentStep === 4 ? "checkmark" : "arrow-forward"}
                size={20}
                color={COLORS.white}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  backgroundGradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 2,
  },
  helpButton: {
    padding: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: COLORS.lightPrimary,
  },
  stepCircleCurrent: {
    backgroundColor: COLORS.primary,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  stepNumber: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  stepNumberActive: {
    color: COLORS.white,
  },
  stepLine: {
    width: 60,
    height: 2,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 10,
  },
  stepLineActive: {
    backgroundColor: COLORS.lightPrimary,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContent: {
    paddingBottom: 20,
  },
  stepContent: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 24,
    color: COLORS.darkGray,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stepSubtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.darkGray,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: COLORS.darkGray,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  dropdownValue: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  farmCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  farmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  farmTitle: {
    fontSize: 18,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  removeFarmButton: {
    padding: 8,
    backgroundColor: '#fef2f2',
    borderRadius: 20,
  },
  cropsSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  cropsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cropsTitle: {
    fontSize: 16,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  addCropButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addCropButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginLeft: 5,
  },
  cropCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cropCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cropCardTitle: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '600',
  },
  removeCropButton: {
    padding: 4,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
  },
  dateInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateValue: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  purposeContainer: {
    marginTop: 10,
  },
  purposeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  purposeButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  purposeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  purposeButtonText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  purposeButtonTextActive: {
    color: COLORS.white,
  },
  noCropsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noCropsText: {
    fontSize: 16,
    color: COLORS.lightGray,
    fontWeight: '500',
    marginTop: 15,
  },
  noCropsSubtext: {
    fontSize: 14,
    color: '#d1d5db',
    marginTop: 5,
  },
  addFarmButton: {
    borderRadius: 15,
    marginTop: 10,
  },
  addFarmGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  addFarmText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  livestockGrid: {
    gap: 15,
  },
  livestockCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  livestockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  livestockIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  livestockIcon: {
    fontSize: 24,
  },
  livestockInfo: {
    flex: 1,
  },
  livestockName: {
    fontSize: 16,
    color: COLORS.darkGray,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  livestockDescription: {
    fontSize: 12,
    color: COLORS.gray,
  },
  livestockToggle: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  livestockToggleActive: {
    backgroundColor: COLORS.primary,
  },
  livestockToggleText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  livestockToggleTextActive: {
    color: COLORS.white,
  },
  livestockCountContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  countLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  countInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: COLORS.darkGray,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.darkGray,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bankingSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  governmentSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  schemeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  schemeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  schemeInfo: {
    flex: 1,
  },
  schemeName: {
    fontSize: 16,
    color: COLORS.darkGray,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  schemeDescription: {
    fontSize: 14,
    color: COLORS.gray,
  },
  schemeToggle: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  schemeToggleActive: {
    backgroundColor: COLORS.primary,
  },
  schemeToggleText: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  schemeToggleTextActive: {
    color: COLORS.white,
  },
  schemeDetails: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  preferencesSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  notificationSettings: {
    gap: 15,
    marginTop: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationName: {
    fontSize: 16,
    color: COLORS.darkGray,
    fontWeight: '600',
    marginBottom: 2,
  },
  notificationDescription: {
    fontSize: 12,
    color: COLORS.gray,
  },
  notificationToggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e5e7eb',
    padding: 2,
    justifyContent: 'center',
  },
  notificationToggleActive: {
    backgroundColor: COLORS.primary,
  },
  toggleSlider: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toggleSliderActive: {
    alignSelf: 'flex-end',
  },
  navigationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  prevButton: {
    flex: 0.3,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  prevButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  nextButton: {
    flex: 0.7,
    borderRadius: 12,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
  },
  nextButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalTitle: {
    fontSize: 18,
    color: COLORS.darkGray,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  modalOptions: {
    maxHeight: 400,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalOptionSelected: {
    backgroundColor: '#f0f9f0',
  },
  modalOptionText: {
    fontSize: 16,
    color: COLORS.darkGray,
  },
  modalOptionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default FarmerRegistration;