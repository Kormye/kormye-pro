import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  CheckCircle2,
  Volume2,
  Play,
  Bookmark,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Loader2,
  Search,
  Target,
  Quote,
} from 'lucide-react';
import { Book, DayRecord, GlobalState } from '../../types/index.ts';
import { addDays, getDayRecord } from '../../utils/storage.ts';
import { startAmbientSound, stopAmbientSound, speakText, playChime } from '../../utils/soundEffects.ts';
import { AiBookSummarizerModal } from '../AiBookSummarizerModal.tsx';
import { generateNextChapterForBook } from '../../utils/bookSummarizer.ts';

interface ReadingTabProps {
  currentDate: string;
  dayRecord: DayRecord;
  globalState: GlobalState;
  profileId?: string;
  onUpdateDayRecord: (updater: (prev: DayRecord) => DayRecord) => void;
  onUpdateGlobalState: (updater: (prev: GlobalState) => GlobalState) => void;
}

export const ReadingTab: React.FC<ReadingTabProps> = ({
  currentDate,
  dayRecord,
  globalState,
  profileId,
  onUpdateDayRecord,
  onUpdateGlobalState,
}) => {
  // Active Reader View
  const [activeReadingBook, setActiveReadingBook] = useState<Book | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  // E-Reader preferences
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark' | 'oled'>('light');
  const [fontSize, setFontSize] = useState<number>(17);
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif'>('sans');
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'waves' | 'breeze'>('none');

  // TTS State
  const [isPlayingTTS, setIsPlayingTTS] = useState<boolean>(false);
  const ttsControllerRef = useRef<{ stop: () => void; pause: () => void; resume: () => void } | null>(null);

  // AI Book Summarizer State
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [initialAiTitle, setInitialAiTitle] = useState<string>('');
  const [quickSearchTitle, setQuickSearchTitle] = useState<string>('');
  const [isGeneratingNextChapter, setIsGeneratingNextChapter] = useState<boolean>(false);

  // Add new book form modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newTotal, setNewTotal] = useState('250');
  const [newCurrent, setNewCurrent] = useState('0');
  const [newCategory, setNewCategory] = useState('Horumar Shakhsi');
  const [newSummary, setNewSummary] = useState('');

  // Total pages read today
  const todayPages = Object.values(dayRecord.rd || {}).reduce((sum, n) => sum + (+n || 0), 0);

  // 7-day average reading (profile isolated)
  let pastSum = 0;
  let daysWithReading = 0;
  for (let k = 0; k < 7; k++) {
    const dStr = addDays(currentDate, -k);
    const dRec = getDayRecord(dStr, profileId);
    const p = Object.values(dRec.rd || {}).reduce((s, n) => s + (+n || 0), 0);
    if (p > 0) {
      pastSum += p;
      daysWithReading++;
    }
  }
  const avgPages = daysWithReading > 0 ? Math.round(pastSum / daysWithReading) : 0;

  // Ambient sound effect
  useEffect(() => {
    startAmbientSound(ambientSound);
    return () => stopAmbientSound();
  }, [ambientSound]);

  // Update current page in a book
  const handleSetBookPage = (book: Book, newPage: number) => {
    const validPage = Math.max(0, Math.min(book.t, newPage));
    const delta = validPage - book.c;

    onUpdateGlobalState((prev) => ({
      ...prev,
      bk: prev.bk.map((b) =>
        b.id === book.id
          ? {
              ...b,
              c: validPage,
              status: validPage >= b.t ? 'dhammaystiray' : 'socda',
              lastReadDate: new Date().toISOString(),
            }
          : b
      ),
    }));

    if (delta > 0) {
      onUpdateDayRecord((prev) => ({
        ...prev,
        rd: {
          ...prev.rd,
          [book.id]: (prev.rd?.[book.id] || 0) + delta,
        },
      }));
    }
  };

  // Add new book (supports adding multiple books)
  const handleAddBook = (e: React.FormEvent, keepOpen: boolean = false) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newBook: Book = {
      id: 'b_' + Date.now(),
      n: newTitle.trim(),
      author: newAuthor.trim() || 'Qoraa la garanayn',
      t: parseInt(newTotal, 10) || 100,
      c: parseInt(newCurrent, 10) || 0,
      category: newCategory,
      summary: newSummary.trim() || undefined,
      chapters: newSummary.trim()
        ? [
            {
              id: 'c_1',
              title: 'Cutubka 1: Hordhac & Dulucda',
              content: newSummary.trim(),
            },
          ]
        : undefined,
      status: 'socda',
    };

    onUpdateGlobalState((prev) => ({
      ...prev,
      bk: [newBook, ...prev.bk],
    }));

    setNewTitle('');
    setNewAuthor('');
    setNewSummary('');
    setNewCurrent('0');
    playChime('success');

    if (!keepOpen) {
      setShowAddModal(false);
    }
  };

  // Delete book with safety cleanup (no window.confirm to avoid iframe blocking)
  const handleDeleteBook = (id: string) => {
    if (activeReadingBook?.id === id) {
      if (isPlayingTTS && ttsControllerRef.current) {
        ttsControllerRef.current.stop();
        setIsPlayingTTS(false);
      }
      setActiveReadingBook(null);
    }
    onUpdateGlobalState((prev) => ({
      ...prev,
      bk: prev.bk.filter((b) => b.id !== id),
    }));
    playChime('click');
  };

  // Save AI generated book to user's library
  const handleSaveAiBook = (newBook: Book, andReadNow: boolean) => {
    onUpdateGlobalState((prev) => ({
      ...prev,
      bk: [newBook, ...prev.bk],
    }));
    playChime('success');
    if (andReadNow) {
      setActiveReadingBook(newBook);
      setActiveChapterIndex(0);
    }
  };

  // Generate & append next chapter for currently opened book
  const handleGenerateAndAppendChapter = async () => {
    if (!activeReadingBook) return;
    setIsGeneratingNextChapter(true);
    try {
      const newChapter = await generateNextChapterForBook(activeReadingBook);
      const updatedChapters = [...(activeReadingBook.chapters || []), newChapter];
      const updatedBook: Book = {
        ...activeReadingBook,
        chapters: updatedChapters,
      };

      onUpdateGlobalState((prev) => ({
        ...prev,
        bk: prev.bk.map((b) => (b.id === activeReadingBook.id ? updatedBook : b)),
      }));

      setActiveReadingBook(updatedBook);
      setActiveChapterIndex(updatedChapters.length - 1);
      playChime('success');
    } catch {
      playChime('tap');
    } finally {
      setIsGeneratingNextChapter(false);
    }
  };

  // Text-To-Speech Toggle
  const toggleTTS = (textToRead: string) => {
    if (isPlayingTTS) {
      if (ttsControllerRef.current) {
        ttsControllerRef.current.stop();
      }
      setIsPlayingTTS(false);
    } else {
      setIsPlayingTTS(true);
      ttsControllerRef.current = speakText(textToRead, () => {
        setIsPlayingTTS(false);
      });
    }
  };

  // Theme styling for Reader View
  const getThemeClasses = () => {
    switch (readerTheme) {
      case 'sepia':
        return 'bg-[#E5F0E8] text-[#0F172A]';
      case 'dark':
        return 'bg-[#064E3B] text-[#E5F0E8]';
      case 'oled':
        return 'bg-[#022C22] text-[#E5F0E8]';
      case 'light':
      default:
        return 'bg-[#DCE8DF] text-[#0F172A]';
    }
  };

  return (
    <div className="space-y-4 animate-rise">
      {/* ================= FULL READER MODAL ================= */}
      {activeReadingBook && (
        <div className={`fixed inset-0 z-50 flex flex-col ${getThemeClasses()} animate-in fade-in duration-200`}>
          {/* Reader Header (Fully Responsive on Mobile & Laptop) */}
          <div className="p-2.5 sm:p-4 border-b border-[#064E3B]/15 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <button
                  onClick={() => {
                    if (isPlayingTTS && ttsControllerRef.current) {
                      ttsControllerRef.current.stop();
                      setIsPlayingTTS(false);
                    }
                    setActiveReadingBook(null);
                  }}
                  className="p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition shrink-0"
                  aria-label="Xidh Akhriska"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif font-black text-xs sm:text-sm truncate">{activeReadingBook.n}</h3>
                  <span className="text-[10px] opacity-75 truncate block">{activeReadingBook.author}</span>
                </div>
              </div>

              {/* Action Buttons: TTS & Delete Book */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    const currentContent =
                      activeReadingBook.chapters?.[activeChapterIndex]?.content ||
                      activeReadingBook.summary ||
                      activeReadingBook.n;
                    toggleTTS(currentContent);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    isPlayingTTS
                      ? 'bg-[#10B981] text-white animate-pulse'
                      : 'bg-[#064E3B] text-white hover:opacity-90'
                  }`}
                  title="Dhageyso cod ahaan (Text to Speech)"
                >
                  {isPlayingTTS ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5" />}
                  <span className="text-[11px] hidden sm:inline">{isPlayingTTS ? 'Jooji' : 'Dhageyso'}</span>
                </button>

                <button
                  onClick={() => handleDeleteBook(activeReadingBook.id)}
                  className="p-1.5 rounded-xl border border-rose-400/40 text-rose-500 hover:bg-rose-500/20 font-bold text-xs flex items-center gap-1 transition"
                  title="Tirtir Buuggan"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  <span className="hidden sm:inline">Tirtir</span>
                </button>
              </div>
            </div>

            {/* Secondary Controls Bar: Ambient Sound & Reader Theme (Never squishes title) */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-black/5 dark:border-white/10 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold opacity-70">Codka:</span>
                <select
                  value={ambientSound}
                  onChange={(e) => setAmbientSound(e.target.value as any)}
                  className="text-[11px] bg-black/5 dark:bg-white/10 border-0 rounded-lg px-2 py-1 focus:outline-none font-medium"
                >
                  <option value="none">🔇 Aamusan</option>
                  <option value="rain">🌧️ Roob</option>
                  <option value="waves">🌊 Biyo</option>
                  <option value="breeze">🍃 Dabayl</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold opacity-70">Muuqaalka:</span>
                <select
                  value={readerTheme}
                  onChange={(e) => setReaderTheme(e.target.value as any)}
                  className="text-[11px] bg-black/5 dark:bg-white/10 border-0 rounded-lg px-2 py-1 focus:outline-none font-medium"
                >
                  <option value="light">🌲 Sage Light</option>
                  <option value="sepia">🍃 Soft Green</option>
                  <option value="dark">🌲 Forest Green</option>
                  <option value="oled">🖤 Deep Emerald</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reader Main Content Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 max-w-2xl mx-auto w-full">
            {/* Quick Chapter Selector Dropdown if multiple chapters */}
            {activeReadingBook.chapters && activeReadingBook.chapters.length > 1 && (
              <div className="mb-4">
                <select
                  value={activeChapterIndex}
                  onChange={(e) => {
                    setActiveChapterIndex(Number(e.target.value));
                    if (isPlayingTTS && ttsControllerRef.current) {
                      ttsControllerRef.current.stop();
                      setIsPlayingTTS(false);
                    }
                  }}
                  className="w-full text-xs font-bold rounded-xl px-3 py-2 bg-black/5 dark:bg-white/10 border-0 focus:outline-none"
                >
                  {activeReadingBook.chapters.map((chap, idx) => (
                    <option key={chap.id} value={idx}>
                      Cutubka {idx + 1}: {chap.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Chapter header */}
            {activeReadingBook.chapters && activeReadingBook.chapters[activeChapterIndex] && (
              <div className="mb-6 pb-3 border-b border-black/10 dark:border-white/10">
                <span className="text-[11px] uppercase tracking-wider opacity-85 font-bold text-[#10B981]">
                  Cutubka {activeChapterIndex + 1} ee {activeReadingBook.chapters.length}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-black mt-1">
                  {activeReadingBook.chapters[activeChapterIndex].title}
                </h2>
              </div>
            )}

            {/* Reading Text */}
            <div
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: 1.8,
              }}
              className={`space-y-4 font-${fontFamily} leading-relaxed`}
            >
              {activeReadingBook.chapters && activeReadingBook.chapters[activeChapterIndex] ? (
                <div className="space-y-4">
                  <div className="whitespace-pre-line">
                    {activeReadingBook.chapters[activeChapterIndex].content}
                  </div>

                  {/* Chapter specific takeaways, actionStep, and quote */}
                  {activeReadingBook.chapters[activeChapterIndex].keyTakeaways &&
                    activeReadingBook.chapters[activeChapterIndex].keyTakeaways!.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 space-y-1 text-xs">
                        <span className="font-bold text-[#10B981] flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Qodobbada Muhiimka ah:</span>
                        </span>
                        <ul className="space-y-1">
                          {activeReadingBook.chapters[activeChapterIndex].keyTakeaways!.map((pt, i) => (
                            <li key={i} className="flex items-start gap-1.5 opacity-90">
                              <span className="text-[#10B981] font-bold">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {activeReadingBook.chapters[activeChapterIndex].actionStep && (
                    <div className="p-3 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-xs font-semibold">
                      <span className="font-bold text-[#10B981] block mb-0.5">🎯 Tallaabada Dhaqangelinta:</span>
                      <span>{activeReadingBook.chapters[activeChapterIndex].actionStep}</span>
                    </div>
                  )}

                  {activeReadingBook.chapters[activeChapterIndex].quote && (
                    <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border-l-4 border-[#10B981] italic text-xs">
                      "{activeReadingBook.chapters[activeChapterIndex].quote}"
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-base leading-relaxed">
                    {activeReadingBook.summary || 'Buuggan waxaad ku dari kartaa qoraalladaada iyo xusuus-qorkaaga.'}
                  </p>
                  {activeReadingBook.takeaways && (
                    <div className="p-4 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/15 space-y-2 text-[#0F172A]">
                      <h4 className="font-bold text-sm text-[#064E3B]">Qodobbada Muhiimka ah:</h4>
                      <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                        {activeReadingBook.takeaways.map((point: string, idx: number) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Chapter Navigation & Generate Next Chapter Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-8 pb-12 mt-8 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveChapterIndex((prev) => Math.max(0, prev - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={activeChapterIndex === 0}
                  className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Kii Hore</span>
                </button>

                <span className="text-xs font-mono font-bold opacity-75">
                  {activeChapterIndex + 1} / {activeReadingBook.chapters?.length || 1}
                </span>

                <button
                  onClick={() => {
                    setActiveChapterIndex((prev) =>
                      Math.min((activeReadingBook.chapters?.length || 1) - 1, prev + 1)
                    );
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={activeChapterIndex >= (activeReadingBook.chapters?.length || 1) - 1}
                  className="btn-teal flex items-center gap-1 text-xs px-3 py-2 disabled:opacity-30"
                >
                  <span>Kii Xiga</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Generate Next Chapter Button */}
              <button
                type="button"
                onClick={handleGenerateAndAppendChapter}
                disabled={isGeneratingNextChapter}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#10B981]/25 hover:bg-[#10B981]/35 text-[#064E3B] dark:text-[#E5F0E8] border border-[#10B981]/35 text-xs font-bold transition active:scale-95 disabled:opacity-50"
                title="Soo koob oo ku dar cutubka xiga ee buuggan"
              >
                {isGeneratingNextChapter ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#10B981]" />
                    <span>Diyaarinta Cutubka...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>+ Soo Koob Cutub Cusub</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reader Footer Controls: Font size, pages */}
          <div className="p-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="opacity-75">Xarafka:</span>
              <button
                onClick={() => setFontSize((prev) => Math.max(14, prev - 1))}
                className="px-2 py-1 rounded bg-black/5 dark:bg-white/10 font-bold"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize((prev) => Math.min(26, prev + 1))}
                className="px-2 py-1 rounded bg-black/5 dark:bg-white/10 font-bold"
              >
                A+
              </button>
              <button
                onClick={() => setFontFamily((prev) => (prev === 'sans' ? 'serif' : 'sans'))}
                className="px-2 py-1 rounded bg-black/5 dark:bg-white/10 font-bold uppercase text-[10px]"
              >
                {fontFamily}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="opacity-75">Bogga {activeReadingBook.c}/{activeReadingBook.t}</span>
              <button
                onClick={() => handleSetBookPage(activeReadingBook, activeReadingBook.c + 1)}
                className="btn-teal px-2.5 py-1 text-xs"
              >
                +1 Bog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MAIN READING DASHBOARD ================= */}
      {/* Reading Velocity & Stats Card (Soft Green #DCE8DF - NO PURE WHITE) */}
      <div className="glass-card p-4 rounded-3xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#10B981]/20 text-[#064E3B] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <h2 className="font-serif font-black text-lg text-[#0F172A]">Maktabadda Caalamiga ah</h2>
              <p className="text-xs text-[#475569] font-medium">Akhris qoto dheer, buugaag dhameystiran & cod</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setInitialAiTitle('');
                setShowAiModal(true);
              }}
              className="btn-teal flex items-center gap-1.5 text-xs px-3 py-1.5 shadow-sm"
              title="Soo koob buug kasta af-Soomaali ahaan"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Soo Koob Buug ✨</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#064E3B] font-bold border border-[#064E3B]/20 transition active:scale-95"
              title="Ku dar buug adoo qoraya faahfaahinta"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gacan ku Dar</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#064E3B]/15 text-center">
          <div className="p-2.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
            <div className="text-base font-black text-[#064E3B] font-serif">{todayPages}</div>
            <div className="text-[10px] text-[#475569] font-medium">Bog maanta</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
            <div className="text-base font-black text-[#064E3B] font-serif">{avgPages}</div>
            <div className="text-[10px] text-[#475569] font-medium">Celcelis 7-d</div>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/10">
            <div className="text-base font-black text-[#064E3B] font-serif">
              {globalState.bk.filter((b) => b.status === 'dhammaystiray').length}
            </div>
            <div className="text-[10px] text-[#475569] font-medium">La dhammeeyay</div>
          </div>
        </div>
      </div>

      {/* ================= AI BOOK & CHAPTER GENERATOR HERO CARD ================= */}
      <div className="glass-card p-4 sm:p-5 rounded-3xl space-y-3.5 border-2 border-[#10B981]/30 relative overflow-hidden shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B] text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#10B981]" />
              <span>Matoorka Cutubyada & Aqoonta Buugaagta</span>
            </div>
            <h3 className="font-serif font-black text-base sm:text-lg text-[#0F172A] leading-tight">
              Geli Magaca Buugga aad Rabto inaad Akhrisato
            </h3>
            <p className="text-xs text-[#475569] font-medium leading-relaxed max-w-xl">
              Geli magaca buug kasta oo caalami ah ama Soomaali ah, waxaana si toos ah laguugu soo qorayaa cutubyo dhammaystiran, casharro qoto-dheer iyo xikmado af-Soomaali ah!
            </p>
          </div>
        </div>

        {/* Quick Input Bar */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2 pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#475569] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={quickSearchTitle}
              onChange={(e) => setQuickSearchTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && quickSearchTitle.trim()) {
                  setInitialAiTitle(quickSearchTitle.trim());
                  setShowAiModal(true);
                }
              }}
              placeholder="Qor magaca buugga (tusaale: Atomic Habits, Rich Dad Poor Dad...)"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/20 text-xs sm:text-sm font-semibold text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setInitialAiTitle(quickSearchTitle.trim());
              setShowAiModal(true);
            }}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#064E3B] to-[#10B981] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#064E3B]/20 hover:brightness-105 active:scale-95 transition shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Soo Koob Cutubyada ✨</span>
          </button>
        </div>

        {/* Popular Quick Suggestions */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#064E3B]/10">
          <span className="text-[10px] font-bold text-[#475569] mr-1">Tusaalooyin:</span>
          {[
            { label: '⚡ Atomic Habits', title: 'Atomic Habits' },
            { label: '💰 Rich Dad Poor Dad', title: 'Rich Dad Poor Dad' },
            { label: '🧠 Deep Work', title: 'Deep Work' },
            { label: '🌟 7-da Caado', title: 'The 7 Habits of Highly Effective People' },
            { label: '📈 Nafsiyadda Lacagta', title: 'The Psychology of Money' },
            { label: '🕌 Al-Raxiiq Al-Makhtuum', title: 'Al-Raxiiq Al-Makhtuum' },
          ].map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setInitialAiTitle(item.title);
                setShowAiModal(true);
              }}
              className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#064E3B] border border-[#064E3B]/10 transition active:scale-95"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#475569]">
            Buugaagta Maktabadda ({globalState.bk.length})
          </span>
          <span className="text-xs text-[#064E3B] font-bold">Riix si aad u akhrido</span>
        </div>

        {globalState.bk.length === 0 ? (
          <div className="glass-card p-6 sm:p-8 rounded-3xl text-center space-y-3 border-2 border-dashed border-[#064E3B]/20">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 text-[#064E3B] mx-auto flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-black text-sm sm:text-base text-[#0F172A]">Maktabaddu Waa Maran Tahay</h4>
              <p className="text-xs text-[#475569] mt-1 max-w-sm mx-auto">
                Ma jiraan buugaag hore loo sii galiyay. Ku dar buug kasta oo aad hadda akhrinayso adoo isticmaalaya badhanka hoose ama raadinta sare.
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-1">
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-teal text-xs px-4 py-2 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Ku dar Buug Cusub</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {globalState.bk.map((book) => {
            const percent = Math.min(100, Math.round((book.c / (book.t || 1)) * 100));
            const remaining = Math.max(0, book.t - book.c);
            const daysLeft = avgPages > 0 ? Math.ceil(remaining / avgPages) : null;
            const hasChapters = book.chapters && book.chapters.length > 0;

            return (
              <div
                key={book.id}
                className="glass-card p-4 rounded-3xl hover:border-[#10B981]/40 transition-all duration-300 group space-y-3"
              >
                {/* Book header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    {/* Cover graphic */}
                    <div
                      onClick={() => {
                        setActiveReadingBook(book);
                        setActiveChapterIndex(0);
                      }}
                      className="w-14 h-20 rounded-2xl flex-shrink-0 flex flex-col justify-between p-2 shadow-md cursor-pointer bg-gradient-to-br from-[#064E3B] to-[#10B981] text-white group-hover:scale-105 transition-transform duration-300"
                    >
                      <BookOpen className="w-4 h-4 opacity-90" />
                      <div className="text-[9px] font-bold leading-tight line-clamp-2">{book.n}</div>
                    </div>

                    {/* Book Details */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3
                          onClick={() => {
                            setActiveReadingBook(book);
                            setActiveChapterIndex(0);
                          }}
                          className="font-serif font-black text-sm sm:text-base text-[#0F172A] hover:text-[#064E3B] cursor-pointer transition line-clamp-1"
                        >
                          {book.n}
                        </h3>
                      </div>
                      <p className="text-xs text-[#475569] mt-0.5 font-medium">{book.author || 'Qoraa'}</p>

                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-[10px] bg-[#E5EFE7] text-[#475569] px-2 py-0.5 rounded-full font-semibold">
                          {book.category || 'Guud'}
                        </span>
                        {hasChapters && (
                          <span className="text-[10px] bg-[#10B981]/20 text-[#064E3B] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#10B981]" /> Cutubyo diyaar ah
                          </span>
                        )}
                        {book.status === 'dhammaystiray' && (
                          <span className="text-[10px] bg-[#10B981]/25 text-[#064E3B] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-[#10B981]" /> Dhammaystiran
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setActiveReadingBook(book);
                        setActiveChapterIndex(0);
                      }}
                      className="btn-teal text-xs px-3 py-1.5"
                    >
                      Akhri
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="px-2.5 py-1.5 rounded-xl border border-rose-400/40 bg-rose-500/10 text-rose-700 hover:bg-rose-500/20 font-bold text-xs flex items-center gap-1 transition active:scale-95"
                      title="Tirtir Buuggan"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                      <span>Tirtir</span>
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-[#475569] mb-1 font-medium">
                    <span>
                      Bogga <b className="text-[#0F172A]">{book.c}</b> / {book.t} ({percent}%)
                    </span>
                    {daysLeft && remaining > 0 ? (
                      <span className="text-[11px]">Qiyaas: ~{daysLeft} maalmood</span>
                    ) : null}
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#064E3B]/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#10B981] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Page Increments */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSetBookPage(book, book.c + 1)}
                      className="btn-subtle px-2.5 py-1 text-xs font-semibold"
                    >
                      +1 bog
                    </button>
                    <button
                      onClick={() => handleSetBookPage(book, book.c + 5)}
                      className="btn-subtle px-2.5 py-1 text-xs font-semibold"
                    >
                      +5 bog
                    </button>
                    <button
                      onClick={() => handleSetBookPage(book, book.c + 10)}
                      className="px-2.5 py-1 rounded-xl bg-[#10B981]/20 text-[#064E3B] border border-[#10B981]/30 text-xs font-bold transition active:scale-95"
                    >
                      +10 bog
                    </button>
                  </div>

                  {/* Quotes count */}
                  {book.quotes && book.quotes.length > 0 && (
                    <span className="text-[11px] text-[#064E3B] font-semibold flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5 text-[#10B981]" /> {book.quotes.length} xigmadood
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>

      {/* ================= ADD NEW BOOK MODAL ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-[#DCE8DF] border border-[#064E3B]/20 rounded-3xl p-5 shadow-2xl text-[#0F172A] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#064E3B]/15">
              <div>
                <h3 className="font-serif font-black text-base text-[#0F172A]">Ku dar Buug Maktabaddaada</h3>
                <p className="text-[11px] text-[#475569] font-medium">Waxaad ku dari kartaa buug kasta oo aad akhrinayso</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-[#475569] hover:text-[#0F172A] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => handleAddBook(e, false)} className="space-y-3">
              <div>
                <label className="text-xs text-[#475569] block mb-1 font-semibold">Magaca Buugga *</label>
                <input
                  type="text"
                  required
                  placeholder="tusaale: Qofka Guulaysta ama Atomic Habits"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>

              <div>
                <label className="text-xs text-[#475569] block mb-1 font-semibold">Qoraaga</label>
                <input
                  type="text"
                  placeholder="tusaale: James Clear ama Dr. Cali"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-[#475569] block mb-1 font-semibold">Wadarta Bogagga</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newTotal}
                    onChange={(e) => setNewTotal(e.target.value)}
                    className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#475569] block mb-1 font-semibold">Bogga aad marayso</label>
                  <input
                    type="number"
                    min="0"
                    value={newCurrent}
                    onChange={(e) => setNewCurrent(e.target.value)}
                    className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#475569] block mb-1 font-semibold">Qeybta</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl px-2.5 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                >
                  <option value="Horumar Shakhsi">Horumar Shakhsi</option>
                  <option value="Ganacsi & Maaliyad">Ganacsi & Maaliyad</option>
                  <option value="Diin & Akhlaaq">Diin & Akhlaaq</option>
                  <option value="Taariikh & Hoggaan">Taariikh & Hoggaan</option>
                  <option value="Saynis & Teknoolajiyad">Saynis & Teknoolajiyad</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[#475569] block mb-1 font-semibold">
                  Qoraal / Cutub Hordhac ah (ikhtiyaari)
                </label>
                <textarea
                  rows={2}
                  placeholder="Halkan ku qor cutubka koowaad ama dulucda buugga si aad ugu akhrisato e-reader-ka..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/15 rounded-xl p-2.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                />
              </div>

              {/* Action Buttons: Save & Close or Save & Add Another */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={(e) => handleAddBook(e, true)}
                  className="flex-1 py-2.5 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] border border-[#064E3B]/20 text-xs font-bold text-[#064E3B] transition"
                >
                  + Ku dar oo Mid Kale Geli
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-teal py-2.5 text-xs font-bold"
                >
                  Keydi Buugga
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= AI BOOK & CHAPTER SUMMARIZER MODAL ================= */}
      <AiBookSummarizerModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onSaveBook={handleSaveAiBook}
        initialTitle={initialAiTitle}
      />
    </div>
  );
};
