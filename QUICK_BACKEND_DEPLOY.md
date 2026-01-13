# ⚡ Quick Backend Deployment (5 Minutes)

## 🎯 The Issue
Your frontend works but can't save data because the backend API isn't deployed.

## ✅ Quick Fix: Deploy to Render

### Step 1: Go to Render
**Link**: https://render.com

### Step 2: Sign Up/Login
- Click "Get Started for Free"
- Sign up with GitHub (easiest)

### Step 3: Deploy Backend
1. Click **"New"** → **"Web Service"**
2. Click **"Connect GitHub"** → Select `bee-management-system`
3. Fill in:
   ```
   Name: bee-management-backend
   Region: (choose closest)
   Branch: main
   Root Directory: backend
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn app:app
   ```
4. Click **"Create Web Service"**

### Step 4: Wait & Get URL
- Wait 2-3 minutes for deployment
- Your backend URL: `https://bee-management-backend.onrender.com`
- Test: Visit `https://bee-management-backend.onrender.com/api/stats`

### Step 5: Update Frontend
1. Go to: https://github.com/SanjayKU02/bee-management-system/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `REACT_APP_API_URL`
4. Value: `https://bee-management-backend.onrender.com/api`
5. Click **"Add secret"**

### Step 6: Redeploy Frontend
1. Go to **Actions** tab
2. Click **"Deploy to GitHub Pages"** workflow
3. Click **"Re-run all jobs"**
4. Wait 3-5 minutes

### Step 7: Test!
Visit: https://SanjayKU02.github.io/bee-management-system/
- Try creating a hive
- Should work now! ✅

---

## 🎉 That's It!

Your backend will be at: `https://bee-management-backend.onrender.com`  
Your frontend will use it automatically after redeploy!

---

## 💡 Tip: Free Tier Limits
- Render free tier: Service sleeps after 15 min inactivity
- First request after sleep: Takes 30-60 seconds to wake up
- This is normal for free hosting!
