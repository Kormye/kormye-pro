import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Flame, Trophy, Bell } from 'lucide-react';
import { formatSomaliDate } from '../utils/storage.ts';
import { KormyeLogo } from './KormyeLogo.tsx';
import { UserAccount } from '../types/index.ts';

interface HeaderHeroProps {
  currentDate: string;
  todayDate: string;
  activeProfile: UserAccount;
  onPrevDay: () => void;
  onNextDay: () => void;
  onToday: () => void;
  completionPercent: number;
  completedCount: number;
  totalCount: number;
  streakCount: number;
  streakThreshold: number;
  weeklyStreakCount: number;
  weeklyDaysAchieved: number;
  weeklyTargetDays: number;
  onOpenReminders: () => void;
  onOpenProfiles: () => void;
  onOpenSplash?: () => void;
  onOpenRegister?: () => void;
}

export const HeaderHero: React.FC<HeaderHeroProps> = ({
  currentDate,
  todayDate,
  activeProfile,
  onPrevDay,
  onNextDay,
  onToday,
  completionPercent,
  completedCount,
  totalCount,
  streakCount,
  streakThreshold,
  weeklyStreakCount,
  weeklyDaysAchieved,
  weeklyTargetDays,
  onOpenReminders,
  onOpenProfiles,
  onOpenSplash,
  onOpenRegister,
}) => {
  const { title: dateTitle, subtitle: dateSubtitle } = formatSomaliDate(currentDate);
  const isFutureOrToday = currentDate >= todayDate;

  // Circular progress calculation
  const circumference = 276.46;
  const strokeOffset = circumference * (1 - completionPercent / 100);

  const getEncouragementMessage = (pc: number) => {
    if (pc >= 100) return 'Mashaa Allaah! Maalinta waad guulaysatay 🎉';
    if (pc >= 80) return 'Aad ayaad u fiican tahay! Hadafkii 80%+ waad gaartay 💪';
    if (pc >= 50) return 'Dadaal wanaagsan, sii wad si aad u gaarto 80% 🌱';
    if (pc > 0) return 'Horumar fiican, hal tallaabo oo kale 🌱';
    return 'Bismillaah, ku bilow tallaabo yar 🌱';
  };

  return (
    <div className="space-y-3.5 mb-4">
      {/* Hero Card: Forest Green (#064E3B) with Emerald Green (#10B981) */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#10B981] border border-[#10B981]/20 text-white">
        {/* Decorative Islamic Skyline & Stars SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            {/* Stars */}
            <g className="fill-white/80 animate-pulse">
              <circle cx="36" cy="26" r="1.6" />
              <circle cx="92" cy="14" r="1.2" />
              <circle cx="150" cy="34" r="1.5" />
              <circle cx="230" cy="18" r="1.3" />
              <circle cx="290" cy="40" r="1.6" />
              <circle cx="380" cy="60" r="1.2" />
            </g>
            {/* Crescent Moon in Emerald / Amber */}
            <path d="M336 22a18 18 0 1 0 0 36a14 14 0 1 1 0-36z" fill="#34D399" />
            {/* Skyline Silhouettes */}
            <g fill="#022C22" opacity="0.8">
              <rect x="0" y="126" width="400" height="24" />
              <path d="M150 126q0-46 50-46q50 0 50 46z" />
              <rect x="197" y="62" width="6" height="18" />
              <rect x="104" y="76" width="12" height="50" />
              <path d="M104 76l6-16l6 16z" />
              <rect x="284" y="76" width="12" height="50" />
              <path d="M284 76l6-16l6 16z" />
              <path d="M30 126q0-26 30-26q30 0 30 26z" />
              <path d="M310 126q0-22 26-22q26 0 26 22z" />
            </g>
          </svg>
        </div>

        {/* Content */}
        <div className="relative p-4 sm:p-5 z-10 flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center justify-between gap-2">
              {/* Brand Logo & Name */}
              <div
                onClick={onOpenSplash}
                className="cursor-pointer transition-transform active:scale-95"
                title="Daawo Muuqaalka Animation-ka & Sumadda KORMYE"
              >
                <KormyeLogo size="md" showText={true} />
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {/* Active User Profile Pill */}
                <button
                  onClick={onOpenRegister || onOpenProfiles}
                  className="flex items-center gap-1.5 text-xs bg-black/25 hover:bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-full transition active:scale-95 text-white font-medium border border-white/20"
                  title="Profile-kaaga & Diiwaangalinta"
                >
                  {activeProfile.photoUrl ? (
                    <img
                      src={activeProfile.photoUrl}
                      alt={activeProfile.name}
                      className="w-4 h-4 rounded-full object-cover border border-white/50"
                    />
                  ) : (
                    <span className="text-sm">{activeProfile.avatar || '👤'}</span>
                  )}
                  <span className="max-w-[75px] truncate font-medium">{activeProfile.name.split(' ')[0]}</span>
                </button>

                {/* Reminders Button */}
                <button
                  onClick={onOpenReminders}
                  className="flex items-center gap-1 text-xs bg-[#10B981]/25 hover:bg-[#10B981]/40 backdrop-blur-md px-2.5 py-1 rounded-full transition active:scale-95 text-emerald-200 hover:text-white border border-[#10B981]/30"
                  title="Xusuusiyeyaasha & Ogeysiisyada"
                  aria-label="Xusuusiyeyaasha"
                >
                  <Bell className="w-3.5 h-3.5 text-[#34D399]" />
                  <span className="hidden sm:inline font-semibold">Xusuusin</span>
                </button>

                {/* Today return button */}
                {currentDate !== todayDate && (
                  <button
                    onClick={onToday}
                    className="flex items-center gap-1 text-xs bg-black/20 hover:bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full transition active:scale-95 text-white border border-white/20"
                    aria-label="Ku laabo maanta"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Maanta</span>
                  </button>
                )}
              </div>
            </div>
            <p className="text-emerald-100/90 text-xs mt-2 font-medium tracking-wide">
              Xisaabta nafta, Quraanka, aqoonta, ganacsiga & akhriska caalamiga ah
            </p>
          </div>

          {/* Date Selector */}
          <div className="flex items-center justify-between mt-4 bg-black/25 backdrop-blur-md rounded-2xl p-2 border border-white/15">
            <button
              onClick={onPrevDay}
              className="p-1.5 rounded-xl hover:bg-white/10 transition active:scale-90 text-white"
              aria-label="Maalinta hore"
            >
              <ChevronLeft className="w-5 h-5 text-emerald-300" />
            </button>
            <div className="text-center px-2">
              <div className="text-sm font-bold tracking-wide text-white">{dateTitle}</div>
              <div className="text-xs text-emerald-200/90 font-medium">{dateSubtitle}</div>
            </div>
            <button
              onClick={onNextDay}
              disabled={isFutureOrToday}
              className={`p-1.5 rounded-xl transition active:scale-90 text-white ${
                isFutureOrToday ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10'
              }`}
              aria-label="Maalinta xigta"
            >
              <ChevronRight className="w-5 h-5 text-emerald-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Streaks Card (Soft Green Surface #DCE8DF - NO PURE WHITE) */}
      <div className="glass-card rounded-3xl p-4 flex items-center gap-4 transition-colors">
        {/* Ring: Forest Green (#064E3B) to Emerald Green (#10B981) */}
        <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
          <svg className="w-20 h-20 -rotate-90 transform" viewBox="0 0 104 104">
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#064E3B" />
                <stop offset="60%" stopColor="#047857" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            <circle
              cx="52"
              cy="52"
              r="44"
              stroke="var(--track)"
              strokeWidth="9"
              fill="none"
            />
            <circle
              cx="52"
              cy="52"
              r="44"
              stroke="url(#ringGrad)"
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute font-serif text-lg font-black tracking-tight text-[#0F172A]">
            {completionPercent}%
          </span>
        </div>

        {/* Info & Streaks (Midnight Slate #0F172A text) */}
        <div className="flex-1 min-w-0">
          <div className="font-serif font-extrabold text-sm sm:text-base leading-snug truncate text-[#0F172A]">
            {getEncouragementMessage(completionPercent)}
          </div>
          <div className="text-xs text-[#475569] mt-0.5 font-medium">
            {completedCount} / {totalCount} hawlood la dhammaystiray
          </div>

          {/* Dual Streak Pills in Official Palette */}
          <div className="flex items-center gap-2 flex-wrap mt-2.5">
            {/* Daily Streak (Warm Amber #F59E0B accent) */}
            <div
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                streakCount > 0
                  ? 'bg-[#F59E0B]/15 text-[#0F172A] border-[#F59E0B]/40 shadow-sm'
                  : 'bg-[var(--track)] text-[#475569] border-[var(--bd)] opacity-80'
              }`}
              title={`Maalmaha xiriirka ah ee aad gaartay >= ${streakThreshold}%`}
            >
              <Flame
                className={`w-3.5 h-3.5 ${
                  streakCount > 0 ? 'fill-[#F59E0B] text-[#F59E0B] animate-pulse' : 'text-[#475569]'
                }`}
              />
              <span className="font-bold">
                {streakCount > 0 ? `${streakCount}d Streak` : `0d (${streakThreshold}%+)`}
              </span>
            </div>

            {/* Weekly Streak (Forest Green #064E3B / Emerald #10B981) */}
            <div
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                weeklyStreakCount > 0
                  ? 'bg-[#064E3B]/10 text-[#064E3B] border-[#064E3B]/25 shadow-sm'
                  : 'bg-[var(--track)] text-[#475569] border-[var(--bd)] opacity-80'
              }`}
              title={`Usbuucyada xiriirka ah ee aad gaartay yoolka (${weeklyDaysAchieved}/${weeklyTargetDays} maalmood)`}
            >
              <Trophy
                className={`w-3.5 h-3.5 ${weeklyStreakCount > 0 ? 'text-[#10B981]' : 'text-[#475569]'}`}
              />
              <span className="font-bold">
                {weeklyStreakCount > 0
                  ? `${weeklyStreakCount}w Streak`
                  : `Usbuuca: ${weeklyDaysAchieved}/${weeklyTargetDays}d`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
