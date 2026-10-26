import React, { useState } from 'react';
import {
  User,
  Plus,
  Minus,
  Trash2,
  Sliders,
  Download,
  Upload,
  Sparkles,
  DollarSign,
  Pencil,
  Clock,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Award,
  Flame,
  ShieldCheck,
  RefreshCw,
  TrendingUp,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  DayRecord,
  GlobalState,
  AppConfig,
  CourseProgress,
} from '../../types/index.ts';
import {
  getDefaultConfig,
  applyThemeMode,
  P,
  isItemCompleted,
} from '../../utils/storage.ts';
import { playChime } from '../../utils/soundEffects.ts';

interface MoreTabProps {
  currentDate: string;
  todayDate: string;
  dayRecord: DayRecord;
  globalState: GlobalState;
  config: AppConfig;
  profileId?: string;
  onUpdateDayRecord: (updater: (prev: DayRecord) => DayRecord) => void;
  onUpdateGlobalState: (updater: (prev: GlobalState) => GlobalState) => void;
  onUpdateConfig: (updater: (prev: AppConfig) => AppConfig) => void;
  onSelectDay: (date: string) => void;
  onOpenReminders: () => void;
  onOpenProfiles?: () => void;
  onOpenAuthModal?: () => void;
  onNavigateTab?: (tab: any) => void;
}

export const MoreTab: React.FC<MoreTabProps> = ({
  currentDate,
  todayDate,
  dayRecord,
  globalState,
  config,
  onUpdateDayRecord,
  onUpdateGlobalState,
  onUpdateConfig,
  onOpenReminders,
  onOpenProfiles,
  onOpenAuthModal,
  onNavigateTab,
}) => {
  type ProfileSubSection = 'profile' | 'xisaab' | 'habayn';
  const [subSection, setSubSection] = useState<ProfileSubSection>('profile');

  // ==========================================
  // DYNAMIC COURSES / SKILLS TRACKER
  // ==========================================
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseTotal, setNewCourseTotal] = useState('20');

  // Purge legacy hardcoded courses (acc, ai)
  React.useEffect(() => {
    const raw = globalState.c || {};
    const hasLegacy = Object.keys(raw).some(
      (k) =>
        k === 'acc' ||
        k === 'ai' ||
        k.toLowerCase().includes('acc') ||
        k.toLowerCase().includes('accounting') ||
        k.toLowerCase().includes('automation') ||
        raw[k]?.n?.toLowerCase().includes('accounting') ||
        raw[k]?.n?.toLowerCase().includes('automation')
    );
    if (hasLegacy) {
      onUpdateGlobalState((prev) => {
        const cleaned: Record<string, any> = {};
        for (const [k, v] of Object.entries(prev.c || {})) {
          const lk = k.toLowerCase();
          const vn = (v as any)?.n?.toLowerCase() || '';
          if (
            k !== 'acc' &&
            k !== 'ai' &&
            !lk.includes('acc') &&
            !lk.includes('accounting') &&
            !lk.includes('automation') &&
            !vn.includes('accounting') &&
            !vn.includes('automation')
          ) {
            cleaned[k] = v;
          }
        }
        return { ...prev, c: cleaned };
      });
    }
  }, [globalState.c, onUpdateGlobalState]);

  // Clean filtered courses
  const courses = React.useMemo(() => {
    const raw = globalState.c || {};
    const filtered: Record<string, any> = {};
    for (const [k, v] of Object.entries(raw)) {
      const lk = k.toLowerCase();
      const vn = (v as any)?.n?.toLowerCase() || '';
      if (
        k !== 'acc' &&
        k !== 'ai' &&
        !lk.includes('acc') &&
        !lk.includes('accounting') &&
        !lk.includes('automation') &&
        !vn.includes('accounting') &&
        !vn.includes('automation')
      ) {
        filtered[k] = v;
      }
    }
    return filtered;
  }, [globalState.c]);

  const courseKeys = Object.keys(courses);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newCourseName.trim();
    if (!name) return;

    const total = Math.max(1, parseInt(newCourseTotal, 10) || 20);
    const key = `crs_${Date.now()}`;

    onUpdateGlobalState((prev) => ({
      ...prev,
      c: {
        ...(prev.c || {}),
        [key]: { n: name, d: 0, t: total },
      },
    }));

    setNewCourseName('');
    setNewCourseTotal('20');
    setShowAddCourse(false);
    playChime('success');
  };

  const handleCourseStep = (key: string, delta: number) => {
    onUpdateGlobalState((prev) => {
      const course = prev.c?.[key];
      if (!course) return prev;
      const newD = Math.max(0, Math.min(course.t, course.d + delta));

      if (newD === course.t && delta > 0) {
        confetti({ particleCount: 70, spread: 70, colors: ['#064E3B', '#10B981', '#F59E0B'] });
        playChime('success');
      } else {
        playChime('tap');
      }

      return {
        ...prev,
        c: {
          ...prev.c,
          [key]: { ...course, d: newD },
        },
      };
    });
  };

  const handleDeleteCourse = (key: string) => {
    if (window.confirm('Ma hubtaa inaad tirtirto koorsadan?')) {
      onUpdateGlobalState((prev) => {
        const next = { ...prev.c };
        delete next[key];
        return { ...prev, c: next };
      });
      playChime('tap');
    }
  };

  // ==========================================
  // BUDGET & TRANSACTIONS (Xisaabaadka)
  // ==========================================
  const [txAmount, setTxAmount] = useState('');
  const [txNote, setTxNote] = useState('');

  const handleAddTx = (type: 'in' | 'out') => {
    const amt = parseFloat(txAmount);
    if (!(amt > 0)) return;
    const desc = txNote.trim() || (type === 'in' ? 'Dakhli' : 'Kharash');

    onUpdateDayRecord((prev) => ({
      ...prev,
      tx: [...prev.tx, { a: amt, n: desc, t: type }],
    }));

    setTxAmount('');
    setTxNote('');
    playChime('tap');
  };

  const handleDeleteTx = (index: number) => {
    onUpdateDayRecord((prev) => ({
      ...prev,
      tx: prev.tx.filter((_, i) => i !== index),
    }));
    playChime('tap');
  };

  const totalIn = dayRecord.tx.filter((t) => t.t === 'in').reduce((s, t) => s + t.a, 0);
  const totalOut = dayRecord.tx.filter((t) => t.t === 'out').reduce((s, t) => s + t.a, 0);
  const netBalance = totalIn - totalOut;

  // ==========================================
  // MONTHLY GOALS (Yoolalka Bisha)
  // ==========================================
  const [newMonthlyGoal, setNewMonthlyGoal] = useState('');
  const handleAddMonthlyGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMonthlyGoal.trim()) return;
    onUpdateGlobalState((prev) => ({
      ...prev,
      mg: [...prev.mg, { t: newMonthlyGoal.trim(), d: false }],
    }));
    setNewMonthlyGoal('');
    playChime('tap');
  };

  const handleToggleMonthlyGoal = (index: number) => {
    onUpdateGlobalState((prev) => {
      const updated = [...prev.mg];
      updated[index] = { ...updated[index], d: !updated[index].d };
      return { ...prev, mg: updated };
    });
    playChime('tap');
  };

  const handleDeleteMonthlyGoal = (index: number) => {
    onUpdateGlobalState((prev) => ({
      ...prev,
      mg: prev.mg.filter((_, i) => i !== index),
    }));
    playChime('tap');
  };

  // ==========================================
  // SETTINGS & BACKUP
  // ==========================================
  const [backupMessage, setBackupMessage] = useState<string | null>(null);
  const [twoStepConfirm, setTwoStepConfirm] = useState<'reset' | null>(null);

  const handleExportData = () => {
    try {
      const allData: Record<string, any> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(P)) {
          allData[k] = localStorage.getItem(k);
        }
      }
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `kormye_backup_${todayDate}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setBackupMessage('✅ Xogtaada si guul leh ayaa loo soo degsaday.');
    } catch {
      setBackupMessage('Khalad ayaa dhacay markii xogta la soo degsanayay.');
    }
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (typeof json === 'object') {
          Object.keys(json).forEach((k) => {
            if (k.startsWith(P)) {
              localStorage.setItem(k, json[k]);
            }
          });
          setBackupMessage('✅ Xogta si guul leh ayaa loo soo celiyay. Bogga dib u cusboonaysii.');
          setTimeout(() => window.location.reload(), 1500);
        }
      } catch {
        setBackupMessage('Faylka lama aqoonsan karin ama waa mid khaldan.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (twoStepConfirm !== 'reset') {
      setTwoStepConfirm('reset');
      return;
    }

    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(P)) keysToRemove.push(k);
    }
    keysToRemove.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {}
    });

    onUpdateConfig(() => getDefaultConfig());
    applyThemeMode('auto');
    setTwoStepConfirm(null);
    setBackupMessage('Dhammaan xogtii waa la tirtiray nidaamkiina dib baa loo dajiyay.');
    setTimeout(() => window.location.reload(), 1000);
  };

  const activeUser = globalState.profile;
  const totalTasks = config.plan?.length || 0;
  const checkedTasks = config.plan ? config.plan.filter((p) => isItemCompleted(p, dayRecord)).length : 0;

  return (
    <div className="space-y-4 text-[#0F172A] pb-10">
      {/* Sub-Navigation Tabs */}
      <div className="bg-[#DCE8DF] border border-[#064E3B]/15 flex items-center gap-1.5 p-1.5 rounded-2xl overflow-x-auto scrollbar-none shadow-sm">
        <button
          onClick={() => setSubSection('profile')}
          className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
            subSection === 'profile'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/75 hover:text-[#0F172A] hover:bg-[#D0DFD4]'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>👤 Profile & Koorsooyin</span>
        </button>
        <button
          onClick={() => setSubSection('xisaab')}
          className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
            subSection === 'xisaab'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/75 hover:text-[#0F172A] hover:bg-[#D0DFD4]'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>📊 Xisaabaad & Qorshe</span>
        </button>
        <button
          onClick={() => setSubSection('habayn')}
          className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition flex items-center gap-1.5 ${
            subSection === 'habayn'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/75 hover:text-[#0F172A] hover:bg-[#D0DFD4]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>⚙️ Dejinta Nidaamka</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SUB-SECTION 1: PROFILE & DYNAMIC COURSES */}
      {/* ======================================================== */}
      {subSection === 'profile' && (
        <div className="space-y-4">
          {/* 1. INSTAGRAM-STYLE PROFILE CARD */}
          <div className="bg-[#DCE8DF] border border-[#064E3B]/15 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* Instagram-style Story Ring Avatar */}
              <div className="relative shrink-0">
                <div className="p-[3.5px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-emerald-600 shadow-md">
                  <div className="w-20 h-20 rounded-full bg-[#E5EFE7] border-2 border-white flex items-center justify-center text-4xl shadow-inner overflow-hidden">
                    {activeUser.photoUrl ? (
                      <img src={activeUser.photoUrl} alt={activeUser.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{activeUser.avatar || '⭐'}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* User Identity & Stats Counters */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h2 className="font-serif font-black text-xl text-[#0F172A]">
                        {activeUser.name}
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-[#064E3B] text-white text-[10px] font-bold uppercase tracking-wider">
                        {activeUser.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569] mt-0.5 max-w-md">
                      {activeUser.bio || 'Nolosha wanaagsan waa joogtayn iyo qorshe suubban.'}
                    </p>
                  </div>

                  {/* Profile Actions */}
                  <div className="flex items-center justify-center gap-2 pt-1 sm:pt-0">
                    {onOpenAuthModal && (
                      <button
                        type="button"
                        onClick={onOpenAuthModal}
                        className="px-3.5 py-1.5 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] border border-[#064E3B]/20 text-[#064E3B] text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Beddel Profile</span>
                      </button>
                    )}
                    {onOpenProfiles && (
                      <button
                        type="button"
                        onClick={onOpenProfiles}
                        className="px-3.5 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#047857] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Beddel Qofka</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Instagram-style Follower/Stats Counters */}
                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[#064E3B]/10 text-center">
                  <div className="p-2 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
                    <span className="text-sm sm:text-base font-black text-[#064E3B] block font-mono">
                      {checkedTasks} <span className="text-[10px] text-[#475569]">/{totalTasks}</span>
                    </span>
                    <span className="text-[10px] font-bold text-[#475569] uppercase">Hawlo</span>
                  </div>
                  <div className="p-2 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
                    <span className="text-sm sm:text-base font-black text-[#064E3B] block font-mono">
                      {globalState.q} <span className="text-[10px] text-[#475569]">/604</span>
                    </span>
                    <span className="text-[10px] font-bold text-[#475569] uppercase">Quraan</span>
                  </div>
                  <div className="p-2 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
                    <span className="text-sm sm:text-base font-black text-[#064E3B] block font-mono">
                      {courseKeys.length}
                    </span>
                    <span className="text-[10px] font-bold text-[#475569] uppercase">Koorso</span>
                  </div>
                  <div className="p-2 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
                    <span className="text-sm sm:text-base font-black text-[#064E3B] block font-mono">
                      {globalState.mg?.filter((g) => g.d).length || 0}
                    </span>
                    <span className="text-[10px] font-bold text-[#475569] uppercase">Yoolal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram-style Story Highlights Bubbles */}
            <div className="pt-2 border-t border-[#064E3B]/10">
              <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block mb-2 text-center sm:text-left">
                Xarumahaaga Degdegga ah (Highlights):
              </span>
              <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none justify-center sm:justify-start">
                {[
                  { icon: '📖', label: 'Kitaab', tab: 'p3' },
                  { icon: '📿', label: 'Tasbiix', tab: 'p7' },
                  { icon: '📚', label: 'Akhris', tab: 'p9' },
                  { icon: '🏠', label: 'Maanta', tab: 'p1' },
                ].map((hl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onNavigateTab && onNavigateTab(hl.tab)}
                    className="flex flex-col items-center gap-1 group shrink-0"
                  >
                    <div className="w-13 h-13 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-600 group-hover:scale-105 transition-transform">
                      <div className="w-full h-full rounded-full bg-[#E5EFE7] border-2 border-white flex items-center justify-center text-lg">
                        {hl.icon}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#0F172A]">{hl.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. DYNAMIC COURSES & SKILLS SECTION */}
          <div className="bg-[#DCE8DF] border border-[#064E3B]/15 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#064E3B]" />
                <h3 className="font-serif font-black text-sm sm:text-base text-[#0F172A]">
                  Horumarka Koorsooyinka & Xirfadaha
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddCourse(!showAddCourse)}
                className="px-3 py-1.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#047857] transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ku dar Koorso</span>
              </button>
            </div>

            <p className="text-xs text-[#475569] font-medium">
              Xor u noqo inaad ku darsato koorso kasta ama xirfad aad baranayso, oo aad talaabo-talaabo u raacdo casharradaada.
            </p>

            {/* Add Course Form */}
            {showAddCourse && (
              <form onSubmit={handleAddCourse} className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/20 space-y-2.5 animate-in fade-in duration-200">
                <h4 className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ku dar Koorso / Xirfad Cusub:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <input
                    type="text"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    placeholder="Magaca koorsada (tusaale: Ingiriisi, Programming, Maamul)..."
                    className="sm:col-span-8 px-3.5 py-2 rounded-xl bg-[#DCE8DF] border border-[#064E3B]/20 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                  />
                  <input
                    type="number"
                    min="1"
                    value={newCourseTotal}
                    onChange={(e) => setNewCourseTotal(e.target.value)}
                    placeholder="Wadarta casharrada"
                    className="sm:col-span-4 px-3 py-2 rounded-xl bg-[#DCE8DF] border border-[#064E3B]/20 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCourse(false)}
                    className="px-3 py-1.5 rounded-xl bg-[#DCE8DF] text-xs font-bold text-[#475569]"
                  >
                    Ka Noqo
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold hover:bg-[#047857]"
                  >
                    Keydi Koorsada
                  </button>
                </div>
              </form>
            )}

            {/* Courses List */}
            {courseKeys.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#E5EFE7] border border-dashed border-[#064E3B]/25 text-center space-y-2">
                <GraduationCap className="w-8 h-8 text-[#064E3B]/40 mx-auto" />
                <p className="text-xs font-semibold text-[#0F172A]">
                  Weli koorsooyin laguma darin.
                </p>
                <p className="text-[11px] text-[#475569] max-w-xs mx-auto">
                  Guji badhanka kore ee <b>"+ Ku dar Koorso"</b> si aad u bilowdo xisaabinta casharradaada.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {courseKeys.map((key) => {
                  const course = courses[key];
                  const percent = Math.min(100, Math.round((course.d / (course.t || 1)) * 100));

                  return (
                    <div
                      key={key}
                      className="p-4 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/15 space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <h4 className="text-xs font-black text-[#0F172A] truncate">
                            {course.n}
                          </h4>
                          <span className="text-[10px] text-[#475569] font-medium">
                            {course.d} / {course.t} cashar ({percent}%)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteCourse(key)}
                          className="p-1 rounded-lg hover:bg-rose-100 text-rose-500 transition"
                          title="Tirtir koorsadan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-[#DCE8DF] h-2 rounded-full overflow-hidden border border-[#064E3B]/10">
                        <div
                          className="bg-gradient-to-r from-[#064E3B] to-[#10B981] h-full rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      {/* Action Steppers */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleCourseStep(key, -1)}
                            disabled={course.d <= 0}
                            className="p-1.5 rounded-lg bg-[#DCE8DF] hover:bg-[#D0DFD4] disabled:opacity-30 border border-[#064E3B]/15 text-[#0F172A]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCourseStep(key, 1)}
                            disabled={course.d >= course.t}
                            className="px-3 py-1.5 rounded-lg bg-[#064E3B] text-white hover:bg-[#047857] disabled:opacity-40 text-xs font-bold flex items-center gap-1 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+1 Cashar</span>
                          </button>
                        </div>

                        {percent >= 100 && (
                          <span className="text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Waa Dhammaatay!</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. QUICK LINK TO ATHKAAR & TASBIIX */}
          {onNavigateTab && (
            <div className="p-4 rounded-3xl bg-gradient-to-r from-[#064E3B] to-[#047857] text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-xl">
                  📿
                </div>
                <div>
                  <h4 className="text-xs font-bold">Tasbiixda & Ducooyinka Nabiga ﷺ</h4>
                  <p className="text-[11px] text-white/80">
                    Athkaarta subaxdii, galabtii iyo xuska Eebbe
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('p7')}
                className="px-3.5 py-2 rounded-xl bg-white text-[#064E3B] text-xs font-bold hover:bg-[#E5F0E8] transition shadow-sm shrink-0"
              >
                Fur Hada
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-SECTION 2: BUDGET & MONTHLY GOALS */}
      {/* ======================================================== */}
      {subSection === 'xisaab' && (
        <div className="space-y-4">
          {/* BUDGET SUMMARY CARD */}
          <div className="bg-[#DCE8DF] border border-[#064E3B]/15 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#064E3B]" />
                <h3 className="font-serif font-black text-sm sm:text-base text-[#0F172A]">
                  Xisaabaadka & Dhaqaalaha Maanta
                </h3>
              </div>
              <span
                className={`text-xs font-bold font-mono px-3 py-1 rounded-xl ${
                  netBalance >= 0 ? 'bg-[#10B981]/20 text-[#064E3B]' : 'bg-rose-100 text-rose-700'
                }`}
              >
                Haraaga: {netBalance >= 0 ? `+$${netBalance.toFixed(2)}` : `-$${Math.abs(netBalance).toFixed(2)}`}
              </span>
            </div>

            {/* In / Out Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
                <span className="text-[10px] font-bold text-[#475569] uppercase block">Dakhli Soo Galay</span>
                <span className="text-sm sm:text-base font-black text-emerald-700 font-mono">
                  +${totalIn.toFixed(2)}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
                <span className="text-[10px] font-bold text-[#475569] uppercase block">Kharash Baxay</span>
                <span className="text-sm sm:text-base font-black text-rose-700 font-mono">
                  -${totalOut.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Add Transaction Input */}
            <div className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/15 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  placeholder="Cadadka ($)"
                  className="sm:col-span-4 px-3 py-2 rounded-xl bg-[#DCE8DF] border border-[#064E3B]/20 text-xs font-mono font-bold"
                />
                <input
                  type="text"
                  value={txNote}
                  onChange={(e) => setTxNote(e.target.value)}
                  placeholder="Faahfaahin (tusaale: Iib, Qado, Shidaal)..."
                  className="sm:col-span-8 px-3 py-2 rounded-xl bg-[#DCE8DF] border border-[#064E3B]/20 text-xs font-medium"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleAddTx('in')}
                  className="flex-1 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ku dar Dakhli (+)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddTx('out')}
                  className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition flex items-center justify-center gap-1"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>Ku dar Kharash (-)</span>
                </button>
              </div>
            </div>

            {/* Transactions List */}
            {dayRecord.tx.length > 0 && (
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {dayRecord.tx.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/10 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={item.t === 'in' ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                        {item.t === 'in' ? '▲' : '▼'}
                      </span>
                      <span className="font-semibold text-[#0F172A] truncate">{item.n}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`font-mono font-bold ${item.t === 'in' ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {item.t === 'in' ? `+$${item.a.toFixed(2)}` : `-$${item.a.toFixed(2)}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteTx(idx)}
                        className="p-1 rounded-lg hover:bg-rose-100 text-rose-500 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MONTHLY GOALS */}
          <div className="bg-[#DCE8DF] border border-[#064E3B]/15 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-black text-sm sm:text-base text-[#0F172A]">
              🎯 Yoolalka & Hadafyada Bisha
            </h3>

            <form onSubmit={handleAddMonthlyGoal} className="flex gap-2">
              <input
                type="text"
                value={newMonthlyGoal}
                onChange={(e) => setNewMonthlyGoal(e.target.value)}
                placeholder="Ku dar hadaf cusub bishan..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/15 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#10B981]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#064E3B] text-white text-xs font-bold hover:bg-[#047857] transition shrink-0"
              >
                Ku dar
              </button>
            </form>

            <div className="space-y-1.5">
              {globalState.mg?.map((goal, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/10 text-xs"
                >
                  <button
                    type="button"
                    onClick={() => handleToggleMonthlyGoal(idx)}
                    className="flex items-center gap-2 text-left truncate flex-1"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        goal.d ? 'text-[#10B981]' : 'text-[#475569]/40'
                      }`}
                    />
                    <span className={`truncate font-medium ${goal.d ? 'line-through text-[#475569]' : 'text-[#0F172A]'}`}>
                      {goal.t}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteMonthlyGoal(idx)}
                    className="p-1 rounded-lg hover:bg-rose-100 text-rose-500 transition shrink-0 ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUB-SECTION 3: SETTINGS & BACKUP */}
      {/* ======================================================== */}
      {subSection === 'habayn' && (
        <div className="space-y-4">
          {/* GENERAL PREFERENCES */}
          <div className="bg-[#DCE8DF] border border-[#064E3B]/15 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-black text-sm sm:text-base text-[#0F172A]">
              ⚙️ Habaynta Guud ee App-ka
            </h3>

            {/* 12h / 24h Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
              <div>
                <span className="text-xs font-bold text-[#0F172A] block">Qaabka Saacadda (12h / 24h)</span>
                <span className="text-[10px] text-[#475569]">
                  {config.h12 ? 'Hadda: 12-Saac (AM / PM)' : 'Hadda: 24-Saac (00:00 - 23:59)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onUpdateConfig((prev) => ({ ...prev, h12: !prev.h12 }))}
                className="px-3 py-1.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold"
              >
                Beddel
              </button>
            </div>

            {/* Notification Reminders */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
              <div>
                <span className="text-xs font-bold text-[#0F172A] block">Xusuusiyeyaasha Maalinlaha ah</span>
                <span className="text-[10px] text-[#475569]">
                  Fariimaha biyaha, akhriska iyo salaadaha
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenReminders}
                className="px-3 py-1.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold"
              >
                Maamul
              </button>
            </div>

            {/* Theme Selector */}
            <div className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10 space-y-2">
              <span className="text-xs font-bold text-[#0F172A] block">Muuqaalka (Theme)</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'auto', label: '📱 Qalabka' },
                  { id: 'light', label: '☀️ Nalka' },
                  { id: 'dark', label: '🌙 Habeen' },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => {
                      onUpdateConfig((prev) => ({ ...prev, theme: th.id as any }));
                      applyThemeMode(th.id as any);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      config.theme === th.id
                        ? 'bg-[#064E3B] text-white border-[#064E3B]'
                        : 'bg-[#DCE8DF] text-[#0F172A] border-[#064E3B]/15 hover:bg-[#D0DFD4]'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* BACKUP & RESTORE */}
          <div className="bg-[#DCE8DF] border border-[#064E3B]/15 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-black text-sm sm:text-base text-[#0F172A]">
              💾 Keydinta & Soo Celinta Xogta
            </h3>

            {backupMessage && (
              <div className="p-3 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/30 text-xs text-[#064E3B] font-semibold">
                {backupMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleExportData}
                className="p-3 rounded-2xl bg-[#E5EFE7] hover:bg-[#D0DFD4] border border-[#064E3B]/15 text-xs font-bold text-[#064E3B] flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4" />
                <span>Soo Degso Xogta (Export JSON)</span>
              </button>

              <label className="p-3 rounded-2xl bg-[#E5EFE7] hover:bg-[#D0DFD4] border border-[#064E3B]/15 text-xs font-bold text-[#064E3B] flex items-center justify-center gap-2 transition cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Soo Celi Fayl (Import JSON)</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
            </div>

            {/* Reset Everything */}
            <div className="pt-3 border-t border-[#064E3B]/10">
              <button
                type="button"
                onClick={handleResetData}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  twoStepConfirm === 'reset'
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>
                  {twoStepConfirm === 'reset'
                    ? 'Ma hubtaa dhab ahaan? Guji mar kale si aad u tirtirto!'
                    : 'Eber ka dhig Dhammaan Nidaamka (Reset App)'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
