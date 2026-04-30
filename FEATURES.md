# Features Documentation

## 1. Competition Setup

### Create New Competition
- Enter competition name
- Enter Team 1 name
- Enter Team 2 name
- Click "Start Scoring" to proceed

### Edit Team Names
- Click "Edit Names" button during competition
- Change either team name
- Click "Save Names"
- Changes apply immediately

### Restore Previous Competition
- Auto-save automatically saves every 10 seconds
- On startup, if auto-save exists, "Restore from Auto-Save" button appears
- Click to restore last incomplete game
- Alternatively, click "Load Previous Game" to select from list

---

## 2. Team Member Management

### Add Players
1. Click "Edit Players" button
2. Click "+ Add Player" for each team
3. Type player name
4. Press Enter or click "Add"
5. Click "Done" when finished

### Remove Players
1. Click "Edit Players" button
2. Click "Remove" next to player name
3. Click "Done" when finished

### Edit During Competition
- Can add/remove/edit players at any time
- Changes apply immediately to scoring screen
- Player names appear as toss-up buttons

---

## 3. Round Scoring

### Toss-up Scoring
- One player per round answers correctly
- Click player name to record toss-up
- Player gets 10 points
- Button highlights to show selection
- Can change selection by clicking different player

### Bonus Scoring
- Both teams can score in same round
- Appears after toss-up winner selected
- Each team has separate input (0-30 points)
- Use buttons, +/- controls, or type number
- Maximum 30 points per team (3 questions × 10)

### Round Navigation
- **Previous Round**: Go back one round
- **Next Round**: Move to next round
- **Click Round History**: Jump to specific round
- **Round Counter**: Shows current round (e.g., "Round 5 of 24")

---

## 4. Scoring Display

### Team Score Cards
- Shows team name
- Shows total score
- Shows each player's toss-up count
- Updates in real-time

### Round History
- Displays all 24 rounds
- Shows toss-up winner name
- Shows both teams' bonus scores
- Shows round total
- Click to jump to that round
- Scrollable with max height

---

## 5. Auto-Save Feature

### How It Works
- Game automatically saves every 10 seconds
- Saves to browser localStorage
- No manual action required
- Works in background

### What Gets Saved
- Competition name
- Team names
- All player names
- All scoring data
- Current round number
- Timestamp

### Restore Auto-Save
- Button appears on startup if auto-save exists
- Click "Restore from Auto-Save"
- All data restored to exact state
- Pick up where you left off

### Auto-Save Location
- Browser localStorage
- DevTools > Application > Local Storage
- Key: "scholasticAutoSave"
- Survives browser close/refresh

---

## 6. Manual Save Feature

### Save Game
- Click "Save Game" button
- Saves to "Previous Games" list
- Creates permanent record
- Multiple saves can exist
- Shows competition details and final score

### Load Saved Game
1. Click "Load Previous Game" button
2. Choose game from list
3. Shows final score and round reached
4. Click "Load" to resume
5. All data restored exactly

### Delete Old Game
- Go to "Load Previous Game"
- Click "Delete" on game you want removed
- Permanently removes game

### View Saved Games
- Shows all saved games on startup
- Displays:
  - Competition name
  - Both team names
  - Final scores
  - Which round reached
  - Date/time saved
- Can load or delete any

---

## 7. Player Statistics

### Individual Toss-Up Count
- Each player name shows count
- Updates in real-time
- Shows in team score cards
- Shows who answered most questions
- Resets when starting new game

### Team Statistics
- Total team score
- Total toss-ups won
- Bonus points earned
- All tracked continuously

---

## 8. Data Persistence

### Browser Storage
- All data in localStorage
- No server needed
- No data sent anywhere
- Works completely offline
- Survives:
  - Browser close
  - Page refresh
  - Computer sleep
  - Connection loss

### Data Safety
- Two levels of saving:
  1. Auto-save every 10 seconds (temporary)
  2. Manual save (permanent records)
- Never lose data even if browser crashes
- Can restore from auto-save

### Clear Data
- To delete all: DevTools > Application > Local Storage
- Find "scholasticGames" (manual saves)
- Find "scholasticAutoSave" (temporary auto-save)
- Delete or clear as needed

---

## 9. Responsive Design

### Desktop (1024px+)
- Score cards side-by-side
- Scoring section: toss-ups left, bonuses right
- Full layout visible at once
- Optimal for large screens

### Tablet (768px - 1023px)
- Score cards stacked
- Toss-ups full width
- Bonuses below
- Touch-friendly buttons

### Mobile (<768px)
- Single column layout
- Full-width buttons
- Toss-ups stacked vertically
- Easy thumb access
- Bonuses below toss-ups

---

## 10. Keyboard Shortcuts

### Add Players
- **Enter Key**: Save player name when typing

### Navigation
- **Tab Key**: Move between form fields

### Dialogs
- **Escape**: Close dialog (not implemented, use Cancel button)

---

## 11. Error Handling

### Auto-Save Fails
- Shows console error
- Won't block scoring
- Next auto-save will retry
- Manual save available as backup

### Load Game Fails
- Shows error message
- Can try again
- Fallback to start new game

### Data Corruption
- Corrupt data won't load
- Shows error
- Use another saved game if available

---

## 12. Accessibility

### Browser Compatibility
- Works on Chrome, Firefox, Safari, Edge
- Works on all devices
- No special plugins needed
- No Flash or Java required

### Offline Capability
- Works without internet
- Auto-save works offline
- No data transmission
- Complete offline functionality

### Mobile Friendly
- Touch-optimized buttons
- Large tap targets
- Responsive layout
- Works portrait/landscape

---

## 13. Tips & Best Practices

### During Competition
1. Set player names before starting
2. Click player name immediately after toss-up
3. Enter bonus scores for both teams
4. Navigate with Next/Previous buttons
5. Check round history to verify scores

### Data Management
1. Regularly check auto-save is working (console shows logs)
2. Manually save after each round as backup
3. Review round history for accuracy
4. Load previous game to verify saved data

### Troubleshooting
1. Check console (F12) for errors
2. Verify localStorage has data
3. Use "Restore from Auto-Save" if needed
4. Load from saved games list
5. Restart browser if issues persist

---

## 14. Limitations

- **Maximum 24 Rounds**: Fixed at 24 per competition
- **Toss-Up Points**: Fixed at 10 points
- **Bonus Questions**: Fixed at 3 questions per bonus
- **Max Bonus Points**: 30 per team per bonus
- **Browser Storage**: Limited by browser localStorage (typically 5-10MB)

---

## 15. Future Feature Ideas

- Export to CSV or PDF
- Leaderboard comparisons
- Toss-up difficulty tracking
- Player performance analytics
- Tournament mode with brackets
- Cloud backup (requires account)
- Multi-device sync (requires account)
