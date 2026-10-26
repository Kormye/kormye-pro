export interface DailyKnowledgeItem {
  id: string;
  num: number;
  title: string;
  category: 'saxaabada' | 'xadiis' | 'xikmad' | 'saynis' | 'hogaamin' | 'caafimaad';
  categoryLabel: string;
  arabicQuote?: string;
  content: string;
  keyLesson: string;
  practicalAction: string;
}

export interface DailyBusinessItem {
  id: string;
  num: number;
  title: string;
  category: 'fikrad' | 'iib' | 'xisaab' | 'suuq' | 'ai' | 'kobcin';
  categoryLabel: string;
  summary: string;
  strategy: string;
  budgetEst: string;
  profitMargin: string;
  actionSteps: string[];
  goldenRule: string;
}

export const DAILY_KNOWLEDGE_STREAM: DailyKnowledgeItem[] = [
  {
    id: 'k_1',
    num: 1,
    title: 'Daacadnimada & Xaqa: Sirta Guusha Abuu Bakr As-Siddiiq (RC)',
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    arabicQuote: 'إِنَّ اللَّهَ مَعَ الصَّادِقِينَ',
    content: 'Abuu Bakr (RC) wuxuu ahaa ganacsade ku caan baxay runta iyo daacadnimada. Markii Islaamku yimid, wax shaki ah ma gelin oo isla markiiba wuu rumeeyay Rasuulka ﷺ. Isagu wuxuu baray ummadda in daacadnimadu tahay hantida ugu qiimaha badan ee qofku yeelan karo.',
    keyLesson: 'Daacadnimadu waa aasaaska kalsoonida dadka iyo barakada Eebbe.',
    practicalAction: 'Maanta ballan kasta oo aad gasho fuli, xitaa haddii ay kugu adag tahay.',
  },
  {
    id: 'k_2',
    num: 2,
    title: 'Al-Faaruuq: Geesinimada Xaqa & Caddaaladda Dadka',
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    arabicQuote: 'لَوْ عَثَرَتْ بَغْلَةٌ فِي الْعِرَاقِ لَسُئِلْتُ عَنْهَا',
    content: 'Cumar ibnu Khadhaab (RC) wuxuu habeenkii socon jiray waddooyinka Madiina si uu u ogaado xaaladda dadka danyarta ah. Wuxuu dhabarka ku qaadi jiray kiishashka daqiiqda isaga oo ah amiirkii mu\'miniinta.',
    keyLesson: 'Hoggaanku ma aha magac iyo kursi, ee waa adeeg iyo mas\'uuliyad culus.',
    practicalAction: 'U naxariiso qof kugu hooseeya maanta oo caawi isaga oo aan ku weydiisan.',
  },
  {
    id: 'k_3',
    num: 3,
    title: 'Cusmaan Ibn Caffaan: Deeqsinimada aan Xadka Lahayn',
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    arabicQuote: 'مَا ضَرَّ عُثْمَانَ مَا عَمِلَ بَعْدَ الْيَوْمِ',
    content: 'Cusmaan (RC) wuxuu iibsaday Ceelkii Ruuma markii dadka Madiina biyo la\'aan ku dhacday, wuxuuna ka dhigay mid ay dadku si bilaash ah uga cabbaan. Wuxuu kaloo qalabaysay ciidankii Tabuuk oo dhan.',
    keyLesson: 'Hantida waxa ugu khayr badan midda loogu adeego bulshada dhibaataysan.',
    practicalAction: 'Bixi sadaqo maanta, xitaa haddii ay tahay wax yar oo aad awooddo.',
  },
  {
    id: 'k_4',
    num: 4,
    title: 'Cali Ibn Abii Dhaalib: Albaabka Xigmadda & Cilmi-Baarka',
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    arabicQuote: 'أَنَا مَدِينَةُ الْعِلْمِ وَعَلِيٌّ بَابُهَا',
    content: 'Cali (RC) wuxuu caan ku ahaa garashada xeeldheer, aftahamada afka carabiga, iyo xukunka caddaaladda ah. Wuxuu ahaa kii seexday sariirtii Rasuulka ﷺ habeenkii Hijrada.',
    keyLesson: 'Cilmigu wuxuu ilaaliyaa qofka, halka maalka uu qofku ilaaliyo.',
    practicalAction: 'Baro maanta hal xikmad ama hadal murti ah oo ku dhaqan.',
  },
  {
    id: 'k_5',
    num: 5,
    title: 'Xadiiska Niyadda: Ficiladu waxay ku xiran yihiin Niyadda',
    category: 'xadiis',
    categoryLabel: 'Axaadiis Nabawi ah',
    arabicQuote: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
    content: 'Rasuulku ﷺ wuxuu yiri: Camallada oo dhan waxay ku xiran yihiin niyadda, qof kastana wuxuu helayaa wuxuu niyaystay. Shaqada caadiga ah waxay noqon kartaa cibaado haddii niyad wanaagsan lagu dhex daro.',
    keyLesson: 'U beddel shaqadaada, cuntadaada, iyo hurdadaada cibaado adigoo niyadda saxaya.',
    practicalAction: 'Inta aadan bilaabin hawshaada maanta, niyayso inaad Eebbe ku raalli-geliso.',
  },
  {
    id: 'k_6',
    num: 6,
    title: 'Xoogga Samirka: Guushu waxay la socotaa Samirka',
    category: 'xadiis',
    categoryLabel: 'Axaadiis Nabawi ah',
    arabicQuote: 'وَاعْلَمْ أَنَّ النَّصْرَ مَعَ الصَّبْرِ',
    content: 'Ogow in gargaarka iyo guushu ay la socdaan samirka, dhibka ka dibna uu fudeyd yimaado. Samirku ma aha inaad quusato, ee waa inaad dadaalka sii wadato adigoo natiijada Eebbe ku halleynaya.',
    keyLesson: 'Samirku waa awoodda lagu sii wado dadaalka marka xaaladdu adag tahay.',
    practicalAction: 'Haddii caqabad kugu timaado maanta, ha xanaaqin; qaado neef qoto dheer oo samir.',
  },
  {
    id: 'k_7',
    num: 7,
    title: 'Kalsoonida Nafta & Ka Fogaanshaha Is-Dullaynta',
    category: 'xikmad',
    categoryLabel: 'Xikmad Nololeed',
    content: 'Qofka ku kalsoon Eebbihiis ka dibna awoodiisa uma baahna inuu baryo ama is-dulleeyo dadka kale hortooda. Xorriyadda dhabta ahi waa marka qalbigaagu ku xirnaado Allaha wax bixiya ee aanuu dadka wax ka sugin.',
    keyLesson: 'Ixtiraamka naftaadu wuxuu ka bilaabmaa inaadan ku tiirsanaan dadka kale.',
    practicalAction: 'Dhibaatada ku haysata Eebbe u bandhigo ka hor inta aadan qof kale u sheegan.',
  },
  {
    id: 'k_8',
    num: 8,
    title: 'Xeerka 80/20 ee Nolol Maalmeedka (Pareto Principle)',
    category: 'hogaamin',
    categoryLabel: 'Hoggaamin & Waxtar',
    content: '80% natiijooyinkaaga nolosha waxay ka yimaadaan 20% dadaalkaaga ugu muhiimsan. Haddii aad aqoonsato 2-da hawlood ee ugu saamaynta badan maalintaada oo aad xoogga saarto, waxaad gaari doontaa wax ka badan qofka maalintii dhan mashquulka ah.',
    keyLesson: 'Ha noqon qof mashquul ah, noqo qof wax soo saar leh.',
    practicalAction: 'Dooro 2-da hawlood ee ugu muhiimsan maanta oo subaxda ku dhammee.',
  },
  {
    id: 'k_9',
    num: 9,
    title: 'Xusuusta & Awoodda Maskaxda (Neuroplasticity)',
    category: 'saynis',
    categoryLabel: 'Saynis & Caafimaad',
    content: 'Sayniska casriga ahi wuxuu xaqiijiyay in maskaxda bini\'aadamku ay is-beddesho oo kori karto da\' kasta. Mar kasta oo aad barato xirfad cusub, luqad cusub, ama aad xifdiso Quraanka, unugyada maskaxdu waxay sameeyaan xiriiro cusub.',
    keyLesson: 'Da\'daadu ma xadiddo waxbarashadaada; maskaxdu waxay u baahan tahay jimicsi joogto ah.',
    practicalAction: 'Baro maanta 5 erey oo cusub ama akhri 10 bog oo buug cilmi ah.',
  },
  {
    id: 'k_10',
    num: 10,
    title: 'Hurdada Qoto-Dheer & Soo Kabashada Jidhka',
    category: 'caafimaad',
    categoryLabel: 'Caafimaadka Jidhka',
    content: 'Inta u dhaxaysa 10:00 fiidnimo iyo 2:00 habeenimo, jidhku wuxuu soo daayaa hormoonka Melatonin iyo Growth Hormone oo nadiifiya sunta maskaxda, dibna u dhisa unugyada jidhka ee daalay.',
    keyLesson: 'Hurdada hore ee habeennimadu waa dawada ugu fiican ee dhalinyaranimada iyo tamarta.',
    practicalAction: 'Dammi shaashadaha (telefoonka) ugu yaraan 45 daqiiqo ka hor inta aadan seexan caawa.',
  },
  // Continuing with 11-100 stream items
  ...Array.from({ length: 90 }, (_, i) => {
    const idx = i + 11;
    const cats: ('saxaabada' | 'xadiis' | 'xikmad' | 'saynis' | 'hogaamin' | 'caafimaad')[] = [
      'xikmad',
      'hogaamin',
      'xadiis',
      'saynis',
      'caafimaad',
      'saxaabada',
    ];
    const cat = cats[idx % cats.length];
    const catLabels = {
      saxaabada: 'Saxaabada Rasuulka ﷺ',
      xadiis: 'Axaadiis & Akhlaaq',
      xikmad: 'Murti & Xikmad Nololeed',
      saynis: 'Sayniska & Kalkaaliyaha',
      hogaamin: 'Hoggaaminta & Diiradda',
      caafimaad: 'Caafimaadka Jidhka',
    };

    const titles = [
      `Dhisidda Shakhsiyad Deggan: Casharka ${idx}aad`,
      `Sirta Joogtaynta Shaqada & Wax-soo-saarka (#${idx})`,
      `Maareynta Waqtiga & Fursadaha Qalbiga (#${idx})`,
      `Awoodda Hadalka Wanaagsan & Naxariista (#${idx})`,
      `Barashada Xikmaddii Hore & Casriga Cusub (#${idx})`,
      `Sida Looga Guulaysto Daalka Maskaxda (#${idx})`,
    ];

    const lessons = [
      'Wax kasta oo weyn waxay ku bilowdeen tillaabo yar oo joogto ah.',
      'Ha sugin waqti kaamil ah; bilow meesha aad joogto waxaad haysatana ku shaqee.',
      'Qalbiga daahirka ah iyo niyad samida ayaa fura albaabada aan fure lahayn.',
      'Maalinta aad wax cusub baratid waa maalin cimrigaaga ku darsantay.',
      'Kala saar waxa muhiimka ah iyo waxa degdegga ah si aad u badbaadiso waqtigaaga.',
      'Caafimaadkaagu waa hantida koowaad; ilaali cunnadaada, biyahaaga, iyo socodkaaga.',
    ];

    return {
      id: `k_${idx}`,
      num: idx,
      title: titles[idx % titles.length],
      category: cat,
      categoryLabel: catLabels[cat],
      content: `Casharka ${idx}aad: Fahamka nuxurka nolosha iyo shaqada wuxuu ku yimaadaa milicsi joogto ah. Qofka raba inuu gaaro heer sare waa inuu barto sida uu maalin walba hal shay oo wanaagsan ugu dari lahaa aqoontiisa, cibaadadiisa, iyo xiriirka uu la leeyahay bulshada. Joogtayntu waxay jebisaa buuraha caqabadaha ah.`,
      keyLesson: lessons[idx % lessons.length],
      practicalAction: `Dhaqan geli casharkan adigoo 15 daqiiqo maanta u qoondeeya diirad buuxda oo aan buuq lahayn.`,
    };
  }),
];

export const DAILY_BUSINESS_STREAM: DailyBusinessItem[] = [
  {
    id: 'b_1',
    num: 1,
    title: 'Adeegga Dhisidda AI Chatbots ee Ganacsiyada Soomaalida',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    summary: 'Dukaamada, shirkadaha adeegga, iyo xarumaha caafimaadka ee Soomaalida waxay waqti badan ku bixiyaan ka jawaabista fariimaha WhatsApp iyo Facebook. U dhis chatbot ku hadla af-Soomaali oo u qabta dalabaadka.',
    strategy: 'Adeegso qalabka sida Voiceflow ama ManyChat, ku xir WhatsApp Business API, u dhis tusaale bilaash ah dukaanka ugu horreeya si aad u hesho marag-fur (testimonial).',
    budgetEst: '$50 - $150 (qalabka & domain-ka)',
    profitMargin: '75% - 85%',
    actionSteps: [
      'Soo hel 3 dukaan oo online wax ku iibiya oo fariimahooda ka daaha.',
      'U samee chatbot demo ah oo 5 su\'aalood oo caan ah kaga jawaabaya af-Soomaali.',
      'U soo bandhig qiimo dhan $150 dhisidda iyo $30 bil kasta oo maamul ah.',
    ],
    goldenRule: 'Macaamiishu ma rabaan tignoolajiyad; waxay rabaan in fariimaha macaamiishooda si degdeg ah looga jawaabo.',
  },
  {
    id: 'b_2',
    num: 2,
    title: 'Xisaabaadka Yaryar (Bookkeeping) ee Dukaamada & Makhaayadaha',
    category: 'xisaab',
    categoryLabel: 'Xisaabaadka & Lacagta',
    summary: 'Ganacsiyo badan oo Soomaali ah ma yaqaannaan faa\'iidada dhabta ah ee u soo hartay bishii sababtoo ah kharashaadka yar-yar iyo deynta lama diiwaangeliyo. U qabo xisaabinta todobaad kasta.',
    strategy: 'U isticmaal Excel gaar ah ama software fudud sida QuickBooks/Wave. U diyaari warbixin 1-bog ah oo tusinaysa Dakhliga, Kharashka, iyo Faa\'iidada saafiga ah bishii.',
    budgetEst: '$20 (Computer & Internet)',
    profitMargin: '90%',
    actionSteps: [
      'Diyaari template Excel ah oo aad u fudud oo af-Soomaali ku qoran.',
      'La hadal 2 dukaan oo aad garanayso, u qabo usbuuca koowaad bilaash.',
      'U deji heshiis bishii ah $80 - $120 ganacsi kasta.',
    ],
    goldenRule: 'Haddii aadan cabbiri karin lambarradaada, ma maamuli kartid ganacsigaaga.',
  },
  {
    id: 'b_3',
    num: 3,
    title: 'Suuqgeynta Fiidiyowga Gaagaaban (TikTok & Reels Reels)',
    category: 'suuq',
    categoryLabel: 'Suuqgeynta & Baraha Bulshada',
    summary: 'Ganacsiyada dharka, cuntada, iyo guryaha waxay u baahan yihiin fiidiyowyo gaagaaban oo xiiso leh si ay macaamiil cusub u soo jiitaan. U duub oo u tafatir 15 fiidiyow bishii.',
    strategy: 'Adeegso taleefankaaga casriga ah iyo barnaamijka CapCut. Samee sheekooyin dabiici ah oo dadka bara alaabta intii aad xayeysiis toos ah u diri lahayd.',
    budgetEst: '$0 - $50 (Mic & Nal yar)',
    profitMargin: '85%',
    actionSteps: [
      'Samee 3 fiidiyow tusaale ah oo aad alaab caadi ah u samaysay.',
      'U dir ganacsade dharka iibiya oo tus sida ay muuqaalladu dadka u soo jiidan karaan.',
      'U qaado xirmo dhan $200 bishii 12 fiidiyow iyo maamulka TikTok.',
    ],
    goldenRule: 'Dadku ma jecla in wax laga iibiyo, laakiin waxay jecel yihiin inay wax iibsadaan.',
  },
  {
    id: 'b_4',
    num: 4,
    title: 'Xirfadda Gorgortanka: Sida Loogu Iibiyo Qiimo Sare (High-Ticket)',
    category: 'iib',
    categoryLabel: 'Iibinta & Gorgortanka',
    summary: 'Ha ku tartamin qiimo jaban; qofka ugu qiimaha jaban suuqa wuu dhimanayaa marka kharashku kordho. Baro sida aad u sharxi lahayd qiimaha dhabta ah ee adeeggaaga.',
    strategy: 'Markaad la hadlayso macmiilka, ha ka hadlin sifooyinka badeecadaada, ee ka hadal dhibaatada aad ka xallinayso iyo lacagta ama waqtiga aad u badbaadinayso.',
    budgetEst: '$0',
    profitMargin: '100%',
    actionSteps: [
      'Qor 3-da faa\'iido ee ugu waaweyn ee macmiilkaagu helo.',
      'Ku celceli jawaabta markuu macmiilku yiraahdo "waa qaali".',
      'U sheeg damaanad qaad: "Haddii aad ku qanci weydo, dib ayaan kuu siinayaa lacagtaada".',
    ],
    goldenRule: 'Qiimuhu waa waxa uu macmiilku bixiyo; Qiimaha (Value) waa waxa uu helo.',
  },
  {
    id: 'b_5',
    num: 5,
    title: 'Habka Dhisidda Dakhli Dhaqdhaqaaqa Joogtada ah (Cashflow Buffer)',
    category: 'xisaab',
    categoryLabel: 'Xisaabaadka & Lacagta',
    summary: 'Ganacsiyo badan waxay u fashilmaan lacag la\'aan xilliga kharashaadku yimaadaan ka hor inta aan macaamiishu bixin. Baro sida loo sameeyo kaydka 3-da bilood ee shaqada.',
    strategy: 'Faa\'iidada bishii soo gasha ha wada qaadan shakhsi ahaan. U qoondee 30% dib-u-maalgelinta ganacsiga, 20% kaydka dhibaatooyinka lama filaanka ah.',
    budgetEst: '$0',
    profitMargin: '100%',
    actionSteps: [
      'Xisaabi inta ay tahay kharashka joogtada ah ee ganacsigaagu bishii ku kaco.',
      'Dhis koonto gaar ah oo lagu keydiyo 3-bilood oo kharashkaas ah.',
      'Ha taaban koontadaas ilaa xaalad degdeg ah timaado.',
    ],
    goldenRule: 'Dakhligu waa faan, faa\'iidadu waa xaqiiqo, laakiin Cashflow-gu waa nolosha ganacsiga.',
  },
  // Continuing with 6-100 stream items
  ...Array.from({ length: 95 }, (_, i) => {
    const idx = i + 6;
    const cats: ('fikrad' | 'iib' | 'xisaab' | 'suuq' | 'ai' | 'kobcin')[] = [
      'fikrad',
      'iib',
      'xisaab',
      'suuq',
      'ai',
      'kobcin',
    ];
    const cat = cats[idx % cats.length];
    const catLabels = {
      fikrad: 'Fikradaha Ganacsiga',
      iib: 'Iibinta & Xirfadaha',
      xisaab: 'Xisaabaadka & Cashflow',
      suuq: 'Suuqgeynta & Koritaanka',
      ai: 'Automation & AI',
      kobcin: 'Kobcinta & Nidaamka',
    };

    const titles = [
      `Istaraatiijiyadda Ganacsi #${idx}: Helidda Macaamiil Joogto ah`,
      `Xeerka Kobcinta Dakhliga #${idx}: Sida Loo Labalaabo Iibka`,
      `Fikir Ganacsi oo Fudud #${idx}: Bilow Maalgashi Yar`,
      `Automation-ka Shaqada #${idx}: Sidee Loogu Badbaadiyaa 10 Saac Usbuucii`,
      `Xisaabinta Qiimaha Badeecada #${idx}: Xeerka Margin-ka Sare`,
      `Dhisidda Sumcad Ganacsi (Branding) oo Lagu Kalsoonaan Karo #${idx}`,
    ];

    const strategies = [
      'Ka bilow hal macmiil oo qanacsan; u qabo shaqo cajiib ah si uu kuugu keeno 3 macmiil oo kale.',
      'U xirmooyin u samee adeegyadaada (bundling) si celceliska iibku u kordho 25%.',
      'Automate ka dhig rasiidhada, fariimaha mahadnaqa, iyo diiwaangelinta xisaabaadka adigoo isticmaalaya softweer bilaash ah.',
      'Ka fogow deynta badan ee macaamiisha adigoo siinaya qiimo-dhimis 5% ah qofkii kaash ama lacag toos ah bixiya.',
      'Falanqee tartamayaashaada, ogow waxa ay ka gaabiyeen, adiguna ka dhig taasi awooddaada ugu weyn.',
      'Dhis nidaam shaqo (SOP) qoran si shaqaale kastaa u ogaado tillaabooyinka saxda ah.',
    ];

    return {
      id: `b_${idx}`,
      num: idx,
      title: titles[idx % titles.length],
      category: cat,
      categoryLabel: catLabels[cat],
      summary: `Talo Ganacsi #${idx}: Ganacsiga dhabta ahi ma aha nasiib ee waa nidaam, xisaab adag, iyo adeeg tayo leh oo dadku u baahan yihiin. Baro sida loo hirgeliyo tillaabooyinkan faa'iidada leh.`,
      strategy: strategies[idx % strategies.length],
      budgetEst: `$20 - $100`,
      profitMargin: `60% - 80%`,
      actionSteps: [
        `Tillaabada 1: Aqoonso dhibaatada dhabta ah ee macmiilkaaga haysata.`,
        `Tillaabada 2: Tijaabi xalkaaga adigoo la hadlaya ugu yaraan 5 qof ka hor inta aadan maalgelin badan gelin.`,
        `Tillaabada 3: Dib u eeg natiijada usbuuc kasta oo hagaaji khaladaadka.`,
      ],
      goldenRule: `Ganacsadaha guulaysta waa kan xalliya dhibaatooyinka dadka isaga oo abuuranaya qiimo dhab ah.`,
    };
  }),
];
