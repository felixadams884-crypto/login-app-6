# Two-Step Authentication Flow

A modern, secure two-step authentication implementation using React, TypeScript, and React Hook Form with Zod validation.

## 🚀 Features

- ✅ **Two-step authentication flow** (Email → Password)
- ✅ **Form validation** with React Hook Form + Zod
- ✅ **Real-time validation feedback**
- ✅ **Protected routes** with authentication guards
- ✅ **Token management** with Auth Context
- ✅ **API integration** with Axios
- ✅ **Loading states** and error handling
- ✅ **Show/hide password** toggle
- ✅ **Responsive design** with modern UI
- ✅ **TypeScript** for type safety

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running at `http://localhost:3000/api` (or configure your own)

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your API URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 🎯 User Flow

### Step 1: Email Entry (`/auth/email`)
- User enters their email address
- Real-time validation for email format
- Continue button is disabled until email is valid
- On success → navigates to `/auth/password?email=user@example.com`

### Step 2: Password Entry (`/auth/password`)
- Displays the email (read-only)
- User enters password (minimum 8 characters)
- Show/hide password toggle
- Submit button with loading state
- API error handling with user-friendly messages

### Step 3: Dashboard (`/dashboard`)
- Protected route (requires authentication)
- Displays user information
- Logout functionality

## 🏗️ Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── EmailStep.tsx         # Email entry component
│   │   ├── PasswordStep.tsx      # Password entry component
│   │   └── AuthSteps.css         # Shared auth styles
│   └── ProtectedRoute.tsx        # Route guard component
├── context/
│   └── AuthContext.tsx           # Authentication context
├── pages/
│   ├── Dashboard.tsx             # Dashboard page
│   └── Dashboard.css             # Dashboard styles
├── schemas/
│   └── auth.schema.ts            # Zod validation schemas
├── services/
│   └── api.service.ts            # API client and auth service
├── App.tsx                       # Main app with routing
└── main.tsx                      # App entry point
```

## 🔐 API Integration

### Expected API Endpoint

**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials
- `404 Not Found`: User not found
- `500 Internal Server Error`: Server error

### Mock API for Testing

If you don't have a backend yet, you can use a mock API. Create a simple Express server:

```javascript
// mock-server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock validation
  if (email === 'test@example.com' && password === 'password123') {
    res.json({
      access_token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        email: email,
        name: 'Test User'
      }
    });
  } else {
    res.status(401).json({
      message: 'Invalid email or password'
    });
  }
});

app.listen(3000, () => {
  console.log('Mock API server running on http://localhost:3000');
});
```

Run it with: `node mock-server.js`

## ✅ Validation Rules

### Email Validation
- ✅ Required field
- ✅ Must be valid email format
- ✅ Real-time validation

### Password Validation
- ✅ Required field
- ✅ Minimum 8 characters
- ✅ Real-time validation

## 🎨 Styling

The app uses custom CSS with:
- Modern gradient backgrounds
- Smooth transitions and animations
- Responsive design for mobile and desktop
- Accessible color contrast
- Form validation states (error/success)

## 🔒 Security Features

1. **Token Storage**: Access tokens stored in localStorage (consider httpOnly cookies for production)
2. **Protected Routes**: Dashboard requires authentication
3. **Auto-redirect**: Unauthenticated users redirected to login
4. **Password Hiding**: Password field obscured by default
5. **HTTPS Ready**: Use HTTPS in production

## 🚦 Testing

### Manual Testing Checklist

**Email Step:**
- [ ] Empty email shows error
- [ ] Invalid email format shows error
- [ ] Valid email enables Continue button
- [ ] Clicking Continue navigates to password step

**Password Step:**
- [ ] Email is displayed correctly from URL params
- [ ] Empty password shows error
- [ ] Password < 8 characters shows error
- [ ] Show/hide password toggle works
- [ ] Wrong credentials show API error
- [ ] Correct credentials redirect to dashboard
- [ ] Loading state displays during API call

**Dashboard:**
- [ ] Requires authentication
- [ ] Displays user email
- [ ] Logout button works
- [ ] After logout, redirects to email step

### Test Credentials

If using the mock server above:
- **Email**: `test@example.com`
- **Password**: `password123`

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Change API Base URL

Edit `.env`:
```env
VITE_API_BASE_URL=https://your-api.com/api
```

### Customize Validation

Edit `src/schemas/auth.schema.ts`:
```typescript
export const passwordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(12, 'Password must be at least 12 characters'), // Change minimum
});
```

## 🚀 Production Deployment

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting service:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting

3. **Configure environment variables** in your hosting platform

4. **Set up proper CORS** on your backend API

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### API connection refused
- Check that your backend is running
- Verify `VITE_API_BASE_URL` in `.env`
- Check CORS configuration on backend

### TypeScript errors
```bash
npm run build
```
This will show all TypeScript errors that need to be fixed.

## 📚 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Router 7** - Routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **Vite** - Build tool

## 🎯 Next Steps / Enhancements

- [ ] Add "Remember Me" functionality
- [ ] Implement "Forgot Password" flow
- [ ] Add social login (Google, GitHub, etc.)
- [ ] Add password strength indicator
- [ ] Implement refresh token rotation
- [ ] Add loading skeleton screens
- [ ] Add analytics tracking
- [ ] Add rate limiting on client side
- [ ] Implement session timeout
- [ ] Add 2FA/MFA support

## 📄 License

MIT

## 👨‍💻 Author

Created with ❤️ using GitHub Copilot
