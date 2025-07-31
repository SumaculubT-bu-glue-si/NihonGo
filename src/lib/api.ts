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
      user: {
        id: string;
        email: string;
        display_name: string;
        photo_url: string | null;
        role: 'learner' | 'admin';
        is_active?: boolean;
        last_active?: string;
      };
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
      user: {
        id: string;
        email: string;
        display_name: string;
        photo_url: string | null;
        role: 'learner' | 'admin';
        is_active?: boolean;
        last_active?: string;
      };
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

  async getProfile() {
    return this.request<{
      user: {
        last_active: string;
        is_active: boolean;
        id: string;
        email: string;
        display_name: string;
        photo_url: string | null;
        role: 'learner' | 'admin';
      };
    }>('/auth/profile');
  }

  async updateProfile(updateData: {
    display_name?: string;
    photo_url?: string;
    password?: string;
  }) {
    return this.request<{
      user: {
        id: string;
        email: string;
        display_name: string;
        photo_url: string | null;
        role: 'learner' | 'admin';
        is_active?: boolean;
        last_active?: string;
      };
    }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async getUserStats() {
    return this.request<{ stats: any[] }>('/auth/stats');
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
    return this.request(`/decks/${deckId}`, {
      method: 'DELETE',
    });
  }

  // Flashcard methods
  async addFlashcard(deckId: string, cardData: {
    type: 'vocabulary' | 'grammar' | 'kanji';
    front: string;
    back: string;
    reading?: string;
    level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  }) {
    return this.request<{ card: any }>(`/decks/${deckId}/cards`, {
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
    return this.request<{ card: any }>(`/decks/${deckId}/cards/${cardId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async deleteFlashcard(deckId: string, cardId: string) {
    return this.request(`/decks/${deckId}/cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  // Admin methods
  async getAllUsers() {
    return this.request<{ users: User[] }>('/auth/users');
  }

  async deleteUser(userId: string) {
    return this.request(`/auth/users/${userId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();