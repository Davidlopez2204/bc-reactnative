// src/components/ItemCard.tsx
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { CateringItem } from '../types';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

interface ItemCardProps {
  item: CateringItem;
  onPress: (item: CateringItem) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      {/* Contenedor de la Imagen con Badges superpuestos si aplica */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {item.isPopular && (
          <View style={styles.popularBadgeContainer}>
            <Text style={styles.popularBadgeText}>🔥 MÁS SOLICITADO</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        {/* Fila superior: Categoría a la izquierda, Rating y Precio a la derecha */}
        <View style={styles.badgeRow}>
          <Text style={styles.categoryBadge}>{item.category.toUpperCase()}</Text>
          <View style={styles.ratingPriceRow}>
            <Text style={styles.ratingText}>⭐ {item.rating.toFixed(1)}</Text>
            <Text style={styles.priceText}>${item.pricePerPerson} / pax</Text>
          </View>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.capacity}>
          👥 Capacidad: {item.capacity} • Mínimo: {item.minPax} pax
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Botón interactivo con estado pressed */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => onPress(item)}
        >
          <Text style={styles.buttonText}>Cotizar Servicio</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  popularBadgeContainer: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: 'rgba(255, 71, 87, 0.95)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
  },
  popularBadgeText: {
    color: '#ffffff',
    fontSize: FONT_SIZE.caption,
    fontWeight: 'bold',
  },
  content: {
    padding: SPACING.md,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryBadge: {
    fontSize: FONT_SIZE.caption,
    fontWeight: 'bold',
    color: COLORS.primary,
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    overflow: 'hidden',
  },
  ratingPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  ratingText: {
    fontSize: FONT_SIZE.small,
    fontWeight: 'bold',
    color: COLORS.warning,
  },
  priceText: {
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  title: {
    fontSize: FONT_SIZE.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  capacity: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZE.body,
    color: COLORS.textMuted,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
