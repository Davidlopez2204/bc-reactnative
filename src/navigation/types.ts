// src/navigation/types.ts
// Tipado estricto de rutas y navegación para React Navigation 7.x

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

// 1. Rutas del Bottom Tab Navigator
export type BottomTabParamList = {
  HomeTab: undefined;
  FavoritesTab: undefined;
};

// 2. Rutas del Stack Principal (Root Stack)
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList>;
  Detail: { id: string };
};

// 3. Tipos de Props de Navegación por Pantalla
export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type FavoritesScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'FavoritesTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;
