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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface AITip {
  id: string;
  title: string;
  description: string;
  category: 'irrigation' | 'fertilizer' | 'pest' | 'harvest' | 'planting' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  crop?: string;
  season: string;
  icon: string;
  aiConfidence: number;
  implementationTime: string;
  expectedBenefit: string;
  detailedSteps: string[];
  relatedTips: string[];
  timestamp: string;
  isBookmarked: boolean;
  likes: number;
  isImplemented: boolean;
}

const AITipsScreen: React.FC = () => {
  const [tips, setTips] = useState<AITip[]>([
    {
      id: '1',
      title: 'Optimize Irrigation Schedule for Wheat',
      description: 'Based on weather patterns and soil moisture data, adjust your irrigation schedule to save 30% water while maintaining yield.',
      category: 'irrigation',
      priority: 'high',
      crop: 'Wheat',
      season: 'Winter',
      icon: '💧',
      aiConfidence: 92,
      implementationTime: '2-3 days',
      expectedBenefit: '30% water savings, 15% yield increase',
      detailedSteps: [
        'Install soil moisture sensors at 3 different depths',
        'Water only when moisture drops below 40%',
        'Reduce irrigation frequency from daily to every 2-3 days',
        'Monitor plant stress indicators for first week'
      ],
      relatedTips: ['Mulching techniques', 'Drip irrigation setup'],
      timestamp: '2 hours ago',
      isBookmarked: true,
      likes: 45,
      isImplemented: false,
    },
    {
      id: '2',
      title: 'Pest Control Using Companion Planting',
      description: 'Plant marigolds around your tomato crops to naturally repel harmful insects and reduce pesticide usage by 60%.',
      category: 'pest',
      priority: 'medium',
      crop: 'Tomato',
      season: 'Summer',
      icon: '🌻',
      aiConfidence: 87,
      implementationTime: '1 week',
      expectedBenefit: '60% reduction in pesticides, healthier crops',
      detailedSteps: [
        'Plant marigolds 2 feet apart around tomato perimeter',
        'Choose French marigolds for best pest deterrent effect',
        'Maintain companion plants throughout growing season',
        'Monitor pest levels weekly for effectiveness'
      ],
      relatedTips: ['Organic pesticides', 'Beneficial insects'],
      timestamp: '5 hours ago',
      isBookmarked: false,
      likes: 32,
      isImplemented: true,
    },
    {
      id: '3',
      title: 'Precision Fertilizer Application',
      description: 'Use soil testing results to apply fertilizers only where needed, reducing costs by 25% while improving crop health.',
      category: 'fertilizer',
      priority: 'high',
      crop: 'Rice',
      season: 'Monsoon',
      icon: '🧪',
      aiConfidence: 94,
      implementationTime: '3-4 days',
      expectedBenefit: '25% cost reduction, improved soil health',
      detailedSteps: [
        'Conduct soil tests across different field zones',
        'Create fertilizer application map based on results',
        'Use variable rate spreader for precise application',
        'Monitor plant response and adjust as needed'
      ],
      relatedTips: ['Soil health management', 'Nutrient timing'],
      timestamp: '1 day ago',
      isBookmarked: true,
      likes: 67,
      isImplemented: false,
    },
    {
      id: '4',
      title: 'Optimal Harvest Timing for Maximum Yield',
      description: 'Weather data suggests harvesting your wheat 3 days earlier than planned to avoid upcoming rain and maintain grain quality.',
      category: 'harvest',
      priority: 'urgent',
      crop: 'Wheat',
      season: 'Spring',
      icon: '🌾',
      aiConfidence: 96,
      implementationTime: 'Immediate',
      expectedBenefit: 'Prevent 20% yield loss, maintain quality',
      detailedSteps: [
        'Check grain moisture content (should be 12-14%)',
        'Prepare harvesting equipment immediately',
        'Arrange additional labor if needed',
        'Ensure proper storage facilities are ready'
      ],
      relatedTips: ['Weather monitoring', 'Post-harvest storage'],
      timestamp: '30 minutes ago',
      isBookmarked: false,
      likes: 28,
      isImplemented: false,
    },
    {
      id: '5',
      title: 'Crop Rotation Strategy for Soil Health',
      description: 'Implement nitrogen-fixing legumes in rotation to naturally improve soil fertility and reduce fertilizer dependence.',
      category: 'planting',
      priority: 'medium',
      season: 'All Year',
      icon: '🔄',
      aiConfidence: 89,
      implementationTime: '1-2 weeks planning',
      expectedBenefit: 'Improved soil fertility, 40% less fertilizer needed',
      detailedSteps: [
        'Plan 3-4 year crop rotation schedule',
        'Include legumes (peas, beans) in rotation',
        'Allow cover crops during fallow periods',
        'Monitor soil nitrogen levels annually'
      ],
      relatedTips: ['Cover crops', 'Soil testing'],
      timestamp: '3 days ago',
      isBookmarked: true,
      likes: 51,
      isImplemented: false,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchText, setSearchText] = useState('');

  const categories = [
    { key: 'all', label: 'All Tips', icon: '🌟' },
    { key: 'irrigation', label: 'Irrigation', icon: '💧' },
    { key: 'fertilizer', label: 'Fertilizer', icon: '🧪' },
    { key: 'pest', label: 'Pest Control', icon: '🦗' },
    { key: 'harvest', label: 'Harvest', icon: '🌾' },
    { key: 'planting', label: 'Planting', icon: '🌱' },
    { key: 'general', label: 'General', icon: '📋' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#ca8a04';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'alert-circle';
      case 'high': return 'warning';
      case 'medium': return 'information-circle';
      case 'low': return 'checkmark-circle';
      default: return 'help-circle';
    }
  };

  const handleNavigation = (screen: string) => {
    console.log(`Navigate to ${screen}`);
  };

  const handleBookmark = (tipId: string) => {
    setTips(tips.map(tip =>
      tip.id === tipId ? { ...tip, isBookmarked: !tip.isBookmarked } : tip
    ));
  };

  const handleImplement = (tipId: string) => {
    setTips(tips.map(tip =>
      tip.id === tipId ? { ...tip, isImplemented: !tip.isImplemented } : tip
    ));
  };

  const handleLike = (tipId: string) => {
    setTips(tips.map(tip =>
      tip.id === tipId ? { ...tip, likes: tip.likes + 1 } : tip
    ));
  };

  const filteredTips = tips.filter(tip => {
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchText.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchText.toLowerCase()) ||
      (tip.crop && tip.crop.toLowerCase().includes(searchText.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const urgentTips = tips.filter(tip => tip.priority === 'urgent');

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
          <Text style={styles.headerTitle}>AI Tips</Text>
          <TouchableOpacity onPress={() => handleNavigation('Settings')}>
            <Ionicons name="settings" size={24} color="#059669" />
          </TouchableOpacity>
        </View>

        {/* AI Assistant Header */}
        <View style={styles.aiHeader}>
          <LinearGradient
            colors={['#059669', '#10b981']}
            style={styles.aiHeaderGradient}
          >
            <View style={styles.aiHeaderContent}>
              <Text style={styles.aiHeaderIcon}>🤖</Text>
              <View style={styles.aiHeaderText}>
                <Text style={styles.aiHeaderTitle}>KrishiGPT Recommendations</Text>
                <Text style={styles.aiHeaderSubtitle}>Personalized farming insights powered by AI</Text>
              </View>
              <TouchableOpacity style={styles.refreshButton} onPress={() => handleNavigation('Refresh')}>
                <Ionicons name="refresh" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search AI tips..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#9ca3af"
            />
            {searchText !== '' && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={20} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          <View style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.key && styles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.key && styles.categoryTextActive
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Urgent Alerts */}
        {urgentTips.length > 0 && (
          <View style={styles.urgentContainer}>
            <LinearGradient
              colors={['#dc2626', '#ef4444']}
              style={styles.urgentGradient}
            >
              <Ionicons name="warning" size={20} color="white" />
              <Text style={styles.urgentText}>
                {urgentTips.length} urgent recommendation{urgentTips.length > 1 ? 's' : ''} need immediate attention
              </Text>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="white" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Stats Overview */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{tips.length}</Text>
              <Text style={styles.statLabel}>Total Tips</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{tips.filter(t => t.isImplemented).length}</Text>
              <Text style={styles.statLabel}>Implemented</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{tips.filter(t => t.isBookmarked).length}</Text>
              <Text style={styles.statLabel}>Bookmarked</Text>
            </View>
          </View>

          {/* AI Tips List */}
          <View style={styles.tipsContainer}>
            {filteredTips.map((tip) => (
              <View key={tip.id} style={styles.tipCard}>
                {/* Tip Header */}
                <View style={styles.tipHeader}>
                  <View style={styles.tipTitleContainer}>
                    <Text style={styles.tipIcon}>{tip.icon}</Text>
                    <View style={styles.tipTitleText}>
                      <Text style={styles.tipTitle}>{tip.title}</Text>
                      {tip.crop && (
                        <Text style={styles.tipCrop}>{tip.crop} • {tip.season}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.tipHeaderActions}>
                    <View style={[
                      styles.priorityBadge,
                      { backgroundColor: getPriorityColor(tip.priority) }
                    ]}>
                      <Ionicons
                        name={getPriorityIcon(tip.priority)}
                        size={12}
                        color="white"
                      />
                      <Text style={styles.priorityText}>
                        {tip.priority.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* AI Confidence */}
                <View style={styles.confidenceContainer}>
                  <Text style={styles.confidenceLabel}>AI Confidence:</Text>
                  <View style={styles.confidenceBar}>
                    <LinearGradient
                      colors={['#059669', '#10b981']}
                      style={[styles.confidenceFill, { width: `${tip.aiConfidence}%` }]}
                    />
                  </View>
                  <Text style={styles.confidenceText}>{tip.aiConfidence}%</Text>
                </View>

                {/* Description */}
                <Text style={styles.tipDescription}>{tip.description}</Text>

                {/* Benefits & Timeline */}
                <View style={styles.benefitsContainer}>
                  <View style={styles.benefitItem}>
                    <Ionicons name="time" size={16} color="#059669" />
                    <Text style={styles.benefitText}>{tip.implementationTime}</Text>
                  </View>
                  <View style={styles.benefitItem}>
                    <Ionicons name="trending-up" size={16} color="#059669" />
                    <Text style={styles.benefitText}>{tip.expectedBenefit}</Text>
                  </View>
                </View>

                {/* Implementation Steps Preview */}
                <View style={styles.stepsContainer}>
                  <Text style={styles.stepsTitle}>📋 Implementation Steps:</Text>
                  {tip.detailedSteps.slice(0, 2).map((step, index) => (
                    <View key={index} style={styles.stepItem}>
                      <Text style={styles.stepNumber}>{index + 1}.</Text>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                  {tip.detailedSteps.length > 2 && (
                    <Text style={styles.moreSteps}>+{tip.detailedSteps.length - 2} more steps</Text>
                  )}
                </View>

                {/* Actions */}
                <View style={styles.tipActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleLike(tip.id)}
                  >
                    <Ionicons name="heart-outline" size={16} color="#6b7280" />
                    <Text style={styles.actionText}>{tip.likes}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleBookmark(tip.id)}
                  >
                    <Ionicons
                      name={tip.isBookmarked ? "bookmark" : "bookmark-outline"}
                      size={16}
                      color={tip.isBookmarked ? "#059669" : "#6b7280"}
                    />
                    <Text style={styles.actionText}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="share-outline" size={16} color="#6b7280" />
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.implementButton,
                      tip.isImplemented && styles.implementedButton
                    ]}
                    onPress={() => handleImplement(tip.id)}
                  >
                    <Ionicons
                      name={tip.isImplemented ? "checkmark-circle" : "play-circle"}
                      size={16}
                      color="white"
                    />
                    <Text style={styles.implementText}>
                      {tip.isImplemented ? 'Implemented' : 'Implement'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* View Details Button */}
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>View Full Details</Text>
                  <Ionicons name="chevron-forward" size={16} color="#059669" />
                </TouchableOpacity>

                {/* Timestamp */}
                <Text style={styles.timestamp}>{tip.timestamp}</Text>
              </View>
            ))}
          </View>

          {filteredTips.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🤖</Text>
              <Text style={styles.emptyTitle}>No AI tips found</Text>
              <Text style={styles.emptyMessage}>
                {searchText ? 'Try adjusting your search' : 'AI is analyzing your data to generate personalized tips'}
              </Text>
              <TouchableOpacity style={styles.generateButton}>
                <LinearGradient
                  colors={['#059669', '#10b981']}
                  style={styles.generateButtonGradient}
                >
                  <Ionicons name="refresh" size={20} color="white" />
                  <Text style={styles.generateButtonText}>Generate New Tips</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>

        {/* Ask AI Button */}
        <TouchableOpacity style={styles.askAIButton}>
          <LinearGradient
            colors={['#059669', '#10b981']}
            style={styles.askAIGradient}
          >
            <Ionicons name="chatbubble-ellipses" size={20} color="white" />
            <Text style={styles.askAIText}>Ask AI</Text>
          </LinearGradient>
        </TouchableOpacity>

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
  aiHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  aiHeaderGradient: {
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  aiHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiHeaderIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  aiHeaderText: {
    flex: 1,
  },
  aiHeaderTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  aiHeaderSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#374151',
  },
  categoryContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryScroll: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryChipActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  urgentContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  urgentGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  urgentText: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 24,
    color: '#065f46',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  tipsContainer: {
    paddingHorizontal: 20,
  },
  tipCard: {
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
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  tipTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipTitleText: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipCrop: {
    fontSize: 12,
    color: '#6b7280',
  },
  tipHeaderActions: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 8,
  },
  confidenceBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginRight: 8,
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  confidenceText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: 'bold',
  },
  tipDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 15,
  },
  benefitsContainer: {
    marginBottom: 15,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
    flex: 1,
  },
  stepsContainer: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  stepsTitle: {
    fontSize: 14,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  stepNumber: {
    fontSize: 12,
    color: '#059669',
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: 2,
  },
  stepText: {
    fontSize: 12,
    color: '#6b7280',
    flex: 1,
    lineHeight: 16,
  },
  moreSteps: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
    marginTop: 4,
  },
  tipActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginRight: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  implementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#059669',
    borderRadius: 12,
    marginLeft: 'auto',
  },
  implementedButton: {
    backgroundColor: '#10b981',
  },
  implementText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    marginBottom: 8,
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
    marginRight: 4,
  },
  timestamp: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
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
    marginBottom: 20,
    lineHeight: 22,
  },
  generateButton: {
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  generateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 15,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  askAIButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  askAIGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  askAIText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default AITipsScreen;