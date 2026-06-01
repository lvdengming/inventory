import { mockItems, mockOutfits } from '@/mock/data';
import { Item, Outfit, ThemeMode } from '@/types';
import { useCallback, useState } from 'react';

const STORAGE_KEY = 'inventory_data';
const THEME_KEY = 'inventory_theme';

function loadData(): { items: Item[]; outfits: Outfit[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    // 首次加载使用 mock 数据
    const initial = { items: mockItems, outfits: mockOutfits };
    saveData(initial);
    return initial;
  } catch {
    return { items: mockItems, outfits: mockOutfits };
  }
}

function saveData(data: { items: Item[]; outfits: Outfit[] }) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useStore() {
  const [data, setData] = useState(loadData);

  const addItem = useCallback((item: Item) => {
    setData((prev) => {
      const next = { ...prev, items: [...prev.items, item] };
      saveData(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setData((prev) => {
      const next = { ...prev, items: prev.items.filter((i) => i.id !== id) };
      saveData(next);
      return next;
    });
  }, []);

  const updateItem = useCallback((item: Item) => {
    setData((prev) => {
      const next = { ...prev, items: prev.items.map((i) => (i.id === item.id ? item : i)) };
      saveData(next);
      return next;
    });
  }, []);

  const addOutfit = useCallback((outfit: Outfit) => {
    setData((prev) => {
      const next = { ...prev, outfits: [...prev.outfits, outfit] };
      saveData(next);
      return next;
    });
  }, []);

  const removeOutfit = useCallback((id: string) => {
    setData((prev) => {
      const next = { ...prev, outfits: prev.outfits.filter((o) => o.id !== id) };
      saveData(next);
      return next;
    });
  }, []);

  const importData = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      setData(parsed);
      saveData(parsed);
    } catch (e) {
      console.error('导入失败', e);
    }
  }, []);

  const exportData = useCallback(() => {
    return JSON.stringify(data, null, 2);
  }, [data]);

  return {
    ...data,
    addItem,
    removeItem,
    updateItem,
    addOutfit,
    removeOutfit,
    importData,
    exportData,
  };
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem(THEME_KEY) as ThemeMode) || 'light';
  });

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem(THEME_KEY, mode);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return { theme, setTheme };
}
