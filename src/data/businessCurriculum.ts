export interface BusinessModule {
  id: string;
  title: string;
  category: 'suuqgeyn' | 'maaliyad' | 'startups' | 'hoggaamin' | 'ecommerce';
  categoryLabel: string;
  level: 'Heer Sare' | 'Heer Caalami' | 'Xirfad Gaar ah';
  summary: string;
  duration: string;
  lessons: {
    title: string;
    description: string;
    framework: string;
    practicalRule: string;
  }[];
}

export const BUSINESS_MODULES: BusinessModule[] = [
  {
    id: 'biz_mod_marketing',
    title: 'Suuq-geynta Casriga ah ee Heer Caalami (Global Growth & Inbound Funnels)',
    category: 'suuqgeyn',
    categoryLabel: 'Suuq-geyn & Korriin',
    level: 'Heer Caalami',
    duration: '45 daqiiqo',
    summary: 'Baro sida shirkadaha caalamiga ahi u dhisaan suuq-geyn dhijitaal ah oo keenta macaamiil joogto ah adigoo isticmaalaya falanqaynta xogta iyo dhuumaha iibka (Sales Funnels).',
    lessons: [
      {
        title: '1. Dhisidda Dhuumaha Iibka (The 4-Stage Conversion Funnel: TOFU, MOFU, BOFU)',
        description: 'Macaamiishu hal mar ma iibsadaan; waxay maraan 3 heer: Ogaansho (Top of Funnel), Qiimeyn (Middle of Funnel), iyo Go\'aan-qaadasho (Bottom of Funnel). Heer kasta wuxuu u baahan yahay nuxur iyo fariin gaar ah.',
        framework: 'Awareness → Consideration → Decision → Retention',
        practicalRule: 'Ha isku dayin inaad toos wax uga iibiso qof aan weli ku aqoon; marka hore xalli dhibaato yar oo bilaash ah si aad kalsooni u hesho.',
      },
      {
        title: '2. Xisaabinta Qiimaha Macmiilka (LTV vs CAC Mastery)',
        description: 'Sharciga dahabiga ah ee ganacsiga casriga ah: Qiimaha Nololeed ee Macmiilka (LTV) waa inuu ugu yaraan 3 jeer ka sarreeyaa Kharashka ku baxay helitaankiisa (CAC). Haddii LTV:CAC uu ka yar yahay 3, ganacsigu wuxuu halis ugu jiraa khasaare.',
        framework: 'LTV = ARPU × Margin × Customer Lifespan | Target: LTV / CAC ≥ 3.0',
        practicalRule: 'Haddii ay kugu kacdo $10 inaad hesho macmiil, waa in macmiilkaasi kaa faa\'iideeyaa ugu yaraan $30 muddada uu kula joogo.',
      },
      {
        title: '3. Qoraalka Iibka ee Saamaynta Leh (High-Converting Copywriting & PAS Formula)',
        description: 'Qoraalka suuq-geynta ugu fiican wuxuu raacaa qaaciddada PAS: Dhibaatada taabo (Problem), Kicin oo weynee saamaynteeda (Agitate), ka dibna soo bandhig Xalkaaga (Solution) sida daawada kaliya ee jirta.',
        framework: 'Problem (Xanuunka) → Agitate (Kicinta) → Solve (Xalka Gaarka ah)',
        practicalRule: 'Dadku ma iibsadaan alaabtaada sababtoo ah astaamaheeda (Features), waxay u iibsadaan natiijada ay noloshooda ku yeelanayso (Benefits & Transformation).',
      },
    ],
  },
  {
    id: 'biz_mod_finance',
    title: 'Maamulka Maaliyadda & Xisaabaadka Heer Caalami (Corporate Finance & Cash Flow)',
    category: 'maaliyad',
    categoryLabel: 'Maaliyad & Maalgashi',
    level: 'Heer Sare',
    duration: '50 daqiiqo',
    summary: 'Fahamka qoto-dheer ee 3-da warbixinood ee maaliyadeed (P&L, Balance Sheet, Cash Flow), dhisidda miisaaniyadda, iyo maamulka socodka lacagta caddaanka ah.',
    lessons: [
      {
        title: '1. Kala Duwanaanshaha Faa\'iidada (Profit) & Socodka Lacagta (Cash Flow)',
        description: 'Shirkado badan oo warqadda ugu muuqda kuwa faa\'iido samaynaya ayaa musalafa sababtoo ah waxay waayeen lacag caddaan ah oo ay ku bixiyaan mushahaarka iyo kirada. Faa\'iidada waa ra\'yi, laakiin lacagta caddaanka ahi waa xaqiiqo dhab ah.',
        framework: 'Operating Cash Flow = Net Income + Non-Cash Charges − Working Capital Needs',
        practicalRule: 'Daawo "Cash Runway"-gaaga: inta bilood ee shirkaddu noolaan karto haddii uusan hal doolar oo cusub soo gelin.',
      },
      {
        title: '2. Halbeegyada Dhaqaale ee Muhiimka ah (Unit Economics & Contribution Margin)',
        description: 'Kahor inta aadan ballaarin ganacsiga, hubi in hal unug (one transaction) uu faa\'iido samaynayo marka laga jaro kharashka tooska ah. Ganacsi hal kiilo ku khasaaraya ma noqon karo mid faa\'iido sameeya haddii uu tan iibiyo.',
        framework: 'Contribution Margin = Price − Variable Costs | Contribution Margin Ratio = CM / Price',
        practicalRule: 'Weligaa ha ku xallin khasaaraha cutubka (unit loss) koror dhanka mugga ah (volume expansion).',
      },
      {
        title: '3. Nidaamka Saamiyada & Maalgashiga (Cap Table & Valuation)',
        description: 'Sida shirkadaha yaryar u soo jiitaan maalgashadayaasha (Angel Investors & Venture Capital), sida loo xisaabiyo qiimaha shirkadda kahor maalgashiga (Pre-money Valuation) iyo kadib (Post-money Valuation).',
        framework: 'Post-Money Valuation = Pre-Money Valuation + Investment Amount',
        practicalRule: 'Ha bixin in ka badan 15-20% saamiga shirkadda wareegga koowaad ee maalgashiga si aadan u lumin gacan ku haynta mustaqbalka.',
      },
    ],
  },
  {
    id: 'biz_mod_startups',
    title: 'Dhisidda Shirkadaha Bilowga ah (Lean Startup & Product-Market Fit)',
    category: 'startups',
    categoryLabel: 'Startups & Hal-abuur',
    level: 'Heer Caalami',
    duration: '40 daqiiqo',
    summary: 'Manhajka casriga ah ee Silicon Valley: sidee fikrad loogu beddelaa MVP, loona gaaraa Product-Market Fit adigoo aan khasaarin waqti iyo lacag badan.',
    lessons: [
      {
        title: '1. Alaabta Ugu Yar ee Shaqaynaysa (The Minimum Viable Product - MVP)',
        description: 'Ha dhisin 6 bilood alaab aad ku riyoonayso adigoo aan suuqa weydiin. Dhis nuqulka ugu fudud ee xallin kara dhibaatada ugu weyn, ka dibna u gey dadka si aad uga hesho jawaab-celin dhab ah.',
        framework: 'Build → Measure → Learn Loop (Eric Ries Lean Methodology)',
        practicalRule: 'Haddii aadan ka xishoonayn nuqulkii ugu horreeyay ee alaabtaada, waxaad suuqa soo gashay xilli aad u dambeeya.',
      },
      {
        title: '2. Imtixaanka Product-Market Fit (The 40% Sean Ellis Rule)',
        description: 'Sideed ku ogaataa inaad gaartay xilligii ganacsiga la weyneyn lahaa? Weydii macaamiishaada: "Sidee dareemi lahayd haddii alaabtani suuqa ka baxdo berri?" Haddii 40%+ ay dhahaan "Aad baan uga xumaan lahaa", waxaad haysataa Product-Market Fit.',
        framework: 'Sean Ellis Test: If ≥40% "Very Disappointed" → Scale Confidently',
        practicalRule: 'Ha bilaabin xayeysiisyada lacagta badan ku baxdo ilaa aad ka xaqiijiso in macaamiishu jecel yihiin alaabta oo ay ku talinayaan.',
      },
    ],
  },
  {
    id: 'biz_mod_leadership',
    title: 'Hoggaaminta Kooxaha Heer Caalami (Executive Leadership & High-Output Management)',
    category: 'hoggaamin',
    categoryLabel: 'Hoggaamin & Maamul',
    level: 'Heer Sare',
    duration: '35 daqiiqo',
    summary: 'Farsamooyinka ay madaxda shirkadaha Fortune 500 u maamulaan kooxahooda, u qaybiyaan hawlaha (delegation), una dejiyaan yoolalka cad (OKRs).',
    lessons: [
      {
        title: '1. Nidaamka OKRs (Objectives and Key Results)',
        description: 'Nidaamka ay Google, Intel, iyo shirkadaha ugu waaweyn dunidu u maamulaan hadafyadooda. "Objective" waa meesha aad rabto inaad gaarto (aragti dhiirigelin leh), "Key Results" waa 3-5 cabbir oo tiro ah oo caddaynaya inaad gaartay.',
        framework: 'Objective (Maxaan doonaynaa?) + Key Results (Sideen ku ogaanaynaa inaan gaarnay?)',
        practicalRule: 'Haddii cabbirku uusan lahayn lambar la cabbiri karo, ma aha Key Result ee waa hawl caadi ah.',
      },
      {
        title: '2. Xirfadda U-wakiilashada Hawlaha (Effective Delegation Framework)',
        description: 'Hoggaamiyaha wanaagsani wax walba isagu ma qabto; wuxuu dhisaa dadka kale. Wuxuu dejiyaa natiijada la rabo (Outcome), wuxuuna qofka siiyaa xorriyadda uu ku gaaro (Autonomy).',
        framework: 'Context > Control (Sii macnaha guud iyo hadafka, ha faragelin tillaabo kasta)',
        practicalRule: 'Haddii qof kooxdaada ka mid ahi uu hawl ku qaban karo 70% sida aad adigu u qaban lahayd, u wakiilo isaga!',
      },
    ],
  },
];
