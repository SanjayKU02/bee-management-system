# 🚀 Auto-Deploy Instructions

## I've Prepared Everything - Just Follow These Steps:

### Step 1: Deploy Backend (2 minutes)

1. **Go to**: https://render.com
2. **Click**: "Get Started for Free" → Sign up with GitHub
3. **Click**: "New" → "Blueprint" (or "Web Service")
4. **If Blueprint**: Connect your GitHub repo `bee-management-system` → Render will auto-detect `render.yaml`
5. **If Web Service**: 
   - Connect repo: `bee-management-system`
   - Name: `bee-management-backend`
   - Root Directory: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `gunicorn app:app`
6. **Click**: "Create" or "Apply"
7. **Wait**: 2-3 minutes for deployment
8. **Copy your backend URL** (looks like: `https://bee-management-backend.onrender.com`)

### Step 2: Update Frontend (1 minute)

1. **Go to**: https://github.com/SanjayKU02/bee-management-system/settings/secrets/actions
2. **Click**: "New repository secret"
3. **Name**: `REACT_APP_API_URL`
4. **Value**: `https://YOUR-BACKEND-URL.onrender.com/api` (replace with your actual URL)
5. **Click**: "Add secret"

### Step 3: Redeploy Frontend (automatic)

The workflow will auto-trigger, OR:
1. Go to **Actions** tab
2. Click **"Deploy to GitHub Pages"**
3. Click **"Re-run all jobs"**
4. Wait 3-5 minutes

### Step 4: Done! ✅

Your app will be live at:
- **Frontend**: https://SanjayKU02.github.io/bee-management-system/
- **Backend**: https://YOUR-BACKEND-URL.onrender.com/api

---

## 🎯 What I've Done:

✅ Created `render.yaml` for easy deployment  
✅ Backend is ready to deploy  
✅ Frontend workflow is configured  
✅ All files are committed  

**You just need to:**
1. Sign up on Render (1 minute)
2. Deploy backend (2 minutes)
3. Add GitHub secret with backend URL (1 minute)
4. Wait for redeploy (3 minutes)

**Total time: ~7 minutes!**
