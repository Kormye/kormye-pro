import {
  AppConfig,
  DayRecord,
  GlobalState,
  RoutineItem,
  WeeklyStreakInfo,
  CustomReminder,
  UserAccount,
  HabitItem,
  GoalItem,
  Book,
  AthkaarItem,
} from '../types/index.ts';
import { makeDefaultPlan, RE, DAYS, MONS } from '../data/datasets.ts';
import { CURATED_DIGITAL_BOOKS } from '../data/digitalBooks.ts';
import { DEFAULT_USER_POSTS } from '../data/defaultPosts.ts';

export const P = 'nidaam3:';

let memoryCache: Record<string, string> = {};

export function readStorage(k: string): string | null {
  try {
    const v = localStorage.getItem(k);
    if (v !== null) return v;
  } catch {
    // LocalStorage blocked/unavailable
  }
  return k in memoryCache ? memoryCache[k] : null;
}

export function writeStorage(k: string, v: string): void {
  try {
    localStorage.setItem(k, v);
    return;
  } catch {
    // LocalStorage blocked/unavailable
  }
  memoryCache[k] = v;
}

export function removeStorage(k: string): void {
  try {
    localStorage.removeItem(k);
  } catch {
    // LocalStorage blocked/unavailable
  }
  delete memoryCache[k];
}

export function getJson<T>(k: string, def: T): T {
  try {
    const v = readStorage(k);
    return v ? JSON.parse(v) : def;
  } catch {
    return def;
  }
}

export function setJson<T>(k: string, val: T): void {
  writeStorage(k, JSON.stringify(val));
}

export function listKeys(): string[] {
  const arr: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) arr.push(key);
    }
  } catch {
    // fallback
  }
  Object.keys(memoryCache).forEach((k) => {
    if (!arr.includes(k)) arr.push(k);
  });
  return arr;
}

export function dateToString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(s: string, n: number): string {
  const d = parseDate(s);
  d.setDate(d.getDate() + n);
  return dateToString(d);
}

export function getTodayString(): string {
  return dateToString(new Date());
}

export function getWeekStart(s: string): string {
  const d = parseDate(s);
  // Saturday as week start in Somali system: (d.getDay() + 1) % 7
  const diff = (d.getDay() + 1) % 7;
  return addDays(s, -diff);
}

export function formatSomaliDate(s: string): { title: string; subtitle: string } {
  const d = parseDate(s);
  const dayName = DAYS[d.getDay()];
  const monthName = MONS[d.getMonth()];
  const formatted = `${dayName}, ${d.getDate()} ${monthName} ${d.getFullYear()}`;
  const today = getTodayString();
  const subtitle = s === today ? 'Maanta' : addDays(s, 1) === today ? 'Shalay' : 'Maalin hore';
  return { title: formatted, subtitle };
}

export function formatTimeDisplay(t: string, is12h: boolean): string {
  if (!is12h) return t;
  const h = parseInt(t.slice(0, 2), 10);
  const m = t.slice(3);
  const hour12 = h % 12 || 12;
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${hour12}:${m} ${ampm}`;
}

// ===== MULTI-USER PROFILES =====
export const INITIAL_PROFILES: UserAccount[] = [
  {
    id: 'p_default',
    name: 'Canab Ahmed',
    avatar: '🧕',
    color: '#0fb5a6',
    role: 'caadi',
    bio: 'Nolosha wanaagsan waa joogtayn iyo qorshe suubban.',
    createdAt: '2026-01-01',
  },
  {
    id: 'p_axmed',
    name: 'Axmed Cabdi',
    avatar: '👨‍💼',
    color: '#6d5bff',
    role: 'ganacsade',
    bio: 'Yoolkaygu waa ganacsi barwaaqo ah iyo aqoon joogto ah.',
    createdAt: '2026-01-05',
  },
  {
    id: 'p_faadumo',
    name: 'Faadumo Cali',
    avatar: '🎓',
    color: '#f43f5e',
    role: 'arday',
    bio: 'Barashada cilmiga iyo quraanka kariimka ah.',
    createdAt: '2026-02-10',
  },
];

export function getActiveProfileId(): string {
  return readStorage(P + 'active_profile') || 'p_default';
}

export function setActiveProfileId(id: string): void {
  writeStorage(P + 'active_profile', id);
}

export function getUserProfiles(): UserAccount[] {
  const stored = getJson<UserAccount[]>(P + 'profiles_list', []);
  return stored && stored.length > 0 ? stored : INITIAL_PROFILES;
}

export function saveUserProfiles(profiles: UserAccount[]): void {
  setJson(P + 'profiles_list', profiles);
}

export function getProfilePrefix(profileId?: string): string {
  const currentId = profileId || getActiveProfileId();
  const prefix = `${P}u_${currentId}:`;
  // Backward compatibility migration for default profile
  if (currentId === 'p_default' && !readStorage(prefix + 'cfg') && readStorage(P + 'cfg')) {
    writeStorage(prefix + 'cfg', readStorage(P + 'cfg') || '');
    if (readStorage(P + 'g')) writeStorage(prefix + 'g', readStorage(P + 'g') || '');
  }
  return prefix;
}

export const DEFAULT_REMINDERS: CustomReminder[] = [
  {
    id: 'r_water',
    time: '08:30',
    title: 'Cab biyo nadiif ah',
    prompt: 'Cab ugu yaraan hal galaas oo biyo ah si aad tamar iyo caafimaad u hesho.',
    enabled: true,
    soundEnabled: true,
    category: 'biyo',
  },
  {
    id: 'r_email',
    time: '11:15',
    title: 'Eeg iimaylka & ganacsiga',
    prompt: 'Hubi iimayllada shaqada ama macaamiisha, oo ku jawaab fariimaha muhiimka ah.',
    associatedTaskId: 'p9',
    enabled: true,
    soundEnabled: true,
    category: 'guud',
  },
  {
    id: 'r_quran',
    time: '13:00',
    title: 'Quraan akhris & tadabbur',
    prompt: 'Waa xilligii akhriska Quraanka maanta. Bogaggaaga dhammaystir.',
    associatedTaskId: 'p11',
    enabled: true,
    soundEnabled: true,
    category: 'salaad',
  },
  {
    id: 'r_walk',
    time: '16:15',
    title: 'Socod gaaban / Nasasho',
    prompt: 'Indhaha ka qaad shaashadda, socod yar samee oo fidso jidhka.',
    enabled: true,
    soundEnabled: false,
    category: 'jimicsi',
  },
  {
    id: 'r_night',
    time: '20:15',
    title: 'Xusuus-qor & Qorshaha Berri',
    prompt: 'Maxaad qabatay maanta? Qor 3 nicmo oo aad ku mahadnaqayso iyo qorshaha berri.',
    associatedTaskId: 'p18',
    enabled: true,
    soundEnabled: true,
    category: 'aqris',
  },
];

export function getDefaultConfig(): AppConfig {
  return {
    v: 6,
    plan: makeDefaultPlan(),
    h12: true,
    thr: 80,
    theme: 'auto',
    reminders: DEFAULT_REMINDERS,
    weeklyTargetDays: 5,
  };
}

export function normalizeConfig(cfg: any): AppConfig {
  if (!cfg || typeof cfg !== 'object' || !Array.isArray(cfg.plan)) {
    return getDefaultConfig();
  }
  return {
    v: cfg.v || 6,
    plan: cfg.plan,
    h12: cfg.h12 ?? true,
    thr: Math.max(30, Math.min(100, cfg.thr ?? 80)),
    theme: cfg.theme || 'auto',
    reminders: Array.isArray(cfg.reminders) ? cfg.reminders : DEFAULT_REMINDERS,
    weeklyTargetDays: Math.max(1, Math.min(7, cfg.weeklyTargetDays ?? 5)),
  };
}

export const DEFAULT_HABITS: HabitItem[] = [];

export const DEFAULT_GOALS: GoalItem[] = [];

export const DEFAULT_ATHKAAR: AthkaarItem[] = [
  { id: 'ath_subxan', ar: 'سُبْحَانَ اللَّهِ', som: 'SubxaanAllaah (Allaah baa xumaan ka nasahan)', target: 33, cat: 'tasbeeh' },
  { id: 'ath_xamdi', ar: 'الْحَمْدُ لِلَّهِ', som: 'Alxamdulillaah (Mahad oo dhan Allaah baa iska leh)', target: 33, cat: 'tasbeeh' },
  { id: 'ath_takbiir', ar: 'اللَّهُ أَكْبَرُ', som: 'Allaahu Akbar (Allaah baa ugu weyn wax kasta)', target: 34, cat: 'tasbeeh' },
  { id: 'ath_towl', ar: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', som: 'Laa ilaaha illallaahu waxdahu laa shariika lah', target: 100, cat: 'subax' },
  { id: 'ath_istigfaar', ar: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', som: 'Astaghfirullaaha wa atuubu ilayh', target: 100, cat: 'guud' },
  { id: 'ath_salawat', ar: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ', som: 'Allaahumma salli wa sallim calaa nabiyyinaa Muxammad', target: 50, cat: 'guud' },
  { id: 'ath_xawla', ar: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', som: 'Laa xawla walaa quwwata illaa billaah', target: 33, cat: 'guud' },
];

export function sanitizeCourses(raw: any): Record<string, any> {
  const cleaned: Record<string, any> = {};
  if (!raw || typeof raw !== 'object') return cleaned;
  for (const [k, v] of Object.entries(raw)) {
    const lk = k.toLowerCase();
    const vn = (v as any)?.n?.toLowerCase() || '';
    if (
      k === 'acc' ||
      k === 'ai' ||
      lk.includes('acc') ||
      lk.includes('accounting') ||
      lk.includes('automation') ||
      vn.includes('accounting') ||
      vn.includes('automation')
    ) {
      continue;
    }
    cleaned[k] = v;
  }
  return cleaned;
}

export function getDefaultGlobalState(): GlobalState {
  const profiles = getUserProfiles();
  const activeId = getActiveProfileId();
  const currentProfile = profiles.find((p) => p.id === activeId) || profiles[0] || INITIAL_PROFILES[0];

  return {
    profile: currentProfile,
    profiles,
    activeProfileId: activeId,
    bk: [],
    habits: [],
    goals: [],
    athkaar: DEFAULT_ATHKAAR,
    posts: DEFAULT_USER_POSTS,
    journals: {},
    q: 1,
    c: {},
    mg: [],
    wr: {},
    ln: {
      qz: { best: 5, played: 3 },
      cm: { day: '', cur: 0, n: {} },
    },
  };
}

export function normalizeGlobalState(o: any): GlobalState {
  const d = getDefaultGlobalState();
  if (!o || typeof o !== 'object') return d;
  return {
    profile: o.profile && typeof o.profile === 'object' ? { ...d.profile, ...o.profile } : d.profile,
    profiles: Array.isArray(o.profiles) && o.profiles.length > 0 ? o.profiles : d.profiles,
    activeProfileId: o.activeProfileId || d.activeProfileId,
    bk: Array.isArray(o.bk) ? o.bk.filter((b: any) => b && b.id) : [],
    habits: Array.isArray(o.habits) ? o.habits : [],
    goals: Array.isArray(o.goals) ? o.goals : [],
    athkaar: Array.isArray(o.athkaar) && o.athkaar.length > 0 ? o.athkaar : d.athkaar,
    posts: Array.isArray(o.posts) && o.posts.length > 0 ? o.posts : DEFAULT_USER_POSTS,
    journals: o.journals && typeof o.journals === 'object' ? o.journals : {},
    q: Math.max(0, Math.min(604, +o.q || 0)),
    c: sanitizeCourses(o.c),
    mg: Array.isArray(o.mg) ? o.mg : [],
    wr: o.wr && typeof o.wr === 'object' ? o.wr : {},
    ln: o.ln && typeof o.ln === 'object' ? o.ln : d.ln,
  };
}

export function normalizeDayRecord(o: any): DayRecord {
  const base = o && typeof o === 'object' ? o : {};
  return {
    c: base.c && typeof base.c === 'object' ? base.c : {},
    ses: Array.isArray(base.ses) ? base.ses : [],
    gym: Array.isArray(base.gym) ? base.gym : [],
    tx: Array.isArray(base.tx) ? base.tx : [],
    dd: Array.isArray(base.dd) ? base.dd : [],
    tz: base.tz && typeof base.tz === 'object' ? base.tz : {},
    qp: +base.qp || 0,
    sl: base.sl !== undefined ? +base.sl : undefined,
    lr: Array.isArray(base.lr) ? base.lr : [],
    rd: base.rd && typeof base.rd === 'object' ? base.rd : {},
    g0: base.g0 || '',
    g1: base.g1 || '',
    g2: base.g2 || '',
    th: base.th || '',
    le: base.le || '',
    gn: base.gn || '',
    nx: base.nx || '',
    journal: base.journal && typeof base.journal === 'object' ? base.journal : undefined,
  };
}

export function getDayRecord(dateStr: string, profileId?: string): DayRecord {
  const prefix = getProfilePrefix(profileId);
  return normalizeDayRecord(getJson(prefix + 'd:' + dateStr, {}));
}

export function saveDayRecord(dateStr: string, data: DayRecord, profileId?: string): void {
  const prefix = getProfilePrefix(profileId);
  setJson(prefix + 'd:' + dateStr, data);
}

export function autoCheckRoutine(p: RoutineItem, d: DayRecord): boolean {
  if (!p.a) return false;
  if (p.a === 'quran') return d.qp > 0;
  if (p.a === 'gym') return d.gym.length > 0;
  if (p.a === 'learn') return d.lr.length >= (p.m || 3);
  if (p.a === 'read') {
    const totalPages = Object.values(d.rd || {}).reduce((sum, n) => sum + (+n || 0), 0);
    return totalPages >= (p.m || 10);
  }
  if (p.a === 'acc' || p.a === 'ai') {
    const reg = RE[p.a];
    const mins = d.ses.filter((x) => reg.test(x.s)).reduce((sum, x) => sum + x.m, 0);
    return mins >= (p.m || 30);
  }
  return false;
}

export function isItemCompleted(p: RoutineItem, d: DayRecord): boolean {
  return !!d.c[p.id] || autoCheckRoutine(p, d);
}

export function calculateDayProgress(dateStr: string, plan: RoutineItem[], profileId?: string): number {
  if (!plan.length) return 0;
  const d = getDayRecord(dateStr, profileId);
  const doneCount = plan.filter((p) => isItemCompleted(p, d)).length;
  return doneCount / plan.length;
}

export function calculateCurrentStreak(
  todayStr: string,
  plan: RoutineItem[],
  threshold = 80,
  profileId?: string
): number {
  const thr = threshold / 100;
  const todayProgress = calculateDayProgress(todayStr, plan, profileId);

  let streak = 0;
  let checkDate = todayStr;

  if (todayProgress >= thr) {
    streak = 1;
    checkDate = addDays(todayStr, -1);
  } else {
    checkDate = addDays(todayStr, -1);
  }

  for (let i = 0; i < 365; i++) {
    const prog = calculateDayProgress(checkDate, plan, profileId);
    if (prog >= thr) {
      streak++;
      checkDate = addDays(checkDate, -1);
    } else {
      break;
    }
  }

  return streak;
}

export function calculateBestStreak(
  plan: RoutineItem[],
  threshold = 80,
  profileId?: string
): number {
  const thr = threshold / 100;
  const prefix = getProfilePrefix(profileId);
  const keys = listKeys()
    .filter((k) => k.startsWith(prefix + 'd:'))
    .map((k) => k.slice(prefix.length + 2))
    .filter((s) => /^\d{4}-\d{2}-\d{2}$/.test(s))
    .sort();

  if (!keys.length) return 0;

  let maxStreak = 0;
  let cur = 0;
  let lastDate: string | null = null;

  for (const d of keys) {
    const prog = calculateDayProgress(d, plan, profileId);
    if (prog >= thr) {
      if (lastDate && addDays(lastDate, 1) === d) {
        cur++;
      } else {
        cur = 1;
      }
      lastDate = d;
      if (cur > maxStreak) maxStreak = cur;
    } else {
      cur = 0;
      lastDate = null;
    }
  }

  return maxStreak;
}

export function calculateWeeklyStreakInfo(
  todayStr: string,
  plan: RoutineItem[],
  threshold = 80,
  targetDaysPerWeek = 5,
  profileId?: string
): WeeklyStreakInfo {
  const thr = threshold / 100;
  const currentWeekStart = getWeekStart(todayStr);

  const isWeekAchieved = (wStart: string): { achieved: boolean; count: number } => {
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const d = addDays(wStart, i);
      if (calculateDayProgress(d, plan, profileId) >= thr) {
        count++;
      }
    }
    return { achieved: count >= targetDaysPerWeek, count };
  };

  const { count: currentWeekDaysAchieved, achieved: isCurrentWeekAchieved } = isWeekAchieved(currentWeekStart);

  let currentWeeklyStreak = 0;
  if (isCurrentWeekAchieved) {
    currentWeeklyStreak = 1;
    for (let w = 1; w < 104; w++) {
      const prevWeekStart = addDays(currentWeekStart, -w * 7);
      if (isWeekAchieved(prevWeekStart).achieved) {
        currentWeeklyStreak++;
      } else {
        break;
      }
    }
  } else {
    for (let w = 1; w < 104; w++) {
      const prevWeekStart = addDays(currentWeekStart, -w * 7);
      if (isWeekAchieved(prevWeekStart).achieved) {
        currentWeeklyStreak++;
      } else {
        break;
      }
    }
  }

  const prefix = getProfilePrefix(profileId);
  const keys = listKeys()
    .filter((k) => k.startsWith(prefix + 'd:'))
    .map((k) => k.slice(prefix.length + 2))
    .filter((s) => /^\d{4}-\d{2}-\d{2}$/.test(s))
    .sort();

  const weekStartsSet = new Set<string>();
  keys.forEach((d) => weekStartsSet.add(getWeekStart(d)));
  weekStartsSet.add(currentWeekStart);

  const sortedWeekStarts = Array.from(weekStartsSet).sort();
  let bestWeeklyStreak = 0;
  let runningWeekStreak = 0;
  let prevWStart: string | null = null;

  sortedWeekStarts.forEach((ws) => {
    const { achieved } = isWeekAchieved(ws);
    if (achieved) {
      runningWeekStreak = prevWStart && addDays(prevWStart, 7) === ws ? runningWeekStreak + 1 : 1;
      prevWStart = ws;
    } else {
      runningWeekStreak = 0;
      prevWStart = null;
    }
    if (runningWeekStreak > bestWeeklyStreak) {
      bestWeeklyStreak = runningWeekStreak;
    }
  });

  bestWeeklyStreak = Math.max(bestWeeklyStreak, currentWeeklyStreak);

  return {
    currentWeeklyStreak,
    bestWeeklyStreak,
    currentWeekDaysAchieved,
    targetDaysPerWeek,
    isCurrentWeekAchieved,
  };
}

export function playChimeSound(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.14, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.45);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, now + 0.15);
    gain2.gain.setValueAtTime(0.18, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.75);
  } catch {
    // Audio context may require interaction first
  }
}

export async function triggerPushNotification(
  title: string,
  prompt: string,
  soundEnabled = true
): Promise<boolean> {
  if (soundEnabled) {
    playChimeSound();
  }

  try {
    if ('vibrate' in navigator) {
      navigator.vibrate([120, 60, 120]);
    }
  } catch {}

  if (!('Notification' in window)) return false;

  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body: prompt,
        icon: '/favicon.ico',
      });
      return true;
    } catch {
      return false;
    }
  } else if (Notification.permission !== 'denied') {
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      try {
        new Notification(title, {
          body: prompt,
          icon: '/favicon.ico',
        });
        return true;
      } catch {
        return false;
      }
    }
  }
  return false;
}

export function applyThemeMode(theme: 'auto' | 'light' | 'dark'): void {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}
