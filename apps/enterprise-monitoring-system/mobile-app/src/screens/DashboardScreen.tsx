import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

const DashboardScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Header title="Executive Overview" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Productivity Score</Text>
          <Text style={styles.cardValue}>94.2%</Text>
          <Text style={styles.cardStatus}>+2.4% from last week</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active Telemetry Alerts</Text>
          <Text style={[styles.cardValue, { color: '#f87171' }]}>3 Critical</Text>
          <Text style={styles.cardStatus}>Workplace Violence AI Triggered</Text>
        </View>

        <TouchableOpacity style={styles.alertButton} onPress={() => navigation.navigate('Alerts')}>
          <Text style={styles.alertButtonText}>View Live Alert Feed</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f19',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardStatus: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: 'bold',
  },
  alertButton: {
    backgroundColor: '#ef4444',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  alertButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
