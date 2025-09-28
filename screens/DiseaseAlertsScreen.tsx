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

interface DiseaseAlert {
    id: string;
    title: string;
    crop: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    symptoms: string[];
    preventiveMeasures: string[];
    treatment: string;
    icon: string;
    reportedDate: string;
    location: string;
    affectedArea: string;
}

const DiseaseAlertsScreen: React.FC = () => {
    const [alerts, setAlerts] = useState<DiseaseAlert[]>([
        {
            id: '1',
            title: 'Wheat Rust Disease',
            crop: 'Wheat',
            severity: 'high',
            description: 'Fungal disease affecting wheat crops in the region. Immediate attention required.',
            symptoms: ['Yellow/orange pustules on leaves', 'Premature leaf death', 'Reduced grain quality'],
            preventiveMeasures: [
                'Use resistant wheat varieties',
                'Maintain proper field sanitation',
                'Apply fungicide at early growth stages',
                'Ensure adequate spacing between plants'
            ],
            treatment: 'Apply systemic fungicide (Propiconazole) at 0.1% concentration. Repeat after 15 days if necessary.',
            icon: '🦠',
            reportedDate: '2024-03-15',
            location: 'Punjab, Chandigarh',
            affectedArea: '150 acres',
        },
        {
            id: '2',
            title: 'Rice Blast',
            crop: 'Rice',
            severity: 'medium',
            description: 'Common rice disease causing significant yield losses if not controlled early.',
            symptoms: ['Diamond-shaped lesions on leaves', 'Brown spots with yellow halos', 'Neck rot in severe cases'],
            preventiveMeasures: [
                'Use certified disease-free seeds',
                'Avoid excessive nitrogen fertilization',
                'Maintain proper water management',
                'Remove infected plant debris'
            ],
            treatment: 'Spray Tricyclazole 75% WP @ 0.6g/L or Kasugamycin 3% SL @ 2ml/L at 7-10 day intervals.',
            icon: '🍃',
            reportedDate: '2024-03-12',
            location: 'Haryana',
            affectedArea: '89 acres',
        },
        {
            id: '3',
            title: 'Tomato Late Blight',
            crop: 'Tomato',
            severity: 'critical',
            description: 'Rapidly spreading disease that can destroy entire tomato crops within days.',
            symptoms: ['Dark water-soaked spots on leaves', 'White fungal growth on leaf undersides', 'Fruit rot'],
            preventiveMeasures: [
                'Ensure good air circulation',
                'Avoid overhead irrigation',
                'Use copper-based fungicides preventively',
                'Remove infected plants immediately'
            ],
            treatment: 'Emergency treatment with Metalaxyl + Mancozeb combination. Spray every 5-7 days until controlled.',
            icon: '🍅',
            reportedDate: '2024-03-10',
            location: 'Delhi NCR',
            affectedArea: '45 acres',
        },
        {
            id: '4',
            title: 'Corn Stem Borer',
            crop: 'Corn',
            severity: 'low',
            description: 'Insect pest causing damage to corn stems and reducing yield potential.',
            symptoms: ['Small holes in corn stems', 'Sawdust-like frass around holes', 'Weakened stalks'],
            preventiveMeasures: [
                'Use pheromone traps for monitoring',
                'Plant resistant corn varieties',
                'Maintain field hygiene',
                'Use biological control agents'
            ],
            treatment: 'Apply Chlorantraniliprole 18.5% SC @ 3ml/10L water or use Trichogramma egg parasites.',
            icon: '🌽',
            reportedDate: '2024-03-08',
            location: 'Uttar Pradesh',
            affectedArea: '23 acres',
        },
    ]);

    const [searchText, setSearchText] = useState('');
    const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return '#ef4444';
            case 'high': return '#f59e0b';
            case 'medium': return '#eab308';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'critical': return 'warning';
            case 'high': return 'alert-circle';
            case 'medium': return 'information-circle';
            case 'low': return 'checkmark-circle';
            default: return 'help-circle';
        }
    };

    const handleNavigation = (screen: string) => {
        console.log(`Navigate to ${screen}`);
    };

    const filteredAlerts = alerts.filter(alert => {
        const matchesSearch = alert.title.toLowerCase().includes(searchText.toLowerCase()) ||
            alert.crop.toLowerCase().includes(searchText.toLowerCase());
        const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
        return matchesSearch && matchesSeverity;
    });

    const severityOptions = ['all', 'critical', 'high', 'medium', 'low'];

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
                    <Text style={styles.headerTitle}>Disease Alerts</Text>
                    <TouchableOpacity onPress={() => handleNavigation('AddAlert')}>
                        <Ionicons name="add-circle" size={24} color="#059669" />
                    </TouchableOpacity>
                </View>

                {/* Search and Filter */}
                <View style={styles.searchFilterContainer}>
                    {/* Search Bar */}
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#6b7280" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search diseases, crops..."
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

                    {/* Severity Filter */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                        {severityOptions.map((severity) => (
                            <TouchableOpacity
                                key={severity}
                                style={[
                                    styles.filterChip,
                                    selectedSeverity === severity && styles.filterChipActive
                                ]}
                                onPress={() => setSelectedSeverity(severity)}
                            >
                                <Text style={[
                                    styles.filterChipText,
                                    selectedSeverity === severity && styles.filterChipTextActive
                                ]}>
                                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Stats Overview */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{alerts.length}</Text>
                        <Text style={styles.statLabel}>Total Alerts</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[styles.statNumber, { color: '#ef4444' }]}>
                            {alerts.filter(a => a.severity === 'critical' || a.severity === 'high').length}
                        </Text>
                        <Text style={styles.statLabel}>High Priority</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            {alerts.reduce((sum, alert) => sum + parseFloat(alert.affectedArea), 0)} acres
                        </Text>
                        <Text style={styles.statLabel}>Affected Area</Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Alerts List */}
                    <View style={styles.alertsContainer}>
                        {filteredAlerts.map((alert) => (
                            <View key={alert.id} style={styles.alertCard}>
                                {/* Alert Header */}
                                <View style={styles.alertHeader}>
                                    <View style={styles.alertTitleContainer}>
                                        <Text style={styles.alertIcon}>{alert.icon}</Text>
                                        <View style={styles.alertTitleText}>
                                            <Text style={styles.alertTitle}>{alert.title}</Text>
                                            <Text style={styles.alertCrop}>{alert.crop} • {alert.location}</Text>
                                        </View>
                                    </View>
                                    <View style={[
                                        styles.severityBadge,
                                        { backgroundColor: getSeverityColor(alert.severity) }
                                    ]}>
                                        <Ionicons
                                            name={getSeverityIcon(alert.severity)}
                                            size={14}
                                            color="white"
                                        />
                                        <Text style={styles.severityText}>
                                            {alert.severity.toUpperCase()}
                                        </Text>
                                    </View>
                                </View>

                                {/* Alert Info */}
                                <View style={styles.alertInfo}>
                                    <View style={styles.infoRow}>
                                        <Ionicons name="calendar" size={14} color="#6b7280" />
                                        <Text style={styles.infoText}>Reported: {alert.reportedDate}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Ionicons name="resize" size={14} color="#6b7280" />
                                        <Text style={styles.infoText}>Affected: {alert.affectedArea}</Text>
                                    </View>
                                </View>

                                {/* Description */}
                                <Text style={styles.alertDescription}>{alert.description}</Text>

                                {/* Symptoms */}
                                <View style={styles.symptomsContainer}>
                                    <Text style={styles.sectionTitle}>🔍 Symptoms</Text>
                                    {alert.symptoms.slice(0, 2).map((symptom, index) => (
                                        <View key={index} style={styles.listItem}>
                                            <Text style={styles.listBullet}>•</Text>
                                            <Text style={styles.listText}>{symptom}</Text>
                                        </View>
                                    ))}
                                    {alert.symptoms.length > 2 && (
                                        <Text style={styles.moreText}>+{alert.symptoms.length - 2} more symptoms</Text>
                                    )}
                                </View>

                                {/* Preventive Measures */}
                                <View style={styles.preventionContainer}>
                                    <Text style={styles.sectionTitle}>🛡️ Prevention</Text>
                                    {alert.preventiveMeasures.slice(0, 2).map((measure, index) => (
                                        <View key={index} style={styles.listItem}>
                                            <Text style={styles.listBullet}>•</Text>
                                            <Text style={styles.listText}>{measure}</Text>
                                        </View>
                                    ))}
                                    {alert.preventiveMeasures.length > 2 && (
                                        <Text style={styles.moreText}>+{alert.preventiveMeasures.length - 2} more measures</Text>
                                    )}
                                </View>

                                {/* Treatment */}
                                <View style={styles.treatmentContainer}>
                                    <Text style={styles.sectionTitle}>💊 Treatment</Text>
                                    <Text style={styles.treatmentText}>{alert.treatment}</Text>
                                </View>

                                {/* Action Buttons */}
                                <View style={styles.alertActions}>
                                    <TouchableOpacity style={styles.primaryActionButton}>
                                        <LinearGradient
                                            colors={['#059669', '#10b981']}
                                            style={styles.buttonGradient}
                                        >
                                            <Ionicons name="eye" size={16} color="white" />
                                            <Text style={styles.buttonText}>View Details</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.secondaryActionButton}>
                                        <Ionicons name="share" size={16} color="#059669" />
                                        <Text style={styles.secondaryButtonText}>Share</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.secondaryActionButton}>
                                        <Ionicons name="bookmark-outline" size={16} color="#059669" />
                                        <Text style={styles.secondaryButtonText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                    {filteredAlerts.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyIcon}>🔍</Text>
                            <Text style={styles.emptyTitle}>No alerts found</Text>
                            <Text style={styles.emptyMessage}>
                                {searchText ? 'Try adjusting your search criteria' : 'No disease alerts at the moment'}
                            </Text>
                        </View>
                    )}

                    {/* Emergency Contact */}
                    <View style={styles.emergencyContainer}>
                        <LinearGradient
                            colors={['#ef4444', '#f87171']}
                            style={styles.emergencyGradient}
                        >
                            <Ionicons name="call" size={24} color="white" />
                            <View style={styles.emergencyText}>
                                <Text style={styles.emergencyTitle}>Emergency Helpline</Text>
                                <Text style={styles.emergencySubtitle}>24/7 Agricultural Expert Support</Text>
                            </View>
                            <TouchableOpacity style={styles.callButton}>
                                <Text style={styles.callButtonText}>CALL</Text>
                            </TouchableOpacity>
                        </LinearGradient>
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
    searchFilterContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
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
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#374151',
    },
    filterContainer: {
        flexDirection: 'row',
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    filterChipActive: {
        backgroundColor: '#059669',
        borderColor: '#059669',
    },
    filterChipText: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '500',
    },
    filterChipTextActive: {
        color: 'white',
        fontWeight: 'bold',
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
        fontSize: 20,
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
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    alertsContainer: {
        paddingBottom: 20,
    },
    alertCard: {
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
    alertHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    alertTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    alertIcon: {
        fontSize: 28,
        marginRight: 12,
    },
    alertTitleText: {
        flex: 1,
    },
    alertTitle: {
        fontSize: 18,
        color: '#374151',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    alertCrop: {
        fontSize: 14,
        color: '#6b7280',
    },
    severityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    severityText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    alertInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        color: '#6b7280',
        marginLeft: 6,
    },
    alertDescription: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
        marginBottom: 15,
    },
    symptomsContainer: {
        marginBottom: 15,
    },
    preventionContainer: {
        marginBottom: 15,
    },
    treatmentContainer: {
        marginBottom: 20,
        backgroundColor: '#f0fdf4',
        padding: 12,
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 14,
        color: '#374151',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    listBullet: {
        color: '#059669',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
        marginTop: 2,
    },
    listText: {
        fontSize: 12,
        color: '#6b7280',
        flex: 1,
        lineHeight: 16,
    },
    moreText: {
        fontSize: 12,
        color: '#059669',
        fontWeight: '600',
        marginTop: 4,
    },
    treatmentText: {
        fontSize: 12,
        color: '#374151',
        lineHeight: 16,
    },
    alertActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    primaryActionButton: {
        flex: 2,
        marginRight: 8,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#059669',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    secondaryActionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#059669',
        marginLeft: 4,
    },
    secondaryButtonText: {
        color: '#059669',
        fontSize: 10,
        fontWeight: '600',
        marginLeft: 4,
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
    emergencyContainer: {
        borderRadius: 20,
        elevation: 6,
        shadowColor: '#ef4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        marginTop: 20,
    },
    emergencyGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
    },
    emergencyText: {
        flex: 1,
        marginLeft: 15,
    },
    emergencyTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    emergencySubtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
    callButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    callButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default DiseaseAlertsScreen;