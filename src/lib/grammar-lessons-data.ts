
import type { GrammarLesson } from './data';

export const grammarLessons: GrammarLesson[] = [
  // N5 Lessons
  {
    id: 'gl-n5-1',
    title: 'AはBです (A is B)',
    level: 'N5',
    explanation: 'This is the most basic sentence structure in Japanese. It is used to state that A is B. 「は」 (wa) is the topic marker particle, and 「です」 (desu) is the polite copula, similar to "is/am/are".',
    examples: [
      '私は学生です。 (Watashi wa gakusei desu.) - I am a student.',
      'これは本です。 (Kore wa hon desu.) - This is a book.',
      '明日は晴れです。 (Ashita wa hare desu.) - Tomorrow will be sunny.',
    ],
    read: true,
  },
  {
    id: 'gl-n5-2',
    title: 'Particle も (mo) - "also, too"',
    level: 'N5',
    explanation: 'The particle 「も」 (mo) is used to mean "also" or "too". It replaces the topic marker 「は」 (wa) when you are stating that something has the same quality or is in the same state as something else mentioned previously.',
    examples: [
      'A: 私は日本人です。 (Watashi wa nihonjin desu.) - I am Japanese.',
      'B: 私も日本人です。 (Watashi mo nihonjin desu.) - I am also Japanese.',
      '犬が好きです。猫も好きです。 (Inu ga suki desu. Neko mo suki desu.) - I like dogs. I also like cats.',
    ],
    read: false,
  },
  {
    id: 'gl-n5-3',
    title: 'Particle の (no) - "possessive"',
    level: 'N5',
    explanation: 'The particle 「の」 (no) is used to show possession, similar to "apostrophe s" in English. It connects two nouns, where the first noun possesses or describes the second noun.',
    examples: [
      '私の名前は田中です。 (Watashi no namae wa Tanaka desu.) - My name is Tanaka.',
      'これは友達の傘です。 (Kore wa tomodachi no kasa desu.) - This is my friend\'s umbrella.',
      '日本の車は高いです。 (Nihon no kuruma wa takai desu.) - Japanese cars are expensive.',
    ],
    read: false,
  },
  // N4 Lessons
  {
    id: 'gl-n4-1',
    title: 'Potential Form (～ことができます)',
    level: 'N4',
    explanation: 'The potential form expresses ability, i.e., that someone "can" do something. One way to form this is by using a verb in dictionary form followed by 「ことができます」 (koto ga dekimasu).',
    examples: [
      '私は日本語を話すことができます。 (Watashi wa nihongo o hanasu koto ga dekimasu.) - I can speak Japanese.',
      '彼は漢字を読むことができます。 (Kare wa kanji o yomu koto ga dekimasu.) - He can read Kanji.',
      'ここで写真を撮ることができますか。 (Koko de shashin o toru koto ga dekimasu ka.) - Can I take pictures here?',
    ],
    read: true,
  },
  {
    id: 'gl-n4-2',
    title: '～前に (mae ni) - "before doing..."',
    level: 'N4',
    explanation: '「前に」 (mae ni) is used to describe an action that occurs before another action. It is preceded by a verb in its dictionary form.',
    examples: [
      '寝る前に、本を読みます。 (Neru mae ni, hon o yomimasu.) - Before sleeping, I read a book.',
      '日本へ来る前に、日本語を勉強しました。 (Nihon e kuru mae ni, nihongo o benkyou shimashita.) - Before coming to Japan, I studied Japanese.',
    ],
    read: false,
  },
  // N3 Lessons
  {
    id: 'gl-n3-1',
    title: '～おかげで (okage de) - "thanks to..."',
    level: 'N3',
    explanation: '「おかげで」 (okage de) is used to express gratitude or attribute a positive outcome to a certain cause or person. It carries a positive connotation.',
    examples: [
      '先生のおかげで、試験に合格しました。 (Sensei no okage de, shiken ni goukaku shimashita.) - Thanks to my teacher, I passed the exam.',
      '薬を飲んだおかげで、元気になりました。 (Kusuri o nonda okage de, genki ni narimashita.) - Thanks to taking the medicine, I got better.',
    ],
    read: false,
  },
  {
    id: 'gl-n3-2',
    title: '～せいで (sei de) - "because of..." (negative)',
    level: 'N3',
    explanation: '「せいで」 (sei de) is used to attribute a negative outcome to a certain cause. It has a nuance of blaming the cause for the bad result.',
    examples: [
      '事故のせいで、電車が遅れました。 (Jiko no sei de, densha ga okuremashita.) - Because of the accident, the train was late.',
      'あなたのせいで、負けました。 (Anata no sei de, makemashita.) - We lost because of you.',
    ],
    read: false,
  },
  // N2 Lessons
  {
    id: 'gl-n2-1',
    title: '～ものだ (mono da) - "it is natural that..."',
    level: 'N2',
    explanation: '「ものだ」 (mono da) is used to express a general truth, a common-sense observation, or something that is naturally expected to be a certain way. It can also be used to express strong emotion or memory.',
    examples: [
      '年を取れば、体が弱くなるものだ。 (Toshi o toreba, karada ga yowaku naru mono da.) - It\'s natural for your body to get weaker as you age.',
      '子供のころは、よく川で遊んだものだ。 (Kodomo no koro wa, yoku kawa de asonda mono da.) - I often used to play in the river when I was a child. (Recalling a memory)',
    ],
    read: false,
  },
  // N1 Lessons
  {
    id: 'gl-n1-1',
    title: '～ですら (de sura) - "even"',
    level: 'N1',
    explanation: '「ですら」 (de sura) is an emphatic particle meaning "even". It is a more formal and literary equivalent of 「でさえ」 (de sae). It highlights an extreme example to emphasize the statement.',
    examples: [
      '彼は自分の名前ですら書けない。 (Kare wa jibun no namae de sura kakenai.) - He can\'t even write his own name.',
      '専門家ですら、その問題は解けなかった。 (Senmonka de sura, sono mondai wa tokenakatta.) - Even the experts couldn\'t solve that problem.',
    ],
    read: false,
  }
];
