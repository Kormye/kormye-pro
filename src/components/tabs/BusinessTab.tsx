import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Briefcase,
  TrendingUp,
  DollarSign,
  Plus,
  Heart,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  Shuffle,
  Volume2,
  VolumeX,
  Flame,
  Sparkles,
} from 'lucide-react';
import { STO, IDEAS } from '../../data/datasets.ts';
import { BUSINESS_MODULES, BusinessModule } from '../../data/businessCurriculum.ts';
import { DAILY_BUSINESS_STREAM } from '../../data/dailyKnowledgeAndBusiness.ts';
import { UserPost, GlobalState } from '../../types/index.ts';
import { CreatePostModal } from '../CreatePostModal.tsx';
import { playChime } from '../../utils/soundEffects.ts';
import { globalAudioManager } from '../../utils/audioManager.ts';

interface BusinessTabProps {
  globalState?: GlobalState;
  onUpdateGlobalState?: (updater: (prev: GlobalState) => GlobalState) => void;
}

export const BusinessTab: React.FC<BusinessTabProps> = ({
  globalState,
  onUpdateGlobalState,
}) => {
  type SubHub = 'stream100' | 'curriculum' | 'posts' | 'formulas' | 'fikrado' | 'sheekooyin';
  const [subTab, setSubTab] = useState<SubHub>('stream100');

  // ===== 100+ CONTINUOUS DAILY BUSINESS STREAM STATE =====
  const [streamIndex, setStreamIndex] = useState<number>(0);
  const [streamCategory, setStreamCategory] = useState<string>('all');
  const [streamSearch, setStreamSearch] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Filtered Business Stream
  const filteredStream = useMemo(() => {
    return DAILY_BUSINESS_STREAM.filter((item) => {
      const matchCat = streamCategory === 'all' || item.category === streamCategory;
      const matchSearch =
        !streamSearch.trim() ||
        item.title.toLowerCase().includes(streamSearch.toLowerCase()) ||
        item.summary.toLowerCase().includes(streamSearch.toLowerCase()) ||
        item.strategy.toLowerCase().includes(streamSearch.toLowerCase()) ||
        item.goldenRule.toLowerCase().includes(streamSearch.toLowerCase()) ||
        item.actionSteps.some((p: string) => p.toLowerCase().includes(streamSearch.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [streamCategory, streamSearch]);

  const currentStreamItem =
    filteredStream[streamIndex % (filteredStream.length || 1)] || DAILY_BUSINESS_STREAM[0];

  const handleNextStream = () => {
    if (!filteredStream.length) return;
    setStreamIndex((prev) => (prev + 1) % filteredStream.length);
    stopSpeaking();
    playChime('click');
  };

  const handlePrevStream = () => {
    if (!filteredStream.length) return;
    setStreamIndex((prev) => (prev - 1 + filteredStream.length) % filteredStream.length);
    stopSpeaking();
    playChime('click');
  };

  const handleRandomStream = () => {
    if (!filteredStream.length) return;
    const r = Math.floor(Math.random() * filteredStream.length);
    setStreamIndex(r);
    stopSpeaking();
    playChime('click');
  };

  // Text-to-Speech for business
  const handleToggleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    // Stop all conflicting audio
    globalAudioManager.stopAll();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'so-SO';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const [selectedModule, setSelectedModule] = useState<BusinessModule | null>(BUSINESS_MODULES[0]);

  // Post modal state
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Dynamic values for formulas
  const [calcValues, setCalcValues] = useState<Record<string, number>>({
    fx: 1200,
    pr: 25,
    vc: 10,
    c: 15,
    p: 25,
    s: 5000,
    e: 3800,
    arpu: 30,
    margin: 60,
    lifespanMonths: 14,
    cac: 70,
    totalCash: 8000,
    burnRate: 850,
  });

  const updateCalcValue = (key: string, val: number) => {
    setCalcValues((prev) => ({ ...prev, [key]: val }));
  };

  // Calculations
  const breakEvenUnits = useMemo(() => {
    const denom = calcValues.pr - calcValues.vc;
    return denom > 0 ? Math.ceil(calcValues.fx / denom) : 0;
  }, [calcValues.fx, calcValues.pr, calcValues.vc]);

  const customerLTV = useMemo(() => {
    return Math.round(calcValues.arpu * (calcValues.margin / 100) * calcValues.lifespanMonths);
  }, [calcValues.arpu, calcValues.margin, calcValues.lifespanMonths]);

  const ltvCacRatio = useMemo(() => {
    return calcValues.cac > 0 ? (customerLTV / calcValues.cac).toFixed(1) : '0';
  }, [customerLTV, calcValues.cac]);

  const runwayMonths = useMemo(() => {
    return calcValues.burnRate > 0 ? (calcValues.totalCash / calcValues.burnRate).toFixed(1) : '0';
  }, [calcValues.totalCash, calcValues.burnRate]);

  // Business user posts
  const businessPosts = useMemo(() => {
    return (globalState?.posts || []).filter((p) => p.type === 'ganacsi');
  }, [globalState?.posts]);

  const handleAddPost = (newPost: UserPost) => {
    if (onUpdateGlobalState) {
      onUpdateGlobalState((prev) => ({
        ...prev,
        posts: [newPost, ...(prev.posts || [])],
      }));
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    playChime('click');
  };

  return (
    <div className="space-y-4 animate-rise">
      {/* Subtab Navigation (Soft Green #DCE8DF - NO PURE WHITE) */}
      <div className="flex p-1.5 rounded-2xl glass-card overflow-x-auto scrollbar-none gap-1">
        {[
          { id: 'stream100', label: '🔥 100+ Istaraatiijiyad Ganacsi (100/100)' },
          { id: 'curriculum', label: '🎓 Manhaj Heer Caalami' },
          { id: 'posts', label: `💼 Qoraallada (${businessPosts.length})` },
          { id: 'formulas', label: '🧮 Xisaabiyeyaal' },
          { id: 'fikrado', label: '💡 50+ Fikrado' },
          { id: 'sheekooyin', label: '🧭 Sheekooyinka' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSubTab(tab.id as SubHub);
              stopSpeaking();
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              subTab === tab.id
                ? 'bg-[#064E3B] text-white shadow-sm'
                : 'text-[#0F172A]/70 hover:text-[#0F172A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= 0. 100+ CONTINUOUS DAILY BUSINESS STRATEGIES (1-by-1) ================= */}
      {subTab === 'stream100' && (
        <div className="space-y-3.5">
          {/* Filter & Jump Bar */}
          <div className="glass-card p-3 sm:p-4 rounded-3xl space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-serif font-black text-sm sm:text-base text-[#0F172A] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#F59E0B]" />
                  <span>100+ Istaraatiijiyad Ganacsi oo Maalinle ah</span>
                </h3>
                <p className="text-xs text-[#475569] font-medium">
                  U dhuun-dalool mid ba mid dhammaan 100-ka istaraatiijiyadood ee wax ku oolka ah
                </p>
              </div>

              {/* Counter Badge & Jump select */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#064E3B] bg-[#10B981]/20 px-2.5 py-1 rounded-xl border border-[#10B981]/30">
                  {currentStreamItem.id} / 100
                </span>

                <select
                  value={streamIndex}
                  onChange={(e) => {
                    setStreamIndex(Number(e.target.value));
                    stopSpeaking();
                    playChime('click');
                  }}
                  className="text-xs bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2 py-1 font-bold text-[#0F172A] focus:outline-none"
                >
                  {filteredStream.map((item, idx) => (
                    <option key={item.id} value={idx}>
                      #{item.id}: {item.title.slice(0, 24)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {[
                { id: 'all', label: 'Dhammaan (100)' },
                { id: 'Maamulka Lacagta & Cashflow', label: '💵 Lacagta & Cashflow' },
                { id: 'Iibka & Xidhitaanka Heshiisyada', label: '🤝 Iibka & Xidhitaanka' },
                { id: 'Suuq-geynta & Brand-dhiska', label: '📢 Suuq-geynta' },
                { id: 'Qiimaynta & Margin', label: '🏷️ Qiimaynta' },
                { id: 'E-commerce & Ganacsiga Dijitaalka', label: '🛒 E-commerce' },
                { id: 'Joogtaynta Macaamiisha & LTV', label: '🔁 Joogtaynta' },
                { id: 'Ballaadhinta & Scale', label: '📈 Scale & Korriin' },
                { id: 'Gorgortanka & Heshiisyada', label: '📜 Gorgortanka' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setStreamCategory(c.id);
                    setStreamIndex(0);
                    stopSpeaking();
                  }}
                  className={`py-1 px-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    streamCategory === c.id
                      ? 'bg-[#064E3B] text-white shadow-xs'
                      : 'bg-[#E5EFE7] text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#475569] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={streamSearch}
                onChange={(e) => {
                  setStreamSearch(e.target.value);
                  setStreamIndex(0);
                }}
                placeholder="Raadi istaraatiijiyad, macaamiil, dakhli, ama cashflow..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/15 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#10B981]"
              />
            </div>
          </div>

          {/* Current Business Strategy Card */}
          {currentStreamItem && (
            <div className="glass-card p-5 sm:p-6 rounded-3xl space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-[#064E3B]/10 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-md">
                      {currentStreamItem.categoryLabel}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#475569]">
                      Istaraatiijiyad #{currentStreamItem.num}
                    </span>
                  </div>
                  <h2 className="font-serif font-black text-lg sm:text-xl text-[#0F172A] leading-tight">
                    {currentStreamItem.title}
                  </h2>
                </div>

                {/* Voice button */}
                <button
                  onClick={() =>
                    handleToggleSpeak(
                      `${currentStreamItem.title}. ${currentStreamItem.summary}. Istaraatiijiyadda: ${currentStreamItem.strategy}. Sharciga dahabiga ah: ${currentStreamItem.goldenRule}`
                    )
                  }
                  className={`p-2.5 rounded-2xl transition shrink-0 active:scale-95 ${
                    isSpeaking
                      ? 'bg-[#10B981] text-white animate-pulse'
                      : 'bg-[#E5EFE7] text-[#064E3B] hover:bg-[#D0DFD4]'
                  }`}
                  title="Dhageyso Istaraatiijiyadda"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Financial Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#064E3B] bg-[#10B981]/20 px-2.5 py-1 rounded-xl border border-[#10B981]/30">
                  💵 Miisaaniyadda: {currentStreamItem.budgetEst}
                </span>
                <span className="text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/20 px-2.5 py-1 rounded-xl border border-[#F59E0B]/30">
                  📈 Faa'iidada: {currentStreamItem.profitMargin}
                </span>
              </div>

              {/* Summary */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10 text-xs sm:text-sm text-[#0F172A] leading-relaxed font-medium">
                {currentStreamItem.summary}
              </div>

              {/* Strategy Details */}
              <div className="p-3.5 rounded-2xl bg-[#D0DFD4]/50 border border-[#064E3B]/15 text-xs sm:text-sm text-[#0F172A] space-y-1">
                <span className="text-[11px] font-black uppercase text-[#064E3B] block">
                  🚀 Istaraatiijiyadda Hirgelinta:
                </span>
                <p className="font-medium leading-relaxed">{currentStreamItem.strategy}</p>
              </div>

              {/* Action Steps */}
              {currentStreamItem.actionSteps && currentStreamItem.actionSteps.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#064E3B] uppercase tracking-wider block">
                    Tallaabooyinka Fulinta:
                  </span>
                  <div className="space-y-1.5">
                    {currentStreamItem.actionSteps.map((step: string, sIdx: number) => (
                      <div
                        key={sIdx}
                        className="p-2.5 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/10 flex items-start gap-2 text-xs sm:text-sm text-[#0F172A]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#10B981]/25 text-[#064E3B] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Golden Rule */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#10B981]/20 to-[#064E3B]/10 border border-[#10B981]/30 space-y-1">
                <span className="text-xs font-black text-[#064E3B] flex items-center gap-1.5">
                  <span>👑 Sharciga Dahabiga ah ee Ganacsigan:</span>
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0F172A] leading-relaxed">
                  {currentStreamItem.goldenRule}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-[#064E3B]/10 gap-2">
                <button
                  onClick={handlePrevStream}
                  className="px-3.5 py-2 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#0F172A] font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Midkii Hore</span>
                  <span className="sm:hidden">Hore</span>
                </button>

                <button
                  onClick={handleRandomStream}
                  className="px-3 py-2 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#475569] font-bold text-xs flex items-center gap-1 transition active:scale-95"
                  title="Dooro istaraatiijiyad nasiib ah"
                >
                  <Shuffle className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Nasiib</span>
                </button>

                <button
                  onClick={handleNextStream}
                  className="px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#054030] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95"
                >
                  <span>Mid Kale Baro</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 1. INTERNATIONAL CURRICULUM ================= */}
      {subTab === 'curriculum' && (
        <div className="space-y-4">
          {/* Header Hero */}
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-base text-[#0F172A]">
                  Akadeemiyada Ganacsiga ee Heerka Caalami
                </h3>
                <p className="text-xs text-[#475569] font-medium">
                  Manhaj cilmiyeysan: Suuq-geynta casriga ah, maamulka lacagta, startups, iyo hoggaaminta
                </p>
              </div>
              <div className="w-9 h-9 rounded-2xl bg-[#10B981]/20 text-[#064E3B] flex items-center justify-center font-bold">
                <Briefcase className="w-4 h-4 text-[#10B981]" />
              </div>
            </div>

            {/* Modules Selector */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {BUSINESS_MODULES.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className={`p-3 rounded-2xl border text-left transition space-y-1 ${
                    selectedModule?.id === mod.id
                      ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-sm'
                      : 'bg-[#E5EFE7] border-[#064E3B]/10 text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  <div
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      selectedModule?.id === mod.id ? 'text-[#34D399]' : 'text-[#064E3B]'
                    }`}
                  >
                    {mod.categoryLabel}
                  </div>
                  <div className="text-xs font-bold line-clamp-1">
                    {mod.title.split('(')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Module Details */}
          {selectedModule && (
            <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#064E3B]/15">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B] border border-[#10B981]/30">
                    {selectedModule.level}
                  </span>
                  <h3 className="font-serif font-black text-base text-[#0F172A] mt-1">
                    {selectedModule.title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#475569]">
                  ⏱️ {selectedModule.duration}
                </span>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed font-medium">
                {selectedModule.summary}
              </p>

              {/* Lessons breakdown */}
              <div className="space-y-3 pt-2">
                {selectedModule.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10 space-y-2 hover:border-[#10B981]/40 transition"
                  >
                    <h4 className="text-xs font-bold text-[#0F172A]">{lesson.title}</h4>
                    <p className="text-xs text-[#475569] leading-relaxed font-medium">
                      {lesson.description}
                    </p>

                    <div className="p-2.5 rounded-xl bg-[#DCE8DF] border border-[#064E3B]/10 text-[11px] font-mono text-[#064E3B] font-semibold">
                      📐 Nidaamka: {lesson.framework}
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#10B981]/15 border-l-4 border-[#10B981] text-[11px] text-[#064E3B] font-medium">
                      💡 Sharciga Ficiliga ah: {lesson.practicalRule}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 2. USER BUSINESS POSTS ================= */}
      {subTab === 'posts' && (
        <div className="space-y-4">
          <div className="glass-card p-4 rounded-3xl flex items-center justify-between">
            <div>
              <h3 className="font-serif font-black text-sm text-[#0F172A]">
                Qoraallada & Waayo-aragnimada Ganacsiga
              </h3>
              <p className="text-xs text-[#475569] font-medium">
                La wadaag xogta suuqa, qaladaadka laga fogaado, iyo fikradaha ganacsi
              </p>
            </div>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#10B981] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#064E3B]/20 hover:brightness-105 active:scale-95 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Qor Qoraal Ganacsi</span>
            </button>
          </div>

          <div className="space-y-3">
            {businessPosts.length === 0 ? (
              <div className="glass-card p-8 text-center space-y-2 rounded-3xl">
                <Briefcase className="w-8 h-8 text-[#10B981] mx-auto opacity-70" />
                <h4 className="text-sm font-bold text-[#0F172A]">Weli ma jiro qoraal ganacsi oo la daabacay</h4>
                <p className="text-xs text-[#475569] max-w-xs mx-auto">
                  Guji 'Qor Qoraal Ganacsi' si aad ula wadaagto aragtidaada ganacsatada kale!
                </p>
              </div>
            ) : (
              businessPosts.map((post) => (
                <div
                  key={post.id}
                  className="glass-card p-4 sm:p-5 rounded-3xl space-y-3 transition hover:border-[#10B981]/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-lg">
                        {post.authorAvatar || '💼'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0F172A]">{post.authorName}</div>
                        <div className="text-[10px] text-[#475569]">{post.createdAt}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B] border border-[#10B981]/30 capitalize">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="font-serif font-black text-base text-[#0F172A]">{post.title}</h3>

                  <div className="text-xs leading-relaxed text-[#0F172A] whitespace-pre-line font-medium">
                    {post.content}
                  </div>

                  {post.tags && (
                    <div className="flex gap-1.5 flex-wrap pt-1">
                      {post.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#D0DFD4] text-[#064E3B] font-semibold"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-[#064E3B]/15 text-xs text-[#475569]">
                    <button
                      onClick={() => {
                        if (onUpdateGlobalState) {
                          onUpdateGlobalState((prev) => ({
                            ...prev,
                            posts: (prev.posts || []).map((p) =>
                              p.id === post.id ? { ...p, likes: (p.likes || 0) + 1 } : p
                            ),
                          }));
                          playChime('click');
                        }
                      }}
                      className="flex items-center gap-1 hover:text-rose-600 transition font-medium"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                      <span>{post.likes || 1} Jecel</span>
                    </button>

                    <button
                      onClick={() => handleCopy(post.title + '\n\n' + post.content, post.id)}
                      className="hover:text-[#0F172A] transition flex items-center gap-1 font-medium"
                    >
                      {copiedId === post.id ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Nuuxi</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ================= 3. PRACTICAL FINANCIAL CALCULATORS ================= */}
      {subTab === 'formulas' && (
        <div className="space-y-4">
          {/* Break-even Calculator */}
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-sm text-[#0F172A] flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#10B981]" />
                <span>1. Break-Even Analysis (Goorta Ganacsigu Faa'iido Bilaabo)</span>
              </h4>
              <span className="text-xs font-bold text-[#064E3B] bg-[#10B981]/20 px-2.5 py-1 rounded-full border border-[#10B981]/30">
                {breakEvenUnits} Unug
              </span>
            </div>
            <p className="text-xs text-[#475569] font-medium">
              Imisa xabo ama adeeg ayaad u baahan tahay inaad iibiso bishii si aad kharashkaaga oo dhan u bixiso?
            </p>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <div>
                <label className="text-[11px] text-[#475569] font-semibold block mb-1">Kharashka Go'an ($)</label>
                <input
                  type="number"
                  value={calcValues.fx}
                  onChange={(e) => updateCalcValue('fx', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2.5 py-1.5 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#475569] font-semibold block mb-1">Qiimaha Iibka ($)</label>
                <input
                  type="number"
                  value={calcValues.pr}
                  onChange={(e) => updateCalcValue('pr', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2.5 py-1.5 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#475569] font-semibold block mb-1">Kharashka Unugga ($)</label>
                <input
                  type="number"
                  value={calcValues.vc}
                  onChange={(e) => updateCalcValue('vc', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2.5 py-1.5 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>
            </div>
          </div>

          {/* Customer Lifetime Value & CAC Ratio */}
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-sm text-[#0F172A] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
                <span>2. LTV : CAC Ratio (Caafimaadka Korriinka Shirkadda)</span>
              </h4>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                parseFloat(ltvCacRatio) >= 3 ? 'bg-[#10B981]/20 text-[#064E3B] border border-[#10B981]/30' : 'bg-[#F59E0B]/20 text-[#0F172A] border border-[#F59E0B]/30'
              }`}>
                {ltvCacRatio}x (Hadafku waa ≥ 3x)
              </span>
            </div>
            <p className="text-xs text-[#475569] font-medium">
              LTV = ${customerLTV} | CAC = ${calcValues.cac}. Haddii LTV:CAC uu ka sarreeyo 3.0x, shirkaddu waxay haysataa nidaam korriin oo caafimaad qaba.
            </p>

            <div className="grid grid-cols-4 gap-2 pt-1">
              <div>
                <label className="text-[10px] text-[#475569] font-semibold block mb-1">Dakhliga Bille ($)</label>
                <input
                  type="number"
                  value={calcValues.arpu}
                  onChange={(e) => updateCalcValue('arpu', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2 py-1.5 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#475569] font-semibold block mb-1">Margin (%)</label>
                <input
                  type="number"
                  value={calcValues.margin}
                  onChange={(e) => updateCalcValue('margin', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2 py-1.5 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#475569] font-semibold block mb-1">Bilo Joogitaan</label>
                <input
                  type="number"
                  value={calcValues.lifespanMonths}
                  onChange={(e) => updateCalcValue('lifespanMonths', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2 py-1.5 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#475569] font-semibold block mb-1">Kharashka CAC ($)</label>
                <input
                  type="number"
                  value={calcValues.cac}
                  onChange={(e) => updateCalcValue('cac', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2 py-1.5 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>
            </div>
          </div>

          {/* Startup Runway Calculator */}
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-sm text-[#0F172A] flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#10B981]" />
                <span>3. Startup Runway & Burn Rate (Baqaha Lacagta Caddaanka ah)</span>
              </h4>
              <span className="text-xs font-bold text-[#064E3B] bg-[#10B981]/20 px-2.5 py-1 rounded-full border border-[#10B981]/30">
                {runwayMonths} Bilood
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-xs text-[#475569] font-semibold block mb-1">Lacagta Bangiga Ku Jirta ($)</label>
                <input
                  type="number"
                  value={calcValues.totalCash}
                  onChange={(e) => updateCalcValue('totalCash', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>
              <div>
                <label className="text-xs text-[#475569] font-semibold block mb-1">Kharashka Baxaya Bishiiba (Burn Rate $)</label>
                <input
                  type="number"
                  value={calcValues.burnRate}
                  onChange={(e) => updateCalcValue('burnRate', parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. 50+ BUSINESS IDEAS ================= */}
      {subTab === 'fikrado' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {IDEAS.map((idea, idx) => (
              <div
                key={idx}
                className="glass-card p-4 rounded-2xl space-y-2 border border-[#064E3B]/15 hover:border-[#10B981]/30 transition"
              >
                <h4 className="font-serif font-bold text-xs text-[#0F172A]">{idea[0]}</h4>
                <p className="text-xs text-[#475569] leading-relaxed font-medium">{idea[1]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 5. COMPANY STORIES ================= */}
      {subTab === 'sheekooyin' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STO.map((s, idx) => (
              <div
                key={idx}
                className="glass-card p-4 rounded-2xl space-y-2 border border-[#064E3B]/15 hover:border-[#10B981]/30 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B]">
                    {s[2]}
                  </span>
                  <span className="text-[10px] text-[#475569] font-semibold">{s[0]}</span>
                </div>
                <p className="text-xs text-[#0F172A] leading-relaxed font-medium">{s[1]}</p>
                <div className="text-[11px] text-[#064E3B] font-medium pt-1 border-t border-[#064E3B]/10">
                  💡 {s[3]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Business Post Modal */}
      <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        activeProfile={globalState?.profile || {
          id: 'usr_me',
          name: 'Ganacsade',
          avatar: '💼',
          color: '#064E3B',
          role: 'ganacsade',
          bio: '',
          createdAt: '',
        }}
        defaultType="ganacsi"
        onAddPost={handleAddPost}
      />
    </div>
  );
};
