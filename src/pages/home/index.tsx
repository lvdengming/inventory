import { getCategoryName, useI18n } from '@/i18n';
import { useStore } from '@/store';
import { CATEGORIES } from '@/types';
import { Icon } from '@iconify/react';
import { history } from 'umi';

export default function HomePage() {
  const { items } = useStore();
  const { t } = useI18n();

  return (
    <div>
      {/* iOS 26 大标题导航 */}
      <header className="px-5 pt-14 pb-3">
        <h1 className="text-[34px] font-bold tracking-tight">
          {t('home.title')}
        </h1>
        <p className="text-[15px] text-[var(--color-text-secondary)] mt-0.5">
          {t('home.count', { count: items.length })}
        </p>
      </header>

      {/* 分类展示 */}
      <div className="px-5">
        {CATEGORIES.map((category) => {
          const categoryItems = items.filter(
            (item) => item.category === category,
          );
          if (categoryItems.length === 0) return null;
          return (
            <section key={category} className="mb-7">
              <h2 className="text-[20px] font-semibold mb-3">
                {getCategoryName(t, category)}
              </h2>
              <div className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-hide">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => history.push(`/item/${item.id}`)}
                    className="flex-shrink-0 w-28 active:scale-95 transition-transform"
                  >
                    <div className="w-28 h-28 rounded-3xl overflow-hidden glass">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl text-[var(--color-text-secondary)]">
                          <Icon icon="lucide:package" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs mt-2 text-center truncate text-[var(--color-text-secondary)]">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
        {items.length === 0 && (
          <div className="text-center py-20 text-[var(--color-text-secondary)]">
            <p className="text-5xl mb-4">
              <Icon icon="lucide:package" className="inline" />
            </p>
            <p className="text-base font-medium">{t('home.empty')}</p>
            <p className="text-sm mt-1.5 opacity-80">{t('home.emptyHint')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
