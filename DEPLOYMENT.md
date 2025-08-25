# 🚀 CodeCast Deployment Guide

This guide will walk you through deploying CodeCast to Vercel for the frontend and alternative platforms for the backend.

## 📋 Prerequisites

- [GitHub](https://github.com) account
- [Vercel](https://vercel.com) account
- [Node.js](https://nodejs.org) 18+ installed locally
- CodeCast project ready for deployment

## 🌐 Frontend Deployment (Vercel)

### **Method 1: Vercel CLI (Recommended)**

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Navigate to Client Directory**
```bash
cd client
```

4. **Deploy to Vercel**
```bash
vercel
```

5. **Follow the Prompts:**
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N` (create new)
   - Project name: `codecast` (or your preferred name)
   - Directory: `./` (current directory)
   - Override settings: `N`

6. **Configure Build Settings:**
   - Build Command: `NODE_OPTIONS="--openssl-legacy-provider" npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

7. **Deploy!**
   - Vercel will build and deploy your app
   - You'll get a production URL like: `https://codecast-xyz.vercel.app`

### **Method 2: Vercel Dashboard**

1. **Push Code to GitHub**
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `client` folder

3. **Configure Build Settings:**
   - Framework Preset: `Create React App`
   - Build Command: `NODE_OPTIONS="--openssl-legacy-provider" npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Environment Variables:**
   - Add `REACT_APP_BACKEND_URL` with your backend URL

5. **Deploy!**

## 🔧 Backend Deployment Options

### **Option 1: Render (Free)**

1. **Sign up at [render.com](https://render.com)**
2. **Create New Web Service**
3. **Connect GitHub repository**
4. **Configure:**
   - Name: `codecast-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `server`

5. **Environment Variables:**
   - `PORT`: `10000`
   - `JDoodle_clientId`: Your JDoodle client ID
   - `JDoodle_clientSecret`: Your JDoodle client secret

6. **Deploy and get URL:**
   - `https://codecast-backend.onrender.com`

### **Option 2: Railway**

1. **Sign up at [railway.app](https://railway.app)**
2. **Create New Project**
3. **Deploy from GitHub**
4. **Select server directory**
5. **Add environment variables**
6. **Deploy and get URL**

### **Option 3: Heroku**

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login and Create App**
```bash
heroku login
heroku create codecast-backend
```

3. **Deploy**
```bash
cd server
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a codecast-backend
git push heroku main
```

4. **Set Environment Variables**
```bash
heroku config:set JDoodle_clientId=your_client_id
heroku config:set JDoodle_clientSecret=your_client_secret
```

## 🔗 Connect Frontend to Backend

1. **Update Vercel Environment Variables:**
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add `REACT_APP_BACKEND_URL` with your backend URL

2. **Redeploy Frontend:**
   - Vercel will automatically redeploy with new environment variables

## 🌍 Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Example:**
   - `codecast.yourdomain.com`
   - `app.yourdomain.com`

## 📱 Testing Deployment

1. **Test Frontend:**
   - Visit your Vercel URL
   - Create a room
   - Test basic functionality

2. **Test Backend Connection:**
   - Try to run code
   - Check browser console for errors
   - Verify Socket.IO connection

## 🔍 Troubleshooting

### **Build Failures**
```bash
# Local build test
cd client
NODE_OPTIONS="--openssl-legacy-provider" npm run build
```

### **Environment Variables**
- Ensure all required variables are set
- Check variable names (case-sensitive)
- Redeploy after adding variables

### **CORS Issues**
- Verify backend URL is correct
- Check backend CORS configuration
- Ensure HTTPS for production

### **Socket.IO Issues**
- Check backend deployment status
- Verify WebSocket support on hosting platform
- Test local connection first

## 📊 Monitoring & Analytics

1. **Vercel Analytics:**
   - Built-in performance monitoring
   - Real-time user analytics
   - Error tracking

2. **Custom Monitoring:**
   - Add Sentry for error tracking
   - Google Analytics for user behavior
   - Uptime monitoring services

## 🚀 Production Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed and accessible
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)
- [ ] SSL certificates active
- [ ] Performance optimized
- [ ] Error monitoring active
- [ ] Analytics configured
- [ ] Documentation updated
- [ ] Team access configured

## 🎉 Success!

Your CodeCast application is now live and accessible to users worldwide! 

**Next Steps:**
1. Share your live URL with users
2. Monitor performance and errors
3. Gather user feedback
4. Plan future improvements
5. Consider scaling options

---

**Need Help?** Check the main README.md or open an issue on GitHub!
