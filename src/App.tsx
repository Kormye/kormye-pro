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
