
// src/lib/challenge-items-data.ts
import type { ChallengeItem } from './data';

type ChallengeData = {
  [level: string]: {
    [unit: string]: {
      [stage: string]: ChallengeItem[];
    };
  };
};

export const staticChallengeItems: ChallengeData = {
  "N5": {
    "Unit 1: Basic Sentences & Endings": {
      "stage1": [
        { id: 1, grammar_point: "AはBです", english_sentence: "This is a pen.", correct_japanese: "これはぺんです。", word_bank: ["これ", "は", "ぺん", "です。"], hint: "Use は to mark the topic.", distractors: ["それ", "ペン"] },
        { id: 2, grammar_point: "AはBです", english_sentence: "I am a student.", correct_japanese: "わたしはがくせいです。", word_bank: ["わたし", "は", "がくせい", "です。"], hint: "わたし means 'I'.", distractors: ["あなた", "せんせい"] },
        { id: 3, grammar_point: "Question with か", english_sentence: "Is that a book?", correct_japanese: "それはほんですか。", word_bank: ["それ", "は", "ほん", "ですか。"], hint: "Add か to the end to make a question.", distractors: ["です", "はい"] },
        { id: 4, grammar_point: "AはBじゃないです", english_sentence: "He is not a doctor.", correct_japanese: "かれはいしゃじゃないです。", word_bank: ["かれ", "は", "いしゃ", "じゃないです。"], hint: "じゃないです is the negative of です。", distractors: ["でした", "はい"] },
        { id: 5, grammar_point: "Aでした", english_sentence: "Yesterday was a holiday.", correct_japanese: "きのうはやすみでした。", word_bank: ["きのう", "は", "やすみ", "でした。"], hint: "でした is the past tense of です。", distractors: ["です", "あした"] },
      ],
      "stage2": [
        { id: 1, grammar_point: "AはBです", english_sentence: "That over there is a cat.", correct_japanese: "あれはねこです。", word_bank: ["あれ", "は", "ねこ", "です。"], hint: "Use あれ for things far from both speaker and listener.", distractors: ["これ", "いぬ"] },
        { id: 2, grammar_point: "Question with か", english_sentence: "Is this water?", correct_japanese: "これはみずですか。", word_bank: ["これ", "は", "みず", "ですか。"], hint: "Remember the question particle.", distractors: ["です", "おちゃ"] },
        { id: 3, grammar_point: "AはBじゃないです", english_sentence: "This is not my bag.", correct_japanese: "これはわたしのかばんじゃないです。", word_bank: ["これ", "は", "わたし", "の", "かばん", "じゃないです。"], hint: "Use の for possession.", distractors: ["あなた", "です"] },
        { id: 4, grammar_point: "Aでした", english_sentence: "The weather was sunny.", correct_japanese: "てんきははれでした。", word_bank: ["てんき", "は", "はれ", "でした。"], hint: "'Sunny' is はれ.", distractors: ["あめ", "です"] },
        { id: 5, grammar_point: "Sentence ender ね", english_sentence: "It's hot today, isn't it?", correct_japanese: "きょうはあついですね。", word_bank: ["きょう", "は", "あつい", "ですね。"], hint: "Use ね to seek agreement.", distractors: ["ですよ", "ですか"] },
      ],
      "stage3": [
        { id: 1, grammar_point: "AはBです", english_sentence: "My hobby is movies.", correct_japanese: "しゅみはえいがです。", word_bank: ["しゅみ", "は", "えいが", "です。"], hint: "'Hobby' is しゅみ.", distractors: ["すき", "おんがく"] },
        { id: 2, grammar_point: "Question with 何 (なに)", english_sentence: "What is your name?", correct_japanese: "おなまえはなんですか。", word_bank: ["おなまえ", "は", "なん", "ですか。"], hint: "なん is a reading of 何.", distractors: ["どこ", "だれ"] },
        { id: 3, grammar_point: "AはBじゃないです", english_sentence: "That is not a library.", correct_japanese: "あそこはとしょかんじゃないです。", word_bank: ["あそこ", "は", "としょかん", "じゃないです。"], hint: "Use あそこ for a place over there.", distractors: ["です", "がっこう"] },
        { id: 4, grammar_point: "Aじゃなかったです", english_sentence: "The test was not easy.", correct_japanese: "テストはかんたんじゃなかったです。", word_bank: ["テスト", "は", "かんたん", "じゃなかったです。"], hint: "Past negative is じゃなかったです。", distractors: ["でした", "むずかしい"] },
        { id: 5, grammar_point: "Sentence ender よ", english_sentence: "This cake is delicious, you know!", correct_japanese: "このケーキはおいしいですよ。", word_bank: ["この", "ケーキ", "は", "おいしい", "ですよ。"], hint: "Use よ to emphasize new information.", distractors: ["ですね", "ですか"] },
      ],
      "stage4": [
        { id: 1, grammar_point: "AはBです", english_sentence: "My phone number is 123.", correct_japanese: "でんわばんごうはいちにいさんです。", word_bank: ["でんわばんごう", "は", "いちにいさん", "です。"], hint: "Phone number is でんわばんごう.", distractors: ["なまえ", "です？"] },
        { id: 2, grammar_point: "Question with だれ", english_sentence: "Who is that person?", correct_japanese: "あのひとはだれですか。", word_bank: ["あの", "ひと", "は", "だれ", "ですか。"], hint: "Use だれ for 'who'.", distractors: ["なに", "どこ"] },
        { id: 3, grammar_point: "AはBじゃないです", english_sentence: "I am not Japanese.", correct_japanese: "わたしはにほんじんじゃないです。", word_bank: ["わたし", "は", "にほんじん", "じゃないです。"], hint: "Nationality + じん.", distractors: ["です", "にほんご"] },
        { id: 4, grammar_point: "Aでした", english_sentence: "The party was fun.", correct_japanese: "パーティーはたのしかったです。", word_bank: ["パーティー", "は", "たのし", "かったです。"], hint: "Past tense of an i-adjective.", distractors: ["でした", "たのしくない"] },
        { id: 5, grammar_point: "AはBです", english_sentence: "The dog is over there.", correct_japanese: "いぬはあそこです。", word_bank: ["いぬ", "は", "あそこ", "です。"], hint: "あそこ is used for location.", distractors: ["ねこ", "ここ"] },
      ],
      "stage5": [
        { id: 1, grammar_point: "AはBです", english_sentence: "This is a convenience store.", correct_japanese: "これはコンビニです。", word_bank: ["これ", "は", "コンビニ", "です。"], hint: "Katakana for 'convenience store'.", distractors: ["スーパー", "あれ"] },
        { id: 2, grammar_point: "Question with どこ", english_sentence: "Where is the toilet?", correct_japanese: "トイレはどこですか。", word_bank: ["トイレ", "は", "どこ", "ですか。"], hint: "どこ means 'where'.", distractors: ["だれ", "いつ"] },
        { id: 3, grammar_point: "AはBじゃないです", english_sentence: "That person is not a student.", correct_japanese: "あのひとはがくせいじゃないです。", word_bank: ["あの", "ひと", "は", "がくせい", "じゃないです。"], hint: "Negative of です。", distractors: ["です", "せんせい"] },
        { id: 4, grammar_point: "Aじゃなかったです", english_sentence: "The movie was not interesting.", correct_japanese: "えいがはおもしろくなかったです。", word_bank: ["えいが", "は", "おもしろく", "なかったです。"], hint: "Past negative of an i-adjective.", distractors: ["でした", "おもしろい"] },
        { id: 5, grammar_point: "AはBです", english_sentence: "This is a delicious ramen.", correct_japanese: "これはおいしいラーメンです。", word_bank: ["これ", "は", "おいしい", "ラーメン", "です。"], hint: "Delicious is おいしい.", distractors: ["まずい", "うどん"] },
      ]
    },
    "Unit 2: Verb Forms and Conjugation": {
      "stage1": [
        { id: 1, grammar_point: "ます form", english_sentence: "I eat bread.", correct_japanese: "わたしはパンをたべます。", word_bank: ["わたし", "は", "パン", "を", "たべます。"], hint: "Use ます for polite present tense.", distractors: ["たべる", "たべました"] },
        { id: 2, grammar_point: "ます form", english_sentence: "I drink water.", correct_japanese: "みずをのみます。", word_bank: ["みず", "を", "のみます。"], hint: "The verb 'to drink' is のむ.", distractors: ["のんで", "のみません"] },
        { id: 3, grammar_point: "ません form", english_sentence: "I don't watch TV.", correct_japanese: "テレビをみません。", word_bank: ["テレビ", "を", "みません。"], hint: "ません is the negative of ます。", distractors: ["みます", "みて"] },
        { id: 4, grammar_point: "ました form", english_sentence: "I bought a book.", correct_japanese: "ほんをかいました。", word_bank: ["ほん", "を", "かいました。"], hint: "ました is the past tense of ます。", distractors: ["かいます", "かって"] },
        { id: 5, grammar_point: "ませんでした form", english_sentence: "I did not go to school.", correct_japanese: "がっこうへいきませんでした。", word_bank: ["がっこう", "へ", "いきませんでした。"], hint: "Past negative is ませんでした。", distractors: ["いきます", "いきました"] },
      ],
      "stage2": [
        { id: 1, grammar_point: "ます form", english_sentence: "I read a newspaper.", correct_japanese: "しんぶんをよみます。", word_bank: ["しんぶん", "を", "よみます。"], hint: "'Newspaper' is しんぶん.", distractors: ["ざっし", "よんで"] },
        { id: 2, grammar_point: "ません form", english_sentence: "I don't listen to music.", correct_japanese: "おんがくをききません。", word_bank: ["おんがく", "を", "ききません。"], hint: "Negative form of ききます。", distractors: ["ききます", "ききました"] },
        { id: 3, grammar_point: "ました form", english_sentence: "I met a friend.", correct_japanese: "ともだちにあいました。", word_bank: ["ともだち", "に", "あいました。"], hint: "Use に for the person you meet.", distractors: ["を", "あいます"] },
        { id: 4, grammar_point: "ませんでした form", english_sentence: "I did not write a letter.", correct_japanese: "てがみをかきませんでした。", word_bank: ["てがみ", "を", "かきませんでした。"], hint: "'Letter' is てがみ.", distractors: ["かきました", "かきます"] },
        { id: 5, grammar_point: "ます form (future)", english_sentence: "I will return home tomorrow.", correct_japanese: "あしたうちへかえります。", word_bank: ["あした", "うち", "へ", "かえります。"], hint: "The ます form can also be used for the future.", distractors: ["きのう", "かえりました"] },
      ],
      "stage3": [
        { id: 1, grammar_point: "ます form", english_sentence: "I take a photo.", correct_japanese: "しゃしんをとります。", word_bank: ["しゃしん", "を", "とります。"], hint: "Verb for 'take a photo' is とる.", distractors: ["とって", "とりました"] },
        { id: 2, grammar_point: "ません form", english_sentence: "I don't make breakfast.", correct_japanese: "あさごはんをつくりません。", word_bank: ["あさごはん", "を", "つくりません。"], hint: "Negative polite form.", distractors: ["つくります", "ひるごはん"] },
        { id: 3, grammar_point: "ました form", english_sentence: "I swam in the pool.", correct_japanese: "プールでおよぎました。", word_bank: ["プール", "で", "およぎました。"], hint: "Use で for the place of action.", distractors: ["へ", "およぎます"] },
        { id: 4, grammar_point: "ませんでした form", english_sentence: "I did not rest yesterday.", correct_japanese: "きのうやすみませんでした。", word_bank: ["きのう", "やすみませんでした。"], hint: "Past negative of やすみます。", distractors: ["やすみます", "やすみました"] },
        { id: 5, grammar_point: "ます form", english_sentence: "I work at a company.", correct_japanese: "かいしゃではたらきます。", word_bank: ["かいしゃ", "で", "はたらきます。"], hint: "Place of action is marked with で.", distractors: ["に", "はたらきません"] },
      ],
      "stage4": [
        { id: 1, grammar_point: "ます form", english_sentence: "I learn Japanese.", correct_japanese: "にほんごをならいます。", word_bank: ["にほんご", "を", "ならいます。"], hint: "'To learn' is ならう.", distractors: ["えいご", "ならいました"] },
        { id: 2, grammar_point: "ません form", english_sentence: "I don't play tennis.", correct_japanese: "テニスをしません。", word_bank: ["テニス", "を", "しません。"], hint: "For sports, you often use します。", distractors: ["します", "しました"] },
        { id: 3, grammar_point: "ました form", english_sentence: "I entered the classroom.", correct_japanese: "きょうしつにはいりました。", word_bank: ["きょうしつ", "に", "はいりました。"], hint: "Use に for the place you enter.", distractors: ["で", "はいります"] },
        { id: 4, grammar_point: "ませんでした form", english_sentence: "I did not wait for the bus.", correct_japanese: "バスをまちませんでした。", word_bank: ["バス", "を", "まちませんでした。"], hint: "Negative past of まちます。", distractors: ["まちます", "まちました"] },
        { id: 5, grammar_point: "ます form", english_sentence: "There is a cat.", correct_japanese: "ねこがいます。", word_bank: ["ねこ", "が", "います。"], hint: "Use います for living things.", distractors: ["を", "あります"] },
      ],
      "stage5": [
        { id: 1, grammar_point: "ます form", english_sentence: "I stand up.", correct_japanese: "たちます。", word_bank: ["たちます。"], hint: "'To stand up' is たちます。", distractors: ["すわります", "たちません"] },
        { id: 2, grammar_point: "ません form", english_sentence: "I don't sell shoes.", correct_japanese: "くつをうりません。", word_bank: ["くつ", "を", "うりません。"], hint: "'To sell' is うる.", distractors: ["うります", "かいます"] },
        { id: 3, grammar_point: "ました form", english_sentence: "I received a present.", correct_japanese: "プレゼントをもらいました。", word_bank: ["プレゼント", "を", "もらいました。"], hint: "'To receive' is もらう.", distractors: ["あげました", "もらいます"] },
        { id: 4, grammar_point: "ませんでした form", english_sentence: "I did not die.", correct_japanese: "しにませんでした。", word_bank: ["しにませんでした。"], hint: "'To die' is しぬ.", distractors: ["しにました", "しにます"] },
        { id: 5, grammar_point: "ます form", english_sentence: "I ride a train.", correct_japanese: "でんしゃにのります。", word_bank: ["でんしゃ", "に", "のります。"], hint: "Use に for the vehicle you ride.", distractors: ["を", "おります"] },
      ]
    },
    "Unit 3: Particles": {
      "stage1": [
        { id: 1, grammar_point: "は (wa)", english_sentence: "As for me, I am a student.", correct_japanese: "わたしはがくせいです。", word_bank: ["わたし", "は", "がくせい", "です。"], hint: "Topic marker.", distractors: ["が", "を"] },
        { id: 2, grammar_point: "が (ga)", english_sentence: "I like dogs.", correct_japanese: "いぬがすきです。", word_bank: ["いぬ", "が", "すき", "です。"], hint: "Subject marker for likes/dislikes.", distractors: ["は", "を"] },
        { id: 3, grammar_point: "を (o)", english_sentence: "I drink juice.", correct_japanese: "ジュースをのみます。", word_bank: ["ジュース", "を", "のみます。"], hint: "Direct object marker.", distractors: ["に", "で"] },
        { id: 4, grammar_point: "に (ni) / へ (e)", english_sentence: "I go to the library.", correct_japanese: "としょかんへいきます。", word_bank: ["としょかん", "へ", "いきます。"], hint: "Direction/destination marker.", distractors: ["で", "と"] },
        { id: 5, grammar_point: "で (de)", english_sentence: "I study at home.", correct_japanese: "うちでべんきょうします。", word_bank: ["うち", "で", "べんきょうします。"], hint: "Location of action marker.", distractors: ["に", "を"] },
      ],
      "stage2": [
        { id: 1, grammar_point: "の (no)", english_sentence: "This is my umbrella.", correct_japanese: "これはわたしのかさです。", word_bank: ["これ", "は", "わたし", "の", "かさ", "です。"], hint: "Possessive marker.", distractors: ["と", "が"] },
        { id: 2, grammar_point: "と (to)", english_sentence: "I go with a friend.", correct_japanese: "ともだちといきます。", word_bank: ["ともだち", "と", "いきます。"], hint: "'With' marker.", distractors: ["も", "で"] },
        { id: 3, grammar_point: "も (mo)", english_sentence: "He is also a teacher.", correct_japanese: "かれもせんせいです。", word_bank: ["かれ", "も", "せんせい", "です。"], hint: "'Also' or 'too' marker.", distractors: ["は", "が"] },
        { id: 4, grammar_point: "から (kara)", english_sentence: "I came from America.", correct_japanese: "アメリカからきました。", word_bank: ["アメリカ", "から", "きました。"], hint: "'From' marker.", distractors: ["まで", "に"] },
        { id: 5, grammar_point: "まで (made)", english_sentence: "I work until 5 o'clock.", correct_japanese: "ごじまではたらきます。", word_bank: ["ごじ", "まで", "はたらきます。"], hint: "'Until' or 'up to' marker.", distractors: ["から", "に"] },
      ],
      "stage3": [
        { id: 1, grammar_point: "に (ni) - Time", english_sentence: "The meeting starts at 3 o'clock.", correct_japanese: "かいぎはさんじにはじまります。", word_bank: ["かいぎ", "は", "さんじ", "に", "はじまります。"], hint: "Specific time marker.", distractors: ["で", "から"] },
        { id: 2, grammar_point: "や (ya)", english_sentence: "There are books and pens on the desk.", correct_japanese: "つくえのうえにほんやペンがあります。", word_bank: ["つくえ", "の", "うえ", "に", "ほん", "や", "ペン", "が", "あります。"], hint: "Non-exhaustive 'and' marker.", distractors: ["と", "も"] },
        { id: '3', grammar_point: "は (wa) vs が (ga)", english_sentence: "Elephants have long noses.", correct_japanese: "ぞうははながながいです。", word_bank: ["ぞう", "は", "はな", "が", "ながい", "です。"], hint: "Topic is 'elephants', subject of 'long' is 'nose'.", distractors: ["を", "も"] },
        { id: '4', grammar_point: "に (ni) - indirect object", english_sentence: "I give flowers to my mother.", correct_japanese: "ははにはなをあげます。", word_bank: ["はは", "に", "はな", "を", "あげます。"], hint: "The receiver of the action is marked with に.", distractors: ["で", "と"] },
        { id: '5', grammar_point: "で (de) - means", english_sentence: "I go by bus.", correct_japanese: "バスでいきます。", word_bank: ["バス", "で", "いきます。"], hint: "Means/method marker.", distractors: ["を", "に"] },
      ],
      "stage4": [
        { id: '1', grammar_point: "Double particles", english_sentence: "I received a book from a friend.", correct_japanese: "ともだちにほんをもらいました。", word_bank: ["ともだち", "に", "ほん", "を", "もらいました。"], hint: "に marks the source of receiving.", distractors: ["から", "で"] },
        { id: '2', grammar_point: "Question word + も", english_sentence: "I did not eat anything.", correct_japanese: "なにもたべませんでした。", word_bank: ["なに", "も", "たべませんでした。"], hint: "Use なにも with a negative verb.", distractors: ["なにか", "なにもたべました"] },
        { id: '3', grammar_point: "Question word + も", english_sentence: "I did not go anywhere.", correct_japanese: "どこへもいきませんでした。", word_bank: ["どこ", "へも", "いきませんでした。"], hint: "どこへも/どこにも means 'nowhere'.", distractors: ["どこか", "どこへもいきました"] },
        { id: '4', grammar_point: "Location に vs で", english_sentence: "There is a cat in the park.", correct_japanese: "こうえんにねこがいます。", word_bank: ["こうえん", "に", "ねこ", "が", "います。"], hint: "Use に for existence (いる/ある).", distractors: ["で", "を"] },
        { id: '5', grammar_point: "Location に vs で", english_sentence: "I play in the park.", correct_japanese: "こうえんであそびます。", word_bank: ["こうえん", "で", "あそびます。"], hint: "Use で for action location.", distractors: ["に", "へ"] },
      ],
      "stage5": [
        { id: '1', grammar_point: "to vs ya", english_sentence: "I bought bread, milk, and eggs.", correct_japanese: "パンとぎゅうにゅうとたまごをかいました。", word_bank: ["パン", "と", "ぎゅうにゅう", "と", "たまご", "を", "かいました。"], hint: "Use と for a complete list.", distractors: ["や", "も"] },
        { id: '2', grammar_point: "to vs ya", english_sentence: "I like fruits like apples and oranges.", correct_japanese: "りんごやオレンジなどのくだものがすきです。", word_bank: ["りんご", "や", "オレンジ", "など", "の", "くだもの", "が", "すき", "です。"], hint: "Use や to give examples.", distractors: ["と", "も"] },
        { id: '3', grammar_point: "kara vs made", english_sentence: "The bank is open from 9 to 3.", correct_japanese: "ぎんこうはくじからさんじまでです。", word_bank: ["ぎんこう", "は", "くじ", "から", "さんじ", "まで", "です。"], hint: "Use から for starting point and まで for ending point.", distractors: ["に", "で"] },
        { id: '4', grammar_point: "ni vs de (means)", english_sentence: "I write my name with a pen.", correct_japanese: "ペンでなまえをかきます。", word_bank: ["ペン", "で", "なまえ", "を", "かきます。"], hint: "What tool do you use?", distractors: ["に", "を"] },
        { id: '5', grammar_point: "Double particles", english_sentence: "I will go to Kyoto from Tokyo.", correct_japanese: "とうきょうからきょうとまでいきます。", word_bank: ["とうきょう", "から", "きょうと", "まで", "いきます。"], hint: "From Tokyo, to Kyoto.", distractors: ["に", "で"] },
      ]
    },
    "Unit 4: Common Sentence Patterns": {
      "stage1": [
        { id: 1, grammar_point: "AはBが好きです", english_sentence: "I like pizza.", correct_japanese: "わたしはピザがすきです。", word_bank: ["わたし", "は", "ピザ", "が", "すき", "です。"], hint: "Use が for the thing you like.", distractors: ["を", "は"] },
        { id: 2, grammar_point: "AはBが嫌いです", english_sentence: "He dislikes bugs.", correct_japanese: "かれはむしがきらいです。", word_bank: ["かれ", "は", "むし", "が", "きらい", "です。"], hint: "'Dislike' is きらい。", distractors: ["すき", "を"] },
        { id: 3, grammar_point: "AはBが上手です", english_sentence: "She is good at singing.", correct_japanese: "かのじょはうたがじょうずです。", word_bank: ["かのじょ", "は", "うた", "が", "じょうず", "です。"], hint: "'Good at' is じょうず。", distractors: ["へた", "を"] },
        { id: 4, grammar_point: "AはBが下手です", english_sentence: "I am bad at cooking.", correct_japanese: "わたしはりょうりがへたです。", word_bank: ["わたし", "は", "りょうり", "が", "へた", "です。"], hint: "'Bad at' is へた。", distractors: ["じょうず", "を"] },
        { id: 5, grammar_point: "AはBが分かります", english_sentence: "I understand Japanese.", correct_japanese: "わたしはにほんごがわかります。", word_bank: ["わたし", "は", "にほんご", "が", "わかります。"], hint: "Use が for the thing you understand.", distractors: ["を", "は"] },
      ],
      "stage2": [
        { id: 1, grammar_point: "AはBがあります", english_sentence: "I have a car.", correct_japanese: "わたしはくるまがあります。", word_bank: ["わたし", "は", "くるま", "が", "あります。"], hint: "Use あります for inanimate objects.", distractors: ["います", "を"] },
        { id: 2, grammar_point: "AはBがいます", english_sentence: "I have a dog.", correct_japanese: "わたしはいぬがいます。", word_bank: ["わたし", "は", "いぬ", "が", "います。"], hint: "Use います for living things.", distractors: ["あります", "を"] },
        { id: 3, grammar_point: "AはBよりCです", english_sentence: "Trains are faster than buses.", correct_japanese: "でんしゃはバスよりはやいです。", word_bank: ["でんしゃ", "は", "バス", "より", "はやい", "です。"], hint: "より means 'than'.", distractors: ["ほど", "と"] },
        { id: 4, grammar_point: "AはBほど～ない", english_sentence: "Buses are not as fast as trains.", correct_japanese: "バスはでんしゃほどはやくありません。", word_bank: ["バス", "は", "でんしゃ", "ほど", "はやくありません。"], hint: "ほど～ない means 'not as... as'.", distractors: ["より", "ぐらい"] },
        { id: 5, grammar_point: "AとBとどちらが好きですか", english_sentence: "Which do you like, cats or dogs?", correct_japanese: "いぬとねことどちらがすきですか。", word_bank: ["いぬ", "と", "ねこ", "と", "どちら", "が", "すき", "ですか。"], hint: "Use どちら to ask 'which' of two.", distractors: ["どっち", "なん"] },
      ],
      "stage3": [
        { id: 1, grammar_point: "Aの方がBより", english_sentence: "I like cats more than dogs.", correct_japanese: "わたしはいぬよりねこのほうがすきです。", word_bank: ["わたし", "は", "いぬ", "より", "ねこ", "の", "ほう", "が", "すき", "です。"], hint: "のほうが emphasizes the preferred item.", distractors: ["だけ", "しか"] },
        { id: 2, grammar_point: "Aの中でBが一番", english_sentence: "I like summer the most.", correct_japanese: "きせつのなかでなつがいちばんすきです。", word_bank: ["きせつ", "の", "なかで", "なつ", "が", "いちばん", "すき", "です。"], hint: "一番 (いちばん) means 'number one' or 'the most'.", distractors: ["にばん", "ぜんぶ"] },
        { id: 3, grammar_point: "AはBと同じです", english_sentence: "This is the same as that.", correct_japanese: "これはあれとおなじです。", word_bank: ["これ", "は", "あれ", "と", "おなじ", "です。"], hint: "おなじ means 'same'.", distractors: ["ちがいます", "より"] },
        { id: 4, grammar_point: "AはBと違います", english_sentence: "My opinion is different from his.", correct_japanese: "わたしのいけんはかれとちがいます。", word_bank: ["わたし", "の", "いけん", "は", "かれ", "と", "ちがいます。"], hint: "ちがいます means 'different'.", distractors: ["おなじです", "すきです"] },
        { id: 5, grammar_point: "AはBがほしいです", english_sentence: "I want a new computer.", correct_japanese: "あたらしいパソコンがほしいです。", word_bank: ["あたらしい", "パソコン", "が", "ほしい", "です。"], hint: "Use が for the thing you want.", distractors: ["を", "は"] },
      ],
      "stage4": [
        { id: 1, grammar_point: "AはBが上手です", english_sentence: "Mr. Tanaka is good at Japanese.", correct_japanese: "田中さんは日本語が上手です。", word_bank: ["田中さん", "は", "日本語", "が", "上手", "です。"], hint: "Use Kanji for names and nouns now.", distractors: ["下手", "を"] },
        { id: 2, grammar_point: "AはBが分かります", english_sentence: "I understand a little Kanji.", correct_japanese: "私は漢字が少し分かります。", word_bank: ["私", "は", "漢字", "が", "少し", "分かります。"], hint: "少し (すこし) means 'a little'.", distractors: ["を", "たくさん"] },
        { id: 3, grammar_point: "AはBが好きです", english_sentence: "I like Japanese food.", correct_japanese: "私は日本の食べ物が好きです。", word_bank: ["私", "は", "日本", "の", "食べ物", "が", "好き", "です。"], hint: "日本の食べ物 means 'Japanese food'.", distractors: ["を", "嫌い"] },
        { id: 4, grammar_point: "AはBがあります", english_sentence: "I have time today.", correct_japanese: "今日は時間があります。", word_bank: ["今日", "は", "時間", "が", "あります。"], hint: "時間 (じかん) means 'time'.", distractors: ["を", "いません"] },
        { id: 5, grammar_point: "AはBがいます", english_sentence: "My older brother has a child.", correct_japanese: "兄は子供がいます。", word_bank: ["兄", "は", "子供", "が", "います。"], hint: "兄 (あに) is 'older brother'.", distractors: ["あります", "姉"] },
      ],
      "stage5": [
        { id: 1, grammar_point: "AはBよりCです", english_sentence: "This book is more interesting than that book.", correct_japanese: "この本はあの本より面白いです。", word_bank: ["この", "本", "は", "あの", "本", "より", "面白い", "です。"], hint: "面白い (おもしろい) means 'interesting'.", distractors: ["ほど", "つまらない"] },
        { id: 2, grammar_point: "AはBほど～ない", english_sentence: "This year is not as cold as last year.", correct_japanese: "今年は去年ほど寒くありません。", word_bank: ["今年", "は", "去年", "ほど", "寒くありません。"], hint: "去年 (きょねん) is 'last year'.", distractors: ["より", "暑い"] },
        { id: 3, grammar_point: "Aの中でBが一番", english_sentence: "Among sports, I like soccer the most.", correct_japanese: "スポーツの中でサッカーが一番好きです。", word_bank: ["スポーツ", "の", "中で", "サッカー", "が", "一番", "好き", "です。"], hint: "一番 (いちばん) means 'the most'.", distractors: ["より", "野球"] },
        { id: 4, grammar_point: "AはBがほしいです", english_sentence: "What do you want for your birthday?", correct_japanese: "誕生日に何がほしいですか。", word_bank: ["誕生日", "に", "何", "が", "ほしい", "ですか。"], hint: "誕生日 (たんじょうび) means 'birthday'.", distractors: ["を", "あげます"] },
        { id: 5, grammar_point: "AはBが上手です", english_sentence: "My younger sister is good at drawing.", correct_japanese: "妹は絵が上手です。", word_bank: ["妹", "は", "絵", "が", "上手", "です。"], hint: "妹 (いもうと) is 'younger sister', 絵 (え) is 'drawing/picture'.", distractors: ["弟", "下手"] },
      ]
    },
    // The rest of the N5 units will also be hardcoded here following the same pattern.
    // ...
  }
};
