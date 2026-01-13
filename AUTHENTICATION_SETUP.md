# 🔐 GitHub Authentication Setup

## The Problem
GitHub no longer accepts passwords. You need a **Personal Access Token**.

## ✅ Solution: Create Personal Access Token

### Step 1: Create Token on GitHub

1. **Go to**: https://github.com/settings/tokens
2. **Click**: "Generate new token" → "Generate new token (classic)"
3. **Name it**: `bee-management-system` (or any name)
4. **Select scopes**: Check **"repo"** (this gives full repository access)
5. **Click**: "Generate token" (bottom of page)
6. **IMPORTANT**: Copy the token immediately! It looks like: `ghp_xxxxxxxxxxxxxxxxxxxx`
   - You won't see it again!

### Step 2: Push Using Token

When you run `git push`, it will ask for:
- **Username**: `SanjayKU02`
- **Password**: Paste your **token** (not your GitHub password!)

---

## 🚀 Alternative: Use GitHub Desktop (Easier!)

If you prefer a GUI:

1. **Download**: https://desktop.github.com
2. **Install and sign in** with your GitHub account
3. **Add existing repository**: Point to `C:\Users\sanja\Desktop\Bee Management System`
4. **Click "Publish repository"**

This handles authentication automatically!

---

## 🔑 Quick Push Command (After Creating Token)

Once you have your token, run:

```powershell
git push -u origin main
```

When prompted:
- **Username**: `SanjayKU02`
- **Password**: Paste your **token** (starts with `ghp_`)

---

## 📝 Your Repository URLs

After successful push:

- **GitHub Repository**: https://github.com/SanjayKU02/bee-management-system
- **Live Site** (after enabling Pages): https://SanjayKU02.github.io/bee-management-system/
