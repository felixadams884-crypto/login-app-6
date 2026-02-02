/**
 * Simple Mock API Server for Testing Authentication Flow
 * 
 * To use this server:
 * 1. Install dependencies: npm install express cors
 * 2. Run: node mock-server.js
 * 3. Server will run on http://localhost:3000
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user database
const users = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin1234',
    name: 'Admin User'
  }
];

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log(`[${new Date().toISOString()}] Login attempt:`, email);
  
  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required'
    });
  }
  
  // Find user
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(404).json({
      message: 'User not found. Please sign up.'
    });
  }
  
  // Check password
  if (user.password !== password) {
    return res.status(401).json({
      message: 'Invalid password. Please try again.'
    });
  }
  
  // Success - return token and user data
  const access_token = `mock-jwt-token-${user.id}-${Date.now()}`;
  
  console.log(`[${new Date().toISOString()}] Login successful:`, email);
  
  res.json({
    access_token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║   Mock API Server Running                     ║
╠════════════════════════════════════════════════╣
║   URL: http://localhost:${PORT}                    ║
║   Endpoint: POST /api/auth/login              ║
╠════════════════════════════════════════════════╣
║   Test Credentials:                           ║
║   ┌────────────────────────────────────────┐  ║
║   │ Email: test@example.com                │  ║
║   │ Password: password123                  │  ║
║   ├────────────────────────────────────────┤  ║
║   │ Email: admin@example.com               │  ║
║   │ Password: admin1234                    │  ║
║   └────────────────────────────────────────┘  ║
╚════════════════════════════════════════════════╝
  `);
});
