import React from 'react';
import { Check, Zap, Moon, Flame, Trophy, Bell, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RoutineItem, DayRecord } from '../../types/index.ts';
import { CATS, NAMES } from '../../data/datasets.ts';
import {
  formatTimeDisplay,
  isItemCompleted,
  autoCheckRoutine,
  getWeekStart,
  addDays,
  calculateDayProgress,
  getDayRecord,
} from '../../utils/storage.ts';
import { FocusTimerCard } from '../FocusTimerCard.tsx';

interface TodayTabProps {
  currentDate: string;
  todayDate: string;
  plan: RoutineItem[];
  dayRecord: DayRecord;
  is12h: boolean;
  streakCount: number;
  streakThreshold: number;
  bestDailyStreak: number;
  weeklyStreakCount: number;
  bestWeeklyStreak: number;
  weeklyDaysAchieved: number;
  weeklyTargetDays: number;
  isCurrentWeekAchieved: boolean;
  remindersCount: number;
  profileId?: string;
  onOpenScheduleWizard?: () => void;
  onOpenReminders: () => void;
  onToggleItem: (id: string, checked: boolean) => void;
  onUpdateDayRecord: (updater: (prev: DayRecord) => DayRecord) => void;
  onSelectDay: (date: string) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const TodayTab: React.FC<TodayTabProps> = ({
  currentDate,
  todayDate,
  plan,
  dayRecord,
  is12h,
  streakCount,
  streakThreshold,
  bestDailyStreak,
  weeklyStreakCount,
  bestWeeklyStreak,
  weeklyDaysAchieved,
  weeklyTargetDays,
  isCurrentWeekAchieved,
  remindersCount,
  profileId,
  onOpenScheduleWizard,
  onOpenReminders,
  onToggleItem,
  onUpdateDayRecord,
  onSelectDay,
  onNavigateToTab,
}) => {
  // Check yesterday's note
  const yesterdayDate = addDays(currentDate, -1);
  const yesterdayRecord = getDayRecord(yesterdayDate, profileId);
  const yesterdayNote = yesterdayRecord.nx;

  // Week days calculation
  const weekStart = getWeekStart(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const dStr = addDays(weekStart, i);
    const progress = Math.round(calculateDayProgress(dStr, plan, profileId) * 100);
    return {
      date: dStr,
      label: NAMES[i],
      progress,
      isToday: dStr === todayDate,
      isSelected: dStr === currentDate,
      isAchieved: progress >= streakThreshold,
    };
  });

  const handleCheckboxClick = (p: RoutineItem, currentStatus: boolean, isAuto: boolean) => {
    if (isAuto && !dayRecord.c[p.id]) {
      return;
    }
    const newStatus = !currentStatus;
    onToggleItem(p.id, newStatus);

    if (newStatus) {
      const willBeDone = plan.filter((item) =>
        item.id === p.id ? true : isItemCompleted(item, dayRecord)
      ).length;
      if (willBeDone === plan.length) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#064E3B', '#10B981', '#F59E0B', '#DCE8DF'],
        });
      }
    }
  };

  const handleAutoTriggerClick = (autoType?: string) => {
    if (!autoType) return;
    if (autoType === 'quran') onNavigateToTab('p3');
    else if (autoType === 'gym') onNavigateToTab('p7');
    else if (autoType === 'acc' || autoType === 'ai') onNavigateToTab('p5');
    else if (autoType === 'learn' || autoType === 'read') onNavigateToTab('p9');
    else onNavigateToTab('p5');
  };

  // Today progress
  const doneCount = plan.filter((p) => isItemCompleted(p, dayRecord)).length;
  const todayProgressPercent = plan.length > 0 ? Math.round((doneCount / plan.length) * 100) : 0;
  const isTodayAchieved = todayProgressPercent >= streakThreshold;
  const tasksNeededForThreshold = Math.max(0, Math.ceil((plan.length * streakThreshold) / 100) - doneCount);

  return (
    <div className="space-y-3.5">
      {/* STREAK & MOTIVATION DASHBOARD CARD (Soft Green #DCE8DF - NO PURE WHITE) */}
      <div className="glass-card rounded-3xl p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <h3 className="font-serif font-black text-sm sm:text-base text-[#0F172A] tracking-tight">
              Xariiqyada & Dhiirrigelinta
            </h3>
          </div>
          <button
            onClick={onOpenReminders}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#064E3B] bg-[#10B981]/15 hover:bg-[#10B981]/25 px-2.5 py-1 rounded-full border border-[#10B981]/30 transition active:scale-95"
          >
            <Bell className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{remindersCount} Xusuusin</span>
          </button>
        </div>

        {/* Dual Streak Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Daily Streak Card */}
          <div className="bg-[#D0DFD4]/60 border border-[#064E3B]/10 rounded-2xl p-3 space-y-1 shadow-sm">
            <div className="flex items-center justify-between text-xs text-[#0F172A]">
              <span className="flex items-center gap-1 font-bold">
                <Flame className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                <span>Xariiq Maalin</span>
              </span>
              <span className="text-[10px] text-[#475569]">Ugu fiican: {bestDailyStreak}d</span>
            </div>
            <div className="font-serif text-2xl font-black text-[#0F172A] tracking-tight">
              {streakCount} <span className="text-xs font-sans font-medium text-[#475569]">maalmood</span>
            </div>
            <div className="text-[11px] text-[#475569] leading-tight font-medium">
              {isTodayAchieved ? (
                <span className="text-[#10B981] font-bold">✓ Hadafkii maanta ({streakThreshold}%+) waad gaartay!</span>
              ) : (
                <span>
                  {tasksNeededForThreshold} hawlood u dhiman hadafka {streakThreshold}%
                </span>
              )}
            </div>
          </div>

          {/* Weekly Streak Card */}
          <div className="bg-[#D0DFD4]/60 border border-[#064E3B]/10 rounded-2xl p-3 space-y-1 shadow-sm">
            <div className="flex items-center justify-between text-xs text-[#064E3B]">
              <span className="flex items-center gap-1 font-bold">
                <Trophy className="w-4 h-4 text-[#10B981]" />
                <span>Xariiq Usbuuc</span>
              </span>
              <span className="text-[10px] text-[#475569]">Ugu fiican: {bestWeeklyStreak}w</span>
            </div>
            <div className="font-serif text-2xl font-black text-[#0F172A] tracking-tight">
              {weeklyStreakCount} <span className="text-xs font-sans font-medium text-[#475569]">usbuuc</span>
            </div>
            <div className="text-[11px] text-[#475569] leading-tight font-medium">
              {isCurrentWeekAchieved ? (
                <span className="text-[#10B981] font-bold">✓ Hadafkii usbuuca waad buuxisay ({weeklyDaysAchieved}/{weeklyTargetDays}d)!</span>
              ) : (
                <span>
                  Usbuucan: <b className="text-[#0F172A]">{weeklyDaysAchieved}</b> / {weeklyTargetDays}d (80%+)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Motivation Banner */}
        <div className="bg-[#10B981]/15 border border-[#10B981]/30 rounded-2xl p-2.5 text-xs text-[#064E3B] flex items-center justify-between gap-2">
          <p className="leading-relaxed font-semibold">
            {streakCount >= 7
              ? '🔥 Mashaa Allaah! Hal usbuuc oo xiriir ah ayaad haysaa. Sii wad ilaa heerka ugu sarreeya!'
              : isTodayAchieved
              ? '🌟 Guul weyn! Maanta waad dhammaystirtay xariiqdaada 80%+.'
              : '🌱 Joogtayntu waa sirta guusha! Maalin kasta wax yar qabo si xariiqdu u koraan.'}
          </p>
        </div>
      </div>

      {/* Yesterday's note if available */}
      {yesterdayNote && (
        <div className="glass-card rounded-2xl p-4 border border-[#10B981]/25 bg-[#DCE8DF]">
          <div className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5 mb-1">
            <Moon className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Xalay waxaad qortay:</span>
          </div>
          <p className="text-sm font-serif italic text-[#0F172A]">{yesterdayNote}</p>
        </div>
      )}

      {/* Advanced Time Focus / Pomodoro Timer (Easily Accessible) */}
      <FocusTimerCard
        dayRecord={dayRecord}
        onUpdateDayRecord={onUpdateDayRecord}
      />

      {/* Routine Section Header with Schedule Creator & Counter */}
      <div className="flex items-center justify-between px-1 pt-1">
        <div>
          <h3 className="font-serif font-black text-sm sm:text-base text-[#0F172A] tracking-tight">
            Hawlaha Maanta ({doneCount}/{plan.length})
          </h3>
          <p className="text-[11px] text-[#475569] font-medium">
            {doneCount === plan.length && plan.length > 0
              ? '🎉 Dhammaan hawlihii maanta waad dhammaystirtay!'
              : `${plan.length - doneCount} hawlood ayaa kuu dhiman`}
          </p>
        </div>

        {onOpenScheduleWizard && (
          <button
            type="button"
            onClick={onOpenScheduleWizard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10B981]/20 hover:bg-[#10B981]/30 text-[#064E3B] text-xs font-bold border border-[#10B981]/30 transition active:scale-95 shadow-xs"
            title="Dhis ama beddel jadwalkaaga maalinlaha ah"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Dhis Jadwal ✨</span>
          </button>
        )}
      </div>

      {/* Empty State when user has not added routine tasks */}
      {plan.length === 0 && (
        <div className="glass-card rounded-3xl p-6 text-center space-y-3.5 border border-[#064E3B]/15 bg-[#DCE8DF]">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#10B981]/20 text-[#064E3B] flex items-center justify-center text-2xl shadow-xs">
            📝
          </div>
          <div className="space-y-1">
            <h4 className="font-serif font-black text-base text-[#0F172A]">Jadwalkaagu waa madhan yahay</h4>
            <p className="text-xs text-[#475569] max-w-sm mx-auto leading-relaxed font-medium">
              Kuma jiraan hawlo hore u qornaa. Adiga ayaa xor u ah inaad maanta eber ka dhisato jadwalkaaga gaarka ah.
            </p>
          </div>
          {onOpenScheduleWizard && (
            <button
              type="button"
              onClick={onOpenScheduleWizard}
              className="px-4 py-2.5 rounded-2xl bg-[#064E3B] hover:bg-[#054030] text-white text-xs font-bold transition inline-flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span>+ Dhis Jadwalkaaga Gaarka ah</span>
            </button>
          )}
        </div>
      )}

      {/* Routine list (Cards: Soft Green #DCE8DF - NO PURE WHITE) */}
      <div className="space-y-2.5">
        {plan.map((p) => {
          const autoSatisfied = autoCheckRoutine(p, dayRecord);
          const done = !!dayRecord.c[p.id] || autoSatisfied;
          const category = CATS[p.cat] || CATS.nas;

          return (
            <div
              key={p.id}
              onClick={() => handleCheckboxClick(p, done, autoSatisfied)}
              className={`glass-card relative overflow-hidden rounded-2xl p-3.5 sm:p-4 flex items-start gap-3.5 cursor-pointer transition-all duration-200 select-none active:scale-[0.99] ${
                done ? 'opacity-70' : ''
              }`}
            >
              {/* Category accent bar in Forest Green / Emerald Green */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5"
                style={{ backgroundColor: done ? '#10B981' : (category.color || '#064E3B') }}
              />

              {/* Custom Checkbox */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckboxClick(p, done, autoSatisfied);
                }}
                className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all ${
                  done
                    ? 'bg-[#10B981] border-[#10B981] text-white shadow-sm'
                    : 'border-[#064E3B]/30 hover:border-[#10B981] bg-transparent'
                }`}
                aria-label={`Calaamadee ${p.title}`}
              >
                {done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>

              {/* Emoji icon */}
              <span className="text-2xl flex-shrink-0 leading-none select-none">{p.em}</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-xs font-bold font-mono tracking-wider text-[#064E3B]"
                  >
                    {formatTimeDisplay(p.t, is12h)}
                  </span>

                  {p.a && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAutoTriggerClick(p.a);
                      }}
                      className="inline-flex items-center gap-0.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B] hover:bg-[#10B981]/30 transition"
                    >
                      <Zap className="w-2.5 h-2.5 text-[#10B981]" />
                      <span>{autoSatisfied ? 'otomaatig ✓' : 'otomaatig'}</span>
                    </button>
                  )}
                </div>

                <h3
                  className={`text-sm sm:text-base font-bold leading-tight mt-0.5 text-[#0F172A] ${
                    done ? 'line-through text-[#475569]' : ''
                  }`}
                >
                  {p.title}
                </h3>

                {p.note && (
                  <p className="text-xs text-[#475569] mt-0.5 line-clamp-2 leading-relaxed font-medium">
                    {p.note}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Usbuucan (Weekly Progress Bar) */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif font-bold text-sm text-[#0F172A]">Horumarka Usbuucan</h3>
          <span className="text-xs text-[#475569] font-medium">Taabo maalin si aad u aragto</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {weekDays.map((wd) => (
            <button
              key={wd.date}
              onClick={() => onSelectDay(wd.date)}
              className={`flex flex-col items-center p-2 rounded-xl transition ${
                wd.isSelected
                  ? 'ring-2 ring-[#064E3B] bg-[#064E3B]/15'
                  : 'hover:bg-[#D0DFD4]/50'
              }`}
            >
              {/* Vertical Progress Bar */}
              <div className="w-3.5 sm:w-4 h-12 bg-[#064E3B]/10 rounded-full overflow-hidden flex flex-col justify-end p-0.5 mb-1.5">
                <div
                  className="w-full rounded-full bg-gradient-to-t from-[#064E3B] via-[#047857] to-[#10B981] transition-all duration-700"
                  style={{ height: `${wd.progress}%` }}
                />
              </div>
              <span
                className={`text-[11px] font-semibold ${
                  wd.isToday ? 'text-[#064E3B] font-bold underline' : 'text-[#475569]'
                }`}
              >
                {wd.label}
              </span>
              <span className="text-[9px] text-[#475569] font-mono">{wd.progress}%</span>
            </button>
          ))}
        </div>
      </div>

      {/* Berri (Tomorrow's Top Tasks) */}
      <div className="glass-card rounded-2xl p-4 border border-[#10B981]/25">
        <div className="flex items-center gap-2 mb-2 font-serif font-bold text-sm text-[#064E3B]">
          <Moon className="w-4 h-4 text-[#10B981]" />
          <span>🌙 Berri: U Diyaargarow</span>
        </div>
        <p className="text-xs text-[#475569] mb-2.5 font-medium">
          Qor hawsha ugu muhiimsan ee aad berri ku bilaabi doonto:
        </p>
        <input
          type="text"
          value={dayRecord.nx || ''}
          onChange={(e) => {
            const val = e.target.value;
            onUpdateDayRecord((prev) => ({ ...prev, nx: val }));
          }}
          placeholder="Berri waxaan ugu horreyn..."
          className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3.5 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder:text-[#64748B]"
        />
      </div>
    </div>
  );
};
