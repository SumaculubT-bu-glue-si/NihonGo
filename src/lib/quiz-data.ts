
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
      {
        title: 'N5 Vocabulary Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N5 Vocab Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N5 Vocabulary Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N5 Vocab Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      }
    ],
    N4: [
      {
        title: 'N4 Vocabulary Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N4 Vocab Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N4 Vocabulary Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N4 Vocab Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N4 Vocabulary Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N4 Vocab Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      }
    ],
    N3: [
      {
        title: 'N3 Vocabulary Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N3 Vocab Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N3 Vocabulary Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N3 Vocab Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N3 Vocabulary Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N3 Vocab Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      }
    ],
    N2: [
      {
        title: 'N2 Vocabulary Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N2 Vocab Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N2 Vocabulary Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N2 Vocab Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N2 Vocabulary Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N2 Vocab Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      }
    ],
    N1: [
      {
        title: 'N1 Vocabulary Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N1 Vocab Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N1 Vocabulary Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N1 Vocab Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N1 Vocabulary Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N1 Vocab Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      }
    ],
  },
  grammar: {
    N5: [
      {
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
      {
        title: 'N5 Grammar Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N5 Grammar Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N5 Grammar Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N5 Grammar Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      }
    ],
    N4: [
       {
        title: 'N4 Grammar Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N4 Grammar Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
       {
        title: 'N4 Grammar Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N4 Grammar Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
       {
        title: 'N4 Grammar Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N4 Grammar Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      }
    ],
    N3: [
       {
        title: 'N3 Grammar Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N3 Grammar Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
       {
        title: 'N3 Grammar Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N3 Grammar Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
       {
        title: 'N3 Grammar Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N3 Grammar Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      }
    ],
    N2: [
       {
        title: 'N2 Grammar Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N2 Grammar Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
       {
        title: 'N2 Grammar Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N2 Grammar Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
       {
        title: 'N2 Grammar Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N2 Grammar Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      }
    ],
    N1: [
       {
        title: 'N1 Grammar Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N1 Grammar Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
       {
        title: 'N1 Grammar Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N1 Grammar Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
       {
        title: 'N1 Grammar Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N1 Grammar Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      }
    ]
  },
  listening: {
    N5: [
        {
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
        {
          title: 'N5 Listening Quiz #2',
          questions: Array.from({ length: 10 }, (_, i) => ({
              questionText: `Placeholder question ${i+1} for N5 Listening Quiz 2`,
              options: ['A', 'B', 'C', 'D'],
              correctAnswer: 'A',
              explanation: 'This is a placeholder explanation.'
          }))
        },
        {
          title: 'N5 Listening Quiz #3',
          questions: Array.from({ length: 10 }, (_, i) => ({
              questionText: `Placeholder question ${i+1} for N5 Listening Quiz 3`,
              options: ['A', 'B', 'C', 'D'],
              correctAnswer: 'A',
              explanation: 'This is a placeholder explanation.'
          }))
        }
    ],
    N4: [
      {
        title: 'N4 Listening Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N4 Listening Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N4 Listening Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N4 Listening Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N4 Listening Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N4 Listening Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
    ],
    N3: [
      {
        title: 'N3 Listening Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N3 Listening Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N3 Listening Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N3 Listening Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N3 Listening Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N3 Listening Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
    ],
    N2: [
      {
        title: 'N2 Listening Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N2 Listening Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N2 Listening Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N2 Listening Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N2 Listening Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N2 Listening Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
    ],
    N1: [
      {
        title: 'N1 Listening Quiz #1',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N1 Listening Quiz 1`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N1 Listening Quiz #2',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N1 Listening Quiz 2`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
      {
        title: 'N1 Listening Quiz #3',
        questions: Array.from({ length: 10 }, (_, i) => ({
            questionText: `Placeholder question ${i+1} for N1 Listening Quiz 3`,
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            explanation: 'This is a placeholder explanation.'
        }))
      },
    ]
  },
};
