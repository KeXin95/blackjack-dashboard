# 🎰 Blackjack Strategy Dashboard

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deployed-Vercel-000000.svg)](https://vercel.com)

> **Interactive dashboard for exploring blackjack strategy simulation results**

A modern React-based web application that provides an intuitive interface for analyzing and comparing different blackjack strategies. Built with Vite, Tailwind CSS, and Recharts for beautiful, responsive visualizations.

---

## 🚀 Live Dashboard

**🌐 [View Live Dashboard](https://blackjack-dashboard.vercel.app/)**

The dashboard provides:
- 📊 **Interactive visualizations** of all blackjack strategies
- ⚡ **Real-time comparison** of different betting strategies  
- 📈 **Detailed analysis plots** and statistics
- 🎯 **User-friendly interface** to explore simulation results

---

## 📋 Table of Contents

- [🎯 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🔧 Local Development](#-local-development)
- [🚀 Deployment](#-deployment)
- [🎨 Styling](#-styling)

---

## 🎯 Features

- **Interactive Charts**: Beautiful visualizations using Recharts
- **Strategy Comparison**: Side-by-side comparison of different strategies
- **Responsive Design**: Works perfectly on desktop and mobile
- **Real-time Data**: Fetches live data from the backend API
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Performance Optimized**: Fast loading with Vite build system

---

## 🚀 Quick Start

### Prerequisites

```bash
# Node.js 16+ required
node --version
npm --version
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-frontend-repo-url>
   cd blackjack-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 🔧 Local Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Environment Configuration

The app automatically detects the environment and configures the API URL:

- **Production**: Uses deployed backend URL
- **Development**: Uses `localhost:5001`

### Backend Integration

Make sure your backend API is running:
- **Local**: `http://localhost:5001`
- **Production**: Update `src/config.js` with your deployed backend URL

---

## 🚀 Deployment

### Vercel (Current)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Build Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. **Deploy**: Automatic deployment on git push

### Other Platforms

#### Netlify
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'dist' folder to Netlify
```

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

---

## 🎨 Styling

### Design System

- **Framework**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Colors**: Custom color palette optimized for data visualization

### Responsive Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

### Key Styling Features

- **Dark/Light Mode**: Automatic theme detection
- **Smooth Animations**: CSS transitions and transforms
- **Accessibility**: WCAG compliant color contrasts
- **Mobile Optimized**: Touch-friendly interface

---

## 📁 Project Structure

```
frontend/
├── 📄 README.md                    # This file
├── 📄 package.json                 # Dependencies and scripts
├── 📄 vite.config.js              # Vite configuration
├── 📄 tailwind.config.js          # Tailwind CSS configuration
├── 📄 postcss.config.js           # PostCSS configuration
├── 📄 index.html                  # HTML entry point
├── 📁 src/                        # Source code
    ├── 📄 App.jsx                 # Main app component
    ├── 📄 main.jsx                # React entry point
    ├── 📄 index.css               # Global styles
    ├── 📄 config.js               # API configuration

```

---

## 🔧 Configuration

### API Configuration

Update `src/config.js` to point to your backend:

```javascript
const API_BASE_URL = isProduction
  ? 'https://your-backend-url.onrender.com'  // Your deployed backend
  : 'http://localhost:5001';                 // Local development
```

### Build Configuration

Vite configuration in `vite.config.js`:
- **Base URL**: Configured for Vercel deployment
- **Build Target**: Modern browsers
- **Asset Handling**: Optimized for production

---

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**: Check backend URL in `config.js`
2. **Build Errors**: Ensure all dependencies are installed
3. **CORS Issues**: Verify backend CORS configuration
4. **Chart Not Rendering**: Check data format and Recharts version

### Development Tips

- **Hot Reload**: Changes reflect immediately in development
- **Console Logs**: Check browser console for API responses
- **Network Tab**: Monitor API calls in browser dev tools

---

## 📊 Data Flow

```
Backend API → Frontend Fetch → State Management → Chart Rendering
     ↓              ↓              ↓              ↓
  JSON Data → React Hooks → Component Props → Recharts
```

### State Management

- **React Hooks**: `useState`, `useEffect` for data management
- **API Calls**: Fetch API for backend communication
- **Error Handling**: Try-catch blocks with user feedback

---

## 🎯 Performance

### Optimization Features

- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Images and fonts optimized
- **Lazy Loading**: Components loaded on demand

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
# Check dist/ folder for optimized assets
```

---

## 🤝 Contributing

This project is part of an academic course assignment. For questions or issues, please contact the development team.

---

## 📄 License

This project is part of an academic course assignment. All rights reserved.

---

<div align="center">

**🎰 Blackjack Strategy Dashboard 🎰**

*Built with React, Vite & Deployed on Vercel*

</div>
