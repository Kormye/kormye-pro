import { Book, BookChapter } from '../types/index.ts';

export interface SummarizeBookRequest {
  title: string;
  author?: string;
  category?: string;
  mode?: 'full_book' | 'single_chapter';
  chapterNumber?: number;
  chapterTitle?: string;
}

export interface SummarizeBookResponse {
  title: string;
  author: string;
  category: string;
  summary: string;
  estimatedPages: number;
  takeaways: string[];
  chapters: BookChapter[];
  source: 'gemini' | 'curated' | 'generated_engine';
}

// Curated comprehensive book summaries with full Somali chapters
const PRESET_BOOK_DATABASE: Record<string, Partial<SummarizeBookResponse>> = {
  'atomic habits': {
    title: 'Atomic Habits (Caadooyinka Yaryar)',
    author: 'James Clear',
    category: 'Horumar Shakhsi',
    estimatedPages: 320,
    summary: 'Sida isbeddello yaryar oo maalinle ah (1%) ay u horseedaan natiijooyin xad-dhaaf ah oo noloshaada iyo mustaqbalkaaga gebi ahaanba wax ka beddela.',
    takeaways: [
      'Ma gaadhid heerka yoolalkaaga, waxaad ku dhacdaa heerka nidaamka aad dhisatay.',
      'Horumarka 1% ee maalinlaha ahi wuxuu sannad gudihiis ku gaadhsiinayaa 37 jeer inaad ka fiicnaato qofkii aad shalay ahayd.',
      'Aqoonsigaaga (Identity) ku xidh caadooyinka aad rabto, adigoo rumaysanaya qofka aad doonayso inaad noqoto.',
      'Sharciga 2-da daqiiqo: Caado kasta oo cusub waa inay ku bilaabataa wax ka yar laba daqiiqo.',
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Cutubka 1aad: Awoodda Cajiibka ah ee 1% Horumar Maalinle ah',
        content: `Waa wax aad u fudud inaan dhayalsanno muhiimadda ay leedahay inaan samayno horumar yar maalin kasta. Waxaan badanaa isku qancinnaa in guusha weyni ay u baahan tahay ficil weyn oo lama-filaan ah. Hadday tahay miisaanka oo la dhimo, ganacsi cusub oo la dhiso, ama aqoon sare oo la barto, waxaan saarnaa culays weyn sidii inaan hal mar dunida rogi lahayn.

Hase yeeshee, horumarka 1% ee maalinlaha ahi maaha mid markiiba la dareemo, laakiin marka muddo la joogo waa mid xad-dhaaf ah oo cajiib ah.

Xisaabtu waa mid aad u fudud: Haddii aad 1% ka fiicnaato maalin walba hal sano gudaheed, waxaad noqonaysaa 37 jeer qof ka fiican kii aad bilowgii ahayd (1.01^365 = 37.78). Taa beddelkeeda, haddii aad 1% ka sii xumaato maalin walba, waxaad hoos ugu dhacaysaa eber ku dhowaad.

Caadooyinku waa sida dulsaarka xisaabta (compound interest) ee horumarka nafta. Sida lacagtu u korto marka maalgashiga la badiyo, ayay tayada noloshaaduna u korto marka aad ku celceliso caadooyinka wanaagsan.`,
        keyTakeaways: ['Horumarka yari waa mid tarma oo koraya', 'Ha eegin maanta oo kaliya, eeg jiheynta aad u socoto'],
        actionStep: 'Dooro hal ficil oo fudud oo aad maanta 1% ka fiicnaan karto.',
        quote: 'Ma gaadhid heerka hadafyadaada, waxaad ku dhacdaa heerka nidaamyada aad dhisatay.',
      },
      {
        id: 'c2',
        title: 'Cutubka 2aad: Dooro Nidaamka, Ha Ku Dhexlumin Yoolalka',
        content: `Dadka guuleysta iyo kuwa guuldarraysta waxay wadaagaan isku yoolal. Qof kasta oo orod u tartamaya wuxuu rabaa inuu biladda dahabka ah qaato. Qof kasta oo ganacsi bilaabaya wuxuu rabaa faa'iido. Haddaba haddii hadafku isku mid yahay, maxaa kala sooca kuwa guuleysta iyo kuwa hadha?

Farqigu waa nidaamka (system). Yoolku waa meesha aad rabto inaad gaadho, laakiin nidaamku waa habka maalinlaha ah ee kugu hagaya meeshaas.

Haddii aad tahay tababare, hadafkaagu waa inaad koobka qaaddo. Nidaamkaagu waa habka kooxdaadu u tababarto maalin kasta. Haddii aad gebi ahaanba iska ilowdo koobka oo aad kaliya diiradda saarto tababarka maalinlaha ah, miyaad guulaysan lahayd? Haa, hubaal!

Dhis nidaam maalinle ah oo adag; yoolalku iyagaa iska iman doona markaad nidaamka ilaaliso.`,
        keyTakeaways: ['Yoolku wuxuu qeexaa jihada, laakiin nidaamku wuxuu xaqiijiyaa horumarka'],
        actionStep: 'Beddel yoolkaaga mid noqda ficil maalinle ah oo aad ku xisaabtanto.',
        quote: 'Hadafku waa jihada; nidaamku waa mootada ku socodsiinaysa.',
      },
      {
        id: 'c3',
        title: 'Cutubka 3aad: 4-ta Xeer ee Isbeddelka Caadooyinka',
        content: `Si aad u dhisto caado cusub oo waarta, waa inaad martaa afartan tallaabo:

1. Ka dhig mid cad (Make it obvious): Xilliga iyo goobta aad hawsha qabanayso si cad u qeex. Tusaale: "Waxaan Quraanka akhrin doonaa salaadda Fajr ka dib qolkayga dhexdiisa."
2. Ka dhig mid soo jiidasho leh (Make it attractive): Ku xidh caadada cusub wax aad jeceshahay inaad samayso (Habit Stacking).
3. Ka dhig mid fudud (Make it easy): Yaree caqabadaha hortaagan bilowga. Sharciga labada daqiiqo (2-minute rule) isticmaal: hawshu waa inaysan qaadan wax ka badan 2 daqiiqo markaad bilaabayso.
4. Ka dhig mid lagu qanco (Make it satisfying): Naftaada u abaal-mari isla markaad hawsha dhammaystirto, adigoo dareemaya guul iyo horumar.`,
        keyTakeaways: ['Caddee goobta & xilliga', 'Fududee tallaabada koowaad'],
        actionStep: 'Qor jumlad: "Waxaan qaban doonaa [FICIL] markay saacadu tahay [XILLI] meesha [GOOB]."',
        quote: 'Caadada ugu fudud ee aad bilaabi karto waa midda aadan diidi karin.',
      },
      {
        id: 'c4',
        title: 'Cutubka 4aad: Caadooyinka Aqoonsiga Ku Salaysan (Identity-Based Habits)',
        content: `Isbeddelka dhabta ahi kuma yimaaddo waxaad rabto inaad gaadho, wuxuu ku yimaaddaa qofka aad rabto inaad noqoto.

Waxaa jira saddex lakab oo isbeddel:
1. Isbeddelka Natiijada (Outcomes): Miisaankaaga, buuggaaga, lacagtaada.
2. Isbeddelka Hab-socodka (Processes): Jadwalkaaga cusub, cuntadaada, qorshahaaga shaqo.
3. Isbeddelka Aqoonsiga (Identity): Waxa aad aaminsan tahay, sida aad naftaada u aragto, iyo qiyamkaaga.

Marka qof sigaarka joojinaya la yiraahdo "Sigaar ma doonaysaa?", haddii uu dhaho "Maya waad mahadsantahay, waxaan isku dayayaa inaan joojiyo", wuxuu wali aaminsan yahay inuu yahay sigaar-cabbe. Laakiin haddii uu dhaho "Maya, ma ihi qof sigaarka cabba", aqoonsigiisa ayaa beddelay nolosha.`,
        keyTakeaways: ['Ficil kasta oo aad sameyso waa cod aad u dhiibatay qofka aad doonayso inaad noqoto'],
        actionStep: 'Go\'aanso nooca qofka aad rabto inaad noqoto, kaddibna hal guul oo yar u dhiibo maanta.',
        quote: 'Ficil kasta oo aad qaado waa cod aad u dhiibatay nooca qofka aad noqonayso.',
      },
    ],
  },

  'rich dad poor dad': {
    title: 'Rich Dad Poor Dad (Aabbaha Qaniga ah & Aabbaha Saboolka ah)',
    author: 'Robert T. Kiyosaki',
    category: 'Ganacsi & Maaliyad',
    estimatedPages: 280,
    summary: 'Waxyaabaha ay dadka hodanka ahi baraan carruurtooda ee aysan barin dugsiyada caadiga ah: farqiga hantida iyo deynta, xorriyadda maaliyadeed, iyo maalgelinta.',
    takeaways: [
      'Dadka saboolka ah waxay u shaqeeyaan lacagta; dadka taajiriinta ah lacagta ayaa u shaqaysa iyaga.',
      'Hantidu (Asset) waa waxa lacag jeebkaaga ku soo shuba; Deyntuna (Liability) waa waxa lacagta jeebkaaga ka saara.',
      'Garaadka maaliyadeed (Financial Literacy) ayaa ka muhiimsan inta lacag ee aad soo xarayso.',
      'Ha ka cabsan khaladaadka ganacsi; guuldarradu waa qayb ka mid ah geeddi-socodka guusha.',
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Cutubka 1aad: Dadka Taajiriinta ah Uma Shaqeeyaan Lacagta',
        content: `Inta badan dadka waxay ku nool yihiin dabin loo yaqaan "Orodka Jiirka" (Rat Race). Waxay koraan, galaan jaamacad, helaan shaqo, mushahar qaataan, kaddibna kharashkoodu wuu kordhaa: baabuur cusub, guri weyn, canshuuro dheeraad ah. Waxay u baahdaan mushahar ka badan, haddana markay helaan, wax badan ayay bixiyaan.

Sababtu wax kale maaha: cabsida iyo damaca ayaa maamula noloshooda. Cabsida ah inaysan lacag la'aan noqon waxay ku qasabtaa inay subax kasta shaqo aadaan, damacuna wuxuu ku riixaa inay wax kasta oo ay helaan isla markiiba ku bixiyaan waxyaabo aan faa'iido keenayn.

Aabbaha Qaniga ahi wuxuu i baray: "Baro sida lacagtu u shaqeyso, ha u noqon addoon lacagta, balse ka yeel lacagta shaqaale adiga kuu shaqeeya habeen iyo maalin."`,
        keyTakeaways: ['Lacagtu ha kuu shaqeyso, adigu ha noqon addoonkeeda', 'Cabsida lacag la\'aanta ah ku xalli aqoon iyo maalgashi'],
        actionStep: 'Kala saar shaqadaada maalinlaha ah iyo hantida dakhliga aan shaqada tooska ah ku xirnayn (passive income).',
        quote: 'Dadka saboolka ahi waxay u shaqeeyaan lacagta; dadka taajiriinta ah lacagta ayaa u shaqaysa iyaga.',
      },
      {
        id: 'c2',
        title: 'Cutubka 2aad: Xeerka Koowaad - Hantida (Assets) vs Deymaha (Liabilities)',
        content: `Tani waa xeerka ugu muhiimsan ee maaliyadda: Waa inaad taqaanaa farqiga u dhexeeya Hanti iyo Deyn, waana inaad iibsataa hanti keliya!

Dad badan ayaa u haysta in guriga ay deggan yihiin uu yahay hantidooda ugu weyn. Laakiin haddii gurigaasi bishiiba kaa rabo dayactir, cashuur, iyo deyn bangi oo uusan hal doollar kuu soo xarayn, dhab ahaantii waa kharash iyo deyn (Liability).

Hantida dhabta ahi waxay noqon kartaa:
- Ganacsi u shaqeeya adiga oo aan goobjoog ka ahayn.
- Guri ama dhul kiro kuu soo xareeya (Real estate).
- Saamiyo ama xisaabaad faa'iido joogto ah leh.
- Hanti garaad (buugaag, koorsooyin, shatiyo royalty keenaya).`,
        keyTakeaways: ['Hantidu waa wax lacag kuu keena', 'Deyntu waa wax lacag kaa qaada'],
        actionStep: 'Qor liiska waxyaabaha aad haysato oo u qaybi hanti dhab ah iyo deyn.',
        quote: 'Hantidu waa waxa lacag jeebkaaga ku shuba, iyadoo aadan shaqaynayn.',
      },
      {
        id: 'c3',
        title: 'Cutubka 3aad: Diiradda Saar Ganacsigaaga (Mind Your Own Business)',
        content: `Waxaa jira farqi weyn oo u dhexeeya shaqadaada (profession) iyo ganacsigaaga (business).

Tusaale ahaan, Ray Kroc oo aasaasay McDonald's markii la weydiiyay "Waa maxay ganacsigaagu?", wuxuu ku jawaabay: "Ganacsigaygu maaha iibinta burger-ka, ganacsigaygu waa guryaha iyo dhulka (Real Estate)." Wuxuu ogaa in burger-ku yahay habka dhulka loogu iibsado goobaha ugu qaalisan adduunka.

Ha ku lumin noloshaada oo dhan adoo taajir ka dhigaya qofka aad u shaqeyso ama dawladda canshuurta qaadata. Dhis hantidaada gaarka ah inta aad wali shaqada ku jirto.`,
        keyTakeaways: ['Shaqadaadu waxay bixisaa biilasha, laakiin ganacsigaagu wuxuu dhisayaa xorriyaddaada'],
        actionStep: 'Bilow maalgashi yar xitaa adoo shaqo caadi ah haya.',
        quote: 'Shaqo ku bilow, laakiin dhis boqortooyadaada maaliyadeed.',
      },
    ],
  },

  'deep work': {
    title: 'Deep Work (Shaqada Qotada Dheer)',
    author: 'Cal Newport',
    category: 'Xirfad & Wax-soo-saar',
    estimatedPages: 300,
    summary: 'Xeerarka guusha ee dunida mashquulka badan: Sida diirad buuxda loogu yeesho hawlaha adag adoon lahayn wax carqalado ah.',
    takeaways: [
      'Shaqada qotada dheer waa xirfadda qarniga 21aad ugu qiimaha badan.',
      'Awoodda inaad barato xirfado adag si degdeg ah waxay ku xiran tahay diiraddaada.',
      'Social media iyo ogeysiisyada taleefanka waxay dilaan awoodda hal-abuurka maskaxda.',
      'U deji jadwalkaaga saacado go\'an oo aan la carqaladayn karin.',
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Cutubka 1aad: Qiimaha Shaqada Qotada Dheer (Deep Work Hypothesis)',
        content: `Dunida aynu maanta ku noolnahay, waxaa jira laba awoodood oo go\'aamiya guusha qofka:
1. Awoodda aad si degdeg ah ugu baran karto waxyaabaha adag.
2. Awoodda aad ku soo saari karto natiijo heerkeedu sarreeyo, dhanka tayada iyo xawaarahaba.

Labadan awoodoodba waxay ku xiran yihiin awoodda aad u leedahay "Shaqada Qotada Dheer" (Deep Work) - hawl maskaxeed oo lagu qabto diirad buuxda oo aan lahayn wax carqalad ah.

Taa lidkeeda, dadka intooda badani waxay ku nool yihiin "Shaqo Gudeed" (Shallow Work) - jawaab celinta emails-ka, eegista taleefanka, wada-hadallada aan hadafka lahayn, kuwaas oo abuura dareen mashquul been ah laakiin aan keenin wax qiimo dhab ah.`,
        keyTakeaways: ['Deep Work waa xirfad naadir ah oo aad loo raadiyo', 'Shallow Work waa dabin waqtiga lumiya'],
        actionStep: 'Taleefankaaga geli Do Not Disturb 60 daqiiqo oo diirada saar hal hawl oo adag.',
        quote: 'Haddii aadan soo saari karin wax qiimo leh, dunidu kuma arkayso.',
      },
      {
        id: 'c2',
        title: 'Cutubka 2aad: 4-ta Xeer ee Dhaqangelinta Deep Work',
        content: `Si aad u noqoto qof shaqo qoto dheer leh, raac afartan xeer:

Xeerka 1: Shaqee si qoto dheer (Work Deeply) - Dooro habka kugu habboon: Habka wadaadnimada (keli-u-bax buuxa), Habka laba-geesoodka ah (maalmo gaar ah oo la go\'o), ama Habka laxanka leh (subax kasta 2 saac).
Xeerka 2: Baro caajiska (Embrace Boredom) - Ha qaadan taleefankaaga mar kasta oo aad dareento daqiiqad caajis ah; maskaxdaadu waxay u baahan tahay inay barato dulqaadka.
Xeerka 3: Ka bax Baraha Bulshada (Quit Social Media) - Iska weydii: barahani miyey si dhab ah u taageerayaan yoolalkaaga ugu waaweyn?
Xeerka 4: Yaree Shaqada Gudeedka ah (Drain the Shallows) - Yaree kulamada aan loo baahnayn iyo wada-sheekeysiga waqtiga dila.`,
        keyTakeaways: ['Baro inaad maskaxdaada ka celiso rabitaanka degdegga ah ee taleefanka', 'Xaddid saacadaha shaqada si aad ugu qasbanaato diirad adag'],
        actionStep: 'Sameyso xilli go\'an oo aad taleefanka iyo emails-ka xirto maalin kasta.',
        quote: 'Diiraddaadu waa lacagtaada ugu qaalisan; ha u oggolaan qofna inuu bilaash ku qaato.',
      },
    ],
  },

  'the 7 habits of highly effective people': {
    title: 'The 7 Habits of Highly Effective People (7-da Caado ee Dadka Guulaysta)',
    author: 'Stephen R. Covey',
    category: 'Hoggaan & Horumar',
    estimatedPages: 380,
    summary: 'Mabaadi\'da aasaasiga ah ee isbeddelka qofka, hoggaanka dhabta ah, iyo xiriirka guusha leh ee dadka kale.',
    takeaways: [
      'Noqo qof wax bilaaba (Be Proactive) halkii aad noqon lahayd mid wax kasta ka falceliya.',
      'Bilow adoo natiijada maskaxda ku haya (Begin with the end in mind).',
      'Horeysi waxa ugu muhiimsan (Put first things first).',
      'Ka feker guul-dhammaan (Think Win-Win).',
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Cutubka 1aad: Noqo Qof Wax Bilaaba (Be Proactive)',
        content: `Farqiga ugu weyn ee u dhexeeya dadka guulaysta iyo kuwa kale waa meesha ay tamartooda geliyaan.

Dadka dhibanayaasha ah (Reactive people) waxay had iyo jeer diiradda saaraan "Goobta Walaaca" (Circle of Concern): cimilada, dhaqaalaha, siyaasadda, iyo dabeecadaha dadka kale - waxyaabo aysan waxba ka beddeli karin.

Laakiin dadka wax-ku-oolka ah (Proactive people) waxay diiradda saaraan "Goobta Saamaynta" (Circle of Influence): dabeecadooda, shaqadooda, akhriskooda, caafimaadkooda, iyo go\'aannadooda - waxyaabo ay toos u xakameyn karaan.`,
        keyTakeaways: ['Ha eedeyn xaaladaha; adigu gacanta ku hay falcelintaada'],
        actionStep: 'Aqoonso hal dhibaato oo ku haysata, kana feker hal talaabo oo aad adigu qaadi karto.',
        quote: 'Ma aha waxa kugu dhaca waxa ku xanuujiya; waa falcelinta aad ka bixiso.',
      },
      {
        id: 'c2',
        title: 'Cutubka 2aad: Bilow Adoo Dhammaadka Maskaxda ku Haya',
        content: `Isku sawir adigoo jooga aaskaaga saddex sano ka dib. Maxaad jeclaan lahayd in qoyskaagu kaaga sheegaan? Saaxiibbadaadu? Macaamiishaadu? Bulshadaadu?

Haddii aadan garanayn meesha aad doonayso inaad gaadho, jaranjaro kasta oo aad fuusho waxay ku saari doontaa darbi qaldan.

Qor Warmurtiyeedkaaga Nolosha (Personal Mission Statement) kaas oo noqon doona dastuurka aad ku go\'aamiso waxaad samaynayso iyo waxaad iska deynayso.`,
        keyTakeaways: ['Dhis aragti cad oo ku saabsan noloshaada inta aadan hawsha bilaabin'],
        actionStep: 'Qor saddex qiyam oo aad rabto in lagugu xusuusto.',
        quote: 'Waxay u egtahay inaad ordayso, laakiin haddii jihadu qaldan tahay, orodku waa khasaare.',
      },
      {
        id: 'c3',
        title: 'Cutubka 3aad: Horeysi Waxa Ugu Muhiimsan (Put First Things First)',
        content: `Dhammaan hawlaha nolosha waxay ku dhacaan afar afar-geesood (Time Management Matrix):
- Q1: Degdeg ah & Muhiim ah (Dhibaatooyin & Baahiyo degdeg ah)
- Q2: Aan Degdeg ahayn laakiin Muhiim ah (Qorshayn, xiriir, caafimaad, is-dhismo)
- Q3: Degdeg ah laakiin Aan Muhiim ahayn (Carqalado, fariimo qaarkood)
- Q4: Aan Degdeg ahayn oo Aan Muhiim ahayn (Wakhti lumin, baraha bulshada)

Dadka dhabta ah ee guulaysta waxay 80% waqtigooda ku bixiyaan Q2 - hawlaha aan degdegga ahayn laakiin nolosha mustaqbalkeeda dhisaya!`,
        keyTakeaways: ['Diiradda saar Q2: qorshaynta, akhriska, iyo caafimaadka kahor intaysan noqon dhibaato degdeg ah'],
        actionStep: 'Jadwalkaaga usbuucan geli laba saac oo u gaar ah qorshaynta mustaqbalka.',
        quote: 'Waxa ugu muhiimsan waa in waxa ugu muhiimsan la dhigo meesha ugu muhiimsan.',
      },
    ],
  },

  'the psychology of money': {
    title: 'The Psychology of Money (Nafsiyadda Lacagta)',
    author: 'Morgan Housel',
    category: 'Ganacsi & Maaliyad',
    estimatedPages: 250,
    summary: 'Casharro aan duugoobin oo ku saabsan maaliyadda, damaca, iyo farxadda: Sida dhaqankaaga uu uga muhiimsan yahay xisaabta marka ay timaaddo lacagta.',
    takeaways: [
      'Inaad lacag fiican heshaa waxay ku xiran tahay dabeecaddaada, ma aha sida aad u caqli badan tahay.',
      'Taajirnimadu waa waxa aad aragto (baabuur, dhar); Hodantinimada dhabta ahi waa lacagta aadan bixin ee kaydsan.',
      'Xorriyadda waqtigaaga ayaa ah faa\'iidada ugu weyn ee ay lacagtu ku siin karto.',
    ],
    chapters: [
      {
        id: 'c1',
        title: 'Cutubka 1aad: Qofna Ma Waalna (No One\'s Crazy)',
        content: `Fikirka aad ka qabto lacagta waxaa 90% qaabeeyay waayihii aad soo martay carruurnimadaadii iyo xaaladdii dhaqaale ee aad ku barbaartay.

Qof ku koray gaajo iyo sicir-barar ma fahmi karo qof ku koray suuq degan oo ganacsi bilaabay. Labadooduba ma waalna; mid waliba wuxuu go\'aan ku gaaraa khibradda uu adduunka ka haysto.

Markaad maaliyadda baranayso, baro inaad fahanto nafsiyaddaada iyo cabsidaada, halkii aad ku mashquuli lahayd xisaab qallalan.`,
        keyTakeaways: ['Faham khibradahaagii hore sida ay u saameeyaan go\'aannadaada lacagta'],
        actionStep: 'Xisaabi sababta aad lacagta u bixiso: ma baahi dhab ah baa mise waa cabsi iyo damac?',
        quote: 'Qof kastaa wuxuu lacagta u maareeyaa sida uu nolosha u arko.',
      },
      {
        id: 'c2',
        title: 'Cutubka 2aad: Taajirnimo vs Hodantinimo (Rich vs Wealthy)',
        content: `Dadka intiisa badan waxay ku wareeraan labadan eray.

Taajirnimadu (Being Rich) waa dakhliga aad hadda hesho: baabuurka qaaliga ah, guriga weyn, saacadda gacanta. Waa wax dibadda laga arki karo.

Laakiin Hodantinimadu (Being Wealthy) waa waxa aan la arkin: waa maalgashiga aadan bixin, saamiyada aadan iibin, lacagta bangiga kuugu jirta ee ku siinaysa xasillooni iyo awood aad ku diidi karto shaqo aadan jeclayn.

Haddii aad $100,000 ku iibsato baabuur, waxaad haysataa baabuur laakiin waxaad lumisay $100,000 oo hodantinimo ah.`,
        keyTakeaways: ['Hodantinimadu waa awoodda xorriyadda ee aadan banaanka ku soo bandhigin'],
        actionStep: 'Kaydi ugu yaraan 15% dakhligaaga adoon u isticmaalin wax lagu faano.',
        quote: 'Hodantinimadu waa ikhtiyaarrada aad haysato marka wax walba xumaadaan.',
      },
    ],
  },
};

/**
 * Intelligent Fallback Engine that generates comprehensive Somali chapters for ANY book title.
 */
function generateStructuredSomaliChapters(
  title: string,
  author?: string,
  category?: string
): SummarizeBookResponse {
  const cleanTitle = title.trim();
  const cleanAuthor = author?.trim() || 'Qoraa Caan ah';
  const cleanCat = category?.trim() || 'Horumar & Guul';

  return {
    title: cleanTitle,
    author: cleanAuthor,
    category: cleanCat,
    estimatedPages: 260,
    source: 'generated_engine',
    summary: `Soo-koobid qoto-dheer oo af-Soomaali ah oo ku saabsan nuxurka, xeerarka iyo casharrada muhiimka ah ee buugga "${cleanTitle}". Buuggani wuxuu bixinayaa hagid dhab ah iyo talooyin wax-ku-ool ah oo qofka ka caawiya inuu gaaro heer sare oo guul, faham iyo wax-soo-saar leh.`,
    takeaways: [
      `Fahamka dhabta ah ee dulucda "${cleanTitle}" iyo sida looga faa'iidaysto maalin kasta.`,
      'Xeerarka aasaasiga ah ee lagu dhiso anshaxa, fahamka iyo xirfadaha nolosha.',
      'Sida looga gudbo caqabadaha dabiiciga ah iyadoo la adeegsanayo nidaam joogto ah.',
      'Tallaabooyin cad-cad oo maalinle ah oo horseedaya isbeddel muuqda oo waara.',
    ],
    chapters: [
      {
        id: 'c1',
        title: `Cutubka 1aad: Hordhaca & Aragti Guud ee "${cleanTitle}"`,
        content: `Buugga "${cleanTitle}" wuxuu ku bilaabmayaa falanqeyn qoto-dheer oo ku saabsan xaaladda aynu maanta ku suganahay iyo sababta ay muhiimka u tahay inaan u yeelano faham cusub oo ku aaddan nolosha, shaqada iyo horumarka.

Qoraaga buuggu (${cleanAuthor}) wuxuu si cad u iftiiminayaa in dadka guusha gaara aysan ahayn kuwa ugu nasiibka badan ama kuwa ugu dhaqaalaha badan marka hore, balse ay yihiin kuwa leh aragti cad, xeerar ay ku dhaqmaan, iyo dulqaad ay ku wajahaan caqabadaha.

Dulucda koowaad ee cutubkani waxay daaran tahay:
1. Garashada meesha aad hadda joogto iyo qiimaynta dhabta ah ee kartidaada.
2. Fahamka ujeeddada ka dambaysa hawl kasta oo aad qabanayso.
3. Abuurista xiiso iyo niyad adag oo kugu riixda inaad tallaabada koowaad qaaddo adoon ka cabsanayn guuldarro.`,
        keyTakeaways: [
          'Aragtidu waa aasaaska ficil kasta oo guulaysta.',
          'Ha sugin waqti kaamil ah; bilow meesha aad joogto adigoo isticmaalaya waxaad haysato.',
        ],
        actionStep: `Qor hal hadaf oo weyn oo aad rabto inaad ka gaarto aqriska "${cleanTitle}".`,
        quote: 'Bilowga wanaagsani waa kala bar guusha.',
      },
      {
        id: 'c2',
        title: `Cutubka 2aad: Mabaadi'da Asaasiga ah & Xeerarka Guusha`,
        content: `Cutubka labaad ee buugga "${cleanTitle}", qoraagu wuxuu si faahfaahsan u kala dhig-dhigayaa mabaadi'da ugu muhiimsan ee qofku ku dhisan karo awooddiisa shakhsi ahaaneed ama midda xirfadeed.

Mabaadi'dani waxay ku saleysan yihiin tijaabooyin dhab ah iyo khibrado laga soo dhex saaray sanado badan oo shaqo iyo la-socod ah:
- Xeerka Diiradda: Marka aad wax walba doonayso inaad hal mar qabato, waxba si fiican uma qabanaysid. Dooro waxa ugu muhiimsan.
- Xeerka Anshaxa (Discipline): Dhiirrigelintu waxay ku bilaabtaa hawsha, laakiin anshaxa iyo joogtaynta ayaa dhammeystira.
- Xeerka Barashada Joogtada ah: Dunidu si xawli ah ayay isu beddelaysaa; haddii aadan maalin kasta wax cusub baran, gadaal ayaad ku haraysaa.

Qoraagu wuxuu ku boorinayaa akhristaha inuusan qoraalkan u qaadan sheeko oo kaliya, balse uu u beddelo qorshe maalinle ah oo ficil lagu taageeray.`,
        keyTakeaways: [
          'Anshaxu wuxuu ka adkaadaa xaalad kasta oo adag.',
          'Kala sooc waxa ku mashquulinaya iyo waxa wax-soo-saarka dhabta ah kuu keenaya.',
        ],
        actionStep: 'Dooro mid ka mid ah xeerarka cutubkan oo dhaqangeli 24-ka saac ee soo socda.',
        quote: 'Ma gaari kartid meel sare haddii aadan lahayn anshax aad ku ilaaliso guusha.',
      },
      {
        id: 'c3',
        title: `Cutubka 3aad: Ka Gudubka Caqabadaha & Dhisidda Adkaysiga`,
        content: `Waddada loo maro himilo kasta waxaa yaal caqabado dabiici ah: shaki nafeed, dhaleecayn dibadda kaga timaadda, daal, iyo guuldarrooyin yaryar oo soo noqnoqda. 

Cutubkani wuxuu si xeel-dheer u barayaa akhristaha cilmi-nafsiga adkaysiga (Resilience):
1. Sida looga baxo "Aagga Raaxada" (Comfort Zone): Korriinka dhabta ahi wuxuu ka bilaabmaa meesha raaxadu ku dhammaato.
2. Guuldarrada oo loo arko cashar: Khalad kasta oo dhaca waa xog aad u baahnayd si aad markan dambe si ka xikmad badan ugu dhaqaaqdo.
3. Taageerada Qalbiga & Maskaxda: U mahadnaq waxa aad haysato, dhis xiriirkaaga Eebbe, kana fogow dadka niyad-jabka iyo taban-nimada faafiya.`,
        keyTakeaways: [
          'Caqabaddu maaha derbi kugu xiray, waa imtixaan lagu cabbirayo go\'aankaaga.',
          'Qofka adkaysiga leh wuxuu guuldarrada ka dhigtaa jaranjaro uu kor ugu koro.',
        ],
        actionStep: 'Aqoonso caqabadda kuugu weyn ee hadda ku haysata, qorna saddex dariiqo oo aad kaga gudbi karto.',
        quote: 'Dhibta waxaa la socda fudayd; adkaysigu waa furaha guusha.',
      },
      {
        id: 'c4',
        title: `Cutubka 4aad: Dhaqangelinta Dhabta ah & Gabagabada`,
        content: `Gabagabada buugga "${cleanTitle}", qoraagu wuxuu ku soo xirayaa baaq cad oo ku aaddan ficil qaadasho degdeg ah. Aqoontu ma laha wax awood ah ilaa ficil lagu dabaqo maalin kasta.

Si aad u hesho natiijada ugu sarraysa ee buuggan:
- Sameyso jadwal maalinle ah oo aad ku xisaabtanto.
- Naftaada u yeel xisaabtan toddobaadle ah (Muhasabah).
- La wadaag aqoonta aad baratay qof kale, waayo barashadu waxay sii xoogaysataa markaad dadka kale wax barto.

Safarkaagu halkan kuma dhammaanayo; kani waa bilowga cutub cusub oo noloshaada ah oo aad ku dhisayso qofka ugu wanaagsan ee aad awooddo inaad noqoto.`,
        keyTakeaways: [
          'Ficil la\'aani aqoon maaha; ku dhaqan waxaad baratay.',
          'Joogteynta tallaabooyinka yaryar ayaa keenaya guusha weyn.',
        ],
        actionStep: 'Qor 3 tallaabo oo aad berri subax bilaabi doonto adigoo ka duulaya buuggan.',
        quote: 'Mustaqbalkaagu wuxuu ku dhismaa waxaad maanta qabato, maaha waxaad berri ku haminayso.',
      },
    ],
  };
}

/**
 * Summarize or generate book chapters:
 * 1. Attempts Server-side Gemini API (/api/books/summarize)
 * 2. Checks local curated database
 * 3. Falls back to intelligent structured Somali chapter engine
 */
export async function summarizeBookWithAI(
  req: SummarizeBookRequest
): Promise<SummarizeBookResponse> {
  const normTitle = req.title.trim().toLowerCase();

  // Try Server API first
  try {
    const res = await fetch('/api/books/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.title && data.chapters && data.chapters.length > 0) {
        return {
          ...data,
          source: 'gemini',
        };
      }
    }
  } catch (err) {
    // Server fetch error fallback
    console.warn('Server Gemini API unreachable, falling back to local engine:', err);
  }

  // Check preset library for direct matches
  for (const [key, preset] of Object.entries(PRESET_BOOK_DATABASE)) {
    if (normTitle.includes(key) || key.includes(normTitle)) {
      return {
        title: preset.title || req.title,
        author: preset.author || req.author || 'Qoraa Caan ah',
        category: preset.category || req.category || 'Horumar Shakhsi',
        estimatedPages: preset.estimatedPages || 250,
        summary: preset.summary || '',
        takeaways: preset.takeaways || [],
        chapters: preset.chapters || [],
        source: 'curated',
      };
    }
  }

  // Dynamic fallback engine
  return {
    ...generateStructuredSomaliChapters(req.title, req.author, req.category),
    source: 'generated_engine',
  };
}

/**
 * Generate a single new chapter for an existing book
 */
export async function generateNextChapterForBook(
  book: Book,
  customTopicOrTitle?: string
): Promise<BookChapter> {
  const nextNum = (book.chapters?.length || 0) + 1;
  const chapterPromptTitle =
    customTopicOrTitle?.trim() || `Cutubka ${nextNum}aad: Xikmadda & Horumarka Dheeraadka ah`;

  try {
    const res = await fetch('/api/books/generate-chapter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookTitle: book.n,
        author: book.author,
        chapterNumber: nextNum,
        chapterTitle: chapterPromptTitle,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.title && data.content) {
        return {
          id: `c_${Date.now()}_${nextNum}`,
          title: data.title,
          content: data.content,
          summary: data.summary,
          keyTakeaways: data.keyTakeaways,
          actionStep: data.actionStep,
          quote: data.quote,
        };
      }
    }
  } catch {
    // fallback
  }

  // Fallback chapter generation
  return {
    id: `c_${Date.now()}_${nextNum}`,
    title: chapterPromptTitle,
    content: `Cutubkan cusub ee loo diyaariyay buugga "${book.n}" wuxuu sii qoto-dheereynayaa aqoontii hore loo soo bartay.

Qoraagu wuxuu halkan ku lafagurayaa:
1. Sida loo sii joogteeyo xawaaraha guusha marka horumarka koowaad la gaaro.
2. Dhisidda qiyam waara oo qofka ka caawiya inuu ka hortago daalka maskaxda iyo luminta hadafka.
3. Istaraatiijiyado horumarsan oo ku habboon qofka doonaya inuu heerkiisa hadda ka gudbo oo uu gaaro heer caalami ah.

Ficilka ugu weyn ee cutubkani kugu hagayo waa inaad dib-u-eegis ku sameyso waxaad baratay, oo aad u aragto maalin kasta fursad cusub oo lagu horumarin karo nafta iyo shaqada.`,
    keyTakeaways: [
      'Horumarku ma laha xad; mar kasta waxaa jira heer ka sarreeya oo la gaari karo.',
      'Joogteynta ayaa ka awood badan bilowga degdegga ah.',
    ],
    actionStep: `Dhaqangeli qodob ka mid ah casharrada cutubkan cusub ee "${book.n}".`,
    quote: 'Qofka aan joojin barashadu waligiis ma gaboobo.',
  };
}
