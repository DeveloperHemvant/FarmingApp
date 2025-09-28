import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Switch,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface SettingItem {
    id: string;
    title: string;
    subtitle?: string;
    type: 'toggle' | 'navigate' | 'action';
    icon: string;
    value?: boolean;
    action?: () => void;
    navigateTo?: string;
}

interface SettingSection {
    title: string;
    items: SettingItem[];
}

const SettingsScreen: React.FC = () => {
    const [language, setLanguage] = useState('en');
    const [notifications, setNotifications] = useState({
        push: true,
        email: false,
        sms: true,
        weatherAlerts: true,
        cropReminders: true,
        aiTips: true,
        communityUpdates: false,
    });

    const [preferences, setPreferences] = useState({
        darkMode: false,
        autoSync: true,
        dataCollection: true,
        locationTracking: true,
        biometricAuth: false,
    });

    const handleNavigation = (screen: string) => {
        console.log(`Navigate to ${screen}`);
    };

    const handleToggle = (section: string, key: string) => {
        if (section === 'notifications') {
            setNotifications({ ...notifications, [key]: !notifications[key] });
        } else if (section === 'preferences') {
            setPreferences({ ...preferences, [key]: !preferences[key] });
        }
    };

    const handleLanguageChange = () => {
        const newLanguage = language === 'en' ? 'hi' : 'en';
        setLanguage(newLanguage);
        Alert.alert(
            'Language Changed',
            `Language changed to ${newLanguage === 'en' ? 'English' : 'Hindi'}`,
            [{ text: 'OK' }]
        );
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                        console.log('User logged out');
                        handleNavigation('Login');
                    }
                }
            ]
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'This action cannot be undone. All your data will be permanently deleted.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        console.log('Account deletion requested');
                        handleNavigation('Login');
                    }
                }
            ]
        );
    };

    const handleBackup = () => {
        Alert.alert(
            'Backup Data',
            'Your farm data will be backed up to cloud storage.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Backup',
                    onPress: () => {
                        console.log('Backup initiated');
                        Alert.alert('Success', 'Data backup completed successfully!');
                    }
                }
            ]
        );
    };

    const handleRestore = () => {
        Alert.alert(
            'Restore Data',
            'This will replace your current data with the backed up version.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Restore',
                    onPress: () => {
                        console.log('Restore initiated');
                        Alert.alert('Success', 'Data restored successfully!');
                    }
                }
            ]
        );
    };

    const settingSections: SettingSection[] = [
        {
            title: 'General',
            items: [
                {
                    id: 'language',
                    title: 'Language',
                    subtitle: language === 'en' ? 'English' : 'हिंदी',
                    type: 'action',
                    icon: 'language',
                    action: handleLanguageChange,
                },
                {
                    id: 'profile',
                    title: 'Edit Profile',
                    subtitle: 'Update your personal information',
                    type: 'navigate',
                    icon: 'person',
                    navigateTo: 'EditProfile',
                },
                {
                    id: 'farmDetails',
                    title: 'Farm Details',
                    subtitle: 'Manage your farm information',
                    type: 'navigate',
                    icon: 'leaf',
                    navigateTo: 'FarmDetails',
                },
            ],
        },
        {
            title: 'Notifications',
            items: [
                {
                    id: 'pushNotifications',
                    title: 'Push Notifications',
                    subtitle: 'Receive app notifications',
                    type: 'toggle',
                    icon: 'notifications',
                    value: notifications.push,
                },
                {
                    id: 'emailNotifications',
                    title: 'Email Notifications',
                    subtitle: 'Receive updates via email',
                    type: 'toggle',
                    icon: 'mail',
                    value: notifications.email,
                },
                {
                    id: 'smsNotifications',
                    title: 'SMS Notifications',
                    subtitle: 'Receive SMS alerts',
                    type: 'toggle',
                    icon: 'chatbubble',
                    value: notifications.sms,
                },
                {
                    id: 'weatherAlerts',
                    title: 'Weather Alerts',
                    subtitle: 'Critical weather notifications',
                    type: 'toggle',
                    icon: 'cloudy',
                    value: notifications.weatherAlerts,
                },
                {
                    id: 'cropReminders',
                    title: 'Crop Reminders',
                    subtitle: 'Farming task reminders',
                    type: 'toggle',
                    icon: 'alarm',
                    value: notifications.cropReminders,
                },
                {
                    id: 'aiTips',
                    title: 'AI Tips',
                    subtitle: 'AI-generated recommendations',
                    type: 'toggle',
                    icon: 'bulb',
                    value: notifications.aiTips,
                },
                {
                    id: 'communityUpdates',
                    title: 'Community Updates',
                    subtitle: 'Updates from farming community',
                    type: 'toggle',
                    icon: 'people',
                    value: notifications.communityUpdates,
                },
            ],
        },
        {
            title: 'Preferences',
            items: [
                {
                    id: 'darkMode',
                    title: 'Dark Mode',
                    subtitle: 'Use dark theme',
                    type: 'toggle',
                    icon: 'moon',
                    value: preferences.darkMode,
                },
                {
                    id: 'autoSync',
                    title: 'Auto Sync',
                    subtitle: 'Automatically sync data',
                    type: 'toggle',
                    icon: 'sync',
                    value: preferences.autoSync,
                },
                {
                    id: 'dataCollection',
                    title: 'Data Collection',
                    subtitle: 'Help improve AI recommendations',
                    type: 'toggle',
                    icon: 'analytics',
                    value: preferences.dataCollection,
                },
                {
                    id: 'locationTracking',
                    title: 'Location Tracking',
                    subtitle: 'Enable location-based features',
                    type: 'toggle',
                    icon: 'location',
                    value: preferences.locationTracking,
                },
                {
                    id: 'biometricAuth',
                    title: 'Biometric Authentication',
                    subtitle: 'Use fingerprint or face unlock',
                    type: 'toggle',
                    icon: 'finger-print',
                    value: preferences.biometricAuth,
                },
            ],
        },
        {
            title: 'Data & Storage',
            items: [
                {
                    id: 'backup',
                    title: 'Backup Data',
                    subtitle: 'Save your data to cloud',
                    type: 'action',
                    icon: 'cloud-upload',
                    action: handleBackup,
                },
                {
                    id: 'restore',
                    title: 'Restore Data',
                    subtitle: 'Restore from backup',
                    type: 'action',
                    icon: 'cloud-download',
                    action: handleRestore,
                },
                {
                    id: 'storage',
                    title: 'Storage Usage',
                    subtitle: 'Manage app storage',
                    type: 'navigate',
                    icon: 'folder',
                    navigateTo: 'StorageUsage',
                },
                {
                    id: 'clearCache',
                    title: 'Clear Cache',
                    subtitle: 'Free up storage space',
                    type: 'action',
                    icon: 'trash',
                    action: () => Alert.alert('Success', 'Cache cleared successfully!'),
                },
            ],
        },
        {
            title: 'Support & About',
            items: [
                {
                    id: 'help',
                    title: 'Help & Support',
                    subtitle: 'Get help and contact support',
                    type: 'navigate',
                    icon: 'help-circle',
                    navigateTo: 'Help',
                },
                {
                    id: 'feedback',
                    title: 'Send Feedback',
                    subtitle: 'Help us improve the app',
                    type: 'navigate',
                    icon: 'chatbubble-ellipses',
                    navigateTo: 'Feedback',
                },
                {
                    id: 'privacy',
                    title: 'Privacy Policy',
                    subtitle: 'Read our privacy policy',
                    type: 'navigate',
                    icon: 'shield-checkmark',
                    navigateTo: 'Privacy',
                },
                {
                    id: 'terms',
                    title: 'Terms of Service',
                    subtitle: 'Read terms and conditions',
                    type: 'navigate',
                    icon: 'document-text',
                    navigateTo: 'Terms',
                },
                {
                    id: 'about',
                    title: 'About KrishiGPT',
                    subtitle: 'Version 1.0.0',
                    type: 'navigate',
                    icon: 'information-circle',
                    navigateTo: 'About',
                },
            ],
        },
        {
            title: 'Account',
            items: [
                {
                    id: 'logout',
                    title: 'Logout',
                    subtitle: 'Sign out of your account',
                    type: 'action',
                    icon: 'log-out',
                    action: handleLogout,
                },
                {
                    id: 'deleteAccount',
                    title: 'Delete Account',
                    subtitle: 'Permanently delete your account',
                    type: 'action',
                    icon: 'trash',
                    action: handleDeleteAccount,
                },
            ],
        },
    ];

    const renderSettingItem = (item: SettingItem, sectionTitle: string) => {
        const isDestructive = item.id === 'logout' || item.id === 'deleteAccount';

        return (
            <TouchableOpacity
                key={item.id}
                style={[styles.settingItem, isDestructive && styles.destructiveItem]}
                onPress={() => {
                    if (item.type === 'navigate') {
                        handleNavigation(item.navigateTo || '');
                    } else if (item.type === 'action' && item.action) {
                        item.action();
                    }
                }}
                activeOpacity={0.7}
            >
                <View style={styles.settingItemLeft}>
                    <View style={[
                        styles.settingIcon,
                        isDestructive && styles.destructiveIcon
                    ]}>
                        <Ionicons
                            name={item.icon as any}
                            size={20}
                            color={isDestructive ? '#ef4444' : '#059669'}
                        />
                    </View>
                    <View style={styles.settingText}>
                        <Text style={[
                            styles.settingTitle,
                            isDestructive && styles.destructiveText
                        ]}>
                            {item.title}
                        </Text>
                        {item.subtitle && (
                            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.settingItemRight}>
                    {item.type === 'toggle' && (
                        <Switch
                            value={item.value}
                            onValueChange={() => {
                                if (sectionTitle === 'Notifications') {
                                    handleToggle('notifications', item.id.replace('Notifications', '').replace(/^[a-z]/, c => c.toLowerCase()));
                                } else if (sectionTitle === 'Preferences') {
                                    handleToggle('preferences', item.id);
                                }
                            }}
                            trackColor={{ false: '#e5e7eb', true: '#86efac' }}
                            thumbColor={item.value ? '#059669' : '#f9fafb'}
                        />
                    )}
                    {item.type !== 'toggle' && (
                        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0fdf4" />

            <LinearGradient
                colors={['#f0fdf4', '#dcfce7', '#bbf7d0']}
                style={styles.backgroundGradient}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => handleNavigation('Back')}>
                        <Ionicons name="arrow-back" size={24} color="#059669" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Settings</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <LinearGradient
                        colors={['#059669', '#10b981']}
                        style={styles.profileGradient}
                    >
                        <View style={styles.profileInfo}>
                            <View style={styles.profileAvatar}>
                                <Text style={styles.profileEmoji}>👨‍🌾</Text>
                            </View>
                            <View style={styles.profileText}>
                                <Text style={styles.profileName}>Rajesh Singh</Text>
                                <Text style={styles.profileRole}>Organic Farmer</Text>
                                <Text style={styles.profileLocation}>📍 Chandigarh, Punjab</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.editProfileButton}
                            onPress={() => handleNavigation('EditProfile')}
                        >
                            <Ionicons name="pencil" size={16} color="white" />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {settingSections.map((section, sectionIndex) => (
                        <View key={sectionIndex} style={styles.settingSection}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            <View style={styles.settingCard}>
                                {section.items.map((item, itemIndex) => (
                                    <View key={item.id}>
                                        {renderSettingItem(item, section.title)}
                                        {itemIndex < section.items.length - 1 && (
                                            <View style={styles.itemDivider} />
                                        )}
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}

                    {/* App Info */}
                    <View style={styles.appInfoSection}>
                        <View style={styles.appInfo}>
                            <Text style={styles.appName}>KrishiGPT</Text>
                            <Text style={styles.appVersion}>Version 1.0.0</Text>
                            <Text style={styles.appDescription}>
                                AI-Powered Agriculture Revolution
                            </Text>
                            <Text style={styles.appCopyright}>
                                © 2024 KrishiGPT. All rights reserved.
                            </Text>
                        </View>

                        <View style={styles.socialLinks}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-twitter" size={20} color="#1da1f2" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-facebook" size={20} color="#4267b2" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-instagram" size={20} color="#e4405f" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="globe" size={20} color="#059669" />
                            </TouchableOpacity>
                        </View>
                    </View>

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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        color: '#065f46',
        fontWeight: 'bold',
    },
    profileSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    profileGradient: {
        borderRadius: 20,
        padding: 20,
        elevation: 6,
        shadowColor: '#059669',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    profileEmoji: {
        fontSize: 28,
    },
    profileText: {
        flex: 1,
    },
    profileName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    profileRole: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        marginBottom: 2,
    },
    profileLocation: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 12,
    },
    editProfileButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    settingSection: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#065f46',
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 5,
    },
    settingCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    destructiveItem: {
        // No additional styling needed here, handled by destructiveText
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    destructiveIcon: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
    },
    settingText: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '600',
        marginBottom: 2,
    },
    destructiveText: {
        color: '#ef4444',
    },
    settingSubtitle: {
        fontSize: 12,
        color: '#6b7280',
    },
    settingItemRight: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemDivider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginLeft: 68,
    },
    appInfoSection: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    appInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    appName: {
        fontSize: 24,
        color: '#065f46',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    appVersion: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 8,
    },
    appDescription: {
        fontSize: 14,
        color: '#374151',
        textAlign: 'center',
        marginBottom: 12,
    },
    appCopyright: {
        fontSize: 12,
        color: '#9ca3af',
        textAlign: 'center',
    },
    socialLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
});

export default SettingsScreen;