import { useTheme } from '@/store';
import { useEffect } from 'react';
import { history, Outlet, useLocation } from 'umi';

const tabs = [
  { path: '/home', label: '首页', icon: '🏠' },
  { path: '/outfit', label: '搭配', icon: '👔' },
  { path: '/settings', label: '设置', icon: '⚙️' },
];

export default function Layout() {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const isDetailPage = location.pathname.startsWith('/item/');

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="pb-24">
        <Outlet />
      </div>
      {!isDetailPage && (
        <div className="fixed bottom-0 left-0 right-0 pb-2 px-3 pb-[calc(env(safe-area-inset-bottom)+8px)]">
          <nav className="backdrop-blur-2xl bg-[var(--color-tab)]/80 border border-[var(--color-border)] rounded-2xl shadow-lg overflow-hidden">
            <div className="flex justify-around items-center h-14">
              {tabs.map((tab) => (
                <button
                  key={tab.path}
                  onClick={() => history.push(tab.path)}
                  className={`flex flex-col items-center gap-0.5 ${
                    location.pathname === tab.path
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="text-[10px]">{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
