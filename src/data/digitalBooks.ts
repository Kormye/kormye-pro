import { Book } from '../types/index.ts';

export const CURATED_DIGITAL_BOOKS: Book[] = [
  {
    id: 'b_atomic',
    n: 'Atomic Habits (Caadooyinka Yaryar)',
    author: 'James Clear',
    t: 320,
    c: 45,
    category: 'Horumar Shakhsi',
    coverColor: 'from-amber-500 to-orange-600',
    rating: 5,
    status: 'aqrinaya',
    summary: 'Sida isbeddello yaryar oo maalinle ah ay u horseedaan natiijooyin waaweyn oo nolosha wax ka beddela.',
    quotes: [
      { id: 'q1', text: 'Ma gaadhid heerka hadafyadaada, waxaad ku dhacdaa heerka nidaamyada aad dhisatay.', page: 27, date: '2026-10-10' },
      { id: 'q2', text: 'Haddii aad maalin kasta 1% ka fiicnaato, sannad gudihiis waxaad 37 jeer ka fiicnaan doontaa naftaadii hore.', page: 15, date: '2026-10-12' }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Cutubka 1aad: Awoodda Caadooyinka Yaryar (1% Horumar)',
        content: `Waa wax aad u fudud inaan dhayalsanno muhiimadda ay leedahay inaan samayno horumar yar maalin kasta. Waxaan badanaa isku qancinnaa in guusha weyni ay u baahan tahay ficil weyn oo lama-filaan ah. Hadday tahay miisaanka oo la dhimo, ganacsi la dhiso, ama luqad la barto, waxaan saarnaa culays weyn sidii inaan hal mar dunida rogi lahayn.

Hase yeeshee, horumarka 1% ee maalinlaha ahi maaha mid markiiba la dareemo, laakiin marka muddo la joogo waa mid xad-dhaaf ah oo cajiib ah. 

Xisaabtu waa mid aad u fudud: Haddii aad 1% ka fiicnaato maalin walba hal sano gudaheed, waxaad noqonaysaa 37 jeer qof ka fiican kii aad bilowgii ahayd (1.01^365 = 37.78). Taa beddelkeeda, haddii aad 1% ka sii xumaato maalin walba, waxaad hoos ugu dhacaysaa eber ku dhowaad.

Caadooyinku waa sida dulsaarka xisaabta (compound interest) ee horumarka nafta. Sida lacagtu u korto marka maalgashiga la badiyo, ayay tayada noloshaaduna u korto marka aad ku celceliso caadooyinka wanaagsan.`
      },
      {
        id: 'c2',
        title: 'Cutubka 2aad: Dooro Nidaamka, Ha Ku Dhexlumin Yoolalka',
        content: `Dadka guuleysta iyo kuwa guuldarraysta waxay wadaagaan isku yoolal. Qof kasta oo orod u tartamaya wuxuu rabaa inuu biladda dahabka ah qaato. Qof kasta oo ganacsi bilaabaya wuxuu rabaa faa'iido. Haddaba haddii hadafku isku mid yahay, maxaa kala sooca kuwa guuleysta iyo kuwa hadha?

Farqigu waa nidaamka (system). Yoolku waa meesha aad rabto inaad gaadho, laakiin nidaamku waa habka maalinlaha ah ee kugu hagaya meeshaas.

Haddii aad tahay tababare, hadafkaagu waa inaad koobka qaaddo. Nidaamkaagu waa habka kooxdaadu u tababarto maalin kasta. Haddii aad gebi ahaanba iska ilowdo koobka oo aad kaliya diiradda saarto tababarka maalinlaha ah, miyaad guulaysan lahayd? Haa, hubaal!

Dhis nidaam maalinle ah oo adag; yoolalku iyagaa iska iman doona markaad nidaamka ilaaliso.`
      },
      {
        id: 'c3',
        title: 'Cutubka 3aad: 4-ta Xeer ee Isbeddelka Caadooyinka',
        content: `Si aad u dhisto caado cusub oo waarta, waa inaad martaa afartan tallaabo:

1. Ka dhig mid cad (Make it obvious): Xilliga iyo goobta aad hawsha qabanayso si cad u qeex. Tusaale: "Waxaan Quraanka akhrin doonaa salaadda Duhur ka dib qolkayga dhexdiisa."
2. Ka dhig mid soo jiidasho leh (Make it attractive): Ku xidh caadada cusub wax aad jeceshahay inaad samayso (Habit Stacking).
3. Ka dhig mid fudud (Make it easy): Yaree caqabadaha hortaagan bilowga. Sharciga labada daqiiqo (2-minute rule) isticmaal: hawshu waa inaysan qaadan wax ka badan 2 daqiiqo markaad bilaabayso.
4. Ka dhig mid lagu qanco (Make it satisfying): Naftaada u abaal-mari isla markaad hawsha dhammaystirto, adigoo dareemaya guul iyo horumar.`
      }
    ]
  },
  {
    id: 'b_richdad',
    n: 'Rich Dad Poor Dad (Aabbaha Qaniga ah & Aabbaha Saboolka ah)',
    author: 'Robert T. Kiyosaki',
    t: 280,
    c: 72,
    category: 'Ganacsi & Maaliyad',
    coverColor: 'from-emerald-500 to-teal-700',
    rating: 5,
    status: 'aqrinaya',
    summary: 'Waxyaabaha ay dadka hodanka ahi baraan carruurtooda ee aysan barin dugsiyada caadiga ah.',
    quotes: [
      { id: 'q3', text: 'Dadka saboolka ah waxay u shaqeeyaan lacagta; dadka taajiriinta ah lacagta ayaa u shaqaysa iyaga.', page: 34, date: '2026-10-11' },
      { id: 'q4', text: 'Hantidu waa waxa lacag jeebkaaga ku soo shuba; deymaha ama kharashyaduna waa waxa lacagta jeebkaaga ka saara.', page: 62, date: '2026-10-12' }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Cutubka 1aad: Casharka 1aad - Dadka Taajiriinta ah Uma Shaqeeyaan Lacagta',
        content: `Inta badan dadka waxay ku nool yihiin dabin loo yaqaan "Orodka Jiirka" (Rat Race). Waxay koraan, galaan jaamacad, helaan shaqo, mushahar qaataan, kaddibna kharashkoodu wuu kordhaa: baabuur cusub, guri weyn, canshuuro dheeraad ah. Waxay u baahdaan mushahar ka badan, haddana markay helaan, wax badan ayay bixiyaan.

Sababtu wax kale maaha: cabsida iyo damaca ayaa maamula noloshooda. Cabsida ah inaysan lacag la'aan noqon waxay ku qasabtaa inay subax kasta shaqo aadaan, damacuna wuxuu ku riixaa inay wax kasta oo ay helaan isla markiiba ku bixiyaan waxyaabo aan faa'iido keenayn.

Aabbaha Qaniga ahi wuxuu i baray: "Baro sida lacagtu u shaqeyso, ha u noqon addoon lacagta, balse ka yeel lacagta shaqaale adiga kuu shaqeeya habeen iyo maalin."`
      },
      {
        id: 'c2',
        title: 'Cutubka 2aad: Kala Saaridda Hantida (Assets) iyo Deymaha (Liabilities)',
        content: `Tani waa xeerka koowaad ee maaliyadda: Waa inaad taqaanaa farqiga u dhexeeya Hanti iyo Deyn, waana inaad iibsataa hanti keliya!

Dad badan ayaa u haysta in guriga ay deggan yihiin uu yahay hantidooda ugu weyn. Laakiin haddii gurigaasi bishiiba kaa rabo dayactir, cashuur, iyo deyn bangi oo uusan hal doollar kuu soo xarayn, dhab ahaantii waa kharash iyo deyn (Liability).

Hantida dhabta ahi waxay noqon kartaa:
- Ganacsi u shaqeeya adiga oo aan goobjoog ka ahayn.
- Guri ama dhul kiro kuu soo xareeya (Real estate).
- Saamiyo ama xisaabaad faa'iido joogto ah leh.
- Hanti garaad (buugaag, koorsooyin, shatiyo royalty keenaya).`
      }
    ]
  },
  {
    id: 'b_deepwork',
    n: 'Deep Work (Shaqada Qotada Dheer)',
    author: 'Cal Newport',
    t: 300,
    c: 120,
    category: 'Xirfad & Wax-soo-saar',
    coverColor: 'from-blue-600 to-indigo-800',
    rating: 5,
    status: 'aqrinaya',
    summary: 'Xeerarka guusha ee dunida mashquulka iyo carqaladaha badan ee maanta.',
    quotes: [
      { id: 'q5', text: 'Awoodda aad diiradda ugu yeelan karto hawl adag adigoo aan mashquulin waa xirfadda ugu qiimaha badan qarnigan.', page: 18, date: '2026-10-09' }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Cutubka 1aad: Muhiimadda Shaqada Qotada Dheer',
        content: `Shaqada qotada dheer (Deep Work) waa awoodda aad maskaxdaada si buuxda ugu foojin karto hawl adag adigoo gebi ahaanba iska fogaynaya dhammaan fariimaha, baraha bulshada, iyo wicitaannada aan muhiimka ahayn.

Dunida maanta waxaa ku batay "Shaqada Dul-ka-xaadiska ah" (Shallow Work) - sida eegidda emayllada, ka jawaabista WhatsApp-ka, iyo daalacashada wararka. Shaqada noocan ahi ma abuurto qiimo cusub oo weyn, mana adka in qof kale lagu beddelo.

Haddii aad rabto inaad noqoto qof ku sarreeya maaliyadda, xisaabaadka, programming-ka, ama qoraalka, waa inaad maalin kasta heshaa ugu yaraan 90 ilaa 120 daqiiqo oo shaqo qoto dheer ah.`
      }
    ]
  },
  {
    id: 'b_prophet',
    n: 'Nebiga NNKH Sida Loogu Daydo',
    author: 'Daraasaadka Diinta & Akhlaaqda',
    t: 260,
    c: 88,
    category: 'Diin & Akhlaaq',
    coverColor: 'from-teal-600 to-emerald-800',
    rating: 5,
    status: 'aqrinaya',
    summary: 'Dabeecadda suubban, dulqaadka, maamulka, iyo nolosha Rasuulka Muxammad SCW.',
    quotes: [
      { id: 'q6', text: 'Qofka ugu kheyrka badan waa kan ugu akhlaaqda wanaagsan uguna naxariista badan ehelkiisa.', page: 42, date: '2026-10-08' }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Cutubka 1aad: Naxariista iyo Dabeecadda Suubban',
        content: `Rasuulku NNKH wuxuu ahaa qofka ugu qalbi jilicsan uguna dabeecad wanaagsan dadka. Weligii qof kuma caayin afkiisa, wax xunna kuma abaalmarin wax xun, balse wuxuu cafin jiray kuwa dulmiya.

Markii uu dadka la hadlayo, wuxuu u jeedsan jiray jirkiisa oo dhan isagoo dhageysanaya si buuxda. Tani waxay baraysaa maanta hoggaamiyaha iyo qofka kasta qiimaha ay leedahay dhageysiga dhabta ah iyo ixtiraamka bini'aadamka.

Nidaamka maalinlaha ahi wuxuu ku qotomaa salaadda, xusuusta Allaah, daacadnimada shaqada, iyo wax u qabashada danyarta.`
      }
    ]
  },
  {
    id: 'b_money',
    n: 'The Psychology of Money (Nafsiyadda Lacagta)',
    author: 'Morgan Housel',
    t: 250,
    c: 60,
    category: 'Ganacsi & Maaliyad',
    coverColor: 'from-violet-600 to-purple-800',
    rating: 5,
    status: 'aqrinaya',
    summary: 'Sida dabeecadahaaga iyo dareenkaagu ay uga muhiimsan yihiin xisaabta marka ay timaado maamulka lacagta.',
    quotes: [
      { id: 'q7', text: 'Inaad lacag hesho waxay u baahan tahay halis; laakiin inaad lacagta haysato waxay u baahan tahay is-hoosaysiin iyo taxadar.', page: 85, date: '2026-10-05' }
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Cutubka 1aad: Ma jiro Qof Waalan Marka ay Timaado Lacagta',
        content: `Habka aad lacagta u maamusho kuma xidhna kaliya caqligaaga ama aqoontaada xisaabeed, laakiin waxay ku xidhan tahay taariikhdaadii hore iyo waayihii aad soo martay.

Qof ku koray xilli sicir-barar daran ka jiray wuxuu lacagta u arkayaa si ka duwan qof ku koray xilli barwaaqo ah. Sidaas darteed, ha ku xukumin dadka go'aamadooda dhaqaale adigoo aan garanayn dabeecadaha hagaya.

Sirta ugu weyn ee xorriyadda dhaqaaluhu maaha inaad wax walba iibsato, balse waa inaad hesho awood aad ku maamusho wakhtigaaga subax kasta markaad hurdada ka kacdo.`
      }
    ]
  }
];
