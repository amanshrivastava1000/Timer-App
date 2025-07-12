// screens/HomeScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CategorySection from '../components/CategorySection';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';

const LandingScreen = ({ navigation }: any) => {
  const [timers, setTimers] = useState([]);
  const isFocused = useIsFocused();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    loadTimers();
  }, [isFocused]);

  const loadTimers = async () => {
    const data = await AsyncStorage.getItem('timers');
    setTimers(data ? JSON.parse(data) : []);
  };

  // Group timers by category
  const grouped = timers.reduce((acc: any, timer: any) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});
  const sections = Object.keys(grouped).map((cat) => ({ title: cat, data: grouped[cat] }));

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.primary }]}>All Timers</Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle} accessibilityLabel="Toggle theme">
          <Ionicons name="moon-outline" size={26} color={theme.icon} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {sections.length === 0 ? (
          <Text style={styles.emptyText}>No timers yet. Please add one!</Text>
        ) : (
          sections.map((section) => (
            <CategorySection
              key={section.title}
              title={section.title}
              timers={section.data}
              onTimersChange={loadTimers}
            />
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add Timer')}>
        <Text style={styles.addButtonText}>+ Add Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e3eafc', padding: 0 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, marginBottom: 12, paddingHorizontal: 16 },
  title: { fontSize: 28, fontWeight: 'bold' },
  emptyText: { color: '#90a4ae', fontSize: 18, textAlign: 'center', marginTop: 40 },
  addButton: { backgroundColor: '#388e3c', borderRadius: 24, paddingVertical: 14, margin: 24, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  themeToggle: { marginLeft: 8, padding: 6, borderRadius: 16, backgroundColor: 'transparent' },
});

export default LandingScreen;
