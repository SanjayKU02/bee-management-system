# ⚡ Quick Start - Copy & Paste Commands

## 🎯 Just Follow These Steps:

### 1️⃣ Create GitHub Repository
- Go to: https://github.com/new
- Name: `bee-management-system`
- Make it **Public**
- **Don't check any boxes**
- Click "Create repository"

### 2️⃣ Copy Your Repository URL
After creating, GitHub will show you a URL like:
```
https://github.com/YOUR_USERNAME/bee-management-system.git
```

### 3️⃣ Run These Commands in PowerShell

```powershell
# Navigate to project
cd "C:\Users\sanja\Desktop\Bee Management System"

# Add remote (REPLACE YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/bee-management-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 4️⃣ Enable GitHub Pages
1. Go to: `https://github.com/YOUR_USERNAME/bee-management-system`
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **"GitHub Actions"**
4. Save

### 5️⃣ Wait for Deployment
1. Click **Actions** tab
2. Wait 2-3 minutes for workflow to complete
3. When you see ✅ (green checkmark), it's done!

### 6️⃣ Get Your URL
Your live site will be at:
```
https://YOUR_USERNAME.github.io/bee-management-system/
```

---

## 🎉 That's It!

Your Bee Management System is now live on GitHub Pages!

**Repository**: `https://github.com/YOUR_USERNAME/bee-management-system`  
**Live Site**: `https://YOUR_USERNAME.github.io/bee-management-system/`

---

## 📝 Note About Backend

GitHub Pages only hosts the frontend. For the backend API:
- Deploy backend to Render.com (free)
- Then update repository secret `REACT_APP_API_URL` with your backend URL
- See `GITHUB_PAGES_SETUP.md` for details
