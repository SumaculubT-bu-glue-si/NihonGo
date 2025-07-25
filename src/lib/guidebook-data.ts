type GuidebookContent = {
  [level: string]: {
    [unit: string]: string;
  };
};

export const staticGuidebooks: GuidebookContent = {
  N5: {
    'Unit 1: Basic Sentences & Endings': `
        <h1>Guide to Basic Sentence Endings (N5)</h1>
        <p>This unit covers the most fundamental sentence structures in Japanese. You will learn how to state what something is, ask questions, and express basic agreement and emphasis.</p>
        <h2>The です (desu) Copula</h2>
        <p>The word <strong>です (desu)</strong> is a polite copula, similar to "is," "am," or "are" in English. It's used at the end of a sentence to make a polite statement of fact.</p>
        <ul>
          <li>これはペンです。 (Kore wa pen desu.) - This is a pen.</li>
          <li>私は学生です。 (Watashi wa gakusei desu.) - I am a student.</li>
        </ul>
        <h2>The か (ka) Question Particle</h2>
        <p>To turn a statement into a question, you simply add the particle <strong>か (ka)</strong> to the end of the sentence. No need to change word order!</p>
        <ul>
          <li>それは本ですか。 (Sore wa hon desu ka?) - Is that a book?</li>
          <li>田中さんは先生ですか。 (Tanaka-san wa sensei desu ka?) - Is Mr. Tanaka a teacher?</li>
        </ul>
        <h2>Sentence Enders ね (ne) and よ (yo)</h2>
        <p>These particles are added to the end of sentences to add nuance.</p>
        <ul>
            <li><strong>ね (ne)</strong> is used to seek agreement or confirmation, like adding ", right?" or ", isn't it?". It creates a softer, more conversational tone.
                <ul><li>今日は暑いですね。 (Kyou wa atsui desu ne.) - It's hot today, isn't it?</li></ul>
            </li>
            <li><strong>よ (yo)</strong> is used to add emphasis or to introduce new information that the speaker believes the listener doesn't know. It makes the statement more assertive.
                <ul><li>このケーキは美味しいですよ。 (Kono keeki wa oishii desu yo.) - This cake is delicious, I tell you!</li></ul>
            </li>
        </ul>
        `,
    'Unit 2: Verb Forms and Conjugation': `
        <h1>Guide to Basic Verb Forms (N5)</h1>
        <p>This unit introduces the polite verb form, known as the <strong>-masu form</strong>. This is the foundation for polite speech and is essential for everyday conversations in Japan.</p>
        <h2>The ます (masu) Form</h2>
        <p>The <strong>-masu</strong> ending is attached to the verb stem to create the polite, non-past (present and future) tense.</p>
        <ul>
          <li><strong>Affirmative (I do):</strong> 食べます (tabemasu) - To eat</li>
          <li><strong>Negative (I don't):</strong> 食べません (tabemasen) - To not eat</li>
        </ul>
        <h2>Past Tense with ました (mashita)</h2>
        <p>To talk about the past, the ending changes to <strong>-mashita</strong>.</p>
        <ul>
          <li><strong>Past Affirmative (I did):</strong> 食べました (tabemashita) - Ate</li>
          <li><strong>Past Negative (I didn't):</strong> 食べませんでした (tabemasen deshita) - Did not eat</li>
        </ul>
        `,
    'Unit 3: Particles': `
        <h1>Guide to Basic Particles (N5)</h1>
        <p>Particles are the grammatical glue of Japanese sentences. They follow nouns and indicate their function in the sentence. Mastering them is key to fluency.</p>
        <h2>は (wa) - The Topic Marker</h2>
        <p>The particle <strong>は (wa)</strong> marks the main topic of the sentence. It tells the listener "we are now talking about X."</p>
        <ul><li>私は学生です。 (Watashi wa gakusei desu.) - As for me, I am a student.</li></ul>
        <h2>が (ga) - The Subject Marker</h2>
        <p>The particle <strong>が (ga)</strong> marks the grammatical subject of a verb, especially when introducing new information or identifying something specific.</p>
        <ul><li>猫が好きです。 (Neko ga suki desu.) - I like cats. (lit. Cats are liked.)</li></ul>
        <h2>を (o) - The Object Marker</h2>
        <p>The particle <strong>を (o)</strong> marks the direct object of a transitive verb. It indicates the thing that the action is being done to.</p>
        <ul><li>パンを食べます。 (Pan o tabemasu.) - I eat bread.</li></ul>
        <h2>の (no) - The Possessive Particle</h2>
        <p>The particle <strong>の (no)</strong> indicates possession, similar to "'s" in English.</p>
        <ul><li>これは私の本です。 (Kore wa watashi no hon desu.) - This is my book.</li></ul>
        `,
    'Unit 4: Common Sentence Patterns': `
        <h1>Guide to Common Sentence Patterns (N5)</h1>
        <p>Learn fundamental patterns to express likes, understanding, and skill.</p>
        <h2>A は B が好き / きらい (suki / kirai)</h2>
        <p>Used to express likes and dislikes. The object of the feeling is marked by <strong>が (ga)</strong>, not を (o).</p>
        <ul><li>私は犬が好きです。 (Watashi wa inu ga suki desu.) - I like dogs.</li></ul>
        <h2>A は B がわかる (wakaru)</h2>
        <p>Used to express understanding. The thing that is understood is marked by <strong>が (ga)</strong>.</p>
        <ul><li>私は日本語が少しわかります。(Watashi wa nihongo ga sukoshi wakarimasu.) - I understand a little Japanese.</li></ul>
        <h2>A は B がじょうず / へた (jouzu / heta)</h2>
        <p>Used to describe skill level (good at / poor at). The skill is marked by <strong>が (ga)</strong>.</p>
        <ul><li>彼はテニスが上手です。(Kare wa tenisu ga jouzu desu.) - He is good at tennis.</li></ul>
        `,
    'Unit 5: Existence & Possession': `
        <h1>Guide to Existence & Possession (N5)</h1>
        <p>This unit teaches how to talk about what exists and where.</p>
        <h2>～がある (ga aru) - For Inanimate Objects</h2>
        <p>Use <strong>あります (arimasu)</strong> to state the existence of non-living things.</p>
        <ul><li>机の上に本があります。 (Tsukue no ue ni hon ga arimasu.) - There is a book on the desk.</li></ul>
        <h2>～がいる (ga iru) - For Animate Objects</h2>
        <p>Use <strong>います (imasu)</strong> to state the existence of living things (people, animals).</p>
        <ul><li>公園に子供がいます。(Kouen ni kodomo ga imasu.) - There are children in the park.</li></ul>
        <h2>～がほしい (ga hoshii) - Wanting Something</h2>
        <p>Used to express desire for a specific item. The desired item is marked by <strong>が (ga)</strong>.</p>
        <ul><li>新しい車が欲しいです。(Atarashii kuruma ga hoshii desu.) - I want a new car.</li></ul>
        `,
    'Unit 6: Time & Frequency': `
        <h1>Guide to Time & Frequency (N5)</h1>
        <p>Learn to talk about when and how often things happen.</p>
        <h2>Time Expressions</h2>
        <p>Use <strong>時 (ji)</strong> for hours and <strong>分 (fun/pun)</strong> for minutes. Use particles like <strong>に (ni)</strong> for specific times.</p>
        <ul><li>三時に会いましょう。(Sanji ni aimashou.) - Let's meet at 3 o'clock.</li></ul>
        <h2>Frequency with 毎～ (mai)</h2>
        <p>The prefix <strong>毎 (mai)</strong> means "every," used with words like day (毎日), week (毎週), and year (毎年).</p>
        <ul><li>毎日、日本語を勉強します。(Mainichi, nihongo o benkyou shimasu.) - I study Japanese every day.</li></ul>
        <h2>とき (toki) - When</h2>
        <p>Used after a verb or adjective to mean "when".</p>
        <ul><li>子供の時、よく川で泳ぎました。(Kodomo no toki, yoku kawa de oyogimashita.) - When I was a child, I often swam in the river.</li></ul>
        `,
    'Unit 7: Requests, Commands, and Intentions': `
        <h1>Guide to Requests & Intentions (N5)</h1>
        <p>This unit covers how to ask for things, make suggestions, and state your plans.</p>
        <h2>～てください (te kudasai) - Please do</h2>
        <p>The te-form of a verb followed by <strong>ください (kudasai)</strong> is a polite request.</p>
        <ul><li>これを読んでください。(Kore o yonde kudasai.) - Please read this.</li></ul>
        <h2>～ましょう (mashou) - Let's do</h2>
        <p>Attaching <strong>ましょう (mashou)</strong> to the verb stem is used to suggest doing something together.</p>
        <ul><li>一緒に昼ご飯を食べましょう。(Issho ni hirugohan o tabemashou.) - Let's eat lunch together.</li></ul>
        <h2>～たいです (tai desu) - Want to do</h2>
        <p>Used with the verb stem to express one's own desire to do something.</p>
        <ul><li>日本へ行きたいです。(Nihon e ikitai desu.) - I want to go to Japan.</li></ul>
        `,
    'Unit 8: Adjective Usage': `
        <h1>Guide to Adjective Usage (N5)</h1>
        <p>Learn the two types of Japanese adjectives and how to connect them.</p>
        <h2>い-Adjectives</h2>
        <p>Adjectives that end with い (e.g., 高い, takai). They conjugate to show past/negative forms.</p>
        <ul><li>この山は高いです。(Kono yama wa takai desu.) - This mountain is high.</li></ul>
        <h2>な-Adjectives</h2>
        <p>Adjectives that require <strong>な (na)</strong> when they directly modify a noun (e.g., 静かな部屋, shizuka na heya). They use です for conjugation.</p>
        <ul><li>この部屋は静かです。(Kono heya wa shizuka desu.) - This room is quiet.</li></ul>
        <h2>Connecting Adjectives</h2>
        <p>Use <strong>くて (kute)</strong> for i-adjectives and <strong>で (de)</strong> for na-adjectives to link them in a sentence.</p>
        <ul><li>この部屋は広くて、きれいです。(Kono heya wa hirokute, kirei desu.) - This room is spacious and clean.</li></ul>
        `,
    'Unit 9: Ability / Permission / Prohibition': `
        <h1>Guide to Ability & Permission (N5)</h1>
        <p>Learn how to express what you can do, what you are allowed to do, and what you must not do.</p>
        <h2>～ことができる (koto ga dekiru) - Can do</h2>
        <p>A way to express ability. Verb dictionary form + <strong>ことができる</strong>.</p>
        <ul><li>私はピアノを弾くことができます。(Watashi wa piano o hiku koto ga dekimasu.) - I can play the piano.</li></ul>
        <h2>～てもいいです (te mo ii desu) - May / It's okay to</h2>
        <p>Used to give permission. "You may do..." or "It's okay if you do...".</p>
        <ul><li>写真を撮ってもいいですか。(Shashin o totte mo ii desu ka?) - May I take a picture?</li></ul>
        <h2>～てはいけません (te wa ikemasen) - Must not</h2>
        <p>A strong prohibition. "You must not do...".</p>
        <ul><li>ここで泳いではいけません。(Koko de oyoide wa ikemasen.) - You must not swim here.</li></ul>
        `,
  },
  N4: {
    'Unit 1: Verb Forms & Conjugations': `
        <h1>Guide to Verb Forms (N4)</h1>
        <p>This unit introduces more complex verb forms, such as the volitional, passive, and causative.</p>
        <h2>Volitional Form (～よう)</h2>
        <p>This is the "let's" form, used to express intention or make suggestions. For example, <strong>行こう (ikou)</strong> means "Let's go."</p>
        <h2>Passive Form (～れる/られる)</h2>
        <p>Used when the subject receives an action. For example, <strong>食べられた (taberareta)</strong> means "was eaten."</p>
        <h2>Causative Form (～せる/させる)</h2>
        <p>Used to mean "to make/let someone do" something. For example, <strong>待たせる (mataseru)</strong> means "to make someone wait."</p>
        `,
    'Unit 2: Adjectives & Descriptions': `
        <h1>Guide to Descriptions (N4)</h1>
        <p>Learn how to add more detail and nuance to your descriptions.</p>
        <h2>～やすい / ～にくい (yasui / nikui)</h2>
        <p>Attach to a verb stem to say something is "easy to do" or "hard to do." Example: <strong>このペンは書きやすい (kono pen wa kakiyasui)</strong> - "This pen is easy to write with."</p>
        <h2>～そうだ (sou da) - Appears to be</h2>
        <p>Used to make a guess based on appearance. Example: <strong>雨が降りそうです (ame ga furisou desu)</strong> - "It looks like it's going to rain."</p>
        <h2>～らしい (rashii) - Seems that</h2>
        <p>Reports information you've heard. Example: <strong>彼は結婚するらしい (kare wa kekkon suru rashii)</strong> - "I hear he's getting married."</p>
        `,
    'Unit 3: Requests & Advice': `
        <h1>Guide to Requests & Advice (N4)</h1>
        <p>Learn more natural ways to ask for things and give advice.</p>
        <h2>Giving & Receiving Actions</h2>
        <p>Use <strong>～てあげる / ～てくれる / ～てもらう</strong> for giving/receiving actions. The choice depends on who is doing the action and for whom.</p>
        <h2>～たほうがいい (ta hou ga ii) - You'd better</h2>
        <p>Strong advice. Example: <strong>薬を飲んだほうがいい (kusuri o nonda hou ga ii)</strong> - "You'd better take the medicine."</p>
        <h2>～なさい (nasai) - Command</h2>
        <p>A soft command used by superiors. Example: <strong>早く寝なさい (hayaku nenasai)</strong> - "Go to sleep."</p>
        `,
    'Unit 4: Expressions of Intention / Possibility': `
        <h1>Guide to Intentions & Possibility (N4)</h1>
        <p>This unit focuses on expressing what you plan to do or what might happen.</p>
        <h2>～ようと思う (you to omou)</h2>
        <p>Expresses a less-firm intention than ～つもり. "I think I will...". Example: <strong>週末、映画を見に行こうと思います (shuumatsu, eiga o mi ni ikou to omoimasu)</strong> - "I think I'll go see a movie this weekend."</p>
        <h2>～かもしれない (kamoshirenai)</h2>
        <p>Expresses possibility, "might" or "maybe". Example: <strong>明日は雨が降るかもしれない (ashita wa ame ga furu kamoshirenai)</strong> - "It might rain tomorrow."</p>
        `,
    'Unit 5: Sequence, Time & Frequency': `
        <h1>Guide to Sequence & Time (N4)</h1>
        <p>Learn to describe sequences of events more accurately.</p>
        <h2>～たばかり (ta bakari) - Just finished</h2>
        <p>Indicates an action was recently completed. Example: <strong>食べたばかりです (tabeta bakari desu)</strong> - "I just ate."</p>
        <h2>～間 / ～間に (aida / aida ni)</h2>
        <p><strong>間 (aida)</strong> means something happened for the whole duration, while <strong>間に (aida ni)</strong> means something happened at one point during the duration.</p>
        <h2>～ところ (tokoro)</h2>
        <p>Indicates a point in time relative to an action (about to do, doing, just finished). Example: <strong>今から出かけるところです (ima kara dekakeru tokoro desu)</strong> - "I'm just about to leave."</p>
        `,
    'Unit 6: Comparisons & Descriptions': `
        <h1>Guide to Comparisons & Descriptions (N4)</h1>
        <p>This unit enhances your ability to compare things and describe situations.</p>
        <h2>～より～のほうが (yori... no hou ga)</h2>
        <p>The standard comparison structure. "B is more ... than A." Example: <strong>車より電車の方が速い (kuruma yori densha no hou ga hayai)</strong> - "Trains are faster than cars."</p>
        <h2>～のに (noni) - Although</h2>
        <p>Shows a result contrary to expectation, often with frustration. Example: <strong>勉強したのに、不合格だった (benkyou shita noni, fugoukaku datta)</strong> - "Even though I studied, I failed."</p>
        `,
  },
  N3: {
    'Unit 1: Verb Forms & Auxiliary': `
        <h1>Guide to Advanced Verb Forms (N3)</h1>
        <h2>Causative-Passive (～させられる)</h2>
        <p>Expresses being forced to do something. Example: <strong>母に部屋を掃除させられた (haha ni heya o souji saserareta)</strong> - "I was forced by my mother to clean the room."</p>
        <h2>～てある (te aru)</h2>
        <p>Indicates a state resulting from a purposeful action. Example: <strong>窓が開けてあります (mado ga akete arimasu)</strong> - "The window has been opened (and left that way)."</p>
        <h2>～ていく / ～てくる</h2>
        <p>Shows direction of change over time. <strong>～ていく</strong> (future), <strong>～てくる</strong> (past to present).</p>
        `,
    'Unit 2: Modality & Probability': `
        <h1>Guide to Modality & Probability (N3)</h1>
        <h2>～はず (hazu) - Expectation</h2>
        <p>Expresses strong expectation based on evidence. "Is supposed to be..." Example: <strong>彼は今日来るはずです (kare wa kyou kuru hazu desu)</strong> - "He is supposed to come today."</p>
        <h2>～に違いない (ni chigainai) - Certainty</h2>
        <p>Expresses strong conviction. "Must be..." Example: <strong>あの人は犯人に違いない (ano hito wa hannin ni chigainai)</strong> - "That person must be the culprit."</p>
        `,
    'Unit 3: Expressions': `
        <h1>Guide to Common Expressions (N3)</h1>
        <h2>～おかげで / ～せいで</h2>
        <p><strong>おかげで (okage de)</strong> for positive reasons ("thanks to"), <strong>せいで (sei de)</strong> for negative reasons ("because of/due to").</p>
        <h2>～かわりに (kawari ni)</h2>
        <p>Means "instead of" or "in return for." Example: <strong>私が料理するかわりに、あなたは掃除をしてください (watashi ga ryouri suru kawari ni, anata wa souji o shite kudasai)</strong> - "Instead of me cooking, please you do the cleaning."</p>
        `,
  },
  N2: {
    'Unit 1: Action & State': `
        <h1>Guide to Action & State (N2)</h1>
        <h2>～ことなく (koto naku)</h2>
        <p>A formal way to say "without doing." Example: <strong>彼は休むことなく働いた (kare wa yasumu koto naku hataraita)</strong> - "He worked without resting."</p>
        <h2>～ずにはいられない (zu ni wa irarenai)</h2>
        <p>Expresses an uncontrollable urge, "can't help but do." Example: <strong>彼の話を聞いて、笑わずにはいられなかった (kare no hanashi o kiite, warawazu ni wa irarenakatta)</strong> - "Hearing his story, I couldn't help but laugh."</p>
        `,
    'Unit 2: Modality': `
        <h1>Guide to Modality (N2)</h1>
        <h2>～わけだ / ～わけではない</h2>
        <p><strong>わけだ</strong> indicates a logical conclusion ("no wonder"). <strong>わけではない</strong> provides partial negation ("it's not that...").</p>
        <h2>～かねない (kanenai)</h2>
        <p>Indicates a negative possibility. "Might..." Example: <strong>事故を起こしかねない (jiko o okoshi kanenai)</strong> - "(He) might cause an accident."</p>
        `,
    'Unit 3: Time & Condition': `
        <h1>Guide to Time & Condition (N2)</h1>
        <h2>～際に (sai ni)</h2>
        <p>A formal expression for "when" or "on the occasion of." Example: <strong>お帰りの際に、これを提出してください (okaeri no sai ni, kore o teishutsu shite kudasai)</strong> - "Please submit this when you leave."</p>
        <h2>～か～ないかのうちに (ka...nai ka no uchi ni)</h2>
        <p>Expresses "as soon as." Example: <strong>授業が終わるか終わらないかのうちに、彼は教室を飛び出した (jugyou ga owaru ka owaranai ka no uchi ni, kare wa kyoushitsu o tobidashita)</strong> - "As soon as the class ended, he bolted from the classroom."</p>
        `,
    'Unit 4: Comparison & Emphasis': `
        <h1>Guide to Comparison & Emphasis (N2)</h1>
        <h2>～に比べて (ni kurabete) - Compared to</h2>
        <p>Used to make direct comparisons. Example: <strong>去年と比べて、今年は暑い (kyonen to kurabete, kotoshi wa atsui)</strong> - "Compared to last year, it's hot this year."</p>
        <h2>～どころか (dokoro ka) - Far from</h2>
        <p>Used for strong contrast. "Far from X, it's Y." Example: <strong>勉強どころか、遊んでばかりいる (benkyou dokoro ka, asonde bakari iru)</strong> - "Far from studying, he does nothing but play."</p>
        `,
  },
  N1: {
    'Unit 1: Advanced Modality & Reasoning': `
        <h1>Guide to Advanced Reasoning (N1)</h1>
        <h2>～にほかならない (ni hokanaranai)</h2>
        <p>A strong assertion meaning "is nothing other than." Example: <strong>成功は努力の結果にほかならない (seikou wa doryoku no kekka ni hokanaranai)</strong> - "Success is nothing other than the result of effort."</p>
        <h2>～ずにはおかない (zu ni wa okanai)</h2>
        <p>Means something will definitely cause a certain feeling or result. Example: <strong>この映画は見る者を感動させずにはおかない (kono eiga wa miru mono o kandou sasezu ni wa okanai)</strong> - "This movie will surely move all who see it."</p>
        `,
    'Unit 2: Formal & Written Structures': `
        <h1>Guide to Formal Structures (N1)</h1>
        <h2>～べく (beku) - In order to</h2>
        <p>A formal way to state purpose. Example: <strong>真実を確かめるべく、調査を開始した (shinjitsu o tashikameru beku, chousa o kaishi shita)</strong> - "In order to ascertain the truth, we began an investigation."</p>
        <h2>～を禁じ得ない (o kinjienai) - Can't help but feel</h2>
        <p>A literary way to express uncontrollable emotion. Example: <strong>涙を禁じ得ない (namida o kinjienai)</strong> - "I can't hold back the tears."</p>
        `,
    'Unit 3: Expressions of Judgment': `
        <h1>Guide to Expressions of Judgment (N1)</h1>
        <h2>～といえども (to iedomo) - Although</h2>
        <p>A very formal way to say "even though." Example: <strong>専門家といえども、間違うことはある (senmonka to iedomo, machigau koto wa aru)</strong> - "Even experts make mistakes."</p>
        <h2>～たるもの (taru mono) - As someone who is...</h2>
        <p>Emphasizes the duties of a role. Example: <strong>教師たるもの、学生の模範でなければならない (kyoushi taru mono, gakusei no mohan de nakereba naranai)</strong> - "As a teacher, one must be a role model for students."</p>
        `,
  },
};
