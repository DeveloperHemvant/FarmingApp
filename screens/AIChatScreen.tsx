import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface ChatMessage {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
    typing?: boolean;
}

interface QuickSuggestion {
    id: string;
    text: string;
    category: string;
}

const AIChatScreen: React.FC = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            text: "Hello! I'm KrishiGPT, your AI farming assistant! 🌱 How can I help you with your crops today?",
            isUser: false,
            timestamp: new Date(),
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const quickSuggestions: QuickSuggestion[] = [
        { id: '1', text: 'Best time to plant wheat?', category: 'planting' },
        { id: '2', text: 'How to control pests organically?', category: 'pest-control' },
        { id: '3', text: 'Fertilizer for tomato plants', category: 'fertilizer' },
        { id: '4', text: 'Crop rotation benefits', category: 'techniques' },
        { id: '5', text: 'Weather impact on crops', category: 'weather' },
        { id: '6', text: 'Soil pH management', category: 'soil' },
    ];

    // Static AI responses based on keywords
    const getAIResponse = (userMessage: string): string => {
        const message = userMessage.toLowerCase();

        if (message.includes('wheat') && message.includes('plant')) {
            return "🌾 **Best Time for Wheat Planting:**\n\n• **Rabi Season**: October-December is ideal\n• **Soil Temperature**: 10-15°C\n• **Soil Moisture**: Ensure adequate moisture\n• **Seed Rate**: 100-125 kg per hectare\n\nFor best results, plant after the monsoon when soil has good moisture content. Would you like specific variety recommendations for your region?";
        }

        if (message.includes('pest') && (message.includes('organic') || message.includes('control'))) {
            return "🦠 **Organic Pest Control Methods:**\n\n• **Neem Oil**: Natural insecticide\n• **Companion Planting**: Marigolds, basil\n• **Beneficial Insects**: Ladybugs, lacewings\n• **Soap Spray**: For soft-bodied insects\n• **Crop Rotation**: Breaks pest cycles\n\n🌿 **Pro Tip**: Mix neem oil with water (1:10 ratio) and spray during evening hours for maximum effectiveness!";
        }

        if (message.includes('fertilizer') && message.includes('tomato')) {
            return "🍅 **Tomato Fertilizer Guide:**\n\n**Stage 1 - Seedling (0-3 weeks):**\n• Low N-P-K: 5-10-5\n• Apply weekly, diluted\n\n**Stage 2 - Vegetative (3-8 weeks):**\n• Higher Nitrogen: 10-5-5\n• Every 2 weeks\n\n**Stage 3 - Flowering/Fruiting:**\n• Balanced NPK: 10-10-10\n• Add calcium to prevent blossom end rot\n\n💡 **Organic Options**: Compost, fish emulsion, bone meal";
        }

        if (message.includes('crop rotation') || message.includes('rotation benefit')) {
            return "🔄 **Crop Rotation Benefits:**\n\n**Soil Health:**\n• Prevents nutrient depletion\n• Improves soil structure\n• Increases organic matter\n\n**Pest & Disease Control:**\n• Breaks pest life cycles\n• Reduces soil-borne diseases\n• Natural pest management\n\n**Yield Improvement:**\n• Better nutrient utilization\n• Increased crop diversity\n• Higher long-term productivity\n\n📋 **Example**: Legumes → Cereals → Root crops → Fallow";
        }

        if (message.includes('weather') && message.includes('crop')) {
            return "🌤️ **Weather Impact on Crops:**\n\n**Temperature Effects:**\n• Growth rate regulation\n• Flowering timing\n• Fruit development\n\n**Rainfall Impact:**\n• Water stress management\n• Disease pressure\n• Nutrient leaching\n\n**Humidity Effects:**\n• Disease development\n• Pollination success\n• Pest activity\n\n📱 **Tip**: Use our weather alerts to plan farming activities and protect your crops!";
        }

        if (message.includes('soil') && message.includes('ph')) {
            return "🌱 **Soil pH Management:**\n\n**Optimal pH Ranges:**\n• Most crops: 6.0-7.0\n• Acidic lovers: 5.5-6.5 (blueberries)\n• Alkaline tolerant: 7.0-8.0 (asparagus)\n\n**To Raise pH (Less Acidic):**\n• Add lime or wood ash\n• Use crushed eggshells\n• Apply bone meal\n\n**To Lower pH (More Acidic):**\n• Add sulfur or peat moss\n• Use coffee grounds\n• Apply aluminum sulfate\n\n🧪 **Test soil pH every 2-3 years for optimal results!**";
        }

        if (message.includes('nitrogen') || message.includes('phosphorus') || message.includes('potassium')) {
            return "🧪 **NPK Nutrient Guide:**\n\n**Nitrogen (N) - Growth:**\n• Leaf development\n• Protein synthesis\n• Chlorophyll production\n\n**Phosphorus (P) - Roots:**\n• Root development\n• Flower/fruit formation\n• Energy transfer\n\n**Potassium (K) - Strength:**\n• Disease resistance\n• Water regulation\n• Overall plant health\n\n⚖️ **Balance is key!** Too much of any nutrient can harm your crops.";
        }

        if (message.includes('organic') && message.includes('farming')) {
            return "🌿 **Organic Farming Benefits:**\n\n**Environmental:**\n• No chemical residues\n• Soil health improvement\n• Biodiversity protection\n\n**Economic:**\n• Premium market prices\n• Lower input costs over time\n• Sustainable profitability\n\n**Health:**\n• Safer for farmers\n• Healthier food production\n• No synthetic pesticides\n\n🏆 **Certification**: Consider organic certification for better market access!";
        }

        if (message.includes('water') || message.includes('irrigation')) {
            return "💧 **Smart Irrigation Tips:**\n\n**Timing:**\n• Early morning (6-8 AM)\n• Evening (6-8 PM)\n• Avoid midday watering\n\n**Methods:**\n• Drip irrigation - most efficient\n• Sprinkler - for uniform coverage\n• Flood irrigation - for rice crops\n\n**Water Management:**\n• Mulching reduces evaporation\n• Soil moisture monitoring\n• Rainwater harvesting\n\n💡 **Save 30-50% water with drip irrigation!**";
        }

        // Default responses for general queries
        if (message.includes('help') || message.includes('assist')) {
            return "🤖 **I'm here to help with:**\n\n• Crop planning and planting\n• Pest and disease management\n• Fertilizer recommendations\n• Weather-related advice\n• Soil management tips\n• Organic farming methods\n• Market price information\n\n💬 Ask me anything about farming, and I'll provide expert guidance!";
        }

        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello there, farmer friend! 👋🌾\n\nI'm excited to help you with your agricultural questions today. Whether it's about crops, soil, weather, or farming techniques, I'm here to assist!\n\nWhat would you like to know about farming today?";
        }

        if (message.includes('thanks') || message.includes('thank you')) {
            return "You're very welcome! 😊🌱\n\nI'm always happy to help farmers succeed. If you have any more questions about your crops or farming practices, don't hesitate to ask!\n\nHappy farming! 🚜✨";
        }

        // Default response for unrecognized queries
        return "🤔 **I understand you're asking about farming!**\n\nWhile I try to help with all farming questions, I might not have specific information about that topic right now.\n\n**I can definitely help with:**\n• Crop management\n• Pest control\n• Fertilizers & nutrition\n• Soil management\n• Weather planning\n• Organic farming\n\n💡 **Try asking**: \"How do I improve soil health?\" or \"Best fertilizer for vegetables?\"";
    };

    const sendMessage = async () => {
        if (inputText.trim() === '') return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            text: inputText.trim(),
            isUser: true,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const aiResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: getAIResponse(inputText.trim()),
                isUser: false,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const sendQuickSuggestion = (suggestion: string) => {
        setInputText(suggestion);
    };

    useEffect(() => {
        // Auto scroll to bottom when new message is added
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messages]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const renderMessage = (message: ChatMessage) => (
        <View key={message.id} style={[
            styles.messageContainer,
            message.isUser ? styles.userMessageContainer : styles.aiMessageContainer
        ]}>
            {!message.isUser && (
                <View style={styles.aiAvatar}>
                    <Text style={styles.aiAvatarText}>🤖</Text>
                </View>
            )}

            <View style={[
                styles.messageBubble,
                message.isUser ? styles.userBubble : styles.aiBubble
            ]}>
                <Text style={[
                    styles.messageText,
                    message.isUser ? styles.userMessageText : styles.aiMessageText
                ]}>
                    {message.text}
                </Text>
                <Text style={[
                    styles.timestamp,
                    message.isUser ? styles.userTimestamp : styles.aiTimestamp
                ]}>
                    {formatTime(message.timestamp)}
                </Text>
            </View>

            {message.isUser && (
                <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>👤</Text>
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0fdf4" />

            <LinearGradient
                colors={['#f0fdf4', '#dcfce7']}
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

                    <View style={styles.headerInfo}>
                        <View style={styles.aiHeaderAvatar}>
                            <Text style={styles.aiHeaderAvatarText}>🤖</Text>
                        </View>
                        <View style={styles.headerText}>
                            <Text style={styles.headerTitle}>KrishiGPT</Text>
                            <Text style={styles.headerSubtitle}>AI Farming Assistant</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.menuButton}>
                        <Ionicons name="ellipsis-vertical" size={24} color="#059669" />
                    </TouchableOpacity>
                </View>

                {/* Quick Suggestions */}
                {messages.length === 1 && (
                    <View style={styles.suggestionsContainer}>
                        <Text style={styles.suggestionsTitle}>Quick Questions:</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.suggestionsScroll}>
                                {quickSuggestions.map((suggestion) => (
                                    <TouchableOpacity
                                        key={suggestion.id}
                                        style={styles.suggestionChip}
                                        onPress={() => sendQuickSuggestion(suggestion.text)}
                                    >
                                        <Text style={styles.suggestionText}>{suggestion.text}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                )}

                {/* Messages */}
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.messagesContainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.messagesContent}
                >
                    {messages.map(renderMessage)}

                    {isTyping && (
                        <View style={[styles.messageContainer, styles.aiMessageContainer]}>
                            <View style={styles.aiAvatar}>
                                <Text style={styles.aiAvatarText}>🤖</Text>
                            </View>
                            <View style={[styles.messageBubble, styles.aiBubble, styles.typingBubble]}>
                                <View style={styles.typingIndicator}>
                                    <View style={[styles.typingDot, styles.typingDot1]} />
                                    <View style={[styles.typingDot, styles.typingDot2]} />
                                    <View style={[styles.typingDot, styles.typingDot3]} />
                                </View>
                                <Text style={styles.typingText}>KrishiGPT is typing...</Text>
                            </View>
                        </View>
                    )}
                </ScrollView>

                {/* Input Area */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                >
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.textInput}
                                value={inputText}
                                onChangeText={setInputText}
                                placeholder="Ask about farming, crops, pests, weather..."
                                placeholderTextColor="#9ca3af"
                                multiline
                                maxLength={500}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity
                                style={[styles.sendButton, inputText.trim() === '' && styles.sendButtonDisabled]}
                                onPress={sendMessage}
                                disabled={inputText.trim() === '' || isTyping}
                            >
                                <LinearGradient
                                    colors={inputText.trim() !== '' ? ['#059669', '#10b981'] : ['#d1d5db', '#9ca3af']}
                                    style={styles.sendButtonGradient}
                                >
                                    <Ionicons
                                        name="send"
                                        size={20}
                                        color={inputText.trim() !== '' ? 'white' : '#6b7280'}
                                    />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    backButton: {
        padding: 8,
        backgroundColor: '#f0fdf4',
        borderRadius: 20,
    },
    headerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 15,
    },
    aiHeaderAvatar: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#dcfce7',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    aiHeaderAvatarText: {
        fontSize: 20,
    },
    headerText: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        color: '#374151',
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#059669',
        marginTop: 2,
    },
    menuButton: {
        padding: 8,
        backgroundColor: '#f0fdf4',
        borderRadius: 20,
    },
    suggestionsContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    suggestionsTitle: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '600',
        marginBottom: 10,
    },
    suggestionsScroll: {
        flexDirection: 'row',
        gap: 10,
    },
    suggestionChip: {
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        borderWidth: 1,
        borderColor: '#059669',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    suggestionText: {
        fontSize: 14,
        color: '#059669',
        fontWeight: '500',
    },
    messagesContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    messagesContent: {
        paddingVertical: 20,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'flex-end',
    },
    userMessageContainer: {
        justifyContent: 'flex-end',
    },
    aiMessageContainer: {
        justifyContent: 'flex-start',
    },
    aiAvatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#dcfce7',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    aiAvatarText: {
        fontSize: 16,
    },
    userAvatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#e0e7ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    userAvatarText: {
        fontSize: 16,
    },
    messageBubble: {
        maxWidth: width * 0.75,
        borderRadius: 18,
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    userBubble: {
        backgroundColor: '#059669',
        borderBottomRightRadius: 5,
    },
    aiBubble: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottomLeftRadius: 5,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
    },
    userMessageText: {
        color: 'white',
    },
    aiMessageText: {
        color: '#374151',
    },
    timestamp: {
        fontSize: 11,
        marginTop: 5,
    },
    userTimestamp: {
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'right',
    },
    aiTimestamp: {
        color: '#9ca3af',
    },
    typingBubble: {
        paddingVertical: 15,
    },
    typingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    typingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#059669',
        marginRight: 4,
    },
    typingDot1: {
        opacity: 0.4,
    },
    typingDot2: {
        opacity: 0.6,
    },
    typingDot3: {
        opacity: 0.8,
    },
    typingText: {
        fontSize: 12,
        color: '#6b7280',
        fontStyle: 'italic',
    },
    inputContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 20,
        paddingVertical: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#374151',
        maxHeight: 100,
        paddingVertical: 5,
    },
    sendButton: {
        marginLeft: 10,
        borderRadius: 22,
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
    sendButtonGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AIChatScreen;