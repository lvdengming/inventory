export interface Item {
  id: string;
  name: string;
  category: string;
  image: string;
  purchaseDate: string;
  price: number;
  description?: string;
}

export interface Outfit {
  id: string;
  name: string;
  items: string[]; // item ids
}

export type ThemeMode = 'light' | 'dark';

export const CATEGORIES = [
  '上衣',
  '裤子',
  '鞋子',
  '配饰',
  '包包',
  '其他',
] as const;
