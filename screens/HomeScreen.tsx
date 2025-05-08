import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Animated,
  Easing
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';

// Theme imports
import { Theme } from '../themes/theme';
import { makeStyles, TextStyles } from '../themes/styles';

const API_KEY = 'a658d190c1a510fd7033032174db0e33';

// Weather animations from LottieFiles
const WEATHER_ANIMATIONS = {
  Clear: 'https://assets5.lottiefiles.com/packages/lf20_6ghycw4h.json',
  Rain: 'https://assets5.lottiefiles.com/packages/lf20_kcsr6fcp.json',
  Clouds: 'https://assets5.lottiefiles.com/packages/lf20_1pxqjqps.json',
  Thunderstorm: 'https://assets5.lottiefiles.com/packages/lf20_hu9cd9.json',
  Snow: 'https://assets5.lottiefiles.com/packages/lf20_6xfdtjzb.json',
  Mist: 'https://assets5.lottiefiles.com/packages/lf20_hu9cd9.json',
  Default: 'https://assets5.lottiefiles.com/packages/lf20_1pxqjqps.json'
};

// Farmer's favorite crops data
const favoriteCrops = [
  { id: 1, name: 'Wheat', icon: '🌾', diseaseCount: 2 },
  { id: 2, name: 'Rice', icon: '🍚', diseaseCount: 1 },
  { id: 3, name: 'Tomato', icon: '🍅', diseaseCount: 3 },
  { id: 4, name: 'Potato', icon: '🥔', diseaseCount: 0 },
];

// Essential tools data
const essentialTools = [
  { id: 1, title: 'Disease Scan', icon: 'camera', screen: 'DiseaseDetection', color: Theme.colors.accent },
  { id: 2, title: 'Ask Agri AI', icon: 'robot', screen: 'AskAI', color: Theme.colors.info },
];

// Dashboard categories data
const farmingCategories = [
  { id: 1, title: 'Vedic Farming', icon: 'om', screen: 'VedicGuide' },
  { id: 2, title: 'Fertilizers', icon: 'flask', screen: 'Fertilizer' },
  { id: 3, title: 'Crop Guide', icon: 'seedling', screen: 'CropGuide' },
  { id: 4, title: 'Market Prices', icon: 'chart-line', screen: 'MarketPrices' },
  { id: 5, title: 'Soil Health', icon: 'leaf', screen: 'SoilInfo' },
  { id: 6, title: 'Irrigation', icon: 'tint', screen: 'Irrigation' },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [locationName, setLocationName] = useState('Your Farm');
  const [locationError, setLocationError] = useState('');
  const [animationProgress] = useState(new Animated.Value(0));

  // Initialize styles with theme
  const styles = makeStyles(Theme);
  const textStyles = TextStyles(Theme);

  // Animation for weather icon
  useEffect(() => {
    Animated.loop(
      Animated.timing(animationProgress, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Get permission for location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationError('Location permission denied');
          setLoadingWeather(false);
          return;
        }

        // Get current location
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Get location name
        const geoLocation = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (geoLocation && geoLocation.length > 0) {
          const place = geoLocation[0];
          const nameParts = [
            place.city,
            place.subregion,
            place.region,
            place.country
          ].filter(Boolean);
          setLocationName(nameParts.join(', ') || 'Your Farm');
        }

        // Fetch weather data
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLocationError('Could not fetch weather data');
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, []);

  // Extract weather information
  const weatherCondition = weatherData?.weather?.[0]?.main || 'Clear';
  const temperature = weatherData?.main?.temp ? Math.round(weatherData.main.temp) : '--';
  const windSpeed = weatherData?.wind?.speed ? (weatherData.wind.speed * 3.6).toFixed(1) : '--';
  const humidity = weatherData?.main?.humidity || '--';
  const rainProbability = weatherData?.rain?.['1h'] ? `${Math.round(weatherData.rain['1h'] * 100)}%` : '0%';
  const feelsLike = weatherData?.main?.feels_like ? Math.round(weatherData.main.feels_like) : '--';

  // Weather alerts based on conditions
  const weatherAlerts = [];
  if (weatherCondition === 'Thunderstorm') {
    weatherAlerts.push('Thunderstorm warning - secure loose items');
  }
  if (parseFloat(windSpeed) > 30) {
    weatherAlerts.push('High winds expected - protect delicate crops');
  }
  if (weatherCondition === 'Rain' && parseFloat(rainProbability) > 50) {
    weatherAlerts.push('Heavy rain expected - check drainage');
  }
  if (parseFloat(temperature) > 35) {
    weatherAlerts.push('Heat warning - water crops more frequently');
  }
  if (parseFloat(temperature) < 5) {
    weatherAlerts.push('Frost warning - protect sensitive plants');
  }

  // Get weather animation based on condition
  const getWeatherAnimation = (condition: string) => {
    return WEATHER_ANIMATIONS[condition as keyof typeof WEATHER_ANIMATIONS] || WEATHER_ANIMATIONS.Default;
  };

  // Render weather animation with appropriate style
  const renderWeatherAnimation = () => {
    const animationStyle = {
      transform: [
        {
          translateX: animationProgress.interpolate({
            inputRange: [0, 1],
            outputRange: weatherCondition === 'Clear' ? [0, 20] : 
                         weatherCondition === 'Rain' ? [0, -10] : 
                         weatherCondition === 'Thunderstorm' ? [0, 30] : [0, 0]
          })
        }
      ]
    };

    return (
      <Animated.View style={[styles.weatherAnimationContainer, animationStyle]}>
        <LottieView
          source={{ uri: getWeatherAnimation(weatherCondition) }}
          autoPlay
          loop
          style={styles.weatherAnimation}
        />
      </Animated.View>
    );
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      {/* Static Header with Search */}
      <View style={styles.staticHeader}>
        <View style={styles.headerTextBlock}>
          <Text style={textStyles.greeting}>Hello Farmer 👋</Text>
          <Text style={textStyles.subtitle}>Welcome to your farming companion</Text>
        </View>
        
        <TextInput
          style={styles.searchInput}
          placeholder="Search crops, diseases, solutions..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={Theme.colors.textTertiary}
        />
        
        {/* Always visible essential tools */}
        <View style={styles.essentialTools}>
          {essentialTools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={[styles.essentialToolCard, { backgroundColor: tool.color }]}
              onPress={() => navigation.navigate(tool.screen)}
            >
              <FontAwesome5 name={tool.icon} size={20} color="white" />
              <Text style={textStyles.essentialToolText}>{tool.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Enhanced Weather Section */}
        <View style={styles.weatherContainer}>
          {loadingWeather ? (
            <ActivityIndicator size="small" color={Theme.colors.primary} />
          ) : locationError ? (
            <View style={styles.center}>
              <Ionicons name="warning" size={20} color={Theme.colors.dangerLight} />
              <Text style={textStyles.weatherErrorText}>{locationError}</Text>
            </View>
          ) : (
            <>
              {/* Large Weather Animation */}
              <View style={styles.weatherAnimationWrapper}>
                {renderWeatherAnimation()}
              </View>

              {/* Weather Details */}
              <View style={styles.weatherDetailsCard}>
                <View style={styles.weatherLocationContainer}>
                  <Ionicons name="location" size={16} color={Theme.colors.primary} />
                  <Text style={textStyles.weatherLocationText}>{locationName}</Text>
                </View>

                <View style={styles.weatherInfoContainer}>
                  <View style={styles.weatherMainInfo}>
                    <Text style={textStyles.weatherTemp}>{temperature}°</Text>
                    <Text style={textStyles.weatherCondition}>{weatherCondition}</Text>
                  </View>

                  <View style={styles.weatherStats}>
                    <View style={styles.weatherStat}>
                      <Ionicons name="water-outline" size={16} color={Theme.colors.primary} />
                      <Text style={textStyles.weatherStatText}>{humidity}%</Text>
                    </View>
                    <View style={styles.weatherStat}>
                      <Ionicons name="speedometer-outline" size={16} color={Theme.colors.primary} />
                      <Text style={textStyles.weatherStatText}>{windSpeed} km/h</Text>
                    </View>
                    <View style={styles.weatherStat}>
                      <Ionicons name="rainy-outline" size={16} color={Theme.colors.primary} />
                      <Text style={textStyles.weatherStatText}>{rainProbability}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Weather Alerts */}
        {weatherAlerts.length > 0 && (
          <View style={styles.alertCard}>
            <Ionicons name="warning" size={24} color={Theme.colors.dangerLight} />
            <View style={styles.alertTextContainer}>
              <Text style={textStyles.alertTitle}>Weather Alerts</Text>
              {weatherAlerts.map((alert, index) => (
                <Text key={index} style={textStyles.alertText}>• {alert}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Favorite Crops Section */}
        <Text style={textStyles.sectionTitle}>Your Favorite Crops</Text>
        <View style={styles.grid2}>
          {favoriteCrops.map((crop) => (
            <TouchableOpacity 
              key={crop.id} 
              style={styles.cropCard}
              onPress={() => navigation.navigate('CropDetails', { cropName: crop.name })}
            >
              <Text style={styles.cropIcon}>{crop.icon}</Text>
              <Text style={textStyles.cropName}>{crop.name}</Text>
              {crop.diseaseCount > 0 && (
                <View style={styles.diseaseBadge}>
                  <Text style={textStyles.diseaseBadgeText}>{crop.diseaseCount} alert{crop.diseaseCount > 1 ? 's' : ''}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Farming Categories */}
        <Text style={textStyles.sectionTitle}>Farming Solutions</Text>
        <View style={styles.grid2}>
          {farmingCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate(category.screen)}
            >
              <FontAwesome5 name={category.icon} size={24} color={Theme.colors.primary} />
              <Text style={textStyles.categoryText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Vedic Tip of the Day */}
        <Text style={textStyles.sectionTitle}>Vedic Wisdom</Text>
        <View style={styles.vedicCard}>
          <Image 
            source={{ uri: 'https://i.ibb.co/6n0hL3V/vedic.png' }} 
            style={styles.vedicIcon}
          />
          <View style={styles.vedicTextContainer}>
            <Text style={textStyles.vedicTitle}>Today's Planting Tip</Text>
            <Text style={textStyles.vedicText}>
              According to Vedic astrology, today is favorable for sowing leafy vegetables 
              as the moon is in a water sign. Consider using neem-based pest control.
            </Text>
          </View>
        </View>

        {/* Disease Alert */}
        <Text style={textStyles.sectionTitle}>Health Alerts</Text>
        <View style={styles.diseaseAlertCard}>
          <Image 
            source={{ uri: 'https://i.ibb.co/4W2yYyJ/alert.png' }} 
            style={styles.alertIcon}
          />
          <View style={styles.alertTextContainer}>
            <Text style={textStyles.alertTitle}>Wheat Rust Detected</Text>
            <Text style={textStyles.alertText}>
              Several cases of wheat stem rust reported in your district. Check your crops 
              for yellow-orange pustules on stems and leaves.
            </Text>
            <TouchableOpacity 
              style={styles.alertButton}
              onPress={() => navigation.navigate('DiseaseDetection')}
            >
              <Text style={textStyles.alertButtonText}>Scan Your Crops</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}