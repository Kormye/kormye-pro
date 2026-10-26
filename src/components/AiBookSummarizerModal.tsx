import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Check,
  Loader2,
  ArrowRight,
  BookMarked,
  Lightbulb,
  Target,
  Quote,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Book, BookChapter } from '../types/index.ts';
import {
  summarizeBookWithAI,
  SummarizeBookResponse,
} from '../utils/bookSummarizer.ts';
import { playChime } from '../utils/soundEffects.ts';

interface AiBookSummarizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveBook: (book: Book, andReadNow: boolean) => void;
  initialTitle?: string;
}

const POPULAR_BOOK_SUGGESTIONS = [
  { title: 'Atomic Habits', author: 'James Clear', category: 'Horumar Shakhsi', emoji: '⚡' },
  { title: 'Rich Dad Poor Dad', author: 'Robert T. Kiyosaki', category: 'Ganacsi & Maaliyad', emoji: '💰' },
  { title: 'Deep Work', author: 'Cal Newport', category: 'Xirfad & Wax-soo-saar', emoji: '🧠' },
  { title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey', category: 'Hoggaan & Horumar', emoji: '🌟' },
  { title: 'The Psychology of Money', author: 'Morgan Housel', category: 'Ganacsi & Maaliyad', emoji: '📈' },
  { title: 'Think and Grow Rich', author: 'Napoleon Hill', category: 'Ganacsi & Maaliyad', emoji: '📖' },
  { title: 'Zero to One', author: 'Peter Thiel', category: 'Hal-abuur & Ganacsi', emoji: '🚀' },
  { title: 'Al-Raxiiq Al-Makhtuum', author: 'Safiur Rahman Mubarakpuri', category: 'Diin & Taariikh', emoji: '🕌' },
  { title: 'La Tahzan (Ha Murgoon)', author: 'Dr. Caa\'id Al-Qarni', category: 'Diin & Akhlaaq', emoji: '🍃' },
];

export const AiBookSummarizerModal: React.FC<AiBookSummarizerModalProps> = ({
  isOpen,
  onClose,
  onSaveBook,
  initialTitle = '',
}) => {
  const [bookTitle, setBookTitle] = useState(initialTitle);
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Horumar Shakhsi');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [result, setResult] = useState<SummarizeBookResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (item: (typeof POPULAR_BOOK_SUGGESTIONS)[0]) => {
    setBookTitle(item.title);
    setAuthor(item.author);
    setCategory(item.category);
    playChime('click');
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!bookTitle.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setStatusMessage('Falanqaynta buugga iyo nuxurkiisa...');

    try {
      const t1 = setTimeout(() => {
        setStatusMessage('Diyaarinta iyo qorista cutubyada af-Soomaaliga...');
      }, 1200);

      const t2 = setTimeout(() => {
        setStatusMessage('Habaynta casharrada muhiimka ah iyo tallaabooyinka...');
      }, 2500);

      const response = await summarizeBookWithAI({
        title: bookTitle,
        author: author.trim() || undefined,
        category,
      });

      clearTimeout(t1);
      clearTimeout(t2);

      setResult(response);
      if (response.chapters.length > 0) {
        setExpandedChapterId(response.chapters[0].id);
      }
      playChime('success');
    } catch (err: any) {
      setError(err?.message || 'Khalad ayaa dhacay intii lagu guda jiray soo-koobista buugga.');
      playChime('tap');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAndAction = (andReadNow: boolean) => {
    if (!result) return;

    const newBook: Book = {
      id: 'b_ai_' + Date.now(),
      n: result.title,
      author: result.author || author || 'Qoraa Caan ah',
      t: result.estimatedPages || 250,
      c: 0,
      category: result.category || category,
      coverColor: 'from-[#064E3B] to-[#10B981]',
      status: 'socda',
      summary: result.summary,
      takeaways: result.takeaways,
      chapters: result.chapters,
      lastReadDate: new Date().toISOString(),
    };

    onSaveBook(newBook, andReadNow);
    playChime('success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#DCE8DF] border border-[#064E3B]/20 rounded-3xl p-5 sm:p-6 shadow-2xl text-[#0F172A] space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#064E3B]/15">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#10B981] text-white flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif font-black text-base sm:text-lg text-[#0F172A] leading-tight">
                Soo Koobaha Buugaagta & Cutubyada
              </h3>
              <p className="text-xs text-[#475569] font-medium">
                Geli magaca buug kasta si cutubyadiisa looguugu soo qoro af-Soomaali
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#D0DFD4] text-[#475569] hover:text-[#0F172A] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form if no result yet */}
        {!result && (
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#064E3B] block mb-1">
                Magaca Buugga (Book Title) *
              </label>
              <input
                type="text"
                required
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="tusaale: Atomic Habits, Rich Dad Poor Dad, ama buug kasta..."
                className="w-full bg-[#E5EFE7] border border-[#064E3B]/20 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#064E3B] block mb-1">
                  Qoraaga (Author - ikhtiyaari)
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="tusaale: James Clear"
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/20 rounded-2xl px-3 py-2 text-xs font-semibold text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#064E3B] block mb-1">
                  Qeybta Buugga
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#E5EFE7] border border-[#064E3B]/20 rounded-2xl px-3 py-2 text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                  disabled={isLoading}
                >
                  <option value="Horumar Shakhsi">Horumar Shakhsi</option>
                  <option value="Ganacsi & Maaliyad">Ganacsi & Maaliyad</option>
                  <option value="Xirfad & Wax-soo-saar">Xirfad & Wax-soo-saar</option>
                  <option value="Diin & Akhlaaq">Diin & Akhlaaq</option>
                  <option value="Taariikh & Hoggaan">Taariikh & Hoggaan</option>
                  <option value="Saynis & Teknoolajiyad">Saynis & Teknoolajiyad</option>
                </select>
              </div>
            </div>

            {/* Popular Quick Suggestions Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider block">
                Dooro buug caan ah oo diyaar ah:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_BOOK_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(item)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition active:scale-95 border flex items-center gap-1.5 ${
                      bookTitle === item.title
                        ? 'bg-[#064E3B] text-white border-[#064E3B]'
                        : 'bg-[#E5EFE7] text-[#0F172A] border-[#064E3B]/15 hover:border-[#10B981]'
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="p-4 rounded-2xl bg-[#E5EFE7] border border-[#10B981]/30 flex flex-col items-center justify-center text-center space-y-2 animate-pulse">
                <Loader2 className="w-6 h-6 text-[#10B981] animate-spin" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#064E3B]">{statusMessage}</p>
                  <p className="text-[11px] text-[#475569]">
                    Fadlan sug daqiiqad inta cutubyada iyo dulucda laguugu diyaarinayo...
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-800 text-xs">
                {error}
              </div>
            )}

            {/* Submit Button */}
            {!isLoading && (
              <button
                type="submit"
                disabled={!bookTitle.trim()}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#064E3B] to-[#10B981] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#064E3B]/20 hover:brightness-105 active:scale-98 transition disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Soo Koob Cutubyada Buuggan Af-Soomaali ✨</span>
              </button>
            )}
          </form>
        )}

        {/* Display Generated Book & Chapters Result */}
        {result && (
          <div className="space-y-4">
            {/* Book Meta Card */}
            <div className="p-4 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/15 space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-md">
                    {result.category}
                  </span>
                  <h3 className="font-serif font-black text-lg sm:text-xl text-[#0F172A] mt-1">
                    {result.title}
                  </h3>
                  <p className="text-xs text-[#475569] font-medium">
                    Qoraaga: <b className="text-[#064E3B]">{result.author}</b> • ~{result.estimatedPages} Bog
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded-xl bg-[#10B981]/20 text-[#064E3B] text-xs font-bold shrink-0">
                  {result.chapters.length} Cutub oo Diyaar ah
                </div>
              </div>

              {/* Overview Summary */}
              <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed font-medium">
                {result.summary}
              </p>

              {/* Takeaways */}
              {result.takeaways && result.takeaways.length > 0 && (
                <div className="pt-2 border-t border-[#064E3B]/10 space-y-1">
                  <span className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Casharrada Ugu Muhiimsan:</span>
                  </span>
                  <ul className="space-y-0.5 text-xs text-[#475569]">
                    {result.takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#10B981] font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Generated Chapters List with Accordion Preview */}
            <div className="space-y-2">
              <span className="text-xs font-black text-[#064E3B] uppercase tracking-wider block">
                Cutubyada La Soo Koobay ({result.chapters.length} Cutub):
              </span>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {result.chapters.map((chap, idx) => {
                  const isExpanded = expandedChapterId === chap.id;
                  return (
                    <div
                      key={chap.id}
                      className="rounded-2xl border border-[#064E3B]/15 bg-[#E5EFE7] overflow-hidden transition"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedChapterId(isExpanded ? null : chap.id)}
                        className="w-full p-3 text-left flex items-center justify-between gap-2 hover:bg-[#D0DFD4]/50 transition"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#064E3B] text-[10px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-serif font-bold text-xs sm:text-sm text-[#0F172A] truncate">
                            {chap.title}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#475569] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#475569] shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-3.5 pt-0 space-y-2.5 text-xs border-t border-[#064E3B]/10">
                          <p className="whitespace-pre-line text-[#0F172A] leading-relaxed font-sans">
                            {chap.content}
                          </p>

                          {chap.actionStep && (
                            <div className="p-2.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-start gap-2 text-[#064E3B]">
                              <Target className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                              <span className="font-semibold">{chap.actionStep}</span>
                            </div>
                          )}

                          {chap.quote && (
                            <div className="p-2.5 rounded-xl bg-[#DCE8DF] border-l-2 border-[#10B981] italic text-[#475569]">
                              "{chap.quote}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-[#064E3B]/15">
              <button
                type="button"
                onClick={() => handleSaveAndAction(true)}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#064E3B] to-[#10B981] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#064E3B]/20 hover:brightness-105 active:scale-98 transition"
              >
                <BookOpen className="w-4 h-4" />
                <span>Ku Dar Maktabaddayda & Akhri Hadda ✨</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSaveAndAction(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#064E3B] text-xs font-bold border border-[#064E3B]/15 transition"
                >
                  Ku Dar Maktabadda (Ha Furin Hadda)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setBookTitle('');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#475569] text-xs font-bold border border-[#064E3B]/15 transition"
                >
                  Soo Koob Buug Kale
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
