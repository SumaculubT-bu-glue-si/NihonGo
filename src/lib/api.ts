// API service to replace Firebase operations with SQLite backend
import { User } from "@/contexts/auth-context-sqlite";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Request failed' };
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return { error: 'Network error' };
    }
  }

  // Authentication methods
  async register(userData: {
    email: string;
    display_name: string;
    password: string;
    photo_url?: string;
  }) {
    const response = await this.request<{
      user: User; // Use the updated User type
      token: string;
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.data) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{
      user: User; // Use the updated User type
      token: string;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.data) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async logout() {
    this.clearToken();
    return { message: 'Logged out successfully' };
  }

  async getProfile() {
    return this.request<User>('/auth/profile');
  }

  async updateProfile(updateData: {
    display_name?: string;
    photo_url?: string;
    password?: string;
  }) {
    return this.request<User>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  // User Stats methods
  async getUserStats() {
    return this.request<{ stats: any[] }>('/decks/stats');
  }

  // Deck methods
  async getDecks() {
    return this.request<{ decks: any[] }>('/decks');
  }

  async getDeck(deckId: string) {
    return this.request<{ deck: any }>(`/decks/${deckId}`);
  }

  async createDeck(deckData: {
    title: string;
    description?: string;
    category: 'Vocabulary' | 'Grammar' | 'Phrases' | 'Kanji';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
  }) {
    return this.request<{ deck: any }>('/decks', {
      method: 'POST',
      body: JSON.stringify(deckData),
    });
  }

  async updateDeck(deckId: string, updateData: Partial<{
    title: string;
    description: string;
    category: 'Vocabulary' | 'Grammar' | 'Phrases' | 'Kanji';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
  }>) {
    return this.request<{ deck: any }>(`/decks/${deckId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async deleteDeck(deckId: string) {
    return this.request<{ message: string }>(`/decks/${deckId}`, {
      method: 'DELETE',
    });
  }

  async addFlashcard(deckId: string, cardData: {
    type: 'vocabulary' | 'grammar' | 'kanji';
    front: string;
    back: string;
    reading?: string;
    level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  }) {
    return this.request<{ flashcard: any }>(`/decks/${deckId}/flashcards`, {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  }

  async updateFlashcard(deckId: string, cardId: string, updateData: Partial<{
    type: 'vocabulary' | 'grammar' | 'kanji';
    front: string;
    back: string;
    reading: string;
    level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  }>) {
    return this.request<{ flashcard: any }>(`/decks/${deckId}/flashcards/${cardId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async deleteFlashcard(deckId: string, cardId: string) {
    return this.request<{ message: string }>(`/decks/${deckId}/flashcards/${cardId}`, {
      method: 'DELETE',
    });
  }

  // Admin methods
  async getAllUsers() {
    return this.request<{ users: User[] }>('/auth/users');
  }

  async deleteUser(userId: string) {
    return this.request<{ message: string }>(`/auth/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async sendHeartbeat() {
    return this.request<{ message: string }>('/auth/heartbeat', {
      method: 'POST',
    });
  }

  // ===== CONTENT METHODS =====

  // Grammar Lessons
  async getGrammarLessons() {
    return this.request<{ lessons: any[] }>('/content/grammar-lessons');
  }

  async getGrammarLesson(lessonId: string) {
    return this.request<{ lesson: any }>(`/content/grammar-lessons/${lessonId}`);
  }

  async markGrammarLessonAsRead(lessonId: string) {
    return this.request<{ message: string }>(`/content/grammar-lessons/${lessonId}/read`, {
      method: 'POST',
    });
  }

  // Quizzes
  async getQuizzes() {
    return this.request<{ quizzes: any[] }>('/content/quizzes');
  }

  async getQuiz(quizId: string) {
    return this.request<{ quiz: any }>(`/content/quizzes/${quizId}`);
  }

  async submitQuizScore(quizId: string, score: number) {
    return this.request<{ message: string }>(`/content/quizzes/${quizId}/score`, {
      method: 'POST',
      body: JSON.stringify({ score }),
    });
  }

  // Challenges
  async getChallengeProgress() {
    return this.request<{ progress: any }>('/content/challenges/progress');
  }

  async updateChallengeProgress(level: string, unitId: string, stageId: string, status: 'completed' | 'active' | 'locked') {
    return this.request<{ message: string }>('/content/challenges/progress', {
      method: 'POST',
      body: JSON.stringify({ level, unitId, stageId, status }),
    });
  }

  async getChallengeItems(level: string, unitId: string, stageId: string) {
    return this.request<{ items: any[] }>(`/content/challenges/${level}/${unitId}/${stageId}`);
  }

  // Admin Content Methods
  async getUserProgress(userId: string) {
    return this.request<{
      grammarProgress: any[];
      quizScores: any[];
      challengeProgress: any[];
      gameStats: any;
    }>(`/content/admin/user-progress/${userId}`);
  }

  async getAllUsersProgress() {
    return this.request<{ users: any[] }>('/content/admin/users-progress');
  }

  // Deck Flashcard Progress
  async getDeckProgress(deckId: string) {
    return this.request<{ progress: { card_id: string; status: string }[] }>(`/decks/${deckId}/progress`);
  }

  async updateDeckProgress(deckId: string, cardId: string, status: string) {
    return this.request<{ message: string }>(`/decks/${deckId}/progress`, {
      method: 'POST',
      body: JSON.stringify({ cardId, status }),
    });
  }

  async resetDeckProgress(deckId: string) {
    return this.request<{ message: string }>(`/decks/${deckId}/progress/reset`, {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();
