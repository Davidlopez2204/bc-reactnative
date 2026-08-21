// src/screens/FavoritesScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import { FavoritesScreenProps } from '../navigation/types';
import { CATERING_ITEMS } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';
import { QuoteModal } from '../components/QuoteModal';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';
import { CateringItem } from '../types';

export function FavoritesScreen({ navigation }: FavoritesScreenProps): React.JSX.Element {
  // Lista inicial con servicios marcados como favoritos / destacados
  const [favoriteItems, setFavoriteItems] = useState<CateringItem[]>(
    CATERING_ITEMS.filter((item) => item.isPopular)
  );

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedForQuote, setSelectedForQuote] = useState<CateringItem | null>(null);

  const handleGoToDetail = (id: string) => {
    navigation.navigate('Detail', { id });
  };

  const handleOpenQuote = (item: CateringItem) => {
    setSelectedForQuote(item);
    setModalVisible(true);
  };

  const handleClearFavorites = () => {
    setFavoriteItems([]);
  };

  const handleRestoreFavorites = () => {
    setFavoriteItems(CATERING_ITEMS.filter((item) => item.isPopular));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerSubtitle}>SELECCIÓN ESPECIAL</Text>
      <Text style={styles.headerTitle}>Favoritos y Guardados</Text>
      <Text style={styles.headerDescription}>
        Tus paquetes de catering seleccionados para cotizar y comparar en tu evento.
      </Text>

      {favoriteItems.length > 0 && (
        <View style={styles.summaryBar}>
          <Text style={styles.summaryText}>
            ❤️ {favoriteItems.length} servicios guardados
          </Text>
          <Pressable onPress={handleClearFavorites}>
            <Text style={styles.clearText}>Limpiar lista</Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🤍</Text>
      <Text style={styles.emptyTitle}>No tienes favoritos guardados</Text>
      <Text style={styles.emptyDescription}>
        Explora nuestro catálogo gourmet y guarda los menús que más te gusten para tu evento.
      </Text>
      <View style={styles.emptyActions}>
        <Pressable
          style={styles.exploreButton}
          onPress={() => navigation.navigate('HomeTab')}
        >
          <Text style={styles.exploreButtonText}>Explorar Catálogo</Text>
        </Pressable>
        <Pressable
          style={styles.restoreButton}
          onPress={handleRestoreFavorites}
        >
          <Text style={styles.restoreButtonText}>Restaurar Sugeridos</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPressDetail={handleGoToDetail}
            onPressQuote={handleOpenQuote}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {selectedForQuote && (
        <QuoteModal
          visible={modalVisible}
          item={selectedForQuote}
          onClose={() => setModalVisible(false)}
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
  listContent: {
    padding: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  headerSubtitle: {
    fontSize: FONT_SIZE.caption,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
    marginBottom: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZE.header,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  headerDescription: {
    fontSize: FONT_SIZE.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  summaryText: {
    fontSize: FONT_SIZE.small,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  clearText: {
    fontSize: FONT_SIZE.small,
    color: '#ff4757',
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginTop: SPACING.md,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.subtitle,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: FONT_SIZE.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  emptyActions: {
    gap: SPACING.sm,
    width: '100%',
  },
  exploreButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: COLORS.buttonText,
    fontWeight: 'bold',
    fontSize: 15,
  },
  restoreButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  restoreButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});
