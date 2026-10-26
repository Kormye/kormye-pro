import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Heart,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Trophy,
  Sparkles,
  Search,
  Play,
  Pause,
  Volume2,
  X,
  Check,
  Bookmark,
  Sliders,
  Eye,
  RotateCcw,
  BookMarked,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AYA2 } from '../../data/datasets.ts';
import { DayRecord, GlobalState } from '../../types/index.ts';
import {
  SURAH_LIST_ALL,
  getSurahAudioUrl,
  CompleteSurah,
  QuranVerse,
  fetchCompleteSurahVerses,
} from '../../data/quranData.ts';
import { QURAN_STORIES, QuranStory } from '../../data/quranStoriesData.ts';
import { playChime } from '../../utils/soundEffects.ts';
import { globalAudioManager } from '../../utils/audioManager.ts';

interface QuranTabProps {
  dayRecord: DayRecord;
  globalState: GlobalState;
  onUpdateDayRecord: (updater: (prev: DayRecord) => DayRecord) => void;
  onUpdateGlobalState: (updater: (prev: GlobalState) => GlobalState) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const QuranTab: React.FC<QuranTabProps> = ({
  dayRecord,
  globalState,
  onUpdateDayRecord,
  onUpdateGlobalState,
}) => {
  // Sub-tabs: 'kitaab' (Full eye-comfort Mushaf) | 'stories' (Sheekooyinka Quraanka) | 'surahs' (114 Index) | 'shorts' (Wisdom) | 'khatmo' (604 Pages)
  const [subTab, setSubTab] = useState<'kitaab' | 'stories' | 'surahs' | 'shorts' | 'khatmo'>('kitaab');

  // ===== STORIES STATE =====
  const [selectedStory, setSelectedStory] = useState<QuranStory | null>(null);
  const [storyCategoryFilter, setStoryCategoryFilter] = useState<string>('all');
  const [storySearch, setStorySearch] = useState<string>('');

  // ===== KITAAB MUSHAF READER STATE =====
  const [selectedSurahId, setSelectedSurahId] = useState<number>(1);
  const [surahVerses, setSurahVerses] = useState<QuranVerse[]>([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState<boolean>(false);
  // View Modes: 'mushaf' (continuous pages with clear boundaries) | 'tarjumaad' (ayah & meaning)
  const [viewMode, setViewMode] = useState<'mushaf' | 'tarjumaad'>('mushaf');
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [readingTheme, setReadingTheme] = useState<'dabiici' | 'habeen' | 'dahabi'>('dabiici');
  const [bookmarkedAyah, setBookmarkedAyah] = useState<{ surahId: number; ayahNumber: number } | null>(() => {
    try {
      const saved = localStorage.getItem('kormye_quran_bookmark');
      return saved ? JSON.parse(saved) : { surahId: 1, ayahNumber: 1 };
    } catch {
      return { surahId: 1, ayahNumber: 1 };
    }
  });

  // Audio Recitation via Global Audio Manager
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  // ===== SURAH BROWSER SEARCH =====
  const [surahSearch, setSurahSearch] = useState<string>('');
  const [revelationFilter, setRevelationFilter] = useState<'all' | 'Makki' | 'Madani'>('all');

  // Active surah object
  const currentSurah = useMemo(() => {
    return SURAH_LIST_ALL.find((s) => s.id === selectedSurahId) || SURAH_LIST_ALL[0];
  }, [selectedSurahId]);

  // Subscribe to Global Audio Manager
  useEffect(() => {
    const unsubscribe = globalAudioManager.subscribe((playingSurahId, isPlaying) => {
      setIsPlayingAudio(playingSurahId === selectedSurahId && isPlaying);
    });
    return () => unsubscribe();
  }, [selectedSurahId]);

  // Load verses whenever selectedSurahId changes
  useEffect(() => {
    let isCancelled = false;
    setIsLoadingVerses(true);

    fetchCompleteSurahVerses(selectedSurahId)
      .then((verses) => {
        if (!isCancelled) {
          setSurahVerses(verses);
          setIsLoadingVerses(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setSurahVerses(currentSurah.versesSample || []);
          setIsLoadingVerses(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [selectedSurahId, currentSurah]);

  // Group verses by Mushaf Page
  const pagesInSurah = useMemo(() => {
    const map: Record<number, QuranVerse[]> = {};
    if (!surahVerses || surahVerses.length === 0) return map;

    surahVerses.forEach((verse) => {
      const pageNum = verse.page || currentSurah.page || 1;
      if (!map[pageNum]) map[pageNum] = [];
      map[pageNum].push(verse);
    });
    return map;
  }, [surahVerses, currentSurah]);

  const pageNumbers = useMemo(() => {
    return Object.keys(pagesInSurah).map(Number).sort((a, b) => a - b);
  }, [pagesInSurah]);

  // Handle Audio toggle with instant feedback and clean stop (Damin ama Shid)
  const handleToggleAudio = () => {
    setAudioError(null);
    if (isPlayingAudio || globalAudioManager.isSurahPlaying(selectedSurahId)) {
      globalAudioManager.stopAll();
      setIsPlayingAudio(false);
      playChime('tap');
    } else {
      const audioUrl = getSurahAudioUrl(selectedSurahId);
      setIsPlayingAudio(true);
      globalAudioManager.playSurah(
        selectedSurahId,
        audioUrl,
        () => setIsPlayingAudio(false),
        () => {
          setIsPlayingAudio(false);
          setAudioError('Codka lama soo dejin karo xilligan.');
        }
      ).catch(() => {
        setIsPlayingAudio(false);
      });
    }
  };

  // Save Bookmark
  const handleSaveBookmark = (ayahNumber: number) => {
    const mark = { surahId: selectedSurahId, ayahNumber };
    setBookmarkedAyah(mark);
    try {
      localStorage.setItem('kormye_quran_bookmark', JSON.stringify(mark));
    } catch {}
    playChime('success');
  };

  // Next / Prev Surah
  const handlePrevSurah = () => {
    if (selectedSurahId > 1) {
      setSelectedSurahId(selectedSurahId - 1);
    }
  };

  const handleNextSurah = () => {
    if (selectedSurahId < 114) {
      setSelectedSurahId(selectedSurahId + 1);
    }
  };

  // Filtered Surahs for Browser
  const filteredSurahs = useMemo(() => {
    return SURAH_LIST_ALL.filter((s) => {
      const matchSearch =
        !surahSearch.trim() ||
        s.nameSomali.toLowerCase().includes(surahSearch.toLowerCase()) ||
        s.nameArabic.includes(surahSearch.trim()) ||
        String(s.id) === surahSearch.trim();
      const matchRev = revelationFilter === 'all' || s.revelation === revelationFilter;
      return matchSearch && matchRev;
    });
  }, [surahSearch, revelationFilter]);

  // ===== SHORTS & VERSES =====
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [verseSearch, setVerseSearch] = useState<string>('');
  const [verseIndex, setVerseIndex] = useState<number>(0);

  const topics = useMemo(() => Array.from(new Set(AYA2.map((a) => a[0]))), []);

  const filteredVerses = useMemo(() => {
    return AYA2.filter((ayah) => {
      const matchTopic = topicFilter === 'all' || ayah[0] === topicFilter;
      const matchSearch =
        !verseSearch.trim() ||
        ayah[1].toLowerCase().includes(verseSearch.toLowerCase()) ||
        ayah[2].toLowerCase().includes(verseSearch.toLowerCase()) ||
        ayah[3].toLowerCase().includes(verseSearch.toLowerCase());
      return matchTopic && matchSearch;
    });
  }, [topicFilter, verseSearch]);

  const currentAyah = filteredVerses[verseIndex % (filteredVerses.length || 1)] || AYA2[0];
  const realCurrentIndex = AYA2.indexOf(currentAyah);

  const learnKey = 'a';
  const learnState = globalState.ln[learnKey] || { seen: [], fav: [], done: [], cur: 0 };
  const isFav = (learnState.fav || []).includes(realCurrentIndex);
  const isDone = (learnState.done || []).includes(realCurrentIndex);

  const handleNextVerse = () => {
    if (!filteredVerses.length) return;
    const nextIdx = (verseIndex + 1) % filteredVerses.length;
    setVerseIndex(nextIdx);
    onUpdateGlobalState((prev) => {
      const currentLn = prev.ln[learnKey] || { seen: [], fav: [], done: [], cur: 0 };
      const currentSeen = currentLn.seen || [];
      const newSeen = currentSeen.includes(realCurrentIndex)
        ? currentSeen
        : [...currentSeen, realCurrentIndex];
      return {
        ...prev,
        ln: { ...prev.ln, [learnKey]: { ...currentLn, seen: newSeen, cur: nextIdx } },
      };
    });
    playChime('tap');
  };

  const handleToggleFav = () => {
    onUpdateGlobalState((prev) => {
      const currentLn = prev.ln[learnKey] || { seen: [], fav: [], done: [], cur: 0 };
      const currentFav = currentLn.fav || [];
      const newFav = currentFav.includes(realCurrentIndex)
        ? currentFav.filter((i: number) => i !== realCurrentIndex)
        : [...currentFav, realCurrentIndex];
      return {
        ...prev,
        ln: { ...prev.ln, [learnKey]: { ...currentLn, fav: newFav } },
      };
    });
    playChime('click');
  };

  const handleToggleDone = () => {
    const willBeDone = !isDone;
    onUpdateGlobalState((prev) => {
      const currentLn = prev.ln[learnKey] || { seen: [], fav: [], done: [], cur: 0 };
      const currentDone = currentLn.done || [];
      const newDone = currentDone.includes(realCurrentIndex)
        ? currentDone.filter((i: number) => i !== realCurrentIndex)
        : [...currentDone, realCurrentIndex];
      return {
        ...prev,
        ln: { ...prev.ln, [learnKey]: { ...currentLn, done: newDone } },
      };
    });

    if (willBeDone) {
      playChime('success');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#064E3B', '#10B981', '#F59E0B'],
      });
    } else {
      playChime('tap');
    }
  };

  // Khatmo increment
  const handleAddQuranPages = (delta: number) => {
    const cur = globalState.q;
    const nxt = Math.max(0, Math.min(604, cur + delta));
    onUpdateGlobalState((prev) => ({ ...prev, q: nxt }));
    onUpdateDayRecord((prev) => ({
      ...prev,
      qp: Math.max(0, (prev.qp || 0) + delta),
    }));

    if (nxt === 604) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#064E3B', '#10B981', '#F59E0B'],
      });
      playChime('success');
    } else {
      playChime('tap');
    }
  };

  // Font size classes
  const fontClass =
    fontSize === 'sm'
      ? 'text-lg sm:text-xl leading-loose'
      : fontSize === 'md'
      ? 'text-xl sm:text-2xl leading-[2.4rem]'
      : fontSize === 'lg'
      ? 'text-2xl sm:text-3xl leading-[2.8rem]'
      : 'text-3xl sm:text-4xl leading-[3.4rem]';

  // Theme styling for Mushaf Reader
  const themeCardStyle =
    readingTheme === 'habeen'
      ? 'bg-[#064E3B] text-[#DCE8DF] border-[#10B981]/30 shadow-xl'
      : readingTheme === 'dahabi'
      ? 'bg-[#EDE4D0] text-[#1E293B] border-[#D4AF37]/40 shadow-md'
      : 'bg-[#DCE8DF] text-[#0F172A] border-[#064E3B]/15 shadow-sm';

  const themeAyahBox =
    readingTheme === 'habeen'
      ? 'bg-[#043327] border-[#10B981]/25 text-[#E5F0E8]'
      : readingTheme === 'dahabi'
      ? 'bg-[#F7F2E7] border-[#D4AF37]/30 text-[#1E293B]'
      : 'bg-[#E5EFE7] border-[#064E3B]/15 text-[#0F172A]';

  return (
    <div className="space-y-4 animate-rise">
      {/* ================= SUB-NAVIGATION TABS (Clean, Concise, No Duplicate Icons) ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1.5 rounded-2xl glass-card">
        <button
          onClick={() => {
            setSubTab('kitaab');
            playChime('tap');
          }}
          className={`py-2 px-1 sm:px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
            subTab === 'kitaab'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>📖</span>
          <span className="truncate">Mushaf</span>
        </button>

        <button
          onClick={() => {
            setSubTab('stories');
            playChime('tap');
          }}
          className={`py-2 px-1 sm:px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
            subTab === 'stories'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>📜</span>
          <span className="truncate">Qisooyin</span>
        </button>

        <button
          onClick={() => {
            setSubTab('surahs');
            playChime('tap');
          }}
          className={`py-2 px-1 sm:px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
            subTab === 'surahs'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>📑</span>
          <span className="truncate">114 Suurad</span>
        </button>

        <button
          onClick={() => {
            setSubTab('shorts');
            playChime('tap');
          }}
          className={`py-2 px-1 sm:px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
            subTab === 'shorts'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>🌟</span>
          <span className="truncate">Aayado</span>
        </button>

        <button
          onClick={() => {
            setSubTab('khatmo');
            playChime('tap');
          }}
          className={`col-span-2 sm:col-span-1 py-2 px-1 sm:px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
            subTab === 'khatmo'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>🎯</span>
          <span className="truncate">Khatmo</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. KITAAB MUSHAF READER (INDHA U ROON)                  */}
      {/* ======================================================== */}
      {subTab === 'kitaab' && (
        <div className="space-y-3.5">
          {/* Header Card with Eye-Comfort Controls */}
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#10B981]/20 text-[#064E3B] font-bold flex items-center justify-center text-sm shadow-sm">
                  {currentSurah.id}
                </div>
                <div>
                  <h3 className="font-serif font-black text-base text-[#0F172A] flex items-center gap-2">
                    <span>{currentSurah.nameSomali}</span>
                    <span className="font-arabic text-sm text-[#064E3B]">({currentSurah.nameArabic})</span>
                  </h3>
                  <p className="text-xs text-[#475569] font-medium">
                    Juz {currentSurah.juz} • {currentSurah.totalAyahs} Aayadood • {currentSurah.revelation} • Bogga {currentSurah.page}
                  </p>
                </div>
              </div>

              {/* Recitation Audio Button */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleToggleAudio}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm active:scale-95 ${
                    isPlayingAudio
                      ? 'bg-rose-600 text-white ring-2 ring-rose-400/50 hover:bg-rose-700'
                      : 'bg-[#064E3B] text-white hover:bg-[#054030]'
                  }`}
                  title={isPlayingAudio ? 'Guji si aad u damiso codka' : 'Dhageyso codka Alafasy'}
                >
                  {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingAudio ? 'Damiy Codka' : 'Dhageyso'}</span>
                </button>
              </div>
            </div>

            {audioError && (
              <div className="text-[11px] font-medium text-rose-700 bg-rose-500/10 p-2 rounded-xl">
                {audioError}
              </div>
            )}

            {/* Quick Surah Jump & Next / Prev controls */}
            <div className="grid grid-cols-12 gap-2 pt-1 border-t border-[#064E3B]/10 items-center">
              <button
                onClick={() => {
                  if (isPlayingAudio) globalAudioManager.stopAll();
                  handlePrevSurah();
                }}
                disabled={selectedSurahId <= 1}
                className="col-span-3 h-10 px-2 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] border border-[#064E3B]/15 text-xs font-bold text-[#0F172A] disabled:opacity-35 transition flex items-center justify-center gap-1 active:scale-95 shadow-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="truncate">Hore</span>
              </button>

              <div className="col-span-6">
                <select
                  value={selectedSurahId}
                  onChange={(e) => {
                    if (isPlayingAudio) globalAudioManager.stopAll();
                    setSelectedSurahId(Number(e.target.value));
                  }}
                  className="w-full h-10 bg-[#E5EFE7] border border-[#064E3B]/20 rounded-xl px-2.5 text-xs text-[#0F172A] font-bold focus:outline-none focus:ring-2 focus:ring-[#10B981] truncate shadow-xs"
                >
                  {SURAH_LIST_ALL.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.id}. {s.nameSomali} ({s.nameArabic}) — {s.totalAyahs}a
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  if (isPlayingAudio) globalAudioManager.stopAll();
                  handleNextSurah();
                }}
                disabled={selectedSurahId >= 114}
                className="col-span-3 h-10 px-2 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] border border-[#064E3B]/15 text-xs font-bold text-[#0F172A] disabled:opacity-35 transition flex items-center justify-center gap-1 active:scale-95 shadow-xs"
              >
                <span className="truncate">Xigta</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* View Mode Segmented Tabs: Continuous Mushaf vs Ayah Translation */}
            <div className="p-1 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/15 grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setViewMode('mushaf')}
                className={`py-2 px-1 sm:px-2 rounded-xl font-bold text-[11px] sm:text-xs transition flex items-center justify-center gap-1.5 ${
                  viewMode === 'mushaf'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <span>📜</span>
                <span className="truncate">Bog-Bog (Mushaf Buuxa)</span>
              </button>
              <button
                onClick={() => setViewMode('tarjumaad')}
                className={`py-2 px-1 sm:px-2 rounded-xl font-bold text-[11px] sm:text-xs transition flex items-center justify-center gap-1.5 ${
                  viewMode === 'tarjumaad'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <span>📝</span>
                <span className="truncate">Aayad & Macno</span>
              </button>
            </div>

            {/* Eye-Comfort Toolbar: Font Sizing & Reading Themes */}
            <div className="flex items-center justify-between flex-wrap gap-2.5 pt-1 text-xs">
              {/* Font Sizing Controls */}
              <div className="flex items-center gap-1 bg-[#E5EFE7] p-1 rounded-xl border border-[#064E3B]/15">
                <span className="text-[10px] text-[#475569] font-bold px-1.5 hidden sm:inline">Xarafka:</span>
                {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setFontSize(sz)}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition ${
                      fontSize === sz
                        ? 'bg-[#10B981] text-white shadow-xs'
                        : 'text-[#0F172A] hover:bg-[#D0DFD4]'
                    }`}
                  >
                    {sz === 'sm' ? 'A-' : sz === 'md' ? 'A' : sz === 'lg' ? 'A+' : 'A++'}
                  </button>
                ))}
              </div>

              {/* Eye Comfort Themes */}
              <div className="flex items-center gap-1 bg-[#E5EFE7] p-1 rounded-xl border border-[#064E3B]/15">
                <span className="text-[10px] text-[#475569] font-bold px-1.5 hidden sm:inline">Muuqaalka:</span>
                <button
                  onClick={() => setReadingTheme('dabiici')}
                  title="Cagaar Dabiici"
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                    readingTheme === 'dabiici'
                      ? 'bg-[#064E3B] text-white shadow-xs'
                      : 'text-[#0F172A] hover:bg-[#D0DFD4]'
                  }`}
                >
                  🌿 Dabiici
                </button>
                <button
                  onClick={() => setReadingTheme('habeen')}
                  title="Habeen / Mugdi"
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                    readingTheme === 'habeen'
                      ? 'bg-[#064E3B] text-white shadow-xs'
                      : 'text-[#0F172A] hover:bg-[#D0DFD4]'
                  }`}
                >
                  🌙 Habeen
                </button>
                <button
                  onClick={() => setReadingTheme('dahabi')}
                  title="Dahabi"
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                    readingTheme === 'dahabi'
                      ? 'bg-[#B45309] text-white shadow-xs'
                      : 'text-[#0F172A] hover:bg-[#D0DFD4]'
                  }`}
                >
                  ✨ Dahabi
                </button>
              </div>
            </div>
          </div>

          {/* ================= ACTUAL MUSHAF SACRED CONTAINER ================= */}
          <div className={`rounded-3xl p-5 sm:p-7 border transition-all duration-300 ${themeCardStyle}`}>
            {/* Ornate Mushaf Header */}
            <div className="text-center pb-4 mb-4 border-b border-current/15 relative">
              <div className="inline-block px-4 py-1 rounded-full border border-current/20 text-xs font-bold uppercase tracking-widest mb-1.5 opacity-80">
                سُورَةُ {currentSurah.nameArabic} • {currentSurah.nameSomali}
              </div>
              <div className="text-[11px] opacity-75 font-medium">
                {currentSurah.translation} — {currentSurah.totalAyahs} Aayadood ({currentSurah.revelation}) • Bogagga Mushafka: {pageNumbers.join(', ') || currentSurah.page}
              </div>

              {/* Bismillah for all surahs except At-Tawbah (9) */}
              {currentSurah.id !== 9 && (
                <div
                  dir="rtl"
                  className="font-arabic text-2xl sm:text-3xl text-center py-4 text-[#10B981] font-bold tracking-wide select-none"
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
              )}
            </div>

            {/* Verses Content Loader */}
            {isLoadingVerses ? (
              <div className="py-12 text-center space-y-2">
                <div className="w-8 h-8 mx-auto border-3 border-[#10B981] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs opacity-75 font-medium">Fadlan sug, aayadaha ayaa la soo rarayaa...</p>
              </div>
            ) : surahVerses.length === 0 ? (
              <div className="text-center py-8 text-xs opacity-80 font-medium">
                Aayadaha suuraddan waxaad si toos ah ugu akhrisan kartaa khatmada buugga Quraanka.
              </div>
            ) : viewMode === 'mushaf' ? (
              /* CONTINUOUS MUSHAF READING MODE WITH CLEAR PAGE DEMARCATIONS */
              <div className="space-y-6">
                {pageNumbers.map((pageNum) => {
                  const pageVerses = pagesInSurah[pageNum] || [];

                  return (
                    <div
                      key={pageNum}
                      className="relative pb-6 border-b-2 border-dashed border-[#10B981]/30 last:border-b-0 space-y-3"
                    >
                      {/* Clear Page Break Banner: Exactly where every page starts! */}
                      <div className="flex items-center justify-between bg-[#10B981]/15 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#064E3B] dark:text-[#E5F0E8] border border-[#10B981]/30">
                        <span className="flex items-center gap-1.5">
                          <span>📖 BOGGA {pageNum}</span>
                          <span className="font-normal opacity-80">• Juz {pageVerses[0]?.juz || currentSurah.juz}</span>
                        </span>
                        <span className="text-[11px] font-medium opacity-80">
                          Aayadaha {pageVerses[0]?.number} – {pageVerses[pageVerses.length - 1]?.number} (Bilaabashada Bogga)
                        </span>
                      </div>

                      {/* Continuous Page Ayahs */}
                      <div
                        dir="rtl"
                        className={`font-arabic text-right leading-[2.6rem] text-justify selection:bg-[#10B981]/30 ${fontClass}`}
                        style={{ textJustify: 'inter-word' }}
                      >
                        {pageVerses.map((verse) => {
                          const isBookmarked =
                            bookmarkedAyah?.surahId === selectedSurahId &&
                            bookmarkedAyah?.ayahNumber === verse.number;

                          return (
                            <span key={verse.number} className="inline">
                              <span
                                className={`hover:text-[#10B981] transition cursor-pointer ${
                                  isBookmarked ? 'bg-[#F59E0B]/25 rounded px-1' : ''
                                }`}
                                onClick={() => handleSaveBookmark(verse.number)}
                                title={`Aayadda ${verse.number}: Guji si aad u calaamadayso (Bookmark)`}
                              >
                                {verse.arabic}{' '}
                              </span>
                              {/* Sacred Ayah End Symbol */}
                              <span
                                onClick={() => handleSaveBookmark(verse.number)}
                                className="inline-flex items-center justify-center min-w-[24px] h-[24px] px-1.5 mx-1 rounded-full text-[11px] font-sans font-bold text-[#064E3B] bg-[#10B981]/25 border border-[#064E3B]/30 align-middle select-none cursor-pointer hover:bg-[#10B981]/50 hover:scale-105 transition-all shadow-xs"
                                title={`Aayadda ${verse.number}`}
                              >
                                {verse.number}
                              </span>{' '}
                            </span>
                          );
                        })}
                      </div>

                      {/* Clear Page End Marker */}
                      <div className="text-center pt-2 text-[10px] font-bold opacity-60 text-current">
                        — Dhammaadka Bogga {pageNum} ee Mushafka —
                      </div>
                    </div>
                  );
                })}

                <div className="pt-2 border-t border-current/15 flex items-center justify-between text-xs opacity-75">
                  <span>💡 Taabo aayad kasta si aad u calaamadayso (Bookmark)</span>
                  {bookmarkedAyah?.surahId === selectedSurahId && (
                    <span className="font-bold text-[#F59E0B]">
                      ★ Calaamaddaadu waxay ku taal Aayadda {bookmarkedAyah.ayahNumber}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              /* AYAH-BY-AYAH MODE WITH SOMALI TRANSLATION */
              <div className="space-y-3">
                {surahVerses.map((verse) => {
                  const isBookmarked =
                    bookmarkedAyah?.surahId === selectedSurahId &&
                    bookmarkedAyah?.ayahNumber === verse.number;

                  return (
                    <div
                      key={verse.number}
                      className={`p-4 rounded-2xl border space-y-2.5 transition ${themeAyahBox} ${
                        isBookmarked ? 'ring-2 ring-[#F59E0B]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-[#10B981] flex items-center gap-1">
                          <span>Aayadda {verse.number}</span>
                          <span className="text-[10px] opacity-75 font-normal">
                            (Bogga {verse.page || currentSurah.page})
                          </span>
                          {isBookmarked && (
                            <span className="text-[10px] bg-[#F59E0B]/20 text-[#B45309] px-2 py-0.2 rounded-full">
                              ★ Meesha aad marayso
                            </span>
                          )}
                        </span>

                        <button
                          onClick={() => handleSaveBookmark(verse.number)}
                          className="p-1 rounded-lg text-current/70 hover:text-current hover:bg-current/10 transition"
                          title="Keydi meeshan (Bookmark)"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current text-[#F59E0B]' : ''}`} />
                        </button>
                      </div>

                      <div
                        dir="rtl"
                        className={`font-arabic text-right font-bold text-[#064E3B] dark:text-[#E5F0E8] ${fontClass}`}
                      >
                        {verse.arabic}
                      </div>

                      {verse.somali && (
                        <div className="text-xs sm:text-sm leading-relaxed border-t border-current/10 pt-2 font-medium opacity-90 italic">
                          {verse.somali}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. SHEEKOOYINKA QURAANKA (QISAS AL-QURAN)                */}
      {/* ======================================================== */}
      {subTab === 'stories' && (
        <div className="space-y-4">
          {/* Header Card */}
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-serif font-black text-base text-[#0F172A] flex items-center gap-2">
                  <span>📜</span>
                  <span>Sheekooyinka Quraanka Kariimka</span>
                </h3>
                <p className="text-xs text-[#475569] font-medium">
                  Qisooyin dhab ah oo xikmad, dulqaad, iyo cashirro wax ku ool ah ku siinaya
                </p>
              </div>
              <span className="text-xs font-bold text-[#064E3B] bg-[#10B981]/20 px-2.5 py-1 rounded-full border border-[#10B981]/30">
                {QURAN_STORIES.length} Qisooyin
              </span>
            </div>

            {/* Category Pills & Search */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" />
                <input
                  type="text"
                  placeholder="Raadi qiso (tusaale: Yuusuf, Kahf, Maryam)..."
                  value={storySearch}
                  onChange={(e) => setStorySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl text-xs text-[#0F172A] font-medium focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto scrollbar-none py-1">
                {[
                  { id: 'all', label: 'Dhammaan' },
                  { id: 'iimaan', label: '🏔️ Iimaanka' },
                  { id: 'sabir', label: '👑 Sabirka' },
                  { id: 'xikmad', label: '🌊 Xikmadda' },
                  { id: 'tusaale', label: '🛡️ Tusaalooyinka' },
                  { id: 'duco', label: '🐋 Ducooyinka' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setStoryCategoryFilter(cat.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      storyCategoryFilter === cat.id
                        ? 'bg-[#064E3B] text-white shadow-xs'
                        : 'bg-[#E5EFE7] text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {QURAN_STORIES.filter((st) => {
              const matchCat = storyCategoryFilter === 'all' || st.category === storyCategoryFilter;
              const matchSearch =
                !storySearch.trim() ||
                st.titleSomali.toLowerCase().includes(storySearch.toLowerCase()) ||
                st.surahName.toLowerCase().includes(storySearch.toLowerCase()) ||
                st.summary.toLowerCase().includes(storySearch.toLowerCase());
              return matchCat && matchSearch;
            }).map((story) => (
              <div
                key={story.id}
                className="glass-card p-4 sm:p-5 rounded-3xl space-y-3 hover:shadow-lg transition flex flex-col justify-between border border-[#064E3B]/15 bg-[#DCE8DF]"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-3xl p-2 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">{story.emoji}</span>
                    <span className="text-[10px] font-bold text-[#064E3B] bg-[#10B981]/20 px-2 py-0.5 rounded-full border border-[#10B981]/25">
                      {story.categoryLabel}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif font-black text-base text-[#0F172A]">{story.titleSomali}</h4>
                    <p className="text-xs text-[#064E3B] font-semibold flex items-center gap-1 mt-0.5">
                      <span>Suuradda {story.surahName}</span>
                      <span>•</span>
                      <span>{story.ayatRange}</span>
                    </p>
                  </div>

                  <p className="text-xs text-[#334155] leading-relaxed line-clamp-3">
                    {story.summary}
                  </p>

                  <div className="p-2.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
                    <p className="font-arabic text-right text-xs font-bold text-[#064E3B] line-clamp-1">{story.quranAyahSnippet.ar}</p>
                    <p className="text-[11px] text-[#475569] italic line-clamp-1 mt-0.5">{story.quranAyahSnippet.som}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#064E3B]/10">
                  <span className="text-[11px] font-bold text-[#475569]">
                    {story.lessons.length} Cashirro & Xikmado
                  </span>
                  <button
                    onClick={() => {
                      setSelectedStory(story);
                      playChime('tap');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#054030] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Akhriso Qisada</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Full Interactive Story Reader Modal */}
          {selectedStory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
              <div className="relative w-full max-w-2xl bg-[#DCE8DF] border border-[#064E3B]/20 rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[92vh] overflow-y-auto text-[#0F172A] space-y-4">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#D0DFD4] transition"
                  aria-label="Xidh Qisada"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="space-y-1.5 pr-8">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedStory.emoji}</span>
                    <span className="text-[11px] font-bold text-[#064E3B] bg-[#10B981]/20 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                      {selectedStory.categoryLabel}
                    </span>
                  </div>
                  <h3 className="font-serif font-black text-xl text-[#0F172A]">{selectedStory.titleSomali}</h3>
                  <div className="flex items-center gap-2 text-xs text-[#475569] font-medium flex-wrap">
                    <span className="font-arabic font-bold text-[#064E3B] text-sm">{selectedStory.titleArabic}</span>
                    <span>•</span>
                    <span>Suuradda {selectedStory.surahName} ({selectedStory.ayatRange})</span>
                  </div>
                </div>

                {/* Story Actions */}
                <div className="flex items-center justify-between pt-1 border-t border-[#064E3B]/10">
                  <span className="text-xs font-semibold text-[#475569]">
                    Qiso qoto dheer oo xikmad leh
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${selectedStory.titleSomali}\n${selectedStory.surahName} (${selectedStory.ayatRange})\n\n${selectedStory.summary}\n\n${selectedStory.chapters.map((c) => c.title + ':\n' + c.content).join('\n\n')}\n\nCasharrada:\n${selectedStory.lessons.map((l) => '• ' + l).join('\n')}`
                      );
                      playChime('click');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#064E3B] font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
                  >
                    <span>Nuuxi Qisada</span>
                  </button>
                </div>

                {/* Quranic Ayah Box */}
                <div className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/20 space-y-2">
                  <span className="text-[10px] font-bold text-[#064E3B] uppercase tracking-wider block">Aayadda Qisada:</span>
                  <p dir="rtl" className="font-arabic text-right text-base font-bold text-[#064E3B] leading-loose">
                    {selectedStory.quranAyahSnippet.ar}
                  </p>
                  <p className="text-xs text-[#0F172A] italic leading-relaxed pt-1 border-t border-[#064E3B]/10">
                    "{selectedStory.quranAyahSnippet.som}"
                  </p>
                </div>

                {/* Chapters Narrative */}
                <div className="space-y-3">
                  <h4 className="font-serif font-black text-sm text-[#0F172A] uppercase tracking-wide">Qisada oo Dhammaystiran:</h4>
                  {selectedStory.chapters.map((chap, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10 space-y-1">
                      <h5 className="font-serif font-bold text-xs text-[#064E3B] flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-[#10B981]/20 text-[#064E3B] text-[10px] flex items-center justify-center font-mono font-bold">
                          {idx + 1}
                        </span>
                        <span>{chap.title}</span>
                      </h5>
                      <p className="text-xs text-[#334155] leading-relaxed">
                        {chap.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Lessons Box */}
                <div className="p-3.5 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 space-y-2">
                  <h4 className="font-serif font-black text-xs text-[#064E3B] uppercase tracking-wide flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span>Cashirada & Xikmadaha Nolosha:</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedStory.lessons.map((lesson, idx) => (
                      <li key={idx} className="text-xs text-[#0F172A] flex items-start gap-2">
                        <span className="text-[#10B981] font-bold mt-0.5">•</span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Step */}
                <div className="p-3 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-between gap-2 flex-wrap">
                  <div className="text-xs">
                    <span className="font-bold text-[#B45309] block">💡 Tallaabadaada Maanta:</span>
                    <span className="text-[#0F172A]">{selectedStory.actionStep}</span>
                  </div>
                  <button
                    onClick={() => {
                      playChime('success');
                      confetti({ particleCount: 60, spread: 70, colors: ['#064E3B', '#10B981', '#F59E0B'] });
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#054030] text-white text-xs font-bold transition shadow-xs"
                  >
                    Waan Qabtay! ✨
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. ALL 114 SURAHS BROWSER                                */}
      {/* ======================================================== */}
      {subTab === 'surahs' && (
        <div className="space-y-3.5">
          {/* Search Card */}
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-base text-[#0F172A]">Dhammaan 114-ka Suuradood</h3>
                <p className="text-xs text-[#475569] font-medium">Dooro suurad si aad u akhrido ama u dhageysato</p>
              </div>
              <span className="text-xs font-bold text-[#064E3B] bg-[#10B981]/20 px-2.5 py-1 rounded-full border border-[#10B981]/30">
                {filteredSurahs.length} Suuradood
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#475569] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Raadi magaca suuradda (Soomaali ama Carabi)..."
                value={surahSearch}
                onChange={(e) => setSurahSearch(e.target.value)}
                className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl pl-9 pr-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981] placeholder:text-[#64748B]"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5">
              {(['all', 'Makki', 'Madani'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setRevelationFilter(f)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    revelationFilter === f
                      ? 'bg-[#064E3B] text-white shadow-sm'
                      : 'bg-[#E5EFE7] text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {f === 'all' ? 'Dhammaan (114)' : f === 'Makki' ? '🕋 Makki' : '🕌 Madani'}
                </button>
              ))}
            </div>

            {/* Surah List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 max-h-[60vh] overflow-y-auto pr-1">
              {filteredSurahs.map((surah) => (
                <div
                  key={surah.id}
                  onClick={() => {
                    setSelectedSurahId(surah.id);
                    setSubTab('kitaab');
                    playChime('tap');
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    selectedSurahId === surah.id
                      ? 'bg-[#10B981]/20 border-[#10B981]'
                      : 'bg-[#E5EFE7] border-[#064E3B]/10 hover:border-[#10B981]/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#064E3B]/10 text-[#064E3B] font-bold text-xs flex items-center justify-center font-mono">
                      {surah.id}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#0F172A]">{surah.nameSomali}</div>
                      <div className="text-[10px] text-[#475569] font-medium">
                        {surah.totalAyahs} aayadood • Juz {surah.juz}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-arabic text-sm text-[#064E3B] font-bold">{surah.nameArabic}</div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#DCE8DF] text-[#475569] font-semibold">
                      {surah.revelation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. AAYADAHA MAANTA (Wisdom & Reflection Shorts)          */}
      {/* ======================================================== */}
      {subTab === 'shorts' && (
        <div className="space-y-3.5">
          <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-base text-[#0F172A]">Aayadaha & Tadabburka Maanta</h3>
                <p className="text-xs text-[#475569] font-medium">Akhriso aayadaha xigmadda leh oo ka feker macnahooda</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#064E3B] bg-[#10B981]/20 px-2.5 py-1 rounded-xl">
                {(verseIndex % filteredVerses.length) + 1} / {filteredVerses.length}
              </span>
            </div>

            {/* Topic Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => {
                  setTopicFilter('all');
                  setVerseIndex(0);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  topicFilter === 'all'
                    ? 'bg-[#064E3B] text-white shadow-sm'
                    : 'bg-[#E5EFE7] text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                Dhammaan ({AYA2.length})
              </button>
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTopicFilter(t);
                    setVerseIndex(0);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    topicFilter === t
                      ? 'bg-[#064E3B] text-white shadow-sm'
                      : 'bg-[#E5EFE7] text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Current Ayah Display Card */}
          {currentAyah && (
            <div className="glass-card p-5 sm:p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#064E3B]/10 pb-2">
                <span className="text-xs font-bold text-[#064E3B] bg-[#10B981]/20 px-2.5 py-0.5 rounded-full">
                  {currentAyah[0]}
                </span>
                <span className="text-xs font-serif font-bold text-[#475569]">{currentAyah[2]}</span>
              </div>

              <div
                dir="rtl"
                className="font-arabic text-xl sm:text-2xl text-[#064E3B] leading-relaxed text-right font-bold py-2"
              >
                {currentAyah[1]}
              </div>

              <div className="text-xs sm:text-sm text-[#0F172A] leading-relaxed font-medium bg-[#E5EFE7] p-3 rounded-2xl border border-[#064E3B]/10">
                <span className="font-bold text-[#064E3B] block mb-0.5">Macnaha Af-Soomaaliga:</span>
                {currentAyah[3]}
              </div>

              {currentAyah[4] && (
                <div className="text-xs text-[#475569] leading-relaxed italic bg-[#D0DFD4]/50 p-3 rounded-2xl font-medium">
                  <span className="font-bold text-[#0F172A] block not-italic mb-0.5">💡 Tadabburka & Faa\'iidada:</span>
                  {currentAyah[4]}
                </div>
              )}

              {/* Action Buttons: Fav, Mark Done, Next */}
              <div className="flex items-center justify-between pt-2 border-t border-[#064E3B]/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleFav}
                    className={`p-2 rounded-xl transition ${
                      isFav ? 'bg-rose-500/20 text-rose-500' : 'bg-[#E5EFE7] text-[#475569] hover:text-[#0F172A]'
                    }`}
                    title="Keydi"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                  </button>

                  <button
                    onClick={handleToggleDone}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isDone
                        ? 'bg-[#10B981] text-white shadow-sm'
                        : 'bg-[#E5EFE7] text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Waan Bartay ✓' : 'Calaamadee'}</span>
                  </button>
                </div>

                <button
                  onClick={handleNextVerse}
                  className="px-4 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#054030] text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition"
                >
                  <span>Aayad Kale</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. KHATMO TRACKER (604 Pages)                            */}
      {/* ======================================================== */}
      {subTab === 'khatmo' && (
        <div className="space-y-3.5">
          <div className="glass-card p-5 sm:p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-base text-[#0F172A]">Khatmada Quraanka Kariimka</h3>
                <p className="text-xs text-[#475569] font-medium">
                  Mushafku wuxuu ka kooban yahay 604 bog. Lasoco horumarkaaga maalin kasta.
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center font-bold">
                <Trophy className="w-5 h-5 text-[#F59E0B]" />
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs text-[#475569] font-medium mb-1.5">
                <span>
                  Horumarka:{' '}
                  <b className="text-[#064E3B] font-bold">
                    {Math.round((globalState.q / 604) * 100)}%
                  </b>
                </span>
                <span className="font-bold text-[#0F172A]">
                  {globalState.q} / 604 Bog
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#064E3B]/10 overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#10B981] rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, (globalState.q / 604) * 100)}%` }}
                />
              </div>
            </div>

            {/* Today pages logged */}
            <div className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#475569] block font-medium">Bogagga aad akhriday maanta:</span>
                <span className="font-serif text-lg font-black text-[#064E3B]">
                  +{dayRecord.qp || 0} bog
                </span>
              </div>

              {/* Quick increment buttons (Uniform styling) */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleAddQuranPages(1)}
                  className="px-3 py-1.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold shadow-xs active:scale-95 transition"
                >
                  +1 Bog
                </button>
                <button
                  onClick={() => handleAddQuranPages(5)}
                  className="px-3 py-1.5 rounded-xl bg-[#10B981] text-white text-xs font-bold shadow-xs active:scale-95 transition"
                >
                  +5 Bog
                </button>
                <button
                  onClick={() => handleAddQuranPages(20)}
                  className="px-3 py-1.5 rounded-xl bg-[#064E3B]/15 text-[#064E3B] text-xs font-bold active:scale-95 transition"
                >
                  +Juz (20b)
                </button>
              </div>
            </div>

            {/* Reset button */}
            <div className="flex justify-end pt-1">
              <button
                onClick={() => {
                  if (window.confirm('Ma hubtaa inaad eber ka bilowdo khatmada?')) {
                    onUpdateGlobalState((prev) => ({ ...prev, q: 0 }));
                    playChime('tap');
                  }
                }}
                className="text-xs text-[#475569] hover:text-rose-600 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Eber ka billow Khatmada</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
