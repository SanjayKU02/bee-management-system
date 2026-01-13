# Deployment Guide

## GitHub Setup

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right, then "New repository"
3. Name it `bee-management-system` (or your preferred name)
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### 2. Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
cd "C:\Users\sanja\Desktop\Bee Management System"
git remote add origin https://github.com/YOUR_USERNAME/bee-management-system.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Hosting Options

### Option 1: Vercel (Recommended for Frontend)

1. Go to [Vercel](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Set the root directory to `frontend`
5. Add environment variable:
   - `REACT_APP_API_URL` = Your backend API URL
6. Deploy!

### Option 2: Netlify (Frontend)

1. Go to [Netlify](https://netlify.com) and sign up/login
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub and select your repository
4. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
5. Add environment variable:
   - `REACT_APP_API_URL` = Your backend API URL
6. Deploy!

### Option 3: Render (Backend + Frontend)

1. Go to [Render](https://render.com) and sign up/login

#### Backend Setup:
1. Click "New" > "Web Service"
2. Connect your GitHub repository
3. Settings:
   - Name: `bee-management-backend`
   - Environment: `Python 3`
   - Build Command: `cd backend && pip install -r requirements.txt`
   - Start Command: `cd backend && gunicorn app:app`
   - Root Directory: `backend`
4. Add environment variable:
   - `DATABASE_URL` = (Render provides PostgreSQL automatically)
5. Deploy!

#### Frontend Setup:
1. Click "New" > "Static Site"
2. Connect your GitHub repository
3. Settings:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`
4. Add environment variable:
   - `REACT_APP_API_URL` = Your backend URL from step above
5. Deploy!

### Option 4: Railway (Full Stack)

1. Go to [Railway](https://railway.app) and sign up/login
2. Click "New Project" > "Deploy from GitHub repo"
3. Select your repository

#### Backend:
1. Add a new service
2. Select your repo
3. Root Directory: `backend`
4. Start Command: `gunicorn app:app`
5. Add PostgreSQL database (Railway will auto-set `DATABASE_URL`)

#### Frontend:
1. Add another service
2. Select your repo
3. Root Directory: `frontend`
4. Build Command: `npm install && npm run build`
5. Start Command: `npx serve -s build`
6. Add environment variable:
   - `REACT_APP_API_URL` = Your backend service URL

## Quick Deploy Script

After pushing to GitHub, you can use these commands:

```bash
# Set your GitHub username and repo name
GITHUB_USER="your-username"
REPO_NAME="bee-management-system"

# Add remote and push
git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git
git branch -M main
git push -u origin main
```

## Environment Variables

### Backend (.env or hosting platform):
```
DATABASE_URL=sqlite:///bee_management.db  # or PostgreSQL URL for production
FLASK_ENV=production
```

### Frontend (.env or hosting platform):
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Testing Locally

1. **Backend**: 
   ```bash
   cd backend
   python app.py
   ```
   Runs on http://localhost:5000

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Runs on http://localhost:3000

## Troubleshooting

- **CORS errors**: Make sure Flask-CORS is installed and configured
- **API not found**: Check that `REACT_APP_API_URL` is set correctly
- **Database errors**: Ensure database migrations are run (SQLite creates automatically)
- **Build fails**: Check Node.js and Python versions match requirements
