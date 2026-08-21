// src/components/ItemCard.tsx
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { CateringItem } from '../types';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

interface ItemCardProps {
  item: CateringItem;
  onPressDetail: (id: string) => void;
  onPressQuote?: (item: CateringItem) => void;
}

export function ItemCard({ item, onPressDetail, onPressQuote }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPressDetail(item.id)}
    >
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

        {/* Fila de acciones */}
        <View style={styles.actionsRow}>
          <Pressable
            style={({ pressed }) => [
              styles.detailButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => onPressDetail(item.id)}
          >
            <Text style={styles.detailButtonText}>Ver Detalles ➔</Text>
          </Pressable>

          {onPressQuote && (
            <Pressable
              style={({ pressed }) => [
                styles.quoteButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => onPressQuote(item)}
            >
              <Text style={styles.quoteButtonText}>Cotizar</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Pressable>
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
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
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
  actionsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
  },
  detailButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  quoteButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteButtonText: {
    color: COLORS.buttonText,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
