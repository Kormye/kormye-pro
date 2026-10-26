import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Sparkles, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DayRecord } from '../types/index.ts';
import { playChime } from '../utils/soundEffects.ts';

interface FocusTimerCardProps {
  dayRecord: DayRecord;
  onUpdateDayRecord: (updater: (prev: DayRecord) => DayRecord) => void;
}

export const FocusTimerCard: React.FC<FocusTimerCardProps> = ({
  dayRecord,
  onUpdateDayRecord,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [focusSubject, setFocusSubject] = useState('');
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Set preset minutes
  const handleSetPreset = (mins: number) => {
    if (isRunning) return;
    setFocusMinutes(mins);
    setTotalSeconds(mins * 60);
    setSecondsLeft(mins * 60);
    playChime('click');
  };

  // Toggle Timer Play / Pause
  const handleToggleTimer = () => {
    if (isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
      playChime('click');
    } else {
      setIsRunning(true);
      playChime('click');
      timerRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
            setIsRunning(false);
            handleFinishSession(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  // Reset Timer
  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
    setSecondsLeft(focusMinutes * 60);
    setTotalSeconds(focusMinutes * 60);
    playChime('tap');
  };

  // Finish session & record minutes
  const handleFinishSession = (auto = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);

    const elapsedSeconds = totalSeconds - secondsLeft;
    const elapsedMinutes = Math.max(1, Math.round(elapsedSeconds / 60));

    if (elapsedMinutes >= 1) {
      const subject = focusSubject.trim() || 'Diiradda';
      onUpdateDayRecord((prev) => ({
        ...prev,
        ses: [...prev.ses, { s: subject, m: elapsedMinutes }],
      }));

      playChime('success');
      confetti({
        particleCount: 70,
        spread: 60,
        colors: ['#064E3B', '#10B981', '#F59E0B'],
      });
    }

    setSecondsLeft(focusMinutes * 60);
    setTotalSeconds(focusMinutes * 60);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format time MM:SS
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  // Circular progress calculation
  const progressRatio = totalSeconds > 0 ? (totalSeconds - secondsLeft) / totalSeconds : 0;
  const strokeDashoffset = 283 * (1 - progressRatio);

  // Today's total focus minutes
  const todayFocusMinutes = dayRecord.ses.reduce((sum, s) => sum + s.m, 0);

  return (
    <div className="glass-card rounded-3xl p-4 sm:p-5 border-2 border-[#10B981]/25 shadow-md space-y-3.5 transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#064E3B]">
            <Clock className="w-4 h-4 text-[#10B981]" />
          </div>
          <div>
            <h3 className="font-serif font-black text-sm sm:text-base text-[#0F172A] leading-tight flex items-center gap-1.5">
              <span>Time Focus & Diirad</span>
              {isRunning && (
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping inline-block" />
              )}
            </h3>
            <p className="text-[11px] text-[#475569] font-medium">
              Maanta: <span className="text-[#064E3B] font-bold">{todayFocusMinutes} daqiiqo</span> oo diirad ah
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Play/Pause when collapsed */}
          {!isExpanded && (
            <button
              onClick={handleToggleTimer}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 ${
                isRunning
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-[#064E3B] text-white hover:bg-[#054030]'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="font-mono">{timeFormatted}</span>
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#064E3B] transition"
            title={isExpanded ? 'Qari faahfaahinta' : 'Fur faahfaahinta'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Focus Controls */}
      {isExpanded && (
        <div className="pt-2 border-t border-[#064E3B]/10 space-y-4 animate-in fade-in duration-200">
          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            {[
              { m: 15, label: '⚡ 15 daq' },
              { m: 25, label: '🎯 25 daq (Pomodoro)' },
              { m: 50, label: '🔥 50 daq (Qoto-dheer)' },
              { m: 5, label: '☕ 5 daq (Nasiino)' },
            ].map((preset) => (
              <button
                key={preset.m}
                type="button"
                onClick={() => handleSetPreset(preset.m)}
                disabled={isRunning}
                className={`py-1.5 px-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition disabled:opacity-50 ${
                  focusMinutes === preset.m
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-[#E5EFE7] border border-[#064E3B]/10 text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Subject Input */}
          <div>
            <input
              type="text"
              value={focusSubject}
              onChange={(e) => setFocusSubject(e.target.value)}
              placeholder="Maxaad hadda diiradda saaraysaa? (tusaale: Quraan, Akhris, Hawl gaar ah...)"
              className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder:text-[#64748B]"
            />
          </div>

          {/* Circular Countdown Display & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
            {/* Circular Timer Visual */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-[#064E3B]/15"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-[#10B981] transition-all duration-500 ease-linear"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono font-black text-xl text-[#0F172A] tracking-wider">
                  {timeFormatted}
                </span>
                <span className="text-[10px] font-bold text-[#475569] uppercase">
                  {isRunning ? 'Socda' : 'Joogsan'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex-1 space-y-2 text-center sm:text-left w-full">
              <div className="text-xs text-[#475569] font-medium">
                {focusSubject ? (
                  <span>Diiradda: <strong className="text-[#064E3B]">{focusSubject}</strong></span>
                ) : (
                  <span>Dooro waqti oo bilow inaad si qoto dheer u shaqayso</span>
                )}
              </div>

              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={handleToggleTimer}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold text-white transition flex items-center gap-1.5 shadow-md active:scale-95 ${
                    isRunning
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : 'bg-gradient-to-r from-[#064E3B] to-[#10B981] hover:brightness-105'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isRunning ? 'Hakad Geli' : 'Bilaaw Diiradda'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-2.5 rounded-xl bg-[#DCE8DF] hover:bg-[#D0DFD4] text-[#475569] hover:text-[#0F172A] border border-[#064E3B]/15 transition active:scale-95"
                  title="Dib u bilow"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {totalSeconds - secondsLeft >= 60 && (
                  <button
                    type="button"
                    onClick={() => handleFinishSession(false)}
                    className="px-3 py-2.5 rounded-xl bg-[#10B981]/20 hover:bg-[#10B981]/30 text-[#064E3B] font-bold text-xs border border-[#10B981]/30 transition active:scale-95 flex items-center gap-1"
                    title="Dhammaystir hadda"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Dhammee</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
