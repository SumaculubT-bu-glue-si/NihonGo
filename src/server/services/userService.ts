import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { database } from '../database/connection';
import { User, CreateUserRequest, LoginRequest, UpdateUserRequest } from '../types';
import { generateToken } from '../middleware/auth';

const ONLINE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

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
      last_active_at: new Date().toISOString(), // Initialize last_active_at
    };

    await database.run(
      'INSERT INTO users (id, email, display_name, photo_url, password_hash, role, last_active_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user.id, user.email, user.display_name, user.photo_url, user.password_hash, user.role, user.last_active_at]
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

    // Update last_active_at on successful login
    await database.run(
      'UPDATE users SET last_active_at = ? WHERE id = ?',
      [new Date().toISOString(), user.id]
    );

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Fetch the updated user object to return
    const updatedUser = await this.getUserById(user.id);

    return { user: updatedUser!, token }; // Use updatedUser
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await database.get(
      // Include last_active_at in the select query
      'SELECT id, email, display_name, photo_url, role, created_at, updated_at, last_active_at FROM users WHERE id = ?',
      [userId]
    );

    // Add isOnline property
    if (user) {
      const lastActiveTime = user.last_active_at ? new Date(user.last_active_at).getTime() : 0;
      const isOnline = (Date.now() - lastActiveTime) <= ONLINE_THRESHOLD_MS;
      return { ...user, isOnline } as User;
    }

    return null;
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

    // Update updated_at timestamp
    updateFields.push('updated_at = ?');
    updateValues.push(new Date().toISOString());


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
    // Modify the SELECT query to include last_active_at
    const users = await database.all('SELECT id, email, display_name, photo_url, role, created_at, updated_at, last_active_at FROM users ORDER BY created_at DESC');

    // Add isOnline property to each user
    const usersWithOnlineStatus = users.map(user => {
      const lastActiveTime = user.last_active_at ? new Date(user.last_active_at).getTime() : 0;
      const isOnline = (Date.now() - lastActiveTime) <= ONLINE_THRESHOLD_MS;
      return {
        ...user,
        isOnline,
      };
    });

    return usersWithOnlineStatus as User[];
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

  // New function to update last_active_at (for heartbeat)
  async updateLastActive(userId: string): Promise<void> {
    try {
      await database.run(
        'UPDATE users SET last_active_at = ? WHERE id = ?',
        [new Date().toISOString(), userId]
      );
    } catch (error) {
      console.error('Error updating last_active_at:', error);
      throw error;
    }
  }
}
