# Firebase to SQLite Migration Guide

This guide will help you migrate your NihonGo Japanese learning app from Firebase (Firestore) to SQLite with a Node.js/Express backend.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the SQLite Backend Server

```bash
npm run server:dev
```

The server will start on `http://localhost:3001` and automatically create the SQLite database with all necessary tables.

### 3. Start the Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:9002` and connect to the SQLite backend.

## 📊 Database Schema

The SQLite database includes the following tables:

- **users** - User accounts and authentication
- **decks** - Flashcard decks
- **flashcards** - Individual flashcards
- **user_stats** - Learning progress tracking
- **grammar_lessons** - Grammar lesson content
- **quizzes** - Quiz content
- **quiz_questions** - Individual quiz questions
- **quiz_scores** - User quiz scores
- **challenge_progress** - Challenge game progress
- **user_game_stats** - Game statistics (hearts, diamonds, etc.)
- **grammar_check_history** - Grammar checker history

## 🔄 Migration Steps

### Step 1: Export Firebase Data

Before switching to SQLite, export your existing Firebase data:

1. Go to Firebase Console
2. Navigate to Firestore Database
3. Export your collections as JSON files

### Step 2: Import Data to SQLite

Use the provided migration scripts to import your Firebase data:

```bash
# Run the migration script
npm run migrate:firebase-to-sqlite
```

### Step 3: Update Frontend Code

The frontend has been updated to use the new API service instead of Firebase:

#### Before (Firebase):

```typescript
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";

// Create user
await setDoc(doc(db, "users", userId), userData);

// Get user
const userDoc = await getDoc(doc(db, "users", userId));
```

#### After (SQLite API):

```typescript
import { apiService } from "@/lib/api";

// Create user
const response = await apiService.register(userData);

// Get user
const response = await apiService.getProfile();
```

## 🔐 Authentication Changes

### Firebase Auth → JWT Authentication

The app now uses JWT tokens instead of Firebase Authentication:

#### Registration:

```typescript
// Before
const userCredential = await createUserWithEmailAndPassword(
  auth,
  email,
  password
);

// After
const response = await apiService.register({
  email,
  display_name,
  password,
  photo_url,
});
```

#### Login:

```typescript
// Before
await signInWithEmailAndPassword(auth, email, password);

// After
const response = await apiService.login({ email, password });
```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `GET /api/auth/stats` - Get user stats

### Decks

- `GET /api/decks` - Get all user decks
- `GET /api/decks/:deckId` - Get specific deck with flashcards
- `POST /api/decks` - Create new deck
- `PUT /api/decks/:deckId` - Update deck
- `DELETE /api/decks/:deckId` - Delete deck

### Flashcards

- `POST /api/decks/:deckId/cards` - Add flashcard to deck
- `PUT /api/decks/:deckId/cards/:cardId` - Update flashcard
- `DELETE /api/decks/:deckId/cards/:cardId` - Delete flashcard

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
FRONTEND_URL=http://localhost:9002

# Database
DB_PATH=./nihongo.db
```

### Frontend Configuration

Update your `next.config.ts` to include the API URL:

```typescript
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  },
  // ... other config
};
```

## 🛠️ Development

### Database Management

The SQLite database file (`nihongo.db`) will be created automatically when you start the server. You can use tools like:

- **DB Browser for SQLite** - GUI tool for database management
- **SQLite CLI** - Command-line interface

### API Testing

Test the API endpoints using tools like:

- **Postman** - API testing tool
- **curl** - Command-line HTTP client
- **Thunder Client** - VS Code extension

Example curl commands:

```bash
# Register user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","display_name":"Test User","password":"password123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get decks (with auth token)
curl -X GET http://localhost:3001/api/decks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔒 Security Considerations

1. **JWT Secret**: Change the default JWT secret in production
2. **HTTPS**: Use HTTPS in production
3. **CORS**: Configure CORS properly for your domain
4. **Rate Limiting**: Consider adding rate limiting middleware
5. **Input Validation**: All inputs are validated on the server

## 📈 Performance

### SQLite Advantages

- **No Network Latency**: Local database access
- **ACID Compliance**: Full transaction support
- **Small Footprint**: Lightweight database
- **No Setup Required**: No separate database server needed

### Optimization Tips

1. **Indexes**: The schema includes proper indexes for common queries
2. **Connection Pooling**: SQLite handles connections efficiently
3. **Batch Operations**: Use transactions for multiple operations

## 🐛 Troubleshooting

### Common Issues

1. **Database Locked**: Ensure only one process accesses the database
2. **CORS Errors**: Check your CORS configuration
3. **JWT Token Expired**: Tokens expire after 7 days by default
4. **Port Conflicts**: Change the port if 3001 is already in use

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
DEBUG=* npm run server:dev
```

## 📝 Migration Checklist

- [ ] Install new dependencies
- [ ] Start SQLite backend server
- [ ] Export Firebase data
- [ ] Import data to SQLite (if needed)
- [ ] Update frontend environment variables
- [ ] Test authentication flow
- [ ] Test deck and flashcard operations
- [ ] Verify admin functionality
- [ ] Test on different browsers
- [ ] Deploy to production

## 🚀 Production Deployment

### Backend Deployment

1. **Environment Variables**: Set production environment variables
2. **Database**: Ensure the SQLite file is writable
3. **Process Manager**: Use PM2 or similar for process management
4. **Reverse Proxy**: Use Nginx or Apache as reverse proxy

### Frontend Deployment

1. **Build**: Run `npm run build`
2. **Environment**: Set `NEXT_PUBLIC_API_URL` to your production API URL
3. **Deploy**: Deploy to Vercel, Netlify, or your preferred platform

## 📞 Support

If you encounter issues during migration:

1. Check the console logs for error messages
2. Verify your environment variables
3. Ensure the SQLite database file is writable
4. Test the API endpoints directly
5. Check the network tab for failed requests

## 🔄 Rollback Plan

If you need to rollback to Firebase:

1. Keep your Firebase configuration
2. Update the auth context to use Firebase again
3. Update data operations to use Firestore
4. Test thoroughly before switching back

---

**Note**: This migration maintains all existing functionality while providing better performance and local data control. The SQLite backend is production-ready and includes proper security measures.
