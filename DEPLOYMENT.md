# 🚀 Deployment Guide

This guide covers deploying the Blackjack Strategy Dashboard frontend and backend components.

---

## 📋 Deployment Overview

| Component | Platform | URL | Status |
|-----------|----------|-----|--------|
| **Frontend** | Vercel | `https://blackjack-dashboard.vercel.app/` | ✅ Live |
| **Backend** | Render | `https://blackjack-backend-jzt6.onrender.com/` | ✅ Live |
| **Data** | Local | Simulation results | ✅ Complete |

---

## 🎯 Frontend Deployment (Vercel)

### Prerequisites
- GitHub repository with frontend code
- Vercel account (free)

### Steps

1. **Go to [vercel.com](https://vercel.com)** and sign up with GitHub
2. **Click "New Project"**
3. **Import your frontend repository**
4. **Configure build settings:**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. **Click "Deploy"**


---

## 🔌 Backend Deployment (Render)

### Prerequisites
- GitHub repository with backend code
- Render account (free)

### Steps

1. **Go to [render.com](https://render.com)** and sign up with GitHub
2. **Click "New +" → "Web Service"**
3. **Connect your backend repository**
4. **Configure the service:**
   - **Name**: `blackjack-api` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free
5. **Click "Create Web Service"**
6. **Wait for deployment** (5-10 minutes)

### Environment Variables (Optional)
- `PORT`: Automatically set by Render
- `FLASK_ENV`: `production`

---

## 🔗 Connect Frontend to Backend

### 1. Get Backend URL
After Render deployment, copy your backend URL:
```
https://your-app-name.onrender.com
```

### 2. Update Frontend Config
Edit `src/config.js`:

```javascript
const API_BASE_URL = isProduction
  ? 'https://your-app-name.onrender.com'  // Replace with your actual URL
  : 'http://localhost:5001';
```

### 3. Redeploy Frontend
- Commit and push changes to GitHub
- Vercel will automatically redeploy

---

## 🧪 Testing Deployment

### Test Backend API
```bash
# Health check
curl https://your-backend-url.onrender.com/

# Get strategies
curl https://your-backend-url.onrender.com/api/strategies

# Get comparison data
curl https://your-backend-url.onrender.com/api/comparison
```

### Test Frontend
1. Visit your Vercel URL
2. Check browser console for errors
3. Verify data loads from backend
4. Test all interactive features

---

## 🔧 Troubleshooting

### Common Issues

#### Backend Issues
- **Build fails**: Check `requirements.txt` and Python version
- **App crashes**: Check logs in Render dashboard
- **CORS errors**: Ensure Flask-CORS is installed
- **Data not found**: Run `python preprocess_data.py` locally first

#### Frontend Issues
- **API connection failed**: Check backend URL in config
- **Build errors**: Check Node.js version and dependencies
- **CORS errors**: Verify backend CORS configuration
- **Charts not rendering**: Check data format and API responses

### Debug Steps

1. **Check logs** in deployment platform dashboards
2. **Test API endpoints** directly with curl/Postman
3. **Verify environment variables** are set correctly
4. **Check browser console** for JavaScript errors
5. **Test locally** before deploying

---

## 📊 Performance Optimization

### Backend (Render)
- **Pre-process data**: Use `preprocess_data.py` for faster responses
- **Enable compression**: Add gzip compression to Flask
- **Cache responses**: Implement response caching for static data

### Frontend (Vercel)
- **Optimize images**: Use WebP format and proper sizing
- **Code splitting**: Automatic with Vite
- **CDN**: Vercel provides global CDN automatically

---

## 🔄 Continuous Deployment

### Automatic Deployment
Both platforms support automatic deployment:
- **Vercel**: Deploys on every push to main branch
- **Render**: Deploys on every push to main branch

### Manual Deployment
- **Vercel**: Use Vercel CLI or dashboard
- **Render**: Use Render dashboard or git push

---

## 💰 Cost Management

### Free Tier Limits
- **Vercel**: 100GB bandwidth, unlimited deployments
- **Render**: 750 hours/month, sleeps after 15 minutes

### Monitoring Usage
- Check usage in platform dashboards
- Monitor for unexpected spikes
- Set up alerts if needed

---


<div align="center">

**🚀 Happy Deploying! 🚀**

*Your Blackjack Strategy Dashboard is ready for the world!*

</div>
