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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Crop {
    id: string;
    name: string;
    variety: string;
    plantedDate: string;
    expectedHarvest: string;
    area: string;
    stage: string;
    health: 'excellent' | 'good' | 'fair' | 'poor';
    icon: string;
    notes: string;
}

const CropManagementScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const [crops, setCrops] = useState<Crop[]>([
        {
            id: '1',
            name: 'Wheat',
            variety: 'HD-2967',
            plantedDate: '2024-01-15',
            expectedHarvest: '2024-05-15',
            area: '5',
            stage: 'Flowering',
            health: 'good',
            icon: '🌾',
            notes: 'Applied fertilizer last week. Growth is on track.',
        },
        {
            id: '2',
            name: 'Corn',
            variety: 'Sweet Corn',
            plantedDate: '2024-02-01',
            expectedHarvest: '2024-06-01',
            area: '3',
            stage: 'Growing',
            health: 'excellent',
            icon: '🌽',
            notes: 'Excellent growth rate. Weather conditions favorable.',
        },
        {
            id: '3',
            name: 'Rice',
            variety: 'Basmati',
            plantedDate: '2024-01-10',
            expectedHarvest: '2024-04-10',
            area: '7',
            stage: 'Harvesting',
            health: 'fair',
            icon: '🌾',
            notes: 'Some pest issues detected. Treatment applied.',
        },
        {
            id: '4',
            name: 'Tomato',
            variety: 'Cherry',
            plantedDate: '2024-02-10',
            expectedHarvest: '2024-05-10',
            area: '2',
            stage: 'Fruiting',
            health: 'good',
            icon: '🍅',
            notes: 'Regular watering schedule maintained.',
        },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
    const [searchText, setSearchText] = useState('');

    const getHealthColor = (health: string) => {
        switch (health) {
            case 'excellent': return '#10b981';
            case 'good': return '#34d399';
            case 'fair': return '#fbbf24';
            case 'poor': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getStageProgress = (stage: string) => {
        switch (stage) {
            case 'Planted': return 25;
            case 'Growing': return 50;
            case 'Flowering': return 75;
            case 'Fruiting': return 85;
            case 'Harvesting': return 95;
            case 'Harvested': return 100;
            default: return 0;
        }
    };

    const handleAddCrop = () => {
        setSelectedCrop(null);
        setShowAddModal(true);
    };

    const handleEditCrop = (crop: Crop) => {
        setSelectedCrop(crop);
        setShowAddModal(true);
    };

    const handleDeleteCrop = (cropId: string) => {
        setCrops(crops.filter(crop => crop.id !== cropId));
    };

    const handleNavigation = (screen: string) => {
        navigation.navigate(screen);
    };

    const filteredCrops = crops.filter(crop =>
        crop.name.toLowerCase().includes(searchText.toLowerCase()) ||
        crop.variety.toLowerCase().includes(searchText.toLowerCase())
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#059669" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Crop Management</Text>
                    <TouchableOpacity onPress={handleAddCrop}>
                        <Ionicons name="add-circle" size={24} color="#059669" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#6b7280" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search crops..."
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

                {/* Stats Overview */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{crops.length}</Text>
                        <Text style={styles.statLabel}>Total Crops</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            {crops.reduce((sum, crop) => sum + parseFloat(crop.area), 0)} acres
                        </Text>
                        <Text style={styles.statLabel}>Total Area</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            {crops.filter(c => c.health === 'excellent' || c.health === 'good').length}
                        </Text>
                        <Text style={styles.statLabel}>Healthy</Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Crops List */}
                    <View style={styles.cropsContainer}>
                        {filteredCrops.map((crop) => (
                            <View key={crop.id} style={styles.cropCard}>
                                {/* Crop Header */}
                                <View style={styles.cropHeader}>
                                    <View style={styles.cropTitleContainer}>
                                        <Text style={styles.cropIcon}>{crop.icon}</Text>
                                        <View style={styles.cropTitleText}>
                                            <Text style={styles.cropName}>{crop.name}</Text>
                                            <Text style={styles.cropVariety}>{crop.variety}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cropActions}>
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={() => handleEditCrop(crop)}
                                        >
                                            <Ionicons name="pencil" size={16} color="#059669" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.actionButton}
                                            onPress={() => handleDeleteCrop(crop.id)}
                                        >
                                            <Ionicons name="trash" size={16} color="#ef4444" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Crop Details */}
                                <View style={styles.cropDetails}>
                                    <View style={styles.detailRow}>
                                        <View style={styles.detailItem}>
                                            <Ionicons name="calendar" size={14} color="#6b7280" />
                                            <Text style={styles.detailLabel}>Planted</Text>
                                            <Text style={styles.detailValue}>{crop.plantedDate}</Text>
                                        </View>
                                        <View style={styles.detailItem}>
                                            <Ionicons name="location" size={14} color="#6b7280" />
                                            <Text style={styles.detailLabel}>Area</Text>
                                            <Text style={styles.detailValue}>{crop.area}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.detailRow}>
                                        <View style={styles.detailItem}>
                                            <Ionicons name="time" size={14} color="#6b7280" />
                                            <Text style={styles.detailLabel}>Harvest</Text>
                                            <Text style={styles.detailValue}>{crop.expectedHarvest}</Text>
                                        </View>
                                        <View style={styles.detailItem}>
                                            <View style={[styles.healthIndicator, { backgroundColor: getHealthColor(crop.health) }]} />
                                            <Text style={styles.detailLabel}>Health</Text>
                                            <Text style={[styles.detailValue, { color: getHealthColor(crop.health) }]}>
                                                {crop.health.charAt(0).toUpperCase() + crop.health.slice(1)}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Growth Stage Progress */}
                                <View style={styles.progressContainer}>
                                    <View style={styles.progressHeader}>
                                        <Text style={styles.progressLabel}>Growth Stage: {crop.stage}</Text>
                                        <Text style={styles.progressPercentage}>{getStageProgress(crop.stage)}%</Text>
                                    </View>
                                    <View style={styles.progressBar}>
                                        <LinearGradient
                                            colors={['#059669', '#10b981']}
                                            style={[styles.progressFill, { width: `${getStageProgress(crop.stage)}%` }]}
                                        />
                                    </View>
                                </View>

                                {/* Notes */}
                                {crop.notes && (
                                    <View style={styles.notesContainer}>
                                        <Ionicons name="document-text" size={14} color="#6b7280" />
                                        <Text style={styles.notesText}>{crop.notes}</Text>
                                    </View>
                                )}

                                {/* Action Buttons */}
                                <View style={styles.cropActionButtons}>
                                    <TouchableOpacity
                                        style={styles.primaryActionButton}
                                        onPress={() => navigation.navigate('CropDetails', { cropId: crop.id })}
                                    >
                                        <LinearGradient
                                            colors={['#059669', '#10b981']}
                                            style={styles.buttonGradient}
                                        >
                                            <Ionicons name="eye" size={16} color="white" />
                                            <Text style={styles.buttonText}>View Details</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.secondaryActionButton}>
                                        <Ionicons name="analytics" size={16} color="#059669" />
                                        <Text style={styles.secondaryButtonText}>Analytics</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    {filteredCrops.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>🌱</Text>
                            <Text style={styles.emptyTitle}>No crops found</Text>
                            <Text style={styles.emptyMessage}>
                                {searchText ? 'Try adjusting your search' : 'Add your first crop to get started'}
                            </Text>
                            {!searchText && (
                                <TouchableOpacity style={styles.addCropButton} onPress={handleAddCrop}>
                                    <LinearGradient
                                        colors={['#059669', '#10b981']}
                                        style={styles.addButtonGradient}
                                    >
                                        <Ionicons name="add" size={20} color="white" />
                                        <Text style={styles.addButtonText}>Add Crop</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </ScrollView>

                {/* Floating Action Button */}
                <TouchableOpacity style={styles.fab} onPress={handleAddCrop}>
                    <LinearGradient
                        colors={['#059669', '#10b981']}
                        style={styles.fabGradient}
                    >
                        <Ionicons name="add" size={24} color="white" />
                    </LinearGradient>
                </TouchableOpacity>

                {/* Add/Edit Crop Modal */}
                <Modal
                    visible={showAddModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setShowAddModal(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>
                                    {selectedCrop ? 'Edit Crop' : 'Add New Crop'}
                                </Text>
                                <TouchableOpacity onPress={() => setShowAddModal(false)}>
                                    <Ionicons name="close" size={24} color="#6b7280" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalMessage}>
                                        {selectedCrop
                                            ? 'Edit your crop details below:'
                                            : 'Add a new crop to your farm management system:'}
                                    </Text>

                                    <View style={styles.formContainer}>
                                        <Text style={styles.inputLabel}>Crop Name</Text>
                                        <View style={styles.inputContainer}>
                                            <Ionicons name="leaf" size={20} color="#059669" />
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="e.g., Wheat, Rice, Corn"
                                                placeholderTextColor="#9ca3af"
                                            />
                                        </View>

                                        <Text style={styles.inputLabel}>Variety</Text>
                                        <View style={styles.inputContainer}>
                                            <Ionicons name="flower" size={20} color="#059669" />
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="e.g., HD-2967, Basmati"
                                                placeholderTextColor="#9ca3af"
                                            />
                                        </View>

                                        <Text style={styles.inputLabel}>Area (acres)</Text>
                                        <View style={styles.inputContainer}>
                                            <Ionicons name="resize" size={20} color="#059669" />
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="e.g., 5"
                                                keyboardType="numeric"
                                                placeholderTextColor="#9ca3af"
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.modalActions}>
                                        <TouchableOpacity
                                            style={styles.cancelButton}
                                            onPress={() => setShowAddModal(false)}
                                        >
                                            <Text style={styles.cancelButtonText}>Cancel</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.saveButton}>
                                            <LinearGradient
                                                colors={['#059669', '#10b981']}
                                                style={styles.saveButtonGradient}
                                            >
                                                <Text style={styles.saveButtonText}>
                                                    {selectedCrop ? 'Update' : 'Add'} Crop
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
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
    container: { flex: 1, backgroundColor: '#f0fdf4', }, backgroundGradient: { flex: 1, }, header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, }, headerTitle: { fontSize: 20, color: '#065f46', fontWeight: 'bold', }, searchContainer: { paddingHorizontal: 20, marginBottom: 20, }, searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, }, searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#374151', }, statsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, }, statCard: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 15, padding: 15, alignItems: 'center', marginHorizontal: 5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, }, statNumber: { fontSize: 20, color: '#065f46', fontWeight: 'bold', marginBottom: 4, }, statLabel: { fontSize: 12, color: '#6b7280', fontWeight: '500', }, scrollContent: { paddingHorizontal: 20, paddingBottom: 80, }, cropsContainer: { paddingBottom: 20, }, cropCard: { backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 20, padding: 20, marginBottom: 20, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, }, cropHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, }, cropTitleContainer: { flexDirection: 'row', alignItems: 'center', flex: 1, }, cropIcon: { fontSize: 28, marginRight: 12, }, cropTitleText: { flex: 1, }, cropName: { fontSize: 18, color: '#374151', fontWeight: 'bold', marginBottom: 2, }, cropVariety: { fontSize: 14, color: '#6b7280', }, cropActions: { flexDirection: 'row', }, actionButton: { padding: 8, borderRadius: 8, backgroundColor: '#f9fafb', marginLeft: 8, }, cropDetails: { marginBottom: 15, }, detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }, detailItem: { flex: 1, flexDirection: 'row', alignItems: 'center', }, detailLabel: { fontSize: 12, color: '#6b7280', marginLeft: 6, marginRight: 4, }, detailValue: { fontSize: 12, color: '#374151', fontWeight: '500', }, healthIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: 6, }, progressContainer: { marginBottom: 15, }, progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, }, progressLabel: { fontSize: 14, color: '#374151', fontWeight: '600', }, progressPercentage: { fontSize: 14, color: '#059669', fontWeight: 'bold', }, progressBar: { height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, }, progressFill: { height: '100%', borderRadius: 4, }, notesContainer: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#f9fafb', padding: 12, borderRadius: 10, marginBottom: 15, }, notesText: { fontSize: 12, color: '#6b7280', marginLeft: 8, flex: 1, lineHeight: 16, }, cropActionButtons: { flexDirection: 'row', justifyContent: 'space-between', }, primaryActionButton: { flex: 1, marginRight: 8, borderRadius: 12, elevation: 2, shadowColor: '#059669', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, }, buttonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, }, buttonText: { color: 'white', fontSize: 14, fontWeight: '600', marginLeft: 6, }, secondaryActionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: 'rgba(5, 150, 105, 0.1)', borderRadius: 12, borderWidth: 1, borderColor: '#059669', marginLeft: 8, }, secondaryButtonText: { color: '#059669', fontSize: 14, fontWeight: '600', marginLeft: 6, }, emptyContainer: { alignItems: 'center', paddingVertical: 60, }, emptyIcon: { fontSize: 48, marginBottom: 16, }, emptyTitle: { fontSize: 20, color: '#374151', fontWeight: 'bold', marginBottom: 8, }, emptyMessage: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 20, }, addCropButton: { borderRadius: 15, elevation: 4, shadowColor: '#059669', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 6, }, addButtonGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 15, }, addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 8, }, fab: { position: 'absolute', bottom: 20, right: 20, borderRadius: 28, elevation: 8, shadowColor: '#059669', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, }, fabGradient: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', }, modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end', }, modalContainer: { backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, maxHeight: '80%', }, modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', }, modalTitle: { fontSize: 20, color: '#374151', fontWeight: 'bold', }, modalContent: { padding: 20, }, modalMessage: { fontSize: 16, color: '#6b7280', marginBottom: 20, }, formContainer: { marginBottom: 30, }, inputLabel: { fontSize: 14, color: '#374151', fontWeight: '600', marginBottom: 8, marginTop: 15, }, inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fafb', borderRadius: 12, paddingHorizontal: 15, paddingVertical: 4, borderWidth: 1, borderColor: '#e5e7eb', }, textInput: { flex: 1, fontSize: 16, color: '#374151', paddingVertical: 12, paddingHorizontal: 10, }, modalActions: { flexDirection: 'row', justifyContent: 'space-between', }, cancelButton: { flex: 1, paddingVertical: 14, alignItems: 'center', backgroundColor: '#f9fafb', borderRadius: 12, marginRight: 10, borderWidth: 1, borderColor: '#e5e7eb', }, cancelButtonText: { fontSize: 16, color: '#6b7280', fontWeight: '600', }, saveButton: { flex: 1, borderRadius: 12, marginLeft: 10, elevation: 3, shadowColor: '#059669', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, }, saveButtonGradient: { paddingVertical: 14, alignItems: 'center', borderRadius: 12, }, saveButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', },
});

export default CropManagementScreen;
