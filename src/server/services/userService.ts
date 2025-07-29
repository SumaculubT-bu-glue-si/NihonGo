import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { database } from '../database/connection';
import { User, CreateUserRequest, LoginRequest, UpdateUserRequest } from '../types';
import { generateToken } from '../middleware/auth';

export class UserService {
  async createUser(userData: CreateUserRequest): Promise<{ user: User; token: string }> {
    const { email, display_name, password, photo_url } = userData;

    // Check if user already exists
    const existingUser = await database.get(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Check if this is the first user (make them admin)
    const userCount = await database.get('SELECT COUNT(*) as count FROM users');
    const role = userCount.count === 0 ? 'admin' : 'learner';

    const userId = uuidv4();
    const user: User = {
      id: userId,
      email,
      display_name,
      photo_url: photo_url || null,
      password_hash: passwordHash,
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await database.run(
      'INSERT INTO users (id, email, display_name, photo_url, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)',
      [user.id, user.email, user.display_name, user.photo_url, user.password_hash, user.role]
    );

    // Initialize user game stats
    await database.run(
      'INSERT INTO user_game_stats (user_id, hearts, diamonds, current_challenge_level) VALUES (?, ?, ?, ?)',
      [user.id, 5, 0, 'N5']
    );

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  async loginUser(loginData: LoginRequest): Promise<{ user: User; token: string }> {
    const { email, password } = loginData;

    const user = await database.get(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await database.get(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    return user || null;
  }

  async updateUser(userId: string, updateData: UpdateUserRequest): Promise<User> {
    const { display_name, photo_url, password } = updateData;

    let passwordHash: string | undefined;
    if (password) {
      const saltRounds = 12;
      passwordHash = await bcrypt.hash(password, saltRounds);
    }

    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (display_name !== undefined) {
      updateFields.push('display_name = ?');
      updateValues.push(display_name);
    }

    if (photo_url !== undefined) {
      updateFields.push('photo_url = ?');
      updateValues.push(photo_url);
    }

    if (passwordHash) {
      updateFields.push('password_hash = ?');
      updateValues.push(passwordHash);
    }

    if (updateFields.length === 0) {
      throw new Error('No fields to update');
    }

    updateValues.push(userId);

    await database.run(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    const updatedUser = await this.getUserById(userId);
    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    return await database.all('SELECT * FROM users ORDER BY created_at DESC');
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await database.run(
      'DELETE FROM users WHERE id = ?',
      [userId]
    );

    if (result.changes === 0) {
      throw new Error('User not found');
    }
  }

  async getUserStats(userId: string): Promise<any> {
    const stats = await database.all(
      'SELECT * FROM user_stats WHERE user_id = ?',
      [userId]
    );

    return stats;
  }

  async updateUserStats(userId: string, topic: string, progress: number, total: number): Promise<void> {
    await database.run(
      `INSERT OR REPLACE INTO user_stats (user_id, topic, progress, total) 
       VALUES (?, ?, ?, ?)`,
      [userId, topic, progress, total]
    );
  }
} 