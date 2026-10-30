/**
 * Sistema de Personalización, Monedas y Armario de Navi 🦉✨
 * Plataforma "Unidas por un camino seguro"
 */

export type NaviColorId = 
  | 'classic'    // Celeste y Lavanda (Default)
  | 'golden'     // Dorado Sol Andino (Inti)
  | 'emerald'    // Verde Esmeralda Selva
  | 'pink'       // Rosa Algodón y Fresa
  | 'sunset'     // Atardecer Naranja & Rubí
  | 'midnight'   // Obsidiana Cósmica & Neón
  | 'teal';      // Turquesa Glaciar Andino

export type NaviHatId = 
  | 'none'
  | 'chullo'          // Gorro tradicional andino con orejeras
  | 'graduation_cap'  // Birrete de 5.° de secundaria
  | 'flower_crown'    // Corona de flores andinas
  | 'crown';          // Corona dorada de la prevención

export type NaviGlassesId = 
  | 'none'
  | 'reading_glasses' // Lentes sabios de lectura
  | 'sunglasses';     // Lentes de sol cool

export type NaviOutfitId = 
  | 'none'
  | 'poncho'          // Ponchito tradicional andino
  | 'scarf'           // Chalina protectora tejida
  | 'hero_cape'       // Capa de heroína/héroe
  | 'bowtie';         // Corbatín elegante

export interface NaviCustomization {
  color: NaviColorId;
  hat: NaviHatId;
  glasses: NaviGlassesId;
  outfit: NaviOutfitId;
}

export interface WardrobeItem {
  id: string;
  name: string;
  category: 'color' | 'hat' | 'glasses' | 'outfit';
  value: string;
  price: number;
  previewEmoji: string;
  description: string;
}

export const NAVI_COLOR_PALETTES: Record<NaviColorId, {
  body: string;
  face: string;
  wing1: string;
  wing2: string;
  tufts: string;
  chest: string;
  tailFeet: string;
  name: string;
}> = {
  classic: {
    name: 'Celeste & Lavanda (Original)',
    body: '#A4B4CC',
    face: '#D6CBE2',
    wing1: '#7A6786',
    wing2: '#A58DB5',
    tufts: '#8A9CB8',
    chest: '#E2ECF8',
    tailFeet: '#536582',
  },
  golden: {
    name: 'Dorado Sol Andino',
    body: '#F59E0B',
    face: '#FEF3C7',
    wing1: '#D97706',
    wing2: '#FBBF24',
    tufts: '#B45309',
    chest: '#FFFBEB',
    tailFeet: '#92400E',
  },
  emerald: {
    name: 'Verde Esmeralda Selva',
    body: '#10B981',
    face: '#D1FAE5',
    wing1: '#059669',
    wing2: '#34D399',
    tufts: '#047857',
    chest: '#ECFDF5',
    tailFeet: '#065F46',
  },
  pink: {
    name: 'Rosa Algodón & Fresa',
    body: '#EC4899',
    face: '#FCE7F3',
    wing1: '#DB2777',
    wing2: '#F472B6',
    tufts: '#BE185D',
    chest: '#FDF2F8',
    tailFeet: '#9D174D',
  },
  sunset: {
    name: 'Atardecer Fuego Andino',
    body: '#F97316',
    face: '#FFEDD5',
    wing1: '#EA580C',
    wing2: '#FB923C',
    tufts: '#C2410C',
    chest: '#FFF7ED',
    tailFeet: '#9A3412',
  },
  midnight: {
    name: 'Obsidiana Cósmica',
    body: '#312E81',
    face: '#E0E7FF',
    wing1: '#1E1B4B',
    wing2: '#6366F1',
    tufts: '#3730A3',
    chest: '#EEF2FF',
    tailFeet: '#1E1B4B',
  },
  teal: {
    name: 'Turquesa Glaciar',
    body: '#0D9488',
    face: '#CCFBF1',
    wing1: '#0F766E',
    wing2: '#2DD4BF',
    tufts: '#115E59',
    chest: '#F0FDFA',
    tailFeet: '#134E4A',
  },
};

export const WARDROBE_ITEMS: WardrobeItem[] = [
  // 1. Colores de Plumaje
  {
    id: 'color_classic',
    name: 'Plumaje Clásico',
    category: 'color',
    value: 'classic',
    price: 0,
    previewEmoji: '🦉',
    description: 'El plumaje celeste y lavanda tradicional de Navi.',
  },
  {
    id: 'color_golden',
    name: 'Dorado Sol Andino',
    category: 'color',
    value: 'golden',
    price: 25,
    previewEmoji: '☀️',
    description: 'Inspirado en la calidez del sol Inti y la energía juvenil.',
  },
  {
    id: 'color_emerald',
    name: 'Verde Esmeralda',
    category: 'color',
    value: 'emerald',
    price: 25,
    previewEmoji: '🌿',
    description: 'Símbolo de esperanza, naturaleza andina y crecimiento.',
  },
  {
    id: 'color_pink',
    name: 'Rosa Algodón',
    category: 'color',
    value: 'pink',
    price: 25,
    previewEmoji: '🌸',
    description: 'Tono dulce y empático, representando el autocuidado.',
  },
  {
    id: 'color_sunset',
    name: 'Atardecer Fuego',
    category: 'color',
    value: 'sunset',
    price: 30,
    previewEmoji: '🌅',
    description: 'Colores vibrantes del atardecer sobre las montañas.',
  },
  {
    id: 'color_midnight',
    name: 'Obsidiana Cósmica',
    category: 'color',
    value: 'midnight',
    price: 35,
    previewEmoji: '🌌',
    description: 'Misterioso, elegante y sabio bajo el cielo estrellado.',
  },
  {
    id: 'color_teal',
    name: 'Turquesa Glaciar',
    category: 'color',
    value: 'teal',
    price: 30,
    previewEmoji: '💎',
    description: 'Fresco y sereno como las lagunas altoandinas.',
  },

  // 2. Gorros y Cabeza
  {
    id: 'hat_none',
    name: 'Sin Gorro',
    category: 'hat',
    value: 'none',
    price: 0,
    previewEmoji: '🪶',
    description: 'Navi al natural con sus tiernas orejitas emplumadas.',
  },
  {
    id: 'hat_chullo',
    name: 'Chullo Andino',
    category: 'hat',
    value: 'chullo',
    price: 30,
    previewEmoji: '🧶',
    description: 'Gorro tradicional tejido con orejeras y pompom andino.',
  },
  {
    id: 'hat_grad',
    name: 'Birrete de 5.° Sec',
    category: 'hat',
    value: 'graduation_cap',
    price: 35,
    previewEmoji: '🎓',
    description: 'Homenaje a la graduación y proyecto de vida escolar.',
  },
  {
    id: 'hat_flowers',
    name: 'Corona de Flores',
    category: 'hat',
    value: 'flower_crown',
    price: 25,
    previewEmoji: '🌺',
    description: 'Flores silvestres andinas que representan florecer seguro.',
  },
  {
    id: 'hat_crown',
    name: 'Corona de la Prevención',
    category: 'hat',
    value: 'crown',
    price: 40,
    previewEmoji: '👑',
    description: 'Para quienes dominan todos los mitos y derechos.',
  },

  // 3. Lentes
  {
    id: 'glasses_none',
    name: 'Sin Lentes',
    category: 'glasses',
    value: 'none',
    price: 0,
    previewEmoji: '👀',
    description: 'Mirada atenta y cariñosa de Navi.',
  },
  {
    id: 'glasses_reading',
    name: 'Lentes Intelectuales',
    category: 'glasses',
    value: 'reading_glasses',
    price: 20,
    previewEmoji: '👓',
    description: 'Lentes redondos dorados para estudiar y leer guías.',
  },
  {
    id: 'glasses_sun',
    name: 'Lentes de Sol Cool',
    category: 'glasses',
    value: 'sunglasses',
    price: 25,
    previewEmoji: '🕶️',
    description: 'Estilo juvenil y relajado para prevenir con actitud.',
  },

  // 4. Ropa y Accesorios
  {
    id: 'outfit_none',
    name: 'Sin Ropa',
    category: 'outfit',
    value: 'none',
    price: 0,
    previewEmoji: '✨',
    description: 'Pecho al descubierto con la burbujita consejera oficial.',
  },
  {
    id: 'outfit_poncho',
    name: 'Ponchito Andino',
    category: 'outfit',
    value: 'poncho',
    price: 35,
    previewEmoji: '🧣',
    description: 'Poncho tradicional con patrones geométricos andinos.',
  },
  {
    id: 'outfit_scarf',
    name: 'Chalina Protectora',
    category: 'outfit',
    value: 'scarf',
    price: 25,
    previewEmoji: '🧣',
    description: 'Bufanda tejida morada para abrigar a Navi.',
  },
  {
    id: 'outfit_cape',
    name: 'Capa de Superhéroe',
    category: 'outfit',
    value: 'hero_cape',
    price: 40,
    previewEmoji: '🦸',
    description: 'Capa carmesí de guardián de los derechos juveniles.',
  },
  {
    id: 'outfit_bowtie',
    name: 'Corbatín Elegante',
    category: 'outfit',
    value: 'bowtie',
    price: 20,
    previewEmoji: '🎀',
    description: 'Un detalle formal y coqueto para eventos escolares.',
  },
];

const STORAGE_COINS_KEY = 'unidas_navi_coins_v1';
const STORAGE_CUSTOMIZATION_KEY = 'unidas_navi_customization_v1';
const STORAGE_UNLOCKED_ITEMS_KEY = 'unidas_navi_unlocked_items_v1';

const DEFAULT_CUSTOMIZATION: NaviCustomization = {
  color: 'classic',
  hat: 'none',
  glasses: 'none',
  outfit: 'none',
};

const DEFAULT_UNLOCKED_ITEMS: string[] = [
  'color_classic',
  'hat_none',
  'glasses_none',
  'outfit_none',
];

// Event listener system for reactive UI updates across the entire app
type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach(fn => {
    try {
      fn();
    } catch (e) {
      console.warn('Customization listener error:', e);
    }
  });
}

export const naviCustomizationService = {
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },

  getCoins(): number {
    try {
      const val = localStorage.getItem(STORAGE_COINS_KEY);
      if (val === null) {
        // Initial welcome gift of 15 coins so they can try the wardrobe
        this.setCoins(15);
        return 15;
      }
      return parseInt(val, 10) || 0;
    } catch {
      return 15;
    }
  },

  setCoins(amount: number) {
    try {
      localStorage.setItem(STORAGE_COINS_KEY, amount.toString());
      notifyListeners();
    } catch (e) {
      console.warn('Error saving coins:', e);
    }
  },

  addCoins(amount: number): number {
    const current = this.getCoins();
    const next = current + amount;
    this.setCoins(next);
    return next;
  },

  spendCoins(amount: number): boolean {
    const current = this.getCoins();
    if (current < amount) return false;
    this.setCoins(current - amount);
    return true;
  },

  getUnlockedItemIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_UNLOCKED_ITEMS_KEY);
      return data ? JSON.parse(data) : DEFAULT_UNLOCKED_ITEMS;
    } catch {
      return DEFAULT_UNLOCKED_ITEMS;
    }
  },

  unlockItem(itemId: string) {
    try {
      const list = this.getUnlockedItemIds();
      if (!list.includes(itemId)) {
        list.push(itemId);
        localStorage.setItem(STORAGE_UNLOCKED_ITEMS_KEY, JSON.stringify(list));
        notifyListeners();
      }
    } catch (e) {
      console.warn('Error unlocking wardrobe item:', e);
    }
  },

  getCustomization(): NaviCustomization {
    try {
      const data = localStorage.getItem(STORAGE_CUSTOMIZATION_KEY);
      return data ? { ...DEFAULT_CUSTOMIZATION, ...JSON.parse(data) } : DEFAULT_CUSTOMIZATION;
    } catch {
      return DEFAULT_CUSTOMIZATION;
    }
  },

  saveCustomization(cust: NaviCustomization) {
    try {
      localStorage.setItem(STORAGE_CUSTOMIZATION_KEY, JSON.stringify(cust));
      notifyListeners();
    } catch (e) {
      console.warn('Error saving navi customization:', e);
    }
  },

  equipItem(item: WardrobeItem) {
    const current = this.getCustomization();
    const updated: NaviCustomization = { ...current };

    if (item.category === 'color') updated.color = item.value as NaviColorId;
    if (item.category === 'hat') updated.hat = item.value as NaviHatId;
    if (item.category === 'glasses') updated.glasses = item.value as NaviGlassesId;
    if (item.category === 'outfit') updated.outfit = item.value as NaviOutfitId;

    this.saveCustomization(updated);
  },
};

