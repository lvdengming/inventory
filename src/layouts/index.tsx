import { useI18n } from '@/i18n';
import { useTheme } from '@/store';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { history, Outlet, useLocation } from 'umi';

export default function Layout() {
  const location = useLocation();
  const { theme } = useTheme();
  const { t } = useI18n();
  const [animatingTab, setAnimatingTab] = useState<string | null>(null);
  const prevPathRef = useRef(location.pathname);

  const tabs = [
    {
      path: '/home',
      label: t('tab.home'),
      icon: 'lucide:house',
    },
    {
      path: '/outfit',
      label: t('tab.outfit'),
      icon: 'lucide:shirt',
    },
    {
      path: '/settings',
      label: t('tab.settings'),
      icon: 'lucide:settings',
    },
  ];

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const tabPaths = tabs.map((tab) => tab.path);

  useEffect(() => {
    const prev = prevPathRef.current;
    const curr = location.pathname;
    prevPathRef.current = curr;

    // 仅在底部导航栏 tab 之间切换时才触发动画
    if (prev !== curr && tabPaths.includes(prev) && tabPaths.includes(curr)) {
      setAnimatingTab(curr);
      const timer = setTimeout(() => setAnimatingTab(null), 500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isDetailPage = location.pathname.startsWith('/item/');
  const isSubSettingsPage = location.pathname.startsWith('/settings/');
  const hideTabBar = isDetailPage || isSubSettingsPage;

  return (
    <div className="min-h-screen text-[var(--color-text)]">
      <div className={hideTabBar ? '' : 'pb-28'}>
        <Outlet />
      </div>
      {!hideTabBar && (
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)]">
          <nav className="glass-lg rounded-[22px] overflow-hidden">
            <div className="flex justify-around items-center h-16">
              {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                const isAnimating = animatingTab === tab.path;
                return (
                  <button
                    key={tab.path}
                    onClick={() => history.push(tab.path)}
                    className={`flex flex-col items-center gap-1 px-5 py-1.5 rounded-2xl transition-all ${
                      isActive
                        ? 'text-[var(--color-primary)] scale-105'
                        : 'text-[var(--color-text-secondary)]'
                    }`}
                  >
                    <span
                      key={isAnimating ? `${tab.path}-anim` : tab.path}
                      className={`inline-flex text-[22px] ${isAnimating ? 'tab-icon-draw' : ''}`}
                    >
                      <Icon icon={tab.icon} />
                    </span>
                    <span className="text-[10px] font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
