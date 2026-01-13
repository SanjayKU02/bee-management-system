# 🚀 Deploy Backend API - Quick Guide

## The Problem
Your frontend is live on GitHub Pages, but it's trying to connect to `localhost:5000` which doesn't exist online. You need to deploy the backend!

## ✅ Solution: Deploy Backend to Render (Free & Easy)

### Step 1: Create Render Account
1. Go to: https://render.com
2. Sign up with GitHub (easiest way)
3. Verify your email

### Step 2: Deploy Backend
1. Click **"New"** → **"Web Service"**
2. Click **"Connect GitHub"** and select your `bee-management-system` repository
3. Fill in the form:
   - **Name**: `bee-management-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
4. Click **"Create Web Service"**

### Step 3: Add Database (Optional but Recommended)
1. In Render dashboard, click **"New"** → **"PostgreSQL"**
2. Name it: `bee-management-db`
3. Click **"Create Database"**
4. Copy the **"Internal Database URL"** (looks like: `postgresql://...`)
5. Go back to your backend service → **"Environment"** tab
6. Add environment variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Paste the database URL
7. **Save Changes** (Render will restart your service)

### Step 4: Get Your Backend URL
1. Wait for deployment to complete (2-3 minutes)
2. Your backend URL will be: `https://bee-management-backend.onrender.com`
3. **Test it**: Visit `https://bee-management-backend.onrender.com/api/stats`
   - Should return JSON data (even if empty)

---

## 🔧 Update Frontend to Use Backend

### Option 1: Update GitHub Secret (Recommended)

1. Go to: https://github.com/SanjayKU02/bee-management-system/settings/secrets/actions
2. Click **"New repository secret"**
3. Name: `REACT_APP_API_URL`
4. Value: `https://bee-management-backend.onrender.com/api`
5. Click **"Add secret"**
6. Go to **Actions** tab → **Re-run** the latest workflow
7. Wait for deployment to complete

### Option 2: Manual Update (If secret doesn't work)

Update the workflow to use the backend URL directly.

---

## ✅ Verify It Works

1. Go to your live site: `https://SanjayKU02.github.io/bee-management-system/`
2. Try creating a hive
3. Should work now! ✅

---

## 🆘 Troubleshooting

### Backend shows "Application Error"
- Check Render logs (click on your service → "Logs")
- Make sure `gunicorn` is in requirements.txt
- Verify start command is correct

### Frontend still can't connect
- Check browser console (F12) for CORS errors
- Verify backend URL is correct
- Make sure backend is running (check Render dashboard)

### CORS Errors
- Backend already has Flask-CORS configured
- If still issues, check Render logs

---

**After deploying backend, your app will be fully functional!** 🎉
