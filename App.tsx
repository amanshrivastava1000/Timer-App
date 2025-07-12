import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AddTimerScreen from './screens/AddTimerScreen';
import HistoryScreen from './screens/HistoryScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './utils/ThemeContext';

const Tab = createBottomTabNavigator();

function MainApp() {
  const { theme } = useTheme();
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { backgroundColor: theme.card },
            tabBarActiveTintColor: theme.primary,
            tabBarInactiveTintColor: theme.placeholder,
            tabBarIcon: ({ color, size }) => {
              let iconName = 'home';
              if (route.name === 'Timers') iconName = 'timer-outline';
              else if (route.name === 'Add Timer') iconName = 'add-circle-outline';
              else if (route.name === 'History') iconName = 'time-outline';
              return <Ionicons name={iconName as any} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Timers" component={HomeScreen} />
          <Tab.Screen name="Add Timer" component={AddTimerScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
