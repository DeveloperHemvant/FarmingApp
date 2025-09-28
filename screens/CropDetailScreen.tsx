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
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface CropInfo {
  id: string;
  name: string;
  scientificName: string;
  stage: string;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  plantedDate: string;
  harvestDate: string;
  soilType: string;
  temperature: string;
  humidity: string;
  icon: string;
}

interface ProductItem {
  id: string;
  name: string;
  type: 'fertilizer' | 'organic';
  category: string;
  price: string;
  rating: number;
  reviews: number;
  brand: string;
  nutrients: string[];
  description: string;
  inStock: boolean;
  image: string;
}

interface NutrientInfo {
  name: string;
  symbol: string;
  currentLevel: number;
  optimalRange: string;
  status: 'low' | 'optimal' | 'high';
  color: string;
  icon: string;
}

const CropDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'fertilizer' | 'organic'>('fertilizer');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');

  const cropInfo: CropInfo = {
    id: '1',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    stage: 'Flowering Stage',
    health: 'good',
    plantedDate: '15 Nov 2024',
    harvestDate: '25 Mar 2025',
    soilType: 'Loamy',
    temperature: '18-22°C',
    humidity: '60-70%',
    icon: '🌾'
  };

  const nutrients: NutrientInfo[] = [
    {
      name: 'Nitrogen',
      symbol: 'N',
      currentLevel: 75,
      optimalRange: '80-120 ppm',
      status: 'low',
      color: '#3b82f6',
      icon: '🟦'
    },
    {
      name: 'Phosphorous',
      symbol: 'P',
      currentLevel: 45,
      optimalRange: '30-50 ppm',
      status: 'optimal',
      color: '#8b5cf6',
      icon: '🟪'
    },
    {
      name: 'Potassium',
      symbol: 'K',
      currentLevel: 180,
      optimalRange: '150-200 ppm',
      status: 'optimal',
      color: '#f59e0b',
      icon: '🟨'
    },
    {
      name: 'Calcium',
      symbol: 'Ca',
      currentLevel: 920,
      optimalRange: '800-1200 ppm',
      status: 'optimal',
      color: '#10b981',
      icon: '🟩'
    },
    {
      name: 'Magnesium',
      symbol: 'Mg',
      currentLevel: 85,
      optimalRange: '60-120 ppm',
      status: 'optimal',
      color: '#ec4899',
      icon: '🟥'
    },
    {
      name: 'Sulfur',
      symbol: 'S',
      currentLevel: 25,
      optimalRange: '20-40 ppm',
      status: 'optimal',
      color: '#6366f1',
      icon: '🟣'
    }
  ];

  const fertilizerProducts: ProductItem[] = [
    {
      id: '1',
      name: 'NPK 20-20-20 Complete Fertilizer',
      type: 'fertilizer',
      category: 'complete',
      price: '₹450',
      rating: 4.5,
      reviews: 128,
      brand: 'AgroMax',
      nutrients: ['Nitrogen 20%', 'Phosphorus 20%', 'Potassium 20%'],
      description: 'Balanced fertilizer perfect for wheat flowering stage. Provides equal amounts of NPK for optimal growth.',
      inStock: true,
      image: '🧪'
    },
    {
      id: '2',
      name: 'Urea 46% Nitrogen Booster',
      type: 'fertilizer',
      category: 'nitrogen',
      price: '₹320',
      rating: 4.3,
      reviews: 89,
      brand: 'FarmGrow',
      nutrients: ['Nitrogen 46%'],
      description: 'High nitrogen content fertilizer ideal for vegetative growth and tillering stage of wheat.',
      inStock: true,
      image: '⚗️'
    },
    {
      id: '3',
      name: 'DAP - Diammonium Phosphate',
      type: 'fertilizer',
      category: 'phosphorus',
      price: '₹550',
      rating: 4.6,
      reviews: 156,
      brand: 'CropCare',
      nutrients: ['Nitrogen 18%', 'Phosphorus 46%'],
      description: 'Excellent source of phosphorus for root development and flowering. Essential for wheat grain formation.',
      inStock: true,
      image: '🔬'
    },
    {
      id: '4',
      name: 'Potash (Muriate of Potash)',
      type: 'fertilizer',
      category: 'potassium',
      price: '₹380',
      rating: 4.4,
      reviews: 73,
      brand: 'NutriPlant',
      nutrients: ['Potassium 60%'],
      description: 'High potassium fertilizer for improved grain quality and disease resistance in wheat crops.',
      inStock: false,
      image: '⚱️'
    }
  ];

  const organicProducts: ProductItem[] = [
    {
      id: '5',
      name: 'Organic Cow Manure Compost',
      type: 'organic',
      category: 'compost',
      price: '₹180',
      rating: 4.7,
      reviews: 234,
      brand: 'EcoFarm',
      nutrients: ['Nitrogen 2%', 'Phosphorus 1%', 'Organic Matter 85%'],
      description: 'Premium quality cow manure compost rich in organic matter. Improves soil structure and water retention.',
      inStock: true,
      image: '🌱'
    },
    {
      id: '6',
      name: 'Vermicompost Premium Grade',
      type: 'organic',
      category: 'compost',
      price: '₹240',
      rating: 4.8,
      reviews: 187,
      brand: 'WormGold',
      nutrients: ['Nitrogen 1.5%', 'Phosphorus 1%', 'Potassium 1.2%'],
      description: 'High-quality vermicompost produced by earthworms. Rich in beneficial microorganisms and nutrients.',
      inStock: true,
      image: '🪱'
    },
    {
      id: '7',
      name: 'Neem Cake Organic Fertilizer',
      type: 'organic',
      category: 'pest-control',
      price: '₹350',
      rating: 4.5,
      reviews: 92,
      brand: 'NeemCare',
      nutrients: ['Nitrogen 4%', 'Phosphorus 1%', 'Neem Oil residue'],
      description: 'Dual-purpose organic fertilizer with natural pest control properties. Protects wheat from soil pests.',
      inStock: true,
      image: '🌿'
    },
    {
      id: '8',
      name: 'Bone Meal Phosphorus Rich',
      type: 'organic',
      category: 'phosphorus',
      price: '₹420',
      rating: 4.4,
      reviews: 67,
      brand: 'OrganicPlus',
      nutrients: ['Phosphorus 12%', 'Calcium 20%', 'Protein 50%'],
      description: 'Slow-release organic phosphorus source. Perfect for wheat root development and grain formation.',
      inStock: true,
      image: '🦴'
    }
  ];

  const filterCategories = [
    { id: 'all', name: 'All Products', count: 8 },
    { id: 'complete', name: 'Complete NPK', count: 1 },
    { id: 'nitrogen', name: 'Nitrogen Rich', count: 2 },
    { id: 'phosphorus', name: 'Phosphorus Rich', count: 2 },
    { id: 'potassium', name: 'Potassium Rich', count: 1 },
    { id: 'compost', name: 'Compost', count: 2 },
    { id: 'pest-control', name: 'Pest Control', count: 1 }
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return '#10b981';
      case 'good': return '#059669';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getNutrientStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#10b981';
      case 'low': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getFilteredProducts = () => {
    const products = activeTab === 'fertilizer' ? fertilizerProducts : organicProducts;
    let filtered = selectedCategory === 'all'
      ? products
      : products.filter(p => p.category === selectedCategory);

    if (sortBy === 'price-low') {
      filtered = filtered.sort((a, b) => parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', '')));
    } else if (sortBy === 'price-high') {
      filtered = filtered.sort((a, b) => parseInt(b.price.replace('₹', '')) - parseInt(a.price.replace('₹', '')));
    } else if (sortBy === 'rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Ionicons
        key={i}
        name={i < Math.floor(rating) ? "star" : i < rating ? "star-half" : "star-outline"}
        size={14}
        color="#f59e0b"
      />
    ));
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#059669" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Crop Details</Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilter(true)}
          >
            <Ionicons name="filter" size={24} color="#059669" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Crop Info Card */}
          <View style={styles.cropInfoCard}>
            <View style={styles.cropHeader}>
              <View style={styles.cropIconContainer}>
                <Text style={styles.cropIcon}>{cropInfo.icon}</Text>
              </View>
              <View style={styles.cropDetails}>
                <Text style={styles.cropName}>{cropInfo.name}</Text>
                <Text style={styles.scientificName}>{cropInfo.scientificName}</Text>
                <View style={styles.stageContainer}>
                  <Text style={styles.stageText}>{cropInfo.stage}</Text>
                  <View style={[styles.healthIndicator, { backgroundColor: getHealthColor(cropInfo.health) }]} />
                </View>
              </View>
            </View>

            <View style={styles.cropMetrics}>
              <View style={styles.metricItem}>
                <Ionicons name="calendar-outline" size={20} color="#059669" />
                <Text style={styles.metricLabel}>Planted</Text>
                <Text style={styles.metricValue}>{cropInfo.plantedDate}</Text>
              </View>
              <View style={styles.metricItem}>
                <Ionicons name="time-outline" size={20} color="#059669" />
                <Text style={styles.metricLabel}>Harvest</Text>
                <Text style={styles.metricValue}>{cropInfo.harvestDate}</Text>
              </View>
              <View style={styles.metricItem}>
                <Ionicons name="earth-outline" size={20} color="#059669" />
                <Text style={styles.metricLabel}>Soil Type</Text>
                <Text style={styles.metricValue}>{cropInfo.soilType}</Text>
              </View>
            </View>
          </View>

          {/* Nutrient Analysis */}
          <View style={styles.nutrientSection}>
            <Text style={styles.sectionTitle}>Soil Nutrient Analysis</Text>
            <View style={styles.nutrientGrid}>
              {nutrients.map((nutrient, index) => (
                <View key={index} style={styles.nutrientCard}>
                  <View style={styles.nutrientHeader}>
                    <Text style={styles.nutrientIcon}>{nutrient.icon}</Text>
                    <View style={styles.nutrientInfo}>
                      <Text style={styles.nutrientName}>{nutrient.name}</Text>
                      <Text style={styles.nutrientSymbol}>({nutrient.symbol})</Text>
                    </View>
                    <View style={[styles.nutrientStatus, { backgroundColor: getNutrientStatusColor(nutrient.status) }]}>
                      <Text style={styles.statusText}>{nutrient.status.toUpperCase()}</Text>
                    </View>
                  </View>
                  <Text style={styles.currentLevel}>{nutrient.currentLevel} ppm</Text>
                  <Text style={styles.optimalRange}>Optimal: {nutrient.optimalRange}</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(nutrient.currentLevel / 200 * 100, 100)}%`,
                          backgroundColor: nutrient.color
                        }
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Product Tabs */}
          <View style={styles.tabSection}>
            <Text style={styles.sectionTitle}>Recommended Products</Text>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'fertilizer' && styles.activeTab]}
                onPress={() => setActiveTab('fertilizer')}
              >
                <Ionicons
                  name="flask-outline"
                  size={20}
                  color={activeTab === 'fertilizer' ? 'white' : '#6b7280'}
                />
                <Text style={[styles.tabText, activeTab === 'fertilizer' && styles.activeTabText]}>
                  Fertilizers
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'organic' && styles.activeTab]}
                onPress={() => setActiveTab('organic')}
              >
                <Ionicons
                  name="leaf-outline"
                  size={20}
                  color={activeTab === 'organic' ? 'white' : '#6b7280'}
                />
                <Text style={[styles.tabText, activeTab === 'organic' && styles.activeTabText]}>
                  Organic
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Product List */}
          <View style={styles.productList}>
            {getFilteredProducts().map((product) => (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productHeader}>
                  <View style={styles.productImageContainer}>
                    <Text style={styles.productImage}>{product.image}</Text>
                    {!product.inStock && (
                      <View style={styles.outOfStockBadge}>
                        <Text style={styles.outOfStockText}>Out of Stock</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productBrand}>by {product.brand}</Text>
                    <View style={styles.ratingContainer}>
                      <View style={styles.stars}>
                        {renderStars(product.rating)}
                      </View>
                      <Text style={styles.ratingText}>({product.reviews})</Text>
                    </View>
                    <View style={styles.nutrientTags}>
                      {product.nutrients.slice(0, 2).map((nutrient, index) => (
                        <View key={index} style={styles.nutrientTag}>
                          <Text style={styles.nutrientTagText}>{nutrient}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.productPrice}>
                    <Text style={styles.priceText}>{product.price}</Text>
                    <Text style={styles.priceUnit}>per 50kg</Text>
                  </View>
                </View>

                <Text style={styles.productDescription}>{product.description}</Text>

                <View style={styles.productActions}>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.addToCartButton, !product.inStock && styles.disabledButton]}
                    disabled={!product.inStock}
                  >
                    <LinearGradient
                      colors={product.inStock ? ['#059669', '#10b981'] : ['#9ca3af', '#6b7280']}
                      style={styles.addToCartGradient}
                    >
                      <Ionicons name="cart-outline" size={18} color="white" />
                      <Text style={styles.addToCartText}>
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Filter Modal */}
        <Modal
          visible={showFilter}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.filterModalContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowFilter(false)}>
                  <Ionicons name="close" size={24} color="#6b7280" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Filter Products</Text>
                <TouchableOpacity>
                  <Text style={styles.applyButton}>Apply</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.filterContent}>
                <View style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>Category</Text>
                  {filterCategories.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        styles.filterOption,
                        selectedCategory === category.id && styles.selectedFilterOption
                      ]}
                      onPress={() => setSelectedCategory(category.id)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedCategory === category.id && styles.selectedFilterText
                      ]}>
                        {category.name} ({category.count})
                      </Text>
                      {selectedCategory === category.id && (
                        <Ionicons name="checkmark" size={20} color="#059669" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>Sort By</Text>
                  {[
                    { id: 'popular', name: 'Most Popular' },
                    { id: 'rating', name: 'Highest Rated' },
                    { id: 'price-low', name: 'Price: Low to High' },
                    { id: 'price-high', name: 'Price: High to Low' }
                  ].map((sort) => (
                    <TouchableOpacity
                      key={sort.id}
                      style={[
                        styles.filterOption,
                        sortBy === sort.id && styles.selectedFilterOption
                      ]}
                      onPress={() => setSortBy(sort.id)}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        sortBy === sort.id && styles.selectedFilterText
                      ]}>
                        {sort.name}
                      </Text>
                      {sortBy === sort.id && (
                        <Ionicons name="checkmark" size={20} color="#059669" />
                      )}
                    </TouchableOpacity>
                  ))}
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
  filterButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cropInfoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cropHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cropIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  cropIcon: {
    fontSize: 40,
  },
  cropDetails: {
    flex: 1,
  },
  cropName: {
    fontSize: 24,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  scientificName: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  stageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stageText: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '600',
    marginRight: 10,
  },
  healthIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  cropMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 5,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  nutrientSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  nutrientGrid: {
    gap: 15,
  },
  nutrientCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  nutrientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nutrientIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  nutrientInfo: {
    flex: 1,
  },
  nutrientName: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  nutrientSymbol: {
    fontSize: 12,
    color: '#6b7280',
  },
  nutrientStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  currentLevel: {
    fontSize: 18,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  optimalRange: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  tabSection: {
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 11,
  },
  activeTab: {
    backgroundColor: '#059669',
  },
  tabText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
    marginLeft: 8,
  },
  activeTabText: {
    color: 'white',
  },
  productList: {
    gap: 15,
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  productImageContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  productImage: {
    fontSize: 24,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  outOfStockText: {
    fontSize: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  productInfo: {
    flex: 1,
    marginRight: 15,
  },
  productName: {
    fontSize: 16,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 6,
  },
  ratingText: {
    fontSize: 12,
    color: '#6b7280',
  },
  nutrientTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  nutrientTag: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  nutrientTagText: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '600',
  },
  productPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    color: '#059669',
    fontWeight: 'bold',
  },
  priceUnit: {
    fontSize: 12,
    color: '#6b7280',
  },
  productDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  productActions: {
    flexDirection: 'row',
    gap: 10,
  },
  detailsButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#059669',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  addToCartButton: {
    flex: 1.2,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    elevation: 0,
    shadowOpacity: 0,
  },
  addToCartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  addToCartText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModalContainer: {
    backgroundColor: '#f0fdf4',
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
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    color: '#065f46',
    fontWeight: 'bold',
  },
  applyButton: {
    fontSize: 16,
    color: '#059669',
    fontWeight: 'bold',
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  filterSection: {
    marginBottom: 30,
  },
  filterSectionTitle: {
    fontSize: 16,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedFilterOption: {
    backgroundColor: '#dcfce7',
    borderWidth: 1,
    borderColor: '#059669',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  selectedFilterText: {
    color: '#059669',
    fontWeight: '600',
  },
});

export default CropDetailScreen;