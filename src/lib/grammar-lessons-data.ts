
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
      '天気は晴れです。 (Tenki wa hare desu.) - The weather is sunny.',
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
      'それは私の傘ではありません。 (Sore wa watashi no kasa dewa arimasen.) - That is not my umbrella.',
      '彼は先生じゃないです。 (Kare wa sensei janai desu.) - He is not a teacher.',
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
      '試験は簡単でした。 (Shiken wa kantan deshita.) - The test was easy.',
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
      'パーティーは楽しくありませんでした。 (Paatii wa tanoshiku arimasen deshita.) - The party was not fun.',
      '子供の時、野球が好きじゃなかったです。 (Kodomo no toki, yakyuu ga suki janakatta desu.) - I didn\'t like baseball when I was a child.',
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
      'お名前は何ですか。 (Onamae wa nan desu ka?) - What is your name?',
      'もう昼ご飯を食べましたか。 (Mou hirugohan o tabemashita ka?) - Have you eaten lunch already?',
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
      'どうしたんですか。 (Doushitandesu ka?) - What happened? (seeking explanation)',
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
      '素敵なドレスですね。 (Suteki na doresu desu ne.) - That\'s a lovely dress, isn\'t it?',
      'また会いましょうね。 (Mata aimashou ne.) - Let\'s meet again, okay?',
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
      'もう終電はないですよ。 (Mou shuuden wa nai desu yo.) - There are no more last trains, you know.',
      '忘れないでくださいよ。 (Wasurenai de kudasai yo.) - Don\'t forget, okay!',
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
      '明日、友達に会います。 (Ashita, tomodachi ni aimasu.) - I will meet my friend tomorrow.',
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
      '先週、京都へ行きました。 (Senshuu, Kyouto e ikimashita.) - I went to Kyoto last week.',
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
      '今、雨が降っています。 (Ima, ame ga futte imasu.) - It is raining now.',
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
      '私はお酒を飲まない。 (Watashi wa osake o nomanai.) - I don\'t drink alcohol.',
      '彼はまだ来ない。 (Kare wa mada konai.) - He hasn\'t come yet.',
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
      'もう宿題は終わった。 (Mou shukudai wa owatta.) - The homework is already finished.',
      '去年、日本へ行った。 (Kyonen, Nihon e itta.) - I went to Japan last year.',
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
      '彼は明日ここへ来る。 (Kare wa ashita koko e kuru.) - He will come here tomorrow.',
      '毎日運動することが大切です。 (Mainichi undou suru koto ga taisetsu desu.) - It is important to exercise every day.',
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
      'Irregular: する (suru) -> します (shimasu)',
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
      '今日はいい天気ですね。 (Kyou wa ii tenki desu ne.) - The weather is nice today, isn\'t it?',
      '象は鼻が長い。 (Zou wa hana ga nagai.) - As for elephants, their trunks are long.',
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
      '誰が来ますか。 (Dare ga kimasu ka?) - Who is coming?',
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
      'ジュースを飲みました。 (Juusu o nomimashita.) - I drank juice.',
      '公園を散歩します。 (Kouen o sanpo shimasu.) - I walk through the park.',
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
      '来年、日本に行きます。 (Rainen, Nihon ni ikimasu.) - I will go to Japan next year.',
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
      '右へ曲がってください。 (Migi e magatte kudasai.) - Please turn right.',
      'ようこそ、我が家へ。 (Youkoso, wagaya e.) - Welcome to my home.',
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
      'これは日本で買いました。 (Kore wa Nihon de kaimashita.) - I bought this in Japan.',
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
      'パンと牛乳を買いました。 (Pan to gyuunyuu o kaimashita.) - I bought bread and milk.',
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
      '彼も行きます。 (Kare mo ikimasu.) - He will also go.',
      'コーヒーも紅茶も好きです。 (Koohii mo koucha mo suki desu.) - I like both coffee and tea.',
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
      '日本語の先生。 (Nihongo no sensei.) - A teacher of Japanese.',
      'これは誰のカメラですか。 (Kore wa dare no kamera desu ka?) - Whose camera is this?',
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
      '冷蔵庫にジュースやビールが入っています。 (Reizouko ni juusu ya biiru ga haitte imasu.) - There are juice, beer, and other things in the fridge.',
      '休みの日には、テニスや水泳をします。 (Yasumi no hi ni wa, tenisu ya suiei o shimasu.) - On my days off, I do things like play tennis and swim.',
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
      '果物、例えばりんごやバナナなどが好きです。 (Kudamono, tatoeba ringo ya banana nado ga suki desu.) - I like fruits, for example, apples, bananas, and so on.',
      'この店では、服や靴などを売っています。 (Kono mise dewa, fuku ya kutsu nado o utte imasu.) - This store sells things like clothes and shoes.',
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
      '家から駅まで歩きます。 (Ie kara eki made arukimasu.) - I walk from my house to the station.',
      'この手紙は母からです。 (Kono tegami wa haha kara desu.) - This letter is from my mother.',
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
      '大阪まで新幹線で行きます。 (Oosaka made shinkansen de ikimasu.) - I will go to Osaka by bullet train.',
      '明日まで待ってください。 (Ashita made matte kudasai.) - Please wait until tomorrow.',
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
      '今年は去年より暑い。 (Kotoshi wa kyonen yori atsui.) - This year is hotter than last year.',
      '私より彼の方が背が高いです。 (Watashi yori kare no hou ga sei ga takai desu.) - He is taller than me.',
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
      '今年の冬は去年ほど寒くない。 (Kotoshi no fuyu wa kyonen hodo samukunai.) - This winter is not as cold as last year\'s.',
      '彼ほど親切な人はいない。 (Kare hodo shinsetsu na hito wa inai.) - There is no one as kind as him.',
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
      '田中さんは日本人です。 (Tanaka san wa Nihonjin desu.) - Mr. Tanaka is Japanese.',
      '私の趣味は読書です。 (Watashi no shumi wa dokusho desu.) - My hobby is reading.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-32',
    title: 'A は B が好き / きらい – Like / dislike',
    level: 'N5',
    explanation: 'Used to express likes and dislikes. The object of the feeling is marked by が, not を.',
    examples: [
      '私は犬が好きです。 (Watashi wa inu ga suki desu.) - I like dogs.',
      '彼はトマトが嫌いです。 (Kare wa tomato ga kirai desu.) - He dislikes tomatoes.',
      'スポーツは好きですか。 (Supootsu wa suki desu ka?) - Do you like sports?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-33',
    title: 'A は B がわかる – Understand',
    level: 'N5',
    explanation: 'Used to express understanding. The thing that is understood is marked by が.',
    examples: [
      '私は日本語が少しわかります。 (Watashi wa nihongo ga sukoshi wakarimasu.) - I understand a little Japanese.',
      '彼の気持ちがよくわかります。 (Kare no kimochi ga yoku wakarimasu.) - I understand his feelings well.',
      'この漢字の意味がわかりますか。 (Kono kanji no imi ga wakarimasu ka?) - Do you understand the meaning of this kanji?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-34',
    title: 'A は B がじょうず / へた – Good / poor at',
    level: 'N5',
    explanation: 'Used to describe skill level. The skill is marked by が.',
    examples: [
      '彼はテニスが上手です。 (Kare wa tenisu ga jouzu desu.) - He is good at tennis.',
      '私は歌が下手です。 (Watashi wa uta ga heta desu.) - I am bad at singing.',
      '妹は絵を描くのが上手です。 (Imouto wa e o kaku no ga jouzu desu.) - My little sister is good at drawing pictures.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-35',
    title: 'A は B より C のほうが～ – C is more ~ than B',
    level: 'N5',
    explanation: 'A common structure for making comparisons between two items.',
    examples: [
      'バスより電車の方が速いです。 (Basu yori densha no hou ga hayai desu.) - The train is faster than the bus.',
      '犬より猫の方が好きです。 (Inu yori neko no hou ga suki desu.) - I like cats more than dogs.',
      '昨日より今日の方が暑いです。 (Kinou yori kyou no hou ga atsui desu.) - Today is hotter than yesterday.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-36',
    title: 'A は B とおなじです – A is the same as B',
    level: 'N5',
    explanation: 'Used to state that two items are the same.',
    examples: [
      'これとそれは同じです。 (Kore to sore wa onaji desu.) - This and that are the same.',
      '私のカバンはあなたのと同じです。 (Watashi no kaban wa anata no to onaji desu.) - My bag is the same as yours.',
      '彼の意見は私と同じです。 (Kare no iken wa watashi to onaji desu.) - His opinion is the same as mine.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-37',
    title: '～がある – There is (inanimate)',
    level: 'N5',
    explanation: 'Used to state the existence of non-living things.',
    examples: [
      '机の上に本があります。 (Tsukue no ue ni hon ga arimasu.) - There is a book on the desk.',
      '近くにコンビニがありますか。 (Chikaku ni konbini ga arimasu ka?) - Is there a convenience store nearby?',
      '面白い映画があります。 (Omoshiroi eiga ga arimasu.) - There is an interesting movie.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-38',
    title: '～がいる – There is (animate)',
    level: 'N5',
    explanation: 'Used to state the existence of living things (people, animals).',
    examples: [
      '公園に子供がいます。 (Kouen ni kodomo ga imasu.) - There are children in the park.',
      '猫がいます。 (Neko ga imasu.) - There is a cat.',
      '教室に学生が三人います。 (Kyoushitsu ni gakusei ga sannin imasu.) - There are three students in the classroom.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-39',
    title: '～は～にある / いる – Exists in/at (location)',
    level: 'N5',
    explanation: 'Specifies the location of something or someone. The location is marked by に.',
    examples: [
      '銀行は駅の前にあります。 (Ginkou wa eki no mae ni arimasu.) - The bank is in front of the station.',
      '田中さんは事務所にいます。 (Tanaka san wa jimusho ni imasu.) - Mr. Tanaka is in the office.',
      '私の家は東京にあります。 (Watashi no ie wa Toukyou ni arimasu.) - My house is in Tokyo.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-40',
    title: '～がほしい – Want something',
    level: 'N5',
    explanation: 'Used to express desire for a specific item. The desired item is marked by が.',
    examples: [
      '新しい車が欲しいです。 (Atarashii kuruma ga hoshii desu.) - I want a new car.',
      '時間がもっと欲しいです。 (Jikan ga motto hoshii desu.) - I want more time.',
      '誕生日に何が欲しいですか。 (Tanjoubi ni nani ga hoshii desu ka?) - What do you want for your birthday?',
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
      '会議は10時15分に始まります。 (Kaigi wa juuji juugofun ni hajimarimasu.) - The meeting starts at 10:15.',
      '映画は何時に終わりますか。 (Eiga wa nanji ni owarimasu ka?) - What time does the movie end?',
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
      '私の誕生日は8月20日です。 (Watashi no tanjoubi wa hachigatsu hatsuka desu.) - My birthday is August 20th.',
      '去年は2023年でした。 (Kyonen wa nisen-nijuusan-nen deshita.) - Last year was 2023.',
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
      '毎週、図書館へ行きます。 (Maishuu, toshokan e ikimasu.) - I go to the library every week.',
      '毎朝、コーヒーを飲みます。 (Maiasa, koohii o nomimasu.) - I drink coffee every morning.',
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
      '子供の時、よく川で泳ぎました。 (Kodomo no toki, yoku kawa de oyogimashita.) - I often swam in the river when I was a child.',
      'わからない時、先生に質問します。 (Wakaranai toki, sensei ni shitsumon shimasu.) - When I don\'t understand, I ask the teacher.',
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
      '一時間前にここに着きました。 (Ichijikan mae ni koko ni tsukimashita.) - I arrived here an hour ago.',
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
      '仕事の後、飲みに行きますか。 (Shigoto no ato, nomi ni ikimasu ka?) - Shall we go for a drink after work?',
      'シャワーを浴びた後で、寝ます。 (Shawaa o abita ato de, nemasu.) - I go to sleep after taking a shower.',
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
      '私が留守の間、猫の世話をお願いします。 (Watashi ga rusu no aida, neko no sewa o onegaishimasu.) - Please take care of my cat while I am away.',
      '電車に乗っている間、ずっと音楽を聞いていた。 (Densha ni notteiru aida, zutto ongaku o kiiteita.) - I was listening to music the whole time I was on the train.',
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
      'パーティーに30人ぐらい来ました。 (Paatii ni sanjuunin gurai kimashita.) - About 30 people came to the party.',
      'どれくらい日本語を勉強しましたか。 (Dore kurai nihongo o benkyou shimashita ka?) - About how long have you studied Japanese?',
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
      '今日は宿題だけしました。 (Kyou wa shukudai dake shimashita.) - I only did homework today.',
      '好きなだけ食べてください。 (Suki na dake tabete kudasai.) - Please eat as much as you like.',
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
      '日本語しか話せません。 (Nihongo shika hanasemasen.) - I can only speak Japanese.',
      'これしか食べたくない。 (Kore shika tabetakunai.) - I don\'t want to eat anything but this.',
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
      'ここに名前を書いてください。 (Koko ni namae o kaite kudasai.) - Please write your name here.',
      'ゆっくり話してください。 (Yukkuri hanashite kudasai.) - Please speak slowly.',
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
      '心配しないでください。 (Shinpai shinaide kudasai.) - Please don\'t worry.',
      'そのドアを開けないでください。 (Sono doa o akenaide kudasai.) - Please don\'t open that door.',
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
      '明日、また来ましょう。 (Ashita, mata kimashou.) - Let\'s come again tomorrow.',
      'さあ、始めましょう。 (Saa, hajimemashou.) - Well then, let\'s begin.',
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
      'コーヒーでも飲みませんか。 (Koohii demo nomimasen ka?) - How about we drink coffee or something?',
      'この週末、パーティーをしませんか。 (Kono shuumatsu, paatii o shimasen ka?) - Won\'t you have a party this weekend?',
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
      '寿司が食べたいです。 (Sushi ga tabetai desu.) - I want to eat sushi.',
      '新しい服を買いたいです。 (Atarashii fuku o kaitai desu.) - I want to buy new clothes.',
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
      '今日はどこへも行きたくないです。 (Kyou wa doko e mo ikitakunai desu.) - I don\'t want to go anywhere today.',
      'この映画は見たくないです。 (Kono eiga wa mitakunai desu.) - I don\'t want to watch this movie.',
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
      'あなたに会いたかったです。 (Anata ni aitakatta desu.) - I wanted to meet you.',
      'もっとたくさん寝たかったです。 (Motto takusan netakatta desu.) - I wanted to sleep a lot more.',
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
      'このラーメンは美味しいです。 (Kono raamen wa oishii desu.) - This ramen is delicious.',
      '昨日は寒かったです。 (Kinou wa samukatta desu.) - It was cold yesterday.',
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
      '彼は親切な人です。 (Kare wa shinsetsu na hito desu.) - He is a kind person.',
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
      '彼はハンサムで、親切です。 (Kare wa hansamu de, shinsetsu desu.) - He is handsome and kind.',
      'この料理は安くて、おいしいです。 (Kono ryouri wa yasukute, oishii desu.) - This dish is cheap and delicious.',
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
      '彼は眠そうです。 (Kare wa nemusou desu.) - He looks sleepy.',
      '雨が降りそうです。 (Ame ga furisou desu.) - It looks like it\'s going to rain.',
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
      'ここに入ってもいいですよ。 (Koko ni haitte mo ii desu yo.) - You may enter here.',
      'テレビを見てもいいですか。 (Terebi o mite mo ii desu ka?) - Is it okay if I watch TV?',
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
      '図書館で話してはいけません。 (Toshokan de hanashite wa ikemasen.) - You must not talk in the library.',
      'お酒を飲んで運転してはいけません。 (Osake o nonde unten shite wa ikemasen.) - You must not drink and drive.',
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
      '漢字を読むことができますか。 (Kanji o yomu koto ga dekimasu ka?) - Can you read Kanji?',
      '彼は100メートルを11秒で走ることができます。 (Kare wa hyaku meetoru o juuichi byou de hashiru koto ga dekimasu.) - He can run 100 meters in 11 seconds.',
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
      '歩きながら話しましょう。 (Arukinagara hanashimashou.) - Let\'s talk while walking.',
      '彼はテレビを見ながらご飯を食べます。 (Kare wa terebi o minagara gohan o tabemasu.) - He eats while watching TV.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-66',
    title: 'どうして / なぜ / なんで – Why',
    level: 'N5',
    explanation: 'Question words for "why". なぜ is the most formal, なんで is the most casual.',
    examples: [
      'どうして日本語を勉強していますか。 (Doushite nihongo o benkyou shite imasu ka?) - Why are you studying Japanese?',
      'なぜ彼は来なかったのですか。 (Naze kare wa konakatta no desu ka?) - Why didn\'t he come?',
      'なんで泣いているの？ (Nande naiteiru no?) - Why are you crying?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-67',
    title: 'どう / どうやって / どんな – How / what kind of',
    level: 'N5',
    explanation: 'どう asks "how?". どうやって asks "how?" (method). どんな asks "what kind of?".',
    examples: [
      'これはどうやって使いますか。 (Kore wa douyatte tsukaimasu ka?) - How do you use this?',
      'どんな音楽が好きですか。 (Donna ongaku ga suki desu ka?) - What kind of music do you like?',
      '調子はどうですか。 (Choushi wa dou desu ka?) - How are you doing?',
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
      'トイレはどこですか。 (Toire wa doko desu ka?) - Where is the restroom?',
      'あの人は誰ですか。 (Ano hito wa dare desu ka?) - Who is that person?',
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
      'もう昼ご飯を食べました。 (Mou hirugohan o tabemashita.) - I already ate lunch.',
      '彼はもう帰りました。 (Kare wa mou kaerimashita.) - He already went home.',
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
      '宿題はまだ終わっていません。 (Shukudai wa mada owatte imasen.) - The homework isn\'t finished yet.',
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
      '田中さんは来週結婚するそうです。 (Tanaka san wa raishuu kekkon suru sou desu.) - I heard Mr. Tanaka is getting married next week.',
      'あのレストランはとても美味しいそうです。 (Ano resutoran wa totemo oishii sou desu.) - I heard that restaurant is very delicious.',
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
      '公園で走ったり、散歩したりした。 (Kouen de hashittari, sanpo shitari shita.) - I did things like running and walking in the park.',
      '泣いたり笑ったり、忙しい一日だった。 (Naitari warattari, isogashii ichinichi datta.) - It was a busy day of crying and laughing.',
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
      '馬に乗ったことがあります。 (Uma ni notta koto ga arimasu.) - I have ridden a horse before.',
      '富士山に登ったことがありません。 (Fujisan ni nobotta koto ga arimasen.) - I have never climbed Mt. Fuji.',
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
      '大学を卒業したら、医者になるつもりです。 (Daigaku o sotsugyou shitara, isha ni naru tsumori desu.) - I plan to become a doctor after graduating from university.',
      '明日は一日中勉強するつもりだ。 (Ashita wa ichinichijuu benkyou suru tsumori da.) - I plan to study all day tomorrow.',
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
      '彼はもうすぐ来るだろう。 (Kare wa mousugu kuru darou.) - He will probably come soon.',
      'この問題は難しいでしょう。 (Kono mondai wa muzukashii deshou.) - This problem is probably difficult.',
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
      '彼は結婚しています。 (Kare wa kekkon shite imasu.) - He is married.',
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
      'ケーキを全部食べてしまった。 (Keeki o zenbu tabete shimatta.) - I ate the whole cake (and now it\'s gone).',
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
      '明日試験だから、勉強しとく。 (Ashita shiken da kara, benkyou shitoku.) - Since the test is tomorrow, I\'ll study (in advance).',
      'パーティーのために、飲み物を買っておいた。 (Paatii no tame ni, nomimono o katte oita.) - I bought drinks in preparation for the party.',
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
      '日本へ行ってみたい。 (Nihon e itte mitai.) - I want to try going to Japan.',
      'その服、着てみてもいいですか。 (Sono fuku, kite mite mo ii desu ka?) - Can I try on those clothes?',
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
      '大学で経済を勉強しようと思っています。 (Daigaku de keizai o benkyou shiyou to omotte imasu.) - I\'m thinking of studying economics at university.',
      '来年、車を買おうと思います。 (Rainen, kuruma o kaou to omoimasu.) - I think I will buy a car next year.',
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
      '明日は早く起きよう。 (Ashita wa hayaku okiyou.) - Let\'s wake up early tomorrow.',
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
      'お金があれば、旅行できるのに。 (Okane ga areba, ryokou dekiru noni.) - If only I had money, I could travel.',
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
      '宝くじが当たったら、家を買います。 (Takarakuji ga atattara, ie o kaimasu.) - If I win the lottery, I will buy a house.',
      '暇だったら、電話してください。 (Hima dattara, denwa shite kudasai.) - If you are free, please call me.',
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
      '彼はテレビを見ながら食事している。 (Kare wa terebi o minagara shokuji shiteiru.) - He is eating while watching TV.',
      '残念ながら、行けません。 (Zannennagara, ikemasen.) - Unfortunately, I cannot go. (idiomatic use)',
    ],
    read: false,
  },
  {
    id: 'gl-n4-11',
    title: '～そうだ – Looks like (conjecture)',
    level: 'N4',
    explanation: 'Used to express a guess based on what you see or feel. "It looks like..." or "It seems...".',
    examples: [
      '雨が降りそうです。 (Ame ga furisou desu.) - It looks like it\'s going to rain.',
      'この料理は美味しそうです。 (Kono ryouri wa oishisou desu.) - This dish looks delicious.',
      '彼は元気そうですね。 (Kare wa genki sou desu ne.) - He looks well, doesn\'t he?',
    ],
    read: false,
  },
  {
    id: 'gl-n4-12',
    title: '～ようにする – Make an effort to',
    level: 'N4',
    explanation: 'Indicates making a conscious effort to do something regularly.',
    examples: [
      '毎日、野菜を食べるようにしています。 (Mainichi, yasai o taberu you ni shite imasu.) - I make an effort to eat vegetables every day.',
      '日本語で話すようにしてください。 (Nihongo de hanasu you ni shite kudasai.) - Please make an effort to speak in Japanese.',
      '忘れないように、メモします。 (Wasurenai you ni, memo shimasu.) - I\'ll make a note so I don\'t forget.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-13',
    title: '～ようになる – Reach a state where',
    level: 'N4',
    explanation: 'Indicates a change over time where one becomes able to do something they previously couldn\'t.',
    examples: [
      '日本語が話せるようになりました。 (Nihongo ga hanaseru you ni narimashita.) - I came to be able to speak Japanese.',
      '納豆が食べられるようになりました。 (Nattou ga taberareru you ni narimashita.) - I\'ve become able to eat natto.',
      '一人で起きるようになった。 (Hitori de okiru you ni natta.) - I started waking up by myself.',
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
      'この本は多くの人に読まれています。 (Kono hon wa ooku no hito ni yomareteimasu.) - This book is read by many people.',
      '弟にケーキを食べられた。 (Otouto ni keeki o taberareta.) - My cake was eaten by my younger brother.',
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
      '先生は生徒に宿題をたくさんさせた。 (Sensei wa seito ni shukudai o takusan saseta.) - The teacher made the students do a lot of homework.',
      '子供に好きなだけ遊ばせた。 (Kodomo ni suki na dake asobaseta.) - I let my child play as much as they wanted.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-16',
    title: '～すぎる – Too much',
    level: 'N4',
    explanation: 'Attached to a verb stem or adjective stem to mean that something is excessive.',
    examples: [
      '食べすぎて、お腹が痛いです。 (Tabesugite, onaka ga itai desu.) - I ate too much and my stomach hurts.',
      'この問題は難しすぎます。 (Kono mondai wa muzukashisugimasu.) - This problem is too difficult.',
      '彼は働きすぎる。 (Kare wa hatarakisugiru.) - He works too much.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-17',
    title: '～やすい / ～にくい – Easy to / hard to',
    level: 'N4',
    explanation: 'Attached to a verb stem to express that something is easy or difficult to do.',
    examples: [
      'このペンは書きやすいです。 (Kono pen wa kakiyasui desu.) - This pen is easy to write with.',
      '彼の字は読みにくいです。 (Kare no ji wa yominikui desu.) - His handwriting is hard to read.',
      'この道は分かりやすい。 (Kono michi wa wakariyasui.) - This road is easy to understand.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-18',
    title: '～ようだ / ～みたい – Seems like / looks like',
    level: 'N4',
    explanation: 'Expresses that something seems to be the case based on sensory evidence. みたい is more conversational.',
    examples: [
      '彼は風邪をひいたようです。 (Kare wa kaze o hiita you desu.) - It seems he has caught a cold.',
      'あの人は人形みたいだ。 (Ano hito wa ningyou mitai da.) - That person is like a doll.',
      '外は雨が降っているようだ。 (Soto wa ame ga futteiru you da.) - It seems to be raining outside.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-19',
    title: '～らしい – Apparently / it seems that',
    level: 'N4',
    explanation: 'Indicates that you are reporting information you have heard, but are not completely certain about.',
    examples: [
      '田中さんは、来月結婚するらしいです。 (Tanaka-san wa, raigetsu kekkon suru rashii desu.) - I hear Tanaka-san is getting married next month.',
      '彼は男らしい。 (Kare wa otoko rashii.) - He is manly. (Characteristic)',
      '今日は春らしい天気ですね。 (Kyou wa haru rashii tenki desu ne.) - The weather is spring-like today, isn\'t it?',
    ],
    read: false,
  },
  {
    id: 'gl-n4-20',
    title: '～のに – Although / even though',
    level: 'N4',
    explanation: 'Used to connect two clauses where the second is an unexpected or contrary result of the first. Often implies frustration or surprise.',
    examples: [
      '一生懸命勉強したのに、試験に落ちました。 (Isshoukenmei benkyou shita noni, shiken ni ochimashita.) - Even though I studied hard, I failed the exam.',
      '今日は日曜日なのに、仕事をしなければなりません。 (Kyou wa nichiyoubi na noni, shigoto o shinakereba narimasen.) - Even though it\'s Sunday, I have to work.',
      '彼は医者なのに、病気になった。 (Kare wa isha na noni, byouki ni natta.) - Even though he is a doctor, he got sick.',
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
      '彼は満足そうだ。 (Kare wa manzoku sou da.) - He seems satisfied.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-22',
    title: '～ばかり – Just did / only',
    level: 'N4',
    explanation: 'Can mean "just finished doing" when following a た-form verb, or "only" / "nothing but" when following a noun or て-form verb.',
    examples: [
      '今、食べたばかりです。 (Ima, tabeta bakari desu.) - I just ate now.',
      '彼は遊んでばかりいる。 (Kare wa asonde bakari iru.) - He does nothing but play.',
      '甘いものばかり食べないでください。 (Amai mono bakari tabenai de kudasai.) - Please don\'t eat only sweet things.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-23',
    title: '～まま – As is / without change',
    level: 'N4',
    explanation: 'Indicates that a state or condition remains unchanged while another action takes place.',
    examples: [
      '窓を開けたまま寝てしまった。 (Mado o aketa mama nete shimatta.) - I fell asleep with the window open.',
      '靴を履いたまま家に入らないでください。 (Kutsu o haita mama ie ni hairanai de kudasai.) - Please do not enter the house with your shoes on.',
      '昔のままで、何も変わっていない。 (Mukashi no mama de, nani mo kawatteinai.) - It\'s just as it was long ago, nothing has changed.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-24',
    title: '～たほうがいい – You’d better',
    level: 'N4',
    explanation: 'A way of giving strong advice. Used with the past-tense (た-form) of a verb.',
    examples: [
      'もっと野菜を食べたほうがいいですよ。 (Motto yasai o tabeta hou ga ii desu yo.) - You had better eat more vegetables.',
      '早く寝たほうがいい。 (Hayaku neta hou ga ii.) - You\'d better go to bed early.',
      '傘を持っていったほうがいい。 (Kasa o motte itta hou ga ii.) - You\'d better take an umbrella.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-25',
    title: '～ないほうがいい – You’d better not',
    level: 'N4',
    explanation: 'The negative version of ～たほうがいい, for advising against an action.',
    examples: [
      '夜、一人で歩かないほうがいい。 (Yoru, hitori de arukanai hou ga ii.) - You\'d better not walk alone at night.',
      'そんなにたくさん食べないほうがいい。 (Sonna ni takusan tabenai hou ga ii.) - You had better not eat that much.',
      '無理しないほうがいいですよ。 (Muri shinai hou ga ii desu yo.) - You shouldn\'t overdo it.',
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
      '授業中に話してはいけません。 (Jugyouchuu ni hanashite wa ikemasen.) - You must not talk during class.',
      'もう帰ってもいいですよ。 (Mou kaette mo ii desu yo.) - You may go home now.',
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
      'もっと勉強しなさい。 (Motto benkyou shinasai.) - Study more.',
      '静かにしなさい。 (Shizuka ni shinasai.) - Be quiet.',
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
      '薬を飲まなければならない。 (Kusuri o nomanakereba naranai.) - I have to take the medicine.',
      'レポートを出さなければなりません。 (Repooto o dasanakereba narimasen.) - I must submit the report.',
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
      '明日、来なくてもいいですよ。 (Ashita, konakutemo ii desu yo.) - You don\'t have to come tomorrow.',
      '急がなくてもいいです。 (Isoganakutemo ii desu.) - You don\'t have to hurry.',
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
      '時々、朝ご飯を食べないことがあります。 (Tokidoki, asagohan o tabenai koto ga arimasu.) - Sometimes I don\'t eat breakfast.',
      '彼に会ったことがありますか。 (Kare ni atta koto ga arimasu ka?) - Have you ever met him?',
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
      'タバコをやめることにした。 (Tabako o yameru koto ni shita.) - I decided to quit smoking.',
      '来年、結婚することにしました。 (Rainen, kekkon suru koto ni shimashita.) - We\'ve decided to get married next year.',
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
      'このビルは来年取り壊されることになった。 (Kono biru wa rainen torikowasareru koto ni natta.) - It was decided that this building will be demolished next year.',
      '新しいルールでは、ここで駐車してはいけないことになった。 (Atarashii ruuru de wa, koko de chuusha shite wa ikenai koto ni natta.) - According to the new rule, it has been decided that parking here is forbidden.',
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
      '彼はまだ若いつもりだが、もう50歳だ。 (Kare wa mada wakai tsumori da ga, mou gojussai da.) - He intends to be young still, but he is already 50.',
      '冗談のつもりで言ったのに、彼女は怒ってしまった。 (Joudan no tsumori de itta noni, kanojo wa okotte shimatta.) - Even though I said it as a joke, she got angry.',
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
      '明日は雨が降るかもしれない。 (Ashita wa ame ga furu kamoshirenai.) - It might rain tomorrow.',
      'それは本当じゃないかもしれない。 (Sore wa hontou ja nai kamoshirenai.) - That might not be true.',
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
      '彼はきっと合格するでしょう。 (Kare wa kitto goukaku suru deshou.) - He will surely pass.',
      'この仕事は明日までに終わらないでしょう。 (Kono shigoto wa ashita made ni owaranai deshou.) - This work probably won\'t be finished by tomorrow.',
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
      '彼は食事中です。 (Kare wa shokuji-chuu desu.) - He is in the middle of a meal.',
      'その件は現在検討中です。 (Sono ken wa genzai kentou-chuu desu.) - That matter is currently under consideration.',
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
      'この曲は聞けば聞くほど好きになる。 (Kono kyoku wa kikeba kiku hodo suki ni naru.) - The more I listen to this song, the more I like it.',
      '高い山ほど、空気は薄くなる。 (Takai yama hodo, kuuki wa usuku naru.) - The higher the mountain, the thinner the air becomes.',
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
      '日本へ来る前に、日本語を勉強しました。 (Nihon e kuru mae ni, nihongo o benkyou shimashita.) - I studied Japanese before coming to Japan.',
      '食事の前に、この薬を飲んでください。 (Shokuji no mae ni, kono kusuri o nonde kudasai.) - Please take this medicine before your meal.',
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
      '映画を見た後で、食事をしましょう。 (Eiga o mita ato de, shokuji o shimashou.) - Let\'s have a meal after watching the movie.',
      '後で電話します。 (Ato de denwa shimasu.) - I will call you later.',
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
      '寂しいとき、友達に電話します。 (Sabishii toki, tomodachi ni denwa shimasu.) - When I\'m lonely, I call my friends.',
      '日本へ行ったとき、たくさん写真を撮りました。 (Nihon e itta toki, takusan shashin o torimashita.) - I took a lot of pictures when I went to Japan.',
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
      'さっき昼ご飯を食べたばかりです。 (Sakki hirugohan o tabeta bakari desu.) - I just ate lunch a little while ago.',
      '彼は先週大学を卒業したばかりだ。 (Kare wa senshuu daigaku o sotsugyou shita bakari da.) - He just graduated from university last week.',
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
      '夏休みの間、ずっとアルバイトをしていました。 (Natsuyasumi no aida, zutto arubaito o shiteimashita.) - I was working part-time for the whole summer vacation.',
      '私がいない間に、誰か来ましたか。 (Watashi ga inai aida ni, dareka kimashita ka?) - Did anyone come while I was out?',
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
      '医者に、お酒を飲まないように言われました。 (Isha ni, osake o nomanai you ni iwaremashita.) - I was told by the doctor not to drink alcohol.',
      '母に、早く帰ってくるように言われた。 (Haha ni, hayaku kaette kuru you ni iwareta.) - I was told by my mother to come home early.',
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
      '自分で作るより、買ったほうが安い。 (Jibun de tsukuru yori, katta hou ga yasui.) - It\'s cheaper to buy it than to make it yourself.',
      '思ったより、テストは簡単でした。 (Omotta yori, tesuto wa kantan deshita.) - The test was easier than I thought.',
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
      '日本語が少ししか分かりません。 (Nihongo ga sukoshi shika wakarimasen.) - I only understand a little Japanese.',
      'こんなことは、親友にしか話せません。 (Konna koto wa, shinyuu ni shika hanasemasen.) - I can only talk about this kind of thing with my best friend.',
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
      'このレストランは、美味しいだけでなく、値段も安い。 (Kono resutoran wa, oishii dake de naku, nedan mo yasui.) - This restaurant is not only delicious, but its prices are also cheap.',
      '彼女は歌手としてだけでなく、女優としても活躍している。 (Kanojo wa kashu toshite dake de naku, joyuu toshite mo katsuyaku shiteiru.) - She is active not only as a singer but also as an actress.',
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
      '泣いたり笑ったり、感情が不安定だ。 (Naitari warattari, kanjou ga fuantei da.) - Crying and laughing, my emotions are unstable.',
      '行ったり来たりしないでください。 (Ittari kitari shinaide kudasai.) - Please don\'t keep going back and forth.',
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
      '今日の夕食はカレーにします。 (Kyou no yuushoku wa karee ni shimasu.) - I\'ll make today\'s dinner curry.',
      '会議は明日にしませんか。 (Kaigi wa ashita ni shimasen ka?) - Shall we decide on tomorrow for the meeting?',
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
      'この問題について、どう思いますか。 (Kono mondai ni tsuite, dou omoimasu ka?) - What do you think about this problem?',
      '彼について何か知っていますか。 (Kare ni tsuite nanika shitte imasu ka?) - Do you know anything about him?',
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
      '新聞によると、その事故で多くの人が亡くなったそうです。 (Shinbun ni yoru to, sono jiko de ooku no hito ga nakunatta sou desu.) - According to the newspaper, many people died in that accident.',
      '友達の話によると、あの店はとても人気があるそうだ。 (Tomodachi no hanashi ni yoru to, ano mise wa totemo ninki ga aru sou da.) - According to my friend, that shop is very popular.',
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
      '私は先生に褒められました。(Watashi wa sensei ni homeraremashita.) - I was praised by the teacher.',
      'この本は多くの人に読まれています。(Kono hon wa ooku no hito ni yomarete imasu.) - This book is read by many people.',
      '弟にケーキを食べられた。(Otouto ni keeki o taberareta.) - My cake was eaten by my younger brother (suffering passive).',
    ],
    read: false
  },
  {
    id: 'gl-n3-2',
    title: '～せる／させる (Causative)',
    level: 'N3',
    explanation: 'The causative form, used to express making or letting someone do something.',
    examples: [
      '母は子供に野菜を食べさせました。(Haha wa kodomo ni yasai o tabesasemashita.) - The mother made her child eat vegetables.',
      '先生は生徒を立たせました。(Sensei wa seito o tatasemashita.) - The teacher made the student stand up.',
      '部長は私にこの仕事をさせてくれた。(Buchou wa watashi ni kono shigoto o sasete kureta.) - The department manager let me do this job.',
    ],
    read: false
  },
  {
    id: 'gl-n3-3',
    title: '～させられる (Causative Passive)',
    level: 'N3',
    explanation: 'Combines the causative and passive voices to express being forced to do something against one\'s will.',
    examples: [
      '私は母に部屋の掃除をさせられました。(Watashi wa haha ni heya no souji o saseraremashita.) - I was forced to clean my room by my mother.',
      '子供のころ、毎日ピアノを練習させられた。(Kodomo no koro, mainichi piano o renshuu saserareta.) - When I was a child, I was made to practice piano every day.',
      '上司に、週末も働かせられた。(Joushi ni, shuumatsu mo hatarakaserareta.) - I was made to work on the weekend by my boss.',
    ],
    read: false
  },
  {
    id: 'gl-n3-4',
    title: '～てある',
    level: 'N3',
    explanation: 'Indicates a resultant state from an action done with a purpose. The action was done by someone, and the result remains.',
    examples: [
      '窓が開けてあります。(Mado ga akete arimasu.) - The window has been opened (and was left that way).',
      '机の上に本が置いてあります。(Tsukue no ue ni hon ga oite arimasu.) - A book has been placed on the desk.',
      '明日の準備はしてありますか。(Ashita no junbi wa shite arimasu ka?) - Have you made preparations for tomorrow?',
    ],
    read: false
  },
  {
    id: 'gl-n3-5',
    title: '～ておく',
    level: 'N3',
    explanation: 'Indicates doing something in preparation for the future. Can be shortened to ～とく.',
    examples: [
      '旅行の前に、切符を買っておきます。(Ryokou no mae ni, kippu o katte okimasu.) - I\'ll buy the tickets before the trip.',
      '友達が来るから、部屋を掃除しとく。(Tomodachi ga kuru kara, heya o souji shitoku.) - Since my friends are coming, I\'ll clean my room (in advance).',
      '後で困らないように、メモしておきましょう。(Ato de komaranai youni, memo shite okimashou.) - Let\'s make a note so we don\'t have trouble later.',
    ],
    read: false
  },
  {
    id: 'gl-n3-6',
    title: '～ていく / ～てくる',
    level: 'N3',
    explanation: 'Shows the direction of a change or action. ～ていく indicates a change starting from now and moving towards the future. ～てくる indicates a change that started in the past and continues to the present.',
    examples: [
      'これから寒くなっていきます。(Korekara samuku natte ikimasu.) - It will get colder from now on.',
      '日本語が上手になってきました。(Nihongo ga jouzu ni natte kimashita.) - My Japanese has gotten better (up to now).',
      'だんだん暖かくなってきましたね。(Dandan atatakaku natte kimashita ne.) - It has gradually gotten warmer, hasn\'t it?',
    ],
    read: false
  },
  {
    id: 'gl-n3-7',
    title: '～ようにする',
    level: 'N3',
    explanation: 'To make an effort to do something, to try to make something a habit.',
    examples: [
      '毎日、運動するようにしています。(Mainichi, undou suru you ni shite imasu.) - I try to exercise every day.',
      '健康のために、甘いものを食べないようにしている。(Kenkou no tame ni, amai mono o tabenai you ni shite iru.) - For my health, I\'m trying not to eat sweet things.',
      '約束の時間を守るようにしてください。(Yakusoku no jikan o mamoru you ni shite kudasai.) - Please make an effort to be on time for appointments.',
    ],
    read: false
  },
  {
    id: 'gl-n3-8',
    title: '～ようになる',
    level: 'N3',
    explanation: 'Indicates a change in ability or state; to become able to do something.',
    examples: [
      'やっと自転車に乗れるようになりました。(Yatto jitensha ni noreru you ni narimashita.) - I finally became able to ride a bicycle.',
      'このアプリで、世界のニュースがすぐ分かるようになった。(Kono apuri de, sekai no nyuusu ga sugu wakaru you ni natta.) - With this app, I can now understand world news immediately.',
      '練習して、ピアノが弾けるようになった。(Renshuu shite, piano ga hikeru you ni natta.) - I practiced and became able to play the piano.',
    ],
    read: false
  },
  {
    id: 'gl-n3-9',
    title: '～ように言う',
    level: 'N3',
    explanation: 'Used for indirect quotes, reporting a request, command, or advice.',
    examples: [
      '医者に、お酒を飲まないように言われました。(Isha ni, osake o nomanai you ni iwaremashita.) - I was told by the doctor not to drink alcohol.',
      '母に、もっと野菜を食べるように言われました。(Haha ni, motto yasai o taberu you ni iwaremashita.) - I was told by my mother to eat more vegetables.',
      '先生は、生徒に静かにするように注意した。(Sensei wa, seito ni shizuka ni suru you ni chuui shita.) - The teacher warned the students to be quiet.',
    ],
    read: false
  },
  {
    id: 'gl-n3-10',
    title: '～ようとする',
    level: 'N3',
    explanation: 'To try to do something, or to be about to do something.',
    examples: [
      'ドアを開けようとしたが、開きませんでした。(Doa o akeyou to shita ga, akimasen deshita.) - I tried to open the door, but it wouldn\'t open.',
      '電車に乗ろうとしたとき、ドアが閉まってしまった。(Densha ni norou to shita toki, doa ga shimatte shimatta.) - Just as I was about to get on the train, the doors closed.',
      '彼は何か言おうとしたが、やめた。(Kare wa nanika iou to shita ga, yameta.) - He tried to say something, but stopped.',
    ],
    read: false
  },
  {
    id: 'gl-n3-11',
    title: '～ことにする',
    level: 'N3',
    explanation: 'Indicates a decision made by the speaker.',
    examples: [
      '来月から、タバコをやめることにしました。(Raigetsu kara, tabako o yameru koto ni shimashita.) - I\'ve decided to quit smoking from next month.',
      '毎日30分ジョギングすることにしています。(Mainichi sanjuppun jogingu suru koto ni shiteimasu.) - I make it a rule to jog for 30 minutes every day.',
      '今日の会議は、中止ということにしましょう。(Kyou no kaigi wa, chuushi toiu koto ni shimashou.) - Let\'s just decide to cancel today\'s meeting.',
    ],
    read: false
  },
  {
    id: 'gl-n3-12',
    title: '～ことになる',
    level: 'N3',
    explanation: 'Indicates something has been decided, usually by others or by circumstances.',
    examples: [
      '来年、アメリカへ転勤することになりました。(Rainen, amerika e tenkin suru koto ni narimashita.) - It has been decided that I will be transferred to America next year.',
      'この法律により、来月から消費税が上がることになる。(Kono houritsu ni yori, raigetsu kara shouhizei ga agaru koto ni naru.) - Due to this law, the consumption tax will be raised from next month.',
      '結局、彼がリーダーということになった。(Kekkyoku, kare ga riidaa toiu koto ni natta.) - In the end, it was decided that he would be the leader.',
    ],
    read: false
  },
  {
    id: 'gl-n3-13',
    title: '～ところだ',
    level: 'N3',
    explanation: 'Expresses a point in time relative to an action: about to do, in the middle of doing, or just finished doing.',
    examples: [
      'ちょうど今から出かけるところです。(Choudo ima kara dekakeru tokoro desu.) - I am just about to go out now.',
      '今、その問題を考えているところです。(Ima, sono mondai o kangaeteiru tokoro desu.) - I am in the middle of thinking about that problem right now.',
      'たった今、駅に着いたところだ。(Tattaima, eki ni tsuita tokoro da.) - I just arrived at the station right now.',
    ],
    read: false
  },
  {
    id: 'gl-n3-14',
    title: '～ばかり',
    level: 'N3',
    explanation: 'Can mean "just finished doing" (after た-form) or "only doing" (after て-form).',
    examples: [
      'さっき昼ごはんを食べたばかりです。(Sakki hirugohan o tabeta bakari desu.) - I just ate lunch a little while ago.',
      '息子は遊んでばかりいる。(Musuko wa asonde bakari iru.) - My son does nothing but play.',
      '彼は文句ばかり言っている。(Kare wa monku bakari itteiru.) - He does nothing but complain.',
    ],
    read: false
  },
  {
    id: 'gl-n3-15',
    title: '～ばかりでなく～も',
    level: 'N3',
    explanation: 'Not only X, but also Y.',
    examples: [
      '彼女は英語ばかりでなく、フランス語も話せます。(Kanojo wa eigo bakari de naku, furansugo mo hanasemasu.) - She can speak not only English but also French.',
      'このレストランは、味ばかりでなく、サービスもいい。(Kono resutoran wa, aji bakari de naku, saabisu mo ii.) - This restaurant has not only good flavor but also good service.',
      '彼はスポーツばかりでなく、勉強もできる。(Kare wa supootsu bakari de naku, benkyou mo dekiru.) - He is good at not only sports but also studying.',
    ],
    read: false
  },
  {
    id: 'gl-n3-16',
    title: '～そうだ (Hearsay)',
    level: 'N3',
    explanation: 'Reports information heard from another source. Used with plain forms.',
    examples: [
      '天気予報によると、明日は雨だそうです。(Tenki yohou ni yoru to, ashita wa ame da sou desu.) - According to the weather forecast, I heard it will rain tomorrow.',
      '田中さんは来月、結婚するそうです。(Tanaka san wa raigetsu, kekkon suru sou desu.) - I hear that Mr. Tanaka is getting married next month.',
      'あの映画はとても面白いそうですよ。(Ano eiga wa totemo omoshiroi sou desu yo.) - I hear that movie is very interesting.',
    ],
    read: false
  },
  {
    id: 'gl-n3-17',
    title: '～らしい',
    level: 'N3',
    explanation: 'Indicates that the speaker is making a judgment based on what they have heard or seen. Implies some uncertainty.',
    examples: [
      '田中さんは会社を辞めるらしいです。(Tanaka-san wa kaisha o yameru rashii desu.) - I hear that Tanaka is quitting the company.',
      '外は雨が降っているらしい。傘を持っていこう。(Soto wa ame ga futteiru rashii. Kasa o motte ikou.) - It seems to be raining outside. I\'ll take an umbrella.',
      '今日は子供らしい服を着ていますね。(Kyou wa kodomo rashii fuku o kiteimasu ne.) - You\'re wearing child-like clothes today, aren\'t you? (characteristic)',
    ],
    read: false
  },
  {
    id: 'gl-n3-18',
    title: '～ようだ',
    level: 'N3',
    explanation: 'Indicates a judgment based on sensory evidence. "It seems that..." or "It looks like...".',
    examples: [
      '彼は風邪をひいたようです。(Kare wa kaze o hiita you desu.) - It seems like he has caught a cold.',
      '誰か来たようです。玄関のチャイムが鳴りました。(Dareka kita you desu. Genkan no chaimu ga narimashita.) - It seems someone has come. The doorbell rang.',
      'この問題は思ったより難しいようです。(Kono mondai wa omotta yori muzukashii you desu.) - This problem seems more difficult than I thought.',
    ],
    read: false
  },
  {
    id: 'gl-n3-19',
    title: '～みたい',
    level: 'N3',
    explanation: 'A more colloquial version of ～ようだ. Can also mean "like" or "similar to".',
    examples: [
      '今日は冬みたいに寒いですね。(Kyou wa fuyu mitai ni samui desu ne.) - It\'s cold like winter today, isn\'t it?',
      '彼は子供みたいだ。(Kare wa kodomo mitai da.) - He is like a child.',
      '夢を見ているみたいです。(Yume o miteiru mitai desu.) - It feels like I\'m dreaming.',
    ],
    read: false
  },
  {
    id: 'gl-n3-20',
    title: '～はず',
    level: 'N3',
    explanation: 'Expresses a strong conviction that something is true or expected to happen based on evidence.',
    examples: [
      '彼は今日来るはずです。(Kare wa kyou kuru hazu desu.) - He is supposed to come today.',
      '薬を飲んだから、もう熱は下がるはずだ。(Kusuri o nonda kara, mou netsu wa sagaru hazu da.) - Since I took the medicine, the fever should go down now.',
      'そんなはずはない。 (Sonna hazu wa nai.) - That can\'t be true. / Impossible.',
    ],
    read: false
  },
  {
    id: 'gl-n3-21',
    title: '～かもしれない',
    level: 'N3',
    explanation: 'Expresses a possibility ("might", "maybe"). Less certain than ～はず or ～でしょう.',
    examples: [
      '明日は雨が降るかもしれません。(Ashita wa ame ga furu kamo shiremasen.) - It might rain tomorrow.',
      '彼はもう帰ったかもしれない。(Kare wa mou kaetta kamoshirenai.) - He might have already gone home.',
      'これは私の間違いかもしれません。(Kore wa watashi no machigai kamoshiremasen.) - This might be my mistake.',
    ],
    read: false
  },
  {
    id: 'gl-n3-22',
    title: '～に違いない',
    level: 'N3',
    explanation: 'Expresses a strong degree of certainty; "I\'m sure that...", "it must be...".',
    examples: [
      'あの人は、犯人に違いない。(Ano hito wa, hannin ni chigainai.) - That person must be the culprit.',
      '鍵がない。どこかに落としたに違いない。(Kagi ga nai. Dokoka ni otoshita ni chigainai.) - My keys are gone. I must have dropped them somewhere.',
      'あんなに喜んでいるから、試験に合格したに違いない。(Anna ni yorokondeiru kara, shiken ni goukaku shita ni chigainai.) - Since they\'re so happy, they must have passed the exam.',
    ],
    read: false
  },
  {
    id: 'gl-n3-23',
    title: '～と',
    level: 'N3',
    explanation: 'Conditional for natural, inevitable results. "If/When A happens, B always happens".',
    examples: [
      'このボタンを押すと、ドアが開きます。(Kono botan o osu to, doa ga akimasu.) - When you press this button, the door opens.',
      '春になると、桜が咲きます。(Haru ni naru to, sakura ga sakimasu.) - When spring comes, the cherry blossoms bloom.',
      'まっすぐ行くと、右手に駅が見えます。(Massugu iku to, migite ni eki ga miemasu.) - If you go straight, you will see the station on your right.',
    ],
    read: false
  },
  {
    id: 'gl-n3-24',
    title: '～ば',
    level: 'N3',
    explanation: 'A general conditional form ("if"). Often used for hypothetical situations.',
    examples: [
      '時間があれば、行きます。(Jikan ga areba, ikimasu.) - If I have time, I\'ll go.',
      'もっと勉強すれば、合格できたのに。(Motto benkyou sureba, goukaku dekita noni.) - If only I had studied more, I could have passed.',
      '安ければ買います。(Yasukereba kaimasu.) - I\'ll buy it if it\'s cheap.',
    ],
    read: false
  },
  {
    id: 'gl-n3-25',
    title: '～たら',
    level: 'N3',
    explanation: 'A versatile conditional ("if/when") based on the past-tense form. Can be used for a wide range of situations.',
    examples: [
      '日本へ行ったら、寿司を食べたいです。(Nihon e ittara, sushi o tabetai desu.) - If/when I go to Japan, I want to eat sushi.',
      '家に帰ったら、誰もいなかった。(Ie ni kaettara, daremo inakatta.) - When I got home, nobody was there.',
      'お金があったら、何をしたいですか。(Okane ga attara, nani o shitai desu ka?) - If you had money, what would you want to do?',
    ],
    read: false
  },
  {
    id: 'gl-n3-26',
    title: '～なら',
    level: 'N3',
    explanation: 'Conditional used when a topic is introduced by someone else. "If that\'s the case..." or "As for...".',
    examples: [
      'A: 東京へ行きたいです。 B: 東京へ行くなら、新幹線が便利ですよ。(Tokyo e iku nara, shinkansen ga benri desu yo.) - If you\'re going to Tokyo, the bullet train is convenient.',
      'ビールは飲みませんが、ワインなら飲みます。(Biiru wa nomimasen ga, wain nara nomimasu.) - I don\'t drink beer, but if it\'s wine, I\'ll drink it.',
      '運転するなら、お酒を飲んではいけません。(Unten suru nara, osake o nonde wa ikemasen.) - If you\'re going to drive, you must not drink alcohol.',
    ],
    read: false
  },
  {
    id: 'gl-n3-27',
    title: '～のに',
    level: 'N3',
    explanation: 'Used to show a result that is contrary to expectations. "Although", "even though". Often implies surprise or frustration.',
    examples: [
      '薬を飲んだのに、熱が下がりません。(Kusuri o nonda noni, netsu ga sagarimasen.) - Even though I took the medicine, my fever won\'t go down.',
      '今日は休みのはずなのに、彼は会社に来た。(Kyou wa yasumi no hazu na noni, kare wa kaisha ni kita.) - Even though he was supposed to be off today, he came to the office.',
      'あれほど練習したのに、負けてしまった。(Arehodo renshuu shita noni, makete shimatta.) - Even though I practiced that much, I lost.',
    ],
    read: false
  },
  {
    id: 'gl-n3-28',
    title: '～ても',
    level: 'N3',
    explanation: 'Even if...; no matter what...',
    examples: [
      '雨が降っても、行きます。(Ame ga futte mo, ikimasu.) - Even if it rains, I will go.',
      'いくら高くても、それを買いたいです。(Ikura takakute mo, sore o kaitai desu.) - No matter how expensive it is, I want to buy it.',
      '反対されても、私は自分の意見を変えません。(Hantai sarete mo, watashi wa jibun no iken o kaemasen.) - Even if I\'m opposed, I won\'t change my opinion.',
    ],
    read: false
  },
  {
    id: 'gl-n3-29',
    title: '～たところ',
    level: 'N3',
    explanation: 'Indicates what was found or what happened when an action was performed.',
    examples: [
      '先生に質問したところ、丁寧に教えてくれました。(Sensei ni shitsumon shita tokoro, teinei ni oshiete kuremashita.) - When I asked the teacher a question, he explained it politely.',
      '病院で検査したところ、異常はなかった。(Byouin de kensa shita tokoro, ijou wa nakatta.) - When I had it checked at the hospital, there was nothing wrong.',
      '警察に電話したところ、すぐ来てくれた。(Keisatsu ni denwa shita tokoro, sugu kite kureta.) - When I called the police, they came right away.',
    ],
    read: false
  },
  {
    id: 'gl-n3-30',
    title: '～うちに',
    level: 'N3',
    explanation: 'Indicates that something should be done while a certain state or condition exists, before it changes.',
    examples: [
      '日本にいるうちに、富士山に登りたい。(Nihon ni iru uchi ni, Fujisan ni noboritai.) - While I am in Japan, I want to climb Mt. Fuji.',
      '熱いうちに、どうぞ召し上がってください。(Atsui uchi ni, douzo meshiagatte kudasai.) - Please eat it while it\'s hot.',
      '忘れないうちに、メモしておこう。(Wasurenai uchi ni, memo shiteokou.) - I\'ll make a note before I forget.',
    ],
    read: false
  },
  {
    id: 'gl-n3-31',
    title: '～間に / ～間',
    level: 'N3',
    explanation: '「間に」indicates something happens at a point during a period.「間」indicates something happens throughout that entire period.',
    examples: [
      '留守の間に、どろぼうが入りました。(Rusu no aida ni, dorobou ga hairimashita.) - While I was out, a thief entered.',
      '夏休みの間、ずっと田舎にいました。(Natsuyasumi no aida, zutto inaka ni imashita.) - I was in the countryside for the whole summer vacation.',
      '私がシャワーを浴びている間に、電話があったらしい。(Watashi ga shawaa o abiteiru aida ni, denwa ga atta rashii.) - Apparently there was a phone call while I was taking a shower.',
    ],
    read: false
  },
  {
    id: 'gl-n3-32',
    title: '～うえに',
    level: 'N3',
    explanation: 'In addition to; on top of that. Used to add another, often related, piece of information.',
    examples: [
      'このレストランは美味しい上に、値段も安い。(Kono resutoran wa oishii ue ni, nedan mo yasui.) - This restaurant is not only delicious, but its prices are cheap too.',
      '彼は頭がいい上に、スポーツもできる。(Kare wa atama ga ii ue ni, supootsu mo dekiru.) - In addition to being smart, he is also good at sports.',
      '今日は寝坊した上に、電車も遅れた。(Kyou wa nebou shita ue ni, densha mo okureta.) - On top of oversleeping today, the train was also late.',
    ],
    read: false
  },
  {
    id: 'gl-n3-33',
    title: '～おかげで / ～せいで',
    level: 'N3',
    explanation: 'おかげで: thanks to (positive reason). せいで: because of (negative reason, blame).',
    examples: [
      '先生のおかげで、試験に合格しました。(Sensei no okage de, shiken ni goukaku shimashita.) - Thanks to my teacher, I passed the exam.',
      '事故のせいで、電車が遅れました。(Jiko no sei de, densha ga okuremashita.) - Because of the accident, the train was late.',
      '君が手伝ってくれたおかげで、早く終わったよ。(Kimi ga tetsudatte kureta okage de, hayaku owatta yo.) - Thanks to you helping me, it finished early.',
    ],
    read: false
  },
  {
    id: 'gl-n3-34',
    title: '～ために',
    level: 'N3',
    explanation: 'For the purpose of; because of.',
    examples: [
      '家族のために、毎日働いています。(Kazoku no tame ni, mainichi hataraite imasu.) - I work every day for my family.',
      '健康のために、運動を始めました。(Kenkou no tame ni, undou o hajimemashita.) - I started exercising for my health.',
      '大雪のために、飛行機が遅れた。(Ooyuki no tame ni, hikouki ga okureta.) - The plane was delayed because of the heavy snow.',
    ],
    read: false
  },
  {
    id: 'gl-n3-35',
    title: '～によって',
    level: 'N3',
    explanation: 'By means of; due to; depending on.',
    examples: [
      'インターネットによって、世界中の情報を得られる。(Intaanetto ni yotte, sekaijuu no jouhou o erareru.) - Through the internet, we can get information from around the world.',
      '人によって、考え方が違う。(Hito ni yotte, kangaekata ga chigau.) - Ways of thinking differ depending on the person.',
      'この建物は有名な建築家によって設計された。(Kono tatemono wa yuumei na kenchikuka ni yotte sekkei sareta.) - This building was designed by a famous architect.',
    ],
    read: false
  },
  {
    id: 'gl-n3-36',
    title: '～にとって',
    level: 'N3',
    explanation: 'For; from the perspective of.',
    examples: [
      'この問題は私にとって、とても難しいです。(Kono mondai wa watashi ni totte, totemo muzukashii desu.) - For me, this problem is very difficult.',
      'あなたにとって、一番大切なものは何ですか。(Anata ni totte, ichiban taisetsu na mono wa nan desu ka?) - What is the most important thing for you?',
      '子供にとって、遊びは勉強と同じくらい大切だ。(Kodomo ni totte, asobi wa benkyou to onaji kurai taisetsu da.) - For children, playing is as important as studying.',
    ],
    read: false
  },
  {
    id: 'gl-n3-37',
    title: '～ことがある (Have done)',
    level: 'N3',
    explanation: 'Used with the past-tense (た-form) verb to talk about past experiences.',
    examples: [
      '富士山に登ったことがあります。(Fujisan ni nobotta koto ga arimasu.) - I have climbed Mt. Fuji before.',
      '時々、電車が遅れることがあります。(Tokidoki, densha ga okureru koto ga arimasu.) - Sometimes, the train is late.',
      'そんなことを言われたのは初めてのことだ。(Sonna koto o iwareta no wa hajimete no koto da.) - That\'s the first time I\'ve ever been told such a thing.',
    ],
    read: false
  },
  {
    id: 'gl-n3-38',
    title: '～ことができる (Can do)',
    level: 'N3',
    explanation: 'A formal way to express ability. Verb dictionary form + ことができる.',
    examples: [
      '私は漢字を読むことができます。(Watashi wa kanji o yomu koto ga dekimasu.) - I can read kanji.',
      'この博物館では、写真を撮ることができます。(Kono hakubutsukan de wa, shashin o toru koto ga dekimasu.) - You can take pictures in this museum.',
      '予約を変更することはできますか。(Yoyaku o henkou suru koto wa dekimasu ka?) - Is it possible to change the reservation?',
    ],
    read: false
  },
  {
    id: 'gl-n3-39',
    title: '～ように (So that)',
    level: 'N3',
    explanation: 'Expresses purpose, "so that" or "in order to". The verb before it is in the dictionary or nai-form.',
    examples: [
      '日本語が話せるように、毎日勉強しています。(Nihongo ga hanaseru you ni, mainichi benkyou shiteimasu.) - I study every day so that I can speak Japanese.',
      '忘れないように、メモしてください。(Wasurenai you ni, memo shite kudasai.) - Please make a note so that you don\'t forget.',
      '風邪をひかないように、気をつけてください。(Kaze o hikanai you ni, ki o tsukete kudasai.) - Please be careful so that you don\'t catch a cold.',
    ],
    read: false
  },
  {
    id: 'gl-n3-40',
    title: '～ような / ～ように (Like)',
    level: 'N3',
    explanation: 'Used to make comparisons. ～ような modifies a noun, while ～ように modifies a verb or adjective.',
    examples: [
      '天使のような人です。(Tenshi no you na hito desu.) - She is a person like an angel.',
      '彼は飛ぶように走った。(Kare wa tobu you ni hashitta.) - He ran as if he were flying.',
      '夢を見ているような気分だ。(Yume o miteiru you na kibun da.) - I feel like I\'m dreaming.',
    ],
    read: false
  },
  {
    id: 'gl-n3-41',
    title: '～つもり (Intend to)',
    level: 'N3',
    explanation: 'Expresses a firm intention or plan.',
    examples: [
      '来年、日本へ留学するつもりです。(Rainen, nihon e ryuugaku suru tsumori desu.) - I intend to study abroad in Japan next year.',
      '彼に本当のことを話すつもりだ。(Kare ni hontou no koto o hanasu tsumori da.) - I intend to tell him the truth.',
      '見て見ぬふりをするつもりですか。(Mite minu furi o suru tsumori desu ka?) - Are you planning to pretend you didn\'t see it?',
    ],
    read: false
  },
  {
    id: 'gl-n3-42',
    title: '～ながら (While)',
    level: 'N3',
    explanation: 'Indicates two actions happening at the same time by the same person.',
    examples: [
      'テレビを見ながら食事するのはよくない。(Terebi o minagara shokuji suru no wa yokunai.) - It\'s not good to eat while watching TV.',
      '彼はいつも何か考え事をしながら歩いている。(Kare wa itsumo nanika kangaegoto o shinagara aruiteiru.) - He is always walking while thinking about something.',
      '彼女は残念ながら、来られなくなった。(Kanojo wa zannennagara, korarenaku natta.) - Unfortunately, she became unable to come. (idiomatic)',
    ],
    read: false
  },
  {
    id: 'gl-n3-43',
    title: '～ついでに (On the occasion of)',
    level: 'N3',
    explanation: 'Indicates doing a second action while taking the opportunity presented by the first main action.',
    examples: [
      '買い物に行くついでに、手紙を出してきます。(Kaimono ni iku tsuide ni, tegami o dashite kimasu.) - While I\'m out shopping, I\'ll also mail this letter.',
      '駅に行ったついでに、本屋に寄った。(Eki ni itta tsuide ni, honya ni yotta.) - Since I was at the station anyway, I stopped by the bookstore.',
      '散歩のついでに、この荷物を届けてくれないか。(Sanpo no tsuide ni, kono nimotsu o todokete kurenai ka?) - Since you\'re going for a walk, could you deliver this package for me?',
    ],
    read: false
  },
  {
    id: 'gl-n3-44',
    title: '～とおりに (As)',
    level: 'N3',
    explanation: 'Indicates that an action is done in the same way as described or shown.',
    examples: [
      '先生が言ったとおりに、書きました。(Sensei ga itta toori ni, kakimashita.) - I wrote it just as the teacher said.',
      'この地図のとおりに行けば、着きますよ。(Kono chizu no toori ni ikeba, tsukimasu yo.) - If you go according to this map, you\'ll get there.',
      '思ったとおりの結果だった。(Omotta toori no kekka datta.) - The result was just as I thought.',
    ],
    read: false
  },
  {
    id: 'gl-n3-45',
    title: '～まま (As is)',
    level: 'N3',
    explanation: 'Indicates that a state or condition remains unchanged while another action takes place.',
    examples: [
      'テレビをつけたまま、寝てしまった。(Terebi o tsuketa mama, nete shimatta.) - I fell asleep with the TV on.',
      'この野菜は生のまま食べられます。(Kono yasai wa nama no mama taberaremasu.) - This vegetable can be eaten raw (as it is).',
      '言われたままにやっただけです。(Iwareta mama ni yatta dake desu.) - I just did as I was told.',
    ],
    read: false
  },
  {
    id: 'gl-n3-46',
    title: '～最中に (In the middle of)',
    level: 'N3',
    explanation: 'Indicates that something happened in the very middle of another action, often with an interrupting nuance.',
    examples: [
      '会議の最中に、電話が鳴った。(Kaigi no saichuu ni, denwa ga natta.) - In the middle of the meeting, the phone rang.',
      '食事の最中に客が来た。(Shokuji no saichuu ni kyaku ga kita.) - A guest arrived right in the middle of our meal.',
      'スピーチの最中に、突然停電した。(Supiichi no saichuu ni, totsuzen teiden shita.) - In the middle of the speech, the power suddenly went out.',
    ],
    read: false
  },
  {
    id: 'gl-n3-47',
    title: '～以上 (Since / now that)',
    level: 'N3',
    explanation: 'Means "now that" or "since," indicating that because a certain condition is met, a certain action should naturally follow.',
    examples: [
      '約束した以上、守らなければならない。(Yakusoku shita ijou, mamoranakereba naranai.) - Now that I\'ve promised, I must keep my word.',
      '日本に来た以上は、日本語がうまくなりたい。(Nihon ni kita ijou wa, nihongo ga umaku naritai.) - Since I\'ve come to Japan, I want to become good at Japanese.',
      '試合に出る以上、勝ちたい。(Shiai ni deru ijou, kachitai.) - As long as I\'m participating in the match, I want to win.',
    ],
    read: false
  },
  {
    id: 'gl-n3-48',
    title: '～限り (As long as)',
    level: 'N3',
    explanation: 'Indicates a condition; "as long as" or "to the extent that".',
    examples: [
      '私が知っている限り、彼は正直者だ。(Watashi ga shitteiru kagiri, kare wa shoujikimono da.) - As far as I know, he is an honest person.',
      '時間がある限り、手伝います。(Jikan ga aru kagiri, tetsudaimasu.) - As long as I have time, I will help.',
      'できる限りのことはします。(Dekiru kagiri no koto wa shimasu.) - I will do everything that I can.',
    ],
    read: false
  },
  {
    id: 'gl-n3-49',
    title: '～たびに (Every time)',
    level: 'N3',
    explanation: 'Indicates that every time one action happens, another action also happens.',
    examples: [
      'この歌を聞くたびに、故郷を思い出す。(Kono uta o kiku tabi ni, furusato o omoidasu.) - Every time I hear this song, I remember my hometown.',
      '彼は旅行のたびに、お土産を買ってきてくれる。(Kare wa ryokou no tabi ni, omiyage o katte kite kureru.) - Every time he travels, he buys me a souvenir.',
      '父は出張のたびに、その土地の名物を買ってくる。(Chichi wa shucchou no tabi ni, sono tochi no meibutsu o katte kuru.) - Every time my father goes on a business trip, he buys a local specialty.',
    ],
    read: false
  },
  {
    id: 'gl-n3-50',
    title: '～たとたん (As soon as)',
    level: 'N3',
    explanation: 'Indicates that something happened immediately after another action, often with a surprising or unexpected result.',
    examples: [
      'ドアを開けたとたん、猫が飛び出してきた。(Doa o aketa totan, neko ga tobidashite kita.) - The moment I opened the door, a cat jumped out.',
      '彼は家に帰ったとたん、ベッドに倒れた。(Kare wa ie ni kaetta totan, beddo ni taoreta.) - As soon as he got home, he collapsed onto the bed.',
      '立ち上がったとたん、目まいがした。(Tachiagatta totan, memai ga shita.) - The moment I stood up, I felt dizzy.',
    ],
    read: false
  },
  {
    id: 'gl-n3-51',
    title: '～にしては (Considering)',
    level: 'N3',
    explanation: 'Means "for" or "considering," used when something is different from what would be expected based on a fact.',
    examples: [
      '子供にしては、難しい本を読んでいますね。(Kodomo ni shite wa, muzukashii hon o yonde imasu ne.) - For a child, he is reading a difficult book.',
      '初めてにしては、よくできました。(Hajimete ni shite wa, yoku dekimashita.) - You did well, considering it was your first time.',
      'たくさん勉強したにしては、点数が低かった。(Takusan benkyou shita ni shite wa, tensuu ga hikukatta.) - Considering I studied a lot, my score was low.',
    ],
    read: false
  },
  {
    id: 'gl-n3-52',
    title: '～にしても (Even for)',
    level: 'N3',
    explanation: 'Means "even if" or "even for," used to present a hypothetical or extreme example.',
    examples: [
      'いくら好きだとしても、毎日カレーは食べられない。(Ikura suki da to shitemo, mainichi karee wa taberarenai.) - Even if I like it, I can\'t eat curry every day.',
      'これは、プロの選手だとしても、難しい技だ。(Kore wa, puro no senshu da toshitemo, muzukashii waza da.) - This is a difficult technique, even for a professional player.',
      '遅れるにしても、連絡ぐらいするべきだ。(Okureru ni shitemo, renraku gurai suru beki da.) - Even if you\'re going to be late, you should at least contact me.',
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
      '彼は休むことなく、一日中働いた。(Kare wa yasumu koto naku, ichinichijuu hataraita.) - He worked all day without taking a rest.',
      '彼は誰にも言うことなく、会社を辞めた。(Kare wa dare ni mo iu koto naku, kaisha o yameta.) - He quit the company without telling anyone.',
      '最後まであきらめることなく、頑張った。(Saigo made akirameru koto naku, ganbatta.) - I did my best until the end without giving up.',
    ],
    read: false
  },
  {
    id: 'gl-n2-2',
    title: '～ことだから',
    level: 'N2',
    explanation: 'Used when making a judgment based on the listener\'s knowledge of a person\'s typical character or behavior.',
    examples: [
      'まじめな田中さんのことだから、きっと時間通りに来るでしょう。(Majime na Tanaka-san no koto da kara, kitto jikan doori ni kuru deshou.) - Since it\'s the diligent Tanaka-san we\'re talking about, he\'ll surely come on time.',
      '優しい母のことだから、許してくれるに違いない。(Yasashii haha no koto da kara, yurushite kureru ni chigainai.) - Because she is a kind mother, I\'m sure she will forgive me.',
      '時間に厳しい山田さんのことだから、遅刻はしないはずだ。(Jikan ni kibishii Yamada-san no koto da kara, chikoku wa shinai hazu da.) - Knowing how strict Mr. Yamada is about time, he should not be late.',
    ],
    read: false
  },
  {
    id: 'gl-n2-3',
    title: '～ことに',
    level: 'N2',
    explanation: 'Emphasizes the speaker\'s feelings about something. "To my (surprise/disappointment/etc.)..."',
    examples: [
      '残念なことに、彼は試験に落ちてしまった。(Zannen na koto ni, kare wa shiken ni ochite shimatta.) - Unfortunately (to my regret), he failed the exam.',
      '驚いたことに、彼女は私の元カノだった。(Odoroita koto ni, kanojo wa watashi no moto kano datta.) - To my surprise, she was my ex-girlfriend.',
      '嬉しいことに、宝くじに当たった。(Ureshii koto ni, takarakuji ni atatta.) - To my delight, I won the lottery.',
    ],
    read: false
  },
  {
    id: 'gl-n2-4',
    title: '～ことはない',
    level: 'N2',
    explanation: 'There is no need to do something.',
    examples: [
      '心配することはないよ。大丈夫だから。(Shinpai suru koto wa nai yo. Daijoubu da kara.) - There\'s no need to worry. It\'s alright.',
      'そんなに急ぐことはない。まだ時間はある。(Sonna ni isogu koto wa nai. Mada jikan wa aru.) - There\'s no need to hurry so much. We still have time.',
      'わざわざ来ることはありません。電話で十分です。(Wazawaza kuru koto wa arimasen. Denwa de juubun desu.) - There is no need for you to come all the way. A phone call will suffice.',
    ],
    read: false
  },
  {
    id: 'gl-n2-5',
    title: '～ことは～が',
    level: 'N2',
    explanation: 'It\'s true that... but...; used to acknowledge a point before presenting a contrasting one.',
    examples: [
      'このギターは、高いことは高いが、とても良い音がする。(Kono gitaa wa, takai koto wa takai ga, totemo yoi oto ga suru.) - It\'s true this guitar is expensive, but it has a very good sound.',
      '日本語が話せることは話せるが、まだ流暢ではない。(Nihongo ga hanaseru koto wa hanaseru ga, mada ryuuchou de wa nai.) - It\'s true that I can speak Japanese, but I\'m not fluent yet.',
      'その映画、見たことは見たけど、内容はほとんど覚えていない。(Sono eiga, mita koto wa mita kedo, naiyou wa hotondo oboeteinai.) - I have seen that movie, but I barely remember the plot.',
    ],
    read: false
  },
  {
    id: 'gl-n2-6',
    title: '～ということだ',
    level: 'N2',
    explanation: 'I heard that...; it means that... Used for hearsay or to summarize information.',
    examples: [
      'ニュースによると、明日は台風が来るということだ。(Nyuusu ni yoru to, ashita wa taifuu ga kuru to iu koto da.) - According to the news, a typhoon is coming tomorrow.',
      'つまり、彼は来ないということですね。(Tsumari, kare wa konai to iu koto desu ne.) - So, that means he isn\'t coming, right?',
      '試験の結果、全員合格ということだ。(Shiken no kekka, zen\'in goukaku to iu koto da.) - The result of the exam is that everyone passed.',
    ],
    read: false
  },
  {
    id: 'gl-n2-7',
    title: '～ないことには～ない',
    level: 'N2',
    explanation: 'Unless you do X, you can\'t do Y. Expresses a necessary condition.',
    examples: [
      '実際に会ってみないことには、どんな人かわからない。(Jissai ni atte minai koto ni wa, donna hito ka wakaranai.) - Unless you actually meet them, you won\'t know what kind of person they are.',
      'お金がないことには、この計画は始められない。(Okane ga nai koto ni wa, kono keikaku wa hajimerarenai.) - Without money, this plan cannot be started.',
      '許可がないことには、ここに入ることはできない。(Kyoka ga nai koto ni wa, koko ni hairu koto wa dekinai.) - You cannot enter here unless you have permission.',
    ],
    read: false
  },
  {
    id: 'gl-n2-8',
    title: '～わけだ',
    level: 'N2',
    explanation: 'No wonder; that\'s why; it makes sense that... Used when a conclusion is reached logically.',
    examples: [
      'A: 彼は日本に10年住んでいる。 B: なるほど、日本語が上手なわけだ。(Naruhodo, nihongo ga jouzu na wake da.) - I see, no wonder his Japanese is so good.',
      '暑いわけだ。気温が35度もある。(Atsui wake da. Kion ga sanjuugo-do mo aru.) - No wonder it\'s hot. The temperature is 35 degrees.',
      '10ページ読んだら500円もらえる。つまり1ページあたり50円もらえるわけだ。(Juu peeji yondara gohyaku-en moraeru. Tsumari ichi peeji atari gojuu-en moraeru wake da.) - I get 500 yen for reading 10 pages. That means I get 50 yen per page.',
    ],
    read: false
  },
  {
    id: 'gl-n2-9',
    title: '～わけではない',
    level: 'N2',
    explanation: 'It doesn\'t mean that...; it\'s not that... Used for partial negation.',
    examples: [
      '日本の料理が全部好きというわけではない。(Nihon no ryouri ga zenbu suki to iu wake de wa nai.) - It\'s not that I like all Japanese food.',
      'お金があれば幸せになれるというわけではない。(Okane ga areba shiawase ni nareru to iu wake de wa nai.) - It doesn\'t mean that you can be happy if you have money.',
      'いつでも電話に出られるわけではない。(Itsudemo denwa ni derareru wake de wa nai.) - It\'s not like I can answer the phone anytime.',
    ],
    read: false
  },
  {
    id: 'gl-n2-10',
    title: '～わけがない',
    level: 'N2',
    explanation: 'There is no way that...; impossible that... Expresses strong denial.',
    examples: [
      'あんなに練習したんだから、試合に負けるわけがない。(Anna ni renshuu shita n da kara, shiai ni makeru wake ga nai.) - Having practiced so much, there\'s no way I\'ll lose the match.',
      'あの正直な彼が、うそをつくわけがない。(Ano shoujiki na kare ga, uso o tsuku wake ga nai.) - There is no way that honest guy would tell a lie.',
      'こんな簡単な問題が、分からないわけがない。(Konna kantan na mondai ga, wakaranai wake ga nai.) - There\'s no way I don\'t understand such a simple problem.',
    ],
    read: false
  },
  {
    id: 'gl-n2-11',
    title: '～わけにはいかない',
    level: 'N2',
    explanation: 'Can\'t afford to...; can\'t do something for social or psychological reasons.',
    examples: [
      '大事な会議があるので、休むわけにはいかない。(Daiji na kaigi ga aru node, yasumu wake ni wa ikanai.) - Since there\'s an important meeting, I can\'t afford to take the day off.',
      '友達に借りたお金だから、返さないわけにはいかない。(Tomodachi ni karita okane da kara, kaesanai wake ni wa ikanai.) - Since it\'s money I borrowed from a friend, I have to pay it back.',
      'みんなが頑張っているので、私だけ何もしないわけにはいかない。(Minna ga ganbatteiru node, watashi dake nani mo shinai wake ni wa ikanai.) - Everyone is working hard, so I can\'t be the only one doing nothing.',
    ],
    read: false
  },
  {
    id: 'gl-n2-12',
    title: '～に違いない (ni chigainai)',
    level: 'N2',
    explanation: 'Must be; I\'m certain that... Expresses strong conviction based on evidence.',
    examples: [
      '部屋の電気がついているから、彼は家にいるに違いない。(Heya no denki ga tsuite iru kara, kare wa ie ni iru ni chigainai.) - The lights are on in his room, so he must be home.',
      'あの二人は、付き合っているに違いない。(Ano futari wa, tsukiatteiru ni chigainai.) - Those two must be dating.',
      'これだけの証拠があるのだから、彼が犯人に違いない。(Kore dake no shouko ga aru no da kara, kare ga hannin ni chigainai.) - Given all this evidence, he must be the culprit.',
    ],
    read: false
  },
  {
    id: 'gl-n2-13',
    title: '～にすぎない (ni suginai)',
    level: 'N2',
    explanation: 'To be nothing more than; just; only. Emphasizes the smallness or insignificance of something.',
    examples: [
      'それはただの噂にすぎない。(Sore wa tada no uwasa ni suginai.) - That is nothing more than a rumor.',
      '私は一社員にすぎませんから、決定権はありません。(Watashi wa ichi shain ni suginai masen kara, ketteiken wa arimasen.) - I am just an employee, so I don\'t have the authority to decide.',
      'これはほんの冗談にすぎない。(Kore wa honno joudan ni suginai.) - This is nothing more than a mere joke.',
    ],
    read: false
  },
  {
    id: 'gl-n2-14',
    title: '～にほかならない (ni hokanaranai)',
    level: 'N2',
    explanation: 'Nothing but; none other than. Used to strongly assert the cause or identity of something.',
    examples: [
      'この成功は、皆の努力の結果にほかならない。(Kono seikou wa, minna no doryoku no kekka ni hokanaranai.) - This success is nothing other than the result of everyone\'s effort.',
      '彼が怒っている理由は、その一言にほかならない。(Kare ga okotteiru riyuu wa, sono hitokoto ni hokanaranai.) - The reason he is angry is nothing other than that one word.',
      '戦争は最大の人権侵害にほかならない。(Sensou wa saidai no jinken shingai ni hokanaranai.) - War is nothing less than the greatest violation of human rights.',
    ],
    read: false
  },
  {
    id: 'gl-n2-15',
    title: '～にかかわらず (ni kakawarazu)',
    level: 'N2',
    explanation: 'Regardless of; whether or not...',
    examples: [
      '天候にかかわらず、イベントは開催されます。(Tenkou ni kakawarazu, ibento wa kaisai saremasu.) - Regardless of the weather, the event will be held.',
      '年齢にかかわらず、誰でも参加できます。(Nenrei ni kakawarazu, daredemo sanka dekimasu.) - Anyone can participate, regardless of age.',
      '好き嫌いにかかわらず、野菜を食べなさい。(Suki kirai ni kakawarazu, yasai o tabenasai.) - Eat your vegetables, whether you like them or not.',
    ],
    read: false
  },
  {
    id: 'gl-n2-16',
    title: '～とは限らない (to wa kagiranai)',
    level: 'N2',
    explanation: 'Not necessarily...; not always the case that...',
    examples: [
      'お金持ちが必ずしも幸福だとは限らない。(Okanemochi ga kanarazushimo koufuku da to wa kagiranai.) - Being rich does not necessarily mean you are happy.',
      '日本に住んでいても、日本語が上手だとは限らない。(Nihon ni sundeitemo, nihongo ga jouzu da to wa kagiranai.) - Even if you live in Japan, it\'s not necessarily the case that you\'re good at Japanese.',
      '高いものが必ずしも良いものだとは限らない。(Takai mono ga kanarazushimo yoi mono da to wa kagiranai.) - Expensive things are not always good things.',
    ],
    read: false
  },
  {
    id: 'gl-n2-17',
    title: '～に決まっている (ni kimatteiru)',
    level: 'N2',
    explanation: 'Must be; definitely is. A subjective but strong conviction.',
    examples: [
      'そんなのうそに決まっている。(Sonna no uso ni kimatteiru.) - That must be a lie.',
      '彼が一番速いに決まっている。(Kare ga ichiban hayai ni kimatteiru.) - He is definitely the fastest.',
      'このチームが勝つに決まっている。(Kono chiimu ga katsu ni kimatteiru.) - This team is bound to win.',
    ],
    read: false
  },
  {
    id: 'gl-n2-18',
    title: '～ようでは (you dewa)',
    level: 'N2',
    explanation: 'If such a (bad) situation continues, a negative result is expected.',
    examples: [
      'こんなに失敗が多いようでは、成功は難しいだろう。(Konna ni shippai ga ooi you dewa, seikou wa muzukashii darou.) - If failures continue at this rate, success will be difficult.',
      'そんなに勉強しないようでは、試験に受からないよ。(Sonna ni benkyou shinai you dewa, shiken ni ukaranai yo.) - If you don\'t study that much, you won\'t pass the exam.',
      '毎日遅刻するようでは、信用を失うだろう。(Mainichi chikoku suru you dewa, shinyou o ushinau darou.) - If you are late every day, you will lose trust.',
    ],
    read: false
  },
  {
    id: 'gl-n2-19',
    title: '～か～ないかのうちに (ka~nai ka no uchi ni)',
    level: 'N2',
    explanation: 'As soon as; hardly had... when...',
    examples: [
      '彼はベッドに入るか入らないかのうちに、眠ってしまった。(Kare wa beddo ni hairu ka hairanai ka no uchi ni, nemutte shimatta.) - He fell asleep as soon as he got into bed.',
      '授業が終わるか終わらないかのうちに、彼は教室を飛び出した。(Jugyou ga owaru ka owaranai ka no uchi ni, kare wa kyoushitsu o tobidashita.) - He rushed out of the classroom the moment the class ended.',
      '一杯飲み終わるか終わらないかのうちに、二杯目を注文した。(Ippai nomiowaru ka owaranai ka no uchi ni, nihaime o chuumon shita.) - He had hardly finished his first drink when he ordered a second.',
    ],
    read: false
  },
  {
    id: 'gl-n2-20',
    title: '～際に (sai ni)',
    level: 'N2',
    explanation: 'A formal expression for "when" or "on the occasion of".',
    examples: [
      'お帰りの際に、この書類を提出してください。(Okaeri no sai ni, kono shorui o teishutsu shite kudasai.) - Please submit this document when you leave.',
      '来日の際に、色々お世話になりました。(Rainichi no sai ni, iroiro osewa ni narimashita.) - Thank you for all your help when I came to Japan.',
      '重要な決定をする際には、慎重に考えるべきだ。(Juuyou na kettei o suru sai ni wa, shinchou ni kangaeru beki da.) - One should think carefully when making important decisions.',
    ],
    read: false
  },
  {
    id: 'gl-n2-21',
    title: '～にあたって (ni atatte)',
    level: 'N2',
    explanation: 'At the time of; on the occasion of (for special events).',
    examples: [
      '新しい事業を始めるにあたって、資金を集めた。(Atarashii jigyou o hajimeru ni atatte, shikin o atsumeta.) - We raised funds to start a new business.',
      '開会にあたり、一言ご挨拶申し上げます。(Kaikai ni atari, hitokoto goaisatsu moushiagemasu.) - On the occasion of this opening, I would like to say a few words.',
      '留学にあたって、必要な手続きを済ませた。(Ryuugaku ni atatte, hitsuyou na tetsuduki o sumaseta.) - I completed the necessary procedures for studying abroad.',
    ],
    read: false
  },
  {
    id: 'gl-n2-22',
    title: '～最中に (saichuu ni)',
    level: 'N2',
    explanation: 'In the very middle of doing something (often interrupted).',
    examples: [
      'スピーチの最中に、停電した。(Supiichi no saichuu ni, teiden shita.) - The power went out in the middle of the speech.',
      '食事の最中に、電話が鳴った。(Shokuji no saichuu ni, denwa ga natta.) - The phone rang right in the middle of the meal.',
      '試験の最中に、お腹が痛くなった。(Shiken no saichuu ni, onaka ga itaku natta.) - My stomach started to hurt in the middle of the exam.',
    ],
    read: false
  },
  {
    id: 'gl-n2-23',
    title: '～ところだった (tokoro datta)',
    level: 'N2',
    explanation: 'Almost did something (but didn\'t).',
    examples: [
      'もう少しで、車にひかれるところだった。(Mou sukoshi de, kuruma ni hikareru tokoro datta.) - I was almost hit by a car.',
      '危ない！忘れるところだった。(Abunai! Wasureru tokoro datta.) - That was close! I almost forgot.',
      'うっかりして、秘密を話すところだった。(Ukkari shite, himitsu o hanasu tokoro datta.) - I was careless and almost revealed the secret.',
    ],
    read: false
  },
  {
    id: 'gl-n2-24',
    title: '～ずにはいられない (zu ni wa irarenai)',
    level: 'N2',
    explanation: 'Can\'t help but do; cannot refrain from doing.',
    examples: [
      '彼の話を聞いて、笑わずにはいられなかった。(Kare no hanashi o kiite, warawazu ni wa irarenakatta.) - Hearing his story, I couldn\'t help but laugh.',
      'あの感動的な映画を見て、泣かずにはいられない。(Ano kandouteki na eiga o mite, nakazu ni wa irarenai.) - Watching that moving film, I can\'t help but cry.',
      '彼の成功を喜ばずにはいられない。(Kare no seikou o yorokobazu ni wa irarenai.) - I can\'t help but be happy for his success.',
    ],
    read: false
  },
  {
    id: 'gl-n2-25',
    title: '～ざるを得ない (zaru o enai)',
    level: 'N2',
    explanation: 'Have no choice but to do (against one\'s will).',
    examples: [
      '台風のため、旅行は中止せざるを得なかった。(Taifuu no tame, ryokou wa chuushi sezaru o enakatta.) - Due to the typhoon, we had no choice but to cancel the trip.',
      '上司の命令なので、従わざるを得ない。(Joushi no meirei na node, shitagawazaru o enai.) - Since it\'s an order from my boss, I have no choice but to obey.',
      '本当は言いたくないが、真実を話さざるを得ない。(Hontou wa iitakunai ga, shinjitsu o hanasazaru o enai.) - I don\'t want to say it, but I have no choice but to tell the truth.',
    ],
    read: false
  },
  {
    id: 'gl-n2-26',
    title: '～どころか (dokoro ka)',
    level: 'N2',
    explanation: 'Far from; not at all; on the contrary.',
    examples: [
      '勉強どころか、毎日遊んでばかりいる。(Benkyou dokoro ka, mainichi asonde bakari iru.) - Far from studying, he just plays around every day.',
      '静かになるどころか、もっとうるさくなった。(Shizuka ni naru dokoro ka, motto urusaku natta.) - Far from becoming quiet, it got even noisier.',
      '彼は謝るどころか、私を非難した。(Kare wa ayamaru dokoro ka, watashi o hinan shita.) - Instead of apologizing, he blamed me.',
    ],
    read: false
  },
  {
    id: 'gl-n2-27',
    title: '～どころではない (dokoro de wa nai)',
    level: 'N2',
    explanation: 'Not the time/situation for...',
    examples: [
      '宿題がたくさんあって、テレビを見るどころではない。(Shukudai ga takusan atte, terebi o miru dokoro de wa nai.) - I have so much homework, it\'s not the time for watching TV.',
      '風邪がひどくて、旅行どころではない。(Kaze ga hidokute, ryokou dokoro de wa nai.) - My cold is so bad, this is no time for a trip.',
      '明日は試験なので、のんびりしているどころではない。(Ashita wa shiken na node, nonbiri shiteiru dokoro de wa nai.) - The exam is tomorrow, so I can\'t afford to be relaxing.',
    ],
    read: false
  },
  {
    id: 'gl-n2-28',
    title: '～というより (to iu yori)',
    level: 'N2',
    explanation: 'Rather than...; more like...',
    examples: [
      'この料理は、おいしいというより、珍しい味がする。(Kono ryouri wa, oishii to iu yori, mezurashii aji ga suru.) - This dish tastes more unique than delicious.',
      '彼は学者というより、むしろ小説家だ。(Kare wa gakusha to iu yori, mushiro shousetsuka da.) - He is more of a novelist than a scholar.',
      '涼しいというより寒いくらいだ。(Suzushii to iu yori samui kurai da.) - It\'s more like cold rather than cool.',
    ],
    read: false
  },
  {
    id: 'gl-n2-29',
    title: '～というと / ～といえば (to iu to / to ieba)',
    level: 'N2',
    explanation: 'Speaking of...; if you say...',
    examples: [
      '日本の食べ物といえば、やはり寿司でしょう。(Nihon no tabemono to ieba, yahari sushi deshou.) - Speaking of Japanese food, it has to be sushi.',
      '来週のパーティーというと、山田さんも来ますか。(Raishuu no paatii to iu to, Yamada san mo kimasu ka?) - Speaking of next week\'s party, is Mr. Yamada coming too?',
      'なぜ遅刻したかといえば、寝坊したからです。(Naze chikoku shita ka to ieba, nebou shita kara desu.) - If you ask why I was late, it\'s because I overslept.',
    ],
    read: false
  },
  {
    id: 'gl-n2-30',
    title: '～だけあって (dake atte)',
    level: 'N2',
    explanation: 'As expected of; precisely because...',
    examples: [
      'さすがに高級ホテルだけあって、サービスが素晴らしい。(Sasuga ni koukyuu hoteru dake atte, saabisu ga subarashii.) - As expected of a luxury hotel, the service is wonderful.',
      '彼はスポーツ選手だけあって、体格がいい。(Kare wa supootsu senshu dake atte, taikaku ga ii.) - As you would expect from an athlete, he has a great build.',
      'このレストランは有名なだけあって、いつも混んでいる。(Kono resutoran wa yuumei na dake atte, itsumo kondeiru.) - Precisely because this restaurant is famous, it is always crowded.',
    ],
    read: false
  },
  {
    id: 'gl-n2-31',
    title: '～だけに (dake ni)',
    level: 'N2',
    explanation: 'All the more because...',
    examples: [
      '期待していただけに、がっかりした。(Kitai shite ita dake ni, gakkari shita.) - I was all the more disappointed because I had high expectations.',
      '一生懸命練習しただけに、勝てて本当に嬉しい。(Isshoukenmei renshuu shita dake ni, katete hontou ni ureshii.) - I\'m truly happy I won, all the more because I practiced so hard.',
      '彼は経験が豊富なだけに、頼りになる。(Kare wa keiken ga houfu na dake ni, tayori ni naru.) - He is reliable, all the more because he has abundant experience.',
    ],
    read: false
  },
  {
    id: 'gl-n2-32',
    title: '～だけのことはある (dake no koto wa aru)',
    level: 'N2',
    explanation: 'No wonder...; it\'s worth...',
    examples: [
      '世界一周旅行をしただけのことはあって、彼の話は面白い。(Sekai isshuu ryokou o shita dake no koto wa atte, kare no hanashi wa omoshiroi.) - No wonder his stories are interesting, as he has traveled around the world.',
      'この値段だけのことはある。とても質がいい。(Kono nedan dake no koto wa aru. Totemo shitsu ga ii.) - It\'s worth this price. The quality is very good.',
      '毎日トレーニングしているだけのことはある。筋肉がすごい。(Mainichi toreeningu shiteiru dake no koto wa aru. Kinniku ga sugoi.) - It\'s no wonder he has amazing muscles; he trains every day.',
    ],
    read: false
  },
  {
    id: 'gl-n2-33',
    title: '～上で (ue de)',
    level: 'N2',
    explanation: 'Upon doing X, ... or For the purpose of X, ...',
    examples: [
      'よく考えた上で、結論を出してください。(Yoku kangaeta ue de, ketsuron o dashite kudasai.) - Please make a decision after thinking it over carefully.',
      'アンケート調査の上で、レポートを書きます。(Ankeeto chousa no ue de, repooto o kakimasu.) - I will write the report based on the survey.',
      '仕事をする上で、コミュニケーションは非常に重要だ。(Shigoto o suru ue de, komyunikeeshon wa hijou ni juuyou da.) - For doing work, communication is extremely important.',
    ],
    read: false
  },
  {
    id: 'gl-n2-34',
    title: '～上に (ue ni)',
    level: 'N2',
    explanation: 'In addition to; on top of...',
    examples: [
      'このレストランは、値段が高い上に、サービスも悪い。(Kono resutoran wa, nedan ga takai ue ni, saabisu mo warui.) - In addition to being expensive, this restaurant also has bad service.',
      '彼は日本語が話せる上に、英語もペラペラだ。(Kare wa nihongo ga hanaseru ue ni, eigo mo perapera da.) - On top of being able to speak Japanese, he is also fluent in English.',
      '道に迷った上に、雨まで降ってきた。(Michi ni mayotta ue ni, ame made futte kita.) - On top of getting lost, it even started to rain.',
    ],
    read: false
  },
  {
    id: 'gl-n2-35',
    title: '～にしても (ni shite mo)',
    level: 'N2',
    explanation: 'Even if; even for...',
    examples: [
      '行くにしても、行かないにしても、連絡してください。(Iku ni shite mo, ikanai ni shite mo, renraku shite kudasai.) - Please contact me whether you are going or not.',
      'いくら好きにしても、毎日食べるのは飽きる。(Ikura suki ni shitemo, mainichi taberu no wa akiru.) - No matter how much you like it, you get tired of eating it every day.',
      'この計画は、多くの問題があるにしても、進めるしかない。(Kono keikaku wa, ooku no mondai ga aru ni shitemo, susumeru shika nai.) - Even though this plan has many problems, we have no choice but to proceed.',
    ],
    read: false
  },
  {
    id: 'gl-n2-36',
    title: '～にしろ / ～にせよ (ni shiro / ni seyo)',
    level: 'N2',
    explanation: 'Whether ... or ...; even if ... (formal version of にしても).',
    examples: [
      '賛成するにせよ、反対するにせよ、理由を言うべきだ。(Sansei suru ni seyo, hantai suru ni seyo, riyuu o iu beki da.) - Whether you agree or disagree, you should state your reason.',
      'ビールにしろ、ワインにしろ、飲みすぎは体に悪い。(Biiru ni shiro, wain ni shiro, nomisugi wa karada ni warui.) - Whether it\'s beer or wine, drinking too much is bad for you.',
      '自分でやるにせよ、人に頼むにせよ、締め切りは守らなければならない。(Jibun de yaru ni seyo, hito ni tanomu ni seyo, shimekiri wa mamoranakereba naranai.) - Whether you do it yourself or ask someone else, you must meet the deadline.',
    ],
    read: false
  },
  {
    id: 'gl-n2-37',
    title: '～反面 (hanmen)',
    level: 'N2',
    explanation: 'On the other hand; while...',
    examples: [
      '都会の生活は便利な反面、ストレスも多い。(Tokai no seikatsu wa benri na hanmen, sutoresu mo ooi.) - Urban life is convenient, but on the other hand, it is also stressful.',
      '彼は優しい反面、厳しいところもある。(Kare wa yasashii hanmen, kibishii tokoro mo aru.) - While he is kind, he also has a strict side.',
      'この薬はよく効く反面、副作用も強い。(Kono kusuri wa yoku kiku hanmen, fukusayou mo tsuyoi.) - While this medicine is effective, its side effects are also strong.',
    ],
    read: false
  },
  {
    id: 'gl-n2-38',
    title: '～一方（で） (ippou de)',
    level: 'N2',
    explanation: 'On one hand... on the other hand; whereas...',
    examples: [
      '会議では自分の意見を主張する一方で、他の人の話もよく聞くべきだ。(Kaigi de wa jibun no iken o shuchou suru ippou de, hoka no hito no hanashi mo yoku kiku beki da.) - In meetings, while you should assert your own opinion, you should also listen well to others.',
      'この国では、都市の人口が増える一方で、農村の人口は減っている。(Kono kuni de wa, toshi no jinkou ga fueru ippou de, nouson no jinkou wa hetteiru.) - In this country, while the urban population is increasing, the rural population is decreasing.',
      '彼女は優れた研究者である一方で、二人の子供の母親でもある。(Kanojo wa sugureta kenkyuusha de aru ippou de, futari no kodomo no hahaoya de mo aru.) - While she is an excellent researcher, she is also a mother of two.',
    ],
    read: false
  },
  {
    id: 'gl-n2-39',
    title: '～かわりに (kawari ni)',
    level: 'N2',
    explanation: 'Instead of; in return for...',
    examples: [
      '今日は私が料理するかわりに、あなたは掃除をしてください。(Kyou wa watashi ga ryouri suru kawari ni, anata wa souji o shite kudasai.) - Instead of me cooking today, you please do the cleaning.',
      '車で来たかわりに、今日はビールが飲めない。(Kuruma de kita kawari ni, kyou wa biiru ga nomenai.) - In exchange for coming by car, I can\'t drink beer today.',
      '部長のかわりに、私が出張に行きます。(Buchou no kawari ni, watashi ga shucchou ni ikimasu.) - I will go on the business trip instead of the department manager.',
    ],
    read: false
  },
  {
    id: 'gl-n2-40',
    title: '～にともなって (ni tomonatte)',
    level: 'N2',
    explanation: 'As; along with; in proportion to...',
    examples: [
      '経済の発展にともなって、環境問題が深刻になった。(Keizai no hatten ni tomonatte, kankyou mondai ga shinkoku ni natta.) - Along with economic development, environmental problems have become serious.',
      '人口の増加にともなって、様々な問題が起きている。(Jinkou no zouka ni tomonatte, samazama na mondai ga okiteiru.) - Various problems are occurring along with the increase in population.',
      '年をとるにともなって、体力が衰えてきた。(Toshi o toru ni tomonatte, tairyoku ga otoroete kita.) - As I get older, my physical strength has declined.',
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
      '彼は、洋服から下着に至るまで、全て黒いものだ。(Kare wa, youfuku kara shitagi ni itaru made, subete kuroi mono da.) - From his clothes down to his underwear, everything he has is black.',
      'この店では、日用品から高級家具に至るまで、何でも揃っている。(Kono mise dewa, nichiyouhin kara koukyuu kagu ni itaru made, nandemo sorotteiru.) - This store has everything from daily necessities to luxury furniture.',
      '彼は自分の趣味について、細かい部分に至るまで詳しく話した。(Kare wa jibun no shumi ni tsuite, komakai bubun ni itaru made kuwashiku hanashita.) - He spoke about his hobbies in detail, down to the finest points.',
    ],
    read: false
  },
  {
    id: 'gl-n1-2',
    title: '～に至っては (ni itatte wa)',
    level: 'N1',
    explanation: 'When it comes to... Used to single out an extreme or remarkable example from a list.',
    examples: [
      '他の科目はまあまあだが、数学に至っては、全くできない。(Hoka no kamoku wa maa maa da ga, suugaku ni itatte wa, mattaku dekinai.) - His other subjects are so-so, but when it comes to math, he is completely hopeless.',
      '兄も弟も背が高いが、父に至っては１９０センチもある。(Ani mo otouto mo sei ga takai ga, chichi ni itatte wa hyakukyuujussenchi mo aru.) - My older and younger brothers are tall, but my father is an impressive 190cm.',
      '皆、彼を非難したが、親友の田中君に至っては、彼をかばおうともしなかった。(Minna, kare o hinan shita ga, shinyuu no Tanaka-kun ni itatte wa, kare o kabaou to mo shinakatta.) - Everyone criticized him, and as for his best friend Tanaka, he didn\'t even try to defend him.',
    ],
    read: false
  },
  {
    id: 'gl-n1-3',
    title: '～に至って (ni itatte)',
    level: 'N1',
    explanation: 'Only when; only at the point when... Expresses that a realization or action happens very late.',
    examples: [
      '死者が出るに至って、国は初めてその危険性を認めた。(Shisha ga deru ni itatte, kuni wa hajimete sono kikensei o mitometa.) - Only when deaths occurred did the country finally acknowledge the danger.',
      '事態が悪化するに至って、彼はようやく自分の間違いに気づいた。(Jitai ga akka suru ni itatte, kare wa youyaku jibun no machigai ni kizuita.) - He finally realized his mistake only after the situation had worsened.',
      '全てを失うに至って、家族の大切さを知った。(Subete o ushinau ni itatte, kazoku no taisetsusa o shitta.) - It was only when I had lost everything that I understood the importance of family.',
    ],
    read: false
  },
  {
    id: 'gl-n1-4',
    title: '～までもない (made mo nai)',
    level: 'N1',
    explanation: 'There is no need to...; it\'s not necessary to... Used for things that are obvious.',
    examples: [
      'それは言うまでもなく、彼の責任だ。(Sore wa iu made mo naku, kare no sekinin da.) - It goes without saying that it is his responsibility.',
      'このくらいの雨なら、傘をさすまでもない。(Kono kurai no ame nara, kasa o sasu made mo nai.) - If it\'s just this much rain, there\'s no need to use an umbrella.',
      'わざわざ確認するまでもなく、結果は明らかだ。(Wazawaza kakunin suru made mo naku, kekka wa akiraka da.) - The result is clear without needing to go out of my way to confirm it.',
    ],
    read: false
  },
  {
    id: 'gl-n1-5',
    title: '～にして (ni shite)',
    level: 'N1',
    explanation: 'Can mean "only" or "even" when referring to a person or time, highlighting something as exceptional or surprising.',
    examples: [
      'この問題を解けたのは、彼にして初めてだった。(Kono mondai o toketa no wa, kare ni shite hajimete datta.) - He was the first person to be able to solve this problem.',
      'この芸当は、名人にして初めて可能になる。(Kono geitou wa, meijin ni shite hajimete kanou ni naru.) - This feat becomes possible only for a master.',
      'わずか3日にして、彼はプロジェクトを完成させた。(Wazuka mikka ni shite, kare wa purojekuto o kansei saseta.) - In just three days, he completed the project.',
    ],
    read: false
  },
  {
    id: 'gl-n1-6',
    title: '～かたわら (katawara)',
    level: 'N1',
    explanation: 'While doing X (as a main activity), also doing Y. Formal.',
    examples: [
      '彼は大学で教えるかたわら、小説を書いている。(Kare wa daigaku de oshieru katawara, shousetsu o kaite iru.) - While teaching at the university, he also writes novels.',
      '母は主婦の仕事のかたわら、地域のボランティア活動にも参加している。(Haha wa shufu no shigoto no katawara, chiiki no borantia katsudou ni mo sanka shiteiru.) - While doing her work as a homemaker, my mother also participates in local volunteer activities.',
      '彼は会社員の仕事をするかたわら、夜はバンドでギターを弾いている。(Kare wa kaishain no shigoto o suru katawara, yoru wa bando de gitaa o hiiteiru.) - While working as a company employee, he also plays guitar in a band at night.',
    ],
    read: false
  },
  {
    id: 'gl-n1-7',
    title: '～とあって',
    level: 'N1',
    explanation: 'Due to the special situation that...; because... Used for special, unique circumstances.',
    examples: [
      '夏休みとあって、子供たちが大勢公園で遊んでいた。(Natsuyasumi to atte, kodomotachi ga oozei kouen de asonde ita.) - Because it was summer vacation, many children were playing in the park.',
      '有名人が来るとあって、会場は多くのファンでいっぱいだった。(Yuumeijin ga kuru to atte, kaijou wa ooku no fan de ippai datta.) - Because a celebrity was coming, the venue was filled with many fans.',
      '久しぶりの晴天とあって、洗濯物がよく乾いた。(Hisashiburi no seiten to atte, sentakumono ga yoku kawaita.) - Since it was the first clear day in a while, the laundry dried well.',
    ],
    read: false
  },
  {
    id: 'gl-n1-8',
    title: '～にあって (ni atte)',
    level: 'N1',
    explanation: 'In the condition/situation of... A formal expression.',
    examples: [
      'この困難な状況にあって、彼は冷静だった。(Kono konnan na joukyou ni atte, kare wa reisei datta.) - In this difficult situation, he was calm.',
      'グローバル化の時代にあって、語学力は不可欠だ。(Guroobaruka no jidai ni atte, gogakuryoku wa fukaketsu da.) - In this age of globalization, language skills are essential.',
      'どのような立場にあっても、誠実であるべきだ。(Dono you na tachiba ni atte mo, seijitsu de aru beki da.) - Whatever your position may be, you should be sincere.',
    ],
    read: false
  },
  {
    id: 'gl-n1-9',
    title: '～とあれば',
    level: 'N1',
    explanation: 'If it\'s for...; if it\'s a special case that... Expresses willingness to do something for a special reason.',
    examples: [
      '子供のためとあれば、どんなことでもします。(Kodomo no tame to areba, donna koto de mo shimasu.) - If it\'s for my child, I will do anything.',
      'お客様の頼みとあれば、断るわけにはいかない。(Okyakusama no tanomi to areba, kotowaru wake ni wa ikanai.) - If it\'s a request from a customer, I can\'t refuse.',
      'お金がもらえるとあれば、何でもする人がいる。(Okane ga moraeru to areba, nandemo suru hito ga iru.) - There are people who will do anything if it means they can get money.',
    ],
    read: false
  },
  {
    id: 'gl-n1-10',
    title: '～ようでは',
    level: 'N1',
    explanation: 'If such a (bad) situation continues, then... Implies a negative outcome.',
    examples: [
      'こんなにミスが多いようでは、安心して仕事を任せられない。(Konna ni misu ga ooi you dewa, anshin shite shigoto o makaserarenai.) - If you keep making this many mistakes, I can\'t trust you with the work.',
      '小さな失敗を気にするようでは、この仕事は務まらない。(Chiisana shippai o ki ni suru you dewa, kono shigoto wa tsutomaranai.) - If you worry about small mistakes, you won\'t be suited for this job.',
      '親に頼ってばかりいるようでは、自立できない。(Oya ni tayotte bakari iru you dewa, jiritsu dekinai.) - If you just keep relying on your parents, you won\'t be able to become independent.',
    ],
    read: false
  },
  {
    id: 'gl-n1-11',
    title: '～ずじまい (zu jimai)',
    level: 'N1',
    explanation: 'Ended up not doing something (that one intended to). Expresses regret.',
    examples: [
      '日本にいる間に、富士山に登れずじまいだった。(Nihon ni iru aida ni, Fujisan ni noborezu jimai datta.) - I ended up not being able to climb Mt. Fuji while I was in Japan.',
      '彼女に本当の気持ちを伝えられずじまいだった。(Kanojo ni hontou no kimochi o tsutaerarezu jimai datta.) - I ended up not being able to tell her my true feelings.',
      '読みたかった本を、結局読まずじまいだった。(Yomitakatta hon o, kekkyoku yomazu jimai datta.) - In the end, I never got around to reading the book I wanted to read.',
    ],
    read: false
  },
  {
    id: 'gl-n1-12',
    title: '～ではあるまいし',
    level: 'N1',
    explanation: 'It\'s not like...; it isn\'t as though... Used to negate an assumption.',
    examples: [
      '子供ではあるまいし、そんなことで泣くのはやめなさい。(Kodomo de wa arumai shi, sonna koto de naku no wa yamenasai.) - It\'s not like you\'re a child, so stop crying over such things.',
      '神様ではあるまいし、未来のことなど分かるはずがない。(Kamisama de wa arumai shi, mirai no koto nado wakaru hazu ga nai.) - It\'s not as though I\'m a god, so there\'s no way I would know the future.',
      '新人ではあるまいし、同じミスを繰り返すな。(Shinjin de wa arumai shi, onaji misu o kurikaesu na.) - You\'re not a rookie, so don\'t repeat the same mistake.',
    ],
    read: false
  },
  {
    id: 'gl-n1-13',
    title: '～にひきかえ (ni hikikae)',
    level: 'N1',
    explanation: 'In sharp contrast to... Used to highlight a strong difference.',
    examples: [
      '昨日の大雨にひきかえ、今日は素晴らしい天気だ。(Kinou no ooame ni hikikae, kyou wa subarashii tenki da.) - In sharp contrast to yesterday\'s heavy rain, the weather today is wonderful.',
      '兄が社交的なのにひきかえ、弟は内気だ。(Ani ga shakouteki na no ni hikikae, otouto wa uchiki da.) - In contrast to his sociable older brother, the younger brother is shy.',
      '去年の大成功にひきかえ、今年の業績は振るわない。(Kyonen no daiseikou ni hikikae, kotoshi no gyouseki wa furuwanai.) - In sharp contrast to last year\'s great success, this year\'s business performance is poor.',
    ],
    read: false
  },
  {
    id: 'gl-n1-14',
    title: '～にもまして (ni mo mashite)',
    level: 'N1',
    explanation: 'Even more than...; above and beyond... Used for emphasis.',
    examples: [
      '去年にもまして、今年は暑い。(Kyonen ni mo mashite, kotoshi wa atsui.) - This year is even hotter than last year.',
      '以前にもまして、彼女は美しくなった。(Izen ni mo mashite, kanojo wa utsukushiku natta.) - She has become even more beautiful than before.',
      '何にもまして、健康が一番だ。(Nani ni mo mashite, kenkou ga ichiban da.) - Health is the most important thing, more than anything else.',
    ],
    read: false
  },
  {
    id: 'gl-n1-15',
    title: '～べく (beku)',
    level: 'N1',
    explanation: 'A formal way of saying "in order to." Links two clauses.',
    examples: [
      '彼はサッカー選手になるべく、毎日練習している。(Kare wa sakkaa senshu ni naru beku, mainichi renshuu shite iru.) - In order to become a soccer player, he practices every day.',
      '真実を確かめるべく、我々は調査を開始した。(Shinjitsu o tashikameru beku, wareware wa chousa o kaishi shita.) - In order to ascertain the truth, we began an investigation.',
      '期待に応えるべく、全力を尽くします。(Kitai ni kotaeru beku, zenryoku o tsukushimasu.) - In order to meet expectations, I will do my utmost.',
    ],
    read: false
  },
  {
    id: 'gl-n1-16',
    title: '～べからず (bekarazu)',
    level: 'N1',
    explanation: 'A strong, formal prohibition meaning "must not". Often seen on signs.',
    examples: [
      '芝生に入るべからず。(Shibafu ni hairu bekarazu.) - Must not enter the grass.',
      'ここにゴミを捨てるべからず。(Koko ni gomi o suteru bekarazu.) - You must not throw trash here.',
      '落書きするべからず。(Rakugaki suru bekarazu.) - Do not graffiti.',
    ],
    read: false
  },
  {
    id: 'gl-n1-17',
    title: '～べくもない (beku mo nai)',
    level: 'N1',
    explanation: 'There is no way to...; it is impossible to...',
    examples: [
      '素人の私には、その絵の価値は知るべくもない。(Shirouto no watashi ni wa, sono e no kachi wa shiru beku mo nai.) - As an amateur, there is no way for me to know the value of that painting.',
      '結果は、比べるべくもないほど明らかだった。(Kekka wa, kuraberu beku mo nai hodo akiraka datta.) - The result was so obvious that it was impossible to compare.',
      '彼の気持ちを想像すべくもない。(Kare no kimochi o souzou suru beku mo nai.) - It is impossible to imagine his feelings.',
    ],
    read: false
  },
  {
    id: 'gl-n1-18',
    title: '～にたえない (ni taenai)',
    level: 'N1',
    explanation: 'Cannot bear to see/hear...; extremely... (expresses strong emotion).',
    examples: [
      'その事故の現場は、見るにたえないほどだった。(Sono jiko no genba wa, miru ni taenai hodo datta.) - The scene of that accident was unbearable to watch.',
      '彼のスピーチは聞くにたえない内容だった。(Kare no supiichi wa kiku ni taenai naiyou datta.) - His speech was so awful I couldn\'t bear to listen to it.',
      '彼の親切には感謝にたえません。(Kare no shinsetsu ni wa kansha ni taemasen.) - I am extremely grateful for his kindness.',
    ],
    read: false
  },
  {
    id: 'gl-n1-19',
    title: '～を皮切りに (o kawakiri ni)',
    level: 'N1',
    explanation: 'Starting with...; as a starting point...',
    examples: [
      '東京を皮切りに、全国でコンサートが行われる。(Tokyo o kawakiri ni, zenkoku de konsaato ga okonawareru.) - Starting with Tokyo, concerts will be held all across the country.',
      '彼の発言を皮切りに、議論が始まった。(Kare no hatsugen o kawakiri ni, giron ga hajimatta.) - Starting with his comment, the debate began.',
      'このアニメは、日本での放送を皮切りに、世界中で人気となった。(Kono anime wa, Nihon de no housou o kawakiri ni, sekaijuu de ninki to natta.) - Starting with its broadcast in Japan, this anime became popular all over the world.',
    ],
    read: false
  },
  {
    id: 'gl-n1-20',
    title: '～をもって (o motte)',
    level: 'N1',
    explanation: 'A formal way to say "with" or "by means of". Also used to indicate an end time.',
    examples: [
      '本日をもちまして、閉店させていただきます。(Honjitsu o mochimashite, heiten sasete itadakimasu.) - We will be closing our store as of today.',
      'これをもって、会議を終わります。(Kore o motte, kaigi o owarimasu.) - With this, we will end the meeting.',
      '実力をもって、彼に勝った。(Jitsuryoku o motte, kare ni katta.) - I beat him with my true ability.',
    ],
    read: false
  },
  {
    id: 'gl-n1-21',
    title: '～といえども (to iedomo)',
    level: 'N1',
    explanation: 'A formal way to say "even though" or "although".',
    examples: [
      '専門家といえども、間違うことはある。(Senmonka to iedomo, machigau koto wa aru.) - Even experts make mistakes.',
      'いかなる理由があるといえども、暴力は許されない。(Ikanaru riyuu ga aru to iedomo, bouryoku wa yurusarenai.) - No matter the reason, violence is unforgivable.',
      '子供といえども、一人の人間として尊重すべきだ。(Kodomo to iedomo, hitori no ningen toshite sonchou subeki da.) - Even though they are children, they should be respected as individuals.',
    ],
    read: false
  },
  {
    id: 'gl-n1-22',
    title: '～にしても～にしても (ni shitemo... ni shitemo)',
    level: 'N1',
    explanation: 'A more formal way of saying "whether... or...".',
    examples: [
      '行くにしても行かないにしても、連絡してください。(Iku ni shitemo ikanai ni shitemo, renraku shite kudasai.) - Whether you go or not, please contact me.',
      '買うにしても買わないにしても、一度見てみたほうがいい。(Kau ni shitemo kawanai ni shitemo, ichido mite mita hou ga ii.) - Whether you buy it or not, you should take a look at it once.',
      '賛成するにしても反対するにしても、自分の意見をはっきり言うべきだ。(Sansei suru ni shitemo hantai suru ni shitemo, jibun no iken o hakkiri iu beki da.) - Whether you agree or disagree, you should state your opinion clearly.',
    ],
    read: false
  },
  {
    id: 'gl-n1-23',
    title: '～たるもの (taru mono)',
    level: 'N1',
    explanation: 'As someone who is...; in the position of... Emphasizes the responsibilities of a certain role.',
    examples: [
      '教師たるもの、学生の模範でなければならない。(Kyoushi taru mono, gakusei no mohan de nakereba naranai.) - As a teacher, one must be a role model for students.',
      '医者たるもの、患者の命を最優先に考えるべきだ。(Isha taru mono, kanja no inochi o saiyuusen ni kangaeru beki da.) - A doctor should prioritize the lives of their patients.',
      '指導者たるもの、常に公平であるべきだ。(Shidousha taru mono, tsuneni kouhei de aru beki da.) - A leader must always be fair.',
    ],
    read: false
  },
  {
    id: 'gl-n1-24',
    title: '～をよそに (o yoso ni)',
    level: 'N1',
    explanation: 'Ignoring; in defiance of...; without regard for...',
    examples: [
      '親の心配をよそに、彼は一人で海外旅行に出かけた。(Oya no shinpai o yoso ni, kare wa hitori de kaigai ryokou ni dekaketa.) - Ignoring his parents\' worries, he went on an overseas trip by himself.',
      '住民の反対をよそに、工事は続けられた。(Juumin no hantai o yoso ni, kouji wa tsudzukerareta.) - The construction continued, ignoring the opposition of the residents.',
      '周りの忠告をよそに、彼は危険な投資に手を出した。(Mawari no chuukoku o yoso ni, kare wa kiken na toushi ni te o dashita.) - He got involved in a risky investment, ignoring the advice of those around him.',
    ],
    read: false
  },
  {
    id: 'gl-n1-25',
    title: '～に足る (ni taru)',
    level: 'N1',
    explanation: 'To be worthy of; to be deserving of...',
    examples: [
      '彼の行動は尊敬に足る。(Kare no koudou wa sonkei ni taru.) - His actions are worthy of respect.',
      'この作品は、後世に伝えるに足る価値がある。(Kono sakuhin wa, kousei ni tsutaeru ni taru kachi ga aru.) - This work has a value worthy of being passed down to future generations.',
      '彼は信頼するに足る人物だ。(Kare wa shinrai suru ni taru jinbutsu da.) - He is a person worthy of trust.',
    ],
    read: false
  },
  {
    id: 'gl-n1-26',
    title: '～を禁じ得ない (o kinjienai)',
    level: 'N1',
    explanation: 'Cannot help but feel...; cannot suppress...',
    examples: [
      'その話を聞いて、涙を禁じ得なかった。(Sono hanashi o kiite, namida o kinjienakatta.) - Hearing that story, I couldn\'t hold back my tears.',
      '彼の不正行為には、怒りを禁じ得ない。(Kare no fusei koui ni wa, ikari o kinjienai.) - I can\'t help but feel anger at his dishonest actions.',
      'その美しい風景に、感動を禁じ得なかった。(Sono utsukushii fuukei ni, kandou o kinjienakatta.) - I couldn\'t suppress my emotion at the beautiful scenery.',
    ],
    read: false
  },
  {
    id: 'gl-n1-27',
    title: '～にもほどがある (ni mo hodo ga aru)',
    level: 'N1',
    explanation: 'A strong expression of criticism meaning "That\'s too..."; "There\'s a limit to...".',
    examples: [
      '冗談にもほどがある。(Joudan ni mo hodo ga aru.) - That joke is going too far.',
      'わがままにもほどがあるぞ。(Wagamama ni mo hodo ga aru zo.) - There\'s a limit to how selfish you can be!',
      '厚かましいにもほどがある。(Atsukamashii ni mo hodo ga aru.) - That\'s just too shameless.',
    ],
    read: false
  },
  {
    id: 'gl-n1-28',
    title: '～といったところだ (to itta tokoro da)',
    level: 'N1',
    explanation: 'At most; about... Used to give a rough, often unimpressive, estimate.',
    examples: [
      '参加者は、せいぜい30人といったところだろう。(Sankasha wa, seizei sanjuu-nin to itta tokoro darou.) - The participants will number around 30 at most.',
      'この仕事、まあまあ順調といったところだ。(Kono shigoto, maa maa junchou to itta tokoro da.) - This job is going so-so, I guess.',
      'ここから駅まで、歩いて10分といったところだ。(Koko kara eki made, aruite juppun to itta tokoro da.) - It\'s about a 10-minute walk from here to the station.',
    ],
    read: false
  },
  {
    id: 'gl-n1-29',
    title: '～ならでは (narade wa)',
    level: 'N1',
    explanation: 'Unique to; characteristic of...',
    examples: [
      'これは京都ならではの美しい景色だ。(Kore wa Kyouto narade wa no utsukushii keshiki da.) - This is a beautiful sight unique to Kyoto.',
      'この味は、ベテランの料理人ならでは出せない。(Kono aji wa, beteran no ryourinin narade wa dasenai.) - This flavor can only be produced by a veteran chef.',
      '彼ならではの発想だ。(Kare narade wa no hassou da.) - That\'s an idea unique to him.',
    ],
    read: false
  },
  {
    id: 'gl-n1-30',
    title: '～なくしては～ない (naku shite wa... nai)',
    level: 'N1',
    explanation: 'Without... it\'s impossible to... Emphasizes necessity.',
    examples: [
      '皆さんの協力なくしては、成功はありえませんでした。(Minasan no kyouryoku naku shite wa, seikou wa ariemasen deshita.) - Without everyone\'s cooperation, success would have been impossible.',
      '努力なくして、成功はあり得ない。(Doryoku naku shite, seikou wa arienai.) - Without effort, success is impossible.',
      '愛なくして、人生は語れない。(Ai naku shite, jinsei wa katarenai.) - Life cannot be discussed without love.',
    ],
    read: false
  },
  {
    id: 'gl-n1-31',
    title: '～がてら (gatera)',
    level: 'N1',
    explanation: 'While doing A, also do B (A is the main purpose).',
    examples: [
      '散歩がてら、コンビニに寄ってきます。(Sanpo gatera, konbini ni yotte kimasu.) - I\'ll stop by the convenience store while I\'m out for a walk.',
      '夕涼みがてら、花火を見に行った。(Yuusuzumi gatera, hanabi o mi ni itta.) - We went to see the fireworks while enjoying the cool evening breeze.',
      '運動がてら、駅まで歩いた。(Undou gatera, eki made aruita.) - I walked to the station, partly for exercise.',
    ],
    read: false
  },
  {
    id: 'gl-n1-32',
    title: '～が早いか (ga hayai ka)',
    level: 'N1',
    explanation: 'As soon as; the moment... Emphasizes the immediacy of the next action.',
    examples: [
      '彼はベルが鳴るが早いか、教室を飛び出した。(Kare wa beru ga naru ga hayai ka, kyoushitsu o tobidashita.) - As soon as the bell rang, he flew out of the classroom.',
      '飛行機が着陸するが早いか、乗客たちは席を立った。(Hikouki ga chakuriku suru ga hayai ka, joukyaku tachi wa seki o tatta.) - The moment the plane landed, the passengers stood up.',
      '店が開くが早いか、客がなだれ込んできた。(Mise ga aku ga hayai ka, kyaku ga nadarekonde kita.) - As soon as the store opened, customers came flooding in.',
    ],
    read: false
  },
  {
    id: 'gl-n1-33',
    title: '～そばから (sobakara)',
    level: 'N1',
    explanation: 'As soon as... (something happens repeatedly). Implies a cycle of action and immediate counter-action.',
    examples: [
      '子供は片付けるそばから、おもちゃを散らかす。(Kodomo wa katadzukeru sobakara, omocha o chirakasu.) - As soon as I tidy up, the child messes up the toys again.',
      'このテキストは、覚えるそばから忘れてしまう。(Kono tekisuto wa, oboeru sobakara wasurete shimau.) - With this textbook, as soon as I learn something, I forget it.',
      '彼は聞いたそばから、何でも人に話してしまう。(Kare wa kiita sobakara, nandemo hito ni hanashite shimau.) - As soon as he hears something, he tells it to someone else.',
    ],
    read: false
  },
  {
    id: 'gl-n1-34',
    title: '～てからというもの (te kara to iu mono)',
    level: 'N1',
    explanation: 'Ever since... (a significant change occurred).',
    examples: [
      '子供が生まれてからというもの、生活がすっかり変わった。(Kodomo ga umarete kara to iu mono, seikatsu ga sukkari kawatta.) - Ever since my child was born, my life has completely changed.',
      '日本に来てからというもの、毎日が新しい発見の連続だ。(Nihon ni kite kara to iu mono, mainichi ga atarashii hakken no renzoku da.) - Ever since I came to Japan, every day has been a series of new discoveries.',
      '彼と出会ってからというもの、私の人生は明るくなった。(Kare to deatte kara to iu mono, watashi no jinsei wa akaruku natta.) - Ever since I met him, my life has become brighter.',
    ],
    read: false
  },
  {
    id: 'gl-n1-35',
    title: '～にあっては (ni atte wa)',
    level: 'N1',
    explanation: 'A formal way to say "in the case of" or "for".',
    examples: [
      '彼にあっては、そのようなミスは考えられない。(Kare ni atte wa, sono you na misu wa kangaerarenai.) - In his case, such a mistake is unthinkable.',
      '現代社会にあっては、コンピュータースキルは必須だ。(Gendai shakai ni atte wa, konpyuutaa sukiru wa hissu da.) - In modern society, computer skills are essential.',
      'この状況にあっては、最善の策を選ぶしかない。(Kono joukyou ni atte wa, saizen no saku o erabu shika nai.) - In this situation, we have no choice but to choose the best plan.',
    ],
    read: false
  },
  {
    id: 'gl-n1-36',
    title: '～いかんで / ～いかんによって (ikan de / ikan ni yotte)',
    level: 'N1',
    explanation: 'Depending on...; contingent on...',
    examples: [
      '試験の結果いかんでは、卒業できないかもしれない。(Shiken no kekka ikan de wa, sotsugyou dekinai kamoshirenai.) - Depending on the exam results, I might not be able to graduate.',
      '明日の天気いかんによっては、予定を変更します。(Ashita no tenki ikan ni yotte wa, yotei o henkou shimasu.) - We will change our plans depending on tomorrow\'s weather.',
      '彼の態度いかんでは、今後の取引を考え直す必要がある。(Kare no taido ikan de wa, kongo no torihiki o kangaenaosu hitsuyou ga aru.) - Depending on his attitude, we may need to reconsider future business.',
    ],
    read: false
  },
  {
    id: 'gl-n1-37',
    title: '～と相まって (to aimatte)',
    level: 'N1',
    explanation: 'Coupled with; together with... (creating a greater effect).',
    examples: [
      '彼の才能は、努力と相まって、素晴らしい成果を生んだ。(Kare no sainou wa, doryoku to aimatte, subarashii seika o unda.) - His talent, coupled with his effort, produced wonderful results.',
      '好天と相まって、イベントは大成功だった。(Kouten to aimatte, ibento wa daiseikou datta.) - Coupled with the fine weather, the event was a great success.',
      'インフレと円安が相まって、物価が急上昇している。(Infure to en\'yasu ga aimatte, bukka ga kyuujoushou shiteiru.) - Inflation, combined with the weak yen, is causing prices to soar.',
    ],
    read: false
  },
  {
    id: 'gl-n1-38',
    title: '～をおいて (o oite)',
    level: 'N1',
    explanation: 'No one/nothing but...; except for...',
    examples: [
      'この仕事ができるのは、彼をおいて他にいない。(Kono shigoto ga dekiru no wa, kare o oite hoka ni inai.) - There is no one but him who can do this job.',
      'このプロジェクトのリーダーは、あなたをおいて他に考えられない。(Kono purojekuto no riidaa wa, anata o oite hoka ni kangaerarenai.) - I can\'t think of anyone but you to be the leader of this project.',
      '日本一の景色と言えば、富士山をおいて他にないだろう。(Nihon\'ichi no keshiki to ieba, Fujisan o oite hoka ni nai darou.) - Speaking of the best scenery in Japan, there is none other than Mt. Fuji.',
    ],
    read: false
  },
  {
    id: 'gl-n1-39',
    title: '～ずにはおかない (zu ni wa okanai)',
    level: 'N1',
    explanation: 'Will definitely...; will certainly cause... (often used for natural consequences).',
    examples: [
      '彼のスピーチは、聞く者すべてを感動させずにはおかないだろう。(Kare no supiichi wa, kiku mono subete o kandou sasezu ni wa okanai darou.) - His speech will surely move all who hear it.',
      'この映画のラストシーンは、見る者を泣かせずにはおかない。(Kono eiga no rasuto shiin wa, miru mono o nakasezu ni wa okanai.) - The last scene of this movie will definitely make the viewers cry.',
      '彼の行為は、社会に大きな影響を与えずにはおかない。(Kare no koui wa, shakai ni ookina eikyou o ataezu ni wa okanai.) - His actions will certainly have a great impact on society.',
    ],
    read: false
  },
  {
    id: 'gl-n1-40',
    title: '～だに (dani)',
    level: 'N1',
    explanation: 'A literary expression for "even just" or "even the mere...". Often used with verbs like imagine or hear.',
    examples: [
      'その事故のことは、思い出すだに恐ろしい。(Sono jiko no koto wa, omoidasu dani osoroshii.) - Just remembering that accident is horrifying.',
      '夢にだに見なかった。(Yume ni dani minakatta.) - I didn\'t even see it in my dreams.',
      '想像だにしなかった未来が、現実になった。(Souzou dani shinakatta mirai ga, genjitsu ni natta.) - A future I couldn\'t even imagine has become reality.',
    ],
    read: false
  },
];
