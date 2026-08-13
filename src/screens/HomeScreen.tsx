// src/screens/HomeScreen.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { CATERING_ITEMS, CATERING_CATEGORIES } from '../data/mockData';
import { CateringItem, QuoteDetails } from '../types';
import { ItemCard } from '../components/ItemCard';
import { QuoteModal } from '../components/QuoteModal';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

export function HomeScreen(): React.JSX.Element {
  // 1. Estados para filtrado y búsqueda dinámicos
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // 2. Estado para control del Modal de Cotización
  const [selectedItemForModal, setSelectedItemForModal] = useState<CateringItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Pull-to-refresh simulado para actualización de catálogo
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1200);
  };

  // 3. Filtrado eficiente con useMemo según el texto ingresado y la categoría activa
  const filteredItems = useMemo(() => {
    return CATERING_ITEMS.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'Todas' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Manejador para abrir el modal
  const handleOpenModal = (item: CateringItem) => {
    setSelectedItemForModal(item);
    setIsModalVisible(true);
  };

  // Manejador al confirmar la cotización dentro del modal
  const handleConfirmQuote = (details: QuoteDetails) => {
    setIsModalVisible(false);
    Alert.alert(
      '🎉 Presupuesto Generado',
      `¡Gracias por cotizar "${details.item.title}"!\n\n` +
      `• Invitados: ${details.guestsCount} personas\n` +
      `• Bar Abierto: ${details.includeDrinks ? 'Sí' : 'No'}\n` +
      `• Total Estimado: $${details.totalPrice.toLocaleString()} USD\n\n` +
      `Nos pondremos en contacto contigo a la brevedad.`
    );
  };

  // 4. Header de la lista renderizado con ListHeaderComponent
  const renderListHeader = () => (
    <View style={styles.headerContainer}>
      {/* Título de la App */}
      <Text style={styles.headerSubtitle}>SERVICIOS EXCLUSIVOS</Text>
      <Text style={styles.headerTitle}>Gourmet Catering</Text>
      <Text style={styles.headerDescription}>
        Encuentra y cotiza el menú perfecto para tus eventos ejecutivos y celebraciones.
      </Text>

      {/* Campo de Búsqueda por Texto */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Buscar por menú, platillo o palabra clave..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable style={styles.clearSearchBtn} onPress={() => setSearchQuery('')}>
            <Text style={styles.clearSearchText}>✕</Text>
          </Pressable>
        )}
      </View>

      {/* Carrusel de Chips de Categorías */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScrollView}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATERING_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <Pressable
              key={cat}
              style={[
                styles.categoryChip,
                isActive && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  isActive && styles.categoryChipTextActive,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Contador de resultados */}
      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>
          Mostrando {filteredItems.length} de {CATERING_ITEMS.length} servicios
        </Text>
      </View>
    </View>
  );

  // 5. Estado Vacío renderizado con ListEmptyComponent
  const renderListEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🍽️</Text>
      <Text style={styles.emptyTitle}>No se encontraron servicios</Text>
      <Text style={styles.emptySubtitle}>
        Intenta cambiando el término de búsqueda o seleccionando otra categoría.
      </Text>
      <Pressable
        style={styles.resetButton}
        onPress={() => {
          setSearchQuery('');
          setSelectedCategory('Todas');
        }}
      >
        <Text style={styles.resetButtonText}>Limpiar Filtros</Text>
      </Pressable>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Reemplazo de ScrollView por FlatList de alto rendimiento */}
          <FlatList
            data={filteredItems}
            renderItem={({ item }) => (
              <ItemCard item={item} onPress={handleOpenModal} />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderListHeader}
            ListEmptyComponent={renderListEmpty}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Modal Interactivo de Cotización */}
      <QuoteModal
        visible={isModalVisible}
        item={selectedItemForModal}
        onClose={() => setIsModalVisible(false)}
        onConfirmQuote={handleConfirmQuote}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.md,
    paddingTop: 50,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: SPACING.md,
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  searchInput: {
    flex: 1,
    height: 46,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.body,
  },
  clearSearchBtn: {
    padding: SPACING.xs,
  },
  clearSearchText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.subtitle,
  },
  categoriesScrollView: {
    marginBottom: SPACING.md,
  },
  categoriesContainer: {
    gap: SPACING.sm,
  },
  categoryChip: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryChipText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.small,
    fontWeight: 'bold',
  },
  categoryChipTextActive: {
    color: COLORS.buttonText,
  },
  resultsRow: {
    marginBottom: SPACING.sm,
  },
  resultsText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.small,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl * 1.5,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginTop: SPACING.md,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  emptyTitle: {
    fontSize: FONT_SIZE.subtitle,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    fontSize: FONT_SIZE.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: COLORS.buttonText,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.body,
  },
  separator: {
    height: SPACING.md,
  },
});
