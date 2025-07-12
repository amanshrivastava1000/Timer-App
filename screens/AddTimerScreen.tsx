import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Simple random ID generator
function generateId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substr(2, 9)
  );
}

const AddTimerScreen = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const navigation = useNavigation();

  const handleSave = async () => {
    try {
      if (!name || !duration || !category) {
        Alert.alert('All fields are required');
        return;
      }
      const parsedDuration = parseInt(duration);
      if (isNaN(parsedDuration) || parsedDuration <= 0) {
        Alert.alert('Duration must be a positive number');
        return;
      }
      const newTimer = {
        id: generateId(),
        name,
        duration: parsedDuration,
        remainingTime: parsedDuration,
        category,
        status: 'paused',
      };
      const existing = await AsyncStorage.getItem('timers');
      const timers = existing ? JSON.parse(existing) : [];
      timers.push(newTimer);
      await AsyncStorage.setItem('timers', JSON.stringify(timers));
      setName('');
      setDuration('');
      setCategory('');
      Alert.alert('Timer saved successfully');
      (navigation as any).navigate('Timers');
    } catch (error) {
      Alert.alert('Failed to save timer: ' + (error as any)?.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Add New Timer</Text>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} placeholderTextColor="#90a4ae" />
        <TextInput placeholder="Duration (in seconds)" value={duration} onChangeText={setDuration} keyboardType="numeric" style={styles.input} placeholderTextColor="#90a4ae" />
        <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} placeholderTextColor="#90a4ae" />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="save-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.saveButtonText}>Save Timer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e3eafc' },
  card: { width: '95%', backgroundColor: '#fff', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#388e3c', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#b0bec5', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16, color: '#263238', backgroundColor: '#f5f7fa' },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#388e3c', borderRadius: 8, paddingVertical: 12, marginTop: 8 },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default AddTimerScreen;
