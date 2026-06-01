import { useStore } from '@/store';
import { CATEGORIES } from '@/types';
import { useState } from 'react';

export default function OutfitPage() {
  const { items, outfits, addOutfit, removeOutfit } = useStore();
  const [selected, setSelected] = useState<Record<string, string>>({});

  const toggleSelect = (category: string, itemId: string) => {
    setSelected((prev) => ({
      ...prev,
      [category]: prev[category] === itemId ? '' : itemId,
    }));
  };

  const saveOutfit = () => {
    const selectedItems = Object.values(selected).filter(Boolean);
    if (selectedItems.length === 0) return;
    addOutfit({
      id: Date.now().toString(),
      name: `搭配 ${outfits.length + 1}`,
      items: selectedItems,
    });
    setSelected({});
  };

  return (
    <div className="px-4">
      <header className="pt-14 pb-4">
        <h1 className="text-[34px] font-bold tracking-tight">穿搭搭配</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">从上往下选择搭配</p>
      </header>

      {/* 按分类从上往下选择 */}
      {CATEGORIES.filter((c) => ['上衣', '裤子', '鞋子', '配饰'].includes(c)).map((category) => {
        const categoryItems = items.filter((item) => item.category === category);
        return (
          <section key={category} className="mb-5">
            <h2 className="text-[13px] font-medium text-[var(--color-text-secondary)] uppercase mb-2 px-1">
              {category}
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categoryItems.length === 0 ? (
                <p className="text-xs text-[var(--color-text-secondary)]">暂无{category}</p>
              ) : (
                categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleSelect(category, item.id)}
                    className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-[3px] active:scale-95 transition-transform ${
                      selected[category] === item.id
                        ? 'border-[var(--color-primary)]'
                        : 'border-transparent'
                    }`}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[var(--color-card)] text-xl">
                        📦
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        );
      })}

      <button
        onClick={saveOutfit}
        className="w-full py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold text-[17px] mb-8 active:opacity-80 transition-opacity"
      >
        保存搭配
      </button>

      {/* 已保存搭配 */}
      {outfits.length > 0 && (
        <section>
          <h2 className="text-[20px] font-semibold mb-3">已保存搭配</h2>
          <div className="rounded-2xl bg-[var(--color-card)] overflow-hidden shadow-sm">
            {outfits.map((outfit, idx) => (
              <div
                key={outfit.id}
                className={`flex items-center gap-3 p-3 ${idx < outfits.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}
              >
                <div className="flex gap-1.5 flex-1 overflow-x-auto scrollbar-hide">
                  {outfit.items.map((itemId) => {
                    const item = items.find((i) => i.id === itemId);
                    return item ? (
                      <div key={itemId} className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[var(--color-bg)] flex items-center justify-center text-sm">
                            📦
                          </div>
                        )}
                      </div>
                    ) : null;
                  })}
                </div>
                <button
                  onClick={() => removeOutfit(outfit.id)}
                  className="text-red-500 text-[15px]"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
