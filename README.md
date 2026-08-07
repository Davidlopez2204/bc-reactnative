# 🍽️ Gourmet Catering Services App

> **Bootcamp React Native** | Semana 01 — Core Components y Flexbox  
> **Dominio Asignado:** Servicio de Catering  
> **Tecnologías:** React Native, Expo, TypeScript, Flexbox, StyleSheet  

---

## 📱 Descripción del Proyecto

Aplicación móvil desarrollada desde cero para la gestión y visualización de servicios de catering gourmet (*Coffee Break Ejecutivo*, *Banquete para Bodas*, *Buffet Internacional*, *Cocktail & Canapés*).

Construida siguiendo las mejores prácticas de React Native, utilizando componentes núcleo nativos, maquetación adaptativa pura con Flexbox y diseño en modo oscuro.

---

## ✨ Características y Requisitos Cumplidos

- 🎨 **Estilos Centralizados:** Uso exclusivo de `StyleSheet.create` (0% estilos inline).
- 📐 **Flexbox Puro:** Maquetación responsiva con `flexDirection`, `justifyContent` y `alignItems` (0% `position: absolute`).
- 🛡️ **TypeScript Estricto:** Tipado estricto con interfaces explícitas (`CateringItem`), sin uso de `any`.
- 👆 **Feedback Táctil:** Componente `Pressable` con cambio de opacidad dinámica en estado `pressed`.
- 🖼️ **Imágenes Remotas:** Integración de imágenes optimizadas de Unsplash con `resizeMode="cover"`.
- 📜 **Desplazamiento Suave:** Lista renderizada dentro de un `ScrollView` nativo.

---

## 🛠️ Estructura del Proyecto

```text
catering-app/
├── App.tsx               # Punto de entrada y StatusBar
├── app.json              # Configuración de Expo
├── package.json          # Dependencias
└── src/
    ├── types/
    │   └── index.ts      # Interfaz TypeScript (CateringItem)
    ├── data/
    │   └── mockData.ts   # Datos de los paquetes de catering
    ├── components/
    │   └── ItemCard.tsx  # Componente reusable de la tarjeta
    └── screens/
        └── HomeScreen.tsx # Pantalla principal con Header y lista
```

---

## 🚀 Cómo Ejecutar la App

1. Clonar el repositorio y entrar a la carpeta:
   ```bash
   cd catering-app
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo de Expo:
   ```bash
   npx expo start
   ```

4. **Visualizar la App:**
   - **En el Celular:** Escanea el código QR desde la app **Expo Go** (iOS/Android).
   - **En el Navegador Web:** Presiona la tecla `w` en la terminal (o ejecuta `npx expo start --web`).

---

## 📋 Autores y Rúbrica de Evaluación

- **Desarrollador:** David  
- **Bootcamp:** React Native Zero to Hero  
 
