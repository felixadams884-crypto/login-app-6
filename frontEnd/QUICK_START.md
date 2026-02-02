# 🚀 Quick Start Guide

## Step 1: Start the Mock API Server (Optional for Testing)

In one terminal:

```bash
# Install express and cors if not already installed
npm install express cors

# Start the mock server
node mock-server.js
```

You should see:
```
Mock API Server Running
URL: http://localhost:3000
```

## Step 2: Start the React App

In another terminal:

```bash
# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`

## Step 3: Test the Authentication Flow

### Test Credentials:
- **Email**: `test@example.com`
- **Password**: `password123`

OR

- **Email**: `admin@example.com`
- **Password**: `admin1234`

### Testing Steps:

1. **Email Step** (`/auth/email`)
   - Try submitting empty email → See validation error
   - Try invalid email format → See validation error
   - Enter `test@example.com` → Continue button enables
   - Click Continue → Navigate to password step

2. **Password Step** (`/auth/password`)
   - See email displayed at top
   - Try empty password → See validation error
   - Try short password (< 8 chars) → See validation error
   - Enter `password123` → Submit button enables
   - Click Continue → See loading state
   - Successful login → Redirect to dashboard

3. **Dashboard** (`/dashboard`)
   - See welcome message with email
   - Click Logout → Return to email step
   - Try accessing `/dashboard` directly when logged out → Auto-redirect to `/auth/email`

## 🎯 What to Observe

✅ Real-time validation on both forms  
✅ Disabled buttons when form is invalid  
✅ Loading states during API calls  
✅ Error messages for wrong credentials  
✅ Successful navigation after valid login  
✅ Protected routes require authentication  
✅ Show/hide password toggle works  

## 📝 Configuration

If you want to use a real backend API:

1. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Update the API URL:
   ```env
   VITE_API_BASE_URL=https://your-api.com/api
   ```

3. Restart the dev server:
   ```bash
   npm run dev
   ```

## 🐛 Troubleshooting

**Port 3000 already in use:**
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependencies issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Can't connect to API:**
- Check if mock-server.js is running
- Check console for CORS errors
- Verify `.env` file exists and has correct URL

## 📱 Mobile Testing

The UI is responsive! Test on mobile by:
1. Get your local IP: `ifconfig | grep inet`
2. Access from mobile: `http://YOUR_IP:5173`
3. Make sure mock server uses `0.0.0.0` instead of `localhost` if needed

---

**Need help?** Check [AUTH_FLOW_README.md](./AUTH_FLOW_README.md) for complete documentation.
