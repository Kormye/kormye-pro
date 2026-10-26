import { RoutineItem, CategoryType, AutoTriggerType } from '../types/index.ts';

export const CATS: Record<CategoryType, { name: string; color: string; bg: string }> = {
  sal: { name: 'Salaad', color: '#064E3B', bg: 'rgba(6, 78, 59, 0.14)' },
  tac: { name: 'Koorso / shaqo', color: '#10B981', bg: 'rgba(16, 185, 129, 0.14)' },
  jim: { name: 'Jimicsi', color: '#047857', bg: 'rgba(4, 120, 87, 0.14)' },
  nas: { name: 'Nasasho / caadi', color: '#059669', bg: 'rgba(5, 150, 105, 0.14)' },
  hur: { name: 'Hurdo', color: '#065F46', bg: 'rgba(6, 95, 70, 0.14)' },
  duc: { name: 'Duco / Quraan', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.14)' },
};

export const AUTO: Record<AutoTriggerType, string> = {
  '': 'Maya (gacan)',
  learn: 'Aqoonta (shay la bartay)',
  read: 'Aqris (bogag)',
  quran: 'Quraan (bogag la qoray)',
  gym: 'Gym (muruq la doortay)',
  acc: 'Accounting (diiradda)',
  ai: 'AI Automation (diiradda)',
};

export const RE: Record<string, RegExp> = {
  acc: /account|xisaab/i,
  ai: /\bai\b|automat/i,
};

export const DEFP: [string, string, string, CategoryType, string, AutoTriggerType?, number?][] = [];

export const makeDefaultPlan = (): RoutineItem[] => [];

export const NAMES = ['Sab', 'Axd', 'Isn', 'Sal', 'Arb', 'Kha', 'Jim'];
export const DAYS = ['Axad', 'Isniin', 'Talaado', 'Arbaco', 'Khamiis', 'Jimce', 'Sabti'];
export const MONS = ['Janaayo', 'Febraayo', 'Maarso', 'Abriil', 'May', 'Juun', 'Luuliyo', 'Ogosto', 'Sebtembar', 'Oktoobar', 'Nofembar', 'Desembar'];

export const MUSC = ['Laab', 'Dhabar', 'Lugaha', 'Garbaha', 'Gacmaha', 'Cardio'];
export const DEEDS = ['Rawaatib', 'Witr', 'Duxo', 'Sadaqo', 'Siwaak', 'Qoyska la hadal', 'Buug akhri'];

export const TZ: [string, string, string, number][] = [
  ['s', 'سبحان الله', 'SubxaanAllaah', 33],
  ['h', 'الحمد لله', 'Alxamdulillaah', 33],
  ['a', 'الله أكبر', 'Allaahu Akbar', 34],
  ['i', 'أستغفر الله', 'Astaghfirullaah', 100],
];

export const BT = [
  'Ka bilow hal dhibaato oo dadku bixiyaan lacag si ay u xalliyaan.',
  'Daacadnimo iyo run: sumcaddu waa hantidaada ugu weyn.',
  'Macmiilka hore ku celi; hal macmiil oo faraxsan wuxuu keenaa kuwo kale.',
  'Xisaabi dakhliga iyo kharashka maalin walba. Accounting waa naftaada ganacsiga.',
  'Wax yar ku bilow, tijaabi, ka dibna weynee.',
  'Qor nidaamka shaqadaada (SOP), ka dibna automate ka dhig.',
  'Ha u badin lacagta adiga oo aan is-hubin; ka fogow ribada iyo khayaanada.',
];

export const IDEAS = [
  ['🤖 Adeeg AI Automation', 'U dhis ganacsiyada yaryar jawaab-celin otomaatig ah, rasiidhada, iyo warbixinada.'],
  ['📊 Adeeg Accounting', 'Xisaabaadka dukaamada iyo shirkadaha yaryar bil kasta.'],
  ['🔗 Xirmo isku-dhafan', 'Isku xir xisaabaadka iyo automation: warbixin toos ah macmiilka.'],
  ['🎓 Tababar online', 'Waxaad baratay ku baro dadka kale, koorsooyin gaagaaban.'],
];

export const AYA2: [string, string, string, string, string][] = [
  ['Adkaysi', 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', 'Al-Baqarah 2:153', 'Kuwa rumaystayow, ku caawimaysta samirka iyo salaadda. Allaah wuxuu la jiraa kuwa samra.', 'Marka ay dhibaato timaado, labo hub ayaa jira: samir iyo salaad. Ka dhig salaadda meel aad xoog ka heshid.'],
  ['Adkaysi', 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ', 'Az-Zumar 39:10', 'Kuwa samra waxaa abaalkooda loo oofiyaa si aan xisaab lahayn.', 'Samirku abaal aan xadidnayn buu leeyahay. Ha ka daalin jadwalkaaga marka ay adag tahay.'],
  ['Adkaysi', 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ', 'Aal-Cimraan 3:139', 'Ha tabar-daraynina, hana murugoonina; adinkaa ka sarreeya haddii aad rumaysan tihiin.', 'Niyad-jabku waa cadowga horumarka. Fashilka ka dhig cashar, ma ahan dhammaad.'],
  ['Adkaysi', 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا  إِنَّ مَعَ الْعُسْرِ يُسْرًا', 'Ash-Sharx 94:5-6', 'Dhab ahaan, dhibta waxaa la socda fudayd. Dhab ahaan, dhibta waxaa la socda fudayd.', 'Fudaydu waxay la socotaa dhibta, ma aha ka dib kaliya. Ku celi xusuustan marka koorsada ay adkaato.'],
  ['Adkaysi', 'وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ ۖ وَعَسَىٰ أَن تُحِبُّوا شَيْئًا وَهُوَ شَرٌّ لَّكُمْ ۗ وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ', 'Al-Baqarah 2:216', 'Laga yaabaa inaad nacdo wax adiga kuu khayr ah, laga yaabaana inaad jeceshahay wax adiga kuu shar ah. Allaah wuu ogyahay, adinkuna ma ogidin.', 'Wax aan kuu fiicnayn oo kuu dhaca waxay noqon karaan albaab wanaag ah. Ha degdegin xukunka.'],
  ['Adkaysi', 'يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ', 'Aal-Cimraan 3:200', 'Kuwa rumaystayow, samrada, is-samrada, adkaysta, Allaah ka cabsada si aad u liibaantaan.', 'Guushu waxay u baahan tahay samir, ku sii jiritaan, iyo taqwo: saddexdaas ka dhig nidaam.'],
  ['Tawakkul', 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ ۚ قَدْ جَعَلَ اللَّهُ لِكُلِّ شَيْءٍ قَدْرًا', 'At-Talaaq 65:3', 'Ku alla kii Allaah tawakalo, isagaa u deeqaya. Allaah wuxuu gaadhsiiyaa amarkiisa; wax kasta wuxuu u dhigay qiyaas.', 'Tawakkulku waa inaad dadaasho, kadibna natiijada Allaah ku aamminto.'],
  ['Tawakkul', 'فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ', 'Aal-Cimraan 3:159', 'Marka aad go\'aan gaadho, Allaah tawakal; Allaah wuxuu jecel yahay kuwa tawakala.', 'Marka laga tashado oo go\'aan la gaaro, ha dib-u-dhigin: bilow, kadibna tawakal.'],
  ['Tawakkul', 'قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا هُوَ مَوْلَانَا ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ', 'At-Tawba 9:51', 'Dheh: Nagu dhici mayso wax aan Allaah noo qorin. Isagaa Gacal-nagu ah; mu\'miniintuna Allaah ha tawakalaan.', 'Cabsida ku saabsan wax aan awoodin inaad ka beddesho waa culeys aan loo baahnayn.'],
  ['Tawakkul', 'لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا', 'At-Tawba 9:40', 'Ha murugoonin, Allaah ayaa nala jira.', 'Xitaa marka aad kaligaa dareento, xasuuso in aad kali ahayn.'],
  ['Rizqi & Ganacsi', 'وَمَا مِن دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَى اللَّهِ رِزْقُهَا', 'Huud 11:6', 'Ma jirto xayawaan dhulka ku dhex jira oo aan Allaah rizqigiisa ku xidhnayn.', 'Rizqiga waa damaanad, laakiin waa in la raadiyo. Ha ku dayin hoos.'],
  ['Rizqi & Ganacsi', 'فَإِذَا قُضِيَتِ الصَّلَاةُ فَانتَشِرُوا فِي الْأَرْضِ وَابْتَغُوا مِن فَضْلِ اللَّهِ وَاذْكُرُوا اللَّهَ كَثِيرًا لَّعَلَّكُمْ تُفْلِحُونَ', 'Al-Jumuca 62:10', 'Marka salaadda la dhammeeyo, ku firiya dhulka, ka raadsada fadliga Allaah, Allaah badanna xusuusta si aad u liibaantaan.', 'Salaadda ka dib, shaqo xalaal ah ayaa la dhiirigeliyay. Isku dar ibaadada iyo hawsha.'],
  ['Rizqi & Ganacsi', 'وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا', 'Al-Baqarah 2:275', 'Allaah wuxuu xalaaleeyay iibka, wuxuuna xaaraameeyay ribada.', 'Ganacsigu waa xalaal. Marka aad ganacsi dhisto, ka fogow macaamilka ribada leh.'],
  ['Rizqi & Ganacsi', 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ إِلَّا أَن تَكُونَ تِجَارَةً عَن تَرَاضٍ مِّنكُمْ', 'An-Nisaa 4:29', 'Kuwa rumaystayow, hantidiinna dhex-dhexaad ha ku cunina si been ah, ilaa ay ganacsi ku timaado ogolaansho labada dhinac.', 'Ganacsiga sharafta leh waa ogolaansho, qiimo cad, iyo khayaano la\'aan.'],
  ['Rizqi & Ganacsi', 'وَيْلٌ لِّلْمُطَفِّفِينَ  الَّذِينَ إِذَا اكْتَالُوا عَلَى النَّاسِ يَسْتَوْفُونَ  وَإِذَا كَالُوهُمْ أَو وَّزَنُوهُمْ يُخْسِرُونَ', 'Al-Mutaffifiin 83:1-3', 'Hoog u ah kuwa miisaanka dhuuma: marka ay dadka ka qaadanayaan way buuxsadaan, marka ay u miisaamayaan way dhimaan.', 'Run-sheegga lambarrada waa aasaaska Accounting-ka. Xisaab daacad ah ayaa ah cibaado.'],
  ['Rizqi & Ganacsi', 'وَأَوْفُوا الْكَيْلَ إِذَا كِلْتُمْ وَزِنُوا بِالْقِسْطَاسِ الْمُسْتَقِيمِ ۚ ذَٰلِكَ خَيْرٌ وَأَحْسَنُ تَأْوِيلًا', 'Al-Israa 17:35', 'Buuxiya cabirka marka aad cabirtaan, miisaanna ku miisaama miisaan toosan; taasu waa khayr iyo natiijo ugu wanaagsan.', 'Daacadnimadu waa hanti. Macaamiishu waxay soo noqdaan marka aad run tahay.'],
  ['Rizqi & Ganacsi', 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَاكْتُبُوهُ', 'Al-Baqarah 2:282', 'Kuwa rumaystayow, marka aad deyn ku dhex gasho muddo la magacaabay, qora.', 'Qorista deynta waa amar. Ma jiro Accounting ka hore: qor dhammaan macaamilka.'],
  ['Rizqi & Ganacsi', 'وَابْتَغِ فِيمَا آتَاكَ اللَّهُ الدَّارَ الْآخِرَةَ ۖ وَلَا تَنسَ نَصِيبَكَ مِنَ الدُّنْيَا ۖ وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ', 'Al-Qasas 28:77', 'Wixii Allaah ku siiyay ku raadi Aakhiro, hana ilaawin qaybtaada adduunka; wanaag sameyna sida Allaah kuu wanaajiyay.', 'Isu dheelitir: adduun iyo Aakhiro, shaqo iyo cibaado.'],
  ['Rizqi & Ganacsi', 'وَلَا تَجْعَلْ يَدَكَ مَغْلُولَةً إِلَىٰ عُنُقِكَ وَلَا تَبْسُطْهَا كُلَّ الْبَسْطِ فَتَقْعُدَ مَلُومًا مَّحْسُورًا', 'Al-Israa 17:29', 'Gacantaada ha ka dhigin mid xidhan oo qoorta lagu xidhay, hana fidin si buuxda, si aadan u noqon mid eedeysan oo gabay.', 'Lacagta ha ku bakhaylin, hana ku bixin. Samee miisaaniyad.'],
  ['Rizqi & Ganacsi', 'وَالَّذِينَ إِذَا أَنفَقُوا لَمْ يُسْرِفُوا وَلَمْ يَقْتُرُوا وَكَانَ بَيْنَ ذَٰلِكَ قَوَامًا', 'Al-Furqaan 25:67', 'Kuwa marka ay bixiyaan aan ku fogaan, aanna bakhaylin, laakiin dhexdooda ah.', 'Dheelitirka kharashka waa astaanta dadka wanaagsan. Dakhliga iyo kharashka maalin walba qor.'],
  ['Aqoon', 'وَقُل رَّبِّ زِدْنِي عِلْمًا', 'Taa-Haa 20:114', 'Dheh: Rabbigaygow, ii kordhi aqoon.', 'Aqoontu ma dhammaan. Duco iyo dadaal ayaa isla socda.'],
  ['Aqoon', 'قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ', 'Az-Zumar 39:9', 'Dheh: Ma le\'eg yihiin kuwa ogsoon iyo kuwa aan ogayn? Kaliya ayaa waxay xasuusataa dadka caqliga leh.', 'Ogaanshuhu waa kala sooc. Koorsooyinkaaga ka dhig mid kaa dhigaya qof ka duwan.'],
  ['Aqoon', 'يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ', 'Al-Mujaadala 58:11', 'Allaah wuxuu kor u qaadaa kuwa rumaystay iyo kuwa la siiyay aqoon, darajooyin.', 'Imaanka iyo aqoontu waxay isla kor u qaadaan. Labadaba ku dar maalinta.'],
  ['Aqoon', 'إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ', 'Faatir 35:28', 'Kaliya kuwa Allaah ka cabsada waa culimada.', 'Aqoon dhab ah waxay keentaa is-hoosaysiin iyo ixtiraam.'],
  ['Aqoon', 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ  خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ  اقْرَأْ وَرَبُّكَ الْأَكْرَمُ  الَّذِي عَلَّمَ بِالْقَلَمِ  عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ', 'Al-Calaq 96:1-5', 'Akhri magaca Rabbigaa wax uumay. Wuxuu insaanka ka uumay xinjir. Akhri, Rabbigaaguna waa Deeqsiga ugu weyn, kan qalinka wax ku baray, insaanka wuxuu baray wixii uusan aqoon.', 'Aayaddii ugu horreysay ee soo degtay waa \'akhri\'. Waxbarashadu waa aasaaska diinta.'],
  ['Dadaal', 'إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ', 'Ar-Racd 13:11', 'Allaah ma beddelo xaaladda qoom ilaa ay iyagu beddelaan waxa naftooda ku jira.', 'Isbeddelku wuxuu ka bilaabmaa gudaha: niyad, caado, iyo anshax.'],
  ['Dadaal', 'وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ  وَأَنَّ سَعْيَهُ سَوْفَ يُرَىٰ', 'An-Najm 53:39-40', 'Insaanku wuxuu helaa waxa uu dadaalay oo kali ah, dadaalkiisuna waa la arki doonaa.', 'Dadaalkaaga yar ee joogtada ah waa la arkaa. Ha u ekaan mid aan muuqan.'],
  ['Dadaal', 'وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ', 'Al-Cankabuut 29:69', 'Kuwa nagu dadaala, waxaan hubaal u hanuunin doonnaa jidadkayaga; Allaah wuxuu la jiraa kuwa wanaagsan.', 'Marka aad tallaabo qaaddo, jidku wuu furmaa. Bilow.'],
  ['Dadaal', 'فَإِذَا فَرَغْتَ فَانصَبْ  وَإِلَىٰ رَبِّكَ فَارْغَب', 'Ash-Sharx 94:7-8', 'Marka aad dhammayso, dadaal; Rabbigaagana rabitaan ku jeedi.', 'Ha fadhiisan marka hawl dhammaato; hawl kale ku bilow, Allaahna ka rajee.'],
  ['Dadaal', 'إِن تَنصُرُوا اللَّهَ يَنصُرْكُمْ وَيُثَبِّتْ أَقْدَامَكُمْ', 'Muxammad 47:7', 'Haddaad Allaah u gargaartaan, wuu idin gargaaraa, wuuna dhiso cagahaaga.', 'Joogtayntu waxay ka timaadaa taageero. Aamin sida aad u socoto.'],
  ['Wakhtiga', 'وَالْعَصْرِ  إِنَّ الْإِنسَانَ لَفِي خُسْرٍ  إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ', 'Al-Casr 103:1-3', 'Wakhtiga ku dhaaran: insaanku wuxuu ku jiraa khasaare, marka laga reebo kuwa rumaystay, wanaag sameeyay, isku waaniyay xaqa iyo samirka.', 'Wakhtigu waa hantidaada ugu weyn. Soo koob: iimaan, camal, xaq, samir.'],
  ['Anshax & Cadaalad', 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ', 'Al-Xujuraat 49:13', 'Dadow, waxaan idinka abuurnay lab iyo dheddig, waxaan idinka dhignay qowmiyado iyo qabaa\'il si aad isu aqoonsataan; kan ugu sharafta badan Allaah agtiisa waa kan ugu taqwada badan.', 'Sharafta waa taqwo, ma aha qabiil ama lacag. Dadka oo dhan ixtiraam.'],
  ['Anshax & Cadaalad', 'وَلَا تَجَسَّسُوا وَلَا يَغْتَب بَّعْضُكُم بَعْضًا', 'Al-Xujuraat 49:12', 'Ha jaajuusin, qaarkiinna qaarka kale ha xanta.', 'Xanta iyo baadhista dadka waxay baabi\'iyaan kalsoonida. Hadal wanaag ama aamus.'],
  ['Anshax & Cadaalad', 'وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ', 'Fussilat 41:34', 'Wanaagga iyo xumaantu ma le\'ega. Ku celi kan ugu wanaagsan, markaas kan cadaawaduhu ku dhexayso wuxuu noqonayaa saaxiib dhow.', 'Jawaab wanaagsan ayaa rogta xiriirka. Ku jawaab dhaqan sare.'],
  ['Anshax & Cadaalad', 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ', 'An-Naxl 16:90', 'Allaah wuxuu amraa cadaalad, wanaag, iyo siinta qaraabada.', 'Cadaalad iyo ihsaan: labo tiir oo ganacsi iyo nolol labadaba.'],
  ['Anshax & Cadaalad', 'إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ', 'An-Nisaa 4:58', 'Allaah wuxuu idin amraa inaad amaanooyinka ku soo celisaan kuwa leh, marka aad dadka u kala xukuntaan inaad ku xukuntaan cadaalad.', 'Hantida dadka iyo xogtooda waa amaano. Ku celi mar walba.'],
  ['Anshax & Cadaalad', 'كُونُوا قَوَّامِينَ لِلَّهِ شُهَدَاءَ بِالْقِسْطِ ۖ وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا ۚ اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ', 'Al-Maa\'ida 5:8', 'Ha ahaada kuwo Allaah u istaaga, markhaatiyo cadaalad; nacaybka qoom ha idin keenin inaydaan cadaalad samayn. Cadaalad sameeya, taasu waa taqwo ugu dhow.', 'Xitaa cidda aad ka cadhootay, u cadaalad sama.'],
  ['Waalidiin & Qoys', 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا', 'Al-Israa 17:23', 'Rabbigaa wuxuu amray inaydaan caabudin cid kale isaga mooyee, waalidiinkana wanaag samaysaa.', 'Hadal wanaagsan, taleefon, iyo wakhti waalidkaaga siin ayaa muhiim ah.'],
  ['Waalidiin & Qoys', 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً', 'Ar-Ruum 30:21', 'Aayaadkiisa waxaa ka mid ah inuu idinka abuuray lammaane si aad ugu degganaataan, wuxuuna dhex dhigay jacayl iyo naxariis.', 'Guurku waa degganaansho iyo naxariis. Diyaargarow ku samee.'],
  ['Waalidiin & Qoys', 'يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا', 'At-Taxriim 66:6', 'Kuwa rumaystayow, naftiinna iyo ehelkiinna ka ilaaliya dab.', 'Masuuliyadda qoysku waxay ka bilaabmaysaa tusaale wanaagsan.'],
  ['Waalidiin & Qoys', 'وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ', 'Al-Furqaan 25:74', 'Kuwa leh: Rabbigayagow, na sii xaasaskeenna iyo farcankeenna wax indhaha ku qabow.', 'Duco qoys wanaagsan ayaa jidka u furta. Ku dar ducadan.'],
  ['Tawbo & Naxariis', 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ', 'Az-Zumar 39:53', 'Dheh: Addoomahaygii nafahooda ku xad-gudbay, ha ka quusanina naxariista Allaah; Allaah wuxuu dhammaan dambiyada u dhaafaa. Isagu waa Dhaafe, Naxariis-badane.', 'Weligaa ha ku guuldaraysan quus. Tawbo mar kasta waa furan tahay.'],
  ['Tawbo & Naxariis', 'وَسَارِعُوا إِلَىٰ مَغْفِرَةٍ مِّن رَّبِّكُمْ وَجَنَّةٍ عَرْضُهَا السَّمَاوَاتُ وَالْأَرْضُ', 'Aal-Cimraan 3:133', 'U soo dhaqaaqa dhaafitaanka Rabbigiinna iyo Jannada ballaadhkeedu yahay samooyinka iyo dhulka.', 'Tawbada ha dib-u-dhigin; maanta ayaa ugu fiican.'],
  ['Tawbo & Naxariis', 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ', 'Al-Baqarah 2:222', 'Allaah wuxuu jecel yahay kuwa tawbad keena iyo kuwa is-nadiifiya.', 'Nadaafadda iyo tawbadu waa jacayl Allaah. Wuu ku jecel yahay.'],
  ['Duco & Dikri', 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ', 'Al-Baqarah 2:186', 'Marka addoommadaydu kaa waydiiyaan, anigu waan dhow ahay; waxaan ka jawaabaa ducada kan i barya marka uu i bariyo.', 'Ma jirto dhexdhexaadiye. Ku dar duco xitaa waxyaabaha yaryar.'],
  ['Duco & Dikri', 'وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ', 'Gaafir 40:60', 'Rabbigiinna wuxuu yidhi: I barya, waan idin ka jawaabayaa.', 'Barista waa ballan. Waqti gaar ah maalin walba u qor.'],
  ['Duco & Dikri', 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', 'Ar-Racd 13:28', 'Ogaada, Allaah xusuusta ayaa qalbiyada ku degganaanaya.', 'Marka walwal jiro, athkaar baa xalka ugu horreeya.'],
  ['Duco & Dikri', 'فَاذْكُرُونِي أَذْكُرْكُمْ', 'Al-Baqarah 2:152', 'Igu xusuusta, anna waan idin xusuusanayaa.', 'Dikrigu waa xiriir labada dhinac ah.'],
  ['Duco & Dikri', 'وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ', 'Al-Cankabuut 29:45', 'Salaadda ku taag; salaaddu waxay ka joojisaa fal xun iyo wax la inkiray.', 'Salaadda joogtada ah waxay dhisaa anshax. Ha kaga baxin jadwalka.'],
  ['Mahadnaq', 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ', 'Ibraahiim 14:7', 'Haddaad mahadnaqdaan, waan idin ka siyaadinayaa.', 'Mahadnaq maalinle ah ayaa hagaajisa dareenka. Qor 3 shay habeen walba.'],
  ['Mahadnaq', 'وَإِن تَعُدُّوا نِعْمَةَ اللَّهِ لَا تُحْصُوهَا', 'An-Naxl 16:18', 'Haddaad tirisaan nicmada Allaah, ma tirin kartaan.', 'Nicmadu way ka badan tahay inaad ogaato. Eeg waxa aad hayso.'],
  ['Caafimaad & Awood', 'وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا', 'Al-Acraaf 7:31', 'Cuna, cabbana, hana ku xad-gudbina.', 'Cunto iyo cabitaan dheelitiran ayaa hagaajiya jimicsiga. Ha xad-gudbin.'],
  ['Caafimaad & Awood', 'وَأَعِدُّوا لَهُم مَّا اسْتَطَعْتُم مِّن قُوَّةٍ', 'Al-Anfaal 8:60', 'U diyaariya iyaga wixii aad kari karto oo xoog ah.', 'Xooggu waa mas\'uuliyad. Gym-kaaga ka dhig cibaado.'],
  ['Aakhiro', 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ', 'Aal-Cimraan 3:185', 'Naf kasta waxay dhadhamin doontaa dhimasho.', 'Xasuusinta dhimashadu waxay dhisaa mudnaan ku saabsan wakhtiga.'],
  ['Aakhiro', 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ  وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ', 'Az-Zalzala 99:7-8', 'Ku alla kii sameeya wanaag ah culeyska dhibic, wuu arki; ku alla kii sameeya xumaan ah culeyska dhibic, wuu arki.', 'Ficil yar ayaa la xisaabiyaa. Ha yeelin wanaag yar si aan loo sameynin.'],
  ['Ikhlaas', 'وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ', 'Al-Bayyina 98:5', 'Looma amrin wax aan ahayn inay Allaah caabudaan iyagoo diinta u daacad ka ah.', 'Niyadda ayaa qiimeysa ficilka. Ka dhig shaqada Allaah dartiis.'],
  ['Ikhlaas', 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ', 'Adh-Dhaariyaat 51:56', 'Ma uumin jinniyada iyo insaanka wax aan ahayn inay i caabudaan.', 'Ujeedada noloshu waa cibaado ballaaran: shaqada iyo waxbarashada ayaa ku jira haddii niyad wanaagsan jirto.'],
];

export const WIS2: [string, string, string, string][] = [
  ['Dadaal & Joogtayn', 'Ma gaadho heerka hadafyadaada; waxaad ku dhacdaa heerka nidaamyadaada.', 'James Clear', 'Nidaam fiican ayaa ka weyn hadaf. Sidaa darteed nidaamkan ayaa kuu dhisan.'],
  ['Dadaal & Joogtayn', 'Camalada Allaah ugu jecel waa kuwa joogtada ah, xitaa haddii ay yar yihiin.', 'Xadiis (Bukhaari & Muslim)', 'Maalin walba wax yar waa ka wanaagsan hal maalin oo weyn kadibna dhammaan.'],
  ['Dadaal & Joogtayn', 'Hal-abuur waa 1% dhiirigelin iyo 99% dhidid.', 'Thomas Edison', 'Hawlaha adag ee aan muuqan ayaa guusha dhisa.'],
  ['Dadaal & Joogtayn', 'Hadaad is-leedahay waad kari kartaa, ama ma kari kartid, labadaba waad saxsan tahay.', 'Henry Ford', 'Aaminaadda naftaada ayaa go\'aamisa dadaalka.'],
  ['Dadaal & Joogtayn', 'Marka wax muhiim ah yahay, waad samaysaa xitaa haddii fursaduhu kuu hoggaansamin.', 'Elon Musk', 'Muhiimadda hadafka ayaa kuu sii wadda xitaa marka ay adag tahay.'],
  ['Dadaal & Joogtayn', 'Wixii jidka ku taagan wuxuu noqdaa jidka.', 'Marcus Aurelius', 'Caqabadda ka dhig tababar; waxay kuu keentaa xirfad.'],
  ['Dadaal & Joogtayn', 'Mu\'minka xoogga leh wuu ka khayr badan yahay, wuuna ka jecel yahay Allaah mu\'minka daciifka ah; labadaba khayr ayaa ku jira.', 'Xadiis (Muslim)', 'Xoog jidheed, maskaxeed, iyo mid maaliyadeed: dhammaan ku dhis.'],
  ['Ganacsi', 'Ganacsade run-sheege oo aamin ah wuxuu la jiraa nabiyada, runlowyada iyo shuhadada.', 'Xadiis (Tirmidhi, xasan)', 'Daacadnimadu waa mid ka mid ah daraajooyinka ugu sarreeya ee ganacsiga.'],
  ['Ganacsi', 'Allaah ha u naxariisto ninkii fudud marka uu iibiyo, marka uu iibsado, iyo marka uu dalbado lacagtiisa.', 'Xadiis (Bukhaari)', 'Dhaqan fudud iyo xaliino ayaa macaamiisha soo celiya.'],
  ['Ganacsi', 'Cidna ma cunin cunto ka khayr badan tii gacmaheeda ku shaqeysay.', 'Xadiis (Bukhaari)', 'Shaqada gacanta iyo xirfadda waa sharaf, ma aha cay.'],
  ['Ganacsi', 'Ii tusa suuqa.', 'Cabdiraxmaan ibnu Cawf (RC), Bukhaari', 'Wuxuu ka bilaabay eber. Suuqa ku bilow, xirfad ku dhis, kadibna weyneeye.'],
  ['Ganacsi', 'Haddii aadan ka xishoon nooca ugu horreeya ee alaabtaada, waad daahday.', 'Reid Hoffman', 'Ha sugin kaamil. Soo saar nooc koowaad, ka bar macaamiisha.'],
  ['Ganacsi', 'Samee wax dadku rabaan.', 'Paul Graham (Y Combinator)', 'Raadi dhibaatada dadku bixiyaan lacag si loo xalliyo.'],
  ['Ganacsi', 'Summaddaadu waa waxa dadku ka yidhaahdaan marka aadan joogin qolka.', 'Jeff Bezos', 'Sumcadda ayaa ku dhisaysa shaqada maalinle ah ee yar yar.'],
  ['Ganacsi', 'Macaamiisha ugu dhibsan adiga ayaa kuugu waxbarasho badan.', 'Bill Gates', 'Cabashooyinka ka dhig macluumaad. Ka bax ka xanaaqista.'],
  ['Ganacsi', 'Waxay qaadataa 20 sano inaad dhisto sumcad iyo shan daqiiqo inaad dumiso.', 'Warren Buffett', 'Mar walba nolosha ganacsiga qiimee wax-ku-oolka ah.'],
  ['Ganacsi', 'Waxtarku waa in wax si sax ah la sameeyo; waxtar-badnaantu waa in la sameeyo wax saxda ah.', 'Peter Drucker', 'Marka hore dooro hawsha saxda ah, kadibna si fiican u samee.'],
  ['Lacag & Maaraynta', 'Ha kaydin waxa harsan kadib kharash; kharash waxa harsan kadib kaydin.', 'Warren Buffett', 'Marka aad dakhli hesho, marka hore kaydi; kadibna isticmaal wixii harsan.'],
  ['Lacag & Maaraynta', 'Qof baa maanta hooska fadhiya sababtoo ah qof baa geed beeray wakhti hore.', 'Warren Buffett', 'Maalgashi yar oo hadda ah ayaa kuu sii noqon doona faa\'iido dambe.'],
  ['Lacag & Maaraynta', 'Khatarta waxay ka timaadaa inaadan aqoon waxaad samaynayso.', 'Warren Buffett', 'Aqoontu waa daafaca ugu fiican. Ha ku bixin wax aadan fahmin.'],
  ['Lacag & Maaraynta', 'Gacanta sare waa ka wanaagsan gacanta hoose.', 'Xadiis (Bukhaari)', 'Bixinta iyo dhisidda dakhli ayaa ka wanaagsan weyddiisiga.'],
  ['Lacag & Maaraynta', 'Xanuun + milicsi = horumar.', 'Ray Dalio', 'Marka aad khalad sameyso, qor wixii aad ka baratay. Sidaas ayaa kuu noqonaysa horumar.'],
  ['Lacag & Maaraynta', 'Rog, had iyo jeer rog.', 'Charlie Munger', 'Isweydii sida aad u guuldaraysan lahayd, kadibna ka fogow.'],
  ['Hoggaamin & Hal-abuur', 'Waqtigaagu waa xaddidan yahay; ha ku lumin noloshii qof kale.', 'Steve Jobs', 'Dooro waddo adiga kuu gaar ah, ha ku koobnaan filashada dadka.'],
  ['Hoggaamin & Hal-abuur', 'Waan ku madax adag nahay aragtida, waan dabacsan nahay faahfaahinta.', 'Jeff Bezos', 'Ujeedada ha beddelin, hababka ayaa beddeli kara.'],
  ['Hoggaamin & Hal-abuur', 'Fashilku waa ikhtiyaar; haddii wax aan fashilmin, ma abuurmaysid.', 'Elon Musk', 'Tijaabooyin yaryar oo degdeg ah ayaa kaa badbaadiya khasaare weyn.'],
  ['Hoggaamin & Hal-abuur', 'Gaajo ahow, wax-barasho ha joojin.', 'Steve Jobs', 'Rabitaan iyo is-hoosaysiin ayaa abuura horumar joogto ah.'],
  ['Hoggaamin & Hal-abuur', 'Dadka ugu wanaagsan waa kuwa dadka ugu faa\'iidada badan.', 'Xadiis (xasan)', 'Qiimaha shaqadaada waa faa\'iidada ay u leedahay dadka kale.'],
  ['Hoggaamin & Hal-abuur', 'Allaah wuu jecel yahay marka midkiin shaqo qabto inuu si wanaagsan u sameeyo.', 'Xadiis (Bayhaqi, xasan)', 'Itqaan: shaqo kasta ka dhig tayo sare, xitaa yar.'],
  ['Wakhti & Caado', 'Ka faa\'iideyso shan shan ka hor: dhallinyaranimo ka hor gabowga, caafimaad ka hor xanuun, hanti ka hor miskiinnimo, firaaqo ka hor mashquul, nolol ka hor dhimasho.', 'Xadiis (Xaakim, saxiix)', 'Hadda ayaa waqtigii. Jadwalkaaga ku hirgeli maanta.'],
  ['Wakhti & Caado', 'Adduunka ku noqo sida shisheeye ama safarle.', 'Xadiis (Bukhaari)', 'Ha ku xidhin wax naadir ah. Diirad saar waxa ku raaci doona.'],
  ['Wakhti & Caado', 'Qofka Islaamkiisa wanaagsan waxaa ka mid ah inuu ka tago wax aan khusayn.', 'Xadiis (Tirmidhi, xasan)', 'Diirad ayaa awood ah. Taleefonka iyo mashquulinta ka jar.'],
  ['Wakhti & Caado', 'Annagu waxaan nahay waxa aan ku celcelinno; sidaas awgeed heer sare ma aha ficil, waa caado.', 'Will Durant (oo Aristotle ku sharaxay)', 'Caadooyin yar yar ayaa abuura nolol weyn.'],
  ['Wakhti & Caado', 'Geelaaga ku xidh, kadibna tawakal.', 'Xadiis (Tirmidhi, xasan)', 'Tawakkulku wuxuu ka bilaabmaa tallaabo: samee sababta, Allaah natiijada ka rajee.'],
  ['Aqoon', 'Waxbarashadu waa hubka ugu xooggan ee aad adduunka ku beddeli karto.', 'Nelson Mandela', 'Waxbarashada ka dhig mudnaanta koowaad.'],
  ['Aqoon', 'Qofkii jid gala si uu aqoon u raadsado, Allaah wuxuu u fududeeyaa jidka Jannada.', 'Xadiis (Muslim)', 'Koorsada aad barato waa jid cibaado marka niyad wanaagsan jirto.'],
  ['Aqoon', 'Aqoon la\'aani waa iftiin la\'aan.', 'Maahmaah Soomaali', 'Aqoonta waa iftiinka: ku dar maalin walba.'],
  ['Anshax & Niyad', 'Camalada waxaa lagu qiimeeyaa niyadaha, qof walbana wuxuu helaa waxa uu niyadeystay.', 'Xadiis (Bukhaari & Muslim)', 'Marka aad shaqo bilowdo, niyadeyso.'],
  ['Anshax & Niyad', 'Qofkii rumaysan Allaah iyo maalinta dambe, ha sheego wanaag ama ha aamusnaado.', 'Xadiis (Bukhaari & Muslim)', 'Hadalku waa mas\'uuliyad. Kahor intaadan hadlin, is weydii: ma faa\'iido leh?'],
  ['Anshax & Niyad', 'Fududeeya, ha adkaynina.', 'Xadiis (Bukhaari)', 'Marka aad dadka la shaqeyso, hab fudud iyo dhiirigelin.'],
  ['Anshax & Niyad', 'Arrinta mu\'minka waa layaab: waa khayr dhammaanteed. Marka wanaag helo wuu mahadnaqaa, marka dhib ku dhaco wuu samraa.', 'Xadiis (Muslim)', 'Labada xaaladood waxay ku noqon karaan cibaado: mahadnaq iyo samir.'],
  ['Fashil & Samir', 'Guusha waa macallin xun: waxay ka dhigtaa dadka caqliga leh inay u malaystaan inaysan weligood guuldaraysan.', 'Bill Gates', 'Guusha ha kaa dhigin mid is-badbaadin. Weli baro.'],
  ['Fashil & Samir', 'Ma guuldaraystay; waxaan helay 10,000 hab oo aan shaqeyn.', 'Thomas Edison (la sheegay)', 'Fashil kasta waa xog. Qor wixii aad ka baratay.'],
  ['Fashil & Samir', 'Had iyo jeer waxay u muuqataa wax aan suurtogal ahayn ilaa la sameeyo.', 'Nelson Mandela (la sheegay)', 'Hadafka weyn jeex qaybo yaryar: bilow maanta.'],
  ['Fashil & Samir', 'Maanta way adag tahay, berri way ka sii adkaan doontaa, laakiin maalinta ka dambaysa way iftiimi doontaa.', 'Jack Ma (la sheegay)', 'Samirku wuxuu u baahan yahay aragti fog.'],
];

export const HAD: [string, string, string, string][] = [
  ['Akhlaaq', 'Midkiin ugu wanaagsan waa kan akhlaaqdiisu ugu wanaagsan.', 'Xadiis (Bukhaari & Muslim)', 'Dabeecadda wanaagsan ayaa qiimeysa qofka, ma aha lacagta ama jagada.'],
  ['Akhlaaq', 'Nin ayaa ka codsaday talo, wuxuuna yiri: Ha cadhoon. Wuu ku celceliyay, Nabigu (SCW) wuxuu mar kasta yiri: Ha cadhoon.', 'Xadiis (Bukhaari)', 'Xakamaynta cadhada waa xirfad nolosha. Ka hor intaadan jawaabin, neefsasho.'],
  ['Naxariis', 'Ku alla kii aan dadka u naxariisan, Allaah ma u naxariisto.', 'Xadiis (Bukhaari & Muslim)', 'Naxariista aad bixiso ayaa soo laabata.'],
  ['Walaaltinimo', 'Midkiin rumaysan maayo ilaa uu walaalkiis u jeclaado waxa uu naftiisa u jecel yahay.', 'Xadiis (Bukhaari & Muslim)', 'Dadka ku dhaqan sida aad rabto in lagugu dhaqmo.'],
  ['Nadiifnimo', 'Nadiifnimadu waa badhka iimaanka.', 'Xadiis (Muslim)', 'Nadiifnimo jidhka, goobta shaqada, iyo qalbiga.'],
  ['Sadaqo', 'Sadaqadu ma yaraysid hanti.', 'Xadiis (Muslim)', 'Ku bixi si joogto ah, xitaa wax yar.'],
  ['Caawimaad', 'Allaah wuxuu caawiyaa addoonka inta addoonku caawinayo walaalkiis.', 'Xadiis (Muslim)', 'Nolosha shaqada, caawinta saaxiibbada ayaa dhisa shabakad.'],
  ['Caawimaad', 'Ku alla kii dhibaato ka qaada mu\'min, Allaah wuxuu ka qaadaa dhibaato Maalinta Qiyaamo.', 'Xadiis (Muslim)', 'Xalinta dhibaatada dadka waa ganacsi iyo cibaado.'],
  ['Taqwo', 'Allaah ka cabso meel kasta oo aad joogto; dambiga ka dib wanaag raac, wuu tirtirayaa; dadka ku dhaqan akhlaaq wanaagsan.', 'Xadiis (Tirmidhi, xasan)', 'Saddex tallaabo: taqwo, tawbo, akhlaaq.'],
  ['Xishood', 'Xishoodku wuxuu ka mid yahay iimaanka.', 'Xadiis (Bukhaari & Muslim)', 'Xishoodku wuxuu ilaaliyaa qofka ficillo xun.'],
  ['Caafimaad', 'Aadamigu ma buuxin weel ka sii xun calooshiisa. Dhowr qaaday ayaa ku filan; haddii uu jiro, saddex meel: cunto, cabitaan, neefsasho.', 'Xadiis (Tirmidhi, xasan)', 'Dhexdhexaadnimo cuntada waa caafimaad iyo awood.'],
  ['Mahadnaq', 'Ku alla kii dadka ma mahadnaqin, Allaah ma mahadnaqin.', 'Xadiis (Abuu Daawuud & Tirmidhi)', 'Dadka aad ka faa\'iideysatay u mahadnaq, si toos ah.'],
];

export const SAH: [string, string, string, string][] = [
  ['Samayn', 'Abuu Bakr (RC) wuxuu keenay hantidiisa oo dhan Tabuuk. Nabigu (SCW) wuxuu weydiiyay: Maxaad reerkaaga uga tagtay? Wuxuu yiri: Allaah iyo Rasuulkiisa.', 'Abuu Bakr as-Siddiiq', 'Aaminaad iyo bixin: waxaa lagu qiimeeyaa waxa aad bixiso.'],
  ['Ganacsi', 'Cabdiraxmaan ibnu Cawf (RC) markii Sacd uu u soo bandhigay badh hantidiisa, wuxuu yiri: Allaah ha ku barakeeyo, ii tusa suuqa. Wuxuu noqday ganacsade ugu hodansan.', 'Cabdiraxmaan ibnu Cawf', 'Ha sugin gargaar; xirfad ku bilow, ganacsi dhis.'],
  ['Samir', 'Mus\'ab ibnu Cumayr (RC) wuxuu ahaa dhalinyaro hodan ah, kadibna wuxuu doortay Islaam. Uxud, marka la dhigay shuko, madaxa marka la dabooley cagaha ayaa muuqday.', 'Mus\'ab ibnu Cumayr', 'Quudhsashada raaxada ayaa muujisa dhisme niyadeed.'],
  ['Samir', 'Bilaal ibnu Rabaax (RC) waa la ciqaabay, wuxuuna ku celcelin jiray: Axad, Axad. Wuxuu noqday muaddinkii ugu horreeyay.', 'Bilaal ibnu Rabaax', 'Samirku wuxuu rogaa dhibaatada sharaf.'],
  ['Ganacsi', 'Khadiija bint Khuwaylid (RC) waxay ahayd ganacsato guulaysatay; waxay shaqaaleysiisay Nabiga (SCW), kadibna waxay taageertay hantidii iyo qalbigii.', 'Khadiija bint Khuwaylid', 'Haweenku waxay ahaayeen hoggaamiyayaal ganacsi; kalsooni iyo taageero.'],
  ['Hoggaamin', 'Cusmaan ibnu Caffaan (RC) wuxuu qalabeeyay ciidanka Tabuuk. Nabigu wuxuu yiri: Wax Cusmaan ma dhibi doonaan maanta kadib.', 'Cusmaan ibnu Caffaan', 'Deeqsinimada waxay dhisaan lahaanshaha ummadda.'],
  ['Aqoon', 'Zayd ibnu Thaabit (RC), dhalinyaro, ayaa loo xilsaaray ururinta Quraanka wakhtigii Abuu Bakr.', 'Zayd ibnu Thaabit', 'Da\'da yar ma aha caqabad; aqoon iyo aamin.'],
  ['Aqoon', 'Salmaan al-Faarisi (RC) wuxuu ka safray Faaris, Shaam iyo meelo kale, isagoo raadinaya runta ilaa uu gaaray Madiina.', 'Salmaan al-Faarisi', 'Raadinta runta waa safar; ha ka daalin.'],
  ['Akhlaaq', 'Anas ibnu Maalik (RC) wuxuu u adeegay Nabiga (SCW) toban sano, wuxuuna sheegay inuusan weligiis ku yidhaahdin \'Uff\'.', 'Anas ibnu Maalik', 'Anshax sare iyo dulqaad.'],
  ['Dadaal', 'Asmaa\' bint Abii Bakr (RC) waxay jeexday suunkeeda si ay u xidhdo cuntada Hijradii; waxaa loo yaqaan Dhaat an-Nitaaqayn.', 'Asmaa\' bint Abii Bakr', 'Hal-abuur iyo geesinimo xilliyada adag.'],
];

export const PEO: [string, string, string, string][] = [
  ['Aqoonyahan', 'Ibn Khaldun (1332–1406), ka yimid Tuunis. Qoray Muqaddima: sharaxaad ku saabsan bulshada, dhaqaalaha, iyo kala qaybinta shaqada.', 'Ibn Khaldun', 'Ku soo koob: aqoonta waa iyada kuu sharxaysa isbeddellada ummadaha.'],
  ['Dhakhtar', 'Ibn Siinaa (Avicenna, c.980–1037). Kitaabkiisa Canon of Medicine ayaa saacado badan loo isticmaalay jaamacadaha Yurub.', 'Ibn Siinaa', 'Qor, nidaamin, iyo kaydi aqoon si loogu faa\'iidaysto.'],
  ['Xisaabyahan', 'Al-Khwarizmi (c.780–850), Baghdad. Algebra waxay ka timid magaca buugiisa; \'algorithm\' waxay ka timid magaciisa.', 'Al-Khwarizmi', 'Xalinta dhibaatada jeexid tallaabooyin: waa asalka barnaamijyada.'],
  ['Sayniste', 'Ibn al-Haytham (c.965–1040). Kitaabkiisa Optics wuxuu horumariyay tijaabada iyo hubinta.', 'Ibn al-Haytham', 'Hubi, tijaabi, ha rumaysan wax aan laga baadhin.'],
  ['Aasaasaha', 'Faadima al-Fihri (qarnigii 9aad) ayaa aasaastay Jaamacadda al-Qarawiyyin ee Fez, c.859.', 'Faadima al-Fihri', 'Hantidaada ku maalgeli aqoon; waxay ahaan kartaa waayo-aragnimo sarreysa.'],
  ['Dhakhtar', 'Al-Zahrawi (936–1013) waxaa loo yaqaan aabaha qalliinka; kitaabkiisa al-Tasrif wuxuu sharaxay qalabka.', 'Al-Zahrawi', 'Qalabka iyo xirfadda isku dar.'],
  ['Faqiih', 'Imaam ash-Shaafici (767–820) wuxuu qoray ar-Risaala, kitaabkii ugu horreeyay ee usuul al-fiqh.', 'Imaam ash-Shaafici', 'Nidaam iyo hab: aqoonta waxay u baahan tahay qaab.'],
  ['Hubiye', 'Imaam al-Ghazali (1058–1111) wuxuu qoray Ihyaa\' Culuum ad-Diin, kitaab ku saabsan nolol iyo qalbi.', 'Imaam al-Ghazali', 'Cilmiga iyo camalka wada raac.'],
  ['Sayniste', 'Marie Curie (1867–1934) waxay heshay laba Nobel, Fiisigis 1903 iyo Kimiko 1911.', 'Marie Curie', 'Dadaal iyo xirfad: ha ka dhigin xayiraadda.'],
  ['Sayniste', 'Isaac Newton (1642–1727) wuxuu qoray sharciyada dhaqdhaqaaqa iyo cuf-weyn.', 'Isaac Newton', 'Wax yar oo xisaab ah ayaa sharxaya dunida.'],
  ['Barnaamij', 'Ada Lovelace (1815–1852) waxay qortay algorithm-kii ugu horreeyay ee mashiinka Analytical Engine.', 'Ada Lovelace', 'Aragti fog: ka hor kombiyuutarka casriga.'],
  ['Xisaabyahan', 'Alan Turing (1912–1954) wuxuu dejiyay aasaaska xisaabinta iyo su\'aasha \'ma fakari karaan mashiinnada?\' (1950).', 'Alan Turing', 'AI-ga maanta waxay ku dhisan tahay aragtidiisa.'],
];

export const WLD: [string, string, string, string][] = [
  ['Fisikis', 'Iftiinku wuxuu ku socdaa ~299,792 km/s. Iftiinka Qorraxda wuxuu gaadhaa Dhulka ~8 daqiiqo iyo 20 ilbiriqsi.', 'Xawaaraha iftiinka', 'Ogow: waxa aan aragno waa waayihii hore.'],
  ['Dhulka', 'Dhulka da\'diisu waa ~4.54 bilyan sano; ~71% dusheeda waa biyo.', 'Dhulka', 'Xasuus: muuqaalka dunida waa mid aad u gaaban.'],
  ['Jidhka', 'Qofka weyn wuxuu leeyahay 206 lafood; maskaxdu waxay leedahay ~86 bilyan neuron.', 'Jidhka bini\'aadamka', 'Daryeel jidhka iyo maskaxda: labaduba waa hubkaaga.'],
  ['Teknoolajiyada', 'Gutenberg wuxuu bilaabay daabacaadda c.1440. Waxay si weyn u faafisay aqoonta.', 'Daabacaadda', 'Aqoon la faafiyo ayaa beddesha bulshada.'],
  ['Teknoolajiyada', 'ARPANET 1969 wuxuu ahaa aasaaska internetka; Tim Berners-Lee wuxuu hindisay Web-ka 1989.', 'Internet iyo Web', 'Ka faa\'iideyso: shabakaddu waa bog-weyn oo aqoon ah.'],
  ['AI', 'Turing 1950 wuxuu soo bandhigay \'Computing Machinery and Intelligence\'. Erayga \'Artificial Intelligence\' waxaa la dejiyay 1956 (Dartmouth).', 'Taariikhda AI', 'AI waxay bilaabantay sida xisaab.'],
  ['AI', 'Transformer wuxuu soo baxay 2017 qoraalka \'Attention Is All You Need\'; waa aasaaska moodellada luqadda casriga ah.', 'Transformer (2017)', 'Barashada AI automation waxay u baahan tahay fahmidda aasaaskan.'],
  ['Taariikh', 'Bayt al-Xikma (Guriga Xikmadda) ee Baghdad, qarnigii 9aad, wuxuu ahaa xarun tarjumaad iyo cilmi.', 'Bayt al-Xikma', 'Tarjumaad iyo wadaag aqoon ayaa dhisay sayniska.'],
  ['Xisaab', 'Xisaabta \'eber\' iyo nidaamka tirooyinka waxay ka timid Hindiya; al-Khwarizmi ayaa faafiyay.', 'Tirooyinka', 'Fikrado yaryar ayaa beddelay xisaabta.'],
  ['Soomaaliya', 'Soomaaliya waxay leedahay xeebta ugu dheer dhulka weyn ee Afrika, ~3,300 km.', 'Xeebta Soomaaliya', 'Xeebtaan waa hantida ganacsiga badda iyo kalluumeysiga.'],
];

export const BIZ: [string, string, string, string][] = [
  ['Suuq-geyn', 'Marketing 4P: Product (alaab), Price (qiimo), Place (meel), Promotion (xayeysiin).', '4P', 'Weydii: maxaan iibinayaa, qiimo imisa, xaggee, sidee loo ogaadaa?'],
  ['Suuq-geyn', 'AIDA: Fiiro (Attention), Xiiso (Interest), Rabitaan (Desire), Ficil (Action). Xayeysiin kasta waa inay maraan afartan.', 'AIDA', 'Qoraal xayeysiin kasta u dhig qaabkan.'],
  ['Suuq-geyn', 'STP: Qaybi suuqa, dooro bartilmaameedka, dhig meel gaar ah maskaxda macmiilka.', 'STP', 'Ha iibin qof walba; dooro macmiil cad.'],
  ['Suuq-geyn', 'Value proposition: \'Waxaan u xalliyaa [macmiilka] [dhibaato] sida [habkaaga].\'', 'Value proposition', 'Hal jumlad oo cad ayaa dhisa ganacsi.'],
  ['Suuq-geyn', 'Ilaalinta macmiilka hore badanaa waa ka jaban tahay helidda mid cusub.', 'Retention', 'Ku celi macmiilka: wacitaan, bogga sugidda, xidhiidh.'],
  ['Qiimeyn', 'Cost-plus: qiimaha = kharash + faa\'iido. Value-based: qiimaha = qiimaha macmiilku u arko.', 'Qiimeyn', 'Marka aad xirfad leedahay, value-based badanaa waa ka sarreeya.'],
  ['Xisaabaad', 'Gross profit = Dakhli − COGS. Gross margin = Gross profit ÷ Dakhli.', 'Gross profit', 'Xisaabi margin-ka alaab kasta.'],
  ['Xisaabaad', 'Net profit margin = Faa\'iido saafi ah ÷ Dakhli.', 'Net margin', 'Waxay muujisaa sida ganacsigu u hagaagsan yahay.'],
  ['Xisaabaad', 'Break-even (halka) = Kharash go\'an ÷ (Qiimo − Kharash isbeddela halkii unug).', 'Break-even', 'Ogow imisa unug ayaa lagu bixiyaa kharashka.'],
  ['Xisaabaad', 'Markup = (Qiimo − Kharash) ÷ Kharash. Margin = (Qiimo − Kharash) ÷ Qiimo. Labadu ma le\'ega.', 'Markup vs Margin', 'Ha ku wareerin: markup 50% = margin 33.3%.'],
  ['Xisaabaad', 'ROI = (Faa\'iido − Maalgalin) ÷ Maalgalin. CAGR = (Dhammaad ÷ Bilow)^(1/sano) − 1.', 'ROI & CAGR', 'Waxay kuu dhigaysaa isbarbardhigga maalgalinta.'],
  ['Xisaabaad', 'Accounting equation: Hantida (Assets) = Deymaha (Liabilities) + Saamiga (Equity). Double-entry: Debit = Credit mar walba.', 'Equation', 'Waa aasaaska Accounting; hubi mar walba.'],
  ['Xisaabaad', 'Current ratio = Hanti hadda ÷ Deyn hadda. Dalab >1 badanaa waa calaamad wanaagsan (aan lahayn xad go\'an).', 'Current ratio', 'U ogow in lacagtu jirto ka hor intaadan deyn bixin.'],
  ['Xisaabaad', 'LTV = ARPU × Gross margin × Nolosha macmiilka. LTV:CAC ≥ 3 waa hanti badanaa la isticmaalo.', 'LTV & CAC', 'Hubi in dhibaatada macmiil celinta ay tahay mid faa\'iido leh.'],
  ['Maaliyad', 'Rule of 72: sannadaha labalaabka ≈ 72 ÷ boqolleyda sannadlaha ah.', 'Rule of 72', 'Xisaab degdeg ah oo maalgalinta ku saabsan.'],
  ['Maaliyad', 'Faa\'iido (profit) ≠ lacag (cash flow). Ganacsi faa\'iido leh ayaa dhici kara haddii lacagta la waayo.', 'Cash flow', 'Daawo cash flow maalin walba.'],
];

export const STO: [string, string, string, string][] = [
  ['Bilow', '1976: Steve Jobs iyo Steve Wozniak waxay ka bilaabeen Apple garaashka; Apple I ayaa ahaa alaabtii ugu horreysay.', 'Apple', 'Waxyaabaha weyn waxay ka bilaabmaan meel yar.'],
  ['Bilow', '1994: Jeff Bezos wuxuu ka tagay shaqo hodan ah, wuxuuna ka bilaabay Amazon iibinta buugaag, garaash ku dhex jirta.', 'Amazon', 'Dooro hadaf xaddidan, kadibna ballaadhi.'],
  ['Bilow', '1999: Jack Ma iyo saaxiibbo kale ayaa ka bilaabay Alibaba guriga Hangzhou.', 'Alibaba', 'Kooxda saxda ah ayaa ka weyn alaabta.'],
  ['Bilow', '1975: Bill Gates iyo Paul Allen waxay aasaaseen Microsoft; waxay u qoreen BASIC kombiyuutarka Altair.', 'Microsoft', 'Ka faa\'iideyso dhaqdhaqaaqa teknoolajiyada cusub.'],
  ['Hal-abuur', '1913: Ford wuxuu isticmaalay khadka isu-ururinta Model T; wakhtiga isu-ururinta wuu hoos u dhacay si weyn.', 'Ford', 'Habka shaqada ayaa awood u leh ka weyn xirfadda hal qof.'],
  ['Safar', 'Quraysh waxay lahaayeen safarka ganacsiga xilliga qaboobaha (Yaman) iyo xilliga kulaylka (Shaam), sida Quraanka u xusay (106).', 'Rixlat Quraysh', 'Safarka iyo sugnaanta ayaa dhisay ganacsi.'],
  ['Safar', 'Ibn Battuuta wuxuu booqday Muqdisho c.1331; wuxuu ku sifeeyay magaalo weyn oo ganacsi leh.', 'Ibn Battuuta', 'Muqdisho waxay ahayd xarun badda Hindiya ah.'],
  ['Safar', 'Zheng He (1405–1433) ayaa hoggaamiyay xeryo badda; waxaa la sheegaa inay gaareen xeebta Soomaaliya.', 'Zheng He', 'Ganacsigu wuxuu isku xidhay qaaradaha.'],
];

export const HIS: [string, string, string, string][] = [
  ['Xisaabaad', '1494: Luca Pacioli, Venice, wuxuu daabacay Summa de arithmetica oo ay ku jirto double-entry bookkeeping; waxaa loo yaqaan aabaha Accounting.', 'Pacioli, 1494', 'Accounting-ka aad barato waa 500 sano oo nidaam ah.'],
  ['Xisaabaad', 'Qoraalka ugu horreeyay ee Mesopotamia (c.3000 BCE) waxaa loo isticmaalay xisaabaadka beeraha iyo hantida.', 'Mesopotamia', 'Qorista xisaabaadka ayaa dhalisay qoraalka.'],
  ['Lacag', 'c.600 BCE: Lydia (Turkiga hadda) waxay soo saartay lacagaha ugu horreeyay.', 'Lydia', 'Lacagtu waxay fududeysay iibka.'],
  ['Ganacsi', 'Waddada Xariirta (Silk Road) waxay isku xidhay Shiinaha iyo Yurub, laga bilaabo qarniyadii BCE.', 'Silk Road', 'Ganacsigu wuxuu isku xidhay dhaqamada.'],
  ['Ganacsi', 'Xeebta Hindiya iyo Afrika: Muqdisho, Saylac iyo Berbera waxay ahaayeen xarumo ganacsi.', 'Badda Hindiya', 'Soomaalidu waxay tiir u ahaayeen ganacsiga baddaan.'],
  ['Dhaqaale', '1377: Ibn Khaldun, Muqaddima, wuxuu sharaxay kala qaybinta shaqada iyo isku-xirnaanta dhaqaalaha.', 'Muqaddima', 'Dhaqaale wuxuu ahaa cilmi sagaal qarni ka hor.'],
  ['Dhaqaale', '1602: VOC (Dutch East India Company) waxay noqotay shirkadda ugu horreysay ee saamiyada dadweynaha.', 'VOC, 1602', 'Saamiyadu waxay u oggolaadeen maalgalin wadaag ah.'],
  ['Dhaqaale', '1776: Adam Smith, The Wealth of Nations, wuxuu sharaxay suuq iyo kala qaybinta shaqada.', 'Adam Smith', 'Fahmidda suuqa ayaa ah aasaaska ganacsiga.'],
];

const SUR_RAW = "Al-Faatixa:7:M,Al-Baqarah:286:D,Aal-Cimraan:200:D,An-Nisaa:176:D,Al-Maa'ida:120:D,Al-Ancaam:165:M,Al-Acraaf:206:M,Al-Anfaal:75:D,At-Tawba:129:D,Yuunus:109:M,Huud:123:M,Yuusuf:111:M,Ar-Racd:43:D,Ibraahiim:52:M,Al-Xijr:99:M,An-Naxl:128:M,Al-Israa:111:M,Al-Kahf:110:M,Maryam:98:M,Taa-Haa:135:M,Al-Anbiyaa:112:M,Al-Xajj:78:D,Al-Mu'minuun:118:M,An-Nuur:64:D,Al-Furqaan:77:M,Ash-Shucaraa:227:M,An-Naml:93:M,Al-Qasas:88:M,Al-Cankabuut:69:M,Ar-Ruum:60:M,Luqmaan:34:M,As-Sajda:30:M,Al-Axzaab:73:D,Saba:54:M,Faatir:45:M,Yaasiin:83:M,As-Saaffaat:182:M,Saad:88:M,Az-Zumar:75:M,Gaafir:85:M,Fussilat:54:M,Ash-Shuuraa:53:M,Az-Zukhruf:89:M,Ad-Dukhaan:59:M,Al-Jaathiya:37:M,Al-Axqaaf:35:M,Muxammad:38:D,Al-Fatx:29:D,Al-Xujuraat:18:D,Qaaf:45:M,Adh-Dhaariyaat:60:M,At-Tuur:49:M,An-Najm:62:M,Al-Qamar:55:M,Ar-Raxmaan:78:D,Al-Waaqica:96:M,Al-Xadiid:29:D,Al-Mujaadala:22:D,Al-Xashr:24:D,Al-Mumtaxana:13:D,As-Saff:14:D,Al-Jumuca:11:D,Al-Munaafiquun:11:D,At-Taghaabun:18:D,At-Talaaq:12:D,At-Taxriim:12:D,Al-Mulk:30:M,Al-Qalam:52:M,Al-Xaaqqa:52:M,Al-Macaarij:44:M,Nuux:28:M,Al-Jinn:28:M,Al-Muzzammil:20:M,Al-Muddaththir:56:M,Al-Qiyaama:40:M,Al-Insaan:31:D,Al-Mursalaat:50:M,An-Naba:40:M,An-Naaziccaat:46:M,Cabasa:42:M,At-Takwiir:29:M,Al-Infitaar:19:M,Al-Mutaffifiin:36:M,Al-Inshiqaaq:25:M,Al-Buruuj:22:M,At-Taariq:17:M,Al-Acla:19:M,Al-Ghaashiya:26:M,Al-Fajr:30:M,Al-Balad:20:M,Ash-Shams:15:M,Al-Layl:21:M,Ad-Duxaa:11:M,Ash-Sharx:8:M,At-Tiin:8:M,Al-Calaq:19:M,Al-Qadr:5:M,Al-Bayyina:8:D,Az-Zalzala:8:D,Al-Caadiyaat:11:M,Al-Qaarica:11:M,At-Takaathur:8:M,Al-Casr:3:M,Al-Humaza:9:M,Al-Fiil:5:M,Quraysh:4:M,Al-Maacuun:7:M,Al-Kawthar:3:M,Al-Kaafiruun:6:M,An-Nasr:3:D,Al-Masad:5:M,Al-Ikhlaas:4:M,Al-Falaq:5:M,An-Naas:6:M";

export interface SurahItem {
  n: number;
  name: string;
  v: number;
  m: 'M' | 'D';
}

export const SURS: SurahItem[] = SUR_RAW.split(',').map((x, i) => {
  const [name, verses, type] = x.split(':');
  return {
    n: i + 1,
    name,
    v: parseInt(verses, 10),
    m: type as 'M' | 'D',
  };
});

export const CAM: [string, string, string, string, string][] = [
  ['Adkaysi', '2 daqiiqo samir', "Marka hawl adag timaado, neefso, ku celi 'dhibta waxaa la socda fudayd', kadibna sii wad.", 'Ash-Sharx 94:5-6', ''],
  ['Tawakkul', 'Qor walwalka, kadibna tawakal', 'Qor hal shay aadan xakamayn karin; Allaah ku aamin, hawshaadana sii wad.', 'At-Talaaq 65:3', 'p6'],
  ['Rizqi & Ganacsi', 'Qor dakhliga iyo kharashka', 'Maanta qor labada, xitaa haddii ay yar yihiin.', 'Al-Baqarah 2:282', 'p5'],
  ['Aqoon', '10 bog + hal cashar', 'Akhri 10 bog ama cutub koorso, kadibna qor casharka hal jumlad.', 'Taa-Haa 20:114', 'p9'],
  ['Dadaal', '25 daqiiqo oo diiradda leh', 'Dooro hawsha aad dib u dhigaysay, 25 daqiiqo ku samee.', 'An-Najm 53:39', 'p5'],
  ['Wakhtiga', "30 daqiiqo oo taleefon la'aan", 'Taleefonka ka jar 30 daqiiqo oo ku bixi aqris ama shaqo.', 'Al-Casr 103:1-3', ''],
  ['Anshax', 'Hal qof u mahadnaq', 'Ku mahadnaq qof, ha xantin cid maanta.', 'Al-Xujuraat 49:12', ''],
  ['Waalidiin', '5 daqiiqo waalidka', 'Wac ama booqo waalidkaaga ama qof qoyskaaga ah.', 'Al-Israa 17:23', ''],
  ['Tawbo', 'Istaghfaar 100', 'Ku dhammaystir 100 istaghfaar (Athkaar).', 'Az-Zumar 39:53', 'p6'],
  ['Duco', 'Ducada subaxda iyo galabta', 'Dhammaystir labada duco maanta.', 'Gaafir 40:60', ''],
  ['Mahadnaq', '3 shay oo aad mahadnaqayso', 'Habeenkii qor saddex nicmo.', 'Ibraahiim 14:7', 'p6'],
  ['Caafimaad', '20 daqiiqo socod/jimicsi', 'Gym-ka ka dib, socod yar oo dheeraad ah.', 'Al-Anfaal 8:60', 'p5'],
  ['Aakhiro', 'Sadaqo yar', 'Bixi xitaa $1 ama cunto yar.', 'Az-Zalzala 99:7-8', ''],
  ['Ikhlaas', 'Hawsha ugu muhiimsan marka hore', 'Hawsha ugu weyn bilow niyad Allaah dartiis.', 'Al-Bayyina 98:5', ''],
];

export interface FormulaCalc {
  t: string;
  desc: string;
  f: [string, string, number][];
  r: (v: Record<string, number>) => string;
}

export const CALC: FormulaCalc[] = [
  {
    t: 'Break-even (halka)',
    desc: 'Ogow tirada unugyada loo baahan yahay si aad uga soo kabato kharashka go\'an.',
    f: [
      ['fx', "Kharash go'an ($)", 1000],
      ['pr', 'Qiimo halkii unug ($)', 10],
      ['vc', 'Kharash isbeddela halkii unug ($)', 6],
    ],
    r: (v) =>
      v.pr > v.vc
        ? `Unugyada loo baahan yahay: <b>${Math.ceil(v.fx / (v.pr - v.vc))}</b> • Dakhliga: <b>$${(Math.ceil(v.fx / (v.pr - v.vc)) * v.pr).toFixed(0)}</b>`
        : 'Qiimaha waa inuu ka badan yahay kharashka isbeddela.',
  },
  {
    t: 'Margin iyo Markup',
    desc: 'Kala saar Margin (faa\'iido dakhliga ku salaysan) iyo Markup (faa\'iido kharashka ku salaysan).',
    f: [
      ['c', 'Kharash ($)', 6],
      ['p', 'Qiimo ($)', 10],
    ],
    r: (v) =>
      v.p > 0 && v.c > 0
        ? `Faa'iido: <b>$${(v.p - v.c).toFixed(2)}</b> • Margin: <b>${(((v.p - v.c) / v.p) * 100).toFixed(1)}%</b> • Markup: <b>${(((v.p - v.c) / v.c) * 100).toFixed(1)}%</b>`
        : 'Geli tirooyin sax ah.',
  },
  {
    t: 'ROI iyo CAGR',
    desc: 'Xisaabi faa\'iidada guud ee maalgashiga iyo celceliska koritaanka sannadlaha ah.',
    f: [
      ['s', 'Bilowga ($)', 1000],
      ['e', 'Dhammaadka ($)', 1800],
      ['y', 'Sannado', 3],
    ],
    r: (v) =>
      v.s > 0 && v.y > 0
        ? `ROI: <b>${(((v.e - v.s) / v.s) * 100).toFixed(1)}%</b> • CAGR: <b>${((Math.pow(v.e / v.s, 1 / v.y) - 1) * 100).toFixed(1)}%</b>`
        : 'Geli tirooyin sax ah.',
  },
  {
    t: 'LTV iyo CAC',
    desc: 'Qiimaha macmiilka muddada fog (LTV) marka loo barbardhigo kharashka lagu keenay (CAC).',
    f: [
      ['a', 'ARPU bishii ($)', 20],
      ['g', 'Gross margin %', 60],
      ['l', 'Nolosha macmiilka (bilood)', 18],
      ['k', 'CAC ($)', 150],
    ],
    r: (v) => {
      const m = (v.a * v.g) / 100;
      const ltv = m * v.l;
      return v.k > 0 && m > 0
        ? `LTV: <b>$${ltv.toFixed(0)}</b> • LTV:CAC = <b>${(ltv / v.k).toFixed(1)}</b> • Dib-u-soo-celin: <b>${(v.k / m).toFixed(1)} bilood</b>`
        : 'Geli tirooyin sax ah.';
    },
  },
  {
    t: 'Maalgalin iyo Rule of 72',
    desc: 'Qiyaas sannadaha ay hantidu ku labalaabanto adigoo adeegsanaya 72.',
    f: [
      ['pp', 'Maalgalin ($)', 1000],
      ['rr', 'Boqolleyda sannadlaha %', 8],
      ['yy', 'Sannado', 10],
    ],
    r: (v) =>
      v.rr > 0
        ? `Qiimaha mustaqbalka: <b>$${(v.pp * Math.pow(1 + v.rr / 100, v.yy)).toFixed(0)}</b> • Labalaabid: <b>~${(72 / v.rr).toFixed(1)} sano</b>`
        : 'Geli boqolley sax ah.',
  },
];
