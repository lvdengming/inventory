import { getCategoryName, useI18n } from '@/i18n';
import { useStore } from '@/store';
import { Icon } from '@iconify/react';
import { history, useParams } from 'umi';

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const { items } = useStore();
  const item = items.find((i) => i.id === id);
  const { t } = useI18n();

  if (!item) {
    return (
      <div className="p-4 text-center pt-20">
        <p className="text-[var(--color-text-secondary)]">
          {t('detail.notFound')}
        </p>
        <button
          onClick={() => history.back()}
          className="mt-4 text-[var(--color-primary)] flex items-center gap-0.5 mx-auto"
        >
          <Icon icon="lucide:chevron-left" className="text-sm" />
          {t('back')}
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
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl text-[var(--color-text-secondary)]">
              <Icon icon="lucide:package" />
            </div>
          )}
        </div>
        <button
          onClick={() => history.back()}
          className="absolute top-12 left-4 w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--color-text)]"
        >
          <Icon icon="lucide:chevron-left" className="text-base" />
        </button>
      </div>

      {/* iOS 26 液态玻璃卡片 */}
      <div className="px-5 -mt-5">
        <div className="rounded-3xl glass-lg p-5">
          <h1 className="text-[22px] font-bold mb-1">{item.name}</h1>
          <p className="text-[15px] text-[var(--color-text-secondary)]">
            {getCategoryName(t, item.category)}
          </p>
        </div>

        <div className="mt-4 rounded-3xl overflow-hidden glass-lg">
          <InfoRow
            label={t('detail.category')}
            value={getCategoryName(t, item.category)}
          />
          <InfoRow
            label={t('detail.date')}
            value={item.purchaseDate || t('detail.notRecorded')}
          />
          <InfoRow
            label={t('detail.price')}
            value={item.price ? `¥${item.price}` : t('detail.notRecorded')}
            last={!item.description}
          />
          {item.description && (
            <InfoRow label={t('detail.note')} value={item.description} last />
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center px-4 py-3 ${last ? '' : 'border-b border-[var(--color-border)]'}`}
    >
      <span className="text-[var(--color-text-secondary)]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
