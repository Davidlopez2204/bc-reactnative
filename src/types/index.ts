// src/types/index.ts

// Interfaz para representar la estructura exacta de un paquete de catering.
export interface CateringItem {
  id: string;             // Identificador único de cada servicio
  title: string;          // Nombre del paquete (ej: "Coffee Break Ejecutivo")
  category: string;       // Clasificación del evento (Empresarial, Social, Coctelería, etc.)
  capacity: string;       // Rango recomendado de personas (ej: "15 - 50 personas")
  pricePerPerson: number; // Costo individual por invitado
  description: string;   // Detalle resumido del menú que incluye
  imageUrl: string;      // Enlace a la fotografía del platillo o montaje
  rating: number;        // Valoración de clientes (1.0 - 5.0)
  minPax: number;        // Mínimo de invitados requeridos
  isPopular?: boolean;   // Badge opcional para servicios más solicitados
}

// Estructura para el resumen de cotización generada en el Modal
export interface QuoteDetails {
  item: CateringItem;
  guestsCount: number;
  includeDrinks: boolean;
  totalPrice: number;
}
