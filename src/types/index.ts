export type CategoryType = 'sal' | 'tac' | 'jim' | 'nas' | 'hur' | 'duc';

export type AutoTriggerType = '' | 'learn' | 'read' | 'quran' | 'gym' | 'acc' | 'ai';

export interface RoutineItem {
  id: string;
  t: string; // "HH:MM" 24h format
  title: string;
  note: string;
  cat: CategoryType;
  em: string;
  a?: AutoTriggerType;
  m?: number; // target minutes or count
}

export interface FocusSession {
  s: string; // subject / topic
  m: number; // minutes
}

export interface Transaction {
  a: number; // amount
  n: string; // description
  t: 'in' | 'out'; // income or expense
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: 'farxad' | 'degan' | 'dadaal' | 'daal' | 'mahad';
  gratitude: string[];
  success: string;
  improvement: string;
  dua: string;
}

export interface DayRecord {
  c: Record<string, boolean>; // checked routine item ids
  ses: FocusSession[];
  gym: string[]; // muscle groups selected
  tx: Transaction[];
  dd: string[]; // sunnah deeds
  tz: Record<string, number>; // tasbeeh counts
  qp: number; // pages of quran read today
  sl?: number; // hours slept
  lr: string[]; // learned item keys today e.g. "w:3", "cm:2"
  rd: Record<string, number>; // bookId -> pages read today
  g0?: string; // target 1
  g1?: string; // target 2
  g2?: string; // target 3
  th?: string; // gratitude reflection
  le?: string; // lesson learned
  gn?: string; // gym note
  nx?: string; // tomorrow's plan
  journal?: JournalEntry; // daily muhasabah journal
}

export interface CourseProgress {
  n: string;
  d: number; // completed
  t: number; // total
}

export interface BookQuote {
  id: string;
  text: string;
  page?: number;
  date: string;
}

export interface BookChapter {
  id: string;
  title: string;
  content: string;
  summary?: string;
  keyTakeaways?: string[];
  actionStep?: string;
  quote?: string;
}

export interface Book {
  id: string;
  n: string; // title
  author?: string;
  t: number; // total pages
  c: number; // current page
  category?: string;
  coverColor?: string;
  coverImage?: string;
  quotes?: BookQuote[];
  status?: 'aqrinaya' | 'socda' | 'dhammaystiray' | 'qorshe';
  rating?: number;
  summary?: string;
  chapters?: BookChapter[];
  takeaways?: string[];
  lastReadDate?: string;
}

export interface HabitItem {
  id: string;
  title: string;
  category: 'biyo' | 'aqris' | 'jimicsi' | 'cunno' | 'naxariis' | 'salaad' | 'kale';
  icon: string;
  targetCount: number;
  currentCount: number;
  unit: string;
  color: string;
  completedDays?: Record<string, boolean>;
}

export type GoalScope = 'todobaadle' | 'bille' | 'xor' | 'maalinle' | 'sannadle';
export type GoalCategory = 'aqoon' | 'caafimaad' | 'lacag' | 'qoys' | 'shakhsi' | 'diin';

export interface GoalItem {
  id: string;
  title: string;
  scope: GoalScope;
  category: GoalCategory;
  progress: number;
  target: number;
  unit: string;
  completed: boolean;
  dueDate?: string;
  milestones?: { id: string; text: string; done: boolean }[];
}

export interface UserPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  category: string;
  content: string; // long-form, rich multi-line knowledge or business text
  createdAt: string;
  type: 'aqoon' | 'ganacsi';
  likes?: number;
  tags?: string[];
}

export interface UserAccount {
  id: string;
  name: string;
  avatar: string; // emoji or icon
  photoUrl?: string; // profile photo image url or data url
  color: string;
  role: 'arday' | 'ganacsade' | 'shaqaale' | 'caadi';
  bio: string;
  email?: string;
  createdAt: string;
  isRegistered?: boolean;
}

export interface MonthlyGoal {
  t: string;
  d: boolean;
}

export interface WeeklyReview {
  w1?: string; // successes
  w2?: string; // next week improvements
}

export interface LearnState {
  seen: number[];
  fav: number[];
  done: number[];
  cur: number;
  day?: string;
}

export interface AthkaarItem {
  id: string;
  ar: string;
  som: string;
  target: number;
  cat?: string;
}

export interface GlobalState {
  profile: UserAccount;
  profiles: UserAccount[];
  activeProfileId: string;
  bk: Book[];
  habits: HabitItem[];
  goals: GoalItem[];
  athkaar?: AthkaarItem[];
  posts?: UserPost[];
  journals: Record<string, JournalEntry>; // date -> journal
  q: number; // Quran current page (0-604)
  c: Record<string, CourseProgress>;
  mg: MonthlyGoal[];
  wr: Record<string, WeeklyReview>; // weekStart -> review
  ln: {
    qz?: { best: number; played: number };
    cm?: { day: string; cur: number; n: Record<number, number> };
    [key: string]: any;
  };
}

export interface CustomReminder {
  id: string;
  time: string; // "HH:MM" in 24h
  title: string;
  prompt: string;
  associatedTaskId?: string;
  enabled: boolean;
  soundEnabled?: boolean;
  category?: 'biyo' | 'aqris' | 'jimicsi' | 'salaad' | 'guud';
  repeat?: string;
}

export interface WeeklyStreakInfo {
  currentWeeklyStreak: number;
  bestWeeklyStreak: number;
  currentWeekDaysAchieved: number;
  targetDaysPerWeek: number;
  isCurrentWeekAchieved: boolean;
}

export interface AppConfig {
  v: number;
  plan: RoutineItem[];
  h12: boolean;
  thr: number; // streak threshold percentage (e.g. 80)
  theme: 'auto' | 'light' | 'dark';
  reminders: CustomReminder[];
  weeklyTargetDays: number;
}
