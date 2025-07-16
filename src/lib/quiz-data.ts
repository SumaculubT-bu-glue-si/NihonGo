
import type { Quiz } from './data';

type QuizCollection = {
  [category in 'vocabulary' | 'grammar' | 'listening']: {
    [level in 'N5' | 'N4' | 'N3' | 'N2' | 'N1']?: Quiz[];
  };
};

export const allQuizzes: QuizCollection = {
  vocabulary: {
    N5: [
      {
        id: 'quiz-voc-n5-1',
        title: 'N5 Vocabulary Quiz #1',
        questions: [
          {
            questionText: 'What is the meaning of 「学校」 (がっこう)?',
            options: ['Teacher', 'Student', 'School', 'Book'],
            correctAnswer: 'School',
            explanation: '「学校」(がっこう) means school.',
          },
          {
            questionText: 'Which word means "to eat"?',
            options: ['のむ (nomu)', 'たべる (taberu)', 'みる (miru)', 'かう (kau)'],
            correctAnswer: 'たべる (taberu)',
            explanation: '「食べる」(たべる) is the verb for "to eat".',
          },
          {
            questionText: 'What is 「大きい」 (おおきい)?',
            options: ['Small', 'Big', 'Tall', 'Short'],
            correctAnswer: 'Big',
            explanation: '「大きい」(おおきい) is an i-adjective meaning big or large.',
          },
          {
            questionText: 'The word for "what" is:',
            options: ['だれ (dare)', 'どこ (doko)', 'いつ (itsu)', 'なに (nani)'],
            correctAnswer: 'なに (nani)',
            explanation: '「何」(なに or なん) means "what".',
          },
          {
            questionText: '「日本」 (にほん) means:',
            options: ['China', 'Korea', 'Japan', 'America'],
            correctAnswer: 'Japan',
            explanation: '「日本」(にほん or にっぽん) is the name for Japan.',
          },
          {
            questionText: 'Which one is "friend"?',
            options: ['せんせい (sensei)', 'ともだち (tomodachi)', 'がくせい (gakusei)', 'かぞく (kazoku)'],
            correctAnswer: 'ともだち (tomodachi)',
            explanation: '「友達」(ともだち) means friend.',
          },
          {
            questionText: 'The word for "today" is:',
            options: ['きのう (kinou)', 'あした (ashita)', 'きょう (kyou)', 'あさ (asa)'],
            correctAnswer: 'きょう (kyou)',
            explanation: '「今日」(きょう) means today.',
          },
          {
            questionText: 'What does 「見る」 (みる) mean?',
            options: ['To listen', 'To speak', 'To read', 'To see/watch'],
            correctAnswer: 'To see/watch',
            explanation: '「見る」(みる) is the verb for "to see" or "to watch".',
          },
          {
            questionText: 'Which word means "water"?',
            options: ['おちゃ (ocha)', 'ごはん (gohan)', 'みず (mizu)', 'さかな (sakana)'],
            correctAnswer: 'みず (mizu)',
            explanation: '「水」(みず) means water.',
          },
          {
            questionText: '「高い」 (たかい) can mean "tall" or...?',
            options: ['Cheap', 'Expensive', 'New', 'Old'],
            correctAnswer: 'Expensive',
            explanation: '「高い」(たかい) has two common meanings: "tall/high" and "expensive".',
          },
        ],
      },
    ],
    N4: [
      {
        id: 'quiz-voc-n4-1',
        title: 'N4 Vocabulary Quiz #1',
        questions: [
            { questionText: 'What does 「意見」 (いけん) mean?', options: ['Idea', 'Opinion', 'Plan', 'Feeling'], correctAnswer: 'Opinion', explanation: '「意見」(いけん) means opinion.' },
            { questionText: 'The verb 「開ける」 (あける) means:', options: ['To close', 'To open', 'To start', 'To finish'], correctAnswer: 'To open', explanation: '「開ける」(あける) is a transitive verb meaning "to open".' },
            { questionText: 'Which word means "safe"?', options: ['あぶない (abunai)', 'あんぜん (anzen)', 'べんり (benri)', 'ふべん (fuben)'], correctAnswer: 'あんぜん (anzen)', explanation: '「安全」(あんぜん) is a na-adjective meaning safe.' },
            { questionText: 'What is a 「会議」 (かいぎ)?', options: ['Party', 'Class', 'Meeting', 'Trip'], correctAnswer: 'Meeting', explanation: '「会議」(かいぎ) means meeting or conference.' },
            { questionText: '「趣味」 (しゅみ) means:', options: ['Job', 'Hobby', 'Family', 'Food'], correctAnswer: 'Hobby', explanation: '「趣味」(しゅみ) means hobby or interest.' },
            { questionText: 'Which verb means "to know"?', options: ['わかる (wakaru)', 'おしえる (oshieru)', 'しる (shiru)', 'おぼえる (oboeru)'], correctAnswer: 'しる (shiru)', explanation: '「知る」(しる) is the verb "to know". 「分かる」(wakaru) is "to understand".' },
            { questionText: 'What is 「同じ」 (おなじ)?', options: ['Different', 'Difficult', 'Similar', 'Same'], correctAnswer: 'Same', explanation: '「同じ」(おなじ) means the same.' },
            { questionText: '「特に」 (とくに) means:', options: ['Always', 'Usually', 'Especially', 'Sometimes'], correctAnswer: 'Especially', explanation: '「特に」(とくに) is an adverb meaning especially or particularly.' },
            { questionText: 'What does 「理由」 (りゆう) mean?', options: ['Result', 'Reason', 'Rule', 'Meaning'], correctAnswer: 'Reason', explanation: '「理由」(りゆう) means reason.' },
            { questionText: 'The word for "future" is:', options: ['けいかく (keikaku)', 'むかし (mukashi)', 'こんど (kondo)', 'しょうらい (shourai)'], correctAnswer: 'しょうらい (shourai)', explanation: '「将来」(しょうらい) refers to the future, usually in the context of one\'s life or career.' },
        ]
      },
    ],
    N3: [
      {
        id: 'quiz-voc-n3-1',
        title: 'N3 Vocabulary Quiz #1',
        questions: [
            { questionText: 'What does 「情報」 (じょうほう) mean?', options: ['Emotion', 'Situation', 'Information', 'Condition'], correctAnswer: 'Information', explanation: '「情報」(じょうほう) means information.' },
            { questionText: 'The verb 「生産する」 (せいさんする) means:', options: ['To consume', 'To sell', 'To produce', 'To import'], correctAnswer: 'To produce', explanation: '「生産する」(せいさんする) means to produce or manufacture.' },
            { questionText: 'Which word means "to be useful"?', options: ['役に立つ (やくにたつ)', '面白い (おもしろい)', '気に入る (きにいる)', '関係がある (かんけいがある)'], correctAnswer: '役に立つ (やくにたつ)', explanation: '「役に立つ」(やくにたつ) is a common expression meaning "to be useful" or "helpful".' },
            { questionText: 'What is an 「影響」 (えいきょう)?', options: ['Effect / Influence', 'Effort', 'Experience', 'Explanation'], correctAnswer: 'Effect / Influence', explanation: '「影響」(えいきょう) means influence, effect, or impact.' },
            { questionText: '「複雑」 (ふくざつ) means:', options: ['Simple', 'Ordinary', 'Necessary', 'Complicated'], correctAnswer: 'Complicated', explanation: '「複雑」(ふくざつ) is a na-adjective meaning complicated or complex.' },
            { questionText: 'Which word means "technology"?', options: ['科学 (かがく)', '文化 (ぶんか)', '技術 (ぎじゅつ)', '経済 (けいざい)'], correctAnswer: '技術 (ぎじゅつ)', explanation: '「技術」(ぎじゅつ) means technology, skill, or technique.' },
            { questionText: 'What does 「成長する」 (せいちょうする) mean?', options: ['To succeed', 'To grow', 'To decrease', 'To change'], correctAnswer: 'To grow', explanation: '「成長する」(せいちょうする) means to grow or develop.' },
            { questionText: '「機会」 (きかい) means:', options: ['Machine', 'Reason', 'Article', 'Opportunity'], correctAnswer: 'Opportunity', explanation: '「機会」(きかい) means opportunity or chance. Be careful not to confuse it with 「機械」(きかい) which means machine.' },
            { questionText: 'Which word means "responsibility"?', options: ['能力 (のうりょく)', '性格 (せいかく)', '関係 (かんけい)', '責任 (せきにん)'], correctAnswer: '責任 (せきにん)', explanation: '「責任」(せきにん) means responsibility.' },
            { questionText: 'What is 「目的」 (もくてき)?', options: ['Goal / Purpose', 'Promise', 'Rule', 'Method'], correctAnswer: 'Goal / Purpose', explanation: '「目的」(もくてき) means purpose, goal, or objective.' },
        ]
      },
    ],
    N2: [
      {
        id: 'quiz-voc-n2-1',
        title: 'N2 Vocabulary Quiz #1',
        questions: [
            { questionText: 'What does 「貢献する」 (こうけんする) mean?', options: ['To criticize', 'To analyze', 'To contribute', 'To operate'], correctAnswer: 'To contribute', explanation: '「貢献する」(こうけんする) means to contribute.' },
            { questionText: 'The adjective 「抽象的」 (ちゅうしょうてき) means:', options: ['Concrete', 'Abstract', 'Specific', 'General'], correctAnswer: 'Abstract', explanation: '「抽象的」(ちゅうしょうてき) is a na-adjective meaning abstract.' },
            { questionText: 'Which word means "to emphasize"?', options: ['比較する (ひかくする)', '評価する (ひょうかする)', '主張する (しゅちょうする)', '強調する (きょうちょうする)'], correctAnswer: '強調する (きょうちょうする)', explanation: '「強調する」(きょうちょうする) means to emphasize or stress.' },
            { questionText: 'What is 「課題」 (かだい)?', options: ['Topic / Task', 'Result', 'Process', 'Theory'], correctAnswer: 'Topic / Task', explanation: '「課題」(かだい) can mean topic, issue, task, or homework.' },
            { questionText: '「吸収する」 (きゅうしゅうする) means:', options: ['To expand', 'To separate', 'To absorb', 'To reflect'], correctAnswer: 'To absorb', explanation: '「吸収する」(きゅうしゅうする) means to absorb.' },
            { questionText: 'Which word means "flexible"?', options: ['曖昧な (あいまいな)', '巨大な (きょだいな)', '柔軟な (じゅうなんな)', '適切な (てきせつな)'], correctAnswer: '柔軟な (じゅうなんな)', explanation: '「柔軟な」(じゅうなんな) is a na-adjective meaning flexible or soft.' },
            { questionText: 'What does 「意識」 (いしき) mean?', options: ['Knowledge', 'Consciousness / Awareness', 'Custom', 'System'], correctAnswer: 'Consciousness / Awareness', explanation: '「意識」(いしき) means consciousness or awareness.' },
            { questionText: '「多様な」 (たような) means:', options: ['Similar', 'Typical', 'Diverse', 'Global'], correctAnswer: 'Diverse', explanation: '「多様な」(たような) is a na-adjective meaning diverse or varied.' },
            { questionText: 'What does 「範囲」 (はんい) mean?', options: ['Judgment', 'Factor', 'Scope / Range', 'Standard'], correctAnswer: 'Scope / Range', explanation: '「範囲」(はんい) means scope, range, or extent.' },
            { questionText: 'The word 「論理的」 (ろんりてき) means:', options: ['Emotional', 'Logical', 'Creative', 'Traditional'], correctAnswer: 'Logical', explanation: '「論理的」(ろんりてき) is a na-adjective meaning logical.' },
        ]
      },
    ],
    N1: [
      {
        id: 'quiz-voc-n1-1',
        title: 'N1 Vocabulary Quiz #1',
        questions: [
            { questionText: 'What does 「普遍的」 (ふへんてき) mean?', options: ['Unique', 'Specific', 'Partial', 'Universal'], correctAnswer: 'Universal', explanation: '「普遍的」(ふへんてき) is a na-adjective meaning universal or general.' },
            { questionText: 'The verb 「模倣する」 (もほうする) means:', options: ['To invent', 'To imitate', 'To analyze', 'To destroy'], correctAnswer: 'To imitate', explanation: '「模倣する」(もほうする) means to imitate or copy.' },
            { questionText: 'Which word means "ambiguous"?', options: ['明確な (めいかくな)', '曖昧な (あいまいな)', '厳密な (げんみつな)', '客観的な (きゃっかんてきな)'], correctAnswer: '曖昧な (あいまいな)', explanation: '「曖昧な」(あいまいな) is a na-adjective meaning ambiguous or vague.' },
            { questionText: 'What is 「概念」 (がいねん)?', options: ['Exception', 'Concept / Idea', 'Evidence', 'Contradiction'], correctAnswer: 'Concept / Idea', explanation: '「概念」(がいねん) means concept, general idea, or notion.' },
            { questionText: '「巧妙な」 (こうみょうな) means:', options: ['Clumsy', 'Obvious', 'Skillful / Clever', 'Simple'], correctAnswer: 'Skillful / Clever', explanation: '「巧妙な」(こうみょうな) is a na-adjective meaning ingenious, skillful, or clever.' },
            { questionText: 'Which word means "to abandon"?', options: ['継続する (けいぞくする)', '達成する (たっせいする)', '獲得する (かくとくする)', '放棄する (ほうきする)'], correctAnswer: '放棄する (ほうきする)', explanation: '「放棄する」(ほうきする) means to abandon or renounce.' },
            { questionText: 'What does 「示唆する」 (しさする) mean?', options: ['To suggest / imply', 'To prove', 'To deny', 'To demand'], correctAnswer: 'To suggest / imply', explanation: '「示唆する」(しさする) means to suggest or hint.' },
            { questionText: '「規範」 (きはん) means:', options: ['Anarchy', 'Norm / Standard', 'Exception', 'Chaos'], correctAnswer: 'Norm / Standard', explanation: '「規範」(きはん) means a norm, standard, or model.' },
            { questionText: 'What does 「包括的」 (ほうかつてき) mean?', options: ['Exclusive', 'Partial', 'Comprehensive', 'Abstract'], correctAnswer: 'Comprehensive', explanation: '「包括的」(ほうかつてき) means comprehensive or inclusive.' },
            { questionText: 'The word 「変遷」 (へんせん) means:', options: ['Stagnation', 'Stability', 'Transition / Change', 'Foundation'], correctAnswer: 'Transition / Change', explanation: '「変遷」(へんせん) means change, transition, or vicissitudes over time.' },
        ]
      },
    ],
  },
  grammar: {
    N5: [
      {
        id: 'quiz-gram-n5-1',
        title: 'N5 Grammar Quiz #1',
        questions: [
          {
            questionText: 'Fill in the blank: わたし ___ がくせいです。',
            options: ['は', 'も', 'を', 'が'],
            correctAnswer: 'は',
            explanation: 'The particle「は」(wa) is used to mark the topic of the sentence. Here, "I" is the topic.',
          },
          {
            questionText: 'Which particle indicates possession? (e.g. my book)',
            options: ['が', 'で', 'の', 'に'],
            correctAnswer: 'の',
            explanation: 'The particle「の」(no) is used to show possession. For example, 「わたしのほん」 (watashi no hon) means "my book".',
          },
          {
            questionText: 'Fill in the blank: えいが ___ みます。 (I watch a movie)',
            options: ['を', 'に', 'で', 'へ'],
            correctAnswer: 'を',
            explanation: 'The particle「を」(o) is used to mark the direct object of a verb. In this case, "movie" is the object being watched.',
          },
          {
            questionText: 'Which one is a question? これ ___ ほんですか。',
            options: ['は', 'も', 'か', 'ね'],
            correctAnswer: 'か',
            explanation: 'The particle「か」(ka) is placed at the end of a sentence to turn it into a question.',
          },
          {
            questionText: 'Fill in the blank: がっこう ___ いきます。 (I go to school)',
            options: ['を', 'へ', 'で', 'と'],
            correctAnswer: 'へ',
            explanation: 'The particles「へ」(e) and「に」(ni) are used to indicate direction towards a place.「へ」is common with movement verbs like「行きます」(ikimasu).',
          },
          {
            questionText: 'How do you say "This is a pen"?',
            options: ['これはペンです', 'これをペンです', 'これのペンです', 'これでペンです'],
            correctAnswer: 'これはペンです',
            explanation: 'The structure「これ + は + NOUN + です」 is used to identify something. (Kore wa pen desu).',
          },
          {
            questionText: 'Fill in the blank: としょかん ___ ほんをよみます。 (I read a book at the library)',
            options: ['に', 'で', 'を', 'へ'],
            correctAnswer: 'で',
            explanation: 'The particle「で」(de) is used to indicate the location where an action takes place.',
          },
          {
            questionText: 'Which sentence means "I am also a student"?',
            options: ['わたしががくせいです', 'わたしのがくせいです', 'わたしもがくせいです', 'わたしはがくせいです'],
            correctAnswer: 'わたしもがくせいです',
            explanation: 'The particle「も」(mo) means "also" or "too". It replaces「は」(wa) when making a similar statement.',
          },
          {
            questionText: 'How do you make an i-adjective negative? (e.g. not big)',
            options: ['おおきいじゃないです', 'おおきくないです', 'おおきいではありません', 'おおきいじゃありません'],
            correctAnswer: 'おおきくないです',
            explanation: 'To make an i-adjective negative, you drop the final「い」(i) and add「くない」(kunai). So,「大きい」becomes「大きくない」.',
          },
          {
            questionText: 'Fill in the blank: ともだち ___ はなします。 (I talk with my friend)',
            options: ['を', 'が', 'と', 'は'],
            correctAnswer: 'と',
            explanation: 'The particle「と」(to) can mean "and" when connecting nouns, or "with" when indicating who an action is done with.',
          },
        ],
      },
    ],
    N4: [
       {
        id: 'quiz-gram-n4-1',
        title: 'N4 Grammar Quiz #1',
        questions: [
          { questionText: 'Fill in the blank: ピアノを弾くこと ___ できます。', options: ['が', 'を', 'は', 'に'], correctAnswer: 'が', explanation: 'The structure「Verb-dictionary form + こと + ができます」is used to express ability ("can do").' },
          { questionText: 'Choose the correct form: 食べる ___ 、手を洗ってください。 (Before eating, please wash your hands.)', options: ['まえに', 'あとで', 'あいだに', 'とき'], correctAnswer: 'まえに', explanation: '「～前に」(mae ni) is used with the dictionary form of a verb to mean "before doing X".' },
          { questionText: 'Which sentence means "I have been to Japan"?', options: ['日本へ行きました', '日本へ行ったことがあります', '日本へ行くつもりです', '日本へ行きたいです'], correctAnswer: '日本へ行ったことがあります', explanation: 'The pattern「Verb-past tense (た form) + ことがあります」expresses that you have had the experience of doing something.' },
          { questionText: 'Fill in the blank: 雨が降っている ___ 、試合は中止です。 (Because it\'s raining, the match is cancelled.)', options: ['から', 'ので', 'のに', 'ても'], correctAnswer: 'ので', explanation: '「ので」(node) is used to give a reason, often for something that is a natural consequence. It is slightly softer than「から」.' },
          { questionText: 'What does「～なければなりません」mean?', options: ['You must not do', 'You should do', 'You don\'t have to do', 'You must do'], correctAnswer: 'You must do', explanation: '「Verb-nai form (drop い) + ければなりません」is a strong expression for "must do" or "have to do".' },
          { questionText: 'Fill in the blank: 彼は日本語 ___ なく、英語も話せる。(He can speak not only Japanese, but also English.)', options: ['だけでは', 'ばかりでは', 'しかでは', 'だけでは'], correctAnswer: 'だけでは', explanation: '「～だけではなく」(dake de wa naku) means "not only...".' },
          { questionText: 'Choose the correct particle: このボタンを押す ___ 、お湯が出ます。(If/When you press this button, hot water comes out.)', options: ['と', 'ば', 'たら', 'なら'], correctAnswer: 'と', explanation: 'The「と」conditional is used for natural, inevitable results. When you press the button, the water will always come out.' },
          { questionText: 'What is the potential form of 「読みます」 (yomimasu)?', options: ['読めます (yomemasu)', '読まれます (yomaremasu)', '読ませます (yomasemasu)', '読みさせます (yomisemasu)'], correctAnswer: '読めます (yomemasu)', explanation: 'For Group 1 verbs, the potential form is made by changing the final -u sound to an -eru sound. So, 読む (yomu) becomes 読める (yomeru).' },
          { questionText: 'Fill in the blank: 明日は雨が降る ___ しれません。 (It might rain tomorrow.)', options: ['かも', 'そう', 'よう', 'はず'], correctAnswer: 'かも', explanation: '「～かもしれません」(kamoshiremasen) is added to the end of a sentence to express possibility ("might", "maybe").' },
          { questionText: 'Which one means "too much"? 食べ ___ 。 (I ate too much.)', options: ['すぎました', 'はじめました', 'つづけました', 'おわりました'], correctAnswer: 'すぎました', explanation: 'The「～すぎる」suffix is attached to verb stems or adjective stems to mean "too much" or "excessively".' },
        ]
      },
    ],
    N3: [
       {
        id: 'quiz-gram-n3-1',
        title: 'N3 Grammar Quiz #1',
        questions: [
          { questionText: 'Fill in the blank: 先生のおかげ ___ 、合格できました。 (Thanks to the teacher, I was able to pass.)', options: ['で', 'に', 'を', 'と'], correctAnswer: 'で', explanation: 'The grammar point「～おかげで」means "thanks to" a positive reason or cause.' },
          { questionText: 'Choose the correct form: 寝坊した ___ 、電車に乗り遅れた。 (Because I overslept, I missed the train.)', options: ['おかげで', 'せいで', 'ために', 'ように'], correctAnswer: 'せいで', explanation: '「～せいで」is used to attribute a negative outcome to a reason, carrying a sense of blame.' },
          { questionText: 'What does「～に比べて」 (～にくらべて) mean?', options: ['Regarding...', 'Instead of...', 'Compared to...', 'According to...'], correctAnswer: 'Compared to...', explanation: '「～に比べて」(ni kurabete) is used to make a comparison between two things.' },
          { questionText: 'Fill in the blank: この料理は、思った ___ おいしくなかった。 (This dish wasn\'t as delicious as I thought.)', options: ['ほど', 'ばかり', 'ぐらい', 'だけ'], correctAnswer: 'ほど', explanation: '「～ほど～ない」is a pattern used to say that something is "not as... as" something else.' },
          { questionText: 'Which means "while" or "during"? 日本にいる ___ 、色々な場所へ行きたい。', options: ['うちに', 'あいだに', 'まえに', 'あとで'], correctAnswer: 'うちに', explanation: '「～うちに」is used to express that you should do something while a certain situation or state still exists, before it changes.' },
          { questionText: 'Fill in the blank: 彼は来る ___ どうか、まだ分かりません。 (I still don\'t know whether he will come or not.)', options: ['と', 'か', 'や', 'も'], correctAnswer: 'か', explanation: 'The pattern「～かどうか」means "whether or not".' },
          { questionText: 'What does「～べきだ」mean?', options: ['must not do', 'should do', 'can do', 'don\'t have to do'], correctAnswer: 'should do', explanation: '「～べきだ」(beki da) expresses a strong sense of "should do" or "ought to do", based on common sense or a moral duty.' },
          { questionText: 'Choose the correct grammar: 彼は、病気だと言っていた。___ 、今日は学校を休んだ。', options: ['それに', 'それで', 'それから', 'それでは'], correctAnswer: 'それで', explanation: '「それで」means "because of that" or "that\'s why," connecting a reason to a result.' },
          { questionText: 'Which expresses a command? もっと勉強 ___ ！', options: ['しなさい', 'してください', 'します', 'しましょう'], correctAnswer: 'しなさい', explanation: '「～なさい」(nasai) is a command form, typically used by parents to children or teachers to students. It is softer than the imperative form.' },
          { questionText: 'Fill in the blank: 窓を開けた ___ 、涼しい風が入ってきた。 (When I opened the window, a cool breeze came in.)', options: ['ところ', 'ばかり', 'とたん', '最中'], correctAnswer: 'とたん', explanation: '「～たとたん」is used to express that something happened immediately after another action. It often describes an unexpected event.' },
        ]
      },
    ],
    N2: [
       {
        id: 'quiz-gram-n2-1',
        title: 'N2 Grammar Quiz #1',
        questions: [
          { questionText: 'Fill in the blank: この問題は難しくて、私 ___ どうしようもない。', options: ['にとって', 'として', 'にしては', 'にこたえて'], correctAnswer: 'にとって', explanation: '「～にとって」means "for X" or "from X\'s perspective," indicating a point of view or standard of judgment.' },
          { questionText: 'Choose the correct form: 彼は年の ___ 、若く見える。 (For his age, he looks young.)', options: ['わりに', 'せいで', 'おかげで', 'かわりに'], correctAnswer: 'わりに', explanation: '「～わりに」expresses that something is more or less than expected given a certain standard. It often implies a slight surprise.' },
          { questionText: 'What does「～わけではない」mean?', options: ['It must be that...', 'It is impossible that...', 'It\'s not that...', 'It seems that...'], correctAnswer: 'It\'s not that...', explanation: '「～わけではない」is used for partial negation, meaning "it\'s not that..." or "it doesn\'t necessarily mean that...".' },
          { questionText: 'Fill in the blank: 練習すればする ___ 、上手になる。 (The more you practice, the better you get.)', options: ['だけ', 'ほど', 'ばかり', 'ぐらい'], correctAnswer: 'ほど', explanation: 'The「～ば～ほど」pattern means "the more... the more...".' },
          { questionText: 'Which means "on the occasion of"? 入学式 ___ 、学長がスピーチをした。', options: ['に際して', 'をめぐって', 'にかけて', 'を通じて'], correctAnswer: 'に際して', explanation: '「～に際して」(にさいして) is a formal expression used for special, important occasions, meaning "at the time of" or "on the occasion of".' },
          { questionText: 'Fill in the blank: 約束した ___ 、守るべきだ。 (Since you promised, you should keep it.)', options: ['以上は', '上では', '上にも', '上で'], correctAnswer: '以上は', explanation: '「～以上は」(いじょうは) means "now that," "since," or "as long as," expressing a strong sense of duty or determination based on a fact.' },
          { questionText: 'What does「～かねない」mean?', options: ['is likely to happen (positive)', 'might happen (negative)', 'will definitely not happen', 'must happen'], correctAnswer: 'might happen (negative)', explanation: '「～かねない」is attached to a verb stem to express that there is a possibility that something bad might happen.' },
          { questionText: 'Choose the correct grammar: 手術は成功した。後はただ回復を待つ ___ だ。', options: ['のみ', 'ばかり', 'どころ', 'きり'], correctAnswer: 'のみ', explanation: '「～のみ」is a formal way of saying "only" or "just," similar to だけ.' },
          { questionText: 'Which means "unable to do"? 悲しくて、涙を ___ いられない。', options: ['禁じえ', 'こらえ', 'こらえきれ', '禁じ'], correctAnswer: '禁じえ', explanation: '「～を禁じ得ない」(をきんじえない) is a formal expression meaning "cannot help but feel/do" or "can\'t suppress".' },
          { questionText: 'Fill in the blank: 親の期待 ___ 、彼は医者になった。 (In response to his parents\' expectations, he became a doctor.)', options: ['にこたえて', 'に反して', 'にもとづいて', 'をめぐって'], correctAnswer: 'にこたえて', explanation: '「～にこたえて」means "in response to" expectations, requests, or hopes.' },
        ]
      },
    ],
    N1: [
       {
        id: 'quiz-gram-n1-1',
        title: 'N1 Grammar Quiz #1',
        questions: [
          { questionText: 'Fill in the blank: このような事態を招いたのは、経営陣の判断ミスに ___ ならない。', options: ['ほか', 'しか', 'だけ', 'のみ'], correctAnswer: 'ほか', explanation: '「～にほかならない」is a strong statement meaning "it is nothing but..." or "it is precisely...".' },
          { questionText: 'Choose the correct form: 彼の努力を抜き ___ 、このプロジェクトの成功はなかっただろう。(Without his effort, this project would not have been a success.)', options: ['にしては', 'にしても', 'にして', 'にしては'], correctAnswer: 'にして', explanation: '「～を抜きにして(は)」means "without X," emphasizing that X is essential.' },
          { questionText: 'What does「～ずにはいられない」mean?', options: ['must not do', 'can\'t help but do', 'don\'t have to do', 'shouldn\'t have done'], correctAnswer: 'can\'t help but do', explanation: '「～ずにはいられない」expresses an uncontrollable urge or feeling; "can\'t help but do/feel".' },
          { questionText: 'Fill in the blank: 彼は大臣 ___ 、国民を裏切るようなことはしないだろう。 (Being a minister, he would never do something like betray the citizens.)', options: ['たるもの', 'ときたら', 'ともなると', 'ともあろうに'], correctAnswer: 'たるもの', explanation: '「名詞＋たるもの」means "as a person who is X" or "in the position of X," emphasizing the expected duties or behavior of that position.' },
          { questionText: 'Which means "on the verge of"? 飛行機が離陸 ___ としている。', options: ['せんがため', 'せんばかりに', 'せんとする', 'せざるをえない'], correctAnswer: 'せんとする', explanation: '「～んとす」 (modern form ～ようとする) indicates being on the verge of doing something, or trying to do something.' },
          { questionText: 'Fill in the blank: 彼を説得するのは、不可能だと ___ 言えよう。 (It could be said that persuading him is impossible.)', options: ['いってもさしつかえない', 'いっても過言ではない', 'いわずにおかない', 'いわないではいられない'], correctAnswer: 'いっても過言ではない', explanation: '「～といっても過言ではない」(といってもかごんではない) means "it is no exaggeration to say...".' },
          { questionText: 'What does「～の極み」 (のきわみ) mean?', options: ['The beginning of...', 'The reason for...', 'The result of...', 'The height of... / Extremely...'], correctAnswer: 'The height of... / Extremely...', explanation: '「～の極み」is a literary expression attached to nouns to mean "the height of..." or "extremely," usually for feelings.' },
          { questionText: 'Choose the correct grammar: 彼が正直だ ___ 、彼の話は信じがたい。', options: ['からといって', 'からには', 'からこそ', 'からして'], correctAnswer: 'からといって', explanation: '「～からといって」means "just because... (doesn\'t mean that...)," used to state that a reason is not sufficient for a particular conclusion.' },
          { questionText: 'Which means "is not worthy of"? 子供の作品だからと、批判に ___ 。', options: ['あたらない', 'およばない', 'ほかならない', 'すぎない'], correctAnswer: 'あたらない', explanation: '「～にはあたらない」means "it is not necessary to," "is not worthy of," or "there is no need to," often used with verbs like surprise or criticism.' },
          { questionText: 'Fill in the blank: 合格 ___ 、必死に勉強した。 (In order to pass, I studied desperately.)', options: ['するがために', 'せんがために', 'すべからく', 'するべく'], correctAnswer: 'せんがために', explanation: '「～んがために」 is a literary and somewhat archaic way to say "in order to," expressing a strong purpose. The verb before it is in the -nai stem form.' }
        ]
      },
    ]
  },
  listening: {
    N5: [
        {
          id: 'quiz-list-n5-1',
          title: 'N5 Listening Quiz #1',
          questions: [
            {
              questionText: 'これはペンです。',
              options: ['This is a pen.', 'That is a pen.', 'This is a pencil.', 'This is a book.'],
              correctAnswer: 'This is a pen.',
              explanation: 'The speaker said「これはペンです。」(Kore wa pen desu), which means "This is a pen."',
            },
            {
              questionText: 'きのう、がっこうへいきました。',
              options: ['I will go to school tomorrow.', 'I went to school yesterday.', 'I am going to school today.', 'I did not go to school yesterday.'],
              correctAnswer: 'I went to school yesterday.',
              explanation: '「きのう」is "yesterday" and「いきました」is the past tense of "to go".',
            },
            {
              questionText: 'そのかばんはたかいですね。',
              options: ['This bag is cheap, isn\'t it?', 'That bag is new, isn\'t it?', 'That bag is expensive, isn\'t it?', 'That bag is heavy, isn\'t it?'],
              correctAnswer: 'That bag is expensive, isn\'t it?',
              explanation: '「その」means "that (near you)",「かばん」is bag, and「たかい」is expensive.',
            },
            {
              questionText: 'まいあさ、コーヒーをのみます。',
              options: ['I drink coffee every evening.', 'I drink tea every morning.', 'I drink coffee every morning.', 'I drank coffee this morning.'],
              correctAnswer: 'I drink coffee every morning.',
              explanation: '「まいあさ」means "every morning" and「コーヒーをのみます」means "I drink coffee".',
            },
            {
              questionText: 'しゅうまつはえいがをみませんでした。',
              options: ['I watched a movie on the weekend.', 'I will watch a movie on the weekend.', 'I did not watch a movie on the weekend.', 'I might watch a movie on the weekend.'],
              correctAnswer: 'I did not watch a movie on the weekend.',
              explanation: '「しゅうまつ」is weekend, and「みませんでした」is the negative past tense of "to watch".',
            },
             {
              questionText: 'このりんごはおいしいです。',
              options: ['This apple is delicious.', 'This orange is delicious.', 'This apple is sweet.', 'This apple is red.'],
              correctAnswer: 'This apple is delicious.',
              explanation: '「この」means "this",「りんご」is apple, and「おいしい」means delicious.',
            },
            {
              questionText: 'たなかさんはえいごがじょうずです。',
              options: ['Mr. Tanaka is good at Japanese.', 'Mr. Tanaka is good at English.', 'Mr. Tanaka is not good at English.', 'Mr. Tanaka is a student.'],
              correctAnswer: 'Mr. Tanaka is good at English.',
              explanation: '「えいご」means English, and「じょうずです」means is skillful/good at.',
            },
            {
              questionText: 'すみません、みずをください。',
              options: ['Excuse me, please give me some tea.', 'Excuse me, please give me the bill.', 'Excuse me, please give me some water.', 'Excuse me, please give me some coffee.'],
              correctAnswer: 'Excuse me, please give me some water.',
              explanation: '「みず」is water, and「ください」is a polite request for something.',
            },
            {
              questionText: 'にちようびにスーパーへかいものにいきました。',
              options: ['On Sunday, I went shopping at the department store.', 'On Saturday, I went shopping at the supermarket.', 'On Sunday, I went shopping at the supermarket.', 'On Sunday, I will go shopping.'],
              correctAnswer: 'On Sunday, I went shopping at the supermarket.',
              explanation: '「にちようび」is Sunday,「スーパー」is supermarket, and「かいものにいきました」is "went shopping".',
            },
            {
              questionText: 'あなたの趣味はなんですか。',
              options: ['What is your name?', 'What is your hobby?', 'What is your job?', 'Where are you from?'],
              correctAnswer: 'What is your hobby?',
              explanation: '「あなたの」is "your",「趣味」(しゅみ) is hobby, and「なんですか」is "what is it?".',
            }
          ],
        },
    ],
    N4: [
      {
        id: 'quiz-list-n4-1',
        title: 'N4 Listening Quiz #1',
        questions: [
            { questionText: 'この仕事は明日までに終わらせなければなりません。', options: ['I don\'t have to finish this work by tomorrow.', 'I must finish this work by tomorrow.', 'I might finish this work by tomorrow.', 'I want to finish this work by tomorrow.'], correctAnswer: 'I must finish this work by tomorrow.', explanation: '「～なければなりません」is a strong expression of obligation, meaning "must do" or "have to do".' },
            { questionText: '彼は日本語が話せるようになりました。', options: ['He has started to speak Japanese.', 'He can speak Japanese well.', 'He has become able to speak Japanese.', 'He wants to speak Japanese.'], correctAnswer: 'He has become able to speak Japanese.', explanation: '「～ようになる」indicates a change in ability over time, meaning "to become able to do".' },
            { questionText: 'もし雨が降ったら、旅行は中止します。', options: ['Because it rained, the trip was cancelled.', 'If it rains, we will cancel the trip.', 'Even if it rains, the trip will not be cancelled.', 'When it rained, the trip was cancelled.'], correctAnswer: 'If it rains, we will cancel the trip.', explanation: 'The「～たら」conditional is used for hypothetical situations, meaning "if" or "when".' },
            { questionText: 'すみません、もっとゆっくり話していただけませんか。', options: ['Excuse me, can you speak more quietly?', 'Excuse me, can you speak more loudly?', 'Excuse me, could you please speak more slowly?', 'Excuse me, please don\'t speak.'], correctAnswer: 'Excuse me, could you please speak more slowly?', explanation: '「～ていただけませんか」is a very polite way to ask someone to do something for you.' },
            { questionText: '私は医者にタバコを吸わないように言われました。', options: ['I told the doctor not to smoke.', 'I was told by the doctor not to smoke.', 'I saw the doctor smoking.', 'The doctor advised me to smoke.'], correctAnswer: 'I was told by the doctor not to smoke.', explanation: 'This is the passive form.「～ように言われました」means "I was told to...".' },
            { questionText: 'このケーキはおいしそうです。', options: ['This cake is delicious.', 'This cake looks delicious.', 'This cake was delicious.', 'I heard this cake is delicious.'], correctAnswer: 'This cake looks delicious.', explanation: 'The「～そうです」ending, when attached to an adjective stem, means "looks..." or "seems...".' },
            { questionText: '弟はテレビを見ながら、宿題をしています。', options: ['My younger brother is doing homework after watching TV.', 'My younger brother is doing homework while watching TV.', 'My younger brother is watching TV instead of doing homework.', 'My younger brother is watching TV, and then will do homework.'], correctAnswer: 'My younger brother is doing homework while watching TV.', explanation: '「～ながら」is used to indicate that two actions are being performed simultaneously by the same person.' },
            { questionText: '会議の時間はもう決まりましたか。', options: ['Have you decided on the meeting place yet?', 'Has the meeting time been decided yet?', 'When will the meeting start?', 'Did the meeting already finish?'], correctAnswer: 'Has the meeting time been decided yet?', explanation: '「決まりましたか」is the past tense of「決まる」(to be decided), used to ask if a decision has been made.' },
            { questionText: 'この辞書はとても役に立ちます。', options: ['This dictionary is very difficult.', 'This dictionary is very easy.', 'This dictionary is very expensive.', 'This dictionary is very useful.'], correctAnswer: 'This dictionary is very useful.', explanation: '「役に立ちます」(やくにたちます) means "to be useful" or "to be helpful".' },
            { questionText: '彼は来週のパーティーに来るはずです。', options: ['He might come to next week\'s party.', 'He probably won\'t come to next week\'s party.', 'He is expected to come to next week\'s party.', 'He wants to come to next week\'s party.'], correctAnswer: 'He is expected to come to next week\'s party.', explanation: '「～はずです」expresses that something is expected to be true based on evidence or logic.' },
        ]
      },
    ],
    N3: [
      {
        id: 'quiz-list-n3-1',
        title: 'N3 Listening Quiz #1',
        questions: [
            { questionText: '最近、運動不足のせいか、ちょっと太ってきた。', options: ['I\'ve been gaining weight, probably because I\'m exercising a lot.', 'I\'ve been losing weight, probably because of a lack of exercise.', 'I\'ve been gaining weight, probably because of a lack of exercise.', 'I\'ve been gaining weight, but I don\'t know why.'], correctAnswer: 'I\'ve been gaining weight, probably because of a lack of exercise.', explanation: '「～せいか」means "perhaps because of..." (with a negative nuance), and 「太ってきた」means "have started to gain weight".' },
            { questionText: 'お客様の意見をもとに、新しい商品を開発しました。', options: ['We developed a new product for our customers.', 'Based on customer feedback, we developed a new product.', 'We will develop a new product based on customer feedback.', 'We ignored customer feedback and developed a new product.'], correctAnswer: 'Based on customer feedback, we developed a new product.', explanation: '「～をもとに」means "based on" or "founded on".' },
            { questionText: '彼は才能があるばかりでなく、努力家でもある。', options: ['He is talented but not a hard worker.', 'He is a hard worker but not talented.', 'He is not only talented but also a hard worker.', 'He is neither talented nor a hard worker.'], correctAnswer: 'He is not only talented but also a hard worker.', explanation: '「～ばかりでなく」is a way to say "not only... but also...".' },
            { questionText: 'この地域の気候は、夏は暑い一方、冬は非常に寒い。', options: ['The climate here is hot in the summer, and also hot in the winter.', 'The climate here is hot in the summer, but on the other hand, it is very cold in the winter.', 'The climate here is not hot in the summer, but it is cold in the winter.', 'The climate here is pleasant all year round.'], correctAnswer: 'The climate here is hot in the summer, but on the other hand, it is very cold in the winter.', explanation: '「～一方（で）」means "on the one hand... but on the other hand...", showing a contrast.' },
            { questionText: '山田さんは、かぜ気味なので、今日の飲み会は欠席だそうです。', options: ['Mr. Yamada is absent from today\'s drinking party because he has a cold.', 'Mr. Yamada seems to be coming to the party even though he has a cold.', 'I heard Mr. Yamada is absent from today\'s drinking party because he seems to have a cold.', 'Mr. Yamada has a slight cold, so he might come to the party.'], correctAnswer: 'I heard Mr. Yamada is absent from today\'s drinking party because he seems to have a cold.', explanation: '「～気味」(ぎみ) means "a touch of" or "seems to be".「～そうです」at the end indicates hearsay ("I heard that...").' },
            { questionText: 'あの二人は、付き合っているふりをしているだけだ。', options: ['Those two are actually dating.', 'Those two just pretend to be dating.', 'Those two have just started dating.', 'Those two have broken up.'], correctAnswer: 'Those two just pretend to be dating.', explanation: '「～ふりをする」means "to pretend to be" or "to act as if".' },
            { questionText: '彼は、何度も注意したにもかかわらず、また同じ間違いをした。', options: ['Although I warned him many times, he made the same mistake again.', 'Because I warned him many times, he made the same mistake again.', 'I didn\'t warn him, so he made the same mistake again.', 'He made a mistake, so I warned him.'], correctAnswer: 'Although I warned him many times, he made the same mistake again.', explanation: '「～にもかかわらず」means "in spite of" or "despite," expressing that something happened contrary to expectations.' },
            { questionText: 'インターネットを通じて、世界中の人々と交流できる。', options: ['I can interact with people around the world except via the internet.', 'I can interact with people around the world thanks to the internet.', 'I can interact with people around the world through the internet.', 'I can\'t interact with people through the internet.'], correctAnswer: 'I can interact with people around the world through the internet.', explanation: '「～を通じて」(をつうじて) means "through" or "via" a certain medium or period of time.' },
            { questionText: 'この問題に関しては、私から申し上げることは何もありません。', options: ['I have nothing to say about this problem.', 'I have a lot to say about this problem.', 'Please tell me about this problem.', 'You must not say anything about this problem.'], correctAnswer: 'I have nothing to say about this problem.', explanation: '「～に関しては」means "concerning" or "regarding".「申し上げる」is the humble form of "to say".' },
            { questionText: '上司の命令とあれば、断るわけにはいかない。', options: ['If it\'s an order from my boss, I might refuse.', 'If it\'s an order from my boss, I can\'t possibly refuse.', 'Because it\'s an order from my boss, I will refuse.', 'I can refuse, even if it\'s an order from my boss.'], correctAnswer: 'If it\'s an order from my boss, I can\'t possibly refuse.', explanation: '「～とあれば」means "if it is the case that...".「～わけにはいかない」expresses that one cannot do something for social or psychological reasons.' },
        ]
      },
    ],
    N2: [
      {
        id: 'quiz-list-n2-1',
        title: 'N2 Listening Quiz #1',
        questions: [
            { questionText: 'この状況を放置しておけば、問題は悪化するにほかならない。', options: ['If we leave this situation as is, the problem will definitely get worse.', 'If we leave this situation as is, the problem might get better.', 'If we leave this situation as is, the problem will not change.', 'The problem is not that bad even if we leave it.'], correctAnswer: 'If we leave this situation as is, the problem will definitely get worse.', explanation: '「～にほかならない」is a strong assertion meaning "it is nothing other than..." or "it is precisely...". Here, it emphasizes the certainty of the outcome.' },
            { questionText: 'どんなに反対されようとも、私は自分の意志を貫くつもりだ。', options: ['No matter how much I am opposed, I intend to stick to my decision.', 'If I am opposed, I will change my mind.', 'Because I was opposed, I gave up on my decision.', 'I will oppose anyone who disagrees with me.'], correctAnswer: 'No matter how much I am opposed, I intend to stick to my decision.', explanation: '「～ようとも」is a literary way of saying "even if" or "no matter how," expressing strong determination despite potential obstacles.' },
            { questionText: '彼の日本語能力は、日常会話はもとより、ビジネスの場でも通用する。', options: ['His Japanese is good enough for business, but not for daily conversation.', 'His Japanese is good enough for daily conversation, but not for business.', 'His Japanese is not only good for daily conversation, but can also be used in a business setting.', 'His Japanese is neither good for daily conversation nor for business.'], correctAnswer: 'His Japanese is not only good for daily conversation, but can also be used in a business setting.', explanation: '「～はもとより」means "not to mention A, but also B," used to emphasize that B is also true, when A is already obvious.' },
            { questionText: 'このプロジェクトが成功するか否かは、君の肩にかかっている。', options: ['Whether this project succeeds or not depends on your shoulder.', 'Whether this project succeeds or not depends on you.', 'This project will succeed if you use your shoulder.', 'You must carry this project on your shoulders.'], correctAnswer: 'Whether this project succeeds or not depends on you.', explanation: '「～か否か」(～かいなか) means "whether or not".「肩にかかっている」is an idiom meaning "it rests on your shoulders" or "it depends on you".' },
            { questionText: '子供ではあるまいし、自分のことは自分で決めなさい。', options: ['Since you are a child, you should decide things for yourself.', 'You\'re not a child, so decide things for yourself.', 'Even though you\'re a child, you should decide things for yourself.', 'If you were a child, you could decide things for yourself.'], correctAnswer: 'You\'re not a child, so decide things for yourself.', explanation: '「～ではあるまいし」means "it\'s not as if..." or "you\'re not..., so...". It\'s used to reprimand someone for acting inappropriately for their position or age.' },
            { questionText: '彼は約束の時間に遅れることなしに、会議に来たことがない。', options: ['He always comes to meetings on time.', 'He sometimes comes to meetings late.', 'He has never come to a meeting without being late for the appointed time.', 'He has never been late to a meeting.'], correctAnswer: 'He has never come to a meeting without being late for the appointed time.', explanation: 'This is a double negative.「～ことなしに～ない」means "never does... without doing...". So, he never comes to meetings without being late.' },
            { questionText: '苦労の末に、彼はついに夢を実現させた。', options: ['After much hardship, he finally realized his dream.', 'Despite his hardship, he couldn\'t realize his dream.', 'Because of hardship, he gave up on his dream.', 'He easily realized his dream without any hardship.'], correctAnswer: 'After much hardship, he finally realized his dream.', explanation: '「～末に」(すえに) means "after a long period of..." or "at the end of...".' },
            { questionText: '景気は回復しつつあるとはいえ、まだ安心はできない。', options: ['The economy is recovering, so we can be at ease.', 'The economy is not recovering, so we cannot be at ease.', 'Although the economy is recovering, we cannot be at ease yet.', 'The economy will recover soon, so we can be at ease.'], correctAnswer: 'Although the economy is recovering, we cannot be at ease yet.', explanation: '「～とはいえ」means "be that as it may," "nevertheless," or "although".' },
            { questionText: 'この法律は、国民の安全を守るという名目のもとに制定された。', options: ['This law was enacted under the pretext of protecting public safety.', 'This law was enacted to threaten public safety.', 'This law was enacted despite the name of public safety.', 'This law was not enacted to protect public safety.'], correctAnswer: 'This law was enacted under the pretext of protecting public safety.', explanation: '「～という名目のもとに」(～というめいもくのもとに) means "under the pretext of" or "in the name of".' },
            { questionText: 'あの温厚な彼が怒るとは、よほどのことがあったに違いない。', options: ['That gentle person is angry, but there must not be a good reason.', 'That gentle person is not angry, but something must have happened.', 'For that gentle person to get angry, something extraordinary must have happened.', 'Something extraordinary happened, but that gentle person is not angry.'], correctAnswer: 'For that gentle person to get angry, something extraordinary must have happened.', explanation: '「～とは」expresses surprise or disbelief.「～に違いない」means "it must be" or "I\'m sure that...".' },
        ]
      },
    ],
    N1: [
      {
        id: 'quiz-list-n1-1',
        title: 'N1 Listening Quiz #1',
        questions: [
            { questionText: '彼のしたことは、非難されてしかるべきだ。', options: ['His actions should be praised.', 'His actions deserve to be criticized.', 'His actions are neither good nor bad.', 'No one should criticize his actions.'], correctAnswer: 'His actions deserve to be criticized.', explanation: '「～てしかるべきだ」is a strong expression meaning that something is natural, proper, or deserved according to common sense or social norms.' },
            { questionText: 'その政治家は、国民の信頼を裏切るがごとき行為を行った。', options: ['The politician acted in a way that was like betraying the public\'s trust.', 'The politician acted to gain the public\'s trust.', 'The politician did not betray the public\'s trust.', 'The public betrayed the politician.'], correctAnswer: 'The politician acted in a way that was like betraying the public\'s trust.', explanation: '「～がごとき」is a literary and classical way of saying「～のような」, meaning "like" or "as if".' },
            { questionText: '彼は、ただ自分の利益のみを追求する人物だと言わざるを得ない。', options: ['I must say that he is a person who only pursues his own interests.', 'I cannot say that he is a person who only pursues his own interests.', 'He is a person who pursues the interests of others.', 'He may be a person who pursues his own interests.'], correctAnswer: 'I must say that he is a person who only pursues his own interests.', explanation: '「～ざるを得ない」is a formal expression meaning "cannot help but do" or "have no choice but to do".' },
            { questionText: '社長の命令とあっては、この提案を断るわけには参りません。', options: ['Since it\'s an order from the president, I can\'t possibly refuse this proposal.', 'Even if it\'s an order from the president, I will refuse this proposal.', 'I will refuse this proposal because it\'s an order from the president.', 'The president ordered me to refuse this proposal.'], correctAnswer: 'Since it\'s an order from the president, I can\'t possibly refuse this proposal.', explanation: '「～とあっては」is an emphatic way of saying "if it is the case that...", used for special situations.「～わけには参りません」is a very polite form of 「～わけにはいかない」.' },
            { questionText: 'この問題の解決は、一朝一夕にはいくまい。', options: ['Solving this problem will be easy.', 'Solving this problem will probably not be done overnight.', 'Solving this problem must be done overnight.', 'This problem was solved overnight.'], correctAnswer: 'Solving this problem will probably not be done overnight.', explanation: '「一朝一夕に」(いっちょういっせきに) is an idiom meaning "in a single day/overnight".「～まい」is a classical negative volitional form expressing "probably not" or "will not".' },
            { questionText: '彼の喜びは、察するに難くない。', options: ['It is very difficult to guess his joy.', 'His joy is easy to see.', 'It is not hard to imagine his joy.', 'He is not joyful at all.'], correctAnswer: 'It is not hard to imagine his joy.', explanation: '「～に難くない」(～にかたくない) is a formal expression meaning "it is not hard to imagine/guess/understand".' },
            { questionText: '彼は、自分が犯した罪の重さを、今更ながら痛感していることだろう。', options: ['He does not feel the gravity of his crime.', 'He is probably feeling the gravity of his crime now, though it is rather late.', 'He felt the gravity of his crime long ago.', 'The gravity of his crime is not a concern for him now.'], correctAnswer: 'He is probably feeling the gravity of his crime now, though it is rather late.', explanation: '「今更ながら」(いまさらながら) means "although it is late now" or "it\'s a bit late, but...".「痛感していることだろう」means "is probably keenly feeling".' },
            { questionText: 'この件について、これ以上議論するまでもない。', options: ['There is no need to discuss this matter any further.', 'We must discuss this matter further.', 'We have not discussed this matter enough.', 'It is useless to discuss this matter.'], correctAnswer: 'There is no need to discuss this matter any further.', explanation: '「～までもない」means "there is no need to..." because the result is obvious or the action is unnecessary.' },
            { questionText: '結果はどうであれ、最後まで全力を尽くすことに意義がある。', options: ['Whatever the result may be, it is meaningful to do one\'s best until the end.', 'We must get a good result by doing our best.', 'If the result is bad, there is no meaning in having done one\'s best.', 'The result is not important, so there is no need to do one\'s best.'], correctAnswer: 'Whatever the result may be, it is meaningful to do one\'s best until the end.', explanation: '「どうであれ」is a form of 「どうであろうと」, meaning "whatever it may be" or "regardless of what it is".' },
            { questionText: '彼は学者というよりは、むしろ実業家といったほうが適切だろう。', options: ['He is more of a scholar than a businessman.', 'He is both a scholar and a businessman.', 'It would be more appropriate to say he is a businessman rather than a scholar.', 'He is neither a scholar nor a businessman.'], correctAnswer: 'It would be more appropriate to say he is a businessman rather than a scholar.', explanation: '「～というより（は）、むしろ～」is a pattern meaning "rather than A, it\'s more like B".' },
        ]
      },
    ]
  },
};
