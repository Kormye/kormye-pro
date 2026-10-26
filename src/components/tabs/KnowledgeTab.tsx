import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  Plus,
  Heart,
  MessageSquare,
  Clock,
  Shuffle,
  Flame,
  Briefcase,
  TrendingUp,
  DollarSign,
  Lightbulb,
} from 'lucide-react';
import { WIS2, PEO, WLD, HAD, SAH, IDEAS, STO } from '../../data/datasets.ts';
import { LONG_ARTICLES, getDailyRotatedArticles } from '../../data/longArticles.ts';
import { DAILY_KNOWLEDGE_STREAM, DAILY_BUSINESS_STREAM } from '../../data/dailyKnowledgeAndBusiness.ts';
import { BUSINESS_MODULES } from '../../data/businessCurriculum.ts';
import { DayRecord, GlobalState, UserPost } from '../../types/index.ts';
import { CreatePostModal } from '../CreatePostModal.tsx';
import { playChime } from '../../utils/soundEffects.ts';

interface KnowledgeTabProps {
  dayRecord: DayRecord;
  globalState: GlobalState;
  onUpdateDayRecord: (updater: (prev: DayRecord) => DayRecord) => void;
  onUpdateGlobalState: (updater: (prev: GlobalState) => GlobalState) => void;
}

export const KnowledgeTab: React.FC<KnowledgeTabProps> = ({
  dayRecord,
  globalState,
  onUpdateGlobalState,
}) => {
  type MainHub = 'stream' | 'business' | 'articles' | 'quick' | 'posts';
  const [mainHub, setMainHub] = useState<MainHub>('stream');

  // ===== 100+ CONTINUOUS DAILY KNOWLEDGE STREAM STATE =====
  const [streamIndex, setStreamIndex] = useState<number>(0);
  const [streamCategory, setStreamCategory] = useState<string>('all');
  const [streamSearch, setStreamSearch] = useState<string>('');

  // ===== BUSINESS SUB-HUB STATE =====
  const [bizStreamIndex, setBizStreamIndex] = useState<number>(0);
  const [bizCategory, setBizCategory] = useState<string>('all');
  const [bizSearch, setBizSearch] = useState<string>('');
  const [bizSubSection, setBizSubSection] = useState<'stream' | 'curriculum' | 'ideas'>('stream');

  // Filtered Stream
  const filteredStream = useMemo(() => {
    return DAILY_KNOWLEDGE_STREAM.filter((item) => {
      const matchCat = streamCategory === 'all' || item.category === streamCategory;
      const matchSearch =
        !streamSearch.trim() ||
        item.title.toLowerCase().includes(streamSearch.toLowerCase()) ||
        item.content.toLowerCase().includes(streamSearch.toLowerCase()) ||
        item.practicalAction.toLowerCase().includes(streamSearch.toLowerCase()) ||
        item.keyLesson.toLowerCase().includes(streamSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [streamCategory, streamSearch]);

  const currentStreamItem =
    filteredStream[streamIndex % (filteredStream.length || 1)] || DAILY_KNOWLEDGE_STREAM[0];

  const handleNextStream = () => {
    if (!filteredStream.length) return;
    setStreamIndex((prev) => (prev + 1) % filteredStream.length);
    playChime('click');
  };

  const handlePrevStream = () => {
    if (!filteredStream.length) return;
    setStreamIndex((prev) => (prev - 1 + filteredStream.length) % filteredStream.length);
    playChime('click');
  };

  const handleRandomStream = () => {
    if (!filteredStream.length) return;
    const r = Math.floor(Math.random() * filteredStream.length);
    setStreamIndex(r);
    playChime('click');
  };

  // Filtered Business Stream
  const filteredBizStream = useMemo(() => {
    return DAILY_BUSINESS_STREAM.filter((item) => {
      const matchCat = bizCategory === 'all' || item.category === bizCategory;
      const matchSearch =
        !bizSearch.trim() ||
        item.title.toLowerCase().includes(bizSearch.toLowerCase()) ||
        item.summary.toLowerCase().includes(bizSearch.toLowerCase()) ||
        item.strategy.toLowerCase().includes(bizSearch.toLowerCase()) ||
        item.goldenRule.toLowerCase().includes(bizSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [bizCategory, bizSearch]);

  const currentBizItem =
    filteredBizStream[bizStreamIndex % (filteredBizStream.length || 1)] || DAILY_BUSINESS_STREAM[0];

  const handleNextBizStream = () => {
    if (!filteredBizStream.length) return;
    setBizStreamIndex((prev) => (prev + 1) % filteredBizStream.length);
    playChime('click');
  };

  const handlePrevBizStream = () => {
    if (!filteredBizStream.length) return;
    setBizStreamIndex((prev) => (prev - 1 + filteredBizStream.length) % filteredBizStream.length);
    playChime('click');
  };

  const handleRandomBizStream = () => {
    if (!filteredBizStream.length) return;
    const r = Math.floor(Math.random() * filteredBizStream.length);
    setBizStreamIndex(r);
    playChime('click');
  };

  // Long articles category filter
  const [articleCategory, setArticleCategory] = useState<string>('all');
  const [activeArticleIndex, setActiveArticleIndex] = useState(0);
  const [searchArticle, setSearchArticle] = useState('');

  // User Posts modal
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Daily Rotated 100 Long Articles
  const rotatedArticles = useMemo(() => {
    return getDailyRotatedArticles(dayRecord?.journal?.date);
  }, [dayRecord?.journal?.date]);

  // Filtered long articles
  const filteredArticles = useMemo(() => {
    return rotatedArticles.filter((art) => {
      const matchCat = articleCategory === 'all' || art.category === articleCategory;
      const matchSearch =
        !searchArticle.trim() ||
        art.title.toLowerCase().includes(searchArticle.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchArticle.toLowerCase()) ||
        art.content.some((c) => c.toLowerCase().includes(searchArticle.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [rotatedArticles, articleCategory, searchArticle]);

  const currentArticle = filteredArticles[activeArticleIndex % (filteredArticles.length || 1)] || LONG_ARTICLES[0];

  // Cycling articles
  const handleNextArticle = () => {
    if (!filteredArticles.length) return;
    setActiveArticleIndex((prev) => (prev + 1) % filteredArticles.length);
    playChime('click');
  };

  const handlePrevArticle = () => {
    if (!filteredArticles.length) return;
    setActiveArticleIndex((prev) => (prev - 1 + filteredArticles.length) % filteredArticles.length);
    playChime('click');
  };

  const handleRandomArticle = () => {
    if (!filteredArticles.length) return;
    const r = Math.floor(Math.random() * filteredArticles.length);
    setActiveArticleIndex(r);
    playChime('click');
  };

  // Copy text helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playChime('tap');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle adding a post
  const handleAddPost = (newPost: UserPost) => {
    onUpdateGlobalState((prev) => ({
      ...prev,
      posts: [newPost, ...(prev.posts || [])],
    }));
  };

  const userPosts = (globalState.posts || []).filter((p) => p.type === 'aqoon' || !p.type);

  // Quick Study Subcategories
  type QuickSub = 'xigmad' | 'asxaab' | 'xadiis' | 'dunida' | 'dadka';
  const [quickSub, setQuickSub] = useState<QuickSub>('xigmad');

  const quickDataset = useMemo(() => {
    switch (quickSub) {
      case 'xigmad':
        return { title: 'Xigmadaha & Murtida Nololeed', items: WIS2.slice(0, 8) };
      case 'asxaab':
        return {
          title: 'Saxaabadii Rasuulka ﷺ & Tilmaamahooda',
          items: SAH.map((s) => [s[0], s[1], s[2], s[3] || '']),
        };
      case 'xadiis':
        return {
          title: 'Axaadiis Nabawi ah & Dulucda',
          items: HAD.map((h) => [h[0], h[1], h[2], h[3]]),
        };
      case 'dunida':
        return {
          title: 'Dhacdooyinka & Xaqiiqooyinka Kownka',
          items: WLD.map((w) => [w[0], w[1], w[2], w[3] || '']),
        };
      case 'dadka':
        return {
          title: 'Hoggaamiyeyaashii & Culimadii Dunida',
          items: PEO.map((p) => [p[0], p[1], p[2], p[3] || '']),
        };
      default:
        return { title: 'Xikmado', items: [] };
    }
  }, [quickSub]);

  return (
    <div className="space-y-4 animate-rise">
      {/* Sub-Hub Navigation (Clean 5 buttons, single emoji, concise Somali labels) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1.5 rounded-2xl glass-card">
        <button
          onClick={() => {
            setMainHub('stream');
            playChime('click');
          }}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
            mainHub === 'stream'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>🔥 100 Cashar</span>
        </button>

        <button
          onClick={() => {
            setMainHub('business');
            playChime('click');
          }}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
            mainHub === 'business'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>💼 Ganacsi</span>
        </button>

        <button
          onClick={() => {
            setMainHub('articles');
            playChime('click');
          }}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
            mainHub === 'articles'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>📖 Maqaallo</span>
        </button>

        <button
          onClick={() => {
            setMainHub('quick');
            playChime('click');
          }}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
            mainHub === 'quick'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>⚡ Xikmado</span>
        </button>

        <button
          onClick={() => {
            setMainHub('posts');
            playChime('click');
          }}
          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
            mainHub === 'posts'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>✍️ Bulsho</span>
        </button>
      </div>

      {/* ================= 0. 100+ CONTINUOUS DAILY KNOWLEDGE STREAM (1-by-1) ================= */}
      {mainHub === 'stream' && (
        <div className="space-y-3.5">
          {/* Stream Filter & Quick Jumper Bar */}
          <div className="glass-card p-3 sm:p-4 rounded-3xl space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-serif font-black text-sm sm:text-base text-[#0F172A] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#F59E0B]" />
                  <span>100+ Cashar oo Maalinle ah</span>
                </h3>
                <p className="text-xs text-[#475569] font-medium">
                  Mid ba mid u baro dhammaan 100-ka cashar ee maanta
                </p>
              </div>

              {/* Counter Badge & Jump select */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#064E3B] bg-[#10B981]/20 px-2.5 py-1 rounded-xl border border-[#10B981]/30">
                  Casharka {streamIndex + 1} / {filteredStream.length}
                </span>

                <select
                  value={streamIndex}
                  onChange={(e) => {
                    setStreamIndex(Number(e.target.value));
                    playChime('click');
                  }}
                  className="text-xs bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2 py-1 font-bold text-[#0F172A] focus:outline-none"
                >
                  {filteredStream.map((item, idx) => (
                    <option key={item.id} value={idx}>
                      #{idx + 1}: {item.title.slice(0, 24)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {[
                { id: 'all', label: 'Dhammaan (100)' },
                { id: 'Tiknoolajiyad & AI', label: '🤖 Tiknoolajiyad & AI' },
                { id: 'Cilminafsi & Maskaxda', label: '🧠 Cilminafsi' },
                { id: 'Hoggaamin & Maamul', label: '👑 Hoggaamin' },
                { id: 'Wax-soo-saar & Qorshayn', label: '⚡ Wax-soo-saar' },
                { id: 'Caafimaad & Jir-dhis', label: '💪 Caafimaad' },
                { id: 'Xidhiidhka & Wada-hadalka', label: '💬 Wada-hadal' },
                { id: 'Falsafad & Qoto-dheeri', label: '🏛️ Falsafad' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setStreamCategory(c.id);
                    setStreamIndex(0);
                    playChime('click');
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
                placeholder="Raadi cashar, fikrad, ama eray muhiim ah..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/15 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#10B981]"
              />
            </div>
          </div>

          {/* Current Lesson Big Card */}
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
                      Casharka #{currentStreamItem.num}
                    </span>
                  </div>
                  <h2 className="font-serif font-black text-lg sm:text-xl text-[#0F172A] leading-tight">
                    {currentStreamItem.title}
                  </h2>
                </div>

                {/* Action button */}
                <button
                  onClick={() =>
                    handleCopy(
                      `${currentStreamItem.title}\n\n${currentStreamItem.content}\n\n💡 Casharka: ${currentStreamItem.keyLesson}\n🎯 Tallaabada: ${currentStreamItem.practicalAction}`,
                      currentStreamItem.id
                    )
                  }
                  className="p-2 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#475569] hover:text-[#0F172A] transition active:scale-95"
                  title="Nuuxi Casharka"
                >
                  {copiedId === currentStreamItem.id ? (
                    <Check className="w-4 h-4 text-[#10B981]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Arabic Quote if present */}
              {currentStreamItem.arabicQuote && (
                <div
                  dir="rtl"
                  className="font-arabic text-lg sm:text-xl text-[#064E3B] font-bold text-center py-2 bg-[#E5EFE7] rounded-2xl border border-[#064E3B]/10"
                >
                  {currentStreamItem.arabicQuote}
                </div>
              )}

              {/* Content */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10 text-xs sm:text-sm text-[#0F172A] leading-relaxed font-medium">
                {currentStreamItem.content}
              </div>

              {/* Key Lesson */}
              <div className="p-3.5 rounded-2xl bg-[#D0DFD4]/50 border border-[#064E3B]/15 text-xs sm:text-sm text-[#064E3B] font-semibold space-y-0.5">
                <span className="text-[11px] font-black uppercase tracking-wider block text-[#064E3B]">
                  💡 Casharka Muhiimka ah:
                </span>
                <p className="text-[#0F172A]">{currentStreamItem.keyLesson}</p>
              </div>

              {/* Action Box */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#10B981]/20 to-[#064E3B]/10 border border-[#10B981]/30 space-y-1">
                <span className="text-xs font-black text-[#064E3B] flex items-center gap-1.5">
                  <span>🎯 Tallaabada Dhaqangelinta ee Maanta:</span>
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0F172A] leading-relaxed">
                  {currentStreamItem.practicalAction}
                </p>
              </div>

              {/* Continuous Navigation Controls (Next / Prev / Random) */}
              <div className="flex items-center justify-between pt-3 border-t border-[#064E3B]/10 gap-2">
                <button
                  onClick={handlePrevStream}
                  className="px-3.5 py-2 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#0F172A] font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Casharkii Hore</span>
                  <span className="sm:hidden">Hore</span>
                </button>

                <button
                  onClick={handleRandomStream}
                  className="px-3 py-2 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#475569] font-bold text-xs flex items-center gap-1 transition active:scale-95"
                  title="Dooro cashar nasiib ah"
                >
                  <Shuffle className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Nasiib</span>
                </button>

                <button
                  onClick={handleNextStream}
                  className="px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#054030] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95"
                >
                  <span>Casharka Xiga Baro</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 1. BUSINESS & ENTREPRENEURSHIP HUB ================= */}
      {mainHub === 'business' && (
        <div className="space-y-4">
          {/* Business Section Switcher */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl glass-card">
            <button
              onClick={() => {
                setBizSubSection('stream');
                playChime('click');
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition text-center ${
                bizSubSection === 'stream'
                  ? 'bg-[#064E3B] text-white shadow-xs'
                  : 'text-[#0F172A]/70 hover:text-[#0F172A]'
              }`}
            >
              <span>🔥 100+ Cashar</span>
            </button>
            <button
              onClick={() => {
                setBizSubSection('ideas');
                playChime('click');
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition text-center ${
                bizSubSection === 'ideas'
                  ? 'bg-[#064E3B] text-white shadow-xs'
                  : 'text-[#0F172A]/70 hover:text-[#0F172A]'
              }`}
            >
              <span>💡 Fikrado</span>
            </button>
            <button
              onClick={() => {
                setBizSubSection('curriculum');
                playChime('click');
              }}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition text-center ${
                bizSubSection === 'curriculum'
                  ? 'bg-[#064E3B] text-white shadow-xs'
                  : 'text-[#0F172A]/70 hover:text-[#0F172A]'
              }`}
            >
              <span>📚 Manhaj</span>
            </button>
          </div>

          {/* Sub-Section A: 100+ Daily Business Lessons */}
          {bizSubSection === 'stream' && (
            <div className="space-y-3.5">
              <div className="glass-card p-3 sm:p-4 rounded-3xl space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-serif font-black text-sm sm:text-base text-[#0F172A] flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-[#10B981]" />
                      <span>100+ Cashar Ganacsi & Maalgashi</span>
                    </h3>
                    <p className="text-xs text-[#475569] font-medium">
                      Istaraatiijiyado, suuqgeyn, dakhli-abuur & maamul dhab ah
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-[#475569]">U Gudub:</span>
                    <select
                      value={bizStreamIndex}
                      onChange={(e) => {
                        setBizStreamIndex(Number(e.target.value));
                        playChime('click');
                      }}
                      className="bg-[#E5EFE7] border border-[#064E3B]/20 rounded-xl px-2.5 py-1 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-1 focus:ring-[#10B981] max-w-[140px] truncate"
                    >
                      {filteredBizStream.map((item, idx) => (
                        <option key={item.id} value={idx}>
                          #{item.num}: {item.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
                  {[
                    { id: 'all', label: 'Dhammaan (100)' },
                    { id: 'bilowga', label: 'Bilowga Ganacsiga' },
                    { id: 'suuqgeyn', label: 'Suuqgeynta & Iibka' },
                    { id: 'maareyn', label: 'Maareynta Lacagta' },
                    { id: 'dakhli', label: 'Dakhliga Dadban' },
                    { id: 'farsamo', label: 'Farsamada Casriga ah' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setBizCategory(c.id);
                        setBizStreamIndex(0);
                        playChime('click');
                      }}
                      className={`py-1 px-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                        bizCategory === c.id
                          ? 'bg-[#064E3B] text-white shadow-xs'
                          : 'bg-[#E5EFE7] border border-[#064E3B]/10 text-[#475569] hover:text-[#0F172A]'
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
                    value={bizSearch}
                    onChange={(e) => {
                      setBizSearch(e.target.value);
                      setBizStreamIndex(0);
                    }}
                    placeholder="Raadi xeer, suuqgeyn, ama xirfad ganacsi..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#E5EFE7] border border-[#064E3B]/15 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#10B981]"
                  />
                </div>
              </div>

              {/* Current Lesson Big Card */}
              {currentBizItem && (
                <div className="glass-card p-5 sm:p-6 rounded-3xl space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-[#064E3B]/10 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-md">
                          {currentBizItem.categoryLabel}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#475569]">
                          Casharka #{currentBizItem.num}
                        </span>
                      </div>
                      <h2 className="font-serif font-black text-lg sm:text-xl text-[#0F172A] leading-tight">
                        {currentBizItem.title}
                      </h2>
                    </div>

                    <button
                      onClick={() =>
                        handleCopy(
                          `${currentBizItem.title}\n\n${currentBizItem.summary}\n\n🎯 Istaraatiijiyad: ${currentBizItem.strategy}\n⭐ Xeerka Dahabiga: ${currentBizItem.goldenRule}`,
                          currentBizItem.id
                        )
                      }
                      className="p-2 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#475569] hover:text-[#0F172A] transition active:scale-95"
                      title="Nuuxi Casharka"
                    >
                      {copiedId === currentBizItem.id ? (
                        <Check className="w-4 h-4 text-[#10B981]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10 text-xs sm:text-sm text-[#0F172A] leading-relaxed font-medium">
                    {currentBizItem.summary}
                  </div>

                  {/* Strategy */}
                  <div className="p-3.5 rounded-2xl bg-[#D0DFD4]/50 border border-[#064E3B]/15 text-xs sm:text-sm text-[#064E3B] font-semibold space-y-0.5">
                    <span className="text-[11px] font-black uppercase tracking-wider block text-[#064E3B]">
                      🎯 Istaraatiijiyadda Guusha:
                    </span>
                    <p className="text-[#0F172A]">{currentBizItem.strategy}</p>
                  </div>

                  {/* Golden Rule */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#10B981]/20 to-[#064E3B]/10 border border-[#10B981]/30 space-y-1">
                    <span className="text-xs font-black text-[#064E3B]">
                      ⭐ Xeerka Dahabiga ah:
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#0F172A] leading-relaxed">
                      {currentBizItem.goldenRule}
                    </p>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#064E3B]/10 gap-2">
                    <button
                      onClick={handlePrevBizStream}
                      className="px-3.5 py-2 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#0F172A] font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Hore</span>
                    </button>

                    <button
                      onClick={handleRandomBizStream}
                      className="px-3 py-2 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#475569] font-bold text-xs flex items-center gap-1 transition active:scale-95"
                      title="Dooro cashar nasiib ah"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>Nasiib</span>
                    </button>

                    <button
                      onClick={handleNextBizStream}
                      className="px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#054030] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95"
                    >
                      <span>Casharka Xiga</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sub-Section B: Fikradaha Ganacsiga */}
          {bizSubSection === 'ideas' && (
            <div className="space-y-3">
              <div className="glass-card p-4 rounded-3xl">
                <h3 className="font-serif font-black text-sm text-[#0F172A] flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
                  <span>Fikrado Ganacsi oo Hirgeli Kara</span>
                </h3>
                <p className="text-xs text-[#475569] font-medium mt-0.5">
                  Fikrado ku salaysan baahiyo dhab ah oo suuqa ka jira
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {IDEAS.map((idea, idx) => (
                  <div
                    key={idx}
                    className="glass-card p-4 rounded-3xl space-y-2 border border-[#064E3B]/15 hover:border-[#10B981]/40 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B]">
                        Fikrad #{idx + 1}
                      </span>
                      <span className="text-[11px] font-bold text-[#064E3B]">{idea[2]}</span>
                    </div>
                    <h4 className="font-serif font-black text-sm text-[#0F172A]">{idea[0]}</h4>
                    <p className="text-xs text-[#475569] leading-relaxed font-medium">{idea[1]}</p>
                    {idea[3] && (
                      <p className="text-[11px] text-[#064E3B] font-semibold pt-1 border-t border-[#064E3B]/10">
                        💡 Tallaabada: {idea[3]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Section C: Manhajka Ganacsiga */}
          {bizSubSection === 'curriculum' && (
            <div className="space-y-3">
              <div className="glass-card p-4 rounded-3xl">
                <h3 className="font-serif font-black text-sm text-[#0F172A] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#10B981]" />
                  <span>Manhajka Ganacsiga & Aqoonta Maaliyadda</span>
                </h3>
                <p className="text-xs text-[#475569] font-medium mt-0.5">
                  Cutubyo nidaamsan oo kuu dhisaya fahamka ganacsi ee buuxa
                </p>
              </div>

              <div className="space-y-3">
                {BUSINESS_MODULES.map((mod) => (
                  <div
                    key={mod.id}
                    className="glass-card p-4 sm:p-5 rounded-3xl space-y-3 border border-[#064E3B]/15"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-md">
                          {mod.categoryLabel}
                        </span>
                        <h4 className="font-serif font-black text-base text-[#0F172A] mt-1">
                          {mod.title}
                        </h4>
                        <p className="text-xs text-[#475569] font-medium mt-0.5">{mod.summary}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#475569] bg-[#E5EFE7] px-2 py-1 rounded-xl shrink-0">
                        {mod.duration}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#064E3B]/10">
                      <span className="text-[11px] font-bold text-[#064E3B] block">Casharrada Ku Jira:</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#0F172A]">
                        {mod.lessons.map((lesson, lIdx) => (
                          <li key={lIdx} className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#E5EFE7]">
                            <span className="text-[#10B981] font-bold">•</span>
                            <span className="truncate font-medium">{lesson.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 1. LONG-FORM ARTICLES (40-60+ LINES) ================= */}
      {mainHub === 'articles' && (
        <div className="space-y-4">
          {/* Category Filter Badges */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: 'all', label: 'Dhammaan' },
              { id: 'saxaabada', label: 'Saxaabada ﷺ' },
              { id: 'nabiga', label: 'Noloshii Nabiga ﷺ' },
              { id: 'dunida', label: 'Taariikhda Adduunka' },
              { id: 'saynis', label: 'Sayniska & Kownka' },
              { id: 'nolol', label: 'Horumarka Nolosha' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setArticleCategory(cat.id);
                  setActiveArticleIndex(0);
                  playChime('click');
                }}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  articleCategory === cat.id
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'bg-[#DCE8DF] border border-[#064E3B]/15 text-[#0F172A]/75 hover:text-[#0F172A]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#475569] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchArticle}
              onChange={(e) => {
                setSearchArticle(e.target.value);
                setActiveArticleIndex(0);
              }}
              placeholder="Raadi mowduuc, saxaabi, ama eray muhiim ah..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#DCE8DF] border border-[#064E3B]/15 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder:text-[#64748B]"
            />
          </div>

          {/* Quick Dropdown Selector for 100 Articles */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#064E3B] whitespace-nowrap">Dooro Cashar:</span>
            <select
              value={activeArticleIndex}
              onChange={(e) => {
                setActiveArticleIndex(Number(e.target.value));
                playChime('click');
              }}
              className="flex-1 bg-[#DCE8DF] border border-[#064E3B]/20 rounded-xl px-3 py-2 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981] truncate shadow-xs"
            >
              {filteredArticles.map((art, idx) => (
                <option key={art.id} value={idx}>
                  #{art.num || (idx + 1)}: {art.title} ({art.categoryLabel})
                </option>
              ))}
            </select>
          </div>

          {/* Article Header Card */}
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-4">
            {/* Top Meta Bar */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#10B981]/20 text-[#064E3B] border border-[#10B981]/30">
                {currentArticle.categoryLabel}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#475569] flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                  {currentArticle.readTime}
                </span>
                <span className="text-xs font-mono font-bold bg-[#10B981]/15 text-[#064E3B] px-2.5 py-0.5 rounded-md border border-[#10B981]/25">
                  {activeArticleIndex + 1} / {filteredArticles.length}
                </span>
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="font-serif font-black text-lg sm:text-xl text-[#0F172A] leading-snug">
                {currentArticle.title}
              </h2>
              <p className="text-xs text-[#475569] mt-1 font-medium">
                Qoraaga: <span className="text-[#064E3B] font-bold">{currentArticle.author}</span>
              </p>
            </div>

            {/* Golden Quote Box */}
            {currentArticle.quote && (
              <div className="p-3.5 rounded-2xl bg-[#E5EFE7] border-l-4 border-[#10B981] text-xs font-serif italic text-[#0F172A] leading-relaxed">
                "{currentArticle.quote}"
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-1 border-t border-[#064E3B]/15">
              <span className="text-xs font-semibold text-[#475569]">
                Akhris qoto dheer & waayo-aragnimo
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    handleCopy(
                      currentArticle.title + '\n\n' + currentArticle.content.join('\n\n'),
                      currentArticle.id
                    )
                  }
                  className="p-1.5 rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#D0DFD4] transition"
                  title="Nuuxi qoraalka"
                >
                  {copiedId === currentArticle.id ? (
                    <Check className="w-4 h-4 text-[#10B981]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Main Article Multi-Paragraph Content (40-60 lines) */}
            <div className="space-y-3.5 pt-2 border-t border-[#064E3B]/15 font-sans text-xs sm:text-sm leading-relaxed text-[#0F172A]">
              {currentArticle.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Takeaways Box */}
            <div className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/15 space-y-2 mt-4">
              <h4 className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Casharrada Ugu Muhiimsan ee Laga Bartay:</span>
              </h4>
              <ul className="space-y-1 text-xs text-[#475569]">
                {currentArticle.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#10B981] font-bold">•</span>
                    <span className="text-[#0F172A]">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation buttons: Hore, Nasiib & Xiga */}
            <div className="flex items-center justify-between pt-3 border-t border-[#064E3B]/15 gap-2">
              <button
                onClick={handlePrevArticle}
                className="py-2 px-3 sm:px-3.5 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-xs font-bold text-[#0F172A] border border-[#064E3B]/15 transition flex items-center gap-1 active:scale-95 shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kii Hore</span>
              </button>

              <button
                onClick={handleRandomArticle}
                className="py-2 px-3 sm:px-3.5 rounded-xl bg-[#10B981]/20 hover:bg-[#10B981]/30 text-[#064E3B] text-xs font-bold border border-[#10B981]/30 transition flex items-center gap-1.5 active:scale-95 shadow-xs"
                title="Dooro cashar nasiib ah"
              >
                <Shuffle className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Nasiib</span>
              </button>

              <button
                onClick={handleNextArticle}
                className="py-2 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#10B981] text-white text-xs font-bold shadow-md shadow-[#064E3B]/20 hover:brightness-105 active:scale-95 transition flex items-center gap-1"
              >
                <span>Kii Xiga</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. USER POSTS (QORAALLADA BULSHADA) ================= */}
      {mainHub === 'posts' && (
        <div className="space-y-4">
          {/* Header Action Bar */}
          <div className="glass-card p-4 rounded-3xl flex items-center justify-between">
            <div>
              <h3 className="font-serif font-black text-sm text-[#0F172A]">
                Maqaallada & Fikradaha Aad Qortay
              </h3>
              <p className="text-xs text-[#475569] font-medium">
                La wadaag aqoon, waayo-aragnimo, iyo sheekooyin wax ku ool ah
              </p>
            </div>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#064E3B] to-[#10B981] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#064E3B]/20 hover:brightness-105 active:scale-95 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Qor Maqaal</span>
            </button>
          </div>

          {/* Posts List */}
          <div className="space-y-3">
            {userPosts.length === 0 ? (
              <div className="glass-card p-8 text-center space-y-2 rounded-3xl">
                <BookOpen className="w-8 h-8 text-[#10B981] mx-auto opacity-70" />
                <h4 className="text-sm font-bold text-[#0F172A]">Weli ma jiro maqaal aad soo gelisay</h4>
                <p className="text-xs text-[#475569] max-w-xs mx-auto">
                  Guji badhanka kore ee 'Qor Maqaal' si aad u qorto qoraalkaagii koowaad!
                </p>
              </div>
            ) : (
              userPosts.map((post) => (
                <div
                  key={post.id}
                  className="glass-card p-4 sm:p-5 rounded-3xl space-y-3 transition hover:border-[#10B981]/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-lg">
                        {post.authorAvatar || '⭐'}
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

                  <div className="text-xs leading-relaxed text-[#0F172A] whitespace-pre-line">
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
                        onUpdateGlobalState((prev) => ({
                          ...prev,
                          posts: (prev.posts || []).map((p) =>
                            p.id === post.id ? { ...p, likes: (p.likes || 0) + 1 } : p
                          ),
                        }));
                        playChime('click');
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

      {/* ================= 3. QUICK STUDY CARDS ================= */}
      {mainHub === 'quick' && (
        <div className="space-y-4">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: 'xigmad', label: 'Xigmad & Murti' },
              { id: 'asxaab', label: 'Saxaabada ﷺ' },
              { id: 'xadiis', label: 'Axaadiis' },
              { id: 'dunida', label: 'Saynis & Dunida' },
              { id: 'dadka', label: 'Dadkii Taariikhda' },
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setQuickSub(sub.id as any)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  quickSub === sub.id
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'bg-[#DCE8DF] border border-[#064E3B]/15 text-[#0F172A]/75 hover:text-[#0F172A]'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickDataset.items.map((item, idx) => (
              <div
                key={idx}
                className="glass-card p-3.5 rounded-2xl space-y-2 border border-[#064E3B]/15 hover:border-[#10B981]/40 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B]">
                    {item[0]}
                  </span>
                  <span className="text-[11px] text-[#475569] font-medium">{item[2]}</span>
                </div>
                <p className="font-serif text-xs text-[#0F172A] leading-relaxed italic">
                  "{item[1]}"
                </p>
                {item[3] && (
                  <p className="text-[11px] text-[#064E3B] font-medium pt-1 border-t border-[#064E3B]/10">
                    💡 {item[3]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        activeProfile={globalState.profile}
        defaultType="aqoon"
        onAddPost={handleAddPost}
      />
    </div>
  );
};
