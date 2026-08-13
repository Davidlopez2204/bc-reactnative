// src/components/QuoteModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { CateringItem, QuoteDetails } from '../types';
import { COLORS, SPACING, FONT_SIZE } from '../constants/theme';

interface QuoteModalProps {
  visible: boolean;
  item: CateringItem | null;
  onClose: () => void;
  onConfirmQuote: (quote: QuoteDetails) => void;
}

export function QuoteModal({
  visible,
  item,
  onClose,
  onConfirmQuote,
}: QuoteModalProps): React.JSX.Element | null {
  if (!item) return null;

  // Estados para manejar el cálculo dinámico en tiempo real
  const [guestsInput, setGuestsInput] = useState<string>(item.minPax.toString());
  const [includeDrinks, setIncludeDrinks] = useState<boolean>(false);
  const [includeWaiters, setIncludeWaiters] = useState<boolean>(true);

  // Reiniciar valores cuando se abre el modal para un nuevo ítem
  useEffect(() => {
    if (item) {
      setGuestsInput(item.minPax.toString());
      setIncludeDrinks(false);
      setIncludeWaiters(true);
    }
  }, [item]);

  // Cálculo seguro de invitados y costo total
  const parsedGuests = parseInt(guestsInput, 10);
  const validGuests = isNaN(parsedGuests) || parsedGuests <= 0 ? 0 : parsedGuests;

  const basePricePerPax = item.pricePerPerson;
  const drinksExtraPerPax = includeDrinks ? 10 : 0;
  const waitersExtraPerPax = includeWaiters ? 5 : 0;
  const totalPerPax = basePricePerPax + drinksExtraPerPax + waitersExtraPerPax;
  const grandTotal = totalPerPax * validGuests;

  const handleAdjustGuests = (delta: number) => {
    const current = parseInt(guestsInput, 10) || 0;
    const updated = Math.max(item.minPax, current + delta);
    setGuestsInput(updated.toString());
  };

  const handleConfirm = () => {
    if (validGuests < item.minPax) {
      Alert.alert(
        'Capacidad Mínima',
        `Este servicio requiere un mínimo de ${item.minPax} personas.`
      );
      return;
    }

    const quoteDetails: QuoteDetails = {
      item,
      guestsCount: validGuests,
      includeDrinks,
      totalPrice: grandTotal,
    };

    onConfirmQuote(quoteDetails);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header del Modal */}
            <View style={styles.header}>
              <Text style={styles.subtitle}>SIMULADOR DE PRESUPUESTO</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>

            {/* Input de Número de Invitados */}
            <View style={styles.section}>
              <Text style={styles.label}>
                👥 Número de Invitados (Mínimo: {item.minPax})
              </Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.textInput}
                  value={guestsInput}
                  onChangeText={setGuestsInput}
                  keyboardType="numeric"
                  placeholder="Ej. 50"
                  placeholderTextColor={COLORS.textSecondary}
                />
                <View style={styles.quickButtons}>
                  <Pressable
                    style={styles.adjustBtn}
                    onPress={() => handleAdjustGuests(-10)}
                  >
                    <Text style={styles.adjustBtnText}>-10</Text>
                  </Pressable>
                  <Pressable
                    style={styles.adjustBtn}
                    onPress={() => handleAdjustGuests(10)}
                  >
                    <Text style={styles.adjustBtnText}>+10</Text>
                  </Pressable>
                  <Pressable
                    style={styles.adjustBtn}
                    onPress={() => handleAdjustGuests(50)}
                  >
                    <Text style={styles.adjustBtnText}>+50</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Opciones Adicionales con Switch */}
            <View style={styles.section}>
              <Text style={styles.label}>✨ Servicios Adicionales</Text>

              <View style={styles.switchRow}>
                <View style={styles.switchLabelContainer}>
                  <Text style={styles.switchTitle}>Bar Abierto & Coctelería</Text>
                  <Text style={styles.switchSubtitle}>+$10 USD / persona</Text>
                </View>
                <Switch
                  value={includeDrinks}
                  onValueChange={setIncludeDrinks}
                  trackColor={{ false: COLORS.borderColor, true: COLORS.primary }}
                  thumbColor={includeDrinks ? COLORS.buttonText : COLORS.textSecondary}
                />
              </View>

              <View style={styles.switchRow}>
                <View style={styles.switchLabelContainer}>
                  <Text style={styles.switchTitle}>Staff de Meseros VIP</Text>
                  <Text style={styles.switchSubtitle}>+$5 USD / persona</Text>
                </View>
                <Switch
                  value={includeWaiters}
                  onValueChange={setIncludeWaiters}
                  trackColor={{ false: COLORS.borderColor, true: COLORS.primary }}
                  thumbColor={includeWaiters ? COLORS.buttonText : COLORS.textSecondary}
                />
              </View>
            </View>

            {/* Resumen y Desglose de Precios */}
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Resumen de Cotización</Text>
              <View style={styles.summaryLine}>
                <Text style={styles.summaryText}>Costo Menú Base ({validGuests} pax):</Text>
                <Text style={styles.summaryValue}>
                  ${(basePricePerPax * validGuests).toLocaleString()} USD
                </Text>
              </View>
              {includeDrinks && (
                <View style={styles.summaryLine}>
                  <Text style={styles.summaryText}>Bar Abierto Extra:</Text>
                  <Text style={styles.summaryValue}>
                    +${(10 * validGuests).toLocaleString()} USD
                  </Text>
                </View>
              )}
              {includeWaiters && (
                <View style={styles.summaryLine}>
                  <Text style={styles.summaryText}>Staff Meseros VIP:</Text>
                  <Text style={styles.summaryValue}>
                    +${(5 * validGuests).toLocaleString()} USD
                  </Text>
                </View>
              )}
              <View style={[styles.summaryLine, styles.totalLine]}>
                <Text style={styles.totalLabel}>TOTAL ESTIMADO:</Text>
                <Text style={styles.totalValue}>${grandTotal.toLocaleString()} USD</Text>
              </View>
            </View>
          </ScrollView>

          {/* Botones de Acción */}
          <View style={styles.actionsRow}>
            <Pressable
              style={({ pressed }) => [
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.confirmButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Solicitar Cotización</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    padding: SPACING.lg,
    maxHeight: '85%',
  },
  header: {
    marginBottom: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  subtitle: {
    fontSize: FONT_SIZE.caption,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.2,
  },
  title: {
    fontSize: FONT_SIZE.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginVertical: SPACING.xs,
  },
  category: {
    fontSize: FONT_SIZE.small,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.subtitle,
    fontWeight: 'bold',
  },
  quickButtons: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  adjustBtn: {
    backgroundColor: COLORS.borderColor,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 10,
    borderRadius: 8,
  },
  adjustBtnText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.small,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  switchLabelContainer: {
    flex: 1,
  },
  switchTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
  },
  switchSubtitle: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.caption,
    marginTop: 2,
  },
  summaryBox: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    marginBottom: SPACING.lg,
  },
  summaryTitle: {
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  summaryText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.small,
  },
  summaryValue: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.small,
    fontWeight: 'bold',
  },
  totalLine: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
  },
  totalLabel: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.subtitle,
    fontWeight: 'bold',
  },
  totalValue: {
    color: COLORS.success,
    fontSize: FONT_SIZE.subtitle,
    fontWeight: 'bold',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingTop: SPACING.sm,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.body,
  },
  confirmButton: {
    flex: 2,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: COLORS.buttonText,
    fontWeight: 'bold',
    fontSize: FONT_SIZE.body,
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
