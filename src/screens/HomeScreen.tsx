// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CATERING_ITEMS } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';

export function HomeScreen(): React.JSX.Element {
  // Función para manejar el evento presionar sobre el botón de cada tarjeta
  const handleSelectService = (id: string) => {
    console.log(`Servicio seleccionado ID: ${id}`);
  };

  return (
    // Usé ScrollView para permitir el desplazamiento vertical si la lista supera el tamaño de pantalla
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Encabezado con el nombre de nuestro dominio de Catering */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>SERVICIOS EXCLUSIVOS</Text>
        <Text style={styles.headerTitle}>Gourmet Catering</Text>
        <Text style={styles.headerDescription}>
          Selecciona el menú ideal para tu evento empresarial o social.
        </Text>
      </View>

      {/* Recorro la lista de datos y renderizo una tarjeta por cada servicio de catering */}
      {CATERING_ITEMS.map((item) => (
        <ItemCard key={item.id} item={item} onPress={handleSelectService} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  content: {
    padding: 16,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#e3b341',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    color: '#8b949e',
  },
});
