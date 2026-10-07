# PodStream Global - Unified Vercel Deployment

This folder contains the unified setup for deploying both frontend and backend to Vercel.

## Structure

```
upgrade/
├── frontend/          # Next.js frontend (main Vercel deployment)
├── backend/           # Express.js backend (Vercel Functions)
├── package.json       # Root package.json for monorepo
└── vercel.json        # Vercel configuration
```

## Deployment

### Option 1: Separate Deployments (Recommended)
Deploy frontend and backend as separate Vercel projects:

**Frontend:**
```bash
cd frontend
npm install
vercel deploy
```

**Backend:**
```bash
cd backend/backend
npm install
vercel deploy
```

### Option 2: Monorepo (Single Deployment)
Deploy both from this root with:
```bash
npm install
vercel deploy
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```

### Backend (.env)
```
PORT=3001
HOST=0.0.0.0
ADMIN_KEY=your_secure_key
DB_FILE=data/honeypot.sqlite
```

## Notes

- Frontend: Next.js 14 with React 18
- Backend: Express.js with SQLite
- Both are Vercel-ready and optimized for deployment
