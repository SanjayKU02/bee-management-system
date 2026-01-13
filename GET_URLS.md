# How to Get Your Project URLs

## 🔗 Step 1: Get Your GitHub Repository URL

### Option A: Create New Repository (Recommended)

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `bee-management-system`
3. **Important**: Leave all checkboxes UNCHECKED (no README, no .gitignore, no license)
4. **Click**: "Create repository"
5. **Copy the URL** shown on the next page (it will look like):
   ```
   https://github.com/YOUR_USERNAME/bee-management-system.git
   ```

### Option B: Use Existing Repository

If you already have a GitHub repository, just copy its URL from the repository page.

### Then Push Your Code:

```powershell
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/bee-management-system.git
git branch -M main
git push -u origin main
```

**Your GitHub URL will be**: `https://github.com/YOUR_USERNAME/bee-management-system`

---

## 🌐 Step 2: Get Your Live Application URL (Deploy)

After pushing to GitHub, deploy to get a live URL. Here are the easiest options:

### Option 1: Vercel (Easiest - Frontend Only)

1. Go to: https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
6. Add Environment Variable:
   - Key: `REACT_APP_API_URL`
   - Value: `http://localhost:5000/api` (or your backend URL)
7. Click "Deploy"

**Your Live URL will be**: `https://your-project-name.vercel.app`

### Option 2: Render (Full Stack - Backend + Frontend)

#### Deploy Backend:
1. Go to: https://render.com
2. Sign up/Login with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Settings:
   - **Name**: `bee-management-backend`
   - **Environment**: Python 3
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && gunicorn app:app`
   - **Root Directory**: `backend`
6. Add PostgreSQL database (free tier available)
7. Click "Create Web Service"

**Backend URL**: `https://bee-management-backend.onrender.com`

#### Deploy Frontend:
1. In Render, click "New" → "Static Site"
2. Connect your repository
3. Settings:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
4. Add Environment Variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://bee-management-backend.onrender.com/api`
5. Click "Create Static Site"

**Frontend URL**: `https://your-frontend-name.onrender.com`

### Option 3: Railway (Full Stack - Easiest)

1. Go to: https://railway.app
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add PostgreSQL database (Railway auto-configures)
6. Railway will auto-detect and deploy both services

**Your URLs will be shown in the Railway dashboard**

---

## 📋 Quick Summary

| Type | Where to Get It |
|------|----------------|
| **GitHub URL** | After creating repo at github.com/new |
| **Live App URL** | After deploying to Vercel/Render/Railway |
| **Backend API URL** | After deploying backend service |
| **Frontend URL** | After deploying frontend service |

---

## 🚀 Quick Deploy Commands

If you want to deploy right now, here's the fastest way:

### For Vercel (Frontend):
```bash
cd frontend
npm install -g vercel
vercel
```

### For Railway (Full Stack):
1. Install Railway CLI: `npm i -g @railway/cli`
2. Run: `railway login` then `railway init`
3. Deploy: `railway up`

---

## ❓ Need Help?

- **GitHub URL**: Check your repository page on github.com
- **Deployed URL**: Check your hosting platform's dashboard
- **API URL**: Usually `https://your-backend-name.onrender.com/api` or similar
