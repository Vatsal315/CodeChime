# 🚀 CodeCast Backend Deployment Guide

This guide will help you deploy the CodeCast backend server to Render.com (free hosting).

## 📋 Prerequisites

- [GitHub](https://github.com) account
- [Render](https://render.com) account (free)
- CodeCast backend code ready

## 🌐 Deploy to Render.com

### **Step 1: Push Code to GitHub**

1. **Initialize Git (if not already done)**
```bash
cd /Users/vatsalchheta/Downloads/CodeCast-main
git init
git add .
git commit -m "Initial commit with backend deployment config"
```

2. **Create GitHub Repository**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name: `codecast`
   - Make it public
   - Don't initialize with README (we already have one)

3. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/codecast.git
git branch -M main
git push -u origin main
```

### **Step 2: Deploy on Render**

1. **Sign up at [render.com](https://render.com)**
   - Use your GitHub account for easy integration

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `codecast` repository

3. **Configure Service**
   - **Name:** `codecast-backend`
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Environment Variables**
   - Click "Environment" tab
   - Add these variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000`
     - `JDoodle_clientId`: Your JDoodle client ID
     - `JDoodle_clientSecret`: Your JDoodle client secret

5. **Deploy!**
   - Click "Create Web Service"
   - Render will build and deploy your backend
   - Wait for deployment to complete (usually 2-3 minutes)

### **Step 3: Get Your Backend URL**

After successful deployment, you'll get a URL like:
```
https://codecast-backend.onrender.com
```

## 🔗 Connect Frontend to Backend

### **Update Vercel Environment Variables**

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Select your CodeCast project

2. **Add Environment Variable**
   - Go to Settings → Environment Variables
   - Add: `REACT_APP_BACKEND_URL`
   - Value: `https://codecast-backend.onrender.com`
   - Environment: Production

3. **Redeploy Frontend**
   - Vercel will automatically redeploy with the new backend URL

## 🧪 Test the Connection

1. **Visit your Vercel frontend**
2. **Create or join a room**
3. **Try running code**
4. **Check browser console for connection status**

## 🔍 Troubleshooting

### **Common Issues**

#### **Socket Connection Failed**
- Verify backend URL is correct in Vercel
- Check if backend is running on Render
- Ensure CORS is properly configured

#### **Code Compilation Not Working**
- Verify JDoodle API credentials in Render
- Check backend logs in Render dashboard
- Test backend endpoint directly

#### **Render Deployment Fails**
- Check build logs in Render dashboard
- Verify package.json has correct start script
- Ensure all dependencies are in package.json

### **Check Backend Status**

1. **Visit your backend URL directly**
2. **Check Render dashboard for logs**
3. **Test the `/compile` endpoint**

## 📊 Monitor Your Backend

### **Render Dashboard Features**
- **Logs** - View real-time server logs
- **Metrics** - Monitor performance and usage
- **Environment** - Manage environment variables
- **Deployments** - View deployment history

### **Health Checks**
- Render automatically monitors your service
- Automatic restarts if service goes down
- Email notifications for issues

## 🎉 Success!

Once deployed, your CodeCast application will have:
- ✅ **Frontend:** Live on Vercel
- ✅ **Backend:** Live on Render
- ✅ **Real-time collaboration:** Working
- ✅ **Code compilation:** Functional
- ✅ **Socket connections:** Stable

## 🔄 Updates

To update your backend:
1. Make changes locally
2. Push to GitHub: `git push origin main`
3. Render automatically redeploys

---

**Need Help?** Check the main README.md or open an issue on GitHub!
