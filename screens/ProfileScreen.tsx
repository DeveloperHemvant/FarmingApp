import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Dimensions,
    Switch,
    Modal,
    TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface UserStats {
    posts: number;
    followers: number;
    helpful: number;
    rating: number;
}

interface UserPost {
    id: string;
    content: string;
    timeAgo: string;
    likes: number;
    comments: number;
    category: string;
    image?: string;
}

interface SettingsItem {
    id: string;
    title: string;
    subtitle?: string;
    icon: string;
    hasToggle?: boolean;
    toggleValue?: boolean;
    hasArrow?: boolean;
}

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
    const [showEditModal, setShowEditModal] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [locationServices, setLocationServices] = useState(true);

    const userStats: UserStats = {
        posts: 12,
        followers: 48,
        helpful: 156,
        rating: 4.8
    };

    const userPosts: UserPost[] = [
        {
            id: '1',
            content: 'Just harvested my wheat crop! Yield is 20% higher than last year thanks to the new irrigation technique.',
            timeAgo: '2 hours ago',
            likes: 24,
            comments: 8,
            category: 'Success',
            image: '🌾'
        },
        {
            id: '2',
            content: 'Pro tip: Plant marigolds around your vegetable garden. They naturally repel harmful insects! 🌼',
            timeAgo: '1 day ago',
            likes: 31,
            comments: 6,
            category: 'Tip'
        },
        {
            id: '3',
            content: 'My organic tomato experiment is showing great results. Chemical-free farming is the future!',
            timeAgo: '3 days ago',
            likes: 18,
            comments: 12,
            category: 'Update',
            image: '🍅'
        },
        {
            id: '4',
            content: 'Weather alert: Prepare for heavy rains this week. Cover your crops and check drainage systems.',
            timeAgo: '1 week ago',
            likes: 42,
            comments: 15,
            category: 'Alert'
        }
    ];

    const quickSettings: SettingsItem[] = [
        {
            id: '1',
            title: 'Push Notifications',
            icon: 'notifications-outline',
            hasToggle: true,
            toggleValue: pushNotifications
        },
        {
            id: '2',
            title: 'Location Services',
            icon: 'location-outline',
            hasToggle: true,
            toggleValue: locationServices
        }
    ];

    const accountSettings: SettingsItem[] = [
        {
            id: '1',
            title: 'Edit Profile',
            subtitle: 'Update your personal information',
            icon: 'create-outline',
            hasArrow: true
        },
        {
            id: '2',
            title: 'My Orders',
            subtitle: 'Track your purchases',
            icon: 'bag-outline',
            hasArrow: true
        },
        {
            id: '3',
            title: 'Saved Posts',
            subtitle: 'View your bookmarked content',
            icon: 'bookmark-outline',
            hasArrow: true
        },
        {
            id: '4',
            title: 'My Reviews',
            subtitle: 'See your product reviews',
            icon: 'star-outline',
            hasArrow: true
        }
    ];

    const supportSettings: SettingsItem[] = [
        {
            id: '1',
            title: 'Help Center',
            subtitle: 'Get support and answers',
            icon: 'help-circle-outline',
            hasArrow: true
        },
        {
            id: '2',
            title: 'Privacy Policy',
            subtitle: 'Read our privacy terms',
            icon: 'shield-outline',
            hasArrow: true
        },
        {
            id: '3',
            title: 'Terms of Service',
            subtitle: 'Review our terms',
            icon: 'document-text-outline',
            hasArrow: true
        },
        {
            id: '4',
            title: 'Contact Us',
            subtitle: 'Reach out to our team',
            icon: 'mail-outline',
            hasArrow: true
        }
    ];

    const appSettings: SettingsItem[] = [
        {
            id: '1',
            title: 'Language',
            subtitle: 'English',
            icon: 'language-outline',
            hasArrow: true
        },
        {
            id: '2',
            title: 'Dark Mode',
            icon: 'moon-outline',
            hasToggle: true,
            toggleValue: false
        },
        {
            id: '3',
            title: 'App Version',
            subtitle: 'v1.2.3',
            icon: 'information-circle-outline',
            hasArrow: false
        }
    ];

    const handleToggle = (settingId: string, section: string) => {
        if (section === 'quick') {
            if (settingId === '1') {
                setPushNotifications(!pushNotifications);
            } else if (settingId === '2') {
                setLocationServices(!locationServices);
            }
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'success': return '#10b981';
            case 'tip': return '#3b82f6';
            case 'alert': return '#f59e0b';
            case 'update': return '#8b5cf6';
            default: return '#059669';
        }
    };

    const renderSettingsSection = (title: string, items: SettingsItem[], section: string) => (
        <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.settingsCard}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.settingsItem, index === items.length - 1 && styles.lastSettingsItem]}
                        onPress={() => {
                            if (item.title === 'Edit Profile') {
                                setShowEditModal(true);
                            }
                        }}
                    >
                        <View style={styles.settingsItemLeft}>
                            <View style={styles.settingsIcon}>
                                <Ionicons name={item.icon as any} size={20} color="#059669" />
                            </View>
                            <View style={styles.settingsText}>
                                <Text style={styles.settingsTitle}>{item.title}</Text>
                                {item.subtitle && (
                                    <Text style={styles.settingsSubtitle}>{item.subtitle}</Text>
                                )}
                            </View>
                        </View>
                        <View style={styles.settingsItemRight}>
                            {item.hasToggle && (
                                <Switch
                                    value={item.toggleValue}
                                    onValueChange={() => handleToggle(item.id, section)}
                                    trackColor={{ false: '#e5e7eb', true: '#059669' }}
                                    thumbColor={item.toggleValue ? '#ffffff' : '#f4f3f4'}
                                />
                            )}
                            {item.hasArrow && (
                                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0fdf4" />

            <LinearGradient
                colors={['#f0fdf4', '#dcfce7', '#bbf7d0']}
                style={styles.backgroundGradient}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#059669" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <TouchableOpacity style={styles.menuButton}>
                        <Ionicons name="ellipsis-horizontal" size={24} color="#059669" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Profile Info */}
                    <View style={styles.profileCard}>
                        <View style={styles.profileHeader}>
                            <View style={styles.avatarContainer}>
                                <View style={styles.avatar}>
                                    <Ionicons name="person" size={40} color="#9ca3af" />
                                </View>
                                <View style={styles.editBadge}>
                                    <Ionicons name="create" size={16} color="white" />
                                </View>
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.userName}>Ramesh Kumar</Text>
                                <Text style={styles.userTitle}>Experienced Farmer</Text>
                                <View style={styles.locationContainer}>
                                    <Ionicons name="location-outline" size={16} color="#6b7280" />
                                    <Text style={styles.locationText}>Village Khetan, Punjab, India</Text>
                                </View>
                                <View style={styles.contactContainer}>
                                    <Ionicons name="call-outline" size={16} color="#6b7280" />
                                    <Text style={styles.contactText}>+91 98765 43210</Text>
                                </View>
                                <View style={styles.emailContainer}>
                                    <Ionicons name="mail-outline" size={16} color="#6b7280" />
                                    <Text style={styles.emailText}>ramesh.kumar@email.com</Text>
                                </View>
                            </View>
                        </View>

                        {/* Stats */}
                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}>
                                    <Ionicons name="create-outline" size={20} color="#059669" />
                                </View>
                                <Text style={styles.statValue}>{userStats.posts}</Text>
                                <Text style={styles.statLabel}>Posts</Text>
                            </View>
                            <View style={styles.statItem}>
                                <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}>
                                    <Ionicons name="people-outline" size={20} color="#059669" />
                                </View>
                                <Text style={styles.statValue}>{userStats.followers}</Text>
                                <Text style={styles.statLabel}>Followers</Text>
                            </View>
                            <View style={styles.statItem}>
                                <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}>
                                    <Ionicons name="heart-outline" size={20} color="#059669" />
                                </View>
                                <Text style={styles.statValue}>{userStats.helpful}</Text>
                                <Text style={styles.statLabel}>Helpful</Text>
                            </View>
                            <View style={styles.statItem}>
                                <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}>
                                    <Ionicons name="star-outline" size={20} color="#059669" />
                                </View>
                                <Text style={styles.statValue}>{userStats.rating}</Text>
                                <Text style={styles.statLabel}>Rating</Text>
                            </View>
                        </View>
                    </View>

                    {/* Quick Settings */}
                    {renderSettingsSection('Quick Settings', quickSettings, 'quick')}

                    {/* Account Settings */}
                    {renderSettingsSection('Account', accountSettings, 'account')}

                    {/* Support Settings */}
                    {renderSettingsSection('Support', supportSettings, 'support')}

                    {/* App Settings */}
                    {renderSettingsSection('App Settings', appSettings, 'app')}

                    {/* My Posts Section */}
                    <View style={styles.settingsSection}>
                        <Text style={styles.sectionTitle}>My Posts</Text>
                        <View style={styles.tabContainer}>
                            <TouchableOpacity
                                style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
                                onPress={() => setActiveTab('posts')}
                            >
                                <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
                                    Posts ({userPosts.length})
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tab, activeTab === 'about' && styles.activeTab]}
                                onPress={() => setActiveTab('about')}
                            >
                                <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
                                    About
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {activeTab === 'posts' && (
                            <View style={styles.postsContainer}>
                                {userPosts.map((post) => (
                                    <View key={post.id} style={styles.postCard}>
                                        <View style={styles.postHeader}>
                                            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(post.category) }]}>
                                                <Text style={styles.categoryText}>{post.category}</Text>
                                            </View>
                                            <Text style={styles.postTime}>{post.timeAgo}</Text>
                                        </View>
                                        <Text style={styles.postContent}>{post.content}</Text>
                                        {post.image && (
                                            <View style={styles.postImageContainer}>
                                                <Text style={styles.postImage}>{post.image}</Text>
                                            </View>
                                        )}
                                        <View style={styles.postStats}>
                                            <View style={styles.postStatItem}>
                                                <Ionicons name="heart-outline" size={16} color="#6b7280" />
                                                <Text style={styles.postStatText}>{post.likes}</Text>
                                            </View>
                                            <View style={styles.postStatItem}>
                                                <Ionicons name="chatbubble-outline" size={16} color="#6b7280" />
                                                <Text style={styles.postStatText}>{post.comments}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}

                        {activeTab === 'about' && (
                            <View style={styles.aboutContainer}>
                                <Text style={styles.aboutTitle}>About Ramesh</Text>
                                <Text style={styles.aboutText}>
                                    Experienced farmer with over 15 years of expertise in sustainable agriculture.
                                    Specializes in wheat, rice, and organic vegetable cultivation. Passionate about
                                    sharing knowledge with fellow farmers and promoting eco-friendly farming practices.
                                </Text>
                                <View style={styles.expertiseContainer}>
                                    <Text style={styles.expertiseTitle}>Areas of Expertise:</Text>
                                    <Text style={styles.expertiseItem}>• Wheat and Rice Cultivation</Text>
                                    <Text style={styles.expertiseItem}>• Organic Farming Techniques</Text>
                                    <Text style={styles.expertiseItem}>• Irrigation Management</Text>
                                    <Text style={styles.expertiseItem}>• Pest Control Solutions</Text>
                                </View>
                            </View>
                        )}
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity style={styles.logoutButton}>
                        <LinearGradient
                            colors={['#ef4444', '#dc2626']}
                            style={styles.logoutGradient}
                        >
                            <Ionicons name="log-out-outline" size={20} color="white" />
                            <Text style={styles.logoutText}>Logout</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>

                {/* Edit Profile Modal */}
                <Modal
                    visible={showEditModal}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.editModalContainer}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity onPress={() => setShowEditModal(false)}>
                                    <Ionicons name="close" size={24} color="#6b7280" />
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>Edit Profile</Text>
                                <TouchableOpacity>
                                    <Text style={styles.saveButton}>Save</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.editForm}>
                                <View style={styles.editSection}>
                                    <Text style={styles.editLabel}>Full Name</Text>
                                    <TextInput
                                        style={styles.editInput}
                                        value="Ramesh Kumar"
                                        placeholder="Enter your full name"
                                    />
                                </View>

                                <View style={styles.editSection}>
                                    <Text style={styles.editLabel}>Title</Text>
                                    <TextInput
                                        style={styles.editInput}
                                        value="Experienced Farmer"
                                        placeholder="Enter your professional title"
                                    />
                                </View>

                                <View style={styles.editSection}>
                                    <Text style={styles.editLabel}>Location</Text>
                                    <TextInput
                                        style={styles.editInput}
                                        value="Village Khetan, Punjab, India"
                                        placeholder="Enter your location"
                                    />
                                </View>

                                <View style={styles.editSection}>
                                    <Text style={styles.editLabel}>Phone Number</Text>
                                    <TextInput
                                        style={styles.editInput}
                                        value="+91 98765 43210"
                                        placeholder="Enter your phone number"
                                    />
                                </View>

                                <View style={styles.editSection}>
                                    <Text style={styles.editLabel}>Email</Text>
                                    <TextInput
                                        style={styles.editInput}
                                        value="ramesh.kumar@email.com"
                                        placeholder="Enter your email"
                                    />
                                </View>

                                <View style={styles.editSection}>
                                    <Text style={styles.editLabel}>About</Text>
                                    <TextInput
                                        style={[styles.editInput, styles.editTextArea]}
                                        multiline
                                        numberOfLines={4}
                                        value="Experienced farmer with over 15 years of expertise..."
                                        placeholder="Tell us about yourself"
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
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
        paddingBottom: 15,
    },
    backButton: {
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 24,
        color: '#065f46',
        fontWeight: 'bold',
    },
    menuButton: {
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    profileCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 25,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#059669',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#059669',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    profileInfo: {
        alignItems: 'center',
    },
    userName: {
        fontSize: 24,
        color: '#374151',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userTitle: {
        fontSize: 16,
        color: '#059669',
        fontWeight: '600',
        marginBottom: 15,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    locationText: {
        fontSize: 14,
        color: '#6b7280',
        marginLeft: 8,
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    contactText: {
        fontSize: 14,
        color: '#6b7280',
        marginLeft: 8,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailText: {
        fontSize: 14,
        color: '#6b7280',
        marginLeft: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    statItem: {
        alignItems: 'center',
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 18,
        color: '#374151',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#6b7280',
    },
    settingsSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#374151',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    settingsCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    settingsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    lastSettingsItem: {
        borderBottomWidth: 0,
    },
    settingsItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingsIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0fdf4',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    settingsText: {
        flex: 1,
    },
    settingsTitle: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '600',
    },
    settingsSubtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 2,
    },
    settingsItemRight: {
        marginLeft: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 4,
        marginBottom: 15,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 11,
    },
    activeTab: {
        backgroundColor: '#059669',
    },
    tabText: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '600',
    },
    activeTabText: {
        color: 'white',
    },
    postsContainer: {
        gap: 15,
    },
    postCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    categoryText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '600',
    },
    postTime: {
        fontSize: 12,
        color: '#6b7280',
    },
    postContent: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
        marginBottom: 10,
    },
    postImageContainer: {
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 8,
        paddingVertical: 20,
        marginBottom: 10,
    },
    postImage: {
        fontSize: 32,
    },
    postStats: {
        flexDirection: 'row',
        gap: 15,
    },
    postStatItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postStatText: {
        fontSize: 12,
        color: '#6b7280',
        marginLeft: 4,
    },
    aboutContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 20,
    },
    aboutTitle: {
        fontSize: 18,
        color: '#374151',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    aboutText: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 22,
        marginBottom: 20,
    },
    expertiseContainer: {
        marginTop: 10,
    },
    expertiseTitle: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '600',
        marginBottom: 10,
    },
    expertiseItem: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 5,
        lineHeight: 20,
    },
    logoutButton: {
        borderRadius: 20,
        elevation: 3,
        shadowColor: '#ef4444',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 30,
    },
    logoutGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 32,
        borderRadius: 20,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    editModalContainer: {
        backgroundColor: '#f0fdf4',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    modalTitle: {
        fontSize: 18,
        color: '#065f46',
        fontWeight: 'bold',
    },
    saveButton: {
        fontSize: 16,
        color: '#059669',
        fontWeight: 'bold',
    },
    editForm: {
        padding: 20,
    },
    editSection: {
        marginBottom: 20,
    },
    editLabel: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '600',
        marginBottom: 8,
    },
    editInput: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: '#374151',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    editTextArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
});

export default ProfileScreen;