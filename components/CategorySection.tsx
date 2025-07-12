import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TimerItem from './TimerItem';
import { useTheme } from '../utils/ThemeContext';

const CategorySection = ({ title, timers, onTimersChange }: any) => {
  const [expanded, setExpanded] = useState(true);
  const { theme } = useTheme();

  const handleBulk = async (action: 'start' | 'pause' | 'reset') => {
    const updated = timers.map((t: any) => {
      if (t.status === 'completed' && action !== 'reset') return t;
      if (action === 'start') return { ...t, status: 'running' };
      if (action === 'pause') return { ...t, status: 'paused' };
      if (action === 'reset') return { ...t, remainingTime: t.duration, status: 'paused' };
      return t;
    });
    // Save to storage
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const all = await AsyncStorage.getItem('timers');
    let allTimers = all ? JSON.parse(all) : [];
    allTimers = allTimers.map((t: any) =>
      t.category === title ? updated.find((ut: any) => ut.id === t.id) || t : t
    );
    await AsyncStorage.setItem('timers', JSON.stringify(allTimers));
    // Force parent to reload timers after bulk action
    setTimeout(() => { onTimersChange && onTimersChange(); }, 100);
  };

  return (
    <View style={[styles.section, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}> 
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => setExpanded((e) => !e)} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Ionicons name={expanded ? 'chevron-down' : 'chevron-forward'} size={20} color={theme.icon} style={{ marginRight: 6 }} />
          <Text style={[styles.header, { color: theme.primary }]}>{title} ({timers.length})</Text>
        </TouchableOpacity>
      </View>
      {expanded && (
        <>
          {/* Bulk action icons row */}
          <View style={styles.bulkRow}>
            <TouchableOpacity onPress={() => handleBulk('start')} style={styles.bulkIcon}>
              <Ionicons name="play-circle" size={28} color={theme.success || "#4CAF50"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleBulk('pause')} style={styles.bulkIcon}>
              <Ionicons name="pause-circle" size={28} color={theme.warning || "#FFC107"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleBulk('reset')} style={styles.bulkIcon}>
              <Ionicons name="refresh-circle" size={28} color={theme.warning || "#2196F3"} />
            </TouchableOpacity>
          </View>
          {timers.map((timer: any) => (
            <TimerItem key={timer.id} timer={timer} onTimersChange={onTimersChange} />
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginBottom: 20, borderRadius: 12, padding: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2, width: '95%', margin: 'auto' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  header: { fontSize: 20, fontWeight: 'bold' },
  bulkRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 },
  bulkIcon: { marginHorizontal: 10, borderRadius: 20, padding: 4 },
});

export default CategorySection;
