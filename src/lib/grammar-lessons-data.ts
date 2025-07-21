
import type { GrammarLesson } from './data';

export const grammarLessons: GrammarLesson[] = [
  // N5 Lessons
  {
    id: 'gl-n5-1',
    title: 'XはYです (X is Y)',
    level: 'N5',
    explanation: 'The most basic sentence structure. It states that X is Y. 「は」 (wa) is the topic marker, and 「です」 (desu) is the polite copula (is/am/are).',
    examples: [
      '私は学生です。 (Watashi wa gakusei desu.) - I am a student.',
      'これは本です。 (Kore wa hon desu.) - This is a book.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-2',
    title: 'Question Sentences with か',
    level: 'N5',
    explanation: 'The particle「か」(ka) is added to the end of a sentence to turn it into a question. No need to change word order.',
    examples: [
      'あれはあなたの傘ですか。 (Are wa anata no kasa desu ka?) - Is that your umbrella?',
      '田中さんは日本人ですか。 (Tanaka-san wa nihonjin desu ka?) - Is Mr. Tanaka Japanese?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-3',
    title: 'The Particle の (Possession)',
    level: 'N5',
    explanation: 'The particle「の」(no) connects two nouns. It can show possession (like an apostrophe ‘s’) or add more information.',
    examples: [
      'これは私の本です。 (Kore wa watashi no hon desu.) - This is my book.',
      '日本語の先生 (Nihongo no sensei) - Teacher of Japanese.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-4',
    title: 'Verbs with ます (Masu-form)',
    level: 'N5',
    explanation: 'The -masu form is the polite, non-past (present/future) tense for verbs. It is used in formal situations.',
    examples: [
      '毎日、新聞を読みます。 (Mainichi, shinbun o yomimasu.) - I read the newspaper every day.',
      '明日、京都へ行きます。 (Ashita, Kyōto e ikimasu.) - I will go to Kyoto tomorrow.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-5',
    title: 'Particles を, へ, に, で',
    level: 'N5',
    explanation: 'を (o) marks the direct object. へ (e) marks direction. に (ni) marks a specific time or destination. で (de) marks the location of an action.',
    examples: [
      'パンを食べます。 (Pan o tabemasu.) - I eat bread.',
      '日本へ行きます。 (Nihon e ikimasu.) - I am going to Japan.',
      '７時に起きます。 (Shichi-ji ni okimasu.) - I wake up at 7 o\'clock.',
      '図書館で勉強します。 (Toshokan de benkyō shimasu.) - I study at the library.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-6',
    title: 'Verb Conjugation: Past Tense (ました)',
    level: 'N5',
    explanation: 'To change a verb in the polite -masu form to the past tense, you change ます (masu) to ました (mashita).',
    examples: [
      '昨日、映画を見ました。 (Kinō, eiga o mimashita.) - I watched a movie yesterday.',
      '先週、大阪へ行きました。 (Senshū, Ōsaka e ikimashita.) - I went to Osaka last week.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-7',
    title: 'Verb Conjugation: Negatives (ません, ませんでした)',
    level: 'N5',
    explanation: 'To make a polite verb negative, change ます (masu) to ません (masen). For past negative, change it to ませんでした (masen deshita).',
    examples: [
      'お酒を飲みません。 (Osake o nomimasen.) - I don\'t drink alcohol.',
      '今朝、何も食べませんでした。 (Kesa, nani mo tabemasen deshita.) - I didn\'t eat anything this morning.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-8',
    title: 'Inviting with ～ませんか and ～ましょう',
    level: 'N5',
    explanation: 'ませんか (masen ka) is a polite way to invite someone ("Won\'t you...?"). ましょう (mashō) is used to suggest doing something together ("Let\'s...").',
    examples: [
      '一緒に映画を見ませんか。 (Issho ni eiga o mimasen ka?) - Won\'t you watch a movie with me?',
      'レストランで食べましょう。 (Resutoran de tabemashō.) - Let\'s eat at a restaurant.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-9',
    title: 'Adjectives: い-adjectives and な-adjectives',
    level: 'N5',
    explanation: 'Japanese has two types of adjectives. い-adjectives end in い (e.g., 高い). な-adjectives require な when they modify a noun (e.g., きれいな).',
    examples: [
      'これは高い本です。 (Kore wa takai hon desu.) - This is an expensive book.',
      '富士山はきれいな山です。 (Fujisan wa kirei na yama desu.) - Mt. Fuji is a beautiful mountain.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-10',
    title: 'The Te-form (～て) for Joining Verbs',
    level: 'N5',
    explanation: 'The te-form of a verb can be used to connect multiple actions in a sequence.',
    examples: [
      '朝、シャワーを浴びて、ご飯を食べて、学校へ行きます。 (Asa, shawā o abite, gohan o tabete, gakkō e ikimasu.) - In the morning, I take a shower, eat breakfast, and go to school.',
    ],
    read: false,
  },
  // N4 Lessons
  {
    id: 'gl-n4-1',
    title: 'Potential Form (can do)',
    level: 'N4',
    explanation: 'The potential form expresses ability. For ru-verbs, change -ru to -rareru. For u-verbs, change the final -u to -eru. It can also be formed with「ことができます」.',
    examples: [
      '私は漢字が読めます。 (Watashi wa kanji ga yomemasu.) - I can read Kanji.',
      '彼は寿司が食べられます。 (Kare wa sushi ga taberaremasu.) - He can eat sushi.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-2',
    title: 'Giving and Receiving: あげる, くれる, もらう',
    level: 'N4',
    explanation: 'あげる (ageru) is for giving to others. くれる (kureru) is for someone giving to you or your in-group. もらう (morau) is for receiving.',
    examples: [
      '私は妹にプレゼントをあげました。 (Watashi wa imōto ni purezento o agemashita.) - I gave a present to my little sister.',
      '友達が私に本をくれました。 (Tomodachi ga watashi ni hon o kuremashita.) - My friend gave me a book.',
      '私は母に花をもらいました。 (Watashi wa haha ni hana o moraimashita.) - I received flowers from my mother.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-3',
    title: 'Comparisons: ～より and ～の方が',
    level: 'N4',
    explanation: 'Use「AはBより (adjective) です」to say A is more (adjective) than B. Use「BよりAの方が (adjective) です」to emphasize A.',
    examples: [
      '電車はバスより速いです。 (Densha wa basu yori hayai desu.) - The train is faster than the bus.',
      '犬と猫と、どちらの方が好きですか。 (Inu to neko to, dochira no hō ga suki desu ka?) - Between dogs and cats, which do you like more?',
    ],
    read: false,
  },
  {
    id: 'gl-n4-4',
    title: 'Expressing "I think": ～と思います',
    level: 'N4',
    explanation: 'Use the plain form of a verb or adjective followed by「と思います」(to omoimasu) to express your opinion.',
    examples: [
      '明日は雨が降ると思います。 (Ashita wa ame ga furu to omoimasu.) - I think it will rain tomorrow.',
      'この映画は面白いと思います。 (Kono eiga wa omoshiroi to omoimasu.) - I think this movie is interesting.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-5',
    title: 'Conditional Forms: と, ば, たら, なら',
    level: 'N4',
    explanation: 'と for natural consequences. ば for general conditions. たら for specific, one-time conditions. なら for context-based suggestions.',
    examples: [
      '春になると、桜が咲きます。 (Haru ni naru to, sakura ga sakimasu.) - When spring comes, the cherry blossoms bloom.',
      '安ければ、買います。 (Yasukereba, kaimasu.) - If it\'s cheap, I will buy it.',
      '日本へ行ったら、寿司を食べたいです。 (Nihon e ittara, sushi o tabetai desu.) - If/When I go to Japan, I want to eat sushi.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-6',
    title: 'Volitional Form (Let\'s...)',
    level: 'N4',
    explanation: 'The volitional form is the plain version of ～ましょう. For ru-verbs, change -ru to -you. For u-verbs, change the final -u to -ou.',
    examples: [
      '映画を見よう。 (Eiga o miyō.) - Let\'s watch a movie.',
      '一緒に行こう。 (Issho ni ikō.) - Let\'s go together.',
    ],
    read: false,
  },
  // N3 Lessons
  {
    id: 'gl-n3-1',
    title: 'Passive Voice: ～(ら)れる',
    level: 'N3',
    explanation: 'The passive voice is used when the subject is acted upon. It can show inconvenience (the "suffering passive"). For ru-verbs, add -rareru. For u-verbs, change the final -u to -areru.',
    examples: [
      '私は先生に褒められました。 (Watashi wa sensei ni homeraremashita.) - I was praised by the teacher.',
      '弟にケーキを食べられました。 (Otōto ni kēki o taberaremashita.) - My cake was eaten by my little brother (and I\'m not happy about it).',
    ],
    read: false,
  },
  {
    id: 'gl-n3-2',
    title: 'Causative Form: ～(さ)せる',
    level: 'N3',
    explanation: 'The causative form expresses "to make" or "to let" someone do something. For ru-verbs, add -saseru. For u-verbs, change the final -u to -aseru.',
    examples: [
      '先生は学生に宿題をたくさんさせた。 (Sensei wa gakusei ni shukudai o takusan saseta.) - The teacher made the students do a lot of homework.',
      '母は子供に野菜を食べさせた。 (Haha wa kodomo ni yasai o tabesaseta.) - The mother made her child eat vegetables.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-3',
    title: 'Causative-Passive: ～(さ)せられる',
    level: 'N3',
    explanation: 'This form combines the causative and passive, meaning "to be made to do" something, often against one\'s will.',
    examples: [
      '私は部長に遅くまで残業させられた。 (Watashi wa buchō ni osoku made zangyō saserareta.) - I was made to work overtime until late by my department manager.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-4',
    title: 'Expressing "seems like": ～そう, ～よう, ～らしい, ～みたい',
    level: 'N3',
    explanation: 'These express different kinds of conjecture. そう for visual evidence. よう for logical deduction. らしい for hearsay. みたい is a casual version of よう.',
    examples: [
      '雨が降りそうです。 (Ame ga furisō desu.) - It looks like it\'s going to rain.',
      '彼は病気のようです。 (Kare wa byōki no yō desu.) - It seems that he is sick.',
      '田中さんは、来月結婚するらしいです。 (Tanaka-san wa, raigetsu kekkon suru rashii desu.) - I heard that Mr. Tanaka is getting married next month.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-5',
    title: 'Thanks to / Because of: ～おかげで, ～せいで',
    level: 'N3',
    explanation: 'おかげで is used for positive outcomes ("thanks to..."). せいで is used for negative outcomes ("because of...", with a nuance of blame).',
    examples: [
      '先生のおかげで、試験に合格しました。 (Sensei no okage de, shiken ni gōkaku shimashita.) - Thanks to my teacher, I passed the exam.',
      '事故のせいで、電車が遅れました。 (Jiko no sei de, densha ga okuremashita.) - Because of the accident, the train was late.',
    ],
    read: false,
  },
  // N2 Lessons
  {
    id: 'gl-n2-1',
    title: 'Expressing obligation: ～べき, ～ものだ',
    level: 'N2',
    explanation: 'べきだ expresses a strong "should" based on opinion or morality. ものだ expresses something that is naturally or socially expected.',
    examples: [
      '学生はもっと勉強するべきだ。 (Gakusei wa motto benkyō suru beki da.) - Students should study more.',
      '人の陰口を言うものではない。 (Hito no kageguchi o iu mono dewa nai.) - You are not supposed to talk behind people\'s backs.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-2',
    title: 'Despite / Although: ～のに, ～にもかかわらず',
    level: 'N2',
    explanation: 'のに expresses a feeling of surprise or complaint when the result is contrary to what was expected. にもかかわらず is a more formal version.',
    examples: [
      '約束したのに、彼は来なかった。 (Yakusoku shita noni, kare wa konakatta.) - Even though he promised, he didn\'t come.',
      '大雨にもかかわらず、試合は行われた。 (Ōame nimo kakawarazu, shiai wa okonawareta.) - The game was held despite the heavy rain.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-3',
    title: 'As / From the standpoint of: ～として',
    level: 'N2',
    explanation: 'として marks the role, capacity, or status of someone or something.',
    examples: [
      '彼は医者として、多くの命を救った。 (Kare wa isha toshite, Ōku no inochi o sukutta.) - As a doctor, he saved many lives.',
      'これはお土産として人気があります。 (Kore wa omiyage toshite ninki ga arimasu.) - This is popular as a souvenir.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-4',
    title: 'Not necessarily: ～わけではない',
    level: 'N2',
    explanation: 'This grammar point is used for partial negation. It means "it\'s not that..." or "it doesn\'t necessarily mean that...".',
    examples: [
      '高い料理がすべて美味しいわけではない。 (Takai ryōri ga subete oishii wake dewa nai.) - It\'s not that all expensive food is delicious.',
    ],
    read: false,
  },
  // N1 Lessons
  {
    id: 'gl-n1-1',
    title: 'On the occasion of: ～に際して, ～にあたって',
    level: 'N1',
    explanation: 'These are formal expressions used for special, important, once-in-a-lifetime events. They mean "at the time of" or "on the occasion of".',
    examples: [
      '開店に際して、多くの友人からお祝いをいただいた。 (Kaiten ni saishite, Ōku no yūjin kara oiwai o itadaita.) - On the occasion of my store opening, I received congratulations from many friends.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-2',
    title: 'Without...: ～なくしては',
    level: 'N1',
    explanation: 'This expresses that if X did not exist, Y would be impossible. It strongly emphasizes the necessity of X.',
    examples: [
      '皆様の協力なくしては、この成功はありませんでした。 (Minasama no kyōryoku nakushite wa, kono seikō wa arimasen deshita.) - Without everyone\'s cooperation, this success would not have been possible.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-3',
    title: 'Just because...: ～からといって',
    level: 'N1',
    explanation: 'Used to state that a reason is not sufficient for a particular conclusion. "Just because A, it doesn\'t mean B."',
    examples: [
      '日本人だからといって、誰もが漢字を完璧に知っているわけではない。 (Nihonjin da kara to itte, daremo ga kanji o kanpeki ni shitte iru wake dewa nai.) - Just because someone is Japanese doesn\'t mean they all know kanji perfectly.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-4',
    title: 'Is nothing other than: ～にほかならない',
    level: 'N1',
    explanation: 'A very strong, formal expression used to assert that something is precisely X and nothing else.',
    examples: [
      'このプロジェクトの失敗は、準備不足の結果にほかならない。 (Kono purojekuto no shippai wa, junbi busoku no kekka ni hokanaranai.) - The failure of this project is nothing other than the result of a lack of preparation.',
    ],
    read: false,
  }
];
