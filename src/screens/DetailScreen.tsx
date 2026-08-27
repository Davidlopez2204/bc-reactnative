// src/screens/DetailScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { DetailScreenProps } from '../navigation/types';
import { CATERING_ITEMS } from '../data/mockData';
import { QuoteModal } from '../components/QuoteModal';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { CateringItem, QuoteDetails } from '../types';
import { useSavedStore, SavedStore } from '../stores/savedStore';

export function DetailScreen({ route, navigation }: DetailScreenProps): React.JSX.Element {
  const { id } = route.params;
  const item = CATERING_ITEMS.find((i) => i.id === id);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedForQuote, setSelectedForQuote] = useState<CateringItem | null>(null);

  // Consumimos el store de Zustand para el estado global de favoritos
  const savedItems = useSavedStore((state: SavedStore) => state.items);
  const toggleItem = useSavedStore((state: SavedStore) => state.toggleItem);
  const isFavorite = savedItems.some((saved: CateringItem) => saved.id === id);

  if (!item) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundEmoji}>🍽️</Text>
        <Text style={styles.notFoundTitle}>Servicio no encontrado</Text>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Volver al Catálogo</Text>
        </Pressable>
      </View>
    );
  }

  const handleOpenQuote = () => {
    setSelectedForQuote(item);
    setModalVisible(true);
  };

  const handleToggleFavorite = () => {
    if (item) {
      toggleItem(item);
      Alert.alert(
        isFavorite ? 'Eliminado de Favoritos' : '⭐ Agregado a Favoritos',
        isFavorite
          ? `Has removido "${item.title}" de tu lista.`
          : `"${item.title}" ahora está guardado en tu lista de favoritos.`
      );
    }
  };

  const handleConfirmQuote = (details: QuoteDetails) => {
    setModalVisible(false);
    Alert.alert(
      '🎉 Presupuesto Generado',
      `¡Gracias por cotizar "${details.item.title}"!\n\n` +
      `• Invitados: ${details.guestsCount} personas\n` +
      `• Bar Abierto: ${details.includeDrinks ? 'Sí' : 'No'}\n` +
      `• Total Estimado: $${details.totalPrice.toLocaleString()} USD\n\n` +
      `Nos pondremos en contacto contigo a la brevedad.`
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Imagen Principal con Badges */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          {item.isPopular && (
            <View style={styles.popularBadge}>
              <Text style={styles.popularBadgeText}>🔥 PAQUETE DESTACADO</Text>
            </View>
          )}
        </View>

        {/* Contenido Principal */}
        <View style={styles.detailsBody}>
          {/* Fila de Categoría y Rating */}
          <View style={styles.metaHeaderRow}>
            <Text style={styles.categoryChip}>{item.category.toUpperCase()}</Text>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>⭐ {item.rating.toFixed(1)} / 5.0</Text>
            </View>
          </View>

          {/* Título */}
          <Text style={styles.title}>{item.title}</Text>

          {/* Tarjeta de Precios y Capacidad */}
          <View style={styles.priceCard}>
            <View style={styles.priceColumn}>
              <Text style={styles.priceLabel}>Precio por Persona</Text>
              <Text style={styles.priceValue}>${item.pricePerPerson} <Text style={styles.usdText}>USD</Text></Text>
            </View>
            <View style={styles.dividerVertical} />
            <View style={styles.capacityColumn}>
              <Text style={styles.capacityLabel}>Capacidad Sugerida</Text>
              <Text style={styles.capacityValue}>{item.capacity}</Text>
              <Text style={styles.minPaxText}>(Mínimo: {item.minPax} pax)</Text>
            </View>
          </View>

          {/* Descripción del Menú */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Descripción del Menú</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>

          {/* Elementos Incluidos */}
          {item.includes && item.includes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>✨ Lo que incluye este servicio</Text>
              <View style={styles.includesList}>
                {item.includes.map((inc, index) => (
                  <View key={index} style={styles.includeItem}>
                    <Text style={styles.checkIcon}>✓</Text>
                    <Text style={styles.includeText}>{inc}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Nota del Chef */}
          {item.chefNotes && (
            <View style={styles.chefCard}>
              <Text style={styles.chefTitle}>👨‍🍳 Recomendación del Chef</Text>
              <Text style={styles.chefText}>{item.chefNotes}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Barra Inferior Fija de Acciones */}
      <View style={styles.footerBar}>
        <Pressable
          style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.favoriteButtonIcon}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.quoteCtaButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleOpenQuote}
        >
          <Text style={styles.quoteCtaText}>Cotizar este Servicio</Text>
        </Pressable>
      </View>

      {/* Modal de Cotización */}
      {selectedForQuote && (
        <QuoteModal
          visible={modalVisible}
          item={selectedForQuote}
          onClose={() => setModalVisible(false)}
          onConfirmQuote={handleConfirmQuote}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  notFoundEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  notFoundTitle: {
    fontSize: FONT_SIZE.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 8,
  },
  backButtonText: {
    color: COLORS.buttonText,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 260,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  popularBadge: {
    position: 'absolute',
    bottom: SPACING.md,
    left: SPACING.md,
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
  detailsBody: {
    padding: SPACING.lg,
  },
  metaHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryChip: {
    fontSize: FONT_SIZE.caption,
    fontWeight: 'bold',
    color: COLORS.primary,
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    overflow: 'hidden',
  },
  ratingBox: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  ratingText: {
    fontSize: FONT_SIZE.small,
    fontWeight: 'bold',
    color: COLORS.warning,
  },
  title: {
    fontSize: FONT_SIZE.header,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
    lineHeight: 34,
  },
  priceCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  priceColumn: {
    flex: 1,
  },
  priceLabel: {
    fontSize: FONT_SIZE.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  usdText: {
    fontSize: FONT_SIZE.caption,
    color: COLORS.textSecondary,
  },
  dividerVertical: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.borderColor,
    marginHorizontal: SPACING.md,
  },
  capacityColumn: {
    flex: 1.2,
  },
  capacityLabel: {
    fontSize: FONT_SIZE.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  capacityValue: {
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  minPaxText: {
    fontSize: FONT_SIZE.caption,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.subtitle,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  descriptionText: {
    fontSize: FONT_SIZE.body,
    color: COLORS.textMuted,
    lineHeight: 22,
  },
  includesList: {
    gap: SPACING.sm,
  },
  includeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  checkIcon: {
    color: COLORS.success,
    fontWeight: 'bold',
    fontSize: 16,
  },
  includeText: {
    flex: 1,
    fontSize: FONT_SIZE.body,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  chefCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(227, 179, 65, 0.3)',
    padding: SPACING.md,
    marginTop: SPACING.xs,
  },
  chefTitle: {
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  chefText: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textMuted,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.cardBackground,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
    flexDirection: 'row',
    padding: SPACING.md,
    gap: SPACING.sm,
    alignItems: 'center',
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    borderColor: '#ff4757',
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
  },
  favoriteButtonIcon: {
    fontSize: 20,
  },
  quoteCtaButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteCtaText: {
    color: COLORS.buttonText,
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
