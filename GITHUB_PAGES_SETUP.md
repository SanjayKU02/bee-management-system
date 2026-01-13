# 🚀 Complete GitHub Pages Setup Guide

## Step-by-Step Instructions

### Step 1: Create GitHub Repository

1. **Go to**: https://github.com/new
2. **Repository name**: `bee-management-system`
3. **Visibility**: Public (required for free GitHub Pages)
4. **Important**: Do NOT check any boxes (no README, no .gitignore, no license)
5. **Click**: "Create repository"

### Step 2: Push Your Code to GitHub

After creating the repository, run these commands in PowerShell:

```powershell
# Navigate to your project
cd "C:\Users\sanja\Desktop\Bee Management System"

# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/bee-management-system.git

git branch -M main

git push -u origin main
```

**Your GitHub Repository URL will be**: 
```
https://github.com/YOUR_USERNAME/bee-management-system
```

### Step 3: Enable GitHub Pages

1. **Go to your repository** on GitHub: `https://github.com/YOUR_USERNAME/bee-management-system`
2. **Click**: "Settings" (top menu)
3. **Scroll down** to "Pages" (left sidebar)
4. **Under "Source"**, select: **"GitHub Actions"**
5. **Save** (the workflow will automatically deploy)

### Step 4: Wait for Deployment

1. **Go to**: "Actions" tab in your repository
2. **Wait** for the "Deploy to GitHub Pages" workflow to complete (2-3 minutes)
3. **Once green** (✓), your site is live!

### Step 5: Get Your Live URL

After deployment completes, your site will be available at:

```
https://YOUR_USERNAME.github.io/bee-management-system/
```

**OR** you can find it in:
- Repository → Settings → Pages → "Your site is live at..."

---

## 🔧 Backend API Setup (Optional)

Since GitHub Pages only hosts static files, your backend needs to be hosted separately. Options:

### Option 1: Render (Free Backend Hosting)

1. Go to: https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your `bee-management-system` repository
5. Settings:
   - **Name**: `bee-management-backend`
   - **Root Directory**: `backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
6. Add PostgreSQL database (free tier)
7. Copy the backend URL (e.g., `https://bee-management-backend.onrender.com`)

### Option 2: Update Frontend to Use Backend

After getting your backend URL, update the GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `REACT_APP_API_URL`
4. Value: `https://your-backend-url.onrender.com/api`
5. Click "Add secret"
6. The workflow will automatically rebuild with the new API URL

---

## 📋 Quick Command Reference

```powershell
# 1. Navigate to project
cd "C:\Users\sanja\Desktop\Bee Management System"

# 2. Check status
git status

# 3. Add all files (if needed)
git add .

# 4. Commit (if needed)
git commit -m "Setup GitHub Pages deployment"

# 5. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/bee-management-system.git

# 6. Push to GitHub
git push -u origin main

# 7. Check remote
git remote -v
```

---

## ✅ Verification Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled (Settings → Pages → Source: GitHub Actions)
- [ ] Workflow completed successfully (Actions tab)
- [ ] Site accessible at `https://YOUR_USERNAME.github.io/bee-management-system/`

---

## 🆘 Troubleshooting

### Workflow Fails
- Check the "Actions" tab for error messages
- Ensure all files are committed and pushed
- Verify Node.js version in workflow (should be 18+)

### Site Not Loading
- Wait 2-3 minutes after workflow completes
- Clear browser cache
- Check repository Settings → Pages for the URL

### API Not Working
- Backend must be hosted separately (Render, Railway, etc.)
- Update `REACT_APP_API_URL` secret in repository settings
- Re-run the workflow after updating the secret

---

## 🎉 Final URLs

After completing all steps:

- **GitHub Repository**: `https://github.com/YOUR_USERNAME/bee-management-system`
- **Live Site**: `https://YOUR_USERNAME.github.io/bee-management-system/`
- **Backend API** (if deployed): `https://your-backend.onrender.com/api`

---

**Need help?** Check the Actions tab in your repository for deployment status!
