import { useStore, useTheme } from '@/store';
import { CATEGORIES, Item } from '@/types';
import { useRef, useState } from 'react';

export default function SettingsPage() {
  const { items, addItem, removeItem, exportData, importData } = useStore();
  const { theme, setTheme } = useTheme();
  const [showAdd, setShowAdd] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      importData(ev.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="px-4">
      <header className="pt-14 pb-4">
        <h1 className="text-[34px] font-bold tracking-tight">设置</h1>
      </header>

      {/* 主题设置 */}
      <section className="mb-8">
        <h2 className="text-[13px] font-medium text-[var(--color-text-secondary)] uppercase mb-2 px-1">
          外观
        </h2>
        <div className="rounded-2xl bg-[var(--color-card)] overflow-hidden shadow-sm">
          {(['light', 'dark'] as const).map((mode, idx) => (
            <button
              key={mode}
              onClick={() => setTheme(mode)}
              className={`w-full flex items-center justify-between px-4 py-3 ${idx === 0 ? 'border-b border-[var(--color-border)]' : ''}`}
            >
              <span>{mode === 'light' ? '☀️ 浅色模式' : '🌙 深色模式'}</span>
              {theme === mode && (
                <span className="text-[var(--color-primary)]">✓</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 物品管理 */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-2 px-1">
          <h2 className="text-[13px] font-medium text-[var(--color-text-secondary)] uppercase">
            物品管理
          </h2>
          <button
            onClick={() => setShowAdd(true)}
            className="text-[var(--color-primary)] text-[15px]"
          >
            添加
          </button>
        </div>
        <div className="rounded-2xl bg-[var(--color-card)] overflow-hidden shadow-sm">
          {items.length === 0 ? (
            <div className="px-4 py-3 text-[var(--color-text-secondary)] text-sm">
              暂无物品
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center justify-between px-4 py-2.5 ${idx < items.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[var(--color-bg)]">
                    {item.image ? (
                      <img
                        src={item.image}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        📦
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[15px] font-medium">{item.name}</p>
                    <p className="text-[12px] text-[var(--color-text-secondary)]">
                      {item.category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-[15px]"
                >
                  删除
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 数据管理 */}
      <section className="mb-8">
        <h2 className="text-[13px] font-medium text-[var(--color-text-secondary)] uppercase mb-2 px-1">
          数据
        </h2>
        <div className="rounded-2xl bg-[var(--color-card)] overflow-hidden shadow-sm">
          <button
            onClick={handleExport}
            className="w-full flex items-center px-4 py-3 border-b border-[var(--color-border)] text-[var(--color-primary)]"
          >
            导出数据
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center px-4 py-3 text-[var(--color-primary)]"
          >
            导入数据
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </section>

      {/* 添加物品弹窗 */}
      {showAdd && (
        <AddItemModal onClose={() => setShowAdd(false)} onAdd={addItem} />
      )}
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
    purchaseDate: '',
    description: '',
  });
  const [image, setImage] = useState('');

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
    'w-full px-4 py-3 rounded-xl bg-[var(--color-card)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] text-[15px]';

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end z-50">
      <div className="w-full bg-[var(--color-bg)] rounded-t-3xl p-5 pb-[env(safe-area-inset-bottom)] max-h-[85vh] overflow-y-auto">
        {/* iOS sheet handle */}
        <div className="w-9 h-1 rounded-full bg-[var(--color-border)] mx-auto mb-4" />
        <div className="flex justify-between items-center mb-5">
          <button
            onClick={onClose}
            className="text-[var(--color-primary)] text-[17px]"
          >
            取消
          </button>
          <h3 className="text-[17px] font-semibold">添加物品</h3>
          <button
            onClick={handleSubmit}
            className="text-[var(--color-primary)] text-[17px] font-semibold"
          >
            完成
          </button>
        </div>
        <div className="space-y-3">
          <input
            placeholder="物品名称"
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
                {c}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={form.purchaseDate}
            onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
            className={inputClass}
          />
          <input
            type="number"
            placeholder="购买金额"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder="备注"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass}
            rows={2}
          />
          <label className="block w-full px-4 py-3 rounded-xl bg-[var(--color-card)] text-[var(--color-primary)] text-[15px] text-center active:opacity-70">
            选择图片
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
              className="w-20 h-20 object-cover rounded-xl mx-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}
