# 🧠 Respuestas Teóricas — Semana 02: Listas, Inputs y Estilos

> **Bootcamp React Native (`bc-reactnative`)** | Evaluado según la Rúbrica de Evaluación de ergrato-dev

---

## ❓ Pregunta 1: FlatList vs ScrollView

### **¿Cuál es la diferencia principal entre `FlatList` y `ScrollView`? ¿Cuándo usar cada uno?**

### 💡 Respuesta:
* **Mecanismo de Renderizado y Virtualización:**
  * **`ScrollView`** renderiza **todos los elementos hijos simultáneamente en memoria** al cargarse la pantalla, sin importar si están visibles dentro del viewport del usuario o si están fuera de la pantalla.
  * **`FlatList`** implementa un **mecanismo de virtualización nativo** (*windowing / lazy rendering*). Únicamente renderiza en memoria los elementos actualmente visibles en la pantalla (más un pequeño margen o búfer superior e inferior configurado mediante `windowSize`). A medida que el usuario hace scroll, `FlatList` destruye/recicla los nodos fuera de vista y construye los nuevos de manera dinámica.

* **¿Cuándo usar cada uno?**
  * **Usar `ScrollView`**: Para pantallas con una cantidad **pequeña y fija de elementos** (aprox. menos de 15 a 20 ítems), como formularios estáticos, pantallas de perfil, configuraciones o vistas de detalle donde no hay riesgo de saturar la memoria RAM.
  * **Usar `FlatList`**: Para listas **extensas, infinitas o dinámicas** (más de 15–20 elementos, catálogos de productos, feeds de redes sociales, etc.). Mantiene el consumo de memoria bajo y garantiza una velocidad constante a 60 FPS.

---

## ❓ Pregunta 2: Importancia de `keyExtractor`

### **¿Por qué es obligatorio el prop `keyExtractor` en `FlatList` y qué pasa si se omite?**

### 💡 Respuesta:
* **Mecanismo de Reconciliación (React Virtual DOM):**
  * React utiliza la clave única (`key`) para identificar de forma unívoca cada elemento dentro del árbol virtual de componentes. Cuando la lista cambia (se ordena, filtra, agrega o elimina un ítem), React utiliza este identificador para determinar exactamente qué ítem cambió y actualizar solo ese nodo en lugar de re-renderizar la lista entera.

* **¿Qué pasa si se omite o si se usa el índice del array (`i`)?**
  1. **Advertencias en Consola:** React Native lanzará la advertencia: *"Warning: Each child in a list should have a unique 'key' prop"*.
  2. **Bugs de Estado y Animación:** Si se usa el índice (`(_, index) => index.toString()`), al eliminar o reordenar un elemento, los componentes internos reutilizarán el estado local del índice anterior, provocando que se muestren datos incorrectos o animaciones rotas en las tarjetas.
  3. **Caída de Rendimiento:** Si se omite, `FlatList` intentará usar la propiedad `item.key` o `item.id`. Si no existen como cadenas, forzará re-renders masivos innecesarios.

---

## ❓ Pregunta 3: `KeyboardAvoidingView` y diferencias por Plataforma

### **¿Qué problema resuelve `KeyboardAvoidingView` y qué diferencia hay entre iOS y Android?**

### 💡 Respuesta:
* **Problema que resuelve:**
  * Cuando el usuario presiona un campo de entrada de texto (`TextInput`) ubicado en la parte inferior de la pantalla, el teclado nativo se despliega y suele tapar/ocultar el input y el botón de enviar. `KeyboardAvoidingView` ajusta automáticamente su altura, posición o relleno inferior para mover el contenido por encima del teclado.

* **Diferencias entre iOS y Android:**
  * **En iOS:** El sistema operativo **no ajusta automáticamente** el viewport cuando abre el teclado. Por lo tanto, en iOS es indispensable usar la propiedad `behavior="padding"` (o `"position"` en casos específicos) para empujar el contenido hacia arriba según la altura exacta del teclado iOS.
  * **En Android:** El motor nativo de Android cuenta con el modo `softwareKeyboardLayoutMode` (`adjustResize`), el cual redimensiona la ventana automáticamente a nivel de sistema. Por ello, en Android se suele configurar `behavior="height"` o pasar `behavior={Platform.OS === 'ios' ? 'padding' : undefined}` para evitar duplicar el desplazamiento.
