import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, useColorScheme } from 'react-native';
import { Button, Input } from './components/common';
import { theme, darkTheme } from './theme';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  
  // En una aplicación real, usaríamos un sistema de temas más robusto
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? darkTheme : theme;
  
  const handleSubmit = () => {
    if (name.length < 3) {
      setNameError('El nombre debe tener al menos 3 caracteres');
      return;
    }
    
    setNameError('');
    alert(`¡Hola, ${name}! Forma de contacto: ${email}`);
  };
  
  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setNameError('');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: currentTheme.colors.text }]}>
            React Native con Expo
          </Text>
          <Text style={[styles.subtitle, { color: currentTheme.colors.textSecondary }]}>
            Template para aplicaciones móviles
          </Text>
        </View>
        
        <View style={styles.formContainer}>
          <Input
            label="Nombre"
            placeholder="Ingresa tu nombre"
            value={name}
            onChangeText={setName}
            error={nameError}
            autoCapitalize="words"
          />
          
          <Input
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <View style={styles.buttonContainer}>
            <Button
              title="Enviar"
              onPress={handleSubmit}
              type="primary"
              style={styles.button}
            />
            
            <Button
              title="Limpiar"
              onPress={handleReset}
              type="outline"
              style={styles.button}
            />
          </View>
        </View>
        
        <View style={styles.featuresContainer}>
          <Text style={[styles.featuresTitle, { color: currentTheme.colors.text }]}>
            Características del template
          </Text>
          
          {[
            'Expo SDK para desarrollo simplificado',
            'TypeScript para tipado estático',
            'Componentes reutilizables',
            'Sistema de tema claro/oscuro',
            'Buenas prácticas de UI/UX',
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={[styles.featureText, { color: currentTheme.colors.text }]}>
                ✓ {feature}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 0.48,
  },
  featuresContainer: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  featureItem: {
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    lineHeight: 22,
  },
}); 