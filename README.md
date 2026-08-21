# 🍽️ Gourmet Catering Services App

> **Bootcamp React Native** | Semana 03 — Navegación Móvil (`React Navigation 7`), Stack Navigator, Bottom Tabs y Rutas Tipadas  
> **Dominio Asignado:** Servicio de Catering Gourmet  
> **Tecnologías:** React Native, Expo SDK 57, TypeScript, `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `react-native-safe-area-context`, `react-native-screens`  

---

## 📱 Descripción del Proyecto

Aplicación móvil para la exploración, filtrado, consulta detallada y simulación de cotizaciones de servicios de catering gourmet (*Coffee Break Ejecutivo*, *Banquete para Bodas*, *Buffet Internacional*, *Cocktail & Canapés*, *Brunch de Gala*, *Cena Privada Chef en Casa*, *Paella en Vivo*, *Estación de Sushi*, *Asado Criollo VIP*).

En esta **Semana 03**, la aplicación implementa una **arquitectura de navegación profesional multi-pantalla** que combina pestañas inferiores (*Bottom Tabs*) con una pila de navegación nativa (*Stack Navigator*), soporte de rutas tipadas con TypeScript y paso de parámetros dinámicos entre vistas.

---

## ✨ Características y Requisitos Cumplidos (Semana 03)

- 🧭 **Navegación Combinada (Tabs + Stack)**:
  - **Pestaña "Explorar" (`HomeScreen`)**: Catálogo con barra de búsqueda en tiempo real, carrusel de categorías y tarjetas con navegación a detalle.
  - **Pestaña "Favoritos" (`FavoritesScreen`)**: Lista de menús guardados con estado vacío interactivo y botón de exploración rápida.
  - **Pantalla de Detalle (`DetailScreen`)**: Ficha completa del paquete de catering (inclusiones, nota del chef, selector de favoritos y cotizador integrado).
- 🏷️ **Tipado Estricto de Rutas (TypeScript)**:
  - Centralización de tipos en `src/navigation/types.ts` con `RootStackParamList` y `BottomTabParamList`.
  - Paso seguro de parámetros (`route.params.id`) sin `any`.
- ⚡ **Rendimiento Nativo**:
  - Uso de `createNativeStackNavigator` con transiciones a 60 FPS mediante `react-native-screens`.
  - Integración de `SafeAreaProvider` y `NavigationContainer` en la raíz.
- 🎨 **Design Tokens Consistentes**:
  - Tema oscuro gourmet con paleta centralizada en `src/constants/theme.ts`.

---

## 🛠️ Estructura del Proyecto

```text
catering-app/
├── App.tsx                    # Punto de entrada con SafeAreaProvider y NavigationContainer
├── app.json                   # Configuración de Expo
├── package.json               # Dependencias (React Navigation 7)
└── src/
    ├── constants/
    │   └── theme.ts           # Design Tokens (Colores, Espaciado, Tipografía)
    ├── types/
    │   └── index.ts           # Interfaces (CateringItem, QuoteDetails)
    ├── data/
    │   └── mockData.ts        # Catálogo enriquecido de 9 servicios y categorías
    ├── components/
    │   ├── ItemCard.tsx       # Tarjeta reusable con botones de detalle y cotización
    │   └── QuoteModal.tsx     # Modal interactivo de presupuesto con inputs/switches
    ├── navigation/
    │   ├── types.ts           # Tipos de navegación (RootStackParamList, BottomTabParamList)
    │   └── RootNavigator.tsx  # Navegadores Stack + Bottom Tabs
    └── screens/
        ├── HomeScreen.tsx     # Pantalla principal (Explorar catálogo)
        ├── FavoritesScreen.tsx# Pantalla de favoritos guardados
        └── DetailScreen.tsx   # Pantalla de ficha completa del menú
```

---

## 🚀 Cómo Ejecutar la App

1. Entrar a la carpeta del proyecto:
   ```bash
   cd catering-app
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo de Expo:
   ```bash
   npx expo start
   ```

4. **Visualizar la App:**
   - **En Dispositivo Móvil:** Escanea el código QR desde la app **Expo Go** (iOS/Android).
   - **En Navegador Web:** Presiona `w` en la terminal (o ejecuta `npx expo start --web`).

---

## 📋 Rúbrica de Evaluación y Autores

- **Desarrollador:** David  
- **Bootcamp:** React Native Zero to Hero  
- **Progreso:** Semana 03 Completada  
- **Calificación Objetivo:** 100/100
