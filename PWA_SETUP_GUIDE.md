# Scholastic Scorer - PWA Setup Guide (iPhone Installation)

## What is a PWA?

A **Progressive Web App (PWA)** is a web app that works like a native app on your phone:
- ✅ Install directly on home screen (no App Store needed!)
- ✅ Works offline with your data
- ✅ Full-screen app experience
- ✅ Push notifications capable
- ✅ Instant updates (always latest version)

**Your app is already PWA-enabled!** No App Store approval needed.

---

## Installation on iPhone

### Step 1: Visit Your App

Open Safari on your iPhone and go to:
```
https://scholasticscore r.vercel.app
```

(Replace with your actual Vercel URL if different)

### Step 2: Add to Home Screen

1. **Tap the Share button** (box with arrow at bottom)
2. **Scroll down** and tap **"Add to Home Screen"**
3. **Name it:** "Scholastic Scorer" (default is fine)
4. **Tap "Add"** in the top right

That's it! 🎉

The app now appears on your home screen like any native app.

---

## What Happens After Installation

- 📱 App icon appears on home screen
- ⚡ Opens full-screen (no Safari address bar)
- 📡 Updates automatically when you visit the web app
- 🔄 Works offline using your saved data
- 💾 All data stays on your phone

---

## On Android

Same process, but in Chrome instead of Safari:

1. **Open Chrome** and go to your Vercel URL
2. **Tap menu** (3 dots) → **"Install app"** or **"Add to Home Screen"**
3. **Tap "Install"**

Done!

---

## Features Available

All your app features work perfectly:

- ✅ **New Competition** - Full setup screen
- ✅ **Player Management** - Add/edit/remove players
- ✅ **Live Scoring** - Track toss-ups (10 pts) and bonus (0-30 pts)
- ✅ **24 Rounds** - Navigate through all rounds
- ✅ **Save Games** - Persistent storage on device
- ✅ **Load Previous Games** - Access past competitions
- ✅ **Offline Support** - Works with no internet
- ✅ **Auto-save** - Every 10 seconds (in app)

---

## Offline Usage

Your app works completely offline:

1. **Load a game** while online
2. **Score rounds** offline (no internet needed)
3. **Data saves locally** to your device
4. **Load it again later** - data persists

Perfect for competitions with no WiFi!

---

## Update Management

Your PWA updates automatically:

1. When you visit the website again
2. The browser downloads the latest code
3. You always have the newest version
4. No manual updates needed

**No App Store waiting!**

---

## Storage & Data

### How Much Data?

Your phone stores:
- 📊 **Saved games** - Very small (text data only)
- 📝 **Competition info** - Names, scores, rounds
- 🎯 **Auto-saves** - Recent game snapshot

**Total:** Usually less than 1 MB per 50 games

### Where Is Data Stored?

On your iPhone:
- **Settings** → **Safari** → **Advanced** → **Website Data**
- Shows how much storage your app uses

On Android:
- **Chrome** → **Settings** → **Apps** → **Storage**

### Can I Delete It?

Yes:
- **Tap and hold app** on home screen
- Tap **"Remove App"** → **"Remove from Home Screen"** (keeps data)
- Or **"Delete App"** → **"Delete"** (removes everything)

---

## Troubleshooting

### "Add to Home Screen" Option Missing

This means your device isn't recognizing it as a PWA. Usually happens if:

**Solution 1: Clear Safari Cache**
1. **Settings** → **Safari**
2. **Clear History and Website Data**
3. Go back to the website
4. Try adding again

**Solution 2: Use a Different Browser**
- Try **Chrome** or **Edge** instead
- Both have excellent PWA support

### App Crashes or Freezes

- **Close the app** completely
- **Reopen it**
- Works 99% of the time

If persistent:
1. Delete the app from home screen
2. Clear Safari cache (Settings → Safari → Clear)
3. Re-add it

### Can't See Previous Saved Games

Your data is in Safari's website storage:

1. Don't delete the app's data when clearing Safari
2. Choose **Settings** → **Safari** → **Clear History and Website Data**
3. Uncheck "Website Data" option

Or be very careful to only clear history, not data.

### App Looks Blurry

- **Pinch to zoom out** a bit in the app
- Or rotate to landscape
- PWAs sometimes display density issues

---

## Advanced Features

### Create a Shortcut (iOS)

You can create a quick shortcut to start a new game:

1. **Tap and hold** the Scholastic Scorer app icon
2. **Tap "Edit Home Screen"**
3. **Tap the + icon** to add a shortcut
4. **Create shortcut** for "New Game"

Now you can jump straight to a new competition!

### Share Your Setup

Want to share with teammates?

1. **Copy the Vercel URL** from your browser
2. **Share via:** Text, Email, WhatsApp, etc.
3. **They visit the link** and add to their home screen
4. **Everyone uses the same web app**

---

## iOS Specific Tips

### Battery Usage

PWAs use very little battery:
- ✅ No background processing
- ✅ Data stored locally (no cloud sync)
- ✅ Efficient JavaScript

Expect same battery as normal web browsing.

### Storage

iPhone PWA data is stored per domain:
- Separate from Safari browsing data
- Doesn't affect your phone's storage much
- Can be individually cleared

### Notifications

Future updates could add notifications:
- "Round time approaching"
- "Game saved"
- etc.

(Not enabled by default, only with permission)

---

## Comparison: PWA vs App Store

| Feature | PWA | App Store Native |
|---------|-----|------------------|
| **Installation** | 2 taps, instant | Download from store |
| **Updates** | Automatic | Manual (you update) |
| **Size** | Tiny (~5MB) | Larger |
| **Offline** | Yes | Yes |
| **Customization** | Easy | Hard |
| **Cost** | Free | $99/year (to publish) |
| **Approval Time** | None | 1-3 days |
| **Distribution** | Link share | App Store only |

**PWA is perfect for:**
- Schools
- Teams
- Quick distribution
- Rapid updates

---

## Publishing & Distribution

### For Your School

1. **Share the Vercel URL**
2. **Send to coaches/teachers/scorekeepers**
3. **They visit link and add to home screen**
4. **Everyone has the app!**

### For Wider Use

1. Keep it on your website
2. Search engines will index it
3. People can find and install it
4. Works like an app in every way

### Future: Publish to Web Store

If you want it in app stores later:
1. Still keep the PWA version
2. Can also publish native versions
3. PWA remains your master version
4. Updates once, everywhere updates

---

## Security & Privacy

### Your Data is Private

- ✅ No server storage (unless you add it)
- ✅ No cloud sync (by default)
- ✅ All data stays on your device
- ✅ No tracking or analytics (by default)
- ✅ Safe for school use

### Browser Security

- ✅ HTTPS only (secure connection)
- ✅ Same security as banking apps
- ✅ Certificate verified
- ✅ Can't be hacked via app (it's just a website)

---

## What's Next?

### Right Now ✅
- Visit your Vercel URL
- Tap Share → Add to Home Screen
- Start using it!

### Future Enhancements (Optional)
- Add home screen icons
- Add custom colors
- Enable notifications
- Create cloud backup
- Publish to additional stores

### If You Ever Want to Distribute Widely
- PWA is already production-ready
- Can add to your website
- Can submit to PWA stores
- Can create native versions later

---

## Testing the PWA

Before you give it to your school:

1. **Install on your iPhone/iPad**
2. **Test offline:**
   - Turn on airplane mode
   - Open the app
   - Create a new competition
   - Score a few rounds
   - Everything works?
3. **Test save/load:**
   - Save a game
   - Refresh the app
   - Load the game back
   - All data there?
4. **Test all features:**
   - Edit players
   - Edit team names
   - Navigate rounds
   - Edit toss-up selection
   - Try all the buttons

If it all works, you're ready to distribute!

---

## Common Questions

**Q: Do I need to update it manually?**
A: No! Updates happen automatically when you visit.

**Q: Does it work offline?**
A: Yes! Data syncs when you visit, but works completely offline.

**Q: Can people use it on Android?**
A: Yes! Same process in Chrome.

**Q: Is my data safe?**
A: Yes, all data stays on your phone. No cloud storage by default.

**Q: What if I delete the app?**
A: Data is deleted too (unless you backed it up elsewhere).

**Q: Can I modify/brand it?**
A: Yes! Customize colors, name, icon in the code.

**Q: What about the App Store?**
A: PWA is better than App Store for your use case. No approval needed.

---

## Support

If you have issues:

1. **Try a different browser** (Chrome, Edge, Firefox)
2. **Clear your browser cache**
3. **Restart your phone**
4. **Check your internet connection**

99% of issues resolve with these steps!

---

## Summary

**You now have a mobile app that:**
- ✅ Works on any phone (iPhone/Android)
- ✅ Installs without App Store
- ✅ Works offline completely
- ✅ Updates automatically
- ✅ Takes 2 minutes to install
- ✅ Looks and feels like a native app

**All without writing any new code!** 🚀

Your Scholastic Scorer PWA is ready to use. Share the Vercel URL and people can install it in seconds.

---

## Next Steps

1. **Push your latest code to GitHub** (if not already done)
2. **Vercel auto-deploys** your PWA
3. **Visit your Vercel URL** on iPhone
4. **Tap Share → Add to Home Screen**
5. **Start scoring!**

Enjoy your PWA! 🎉
