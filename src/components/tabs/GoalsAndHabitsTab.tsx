import React, { useState, useMemo } from 'react';
import {
  Target,
  CheckCircle2,
  Trash2,
  Edit3,
  Plus,
  Trophy,
  Heart,
  Sparkles,
  BookMarked,
  X,
  Check,
  Copy,
  Search,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DayRecord, GlobalState, GoalItem, HabitItem, JournalEntry, GoalScope } from '../../types/index.ts';
import { playChime } from '../../utils/soundEffects.ts';
import { AthkaarAndTasbihSection } from '../AthkaarAndTasbihSection.tsx';

interface GoalsAndHabitsTabProps {
  currentDate: string;
  dayRecord: DayRecord;
  globalState: GlobalState;
  onUpdateDayRecord: (updater: (prev: DayRecord) => DayRecord) => void;
  onUpdateGlobalState: (updater: (prev: GlobalState) => GlobalState) => void;
}

export const GoalsAndHabitsTab: React.FC<GoalsAndHabitsTabProps> = ({
  currentDate,
  dayRecord,
  globalState,
  onUpdateDayRecord,
  onUpdateGlobalState,
}) => {
  const [subTab, setSubTab] = useState<'tasbih' | 'goals' | 'habits' | 'journal'>('tasbih');

  // Goals scope filter: 'all' | 'todobaadle' | 'bille' | 'xor'
  const [goalScopeFilter, setGoalScopeFilter] = useState<'all' | 'todobaadle' | 'bille' | 'xor'>('all');

  // Form states for new Goal
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState<'diin' | 'aqoon' | 'lacag' | 'caafimaad' | 'qoys' | 'shakhsi'>('aqoon');
  const [newGoalScope, setNewGoalScope] = useState<GoalScope>('todobaadle');
  const [newGoalTarget, setNewGoalTarget] = useState('10');
  const [newGoalUnit, setNewGoalUnit] = useState('hawlood');

  // Edit Goal modal state
  const [editingGoal, setEditingGoal] = useState<GoalItem | null>(null);

  // Form state for new Habit
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);
  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState('🌱');
  const [newHabitTarget, setNewHabitTarget] = useState('1');
  const [newHabitUnit, setNewHabitUnit] = useState('jeer');

  // Journal form state
  const currentJournal: JournalEntry = globalState.journals[currentDate] || {
    id: `j_${currentDate}`,
    date: currentDate,
    mood: 'mahad',
    gratitude: ['', '', ''],
    success: '',
    improvement: '',
    dua: '',
  };

  const [journalState, setJournalState] = useState<JournalEntry>(currentJournal);

  // Handle save journal
  const handleSaveJournal = (updated: JournalEntry) => {
    setJournalState(updated);
    onUpdateGlobalState((prev) => ({
      ...prev,
      journals: {
        ...prev.journals,
        [currentDate]: updated,
      },
    }));
    onUpdateDayRecord((prev) => ({
      ...prev,
      journal: updated,
    }));
    playChime('success');
  };

  // ===== USER NOTES STATE (qeeb note ah ka dhig muxaasaboda) =====
  interface QuickNote {
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
  }

  const [notes, setNotes] = useState<QuickNote[]>(() => {
    try {
      const saved = localStorage.getItem('kormye_user_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('Xusuus-qor');
  const [noteSearch, setNoteSearch] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [copiedNoteId, setCopiedNoteId] = useState<string | null>(null);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() && !newNoteContent.trim()) return;

    const note: QuickNote = {
      id: `n_${Date.now()}`,
      title: newNoteTitle.trim() || 'Qoraal Cusub',
      content: newNoteContent.trim(),
      category: newNoteCategory,
      date: currentDate,
    };

    const updated = [note, ...notes];
    setNotes(updated);
    try {
      localStorage.setItem('kormye_user_notes', JSON.stringify(updated));
    } catch {}

    setNewNoteTitle('');
    setNewNoteContent('');
    setIsAddingNote(false);
    playChime('success');
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('Ma hubtaa inaad tirtirto qoraalkan?')) {
      const updated = notes.filter((n) => n.id !== id);
      setNotes(updated);
      try {
        localStorage.setItem('kormye_user_notes', JSON.stringify(updated));
      } catch {}
      playChime('tap');
    }
  };

  const handleCopyNote = (n: QuickNote) => {
    navigator.clipboard.writeText(`${n.title}\n${n.date} • ${n.category}\n\n${n.content}`);
    setCopiedNoteId(n.id);
    playChime('click');
    setTimeout(() => setCopiedNoteId(null), 2000);
  };

  // Toggle habit for today
  const handleToggleHabit = (habitId: string) => {
    onUpdateGlobalState((prev) => {
      const updated = prev.habits.map((h) => {
        if (h.id !== habitId) return h;
        const currentCompletedDays = h.completedDays || {};
        const isDone = !currentCompletedDays[currentDate];
        return {
          ...h,
          completedDays: {
            ...currentCompletedDays,
            [currentDate]: isDone,
          },
        };
      });
      return { ...prev, habits: updated };
    });
    playChime('tap');
  };

  // Add new Habit
  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;

    const item: HabitItem = {
      id: `h_${Date.now()}`,
      title: newHabitTitle.trim(),
      category: 'kale',
      icon: newHabitIcon.trim() || '🌱',
      targetCount: Math.max(1, parseInt(newHabitTarget, 10) || 1),
      currentCount: 0,
      unit: newHabitUnit.trim() || 'jeer',
      color: '#10B981',
      completedDays: {},
    };

    onUpdateGlobalState((prev) => ({
      ...prev,
      habits: [...prev.habits, item],
    }));

    setNewHabitTitle('');
    setShowAddHabitModal(false);
    playChime('success');
  };

  // Delete Habit (Immediate & Reliable, no iframe blocking)
  const handleDeleteHabit = (habitId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onUpdateGlobalState((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== habitId),
    }));
    playChime('tap');
  };

  // Filtered goals based on scope
  const filteredGoals = useMemo(() => {
    if (goalScopeFilter === 'all') return globalState.goals;
    if (goalScopeFilter === 'todobaadle') {
      return globalState.goals.filter((g) => g.scope === 'todobaadle' || g.scope === 'maalinle');
    }
    return globalState.goals.filter((g) => g.scope === goalScopeFilter);
  }, [globalState.goals, goalScopeFilter]);

  const countTodobaadle = globalState.goals.filter(
    (g) => g.scope === 'todobaadle' || g.scope === 'maalinle'
  ).length;
  const countBille = globalState.goals.filter((g) => g.scope === 'bille').length;
  const countXor = globalState.goals.filter((g) => g.scope === 'xor' || g.scope === 'sannadle').length;

  // Add new Goal
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const targetNum = Math.max(1, parseInt(newGoalTarget, 10) || 1);
    const item: GoalItem = {
      id: `g_${Date.now()}`,
      title: newGoalTitle.trim(),
      scope: newGoalScope,
      category: newGoalCategory,
      progress: 0,
      target: targetNum,
      unit: newGoalUnit.trim() || 'hawlood',
      completed: false,
    };

    onUpdateGlobalState((prev) => ({
      ...prev,
      goals: [item, ...prev.goals],
    }));

    setNewGoalTitle('');
    setNewGoalTarget('10');
    playChime('success');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#064E3B', '#10B981', '#F59E0B'],
    });
  };

  // Save edited goal
  const handleSaveEditedGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoal) return;

    onUpdateGlobalState((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => (g.id === editingGoal.id ? editingGoal : g)),
    }));

    setEditingGoal(null);
    playChime('success');
  };

  // Delete Goal (Immediate & Reliable, no iframe blocking)
  const handleDeleteGoal = (id: string) => {
    onUpdateGlobalState((prev) => ({
      ...prev,
      goals: prev.goals.filter((g) => g.id !== id),
    }));
    playChime('tap');
  };

  // Update Goal Progress
  const handleUpdateGoalProgress = (id: string, delta: number) => {
    onUpdateGlobalState((prev) => {
      const updated = prev.goals.map((g) => {
        if (g.id !== id) return g;
        const newProgress = Math.max(0, g.progress + delta);
        const completed = newProgress >= g.target;
        return {
          ...g,
          progress: newProgress,
          completed,
        };
      });
      return { ...prev, goals: updated };
    });
    playChime('tap');
  };

  return (
    <div className="space-y-4 animate-rise">
      {/* Sub-navigation Tabs (Clean 4-column grid, uniform Somali labels) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-2xl glass-card">
        <button
          onClick={() => {
            setSubTab('tasbih');
            playChime('tap');
          }}
          className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            subTab === 'tasbih'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>📿 Tasbiix & Duco</span>
        </button>

        <button
          onClick={() => {
            setSubTab('goals');
            playChime('tap');
          }}
          className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            subTab === 'goals'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>🎯 Yoolal</span>
        </button>

        <button
          onClick={() => {
            setSubTab('habits');
            playChime('tap');
          }}
          className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            subTab === 'habits'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>🌱 Caadooyin</span>
        </button>

        <button
          onClick={() => {
            setSubTab('journal');
            playChime('tap');
          }}
          className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
            subTab === 'journal'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>📝 Notes & Muxaasabo</span>
        </button>
      </div>

      {/* ================= 0. TASBIIX, ATHKAAR & DUCOOYIN ================= */}
      {subTab === 'tasbih' && (
        <AthkaarAndTasbihSection />
      )}

      {/* ================= 1. GOALS SUBTAB ================= */}
      {subTab === 'goals' && (
        <div className="space-y-4">
          {/* Header Card */}
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-base text-[#0F172A]">
                  Yoolalka & Hadafyada Nolosha
                </h3>
                <p className="text-xs text-[#475569] font-medium">
                  U maamul yoolalkaaga si xor ah: ku dar, wax ka beddel, tirtirna
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#10B981]/20 text-[#064E3B] flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5 text-[#10B981]" />
              </div>
            </div>

            {/* Scope Filter Buttons: Isbuuc, Bil, Xor ah (Uniform size and balanced text) */}
            <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-[#D0DFD4]/60">
              <button
                onClick={() => setGoalScopeFilter('all')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                  goalScopeFilter === 'all'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-[#0F172A]/70 hover:text-[#0F172A]'
                }`}
              >
                <span>Dhammaan</span>
                <span className="text-[10px] opacity-75 font-mono">({globalState.goals.length})</span>
              </button>

              <button
                onClick={() => setGoalScopeFilter('todobaadle')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                  goalScopeFilter === 'todobaadle'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-[#0F172A]/70 hover:text-[#0F172A]'
                }`}
              >
                <span>Isbuucle</span>
                <span className="text-[10px] opacity-75 font-mono">({countTodobaadle})</span>
              </button>

              <button
                onClick={() => setGoalScopeFilter('bille')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                  goalScopeFilter === 'bille'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-[#0F172A]/70 hover:text-[#0F172A]'
                }`}
              >
                <span>Bille</span>
                <span className="text-[10px] opacity-75 font-mono">({countBille})</span>
              </button>

              <button
                onClick={() => setGoalScopeFilter('xor')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                  goalScopeFilter === 'xor'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-[#0F172A]/70 hover:text-[#0F172A]'
                }`}
              >
                <span>Xor ah</span>
                <span className="text-[10px] opacity-75 font-mono">({countXor})</span>
              </button>
            </div>

            {/* Goals List */}
            <div className="space-y-3 pt-1">
              {filteredGoals.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#475569] rounded-2xl bg-[#D0DFD4]/40 font-medium">
                  Weli ma jiro yool qaybtan ku jira. Ku dar yool cusub adigoo isticmaalaya foomka hoose.
                </div>
              ) : (
                filteredGoals.map((goal) => {
                  const percent = Math.min(100, Math.round((goal.progress / (goal.target || 1)) * 100));
                  const scopeLabel =
                    goal.scope === 'todobaadle' || goal.scope === 'maalinle'
                      ? '📅 Isbuuclaha'
                      : goal.scope === 'bille'
                      ? '🗓️ Bisha'
                      : '✨ Xor ah';

                  return (
                    <div
                      key={goal.id}
                      className="p-4 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10 space-y-3 transition hover:border-[#10B981]/40"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-[#0F172A]">{goal.title}</span>
                            {goal.completed && (
                              <span className="text-[10px] bg-[#10B981]/20 text-[#064E3B] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-[#10B981]" /> Dhammaaday
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#475569] font-medium">
                            <span className="px-2 py-0.5 rounded-md bg-[#DCE8DF] text-[#064E3B] font-bold text-[10px]">
                              {scopeLabel}
                            </span>
                            <span>•</span>
                            <span className="capitalize">Qeybta: {goal.category}</span>
                          </div>
                        </div>

                        {/* Action buttons: Edit & Delete (Uniform 32x32 buttons) */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => setEditingGoal({ ...goal })}
                            title="Wax ka beddel yoolka"
                            className="w-8 h-8 rounded-xl bg-[#DCE8DF] text-[#475569] hover:text-[#064E3B] flex items-center justify-center transition active:scale-95"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteGoal(goal.id)}
                            title="Tirtir yoolka"
                            className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 flex items-center justify-center transition active:scale-95"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div>
                        <div className="flex justify-between text-xs text-[#475569] font-medium mb-1.5">
                          <span>Horumarka: {percent}%</span>
                          <span className="font-bold text-[#0F172A]">
                            {goal.progress} / {goal.target} {goal.unit}
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#064E3B]/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#10B981] rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Quick increment buttons (UNIFORM SIZES, PROPORTIONAL) */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          onClick={() => handleUpdateGoalProgress(goal.id, -1)}
                          className="h-8 px-3 rounded-xl bg-[#DCE8DF] border border-[#064E3B]/15 text-xs font-bold text-[#0F172A] hover:bg-[#D0DFD4] transition active:scale-95"
                          title="Ka dhim 1"
                        >
                          − 1
                        </button>
                        <button
                          onClick={() => handleUpdateGoalProgress(goal.id, 1)}
                          className="h-8 px-3 rounded-xl bg-[#10B981]/20 text-[#064E3B] border border-[#10B981]/30 text-xs font-bold transition active:scale-95"
                          title="Ku dar 1"
                        >
                          + 1
                        </button>
                        <button
                          onClick={() => handleUpdateGoalProgress(goal.id, 5)}
                          className="h-8 px-3 rounded-xl bg-[#064E3B]/10 text-[#064E3B] border border-[#064E3B]/20 text-xs font-bold transition active:scale-95"
                          title="Ku dar 5"
                        >
                          + 5
                        </button>
                        <button
                          onClick={() => handleUpdateGoalProgress(goal.id, goal.target - goal.progress)}
                          className={`h-8 ml-auto px-3.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                            goal.completed
                              ? 'bg-[#10B981] text-white shadow-xs'
                              : 'bg-[#064E3B] text-white hover:bg-[#054030]'
                          }`}
                        >
                          {goal.completed ? '✓ Dhammaystiran' : 'Dhammaystir'}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Add Goal Form */}
          <form onSubmit={handleAddGoal} className="glass-card p-4 sm:p-5 rounded-3xl space-y-3">
            <h4 className="text-xs font-bold text-[#064E3B] uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Ku dar Yool Cusub (Isbuucle, Bille, ama Xor ah)</span>
            </h4>

            <div>
              <label className="text-xs text-[#475569] block mb-1 font-semibold">Ciwaanka Yoolka *</label>
              <input
                type="text"
                required
                placeholder="Tusaale: Akhriska 5 buug, xifdinta suurad, ama $1,000 dakhli ganacsi"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder:text-[#64748B]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-[#475569] block mb-1 font-semibold">Muddada / Xilliga *</label>
                <select
                  value={newGoalScope}
                  onChange={(e) => setNewGoalScope(e.target.value as any)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2.5 py-2 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                >
                  <option value="todobaadle">📅 Isbuuclaha (Todobaadka)</option>
                  <option value="bille">🗓️ Bille (Bisha)</option>
                  <option value="xor">✨ Xor ah (Bil & Sannad)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#475569] block mb-1 font-semibold">Qeybta</label>
                <select
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value as any)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                >
                  <option value="diin">Diin & Quraan</option>
                  <option value="aqoon">Aqoon & Waxbarasho</option>
                  <option value="lacag">Ganacsi & Lacag</option>
                  <option value="caafimaad">Caafimaad & Jimicsi</option>
                  <option value="qoys">Qoys & Bulsho</option>
                  <option value="shakhsi">Horumar Shakhsi</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-[#475569] block mb-1 font-semibold">Hadafka Tirada</label>
                <input
                  type="number"
                  min="1"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>
              <div>
                <label className="text-xs text-[#475569] block mb-1 font-semibold">Halbeegga</label>
                <input
                  type="text"
                  placeholder="tusaale: buug, bog, saacad, $"
                  value={newGoalUnit}
                  onChange={(e) => setNewGoalUnit(e.target.value)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder:text-[#64748B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#054030] text-white font-bold text-xs shadow-md shadow-[#064E3B]/20 active:scale-98 transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Keydi Yoolka Cusub</span>
            </button>
          </form>
        </div>
      )}

      {/* ================= EDIT GOAL MODAL ================= */}
      {editingGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#DCE8DF] border border-[#064E3B]/20 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#064E3B]/15">
              <h4 className="font-serif font-black text-sm text-[#0F172A] flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#10B981]" />
                <span>Wax ka beddel Yoolka</span>
              </h4>
              <button
                onClick={() => setEditingGoal(null)}
                className="p-1 rounded-lg text-[#475569] hover:text-[#0F172A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedGoal} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#475569] block mb-1">Ciwaanka Yoolka</label>
                <input
                  type="text"
                  required
                  value={editingGoal.title}
                  onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#475569] block mb-1">Muddada</label>
                  <select
                    value={editingGoal.scope}
                    onChange={(e) => setEditingGoal({ ...editingGoal, scope: e.target.value as any })}
                    className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2 py-2 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  >
                    <option value="todobaadle">📅 Isbuuclaha</option>
                    <option value="bille">🗓️ Bille</option>
                    <option value="xor">✨ Xor ah</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] block mb-1">Qeybta</label>
                  <select
                    value={editingGoal.category}
                    onChange={(e) => setEditingGoal({ ...editingGoal, category: e.target.value as any })}
                    className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  >
                    <option value="diin">Diin & Quraan</option>
                    <option value="aqoon">Aqoon & Waxbarasho</option>
                    <option value="lacag">Ganacsi & Lacag</option>
                    <option value="caafimaad">Caafimaad & Jimicsi</option>
                    <option value="qoys">Qoys & Bulsho</option>
                    <option value="shakhsi">Horumar Shakhsi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#475569] block mb-1">Hadda Jooga</label>
                  <input
                    type="number"
                    min="0"
                    value={editingGoal.progress}
                    onChange={(e) =>
                      setEditingGoal({ ...editingGoal, progress: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2.5 py-1.5 text-xs text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] block mb-1">Bartilmaameed</label>
                  <input
                    type="number"
                    min="1"
                    value={editingGoal.target}
                    onChange={(e) =>
                      setEditingGoal({ ...editingGoal, target: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2.5 py-1.5 text-xs text-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] block mb-1">Halbeeg</label>
                  <input
                    type="text"
                    value={editingGoal.unit}
                    onChange={(e) => setEditingGoal({ ...editingGoal, unit: e.target.value })}
                    className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2.5 py-1.5 text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#064E3B]/15">
                <button
                  type="button"
                  onClick={() => setEditingGoal(null)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#475569] hover:bg-[#D0DFD4]"
                >
                  Ka noqo
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#054030] text-white text-xs font-bold shadow-md"
                >
                  Keydi Isbeddelka
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 2. HABITS SUBTAB (WITH UNLIMITED ADD & DELETE) ================= */}
      {subTab === 'habits' && (
        <div className="space-y-4">
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-3.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-serif font-black text-base text-[#0F172A]">
                  Caadooyinka Wanaagsan ee Maanta
                </h3>
                <p className="text-xs text-[#475569] font-medium">
                  Joogtaynta maalinlaha ahi waxay dhistaa qofka guuleysta
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddHabitModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#054030] text-white text-xs font-bold shadow-xs flex items-center gap-1 active:scale-95 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ku dar Caado</span>
                </button>
                <span className="text-xs font-bold text-[#064E3B] bg-[#10B981]/20 px-2.5 py-1 rounded-xl border border-[#10B981]/30">
                  {globalState.habits.filter((h) => h.completedDays?.[currentDate]).length} /{' '}
                  {globalState.habits.length}
                </span>
              </div>
            </div>

            {/* Habits Grid */}
            <div className="space-y-2 pt-1">
              {globalState.habits.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#475569] rounded-2xl bg-[#D0DFD4]/40 font-medium space-y-2">
                  <p>Weli ma jiraan caadooyin aad diiwaangelisay.</p>
                  <button
                    type="button"
                    onClick={() => setShowAddHabitModal(true)}
                    className="btn-teal text-xs px-3.5 py-1.5 inline-flex items-center gap-1 mx-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ku dar Caado Cusub</span>
                  </button>
                </div>
              ) : (
                globalState.habits.map((habit) => {
                const isDone = !!habit.completedDays?.[currentDate];
                return (
                  <div
                    key={habit.id}
                    onClick={() => handleToggleHabit(habit.id)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isDone
                        ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#064E3B]'
                        : 'bg-[#E5EFE7] border-[#064E3B]/10 hover:border-[#10B981]/30 text-[#0F172A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{habit.icon}</span>
                      <div>
                        <div className={`text-sm font-bold ${isDone ? 'line-through text-[#475569]' : 'text-[#0F172A]'}`}>
                          {habit.title}
                        </div>
                        <span className="text-[11px] text-[#475569] font-medium">
                          Hadafka: {habit.targetCount} {habit.unit} maalin kasta
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Delete Habit Button (Working delete!) */}
                      <button
                        type="button"
                        onClick={(e) => handleDeleteHabit(habit.id, e)}
                        className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 flex items-center justify-center transition"
                        title="Tirtir caadadan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Checkmark Button */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isDone
                            ? 'bg-[#10B981] text-white shadow-sm'
                            : 'border-2 border-[#064E3B]/25 text-transparent hover:border-[#10B981]'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            </div>
          </div>

          {/* ADD HABIT MODAL */}
          {showAddHabitModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
              <div className="relative w-full max-w-md bg-[#DCE8DF] border border-[#064E3B]/20 rounded-3xl p-5 shadow-2xl space-y-3.5 text-[#0F172A]">
                <div className="flex items-center justify-between pb-2 border-b border-[#064E3B]/15">
                  <h4 className="font-serif font-black text-sm text-[#0F172A] flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#10B981]" />
                    <span>Ku dar Caado Cusub</span>
                  </h4>
                  <button
                    onClick={() => setShowAddHabitModal(false)}
                    className="p-1 rounded-lg text-[#475569] hover:text-[#0F172A]"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddHabit} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#475569] block mb-1">
                      Magaca Caadada *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tusaale: Socod subaxii 20 daqiiqo..."
                      value={newHabitTitle}
                      onChange={(e) => setNewHabitTitle(e.target.value)}
                      className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs font-bold text-[#475569] block mb-1">Astaanta (Emoji)</label>
                      <input
                        type="text"
                        value={newHabitIcon}
                        onChange={(e) => setNewHabitIcon(e.target.value)}
                        className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-center text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#475569] block mb-1">Tirada Hadafka</label>
                      <input
                        type="number"
                        min="1"
                        value={newHabitTarget}
                        onChange={(e) => setNewHabitTarget(e.target.value)}
                        className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs text-[#0F172A]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#475569] block mb-1">Halbeegga</label>
                      <input
                        type="text"
                        value={newHabitUnit}
                        onChange={(e) => setNewHabitUnit(e.target.value)}
                        className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs text-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#064E3B]/15">
                    <button
                      type="button"
                      onClick={() => setShowAddHabitModal(false)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#475569] hover:bg-[#D0DFD4]"
                    >
                      Ka noqo
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#054030] text-white text-xs font-bold shadow-sm"
                    >
                      Keydi Caadada
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 3. NOTES & MUHASABAH SUBTAB ================= */}
      {subTab === 'journal' && (
        <div className="space-y-4">
          {/* Header & Add Note Button */}
          <div className="glass-card p-4 sm:p-5 rounded-3xl flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-serif font-black text-base text-[#0F172A] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#064E3B]" />
                <span>Qoraalladaada & Notes (Muxaasabo)</span>
              </h3>
              <p className="text-xs text-[#475569] font-medium">
                Qor fikradahaaga, casharrada aad baratay, iyo xisaabinta naftaada
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingNote(!isAddingNote)}
              className="px-3.5 py-2 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingNote ? 'Xidh Foomka' : '+ Qor Note Cusub'}</span>
            </button>
          </div>

          {/* Add Note Form */}
          {isAddingNote && (
            <form onSubmit={handleAddNote} className="glass-card p-4 sm:p-5 rounded-3xl space-y-3 border-2 border-[#10B981]/40 bg-[#DCE8DF] animate-in fade-in duration-200">
              <h4 className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Qor Qoraal / Note Cusub:</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <input
                  type="text"
                  required
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Cinwaanka qoraalka (tusaale: Fikir ganacsi, Cashar maanta, Muxaasabo)..."
                  className="sm:col-span-8 px-3.5 py-2 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/15 text-xs font-bold text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                />
                <select
                  value={newNoteCategory}
                  onChange={(e) => setNewNoteCategory(e.target.value)}
                  className="sm:col-span-4 px-3 py-2 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/15 text-xs font-bold text-[#0F172A]"
                >
                  <option value="Xusuus-qor">📝 Xusuus-qor</option>
                  <option value="Muxaasabo">⚖️ Muxaasabo</option>
                  <option value="Fikir">💡 Fikir Cusub</option>
                  <option value="Hawl">📌 Hawl & Qorshe</option>
                  <option value="Duco">🤲 Duco & Mahadnaq</option>
                </select>
              </div>

              <textarea
                rows={4}
                required
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Halkan ku qor qoraalkaaga faahfaahsan..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/15 text-xs text-[#0F172A] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#10B981]"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-xs font-bold text-[#475569]"
                >
                  Ka Noqo
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white text-xs font-bold shadow-sm"
                >
                  Keydi Qoraalka
                </button>
              </div>
            </form>
          )}

          {/* Search Notes */}
          {notes.length > 0 && (
            <div className="relative">
              <Search className="w-4 h-4 text-[#475569] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={noteSearch}
                onChange={(e) => setNoteSearch(e.target.value)}
                placeholder="Raadi qoraalladaada..."
                className="w-full pl-9 pr-3 py-2 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/15 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#10B981]"
              />
            </div>
          )}

          {/* Saved Notes List */}
          <div className="space-y-3">
            {notes.length === 0 ? (
              <div className="p-8 rounded-3xl bg-[#E5EFE7] border border-dashed border-[#064E3B]/20 text-center space-y-2">
                <FileText className="w-8 h-8 text-[#064E3B]/40 mx-auto" />
                <p className="text-xs font-semibold text-[#0F172A]">
                  Weli wax qoraal ah ma aadan qorin.
                </p>
                <p className="text-[11px] text-[#475569]">
                  Guji badhanka kore ee <b>"+ Qor Note Cusub"</b> si aad u bilowdo xusuus-qorkaaga.
                </p>
              </div>
            ) : (
              notes
                .filter((n) => {
                  if (!noteSearch.trim()) return true;
                  const q = noteSearch.toLowerCase();
                  return (
                    n.title.toLowerCase().includes(q) ||
                    n.content.toLowerCase().includes(q) ||
                    n.category.toLowerCase().includes(q)
                  );
                })
                .map((n) => (
                  <div
                    key={n.id}
                    className="p-4 sm:p-5 rounded-3xl bg-[#E5EFE7] border border-[#064E3B]/15 space-y-2.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B] text-[10px] font-bold">
                          {n.category}
                        </span>
                        <span className="text-[11px] text-[#475569] font-medium">
                          {n.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopyNote(n)}
                          className="p-1 rounded-lg hover:bg-[#D0DFD4] text-[#475569] transition"
                          title="Nuuxi qoraalka"
                        >
                          {copiedNoteId === n.id ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(n.id)}
                          className="p-1 rounded-lg hover:bg-rose-100 text-rose-500 transition"
                          title="Tirtir qoraalka"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-serif font-black text-sm text-[#0F172A]">
                      {n.title}
                    </h4>

                    <p className="text-xs text-[#334155] leading-relaxed whitespace-pre-wrap">
                      {n.content}
                    </p>
                  </div>
                ))
            )}
          </div>

          {/* Daily Muxaasabo Reflection Box */}
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-4 border border-[#064E3B]/15 bg-[#DCE8DF]">
            <div className="flex items-center justify-between border-b border-[#064E3B]/15 pb-2.5">
              <div>
                <h4 className="font-serif font-black text-sm text-[#0F172A] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#10B981]" />
                  <span>Muxaasabada & Is-Xisaabinta Maanta</span>
                </h4>
                <p className="text-[11px] text-[#475569]">
                  Maxaa maanta kuu qabsoomay? Maxaad Eebbe ugu mahadnaqaysaa?
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#064E3B] bg-[#10B981]/20 px-2 py-0.5 rounded-lg">
                {currentDate}
              </span>
            </div>

            {/* Gratitude reflections */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#475569] flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-600" />
                <span>3 Nicmo oo aad ku mahadnaqayso maanta:</span>
              </label>
              {[0, 1, 2].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Nicmada #${idx + 1}...`}
                  value={journalState.gratitude[idx] || ''}
                  onChange={(e) => {
                    const newGratitude = [...journalState.gratitude];
                    newGratitude[idx] = e.target.value;
                    setJournalState({ ...journalState, gratitude: newGratitude });
                  }}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#10B981] placeholder:text-[#64748B]"
                />
              ))}
            </div>

            {/* Today's biggest win */}
            <div>
              <label className="text-xs font-bold text-[#475569] block mb-1">
                🏆 Guushii ama Camalkii ugu fiicnaa maanta:
              </label>
              <input
                type="text"
                placeholder="Maxaa si wanaagsan kuu qabsoomay maanta?"
                value={journalState.success}
                onChange={(e) => setJournalState({ ...journalState, success: e.target.value })}
                className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#10B981] placeholder:text-[#64748B]"
              />
            </div>

            {/* Dua reflection */}
            <div>
              <label className="text-xs font-bold text-[#475569] block mb-1">
                🤲 Ducadaada gaarka ah ee caawa:
              </label>
              <textarea
                rows={2}
                placeholder="Rabbiyow ii dambi dhaafe, iina barakee cilmiga, camalka iyo caafimaadka..."
                value={journalState.dua}
                onChange={(e) => setJournalState({ ...journalState, dua: e.target.value })}
                className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl p-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#10B981] placeholder:text-[#64748B]"
              />
            </div>

            <button
              type="button"
              onClick={() => handleSaveJournal(journalState)}
              className="w-full py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#054030] text-white text-xs font-bold shadow-md shadow-[#064E3B]/20 active:scale-98 transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Keydi Muxaasabada Maanta</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
