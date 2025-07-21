
import type { GrammarLesson } from './data';

export const grammarLessons: GrammarLesson[] = [
  // N5 Grammar Lessons from https://jlptsensei.com/jlpt-n5-grammar-list/
  {
    id: 'gl-n5-1',
    title: 'AはBです (A wa B desu)',
    level: 'N5',
    explanation: 'The most basic sentence structure, stating that A is B. 「は」 is the topic marker, and 「です」 is the polite copula (is/am/are).',
    examples: [
      '私は学生です。 (Watashi wa gakusei desu.) - I am a student.',
      'これは本です。 (Kore wa hon desu.) - This is a book.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-2',
    title: '～か (ka) - Question Particle',
    level: 'N5',
    explanation: 'The particle「か」(ka) is added to the end of a sentence to turn it into a question. No word order change is needed.',
    examples: [
      'あれはあなたの傘ですか。 (Are wa anata no kasa desu ka?) - Is that your umbrella?',
      '田中さんは日本人ですか。 (Tanaka-san wa nihonjin desu ka?) - Is Mr. Tanaka Japanese?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-3',
    title: '～の (no) - Possession Particle',
    level: 'N5',
    explanation: 'The particle「の」(no) connects two nouns, showing possession or attribution, similar to "of" or an apostrophe ‘s’ in English.',
    examples: [
      'これは私の本です。 (Kore wa watashi no hon desu.) - This is my book.',
      '日本語の先生 (Nihongo no sensei) - Teacher of Japanese.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-4',
    title: '～も (mo) - Also, Too',
    level: 'N5',
    explanation: 'The particle「も」(mo) means "also" or "too." It replaces the topic marker「は」(wa) or the subject marker「が」(ga).',
    examples: [
      '私も学生です。 (Watashi mo gakusei desu.) - I am also a student.',
      '犬も好きです。 (Inu mo suki desu.) - I also like dogs.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-5',
    title: '～から / ～まで (kara / made) - From / Until',
    level: 'N5',
    explanation: '「から」(kara) indicates a starting point in time or place. 「まで」(made) indicates an ending point.',
    examples: [
      '学校は九時からです。 (Gakkou wa kuji kara desu.) - School is from 9 o\'clock.',
      '銀行は三時までです。 (Ginkou wa sanji made desu.) - The bank is open until 3 o\'clock.',
      '大阪から東京まで (Oosaka kara Toukyou made) - From Osaka to Tokyo.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-6',
    title: '～と (to) - And',
    level: 'N5',
    explanation: 'The particle「と」(to) is used to connect two or more nouns in an exhaustive list.',
    examples: [
      '犬と猫が好きです。 (Inu to neko ga suki desu.) - I like dogs and cats.',
      'パンと卵を買いました。 (Pan to tamago o kaimashita.) - I bought bread and eggs.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-7',
    title: '～を (o) - Object Particle',
    level: 'N5',
    explanation: 'The particle「を」(o) marks the direct object of a transitive verb. It indicates the "thing" that is being acted upon.',
    examples: [
      'パンを食べます。 (Pan o tabemasu.) - I eat bread.',
      'ジュースを飲みました。 (Juusu o nomimashita.) - I drank juice.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-8',
    title: '～に / ～へ (ni / e) - Direction Particles',
    level: 'N5',
    explanation: 'Both「に」(ni) and「へ」(e) mark the direction or destination of movement.「へ」emphasizes the direction, while「に」emphasizes the arrival point.',
    examples: [
      '日本へ行きます。 (Nihon e ikimasu.) - I am going to Japan.',
      '彼は部屋にいます。 (Kare wa heya ni imasu.) - He is in the room.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-9',
    title: '～で (de) - Place of Action',
    level: 'N5',
    explanation: 'The particle「で」(de) indicates the location where an action takes place.',
    examples: [
      '図書館で勉強します。 (Toshokan de benkyou shimasu.) - I study at the library.',
      'レストランで食べましょう。 (Resutoran de tabemashou.) - Let\'s eat at a restaurant.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-10',
    title: '～が あります / います (ga arimasu / imasu) - There is / are',
    level: 'N5',
    explanation: '「あります」(arimasu) is used for inanimate objects, while「います」(imasu) is used for animate objects like people and animals.',
    examples: [
      '机の上に本があります。 (Tsukue no ue ni hon ga arimasu.) - There is a book on the desk.',
      '公園に子供がいます。 (Kouen ni kodomo ga imasu.) - There are children in the park.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-11',
    title: 'Verb Conjugation: ます (masu) Form',
    level: 'N5',
    explanation: 'The -masu form is the polite, non-past (present and future) tense for verbs. It is used in formal situations.',
    examples: [
      '毎日、新聞を読みます。 (Mainichi, shinbun o yomimasu.) - I read the newspaper every day.',
      '明日、京都へ行きます。 (Ashita, Kyouto e ikimasu.) - I will go to Kyoto tomorrow.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-12',
    title: 'Verb Conjugation: ませんでした (masen deshita) - Past Negative',
    level: 'N5',
    explanation: 'To make a polite verb past negative, you use「ませんでした」(masen deshita).',
    examples: [
      '今朝、何も食べませんでした。 (Kesa, nani mo tabemasen deshita.) - I didn\'t eat anything this morning.',
      '昨日は勉強しませんでした。 (Kinou wa benkyou shimasen deshita.) - I did not study yesterday.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-13',
    title: 'Adjectives: い (i) and な (na)',
    level: 'N5',
    explanation: 'Japanese has two types of adjectives. い-adjectives end in い (e.g., 高い - takai). な-adjectives require な when they modify a noun (e.g., きれいな - kirei na).',
    examples: [
      'これは高い本です。 (Kore wa takai hon desu.) - This is an expensive book.',
      '富士山はきれいな山です。 (Fujisan wa kirei na yama desu.) - Mt. Fuji is a beautiful mountain.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-14',
    title: 'Verb: ～ませんか (masen ka) - Invitation',
    level: 'N5',
    explanation: 'Attaching「ませんか」(masen ka) to the stem of a verb is a polite way to invite someone to do something. "Won\'t you...?" or "How about...?"',
    examples: [
      '一緒に映画を見ませんか。 (Issho ni eiga o mimasen ka?) - Won\'t you watch a movie with me?',
      'お茶を飲みませんか。 (Ocha o nomimasen ka?) - Would you like to have some tea?',
    ],
    read: false,
  },
  {
    id: 'gl-n5-15',
    title: 'Verb: ～ましょう (mashou) - Let\'s',
    level: 'N5',
    explanation: 'Attaching「ましょう」(mashou) to the stem of a verb is used to suggest doing something together ("Let\'s...").',
    examples: [
      'レストランで食べましょう。 (Resutoran de tabemashou.) - Let\'s eat at a restaurant.',
      'テニスをしましょう。 (Tenisu o shimashou.) - Let\'s play tennis.',
    ],
    read: false,
  },

  // N4 Grammar Lessons from https://jlptsensei.com/jlpt-n4-grammar-list/
  {
    id: 'gl-n4-1',
    title: 'Potential Form (～ことができる / える)',
    level: 'N4',
    explanation: 'The potential form expresses ability ("can do"). It can be formed with「ことができます」(koto ga dekimasu) or by conjugating the verb itself.',
    examples: [
      '私は漢字を読むことができます。 (Watashi wa kanji o yomu koto ga dekimasu.) - I can read Kanji.',
      '彼は寿司が食べられます。 (Kare wa sushi ga taberaremasu.) - He can eat sushi.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-2',
    title: '～前に (mae ni) - Before',
    level: 'N4',
    explanation: 'Use the dictionary form of a verb followed by「前に」(mae ni) to mean "before doing X".',
    examples: [
      '寝る前に、本を読みます。 (Neru mae ni, hon o yomimasu.) - I read a book before sleeping.',
      '日本へ来る前に、日本語を勉強しました。 (Nihon e kuru mae ni, nihongo o benkyou shimashita.) - I studied Japanese before coming to Japan.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-3',
    title: '～てから (te kara) - After',
    level: 'N4',
    explanation: 'Use the te-form of a verb followed by「から」(kara) to mean "after doing X".',
    examples: [
      '宿題をしてから、テレビを見ます。 (Shukudai o shite kara, terebi o mimasu.) - I will watch TV after doing my homework.',
      '手を洗ってから、ご飯を食べてください。 (Te o aratte kara, gohan o tabete kudasai.) - Please eat after washing your hands.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-4',
    title: '～た後で (ta ato de) - After',
    level: 'N4',
    explanation: 'Use the past-tense (ta-form) of a verb followed by「後で」(ato de) to also mean "after doing X". It emphasizes the completion of the first action.',
    examples: [
      '映画を見た後で、食事をしました。 (Eiga o mita ato de, shokuji o shimashita.) - After watching the movie, we had a meal.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-5',
    title: '～たり～たりする (tari...tari suru) - To do things like A and B',
    level: 'N4',
    explanation: 'Used to list multiple actions or states as examples, without implying a strict sequence.',
    examples: [
      '週末は、本を読んだり、映画を見たりします。 (Shuumatsu wa, hon o yondari, eiga o mitari shimasu.) - On weekends, I do things like reading books and watching movies.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-6',
    title: '～たことがある (ta koto ga aru) - To have the experience of',
    level: 'N4',
    explanation: 'Use the past-tense (ta-form) of a verb followed by「ことがある」(koto ga aru) to express that you have had the experience of doing something.',
    examples: [
      '日本へ行ったことがありますか。 (Nihon e itta koto ga arimasu ka.) - Have you ever been to Japan?',
      '馬に乗ったことがありません。 (Uma ni notta koto ga arimasen.) - I have never ridden a horse.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-7',
    title: 'Conditional ～と (to)',
    level: 'N4',
    explanation: 'The「と」(to) conditional is used for natural, inevitable results or when giving directions. "If/When A happens, B always happens."',
    examples: [
      '春になると、桜が咲きます。 (Haru ni naru to, sakura ga sakimasu.) - When spring comes, the cherry blossoms bloom.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-8',
    title: 'Conditional ～ば (ba)',
    level: 'N4',
    explanation: 'The「ば」(ba) conditional is used for general "if" statements. It focuses on the condition that needs to be met for the result to happen.',
    examples: [
      '安ければ、買います。 (Yasukereba, kaimasu.) - If it\'s cheap, I will buy it.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-9',
    title: 'Conditional ～たら (tara)',
    level: 'N4',
    explanation: 'The「たら」(tara) conditional is very versatile and common. It is used for specific, one-time "if/when" situations.',
    examples: [
      '日本へ行ったら、寿司を食べたいです。 (Nihon e ittara, sushi o tabetai desu.) - If/When I go to Japan, I want to eat sushi.',
    ],
    read: false,
  },
  {
    id: 'gl-n4-10',
    title: '～と思います (to omoimasu) - I think',
    level: 'N4',
    explanation: 'Use the plain form of a verb or adjective followed by「と思います」(to omoimasu) to express your opinion or thought.',
    examples: [
      '明日は雨が降ると思います。 (Ashita wa ame ga furu to omoimasu.) - I think it will rain tomorrow.',
    ],
    read: false,
  },

  // N3 Grammar Lessons from https://jlptsensei.com/jlpt-n3-grammar-list/
  {
    id: 'gl-n3-1',
    title: 'Passive Voice: ～(ら)れる',
    level: 'N3',
    explanation: 'The passive voice is used when the subject is acted upon. It can show inconvenience (the "suffering passive").',
    examples: [
      '私は先生に褒められました。 (Watashi wa sensei ni homeraremashita.) - I was praised by the teacher.',
      '弟にケーキを食べられました。 (Otōto ni kēki o taberaremashita.) - My cake was eaten by my little brother.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-2',
    title: 'Causative Form: ～(さ)せる',
    level: 'N3',
    explanation: 'The causative form expresses "to make" or "to let" someone do something.',
    examples: [
      '先生は学生に宿題をたくさんさせた。 (Sensei wa gakusei ni shukudai o takusan saseta.) - The teacher made the students do a lot of homework.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-3',
    title: 'Causative-Passive: ～(さ)せられる',
    level: 'N3',
    explanation: 'This form combines the causative and passive, meaning "to be made to do" something, often against one\'s will.',
    examples: [
      '私は部長に遅くまで残業させられた。 (Watashi wa buchō ni osoku made zangyō saserareta.) - I was made to work overtime until late by my manager.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-4',
    title: '～おかげで / ～せいで',
    level: 'N3',
    explanation: '「おかげで」(okage de) is used for positive outcomes ("thanks to..."). 「せいで」(sei de) is used for negative outcomes ("because of...").',
    examples: [
      '先生のおかげで、試験に合格しました。 (Sensei no okage de, shiken ni gōkaku shimashita.) - Thanks to my teacher, I passed the exam.',
      '事故のせいで、電車が遅れました。 (Jiko no sei de, densha ga okuremashita.) - Because of the accident, the train was late.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-5',
    title: '～ばかり (bakari) - Nothing but, Just',
    level: 'N3',
    explanation: 'Expresses that someone does nothing but one action, or that something is full of one thing.',
    examples: [
      '彼は遊んでばかりいる。 (Kare wa asonde bakari iru.) - He does nothing but play.',
      'テレビを見たばかりです。 (Terebi o mita bakari desu.) - I have just finished watching TV.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-6',
    title: '～ようだ / ～みたいだ - Seems like',
    level: 'N3',
    explanation: 'These express that something seems to be a certain way based on sensory evidence or logical deduction.「みたい」is more conversational.',
    examples: [
      '彼は病気のようです。 (Kare wa byōki no yō desu.) - It seems that he is sick.',
      'この料理は、ちょっと辛いみたいだ。 (Kono ryouri wa, chotto karai mitai da.) - This dish seems a bit spicy.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-7',
    title: '～らしい (rashii) - I heard that',
    level: 'N3',
    explanation: 'Used to convey information that was heard from someone else (hearsay).',
    examples: [
      '田中さんは、来月結婚するらしいです。 (Tanaka-san wa, raigetsu kekkon suru rashii desu.) - I heard that Mr. Tanaka is getting married next month.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-8',
    title: '～に比べて (ni kurabete) - Compared to',
    level: 'N3',
    explanation: 'Used to make a direct comparison between two things.',
    examples: [
      '今年は去年に比べて、雨が多い。 (Kotoshi wa kyonen ni kurabete, ame ga ooi.) - Compared to last year, it has rained a lot this year.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-9',
    title: '～に対して (ni taishite) - Towards, In contrast to',
    level: 'N3',
    explanation: 'Can mean "towards" a person/group, or "in contrast to" when comparing two different things.',
    examples: [
      '先生に対して、失礼な態度をとってはいけません。 (Sensei ni taishite, shitsurei na taido o totte wa ikemasen.) - You must not have a rude attitude towards your teacher.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-10',
    title: '～ために / ～ように',
    level: 'N3',
    explanation: 'Both express purpose.「ために」(tame ni) is used for goals where the subject has direct control.「ように」(you ni) is used for outcomes beyond direct control.',
    examples: [
      '家を買うために、貯金しています。 (Ie o kau tame ni, chokin shiteimasu.) - I am saving money in order to buy a house.',
      '日本語が話せるように、毎日勉強しています。 (Nihongo ga hanaseru you ni, mainichi benkyou shiteimasu.) - I study every day so that I can become able to speak Japanese.',
    ],
    read: false,
  },

  // N2 Grammar Lessons from https://jlptsensei.com/jlpt-n2-grammar-list/
  {
    id: 'gl-n2-1',
    title: '～べき / ～べきだ',
    level: 'N2',
    explanation: 'Expresses a strong "should" based on opinion or morality; something that is the right thing to do.',
    examples: [
      '学生はもっと勉強するべきだ。 (Gakusei wa motto benkyō suru beki da.) - Students should study more.',
      '約束は守るべきだ。 (Yakusoku wa mamoru beki da.) - Promises should be kept.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-2',
    title: '～のに / ～にもかかわらず',
    level: 'N2',
    explanation: 'Both mean "despite" or "even though."「のに」often carries a nuance of surprise or complaint.「にもかかわらず」is more formal.',
    examples: [
      '約束したのに、彼は来なかった。 (Yakusoku shita noni, kare wa konakatta.) - Even though he promised, he didn\'t come.',
      '大雨にもかかわらず、試合は行われた。 (Ōame nimo kakawarazu, shiai wa okonawareta.) - The game was held despite the heavy rain.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-3',
    title: '～として (toshite) - As',
    level: 'N2',
    explanation: 'Marks the role, capacity, or status of someone or something.',
    examples: [
      '彼は医者として、多くの命を救った。 (Kare wa isha toshite, Ōku no inochi o sukutta.) - As a doctor, he saved many lives.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-4',
    title: '～わけではない',
    level: 'N2',
    explanation: 'Used for partial negation. It means "it\'s not that..." or "it doesn\'t necessarily mean that...".',
    examples: [
      '高い料理がすべて美味しいわけではない。 (Takai ryōri ga subete oishii wake dewa nai.) - It\'s not that all expensive food is delicious.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-5',
    title: '～以上は (ijou wa) - Now that, Since',
    level: 'N2',
    explanation: 'Means "now that," "since," or "as long as," expressing a strong sense of duty or determination based on a fact.',
    examples: [
      '約束した以上は、守らなければならない。 (Yakusoku shita ijou wa, mamoranakereba naranai.) - Now that you have promised, you must keep it.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-6',
    title: '～得る (uru / eru) - Can, Is possible',
    level: 'N2',
    explanation: 'A formal way to express that something is possible. Attached to the verb stem.',
    examples: [
      'それはあり得ることだ。 (Sore wa ariuru koto da.) - That is something that could happen.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-7',
    title: '～かねない (kanenai) - Might happen (negative)',
    level: 'N2',
    explanation: 'Attached to a verb stem to express that there is a possibility that something bad might happen.',
    examples: [
      'あんなにスピードを出したら、事故を起こしかねない。 (Anna ni supiido o dashitara, jiko o okoshikanenai.) - If you speed like that, you might cause an accident.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-8',
    title: '～に際して (ni saishite) - On the occasion of',
    level: 'N2',
    explanation: 'A formal expression used for special, important events, meaning "at the time of" or "on the occasion of".',
    examples: [
      '開店に際して、多くの友人からお祝いをいただいた。 (Kaiten ni saishite, Ōku no yūjin kara oiwai o itadaita.) - On the occasion of my store opening, I received congratulations from many friends.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-9',
    title: '～にこたえて (ni kotaete) - In response to',
    level: 'N2',
    explanation: 'Means "in response to" expectations, requests, or hopes.',
    examples: [
      '親の期待にこたえて、彼は医者になった。 (Oya no kitai ni kotaete, kare wa isha ni natta.) - In response to his parents\' expectations, he became a doctor.',
    ],
    read: false,
  },
  {
    id: 'gl-n2-10',
    title: '～に違いない (ni chigainai) - I\'m sure that...',
    level: 'N2',
    explanation: 'Expresses the speaker\'s strong conviction or certainty about something.',
    examples: [
      '鍵がない。どこかに落としたに違いない。 (Kagi ga nai. Dokoka ni otoshita ni chigainai.) - I don\'t have my keys. I must have dropped them somewhere.',
    ],
    read: false,
  },

  // N1 Grammar Lessons from https://jlptsensei.com/jlpt-n1-grammar-list/
  {
    id: 'gl-n1-1',
    title: '～にほかならない (ni hoka naranai) - Is nothing other than',
    level: 'N1',
    explanation: 'A very strong, formal expression used to assert that something is precisely X and nothing else.',
    examples: [
      'このプロジェクトの失敗は、準備不足の結果にほかならない。 (Kono purojekuto no shippai wa, junbi busoku no kekka ni hokanaranai.) - The failure of this project is nothing other than the result of a lack of preparation.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-2',
    title: '～なくしては (nakushite wa) - Without',
    level: 'N1',
    explanation: 'This expresses that if X did not exist, Y would be impossible. It strongly emphasizes the necessity of X.',
    examples: [
      '皆様の協力なくしては、この成功はありませんでした。 (Minasama no kyōryoku nakushite wa, kono seikō wa arimasen deshita.) - Without everyone\'s cooperation, this success would not have been possible.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-3',
    title: '～からといって (kara to itte) - Just because',
    level: 'N1',
    explanation: 'Used to state that a reason is not sufficient for a particular conclusion. "Just because A, it doesn\'t mean B."',
    examples: [
      '日本人だからといって、誰もが漢字を完璧に知っているわけではない。 (Nihonjin da kara to itte, daremo ga kanji o kanpeki ni shitte iru wake dewa nai.) - Just because someone is Japanese doesn\'t mean they all know kanji perfectly.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-4',
    title: '～とはいえ (to wa ie) - Nevertheless, Although',
    level: 'N1',
    explanation: 'A concessive conjunction used to mean "although," "nevertheless," or "be that as it may." It acknowledges a fact but then presents a contrasting point.',
    examples: [
      'まだ４月とはいえ、寒い日もある。 (Mada shigatsu to wa ie, samui hi mo aru.) - Although it is April, there are still some cold days.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-5',
    title: '～かのようだ (ka no you da) - As if',
    level: 'N1',
    explanation: 'Used to make a comparison to something that is not literally true, creating a simile. "as if," "as though," "just like."',
    examples: [
      '彼は、全てを知っているかのように話す。 (Kare wa, subete o shitte iru ka no you ni hanasu.) - He talks as if he knows everything.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-6',
    title: '～ずにはいられない (zu ni wa irarenai) - Can\'t help but do',
    level: 'N1',
    explanation: 'Expresses an uncontrollable urge or feeling; "can\'t help but do/feel." Similar to ～ないではいられない.',
    examples: [
      '彼の冗談を聞いて、笑わずにはいられなかった。 (Kare no joudan o kiite, warawazu ni wa irarenakatta.) - Hearing his joke, I couldn\'t help but laugh.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-7',
    title: '～ないものでもない (nai mono de mo nai) - Not impossible',
    level: 'N1',
    explanation: 'A double negative that expresses that something is not entirely impossible, though it might be difficult.',
    examples: [
      '頑張れば、できなものでもない。 (Ganbareba, dekinai mono de mo nai.) - If you try hard, it\'s not as if you can\'t do it.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-8',
    title: '～を禁じ得ない (o kinjienai) - Cannot suppress',
    level: 'N1',
    explanation: 'A formal and literary expression meaning "cannot help but feel/do" or "can\'t suppress" a certain emotion.',
    examples: [
      'その悲しいニュースに涙を禁じ得なかった。 (Sono kanashii nyuusu ni namida o kinjienakatta.) - I could not suppress my tears at the sad news.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-9',
    title: '～を余儀なくされる (o yoginaku sareru) - To be forced to',
    level: 'N1',
    explanation: 'A formal expression meaning to be forced into an undesirable situation by circumstances beyond one\'s control.',
    examples: [
      '大雪のため、フライトの欠航を余儀なくされた。 (Ooyuki no tame, furaito no kekkou o yoginaku sareta.) - Due to the heavy snow, we were forced to accept the flight\'s cancellation.',
    ],
    read: false,
  },
  {
    id: 'gl-n1-10',
    title: '～といったらない (to ittara nai) - Extremely',
    level: 'N1',
    explanation: 'A colloquial expression used at the end of a sentence to emphasize the extreme degree of a state or feeling. Often used with surprise or exasperation.',
    examples: [
      '彼の部屋の汚さといったらなかった。 (Kare no heya no kitanasa to ittara nakatta.) - The dirtiness of his room was just unbelievable.',
    ],
    read: false,
  },
];
