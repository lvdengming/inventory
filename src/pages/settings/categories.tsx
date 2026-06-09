import { useI18n } from '@/i18n';
import { useStore } from '@/store';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { history } from 'umi';

export default function CategoriesPage() {
  const { categories, addCategory, removeCategory } = useStore();
  const { t } = useI18n();
  const [newName, setNewName] = useState('');
  const [showDelete, setShowDelete] = useState<string | null>(null);

  const handleAdd = () => {
    const name = newName.trim();
    if (!name || categories.includes(name)) return;
    addCategory(name);
    setNewName('');
  };

  const handleDelete = (name: string) => {
    removeCategory(name);
    setShowDelete(null);
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="shrink-0 glass-lg px-5 pt-[calc(env(safe-area-inset-top)+8px)] pb-3 flex items-center">
        <button
          onClick={() => history.back()}
          className="flex items-center gap-0.5 text-[var(--color-primary)] text-[17px]"
        >
          <Icon icon="lucide:chevron-left" className="text-xl leading-none" />
          <span className="leading-none">{t('back')}</span>
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold">
          {t('categories.title')}
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-8">
        {/* 添加分类 */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder={t('categories.placeholder')}
            className="flex-1 h-11 px-4 rounded-2xl glass text-[15px] outline-none placeholder:text-[var(--color-text-secondary)]"
          />
          <button
            onClick={handleAdd}
            className="h-11 px-4 rounded-2xl bg-[var(--color-primary)] text-white font-medium text-[15px] active:scale-95 transition-transform"
          >
            {t('categories.add')}
          </button>
        </div>

        {/* 分类列表 */}
        <div className="rounded-3xl overflow-hidden glass-lg">
          {categories.map((category, idx) => (
            <div key={category}>
              <div className="flex items-center justify-between px-4 py-3.5">
                <span className="text-[17px]">{category}</span>
                <button
                  onClick={() => setShowDelete(category)}
                  className="text-red-500 text-sm"
                >
                  <Icon icon="lucide:trash-2" className="text-lg" />
                </button>
              </div>
              {idx < categories.length - 1 && (
                <div className="ml-4 mr-4 h-px bg-[var(--color-separator)]" />
              )}
            </div>
          ))}
          {categories.length === 0 && (
            <div className="px-4 py-8 text-center text-[var(--color-text-secondary)]">
              {t('categories.empty')}
            </div>
          )}
        </div>
      </div>

      {/* 删除确认弹框 */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowDelete(null)}
          />
          <div className="relative glass-lg rounded-3xl p-6 mx-8 w-full max-w-sm animate-scale-in">
            <h3 className="text-[17px] font-semibold text-center mb-2">
              {t('categories.deleteTitle')}
            </h3>
            <p className="text-[15px] text-[var(--color-text-secondary)] text-center mb-5">
              {t('categories.deleteMsg')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(null)}
                className="flex-1 py-2.5 rounded-xl glass-btn text-[15px] font-medium"
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => handleDelete(showDelete)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-[15px] font-medium active:scale-95 transition-transform"
              >
                {t('delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
