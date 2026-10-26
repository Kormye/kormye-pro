/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Bell, X } from 'lucide-react';
import { BackgroundCanvas } from './components/BackgroundCanvas.tsx';
import { HeaderHero } from './components/HeaderHero.tsx';
import { BottomNav, MainTabType } from './components/BottomNav.tsx';
import { RemindersModal } from './components/RemindersModal.tsx';
import { ProfileSwitcherModal } from './components/ProfileSwitcherModal.tsx';
import { TodayTab } from './components/tabs/TodayTab.tsx';
import { QuranTab } from './components/tabs/QuranTab.tsx';
import { ReadingTab } from './components/tabs/ReadingTab.tsx';
import { GoalsAndHabitsTab } from './components/tabs/GoalsAndHabitsTab.tsx';
import { MoreTab } from './components/tabs/MoreTab.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { WelcomeSplash } from './components/WelcomeSplash.tsx';
import { ScheduleWizardModal } from './components/ScheduleWizardModal.tsx';

import {
  AppConfig,
  DayRecord,
  GlobalState,
  CustomReminder,
  UserAccount,
  RoutineItem,
} from './types/index.ts';
import {
  P,
  getTodayString,
  addDays,
  getJson,
  setJson,
  normalizeConfig,
  normalizeGlobalState,
  getDayRecord,
  saveDayRecord,
  calculateDayProgress,
  calculateCurrentStreak,
  calculateBestStreak,
  calculateWeeklyStreakInfo,
  triggerPushNotification,
  isItemCompleted,
  applyThemeMode,
  formatTimeDisplay,
  listKeys,
  writeStorage,
  readStorage,
  getActiveProfileId,
  setActiveProfileId,
  getUserProfiles,
  saveUserProfiles,
  getProfilePrefix,
  DEFAULT_REMINDERS,
  DEFAULT_HABITS,
  DEFAULT_GOALS,
  DEFAULT_ATHKAAR,
} from './utils/storage.ts';

export default function App() {
  // Legacy migration on startup
  useEffect(() => {
    if (readStorage(P + 'mig')) return;
    const planIds = Array.from({ length: 22 }, (_, i) => 'p' + (i + 1));
    listKeys().forEach((k) => {
      let m = k.match(/^nidaam2:(\d{4}-\d{2}-\d{2})$/);
      if (m) {
        const oldCheckObj = getJson<Record<number, boolean>>(k, {});
        const mappedChecks: Record<string, boolean> = {};
        planIds.forEach((id, i) => {
          if (oldCheckObj[i]) mappedChecks[id] = true;
        });
        const targetKey = P + 'd:' + m[1];
        const existing = getJson<any>(targetKey, {});
        existing.c = Object.assign(mappedChecks, existing.c || {});
        setJson(targetKey, existing);
      } else if ((m = k.match(/^nidaam2x:(\d{4}-\d{2}-\d{2})$/))) {
        const oldExtra = getJson<any>(k, {});
        const targetKey = P + 'd:' + m[1];
        const existing = getJson<any>(targetKey, {});
        setJson(targetKey, Object.assign({}, oldExtra, existing));
      } else if (k === 'nidaam2g' && !readStorage(P + 'g')) {
        const oldG = readStorage(k);
        if (oldG) writeStorage(P + 'g', oldG);
      }
    });
    writeStorage(P + 'mig', '1');
  }, []);

  // ===== MULTI-USER PROFILES STATE =====
  const [profiles, setProfiles] = useState<UserAccount[]>(() => getUserProfiles());
  const [activeProfileId, setActiveProfileIdState] = useState<string>(() => getActiveProfileId());
  const [isProfilesOpen, setIsProfilesOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWelcomeSplashOpen, setIsWelcomeSplashOpen] = useState(() => {
    // Show welcome splash for new users or upon reset
    const seen = readStorage(P + 'seen_splash_' + getActiveProfileId());
    return !seen;
  });
  const [isScheduleWizardOpen, setIsScheduleWizardOpen] = useState(false);

  const activeProfile = useMemo(() => {
    return profiles.find((p) => p.id === activeProfileId) || profiles[0];
  }, [profiles, activeProfileId]);

  // Today's real local date
  const [todayDate, setTodayDate] = useState<string>(getTodayString());
  const [currentDate, setCurrentDate] = useState<string>(getTodayString());

  // Main active tab
  const [activeTab, setActiveTab] = useState<MainTabType>('p1');

  // App configuration state for active profile
  const [config, setConfig] = useState<AppConfig>(() => {
    const prefix = getProfilePrefix(getActiveProfileId());
    return normalizeConfig(getJson(prefix + 'cfg', null));
  });

  // Global persistent progress for active profile
  const [globalState, setGlobalState] = useState<GlobalState>(() => {
    const prefix = getProfilePrefix(getActiveProfileId());
    return normalizeGlobalState(getJson(prefix + 'g', {}));
  });

  // Current day record state for active profile
  const [dayRecord, setDayRecord] = useState<DayRecord>(() => {
    return getDayRecord(getTodayString(), getActiveProfileId());
  });

  // Apply theme mode on start or when changed
  useEffect(() => {
    applyThemeMode(config.theme);
  }, [config.theme]);

  // Save config on change for current profile
  useEffect(() => {
    const prefix = getProfilePrefix(activeProfileId);
    setJson(prefix + 'cfg', config);
  }, [config, activeProfileId]);

  // Save global state on change for current profile
  useEffect(() => {
    const prefix = getProfilePrefix(activeProfileId);
    setJson(prefix + 'g', globalState);
  }, [globalState, activeProfileId]);

  // Load day record whenever currentDate or activeProfileId changes
  useEffect(() => {
    setDayRecord(getDayRecord(currentDate, activeProfileId));
  }, [currentDate, activeProfileId]);

  // Save day record on change for current profile
  const handleUpdateDayRecord = (updater: (prev: DayRecord) => DayRecord) => {
    setDayRecord((prev) => {
      const next = updater(prev);
      saveDayRecord(currentDate, next, activeProfileId);
      return next;
    });
  };

  // Switch Active User Profile
  const handleSelectProfile = (profileId: string) => {
    setActiveProfileId(profileId);
    setActiveProfileIdState(profileId);

    const prefix = getProfilePrefix(profileId);
    setConfig(normalizeConfig(getJson(prefix + 'cfg', null)));
    setGlobalState(normalizeGlobalState(getJson(prefix + 'g', {})));
    setDayRecord(getDayRecord(currentDate, profileId));
  };

  // Create New Profile
  const handleCreateProfile = (newProfile: UserAccount) => {
    const updated = [...profiles, newProfile];
    setProfiles(updated);
    saveUserProfiles(updated);
    handleSelectProfile(newProfile.id);
  };

  // Delete Profile
  const handleDeleteProfile = (profileId: string) => {
    if (profileId === 'p_default') return;
    const updated = profiles.filter((p) => p.id !== profileId);
    setProfiles(updated);
    saveUserProfiles(updated);
    if (activeProfileId === profileId) {
      handleSelectProfile('p_default');
    }
  };

  // Register & Profile update handler (triggers Page 2 animated welcome screen)
  const handleRegisterSuccess = (updatedAccount: UserAccount) => {
    setIsAuthModalOpen(false);
    const existingIdx = profiles.findIndex((p) => p.id === updatedAccount.id);
    let updated: UserAccount[];
    if (existingIdx >= 0) {
      updated = [...profiles];
      updated[existingIdx] = updatedAccount;
    } else {
      updated = [...profiles, updatedAccount];
      // Brand new user: clear previous day record and configure fresh isolated data
      const prefix = getProfilePrefix(updatedAccount.id);
      const cleanConfig: AppConfig = {
        v: 6,
        plan: [],
        h12: true,
        thr: 80,
        theme: 'auto',
        reminders: DEFAULT_REMINDERS,
        weeklyTargetDays: 5,
      };
      const cleanGlobal: GlobalState = {
        profile: updatedAccount,
        profiles: updated,
        activeProfileId: updatedAccount.id,
        bk: [],
        habits: [],
        goals: [],
        athkaar: DEFAULT_ATHKAAR,
        journals: {},
        q: 1,
        c: {},
        mg: [],
        wr: {},
        ln: {},
        posts: [],
      };
      setJson(prefix + 'cfg', cleanConfig);
      setJson(prefix + 'g', cleanGlobal);
      setConfig(cleanConfig);
      setGlobalState(cleanGlobal);
      const cleanDay: DayRecord = {
        c: {},
        ses: [],
        gym: [],
        tx: [],
        dd: [],
        tz: {},
        qp: 0,
        lr: [],
        rd: {},
      };
      saveDayRecord(currentDate, cleanDay, updatedAccount.id);
      setDayRecord(cleanDay);
    }
    setProfiles(updated);
    saveUserProfiles(updated);
    setActiveProfileId(updatedAccount.id);
    setActiveProfileIdState(updatedAccount.id);

    // Smoothly transition to Page 2 Animated Welcome Screen!
    setIsWelcomeSplashOpen(true);
  };

  // Apply new routine plan (e.g., from Schedule Wizard or Archetype setup)
  const handleApplyNewPlan = (newPlan: RoutineItem[]) => {
    setConfig((prev) => {
      const next = { ...prev, plan: newPlan };
      const prefix = getProfilePrefix(activeProfileId);
      setJson(prefix + 'cfg', next);
      return next;
    });
  };

  // Date Navigation
  const handlePrevDay = () => {
    setCurrentDate((prev) => addDays(prev, -1));
  };

  const handleNextDay = () => {
    if (currentDate < todayDate) {
      setCurrentDate((prev) => addDays(prev, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(todayDate);
  };

  const handleSelectDay = (targetDate: string) => {
    if (targetDate <= todayDate) {
      setCurrentDate(targetDate);
    }
  };

  // Routine item toggle
  const handleToggleItem = (itemId: string, checked: boolean) => {
    handleUpdateDayRecord((prev) => {
      const updatedChecks = { ...prev.c };
      if (checked) {
        updatedChecks[itemId] = true;
      } else {
        delete updatedChecks[itemId];
      }
      return { ...prev, c: updatedChecks };
    });
  };

  // Modal state for Reminders
  const [isRemindersOpen, setIsRemindersOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<{ title: string; prompt: string } | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => setActiveToast(null), 8000);
    return () => clearTimeout(timer);
  }, [activeToast]);

  // Handle save reminders
  const handleSaveReminders = (updatedReminders: CustomReminder[]) => {
    setConfig((prev) => ({ ...prev, reminders: updatedReminders }));
  };

  // Interval check for date tick & notifications
  useEffect(() => {
    let lastCheckedMinute = '';
    const interval = setInterval(() => {
      const realToday = getTodayString();
      if (realToday !== todayDate) {
        setTodayDate(realToday);
        if (currentDate === todayDate) {
          setCurrentDate(realToday);
        }
      }

      const now = new Date();
      const currentMinuteStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;

      if (currentMinuteStr !== lastCheckedMinute) {
        lastCheckedMinute = currentMinuteStr;

        // Check custom reminders
        const triggeredReminders = (config.reminders || []).filter(
          (r) => r.enabled && r.time === currentMinuteStr
        );

        triggeredReminders.forEach((rem) => {
          triggerPushNotification(`🔔 ${rem.title}`, rem.prompt, rem.soundEnabled ?? true);
          setActiveToast({ title: rem.title, prompt: rem.prompt });
        });

        // Check routine tasks in plan
        const matchingTask = config.plan.find((p) => p.t === currentMinuteStr);
        if (matchingTask && triggeredReminders.length === 0) {
          triggerPushNotification(
            `${formatTimeDisplay(matchingTask.t, config.h12)} - ${matchingTask.title}`,
            matchingTask.note || 'Waa wakhtigii hawshan!',
            true
          );
          setActiveToast({
            title: matchingTask.title,
            prompt: matchingTask.note || 'Waa wakhtigii aad bilaabi lahayd hawshan jadwalka ku jirta.',
          });
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [todayDate, currentDate, config.plan, config.h12, config.reminders]);

  // Derived progress and streak values
  const totalCount = config.plan.length;
  const completedCount = useMemo(() => {
    return config.plan.filter((p) => isItemCompleted(p, dayRecord)).length;
  }, [config.plan, dayRecord]);

  const completionPercent = useMemo(() => {
    if (totalCount === 0) return 0;
    return Math.round((completedCount / totalCount) * 100);
  }, [completedCount, totalCount]);

  // Daily Streak
  const streakCount = useMemo(() => {
    return calculateCurrentStreak(todayDate, config.plan, config.thr, activeProfileId);
  }, [todayDate, config.plan, config.thr, dayRecord, activeProfileId]);

  const bestDailyStreak = useMemo(() => {
    return calculateBestStreak(config.plan, config.thr, activeProfileId);
  }, [config.plan, config.thr, dayRecord, activeProfileId]);

  // Weekly Streak
  const weeklyStreakInfo = useMemo(() => {
    return calculateWeeklyStreakInfo(
      todayDate,
      config.plan,
      config.thr,
      config.weeklyTargetDays,
      activeProfileId
    );
  }, [todayDate, config.plan, config.thr, config.weeklyTargetDays, dayRecord, activeProfileId]);

  return (
    <div className="relative min-h-screen text-[#0F172A] bg-[#E5F0E8] flex flex-col justify-between selection:bg-[#10B981]/30 selection:text-[#064E3B]">
      {/* Background celestial visualizer */}
      <BackgroundCanvas />

      {/* In-app Push Notification Banner Toast */}
      {activeToast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[min(540px,calc(100%-20px))] animate-in slide-in-from-top-4 duration-300">
          <div className="bg-[#DCE8DF] border border-[#064E3B]/25 rounded-2xl p-3.5 shadow-xl flex items-start gap-3 backdrop-blur-xl text-[#0F172A]">
            <div className="w-9 h-9 rounded-xl bg-[#064E3B] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <Bell className="w-5 h-5 text-[#10B981] animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-black text-sm text-[#0F172A] truncate">
                  🔔 {activeToast.title}
                </h4>
                <button
                  onClick={() => setActiveToast(null)}
                  className="p-1 rounded-lg text-[#475569] hover:text-[#0F172A] hover:bg-[#D0DFD4] transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[#475569] mt-0.5 leading-relaxed font-medium">
                {activeToast.prompt}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-[580px] mx-auto px-3.5 pt-3.5 pb-28 sm:pb-32">
        {/* Top Header Hero with Brand Logo & Multi-User Profile */}
        <HeaderHero
          currentDate={currentDate}
          todayDate={todayDate}
          activeProfile={activeProfile}
          onPrevDay={handlePrevDay}
          onNextDay={handleNextDay}
          onToday={handleToday}
          completionPercent={completionPercent}
          completedCount={completedCount}
          totalCount={totalCount}
          streakCount={streakCount}
          streakThreshold={config.thr}
          weeklyStreakCount={weeklyStreakInfo.currentWeeklyStreak}
          weeklyDaysAchieved={weeklyStreakInfo.currentWeekDaysAchieved}
          weeklyTargetDays={config.weeklyTargetDays}
          onOpenReminders={() => setIsRemindersOpen(true)}
          onOpenProfiles={() => setIsProfilesOpen(true)}
          onOpenSplash={() => setIsWelcomeSplashOpen(true)}
          onOpenRegister={() => setIsAuthModalOpen(true)}
        />

        {/* Tab Panes */}
        {activeTab === 'p1' && (
          <TodayTab
            currentDate={currentDate}
            todayDate={todayDate}
            plan={config.plan}
            dayRecord={dayRecord}
            is12h={config.h12}
            streakCount={streakCount}
            streakThreshold={config.thr}
            bestDailyStreak={bestDailyStreak}
            weeklyStreakCount={weeklyStreakInfo.currentWeeklyStreak}
            bestWeeklyStreak={weeklyStreakInfo.bestWeeklyStreak}
            weeklyDaysAchieved={weeklyStreakInfo.currentWeekDaysAchieved}
            weeklyTargetDays={config.weeklyTargetDays}
            isCurrentWeekAchieved={weeklyStreakInfo.isCurrentWeekAchieved}
            remindersCount={config.reminders.filter((r) => r.enabled).length}
            profileId={activeProfileId}
            onOpenScheduleWizard={() => setIsScheduleWizardOpen(true)}
            onOpenReminders={() => setIsRemindersOpen(true)}
            onToggleItem={handleToggleItem}
            onUpdateDayRecord={handleUpdateDayRecord}
            onSelectDay={handleSelectDay}
            onNavigateToTab={(tabId) => {
              if (['p1', 'p3', 'p9', 'p7', 'p5'].includes(tabId)) {
                setActiveTab(tabId as MainTabType);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        )}

        {activeTab === 'p3' && (
          <QuranTab
            dayRecord={dayRecord}
            globalState={globalState}
            onUpdateDayRecord={handleUpdateDayRecord}
            onUpdateGlobalState={setGlobalState}
            onNavigateToTab={(tabId) => {
              if (['p1', 'p3', 'p9', 'p7', 'p5'].includes(tabId)) {
                setActiveTab(tabId as MainTabType);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        )}

        {activeTab === 'p9' && (
          <ReadingTab
            currentDate={currentDate}
            dayRecord={dayRecord}
            globalState={globalState}
            profileId={activeProfileId}
            onUpdateDayRecord={handleUpdateDayRecord}
            onUpdateGlobalState={setGlobalState}
          />
        )}

        {activeTab === 'p7' && (
          <GoalsAndHabitsTab
            currentDate={currentDate}
            dayRecord={dayRecord}
            globalState={globalState}
            onUpdateDayRecord={handleUpdateDayRecord}
            onUpdateGlobalState={setGlobalState}
          />
        )}

        {activeTab === 'p5' && (
          <MoreTab
            currentDate={currentDate}
            todayDate={todayDate}
            dayRecord={dayRecord}
            globalState={globalState}
            config={config}
            profileId={activeProfileId}
            onUpdateDayRecord={handleUpdateDayRecord}
            onUpdateGlobalState={setGlobalState}
            onUpdateConfig={setConfig}
            onSelectDay={handleSelectDay}
            onOpenReminders={() => setIsRemindersOpen(true)}
            onOpenProfiles={() => setIsProfilesOpen(true)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onNavigateTab={setActiveTab}
          />
        )}
      </main>

      {/* Floating Bottom Navigation */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Multi-User Profile Switcher Modal */}
      <ProfileSwitcherModal
        isOpen={isProfilesOpen}
        onClose={() => setIsProfilesOpen(false)}
        profiles={profiles}
        activeProfileId={activeProfileId}
        onSelectProfile={handleSelectProfile}
        onCreateProfile={handleCreateProfile}
        onDeleteProfile={handleDeleteProfile}
        onOpenRegister={() => setIsAuthModalOpen(true)}
      />

      {/* User Registration & Profile Editor Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
        activeProfile={activeProfile}
      />

      {/* Page 2 Animated Welcome Screen with KORMYE Branding & Logo */}
      <WelcomeSplash
        isOpen={isWelcomeSplashOpen}
        user={activeProfile}
        onEnter={() => {
          writeStorage(P + 'seen_splash_' + activeProfileId, '1');
          setIsWelcomeSplashOpen(false);
        }}
        onSavePlan={handleApplyNewPlan}
      />

      {/* Schedule Wizard Modal to Re-generate or Change Routine Anytime */}
      <ScheduleWizardModal
        isOpen={isScheduleWizardOpen}
        onClose={() => setIsScheduleWizardOpen(false)}
        onApplySchedule={handleApplyNewPlan}
        currentPlanLength={config.plan.length}
      />

      {/* Customizable Push Notifications Reminders Modal */}
      <RemindersModal
        isOpen={isRemindersOpen}
        onClose={() => setIsRemindersOpen(false)}
        reminders={config.reminders}
        plan={config.plan}
        is12h={config.h12}
        onSaveReminders={handleSaveReminders}
      />
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Clock, Heart, Award, Sparkles, User, 
  ArrowRight, Check, Target, Compass, Upload, X 
} from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Profile State
  const [userName, setUserName] = useState('Canab Ahmed');
  const [userRole, setUserRole] = useState('Ganaacsade / Hal-abuur');
  const [userGoal, setUserGoal] = useState('Quraanka & Xuska Alle');
  const [userQuote, setUserQuote] = useState('Noloshawanaagsan waa joogteyn iyo qorshe suubban.');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Form State
  const [tempName, setTempName] = useState(userName);
  const [tempRole, setTempRole] = useState(userRole);
  const [tempGoal, setTempGoal] = useState(userGoal);
  const [tempQuote, setTempQuote] = useState(userQuote);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(tempName || 'Hoggaamiye');
    setUserRole(tempRole);
    setUserGoal(tempGoal);
    setUserQuote(tempQuote);
    setShowOnboarding(false);
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-[#041E16] flex flex-col items-[#center] justify-center z-50 text-white select-none">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-[#10B981] opacity-20 blur-xl animate-pulse"></div>
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#064E3B] to-[#10B981] flex items-center justify-center shadow-2xl border border-[#10B981]/30 transform hover:scale-105 transition-all duration-500">
            <svg className="w-14 h-14 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#10B981" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5V13.5M9.5 11H14.5" stroke="#041E16" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-wider text-[#ECFDF5]">KORMYE PRO</h1>
        <p className="text-xs text-[#A7F3D0] mt-2 tracking-widest uppercase font-medium">Nidaamka Nolosha & Horumarka</p>

        <div className="mt-8 w-48 h-1.5 bg-[#064E3B] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full animate-[progress_2.2s_ease-in-out]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-[#064E3B] flex flex-col items-center justify-center p-4 relative font-sans">
      
      {/* Background Subtle Glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#047857]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Logo */}
      <div className="flex flex-col items-center mb-6 text-center z-10">
        <div className="w-14 h-14 rounded-xl bg-[#064E3B] flex items-center justify-center shadow-lg border border-[#10B981]/30 mb-3">
          <svg className="w-8 h-8 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#10B981" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5V13.5M9.5 11H14.5" stroke="#064E3B" strokeWidth="2" />
          </svg>
        </div>
        <h1 className="text-2xl font-black text-[#064E3B] tracking-wide">KORMYE</h1>
        <p className="text-xs font-semibold text-[#047857] tracking-wider uppercase mt-0.5">NIDAAMKA NOLOSHA, QURAANKA & HORUMARKA</p>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-[#D1FAE5] z-10 flex flex-col items-center">
        
        {/* User Avatar & Greeting */}
        <div className="relative mb-3 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#10B981] via-[#34D399] to-[#047857] shadow-md flex items-center justify-center">
            {avatarUrl ? (
              <img src={avatarUrl} alt="User Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="w-full h-full rounded-full bg-[#064E3B] flex items-center justify-center text-white font-bold text-2xl border-2 border-white">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <button 
            onClick={() => setShowOnboarding(true)}
            className="mt-3 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#D1FAE5] transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Ku soo dhowow Kormye</span>
          </button>
        </div>

        {/* Dynamic Quote Box */}
        <div className="w-full bg-[#F0FDF4] border border-[#A7F3D0] rounded-2xl p-4 my-3 text-center shadow-inner">
          <p className="text-sm font-bold text-[#064E3B] mb-1">«وَقُلْ رَبِّ زِدْنِي عِلْمًا»</p>
          <p className="text-xs text-[#047857] italic font-medium">"{userQuote}"</p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3 w-full my-2">
          <div className="bg-white p-3 rounded-2xl border border-[#E6F4EA] shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-[#10B981]" />
              <h4 className="text-xs font-bold text-[#064E3B]">Quraan & Qisooyin</h4>
            </div>
            <p className="text-[10px] text-[#047857]">Akhris & xifdi</p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#E6F4EA] shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-[#10B981]" />
              <h4 className="text-xs font-bold text-[#064E3B]">Time Focus</h4>
            </div>
            <p className="text-[10px] text-[#047857]">Diirad & Pomodoro</p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#E6F4EA] shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-[#10B981]" />
              <h4 className="text-xs font-bold text-[#064E3B]">Tasbiix & Duco</h4>
            </div>
            <p className="text-[10px] text-[#047857]">Athkaar subax & galab</p>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-[#E6F4EA] shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-[#10B981]" />
              <h4 className="text-xs font-bold text-[#064E3B]">Koorsooyin Xor ah</h4>
            </div>
            <p className="text-[10px] text-[#047857]">Dhis xirfaddaada</p>
          </div>
        </div>

        {/* Enter Dashboard Action Button */}
        <button 
          onClick={() => setShowOnboarding(true)}
          className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#047857] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-[0.99] transition-all"
        >
          <span>🚀 Gal Boggaaga Maanta</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Onboarding & Profile Customization Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-[#041E16]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#D1FAE5] relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setShowOnboarding(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#F0FDF4] text-[#047857] hover:bg-[#E6F4EA]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#064E3B] flex items-center justify-center mx-auto mb-2 shadow-md">
                <svg className="w-6 h-6 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#10B981" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-[#064E3B]">Is-diiwaan-geli & Dhis Profile-kaaga</h3>
              <p className="text-xs text-[#047857] mt-0.5">Dhis nidaam kuu gaar ah oo kuu fududaynaya qorshahaaga.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Photo Upload */}
              <div className="flex flex-col items-center">
                <label className="text-xs font-bold text-[#064E3B] mb-1">Sawirka Profile-kaaga</label>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#F0FDF4] border-2 border-[#10B981] flex items-center justify-center overflow-hidden shadow-sm">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-[#047857]" />
                    )}
                  </div>
                  <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-[#064E3B] text-white p-1 rounded-full cursor-pointer hover:bg-[#047857]">
                    <Upload className="w-3 h-3" />
                  </label>
                  <input id="photo-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
              </div>

              {/* Input Name */}
              <div>
                <label className="block text-xs font-bold text-[#064E3B] mb-1">Magacaaga Buuxa *</label>
                <input 
                  type="text"
                  required
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Tus: Canab Ahmed"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F0FDF4] border border-[#A7F3D0] text-xs text-[#064E3B] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>

              {/* Roles */}
              <div>
                <label className="block text-xs font-bold text-[#064E3B] mb-1">Doorkaaga Nolosha</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Ganaacsade / Hal-abuur', 'Arday / Barte', 'Xirfadle / Shaqaale', 'Qoys & Shakhsi'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setTempRole(role)}
                      className={`p-2 rounded-xl border text-left text-[11px] font-semibold transition-all ${
                        tempRole === role 
                          ? 'bg-[#064E3B] text-white border-[#064E3B]' 
                          : 'bg-[#F0FDF4] text-[#047857] border-[#A7F3D0] hover:bg-[#E6F4EA]'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div>
                <label className="block text-xs font-bold text-[#064E3B] mb-1">Yoolkaaga Ugu Meyn</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Quraanka & Xuska Alle', 'Dhisidda Ganacsi', 'Berasahde Xirfado', 'Ceedmaadka & Jimciga'].map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setTempGoal(goal)}
                      className={`p-2 rounded-xl border text-left text-[11px] font-semibold transition-all ${
                        tempGoal === goal 
                          ? 'bg-[#10B981] text-white border-[#10B981]' 
                          : 'bg-[#F0FDF4] text-[#047857] border-[#A7F3D0] hover:bg-[#E6F4EA]'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div>
                <label className="block text-xs font-bold text-[#064E3B] mb-1">Hal-ku-dheggaaga</label>
                <input 
                  type="text"
                  value={tempQuote}
                  onChange={(e) => setTempQuote(e.target.value)}
                  placeholder="Noloshawanaagsan waa joogteyn..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F0FDF4] border border-[#A7F3D0] text-xs text-[#064E3B] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#10B981] text-white font-bold text-xs shadow-md hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Diiwaangeli & Fur Boggaaga</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
