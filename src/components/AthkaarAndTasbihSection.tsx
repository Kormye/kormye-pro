import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, Sparkles, Heart, Copy, Bookmark, ChevronRight, Plus, Minus, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime } from '../utils/soundEffects.ts';

interface AthkaarAndTasbihSectionProps {
  onUpdateCount?: (id: string, count: number) => void;
}

interface DhikrItem {
  id: string;
  arabic: string;
  transliteration?: string;
  somali: string;
  targetCount: number;
  virtue: string;
  reference: string;
}

const MORNING_ADHKAAR: DhikrItem[] = [
  {
    id: 'm_kursi',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ...',
    somali: 'Allaah, ma jiro Ilaah xaq lagu caabudo Isaga mooyee, waana Noolaha Joogtada ah ee koonka maamula. Qofkii akhriya subaxdii waxaa laga ilaaliyaa shaydaanka ilaa uu ka galabtaysto.',
    targetCount: 1,
    virtue: 'Ilaalinta shaydaanka iyo jinniga maalinta oo dhan',
    reference: 'Aayatal Kursi (Al-Baqarah 255)',
  },
  {
    id: 'm_sayyid',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    somali: 'Sayyidul Istighfaar: "Ilaahayow adigu waxaad tahay Rabbigay, ma jiro Ilaah kale adiga mooyee. Adigaa i abuuray aniguna waxaan ahay addoonkaaga..." Qofkii yaqiin ku akhriya oo dhinta maalintaas wuxuu galaa Jannada.',
    targetCount: 1,
    virtue: 'Dambi-dhaaf buuxa iyo ballanqaadka Jannada',
    reference: 'Saxiix Al-Bukhaari',
  },
  {
    id: 'm_asbaxna',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    somali: 'Waxaan waabariisannay iyadoo boqortooyada oo dhami Eebbe u sugnaatay, Mahad oo dhanna Eebbaa iska leh. Ma jiro Ilaah xaq lagu caabudo Eebbe kaliya mooyee, shariikna ma laha.',
    targetCount: 1,
    virtue: 'Tawxiidka iyo ammaanidda Eebbe bilowga maalinta',
    reference: 'Saxiix Muslim',
  },
  {
    id: 'm_bismillaahi',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    somali: 'Magaca Eebbe ayaan ku bilaabayaa, kaas oo magaciisa dartiis aysan waxba ku waxyeelloobi karin dhulka iyo samada dhexdiisa, waana Maqlaha wax walba Og.',
    targetCount: 3,
    virtue: 'Ilaalin buuxda oo ka dhan ah belaayooyinka iyo waxyeellada degdegga ah',
    reference: 'Abuu Daawood & At-Tirmidi',
  },
  {
    id: 'm_radaytu',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    somali: 'Waxaan raalli kaga noqday Eebbe inuu yahay Rabbigay, Islaamkana diintayda, Muxammadna (NNKH) inuu yahay Nabigayga.',
    targetCount: 3,
    virtue: 'Eebbe wuxuu ballanqaaday inuu raalli gelin doono qofka akhriya Maalinta Qiyaamaha',
    reference: 'Axmad & At-Tirmidi',
  },
  {
    id: 'm_yaahayyu',
    arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
    somali: 'Yaa Xayyu Yaa Qayyoom, Naxariistaada ayaan gargaar kaga doonayaa; ii hagaaji xaalkayga oo dhan, hal il-bidhiqsina ha ii deynin naftayda.',
    targetCount: 1,
    virtue: 'Gargaar Eebbe iyo hagaajinta nolosha oo dhan',
    reference: 'Al-Xaakim',
  },
  {
    id: 'm_subxanallaah',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
    somali: 'Eebbaa ceeb ka hufan oo mahad leh, tirada inta uu abuuray le\'eg, raallinimada naftiisa le\'eg, culeyska carshigiisa le\'eg, iyo xaddiga khadkiisa erayada le\'eg.',
    targetCount: 3,
    virtue: 'Ajar ka culus saacado badan oo cibaado ah',
    reference: 'Saxiix Muslim',
  },
];

const EVENING_ADHKAAR: DhikrItem[] = [
  {
    id: 'e_kursi',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ...',
    somali: 'Aayatal Kursi: Qofkii akhriya galabtii waxaa laga ilaaliyaa shaydaanka ilaa uu ka waabariisto.',
    targetCount: 1,
    virtue: 'Ilaalin habeenka oo dhan ilaa subaxda',
    reference: 'Saxiix',
  },
  {
    id: 'e_amsayna',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    somali: 'Waxaan galabaysannay iyadoo boqortooyada oo dhami Eebbe u sugnaatay, Mahad oo dhanna Eebbaa iska leh. Ma jiro Ilaah xaq lagu caabudo Eebbe kaliya mooyee.',
    targetCount: 1,
    virtue: 'Xuska Eebbe iyo shukriga dhammaadka maalinta',
    reference: 'Saxiix Muslim',
  },
  {
    id: 'e_auudu',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    somali: 'Waxaan ku magangalayaa erayada Eebbe ee dhammaystiran sharka waxa uu abuuray oo dhan.',
    targetCount: 3,
    virtue: 'Kama cabsato qofka qaniinyo sun leh ama xumaan habeennimo',
    reference: 'Saxiix Muslim',
  },
  {
    id: 'e_sayyid',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ...',
    somali: 'Sayyidul Istighfaar: Qofkii galabtii akhriya isagoo yaqiin ku qaba oo dhinta habeenkaas, wuxuu noqonayaa ehelu Janno.',
    targetCount: 1,
    virtue: 'Dambi-dhaaf iyo jannada haddii habeenkaas la dhinto',
    reference: 'Saxiix Al-Bukhaari',
  },
  {
    id: 'e_bismillaahi',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    somali: 'Magaca Eebbe ayaan ku bilaabayaa, kaas oo magaciisa dartiis aysan waxba ku waxyeelloobi karin dhulka iyo samada dhexdiisa.',
    targetCount: 3,
    virtue: 'Ilaalin buuxda oo habeenkii ah',
    reference: 'Abuu Daawood',
  },
];

const PROPHETIC_DUAS: DhikrItem[] = [
  {
    id: 'd_worries',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    somali: 'Ducada Welwelka & Deynta: "Ilaahayow waxaan kaa magangalayaa werwerka iyo murugada, cajiska iyo caajiska, fuleynimada iyo bakhaylnimada, deynta culus iyo ragga xaq-darrada iigu adkaada."',
    targetCount: 1,
    virtue: 'Furista qulubta, ka saaridda werwerka iyo gargaarka deynta',
    reference: 'Saxiix Al-Bukhaari',
  },
  {
    id: 'd_sleep',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    somali: 'Ducada Hurdada: "Magacaaga Ilaahayow ayaan ku dhimanayaa (ku seexanayaa) kuna noolaanayaa (ku toosayaa)."',
    targetCount: 1,
    virtue: 'Ilaalinta nafta xilliga hurdada',
    reference: 'Saxiix Al-Bukhaari',
  },
  {
    id: 'd_wake',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    somali: 'Ducada Soo-kicidda: "Mahad waxaa leh Eebbihii na nooleeyey ka dib markuu na dilay (seexiyey), xaggiisana waa la isugu soo noqonayaa."',
    targetCount: 1,
    virtue: 'Shukriga nimcada nolosha maalin cusub',
    reference: 'Saxiix Al-Bukhaari',
  },
  {
    id: 'd_home_exit',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    somali: 'Ducada Guriga ka bixidda: "Magaca Eebbe ayaan ku baxayaa, Eebbe ayaan talo-saartay, xeelad iyo xoogna ma jiraan Eebbe la\'aantiis."',
    targetCount: 1,
    virtue: 'Ilaalinta Eebbe iyo fogaanshaha shaydaanka',
    reference: 'Abuu Daawood & At-Tirmidi',
  },
  {
    id: 'd_health',
    arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ',
    somali: 'Ducada Caafimaadka: "Ilaahayow ii caafi jidhkayga, Ilaahayow ii caafi maqalkayga, Ilaahayow ii caafi araggayga, ma jiro Ilaah xaq lagu caabudo adiga mooyee."',
    targetCount: 3,
    virtue: 'Dhowridda xubnaha iyo caafimaadka guud',
    reference: 'Abuu Daawood',
  },
];

export const AthkaarAndTasbihSection: React.FC<AthkaarAndTasbihSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<'tasbih' | 'subax' | 'galab' | 'duco'>('tasbih');

  // Digital Tasbih State
  const [customArabic, setCustomArabic] = useState('سُبْحَانَ اللَّهِ');
  const [customSomali, setCustomSomali] = useState('Subxaanallaah (Eebbaa ceeb ka hufan)');
  const [tasbihCount, setTasbihCount] = useState<number>(0);
  const [tasbihTarget, setTasbihTarget] = useState<number>(33);
  const [isTargetInfinite, setIsTargetInfinite] = useState<boolean>(false);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  // Daily Grand Total Tracker
  const [todayGrandTotal, setTodayGrandTotal] = useState<number>(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem(`kormye_tasbih_total_${today}`);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  // Adhkar Counters State
  const [adhkarCounts, setAdhkarCounts] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const presets = [
    { ar: 'سُبْحَانَ اللَّهِ', som: 'Subxaanallaah (Eebbaa ceeb ka hufan)', defTarget: 33 },
    { ar: 'الْحَمْدُ لِلَّهِ', som: 'Alxamdulillaah (Mahad Eebbaa leh)', defTarget: 33 },
    { ar: 'اللَّهُ أَكْبَرُ', som: 'Allaahu Akbar (Eebbaa Weyn)', defTarget: 34 },
    { ar: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', som: 'Astaghfirullaaha wa atuubu ilayh (Dambi-dhaaf ayaan dalbayaa)', defTarget: 100 },
    { ar: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', som: 'Laa ilaaha illallaah waxdahu laa shariika lah', defTarget: 100 },
    { ar: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ', som: 'Salawaatka Nabiga ﷺ', defTarget: 100 },
    { ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', som: 'Laa xawla walaa quwwata illaa billaah', defTarget: 50 },
    { ar: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', som: 'Xasbunallaahu wa nicmal wakiil', defTarget: 100 },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setCustomArabic(p.ar);
    setCustomSomali(p.som);
    setTasbihTarget(p.defTarget);
    setIsTargetInfinite(false);
    setTasbihCount(0);
    playChime('click');
  };

  // Click Tasbih Bead
  const handleTasbihClick = () => {
    const nextCount = tasbihCount + 1;
    const nextGrandTotal = todayGrandTotal + 1;
    setTodayGrandTotal(nextGrandTotal);

    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`kormye_tasbih_total_${today}`, String(nextGrandTotal));
    } catch {}

    playChime('tap');

    try {
      navigator.vibrate?.(40);
    } catch {}

    if (!isTargetInfinite && nextCount >= tasbihTarget) {
      setTasbihCount(0);
      setCompletedCycles((c) => c + 1);
      playChime('success');
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#064E3B', '#10B981', '#F59E0B'],
      });
    } else {
      setTasbihCount(nextCount);
    }
  };

  const handleUndoTasbih = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tasbihCount > 0) {
      setTasbihCount((c) => c - 1);
      setTodayGrandTotal((g) => Math.max(0, g - 1));
      playChime('tap');
    }
  };

  const handleResetTasbih = () => {
    setTasbihCount(0);
    setCompletedCycles(0);
    playChime('tap');
  };

  // Adhkar Counter step
  const handleAdhkarStep = (id: string, max: number) => {
    const current = adhkarCounts[id] || 0;
    const next = current + 1;
    playChime('tap');

    try {
      navigator.vibrate?.(30);
    } catch {}

    setAdhkarCounts((prev) => ({ ...prev, [id]: next }));
    if (next === max) {
      playChime('success');
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playChime('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Navigation Subtabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl glass-card">
        <button
          onClick={() => {
            setActiveTab('tasbih');
            playChime('click');
          }}
          className={`py-2 px-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
            activeTab === 'tasbih'
              ? 'bg-[#064E3B] text-white shadow-xs'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>📿 Tasbiix</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('subax');
            playChime('click');
          }}
          className={`py-2 px-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
            activeTab === 'subax'
              ? 'bg-[#064E3B] text-white shadow-xs'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>🌅 Subaxdii</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('galab');
            playChime('click');
          }}
          className={`py-2 px-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
            activeTab === 'galab'
              ? 'bg-[#064E3B] text-white shadow-xs'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>🌇 Galabtii</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('duco');
            playChime('click');
          }}
          className={`py-2 px-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
            activeTab === 'duco'
              ? 'bg-[#064E3B] text-white shadow-xs'
              : 'text-[#0F172A]/70 hover:text-[#0F172A]'
          }`}
        >
          <span>🤲 Ducooyin</span>
        </button>
      </div>

      {/* ================= 1. CUSTOM DIGITAL TASBIH ================= */}
      {activeTab === 'tasbih' && (
        <div className="space-y-4">
          {/* Preset Buttons */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  customArabic === p.ar
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-[#E5EFE7] border border-[#064E3B]/10 text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {p.ar} ({p.defTarget})
              </button>
            ))}
          </div>

          {/* Interactive Custom Target & Settings Box */}
          <div className="p-3.5 rounded-2xl bg-[#E5EFE7] border border-[#064E3B]/15 space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-[#064E3B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Dooro ama Qor Tirada aad doonayso (Target):</span>
              </span>
              <span className="text-xs font-mono font-bold text-[#064E3B] bg-[#10B981]/20 px-2 py-0.5 rounded-lg">
                Maanta Guud: {todayGrandTotal} jeer
              </span>
            </div>

            {/* Quick Target Chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[33, 100, 300, 500, 1000].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    setTasbihTarget(num);
                    setIsTargetInfinite(false);
                    playChime('click');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                    !isTargetInfinite && tasbihTarget === num
                      ? 'bg-[#064E3B] text-white border-[#064E3B]'
                      : 'bg-[#DCE8DF] text-[#0F172A] border-[#064E3B]/15 hover:bg-[#D0DFD4]'
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setIsTargetInfinite(true);
                  playChime('click');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                  isTargetInfinite
                    ? 'bg-[#064E3B] text-white border-[#064E3B]'
                    : 'bg-[#DCE8DF] text-[#0F172A] border-[#064E3B]/15 hover:bg-[#D0DFD4]'
                }`}
              >
                ∞ Xor (Bilaa Xad)
              </button>
            </div>

            {/* Custom Input for target and dhikr name */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1 border-t border-[#064E3B]/10">
              <input
                type="text"
                value={customArabic}
                onChange={(e) => setCustomArabic(e.target.value)}
                placeholder="Qor xuska aad rabto (Carabi ama Soomaali)..."
                className="sm:col-span-8 px-3 py-1.5 rounded-xl bg-[#DCE8DF] border border-[#064E3B]/20 text-xs font-bold text-[#0F172A]"
              />
              <div className="sm:col-span-4 flex items-center gap-1">
                <span className="text-[10px] text-[#475569] font-bold">Hadaf:</span>
                <input
                  type="number"
                  min="1"
                  disabled={isTargetInfinite}
                  value={isTargetInfinite ? '' : tasbihTarget}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (v > 0) setTasbihTarget(v);
                  }}
                  placeholder={isTargetInfinite ? 'Bilaa xad' : '33'}
                  className="w-full px-2 py-1.5 rounded-xl bg-[#DCE8DF] border border-[#064E3B]/20 text-xs font-mono font-bold text-[#064E3B]"
                />
              </div>
            </div>
          </div>

          {/* Big Interactive Tasbih Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl text-center space-y-4 border-2 border-[#10B981]/30 shadow-lg relative overflow-hidden bg-[#DCE8DF]">
            {/* Cycle & Controls Badge */}
            <div className="flex items-center justify-between text-xs font-bold text-[#475569]">
              <span className="bg-[#E5EFE7] px-3 py-1 rounded-xl border border-[#064E3B]/10">
                {!isTargetInfinite ? (
                  <>Wareegyo: <strong className="text-[#064E3B]">{completedCycles}</strong></>
                ) : (
                  <>Habka: <strong className="text-[#064E3B]">Xor ah (Tiro joogto ah)</strong></>
                )}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleUndoTasbih}
                  disabled={tasbihCount <= 0}
                  className="px-2.5 py-1 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#475569] hover:text-[#0F172A] border border-[#064E3B]/10 transition disabled:opacity-30"
                  title="Ka jar 1"
                >
                  <Minus className="w-3.5 h-3.5 inline mr-0.5" /> 1
                </button>
                <button
                  type="button"
                  onClick={handleResetTasbih}
                  className="p-1.5 rounded-xl bg-[#E5EFE7] hover:bg-[#D0DFD4] text-[#475569] hover:text-[#0F172A] border border-[#064E3B]/10 transition"
                  title="Eber ka dhig"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Arabic Text Display */}
            <div dir="rtl" className="font-arabic text-2xl sm:text-3xl font-bold text-[#064E3B] py-1">
              {customArabic}
            </div>
            {customSomali && (
              <p className="text-xs text-[#475569] font-medium max-w-sm mx-auto">
                {customSomali}
              </p>
            )}

            {/* Giant Circular Click Button */}
            <div className="py-2 flex justify-center">
              <button
                type="button"
                onClick={handleTasbihClick}
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#10B981] text-white flex flex-col items-center justify-center shadow-2xl shadow-[#064E3B]/30 active:scale-95 transition-all duration-150 transform border-4 border-[#10B981]/40 group select-none cursor-pointer"
              >
                <span className="font-mono font-black text-4xl sm:text-5xl group-hover:scale-105 transition-transform">
                  {tasbihCount}
                </span>
                <span className="text-xs font-bold text-emerald-200 mt-1 uppercase tracking-wider">
                  {isTargetInfinite ? '∞ Bilaa Xad' : `/ ${tasbihTarget}`}
                </span>
                <span className="text-[10px] text-emerald-300/80 mt-1">Taabo Halkan</span>
              </button>
            </div>

            <p className="text-[11px] text-[#475569] font-semibold">
              Guji goobada weyn si aad u tiriso tasbiixdaada — si toos ah ayaa loo keydiyaa maanta dhan!
            </p>
          </div>
        </div>
      )}

      {/* ================= 2. MORNING ADHKAAR ================= */}
      {activeTab === 'subax' && (
        <div className="space-y-3">
          <div className="glass-card p-4 rounded-3xl flex items-center justify-between">
            <div>
              <h3 className="font-serif font-black text-sm text-[#0F172A] flex items-center gap-1.5">
                <span>🌅</span>
                <span>Athkaarta Subaxdii ee Saxiixa ah</span>
              </h3>
              <p className="text-xs text-[#475569] font-medium">
                Ilaalinta iyo xuska maalinta laga bilaabo salaadda Fajr ilaa qorrax-soo-baxa
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {MORNING_ADHKAAR.map((item) => {
              const current = adhkarCounts[item.id] || 0;
              const isDone = current >= item.targetCount;
              return (
                <div
                  key={item.id}
                  className={`glass-card p-4 sm:p-5 rounded-3xl space-y-3 transition border ${
                    isDone ? 'border-[#10B981] bg-[#E5EFE7]/80' : 'border-[#064E3B]/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B]">
                      {item.reference}
                    </span>
                    <button
                      onClick={() => handleCopyText(`${item.arabic}\n\n${item.somali}`, item.id)}
                      className="text-xs text-[#475569] hover:text-[#0F172A] flex items-center gap-1"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">Nuuxi</span>
                    </button>
                  </div>

                  <p dir="rtl" className="font-arabic text-lg sm:text-xl font-bold text-[#064E3B] leading-relaxed text-right">
                    {item.arabic}
                  </p>

                  <p className="text-xs text-[#0F172A] leading-relaxed font-medium">
                    {item.somali}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-[#064E3B]/10">
                    <span className="text-[11px] text-[#475569] font-medium italic">
                      ✨ {item.virtue}
                    </span>
                    <button
                      onClick={() => handleAdhkarStep(item.id, item.targetCount)}
                      disabled={isDone}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                        isDone
                          ? 'bg-[#10B981] text-white opacity-85'
                          : 'bg-[#064E3B] hover:bg-[#054030] text-white active:scale-95'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Dhammaystiran ({item.targetCount})</span>
                        </>
                      ) : (
                        <span>Tiri ({current}/{item.targetCount})</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= 3. EVENING ADHKAAR ================= */}
      {activeTab === 'galab' && (
        <div className="space-y-3">
          <div className="glass-card p-4 rounded-3xl flex items-center justify-between">
            <div>
              <h3 className="font-serif font-black text-sm text-[#0F172A] flex items-center gap-1.5">
                <span>🌇</span>
                <span>Athkaarta Galabtii ee Saxiixa ah</span>
              </h3>
              <p className="text-xs text-[#475569] font-medium">
                Xuska Eebbe laga bilaabo salaadda Casar ilaa habeenka
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {EVENING_ADHKAAR.map((item) => {
              const current = adhkarCounts[item.id] || 0;
              const isDone = current >= item.targetCount;
              return (
                <div
                  key={item.id}
                  className={`glass-card p-4 sm:p-5 rounded-3xl space-y-3 transition border ${
                    isDone ? 'border-[#10B981] bg-[#E5EFE7]/80' : 'border-[#064E3B]/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B]">
                      {item.reference}
                    </span>
                    <button
                      onClick={() => handleCopyText(`${item.arabic}\n\n${item.somali}`, item.id)}
                      className="text-xs text-[#475569] hover:text-[#0F172A] flex items-center gap-1"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[11px]">Nuuxi</span>
                    </button>
                  </div>

                  <p dir="rtl" className="font-arabic text-lg sm:text-xl font-bold text-[#064E3B] leading-relaxed text-right">
                    {item.arabic}
                  </p>

                  <p className="text-xs text-[#0F172A] leading-relaxed font-medium">
                    {item.somali}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-[#064E3B]/10">
                    <span className="text-[11px] text-[#475569] font-medium italic">
                      ✨ {item.virtue}
                    </span>
                    <button
                      onClick={() => handleAdhkarStep(item.id, item.targetCount)}
                      disabled={isDone}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                        isDone
                          ? 'bg-[#10B981] text-white opacity-85'
                          : 'bg-[#064E3B] hover:bg-[#054030] text-white active:scale-95'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Dhammaystiran ({item.targetCount})</span>
                        </>
                      ) : (
                        <span>Tiri ({current}/{item.targetCount})</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= 4. PROPHETIC DUAS ================= */}
      {activeTab === 'duco' && (
        <div className="space-y-3">
          <div className="glass-card p-4 rounded-3xl flex items-center justify-between">
            <div>
              <h3 className="font-serif font-black text-sm text-[#0F172A] flex items-center gap-1.5">
                <span>🤲</span>
                <span>Ducooyinka Nabiga ﷺ ee Xaaladaha Kala Duwan</span>
              </h3>
              <p className="text-xs text-[#475569] font-medium">
                Ducooyinka saxiixa ah ee werwerka, deynta, hurdada, guriga, iyo caafimaadka
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {PROPHETIC_DUAS.map((item) => (
              <div
                key={item.id}
                className="glass-card p-4 sm:p-5 rounded-3xl space-y-3 transition border border-[#064E3B]/15"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#064E3B]">
                    {item.reference}
                  </span>
                  <button
                    onClick={() => handleCopyText(`${item.arabic}\n\n${item.somali}`, item.id)}
                    className="text-xs text-[#475569] hover:text-[#0F172A] flex items-center gap-1"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[11px]">Nuuxi</span>
                  </button>
                </div>

                <p dir="rtl" className="font-arabic text-lg sm:text-xl font-bold text-[#064E3B] leading-relaxed text-right">
                  {item.arabic}
                </p>

                <p className="text-xs text-[#0F172A] leading-relaxed font-medium">
                  {item.somali}
                </p>

                <div className="pt-2 border-t border-[#064E3B]/10">
                  <span className="text-[11px] text-[#064E3B] font-bold">
                    💡 Fadliga: {item.virtue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
