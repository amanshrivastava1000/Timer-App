import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

// Simple cross-platform progress bar
const ProgressBar = ({ progress }: { progress: number }) => (
  <View style={styles.progressBarBackground}>
    <View style={[styles.progressBarFill, { width: `${Math.max(0, Math.min(1, progress)) * 100}%` }]} />
  </View>
);

const TimerItem = ({ timer, onTimersChange }: any) => {
  const [remaining, setRemaining] = useState(timer.remainingTime);
  const [status, setStatus] = useState(timer.status);
  const intervalRef = useRef<any>(null);
  const halfwayAlerted = useRef(false);

  useEffect(() => {
    setRemaining(timer.remainingTime);
    setStatus(timer.status);
    halfwayAlerted.current = false;
  }, [timer]);

  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = setInterval(() => {
        setRemaining((prev: number) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            handleComplete();
            return 0;
          }
          if (!halfwayAlerted.current && prev === Math.floor(timer.duration / 2)) {
            Alert.alert('Halfway there!', `Timer: ${timer.name}`);
            halfwayAlerted.current = true;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [status]);

  useEffect(() => {
    updateTimer();
  }, [remaining, status]);

  const updateTimer = async () => {
    const data = await AsyncStorage.getItem('timers');
    let timers = data ? JSON.parse(data) : [];
    timers = timers.map((t: any) =>
      t.id === timer.id ? { ...t, remainingTime: remaining, status } : t
    );
    await AsyncStorage.setItem('timers', JSON.stringify(timers));
    onTimersChange && onTimersChange();
  };

  const handleStart = () => setStatus('running');
  const handlePause = () => setStatus('paused');
  const handleReset = () => {
    setRemaining(timer.duration);
    setStatus('paused'); // After reset, enable Start and Pause
    halfwayAlerted.current = false;
  };

  const handleComplete = async () => {
    setStatus('completed');
    Alert.alert('Timer Completed!', `Congratulations! ${timer.name}`);
    // Save to history only if not already present
    const history = await AsyncStorage.getItem('timerHistory');
    const log = history ? JSON.parse(history) : [];
    if (!log.find((item: any) => item.id === timer.id && item.completedAt === timer.completedAt)) {
      log.unshift({ id: timer.id, name: timer.name, completedAt: new Date().toLocaleString() });
      await AsyncStorage.setItem('timerHistory', JSON.stringify(log));
    }
  };

  const handleDelete = async () => {
    const data = await AsyncStorage.getItem('timers');
    let timers = data ? JSON.parse(data) : [];
    timers = timers.filter((t: any) => t.id !== timer.id);
    await AsyncStorage.setItem('timers', JSON.stringify(timers));
    onTimersChange && onTimersChange();
  };

  const percent = remaining / timer.duration;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text>Status: {status}</Text>
      <Text>Time: {remaining}s</Text>
      <ProgressBar progress={percent} />
      <View style={styles.row}>
        <Ionicons name="play-circle-outline" size={28} color={status === 'running' || status === 'completed' ? '#ccc' : '#388e3c'} onPress={status === 'running' || status === 'completed' ? undefined : handleStart} style={styles.icon} accessibilityLabel="Start timer" />
        <Ionicons name="pause-circle-outline" size={28} color={status !== 'running' && status !== 'paused' ? '#ccc' : '#1976d2'} onPress={status !== 'running' && status !== 'paused' ? undefined : handlePause} style={styles.icon} accessibilityLabel="Pause timer" />
        <Ionicons name="refresh-circle-outline" size={28} color={status === 'running' ? '#ccc' : '#fbc02d'} onPress={status === 'running' ? undefined : handleReset} style={styles.icon} accessibilityLabel="Reset timer" />
        <View style={styles.iconWrapper}>
          <Ionicons name="trash-outline" size={24} color="#d32f2f" onPress={handleDelete} accessibilityLabel="Delete timer" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, marginVertical: 6, backgroundColor: '#f9f9f9', borderRadius: 6 },
  name: { fontWeight: 'bold', fontSize: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  icon: { marginHorizontal: 6 },
  iconWrapper: { justifyContent: 'center', alignItems: 'center', marginLeft: 8, height: 36 },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
});

export default TimerItem;
