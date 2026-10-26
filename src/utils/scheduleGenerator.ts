import { RoutineItem, CategoryType } from '../types/index.ts';

export type ScheduleArchetype = 'madhan' | 'guud' | 'diin' | 'ganacsi' | 'arday';

export interface ArchetypeMeta {
  id: ScheduleArchetype;
  name: string;
  emoji: string;
  desc: string;
  highlights: string[];
}

export const ARCHETYPES: ArchetypeMeta[] = [
  {
    id: 'madhan',
    name: 'Qorshe Madhan (Eber ka Bilow)',
    emoji: '📝',
    desc: 'Jadwal nadiif ah oo eber ah. Adigu xor u noqo inaad ku darsato hawlahaaga gaarka ah.',
    highlights: ['Eber ka Bilow', 'Adiga ayaa Qoraya', 'Xoriyad Buuxda'],
  },
  {
    id: 'guud',
    name: 'Isu-Dheelli-Tiran (5 Hawlood)',
    emoji: '🌟',
    desc: 'Qorshe fudud oo kooban: Cibaadada, shaqada, quraanka, iyo akhriska.',
    highlights: ['Fajr & Quraan', 'Shaqo Diirad leh', 'Akhris Buug'],
  },
  {
    id: 'diin',
    name: 'Cibaadada & Quraanka (5 Hawlood)',
    emoji: '🕌',
    desc: 'Diiradda saar xifdiga Quraanka, salaadaha, athkaarta, iyo muxaasabada.',
    highlights: ['Fajr & Athkaar', 'Xifdi Quraan', 'Tasbiix & Duco'],
  },
  {
    id: 'ganacsi',
    name: 'Ganacsiga & Shaqada (5 Hawlood)',
    emoji: '💼',
    desc: 'Qorshe u qaabaysan wax-soo-saar, qorshaynta dakhliga, iyo macaamiisha.',
    highlights: ['Qorshe Maalinle', 'Deep Work', 'Iibka & Macaamiisha'],
  },
  {
    id: 'arday',
    name: 'Ardayga & Barashada (5 Hawlood)',
    emoji: '🎓',
    desc: 'Qorshe ku habboon barashada casharrada, quraanka, iyo akhriska.',
    highlights: ['Quraan Subaxdii', 'Darsi & Study', 'Dib-u-eegis'],
  },
];

export function generateScheduleForArchetype(
  archetype: ScheduleArchetype = 'madhan'
): RoutineItem[] {
  switch (archetype) {
    case 'madhan':
      return [];

    case 'diin':
      return [
        { id: 'p1', t: '05:00', title: 'Salaadda Fajr & Athkaarta Subaxnimo', note: 'Xuska Eebbe & daganaansho', cat: 'sal', em: '🕌' },
        { id: 'p2', t: '06:00', title: 'Quraanka Kariimka (Xifdi & Tadabbur)', note: 'Bogagga maanta', cat: 'duc', em: '📖', a: 'quran' },
        { id: 'p3', t: '12:15', title: 'Salaadda Duhur & Nasasho', note: 'Sunnooyinka & cibaado', cat: 'sal', em: '🕌' },
        { id: 'p4', t: '16:00', title: 'Athkaarta Galabnimo & Tasbiix', note: 'Subxaanallaah, Alxamdulillaah', cat: 'duc', em: '📿' },
        { id: 'p5', t: '20:30', title: 'Akhriska Buugga & Muxaasabo', note: 'Is-xisaabin & xusuus-qor', cat: 'tac', em: '📚', a: 'read', m: 15 },
      ];

    case 'ganacsi':
      return [
        { id: 'p1', t: '05:00', title: 'Salaadda Fajr & Quraan', note: 'Barakada subaxnimo', cat: 'sal', em: '🕌' },
        { id: 'p2', t: '07:30', title: 'Qorshaynta Hadafyada & Dakhliga', note: 'Hawsha ugu muhiimsan maanta', cat: 'tac', em: '📊' },
        { id: 'p3', t: '09:00', title: 'Deep Work: Shaqada Ugu Weyn', note: 'Diirad bilaa mashquul ah', cat: 'tac', em: '💻' },
        { id: 'p4', t: '14:00', title: 'Iibka, Kulamada & Macaamiisha', note: 'Xiriirka iyo heshiisyada', cat: 'tac', em: '🤝' },
        { id: 'p5', t: '20:00', title: 'Akhriska Buug Ganacsi & Hurdo Hore', note: 'Horumarinta maanka', cat: 'tac', em: '📚', a: 'read', m: 15 },
      ];

    case 'arday':
      return [
        { id: 'p1', t: '05:00', title: 'Salaadda Fajr & Xifdiga Quraanka', note: 'Maskaxdu waa nadiif subaxdii', cat: 'duc', em: '📖', a: 'quran' },
        { id: 'p2', t: '08:00', title: 'Casharrada & Darsi-Qaadashada', note: 'Diirad buuxda', cat: 'tac', em: '🎓' },
        { id: 'p3', t: '14:00', title: 'Dib-u-eegista Casharrada & Laylisyada', note: 'Horumarinta fahamka', cat: 'tac', em: '📝' },
        { id: 'p4', t: '18:15', title: 'Salaadda Maqrib & Cishaa', note: 'Cibaadada fiidka', cat: 'sal', em: '🕌' },
        { id: 'p5', t: '20:30', title: 'Akhriska Buugga & Hurdo Hore', note: 'U diyaargarowga berri', cat: 'tac', em: '📚', a: 'read', m: 15 },
      ];

    case 'guud':
    default:
      return [
        { id: 'p1', t: '05:00', title: 'Salaadda Fajr & Athkaarta', note: 'Bilaabashada maalinta', cat: 'sal', em: '🕌' },
        { id: 'p2', t: '06:00', title: 'Quraanka Kariimka', note: 'Akhris iyo barasho', cat: 'duc', em: '📖', a: 'quran' },
        { id: 'p3', t: '08:30', title: 'Shaqo / Koorso Diirad Leh', note: 'Hawsha ugu weyn maanta', cat: 'tac', em: '💻' },
        { id: 'p4', t: '12:15', title: 'Salaadaha Duhur & Casar', note: 'Cibaadada duhurka', cat: 'sal', em: '🕌' },
        { id: 'p5', t: '20:00', title: 'Akhriska Buugga & Hurdo Hore', note: 'Ugu yaraan 15 bog', cat: 'tac', em: '📚', a: 'read', m: 15 },
      ];
  }
}
