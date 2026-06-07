/*
 * @Author: error: git config user.email & please set dead value or install git
 * @Date: 2026-06-01 22:28:15
 * @LastEditors: error: git config user.email & please set dead value or install git
 * @LastEditTime: 2026-06-07 22:56:24
 */
import { useI18n } from '@/i18n';
import { useTheme } from '@/store';
import { Icon } from '@iconify/react';
import { history } from 'umi';

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();

  return (
    <div>
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
          {t('appearance.title')}
        </h1>
      </header>

      {/* 内容区域 */}
      <div className="px-5 pt-24">
        {/* 主题选择 */}
        <section className="mb-8">
          <h2 className="text-[13px] font-semibold text-[var(--color-text-secondary)] uppercase mb-2 px-1 tracking-wide">
            {t('appearance.theme')}
          </h2>
          <div className="rounded-3xl overflow-hidden glass-lg">
            {(['light', 'dark'] as const).map((mode, idx) => (
              <div key={mode}>
                <button
                  onClick={() => setTheme(mode)}
                  className="w-full flex items-center justify-between px-4 py-4 active:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      icon={mode === 'light' ? 'lucide:sun' : 'lucide:moon'}
                      className="text-2xl"
                    />
                    <span className="text-[17px]">
                      {mode === 'light' ? t('theme.light') : t('theme.dark')}
                    </span>
                  </div>
                  {theme === mode && (
                    <Icon
                      icon="lucide:check"
                      className="text-[var(--color-primary)] text-xl font-semibold"
                    />
                  )}
                </button>
                {idx === 0 && (
                  <div className="ml-[52px] mr-4 h-px bg-[var(--color-separator)]" />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
