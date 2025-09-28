import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/FarmerRegistration";
import HomeScreen from "./screens/HomeScreen";
import CropDetailScreen from "./screens/CropDetailScreen";
import DiseaseDetection from "./screens/DiseaseDetection";
import CropManagementScreen from "./screens/CropManagementScreen";
import CommunityScreen from "./screens/CommunityScreen";
import DiseaseAlertsScreen from "./screens/DiseaseAlertsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AIChatScreen from "./screens/AIChatScreen";
import AITipsScreen from "./screens/AITipsScreen";

import { LanguageProvider } from "./src/contexts/LanguageContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DiseaseDetection"
            component={DiseaseDetection}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CropManagementScreen"
            component={CropManagementScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CommunityScreen"
            component={CommunityScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DiseaseAlertsScreen"
            component={DiseaseAlertsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CropDetailScreen"
            component={CropDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AIChatScreen"
            component={AIChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AITipsScreen"
            component={AITipsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </LanguageProvider>
  );
}
