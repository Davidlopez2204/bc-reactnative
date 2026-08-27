// src/stores/savedStore.ts
// Store Zustand para gestionar los servicios de catering guardados (favoritos).

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CateringItem } from '../types';

// Interfaz para definir el estado y las acciones del store
export interface SavedStore {
  // Arreglo con los paquetes de catering guardados
  items: CateringItem[];

  // Acción para agregar un elemento a guardados (evitando duplicados)
  addItem: (item: CateringItem) => void;

  // Acción para remover un elemento por su ID
  removeItem: (id: string) => void;

  // Acción para alternar (guardar/eliminar) un elemento
  toggleItem: (item: CateringItem) => void;

  // Acción para vaciar toda la lista
  clearItems: () => void;
}

// Creación del store Zustand con persistencia en AsyncStorage
export const useSavedStore = create<SavedStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id);
          if (exists) return { items: state.items }; // Evita duplicar elementos
          return { items: [...state.items, item] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      toggleItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.id === item.id);
          if (exists) {
            // Si ya existe, lo eliminamos de la lista
            return { items: state.items.filter((i) => i.id !== item.id) };
          } else {
            // Si no existe, lo agregamos al arreglo
            return { items: [...state.items, item] };
          }
        }),

      clearItems: () => set({ items: [] }),
    }),
    {
      name: 'saved-catering-storage', // Clave única para el guardado local
      storage: createJSONStorage(() => AsyncStorage), // Define AsyncStorage como storage nativo
    }
  )
);
