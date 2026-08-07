// src/data/mockData.ts
import { CateringItem } from '../types';

// Creé esta lista de datos con 4 opciones reales de catering para probar la vista en ScrollView.
// Utilicé el tipo CateringItem[] para garantizar que todos los objetos cumplan con la interfaz.
export const CATERING_ITEMS: CateringItem[] = [
  {
    id: '1',
    title: 'Coffee Break Ejecutivo',
    category: 'Empresarial',
    capacity: '15 - 50 personas',
    pricePerPerson: 15.0,
    description: 'Café gourmet de grano, té variados, jugos naturales, mini croissants y bocadillos salados.',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&q=80',
  },
  {
    id: '2',
    title: 'Banquete de Bodas Premium',
    category: 'Social / Bodas',
    capacity: '80 - 250 personas',
    pricePerPerson: 45.0,
    description: 'Cena gourmet de 3 tiempos, mesa de quesos y carnes frías, bar abierto y cristalería fina.',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=500&q=80',
  },
  {
    id: '3',
    title: 'Buffet Internacional',
    category: 'Eventos Corporativos',
    capacity: '30 - 150 personas',
    pricePerPerson: 28.0,
    description: 'Variedad de carnes a la parrilla, pastas artesanales, barra de ensaladas frescas y postres.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80',
  },
  {
    id: '4',
    title: 'Cocktail & Canapés Gourmet',
    category: 'Coctelería',
    capacity: '20 - 100 personas',
    pricePerPerson: 22.0,
    description: 'Bocadillos fríos y calientes de autor, maridaje con vinos seleccionados y coctelería en vivo.',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=500&q=80',
  },
];
