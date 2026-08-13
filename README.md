# 🍽️ Gourmet Catering Services App

> **Bootcamp React Native** | Semana 02 — Estado, Interacciones, Listas de Alto Rendimiento (`FlatList`) y Formularios (`Modal`)  
> **Dominio Asignado:** Servicio de Catering  
> **Tecnologías:** React Native, Expo, TypeScript, Flexbox, `useState`, `useMemo`, `FlatList`, `Modal`, `TextInput`, `Switch`  

---

## 📱 Descripción del Proyecto

Aplicación móvil para la exploración, filtrado y simulación de cotizaciones de servicios de catering gourmet (*Coffee Break Ejecutivo*, *Banquete para Bodas*, *Buffet Internacional*, *Cocktail & Canapés*, *Brunch de Gala*, *Cena Privada Chef en Casa*).

En esta **Semana 02**, la aplicación evolucionó de una vista estática a una **experiencia totalmente dinámica**, incorporando búsqueda por texto en tiempo real, filtrado por categorías, optimización de memoria con `FlatList` y un modal interactivo con cálculo automático de presupuestos.

---

## ✨ Características y Requisitos Cumplidos (Semana 02)

- ⚡ **Rendimiento Nativo con `FlatList`**: Migración completa desde `ScrollView` utilizando `renderItem`, `keyExtractor`, `ListHeaderComponent` y `ListEmptyComponent`.
- 🎨 **Design System & Tokens**: Consistencia visual mediante variables centralizadas en `src/constants/theme.ts` (`COLORS`, `SPACING`, `FONT_SIZE`).
- 🔍 **Búsqueda Dinámica**: Búsqueda por palabra clave en tiempo real (`TextInput`) con botón para limpiar consulta.
- 🏷️ **Filtro de Categorías**: Carrusel horizontal interactivo de chips para filtrar por tipo de evento (*Empresarial*, *Social / Bodas*, *Coctelería*, *Gourmet*).
- 🧮 **Modal de Cotización Calculada (`Modal`)**:
  - `TextInput` numérico para ajustar el número de invitados.
  - Botones rápidos para sumar/restar pax (`-10`, `+10`, `+50`).
  - Toggles interactivas con `Switch` para incluir *Bar Abierto* (+$10/pax) y *Staff de Meseros VIP* (+$5/pax).
  - Desglose matemático y total actualizado en tiempo real.
- 🚫 **Estado Vacío (`ListEmptyComponent`)**: Retroalimentación visual cuando la búsqueda no produce resultados, con un botón rápido para restablecer filtros.

---

## 🛠️ Estructura del Proyecto

```text
catering-app/
├── App.tsx                    # Punto de entrada y StatusBar
├── app.json                   # Configuración de Expo
├── package.json               # Dependencias
└── src/
    ├── constants/
    │   └── theme.ts           # Design Tokens (Colores, Espaciado, Tipografía)
    ├── types/
    │   └── index.ts           # Interfaces (CateringItem, QuoteDetails)
    ├── data/
    │   └── mockData.ts        # Catálogo enriquecido de 6 servicios y categorías
    ├── components/
    │   ├── ItemCard.tsx       # Tarjeta reusable con rating y badges
    │   └── QuoteModal.tsx     # Modal interactivo de presupuesto con inputs/switches
    └── screens/
        └── HomeScreen.tsx     # Pantalla principal basada en FlatList y filtros
```

---

## 🚀 Cómo Ejecutar la App

1. Entrar a la carpeta del proyecto:
   ```bash
   cd catering-app
   ```

2. Instalar dependencias (si aplica):
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

## 📋 Autores y Rúbrica de Evaluación

- **Desarrollador:** David  
- **Bootcamp:** React Native Zero to Hero  
- **Progreso:** Semana 02 Completada  
- **Calificación Objetivo:** 100/100
