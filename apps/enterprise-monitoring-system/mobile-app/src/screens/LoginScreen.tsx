import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';

const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleBiometricLogin = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(
        setCredentials({
          token: 'mock_jwt_token_mobile',
          user: { id: '1', username: 'Gagan CB', role: 'SUPER_ADMIN' },
        })
      );
      setLoading(false);
      navigation.replace('Dashboard');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WorkSphere Mobile</Text>
      <Text style={styles.subtitle}>Enterprise Activity Intelligence</Text>

      <TouchableOpacity style={styles.button} onPress={handleBiometricLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Authenticate via Biometric Scan</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#6366f1',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
