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
        <ul>
            <li>私は学生です。 (Watashi wa gakusei desu.) - As for me, I am a student.</li>
        </ul>

        <h2>が (ga) - The Subject Marker</h2>
        <p>The particle <strong>が (ga)</strong> marks the grammatical subject of a verb, especially when introducing new information or identifying something specific.</p>
        <ul>
            <li>猫が好きです。 (Neko ga suki desu.) - I like cats. (lit. Cats are liked.)</li>
        </ul>

        <h2>を (o) - The Object Marker</h2>
        <p>The particle <strong>を (o)</strong> marks the direct object of a transitive verb. It indicates the thing that the action is being done to.</p>
        <ul>
            <li>パンを食べます。 (Pan o tabemasu.) - I eat bread.</li>
        </ul>

        <h2>の (no) - The Possessive Particle</h2>
        <p>The particle <strong>の (no)</strong> indicates possession, similar to "'s" in English.</p>
        <ul>
            <li>これは私の本です。 (Kore wa watashi no hon desu.) - This is my book.</li>
        </ul>
        `,
  },
};
