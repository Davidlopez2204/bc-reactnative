# 🧠 Respuestas Teóricas — Semana 02: Listas, Inputs y Estilos

---

## 1. ¿Cuál es la diferencia principal entre `FlatList` y `ScrollView`? ¿Cuándo usar cada uno?

**Respuesta:**
La diferencia principal es la **memoria y el rendimiento**:

* **`ScrollView`**: Carga todos los elementos de la lista al mismo tiempo desde el inicio, incluso los que no se ven en la pantalla. Es ideal para pantallas cortas con pocos elementos fijos (menos de 15 ítems), como formularios o vistas de detalle.
* **`FlatList`**: Usa **virtualización**, lo que significa que solo renderiza en pantalla los elementos que el usuario está viendo en ese momento. A medida que haces scroll, va cargando los nuevos y liberando los que quedan arriba. Es la opción correcta para listas largas o catálogos dinámicos.

---

## 2. ¿Por qué es obligatorio el prop `keyExtractor` en `FlatList` y qué pasa si se omite?

**Respuesta:**
Es obligatorio porque React necesita un **identificador único (ID)** para cada elemento de la lista. Esto le permite saber exactamente qué ítem cambió, se agregó o se eliminó sin tener que volver a dibujar toda la lista entera.

* **Si se omite**: React Native muestra una advertencia (*warning*) en la consola y la app pierde rendimiento porque se vuelve más lenta al renderizar.
* **Si se usa el índice del array (`index`)**: Puede provocar fallos visuales o errores en el estado de los componentes si la lista se filtra o se reordena. Por eso siempre debemos usar el `id` propio del dato (por ejemplo, `item.id`).

---

## 3. ¿Qué problema resuelve `KeyboardAvoidingView` y qué diferencia hay entre iOS y Android?

**Respuesta:**
Resuelve el problema de que **el teclado nativo tape los campos de texto (`TextInput`)** o los botones cuando el usuario va a escribir. `KeyboardAvoidingView` empuja automáticamente el contenido hacia arriba para que el input quede visible.

* **Diferencia entre plataformas:**
  * En **iOS**, el sistema no mueve la pantalla por defecto, por lo que es obligatorio usar la propiedad `behavior="padding"` para que empuje el contenido.
  * En **Android**, el sistema operativo ya ajusta el tamaño de la ventana por defecto (`adjustResize`), por lo que se suele usar `behavior="height"` o dejar que el sistema lo maneje.
