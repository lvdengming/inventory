import { useStore } from '@/store';
import { CATEGORIES } from '@/types';
import { history } from 'umi';

export default function HomePage() {
  const { items } = useStore();

  return (
    <div>
      {/* iOS 大标题导航 */}
      <header className="px-4 pt-14 pb-2">
        <h1 className="text-[34px] font-bold tracking-tight">物品清单</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">共 {items.length} 件物品</p>
      </header>

      {/* 分类展示 */}
      <div className="px-4">
        {CATEGORIES.map((category) => {
          const categoryItems = items.filter((item) => item.category === category);
          if (categoryItems.length === 0) return null;
          return (
            <section key={category} className="mb-6">
              <h2 className="text-[20px] font-semibold mb-2">{category}</h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => history.push(`/item/${item.id}`)}
                    className="flex-shrink-0 w-28 active:opacity-70 transition-opacity"
                  >
                    <div className="w-28 h-28 rounded-2xl overflow-hidden bg-[var(--color-card)] shadow-sm">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">
                          📦
                        </div>
                      )}
                    </div>
                    <p className="text-xs mt-1.5 text-center truncate text-[var(--color-text-secondary)]">
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
            <p className="text-5xl mb-3">📦</p>
            <p className="text-base">暂无物品</p>
            <p className="text-sm mt-1">请在设置中添加</p>
          </div>
        )}
      </div>
    </div>
  );
}
