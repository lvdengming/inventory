import { useI18n } from '@/i18n';
import { useStore } from '@/store';
import { Icon } from '@iconify/react';
import { useRef } from 'react';
import { history } from 'umi';

export default function DataPage() {
  const { exportData, importData } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

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
    <div className="h-screen flex flex-col">
      {/* 固定顶部导航栏 */}
      <header className="shrink-0 glass-lg px-5 pt-[calc(env(safe-area-inset-top)+8px)] pb-3 flex items-center">
        <button
          onClick={() => history.back()}
          className="text-[var(--color-primary)] text-[17px] font-medium mr-3 flex items-center gap-0.5"
        >
          <Icon icon="lucide:chevron-left" className="text-xl leading-none" />
          <span className="leading-none">{t('back')}</span>
        </button>
        <h1 className="text-[17px] font-semibold flex-1 text-center mr-12">
          {t('settings.data')}
        </h1>
      </header>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto px-5 pt-4">
        <section className="mb-8">
          <div className="rounded-3xl overflow-hidden glass-lg">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-between px-4 py-4 active:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon
                  icon="lucide:upload"
                  className="text-2xl text-[var(--color-primary)]"
                />
                <span className="text-[17px]">{t('settings.export')}</span>
              </div>
              <Icon
                icon="lucide:chevron-right"
                className="text-[var(--color-text-secondary)] text-sm"
              />
            </button>
            <div className="ml-[52px] mr-4 h-px bg-[var(--color-separator)]" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-between px-4 py-4 active:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon
                  icon="lucide:download"
                  className="text-2xl text-[var(--color-primary)]"
                />
                <span className="text-[17px]">{t('settings.import')}</span>
              </div>
              <Icon
                icon="lucide:chevron-right"
                className="text-[var(--color-text-secondary)] text-sm"
              />
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
      </div>
    </div>
  );
}
