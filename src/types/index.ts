// src/types/index.ts

// Definí esta interfaz para representar la estructura exacta de un paquete de catering.
// Así me aseguro de cumplir la rúbrica al no usar 'any' y tener autocompletado en TypeScript.
export interface CateringItem {
  id: string;             // Identificador único de cada servicio
  title: string;          // Nombre del paquete (ej: "Coffee Break Ejecutivo")
  category: string;       // Clasificación del evento (Empresarial, Bodas, etc.)
  capacity: string;       // Rango recomendado de personas
  pricePerPerson: number; // Costo individual por invitado
  description: string;   // Detalle resumido del menú que incluye
  imageUrl: string;      // Enlace a la fotografía del platillo o montaje
}
