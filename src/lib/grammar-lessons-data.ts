
import type { GrammarLesson } from './data';

export const grammarLessons: GrammarLesson[] = [
  // N5 Grammar Lessons
  // --- Basic Sentence Structure & Copulas ---
  {
    id: 'gl-n5-1',
    title: 'です (desu) – Polite "to be"',
    level: 'N5',
    explanation: 'The most basic sentence structure, stating that A is B. 「です」 is the polite copula (is/am/are).',
    examples: [
      '私は学生です。 (Watashi wa gakusei desu.) - I am a student.',
      'これは本です。 (Kore wa hon desu.) - This is a book.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-2',
    title: 'じゃないです / ではありません – Negative of です',
    level: 'N5',
    explanation: 'The negative form of です. じゃないです is more common in speech, while ではありません is more formal.',
    examples: [
      '私は学生じゃないです。 (Watashi wa gakusei janai desu.) - I am not a student.',
      'これはペンではありません。 (Kore wa pen dewa arimasen.) - This is not a pen.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-3',
    title: 'でした (deshita) – Past tense of です',
    level: 'N5',
    explanation: 'The past tense of です, used to say something "was" or "were".',
    examples: [
      '昨日は雨でした。 (Kinou wa ame deshita.) - It was rainy yesterday.',
      '彼は先生でした。 (Kare wa sensei deshita.) - He was a teacher.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-4',
    title: 'じゃなかったです / ではありませんでした – Past negative of です',
    level: 'N5',
    explanation: 'The past negative form of です, meaning "was not" or "were not".',
    examples: [
      '昨日は晴れじゃなかったです。 (Kinou wa hare janakatta desu.) - It was not sunny yesterday.',
    ],
    read: false,
  },
  // --- Sentence Enders ---
  {
    id: 'gl-n5-5',
    title: '～か (ka) – Question marker',
    level: 'N5',
    explanation: 'The particle「か」(ka) is added to the end of a sentence to turn it into a question.',
    examples: [
      'あれはあなたの傘ですか。 (Are wa anata no kasa desu ka?) - Is that your umbrella?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-6',
    title: '～の (no) – Nominalizer / explanation',
    level: 'N5',
    explanation: 'The particle「の」(no) can turn a verb phrase into a noun or be used at the end of a sentence to offer an explanation or seek clarification.',
    examples: [
      '走るのは楽しいです。 (Hashiru no wa tanoshii desu.) - Running is fun.',
      '頭が痛いんです。 (Atama ga itain desu.) - It\'s that my head hurts. (explaining)',
    ],
    read: false,
  },
  {
    id: 'gl-n5-7',
    title: '～ね (ne) – Seeking agreement',
    level: 'N5',
    explanation: 'Added to the end of a sentence to seek agreement or confirmation, similar to "..., right?" or "..., isn\'t it?".',
    examples: [
      '今日は暑いですね。 (Kyou wa atsui desu ne.) - It\'s hot today, isn\'t it?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-8',
    title: '～よ (yo) – Adding emphasis',
    level: 'N5',
    explanation: 'Used at the end of a sentence to emphasize a point or to state new information the speaker believes the listener doesn\'t know.',
    examples: [
      'このケーキは美味しいですよ。 (Kono keeki wa oishii desu yo.) - This cake is delicious, I tell you!',
    ],
    read: false,
  },
  // --- Verb Forms ---
  {
    id: 'gl-n5-9',
    title: '～ます / ～ません – Polite verb forms',
    level: 'N5',
    explanation: 'The -masu form is the polite, non-past (present/future) affirmative tense for verbs. The -masen form is the negative.',
    examples: [
      '毎日、新聞を読みます。 (Mainichi, shinbun o yomimasu.) - I read the newspaper every day.',
      '私は肉を食べません。 (Watashi wa niku o tabemasen.) - I don\'t eat meat.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-10',
    title: '～ました / ～ませんでした – Polite past tense',
    level: 'N5',
    explanation: 'The polite past tense verb forms. -mashita is affirmative (did), and -masen deshita is negative (did not).',
    examples: [
      '昨日、映画を見ました。 (Kinou, eiga o mimashita.) - I watched a movie yesterday.',
      '今朝、何も食べませんでした。 (Kesa, nani mo tabemasen deshita.) - I didn\'t eat anything this morning.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-11',
    title: '～て form – Request / connecting actions',
    level: 'N5',
    explanation: 'A crucial verb form used for requests (～てください), connecting sequential actions, and describing ongoing actions (～ています).',
    examples: [
      'ちょっと待ってください。 (Chotto matte kudasai.) - Please wait a moment.',
      '朝起きて、歯を磨きます。 (Asa okite, ha o migakimasu.) - I wake up in the morning and then brush my teeth.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-12',
    title: '～ない form – Plain negative',
    level: 'N5',
    explanation: 'The plain (casual) negative form of verbs, e.g., tabenai (don\'t eat). It\'s the base for many other grammar points.',
    examples: [
      '時間がないから行かない。 (Jikan ga nai kara ikanai.) - I won\'t go because there\'s no time.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-13',
    title: '～た form – Plain past',
    level: 'N5',
    explanation: 'The plain (casual) past tense form of verbs, e.g., tabeta (ate). It\'s used with friends and as a base for other grammar.',
    examples: [
      '昨日、何食べた？ (Kinou, nani tabeta?) - What did you eat yesterday?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-14',
    title: 'Dictionary form (食べる、行く)',
    level: 'N5',
    explanation: 'The basic, unconjugated form of a verb as found in a dictionary. It\'s the casual non-past affirmative form.',
    examples: [
      '本を読むのが好きです。 (Hon o yomu no ga suki desu.) - I like reading books.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-15',
    title: 'Verb groups (1, 2, irregular)',
    level: 'N5',
    explanation: 'Japanese verbs are categorized into three groups which determine their conjugation patterns. Group 1 (u-verbs), Group 2 (ru-verbs), and Irregular (する, 来る).',
    examples: [
      'Group 1: 書く (kaku) -> 書きます (kakimasu)',
      'Group 2: 食べる (taberu) -> 食べます (tabemasu)',
    ],
    read: false,
  },
  // --- Particles ---
  {
    id: 'gl-n5-16',
    title: 'は (wa) – Topic marker',
    level: 'N5',
    explanation: 'Marks the topic of the sentence. "As for A, ...".',
    examples: [
      '私はマイクです。 (Watashi wa Maiku desu.) - I am Mike.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-17',
    title: 'が (ga) – Subject marker',
    level: 'N5',
    explanation: 'Marks the subject of an action or description. It often identifies new information or answers a question word.',
    examples: [
      '猫が好きです。 (Neko ga suki desu.) - I like cats.',
      '雨が降っています。 (Ame ga futte imasu.) - It is raining.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-18',
    title: 'を (o) – Object marker',
    level: 'N5',
    explanation: 'Marks the direct object of a transitive verb. It indicates the "thing" being acted upon.',
    examples: [
      'パンを食べます。 (Pan o tabemasu.) - I eat bread.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-19',
    title: 'に (ni) – Time / indirect object / destination',
    level: 'N5',
    explanation: 'A versatile particle indicating a point in time (at 3:00), an indirect object (to someone), or a destination of movement.',
    examples: [
      '三時に会いましょう。 (Sanji ni aimashou.) - Let\'s meet at 3 o\'clock.',
      '友達に本をあげます。 (Tomodachi ni hon o agemasu.) - I will give a book to my friend.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-20',
    title: 'へ (e) – Direction (alternative to に)',
    level: 'N5',
    explanation: 'Marks the direction of movement. It emphasizes the journey, while「に」emphasizes the arrival point.',
    examples: [
      '日本へ行きます。 (Nihon e ikimasu.) - I am going to Japan.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-21',
    title: 'で (de) – Place of action / method',
    level: 'N5',
    explanation: 'Indicates the location where an action takes place, or the means/method by which an action is performed.',
    examples: [
      '図書館で勉強します。 (Toshokan de benkyou shimasu.) - I study at the library.',
      'バスで学校に行きます。 (Basu de gakkou ni ikimasu.) - I go to school by bus.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-22',
    title: 'と (to) – "And" / "with"',
    level: 'N5',
    explanation: 'Used to connect two or more nouns in an exhaustive list ("and"), or to indicate someone you do something with ("with").',
    examples: [
      '犬と猫が好きです。 (Inu to neko ga suki desu.) - I like dogs and cats.',
      '友達と映画を見ます。 (Tomodachi to eiga o mimasu.) - I watch a movie with a friend.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-23',
    title: 'も (mo) – "Also / too"',
    level: 'N5',
    explanation: 'Means "also" or "too." It replaces the particles「は」(wa) and「が」(ga).',
    examples: [
      '私も学生です。 (Watashi mo gakusei desu.) - I am also a student.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-24',
    title: 'の (no) – Possession / noun modification',
    level: 'N5',
    explanation: 'Connects two nouns, showing possession or attribution, similar to "of" or an apostrophe ‘s’ in English.',
    examples: [
      'これは私の本です。 (Kore wa watashi no hon desu.) - This is my book.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-25',
    title: 'や (ya) – Listing examples (non-exhaustive)',
    level: 'N5',
    explanation: 'Used to list two or more nouns as examples, implying that there are other items in the list. Often used with など.',
    examples: [
      '机の上に本やペンがあります。 (Tsukue no ue ni hon ya pen ga arimasu.) - There are things like books and pens on the desk.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-26',
    title: 'など (nado) – "etc."',
    level: 'N5',
    explanation: 'Means "and so on" or "etc." It is often used after a list of nouns with the particle や.',
    examples: [
      '机の上に本やペンなどがあります。 (Tsukue no ue ni hon ya pen nado ga arimasu.) - There are things like books, pens, etc. on the desk.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-27',
    title: 'から (kara) – From',
    level: 'N5',
    explanation: 'Indicates a starting point in time or place.',
    examples: [
      '学校は九時からです。 (Gakkou wa kuji kara desu.) - School is from 9 o\'clock.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-28',
    title: 'まで (made) – Until',
    level: 'N5',
    explanation: 'Indicates an ending point in time or place.',
    examples: [
      '銀行は三時までです。 (Ginkou wa sanji made desu.) - The bank is open until 3 o\'clock.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-29',
    title: 'より (yori) – "Than" (for comparisons)',
    level: 'N5',
    explanation: 'Used in comparative sentences to mean "than".',
    examples: [
      '電車はバスより速いです。 (Densha wa basu yori hayai desu.) - The train is faster than the bus.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-30',
    title: 'ほど (hodo) – "To the extent of" (comparisons)',
    level: 'N5',
    explanation: 'Used in negative sentences to make a comparison, meaning "not as ... as".',
    examples: [
      'バスは電車ほど速くないです。 (Basu wa densha hodo hayakunai desu.) - The bus is not as fast as the train.',
    ],
    read: false,
  },
  // --- Common Structures ---
  {
    id: 'gl-n5-31',
    title: 'A は B です (A wa B desu)',
    level: 'N5',
    explanation: 'The fundamental sentence structure to state "A is B".',
    examples: [
      'これはリンゴです。 (Kore wa ringo desu.) - This is an apple.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-32',
    title: 'A は B が好き / きらい (suki / kirai) – Like / dislike',
    level: 'N5',
    explanation: 'Used to express likes and dislikes. The object of the feeling is marked by が, not を.',
    examples: [
      '私は犬が好きです。 (Watashi wa inu ga suki desu.) - I like dogs.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-33',
    title: 'A は B がわかる (wakaru) – Understand',
    level: 'N5',
    explanation: 'Used to express understanding. The thing that is understood is marked by が.',
    examples: [
      '私は日本語が少しわかります。 (Watashi wa nihongo ga sukoshi wakarimasu.) - I understand a little Japanese.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-34',
    title: 'A は B がじょうず / へた (jouzu / heta) – Good / poor at',
    level: 'N5',
    explanation: 'Used to describe skill level. The skill is marked by が.',
    examples: [
      '彼はテニスが上手です。 (Kare wa tenisu ga jouzu desu.) - He is good at tennis.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-35',
    title: 'A は B より C のほうが～ (B yori C no hou ga) – C is more ~ than B',
    level: 'N5',
    explanation: 'A common structure for making comparisons between two items.',
    examples: [
      'バスより電車の方が速いです。 (Basu yori densha no hou ga hayai desu.) - The train is faster than the bus.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-36',
    title: 'A は B とおなじです (to onaji desu) – A is the same as B',
    level: 'N5',
    explanation: 'Used to state that two items are the same.',
    examples: [
      'これとそれは同じです。 (Kore to sore wa onaji desu.) - This and that are the same.',
    ],
    read: false,
  },
  // --- Existence & Location ---
  {
    id: 'gl-n5-37',
    title: '～がある (ga aru) – There is (inanimate)',
    level: 'N5',
    explanation: 'Used to state the existence of non-living things.',
    examples: [
      '机の上に本があります。 (Tsukue no ue ni hon ga arimasu.) - There is a book on the desk.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-38',
    title: '～がいる (ga iru) – There is (animate)',
    level: 'N5',
    explanation: 'Used to state the existence of living things (people, animals).',
    examples: [
      '公園に子供がいます。 (Kouen ni kodomo ga imasu.) - There are children in the park.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-39',
    title: '～は～にある / いる (ni aru / iru) – Exists in/at (location)',
    level: 'N5',
    explanation: 'Specifies the location of something or someone. The location is marked by に.',
    examples: [
      '銀行は駅の前にあります。 (Ginkou wa eki no mae ni arimasu.) - The bank is in front of the station.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-40',
    title: '～がほしい (ga hoshii) – Want something',
    level: 'N5',
    explanation: 'Used to express desire for a specific item. The desired item is marked by が.',
    examples: [
      '新しい車が欲しいです。 (Atarashii kuruma ga hoshii desu.) - I want a new car.',
    ],
    read: false,
  },
  // --- Time & Quantity ---
  {
    id: 'gl-n5-41',
    title: '～時 / ～分 – Telling time',
    level: 'N5',
    explanation: 'Used with numbers to tell time. 時 (ji) for hours, 分 (fun/pun) for minutes.',
    examples: [
      '今、何時ですか。- 三時半です。 (Ima, nanji desu ka. - Sanji han desu.) - What time is it now? - It\'s 3:30.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-42',
    title: '～曜日 / ～日 / ～月 / ～年 – Dates',
    level: 'N5',
    explanation: 'Counters for days of the week, days of the month, months, and years.',
    examples: [
      '今日は金曜日です。 (Kyou wa kinyoubi desu.) - Today is Friday.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-43',
    title: '毎～ (mai) – Every ~',
    level: 'N5',
    explanation: 'A prefix meaning "every," used with time words like day (毎日), week (毎週), and year (毎年).',
    examples: [
      '毎日、日本語を勉強します。 (Mainichi, nihongo o benkyou shimasu.) - I study Japanese every day.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-44',
    title: 'とき (時) (toki) – When',
    level: 'N5',
    explanation: 'Used after a verb or adjective to mean "when".',
    examples: [
      '暇な時、何をしますか。 (Hima na toki, nani o shimasu ka?) - What do you do when you have free time?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-45',
    title: '～前 (mae) – Before',
    level: 'N5',
    explanation: 'Used with a noun or dictionary-form verb to mean "before".',
    examples: [
      '食事の前に手を洗います。 (Shokuji no mae ni te o araimasu.) - I wash my hands before a meal.',
      '寝る前に本を読みます。 (Neru mae ni hon o yomimasu.) - I read a book before sleeping.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-46',
    title: '～後 (ato) – After',
    level: 'N5',
    explanation: 'Used with a noun or past-tense (た-form) verb to mean "after".',
    examples: [
      'ご飯を食べた後、テレビを見ます。 (Gohan o tabeta ato, terebi o mimasu.) - After eating, I watch TV.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-47',
    title: '～間 (aida) – While / during',
    level: 'N5',
    explanation: 'Indicates a period of time during which something happens.',
    examples: [
      '夏休みの間、旅行しました。 (Natsuyasumi no aida, ryokou shimashita.) - I traveled during summer vacation.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-48',
    title: '～くらい / ～ぐらい (kurai / gurai) – About (approximate)',
    level: 'N5',
    explanation: 'Indicates an approximate amount of time, distance, or quantity.',
    examples: [
      '駅から家まで10分ぐらいです。 (Eki kara ie made juppun gurai desu.) - It\'s about 10 minutes from the station to my house.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-49',
    title: '～だけ (dake) – Only',
    level: 'N5',
    explanation: 'Means "only" or "just".',
    examples: [
      '水だけ飲みます。 (Mizu dake nomimasu.) - I only drink water.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-50',
    title: '～しか～ない (shika...nai) – Nothing but ~',
    level: 'N5',
    explanation: 'Used with a negative verb to mean "only" or "nothing but," often with a nuance of "no more than this."',
    examples: [
      '百円しかありません。 (Hyaku-en shika arimasen.) - I only have 100 yen.',
    ],
    read: false,
  },
  // --- Requests, Desires, & Suggestions ---
  {
    id: 'gl-n5-51',
    title: '～てください (te kudasai) – Please do ~',
    level: 'N5',
    explanation: 'The te-form of a verb followed by ください is a polite request.',
    examples: [
      'これを読んでください。 (Kore o yonde kudasai.) - Please read this.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-52',
    title: '～ないでください (nai de kudasai) – Please don’t do ~',
    level: 'N5',
    explanation: 'The nai-form of a verb followed by でください is a polite negative request.',
    examples: [
      'ここでタバコを吸わないでください。 (Koko de tabako o suwanaide kudasai.) - Please don\'t smoke here.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-53',
    title: '～ましょう (mashou) – Let’s ~',
    level: 'N5',
    explanation: 'Attaching「ましょう」(mashou) to the verb stem is used to suggest doing something together.',
    examples: [
      '一緒に昼ご飯を食べましょう。 (Issho ni hirugohan o tabemashou.) - Let\'s eat lunch together.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-54',
    title: '～ませんか (masen ka) – Won’t you ~ ?',
    level: 'N5',
    explanation: 'A polite way to invite someone to do something. "Won\'t you...?" or "How about...?".',
    examples: [
      '一緒に映画を見ませんか。 (Issho ni eiga o mimasen ka?) - Won\'t you watch a movie with me?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-55',
    title: '～たいです (tai desu) – Want to do ~',
    level: 'N5',
    explanation: 'Used with the verb stem to express one\'s own desire to do something.',
    examples: [
      '日本へ行きたいです。 (Nihon e ikitai desu.) - I want to go to Japan.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-56',
    title: '～たくないです (takunai desu) – Don’t want to do ~',
    level: 'N5',
    explanation: 'The negative form of ～たいです, expressing that one does not want to do something.',
    examples: [
      '宿題をしたくないです。 (Shukudai o shitakunai desu.) - I don\'t want to do my homework.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-57',
    title: '～たかったです (takatta desu) – Wanted to do ~',
    level: 'N5',
    explanation: 'The past tense of ～たいです, used to say you wanted to do something.',
    examples: [
      '昨日、映画が見たかったです。 (Kinou, eiga ga mitakatta desu.) - I wanted to see the movie yesterday.',
    ],
    read: false,
  },
  // --- Adjectives ---
  {
    id: 'gl-n5-58',
    title: 'い-adjectives (takai, oishii)',
    level: 'N5',
    explanation: 'Adjectives that end with い. They conjugate to show past/negative forms.',
    examples: [
      'この山は高いです。 (Kono yama wa takai desu.) - This mountain is high.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-59',
    title: 'な-adjectives (shizuka, kirei)',
    level: 'N5',
    explanation: 'Adjectives that require な when they directly modify a noun. They use です for conjugation.',
    examples: [
      '静かな部屋 (Shizuka na heya) - A quiet room.',
      'この部屋は静かです。 (Kono heya wa shizuka desu.) - This room is quiet.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-60',
    title: '～くて / ～で – Connecting adjectives',
    level: 'N5',
    explanation: 'Used to connect multiple adjectives in one sentence. Use くて for i-adjectives and で for na-adjectives.',
    examples: [
      'この部屋は広くて、きれいです。 (Kono heya wa hirokute, kirei desu.) - This room is spacious and clean.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-61',
    title: '～そうです (sou desu) – Looks like',
    level: 'N5',
    explanation: 'Attached to an adjective stem to express that something appears to be a certain way based on visual evidence.',
    examples: [
      'このケーキは美味しそうですね。 (Kono keeki wa oishisou desu ne.) - This cake looks delicious, doesn\'t it?',
    ],
    read: false,
  },
  // --- Other useful grammar ---
  {
    id: 'gl-n5-62',
    title: '～てもいいです (te mo ii desu) – It\'s okay to / may',
    level: 'N5',
    explanation: 'Used to give permission. "You may do..." or "It\'s okay if you do...".',
    examples: [
      '写真を撮ってもいいですか。 (Shashin o totte mo ii desu ka?) - May I take a picture?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-63',
    title: '～てはいけません (te wa ikemasen) – Must not',
    level: 'N5',
    explanation: 'A strong prohibition. "You must not do...".',
    examples: [
      'ここで泳いではいけません。 (Koko de oyoide wa ikemasen.) - You must not swim here.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-64',
    title: '～ことができる (koto ga dekiru) – Can do ~',
    level: 'N5',
    explanation: 'A way to express ability. Verb dictionary form + ことができる.',
    examples: [
      '私はピアノを弾くことができます。 (Watashi wa piano o hiku koto ga dekimasu.) - I can play the piano.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-65',
    title: '～ながら (nagara) – While doing ~',
    level: 'N5',
    explanation: 'Attached to the verb stem to indicate that two actions are being performed simultaneously by the same person.',
    examples: [
      '音楽を聞きながら勉強します。 (Ongaku o kikinagara benkyou shimasu.) - I study while listening to music.',
    ],
    read: false,
  },
  // --- Question Words & Adverbs ---
  {
    id: 'gl-n5-66',
    title: 'どうして / なぜ / なんで (doushite / naze / nande) – Why',
    level: 'N5',
    explanation: 'Question words for "why". なぜ is the most formal, なんで is the most casual.',
    examples: [
      'どうして日本語を勉強していますか。 (Doushite nihongo o benkyou shite imasu ka?) - Why are you studying Japanese?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-67',
    title: 'どう / どうやって / どんな (dou / douyatte / donna) – How / what kind of',
    level: 'N5',
    explanation: 'どう asks "how?". どうやって asks "how?" (method). どんな asks "what kind of?".',
    examples: [
      'これはどうやって使いますか。 (Kore wa douyatte tsukaimasu ka?) - How do you use this?',
      'どんな音楽が好きですか。 (Donna ongaku ga suki desu ka?) - What kind of music do you like?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-68',
    title: 'どこ / だれ / なに / いつ – Question words',
    level: 'N5',
    explanation: 'The basic 5W1H question words: where, who, what, when.',
    examples: [
      'これは何ですか。 (Kore wa nan desu ka?) - What is this?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-69',
    title: 'もう (mou) – Already',
    level: 'N5',
    explanation: 'Used with a past-tense verb to mean "already".',
    examples: [
      'もう宿題をしましたか。 (Mou shukudai o shimashita ka?) - Have you already done your homework?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-70',
    title: 'まだ (mada) – Not yet / still',
    level: 'N5',
    explanation: 'Used with a negative verb to mean "not yet", or with an affirmative verb to mean "still".',
    examples: [
      'まだ食べていません。 (Mada tabete imasen.) - I have not eaten yet.',
      'まだ雨が降っています。 (Mada ame ga futte imasu.) - It is still raining.',
    ],
    read: false,
  },
  // --- More Advanced N5 Structures ---
  {
    id: 'gl-n5-71',
    title: '～そうです (hearsay) (sou desu) – I heard that ~',
    level: 'N5',
    explanation: 'Used with plain form verbs and adjectives to report something you heard. Not to be confused with "looks like" そうです.',
    examples: [
      '天気予報によると、明日は雨だそうです。 (Tenkeyohou ni yoru to, ashita wa ame da sou desu.) - According to the weather forecast, I heard it will rain tomorrow.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-72',
    title: '～たり～たりする (tari...tari suru) – Listing example actions',
    level: 'N5',
    explanation: 'Used to list multiple actions as examples, without implying a strict sequence. Verbs are in the past-tense (た) form.',
    examples: [
      '週末は、本を読んだり、映画を見たりします。 (Shuumatsu wa, hon o yondari, eiga o mitari shimasu.) - On weekends, I do things like reading books and watching movies.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-73',
    title: '～ことがある (koto ga aru) – Have done before',
    level: 'N5',
    explanation: 'Used with the past-tense (た-form) verb to talk about past experiences.',
    examples: [
      '日本へ行ったことがありますか。 (Nihon e itta koto ga arimasu ka?) - Have you ever been to Japan?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-74',
    title: '～つもりです (tsumori desu) – Plan to do ~',
    level: 'N5',
    explanation: 'Expresses an intention or plan. Used with the dictionary form of a verb.',
    examples: [
      '夏休みに国へ帰るつもりです。 (Natsuyasumi ni kuni e kaeru tsumori desu.) - I plan to return to my country during summer vacation.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-75',
    title: '～でしょう / ～だろう (deshou / darou) – Probably ~',
    level: 'N5',
    explanation: 'Expresses probability or a guess. でしょう is polite, while だろう is casual.',
    examples: [
      '明日は晴れるでしょう。 (Ashita wa hareru deshou.) - It will probably be sunny tomorrow.',
    ],
    read: false,
  },
];

  