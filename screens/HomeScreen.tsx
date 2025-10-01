import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
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

interface WeatherData {
  temperature: string;
  humidity: string;
  condition: string;
  icon: string;
}

interface CropData {
  id: string;
  name: string;
  stage: string;
  icon: string;
  health: 'good' | 'warning' | 'critical';
}

interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  time: string;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const weatherData: WeatherData = {
    temperature: '28°C',
    humidity: '65%',
    condition: 'Partly Cloudy',
    icon: '⛅',
  };

  const crops: CropData[] = [
    { id: '1', name: 'Wheat', stage: 'Flowering', icon: '🌾', health: 'good' },
    { id: '2', name: 'Corn', stage: 'Growing', icon: '🌽', health: 'good' },
    { id: '3', name: 'Rice', stage: 'Harvesting', icon: '🌾', health: 'warning' },
    { id: '4', name: 'Tomato', stage: 'Fruiting', icon: '🍅', health: 'good' },
  ];

  const notifications: NotificationData[] = [
    {
      id: '1',
      title: 'Weather Alert',
      message: 'Heavy rain expected tomorrow',
      type: 'warning',
      time: '2 hours ago',
    },
    {
      id: '2',
      title: 'Crop Health',
      message: 'Rice crop needs attention',
      type: 'warning',
      time: '4 hours ago',
    },
    {
      id: '3',
      title: 'AI Tip',
      message: 'Best time for wheat harvesting',
      type: 'info',
      time: '1 day ago',
    },
  ];

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen as never);
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'good': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning': return '#f59e0b';
      case 'success': return '#10b981';
      default: return COLORS.primary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />

      <LinearGradient
        colors={[COLORS.secondary, '#e0ece0']}
        style={styles.backgroundGradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.userNameText}>Farmer Singh</Text>
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => handleNavigation('Notifications')}
            >
              <Ionicons name="notifications" size={24} color={COLORS.primary} />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Weather Card */}
          <View style={styles.weatherCard}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.lightPrimary]}
              style={styles.weatherGradient}
            >
              <View style={styles.weatherHeader}>
                <Text style={styles.weatherTitle}>Today's Weather</Text>
                <Text style={styles.weatherIcon}>{weatherData.icon}</Text>
              </View>
              <View style={styles.weatherInfo}>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherValue}>{weatherData.temperature}</Text>
                  <Text style={styles.weatherLabel}>Temperature</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherValue}>{weatherData.humidity}</Text>
                  <Text style={styles.weatherLabel}>Humidity</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherValue}>{weatherData.condition}</Text>
                  <Text style={styles.weatherLabel}>Condition</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* AI Assistant & Scan Crop - Quick Access */}
          <View style={styles.quickAccessRow}>
            <TouchableOpacity
              style={styles.quickAccessCard}
              onPress={() => handleNavigation('AIChatScreen')}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.lightPrimary]}
                style={styles.quickAccessGradient}
              >
                <View style={styles.quickAccessIcon}>
                  <Ionicons name="chatbubble-ellipses" size={28} color={COLORS.white} />
                </View>
                <Text style={styles.quickAccessTitle}>Chat with AI</Text>
                <Text style={styles.quickAccessSubtitle}>Get instant farming advice</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAccessCard}
              onPress={() => handleNavigation('CropScanScreen')}
            >
              <LinearGradient
                colors={['#f59e0b', '#fbbf24']}
                style={styles.quickAccessGradient}
              >
                <View style={styles.quickAccessIcon}>
                  <Ionicons name="camera" size={28} color={COLORS.white} />
                </View>
                <Text style={styles.quickAccessTitle}>Scan Crop</Text>
                <Text style={styles.quickAccessSubtitle}>Detect diseases</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('CropManagementScreen')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#e8f5e8' }]}>
                <Text style={styles.actionEmoji}>🌱</Text>
              </View>
              <Text style={styles.actionText}>Crop Management</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('DiseaseAlertsScreen')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#fef3c7' }]}>
                <Text style={styles.actionEmoji}>🦠</Text>
              </View>
              <Text style={styles.actionText}>Disease Alerts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('Weather')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#dbeafe' }]}>
                <Text style={styles.actionEmoji}>🌤️</Text>
              </View>
              <Text style={styles.actionText}>Weather</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('AITipsScreen')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#f3e8ff' }]}>
                <Text style={styles.actionEmoji}>🤖</Text>
              </View>
              <Text style={styles.actionText}>AI Tips</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('MarketScreen')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#fce7f3' }]}>
                <Text style={styles.actionEmoji}>💰</Text>
              </View>
              <Text style={styles.actionText}>Market Prices</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('CommunityScreen')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#ecfdf5' }]}>
                <Text style={styles.actionEmoji}>👥</Text>
              </View>
              <Text style={styles.actionText}>Community</Text>
            </TouchableOpacity>
          </View>

          {/* My Crops */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Crops</Text>
            <TouchableOpacity onPress={() => handleNavigation('CropManagementScreen')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cropsScroll}>
            <View style={styles.cropsContainer}>
              {crops.map((crop) => (
                <TouchableOpacity
                  key={crop.id}
                  style={styles.cropCard}
                  onPress={() => handleNavigation('CropDetailScreen')}
                >
                  <View style={styles.cropHeader}>
                    <Text style={styles.cropIcon}>{crop.icon}</Text>
                    <View style={[styles.healthIndicator, { backgroundColor: getHealthColor(crop.health) }]} />
                  </View>
                  <Text style={styles.cropName}>{crop.name}</Text>
                  <Text style={styles.cropStage}>{crop.stage}</Text>
                  <View style={styles.cropProgress}>
                    <View style={[styles.progressBar, { width: '75%', backgroundColor: getHealthColor(crop.health) }]} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Recent Notifications */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Updates</Text>
            <TouchableOpacity onPress={() => handleNavigation('Notifications')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.notificationsContainer}>
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={styles.notificationCard}
                onPress={() => handleNavigation('NotificationDetails')}
              >
                <View style={[styles.notificationIcon, { backgroundColor: getNotificationColor(notification.type) }]}>
                  <Ionicons
                    name={notification.type === 'warning' ? 'warning' : notification.type === 'success' ? 'checkmark' : 'information'}
                    size={20}
                    color={COLORS.white}
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: '500',
  },
  userNameText: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  notificationButton: {
    position: 'relative',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  weatherCard: {
    marginBottom: 20,
    borderRadius: 20,
    elevation: 6,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  weatherGradient: {
    padding: 20,
    borderRadius: 20,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  weatherTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  weatherIcon: {
    fontSize: 24,
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherItem: {
    alignItems: 'center',
  },
  weatherValue: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  weatherLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  // Quick Access Row
  quickAccessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 15,
  },
  quickAccessCard: {
    flex: 1,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  quickAccessGradient: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  quickAccessIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickAccessTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickAccessSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  // Section Styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  // Quick Actions
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionCard: {
    width: (width - 60) / 3,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.darkGray,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Crops Section
  cropsScroll: {
    marginBottom: 25,
  },
  cropsContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  cropCard: {
    width: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 15,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cropIcon: {
    fontSize: 32,
  },
  cropName: {
    fontSize: 16,
    color: COLORS.darkGray,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cropStage: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 8,
  },
  cropProgress: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  healthIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  // Notifications
  notificationsContainer: {
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: COLORS.darkGray,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  notificationMessage: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: COLORS.lightGray,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen;