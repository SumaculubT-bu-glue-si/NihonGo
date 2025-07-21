
import type { GrammarLesson } from './data';

export const grammarLessons: GrammarLesson[] = [
  // N5 Grammar Lessons
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
  // N4 Grammar Lessons
  {
    id: 'gl-n4-1',
    title: '～ている – Ongoing action or result',
    level: 'N4',
    explanation: 'Expresses an ongoing action (is doing), a continuous state (is married), or a state resulting from a past action (the window is open).',
    examples: [
      '今、本を読んでいます。 (Ima, hon o yonde imasu.) - I am reading a book now.',
      '窓が開いています。 (Mado ga aite imasu.) - The window is open.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-2',
    title: '～てしまう – Completion or regret',
    level: 'N4',
    explanation: 'Indicates the completion of an action, often with a sense of it being final, regrettable, or unintentional.',
    examples: [
      '宿題を全部してしまいました。 (Shukudai o zenbu shite shimaimashita.) - I finished all my homework.',
      '電車の中にかさを忘れてしまいました。 (Densha no naka ni kasa o wasurete shimaimashita.) - I unfortunately left my umbrella on the train.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-3',
    title: '～ておく – Do something in advance',
    level: 'N4',
    explanation: 'Indicates an action performed in preparation for something else. Often shortened to ～とく in casual speech.',
    examples: [
      '旅行の前に、ホテルを予約しておきます。 (Ryokou no mae ni, hoteru o yoyaku shite okimasu.) - I will book the hotel in advance before the trip.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-4',
    title: '～てみる – Try doing something',
    level: 'N4',
    explanation: 'Used to express trying something out to see what it\'s like.',
    examples: [
      'この新しいケーキを食べてみたいです。 (Kono atarashii keeki o tabete mitai desu.) - I want to try eating this new cake.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-5',
    title: '～てあげる / ～てくれる / ～てもらう – Giving and receiving actions',
    level: 'N4',
    explanation: 'Verbs for giving and receiving actions. あげる (for others), くれる (to me/my group), もらう (I receive the favor).',
    examples: [
      '友達に日本語を教えてあげました。 (Tomodachi ni nihongo o oshiete agemashita.) - I taught my friend Japanese.',
      '先生が私に本を貸してくれました。 (Sensei ga watashi ni hon o kashite kuremashita.) - The teacher lent me a book.',
      '私は姉に手伝ってもらいました。 (Watashi wa ane ni tetsudatte moraimashita.) - I had my older sister help me.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-6',
    title: '～ようと思う (you to omou) – I plan to / I think I will',
    level: 'N4',
    explanation: 'Expresses an intention or plan that was just decided. It\'s a softer intention than ～つもりです.',
    examples: [
      '週末、映画を見に行こうと思います。 (Shuumatsu, eiga o mi ni ikou to omoimasu.) - I think I\'ll go see a movie this weekend.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-7',
    title: 'Volitional form (行こう, 食べよう)',
    level: 'N4',
    explanation: 'The "let\'s" or "shall we" form of a verb. Used to make suggestions or express one\'s will to do something.',
    examples: [
      'さあ、食べよう！ (Saa, tabeyou!) - Okay, let\'s eat!',
      '一緒に勉強しよう。 (Issho ni benkyou shiyou.) - Let\'s study together.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-8',
    title: '～ば form – Conditional “if”',
    level: 'N4',
    explanation: 'A conditional form. For verbs, change the final "u" to "eba". For i-adjectives, change "i" to "kereba".',
    examples: [
      '時間があれば、行きます。 (Jikan ga areba, ikimasu.) - If I have time, I will go.',
      '安ければ、買います。 (Yasukereba, kaimasu.) - If it\'s cheap, I\'ll buy it.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-9',
    title: '～たら – “If/when” conditional',
    level: 'N4',
    explanation: 'A conditional form based on the past-tense (た-form). It can be used for a wider range of situations than ～ば.',
    examples: [
      '日本へ行ったら、京都を訪れたいです。 (Nihon e ittara, Kyouto o otozuretai desu.) - If/When I go to Japan, I want to visit Kyoto.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-10',
    title: '～ながら (nagara) – While doing',
    level: 'N4',
    explanation: 'Attached to the verb stem to show two actions are performed by the same person at the same time. The main action is the second verb.',
    examples: [
      '音楽を聞きながら、宿題をします。 (Ongaku o kikinagara, shukudai o shimasu.) - I do my homework while listening to music.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-11',
    title: '～そうだ (sou da) – Looks like (conjecture)',
    level: 'N4',
    explanation: 'Used to express a guess based on what you see or feel. "It looks like..." or "It seems...".',
    examples: [
      '雨が降りそうです。 (Ame ga furisou desu.) - It looks like it\'s going to rain.',
      'この料理は美味しそうです。 (Kono ryouri wa oishisou desu.) - This dish looks delicious.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-12',
    title: '～ようにする (you ni suru) – Make an effort to',
    level: 'N4',
    explanation: 'Indicates making a conscious effort to do something regularly.',
    examples: [
      '毎日、野菜を食べるようにしています。 (Mainichi, yasai o taberu you ni shite imasu.) - I make an effort to eat vegetables every day.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-13',
    title: '～ようになる (you ni naru) – Reach a state where',
    level: 'N4',
    explanation: 'Indicates a change over time where one becomes able to do something they previously couldn\'t.',
    examples: [
      '日本語が話せるようになりました。 (Nihongo ga hanaseru you ni narimashita.) - I came to be able to speak Japanese.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-14',
    title: 'Passive form (書かれる、食べられる)',
    level: 'N4',
    explanation: 'Used when the subject is receiving an action. The "passive voice".',
    examples: [
      '私は先生に褒められました。 (Watashi wa sensei ni homeraremashita.) - I was praised by the teacher.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-15',
    title: 'Causative form (書かせる、食べさせる)',
    level: 'N4',
    explanation: 'Used to express "to make someone do" or "to let someone do" something.',
    examples: [
      '母は私に部屋を掃除させました。 (Haha wa watashi ni heya o souji sasemashita.) - My mother made me clean my room.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-16',
    title: '～すぎる (sugiru) – Too much',
    level: 'N4',
    explanation: 'Attached to a verb stem or adjective stem to mean that something is excessive.',
    examples: [
      '食べすぎて、お腹が痛いです。 (Tabesugite, onaka ga itai desu.) - I ate too much and my stomach hurts.',
      'この問題は難しすぎます。 (Kono mondai wa muzukashisugimasu.) - This problem is too difficult.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-17',
    title: '～やすい / ～にくい (yasui / nikui) – Easy to / hard to',
    level: 'N4',
    explanation: 'Attached to a verb stem to express that something is easy or difficult to do.',
    examples: [
      'このペンは書きやすいです。 (Kono pen wa kakiyasui desu.) - This pen is easy to write with.',
      '彼の字は読みにくいです。 (Kare no ji wa yominikui desu.) - His handwriting is hard to read.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-18',
    title: '～ようだ / ～みたい (you da / mitai) – Seems like / looks like',
    level: 'N4',
    explanation: 'Expresses that something seems to be the case based on sensory evidence. みたい is more conversational.',
    examples: [
      '彼は風邪をひいたようです。 (Kare wa kaze o hiita you desu.) - It seems he has caught a cold.',
      'あの人は人形みたいだ。 (Ano hito wa ningyou mitai da.) - That person is like a doll.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-19',
    title: '～らしい (rashii) – Apparently / it seems that',
    level: 'N4',
    explanation: 'Indicates that you are reporting information you have heard, but are not completely certain about.',
    examples: [
      '田中さんは、来月結婚するらしいです。 (Tanaka-san wa, raigetsu kekkon suru rashii desu.) - I hear Tanaka-san is getting married next month.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-20',
    title: '～のに (noni) – Although / even though',
    level: 'N4',
    explanation: 'Used to connect two clauses where the second is an unexpected or contrary result of the first. Often implies frustration or surprise.',
    examples: [
      '一生懸命勉強したのに、試験に落ちました。 (Isshoukenmei benkyou shita noni, shiken ni ochimashita.) - Even though I studied hard, I failed the exam.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-21',
    title: '～そうに / ～そうな / ～そうだ – Appears to',
    level: 'N4',
    explanation: 'This is the adverbial (～そうに), noun-modifying (～そうな), and sentence-ending (～そうだ) use of the "looks like" grammar point.',
    examples: [
      '彼女は楽しそうに話します。 (Kanojo wa tanoshisou ni hanashimasu.) - She speaks cheerfully (in a way that looks fun).',
      '美味しそうなケーキですね。 (Oishisou na keeki desu ne.) - That looks like a delicious cake, doesn\'t it?',
    ],
    read: false,
  },
  {
    id: 'gl-n4-22',
    title: '～ばかり (bakari) – Just did / only',
    level: 'N4',
    explanation: 'Can mean "just finished doing" when following a た-form verb, or "only" / "nothing but" when following a noun or て-form verb.',
    examples: [
      '今、食べたばかりです。 (Ima, tabeta bakari desu.) - I just ate now.',
      '彼は遊んでばかりいる。 (Kare wa asonde bakari iru.) - He does nothing but play.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-23',
    title: '～まま (mama) – As is / without change',
    level: 'N4',
    explanation: 'Indicates that a state or condition remains unchanged while another action takes place.',
    examples: [
      '窓を開けたまま寝てしまった。 (Mado o aketa mama nete shimatta.) - I fell asleep with the window open.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-24',
    title: '～たほうがいい (ta hou ga ii) – You’d better',
    level: 'N4',
    explanation: 'A way of giving strong advice. Used with the past-tense (た-form) of a verb.',
    examples: [
      'もっと野菜を食べたほうがいいですよ。 (Motto yasai o tabeta hou ga ii desu yo.) - You had better eat more vegetables.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-25',
    title: '～ないほうがいい (nai hou ga ii) – You’d better not',
    level: 'N4',
    explanation: 'The negative version of ～たほうがいい, for advising against an action.',
    examples: [
      '夜、一人で歩かないほうがいい。 (Yoru, hitori de arukanai hou ga ii.) - You\'d better not walk alone at night.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-26',
    title: '～てもいい / ～てはいけない – Permission / prohibition',
    level: 'N4',
    explanation: 'A review of giving permission ("you may do") and prohibiting an action ("you must not do").',
    examples: [
      'ここで写真を撮ってもいいですか。 (Koko de shashin o totte mo ii desu ka?) - Is it okay to take pictures here?',
    ],
    read: false,
  },
  {
    id: 'gl-n4-27',
    title: '～なさい (nasai) – Command (soft)',
    level: 'N4',
    explanation: 'A command form used by superiors to inferiors (e.g., parent to child). It is attached to the verb stem.',
    examples: [
      '早く寝なさい。 (Hayaku nenasai.) - Go to sleep early.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-28',
    title: '～なければならない (nakereba naranai) – Must',
    level: 'N4',
    explanation: 'Expresses obligation or necessity. "Must do..." or "Have to do...".',
    examples: [
      '明日、早く起きなければなりません。 (Ashita, hayaku okinakereba narimasen.) - I must wake up early tomorrow.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-29',
    title: '～なくてもいい (nakutemo ii) – Don’t have to',
    level: 'N4',
    explanation: 'Expresses a lack of necessity. "It\'s okay if you don\'t..." or "You don\'t have to...".',
    examples: [
      '靴を脱がなくてもいいです。 (Kutsu o nuganakutemo ii desu.) - You don\'t have to take off your shoes.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-30',
    title: '～ことがある (koto ga aru) – Have done / experience',
    level: 'N4',
    explanation: 'Used with the past-tense (た-form) verb to describe past experiences.',
    examples: [
      '富士山に登ったことがあります。 (Fujisan ni nobotta koto ga arimasu.) - I have climbed Mt. Fuji before.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-31',
    title: '～ことにする (koto ni suru) – Decide to',
    level: 'N4',
    explanation: 'Indicates a decision made by the speaker.',
    examples: [
      '明日からジョギングすることにします。 (Ashita kara jogingu suru koto ni shimasu.) - I\'ve decided to start jogging from tomorrow.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-32',
    title: '～ことになる (koto ni naru) – It has been decided that',
    level: 'N4',
    explanation: 'Indicates a decision that was made by someone else, or a situation that has come about.',
    examples: [
      '来月、大阪へ出張することになりました。 (Raigetsu, Oosaka e shucchou suru koto ni narimashita.) - It has been decided that I will go on a business trip to Osaka next month.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-33',
    title: '～つもり (tsumori) – Intend to',
    level: 'N4',
    explanation: 'Expresses a firm intention or plan. Used with the dictionary form.',
    examples: [
      '大学を卒業したら、国へ帰るつもりです。 (Daigaku o sotsugyou shitara, kuni e kaeru tsumori desu.) - I intend to return to my country after graduating from university.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-34',
    title: '～かもしれない (kamoshirenai) – Might / maybe',
    level: 'N4',
    explanation: 'Expresses possibility. It is less certain than ～でしょう.',
    examples: [
      '彼はもう帰ったかもしれません。 (Kare wa mou kaetta kamoshiremasen.) - He might have already gone home.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-35',
    title: '～でしょう (deshou) – Probably / I suppose',
    level: 'N4',
    explanation: 'Used to express a guess or prediction. The polite form of だろう.',
    examples: [
      '明日は晴れるでしょう。 (Ashita wa hareru deshou.) - It will probably be sunny tomorrow.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-36',
    title: '～中 (chuu) – In the middle of',
    level: 'N4',
    explanation: 'A suffix attached to nouns to mean "in the middle of" or "currently".',
    examples: [
      'ただ今、会議中です。 (Tadaima, kaigi-chuu desu.) - I am in a meeting right now.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-37',
    title: '～ところ (tokoro) – About to / in the middle of / just finished',
    level: 'N4',
    explanation: 'Used with different verb forms to indicate a point in time relative to an action.',
    examples: [
      'これから食べるところです。 (Korekara taberu tokoro desu.) - I am just about to eat.',
      '今、調べているところです。 (Ima, shirabete iru tokoro desu.) - I am in the middle of looking it up now.',
      'たった今、着いたところです。 (Tattaima, tsuita tokoro desu.) - I have just arrived.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-38',
    title: '～ば～ほど (ba~hodo) – The more ~ the more ~',
    level: 'N4',
    explanation: 'A structure used to show that as one thing increases, so does another.',
    examples: [
      '日本語は、勉強すればするほど面白くなります。 (Nihongo wa, benkyou sureba suru hodo omoshiroku narimasu.) - The more you study Japanese, the more interesting it becomes.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-39',
    title: '～前に (mae ni) – Before',
    level: 'N4',
    explanation: 'Indicates doing something before another action or event.',
    examples: [
      '寝る前に、歯を磨きます。 (Neru mae ni, ha o migakimasu.) - I brush my teeth before sleeping.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-40',
    title: '～後で (ato de) – After',
    level: 'N4',
    explanation: 'Indicates doing something after another action or event has finished.',
    examples: [
      '仕事が終わった後で、飲みに行きます。 (Shigoto ga owatta ato de, nomi ni ikimasu.) - After work finishes, I will go drinking.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-41',
    title: '～とき (toki) – When',
    level: 'N4',
    explanation: 'Used to indicate the time when something happens.',
    examples: [
      '子供の時、よく川で泳ぎました。 (Kodomo no toki, yoku kawa de oyogimashita.) - When I was a child, I often swam in the river.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-42',
    title: '～たばかり (ta bakari) – Just finished',
    level: 'N4',
    explanation: 'Indicates that an action has just recently been completed from the speaker\'s perspective.',
    examples: [
      '日本に来たばかりで、まだ何も分かりません。 (Nihon ni kita bakari de, mada nani mo wakarimasen.) - I have just come to Japan, so I don\'t understand anything yet.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-43',
    title: '～間 / ～間に (aida / aida ni) – While / during',
    level: 'N4',
    explanation: 'Aida describes something that occurs throughout a period, while aida ni describes something that happens at one point during that period.',
    examples: [
      'お母さんが昼寝をしている間に、子供たちは遊びに行った。 (Okaasan ga hirune o shite iru aida ni, kodomotachi wa asobi ni itta.) - While the mother was napping, the children went out to play.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-44',
    title: '～ように言う (you ni iu) – Tell (someone) to do',
    level: 'N4',
    explanation: 'Used for reporting indirect commands or requests.',
    examples: [
      '先生は学生にもっと勉強するように言いました。 (Sensei wa gakusei ni motto benkyou suru you ni iimashita.) - The teacher told the students to study more.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-45',
    title: '～より～のほうが (yori~no hou ga) – Comparison',
    level: 'N4',
    explanation: 'The structure "AよりBのほうが" means "B is more ... than A".',
    examples: [
      '車より電車の方が早くて便利です。 (Kuruma yori densha no hou ga hayakute benri desu.) - Trains are faster and more convenient than cars.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-46',
    title: '～しか～ない (shika~nai) – Nothing but',
    level: 'N4',
    explanation: 'Emphasizes that there is only a certain thing and nothing else, always used with a negative verb.',
    examples: [
      'この店は野菜しか売っていません。 (Kono mise wa yasai shika utte imasen.) - This shop sells nothing but vegetables.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-47',
    title: '～だけでなく～も (dake de naku~mo) – Not only ~ but also ~',
    level: 'N4',
    explanation: 'A pattern used to present two pieces of related information.',
    examples: [
      '彼は英語だけでなく、フランス語も話せます。 (Kare wa eigo dake de naku, furansugo mo hanasemasu.) - He can speak not only English but also French.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-48',
    title: '～たり～たりする (tari~tari suru) – Do things like ~ and ~',
    level: 'N4',
    explanation: 'Lists example activities without suggesting they are the only activities or that they happened in a specific order.',
    examples: [
      '週末は、掃除したり、洗濯したりします。 (Shuumatsu wa, souji shitari, sentaku shitari shimasu.) - On weekends I do things like cleaning and laundry.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-49',
    title: '～にする (ni suru) – Decide on',
    level: 'N4',
    explanation: 'Used to state a choice or decision, especially when choosing from a list of options.',
    examples: [
      '飲み物は何にしますか。 - コーヒーにします。 (Nomimono wa nani ni shimasu ka. - Koohii ni shimasu.) - What will you have to drink? - I\'ll have coffee.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-50',
    title: '～について (ni tsuite) – About',
    level: 'N4',
    explanation: 'Means "about" or "concerning" a certain topic.',
    examples: [
      '日本の文化についてレポートを書きます。 (Nihon no bunka ni tsuite repooto o kakimasu.) - I will write a report about Japanese culture.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-51',
    title: '～によると～そうだ (ni yoru to~sou da) – According to',
    level: 'N4',
    explanation: 'Used to report information from a specific source, combined with the "I heard" そうだ grammar.',
    examples: [
      '天気予報によると、明日は台風が来るそうです。 (Tenki yohou ni yoru to, ashita wa taifuu ga kuru sou desu.) - According to the weather forecast, I heard a typhoon is coming tomorrow.',
    ],
    read: false,
  },
  // N3 Grammar Lessons
  {
    id: 'gl-n3-1',
    title: '～れる／られる (Passive)',
    level: 'N3',
    explanation: 'The passive voice, used when the subject is acted upon. Also used as a form of honorific speech.',
    examples: [
      '私は先生に褒められました。(Watashi wa sensei ni homeraremashita) - I was praised by the teacher.',
      'この本は多くの人に読まれています。(Kono hon wa ooku no hito ni yomarete imasu) - This book is read by many people.'
    ],
    read: false
  },
  {
    id: 'gl-n3-2',
    title: '～せる／させる (Causative)',
    level: 'N3',
    explanation: 'The causative form, used to express making or letting someone do something.',
    examples: [
      '母は子供に野菜を食べさせました。(Haha wa kodomo ni yasai o tabesasemashita) - The mother made her child eat vegetables.',
      '先生は生徒を立たせました。(Sensei wa seito o tatasemashita) - The teacher made the student stand up.'
    ],
    read: false
  },
  {
    id: 'gl-n3-3',
    title: '～させられる (Causative Passive)',
    level: 'N3',
    explanation: 'Combines the causative and passive voices to express being forced to do something against one\'s will.',
    examples: [
      '私は母に部屋の掃除をさせられました。(Watashi wa haha ni heya no souji o saseraremashita) - I was forced to clean my room by my mother.',
    ],
    read: false
  },
  {
    id: 'gl-n3-4',
    title: '～てある',
    level: 'N3',
    explanation: 'Indicates a resultant state from an action done with a purpose. The action was done by someone, and the result remains.',
    examples: [
      '窓が開けてあります。(Mado ga akete arimasu) - The window has been opened (and was left that way).',
    ],
    read: false
  },
  {
    id: 'gl-n3-5',
    title: '～ておく',
    level: 'N3',
    explanation: 'Indicates doing something in preparation for the future. Can be shortened to ～とく.',
    examples: [
      '旅行の前に、切符を買っておきます。(Ryokou no mae ni, kippu o katte okimasu) - I\'ll buy the tickets before the trip.',
    ],
    read: false
  },
  {
    id: 'gl-n3-6',
    title: '～ていく / ～てくる',
    level: 'N3',
    explanation: 'Shows the direction of a change or action. ～ていく indicates a change starting from now and moving towards the future. ～てくる indicates a change that started in the past and continues to the present.',
    examples: [
      'これから寒くなっていきます。(Korekara samuku natte ikimasu) - It will get colder from now on.',
      '日本語が上手になってきました。(Nihongo ga jouzu ni natte kimashita) - My Japanese has gotten better (up to now).',
    ],
    read: false
  },
  {
    id: 'gl-n3-7',
    title: '～ようにする',
    level: 'N3',
    explanation: 'To make an effort to do something, to try to make something a habit.',
    examples: [
      '毎日、運動するようにしています。(Mainichi, undou suru you ni shite imasu) - I try to exercise every day.',
    ],
    read: false
  },
  {
    id: 'gl-n3-8',
    title: '～ようになる',
    level: 'N3',
    explanation: 'Indicates a change in ability or state; to become able to do something.',
    examples: [
      'やっと自転車に乗れるようになりました。(Yatto jitensha ni noreru you ni narimashita) - I finally became able to ride a bicycle.',
    ],
    read: false
  },
  {
    id: 'gl-n3-9',
    title: '～ように言う',
    level: 'N3',
    explanation: 'Used for indirect quotes, reporting a request, command, or advice.',
    examples: [
      '医者に、お酒を飲まないように言われました。(Isha ni, osake o nomanai you ni iwaremashita) - I was told by the doctor not to drink alcohol.',
    ],
    read: false
  },
  {
    id: 'gl-n3-10',
    title: '～ようとする',
    level: 'N3',
    explanation: 'To try to do something, or to be about to do something.',
    examples: [
      'ドアを開けようとしたが、開きませんでした。(Doa o akeyou to shita ga, akimasen deshita) - I tried to open the door, but it wouldn\'t open.',
    ],
    read: false
  },
  {
    id: 'gl-n3-11',
    title: '～ことにする',
    level: 'N3',
    explanation: 'Indicates a decision made by the speaker.',
    examples: [
      '来月から、タバコをやめることにしました。(Raigetsu kara, tabako o yameru koto ni shimashita) - I\'ve decided to quit smoking from next month.',
    ],
    read: false
  },
  {
    id: 'gl-n3-12',
    title: '～ことになる',
    level: 'N3',
    explanation: 'Indicates something has been decided, usually by others or by circumstances.',
    examples: [
      '来年、アメリカへ転勤することになりました。(Rainen, amerika e tenkin suru koto ni narimashita) - It has been decided that I will be transferred to America next year.',
    ],
    read: false
  },
  {
    id: 'gl-n3-13',
    title: '～ところだ',
    level: 'N3',
    explanation: 'Expresses a point in time relative to an action: about to do, in the middle of doing, or just finished doing.',
    examples: [
      'ちょうど今から出かけるところです。(Choudo ima kara dekakeru tokoro desu) - I am just about to go out now.',
    ],
    read: false
  },
  {
    id: 'gl-n3-14',
    title: '～ばかり',
    level: 'N3',
    explanation: 'Can mean "just finished doing" (after た-form) or "only doing" (after て-form).',
    examples: [
      'さっき昼ごはんを食べたばかりです。(Sakki hirugohan o tabeta bakari desu) - I just ate lunch a little while ago.',
      '息子は遊んでばかりいる。(Musuko wa asonde bakari iru) - My son does nothing but play.',
    ],
    read: false
  },
  {
    id: 'gl-n3-15',
    title: '～ばかりでなく～も',
    level: 'N3',
    explanation: 'Not only X, but also Y.',
    examples: [
      '彼女は英語ばかりでなく、フランス語も話せます。(Kanojo wa eigo bakari de naku, furansugo mo hanasemasu) - She can speak not only English but also French.',
    ],
    read: false
  },
  {
    id: 'gl-n3-16',
    title: '～そうだ (Hearsay)',
    level: 'N3',
    explanation: 'Reports information heard from another source. Used with plain forms.',
    examples: [
      '天気予報によると、明日は雨だそうです。(Tenki yohou ni yoru to, ashita wa ame da sou desu) - According to the weather forecast, I heard it will rain tomorrow.',
    ],
    read: false
  },
  {
    id: 'gl-n3-17',
    title: '～らしい',
    level: 'N3',
    explanation: 'Indicates that the speaker is making a judgment based on what they have heard or seen. Implies some uncertainty.',
    examples: [
      '田中さんは会社を辞めるらしいです。(Tanaka-san wa kaisha o yameru rashii desu) - I hear that Tanaka is quitting the company.',
    ],
    read: false
  },
  {
    id: 'gl-n3-18',
    title: '～ようだ',
    level: 'N3',
    explanation: 'Indicates a judgment based on sensory evidence. "It seems that..." or "It looks like...".',
    examples: [
      '彼は風邪をひいたようです。(Kare wa kaze o hiita you desu) - It seems like he has caught a cold.',
    ],
    read: false
  },
  {
    id: 'gl-n3-19',
    title: '～みたい',
    level: 'N3',
    explanation: 'A more colloquial version of ～ようだ. Can also mean "like" or "similar to".',
    examples: [
      '今日は冬みたいに寒いですね。(Kyou wa fuyu mitai ni samui desu ne) - It\'s cold like winter today, isn\'t it?',
    ],
    read: false
  },
  {
    id: 'gl-n3-20',
    title: '～はず',
    level: 'N3',
    explanation: 'Expresses a strong conviction that something is true or expected to happen based on evidence.',
    examples: [
      '彼は今日来るはずです。(Kare wa kyou kuru hazu desu) - He is supposed to come today.',
    ],
    read: false
  },
  {
    id: 'gl-n3-21',
    title: '～かもしれない',
    level: 'N3',
    explanation: 'Expresses a possibility ("might", "maybe"). Less certain than ～はず or ～でしょう.',
    examples: [
      '明日は雨が降るかもしれません。(Ashita wa ame ga furu kamo shiremasen) - It might rain tomorrow.',
    ],
    read: false
  },
  {
    id: 'gl-n3-22',
    title: '～に違いない',
    level: 'N3',
    explanation: 'Expresses a strong degree of certainty; "I\'m sure that...", "it must be...".',
    examples: [
      'あの人は、犯人に違いない。(Ano hito wa, hannin ni chigainai) - That person must be the culprit.',
    ],
    read: false
  },
  {
    id: 'gl-n3-23',
    title: '～と',
    level: 'N3',
    explanation: 'Conditional for natural, inevitable results. "If/When A happens, B always happens".',
    examples: [
      'このボタンを押すと、ドアが開きます。(Kono botan o osu to, doa ga akimasu) - When you press this button, the door opens.',
    ],
    read: false
  },
  {
    id: 'gl-n3-24',
    title: '～ば',
    level: 'N3',
    explanation: 'A general conditional form ("if"). Often used for hypothetical situations.',
    examples: [
      '時間があれば、行きます。(Jikan ga areba, ikimasu) - If I have time, I\'ll go.',
    ],
    read: false
  },
  {
    id: 'gl-n3-25',
    title: '～たら',
    level: 'N3',
    explanation: 'A versatile conditional ("if/when") based on the past-tense form. Can be used for a wide range of situations.',
    examples: [
      '日本へ行ったら、寿司を食べたいです。(Nihon e ittara, sushi o tabetai desu) - If/when I go to Japan, I want to eat sushi.',
    ],
    read: false
  },
  {
    id: 'gl-n3-26',
    title: '～なら',
    level: 'N3',
    explanation: 'Conditional used when a topic is introduced by someone else. "If that\'s the case..." or "As for...".',
    examples: [
      'A: 東京へ行きたいです。 B: 東京へ行くなら、新幹線が便利ですよ。(Tokyo e iku nara, shinkansen ga benri desu yo) - If you\'re going to Tokyo, the bullet train is convenient.',
    ],
    read: false
  },
  {
    id: 'gl-n3-27',
    title: '～のに',
    level: 'N3',
    explanation: 'Used to show a result that is contrary to expectations. "Although", "even though". Often implies surprise or frustration.',
    examples: [
      '薬を飲んだのに、熱が下がりません。(Kusuri o nonda noni, netsu ga sagarimasen) - Even though I took the medicine, my fever won\'t go down.',
    ],
    read: false
  },
  {
    id: 'gl-n3-28',
    title: '～ても',
    level: 'N3',
    explanation: 'Even if...; no matter what...',
    examples: [
      '雨が降っても、行きます。(Ame ga futte mo, ikimasu) - Even if it rains, I will go.',
    ],
    read: false
  },
  {
    id: 'gl-n3-29',
    title: '～たところ',
    level: 'N3',
    explanation: 'Indicates what was found or what happened when an action was performed.',
    examples: [
      '先生に質問したところ、丁寧に教えてくれました。(Sensei ni shitsumon shita tokoro, teinei ni oshiete kuremashita) - When I asked the teacher a question, he explained it politely.',
    ],
    read: false
  },
  {
    id: 'gl-n3-30',
    title: '～うちに',
    level: 'N3',
    explanation: 'Indicates that something should be done while a certain state or condition exists, before it changes.',
    examples: [
      '日本にいるうちに、富士山に登りたい。(Nihon ni iru uchi ni, Fujisan ni noboritai) - While I am in Japan, I want to climb Mt. Fuji.',
    ],
    read: false
  },
  {
    id: 'gl-n3-31',
    title: '～間に / ～間',
    level: 'N3',
    explanation: '「間に」indicates something happens at a point during a period.「間」indicates something happens throughout that entire period.',
    examples: [
      '留守の間に、どろぼうが入りました。(Rusu no aida ni, dorobou ga hairimashita) - While I was out, a thief entered.',
    ],
    read: false
  },
  {
    id: 'gl-n3-32',
    title: '～うえに',
    level: 'N3',
    explanation: 'In addition to; on top of that. Used to add another, often related, piece of information.',
    examples: [
      'このレストランは美味しい上に、値段も安い。(Kono resutoran wa oishii ue ni, nedan mo yasui) - This restaurant is not only delicious, but its prices are cheap too.',
    ],
    read: false
  },
  {
    id: 'gl-n3-33',
    title: '～おかげで / ～せいで',
    level: 'N3',
    explanation: 'おかげで: thanks to (positive reason). せいで: because of (negative reason, blame).',
    examples: [
      '先生のおかげで、試験に合格しました。(Sensei no okage de, shiken ni goukaku shimashita) - Thanks to my teacher, I passed the exam.',
      '事故のせいで、電車が遅れました。(Jiko no sei de, densha ga okuremashita) - Because of the accident, the train was late.',
    ],
    read: false
  },
  {
    id: 'gl-n3-34',
    title: '～ために',
    level: 'N3',
    explanation: 'For the purpose of; because of.',
    examples: [
      '家族のために、毎日働いています。(Kazoku no tame ni, mainichi hataraite imasu) - I work every day for my family.',
    ],
    read: false
  },
  {
    id: 'gl-n3-35',
    title: '～によって',
    level: 'N3',
    explanation: 'By means of; due to; depending on.',
    examples: [
      'インターネットによって、世界中の情報を得られる。(Intaanetto ni yotte, sekaijuu no jouhou o erareru) - Through the internet, we can get information from around the world.',
    ],
    read: false
  },
  {
    id: 'gl-n3-36',
    title: '～にとって',
    level: 'N3',
    explanation: 'For; from the perspective of.',
    examples: [
      'この問題は私にとって、とても難しいです。(Kono mondai wa watashi ni totte, totemo muzukashii desu) - For me, this problem is very difficult.',
    ],
    read: false
  },
  {
    id: 'gl-n3-37',
    title: '～ことがある (Have done)',
    level: 'N3',
    explanation: 'Used with the past-tense (た-form) verb to talk about past experiences.',
    examples: [
      '富士山に登ったことがあります。(Fujisan ni nobotta koto ga arimasu) - I have climbed Mt. Fuji before.',
    ],
    read: false
  },
  {
    id: 'gl-n3-38',
    title: '～ことができる (Can do)',
    level: 'N3',
    explanation: 'A formal way to express ability. Verb dictionary form + ことができる.',
    examples: [
      '私は漢字を読むことができます。(Watashi wa kanji o yomu koto ga dekimasu) - I can read kanji.',
    ],
    read: false
  },
  {
    id: 'gl-n3-39',
    title: '～ように (So that)',
    level: 'N3',
    explanation: 'Expresses purpose, "so that" or "in order to". The verb before it is in the dictionary or nai-form.',
    examples: [
      '日本語が話せるように、毎日勉強しています。(Nihongo ga hanaseru you ni, mainichi benkyou shiteimasu) - I study every day so that I can speak Japanese.',
    ],
    read: false
  },
  {
    id: 'gl-n3-40',
    title: '～ような / ～ように (Like)',
    level: 'N3',
    explanation: 'Used to make comparisons. ～ような modifies a noun, while ～ように modifies a verb or adjective.',
    examples: [
      '天使のような人です。(Tenshi no you na hito desu) - She is a person like an angel.',
      '彼は飛ぶように走った。(Kare wa tobu you ni hashitta) - He ran as if he were flying.',
    ],
    read: false
  },
  {
    id: 'gl-n3-41',
    title: '～つもり (Intend to)',
    level: 'N3',
    explanation: 'Expresses a firm intention or plan.',
    examples: [
      '来年、日本へ留学するつもりです。(Rainen, nihon e ryuugaku suru tsumori desu) - I intend to study abroad in Japan next year.',
    ],
    read: false
  },
  {
    id: 'gl-n3-42',
    title: '～ながら (While)',
    level: 'N3',
    explanation: 'Indicates two actions happening at the same time by the same person.',
    examples: [
      'テレビを見ながら食事するのはよくない。(Terebi o minagara shokuji suru no wa yokunai) - It\'s not good to eat while watching TV.',
    ],
    read: false
  },
  {
    id: 'gl-n3-43',
    title: '～ついでに (On the occasion of)',
    level: 'N3',
    explanation: 'Indicates doing a second action while taking the opportunity presented by the first main action.',
    examples: [
      '買い物に行くついでに、手紙を出してきます。(Kaimono ni iku tsuide ni, tegami o dashite kimasu) - While I\'m out shopping, I\'ll also mail this letter.',
    ],
    read: false
  },
  {
    id: 'gl-n3-44',
    title: '～とおりに (As)',
    level: 'N3',
    explanation: 'Indicates that an action is done in the same way as described or shown.',
    examples: [
      '先生が言ったとおりに、書きました。(Sensei ga itta toori ni, kakimashita) - I wrote it just as the teacher said.',
    ],
    read: false
  },
  {
    id: 'gl-n3-45',
    title: '～まま (As is)',
    level: 'N3',
    explanation: 'Indicates that a state or condition remains unchanged while another action takes place.',
    examples: [
      'テレビをつけたまま、寝てしまった。(Terebi o tsuketa mama, nete shimatta) - I fell asleep with the TV on.',
    ],
    read: false
  },
  {
    id: 'gl-n3-46',
    title: '～最中に (In the middle of)',
    level: 'N3',
    explanation: 'Indicates that something happened in the very middle of another action, often with an interrupting nuance.',
    examples: [
      '会議の最中に、電話が鳴った。(Kaigi no saichuu ni, denwa ga natta) - In the middle of the meeting, the phone rang.',
    ],
    read: false
  },
  {
    id: 'gl-n3-47',
    title: '～以上 (Since / now that)',
    level: 'N3',
    explanation: 'Means "now that" or "since," indicating that because a certain condition is met, a certain action should naturally follow.',
    examples: [
      '約束した以上、守らなければならない。(Yakusoku shita ijou, mamoranakereba naranai) - Now that I\'ve promised, I must keep my word.',
    ],
    read: false
  },
  {
    id: 'gl-n3-48',
    title: '～限り (As long as)',
    level: 'N3',
    explanation: 'Indicates a condition; "as long as" or "to the extent that".',
    examples: [
      '私が知っている限り、彼は正直者だ。(Watashi ga shitteiru kagiri, kare wa shoujikimono da) - As far as I know, he is an honest person.',
    ],
    read: false
  },
  {
    id: 'gl-n3-49',
    title: '～たびに (Every time)',
    level: 'N3',
    explanation: 'Indicates that every time one action happens, another action also happens.',
    examples: [
      'この歌を聞くたびに、故郷を思い出す。(Kono uta o kiku tabi ni, furusato o omoidasu) - Every time I hear this song, I remember my hometown.',
    ],
    read: false
  },
  {
    id: 'gl-n3-50',
    title: '～たとたん (As soon as)',
    level: 'N3',
    explanation: 'Indicates that something happened immediately after another action, often with a surprising or unexpected result.',
    examples: [
      'ドアを開けたとたん、猫が飛び出してきた。(Doa o aketa totan, neko ga tobidashite kita) - The moment I opened the door, a cat jumped out.',
    ],
    read: false
  },
  {
    id: 'gl-n3-51',
    title: '～にしては (Considering)',
    level: 'N3',
    explanation: 'Means "for" or "considering," used when something is different from what would be expected based on a fact.',
    examples: [
      '子供にしては、難しい本を読んでいますね。(Kodomo ni shite wa, muzukashii hon o yonde imasu ne) - For a child, he is reading a difficult book.',
    ],
    read: false
  },
  {
    id: 'gl-n3-52',
    title: '～にしても (Even for)',
    level: 'N3',
    explanation: 'Means "even if" or "even for," used to present a hypothetical or extreme example.',
    examples: [
      'いくら好きだとしても、毎日カレーは食べられない。(Ikura suki da to shitemo, mainichi karee wa taberarenai) - Even if I like it, I can\'t eat curry every day.',
    ],
    read: false
  },
  // N2 Grammar Lessons
  {
    id: 'gl-n2-1',
    title: '～ことなく',
    level: 'N2',
    explanation: 'Without doing something (once). A formal equivalent of ～ないで.',
    examples: [
      '彼は休むことなく、一日中働いた。(Kare wa yasumu koto naku, ichinichijuu hataraita) - He worked all day without taking a rest.',
    ],
    read: false
  },
  {
    id: 'gl-n2-2',
    title: '～ことだから',
    level: 'N2',
    explanation: 'Used when making a judgment based on the listener\'s knowledge of a person\'s typical character or behavior.',
    examples: [
      'まじめな田中さんのことだから、きっと時間通りに来るでしょう。(Majime na Tanaka-san no koto da kara, kitto jikan doori ni kuru deshou) - Since it\'s the diligent Tanaka-san we\'re talking about, he\'ll surely come on time.',
    ],
    read: false
  },
  {
    id: 'gl-n2-3',
    title: '～ことに',
    level: 'N2',
    explanation: 'Emphasizes the speaker\'s feelings about something. "To my (surprise/disappointment/etc.)..."',
    examples: [
      '残念なことに、彼は試験に落ちてしまった。(Zannen na koto ni, kare wa shiken ni ochite shimatta) - Unfortunately (to my regret), he failed the exam.',
    ],
    read: false
  },
  {
    id: 'gl-n2-4',
    title: '～ことはない',
    level: 'N2',
    explanation: 'There is no need to do something.',
    examples: [
      '心配することはないよ。大丈夫だから。(Shinpai suru koto wa nai yo. Daijoubu da kara) - There\'s no need to worry. It\'s alright.',
    ],
    read: false
  },
  {
    id: 'gl-n2-5',
    title: '～ことは～が',
    level: 'N2',
    explanation: 'It\'s true that... but...; used to acknowledge a point before presenting a contrasting one.',
    examples: [
      'このギターは、高いことは高いが、とても良い音がする。(Kono gitaa wa, takai koto wa takai ga, totemo yoi oto ga suru) - It\'s true this guitar is expensive, but it has a very good sound.',
    ],
    read: false
  },
  {
    id: 'gl-n2-6',
    title: '～ということだ',
    level: 'N2',
    explanation: 'I heard that...; it means that... Used for hearsay or to summarize information.',
    examples: [
      'ニュースによると、明日は台風が来るということだ。(Nyuusu ni yoru to, ashita wa taifuu ga kuru to iu koto da) - According to the news, a typhoon is coming tomorrow.',
    ],
    read: false
  },
  {
    id: 'gl-n2-7',
    title: '～ないことには～ない',
    level: 'N2',
    explanation: 'Unless you do X, you can\'t do Y. Expresses a necessary condition.',
    examples: [
      '実際に会ってみないことには、どんな人かわからない。(Jissai ni atte minai koto ni wa, donna hito ka wakaranai) - Unless you actually meet them, you won\'t know what kind of person they are.',
    ],
    read: false
  },
  {
    id: 'gl-n2-8',
    title: '～わけだ',
    level: 'N2',
    explanation: 'No wonder; that\'s why; it makes sense that... Used when a conclusion is reached logically.',
    examples: [
      'A: 彼は日本に10年住んでいる。 B: なるほど、日本語が上手なわけだ。(Naruhodo, nihongo ga jouzu na wake da) - I see, no wonder his Japanese is so good.',
    ],
    read: false
  },
  {
    id: 'gl-n2-9',
    title: '～わけではない',
    level: 'N2',
    explanation: 'It doesn\'t mean that...; it\'s not that... Used for partial negation.',
    examples: [
      '日本の料理が全部好きというわけではない。(Nihon no ryouri ga zenbu suki to iu wake de wa nai) - It\'s not that I like all Japanese food.',
    ],
    read: false
  },
  {
    id: 'gl-n2-10',
    title: '～わけがない',
    level: 'N2',
    explanation: 'There is no way that...; impossible that... Expresses strong denial.',
    examples: [
      'あんなに練習したんだから、試合に負けるわけがない。(Anna ni renshuu shita n da kara, shiai ni makeru wake ga nai) - Having practiced so much, there\'s no way I\'ll lose the match.',
    ],
    read: false
  },
  {
    id: 'gl-n2-11',
    title: '～わけにはいかない',
    level: 'N2',
    explanation: 'Can\'t afford to...; can\'t do something for social or psychological reasons.',
    examples: [
      '大事な会議があるので、休むわけにはいかない。(Daiji na kaigi ga aru node, yasumu wake ni wa ikanai) - Since there\'s an important meeting, I can\'t afford to take the day off.',
    ],
    read: false
  },
  {
    id: 'gl-n2-12',
    title: '～に違いない (ni chigainai)',
    level: 'N2',
    explanation: 'Must be; I\'m certain that... Expresses strong conviction based on evidence.',
    examples: [
      '部屋の電気がついているから、彼は家にいるに違いない。(Heya no denki ga tsuite iru kara, kare wa ie ni iru ni chigainai) - The lights are on in his room, so he must be home.',
    ],
    read: false
  },
  {
    id: 'gl-n2-13',
    title: '～にすぎない (ni suginai)',
    level: 'N2',
    explanation: 'To be nothing more than; just; only. Emphasizes the smallness or insignificance of something.',
    examples: [
      'それはただの噂にすぎない。(Sore wa tada no uwasa ni suginai) - That is nothing more than a rumor.',
    ],
    read: false
  },
  {
    id: 'gl-n2-14',
    title: '～にほかならない (ni hokanaranai)',
    level: 'N2',
    explanation: 'Nothing but; none other than. Used to strongly assert the cause or identity of something.',
    examples: [
      'この成功は、皆の努力の結果にほかならない。(Kono seikou wa, minna no doryoku no kekka ni hokanaranai) - This success is nothing other than the result of everyone\'s effort.',
    ],
    read: false
  },
  {
    id: 'gl-n2-15',
    title: '～にかかわらず (ni kakawarazu)',
    level: 'N2',
    explanation: 'Regardless of; whether or not...',
    examples: [
      '天候にかかわらず、イベントは開催されます。(Tenkou ni kakawarazu, ibento wa kaisai saremasu) - Regardless of the weather, the event will be held.',
    ],
    read: false
  },
  {
    id: 'gl-n2-16',
    title: '～とは限らない (to wa kagiranai)',
    level: 'N2',
    explanation: 'Not necessarily...; not always the case that...',
    examples: [
      'お金持ちが必ずしも幸福だとは限らない。(Okanemochi ga kanarazushimo koufuku da to wa kagiranai) - Being rich does not necessarily mean you are happy.',
    ],
    read: false
  },
  {
    id: 'gl-n2-17',
    title: '～に決まっている (ni kimatteiru)',
    level: 'N2',
    explanation: 'Must be; definitely is. A subjective but strong conviction.',
    examples: [
      'そんなのうそに決まっている。(Sonna no uso ni kimatteiru) - That must be a lie.',
    ],
    read: false
  },
  {
    id: 'gl-n2-18',
    title: '～ようでは (you dewa)',
    level: 'N2',
    explanation: 'If such a (bad) situation continues, a negative result is expected.',
    examples: [
      'こんなに失敗が多いようでは、成功は難しいだろう。(Konna ni shippai ga ooi you dewa, seikou wa muzukashii darou) - If failures continue at this rate, success will be difficult.',
    ],
    read: false
  },
  {
    id: 'gl-n2-19',
    title: '～か～ないかのうちに (ka~nai ka no uchi ni)',
    level: 'N2',
    explanation: 'As soon as; hardly had... when...',
    examples: [
      '彼はベッドに入るか入らないかのうちに、眠ってしまった。(Kare wa beddo ni hairu ka hairanai ka no uchi ni, nemutte shimatta) - He fell asleep as soon as he got into bed.',
    ],
    read: false
  },
  {
    id: 'gl-n2-20',
    title: '～際に (sai ni)',
    level: 'N2',
    explanation: 'A formal expression for "when" or "on the occasion of".',
    examples: [
      'お帰りの際に、この書類を提出してください。(Okaeri no sai ni, kono shorui o teishutsu shite kudasai) - Please submit this document when you leave.',
    ],
    read: false
  },
  {
    id: 'gl-n2-21',
    title: '～にあたって (ni atatte)',
    level: 'N2',
    explanation: 'At the time of; on the occasion of (for special events).',
    examples: [
      '新しい事業を始めるにあたって、資金を集めた。(Atarashii jigyou o hajimeru ni atatte, shikin o atsumeta) - We raised funds to start a new business.',
    ],
    read: false
  },
  {
    id: 'gl-n2-22',
    title: '～最中に (saichuu ni)',
    level: 'N2',
    explanation: 'In the very middle of doing something (often interrupted).',
    examples: [
      'スピーチの最中に、停電した。(Supiichi no saichuu ni, teiden shita) - The power went out in the middle of the speech.',
    ],
    read: false
  },
  {
    id: 'gl-n2-23',
    title: '～ところだった (tokoro datta)',
    level: 'N2',
    explanation: 'Almost did something (but didn\'t).',
    examples: [
      'もう少しで、車にひかれるところだった。(Mou sukoshi de, kuruma ni hikareru tokoro datta) - I was almost hit by a car.',
    ],
    read: false
  },
  {
    id: 'gl-n2-24',
    title: '～ずにはいられない (zu ni wa irarenai)',
    level: 'N2',
    explanation: 'Can\'t help but do; cannot refrain from doing.',
    examples: [
      '彼の話を聞いて、笑わずにはいられなかった。(Kare no hanashi o kiite, warawazu ni wa irarenakatta) - Hearing his story, I couldn\'t help but laugh.',
    ],
    read: false
  },
  {
    id: 'gl-n2-25',
    title: '～ざるを得ない (zaru o enai)',
    level: 'N2',
    explanation: 'Have no choice but to do (against one\'s will).',
    examples: [
      '台風のため、旅行は中止せざるを得なかった。(Taifuu no tame, ryokou wa chuushi sezaru o enakatta) - Due to the typhoon, we had no choice but to cancel the trip.',
    ],
    read: false
  },
  {
    id: 'gl-n2-26',
    title: '～どころか (dokoro ka)',
    level: 'N2',
    explanation: 'Far from; not at all; on the contrary.',
    examples: [
      '勉強どころか、毎日遊んでばかりいる。(Benkyou dokoro ka, mainichi asonde bakari iru) - Far from studying, he just plays around every day.',
    ],
    read: false
  },
  {
    id: 'gl-n2-27',
    title: '～どころではない (dokoro de wa nai)',
    level: 'N2',
    explanation: 'Not the time/situation for...',
    examples: [
      '宿題がたくさんあって、テレビを見るどころではない。(Shukudai ga takusan atte, terebi o miru dokoro de wa nai) - I have so much homework, it\'s not the time for watching TV.',
    ],
    read: false
  },
  {
    id: 'gl-n2-28',
    title: '～というより (to iu yori)',
    level: 'N2',
    explanation: 'Rather than...; more like...',
    examples: [
      'この料理は、おいしいというより、珍しい味がする。(Kono ryouri wa, oishii to iu yori, mezurashii aji ga suru) - This dish tastes more unique than delicious.',
    ],
    read: false
  },
  {
    id: 'gl-n2-29',
    title: '～というと / ～といえば (to iu to / to ieba)',
    level: 'N2',
    explanation: 'Speaking of...; if you say...',
    examples: [
      '日本の食べ物といえば、やはり寿司でしょう。(Nihon no tabemono to ieba, yahari sushi deshou) - Speaking of Japanese food, it has to be sushi.',
    ],
    read: false
  },
  {
    id: 'gl-n2-30',
    title: '～だけあって (dake atte)',
    level: 'N2',
    explanation: 'As expected of; precisely because...',
    examples: [
      'さすがに高級ホテルだけあって、サービスが素晴らしい。(Sasuga ni koukyuu hoteru dake atte, saabisu ga subarashii) - As expected of a luxury hotel, the service is wonderful.',
    ],
    read: false
  },
  {
    id: 'gl-n2-31',
    title: '～だけに (dake ni)',
    level: 'N2',
    explanation: 'All the more because...',
    examples: [
      '期待していただけに、がっかりした。(Kitai shite ita dake ni, gakkari shita) - I was all the more disappointed because I had high expectations.',
    ],
    read: false
  },
  {
    id: 'gl-n2-32',
    title: '～だけのことはある (dake no koto wa aru)',
    level: 'N2',
    explanation: 'No wonder...; it\'s worth...',
    examples: [
      '世界一周旅行をしただけのことはあって、彼の話は面白い。(Sekai isshuu ryokou o shita dake no koto wa atte, kare no hanashi wa omoshiroi) - No wonder his stories are interesting, as he has traveled around the world.',
    ],
    read: false
  },
  {
    id: 'gl-n2-33',
    title: '～上で (ue de)',
    level: 'N2',
    explanation: 'Upon doing X, ... or For the purpose of X, ...',
    examples: [
      'よく考えた上で、結論を出してください。(Yoku kangaeta ue de, ketsuron o dashite kudasai) - Please make a decision after thinking it over carefully.',
    ],
    read: false
  },
  {
    id: 'gl-n2-34',
    title: '～上に (ue ni)',
    level: 'N2',
    explanation: 'In addition to; on top of...',
    examples: [
      'このレストランは、値段が高い上に、サービスも悪い。(Kono resutoran wa, nedan ga takai ue ni, saabisu mo warui) - In addition to being expensive, this restaurant also has bad service.',
    ],
    read: false
  },
  {
    id: 'gl-n2-35',
    title: '～にしても (ni shite mo)',
    level: 'N2',
    explanation: 'Even if; even for...',
    examples: [
      '行くにしても、行かないにしても、連絡してください。(Iku ni shite mo, ikanai ni shite mo, renraku shite kudasai) - Please contact me whether you are going or not.',
    ],
    read: false
  },
  {
    id: 'gl-n2-36',
    title: '～にしろ / ～にせよ (ni shiro / ni seyo)',
    level: 'N2',
    explanation: 'Whether ... or ...; even if ... (formal version of にしても).',
    examples: [
      '賛成するにせよ、反対するにせよ、理由を言うべきだ。(Sansei suru ni seyo, hantai suru ni seyo, riyuu o iu beki da) - Whether you agree or disagree, you should state your reason.',
    ],
    read: false
  },
  {
    id: 'gl-n2-37',
    title: '～反面 (hanmen)',
    level: 'N2',
    explanation: 'On the other hand; while...',
    examples: [
      '都会の生活は便利な反面、ストレスも多い。(Tokai no seikatsu wa benri na hanmen, sutoresu mo ooi) - Urban life is convenient, but on the other hand, it is also stressful.',
    ],
    read: false
  },
  {
    id: 'gl-n2-38',
    title: '～一方（で） (ippou de)',
    level: 'N2',
    explanation: 'On one hand... on the other hand; whereas...',
    examples: [
      '会議では自分の意見を主張する一方で、他の人の話もよく聞くべきだ。(Kaigi de wa jibun no iken o shuchou suru ippou de, hoka no hito no hanashi mo yoku kiku beki da) - In meetings, while you should assert your own opinion, you should also listen well to others.',
    ],
    read: false
  },
  {
    id: 'gl-n2-39',
    title: '～かわりに (kawari ni)',
    level: 'N2',
    explanation: 'Instead of; in return for...',
    examples: [
      '今日は私が料理するかわりに、あなたは掃除をしてください。(Kyou wa watashi ga ryouri suru kawari ni, anata wa souji o shite kudasai) - Instead of me cooking today, you please do the cleaning.',
    ],
    read: false
  },
  {
    id: 'gl-n2-40',
    title: '～にともなって (ni tomonatte)',
    level: 'N2',
    explanation: 'As; along with; in proportion to...',
    examples: [
      '経済の発展にともなって、環境問題が深刻になった。(Keizai no hatten ni tomonatte, kankyou mondai ga shinkoku ni natta) - Along with economic development, environmental problems have become serious.',
    ],
    read: false
  },
  // N1 Grammar Lessons
  {
    id: 'gl-n1-1',
    title: '～に至るまで (ni itaru made)',
    level: 'N1',
    explanation: 'Indicates the extreme extent of something, meaning "all the way to," "down to," or "even."',
    examples: [
      '彼は、洋服から下着に至るまで、全て黒いものだ。(Kare wa, youfuku kara shitagi ni itaru made, subete kuroi mono da) - From his clothes down to his underwear, everything he has is black.',
    ],
    read: false
  },
  {
    id: 'gl-n1-2',
    title: '～に至っては (ni itatte wa)',
    level: 'N1',
    explanation: 'When it comes to... Used to single out an extreme or remarkable example from a list.',
    examples: [
      '他の科目はまあまあだが、数学に至っては、全くできない。(Hoka no kamoku wa maa maa da ga, suugaku ni itatte wa, mattaku dekinai) - His other subjects are so-so, but when it comes to math, he is completely hopeless.',
    ],
    read: false
  },
  {
    id: 'gl-n1-3',
    title: '～に至って (ni itatte)',
    level: 'N1',
    explanation: 'Only when; only at the point when... Expresses that a realization or action happens very late.',
    examples: [
      '死者が出るに至って、国は初めてその危険性を認めた。(Shisha ga deru ni itatte, kuni wa hajimete sono kikensei o mitometa) - Only when deaths occurred did the country finally acknowledge the danger.',
    ],
    read: false
  },
  {
    id: 'gl-n1-4',
    title: '～までもない (made mo nai)',
    level: 'N1',
    explanation: 'There is no need to...; it\'s not necessary to... Used for things that are obvious.',
    examples: [
      'それは言うまでもなく、彼の責任だ。(Sore wa iu made mo naku, kare no sekinin da) - It goes without saying that it is his responsibility.',
    ],
    read: false
  },
  {
    id: 'gl-n1-5',
    title: '～にして (ni shite)',
    level: 'N1',
    explanation: 'Can mean "only" or "even" when referring to a person or time, highlighting something as exceptional or surprising.',
    examples: [
      'この問題を解けたのは、彼にして初めてだった。(Kono mondai o toketa no wa, kare ni shite hajimete datta) - He was the first person to be able to solve this problem.',
    ],
    read: false
  },
  {
    id: 'gl-n1-6',
    title: '～かたわら (katawara)',
    level: 'N1',
    explanation: 'While doing X (as a main activity), also doing Y. Formal.',
    examples: [
      '彼は大学で教えるかたわら、小説を書いている。(Kare wa daigaku de oshieru katawara, shousetsu o kaite iru) - While teaching at the university, he also writes novels.',
    ],
    read: false
  },
  {
    id: 'gl-n1-7',
    title: '～とあって',
    level: 'N1',
    explanation: 'Due to the special situation that...; because... Used for special, unique circumstances.',
    examples: [
      '夏休みとあって、子供たちが大勢公園で遊んでいた。(Natsuyasumi to atte, kodomotachi ga oozei kouen de asonde ita) - Because it was summer vacation, many children were playing in the park.',
    ],
    read: false
  },
  {
    id: 'gl-n1-8',
    title: '～にあって (ni atte)',
    level: 'N1',
    explanation: 'In the condition/situation of... A formal expression.',
    examples: [
      'この困難な状況にあって、彼は冷静だった。(Kono konnan na joukyou ni atte, kare wa reisei datta) - In this difficult situation, he was calm.',
    ],
    read: false
  },
  {
    id: 'gl-n1-9',
    title: '～とあれば',
    level: 'N1',
    explanation: 'If it\'s for...; if it\'s a special case that... Expresses willingness to do something for a special reason.',
    examples: [
      '子供のためとあれば、どんなことでもします。(Kodomo no tame to areba, donna koto de mo shimasu) - If it\'s for my child, I will do anything.',
    ],
    read: false
  },
  {
    id: 'gl-n1-10',
    title: '～ようでは',
    level: 'N1',
    explanation: 'If such a (bad) situation continues, then... Implies a negative outcome.',
    examples: [
      'こんなにミスが多いようでは、安心して仕事を任せられない。(Konna ni misu ga ooi you dewa, anshin shite shigoto o makaserarenai) - If you keep making this many mistakes, I can\'t trust you with the work.',
    ],
    read: false
  },
  {
    id: 'gl-n1-11',
    title: '～ずじまい (zu jimai)',
    level: 'N1',
    explanation: 'Ended up not doing something (that one intended to). Expresses regret.',
    examples: [
      '日本にいる間に、富士山に登れずじまいだった。(Nihon ni iru aida ni, Fujisan ni noborezu jimai datta) - I ended up not being able to climb Mt. Fuji while I was in Japan.',
    ],
    read: false
  },
  {
    id: 'gl-n1-12',
    title: '～ではあるまいし',
    level: 'N1',
    explanation: 'It\'s not like...; it isn\'t as though... Used to negate an assumption.',
    examples: [
      '子供ではあるまいし、そんなことで泣くのはやめなさい。(Kodomo de wa arumai shi, sonna koto de naku no wa yamenasai) - It\'s not like you\'re a child, so stop crying over such things.',
    ],
    read: false
  },
  {
    id: 'gl-n1-13',
    title: '～にひきかえ (ni hikikae)',
    level: 'N1',
    explanation: 'In sharp contrast to... Used to highlight a strong difference.',
    examples: [
      '昨日の大雨にひきかえ、今日は素晴らしい天気だ。(Kinou no ooame ni hikikae, kyou wa subarashii tenki da) - In sharp contrast to yesterday\'s heavy rain, the weather today is wonderful.',
    ],
    read: false
  },
  {
    id: 'gl-n1-14',
    title: '～にもまして (ni mo mashite)',
    level: 'N1',
    explanation: 'Even more than...; above and beyond... Used for emphasis.',
    examples: [
      '去年にもまして、今年は暑い。(Kyonen ni mo mashite, kotoshi wa atsui) - This year is even hotter than last year.',
    ],
    read: false
  },
  {
    id: 'gl-n1-15',
    title: '～べく (beku)',
    level: 'N1',
    explanation: 'A formal way of saying "in order to." Links two clauses.',
    examples: [
      '彼はサッカー選手になるべく、毎日練習している。(Kare wa sakkaa senshu ni naru beku, mainichi renshuu shite iru) - In order to become a soccer player, he practices every day.',
    ],
    read: false
  },
  {
    id: 'gl-n1-16',
    title: '～べからず (bekarazu)',
    level: 'N1',
    explanation: 'A strong, formal prohibition meaning "must not". Often seen on signs.',
    examples: [
      '芝生に入るべからず。(Shibafu ni hairu bekarazu) - Must not enter the grass.',
    ],
    read: false
  },
  {
    id: 'gl-n1-17',
    title: '～べくもない (beku mo nai)',
    level: 'N1',
    explanation: 'There is no way to...; it is impossible to...',
    examples: [
      '素人の私には、その絵の価値は知るべくもない。(Shirouto no watashi ni wa, sono e no kachi wa shiru beku mo nai) - As an amateur, there is no way for me to know the value of that painting.',
    ],
    read: false
  },
  {
    id: 'gl-n1-18',
    title: '～にたえない (ni taenai)',
    level: 'N1',
    explanation: 'Cannot bear to see/hear...; extremely... (expresses strong emotion).',
    examples: [
      'その事故の現場は、見るにたえないほどだった。(Sono jiko no genba wa, miru ni taenai hodo datta) - The scene of that accident was unbearable to watch.',
    ],
    read: false
  },
  {
    id: 'gl-n1-19',
    title: '～を皮切りに (o kawakiri ni)',
    level: 'N1',
    explanation: 'Starting with...; as a starting point...',
    examples: [
      '東京を皮切りに、全国でコンサートが行われる。(Tokyo o kawakiri ni, zenkoku de konsaato ga okonawareru) - Starting with Tokyo, concerts will be held all across the country.',
    ],
    read: false
  },
  {
    id: 'gl-n1-20',
    title: '～をもって (o motte)',
    level: 'N1',
    explanation: 'A formal way to say "with" or "by means of". Also used to indicate an end time.',
    examples: [
      '本日をもちまして、閉店させていただきます。(Honjitsu o mochimashite, heiten sasete itadakimasu) - We will be closing our store as of today.',
    ],
    read: false
  },
  {
    id: 'gl-n1-21',
    title: '～といえども (to iedomo)',
    level: 'N1',
    explanation: 'A formal way to say "even though" or "although".',
    examples: [
      '専門家といえども、間違うことはある。(Senmonka to iedomo, machigau koto wa aru) - Even experts make mistakes.',
    ],
    read: false
  },
  {
    id: 'gl-n1-22',
    title: '～にしても～にしても (ni shitemo... ni shitemo)',
    level: 'N1',
    explanation: 'A more formal way of saying "whether... or...".',
    examples: [
      '行くにしても行かないにしても、連絡してください。(Iku ni shitemo ikanai ni shitemo, renraku shite kudasai) - Whether you go or not, please contact me.',
    ],
    read: false
  },
  {
    id: 'gl-n1-23',
    title: '～たるもの (taru mono)',
    level: 'N1',
    explanation: 'As someone who is...; in the position of... Emphasizes the responsibilities of a certain role.',
    examples: [
      '教師たるもの、学生の模範でなければならない。(Kyoushi taru mono, gakusei no mohan de nakereba naranai) - As a teacher, one must be a role model for students.',
    ],
    read: false
  },
  {
    id: 'gl-n1-24',
    title: '～をよそに (o yoso ni)',
    level: 'N1',
    explanation: 'Ignoring; in defiance of...; without regard for...',
    examples: [
      '親の心配をよそに、彼は一人で海外旅行に出かけた。(Oya no shinpai o yoso ni, kare wa hitori de kaigai ryokou ni dekaketa) - Ignoring his parents\' worries, he went on an overseas trip by himself.',
    ],
    read: false
  },
  {
    id: 'gl-n1-25',
    title: '～に足る (ni taru)',
    level: 'N1',
    explanation: 'To be worthy of; to be deserving of...',
    examples: [
      '彼の行動は尊敬に足る。(Kare no koudou wa sonkei ni taru) - His actions are worthy of respect.',
    ],
    read: false
  },
  {
    id: 'gl-n1-26',
    title: '～を禁じ得ない (o kinjienai)',
    level: 'N1',
    explanation: 'Cannot help but feel...; cannot suppress...',
    examples: [
      'その話を聞いて、涙を禁じ得なかった。(Sono hanashi o kiite, namida o kinjienakatta) - Hearing that story, I couldn\'t hold back my tears.',
    ],
    read: false
  },
  {
    id: 'gl-n1-27',
    title: '～にもほどがある (ni mo hodo ga aru)',
    level: 'N1',
    explanation: 'A strong expression of criticism meaning "That\'s too..."; "There\'s a limit to...".',
    examples: [
      '冗談にもほどがある。(Joudan ni mo hodo ga aru) - That joke is going too far.',
    ],
    read: false
  },
  {
    id: 'gl-n1-28',
    title: '～といったところだ (to itta tokoro da)',
    level: 'N1',
    explanation: 'At most; about... Used to give a rough, often unimpressive, estimate.',
    examples: [
      '参加者は、せいぜい30人といったところだろう。(Sankasha wa, seizei sanjuu-nin to itta tokoro darou) - The participants will number around 30 at most.',
    ],
    read: false
  },
  {
    id: 'gl-n1-29',
    title: '～ならでは (narade wa)',
    level: 'N1',
    explanation: 'Unique to; characteristic of...',
    examples: [
      'これは京都ならではの美しい景色だ。(Kore wa Kyouto narade wa no utsukushii keshiki da) - This is a beautiful sight unique to Kyoto.',
    ],
    read: false
  },
  {
    id: 'gl-n1-30',
    title: '～なくしては～ない (naku shite wa... nai)',
    level: 'N1',
    explanation: 'Without... it\'s impossible to... Emphasizes necessity.',
    examples: [
      '皆さんの協力なくしては、成功はありえませんでした。(Minasan no kyouryoku naku shite wa, seikou wa ariemasen deshita) - Without everyone\'s cooperation, success would have been impossible.',
    ],
    read: false
  },
  {
    id: 'gl-n1-31',
    title: '～がてら (gatera)',
    level: 'N1',
    explanation: 'While doing A, also do B (A is the main purpose).',
    examples: [
      '散歩がてら、コンビニに寄ってきます。(Sanpo gatera, konbini ni yotte kimasu) - I\'ll stop by the convenience store while I\'m out for a walk.',
    ],
    read: false
  },
  {
    id: 'gl-n1-32',
    title: '～が早いか (ga hayai ka)',
    level: 'N1',
    explanation: 'As soon as; the moment... Emphasizes the immediacy of the next action.',
    examples: [
      '彼はベルが鳴るが早いか、教室を飛び出した。(Kare wa beru ga naru ga hayai ka, kyoushitsu o tobidashita) - As soon as the bell rang, he flew out of the classroom.',
    ],
    read: false
  },
  {
    id: 'gl-n1-33',
    title: '～そばから (sobakara)',
    level: 'N1',
    explanation: 'As soon as... (something happens repeatedly). Implies a cycle of action and immediate counter-action.',
    examples: [
      '子供は片付けるそばから、おもちゃを散らかす。(Kodomo wa katadzukeru sobakara, omocha o chirakasu) - As soon as I tidy up, the child messes up the toys again.',
    ],
    read: false
  },
  {
    id: 'gl-n1-34',
    title: '～てからというもの (te kara to iu mono)',
    level: 'N1',
    explanation: 'Ever since... (a significant change occurred).',
    examples: [
      '子供が生まれてからというもの、生活がすっかり変わった。(Kodomo ga umarete kara to iu mono, seikatsu ga sukkari kawatta) - Ever since my child was born, my life has completely changed.',
    ],
    read: false
  },
  {
    id: 'gl-n1-35',
    title: '～にあっては (ni atte wa)',
    level: 'N1',
    explanation: 'A formal way to say "in the case of" or "for".',
    examples: [
      '彼にあっては、そのようなミスは考えられない。(Kare ni atte wa, sono you na misu wa kangaerarenai) - In his case, such a mistake is unthinkable.',
    ],
    read: false
  },
  {
    id: 'gl-n1-36',
    title: '～いかんで / ～いかんによって (ikan de / ikan ni yotte)',
    level: 'N1',
    explanation: 'Depending on...; contingent on...',
    examples: [
      '試験の結果いかんでは、卒業できないかもしれない。(Shiken no kekka ikan de wa, sotsugyou dekinai kamoshirenai) - Depending on the exam results, I might not be able to graduate.',
    ],
    read: false
  },
  {
    id: 'gl-n1-37',
    title: '～と相まって (to aimatte)',
    level: 'N1',
    explanation: 'Coupled with; together with... (creating a greater effect).',
    examples: [
      '彼の才能は、努力と相まって、素晴らしい成果を生んだ。(Kare no sainou wa, doryoku to aimatte, subarashii seika o unda) - His talent, coupled with his effort, produced wonderful results.',
    ],
    read: false
  },
  {
    id: 'gl-n1-38',
    title: '～をおいて (o oite)',
    level: 'N1',
    explanation: 'No one/nothing but...; except for...',
    examples: [
      'この仕事ができるのは、彼をおいて他にいない。(Kono shigoto ga dekiru no wa, kare o oite hoka ni inai) - There is no one but him who can do this job.',
    ],
    read: false
  },
  {
    id: 'gl-n1-39',
    title: '～ずにはおかない (zu ni wa okanai)',
    level: 'N1',
    explanation: 'Will definitely...; will certainly cause... (often used for natural consequences).',
    examples: [
      '彼のスピーチは、聞く者すべてを感動させずにはおかないだろう。(Kare no supiichi wa, kiku mono subete o kandou sasezu ni wa okanai darou) - His speech will surely move all who hear it.',
    ],
    read: false
  },
  {
    id: 'gl-n1-40',
    title: '～だに (dani)',
    level: 'N1',
    explanation: 'A literary expression for "even just" or "even the mere...". Often used with verbs like imagine or hear.',
    examples: [
      'その事故のことは、思い出すだに恐ろしい。(Sono jiko no koto wa, omoidasu dani osoroshii) - Just remembering that accident is horrifying.',
    ],
    read: false
  },
];
