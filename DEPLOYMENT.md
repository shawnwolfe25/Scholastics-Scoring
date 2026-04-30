# Deployment Guide

## Option 1: Vercel (Recommended)

### Prerequisites
- GitHub account with your repository pushed
- Vercel account (free at vercel.com)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/scholastic-scorer.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your scholastic-scorer repo
   - Click "Import"
   - Vercel auto-detects React
   - Click "Deploy"
   - Wait 1-2 minutes

3. **Your Live App**
   - URL: `scholastic-scorer.vercel.app`
   - Auto-deploys on every GitHub push
   - Custom domain available in Vercel settings

### Auto-Deployments
Every time you push to GitHub:
```bash
git push origin main
```
Vercel automatically rebuilds and deploys your app (takes 1-2 minutes).

---

## Option 2: Netlify

### Steps

1. **Push to GitHub** (same as Vercel above)

2. **Deploy to Netlify**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Choose "GitHub"
   - Select scholastic-scorer repository
   - Build command: `npm run build`
   - Publish directory: `build`
   - Click "Deploy site"
   - Wait 2-3 minutes

3. **Your Live App**
   - URL: `your-site-name.netlify.app`
   - Auto-deploys on GitHub push

---

## Option 3: GitHub Pages

### Steps

1. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/scholastic-scorer",
     ...
   }
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Update package.json scripts**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build",
       "start": "react-scripts start",
       "build": "react-scripts build"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Your Live App**
   - URL: `https://yourusername.github.io/scholastic-scorer`
   - Takes 1-2 minutes to go live

---

## Option 4: Traditional Hosting (FTP)

### Steps

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Upload build folder**
   - Contents of `build/` folder
   - Upload via FTP to your hosting

3. **Configure server**
   - Set document root to `build` folder
   - Enable gzip compression
   - Set 404 error page to `index.html`

4. **Your Live App**
   - URL: Your domain

---

## Environment Setup

### Production Environment Variables

Create `.env.production.local`:
```
REACT_APP_NAME=Scholastic Scorer
REACT_APP_VERSION=1.0.0
```

### Development Environment Variables

Create `.env.local`:
```
REACT_APP_NAME=Scholastic Scorer (Dev)
REACT_APP_VERSION=1.0.0
```

---

## Post-Deployment

### Verify Everything Works

1. **Test on Desktop**
   - Open app in Chrome
   - Go through full scoring flow
   - Test save/load features
   - Check auto-save (look in DevTools > Application > Local Storage)

2. **Test on Mobile**
   - Open app on phone
   - Test responsive design
   - Verify touch interactions
   - Test landscape and portrait

3. **Check Console**
   - Open DevTools (F12)
   - Go to Console tab
   - Verify no errors
   - Verify auto-save logs appear

### Custom Domain (Vercel/Netlify)

**Vercel:**
1. Go to Project Settings
2. Click "Domains"
3. Add your domain
4. Update DNS records per Vercel instructions

**Netlify:**
1. Go to Site Settings
2. Click "Domain management"
3. Add custom domain
4. Update DNS records per Netlify instructions

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### App Shows Blank Page
- Check browser console (F12) for errors
- Verify `public/index.html` exists
- Check that `.gitignore` doesn't exclude necessary files

### Styling Missing
- Vercel/Netlify need Tailwind build: `npm run build`
- Check that `tailwind.config.js` exists
- Verify `src/index.css` has Tailwind imports

### Auto-Save Not Working
- Check browser localStorage enabled
- Open DevTools > Application > Local Storage
- Look for "scholasticAutoSave" key
- Check console for errors

---

## Performance Optimization

### Before Deployment

1. **Verify Build Size**
   ```bash
   npm run build
   # Check output size in `build/` folder
   ```

2. **Enable Compression**
   - Vercel/Netlify do this automatically
   - For traditional hosting, enable gzip

3. **Test Load Time**
   - Open app in new incognito window
   - Check Network tab in DevTools
   - Should load in under 3 seconds

### Monitoring

- **Vercel Analytics** (built-in)
- **Netlify Analytics** (built-in)
- Monitor auto-save functionality

---

## Maintenance

### Regular Updates

Check for dependency updates:
```bash
npm outdated
npm update
```

### Backup Data

Users' data is saved locally. To backup:
1. Open DevTools > Application > Local Storage
2. Copy "scholasticGames" value
3. Save to file for records

---

## Support URLs

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Pages**: https://pages.github.com

---

**Need Help?**
Check README.md for troubleshooting section.
