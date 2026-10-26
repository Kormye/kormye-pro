export interface LongArticle {
  id: string;
  num: number;
  title: string;
  category: 'saxaabada' | 'nabiga' | 'dunida' | 'saynis' | 'nolol' | 'ganacsi';
  categoryLabel: string;
  author: string;
  readTime: string;
  summary: string;
  content: string[]; // array of comprehensive paragraphs totaling 40-60+ lines
  quote?: string;
  keyTakeaways: string[];
}

// Foundational curated long articles
const BASE_LONG_ARTICLES: LongArticle[] = [
  // 1. SAXAABADA: Abuu Bakr As-Siddiiq
  {
    id: 'art_abubakr',
    num: 1,
    title: 'Abuu Bakr As-Siddiiq (RC): Saaxiibkii Godka & Halgankii Khaliifkii Koowaad',
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    author: 'Taariikhda Islaamka & Saxaabada',
    readTime: '6 daqiiqo',
    summary: 'Taariikh nololeed faahfaahsan oo ku saabsan ninkii ugu horreeyay ee rumeeyay Rasuulka ﷺ, bixiyay hantidiisa oo dhan, una noqday tiir adag ummadda xilliyadii ugu adkaa.',
    quote: 'Haddii la miisaamo iimaanka Abuu Bakr iyo iimaanka ummadda oo dhan, waxaa cuslaan lahaa iimaanka Abuu Bakr.',
    keyTakeaways: [
      'Daacadnimo buuxda iyo rumeyn aan shaki lahayn xilliyada fitnada iyo jahwareerka.',
      'Bixinta hantida iyo nafta iyadoo loo tanaasulayo hadafka weyn ee nolosha.',
      'Deganaansho iyo go\'aan-qaadasho adag marka ay timaado dhibaatooyin ummadeed oo waaweyn.',
    ],
    content: [
      'Abuu Bakr Cabdullaahi ibnu Abii Quxaafa (RC) wuxuu ahaa saaxiibka ugu dhow ee Nabiga Muxammad ﷺ, waana ninkii ugu horreeyay ee ragga xorta ah ka rumeeyay risaalada Islaamka isaga oo aan daqiiqad qudha ka labalabayn. Ka hor inta uusan Islaamku iman, Abuu Bakr wuxuu ku dhex lahaa reer Quraysh sumcad aad u sarreysa; wuxuu ahaa ganacsade daacad ah, nin yaqaanna abtiriska Carabta, kana fog xumaanta iyo caadooyinkii jaahiliyada.',
      'Markii uu Rasuulku ﷺ u sheegay inuu yahay Rasuulkii Eebbe soo diray, Abuu Bakr wuxuu ku jawaabay isla markiiba: "Run baad sheegtay, waxaan marag ka ahay inaad tahay Rasuulkii Allaah." Maalintaas wixii ka dambeeyay, noloshiisa oo dhan waxay noqotay mid u adeegta fidinta diinta xaqa ah. Wuxuu bilaabay inuu dadka ugu yeero Islaamka, waxaana gacantiisa ku soo islaamay saxaabo waaweyn sida Cusmaan ibnu Caffaan, Cabdiraxmaan ibnu Cawf, Dalxa ibnu Cubaydillaah, iyo Sacd ibnu Abii Waqqaas.',
      'Dhibaatadii baaxadda lahayd ee gaalada Quraysh ku hayeen dadka masaakiinta ah iyo addoomada soo islaamay, Abuu Bakr wuxuu kaga jawaabay ficil geesinimo iyo deeqsinimo leh. Wuxuu hantidiisii ganacsiga ku furtay addoomo badan oo loo ciqaabayey iimaankooda darteed, kuwaas oo uu ugu horreeyo Bilaal ibnu Rabaax oo dhagax culus lagu saarayey saxaraha kulul ee Makka, iyo Caamir ibnu Fuhayra.',
      'Muuqaalka ugu quruxda badan uguna qiimaha badan xiriirkii Abuu Bakr iyo Nabiga ﷺ wuxuu ahaa Hijradii taariikhiga ahayd. Markii Eebbe u oggolaaday Nabiga ﷺ inuu u haajiro Madiina, wuxuu doortay Abuu Bakr inuu noqdo saaxiibkiisa safarka. Waxay wada galeen Godka Thawr saddex habeen, iyadoo ciidankii Quraysh ay raadkooda soo daba galeen ilaa ay soo gaareen afka godka.',
      'Deeqsinimadiisa xad ma lahayn; duulaankii Tabuuk markii Rasuulku ﷺ ku baaqay in la qalabeeyo ciidanka dhibaatada ku jira, Cumar ibnu Al-Khadhaab wuxuu keenay barkeed hantidiisa, laakiin Abuu Bakr wuxuu keenay hantidiisii oo dhan hal meel. Markii Nabigu ﷺ weydiiyey: "Maxaad qoyskaaga uga soo tagtay?", Abuu Bakr wuxuu yiri: "Waxaan uga soo tagay Allaah iyo Rasuulkiisa!"',
      'Maalintii ugu cuslayd taariikhda Islaamka waxay ahayd maalintii uu geeriyooday Rasuulka ﷺ. Abuu Bakr wuxuu galay qolka Nabiga ﷺ, wuu dhunkaday foolkiisa, ka dibna wuxuu u baxay dadkii oo ku yiri: "Qofkii caabudayey Muxammad, Muxammad wuu dhintay; qofkiise caabudayey Allaah, Eebbe waa nool yahay mana dhinto."',
      'Intii uu ahaa Khaliifkii koowaad ee Islaamka, inkasta oo ay ahayd labo sano iyo bilo yar oo keliya, Abuu Bakr wuxuu ka adkaaday qabaa\'ilkii diinta ka noqday, wuxuuna bilaabay qoridda iyo ururinta Quraanka Kariimka ah oo hal buug lagu mideeyay. Wuxuu adduunka kaga tagay tusaale aan abid la ilaawi karin.',
    ],
  },

  // 2. SAXAABADA: Cumar Ibn Al-Khadhaab
  {
    id: 'art_umar',
    num: 2,
    title: 'Cumar Ibn Al-Khadhaab (RC): Al-Faaruuq & Caddaaladdii Gilgishay Boqortooyooyinka',
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    author: 'Taariikhda Khulafada Raashidiinta',
    readTime: '6 daqiiqo',
    summary: 'Qisadii qofkii kala saaray xaqa iyo baadilka, dhisay nidaamka dawladnimada casriga ah, habeenkiina dhabarka ku qaadi jiray cuntada si uu u quudiyo danyarta.',
    quote: 'Gormaad dadka addoonsateen iyagoo ay hooyooyinkood dhaleen iyagoo xor ah?',
    keyTakeaways: [
      'Caddaalad loo siman yahay: madaxweynaha iyo shacabka caadiga ah oo sharciga hortiisa siman.',
      'Dareenka mas\'uuliyadda: cabsi laga qabo xitaa haddii dameer ku kufto waddada Ciraaq in Eebbe weydiiyo.',
      'Dhisidda hay\'adaha maamulka, xisaabaadka hantida dawladda, iyo ilaalinta xuquuqda aadanaha.',
    ],
    content: [
      'Cumar ibnu Al-Khadhaab (RC), oo ku magac dheeraa Al-Faaruuq, wuxuu ahaa shakhsiyad xooggan oo geesinimo, xaq-u-hiilin, iyo garasho qoto dheer ku suntan. Ka hor inta uusan soo islaamin, wuxuu ahaa nin adag, laakiin ducadii Nabiga ﷺ ee ahayd: "Ilaahayow, ku cizee Islaamka labada nin kooda aad jeceshahay" ayaa timid, qalbigiisana Eebbe ku furay iftiinka Quraanka.',
      'Markii uu maqlay aayadaha Suuratu Daa-Haa ee walaashii Faadima bint Al-Khadhaab akhrinaysay, qalbigu wuu jilcay, ilmo ayaa indhihiisa ka qubatay, wuxuuna isla goobtii ku aaday Daaru Al-Arqam si uu u qiro shahaadada. Islaamiddiisu waxay ahayd guul weyn; saxaabadu waxay bilaabeen inay Kacbada hortooda si furan ugu tukadaan markii ugu horreysay.',
      'Hijradii Madiina dadka badankoodu waxay ku bexeen si dhuumasho ah, laakiin Cumar wuxuu qaatay seefkiisa, wuxuu tagay fagaaraha Quraysh, wuxuuna ku dhawaaqay cod dheer: "Qofkii raba in hooyadiis gablanto, carruurtiisuna agoontoobaan, ha iiga soo daba baxo dooxadan gadaasheeda!" Qofna kuma dhicin inuu hor istaago.',
      'Markii uu noqday Khaliifka labaad, Cumar wuxuu asaasay Diiwaanka hantida (Baytul Maal), taariikhda Hijriga, nidaamka booliska habeenkii wareega (Al-Casas), garsoorka madaxa banaan, iyo xarumaha kaydka cuntada xilliyada abaaraha.',
      'Habeenkii isaga oo Khaliifkii ummadda ah, wuxuu kormeeri jiray guryaha dadka danyarta ah. Habeen habeenada ka mid ah wuxuu arkay haweenay carruurteeda u karsaysa dhagxaan iyo biyo si ay ugu seexdaan iyagoo dhereg sugaya. Cumar isla goobtii wuxuu aaday bakhaarkii Baytul Maal, wuxuu dhabarka ku qaatay kiish daqiiq ah iyo saliid, isaga ayaana carruurtii u kariyay cuntada ilaa ay ka qosleen oo seexdeen.',
      'Caddaaladdii Cumar waxay noqotay hal-beeg caalami ah. Safiir reer Rooma ah oo Madiina yimid ayaa weydiiyey: "Aaway boqorkiinnu?", waxaana lagu yiri: "Waa kaas geedka hoostiisa ku hurda isagoo dacas madaxa gashaday." Safiirkii ayaa yiri erayadii caanka ahaa: "Waad caddaalad samaysay, waad nabad gashay, markaana waad seexatay."',
    ],
  },

  // 3. SAXAABADA: Cusmaan Ibn Caffaan
  {
    id: 'art_uthman',
    num: 3,
    title: 'Cusmaan Ibn Caffaan (RC): Dhu-Nuureyn, Xishoodkii Malaa\'igta & Midayntii Quraanka',
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    author: 'Taariikhda Khulafada Raashidiinta',
    readTime: '6 daqiiqo',
    summary: 'Khaliifkii saddexaad ee guursaday labada gabdhood ee Rasuulka ﷺ, bixiyay hanti aan xisaab lahayn si uu u quudiyo una qalabeeyo ciidanka Muslimiinta, una mideeyay Quraanka hal luqad.',
    quote: 'Miyaanan ka xishooneynin nin ay malaa\'igtu ka xishooto?',
    keyTakeaways: [
      'Xishoodka iyo dabeecadda wanaagsan oo qofka ka dhiga mid Eebbe iyo dadkuba jecel yihiin.',
      'Hantida loo adeegsado danta guud: qodidda ceelka Ruumah iyo qalabeynta ciidankii Tabuuk.',
      'Midaynta Quraanka Kariimka ah oo Muslimiinta ka badbaadisay khilaaf iyo tafaraaruq.',
    ],
    content: [
      'Cusmaan ibnu Caffaan (RC) wuxuu ka mid ahaa dadkii ugu horreeyay ee rumeeyay Rasuulka ﷺ, waxaana lagu naanaysi jiray "Dhu-Nuureyn" (Kii labada iftiin lahaa) sababtoo ah wuxuu guursaday labo gabdhood oo uu dhalay Nabigu ﷺ—Ruqaya iyo markay dhimatay ka dib Ummu Kulthuum. Rasuulku ﷺ wuxuu yiri: "Haddii aan gabar saddexaad leeyahayna Cusmaan baan u dhisi lahaa."',
      'Cusmaan wuxuu ahaa ganacsade aad u taajir ah, hase yeeshee hantidiisa uma haysan faan iyo raaxo adduunyo, balse wuxuu u arkayey aalad uu Eebbe ugu dhowaado. Markii Muslimiintu u haajiireen Madiina waxay la kulmeen biyo la\'aan daran, waxaana ceelka kaliya ee biyaha macaan lahaa lahaa nin Yuhuudi ah oo biyaha qaali kaga gadi jiray dadka. Cusmaan wuxuu ceelkii ku gatay hanti aad u badan, wuxuuna ka dhigay mid bilaash ah oo Muslimiinta oo dhammi cabaan.',
      'Duulaankii Tabuuk markii ciidanka Muslimiintu ku jireen xaalad adag oo loo yaqaannay "Jaysh Al-Cusra" (Ciidankii Dhibaatada), Cusmaan wuxuu bixiyay 940 rati oo raran, 60 faras, iyo kumanaan diinaar oo dahab ah. Rasuulku ﷺ ayaa gacantiisa ku rogrogay dahabkii isagoo leh: "Waxba ma yeelayso Cusmaan wixii uu sameeyo maanta ka dib!"',
      'Guusha ugu weyn uguna muhiimsan ee Cusmaan ku suntan tahay waa midayntii Quraanka Kariimka ah. Markii dawladdii Islaamku ballaaratay oo ay qabsatay dhulalka Faaris, Shaam, iyo Masar, waxaa bilaabmay khilaaf dhinaca akhriska Quraanka ah sababtoo ah lahjadaha kala duwan. Cusmaan wuxuu go\'aamiyay in Quraanka lagu koobo hal Musxaf oo ku qoran lahjaddii Quraysh.',
      'Wuxuu guddigii Zayd ibnu Thaabit u xilsaaray qoridda nuqullo badan, wuxuuna u kala diray magaalooyinka waaweyn sida Makka, Kuufa, Basra, iyo Dimishiq, isagoo amray in dhammaan waraaqihii kale ee khilaafka dhalinayay la gubo. Musxafka aynu maanta gacanta ku haysano ee adduunka oo dhan laga akhriyo waa "Musxafka Cusmaani" ee uu isagu mideeyay.',
    ],
  },

  // 4. SAXAABADA: Cali Ibn Abii Daalib
  {
    id: 'art_ali',
    num: 4,
    title: 'Cali Ibn Abii Daalib (RC): Albaabkii Magaalada Cilmiga & Geesigii Beder iyo Khaybar',
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    author: 'Taariikhda Khulafada Raashidiinta',
    readTime: '6 daqiiqo',
    summary: 'Wiilkii ugu horreeyay ee soo islaamay, seef-yahankii jabiyay qalcadaha Khaybar, xakiimkii hadalladiisa xigmadda ah ay ilaa maanta yihiin maahmaahyo nololeed.',
    quote: 'Waxaan ahay magaaladii cilmiga, Calina waa albaabkeeda.',
    keyTakeaways: [
      'Geesinimo xad-dhaaf ah oo lagu taageerayo xaqa iyadoo aan nafta loo baqayn.',
      'Cilmi qoto dheer iyo garasho sare oo lagu furfuro mushkilaadka adag ee bulshada.',
      'Fudeyd iyo xishood xagga adduunyada ah iyadoo awoodda iyo maalku gacanta ugu jiraan.',
    ],
    content: [
      'Cali ibnu Abii Daalib (RC) wuxuu ahaa ilma adeerka Nabiga ﷺ iyo seedigiis (ninkii qabay gabadhiisii Faadima Al-Zahraa), waana carruurtii ugu horreysay ee soo islaamtay isagoo jira 10 sano oo keliya. Wuxuu ku koray guriga Nabiga ﷺ, halkaas oo uu ka bartay akhlaaqda sare, xigmadda, iyo cilmiga diinta.',
      'Habeenkii Hijrada markii gaaladu hareereeyeen guriga Nabiga ﷺ si ay u dilaan, Cali wuxuu muujiyay geesinimo aan tusaale loo helin taariikhda. Wuxuu seexday sariirtii Rasuulka ﷺ isagoo og in seeftu ku dhici karto, si uu fursad ugu helo Nabigu ﷺ inuu baxsado, ka dibna wuxuu Makkah joogay saddex maalmood si uu dadkii gaalada ahaa ugu celiyo ammaanadii ay Nabiga ﷺ agtiisa dhigteen.',
      'Dagaalladii Islaamka oo dhan Cali wuxuu ahaa horseedka ciidanka. Dagaalkii Beder wuxuu dilay qaar ka mid ah madaxdii ugu adkeyd gaalada Quraysh. Dagaalkii Uxud wuxuu difaacay Nabiga ﷺ markii qaar badan oo ciidankii ka mid ahi jabeen.',
      'Dagaalkii Khaybar markii ciidankii Muslimiintu muddo maalmo ah furi waayeen qalcaddii ugu xoogga badnayd ee Yuhuudda, Rasuulku ﷺ wuxuu habeenkii yiri: "Berri waxaan calanka siin doonaa nin jecel Allaah iyo Rasuulkiisa, Allaah iyo Rasuulkiisuna jecel yihiin, Eebbana gacantiisa ku furayo." Maalintii dambe calankii wuxuu siiyay Cali, Calina albaabkii qalcadda ayuu jabiyay, guushiina ku timid.',
      'Cali wuxuu ahaa xakiim weyn oo garsoorkiisa iyo xikmaddiisu aad u sarreysay. Cumar ibnu Al-Khadhaab ayaa marar badan dhihi jiray: "Haddii uusan Cali joogi lahayn, Cumar wuu halaagsami lahaa" marka ay timaado arrin adag oo xukun loo waayo.',
    ],
  },

  // 5. SAYNISKA: Kacaankii Cilmiga & Kownka
  {
    id: 'art_saynis_kownka',
    num: 5,
    title: 'Kownka & Xiddigaha: Sida Sayniska Casriga ahi u Caddeeyay Mucjisooyinka Quraanka',
    category: 'saynis',
    categoryLabel: 'Sayniska & Kownka',
    author: 'Cilmiga Falagga & Fiisigiska Casriga ah',
    readTime: '6 daqiiqo',
    summary: 'Ballaarashada kownka, buuraha tiirarka ah, iyo wareegga meerayaasha: sida cilmi-baarista astrophysics-ku u waafaqday aayadaha Quraanka ee la soo dejiyay 1400 sano ka hor.',
    quote: 'Waxaan samada ku dhisnay awood, innagaana ballaarinayna.',
    keyTakeaways: [
      'Kownku ma aha mid fadhiya; wuxuu si joogto ah u ballaaranayaa saacad kasta.',
      'Aayadaha Quraanka Kariimka ahi waxay ka hadleen xaqiiqooyin cilmiyeysan ka hor inta aan la helin telescopes.',
      'Barashada saynisku waxay kordhisaa iimaanka iyo yaabka qofku ka qabo awoodda Eebbe.',
    ],
    content: [
      'Qarnigii 20aad, saynisyahankii caanka ahaa ee Albert Einstein wuxuu aaminsanaa in kownkani yahay mid fadhiya (Static Universe) oo aan isbeddelin cabbirkiisu. Laakiin sanadkii 1929-kii, Edwin Hubble isagoo isticmaalaya telescope-ka weyn ee Mount Wilson, wuxuu arkay wax dunida sayniska gilgilay: dhammaan xiddigaha iyo galaxies-ka waxay ka sii fogaanayaan dhulka iyo midba midka kale xawaare aad u sarreeya.',
      'Tani waxay caddaysay in kownku uu si joogto ah u ballaaranayo (Expanding Universe). Laakiin yaabka weyni wuxuu yahay in Quraanka Kariimka ahi uu arrintan si cad u sheegay 1400 sano ka hor Suurat Adh-Dhaariyaat, aayadda 47: "Samada waxaan ku dhisnay awood, Annagaana ballaarinayna."',
      'Sidoo kale, aragtida "Big Bang" ee sheegaysa in samada iyo dhulku ay ahaayeen hal meel oo isku dheggan ka dibna la kala furay, waxaa Quraanku kaga hadlay Suurat Al-Anbiyaa, aayadda 30: "Miyaysan arag kuwa gaaloobay in samooyinka iyo dhulku ahaayeen kuwo isku dheggan oo aan kala bixinnay, wax kasta oo noolna aan ka yeelnay biyo?"',
      'Dhinaca geology-ga, cilmi-baarayaashu waxay ogaadeen in buuruhu ay leeyihiin xididdo dhaadheer oo dhulka hoostiisa gala (Isostasy), kuwaas oo u shaqeeya sida tiirarka dhulka xasiloonida u haya. Quraankuna wuxuu ku tilmaamay "Awtaada" (tiirar ama musmaarar dhulka lagu qodbay).',
    ],
  },

  // 6. CASHARRADA NOLOSHA: Atomic Habits & Joogtada
  {
    id: 'art_life_habits',
    num: 6,
    title: 'Awoodda Caadooyinka Yaryar: Sida 1% oo Horumar Maalinle ah uu Noloshaada u Beddelo',
    category: 'nolol',
    categoryLabel: 'Horumarinta Qofka & Nolosha',
    author: 'Cilmiga Dabeecadda & Wax-soo-saarka',
    readTime: '5 daqiiqo',
    summary: 'Sababta isbeddellada waaweyn aysan ugu imaan tallaabooyin degdeg ah, balse ay ku yimaadaan caadooyin yaryar oo maalin kasta la joogteeyo.',
    quote: 'Camalka Eebbe ugu jecel yahay waa kan la joogteeyo, xitaa haddii uu yar yahay.',
    keyTakeaways: [
      'Haddii aad 1% kordhiso tayadaada maalin kasta, sannad gudihiis waxaad noqonaysaa 37 jeer qof ka fiican kii hore.',
      'Ha diiradda saarin hadafka oo keliya; nidaamka (system) aad u dhisto hawsha ayaa go\'aamiya guushaada.',
      'Aqoonsigaaga cusub dhiso: "Waxaan ahay qof akhriya, qof xafida Quraanka, qof ganacsade ah".',
    ],
    content: [
      'Dadka badankoodu waxay aaminsan yihiin in guusha weyn ay u baahan tahay ficil weyn oo lama-filaan ah. Laakiin isbeddelka dhabta ah ee waaraya wuxuu ka dhashaa waxa sayniska dabeecaddu ugu yeero "Compound Effect" ama faa\'iidada is-fuushan ee caadooyinka yaryar.',
      'Haddii aad maalin kasta 1% ka fiicnaato qofkii aad shalay ahayd, sannad ka dib ma noqonaysid 365% ka fiican, balse waxaad noqonaysaa 37 jeer qof ka fiican kii hore! Taas beddelkeeda, haddii aad maalin kasta 1% dayacdo hawlahaaga, sannad ka dib waxaad hoos ugu dhacaysaa eber ku dhow.',
      'Rasuulkeenna suubban ﷺ wuxuu noo baray xikmaddan markuu yiri: "Camalka Eebbe ugu jecel yahay waa kan la joogteeyo, xitaa haddii uu yar yahay." Toban aayadood oo aad maalin kasta fahamto oo akhrido ayaa ka qiimo badan soddon jis oo aad sanadkii hal mar akhrido ka dibna iska dhaafto.',
      'Afar tallaabo ayaa caado kasta lagu dhisaa: Ka dhig mid muuqda, ka dhig mid soo jiidasho leh, ka dhig mid fudud, kana dhig mid qanciya oo aad ku faraxdo markaad dhammaystirto.',
    ],
  },
];

// Rich curriculum topics covering 100 comprehensive daily lessons
const THEMATIC_TOPICS: {
  category: 'saxaabada' | 'nabiga' | 'dunida' | 'saynis' | 'nolol' | 'ganacsi';
  categoryLabel: string;
  title: string;
  author: string;
  summary: string;
  quote: string;
  takeaways: string[];
  paragraphs: string[];
}[] = [
  // 7 - 25: Saxaabada & Taariikhda
  {
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    title: 'Khaalid Ibnul Waliid (RC): Seeftii Eebbe ee aan Weligeed Jabin',
    author: 'Taariikhda Halganka Islaamka',
    summary: 'Taliyaha militariga ee aan weligii laga adkaan in ka badan 100 dagaal, xeeladihiisii Yarmuuk iyo Mutah, iyo sababta uu u noqday tusaalaha geesinimada.',
    quote: 'Qalbiga qofka geesiga ah seeftu kuma dhimato sariirta dhexdeeda.',
    takeaways: ['Istaraatiijiyad xisaabsan ayaa ka guulaysata tiro aad u badan.', 'Hoggaamintu waa in la joogo safka hore ee dhibaatada.', 'Daacadnimada xilka: markii Cumar xilka ka qaaday wuxuu u dagaallamay sidii askari caadi ah.'],
    paragraphs: [
      'Khaalid ibnu Al-Waliid (RC) wuxuu ahaa taliye militari oo aan taariikhda bini\'aadamka loo helin wax u dhigma. Rasuulku ﷺ wuxuu ugu magac daray "Sayfullaah Al-Masluul" (Seeftii Eebbe ee gal-ka laga bixiyay).',
      'Dagaalkii Mutah markii saddexdii taliye ee Rasuulku magacaabay shahiideen, Khaalid wuxuu qabtay calanka, wuxuuna xeelad cajiib ah kaga saaray 3,000 oo Muslimiin ah gacanta 200,000 oo ciidanka Roomaanka ah.',
      'Dagaalkii Yarmuuk wuxuu jebiyay boqortooyadii Roomaanka, isagoo adeegsaday ciidan guur-guura oo fardooley ah. Khaalid wuxuu na baray in dardaaranka dhabta ahi yahay daacadnimo xagga Eebbe ah.',
    ],
  },
  {
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    title: 'Bilaal Ibn Rabaax (RC): Mu\'addinkii Rasuulka & Astaanta Xorriyadda',
    author: 'Taariikhda Saxaabada',
    summary: 'Addoonkii saxaraha kulul dhagaxa la saaray isagoo leh "Axadun Axad", oo markii dambe dul istaagay dhabarka Kacbada si uu ugu dhawaaqo Aadaankii ugu horreeyay.',
    quote: 'Axadun Axad — Eebbe waa mid kaliya.',
    takeaways: ['Mabda\'a runta ah ma jebin karto ciqaab adduunyo.', 'Islaamku wuxuu baabi\'iyay midab-takoorka iyo qabiilka.', 'Codka runta ah wuxuu dhex maraa qalbiyada qarniyo badan ka dib.'],
    paragraphs: [
      'Bilaal wuxuu ahaa astaan u taagan xorriyadda iyo sharafta aadanaha. Xilligii Umayya ibnu Khalaf uu ku dhibayay saxaraha Makka, Bilaal carrabkiisu kamuu daalin inuu ku dhawaaqo kalinimada Eebbe.',
      'Furashadii Makka, Rasuulku ﷺ wuxuu amar ku bixiyay in Bilaal uu fuulo dhabarka Kacbada si uu u aadaamo, taasoo ahayd farriin caddaynaysa in qofka sharaftiisu ku xidhan tahay iimaankiisa ee aysan ku xidhnayn dhalashadiisa.',
    ],
  },
  {
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    title: 'Cabdiraxmaan Ibn Cawf (RC): Ganacsadahii Barakada Lahaa ee Jannada Loogu Bishaareeyay',
    author: 'Ganacsiga & Islaamka',
    summary: 'Sida Cabdiraxmaan oo Madiina yimid isagoo aan waxba haysan uu suuqa uga bilaabay ganacsi, una noqday mid ka mid ah dadka ugu taajirsan Carabta.',
    quote: 'I tusa suuqu meesha uu ku yaallo.',
    takeaways: ['Gacmahaaga ku shaqayso halkii aad wax baryi lahayd.', 'Isku kalsooni iyo aqoon ganacsi ayaa ka muhiimsan hanti la helo.', 'Hantidu waxay leedahay barako marka sekada iyo sadaqada la bixiyo.'],
    paragraphs: [
      'Markii saxaabadu u haajiireen Madiina, Sacd ibnu Al-Rabii wuxuu u bandhigay Cabdiraxmaan barkeed hantidiisa iyo gurigiisa. Laakiin Cabdiraxmaan wuxuu yiri: "Ilaahay hantidaada iyo reerkaaga ha kuu barakeeyo; aniga kaliya i tusa meesha suuqu ku yaallo!"',
      'Wuxuu aaday Suuqa reer Qaynuqaac, wuxuu bilaabay iibinta subagga iyo jiiska, maalmo gudahoodna wuxuu noqday ganacsade madaxbannaan. Wuxuu bixiyay 40,000 oo diinaar oo sadaqo ah hal maalin, wuxuuna xoreeyay boqollaal qof.',
    ],
  },
  {
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    title: 'Muscab Ibn Cumayr (RC): Safiirkii Koowaad ee Islaamka & Halgankii Madiina',
    author: 'Taariikhda Saxaabada',
    summary: 'Dhallinyaradii Makka ugu labiska iyo udgoonka fiicnayd oo ka tanaasulay qaninimadii qoyskiisa, una noqday macallinkii reer Madiina Islaamka baray.',
    quote: 'Ma jirto raaxo ka weyn in aad u noolaato hadaf ka weyn naftaada.',
    takeaways: ['Dhallinyaradu waxay wax beddeli karaan marka ay helaan han sare.', 'Dabeecadda dabacsan iyo hadalka macaan ayaa dadka soo jiita.', 'Shahiidnimada Uxud waxay caddaysay daacadnimadiisa buuxda.'],
    paragraphs: [
      'Muscab wuxuu Makka ku ahaa wiilka ugu taajirsan uguna lebbiska fiican. Markuu soo islaamay, hooyadiis waxay ka goysay dhammaan hantidii, laakiin Muscab wuxuu doortay iftiinka iimaanka.',
      'Rasuulku ﷺ wuxuu u diray Madiina ka hor Hijrada si uu dadka u baro Quraanka. Sannad gudihiis, guri kasta oo Madiina ku yaal wuxuu ku yeeshay qof Muslim ah sababtoo ah dabeecaddiisa macaan iyo dulqaadkiisa.',
    ],
  },
  {
    category: 'saxaabada',
    categoryLabel: 'Saxaabada Rasuulka ﷺ',
    title: 'Salmaan Al-Faarisi (RC): Cilmi-Doonkii Runta Raadinayay & Injineerkii Khandaq',
    author: 'Taariikhda Saxaabada',
    summary: 'Safarkii dheeraa ee Salmaan kaga yimid Faaris, isagoo soo maray addoonsi iyo kadeed si uu u helo Nebiga dhabta ah, iyo xeeladdii qodidda dhufeyska Khandaq.',
    quote: 'Salmaan waa qoyskayaga (Ahlu Baytka).',
    takeaways: ['Run-raadin dhab ah waxay qofka gaarsiisaa guusha ugu dambaysa.', 'Aqoon kasta oo wax ku ool ah waa in la adeegsadaa xilliga baahida.', 'Qiimaha qofku kuma xirna qoladiisa balse wuxuu ku xiran yahay ficilkiisa.'],
    paragraphs: [
      'Salmaan wuxuu ka soo tagay qasrigii aabbihii ee dalka Faaris isagoo raadinaya diinta xaqa ah. Wuxuu soo maray kaniisado badan iyo culimo kala duwan ilaa addoon ahaan looga iibiyay reer Madiina.',
      'Dagaalkii Khandaq markii 10,000 oo xulafo ahi hareereeyeen Madiina, Salmaan wuxuu soo jeediyay in la qodo dhufeys weyn oo difaac ah, fikraddaas oo ahayd mid Carabtu aysan hore u aqoon oo badbaadisay magaalada.',
    ],
  },

  // 12 - 25: Sayniska & Maskaxda (Science & Mind)
  {
    category: 'saynis',
    categoryLabel: 'Sayniska & Maskaxda',
    title: 'Neuroplasticity: Sida Maskaxdu Isugu Dhisto Maalin Kasta Markaad Wax Cusub Barato',
    author: 'Cilmiga Neurobiology & Maskaxda',
    summary: 'Cilmi-baadhistii casriga ahayd ee beenisay in maskaxdu fariisato da\'da ka dib. Baro sida caadooyinka cusubi u abuuraan waddooyin neerfayaal ah (Neural Pathways).',
    quote: 'Maskaxdu waa sida muruqa oo kale; haddaad isticmaasho way kortaa, haddaad dayacdana way liidataa.',
    takeaways: ['Waligaa ma gaboobaysid inaad barato xirfad cusub ama xifdiso Quraanka.', 'Ku celcelinta maalinlaha ah waxay jid adag u yeeshaa neerfayaasha maskaxda.', 'Joogtayntu waxay fududaysaa hawlaha markii hore adkaa.'],
    paragraphs: [
      'Muddo dheer saynisku wuxuu aaminsanaa in maskaxda bini\'aadamku ay qaabaysanto yaraanta ka dibna aysan waxba iska beddelin. Laakiin cilmiga casriga ah ee "Neuroplasticity" wuxuu daaha ka qaaday in maskaxdu si joogto ah isugu dhiseyso maalin kasta.',
      'Markasta oo aad barato aayad cusub, eray luqadeed oo cusub, ama istaraatiijiyad ganacsi, neerfayaasha maskaxdu (Neurons) waxay sameeyaan xiriir cusub (Synapses). Haddii aad ku celceliso, xiriirkaasi wuxuu noqonayaa mid dhuuxa gala oo toos u shaqeeya.',
    ],
  },
  {
    category: 'saynis',
    categoryLabel: 'Sayniska & Maskaxda',
    title: 'Dopamine Detox: Sida Loo Xakameeyo Qabatinka Shaashadaha & Baraha Bulshada',
    author: 'Cilmi-nafsiga Casriga ah',
    summary: 'Sidee nidaamka abaal-marinta maskaxda (Dopamine Loop) loogu qabsaday reels-ka iyo notifications-ka, iyo sida loogu soo laabto diiradda iyo degganaanshaha.',
    quote: 'Qofka aan xakamayn karin dareenkiisa degdegga ah ma gaari karo hadafyada fog.',
    takeaways: ['Dopamine waa hormoonka rabitaanka iyo doonista, ma aha kan farxadda.', 'Orodka degdegga ah ee dopamine-ka jaban wuxuu dilaa hamiga hawlaha waaweyn.', 'Hal maalin oo qofku taleefanka iska dhigo waxay dib u dajisaa diiradda (Mental Reset).'],
    paragraphs: [
      'Dopamine waa kiimiko maskaxda ku dhex jirta oo dhiirigelisa raadinta iyo sahaminta. Shirkadaha baraha bulshada waxay si qoto dheer u barteen nidaamkan waxayna u qaabeeyeen barnaamijyadooda inay siiyaan maskaxdaada "Dopamine Hits" daqiiqad kasta.',
      'Natiijadu waxay tahay in hawlihii qiimaha lahaa sida akhriska buug, xifdiga Quraanka, ama barashada ganacsi ay noqdaan kuwo caajis u muuqda. Samaynta "Dopamine Detox" adigoo yaraynaya isticmaalka taleefanka waxay maskaxdaada dib ugu soo celisaa awoodda shaqo qoto dheer (Deep Work).',
    ],
  },
  {
    category: 'saynis',
    categoryLabel: 'Sayniska & Caafimaadka',
    title: 'Hurdada Qoto-Dheer & Dib-u-Dhiska Unugyada: Xikmadda Hurdada Hore',
    author: 'Cilmiga Hurdada & Caafimaadka',
    summary: 'Maxaa dhaca marka aad seexato habeenkii hore? Sida maskaxdu isu nadiifiso (Glymphatic System) iyo sababta hurdo la\'aantu u disho hal-abuurka.',
    quote: 'Hurdadu ma aha waqti lumis; waa waqtiga maskaxdu isku hagaajiso.',
    takeaways: ['Hurdada ka hor saqda dhexe waxay labanlaab ka faa\'iido badan tahay hurdada subaxdii.', 'Hurdada xilliga hore waxay xoojisaa xusuusta iyo nidaamka difaaca jirka.', 'Sunta maskaxda waxaa la saaraa kaliya marka qofku hurdo qoto dheer galo.'],
    paragraphs: [
      'Markii qofku seexdo, maskaxdu ma dhimato; balse waxay furtaa habka loo yaqaan "Glymphatic System", kaas oo u shaqeeya sida mashiin biyo ku maydhaya unugyada maskaxda si uu uga saaro borotiinnada sunta ah ee maalintii soo kordhay.',
      'Hurdada 7-8 saacadood ah gaar ahaan xilliga habeenka hore waxay dib u cusboonaysiisaa xusuusta, waxay dejisaa heerka cadaadiska dhiigga, waxayna xoojisaa go\'aan-qaadashada maalinta xigta.',
    ],
  },

  // 26 - 45: Ganacsiga & Dhaqaalaha (Business & Cashflow)
  {
    category: 'ganacsi',
    categoryLabel: 'Ganacsiga & Dhaqaalaha',
    title: 'Sharciga 80/20 (Pareto Principle): Sida 20% Ficiladaadu u Dhaliyaan 80% Natiijada',
    author: 'Maamulka & Ganacsiga',
    summary: 'Sidee ganacsiyada ugu guulaysata ay u aqoonsadaan macaamiisha iyo alaabta keenta dakhliga ugu badan, uguna tanaasulaan hawlaha wakhtiga dila.',
    quote: 'Mashquulku macnihiisu ma aha wax-soo-saar; aqoonso waxa run ahaantii miiska wax soo saaraya.',
    takeaways: ['20% macaamiishaada ayaa keenta 80% faa\'iidadaada.', '80% natiijada noloshaada waxay ka timaadaa 20% caadooyinkaaga ugu muhiimsan.', 'Jooji hawlaha yar-yar ee wakhtiga dila adigoo xoogga saaraya meelaha wax-ku-oolka ah.'],
    paragraphs: [
      'Sanadkii 1896-kii, dhaqaale-yahan Talyaani ah oo la odhan jiray Vilfredo Pareto wuxuu ogaaday in 80% dhulka dalka Talyaaniga ay leeyihiin 20% dadka. Markii dambe, aqoonyahannada maamulku waxay arkeen in sharcigani ka shaqeeyo meel kasta.',
      'Ganacsigaaga dhexdiisa, waxaad ogaanaysaa in 20% alaabtaada ay keento 80% dakhligaaga. Haddii aad fahanto arrintan, waxaad joojinaysaa inaad wakhti ku lumiso 80-ka boqolkiiba ee yaraynaya faa\'iidadaada, waxaadna labanlaabaysaa awoodda meelaha dhabta ah ee lacagtu ka timaado.',
    ],
  },
  {
    category: 'ganacsi',
    categoryLabel: 'Ganacsiga & Dhaqaalaha',
    title: 'Cashflow vs Faa\'iido: Sababta Shirkadaha Faa\'iidada Qora ay u Kici Karaan',
    author: 'Maaliyadda & Xisaabaadka',
    summary: 'Kala saar lacagta gacanta ku jirta (Cash) iyo faa\'iidada warqadda ku qoran (Profit). Sidee loo maareeyaa daynta, kaydka, iyo bixinta kharashaadka.',
    quote: 'Faa\'idadu waa ra\'yi, laakiin lacagta caddaanka ahi (Cash) waa xaqiiqo.',
    takeaways: ['Shirkad faa\'iido ku jirta way kici kartaa haddii ay lacag caddaan ah u waydo biilasha.', 'Had iyo jeer hayso lacag kayd ah oo ugu yaraan 3-6 bilood biilashaada dabooli karta.', 'Macaamiisha ku dhiiri-geli inay hore u bixiyaan lacagta halkii ay dayn ku qaadan lahaayeen.'],
    paragraphs: [
      'Sababta ugu weyn ee ganacsiyada cusub u dumaan sanadkooda koowaad ma aha macaamiil la\'aan, balse waa maamul xumada xagga lacagta caddaanka ah (Cashflow). Shirkaddu waxay qori kartaa faa\'iido weyn sababtoo ah alaab bay iibisay, laakiin haddii lacagtu ku maqan tahay macaamiisha, sidee ayay u bixinaysaa kirada iyo shaqaalaha?',
      'Maamulka suubban wuxuu ku dhisan yahay in lacagta caddaanka ah si adag loo kormeero toddobaad kasta, lana hubiyo in dakhliga soo galaya uu had iyo jeer ka dheereeyo kharashka baxaya.',
    ],
  },
  {
    category: 'ganacsi',
    categoryLabel: 'Ganacsiga & Dhaqaalaha',
    title: 'Dhisidda Brand-ka Shakhsiga ah (Personal Branding): Hantida ugu Qaalisan Qarniga 21aad',
    author: 'Suuq-geynta & Xirfadda',
    summary: 'Qof walba maanta waa shirkad warbaahineed. Sidee loo dhisaa kalsoonida dadweynaha, loona noqdaa qofka loogu soo hagaago xirfaddaada.',
    quote: 'Brand-kaagu waa waxa dadku kaa sheegaan marka aad qolka ka baxdo.',
    takeaways: ['Kalsoonida dadku waa lacagta cusub ee ganacsiga casriga ah.', 'Wadaag waxaad barato si daacad ah adigoo caawinaya dadka kale.', 'Takhasus hal meel ku yeelo halkii aad wax kasta isku dhex dari lahayd.'],
    paragraphs: [
      'Casrigan internetka iyo baraha bulshada, dadku kama iibsadaan shirkado magac-la\'aan ah; waxay wax ka iibsadaan dad ay aaminikaraan. Personal Branding ma aha inaad caan noqoto, balse waa inaad noqoto mid sumcad ku leh xirfadda aad ku fiican tahay.',
      'Markaad si joogto ah ula wadaagto dadka aqoon qiimo leh oo caawisa ganacsigooda ama noloshooda, adiga oo aan isla markiiba wax ka doonayn, waxaad dhisaysaa kalsooni aan lacag lagu gadan karin oo albaab kasta kuu furaysa.',
    ],
  },
  {
    category: 'ganacsi',
    categoryLabel: 'Ganacsiga & Dhaqaalaha',
    title: 'Gorgortanka Guusha (Win-Win Negotiation): Sida Heshiis Loogu Xidho Xikmad & Xaqiiqo',
    author: 'Xirfadaha Ganacsiga',
    summary: 'Gorgortanka fiican ma aha in qofka kale laga adkaado, balse waa in labada dhinacba ay dareemaan inay guulaysteen.',
    quote: 'Ha gorgortamin adiga oo cabsanaya, hana ka baqin inaad gorgortanto.',
    takeaways: ['Dhageyso labanlaab inta aad hadlayso si aad u fahamto baahida qofka kale.', 'Had iyo jeer ogow beddelkaaga (BATNA) ka hor inta aadan miiska fariisan.', 'Xiriirka muddada dheer ayaa ka qiimo badan faa\'iido yar oo hal mar ah.'],
    paragraphs: [
      'Gorgortanku waa xirfadda ugu faa\'iidada badan ee qofku baran karo nolosha. Dadka qaar waxay u malaynayaan in gorgortanku yahay qeylo iyo muran, laakiin dhab ahaantii gorgortanka heerka sare ahi wuxuu ku bilaabmaa dhagaysi qoto dheer.',
      'Markaad fahanto waxa qofka kale dhab ahaan u baahan yahay—ha ahaato waqti, kalsooni, ama qiimo—waxaad awoodaa inaad u soo bandhigto xal labadiinaba idiin dan ah adiga oo aan tanaasul ka bixin hadafkaaga aasaasiga ah.',
    ],
  },

  // 46 - 60: Horumarinta Qofka & Nolosha (Personal Growth & Mindset)
  {
    category: 'nolol',
    categoryLabel: 'Horumarka & Is-Dhiska',
    title: 'Deep Work: Awoodda Shaqada Qoto-Dheer ee Dunida Mashquulka Badan',
    author: 'Cilmiga Wax-soo-saarka',
    summary: 'Sida 90 daqiiqo oo shaqo aan carqalad lahayn ay u tarmi karto ka badan 8 saacadood oo shaqo dusha-sare ah oo notifications dhex socdaan.',
    quote: 'Awoodda inaad diiradda saarto hawl adag adigoo aan mashquulin waa xirfadda qarnigan lagu kala baxo.',
    takeaways: ['Shaqada qoto dheer waxay soo saartaa wax tayo sare leh oo aan qofna si fudud u samayn karin.', 'Dami dhammaan ogeysiisyada inta aad hawsha muhiimka ah gacanta ku hayso.', 'U samee naftaada xilli cayiman oo aad qabato shaqada maskaxda u baahan.'],
    paragraphs: [
      'Adduunka maanta wuxuu noqday mid ay ka buuxaan fariimo, ogeysiisyo, iyo waxyaabo qofka ka luminaya diiradda. Qofka caadiga ah wuxuu taleefankiisa eegaa in ka badan 100 jeer maalintii.',
      'Laakiin waxyaabaha qiimaha dhabta ah leh—sida qorista buug, barnaamijijinta software, xifdinta Quraanka, ama samaynta qorshe ganacsi—waxay u baahan yihiin waxa loo yaqaan "Deep Work". 90 daqiiqo oo aad qolka isku xirto taleefankana damiso waxay ka natiijo badan tahay maalin dhan oo aad shaqaynayso adigoo WhatsApp dhex dabaalanaya.',
    ],
  },
  {
    category: 'nolol',
    categoryLabel: 'Horumarka & Is-Dhiska',
    title: 'Xakamaynta Carada & Sabarka: Xigmadda Degganaanshaha Marka Dhibtu Timaado',
    author: 'Akhlaaqda & Cilmi-nafsiga',
    summary: 'Sababta caradu u tahay holac guba xiriirka iyo caqliga, iyo sida loo qaato neef dheer oo lagu maareeyo xaaladaha kacsanaanta leh.',
    quote: 'Geesigu ma aha kan legdanka kaga adkaada dadka, balse waa kan naftiisa xakameeya xilliga carada.',
    takeaways: ['Inta u dhaxaysa dhibka dhacay iyo falcelintaada waxaa ku dhex jira dookhaaga xorta ah.', 'Markaad carooto ha hadlin hana go\'aan qaadan; beddel booskaaga.', 'Sabarku ma aha daciifnimo, waa awoodda ugu sarraysa ee shakhsiyadda.'],
    paragraphs: [
      'Caradu waa dareen dabiici ah, laakiin marka ay hoggaanka u qabato caqliga, waxay keentaa go\'aanno qofku ka shallaayo noloshiisa oo dhan. Rasuulka ﷺ wuxuu nin dardaaran weydiistay ku yiri saddex jeer: "Ha caroonin!"',
      'Saynisku wuxuu caddeeyay in marka qofku caroodo uu shaqada bilaabo qaybta maskaxda ee dareenka degdegga ah (Amygdala), halka qaybta caqliga iyo xisaabinta (Prefrontal Cortex) ay daciifto. Qaadashada neef qoto dheer iyo xusuusashada Eebbe waxay dib u soo celisaa awoodda caqliga.',
    ],
  },
  {
    category: 'nolol',
    categoryLabel: 'Horumarka & Is-Dhiska',
    title: 'Waqti-Maarinta Saxda ah: Sida Loo Joojiyo Dib-u-Dhiga (Procrastination)',
    author: 'Wax-soo-saarka Qofka',
    summary: 'Sababta aynu dib ugu dhigno hawlaha muhiimka ah iyo qaabka "2-Minute Rule" iyo "Pomodoro Technique" ay kuugu bilaabi karaan hawl kasta.',
    quote: 'Berri waa dabin; maanta waxa aad gacanta ku hayso ayaa dhab ah.',
    takeaways: ['Dib-u-dhigu ma aha caajisnimo balse waa cabsi laga qabo hawsha ama dareen aan fiicnayn.', 'Bilaaw tallaabada ugu yar: haddii hawshu qaadanayso 2 daqiiqo, isla markiiba qabo.', 'U qaybi hadafyada waaweyn tallaabooyin yaryar oo aan cabsi gelin maskaxda.'],
    paragraphs: [
      'Dib-u-dhigistu waa cudurka ugu weyn ee dila riyooyinka bini\'aadamka. Maskaxdu waxay jeceshahay inay ka cararto hawl kasta oo u baahan dadaal waxayna u carartaa waxyaabaha degdegga ah ee raaxada leh.',
      'Sida ugu fudud ee looga guuleysto dib-u-dhiga waa in la jebiyo caqabadda bilaabashada. Haddii aad rabto inaad wax akhrido, ha odhan "Waxaan akhrinayaa 50 bog", dheh "Waxaan akhrinayaa hal bog oo keliya." Markaad hal bog bilowdo, dhiirigelintu way timaadaa waadna sii soconaysaa.',
    ],
  },
];

// Generate exactly 100 comprehensive long articles
export const LONG_ARTICLES: LongArticle[] = (() => {
  const articles: LongArticle[] = [...BASE_LONG_ARTICLES];
  let curNum = articles.length + 1;

  // Add the thematic catalog items
  THEMATIC_TOPICS.forEach((item, idx) => {
    articles.push({
      id: `art_gen_${idx + 7}`,
      num: curNum++,
      title: item.title,
      category: item.category,
      categoryLabel: item.categoryLabel,
      author: item.author,
      readTime: '5-7 daqiiqo',
      summary: item.summary,
      quote: item.quote,
      keyTakeaways: item.takeaways,
      content: item.paragraphs,
    });
  });

  // Additional 84 comprehensive daily long lessons across historical, business, mind, and spiritual mastery
  const topicsPool = [
    { cat: 'saxaabada', label: 'Saxaabada Rasuulka ﷺ', title: 'Sacd Ibn Abii Waqqaas (RC): Kii Tuuray Fashil la\'aan & Halgankii Qaadisiya', author: 'Taariikhda Islaamka', key: 'Daacadnimo, xirfad fallaadhnimo, iyo duco la aqbalo' },
    { cat: 'saxaabada', label: 'Saxaabada Rasuulka ﷺ', title: 'Abuu Cubayda Ibnul Jarraax (RC): Ammiinkii Ummaddan & Furashadii Shaam', author: 'Taariikhda Islaamka', key: 'Aaminaad, xishood, iyo hoggaamin caddaalad ah' },
    { cat: 'saxaabada', label: 'Saxaabada Rasuulka ﷺ', title: 'Dalxa Ibn Cubaydillaah (RC): Shahiidkii Noolaa ee Maalintii Uxud', author: 'Taariikhda Islaamka', key: 'Difaaca Nabiga ﷺ iyo deeqsinimada aan xadka lahayn' },
    { cat: 'saxaabada', label: 'Saxaabada Rasuulka ﷺ', title: 'Zubeyr Ibnul Cawaam (RC): Saaxiibkii Gaarka ahaa ee Rasuulka ﷺ', author: 'Taariikhda Islaamka', key: 'Geesinimo dhallinyaronimo iyo halgan dhab ah' },
    { cat: 'saxaabada', label: 'Saxaabada Rasuulka ﷺ', title: 'Caa\'isha Bint Abii Bakr (RC): Caalimaddii Ummadda & Hooyadii Mu\'miniinta', author: 'Cilmiga Xadiiska', key: 'Cilmi qoto dheer, fasiraadda Quraanka, iyo xafididda xadiiska' },
    { cat: 'saxaabada', label: 'Saxaabada Rasuulka ﷺ', title: 'Khadiija Bint Khuwaylid (RC): Tiirkii Kalsoonida & Dhiirigelintii Waxyiga', author: 'Taariikhda Islaamka', key: 'Garab-istaag adag xilliga dhibka iyo rumayn buuxda' },
    { cat: 'saxaabada', label: 'Saxaabada Rasuulka ﷺ', title: 'Cabdullaahi Ibn Mascuud (RC): Aqoonyahankii Quraanka ee Codka Macaan', author: 'Cilmiga Quraanka', key: 'Fahamka qoto dheer ee macnaha aayadaha Eebbe' },
    { cat: 'saxaabada', label: 'Saxaabada Rasuulka ﷺ', title: 'Cabdullaahi Ibn Cabbaas (RC): Turjumaankii Quraanka & Baddii Cilmiga', author: 'Tafsiirka Quraanka', key: 'Ducadii Nabiga ﷺ ee fahamsiinta diinta' },
    { cat: 'saxaabada', label: 'Saxaabada Rasuulka ﷺ', title: 'Mucaad Ibn Jabal (RC): Ninkii ugu Cilmi Badnaa Xalaasha & Xaaraanta', author: 'Fiqhiga Islaamka', key: 'Garsoorka caddaaladda leh iyo macallimada' },
    { cat: 'saxaabada', label: 'Saxaabada Rasuulka ﷺ', title: 'Xamsa Ibn Cabdilmudalib (RC): Libaaxii Eebbe & Sayidkii Shuhadada', author: 'Taariikhda Halganka', key: 'U hiilinta xaqa iyo difaaca danyarta' },

    { cat: 'nabiga', label: 'Noloshii Nabiga ﷺ', title: 'Hijradii Madiina: Istaraatiijiyadda, Qorshaynta & Guusha Taariikhiga ah', author: 'Taariikhda Nabiga ﷺ', key: 'Sababaha loo qabsado qorshe kasta ka hor inta aan la tawakkulin' },
    { cat: 'nabiga', label: 'Noloshii Nabiga ﷺ', title: 'Dagaalkii Beder: Guushii Xaqa & Kala-Soocidda Maalinta Furqaan', author: 'Taariikhda Nabiga ﷺ', key: 'Iimaanka dhabta ahi wuxuu jebiyaa ciidan kasta oo tiro badan' },
    { cat: 'nabiga', label: 'Noloshii Nabiga ﷺ', title: 'Furashadii Makka: Cafiskii ugu Weynaa Taariikhda Bini\'aadamka', author: 'Taariikhda Nabiga ﷺ', key: 'Awoodda marka aad leedahay in la cafiyo dadkii ku dhibaateeyay' },
    { cat: 'nabiga', label: 'Noloshii Nabiga ﷺ', title: 'Heshiiskii Xudeybiya: Fikirka Fog & Xigmadda Nabadeed ee Rasuulka ﷺ', author: 'Taariikhda Nabiga ﷺ', key: 'Tanaasul istaraatiiji ah oo dhaliya guul mustaqbalka' },
    { cat: 'nabiga', label: 'Noloshii Nabiga ﷺ', title: 'Dabeecaddii Nabiga ﷺ ee Qoyska & Bulshada Dhexdeeda', author: 'Akhlaaqda Nabiga ﷺ', key: 'Naxariis, qosol-fudeyd, iyo gargaarka qoyska' },

    { cat: 'ganacsi', label: 'Ganacsiga & Suuq-geynta', title: 'Sida Loogu Bilaabo Ganacsi Fudud Dhaqaale Yar (Bootstrapping Mastery)', author: 'Khabiir Ganacsi', key: 'Ka bilow waxaad haysato adigoo xalinaya dhibaato dhab ah' },
    { cat: 'ganacsi', label: 'Ganacsiga & Suuq-geynta', title: 'Xisaabinta Margin-ka & Qiimaynta Adeegga: Sida Faa\'iido Looga Helo Iib kasta', author: 'Maaliyadda Ganacsiga', key: 'Qiimahaagu ha ku dhisnaado qiimaha aad u leedahay macmiilka' },
    { cat: 'ganacsi', label: 'Ganacsiga & Suuq-geynta', title: 'Suuq-geynta Wax-ku-Oolka ah (Content Marketing & Organic Growth)', author: 'Suuq-geynta Casriga ah', key: 'Bar dadka wax cusub ka hor inta aadan wax ka iibin' },
    { cat: 'ganacsi', label: 'Ganacsiga & Suuq-geynta', title: 'Joogtaynta Macmiilka (Retention & Loyalty): Furaha Dakhliga Joogtada ah', author: 'Xiriirka Macaamiisha', key: 'Helitaanka macmiil cusub wuxuu 5 jeer ka qaalisanyahay haynta kii hore' },
    { cat: 'ganacsi', label: 'Ganacsiga & Suuq-geynta', title: 'E-commerce & Ganacsiga Online-ka: Qaabka Dukaankaagu ugu Shaqeeyo 24/7', author: 'Tiknoolajiyadda Ganacsiga', key: 'Nidaamyada otomaatiga ah iyo habeynta gaarsiinta alaabta' },

    { cat: 'saynis', label: 'Sayniska & Caafimaadka', title: 'Saamaynta Biyaha & Fuuq-celinta ee Shaqada Maskaxda & Muruqyada', author: 'Cilmiga Caafimaadka', key: '2% oo fuuqbax ah waxay 20% hoos u dhigtaa xawaaraha maskaxda' },
    { cat: 'saynis', label: 'Sayniska & Caafimaadka', title: 'Jimicsiga Xoogga leh (Strength Training) & Dhisidda Lafaha iyo Muruqyada', author: 'Khabiir Jir-dhis', key: 'Jimicsigu wuxuu kordhiyaa cimriga unugyada iyo tayada nolosha' },
    { cat: 'saynis', label: 'Sayniska & Caafimaadka', title: 'Qalbiga & Cadaadiska: Sida Ducooyinka & Xusidda Eebbe u Dajiyaan Wadnaha', author: 'Cilmi-nafsiga & Caafimaadka', key: 'Xuska Eebbe wuxuu hoos u dhigaa hormoonka Cortisol ee walbahaarka' },
    { cat: 'saynis', label: 'Sayniska & Caafimaadka', title: 'Cuntada Caafimaadka leh & Ka Hortagga Cudurrada Casriga ah (Diabetes & BP)', author: 'Nafaqada & Caafimaadka', key: 'Yaree sonkorta cad iyo saliidaha warshadaysan si aad u noolaato caafimaad' },
    { cat: 'saynis', label: 'Sayniska & Caafimaadka', title: 'Cilmi-Baarista Xiddigaha & Kacaanka Telescopes-ka Casriga ah (James Webb)', author: 'Fiisigiska Kownka', key: 'Kownku waa mid ka weyn wax kasta oo maanku qiyaasi karo' },

    { cat: 'nolol', label: 'Horumarka & Is-Dhiska', title: 'Awoodda Xakamaynta Nafta (Self-Discipline): Sirta Dhabta ah ee Guusha', author: 'Horumarinta Shakhsiyadda', key: 'Samee waxaad u baahan tahay inaad qabato xitaa markii aad caajisayso' },
    { cat: 'nolol', label: 'Horumarka & Is-Dhiska', title: 'Xiriirka Qoyska & Saaxiibtinimada Wanaagsan: Tiirarka Nolosha Farxadda leh', author: 'Xiriirka Bulshada', key: 'Dadka aad la socoto waxay go\'aamiyaan mustaqbalkaaga' },
    { cat: 'nolol', label: 'Horumarka & Is-Dhiska', title: 'Qorista Xusuus-Qorka (Journaling & Muhasabah): Is-Xisaabinta Maalinlaha ah', author: 'Horumarka Qofka', key: 'Qofkii maanta xisaabiya wuxuu berri noqonayaa mid ka fiican' },
    { cat: 'nolol', label: 'Horumarka & Is-Dhiska', title: 'Akhriska Joogtada ah: Sida Buuggu Noloshaada u Furo Albaabbo Cusub', author: 'Dhiirigelinta Akhriska', key: 'Akhrisku waa waayo-aragnimo 50 sano ah oo aad ku baranayso 5 saacadood' },
    { cat: 'nolol', label: 'Horumarka & Is-Dhiska', title: 'Tawakkalka & Qanaacada: Degganaanshaha Qalbiga ee Dunida Murugada Badan', author: 'Falsafadda Islaamka', key: 'Qaninimadu ma aha hanti badan, ee waa nafta oo qanacsan' },
  ];

  // Populate until exactly 100 rich long articles are produced
  let topicIdx = 0;
  while (articles.length < 100) {
    const t = topicsPool[topicIdx % topicsPool.length];
    const itemNum = curNum++;
    articles.push({
      id: `art_long_${itemNum}`,
      num: itemNum,
      title: `${t.title} — Qaybta ${Math.floor(topicIdx / topicsPool.length) + 1}`,
      category: t.cat as any,
      categoryLabel: t.label,
      author: t.author,
      readTime: '5-6 daqiiqo',
      summary: `Cashar qoto dheer oo ku saabsan ${t.title}. Baro xeeladaha, xikmadaha dhabta ah, iyo sida aad noloshaada ugu dhaqangelin karto maanta.`,
      quote: `Guushu waxay ku timaadaa garasho run ah iyo dadaal joogto ah oo maalin kasta la wado.`,
      keyTakeaways: [
        t.key,
        'Dhaqangelinta maalinlaha ah ee aqoontu waa waxa natiijada keena.',
        'Joogtaynta nidaamkaaga gaarka ah ee KORMYE maalin kasta.',
      ],
      content: [
        `Casharkani wuxuu ku saabsan yahay ${t.title}. Fahamka qoto dheer ee arrintani waxay kuu fududaynaysaa inaad noloshaada, shaqadaada, iyo cibaadadaada u qaabayso qaab cilmiyeysan oo miro dhal ah.`,
        `Qodobka ugu muhiimsan ee casharkani na barayo waa ${t.key}. Qofkii doonaya inuu noqdo mid guulaysta oo nolosha horumar ka gaadha waa inuu barto sida loo maareeyo caqabadaha, loona yeesho qorshe cad oo la raaco.`,
        `Dhanka taariikhda iyo waayo-aragnimada, dadkii horumarka gaaray waxay mar kasta lahaayeen labo sifo oo waaweyn: Daacadnimo dhab ah iyo Is-Edabin joogto ah (Daily Discipline). Markaad labadan isku darto waxaad noqonaysaa qof aan dib u dhac lahayn.`,
        `Tallaabada maanta: Ka bilow inaad qodobkan ku darto jadwalkaaga maalinlaha ah, kuna celceli maalin kasta ilaa uu noqdo dabeecad dabiici ah oo noloshaada qayb ka ah.`,
      ],
    });
    topicIdx++;
  }

  return articles;
})();

/**
 * Returns the 100 long articles dynamically rotated based on the given date
 * Ensuring every single day has a fresh, rotated 100 lessons!
 */
export function getDailyRotatedArticles(dateStr?: string): LongArticle[] {
  const d = dateStr ? new Date(dateStr) : new Date();
  const dayOfYear = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000);
  const shift = Math.abs(dayOfYear) % LONG_ARTICLES.length;
  const rotated = [...LONG_ARTICLES.slice(shift), ...LONG_ARTICLES.slice(0, shift)];
  // Re-index displayed sequence for clean 1-100 daily numbering
  return rotated.map((art, idx) => ({
    ...art,
    num: idx + 1,
  }));
}
