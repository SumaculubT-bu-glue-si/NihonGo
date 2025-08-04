-- Users table
CREATE TABLE users (
    id TEXT,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    photo_url TEXT,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'learner',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_active_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT pk_users PRIMARY KEY (id),
    CONSTRAINT chk_users_role CHECK (role IN ('learner', 'admin'))
);

-- Decks table
CREATE TABLE decks (
    id TEXT,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    level TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT pk_decks PRIMARY KEY (id),
    CONSTRAINT chk_decks_category CHECK (category IN ('Vocabulary', 'Grammar', 'Phrases', 'Kanji')),
    CONSTRAINT chk_decks_level CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    CONSTRAINT fk_decks_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Flashcards table
CREATE TABLE flashcards (
    id TEXT,
    deck_id TEXT NOT NULL,
    type TEXT NOT NULL,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    reading TEXT,
    level TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT pk_flashcards PRIMARY KEY (id),
    CONSTRAINT chk_flashcards_type CHECK (type IN ('vocabulary', 'grammar', 'kanji')),
    CONSTRAINT chk_flashcards_level CHECK (level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
    CONSTRAINT fk_flashcards_decks FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
);

-- User Stats table
CREATE TABLE user_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    topic TEXT NOT NULL,
    progress INTEGER DEFAULT 0,
    total INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT fk_user_stats_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uc_user_stats UNIQUE (user_id, topic)
);

-- ===== SYSTEM-LEVEL CONTENT TABLES =====

-- System Grammar Lessons table (shared content for all users)
CREATE TABLE grammar_lessons (
    id TEXT,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    explanation TEXT NOT NULL,
    examples TEXT NOT NULL, -- JSON array of strings
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT pk_grammar_lessons PRIMARY KEY (id),
    CONSTRAINT chk_grammar_lessons_level CHECK (level IN ('N5', 'N4', 'N3', 'N2', 'N1'))
);

-- User Grammar Lesson Progress table
CREATE TABLE user_grammar_lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT fk_user_grammar_lessons_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_grammar_lessons_lessons FOREIGN KEY (lesson_id) REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    CONSTRAINT uc_user_lesson UNIQUE (user_id, lesson_id)
);

-- System Quizzes table (shared content for all users)
CREATE TABLE quizzes (
    id TEXT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT pk_quizzes PRIMARY KEY (id),
    CONSTRAINT chk_quizzes_category CHECK (category IN ('vocabulary', 'grammar')),
    CONSTRAINT chk_quizzes_level CHECK (level IN ('N5', 'N4', 'N3', 'N2', 'N1'))
);

-- System Quiz Questions table
CREATE TABLE quiz_questions (
    id TEXT,
    quiz_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    options TEXT NOT NULL, -- JSON array of strings
    correct_answer TEXT NOT NULL,
    audio_data_uri TEXT,
    explanation TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT pk_quiz_questions PRIMARY KEY (id),
    CONSTRAINT fk_quiz_questions_quizzes FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- User Quiz Scores table
CREATE TABLE user_quiz_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    quiz_id TEXT NOT NULL,
    highest_score INTEGER NOT NULL,
    attempts INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT fk_user_quiz_scores_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_quiz_scores_quizzes FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    CONSTRAINT uc_user_quiz UNIQUE (user_id, quiz_id),
    CONSTRAINT chk_user_quiz_scores_score CHECK (highest_score >= 0 AND highest_score <= 100)
);

-- System Challenge Items table
CREATE TABLE challenge_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level TEXT NOT NULL,
    unit_id TEXT NOT NULL,
    stage_id TEXT NOT NULL,
    item_order INTEGER NOT NULL,
    grammar_point TEXT NOT NULL,
    english_sentence TEXT NOT NULL,
    correct_japanese TEXT NOT NULL,
    word_bank TEXT NOT NULL, -- JSON array of strings
    hint TEXT,
    distractors TEXT NOT NULL, -- JSON array of strings
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT chk_challenge_items_level CHECK (level IN ('N5', 'N4', 'N3', 'N2', 'N1'))
);

-- Challenge Progress table
CREATE TABLE challenge_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    level TEXT NOT NULL,
    unit_id TEXT NOT NULL,
    stage_id TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT fk_challenge_progress_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uc_challenge_progress UNIQUE (user_id, level, unit_id, stage_id),
    CONSTRAINT chk_challenge_progress_status CHECK (status IN ('completed', 'active', 'locked')),
    CONSTRAINT chk_challenge_progress_level CHECK (level IN ('N5', 'N4', 'N3', 'N2', 'N1'))
);

-- User Game Stats table
CREATE TABLE user_game_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL UNIQUE,
    hearts INTEGER DEFAULT 5,
    diamonds INTEGER DEFAULT 0,
    current_challenge_level TEXT DEFAULT 'N5',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT fk_user_game_stats_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_user_game_stats_level CHECK (current_challenge_level IN ('N5', 'N4', 'N3', 'N2', 'N1'))
);

-- Grammar Check History table
CREATE TABLE grammar_check_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    original_text TEXT NOT NULL,
    corrected_text TEXT NOT NULL,
    corrections TEXT NOT NULL, -- JSON array of correction objects
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    CONSTRAINT fk_grammar_check_history_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User Flashcard Progress table
CREATE TABLE user_flashcard_progress (
    user_id TEXT NOT NULL,
    deck_id TEXT NOT NULL,
    card_id TEXT NOT NULL,
    status TEXT NOT NULL, -- e.g., 'mastered', 'learning', etc.
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Constraints
    PRIMARY KEY (user_id, deck_id, card_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE,
    FOREIGN KEY (card_id) REFERENCES flashcards(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_decks_user_id ON decks(user_id);
CREATE INDEX idx_flashcards_deck_id ON flashcards(deck_id);
CREATE INDEX idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX idx_grammar_lessons_level ON grammar_lessons(level);
CREATE INDEX idx_user_grammar_lessons_user_id ON user_grammar_lessons(user_id);
CREATE INDEX idx_user_grammar_lessons_lesson_id ON user_grammar_lessons(lesson_id);
CREATE INDEX idx_quizzes_level ON quizzes(level);
CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX idx_user_quiz_scores_user_id ON user_quiz_scores(user_id);
CREATE INDEX idx_user_quiz_scores_quiz_id ON user_quiz_scores(quiz_id);
CREATE INDEX idx_challenge_items_level_unit_stage ON challenge_items(level, unit_id, stage_id);
CREATE INDEX idx_challenge_progress_user_id ON challenge_progress(user_id);
CREATE INDEX idx_grammar_check_history_user_id ON grammar_check_history(user_id);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_users_updated_at 
    AFTER UPDATE ON users
    BEGIN
        UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_decks_updated_at 
    AFTER UPDATE ON decks
    BEGIN
        UPDATE decks SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_flashcards_updated_at 
    AFTER UPDATE ON flashcards
    BEGIN
        UPDATE flashcards SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_user_stats_updated_at 
    AFTER UPDATE ON user_stats
    BEGIN
        UPDATE user_stats SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_grammar_lessons_updated_at 
    AFTER UPDATE ON grammar_lessons
    BEGIN
        UPDATE grammar_lessons SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_user_grammar_lessons_updated_at 
    AFTER UPDATE ON user_grammar_lessons
    BEGIN
        UPDATE user_grammar_lessons SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_quizzes_updated_at 
    AFTER UPDATE ON quizzes
    BEGIN
        UPDATE quizzes SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_quiz_questions_updated_at 
    AFTER UPDATE ON quiz_questions
    BEGIN
        UPDATE quiz_questions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_user_quiz_scores_updated_at 
    AFTER UPDATE ON user_quiz_scores
    BEGIN
        UPDATE user_quiz_scores SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_challenge_progress_updated_at 
    AFTER UPDATE ON challenge_progress
    BEGIN
        UPDATE challenge_progress SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_user_game_stats_updated_at 
    AFTER UPDATE ON user_game_stats
    BEGIN
        UPDATE user_game_stats SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;