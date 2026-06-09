/*
 * @Author: error: git config user.email & please set dead value or install git
 * @Date: 2026-05-14 23:05:32
 * @LastEditors: error: git config user.email & please set dead value or install git
 * @LastEditTime: 2026-06-09 22:05:49
 */
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

export const DEFAULT_CATEGORIES = [
  '上衣',
  '裤子',
  '鞋子',
  '配饰',
  '包包',
  '其他',
];

// 保持向后兼容
export const CATEGORIES = DEFAULT_CATEGORIES;
