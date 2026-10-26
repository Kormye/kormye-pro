import React from 'react';

export type MainTabType = 'p1' | 'p3' | 'p9' | 'p7' | 'p5';

interface BottomNavProps {
  activeTab: MainTabType;
  onChangeTab: (tab: MainTabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'p1', label: 'Maanta', icon: '🏠' },
    { id: 'p3', label: 'Kitaab', icon: '📖' },
    { id: 'p9', label: 'Akhris', icon: '📚' },
    { id: 'p7', label: 'Tasbiix & Note', icon: '📿' },
    { id: 'p5', label: 'Profile', icon: '👤' },
  ] as const;

  return (
    <nav
      className="fixed left-1/2 -translate-x-1/2 bottom-2.5 sm:bottom-4 w-[min(540px,calc(100%-16px))] flex items-center justify-between p-1.5 rounded-3xl bg-[#DCE8DF]/95 backdrop-blur-2xl border border-[#064E3B]/15 shadow-xl z-40 select-none transition-colors"
      role="tablist"
      aria-label="Navigation-ka Nidaamka Kormye"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              onChangeTab(tab.id as MainTabType);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-[#064E3B] text-white font-bold shadow-md'
                : 'text-[#0F172A]/70 hover:text-[#0F172A] hover:bg-[#D0DFD4]/50 opacity-80 hover:opacity-100'
            }`}
          >
            <span
              className={`text-base sm:text-lg leading-none transition-transform duration-200 ${
                isActive ? '-translate-y-0.5 scale-110' : ''
              }`}
            >
              {tab.icon}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-tight mt-1 truncate">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
