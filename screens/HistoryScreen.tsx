import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface HistoryItem {
  name: string;
  completedAt: string;
}

const HistoryScreen = ({ navigation }: any) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const stored = await AsyncStorage.getItem('timerHistory');
      const parsed = stored ? JSON.parse(stored) : [];
      setHistory(parsed);
    };
    loadHistory();
    const unsubscribe = navigation.addListener('focus', loadHistory);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Completed Timers</Text>
        <FlatList
          data={history.filter((item, idx, arr) =>
            arr.findIndex(i => i.name === item.name) === idx
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>No completed timers yet.</Text>}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Ionicons name="checkmark-circle" size={22} color="#388e3c" style={{ marginRight: 8 }} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.date}>{item.completedAt}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e3eafc', justifyContent: 'center', alignItems: 'center' },
  card: { width: '95%', backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 4, marginTop: 32 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#388e3c', marginBottom: 20, textAlign: 'center' },
  emptyText: { color: '#90a4ae', fontSize: 18, textAlign: 'center', marginTop: 40 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e3eafc' },
  name: { fontSize: 16, fontWeight: '600', color: '#263238' },
  date: { fontSize: 14, color: '#666' },
});

export default HistoryScreen;
