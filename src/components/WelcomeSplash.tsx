import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, BookOpen, Clock, Heart, Award } from 'lucide-react';
import { KormyeLogo } from './KormyeLogo.tsx';
import { UserAccount, RoutineItem } from '../types/index.ts';
import { playChime } from '../utils/soundEffects.ts';

interface WelcomeSplashProps {
  isOpen: boolean;
  user: UserAccount;
  onEnter: () => void;
  onSavePlan?: (newPlan: RoutineItem[]) => void;
}

export const WelcomeSplash: React.FC<WelcomeSplashProps> = ({
  isOpen,
  user,
  onEnter,
}) => {
  const [animStage, setAnimStage] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setAnimStage(0);
      return;
    }

    try {
      playChime('bell');
    } catch {
      // Audio autoplay policy fallback
    }

    const t1 = setTimeout(() => setAnimStage(1), 150);
    const t2 = setTimeout(() => setAnimStage(2), 400);
    const t3 = setTimeout(() => setAnimStage(3), 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEnterApp = () => {
    try {
      playChime('success');
    } catch {}
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#E5F0E8]/95 backdrop-blur-md text-[#0F172A] overflow-y-auto transition-all duration-700">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-1/4 -left-16 w-72 h-72 rounded-full bg-[#10B981]/15 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-16 w-72 h-72 rounded-full bg-[#064E3B]/10 blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md mx-auto text-center space-y-5 my-auto py-6">
        {/* Animated Brand Logo */}
        <div className={`transition-all duration-700 transform ${animStage >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <div className="inline-block relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#10B981]/25 via-[#064E3B]/20 to-[#10B981]/25 rounded-full blur-xl animate-pulse" />
            <KormyeLogo size="lg" showText={false} className="relative transform hover:scale-105 transition-transform duration-300 mx-auto" />
          </div>
        </div>

        {/* Brand Name */}
        <div className={`space-y-1 transition-all duration-700 transform ${animStage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
          <h1 className="font-serif font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#10B981] bg-clip-text text-transparent">
            KORMYE
          </h1>
          <p className="text-[11px] uppercase tracking-widest font-bold text-[#064E3B]">
            Nidaamka Nolosha, Quraanka & Horumarka
          </p>
        </div>

        {/* Card for User Greeting */}
        <div className={`bg-[#DCE8DF] border border-[#064E3B]/20 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-center transition-all duration-700 transform ${animStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          {/* User Profile Avatar with Instagram-style Story Ring */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-emerald-600 shadow-md">
              <div className="w-18 h-18 rounded-full bg-[#E5EFE7] border-2 border-white flex items-center justify-center text-3xl shadow-inner overflow-hidden">
                {user.photoUrl ? (
                  <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{user.avatar || '⭐'}</span>
                )}
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/20 text-[#064E3B] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Ku soo dhowow, {user.name}</span>
            </div>
          </div>

          {/* Inspirational Verse */}
          <div className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10 space-y-1">
            <p className="font-serif text-sm font-bold text-[#064E3B] italic">
              «وَقُل رَّبِّ زِدْنِي عِلْمًا»
            </p>
            <p className="text-xs text-[#475569]">
              "Rabiyow ii kordhi cilmi, nidaam iyo barako maalin walba."
            </p>
          </div>

          {/* Quick Feature Badges */}
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/10 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#064E3B] shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-[#0F172A] block">Quraan & Qisooyin</span>
                <span className="text-[9px] text-[#475569]">Akhris & xifdi</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/10 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#10B981] shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-[#0F172A] block">Time Focus</span>
                <span className="text-[9px] text-[#475569]">Diirad & Pomodoro</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/10 flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-[#0F172A] block">Tasbiix & Duco</span>
                <span className="text-[9px] text-[#475569]">Athkaar subax & galab</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/10 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="text-[11px] font-bold text-[#0F172A] block">Koorsooyin Xor ah</span>
                <span className="text-[9px] text-[#475569]">Dhis xirfaddaada</span>
              </div>
            </div>
          </div>

          {/* Enter Button */}
          <button
            type="button"
            onClick={handleEnterApp}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#10B981] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#064E3B]/20 hover:brightness-105 active:scale-98 transition transform"
          >
            <span>🚀 Gal Boggaaga Maanta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-[#475569] font-medium">
          Xogtaadu waa mid gaar ah oo ku kaydsan qalabkaaga adiga oo kaliya.
        </p>
      </div>
    </div>
  );
};
