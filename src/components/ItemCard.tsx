// src/components/ItemCard.tsx
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { CateringItem } from '../types';

// Definí las props que recibe el componente para que el componente padre pase el elemento y la acción.
interface ItemCardProps {
  item: CateringItem;
  onPress: (id: string) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    // Contenedor principal de la tarjeta con bordes redondeados y fondo oscuro.
    <View style={styles.card}>
      {/* Usé Image con resizeMode="cover" para que la foto se adapte al ancho sin deformarse */}
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        {/* Usé flexDirection: 'row' y space-between para alinear la categoría a la izquierda y el precio a la derecha */}
        <View style={styles.badgeRow}>
          <Text style={styles.categoryBadge}>{item.category.toUpperCase()}</Text>
          <Text style={styles.price}>${item.pricePerPerson} / persona</Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.capacity}>👥 Capacidad: {item.capacity}</Text>

        {/* Limité la descripción a máximo 2 líneas para mantener una altura homogénea en las tarjetas */}
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Usé Pressable en lugar de TouchableOpacity para manejar el estado pressed y darle feedback visual al usuario */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => onPress(item.id)}
        >
          <Text style={styles.buttonText}>Cotizar Servicio</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Estilos centralizados con StyleSheet.create para evitar estilos inline como pide la rúbrica.
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161b22',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#30363d',
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 16,
  },
  badgeRow: {
    flexDirection: 'row',           // Coloca elementos en fila horizontal
    justifyContent: 'space-between', // Distribuye extremos
    alignItems: 'center',           // Centra verticalmente
    marginBottom: 8,
  },
  categoryBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#e3b341',
    backgroundColor: '#272115',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3fb950',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  capacity: {
    fontSize: 13,
    color: '#8b949e',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#c9d1d9',
    lineHeight: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#e3b341',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7, // Aplica transparencia visual al presionar el botón
  },
  buttonText: {
    color: '#0d1117',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
