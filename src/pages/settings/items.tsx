import { getCategoryName, useI18n } from '@/i18n';
import { useStore } from '@/store';
import { CATEGORIES, Item } from '@/types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { history } from 'umi';

export default function ItemsManagementPage() {
  const { items, addItem, removeItem } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { t } = useI18n();

  return (
    <div className="overflow-x-hidden">
      {/* 固定顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-lg px-5 pt-12 pb-3 flex items-center">
        <button
          onClick={() => history.back()}
          className="text-[var(--color-primary)] text-[17px] font-medium mr-3 flex items-center gap-0.5"
        >
          <Icon icon="lucide:chevron-left" className="text-sm" />
          {t('back')}
        </button>
        <h1 className="text-[17px] font-semibold flex-1 text-center mr-12">
          {t('items.title')}
        </h1>
      </header>

      {/* 内容区域，顶部留出导航栏高度 */}
      <div className="px-5 pt-24">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-7xl mb-4 text-[var(--color-text-secondary)]">
              <Icon icon="lucide:folder" className="inline" />
            </div>
            <p className="text-[17px] font-medium text-[var(--color-text)] mb-1">
              {t('items.empty')}
            </p>
            <p className="text-[15px] text-[var(--color-text-secondary)]">
              {t('items.emptyHint')}
            </p>
          </div>
        ) : (
          CATEGORIES.map((category) => {
            const categoryItems = items.filter(
              (item) => item.category === category,
            );
            if (categoryItems.length === 0) return null;
            return (
              <section key={category} className="mb-6">
                <h2 className="text-[13px] font-semibold text-[var(--color-text-secondary)] uppercase mb-2 px-1 tracking-wide">
                  {getCategoryName(t, category)}
                </h2>
                <div className="rounded-3xl overflow-hidden glass-lg">
                  {categoryItems.map((item, idx) => (
                    <div key={item.id}>
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-[14px] overflow-hidden glass">
                            {item.image ? (
                              <img
                                src={item.image}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xl text-[var(--color-text-secondary)]">
                                <Icon icon="lucide:package" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-[15px] font-medium">
                              {item.name}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="text-red-500 text-[15px] font-medium px-2 py-1"
                        >
                          {t('delete')}
                        </button>
                      </div>
                      {idx < categoryItems.length - 1 && (
                        <div className="ml-[76px] mr-4 h-px bg-[var(--color-separator)]" />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        )}

        {/* 悬浮添加按钮 */}
        <button
          onClick={() => setShowAdd(true)}
          className="fixed right-5 bottom-[calc(env(safe-area-inset-bottom)+24px)] w-14 h-14 rounded-full bg-[var(--color-primary)] text-white text-3xl flex items-center justify-center shadow-lg shadow-blue-500/30 active:scale-90 transition-transform"
        >
          <Icon icon="lucide:plus" className="text-2xl" />
        </button>

        {/* 添加物品弹窗 */}
        {showAdd && (
          <AddItemModal onClose={() => setShowAdd(false)} onAdd={addItem} />
        )}

        {/* 删除确认弹窗 */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in">
            <div className="glass-lg rounded-3xl p-6 mx-8 text-center animate-scale-in">
              <p className="text-[17px] font-semibold mb-2">
                {t('items.deleteTitle')}
              </p>
              <p className="text-[15px] text-[var(--color-text-secondary)] mb-6">
                {t('items.deleteMsg')}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-3 rounded-2xl glass-btn text-[17px] font-medium active:scale-[0.97] transition-transform"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={() => {
                    removeItem(deleteId);
                    setDeleteId(null);
                  }}
                  className="flex-1 py-3 rounded-2xl bg-red-500 text-white text-[17px] font-medium active:scale-[0.97] transition-transform"
                >
                  {t('delete')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AddItemModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (item: Item) => void;
}) {
  const [form, setForm] = useState({
    name: '',
    category: CATEGORIES[0],
    price: '',
    purchaseDate: new Date().toISOString().slice(0, 10),
    description: '',
  });
  const [image, setImage] = useState('');
  const { t } = useI18n();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.name) return;
    onAdd({
      id: Date.now().toString(),
      name: form.name,
      category: form.category,
      image,
      price: Number(form.price) || 0,
      purchaseDate: form.purchaseDate,
      description: form.description,
    });
    onClose();
  };

  const inputClass =
    'w-full max-w-full min-w-0 px-4 py-3.5 rounded-2xl glass-solid text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] text-[15px] outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 transition-shadow';

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-end z-50 animate-fade-in">
      <div className="w-full glass-lg rounded-t-[28px] p-5 pb-[calc(env(safe-area-inset-bottom)+20px)] max-h-[85vh] overflow-y-auto animate-slide-up">
        {/* iOS 26 sheet handle */}
        <div className="w-10 h-[5px] rounded-full bg-[var(--color-text-secondary)]/30 mx-auto mb-5" />
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onClose}
            className="text-[var(--color-primary)] text-[17px] font-medium"
          >
            {t('cancel')}
          </button>
          <h3 className="text-[17px] font-semibold">{t('addItem.title')}</h3>
          <button
            onClick={handleSubmit}
            className="text-[var(--color-primary)] text-[17px] font-semibold"
          >
            {t('done')}
          </button>
        </div>
        <div className="space-y-3">
          <input
            placeholder={t('addItem.name')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {getCategoryName(t, c)}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={form.purchaseDate}
            onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
            className={inputClass + ' appearance-none box-border'}
          />
          <input
            type="number"
            placeholder={t('addItem.price')}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder={t('addItem.note')}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass}
            rows={2}
          />
          <label className="block w-full px-4 py-3.5 rounded-2xl glass-btn text-[var(--color-primary)] text-[15px] font-medium text-center active:scale-[0.98] transition-transform cursor-pointer">
            {t('addItem.image')}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
          {image && (
            <img
              src={image}
              className="w-20 h-20 object-cover rounded-2xl mx-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}
