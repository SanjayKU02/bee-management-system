# 🚀 Deploy to Railway (100% Free, No Credit Card!)

## ✅ Railway is Completely Free - No Payment Required!

### Step 1: Sign Up (1 minute)

1. **Go to**: https://railway.app
2. **Click**: "Start a New Project"
3. **Sign up with GitHub** (one click, no credit card needed!)
4. **Authorize Railway** to access your GitHub

### Step 2: Deploy Backend (2 minutes)

1. **Click**: "New Project"
2. **Select**: "Deploy from GitHub repo"
3. **Choose**: `bee-management-system` repository
4. **Railway will detect** it's a Python project
5. **Click**: "Deploy Now"
6. **Wait**: 2-3 minutes for deployment

### Step 3: Configure Backend

1. **Click on your service** (after deployment)
2. **Go to**: "Settings" tab
3. **Set Root Directory**: `backend`
4. **Set Start Command**: `gunicorn app:app`
5. **Railway will auto-restart**

### Step 4: Get Your Backend URL

1. **Click**: "Settings" → "Networking"
2. **Click**: "Generate Domain"
3. **Copy your URL** (looks like: `https://bee-management-system-production.up.railway.app`)
4. **Add `/api`** to the end for API calls

### Step 5: Update Frontend

1. **Go to**: https://github.com/SanjayKU02/bee-management-system/settings/secrets/actions
2. **Click**: "New repository secret"
3. **Name**: `REACT_APP_API_URL`
4. **Value**: `https://YOUR-RAILWAY-URL.railway.app/api`
5. **Click**: "Add secret"

### Step 6: Redeploy Frontend

1. **Go to**: Actions tab
2. **Re-run** the "Deploy to GitHub Pages" workflow
3. **Wait**: 3-5 minutes

### Step 7: Done! ✅

**Your URLs:**
- **Frontend**: https://SanjayKU02.github.io/bee-management-system/
- **Backend**: https://YOUR-RAILWAY-URL.railway.app/api

---

## 🎉 Railway Benefits:

✅ **100% Free** - No credit card required  
✅ **No sleep** - Always running  
✅ **Easy deployment** - Just connect GitHub  
✅ **Auto-detects** Python projects  

---

**Railway is the easiest and completely free option!**
