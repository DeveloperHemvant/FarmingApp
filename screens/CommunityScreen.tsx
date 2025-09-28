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
    Modal,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface User {
    id: string;
    name: string;
    avatar: string;
    location: string;
    verified: boolean;
    followers: number;
}

interface Comment {
    id: string;
    user: User;
    content: string;
    timestamp: string;
    likes: number;
}

interface CommunityPost {
    id: string;
    user: User;
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: Comment[];
    isLiked: boolean;
    isBookmarked: boolean;
    category: 'question' | 'tip' | 'update' | 'achievement';
    tags: string[];
}

const CommunityScreen: React.FC = () => {
    const [posts, setPosts] = useState<CommunityPost[]>([
        {
            id: '1',
            user: {
                id: 'u1',
                name: 'Priya Sharma',
                avatar: '👩‍🌾',
                location: 'Punjab, India',
                verified: true,
                followers: 234
            },
            content: 'Just harvested my organic wheat crop! The yield is 20% higher than last year thanks to the new irrigation technique I learned from this community. Thank you everyone! 🌾',
            timestamp: '2 hours ago',
            likes: 45,
            comments: [
                {
                    id: 'c1',
                    user: {
                        id: 'u2',
                        name: 'Ram Kisan',
                        avatar: '👨‍🌾',
                        location: 'Haryana',
                        verified: false,
                        followers: 89
                    },
                    content: 'Congratulations! Can you share more details about the irrigation technique?',
                    timestamp: '1 hour ago',
                    likes: 8
                },
                {
                    id: 'c2',
                    user: {
                        id: 'u3',
                        name: 'Amit Patel',
                        avatar: '🧑‍🌾',
                        location: 'Gujarat',
                        verified: true,
                        followers: 156
                    },
                    content: 'Great results! I\'m trying similar methods on my farm.',
                    timestamp: '45 minutes ago',
                    likes: 5
                }
            ],
            isLiked: false,
            isBookmarked: true,
            category: 'achievement',
            tags: ['organic', 'wheat', 'irrigation']
        },
        {
            id: '2',
            user: {
                id: 'u4',
                name: 'Dr. Suresh Kumar',
                avatar: '👨‍🔬',
                location: 'Agricultural Expert',
                verified: true,
                followers: 1200
            },
            content: 'Weather Alert: Heavy rains expected in North India this week. Farmers should take following precautions:\n\n1. Ensure proper drainage in fields\n2. Harvest ready crops immediately\n3. Cover stored grains\n4. Check irrigation systems for damage\n\nStay safe everyone! 🌧️',
            timestamp: '4 hours ago',
            likes: 128,
            comments: [
                {
                    id: 'c3',
                    user: {
                        id: 'u5',
                        name: 'Kavita Devi',
                        avatar: '👩‍🌾',
                        location: 'Uttar Pradesh',
                        verified: false,
                        followers: 67
                    },
                    content: 'Thank you for the timely alert! Already started preparations.',
                    timestamp: '3 hours ago',
                    likes: 12
                }
            ],
            isLiked: true,
            isBookmarked: true,
            category: 'update',
            tags: ['weather', 'alert', 'precautions']
        },
        {
            id: '3',
            user: {
                id: 'u6',
                name: 'Rajesh Singh',
                avatar: '👨‍🌾',
                location: 'Chandigarh, Punjab',
                verified: false,
                followers: 45
            },
            content: 'Need help! My tomato plants are showing yellow spots on leaves. Is this a disease? What treatment should I apply? Please guide. 🍅😟',
            timestamp: '6 hours ago',
            likes: 23,
            comments: [
                {
                    id: 'c4',
                    user: {
                        id: 'u7',
                        name: 'Plant Doctor',
                        avatar: '🌱',
                        location: 'Agricultural Consultant',
                        verified: true,
                        followers: 890
                    },
                    content: 'This looks like early blight. Apply copper-based fungicide immediately and ensure proper air circulation.',
                    timestamp: '5 hours ago',
                    likes: 18
                },
                {
                    id: 'c5',
                    user: {
                        id: 'u8',
                        name: 'Farmer Joe',
                        avatar: '🧑‍🌾',
                        location: 'Maharashtra',
                        verified: false,
                        followers: 123
                    },
                    content: 'I faced similar issue last month. Remove affected leaves and spray neem oil solution.',
                    timestamp: '4 hours ago',
                    likes: 9
                }
            ],
            isLiked: false,
            isBookmarked: false,
            category: 'question',
            tags: ['tomato', 'disease', 'help']
        },
        {
            id: '4',
            user: {
                id: 'u9',
                name: 'Green Farmer',
                avatar: '🌿',
                location: 'Kerala, India',
                verified: true,
                followers: 567
            },
            content: '💡 Pro Tip: Use banana peels as natural fertilizer for your plants! They are rich in potassium and help improve flower and fruit production. Simply bury chopped peels around plant roots. \n\n#OrganicFarming #NaturalFertilizer #Sustainable',
            timestamp: '1 day ago',
            likes: 89,
            comments: [
                {
                    id: 'c6',
                    user: {
                        id: 'u10',
                        name: 'Eco Farmer',
                        avatar: '♻️',
                        location: 'Tamil Nadu',
                        verified: false,
                        followers: 234
                    },
                    content: 'Great tip! I also use eggshells for calcium. Natural is always better!',
                    timestamp: '20 hours ago',
                    likes: 15
                }
            ],
            isLiked: true,
            isBookmarked: true,
            category: 'tip',
            tags: ['organic', 'fertilizer', 'natural', 'sustainable']
        }
    ]);

    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostCategory, setNewPostCategory] = useState<'question' | 'tip' | 'update' | 'achievement'>('update');
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [newComment, setNewComment] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const currentUser: User = {
        id: 'current',
        name: 'Rajesh Singh',
        avatar: '👨‍🌾',
        location: 'Chandigarh, Punjab',
        verified: false,
        followers: 45
    };

    const filterOptions = [
        { key: 'all', label: 'All Posts', icon: '📱' },
        { key: 'question', label: 'Questions', icon: '❓' },
        { key: 'tip', label: 'Tips', icon: '💡' },
        { key: 'update', label: 'Updates', icon: '📢' },
        { key: 'achievement', label: 'Success', icon: '🏆' },
    ];

    const handleNavigation = (screen: string) => {
        console.log(`Navigate to ${screen}`);
    };

    const handleLikePost = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1
                }
                : post
        ));
    };

    const handleBookmarkPost = (postId: string) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, isBookmarked: !post.isBookmarked }
                : post
        ));
    };

    const handleAddPost = () => {
        if (newPostContent.trim() === '') {
            Alert.alert('Error', 'Please enter post content');
            return;
        }

        const newPost: CommunityPost = {
            id: Date.now().toString(),
            user: currentUser,
            content: newPostContent,
            timestamp: 'Just now',
            likes: 0,
            comments: [],
            isLiked: false,
            isBookmarked: false,
            category: newPostCategory,
            tags: []
        };

        setPosts([newPost, ...posts]);
        setNewPostContent('');
        setShowAddPostModal(false);
        Alert.alert('Success', 'Your post has been shared!');
    };

    const handleAddComment = () => {
        if (newComment.trim() === '' || !selectedPostId) return;

        const newCommentObj: Comment = {
            id: Date.now().toString(),
            user: currentUser,
            content: newComment,
            timestamp: 'Just now',
            likes: 0
        };

        setPosts(posts.map(post =>
            post.id === selectedPostId
                ? { ...post, comments: [...post.comments, newCommentObj] }
                : post
        ));

        setNewComment('');
        setShowCommentModal(false);
        Alert.alert('Success', 'Comment added!');
    };

    const openCommentModal = (postId: string) => {
        setSelectedPostId(postId);
        setShowCommentModal(true);
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'question': return '#3b82f6';
            case 'tip': return '#10b981';
            case 'update': return '#f59e0b';
            case 'achievement': return '#8b5cf6';
            default: return '#6b7280';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'question': return 'help-circle';
            case 'tip': return 'bulb';
            case 'update': return 'megaphone';
            case 'achievement': return 'trophy';
            default: return 'chatbubble';
        }
    };

    const filteredPosts = posts.filter(post =>
        selectedFilter === 'all' || post.category === selectedFilter
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
                    <TouchableOpacity onPress={() => handleNavigation('Back')}>
                        <Ionicons name="arrow-back" size={24} color="#059669" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Community</Text>
                    <TouchableOpacity onPress={() => handleNavigation('Search')}>
                        <Ionicons name="search" size={24} color="#059669" />
                    </TouchableOpacity>
                </View>

                {/* Community Stats */}
                <View style={styles.statsContainer}>
                    <LinearGradient
                        colors={['#059669', '#10b981']}
                        style={styles.statsGradient}
                    >
                        <View style={styles.statsContent}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>2.5K+</Text>
                                <Text style={styles.statLabel}>Farmers</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>1.2K+</Text>
                                <Text style={styles.statLabel}>Posts</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>850+</Text>
                                <Text style={styles.statLabel}>Solutions</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.joinButton}>
                            <Text style={styles.joinButtonText}>🌟 Active</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                {/* Filter Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                    <View style={styles.filterScroll}>
                        {filterOptions.map((filter) => (
                            <TouchableOpacity
                                key={filter.key}
                                style={[
                                    styles.filterTab,
                                    selectedFilter === filter.key && styles.filterTabActive
                                ]}
                                onPress={() => setSelectedFilter(filter.key)}
                            >
                                <Text style={styles.filterIcon}>{filter.icon}</Text>
                                <Text style={[
                                    styles.filterText,
                                    selectedFilter === filter.key && styles.filterTextActive
                                ]}>
                                    {filter.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Posts List */}
                    <View style={styles.postsContainer}>
                        {filteredPosts.map((post) => (
                            <View key={post.id} style={styles.postCard}>
                                {/* Post Header */}
                                <View style={styles.postHeader}>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.userAvatar}>{post.user.avatar}</Text>
                                        <View style={styles.userDetails}>
                                            <View style={styles.userNameContainer}>
                                                <Text style={styles.userName}>{post.user.name}</Text>
                                                {post.user.verified && (
                                                    <Ionicons name="checkmark-circle" size={16} color="#059669" style={styles.verifiedIcon} />
                                                )}
                                            </View>
                                            <Text style={styles.userLocation}>{post.user.location}</Text>
                                            <Text style={styles.postTimestamp}>{post.timestamp}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.postHeaderActions}>
                                        <View style={[
                                            styles.categoryBadge,
                                            { backgroundColor: getCategoryColor(post.category) }
                                        ]}>
                                            <Ionicons
                                                name={getCategoryIcon(post.category) as any}
                                                size={12}
                                                color="white"
                                            />
                                            <Text style={styles.categoryText}>
                                                {post.category.toUpperCase()}
                                            </Text>
                                        </View>

                                        <TouchableOpacity style={styles.moreButton}>
                                            <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Post Content */}
                                <Text style={styles.postContent}>{post.content}</Text>

                                {/* Tags */}
                                {post.tags.length > 0 && (
                                    <View style={styles.tagsContainer}>
                                        {post.tags.map((tag, index) => (
                                            <View key={index} style={styles.tag}>
                                                <Text style={styles.tagText}>#{tag}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {/* Post Actions */}
                                <View style={styles.postActions}>
                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={() => handleLikePost(post.id)}
                                    >
                                        <Ionicons
                                            name={post.isLiked ? "heart" : "heart-outline"}
                                            size={20}
                                            color={post.isLiked ? "#ef4444" : "#6b7280"}
                                        />
                                        <Text style={[
                                            styles.actionText,
                                            post.isLiked && { color: "#ef4444" }
                                        ]}>
                                            {post.likes}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={() => openCommentModal(post.id)}
                                    >
                                        <Ionicons name="chatbubble-outline" size={20} color="#6b7280" />
                                        <Text style={styles.actionText}>{post.comments.length}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.actionButton}>
                                        <Ionicons name="share-outline" size={20} color="#6b7280" />
                                        <Text style={styles.actionText}>Share</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={() => handleBookmarkPost(post.id)}
                                    >
                                        <Ionicons
                                            name={post.isBookmarked ? "bookmark" : "bookmark-outline"}
                                            size={20}
                                            color={post.isBookmarked ? "#059669" : "#6b7280"}
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* Comments Preview */}
                                {post.comments.length > 0 && (
                                    <View style={styles.commentsPreview}>
                                        <Text style={styles.commentsTitle}>Comments ({post.comments.length})</Text>
                                        {post.comments.slice(0, 2).map((comment) => (
                                            <View key={comment.id} style={styles.commentItem}>
                                                <Text style={styles.commentAvatar}>{comment.user.avatar}</Text>
                                                <View style={styles.commentContent}>
                                                    <View style={styles.commentHeader}>
                                                        <Text style={styles.commentUserName}>{comment.user.name}</Text>
                                                        <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                                                    </View>
                                                    <Text style={styles.commentText}>{comment.content}</Text>
                                                    <TouchableOpacity style={styles.commentLikeButton}>
                                                        <Ionicons name="heart-outline" size={14} color="#6b7280" />
                                                        <Text style={styles.commentLikes}>{comment.likes}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))}
                                        {post.comments.length > 2 && (
                                            <TouchableOpacity style={styles.viewAllComments}>
                                                <Text style={styles.viewAllCommentsText}>
                                                    View all {post.comments.length} comments
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>

                    {filteredPosts.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>🌾</Text>
                            <Text style={styles.emptyTitle}>No posts found</Text>
                            <Text style={styles.emptyMessage}>
                                Be the first to share something with the community!
                            </Text>
                        </View>
                    )}

                </ScrollView>

                {/* Floating Action Button */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => setShowAddPostModal(true)}
                >
                    <LinearGradient
                        colors={['#059669', '#10b981']}
                        style={styles.fabGradient}
                    >
                        <Ionicons name="add" size={24} color="white" />
                    </LinearGradient>
                </TouchableOpacity>

                {/* Add Post Modal */}
                <Modal
                    visible={showAddPostModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowAddPostModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Share with Community</Text>
                                <TouchableOpacity onPress={() => setShowAddPostModal(false)}>
                                    <Ionicons name="close" size={24} color="#6b7280" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.modalContent}>
                                    <View style={styles.userInfoModal}>
                                        <Text style={styles.userAvatarModal}>{currentUser.avatar}</Text>
                                        <View>
                                            <Text style={styles.userNameModal}>{currentUser.name}</Text>
                                            <Text style={styles.userLocationModal}>{currentUser.location}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.categorySelector}>
                                        <Text style={styles.categorySelectorTitle}>Post Category:</Text>
                                        <View style={styles.categoryOptions}>
                                            {(['question', 'tip', 'update', 'achievement'] as const).map((category) => (
                                                <TouchableOpacity
                                                    key={category}
                                                    style={[
                                                        styles.categoryOption,
                                                        newPostCategory === category && styles.categoryOptionActive,
                                                        { borderColor: getCategoryColor(category) }
                                                    ]}
                                                    onPress={() => setNewPostCategory(category)}
                                                >
                                                    <Ionicons
                                                        name={getCategoryIcon(category) as any}
                                                        size={16}
                                                        color={newPostCategory === category ? 'white' : getCategoryColor(category)}
                                                    />
                                                    <Text style={[
                                                        styles.categoryOptionText,
                                                        newPostCategory === category && styles.categoryOptionTextActive
                                                    ]}>
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>

                                    <View style={styles.postInputContainer}>
                                        <TextInput
                                            style={styles.postInput}
                                            value={newPostContent}
                                            onChangeText={setNewPostContent}
                                            placeholder={`Share your ${newPostCategory} with the farming community...`}
                                            placeholderTextColor="#9ca3af"
                                            multiline
                                            numberOfLines={6}
                                            textAlignVertical="top"
                                        />
                                    </View>

                                    <View style={styles.modalActions}>
                                        <TouchableOpacity
                                            style={styles.cancelButton}
                                            onPress={() => setShowAddPostModal(false)}
                                        >
                                            <Text style={styles.cancelButtonText}>Cancel</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={styles.shareButton}
                                            onPress={handleAddPost}
                                        >
                                            <LinearGradient
                                                colors={['#059669', '#10b981']}
                                                style={styles.shareButtonGradient}
                                            >
                                                <Ionicons name="send" size={16} color="white" />
                                                <Text style={styles.shareButtonText}>Share Post</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                {/* Comment Modal */}
                <Modal
                    visible={showCommentModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowCommentModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.commentModalContainer}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Add Comment</Text>
                                <TouchableOpacity onPress={() => setShowCommentModal(false)}>
                                    <Ionicons name="close" size={24} color="#6b7280" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.commentInputSection}>
                                <Text style={styles.userAvatarComment}>{currentUser.avatar}</Text>
                                <View style={styles.commentInputContainer}>
                                    <TextInput
                                        style={styles.commentInput}
                                        value={newComment}
                                        onChangeText={setNewComment}
                                        placeholder="Share your thoughts..."
                                        placeholderTextColor="#9ca3af"
                                        multiline
                                        numberOfLines={3}
                                        textAlignVertical="top"
                                    />
                                    <TouchableOpacity
                                        style={styles.sendCommentButton}
                                        onPress={handleAddComment}
                                    >
                                        <Ionicons name="send" size={20} color="#059669" />
                                    </TouchableOpacity>
                                </View>
                            </View>
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
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        color: '#065f46',
        fontWeight: 'bold',
    },
    statsContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    statsGradient: {
        borderRadius: 20,
        padding: 20,
        elevation: 6,
        shadowColor: '#059669',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    statsContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    joinButton: {
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    joinButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    filterContainer: {
        paddingLeft: 20,
        marginBottom: 20,
    },
    filterScroll: {
        flexDirection: 'row',
        paddingRight: 20,
    },
    filterTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    filterTabActive: {
        backgroundColor: '#059669',
        borderColor: '#059669',
    },
    filterIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    filterText: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '500',
    },
    filterTextActive: {
        color: 'white',
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    postsContainer: {
        paddingBottom: 20,
    },
    postCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    userAvatar: {
        fontSize: 24,
        marginRight: 12,
    },
    userDetails: {
        flex: 1,
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontSize: 16,
        color: '#374151',
        fontWeight: 'bold',
        marginRight: 4,
    },
    verifiedIcon: {
        marginLeft: 2,
    },
    userLocation: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 2,
    },
    postTimestamp: {
        fontSize: 11,
        color: '#9ca3af',
    },
    postHeaderActions: {
        alignItems: 'flex-end',
    },
    categoryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    categoryText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    moreButton: {
        padding: 4,
    },
    postContent: {
        fontSize: 15,
        color: '#374151',
        lineHeight: 22,
        marginBottom: 15,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    tag: {
        backgroundColor: '#f0fdf4',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 6,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: '#bbf7d0',
    },
    tagText: {
        fontSize: 11,
        color: '#059669',
        fontWeight: '600',
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        marginBottom: 15,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    actionText: {
        fontSize: 14,
        color: '#6b7280',
        marginLeft: 6,
        fontWeight: '500',
    },
    commentsPreview: {
        backgroundColor: '#f9fafb',
        padding: 12,
        borderRadius: 12,
    },
    commentsTitle: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '600',
        marginBottom: 10,
    },
    commentItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    commentAvatar: {
        fontSize: 16,
        marginRight: 8,
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    commentUserName: {
        fontSize: 12,
        color: '#374151',
        fontWeight: '600',
        marginRight: 8,
    },
    commentTimestamp: {
        fontSize: 10,
        color: '#9ca3af',
    },
    commentText: {
        fontSize: 13,
        color: '#6b7280',
        lineHeight: 18,
        marginBottom: 6,
    },
    commentLikeButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentLikes: {
        fontSize: 11,
        color: '#6b7280',
        marginLeft: 4,
    },
    viewAllComments: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    viewAllCommentsText: {
        fontSize: 12,
        color: '#059669',
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        color: '#374151',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    emptyMessage: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 28,
        elevation: 8,
        shadowColor: '#059669',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    fabGradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        maxHeight: '85%',
    },
    commentModalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        maxHeight: '40%',
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
        color: '#374151',
        fontWeight: 'bold',
    },
    modalContent: {
        padding: 20,
    },
    userInfoModal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    userAvatarModal: {
        fontSize: 24,
        marginRight: 12,
    },
    userNameModal: {
        fontSize: 16,
        color: '#374151',
        fontWeight: 'bold',
    },
    userLocationModal: {
        fontSize: 12,
        color: '#6b7280',
    },
    categorySelector: {
        marginBottom: 20,
    },
    categorySelectorTitle: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '600',
        marginBottom: 10,
    },
    categoryOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 2,
        backgroundColor: '#f9fafb',
    },
    categoryOptionActive: {
        backgroundColor: '#059669',
    },
    categoryOptionText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    categoryOptionTextActive: {
        color: 'white',
    },
    postInputContainer: {
        marginBottom: 20,
    },
    postInput: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: '#374151',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        height: 120,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#6b7280',
        fontWeight: '600',
    },
    shareButton: {
        flex: 1,
        borderRadius: 12,
        marginLeft: 10,
        elevation: 3,
        shadowColor: '#059669',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    shareButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
    },
    shareButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 6,
    },
    commentInputSection: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 20,
    },
    userAvatarComment: {
        fontSize: 20,
        marginRight: 12,
    },
    commentInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#f9fafb',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    commentInput: {
        flex: 1,
        fontSize: 14,
        color: '#374151',
        maxHeight: 80,
    },
    sendCommentButton: {
        padding: 8,
        marginLeft: 8,
    },
});

export default CommunityScreen;