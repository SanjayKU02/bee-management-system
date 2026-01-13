# Quick GitHub Setup Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `bee-management-system` (or your choice)
3. **Important**: Do NOT check "Initialize with README"
4. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, run these commands in PowerShell:

```powershell
cd "C:\Users\sanja\Desktop\Bee Management System"

# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/bee-management-system.git

git branch -M main

git push -u origin main
```

## Step 3: Get Your Repository URL

After pushing, your repository will be available at:
```
https://github.com/YOUR_USERNAME/bee-management-system
```

## Next Steps: Deploy to Hosting

See `DEPLOYMENT.md` for detailed hosting instructions on:
- Vercel (Frontend)
- Render (Backend + Frontend)
- Railway (Full Stack)
- Netlify (Frontend)

## Quick Deploy Commands

If you already have a GitHub repository URL, just run:

```powershell
cd "C:\Users\sanja\Desktop\Bee Management System"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```
