# Vercel Deployment Guide

## Architecture for Vercel

```
┌─────────────────────┐
│   Frontend (Next.js) │  ← Deployed to Vercel
│   http://app.com    │
└──────────┬──────────┘
           │ API Calls
           ▼
┌─────────────────────┐
│  Backend (Express)  │  ← Deployed separately
│  https://api.xxx    │     (Render, Railway, AWS, etc)
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│  SQLite Database    │
│  data/honeypot.db   │
└─────────────────────┘
```

## Deployment Steps

### Step 1: Deploy Frontend to Vercel

```bash
cd frontend
vercel deploy --prod
```

Set in Vercel Dashboard → Environment Variables:
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api.render.com
```

### Step 2: Deploy Backend Separately

**Option A: Render.com (Recommended)**
```bash
cd backend/backend
# Follow Render deployment guide
# Set environment variables on Render dashboard
```

**Option B: Railway.app**
```bash
cd backend/backend
# Follow Railway deployment guide
```

**Option C: Keep on Render (Already Deployed)**
- Backend already running at: `https://podstream-backend-i75r.onrender.com`
- Update frontend `NEXT_PUBLIC_BACKEND_URL` to point to your backend

## Environment Variables

### Frontend (.env on Vercel)
```
NEXT_PUBLIC_BACKEND_URL=https://your-production-backend.render.com
```

### Backend (.env on your hosting)
```
PORT=3001
HOST=0.0.0.0
ADMIN_KEY=your_secure_key
DB_FILE=data/honeypot.sqlite
```

## Flow

1. User submits login on frontend (vercel.app)
2. Frontend sends POST to `${NEXT_PUBLIC_BACKEND_URL}/api/capture`
3. Backend receives request at Render/Railway/AWS
4. Data stored in SQLite database
5. Success overlay shown to user

## CORS Configuration

Backend already has CORS enabled:
```javascript
app.use(cors({ origin: true }));
```

This allows requests from any origin (Vercel frontend).

## Testing Locally

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev
# http://localhost:3000

# Terminal 2 - Backend
cd backend/backend
npm run dev
# http://localhost:3001
```

Frontend will use `NEXT_PUBLIC_BACKEND_URL=http://localhost:3001` from `.env.local`

## Production Checklist

- [ ] Backend deployed and running
- [ ] Backend URL copied
- [ ] Frontend `NEXT_PUBLIC_BACKEND_URL` set on Vercel
- [ ] CORS working (test with curl)
- [ ] Database initialized on backend
- [ ] Admin key secured
- [ ] SSL/HTTPS enabled
