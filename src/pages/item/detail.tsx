import { useStore } from '@/store';
import { history, useParams } from 'umi';

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const { items } = useStore();
  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="p-4 text-center pt-20">
        <p className="text-[var(--color-text-secondary)]">物品不存在</p>
        <button onClick={() => history.back()} className="mt-4 text-[var(--color-primary)]">
          返回
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* 顶部图片 */}
      <div className="relative">
        <div className="w-full h-72 bg-[var(--color-card)]">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">📦</div>
          )}
        </div>
        <button
          onClick={() => history.back()}
          className="absolute top-12 left-4 w-9 h-9 rounded-full backdrop-blur-md bg-black/20 text-white flex items-center justify-center text-lg"
        >
          ‹
        </button>
      </div>

      {/* iOS 分组列表样式详细信息 */}
      <div className="px-4 -mt-4">
        <div className="rounded-2xl bg-[var(--color-card)] p-4 shadow-sm">
          <h1 className="text-[22px] font-bold mb-1">{item.name}</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">{item.category}</p>
        </div>

        <div className="mt-4 rounded-2xl bg-[var(--color-card)] overflow-hidden shadow-sm">
          <InfoRow label="分类" value={item.category} />
          <InfoRow label="购买日期" value={item.purchaseDate || '未记录'} />
          <InfoRow label="购买金额" value={item.price ? `¥${item.price}` : '未记录'} last={!item.description} />
          {item.description && <InfoRow label="备注" value={item.description} last />}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between items-center px-4 py-3 ${last ? '' : 'border-b border-[var(--color-border)]'}`}>
      <span className="text-[var(--color-text-secondary)]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
