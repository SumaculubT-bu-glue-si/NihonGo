-- SQLite Database Schema for NihonGo Learning App
-- Language: SQLite

-- Users table (replaces Firebase Auth + Firestore users collection)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    photo_url TEXT,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'learner' CHECK (role IN ('learner', 'admin')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_active_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Decks table
CREATE TABLE IF NOT EXISTS decks (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('Vocabulary', 'Grammar', 'Phrases', 'Kanji')),
    level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Flashcards table
CREATE TABLE IF NOT EXISTS flashcards (
    id TEXT PRIMARY KEY,
    deck_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('vocabulary', 'grammar', 'kanji')),
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    reading TEXT,
    level TEXT NOT NULL CHECK (level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
);

-- User Stats table
CREATE TABLE IF NOT EXISTS user_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    topic TEXT NOT NULL,
    progress INTEGER DEFAULT 0,
    total INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, topic)
);

-- ===== SYSTEM-LEVEL CONTENT TABLES =====

-- System Grammar Lessons table (shared content for all users)
CREATE TABLE IF NOT EXISTS grammar_lessons (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
    explanation TEXT NOT NULL,
    examples TEXT NOT NULL, -- JSON array of strings
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User Grammar Lesson Progress table
CREATE TABLE IF NOT EXISTS user_grammar_lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES grammar_lessons(id) ON DELETE CASCADE,
    UNIQUE(user_id, lesson_id)
);

-- System Quizzes table (shared content for all users)
CREATE TABLE IF NOT EXISTS quizzes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('vocabulary', 'grammar')),
    level TEXT NOT NULL CHECK (level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- System Quiz Questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id TEXT PRIMARY KEY,
    quiz_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    options TEXT NOT NULL, -- JSON array of strings
    correct_answer TEXT NOT NULL,
    audio_data_uri TEXT,
    explanation TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- User Quiz Scores table
CREATE TABLE IF NOT EXISTS user_quiz_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    quiz_id TEXT NOT NULL,
    highest_score INTEGER NOT NULL CHECK (highest_score >= 0 AND highest_score <= 100),
    attempts INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE,
    UNIQUE(user_id, quiz_id)
);

-- System Challenge Items table
CREATE TABLE IF NOT EXISTS challenge_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    level TEXT NOT NULL CHECK (level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
    unit_id TEXT NOT NULL,
    stage_id TEXT NOT NULL,
    item_order INTEGER NOT NULL,
    grammar_point TEXT NOT NULL,
    english_sentence TEXT NOT NULL,
    correct_japanese TEXT NOT NULL,
    word_bank TEXT NOT NULL, -- JSON array of strings
    hint TEXT,
    distractors TEXT NOT NULL, -- JSON array of strings
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Challenge Progress table
CREATE TABLE IF NOT EXISTS challenge_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
    unit_id TEXT NOT NULL,
    stage_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('completed', 'active', 'locked')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, level, unit_id, stage_id)
);

-- User Game Stats table
CREATE TABLE IF NOT EXISTS user_game_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL UNIQUE,
    hearts INTEGER DEFAULT 5,
    diamonds INTEGER DEFAULT 0,
    current_challenge_level TEXT DEFAULT 'N5' CHECK (current_challenge_level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Grammar Check History table
CREATE TABLE IF NOT EXISTS grammar_check_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    original_text TEXT NOT NULL,
    corrected_text TEXT NOT NULL,
    corrections TEXT NOT NULL, -- JSON array of correction objects
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User Flashcard Progress table
CREATE TABLE IF NOT EXISTS user_flashcard_progress (
    user_id TEXT NOT NULL,
    deck_id TEXT NOT NULL,
    card_id TEXT NOT NULL,
    status TEXT NOT NULL, -- e.g., 'mastered', 'learning', etc.
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, deck_id, card_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE,
    FOREIGN KEY (card_id) REFERENCES flashcards(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_decks_user_id ON decks(user_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_deck_id ON flashcards(deck_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_grammar_lessons_level ON grammar_lessons(level);
CREATE INDEX IF NOT EXISTS idx_user_grammar_lessons_user_id ON user_grammar_lessons(user_id);
CREATE INDEX IF NOT EXISTS idx_user_grammar_lessons_lesson_id ON user_grammar_lessons(lesson_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_level ON quizzes(level);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_scores_user_id ON user_quiz_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_scores_quiz_id ON user_quiz_scores(quiz_id);
CREATE INDEX IF NOT EXISTS idx_challenge_items_level_unit_stage ON challenge_items(level, unit_id, stage_id);
CREATE INDEX IF NOT EXISTS idx_challenge_progress_user_id ON challenge_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_grammar_check_history_user_id ON grammar_check_history(user_id);

-- Create triggers for updated_at timestamps
CREATE TRIGGER IF NOT EXISTS update_users_updated_at 
    AFTER UPDATE ON users
    BEGIN
        UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_decks_updated_at 
    AFTER UPDATE ON decks
    BEGIN
        UPDATE decks SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_flashcards_updated_at 
    AFTER UPDATE ON flashcards
    BEGIN
        UPDATE flashcards SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_user_stats_updated_at 
    AFTER UPDATE ON user_stats
    BEGIN
        UPDATE user_stats SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_grammar_lessons_updated_at 
    AFTER UPDATE ON grammar_lessons
    BEGIN
        UPDATE grammar_lessons SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_user_grammar_lessons_updated_at 
    AFTER UPDATE ON user_grammar_lessons
    BEGIN
        UPDATE user_grammar_lessons SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_quizzes_updated_at 
    AFTER UPDATE ON quizzes
    BEGIN
        UPDATE quizzes SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_quiz_questions_updated_at 
    AFTER UPDATE ON quiz_questions
    BEGIN
        UPDATE quiz_questions SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_user_quiz_scores_updated_at 
    AFTER UPDATE ON user_quiz_scores
    BEGIN
        UPDATE user_quiz_scores SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_challenge_progress_updated_at 
    AFTER UPDATE ON challenge_progress
    BEGIN
        UPDATE challenge_progress SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER IF NOT EXISTS update_user_game_stats_updated_at 
    AFTER UPDATE ON user_game_stats
    BEGIN
        UPDATE user_game_stats SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;