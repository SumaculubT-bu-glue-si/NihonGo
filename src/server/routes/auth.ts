import { Router, Request, Response } from 'express';
import { UserService } from '../services/userService';
import { CreateUserRequest, LoginRequest, UpdateUserRequest } from '../types';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const userService = new UserService();

// Heartbeat endpoint to update last_active_at
router.post('/auth/heartbeat', authenticateToken, async (req: Request, res: Response) => {
  try {
    // Check if req.user is defined and has userId
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = req.user.userId; 

    // Use the updateLastActive function from UserService
    await userService.updateLastActive(userId);

    res.status(200).json({ message: 'Heartbeat received' });
  } catch (error) {
    console.error('Error updating last_active_at:', error);
    res.status(500).json({ error: 'Failed to update last active timestamp' });
  }
});

// Register new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const userData: CreateUserRequest = req.body;
    
    // Validate required fields
    if (!userData.email || !userData.display_name || !userData.password) {
      return res.status(400).json({ 
        error: 'Email, display name, and password are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password strength
    if (userData.password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters long' 
      });
    }

    const result = await userService.createUser(userData);
    
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: result.user.id,
        email: result.user.email,
        display_name: result.user.display_name,
        photo_url: result.user.photo_url,
        role: result.user.role,
      },
      token: result.token,
    });
  } catch (error: any) {
    if (error.message === 'User with this email already exists') {
      return res.status(409).json({ error: error.message });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const loginData: LoginRequest = req.body;
    
    // Validate required fields
    if (!loginData.email || !loginData.password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    const result = await userService.loginUser(loginData);
    
    res.json({
      message: 'Login successful',
      user: {
        id: result.user.id,
        email: result.user.email,
        display_name: result.user.display_name,
        photo_url: result.user.photo_url,
        role: result.user.role,
      },
      token: result.token,
    });
  } catch (error: any) {
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({ error: error.message });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const user = await userService.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        photo_url: user.photo_url,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const updateData: UpdateUserRequest = req.body;
    
    const updatedUser = await userService.updateUser(userId, updateData);
    
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        display_name: updatedUser.display_name,
        photo_url: updatedUser.photo_url,
        role: updatedUser.role,
      },
    });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'No fields to update') {
      return res.status(400).json({ error: error.message });
    }
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user stats
router.get('/stats', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const stats = await userService.getUserStats(userId);
    
    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: Get all users
router.get('/users', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const users = await userService.getAllUsers();
    
    res.json({
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        display_name: user.display_name,
        photo_url: user.photo_url,
        role: user.role,
        created_at: user.created_at,
      })),
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin: Delete user
router.delete('/users/:userId', authenticateToken, async (req: Request, res: Response) => {
  try {
    if (req.user!.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { userId } = req.params;
    
    if (userId === req.user!.userId) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    await userService.deleteUser(userId);
    
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 