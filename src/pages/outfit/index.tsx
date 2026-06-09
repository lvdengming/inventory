import { getCategoryName, useI18n } from '@/i18n';
import { useStore } from '@/store';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function OutfitPage() {
  const { items, categories, outfits, addOutfit, removeOutfit } = useStore();
  const [selected, setSelected] = useState<Record<string, string>>({});
  const { t } = useI18n();

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
    <div className="px-5">
      <header className="pt-[calc(env(safe-area-inset-top)+8px)] pb-4">
        <h1 className="text-[34px] font-bold tracking-tight">
          {t('outfit.title')}
        </h1>
        <p className="text-[15px] text-[var(--color-text-secondary)] mt-0.5">
          {t('outfit.hint')}
        </p>
      </header>

      {/* 按分类从上往下选择 */}
      {categories.map((category) => {
        const categoryItems = items.filter(
          (item) => item.category === category,
        );
        return (
          <section key={category} className="mb-5">
            <h2 className="text-[13px] font-semibold text-[var(--color-text-secondary)] uppercase mb-2 px-1 tracking-wide">
              {getCategoryName(t, category)}
            </h2>
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
              {categoryItems.length === 0 ? (
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {t('outfit.none', { category: getCategoryName(t, category) })}
                </p>
              ) : (
                categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleSelect(category, item.id)}
                    className={`flex-shrink-0 w-20 h-20 rounded-[18px] overflow-hidden border-[3px] active:scale-95 transition-all ${
                      selected[category] === item.id
                        ? 'border-[var(--color-primary)] shadow-lg shadow-blue-500/20'
                        : 'border-transparent'
                    }`}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center glass text-xl text-[var(--color-text-secondary)]">
                        <Icon icon="lucide:package" />
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
        className="w-full py-3.5 bg-[var(--color-primary)] text-white rounded-2xl font-semibold text-[17px] mb-8 active:scale-[0.98] transition-transform shadow-lg shadow-blue-500/20"
      >
        {t('outfit.save')}
      </button>

      {/* 已保存搭配 */}
      {outfits.length > 0 && (
        <section className="pb-4">
          <h2 className="text-[20px] font-semibold mb-3">
            {t('outfit.saved')}
          </h2>
          <div className="rounded-3xl overflow-hidden glass-lg">
            {outfits.map((outfit, idx) => (
              <div
                key={outfit.id}
                className={`flex items-center gap-3 p-3.5 ${idx < outfits.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}
              >
                <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide">
                  {outfit.items.map((itemId) => {
                    const item = items.find((i) => i.id === itemId);
                    return item ? (
                      <div
                        key={itemId}
                        className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full glass flex items-center justify-center text-sm text-[var(--color-text-secondary)]">
                            <Icon icon="lucide:package" />
                          </div>
                        )}
                      </div>
                    ) : null;
                  })}
                </div>
                <button
                  onClick={() => removeOutfit(outfit.id)}
                  className="text-red-500 text-[15px] font-medium"
                >
                  {t('delete')}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
