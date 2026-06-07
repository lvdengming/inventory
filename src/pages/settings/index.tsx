import { useI18n } from '@/i18n';
import { Icon } from '@iconify/react';
import { history } from 'umi';

export default function SettingsPage() {
  const { t } = useI18n();

  return (
    <div className="px-5">
      <header className="pt-14 pb-4">
        <h1 className="text-[34px] font-bold tracking-tight">
          {t('settings.title')}
        </h1>
      </header>

      {/* 物品管理 */}
      <section className="mb-6">
        <div className="rounded-3xl overflow-hidden glass-lg">
          <button
            onClick={() => history.push('/settings/items')}
            className="w-full flex items-center justify-between px-4 py-4 active:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icon icon="lucide:package" className="text-2xl" />
              <span className="text-[17px]">{t('settings.items')}</span>
            </div>
            <Icon
              icon="lucide:chevron-right"
              className="text-[var(--color-text-secondary)] text-sm"
            />
          </button>
        </div>
      </section>

      {/* 外观和语言 */}
      <section className="mb-6">
        <div className="rounded-3xl overflow-hidden glass-lg">
          <button
            onClick={() => history.push('/settings/appearance')}
            className="w-full flex items-center justify-between px-4 py-4 active:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icon icon="lucide:palette" className="text-2xl" />
              <span className="text-[17px]">{t('settings.appearance')}</span>
            </div>
            <Icon
              icon="lucide:chevron-right"
              className="text-[var(--color-text-secondary)] text-sm"
            />
          </button>
          <div className="ml-[52px] mr-4 h-px bg-[var(--color-separator)]" />
          <button
            onClick={() => history.push('/settings/language')}
            className="w-full flex items-center justify-between px-4 py-4 active:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icon icon="lucide:globe" className="text-2xl" />
              <span className="text-[17px]">{t('settings.language')}</span>
            </div>
            <Icon
              icon="lucide:chevron-right"
              className="text-[var(--color-text-secondary)] text-sm"
            />
          </button>
        </div>
      </section>

      {/* 数据 */}
      <section className="mb-8">
        <div className="rounded-3xl overflow-hidden glass-lg">
          <button
            onClick={() => history.push('/settings/data')}
            className="w-full flex items-center justify-between px-4 py-4 active:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icon icon="lucide:database" className="text-2xl" />
              <span className="text-[17px]">{t('settings.data')}</span>
            </div>
            <Icon
              icon="lucide:chevron-right"
              className="text-[var(--color-text-secondary)] text-sm"
            />
          </button>
        </div>
      </section>
    </div>
  );
}
