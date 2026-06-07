import { useI18n } from '@/i18n';
import { Icon } from '@iconify/react';
import { history } from 'umi';

const languages = [
  { code: 'zh-CN', label: '中文', icon: '🇨🇳' },
  { code: 'en-US', label: 'English', icon: '🇺🇸' },
];

export default function LanguagePage() {
  const { locale, setLocale, t } = useI18n();

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
          {t('settings.language')}
        </h1>
      </header>

      {/* 内容区域 */}
      <div className="px-5 pt-24">
        <section className="mb-8">
          <div className="rounded-3xl overflow-hidden glass-lg">
            {languages.map((lang, idx) => (
              <div key={lang.code}>
                <button
                  onClick={() => setLocale(lang.code)}
                  className="w-full flex items-center justify-between px-4 py-4 active:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.icon}</span>
                    <span className="text-[17px]">{lang.label}</span>
                  </div>
                  {locale === lang.code && (
                    <Icon
                      icon="lucide:check"
                      className="text-[var(--color-primary)] text-xl font-semibold"
                    />
                  )}
                </button>
                {idx < languages.length - 1 && (
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
