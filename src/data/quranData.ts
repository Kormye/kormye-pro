export interface QuranVerse {
  number: number;
  arabic: string;
  somali: string;
  page?: number;
  juz?: number;
}

export interface CompleteSurah {
  id: number;
  nameArabic: string;
  nameSomali: string;
  translation: string;
  totalAyahs: number;
  revelation: 'Makki' | 'Madani';
  juz: number;
  page: number;
  versesSample: QuranVerse[];
}

export const SURAH_LIST_ALL: CompleteSurah[] = [
  {
    id: 1,
    nameArabic: 'الفَاتِحَة',
    nameSomali: 'Al-Faatixa',
    translation: 'Furaha Kitaabka',
    totalAyahs: 7,
    revelation: 'Makki',
    juz: 1,
    page: 1,
    versesSample: [
      { number: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', somali: 'Magaca Eebe yaan kubillaabaynaa ee Naxariistaha guud iyo Naxariistaha gaarka ah.' },
      { number: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', somali: 'Mahad Eebaa iska leh ee Barbaariyaha caalamka.' },
      { number: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', somali: 'Ee Naxariistaha guud iyo Naxariistaha gaarka ah.' },
      { number: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', somali: 'Ee hanta maalinta abaal-marinta (Qiyaamada).' },
      { number: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', somali: 'Adiga kaligaa yaan ku caabudaynaa, adigana kaligaa yaan kaalmo kaa baryeynaa.' },
      { number: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', somali: 'Nagu hanuuni jidka toosan.' },
      { number: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', somali: 'Jidka kuwii aad u nicmaysay, oon ahayn kuwii loo carooday iyo kuwa lunsan toona.' }
    ]
  },
  {
    id: 2,
    nameArabic: 'البَقَرَة',
    nameSomali: 'Al-Baqarah',
    translation: 'Saca',
    totalAyahs: 286,
    revelation: 'Madani',
    juz: 1,
    page: 2,
    versesSample: [
      { number: 1, arabic: 'الم', somali: 'Alif, Laam, Miim.' },
      { number: 2, arabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ', somali: 'Kani waa Kitaabkii aan shaki ku jirin, oo hanuun u ah kuwa dhawrsada.' },
      { number: 3, arabic: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ', somali: 'Kuwa rumeeya waxa maqan ee oogaya salaadda, waxaan ku arzaaqnayna wax ka bixiya.' },
      { number: 4, arabic: 'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ', somali: 'Iyo kuwa rumeeya waxa lagugu soo dejiyey iyo wixii la soo dejiyey ka horba, aakhirana yaqiinsan.' },
      { number: 5, arabic: 'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ', somali: 'Kuwaasi waxay ku sugan yihiin hanuun Eebahood xaggiisa ka yimid, waana kuwa liibaamay.' },
      { number: 255, arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ', somali: 'Allaah ma jiro Ilaah kale oo xaq lagu caabudo Isaga mooyee, waana Midka Nool ee Maamula koonka oo dhan. Ma qabato luulmo ama hurdo toona. Waxaa u sugnaaday wax kasta oo cirarka iyo dhulka ku sugan.' }
    ]
  },
  {
    id: 3,
    nameArabic: 'آل عِمْرَان',
    nameSomali: 'Aal-Cimraan',
    translation: 'Reer Cimraan',
    totalAyahs: 200,
    revelation: 'Madani',
    juz: 3,
    page: 50,
    versesSample: [
      { number: 1, arabic: 'الم', somali: 'Alif, Laam, Miim.' },
      { number: 2, arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', somali: 'Allaah ma jiro Ilaah xaq ah Isaga mooyee, waana Midka nool ee maamula wax walba.' },
      { number: 103, arabic: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا', somali: 'Kabsada xadhigga Eebbe dhammaantiin hana kala tagina, xusuustana nicmadiisa.' }
    ]
  },
  { id: 4, nameArabic: 'النِّسَاء', nameSomali: 'An-Nisaa', translation: 'Haweenka', totalAyahs: 176, revelation: 'Madani', juz: 4, page: 77, versesSample: [] },
  { id: 5, nameArabic: 'المَائِدَة', nameSomali: 'Al-Maa\'idah', translation: 'Miiska / Saxanka', totalAyahs: 120, revelation: 'Madani', juz: 6, page: 106, versesSample: [] },
  { id: 6, nameArabic: 'الأَنْعَام', nameSomali: 'Al-Ancaam', translation: 'Xoolaha', totalAyahs: 165, revelation: 'Makki', juz: 7, page: 128, versesSample: [] },
  { id: 7, nameArabic: 'الأَعْرَاف', nameSomali: 'Al-Acraaf', translation: 'Darbiyada Sare', totalAyahs: 206, revelation: 'Makki', juz: 8, page: 151, versesSample: [] },
  { id: 8, nameArabic: 'الأَنْفَال', nameSomali: 'Al-Anfaal', translation: 'Qaniimada', totalAyahs: 75, revelation: 'Madani', juz: 9, page: 177, versesSample: [] },
  { id: 9, nameArabic: 'التَّوْبَة', nameSomali: 'At-Tawbah', translation: 'Toobada', totalAyahs: 129, revelation: 'Madani', juz: 10, page: 187, versesSample: [] },
  { id: 10, nameArabic: 'يُونُس', nameSomali: 'Yuunus', translation: 'Nabi Yuunus C.S.', totalAyahs: 109, revelation: 'Makki', juz: 11, page: 208, versesSample: [] },
  { id: 11, nameArabic: 'هُود', nameSomali: 'Huud', translation: 'Nabi Huud C.S.', totalAyahs: 123, revelation: 'Makki', juz: 11, page: 221, versesSample: [] },
  { id: 12, nameArabic: 'يُوسُف', nameSomali: 'Yuusuf', translation: 'Nabi Yuusuf C.S.', totalAyahs: 111, revelation: 'Makki', juz: 12, page: 235, versesSample: [] },
  { id: 13, nameArabic: 'الرَّعْد', nameSomali: 'Ar-Racd', translation: 'Onkodka', totalAyahs: 43, revelation: 'Madani', juz: 13, page: 249, versesSample: [] },
  { id: 14, nameArabic: 'إِبْرَاهِيم', nameSomali: 'Ibraahiim', translation: 'Nabi Ibraahiim C.S.', totalAyahs: 52, revelation: 'Makki', juz: 13, page: 255, versesSample: [] },
  { id: 15, nameArabic: 'الحِجْر', nameSomali: 'Al-Xijr', translation: 'Dooxada Xijr', totalAyahs: 99, revelation: 'Makki', juz: 14, page: 262, versesSample: [] },
  { id: 16, nameArabic: 'النَّحْل', nameSomali: 'An-Naxl', translation: 'Shinida', totalAyahs: 128, revelation: 'Makki', juz: 14, page: 267, versesSample: [] },
  { id: 17, nameArabic: 'الإِسْرَاء', nameSomali: 'Al-Israa', translation: 'Safarkii Habeenkii', totalAyahs: 111, revelation: 'Makki', juz: 15, page: 282, versesSample: [] },
  {
    id: 18,
    nameArabic: 'الكَهْف',
    nameSomali: 'Al-Kahf',
    translation: 'Godka',
    totalAyahs: 110,
    revelation: 'Makki',
    juz: 15,
    page: 293,
    versesSample: [
      { number: 1, arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا', somali: 'Mahad Eebaa iska leh ee ku soo dejiyey addoonkiisa Kitaabka oon ka yeelin qallooc.' },
      { number: 2, arabic: 'قَيِّمًا لِّيُنذِرَ بَأْسًا شَدِيدًا مِّن لَّدُنْهُ وَيُبَشِّرَ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا حَسَنًا', somali: 'Kitaab toosan si uu ugu digo ciqaab daran oo xaggiisa ka timaadda, ugana bishaareeyo mu\'miniinta fala camalka suubban.' },
      { number: 10, arabic: 'إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا', somali: 'Xusuuso markay dhallinyaradii magangaleen godka oo yidhaahdeen: Eebbow naga sii agtaada naxariis, noona hagaaji amarkayaga hanuun.' },
      { number: 110, arabic: 'قُلْ إِنَّمَا أَنَا بَشَرٌ مِّثْلُكُمْ يُوحَىٰ إِلَيَّ أَنَّمَا إِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ', somali: 'Waxaad dhahdaa: Waxaan anigu uun ahay dad ila mid ah oo la ii waxyoodo in Ilaahiinnu yahay Ilaah keliya.' }
    ]
  },
  { id: 19, nameArabic: 'مَرْيَم', nameSomali: 'Maryam', translation: 'Maryam C.S.', totalAyahs: 98, revelation: 'Makki', juz: 16, page: 305, versesSample: [] },
  { id: 20, nameArabic: 'طه', nameSomali: 'Daahaa', translation: 'Dhaa-Haa', totalAyahs: 135, revelation: 'Makki', juz: 16, page: 312, versesSample: [] },
  { id: 21, nameArabic: 'الأَنْبِيَاء', nameSomali: 'Al-Anbiyaa', translation: 'Nabiyada', totalAyahs: 112, revelation: 'Makki', juz: 17, page: 322, versesSample: [] },
  { id: 22, nameArabic: 'الحَجّ', nameSomali: 'Al-Xajj', translation: 'Xajka', totalAyahs: 78, revelation: 'Madani', juz: 17, page: 332, versesSample: [] },
  { id: 23, nameArabic: 'المُؤْمِنُون', nameSomali: 'Al-Mu\'minuun', translation: 'Mu\'miniinta', totalAyahs: 118, revelation: 'Makki', juz: 18, page: 342, versesSample: [] },
  { id: 24, nameArabic: 'النُّور', nameSomali: 'An-Nuur', translation: 'Iftiinka', totalAyahs: 64, revelation: 'Madani', juz: 18, page: 350, versesSample: [] },
  { id: 25, nameArabic: 'الفُرْقَان', nameSomali: 'Al-Furqaan', translation: 'Kala-Saaraha', totalAyahs: 77, revelation: 'Makki', juz: 18, page: 359, versesSample: [] },
  { id: 26, nameArabic: 'الشُّعَرَاء', nameSomali: 'Ash-Shucaraa', translation: 'Gabayaaga', totalAyahs: 227, revelation: 'Makki', juz: 19, page: 367, versesSample: [] },
  { id: 27, nameArabic: 'النَّمْل', nameSomali: 'An-Naml', translation: 'Qudhaanjada', totalAyahs: 93, revelation: 'Makki', juz: 19, page: 377, versesSample: [] },
  { id: 28, nameArabic: 'القَصَص', nameSomali: 'Al-Qasas', translation: 'Sheekooyinka', totalAyahs: 88, revelation: 'Makki', juz: 20, page: 385, versesSample: [] },
  { id: 29, nameArabic: 'العَنْكَبُوت', nameSomali: 'Al-Cankabuut', translation: 'Caarada', totalAyahs: 69, revelation: 'Makki', juz: 20, page: 396, versesSample: [] },
  { id: 30, nameArabic: 'الرُّوم', nameSomali: 'Ar-Ruum', translation: 'Roomaanka', totalAyahs: 60, revelation: 'Makki', juz: 21, page: 404, versesSample: [] },
  { id: 31, nameArabic: 'لُقْمَان', nameSomali: 'Luqmaan', translation: 'Luqmaanul Xakiim', totalAyahs: 34, revelation: 'Makki', juz: 21, page: 411, versesSample: [] },
  { id: 32, nameArabic: 'السَّجْدَة', nameSomali: 'As-Sajdah', translation: 'Sujuudda', totalAyahs: 30, revelation: 'Makki', juz: 21, page: 415, versesSample: [] },
  { id: 33, nameArabic: 'الأَحْزَاب', nameSomali: 'Al-Axzaab', translation: 'Xulafada', totalAyahs: 73, revelation: 'Madani', juz: 21, page: 418, versesSample: [] },
  { id: 34, nameArabic: 'سَبَأ', nameSomali: 'Saba\'', translation: 'Reer Saba', totalAyahs: 54, revelation: 'Makki', juz: 22, page: 428, versesSample: [] },
  { id: 35, nameArabic: 'فَاطِر', nameSomali: 'Faadir', translation: 'Abuurihii', totalAyahs: 45, revelation: 'Makki', juz: 22, page: 434, versesSample: [] },
  {
    id: 36,
    nameArabic: 'يس',
    nameSomali: 'Yaasiin',
    translation: 'Yaa-Siin',
    totalAyahs: 83,
    revelation: 'Makki',
    juz: 22,
    page: 440,
    versesSample: [
      { number: 1, arabic: 'يس', somali: 'Yaa, Siin.' },
      { number: 2, arabic: 'وَالْقُرْآنِ الْحَكِيمِ', somali: 'Waxaan ku dhaartay Quraanka xigmadda leh.' },
      { number: 3, arabic: 'إِنَّكَ لَمِنَ الْمُرْسَلِينَ', somali: 'Inaad adigu xaqiiqo tahay mid ka mid ah rususha la soo diray.' },
      { number: 4, arabic: 'عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ', somali: 'Oo ku sugan waddo toosan.' },
      { number: 58, arabic: 'سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ', somali: 'Waa nabadgalyo iyo salaam xagga Eebbe Naxariista ka timid.' }
    ]
  },
  { id: 37, nameArabic: 'الصَّافَّات', nameSomali: 'As-Saaffaat', translation: 'Safafka', totalAyahs: 182, revelation: 'Makki', juz: 23, page: 446, versesSample: [] },
  { id: 38, nameArabic: 'ص', nameSomali: 'Saad', translation: 'Saad', totalAyahs: 88, revelation: 'Makki', juz: 23, page: 453, versesSample: [] },
  { id: 39, nameArabic: 'الزُّمَر', nameSomali: 'Az-Zumar', translation: 'Kooxaha', totalAyahs: 75, revelation: 'Makki', juz: 23, page: 458, versesSample: [] },
  { id: 40, nameArabic: 'غَافِر', nameSomali: 'Ghaafir', translation: 'Dambi-Dhaafaha', totalAyahs: 85, revelation: 'Makki', juz: 24, page: 467, versesSample: [] },
  { id: 41, nameArabic: 'فُصِّلَت', nameSomali: 'Fussilat', translation: 'Kala-Bixid', totalAyahs: 54, revelation: 'Makki', juz: 24, page: 477, versesSample: [] },
  { id: 42, nameArabic: 'الشُّورَى', nameSomali: 'Ash-Shuuraa', translation: 'Wada-Tashiga', totalAyahs: 53, revelation: 'Makki', juz: 25, page: 483, versesSample: [] },
  { id: 43, nameArabic: 'الزُّخْرُف', nameSomali: 'Az-Zukhruf', translation: 'Qurxinta Dahabka ah', totalAyahs: 89, revelation: 'Makki', juz: 25, page: 489, versesSample: [] },
  { id: 44, nameArabic: 'الدُّخَان', nameSomali: 'Ad-Dukhaan', translation: 'Qiiqa', totalAyahs: 59, revelation: 'Makki', juz: 25, page: 496, versesSample: [] },
  { id: 45, nameArabic: 'الجَاثِيَة', nameSomali: 'Al-Jaathiyah', translation: 'Jilba-Joogsiga', totalAyahs: 37, revelation: 'Makki', juz: 25, page: 499, versesSample: [] },
  { id: 46, nameArabic: 'الأَحْقَاف', nameSomali: 'Al-Axqaaf', translation: 'Burooyinka Ciidda', totalAyahs: 35, revelation: 'Makki', juz: 26, page: 502, versesSample: [] },
  { id: 47, nameArabic: 'مُحَمَّد', nameSomali: 'Muxammad', translation: 'Nabi Muxammad S.C.W.', totalAyahs: 38, revelation: 'Madani', juz: 26, page: 507, versesSample: [] },
  { id: 48, nameArabic: 'الفَتْح', nameSomali: 'Al-Fatx', translation: 'Guusha Weyn', totalAyahs: 29, revelation: 'Madani', juz: 26, page: 511, versesSample: [] },
  { id: 49, nameArabic: 'الحُجُرَات', nameSomali: 'Al-Xujuraat', translation: 'Qolalka', totalAyahs: 18, revelation: 'Madani', juz: 26, page: 515, versesSample: [] },
  { id: 50, nameArabic: 'ق', nameSomali: 'Qaaf', translation: 'Qaaf', totalAyahs: 45, revelation: 'Makki', juz: 26, page: 518, versesSample: [] },
  { id: 51, nameArabic: 'الذَّارِيَات', nameSomali: 'Adh-Dhaariyaat', translation: 'Dabaylaha', totalAyahs: 60, revelation: 'Makki', juz: 26, page: 520, versesSample: [] },
  { id: 52, nameArabic: 'الطُّور', nameSomali: 'At-Tuur', translation: 'Buurta Tuur', totalAyahs: 49, revelation: 'Makki', juz: 27, page: 523, versesSample: [] },
  { id: 53, nameArabic: 'النَّجْم', nameSomali: 'An-Najm', translation: 'Xiddigta', totalAyahs: 62, revelation: 'Makki', juz: 27, page: 526, versesSample: [] },
  { id: 54, nameArabic: 'القَمَر', nameSomali: 'Al-Qamar', translation: 'Dayaxa', totalAyahs: 55, revelation: 'Makki', juz: 27, page: 528, versesSample: [] },
  {
    id: 55,
    nameArabic: 'الرَّحْمَٰن',
    nameSomali: 'Ar-Raxmaan',
    translation: 'Naxariistaha',
    totalAyahs: 78,
    revelation: 'Madani',
    juz: 27,
    page: 531,
    versesSample: [
      { number: 1, arabic: 'الرَّحْمَٰنُ', somali: 'Naxariistaha (Allaah).' },
      { number: 2, arabic: 'عَلَّمَ الْقُرْآنَ', somali: 'Ayaa baray Quraanka.' },
      { number: 3, arabic: 'خَلَقَ الْإِنسَانَ', somali: 'Wuxuu abuuray insaanka.' },
      { number: 4, arabic: 'عَلَّمَهُ الْبَيَانَ', somali: 'Wuxuuna baray hadalka iyo caddaynta.' },
      { number: 13, arabic: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ', somali: 'Haddaba kee baad nicmooyinka Eebihiin ku beeninaysaan?' }
    ]
  },
  {
    id: 56,
    nameArabic: 'الوَاقِعَة',
    nameSomali: 'Al-Waaqicah',
    translation: 'Dhacdada Qiyaame',
    totalAyahs: 96,
    revelation: 'Makki',
    juz: 27,
    page: 534,
    versesSample: [
      { number: 1, arabic: 'إِذَا وَقَعَتِ الْوَاقِعَةُ', somali: 'Markay dhacdo dhacdadu (Qiyaamadu).' },
      { number: 2, arabic: 'لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ', somali: 'Dhiciddeeda ma jirto beeneeye beenin kara.' }
    ]
  },
  { id: 57, nameArabic: 'الحَدِيد', nameSomali: 'Al-Xadiid', translation: 'Birta', totalAyahs: 29, revelation: 'Madani', juz: 27, page: 537, versesSample: [] },
  { id: 58, nameArabic: 'المُجَادِلَة', nameSomali: 'Al-Mujaadilah', translation: 'Doodihii Haweenka', totalAyahs: 22, revelation: 'Madani', juz: 28, page: 542, versesSample: [] },
  { id: 59, nameArabic: 'الحَشْر', nameSomali: 'Al-Xashr', translation: 'Kala-Cayrinta', totalAyahs: 24, revelation: 'Madani', juz: 28, page: 545, versesSample: [] },
  { id: 60, nameArabic: 'المُمْتَحَنَة', nameSomali: 'Al-Mumtaxanah', translation: 'La-Imtixaantay', totalAyahs: 13, revelation: 'Madani', juz: 28, page: 549, versesSample: [] },
  { id: 61, nameArabic: 'الصَّفّ', nameSomali: 'As-Saff', translation: 'Safafka', totalAyahs: 14, revelation: 'Madani', juz: 28, page: 551, versesSample: [] },
  { id: 62, nameArabic: 'الجُمُعَة', nameSomali: 'Al-Jumucah', translation: 'Jimcaha', totalAyahs: 11, revelation: 'Madani', juz: 28, page: 553, versesSample: [] },
  { id: 63, nameArabic: 'المُنَافِقُون', nameSomali: 'Al-Munaafiquun', translation: 'Munaafaqiinta', totalAyahs: 11, revelation: 'Madani', juz: 28, page: 554, versesSample: [] },
  { id: 64, nameArabic: 'التَّغَابُن', nameSomali: 'At-Taghaabun', translation: 'Qasaarada & Faa\'iidada', totalAyahs: 18, revelation: 'Madani', juz: 28, page: 556, versesSample: [] },
  { id: 65, nameArabic: 'الطَّلَاق', nameSomali: 'At-Talaaq', translation: 'Furiinka', totalAyahs: 12, revelation: 'Madani', juz: 28, page: 558, versesSample: [] },
  { id: 66, nameArabic: 'التَّحْرِيم', nameSomali: 'At-Taxriim', translation: 'Xaaraaminta', totalAyahs: 12, revelation: 'Madani', juz: 28, page: 560, versesSample: [] },
  {
    id: 67,
    nameArabic: 'المُلْك',
    nameSomali: 'Al-Mulk',
    translation: 'Boqortooyada',
    totalAyahs: 30,
    revelation: 'Makki',
    juz: 29,
    page: 562,
    versesSample: [
      { number: 1, arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', somali: 'Waxaa barakoobay Eebaha gacantiisa ay ku jirto boqortooyadu, waana kan wax walba kara.' },
      { number: 2, arabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ', somali: 'Kaas oo abuuray geerida iyo nolosha si uu idiin imtixaano kiinna camal fiican, waana Adkaade Dambi-Dhaafe ah.' },
      { number: 3, arabic: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ', somali: 'Kaas oo abuuray toddoba cir oo is dul-saaran; kuma arkeysid abuurista Naxariistaha wax kala dhiman.' }
    ]
  },
  { id: 68, nameArabic: 'القَلَم', nameSomali: 'Al-Qalam', translation: 'Qalinka', totalAyahs: 52, revelation: 'Makki', juz: 29, page: 564, versesSample: [] },
  { id: 69, nameArabic: 'الحَاقَّة', nameSomali: 'Al-Xaaqqah', translation: 'Xaqiiqada Qiyaame', totalAyahs: 52, revelation: 'Makki', juz: 29, page: 566, versesSample: [] },
  { id: 70, nameArabic: 'المَعَارِج', nameSomali: 'Al-Macaarij', translation: 'Daraajooyinka', totalAyahs: 44, revelation: 'Makki', juz: 29, page: 568, versesSample: [] },
  { id: 71, nameArabic: 'نُوح', nameSomali: 'Nuux', translation: 'Nabi Nuux C.S.', totalAyahs: 28, revelation: 'Makki', juz: 29, page: 570, versesSample: [] },
  { id: 72, nameArabic: 'الجِنّ', nameSomali: 'Al-Jinn', translation: 'Jinka', totalAyahs: 28, revelation: 'Makki', juz: 29, page: 572, versesSample: [] },
  { id: 73, nameArabic: 'المُزَّمِّل', nameSomali: 'Al-Muzzammil', translation: 'Isku-Duubaha', totalAyahs: 20, revelation: 'Makki', juz: 29, page: 574, versesSample: [] },
  { id: 74, nameArabic: 'المُدَّثِّر', nameSomali: 'Al-Muddaththir', translation: 'Isku-Gadaamaha', totalAyahs: 56, revelation: 'Makki', juz: 29, page: 575, versesSample: [] },
  { id: 75, nameArabic: 'القِيَامَة', nameSomali: 'Al-Qiyaamah', translation: 'Qiyaamaha', totalAyahs: 40, revelation: 'Makki', juz: 29, page: 577, versesSample: [] },
  { id: 76, nameArabic: 'الإِنْسَان', nameSomali: 'Al-Insaan', translation: 'Aadamiga', totalAyahs: 31, revelation: 'Madani', juz: 29, page: 578, versesSample: [] },
  { id: 77, nameArabic: 'المُرْسَلَات', nameSomali: 'Al-Mursalaat', translation: 'Dabaylaha La Soo Diray', totalAyahs: 50, revelation: 'Makki', juz: 29, page: 580, versesSample: [] },
  { id: 78, nameArabic: 'النَّبَأ', nameSomali: 'An-Naba\'', translation: 'Warka Weyn', totalAyahs: 40, revelation: 'Makki', juz: 30, page: 582, versesSample: [] },
  { id: 79, nameArabic: 'النَّازِعَات', nameSomali: 'An-Naazicaat', translation: 'Malaa\'igta Nafta Soo Siibta', totalAyahs: 46, revelation: 'Makki', juz: 30, page: 583, versesSample: [] },
  { id: 80, nameArabic: 'عَبَسَ', nameSomali: 'Cabasa', translation: 'Wuu Waji-Duway', totalAyahs: 42, revelation: 'Makki', juz: 30, page: 585, versesSample: [] },
  { id: 81, nameArabic: 'التَّكْوِير', nameSomali: 'At-Takwiir', translation: 'Duubidda Qorraxda', totalAyahs: 29, revelation: 'Makki', juz: 30, page: 586, versesSample: [] },
  { id: 82, nameArabic: 'الانْفِطَار', nameSomali: 'Al-Infidaar', translation: 'Dilaaca Cirka', totalAyahs: 19, revelation: 'Makki', juz: 30, page: 587, versesSample: [] },
  { id: 83, nameArabic: 'المُطَفِّفِين', nameSomali: 'Al-Mudaffifiin', translation: 'Miisaan-Dhimayaasha', totalAyahs: 36, revelation: 'Makki', juz: 30, page: 587, versesSample: [] },
  { id: 84, nameArabic: 'الانْشِقَاق', nameSomali: 'Al-Inshiqaaq', translation: 'Kala-Dilaaca', totalAyahs: 25, revelation: 'Makki', juz: 30, page: 589, versesSample: [] },
  { id: 85, nameArabic: 'البُرُوج', nameSomali: 'Al-Buruuj', translation: 'Qalcaddaha Cirka', totalAyahs: 22, revelation: 'Makki', juz: 30, page: 590, versesSample: [] },
  { id: 86, nameArabic: 'الطَّارِق', nameSomali: 'At-Taariq', translation: 'Xiddigta Habeenkii', totalAyahs: 17, revelation: 'Makki', juz: 30, page: 591, versesSample: [] },
  { id: 87, nameArabic: 'الأَعْلَى', nameSomali: 'Al-Aclaa', translation: 'Kan Ugu Sarreeya', totalAyahs: 19, revelation: 'Makki', juz: 30, page: 591, versesSample: [] },
  { id: 88, nameArabic: 'الغَاشِيَة', nameSomali: 'Al-Ghaashiyah', translation: 'Dabooshaa (Qiyaamada)', totalAyahs: 26, revelation: 'Makki', juz: 30, page: 592, versesSample: [] },
  { id: 89, nameArabic: 'الفَجْر', nameSomali: 'Al-Fajr', translation: 'Waaberiga', totalAyahs: 30, revelation: 'Makki', juz: 30, page: 593, versesSample: [] },
  { id: 90, nameArabic: 'البَلَد', nameSomali: 'Al-Balad', translation: 'Magaalada (Makka)', totalAyahs: 20, revelation: 'Makki', juz: 30, page: 594, versesSample: [] },
  { id: 91, nameArabic: 'الشَّمْس', nameSomali: 'Ash-Shams', translation: 'Qorraxda', totalAyahs: 15, revelation: 'Makki', juz: 30, page: 595, versesSample: [] },
  { id: 92, nameArabic: 'اللَّيْل', nameSomali: 'Al-Layl', translation: 'Habeenka', totalAyahs: 21, revelation: 'Makki', juz: 30, page: 595, versesSample: [] },
  {
    id: 93,
    nameArabic: 'الضُّحَى',
    nameSomali: 'Ad-Duxaa',
    translation: 'Barqada',
    totalAyahs: 11,
    revelation: 'Makki',
    juz: 30,
    page: 596,
    versesSample: [
      { number: 1, arabic: 'وَالضُّحَىٰ', somali: 'Waxaan ku dhaartay barqada.' },
      { number: 2, arabic: 'وَاللَّيْلِ إِذَا سَجَىٰ', somali: 'Iyo habeenka markuu duldhaco oo xasilo.' },
      { number: 3, arabic: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ', somali: 'Kuma uusan tegin Eebahaa, kumana uusan nisin.' },
      { number: 4, arabic: 'وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ', somali: 'Aakhiraana kuu khayr roon adduunka hore.' },
      { number: 5, arabic: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ', somali: 'Wuxuuna ku siin doonaa Eebahaa adiguna waad raalli noqon doontaa.' }
    ]
  },
  {
    id: 94,
    nameArabic: 'الشَّرْح',
    nameSomali: 'Ash-Sharx',
    translation: 'Furnaanshaha Laabta',
    totalAyahs: 8,
    revelation: 'Makki',
    juz: 30,
    page: 596,
    versesSample: [
      { number: 1, arabic: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ', somali: 'Miyaanaan kuu waasicin laabtaada?' },
      { number: 5, arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', somali: 'Dhab ahaan dhibta waxaa la socda fudayd.' },
      { number: 6, arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', somali: 'Dhab ahaan dhibta waxaa la socda fudayd.' }
    ]
  },
  { id: 95, nameArabic: 'التِّين', nameSomali: 'At-Tiin', translation: 'Tiinka', totalAyahs: 8, revelation: 'Makki', juz: 30, page: 597, versesSample: [] },
  {
    id: 96,
    nameArabic: 'العَلَق',
    nameSomali: 'Al-Calaq',
    translation: 'Xinjirowga',
    totalAyahs: 19,
    revelation: 'Makki',
    juz: 30,
    page: 597,
    versesSample: [
      { number: 1, arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ', somali: 'Akhri adigoo kaashanaya magaca Eebahaaga abuuray.' },
      { number: 2, arabic: 'خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ', somali: 'Ee ka abuuray aadamiga xinjiro dhiig ah.' },
      { number: 3, arabic: 'اقْرَأْ وَرَبُّكَ الْأَكْرَمُ', somali: 'Akhri, Eebahaana waa kan ugu deeqsisan.' }
    ]
  },
  {
    id: 97,
    nameArabic: 'القَدْر',
    nameSomali: 'Al-Qadr',
    translation: 'Habeenka Qadarka',
    totalAyahs: 5,
    revelation: 'Makki',
    juz: 30,
    page: 598,
    versesSample: [
      { number: 1, arabic: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ', somali: 'Annagaa soo dejinnay Quraanka habeenka qadarka.' },
      { number: 2, arabic: 'وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ', somali: 'Ma taqaannaa waxa uu yahay habeenka qadarku?' },
      { number: 3, arabic: 'لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ', somali: 'Habeenka qadarku wuxuu ka khayr badan yahay kun bilood.' }
    ]
  },
  { id: 98, nameArabic: 'البَيِّنَة', nameSomali: 'Al-Bayyinah', translation: 'Caddaynta Cad', totalAyahs: 8, revelation: 'Madani', juz: 30, page: 598, versesSample: [] },
  { id: 99, nameArabic: 'الزَّلْزَلَة', nameSomali: 'Az-Zalzalah', translation: 'Gariirka Dhulka', totalAyahs: 8, revelation: 'Madani', juz: 30, page: 599, versesSample: [] },
  { id: 100, nameArabic: 'العَادِيَات', nameSomali: 'Al-Caadiyaat', translation: 'Fardaha Carara', totalAyahs: 11, revelation: 'Makki', juz: 30, page: 599, versesSample: [] },
  { id: 101, nameArabic: 'القَارِعَة', nameSomali: 'Al-Qaaricah', translation: 'Qaraacda Qiyaamaha', totalAyahs: 11, revelation: 'Makki', juz: 30, page: 600, versesSample: [] },
  { id: 102, nameArabic: 'التَّكَاثُر', nameSomali: 'At-Takaathur', translation: 'Kala-Badashada', totalAyahs: 8, revelation: 'Makki', juz: 30, page: 600, versesSample: [] },
  {
    id: 103,
    nameArabic: 'العَصْر',
    nameSomali: 'Al-Casr',
    translation: 'Waqtiga / Casarka',
    totalAyahs: 3,
    revelation: 'Makki',
    juz: 30,
    page: 601,
    versesSample: [
      { number: 1, arabic: 'وَالْعَصْرِ', somali: 'Waxaan ku dhaartay waqtiga.' },
      { number: 2, arabic: 'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ', somali: 'Dhab ahaan bini\'aadamku wuxuu ku sugan yahay qasaare.' },
      { number: 3, arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ', somali: 'Kuwa rumeeyay mooyee oo fala camal suubban, isuna dardaarma xaqa isuna dardaarma samirka.' }
    ]
  },
  { id: 104, nameArabic: 'الهُمَزَة', nameSomali: 'Al-Humazah', translation: 'Xanta & Ceebeynta', totalAyahs: 9, revelation: 'Makki', juz: 30, page: 601, versesSample: [] },
  { id: 105, nameArabic: 'الفِيل', nameSomali: 'Al-Fiil', translation: 'Maroodiga', totalAyahs: 5, revelation: 'Makki', juz: 30, page: 601, versesSample: [] },
  { id: 106, nameArabic: 'قُرَيْش', nameSomali: 'Quraysh', translation: 'Qabiilka Quraysh', totalAyahs: 4, revelation: 'Makki', juz: 30, page: 602, versesSample: [] },
  { id: 107, nameArabic: 'المَاعُون', nameSomali: 'Al-Maacuun', translation: 'Qalabka Guriga', totalAyahs: 7, revelation: 'Makki', juz: 30, page: 602, versesSample: [] },
  {
    id: 108,
    nameArabic: 'الكَوْثَر',
    nameSomali: 'Al-Kawthar',
    translation: 'Khayrka Badan',
    totalAyahs: 3,
    revelation: 'Makki',
    juz: 30,
    page: 602,
    versesSample: [
      { number: 1, arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', somali: 'Annagaa ku siinnay khayrka badan ee Al-Kawthar.' },
      { number: 2, arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', somali: 'Ee u tuko Eebahaaga dartiis, xoolana gowrac.' },
      { number: 3, arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', somali: 'Dhab ahaan kan ku neceb ayaa ah kan abtarka ah ee khayrka ka go\'an.' }
    ]
  },
  {
    id: 109,
    nameArabic: 'الكَافِرُون',
    nameSomali: 'Al-Kaafiruun',
    translation: 'Gaalada',
    totalAyahs: 6,
    revelation: 'Makki',
    juz: 30,
    page: 603,
    versesSample: [
      { number: 1, arabic: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ', somali: 'Waxaad dhahdaa: Kuwa gaalada ahow!' },
      { number: 2, arabic: 'لَا أَعْبُدُ مَا تَعْبُدُونَ', somali: 'Ma caabudayo waxaad caabudaysaan.' },
      { number: 6, arabic: 'لَكُمْ دِينُكُمْ وَلِيَ دِينِ', somali: 'Adinkuna diintiinna ayaad leedihiin, aniguna diintayda.' }
    ]
  },
  {
    id: 110,
    nameArabic: 'النَّصْر',
    nameSomali: 'An-Nasr',
    translation: 'Gargaarka Eebbe',
    totalAyahs: 3,
    revelation: 'Madani',
    juz: 30,
    page: 603,
    versesSample: [
      { number: 1, arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ', somali: 'Markuu yimaaddo gargaarka Allaah iyo guushu.' },
      { number: 2, arabic: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا', somali: 'Ood aragto dadka oo diinta Allaah u gelaya koox-koox.' },
      { number: 3, arabic: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا', somali: 'U tasbiixso adigoo Eebahaa ku mahadinaya, dambi-dhaafna weydii, Isagu waa toobad-aqbale.' }
    ]
  },
  {
    id: 111,
    nameArabic: 'المَسَد',
    nameSomali: 'Al-Masad',
    translation: 'Xadhigga Xariirta',
    totalAyahs: 5,
    revelation: 'Makki',
    juz: 30,
    page: 603,
    versesSample: [
      { number: 1, arabic: 'تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ', somali: 'Halaageen labada gacmood ee Abii Lahab, isna wuu halaagmay.' }
    ]
  },
  {
    id: 112,
    nameArabic: 'الإِخْلَاص',
    nameSomali: 'Al-Ikhlaas',
    translation: 'Daacadnimada',
    totalAyahs: 4,
    revelation: 'Makki',
    juz: 30,
    page: 604,
    versesSample: [
      { number: 1, arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', somali: 'Waxaad dhahdaa: Eebbe waa Mid keli ah.' },
      { number: 2, arabic: 'اللَّهُ الصَّمَدُ', somali: 'Eebbe waa kan loo baahanyahay (ee aan cidna u baahnayn).' },
      { number: 3, arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', somali: 'Wax ma dhalin, lamana dhalin.' },
      { number: 4, arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', somali: 'Cid la mid ahina ma jirto.' }
    ]
  },
  {
    id: 113,
    nameArabic: 'الفَلَق',
    nameSomali: 'Al-Falaq',
    translation: 'Waaga',
    totalAyahs: 5,
    revelation: 'Makki',
    juz: 30,
    page: 604,
    versesSample: [
      { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', somali: 'Waxaad dhahdaa: Waxaan magangalayaa Eebaha waaga.' },
      { number: 2, arabic: 'مِن شَرِّ مَا خَلَقَ', somali: 'Sharkii wuxuu abuuray oo dhan.' },
      { number: 3, arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', somali: 'Iyo sharka habeenka marka uu madoobaado.' },
      { number: 4, arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', somali: 'Iyo sharka kuwa candhuufta ku tufaya guntimaha (sixiroolayaasha).' },
      { number: 5, arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', somali: 'Iyo sharka xaasidka marka uu wax xaasido.' }
    ]
  },
  {
    id: 114,
    nameArabic: 'النَّاس',
    nameSomali: 'An-Naas',
    translation: 'Dadka',
    totalAyahs: 6,
    revelation: 'Makki',
    juz: 30,
    page: 604,
    versesSample: [
      { number: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', somali: 'Waxaad dhahdaa: Waxaan magangalayaa Barbaariyaha dadka.' },
      { number: 2, arabic: 'مَلِكِ النَّاسِ', somali: 'Boqorka dadka.' },
      { number: 3, arabic: 'إِلَٰهِ النَّاسِ', somali: 'Ilaaha dadka.' },
      { number: 4, arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', somali: 'Sharkii waswaasiyaha dhuunta ee dib u gurta.' },
      { number: 5, arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', somali: 'Kaas oo wax ku waswaasiya laabta aadamiga.' },
      { number: 6, arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ', somali: 'Hadday jinka ka mid yihiin ama insaankaba.' }
    ]
  }
];

// Audio URL for verse or surah recitation
export function getSurahAudioUrl(surahNumber: number): string {
  const pad = String(surahNumber).padStart(3, '0');
  // High quality MP3 recitation by Mishary Rashid Alafasy from global Quran CDN
  return `https://server8.mp3quran.net/afs/${pad}.mp3`;
}

// In-memory cache for fetched complete surahs
const fullSurahCache: Record<number, QuranVerse[]> = {};

/**
 * Fetch complete verses for ANY surah from API with fallbacks
 */
export async function fetchCompleteSurahVerses(surahNumber: number): Promise<QuranVerse[]> {
  if (fullSurahCache[surahNumber] && fullSurahCache[surahNumber].length > 0) {
    return fullSurahCache[surahNumber];
  }

  const surahMeta = SURAH_LIST_ALL.find((s) => s.id === surahNumber);
  const localVerses = surahMeta?.versesSample || [];

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,so.abduh`);
    if (res.ok) {
      const data = await res.json();
      if (data?.data && Array.isArray(data.data) && data.data.length >= 2) {
        const arabicAyahs = data.data[0].ayahs;
        const somaliAyahs = data.data[1].ayahs;
        const combined: QuranVerse[] = arabicAyahs.map((ay: any, idx: number) => ({
          number: ay.numberInSurah || idx + 1,
          arabic: ay.text,
          somali: somaliAyahs[idx]?.text || '',
          page: ay.page || (surahMeta?.page ? surahMeta.page + Math.floor(idx / 12) : 1),
          juz: ay.juz || surahMeta?.juz || 1,
        }));
        fullSurahCache[surahNumber] = combined;
        return combined;
      }
    }
  } catch {
    // offline or blocked network fallback
  }

  return localVerses.map((v, i) => ({
    ...v,
    page: v.page || (surahMeta?.page ? surahMeta.page + Math.floor(i / 10) : 1),
    juz: v.juz || surahMeta?.juz || 1,
  }));
}
