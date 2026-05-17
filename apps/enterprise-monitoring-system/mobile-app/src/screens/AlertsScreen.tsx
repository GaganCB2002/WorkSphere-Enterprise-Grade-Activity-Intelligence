import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';

const AlertsScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Live Threat Feed" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.alertItem}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>Violence Detection Triggered</Text>
            <Text style={styles.alertTime}>Just now</Text>
          </View>
          <Text style={styles.alertDesc}>CCTV Camera 4 detected aggressive physical confrontation in Sector B.</Text>
        </View>

        <View style={styles.alertItem}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>Behavioral Anomaly</Text>
            <Text style={styles.alertTime}>10m ago</Text>
          </View>
          <Text style={styles.alertDesc}>Unusual mass file download initiated on Workstation 104.</Text>
        </View>
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
  alertItem: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertTime: {
    color: '#94a3b8',
    fontSize: 12,
  },
  alertDesc: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default AlertsScreen;
