export interface QuranStory {
  id: string;
  titleSomali: string;
  titleArabic: string;
  surahName: string;
  surahNumber: number;
  ayatRange: string;
  category: 'sabir' | 'iimaan' | 'xikmad' | 'tusaale' | 'duco';
  categoryLabel: string;
  emoji: string;
  summary: string;
  quranAyahSnippet: {
    ar: string;
    som: string;
  };
  chapters: {
    title: string;
    content: string;
  }[];
  lessons: string[];
  actionStep: string;
}

export const QURAN_STORIES: QuranStory[] = [
  {
    id: 'story_kahf',
    titleSomali: 'Asxaabul Kahf: Dhallinyaradii Godka Galay',
    titleArabic: 'أَصْحَابُ الْكَهْفِ',
    surahName: 'Al-Kahf',
    surahNumber: 18,
    ayatRange: 'Aayadaha 9 - 26',
    category: 'iimaan',
    categoryLabel: 'Iimaanka & Ilaalinta Eebbe',
    emoji: '🏔️',
    summary:
      'Qisada dhallinyaro diintooda u cararay markii boqorkii daalinka ahaa ku khasbay gaalnimo. Eebbe wuxuu ku seexiyey god buur 309 sano, isagoo ka ilaaliyey baabi’inta waqtiga iyo shirqoollada dadka.',
    quranAyahSnippet: {
      ar: 'إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
      som: 'Markay dhallinyaradii magangaleen godkii oo yiraahdeen: "Eebbow naga sii agtaada naxariis, noona hagaaji amarkayaga hanuun."',
    },
    chapters: [
      {
        title: 'Baxsashada & Magangalka Godka Buurta',
        content:
          'Magaalo ay ka talinayeen boqor kibir badan iyo bulsho sanamyo caabuda, dhowr dhallinyaro ah oo maamuus iyo xikmad leh ayaa garowsaday in aan kownkan lagu dhaafi karin sanamyo aan waxba maqli karin waxna tari karin. Waxay qireen tawxiidka Eebbe iyagoo taagan qasriga horkiisa. Markii boqorkii daalinka ahaa u hanjabay dil haddii aysan dib ugu laaban shirkiga, waxay go’aansadeen inay u cararaan buuraha si ay diintooda u ilaashadaan, waxayna galeen god weyn oo fog, iyagoo la socday eeygoodii.',
      },
      {
        title: 'Hurdadii Mucjisada Ahayd ee 309 Sano',
        content:
          'Markii ay godka galeen oo gargaar weydiisteen Eebbe, Eebbe wuxuu ku riday hurdo culus oo mucjiso ah. Qorraxdu markay soo baxdo waxay u janjeeri jirtay dhanka midig ee godka, markay dhacaysana waxay ka gudbi jirtay dhanka bidix, si aysan jidhkooda u gubin. Eebbe wuxuu jidhkooda u rogi jiray midig iyo bidix si uusan dhulka ugu qurmin. Eygu wuxuu fidsanaa labadiisa gacmood albaabka godka sida waardiye feejigan.',
      },
      {
        title: 'Toositaankii & Xaqiijinta Qiyaamaha',
        content:
          'Markii ay soo tooseen, waxay is-weydiiyeen: "Immisaan joognay?" Qaar waxay dhaheen: "Maalin ama maalin barteed." Gaajo darteed, midkood ayaa loo diray magaalada isagoo wata lacag qadaadiic ah oo gacantooda ku jirtay si uu cunto xalaal ah uga keeno. Markii uu magaaladii tagay, wuxuu arkay dhismihii iyo dadkii oo gebi ahaanba beddelan, dadkiina waxay la yaabeen lacagtii qadiimiga ahayd ee 300 sano ka hor jirtay. Waxaa caddaatay in Eebbe awoodo soo bixinta meydadka iyo ilaalinta kuwa xaqa rumeeya.',
      },
    ],
    lessons: [
      'Iimaanka runta ah wuxuu qofka siiyaa geesinimo uu xaqa ugu taagnaado xitaa haddii adduunka oo dhan ka soo horjeesto.',
      'Markaad wax kasta dar Allaah uga tagto, Eebbe wuxuu kuu furaa albaabbo naxariis oo aadan weligaa saadaalin karin.',
      'Awoodda Eebbe waa mid kowni ah: 309 sano ayuu ilaaliyey dhallinyaradaas iyagoo aan dhiman oo aan duqoobin.',
    ],
    actionStep:
      'Ku ducayso ducadii Asxaabul Kahf: "Rabbanaa aatinaa min ladunka raxmatan wa hayyi’ lanaa min amrinaa rashadaa".',
  },
  {
    id: 'story_yusuf',
    titleSomali: 'Nabi Yuusuf CS: Qisadii ugu Quruxda Badnayd',
    titleArabic: 'نَبِيُّ اللَّهِ يُوسُفُ عَلَيْهِ السَّلَامُ',
    surahName: 'Yusuf',
    surahNumber: 12,
    ayatRange: 'Aayadaha 1 - 101',
    category: 'sabir',
    categoryLabel: 'Sabirka, Cafiska & Guusha Sare',
    emoji: '👑',
    summary:
      'Qisada caanka ah ee ka bilaabatay xasadkii walaalaha iyo ceelkii mugdiga ahaa, una gudubtay addoonnimadii iyo xabsigii Masar, ugu dambayntiina ku dhammaatay maamulkii qasnadda Masar iyo cafiskii taariikhiga ahaa.',
    quranAyahSnippet: {
      ar: 'إِنَّهُ مَن يَتَّقِ وَيَصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ',
      som: '"Qofkii Eebbe ka dhowrsada oo sabra, Eebbe ma dayaco ajarka samafalayaasha."',
    },
    chapters: [
      {
        title: 'Riyadii Yuusuf & Ceelkii Walaalaha',
        content:
          'Nabi Yuusuf isagoo carruur ah ayuu arkay kow iyo toban xiddigood, qorraxda iyo dayaxa oo u sujuudaya. Aabbihiis Nabi Yacquub wuxuu gartay in wiilkiisu heli doono maamuus weyn, wuxuuna ku yiri ha u sheegin walaalahaa. Laakiin xasadka walaalaha ayaa gaaray heerkii ay ku tuureen ceel qoto dheer oo cidla ah, iyagoo aabbahood ku yiri "yey ayaa cuntay" waxayna keeneen shaadhkiisii oo dhiig been ah lagu masaxay.',
      },
      {
        title: 'Tijaabadii Qasriga & Xabsigii Masar',
        content:
          'Socoto ganacsato ah ayaa ka soo saartay ceelkii waxayna ku iibiyeen Masar qiimo aad u jaban. Wuxuu galay qasrigii Wasiirka Masar. Markii uu garaadsaday, haweenaydii boqorka ayaa isku dayday inay ku fidnayso, laakiin Yuusuf wuxuu doortay dhawrsanaan iyo iimaan adag, isagoo yiri: "Xabsiga ayaa iiga jecel waxa ay iigu yeerayaan." Sanado badan ayuu xabsiga ku qaatay sabir, xaq-sheegid iyo dacwo.',
      },
      {
        title: 'Fasiraaddii Riyada Boqorka & Qorshaha 14-ka Sano',
        content:
          'Boqorkii Masar ayaa arkay riyo yaab leh: 7 sac oo buurbuuran oo ay cunayaan 7 caato ah, iyo 7 sabuul oo cagaaran iyo 7 qallalan. Yuusuf oo xabsiga ku jira ayaa fasiray riyada isagoo dejiyey qorshe dhaqaale oo 14 sano ah: 7 sano oo beerasho badan ah iyo keydin buuxda, iyo 7 sano oo abaarta lagu badbaadinayo ummadda. Boqorkii ayaa xabsiga ka soo saaray una dhiibay maamulka qasnadaha Masar.',
      },
      {
        title: 'Cafiskii Taariikhiga Ahaa ee Walaalaha',
        content:
          'Markii walaalihiis Masar u yimaadeen raashin-doon xilligii abaarta, way garan waayeen, laakiin asagu wuu gartay. Ugu dambayntii markii uu is-baray, cabsi weyn ayaa gashay walaalaha oo xusuustay ceelkii iyo dambigoodii. Laakiin Yuusuf wuxuu ugu jawaabay hadalkii xikmadda badnaa ee caalamka baray macnaha cafiska: "Eed korkiinna ma saarna maanta, Eebbe ha idiin dhaafo, waana kii ugu naxariis badnaa naxariistayaasha."',
      },
    ],
    lessons: [
      'Sabirka dulqaadka leh iyo dhawrsanaanta waxay had iyo jeer ku dhammaadaan guul, maamuus iyo sharaf adduun iyo aakhiroba.',
      'Qofkii Ilaahay talasaarta, xasadka iyo qorshayaasha dadka ma carqaladayn karaan mustaqbalka Eebbe u qoray.',
      'Awoodda ugu weyn waa awoodda cafiska markaad awooddo inaad aargudato.',
    ],
    actionStep:
      'Samee cafis buuxa maanta: Haddii uu jiro qof aad xumaan ka tabanayso, caloosha u nadiifi adigoo doonaya naxariista Eebbe.',
  },
  {
    id: 'story_ibrahim',
    titleSomali: 'Nabi Ibraahim CS: Jabintii Sanamyada & Dabkii Qaboobay',
    titleArabic: 'إِبْرَاهِيمُ خَلِيلُ الرَّحْمَٰنِ',
    surahName: 'Al-Anbiya',
    surahNumber: 21,
    ayatRange: 'Aayadaha 51 - 70',
    category: 'iimaan',
    categoryLabel: 'Tawxiidka & Geesinimada Xaqa',
    emoji: '🔥',
    summary:
      'Qisada Khaliilur-Raxmaan oo jabiyey sanamyadii qoomkiisu caabudi jireen, markii dabka weyn lagu tuurayna Eebbe dabkii ka dhigay qabow iyo nabadgalyo.',
    quranAyahSnippet: {
      ar: 'قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ',
      som: 'Waxaan niri: "Dabkow noqo qabow iyo nabadgalyo dushiisa Ibraahim."',
    },
    chapters: [
      {
        title: 'Dooddii Xikmadda & Jabintii Sanamyada',
        content:
          'Nabi Ibraahim isagoo dhallinyaro ah ayuu arkay aabbihiis Aazar iyo qoomkiisa oo caabudaya dhagaxyo ay gacantooda ku qoreen. Wuxuu kula dooday sababta ay u caabudayaan wax aan waxba maqli karin waxna tari karin. Maalin ciid ah markii dadkii magaalada ka bexeen, Ibraahim wuxuu galay macbadkii wuxuuna faash ku jajabiyey dhammaan sanamyadii yar-yaraa, isagoo faashkii ku deldelay sanamkii ugu weynaa.',
      },
      {
        title: 'Maxkamaddii Boqorka & Dabkii Weynaa',
        content:
          'Markii dadkii soo noqdeen oo arkeen sanamyadii oo burbursan, waxay weydiiyeen: "Ma adigaa ku sameeyey arrintan ilaahyadayada, Ibraahim?" Wuxuu ku yiri: "Koodan weyn ayaa sameeyey, weydiiya haddii ay hadli karaan!" Qoomkii wejigooda ayay qariyeen maxaa yeelay waxay garteen in aysan hadli karin. Laakiin kibir darteed waxay go’aansadeen inay dilaan, waxayna shideen dab aad u weyn oo shimbiruhu aysan dul mari karin, iyagoo mashiin ku dhex tuuray Ibraahim.',
      },
      {
        title: 'Kalsoonidii Buuxday & Mucjisadii Dabka',
        content:
          'Markii Ibraahim hawada ku jiray isagoo dabka ku dhacaya, Malag Jibriil ayaa u yimid oo weydiiyey: "Ma waxaad u baahan tahay gargaar?" Ibraahim wuxuu ugu jawaabay: "Xaggaaga maya, xagga Eebbe se haa. Hasbiyallaahu wa nicmal wakiil." Eebbe ayaa la hadlay dabkii wuxuuna ku yiri: "Dabkow noqo qabow iyo nabadgalyo dushiisa Ibraahim." Xadhkihii uu ku xirnaa oo kaliya ayaa gubtay, asaguna wuxuu dhex fadhiyey dabka isagoo nabad qaba oo qabowsanaya.',
      },
    ],
    lessons: [
      'Kalmada "Hasbiyallaahu wa nicmal wakiil" waa gaashaanka ugu xooggan ee qofka mu’minka ah.',
      'Dabka wax guba dabeecaddiisu gacanta Eebbe ayay ku jirtaa; markuu amro, dabkii gubayey wuxuu noqdaa nabad iyo qabow.',
      'Xaqa oo lagu taagnaado ma keento khasaare, xitaa haddii awoodaha adduunku isugu tagaan qofka.',
    ],
    actionStep:
      'Markaad la kulanto cabsi ama cadaadis weyn, ku celceli: "Hasbiyallaahu wa nicmal wakiil" adigoo qalbiga ku kalsoon Eebbe.',
  },
  {
    id: 'story_yunus',
    titleSomali: 'Nabi Yoonis CS: Mugdigii Nibirka & Ducadii Badbaadada',
    titleArabic: 'ذُو النُّونِ يُونُسُ عَلَيْهِ السَّلَامُ',
    surahName: 'Al-Anbiya',
    surahNumber: 21,
    ayatRange: 'Aayadaha 87 - 88',
    category: 'duco',
    categoryLabel: 'Ducada Murugada & Furista Dhibka',
    emoji: '🐋',
    summary:
      'Qisada Nabi Yoonis oo ku dhex jiray saddex mugdi: mugdiga habeenka, mugdiga badda, iyo mugdiga caloosha nibirka. Ducadiisii xikmadda lahayd ayaa keentay badbaadada mucjisada ah.',
    quranAyahSnippet: {
      ar: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
      som: '"Ilaah ma jiro adiga mooyee, xumaan ayaad ka nasahan tahay, aniguna waxaan ka mid ahaa kuwa gar-darraystay."',
    },
    chapters: [
      {
        title: 'Bixitaankii Carada & Safraddii Doonta',
        content:
          'Nabi Yoonis wuxuu muddo dheer dadkiisii ugu yeerayey xaqa, laakiin markii ay madax-adaygeen ayuu ka carooday oo isaga tagay isagoon fasax toos ah ka helin Eebbe. Wuxuu raacay doon xamuul ah. Baddii dhexdeeda ayaa duufaan xoog leh ku dhufatay doontii, dadkiina waxay garteen in qof la tuuro si culayska doonta loo yareeyo. Qori-tuur saddex jeer lagu celiyey ayaa ku soo baxay Nabi Yoonis, baddiina waa lagu tuuray.',
      },
      {
        title: 'Mugdigii Saddexda ahaa',
        content:
          'Eebbe wuxuu amray nibir weyn oo badweynta ku jira inuu liqo Yoonis isagoon hilibkiisa goyn ama lafihiisa jebin. Nabi Yoonis wuxuu ku dhex jiray saddex mugdi oo cabsi badan: mugdiga habeenka, mugdiga badweynta gunteeda, iyo mugdiga caloosha nibirka dhexdiisa.',
      },
      {
        title: 'Dhawaaqii Badbaadada & Aqbaarta Eebbe',
        content:
          'Halkaas mugdiga ah ayuu Nabi Yoonis ka maqlay dhagaxyada iyo xayawaanka badda oo tasbiixsanaya. Wuxuu ku dhawaaqay ducadii buuxisay kownka: "Laa ilaaha illaa anta subxaanaka inniy kuntu minad-daalimiin." Malaa’igtii ayaa tiri: "Eebbow, waxaan maqlaynaa cod la yaqaan oo ka imanaya meel la yaab leh!" Eebbe ayaa amray nibirkii inuu Yoonis ku tuuro xeeb qalalan, waxaana korkiisa lagu koriyey geed bocor ah si uu harkiisa iyo mirihiisa uga bogsado.',
      },
    ],
    lessons: [
      'Ducada Nabi Yoonis waa furaha ugu xooggan ee lagu furaa murugada, cidhiidhiga, iyo walbahaarka daran.',
      'Qiraalka dambiga iyo ku laabashada Eebbe waxay badbaado keenaan xilliyada xaaladdu u muuqato mid aan laga bixi karin.',
      'Xuska Eebbe ee xilliga barwaaqada wuxuu kuu gargaaraa xilliga dhibaatada iyo baahida daran.',
    ],
    actionStep:
      'Xifdi oo ku celceli ducada Yoonis ugu yaraan 33 jeer marka aad dareento cidhiidhi ama culays maalinle ah.',
  },
  {
    id: 'story_musa_khidr',
    titleSomali: 'Nabi Muusa & Al-Khidr: Xikmadda Qaddarka Eebbe',
    titleArabic: 'مُوسَى وَالْخَضِرُ عَلَيْهِمَا السَّلَامُ',
    surahName: 'Al-Kahf',
    surahNumber: 18,
    ayatRange: 'Aayadaha 60 - 82',
    category: 'xikmad',
    categoryLabel: 'Xikmadda & Siraha Qaddarka Eebbe',
    emoji: '🌊',
    summary:
      'Safarkii barashada cilmiga ee dhexmaray Nabi Muusa iyo addoonkii suubbanaa ee Al-Khidr. Seddex dhacdo oo u muuqday kuwo xun laakiin xikmad weyn iyo naxariis ku dhex qarsoonayd.',
    quranAyahSnippet: {
      ar: 'فَوَجَدَا عَبْدًا مِّنْ عِبَادِنَا آتَيْنَاهُ رَحْمَةً مِّنْ عِندِنَا وَعَلَّمْنَاهُ مِن لَّدُنَّا عِلْمًا',
      som: 'Waxay heleen addoon ka mid ah addoommadayada oo aan siinnay naxariis agtayada ah, oo aan barnay cilmi xaggayaga ah.',
    },
    chapters: [
      {
        title: 'Shuruuddii Safarka & Doontii la Dalooliyey',
        content:
          'Nabi Muusa ayaa u safray labada badood meesha ay ku kulmaan si uu wax uga barto Al-Khidr. Al-Khidr wuxuu ku yiri: "Ima sabri kartid, waxna ha i weydiin ilaa aan anigu kaaga sheego." Waxay raaceen doon dad masaakiin ahi leeyihiin oo lacag la\'aan ku qaadday. Al-Khidr ayaa doontii dalooliyey! Muusa oo yaabban ayaa yiri: "Ma waxaad u daloolisay inaad qaraqdo dadkii la socday?"',
      },
      {
        title: 'Wiilkii la Dilay & Derbigii la Dhisay',
        content:
          'Ka dib waxay la kulmeen wiil yar, Al-Khidrna wuu dilay wiilkii. Muusa oo caroodey ayaa yiri: "Ma waxaad dishay naf aan waxba galabsan?" Al-Khidr wuxuu xusuusiyey ballantii. Kadib waxay yimaadeen tuulo dadkeedu diideen inay martisooraan; halkaas ayuu Al-Khidr ku dhisay derbi dumi rabay isagoon lacag ka qaadin.',
      },
      {
        title: 'Fasiraaddii Xikmadda & Siraha Qarsoonaa',
        content:
          'Al-Khidr wuxuu yiri: "Kani waa kala-taggeennii, haddana waxaan kuu sheegayaa sababaha:" Doontu waxay u dhisnayd masaakiin badda ka shaqeysta; boqor daalin ah oo hortooda joogay ayaa doon kasta oo wanaagsan xoog ku qaadanayey, daloolku wuxuu ahaa ceeb badbaadisa. Wiilka la dilay waalidkiis waxay ahaayeen mu\'miniin, hadduu weynaadana gaalnimo ayuu ku qasbi lahaa. Derbigana waxaa ku hoos jiray hanti labo agoon ah leeyihiin, aabbahoodna wuxuu ahaa qof suubban.',
      },
    ],
    lessons: [
      'Wax kasta oo noloshaada ku dhaca oo u muuqda xanuun ama khasaare, xikmad Eebbe ayaa ku dhex jirta oo aadan hadda fahmi karin.',
      'Suubanaanta waalidku waxay barako iyo ilaalin u keentaa carruurtooda xitaa dhimashada ka dib.',
      'Aqoonta aadanuhu waa mid aad u kooban marka loo eego xikmadda ballaaran ee Eebbe.',
    ],
    actionStep:
      'Marka arrin aad doonaysay ay fashilanto, dheh: "Alxamdulillaahi calaa kulli xaal, Eebbaa og waxa ii khayr ah."',
  },
  {
    id: 'story_sulayman',
    titleSomali: 'Nabi Sulaymaan CS: Boqortooyadii Mucjisada & Boqoraddii Bilqiis',
    titleArabic: 'سُلَيْمَانُ وَمَلِكَةُ سَبَإٍ',
    surahName: 'An-Naml',
    surahNumber: 27,
    ayatRange: 'Aayadaha 15 - 44',
    category: 'xikmad',
    categoryLabel: 'Awoodda, Xikmadda & Shukriga Eebbe',
    emoji: '👑',
    summary:
      'Qisada Nabi Sulaymaan oo Eebbe u sakhiray dabaysha, jinniga, iyo luqadaha xayawaanka. Dhurwaaga Hood-hood, quraanshada digtay, iyo dacwadii xigmadda lahayd ee boqoraddii Bilqiis ku soo hanuuntay.',
    quranAyahSnippet: {
      ar: 'قَالَ رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّن بَعْدِي ۖ إِنَّكَ أَنتَ الْوَهَّابُ',
      som: 'Wuxuu yiri: "Rabbiyow ii dambi-dhaaf, iina sii boqortooyo aan qofna iga dambaysaa heli karin; adigaa ah Bixiye weyn."',
    },
    chapters: [
      {
        title: 'Luqadda Quraanshada & Shukriga Sulaymaan',
        content:
          'Nabi Sulaymaan isagoo wata ciidankiisa oo ka kooban jinni, dad iyo shimbiro ayaa soo maray dooxada quraanshada. Quraanjo ayaa ku dhawaaqday: "Quraanshooy, gala guryihiinna yaanu Sulaymaan iyo ciidankiisii idin burburinin iyagoon ogayn." Sulaymaan ayaa maqlay hadalkeeda wuuna dhoolla-caddeeyey isagoo u mahadceliyey Eebbe nimcada uu siiyey.',
      },
      {
        title: 'Warbixintii Hood-hood & Qoraalkii Saba',
        content:
          'Shimbirkii Hood-hood ayaa yimid isagoo xambaarsan war weyn: Wuxuu arkay reer Saba iyo boqoraddooda Bilqiis oo caabudaya qorraxda Eebbe beddelkiis. Sulaymaan wuxuu u diray warqad ku bilaabanaysa: "Bismillaahir-Raxmaanir-Raxiim, ha is-weyniinina oo ii imaada idinkoo Muslimiin ah."',
      },
      {
        title: 'Soo Qaadiddii Carshiga & Soo Gelitaankii Islaamka',
        content:
          'Sulaymaan ayaa yiri: "Yaa carshigeeda ii keenaya inta aysan iman?" Nin cilmi Eebbe haystay ayaa yiri: "Anigaa kuu keenaya ka hor inta aadan isha isku qaban oo furin." Markii Bilqiis timid waxay aragtay carshigeedii oo halkaas yaal, qasrigii oo sagxad muraayad ah oo biyo hoos socdaan leh. Bilqiis ayaa garatay awoodda Eebbe waxayna tiri: "Rabbiyow waan dulmiyey naftayda, waxaana la islaamay Sulaymaan anigoo u hoggaansamay Rabbiga kownka."',
      },
    ],
    lessons: [
      'Awoodda iyo xoolaha waa in qofka u horseedaan is-hoosaysiin iyo shukri joogto ah, ee ma aha kibir.',
      'Shimbir yar sida Hood-hood ayaa sabab u noqotay in qaran dhan oo dhumay ku soo hanuunaan diinta xaqa ah.',
      'Xikmadda iyo garashada sare waxay kugu hagtaa xalinta khilaafaadka adigoon dhiig daadin.',
    ],
    actionStep:
      'Ku celceli ducada Sulaymaan: "Rabbi awzicnii an ashkura nicmataka-llatii anamta calayya".',
  },
  {
    id: 'story_ayub',
    titleSomali: 'Nabi Ayyuub CS: Sabirkii Mucjisada Ahaa ee Imtixaanka',
    titleArabic: 'أَيُّوبُ عَلَيْهِ السَّلَامُ وَالصَّبْرُ الْجَمِيلُ',
    surahName: 'Al-Anbiya',
    surahNumber: 21,
    ayatRange: 'Aayadaha 83 - 84',
    category: 'sabir',
    categoryLabel: 'Sabirka Xanuunka & Bogsashada Eebbe',
    emoji: '🌱',
    summary:
      'Nabi Ayyuub oo ahaa taajir barwaaqo qaba, ayaa Eebbe ku imtixaanay xanuun daran, dhimashada carruurtiisa, iyo lumitaanka maalkiisa muddo 18 sano ah. Sabirkiisii quruxda badnaa ayaa tusaale u noqday caalamka.',
    quranAyahSnippet: {
      ar: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
      som: '"Aniga dhib ayaa i taabtay, adiguna waxaad tahay kan ugu naxariista badan kuwa naxariista."',
    },
    chapters: [
      {
        title: 'Imtixaankii Culsaa ee 18-ka Sano',
        content:
          'Nabi Ayyuub wuxuu ahaa qof aad u maalqabeen ah oo leh xoolo, beero, carruur badan iyo caafimaad buuxa. Eebbe ayaa imtixaanay: maalkii oo dhan ayaa ka dhammaaday, carruurtiisii oo dhan ayaa hal mar dhimatay, jidhkiisiina waxaa ku dhacay xanuun daran oo qof kasta ka cararay xaaskiisa aaminka ahayd mooyee. Sanado badan ayuu sariirta ku jiray isagoon marnaba ka caban Eebbe.',
      },
      {
        title: 'Edebta Ducada & Bogsashadii Biyaha Qabow',
        content:
          'Markii dhibaatadii sii korodhay, Ayyuub wuxuu Eebbe u baryey si edeb iyo naxariis ku jirto: "Rabbiyow dhib ayaa i taabtay, adiguna waxaad tahay kan ugu naxariista badan." Ma oran "i caafi", laakiin naxariista Eebbe ayuu ku kalsoonaaday. Eebbe ayaa amray: "Ku dhufo cagtaada dhulka; kani waa biyo qabow oo lagu mayrto lana cabo." Halkaas ayuu ku mayrtay jidhkiisiina wuxuu ku noqday mid dhallinyaro ah oo caafimaad qaba.',
      },
      {
        title: 'Soo Noqoshadii Barwaaqada & Abaalka Sabirka',
        content:
          'Eebbe ma siin oo kaliya caafimaad, laakiin wuxuu dib ugu soo celiyey carruurtiisii oo labanlaab ah, xoolihiisii oo dahab ah, iyo sharaf weyn. Eebbe wuxuu ku ammaanay Quraanka: "Waxaan helnay isagoo sabur badan, addoon fiican ayuu ahaa, waana kii had iyo jeer Eebbe u noqda."',
      },
    ],
    lessons: [
      'Sabirka runta ah ma aha oo kaliya dulqaad, waa in aadan marnaba ka quusan naxariista Eebbe xitaa haddii xanuunkaagu dheeraado.',
      'Edebta ducada waxay kordhisaa fursadda aqbalkeeda.',
      'Ka dib mugdi kasta oo xanuun leh, waxaa jira waabari barwaaqo iyo caafimaad leh oo Eebbe u qoray kuwa sabra.',
    ],
    actionStep:
      'Haddii aad xanuunsan tahay ama dhib kugu jiro, ku ducee: "Rabbi annii massaniyad-durru wa anta arxamur-raaximiin".',
  },
  {
    id: 'story_dulqarnayn',
    titleSomali: 'Boqor Dulqarnayn & Derbigii Birta ahaa ee Yaajuuj & Maajuuj',
    titleArabic: 'ذُو الْقَرْنَيْنِ وَسَدُّ يَأْجُوجَ وَمَأْجُوجَ',
    surahName: 'Al-Kahf',
    surahNumber: 18,
    ayatRange: 'Aayadaha 83 - 98',
    category: 'tusaale',
    categoryLabel: 'Hoggaaminta Caaddilka ah & Injineernimada',
    emoji: '🛡️',
    summary:
      'Qisada boqorkii caaddilka ahaa ee Eebbe siiyey aqoonta iyo awoodda. Wuxuu dhisay derbigii weynaa ee birta iyo naxaasta dhalaashay ka samaysnaa si uu dadka daciifka ah uga badbaadiyo qas-wadayaasha Yaajuuj iyo Maajuuj.',
    quranAyahSnippet: {
      ar: 'آتُونِي زُبَرَ الْحَدِيدِ ۖ حَتَّىٰ إِذَا سَاوَىٰ بَيْنَ الصَّدَفَيْنِ قَالَ انفُخُوا ۖ حَتَّىٰ إِذَا جَعَلَهُ نَارًا قَالَ آتُونِي أُفْرِغْ عَلَيْهِ قِطْرًا',
      som: '"Ii keena burburka birta; markuu simay labada buurood dhexdooda ayuu yiri: afuufo, markuu ka dhigay dabna wuxuu yiri: ii keena aan ku shubee naxaas dhalaashay."',
    },
    chapters: [
      {
        title: 'Socdaalkii Galbeedka & Bariga Adduunka',
        content:
          'Dulqarnayn wuxuu ahaa hoggaamiye caaddil ah oo Eebbe u fududeeyey sababaha awoodda iyo aqoonta. Wuxuu gaaray meesha qorraxdu u muuqato inay ku dhacayso il biyo madow ah, wuxuuna dadkii halkaas joogay kula dhaqmay caddaalad: kii dulmi gala waa la ciqaabayaa, kii wanaagsanna wuxuu leeyahay abaalmarin. Ka dib wuxuu gaaray dhanka bari ee adduunka.',
      },
      {
        title: 'Dadkii Buuraha Dhexdooda & Baahida Badbaadada',
        content:
          'Wuxuu gaaray labo buurood dhexdooda halkaas oo ay ku noolaayeen dad aan ku hadlin luqad si fudud loo fahmo. Dadkii waxay ka cawdeen qolo la yiraahdo Yaajuuj iyo Maajuuj oo qas iyo baabbi\'in ku hayey dhulka, waxayna ku dhaheen: "Ma ku siinnaa canshuur si aad noo dhex dhigto derbi?" Dulqarnayn wuxuu yiri: "Waxa Eebbe i siiyey ayaa ka khayr badan xoolihiinna, ee xoog iigu gargaara."',
      },
      {
        title: 'Injineernimadii Derbiga & Shukrigii Eebbe',
        content:
          'Dulqarnayn ma qaadan lacag; wuxuu dadkii amray inay keenaan bir adag, markuu buuraha simayna dab ayaa lagu afuufay, ka dibna naxaas kulul ayaa lagu shubay. Waxaa dhashay derbi adag oo aysan kor uga bixi karin daloolinna karin. Dulqarnayn ma kibrayn, laakiin wuxuu yiri: "Kani waa naxariis ka timid Rabbigay."',
      },
    ],
    lessons: [
      'Hoggaamiyaha dhabta ahi ma boobo shacabkiisa, laakiin awooddiisa iyo aqoontiisa ayuu ugu adeegaa dadka daciifka ah.',
      'Guul kasta oo aad gaarto, u celiy Eebbe mahaddeeda halkii aad ku faani lahayd aqoontaada.',
      'Is-kaashiga iyo shaqada wada-jirka ah waxay dhalisaa natiijooyin waaweyn oo badbaadiya bulshada.',
    ],
    actionStep:
      'Adeegso xirfaddaada iyo aqoontaada si aad u caawiso qof bulshadaada ka mid ah oo u baahan caawimaad dhab ah.',
  },
  {
    id: 'story_nuh',
    titleSomali: 'Nabi Nuux CS: 950 Sano oo Sabir ah & Doontii Badbaadada',
    titleArabic: 'نُوحٌ عَلَيْهِ السَّلَامُ وَالسَّفِينَةُ',
    surahName: 'Hud',
    surahNumber: 11,
    ayatRange: 'Aayadaha 36 - 48',
    category: 'sabir',
    categoryLabel: 'Dhabar-adayga Dacwada & Doontii Badbaadada',
    emoji: '🚢',
    summary:
      'Qisada Nabi Nuux oo 950 sano si joogto ah qoomkiisa ugu yeerayey xaqa. Doontii mucjisada ahayd ee buurta dusheeda lagu dhisay, duufaankii kownka qariyey, iyo dhimashadii wiilkiisa oo diiday badbaadada.',
    quranAyahSnippet: {
      ar: 'وَاصْنَعِ الْفُلْكَ بِأَعْيُنِنَا وَوَحْيِنَا وَلَا تُخَاطِبْنِي فِي الَّذِينَ ظَلَمُوا ۚ إِنَّهُم مُّغْرَقُونَ',
      som: '"Ku dhis doonta ilaalintayada iyo waxyigayaga, hana igala hadlin kuwa dulmiga galay; hubaal waa la qaraqayaa."',
    },
    chapters: [
      {
        title: '950 Sano oo Joogteyn & Sabir ah',
        content:
          'Nabi Nuux wuxuu qoomkiisa ugu yeerayey Eebbe habeen iyo maalin, qarsoodi iyo caddaanba muddo 950 sano ah. Laakiin mar kasta oo uu u yeero, waxay faraha gelinayeen dhegahooda, dharkana isku dedayeen iyagoo kibir badan muujinaya. Aad bay u yarayd intii raacday oo u badnayd dadka daciifka ah.',
      },
      {
        title: 'Dhisidda Doontii Buurta Daran',
        content:
          'Eebbe ayaa u waxyooday Nuux: "Ma rumeeyaan qoomkaaga kuwa hore u rumeeyey mooyee, ee dhis doon weyn." Nuux wuxuu bilaabay dhisidda doon weyn oo buur dusheeda ah oo baddi ka fogayd. Madaxdii gaalada markay soo maraan waxay ku jees-jeesi jireen: "Nuuxow, shalay nebi ayaad ahayd, maanta ma nijaar ayaad noqotay baddana meel ay jirto ma aragno?" Nuux wuxuu ku yiri: "Haddaad nagu jees-jeestaan, annaguna waan idinku jees-jeesi doonnaa."',
      },
      {
        title: 'Daadkii Weynaa & Qisadii Xanuunka Badnayd ee Wiilka',
        content:
          'Markii amarkii Eebbe yimid, foornadii dhulka ayaa biyo ka burqadeen, samadiina roob xoog leh ayaa ka da’ay. Nuux wuxuu doonta geliyey xayawaan kasta labo labo iyo intii rumaysay. Mowjadihii oo buuro le’eg dhexdeeda, Nuux wuxuu arkay wiilkiisii oo gaalnimada ku adkeystay wuxuuna ku dhawaaqay: "Wiilkayow nala soo fuul doonta." Wiilkii wuxuu yiri: "Waxaan magangalayaa buur iga ilaalisa biyaha." Nuux wuxuu yiri: "Maanta badbaado ma jirto." Mowjad ayaa dhexmartay waana la qaraqay.',
      },
    ],
    lessons: [
      'Joogtaynta iyo dhabar-adayga (consistency) dartiis ayuu Nabi Nuux u noqday mid ka mid ah shanta nebi ee ugu sarreeya (Ulul-Cazmi).',
      'Hanuunku waa gacanta Eebbe; xitaa nebi ma hanuunin karo wiilkiisa haddii uusan asagu rabin xaqa.',
      'Marka duufaannada nolosha kacaan, doonta kaliya ee lagu badbaadaa waa doonta iimaanka iyo adeecidda Eebbe.',
    ],
    actionStep:
      'Waligaa ha quusan markaad samaynayso dadaal wanaagsan; sii wad joogtaynta xitaa haddii dadku kugu jees-jeesaan.',
  },
  {
    id: 'story_maryam',
    titleSomali: 'Maryam bintu Cimraan & Dhalashadii Mucjisada ahayd ee Nabi Ciise',
    titleArabic: 'مَرْيَمُ ابْنَتُ عِمْرَانَ وَعِيسَى عَلَيْهِ السَّلَامُ',
    surahName: 'Maryam',
    surahNumber: 19,
    ayatRange: 'Aayadaha 16 - 36',
    category: 'iimaan',
    categoryLabel: 'Dhawrsanaanta, Mucjisooyinka & Kalsoonida',
    emoji: '🌸',
    summary:
      'Qisada haweenaydii ugu sharafta badnayd adduunka ee Maryam. Cibaadadeedii qolka xiran, dhalashadii mucjisada ahayd ee Nabi Ciise asagoon aabbe lahayn, iyo hadalkii Ciise ku hadlay dhasheedii.',
    quranAyahSnippet: {
      ar: 'قَالَ إِنَّمَا أَنَا رَسُولُ رَبِّكِ لِأَهَبَ لَكِ غُلَامًا زَكِيًّا',
      som: 'Wuxuu yiri: "Anigu waxaan uun ahay farriin-walaha Rabbigaa si aan kuu siiyo wiil daahir ah."',
    },
    chapters: [
      {
        title: 'Cibaadadii Qolka & Farriintii Malag Jibriil',
        content:
          'Maryam waxay ku kortay daryeelka Nabi Zakariya iyadoo nolosheeda oo dhan u hibaysay cibaadada Eebbe. Waxay gashay meel ka go\'an dadka. Waxaa u yimid Malag Jibriil oo u eg nin dhammaystiran. Maryam oo cabsatay ayaa tiri: "Waxaan kaa magangalayaa Raxmaanka haddaad tahay qof dhawrsan." Jibriil ayaa ugu bishaareeyey inay dhali doonto wiil daahir ah oo mucjiso ah asagoon aabbe lahayn.',
      },
      {
        title: 'Xanuunkii Dhalmada & Geedkii Timirta',
        content:
          'Dhibkii dhalmada ayaa ku qasbay geed timir ah jirridiisa. Murugo daran darteed waxay tiri: "Shallaytooy, maan dhinto arrintan ka hor oo noqdo wax la illoobay!" Laakiin hoosteeda ayaa looga dhawaaqay: "Ha murugoon, Rabbigaa wuxuu ka yeelay hoostaada durdur biyo ah. Rux jirridda timirta waxay kugu soo daadinaysaa miro cusub oo bisil. Cuntada cun, biyaha cab, oo indhahaagu ha qaboobeen."',
      },
      {
        title: 'Hadalkii Wiilka Yar ee Sariirta Jiifay',
        content:
          'Markii ay canugii u keentay dadkeedii, waxay bilaabeen inay ku eedeeyaan xumaan: "Waalidkaa ma ahayn kuwa xun, Maryamay xaggee waxan ka keentay?" Maryam waxay farta ku fiiqday canugii yaraa maxaa yeelay waxay soomnayd hadal. Dadkii ayaa la yaabay: "Sideen ula hadalnaa canug yar oo dhashay?" Halkaas ayuu Nabi Ciise kaga hadlay sariirta isagoo yiri: "Anigu waxaan ahay addoonka Eebbe, wuxuu i siiyey Kitaab wuxuuna iga yeelay Nebi."',
      },
    ],
    lessons: [
      'Dhawrsanaanta iyo daahirnimada waxay qofka gaarsiisaa maamuus aan qofna ka qaadi karin.',
      'Xilliyada ugu xanuunka badan uguna cidlada badan noloshaada, Eebbe wuxuu kuu furaa durdur biyo ah iyo xal aadan filanayn.',
      'Ha isku mashquulin difaacidda naftaada marka aad xaqa ku taagan tahay; Eebbe ayaa noqonaya difaacaaga ugu weyn.',
    ],
    actionStep:
      'Dhowr daacadnimadaada iyo xiriirka aad la leedahay Eebbe meel kasta oo aad joogto, gaar ahaan markaad keligaa tahay.',
  },
  {
    id: 'story_qaran',
    titleSomali: 'Qisadii Qaroon: Kibirka Maalka & Liqidda Dhulka',
    titleArabic: 'قَارُونُ وَفِتْنَةُ الْمَالِ',
    surahName: 'Al-Qasas',
    surahNumber: 28,
    ayatRange: 'Aayadaha 76 - 82',
    category: 'tusaale',
    categoryLabel: 'Kibirka Maalka & Casharka Dhulka',
    emoji: '💰',
    summary:
      'Qisadii Qaroon oo ka mid ahaa qoomkii Nabi Muusa, oo Eebbe siiyey maal aad u badan oo furayaasha qasnadihiisa ay koox rag xoog leh qaadi jireen. Kibirkiisii wuxuu sababay in dhulku liqo isaga iyo qasrigiisiiba.',
    quranAyahSnippet: {
      ar: 'فَخَسَفْنَا بِهِ وَبِدَارِهِ الْأَرْضَ فَمَا كَانَ لَهُ مِن فِئَةٍ يَنصُرُونَهُ مِن دُونِ اللَّهِ',
      som: '"Markaas ayaan isaga iyo gurigiisiiba la goynay dhulka; mana uusan helin koox u gargaarta Eebbe ka sokow."',
    },
    chapters: [
      {
        title: 'Maalkii Aan Xadka Lahayn & Taladii Culimada',
        content:
          'Qaroon wuxuu haystay dahab iyo maal fara badan oo furayaasha qasnadihiisa ay raggii ugu xoogga badnaa qaadi kari waayeen. Culimadii suubbanaa waxay kula taliyeen: "Ha faanin, Eebbe ma jecla kuwa faana. Maalkan aad heshay ku doon daarta aakhiro, hana iloobin qaybtaada adduunka, waxna bixi siduu Eebbe wax kuu siiyey."',
      },
      {
        title: 'Kibirka Qaroon & Hadalkiisii Halaagga',
        content:
          'Qaroon wuxuu ugu jawaabay si kibir badan: "Maalkan waxaan ku helay cilmiga iyo aqoonta aan leeyahay oo kaliya, qofna wax ima siinin!" Maalin maalmaha ka mid ah ayuu u soo baxay dadka isagoo wata dhar qurux badan iyo ciidan weyn. Dadkii daciifka ahaa waxay dheheen: "Waxaan jeclaan lahayn inaan helno waxa Qaroon la siiyey." Laakiin kuwa cilmiga leh waxay dheheen: "Ajarka Eebbe ayaa idiin khayr badan."',
      },
      {
        title: 'Liqidda Dhulka & Casharka Qoomka',
        content:
          'Kibirkiisii dartiis, Eebbe wuxuu amray dhulka inuu furmo oo liqo Qaroon, qasriyadiisii, iyo dahabkiisii oo dhan hal il-bidhiqsi gudaheed. Dadkii shalay jeclaa hantidiisa waxay arkeen dhulkii oo siman oo meelna aan laga helin Qaroon, waxayna dheheen: "Haddii uusan Eebbe noo naxariisan lahayn annagana wuu nala goyn lahaa dhulka; hubaal kuwa gaalada ahi ma libaanaan."',
      },
    ],
    lessons: [
      'Xooluhu waa aammino Eebbe ku siiyey, ma aha oo kaliya natiijada xariifnimadaada ama shaqadaada.',
      'Kibirka iyo is-weyniintu waxay horseedaan halaag degdeg ah adduunka ka hor aakhiro.',
      'Maalka dhabta ahi waa kan aad ku bixiso jidka khayrka si uu aakhiro kuugu noqdo keyd waara.',
    ],
    actionStep:
      'Ka bixi sadaqo maanta xoolahaaga, adigoo og in wax walba oo aad haysato ay yihiin deeq Eebbe kaa soo gaaray.',
  },
  {
    id: 'story_ashabul_jannah',
    titleSomali: 'Asxaabul Jannah: Milkiilayaashii Beerta Gubatay',
    titleArabic: 'أَصْحَابُ الْجَنَّةِ',
    surahName: 'Al-Qalam',
    surahNumber: 68,
    ayatRange: 'Aayadaha 17 - 33',
    category: 'tusaale',
    categoryLabel: 'Bakhaylnimada & Xaqa Masaakiinta',
    emoji: '🍇',
    summary:
      'Qisada walaalo dhaxlay beer barwaaqo leh oo aabbahood masaakiinta wax ka siin jiray. Waxay ku dhaarteen inay subax hore miraha gurtaan si aysan masaakiintu u ogaan, laakiin dab kaga yimid samada ayaa beertii ka dhigay dambas.',
    quranAyahSnippet: {
      ar: 'فَطَافَ عَلَيْهَا طَائِفٌ مِّن رَّبِّكَ وَهُمْ نَائِمُونَ * فَأَصْبَحَتْ كَالصَّرِيمِ',
      som: '"Waxaa ku wareegtay dab ka yimid Rabbigaa iyagoo hurda; markaas waxay noqotay sida habeen mugdi ah (dambas madow)."',
    },
    chapters: [
      {
        title: 'Shirkiga Bakhaylnimada & Go\'aankii Xumaa',
        content:
          'Aabbahood wuxuu ahaa oday wanaagsan oo beerta goosashadeeda wax ka siin jiray masaakiinta iyo agoonka. Markii uu dhintay, carruurtiisii waxay yiraahdeen: "Xoolihii aabbaheen masaakiinta ayuu ku dhumiyey, annagu waxba siin mayno." Waxay ku dhaarteen inay aroortii hore soo kici doonaan oo gurtaan miraha beerta inta aysan masaakiintu toosin, mana dhihin "Insha Allaah".',
      },
      {
        title: 'Dabkii Habeenkii & Beertii Dambaska Noqotay',
        content:
          'Iyagoo hurda oo ku riyoonaya maalka badan ee ay heli doonaan, Eebbe wuxuu beertii u soo diray dab samada ka yimid oo gubay dhammaan geedihii iyo mirihii, waxayna noqotay sidii dambas madow oo gubatay.',
      },
      {
        title: 'Imaatinkii Aroortii & Qoomamadii Dambeysay',
        content:
          'Aroortii waxay isugu yeereen si hoose: "Aan baxno yaanu miskiin idinla gelin beerta maanta." Markii ay beertii yimaadeen oo arkeen dambaska madow, waxay dheheen: "Waan hilloownay jidkii beerta." Koodii ugu xikmadda badnaa ayaa yiri: "Miyaanan idinku dhihin maxaad Eebbe u xusi weydeen?" Waxay bilaabeen inay is-eedeeyaan iyagoo leh: "Way noo dhammaatay, run ahaantii waxaan ahayn kuwa dulmi badan."',
      },
    ],
    lessons: [
      'Xaqa masaakiinta iyo zakada oo la diido waxay sababtaa in barakada maalka la tirtiro oo dhan.',
      'Had iyo jeer afkaaga ka dhig mid yiraahda "Insha Allaah" marka aad wax qorshaynayso.',
      'Toobada iyo qiraalka qaladka ka dib khasaaraha ayaa ka khayr badan in madax-adayg lagu sii jiro.',
    ],
    actionStep:
      'Gacantaada fur: Maanta quudi qof gaajaysan ama caawi qof sabool ah adigoo doonaya barakada maalkaaga.',
  },
];
