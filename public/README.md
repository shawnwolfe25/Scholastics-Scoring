# Scholastic Scorer

A professional, responsive scoring application for any scholastic competitions with 10 points each. Track individual player toss-up answers, team bonus points, and maintain complete competition records with auto-save functionality.

## Features

✅ **24-Round Competition Tracking** - Complete support for full competitions  
✅ **Player Management** - Add/edit/remove team members anytime  
✅ **Individual Scoring** - Track which specific players answered toss-ups  
✅ **Responsive Design** - Works perfectly on desktop and mobile  
✅ **Auto-Save Every 10 Seconds** - Game data saves automatically  
✅ **Manual Save** - Save games for future review  
✅ **Load Previous Games** - Access past competitions anytime  
✅ **Restore from Auto-Save** - Never lose data if browser closes  
✅ **Edit Team Names** - Change names during competition  
✅ **Edit Player Names** - Add or remove players mid-competition  
✅ **Round History** - Complete record of all 24 rounds  

## Scoring System

- **Toss-up**: 10 points per correct answer
- **Bonus Round**: 0-30 points (3 questions × 10 points each)
- Both teams can score bonus points in the same round
- If first team doesn't answer bonus, second team can attempt it

## Quick Start

### Prerequisites
- Node.js 14.0 or higher
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/scholastic-scorer.git
cd scholastic-scorer

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Vercel auto-detects React and deploys automatically
6. Your app is live at `your-project.vercel.app`

**Auto-deployment**: Every push to GitHub automatically redeploys

### Other Hosting Options

- **Netlify**: Connect GitHub repo, same process as Vercel
- **GitHub Pages**: Run `npm run build`, deploy `build/` folder
- **Traditional Hosting**: Upload contents of `build/` folder via FTP

## File Structure

```
scholastic-scorer/
├── public/
│   ├── index.html          # Main HTML file
│   ├── favicon.svg         # App icon
│   └── manifest.json       # PWA manifest
├── src/
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   ├── ScholasticScorer.jsx # Scoring app component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles with Tailwind
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Usage Guide

### Setup
1. Enter competition name
2. Enter team names (can be changed anytime)
3. Click "Start Scoring"

### Add Players
1. Click "Edit Players" button
2. Add player names for each team
3. Click "Done"

### Score a Round
1. **Toss-up**: Click the player name who answered correctly (10 points)
2. **Bonus**: Enter points for each team (0-30)
3. Teams can both score in the same round

### Navigate
- **Previous/Next Round**: Move between rounds
- **Round History**: Click any round to jump to it
- **Edit Names**: Change team names anytime
- **Edit Players**: Add/remove players anytime

### Save Progress
- **Auto-Save**: Happens every 10 seconds automatically
- **Manual Save**: Click "Save Game" button
- **Restore**: Click "Restore from Auto-Save" on startup if needed
- **Load Old Game**: Click "Load Previous Game" button

## Data Storage

All data is stored in your browser's **localStorage**:
- **Auto-save**: Temporary backup, updated every 10 seconds
- **Manual saves**: Permanent game records
- **No server required**: Works completely offline
- **No data sent anywhere**: Everything stays on your device

### Clear Data
To delete all saved games and auto-saves:
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Find "scholasticGames" and "scholasticAutoSave"
4. Delete them

## Keyboard Shortcuts

- **Enter** when adding a player name = Save player
- **ESC** in any dialog = Close without saving

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Works on:
- Desktop computers
- Tablets
- Smartphones
- Any modern web browser

## Troubleshooting

### App Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Styling Issues
```bash
# Rebuild with Tailwind
npm run build
```

### Data Lost
- Check "Restore from Auto-Save" button on startup
- Look in "Load Previous Game" for saved versions
- Check browser DevTools > Application > Local Storage

### Favicon Warning
This warning is harmless and doesn't affect functionality. It disappears on deployed version.

## System Requirements

- **Browser**: Modern web browser with localStorage support
- **Internet**: Not required (works offline)
- **Storage**: Uses browser localStorage (typically 5-10MB available)

## Performance

- Lightweight app (~100KB minified)
- Fast load times
- Smooth on mobile devices
- Auto-save doesn't impact performance

## Privacy

- No data collection
- No external API calls
- No analytics tracking
- All data stays on your device
- Safe to use in any environment

## License

This project is open source and available for scholastic competition use.

## Support

For issues, feature requests, or questions:
1. Check this README
2. Create an issue on GitHub
3. Contact the developer

## Credits

Built with:
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Create React App](https://create-react-app.dev)

---

**Last Updated**: 2024
**Version**: 1.0.0
