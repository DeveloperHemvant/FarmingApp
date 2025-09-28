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
  const navigation = useNavigation();
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
      default: return '#059669';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0fdf4" />

      <LinearGradient
        colors={['#f0fdf4', '#dcfce7', '#bbf7d0']}
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
              <Ionicons name="notifications" size={24} color="#059669" />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Weather Card */}
          <View style={styles.weatherCard}>
            <LinearGradient
              colors={['#059669', '#10b981']}
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

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('CropManagementScreen')}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>🌱</Text>
              </View>
              <Text style={styles.actionText}>Crop Management</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('DiseaseAlertsScreen')}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>🦠</Text>
              </View>
              <Text style={styles.actionText}>Disease Alerts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('Weather')}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>🌤️</Text>
              </View>
              <Text style={styles.actionText}>Weather</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('AITipsScreen')}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>🤖</Text>
              </View>
              <Text style={styles.actionText}>AI Tips</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('CommunityScreen')}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>👥</Text>
              </View>
              <Text style={styles.actionText}>Community</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigation('ProfileScreen')}
            >
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>👤</Text>
              </View>
              <Text style={styles.actionText}>Profile</Text>
            </TouchableOpacity>
          </View>

          {/* My Crops */}
          <Text style={styles.sectionTitle}>My Crops</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.cropsContainer}>
              {crops.map((crop) => (
                <TouchableOpacity
                  key={crop.id}
                  style={styles.cropCard}
                  onPress={() => handleNavigation('CropDetailScreen')}
                >
                  <Text style={styles.cropIcon}>{crop.icon}</Text>
                  <Text style={styles.cropName}>{crop.name}</Text>
                  <Text style={styles.cropStage}>{crop.stage}</Text>
                  <View style={[styles.healthIndicator, { backgroundColor: getHealthColor(crop.health) }]} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Recent Notifications */}
          <Text style={styles.sectionTitle}>Recent Updates</Text>
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
                    color="white"
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </TouchableOpacity>
            ))}
          </View>

          {/* AI Assistant Button */}
          <TouchableOpacity
            style={styles.aiAssistantButton}
            onPress={() => handleNavigation('AIChatScreen')}
          >
            <LinearGradient
              colors={['#059669', '#10b981', '#34d399']}
              style={styles.aiButtonGradient}

            >
              <Ionicons name="chatbubble-ellipses" size={24} color="white" />
              <Text style={styles.aiButtonText}>Ask KrishiGPT</Text>
              <Text style={styles.aiEmoji}>🤖</Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
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
    color: '#6b7280',
    fontWeight: '500',
  },
  userNameText: {
    fontSize: 24,
    color: '#065f46',
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
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  weatherCard: {
    marginBottom: 30,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#059669',
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
    color: 'white',
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  weatherLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#065f46',
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionCard: {
    width: (width - 60) / 3,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
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
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
    textAlign: 'center',
  },
  cropsContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  cropCard: {
    width: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  cropIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cropName: {
    fontSize: 16,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cropStage: {
    fontSize: 12,
    color: '#6b7280',
  },
  healthIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  notificationsContainer: {
    marginBottom: 30,
  },
  notificationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
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
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  aiAssistantButton: {
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginTop: 10,
  },
  aiButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 20,
  },
  aiButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 8,
  },
  aiEmoji: {
    fontSize: 20,
  },
});

export default HomeScreen;