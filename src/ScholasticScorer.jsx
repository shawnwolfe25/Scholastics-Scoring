import React, { useState } from 'react';
import { Save, RotateCcw, Plus, Minus } from 'lucide-react';

export default function ScholasticScorer() {
  const [competition, setCompetition] = useState('');
  const [team1Name, setTeam1Name] = useState('Team A');
  const [team2Name, setTeam2Name] = useState('Team B');
  const [currentRound, setCurrentRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [savedGames, setSavedGames] = useState([]);
  const [showLoadMenu, setShowLoadMenu] = useState(false);
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [rosterSetup, setRosterSetup] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [addingPlayerTo, setAddingPlayerTo] = useState(null);
  const [editingNames, setEditingNames] = useState(false);
  const [editTeam1Name, setEditTeam1Name] = useState('');
  const [editTeam2Name, setEditTeam2Name] = useState('');
  const [editingRoster, setEditingRoster] = useState(false);
  const [archivedGames, setArchivedGames] = useState([]);
  const [rounds, setRounds] = useState(
    Array(24).fill(null).map(() => ({
      tossupWinnerId: null,
      tossupWinnerTeam: null,
      team1BonusScore: 0,
      team2BonusScore: 0,
      tossupPoints: 10
    }))
  );

  React.useEffect(() => {
    const saved = localStorage.getItem('scholasticGames');
    if (saved) {
      try {
        setSavedGames(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved games', e);
      }
    }
    
    const archived = localStorage.getItem('scholasticArchivedGames');
    if (archived) {
      try {
        setArchivedGames(JSON.parse(archived));
      } catch (e) {
        console.error('Failed to load archived games', e);
      }
    }
    
    // Load auto-save if available
    const autoSave = localStorage.getItem('scholasticAutoSave');
    if (autoSave) {
      try {
        const autoSaveData = JSON.parse(autoSave);
        console.log('Auto-save found from:', autoSaveData.savedAt);
      } catch (e) {
        console.error('Failed to load auto-save', e);
      }
    }
  }, []);

  // Auto-save game state every 10 seconds when game is active
  React.useEffect(() => {
    if (!gameStarted || editingNames || editingRoster || showLoadMenu || rosterSetup) return;

    const autoSaveInterval = setInterval(() => {
      try {
        const autoSaveData = {
          id: 'auto-save',
          competition,
          team1Name,
          team2Name,
          team1Players,
          team2Players,
          rounds,
          currentRound,
          savedAt: new Date().toLocaleString(),
          isAutoSave: true
        };
        
        localStorage.setItem('scholasticAutoSave', JSON.stringify(autoSaveData));
        console.log('Auto-saved at', new Date().toLocaleTimeString());
      } catch (e) {
        console.error('Auto-save failed:', e);
      }
    }, 10000); // Auto-save every 10 seconds

    return () => clearInterval(autoSaveInterval);
  }, [gameStarted, competition, team1Name, team2Name, team1Players, team2Players, rounds, currentRound, editingNames, editingRoster, showLoadMenu, rosterSetup]);

  const calculateScores = () => {
    let team1Score = 0;
    let team2Score = 0;

    rounds.forEach((round) => {
      if (round.tossupWinnerTeam === 1) {
        team1Score += round.tossupPoints;
      } else if (round.tossupWinnerTeam === 2) {
        team2Score += round.tossupPoints;
      }

      team1Score += round.team1BonusScore;
      team2Score += round.team2BonusScore;
    });

    return { team1Score, team2Score };
  };

  const scores = calculateScores();

  const saveGame = () => {
    const gameData = {
      id: Date.now(),
      competition,
      team1Name,
      team2Name,
      rounds,
      currentRound,
      scores,
      savedAt: new Date().toLocaleString()
    };

    const updated = [...savedGames, gameData];
    setSavedGames(updated);
    localStorage.setItem('scholasticGames', JSON.stringify(updated));
    alert(`Game "${competition}" saved successfully!`);
  };

  const loadGame = (gameData) => {
    setCompetition(gameData.competition);
    setTeam1Name(gameData.team1Name);
    setTeam2Name(gameData.team2Name);
    setRounds(gameData.rounds);
    setCurrentRound(gameData.currentRound);
    setTeam1Players(gameData.team1Players || []);
    setTeam2Players(gameData.team2Players || []);
    setGameStarted(true);
    setShowLoadMenu(false);
  };

  const restoreFromAutoSave = () => {
    const autoSave = localStorage.getItem('scholasticAutoSave');
    if (autoSave) {
      try {
        const autoSaveData = JSON.parse(autoSave);
        loadGame(autoSaveData);
        alert('Game restored from auto-save!');
      } catch (e) {
        console.error('Failed to restore auto-save', e);
        alert('Failed to restore auto-save');
      }
    }
  };

  const deleteGame = (id) => {
    const updated = savedGames.filter(game => game.id !== id);
    setSavedGames(updated);
    localStorage.setItem('scholasticGames', JSON.stringify(updated));
  };

  const archiveGame = (gameData) => {
    // Move game from savedGames to archivedGames
    const updatedSaved = savedGames.filter(game => game.id !== gameData.id);
    setSavedGames(updatedSaved);
    localStorage.setItem('scholasticGames', JSON.stringify(updatedSaved));

    const archivedGame = { ...gameData, archivedAt: new Date().toLocaleString() };
    const updatedArchived = [...archivedGames, archivedGame];
    setArchivedGames(updatedArchived);
    localStorage.setItem('scholasticArchivedGames', JSON.stringify(updatedArchived));
    alert(`Game "${gameData.competition}" archived successfully! Scores are now locked.`);
  };

  const exportGameAsText = (gameData) => {
    const scores = {};
    let roundNumber = 0;
    for (let i = 0; i < gameData.rounds.length; i++) {
      if (gameData.rounds[i].tossupWinnerTeam) {
        roundNumber++;
        const roundData = gameData.rounds[i];
        const tossupTeam = roundData.tossupWinnerTeam === 1 ? gameData.team1Name : gameData.team2Name;
        
        if (!scores[tossupTeam]) scores[tossupTeam] = 0;
        scores[tossupTeam] += roundData.tossupPoints;
        
        if (roundData.team1BonusScore > 0) {
          if (!scores[gameData.team1Name]) scores[gameData.team1Name] = 0;
          scores[gameData.team1Name] += roundData.team1BonusScore;
        }
        if (roundData.team2BonusScore > 0) {
          if (!scores[gameData.team2Name]) scores[gameData.team2Name] = 0;
          scores[gameData.team2Name] += roundData.team2BonusScore;
        }
      }
    }

    let text = `SCHOLASTIC COMPETITION SCORESHEET\n`;
    text += `${'='.repeat(50)}\n\n`;
    text += `Competition: ${gameData.competition}\n`;
    text += `Saved: ${gameData.savedAt}\n`;
    text += `Rounds Completed: ${roundNumber} of 24\n\n`;
    text += `FINAL SCORES\n`;
    text += `${'='.repeat(50)}\n`;
    text += `${gameData.team1Name}: ${scores[gameData.team1Name] || 0} points\n`;
    text += `${gameData.team2Name}: ${scores[gameData.team2Name] || 0} points\n\n`;
    text += `ROUND SUMMARY\n`;
    text += `${'='.repeat(50)}\n`;
    text += `Round | ${gameData.team1Name.padEnd(20)} | ${gameData.team2Name.padEnd(20)} | Total\n`;
    text += `${'='.repeat(50)}\n`;

    let team1RunningTotal = 0;
    let team2RunningTotal = 0;

    for (let i = 0; i < gameData.rounds.length; i++) {
      if (gameData.rounds[i].tossupWinnerTeam) {
        const round = i + 1;
        const roundData = gameData.rounds[i];
        
        if (roundData.tossupWinnerTeam === 1) {
          team1RunningTotal += roundData.tossupPoints + roundData.team1BonusScore;
        } else {
          team2RunningTotal += roundData.tossupPoints + roundData.team2BonusScore;
        }
        
        team1RunningTotal += roundData.team1BonusScore;
        team2RunningTotal += roundData.team2BonusScore;

        const t1Score = (roundData.tossupWinnerTeam === 1 ? roundData.tossupPoints : 0) + roundData.team1BonusScore;
        const t2Score = (roundData.tossupWinnerTeam === 2 ? roundData.tossupPoints : 0) + roundData.team2BonusScore;

        text += `${String(round).padEnd(5)} | ${String(t1Score).padEnd(20)} | ${String(t2Score).padEnd(20)} | ${team1RunningTotal + team2RunningTotal}\n`;
      }
    }

    return text;
  };

  const downloadAsText = (gameData) => {
    const text = exportGameAsText(gameData);
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${gameData.competition.replace(/\s+/g, '_')}_score_${gameData.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleStartGame = () => {
    if (competition.trim() && team1Name.trim() && team2Name.trim()) {
      setRosterSetup(true);
    }
  };

  const recordTossup = (teamNumber, playerId, playerName) => {
    const newRounds = [...rounds];
    newRounds[currentRound - 1].tossupWinnerId = playerId;
    newRounds[currentRound - 1].tossupWinnerTeam = teamNumber;
    newRounds[currentRound - 1].tossupWinnerName = playerName;
    setRounds(newRounds);
  };

  const addPlayer = (team) => {
    if (!newPlayerName.trim()) return;
    
    if (team === 1) {
      const newPlayer = { id: Date.now(), name: newPlayerName };
      setTeam1Players([...team1Players, newPlayer]);
    } else {
      const newPlayer = { id: Date.now(), name: newPlayerName };
      setTeam2Players([...team2Players, newPlayer]);
    }
    setNewPlayerName('');
    setAddingPlayerTo(null);
  };

  const removePlayer = (team, playerId) => {
    if (team === 1) {
      setTeam1Players(team1Players.filter(p => p.id !== playerId));
    } else {
      setTeam2Players(team2Players.filter(p => p.id !== playerId));
    }
  };

  const getPlayerTossupCount = (team, playerId) => {
    return rounds.filter(r => r.tossupWinnerId === playerId && r.tossupWinnerTeam === team).length;
  };

  const updateTeam1Bonus = (score) => {
    const newRounds = [...rounds];
    newRounds[currentRound - 1].team1BonusScore = Math.max(0, Math.min(30, score));
    setRounds(newRounds);
  };

  const updateTeam2Bonus = (score) => {
    const newRounds = [...rounds];
    newRounds[currentRound - 1].team2BonusScore = Math.max(0, Math.min(30, score));
    setRounds(newRounds);
  };

  const nextRound = () => {
    if (currentRound < 24) {
      setCurrentRound(currentRound + 1);
    }
  };

  const previousRound = () => {
    if (currentRound > 1) {
      setCurrentRound(currentRound - 1);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setRosterSetup(false);
    setCurrentRound(1);
    setCompetition('');
    setTeam1Name('Team A');
    setTeam2Name('Team B');
    setTeam1Players([]);
    setTeam2Players([]);
    setRounds(
      Array(24).fill(null).map(() => ({
        tossupWinnerId: null,
        tossupWinnerTeam: null,
        team1BonusScore: 0,
        team2BonusScore: 0,
        tossupPoints: 10
      }))
    );
  };

  const openEditNames = () => {
    setEditTeam1Name(team1Name);
    setEditTeam2Name(team2Name);
    setEditingNames(true);
  };

  const saveEditedNames = () => {
    if (editTeam1Name.trim() && editTeam2Name.trim()) {
      setTeam1Name(editTeam1Name);
      setTeam2Name(editTeam2Name);
      setEditingNames(false);
    }
  };

  const currentRoundData = rounds[currentRound - 1];

  if (editingNames) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-slate-800 border-2 border-slate-700 rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Edit Team Names</h1>
          <div className="space-y-6">
            <div>
              <label className="block text-slate-300 font-semibold mb-2">Team 1 Name</label>
              <input type="text" value={editTeam1Name} onChange={(e) => setEditTeam1Name(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-2">Team 2 Name</label>
              <input type="text" value={editTeam2Name} onChange={(e) => setEditTeam2Name(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button onClick={() => setEditingNames(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded transition-colors">Cancel</button>
            <button onClick={saveEditedNames} disabled={!editTeam1Name.trim() || !editTeam2Name.trim()} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors">Save Names</button>
          </div>
        </div>
      </div>
    );
  }

  if (editingRoster) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">Edit Team Members</h1>
          <p className="text-slate-400 text-center mb-8">Add, remove, or edit player names</p>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-800 border-2 border-blue-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-400 mb-6">{team1Name}</h2>
              {addingPlayerTo === 1 ? (
                <div className="mb-6 flex gap-2">
                  <input type="text" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} placeholder="Player name" onKeyPress={(e) => e.key === 'Enter' && addPlayer(1)} className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" autoFocus />
                  <button onClick={() => addPlayer(1)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">Add</button>
                  <button onClick={() => { setAddingPlayerTo(null); setNewPlayerName(''); }} className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setAddingPlayerTo(1)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6">+ Add Player</button>
              )}
              <div className="space-y-2">
                {team1Players.map((player) => (
                  <div key={player.id} className="bg-slate-700 p-3 rounded flex justify-between items-center">
                    <span className="text-white font-semibold">{player.name}</span>
                    <button onClick={() => removePlayer(1, player.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">Remove</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800 border-2 border-red-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-6">{team2Name}</h2>
              {addingPlayerTo === 2 ? (
                <div className="mb-6 flex gap-2">
                  <input type="text" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} placeholder="Player name" onKeyPress={(e) => e.key === 'Enter' && addPlayer(2)} className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" autoFocus />
                  <button onClick={() => addPlayer(2)} className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded">Add</button>
                  <button onClick={() => { setAddingPlayerTo(null); setNewPlayerName(''); }} className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setAddingPlayerTo(2)} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-6">+ Add Player</button>
              )}
              <div className="space-y-2">
                {team2Players.map((player) => (
                  <div key={player.id} className="bg-slate-700 p-3 rounded flex justify-between items-center">
                    <span className="text-white font-semibold">{player.name}</span>
                    <button onClick={() => removePlayer(2, player.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setEditingRoster(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded transition-colors">Done</button>
          </div>
        </div>
      </div>
    );
  }

  if (showLoadMenu) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-slate-800 border-2 border-slate-700 rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">Load Previous Games</h1>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Active Games</h2>
            {savedGames.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400 text-lg">No active saved games yet.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {savedGames.map((game) => (
                  <div key={game.id} className="bg-slate-700 border border-slate-600 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{game.competition}</h3>
                      <p className="text-slate-300 text-sm">{game.team1Name} vs {game.team2Name}</p>
                      <div className="flex gap-4 mt-2">
                        <span className="text-blue-400 font-semibold">{game.scores.team1Score}</span>
                        <span className="text-slate-400">-</span>
                        <span className="text-red-400 font-semibold">{game.scores.team2Score}</span>
                        <span className="text-slate-400 ml-2">• Round {game.currentRound}</span>
                      </div>
                      <p className="text-slate-500 text-xs mt-1">Saved: {game.savedAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => loadGame(game)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm">Load</button>
                      <button onClick={() => downloadAsText(game)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm">Export</button>
                      <button onClick={() => archiveGame(game)} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm">Archive</button>
                      <button onClick={() => deleteGame(game.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {archivedGames.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-amber-400 mb-4">🔒 Archived Games (Locked)</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {archivedGames.map((game) => (
                  <div key={game.id} className="bg-slate-700 border-2 border-amber-600 rounded-lg p-4 flex justify-between items-center opacity-85">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-amber-300">🔒 {game.competition}</h3>
                      <p className="text-slate-300 text-sm">{game.team1Name} vs {game.team2Name}</p>
                      <div className="flex gap-4 mt-2">
                        <span className="text-blue-400 font-semibold">{game.scores.team1Score}</span>
                        <span className="text-slate-400">-</span>
                        <span className="text-red-400 font-semibold">{game.scores.team2Score}</span>
                        <span className="text-slate-400 ml-2">• Round {game.currentRound}</span>
                      </div>
                      <p className="text-slate-500 text-xs mt-1">Archived: {game.archivedAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => downloadAsText(game)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm">Export</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6 flex gap-4">
            <button onClick={() => setShowLoadMenu(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded transition-colors">Back</button>
          </div>
        </div>
      </div>
    );
  }

  if (rosterSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">Add Team Members</h1>
          <p className="text-slate-400 text-center mb-8">Add player names to track individual toss-up answers</p>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-800 border-2 border-blue-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-400 mb-6">{team1Name}</h2>
              {addingPlayerTo === 1 ? (
                <div className="mb-6 flex gap-2">
                  <input type="text" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} placeholder="Player name" onKeyPress={(e) => e.key === 'Enter' && addPlayer(1)} className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" autoFocus />
                  <button onClick={() => addPlayer(1)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">Add</button>
                  <button onClick={() => { setAddingPlayerTo(null); setNewPlayerName(''); }} className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setAddingPlayerTo(1)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6">+ Add Player</button>
              )}
              <div className="space-y-2">
                {team1Players.map((player) => (
                  <div key={player.id} className="bg-slate-700 p-3 rounded flex justify-between items-center">
                    <span className="text-white font-semibold">{player.name}</span>
                    <button onClick={() => removePlayer(1, player.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">Remove</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800 border-2 border-red-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-6">{team2Name}</h2>
              {addingPlayerTo === 2 ? (
                <div className="mb-6 flex gap-2">
                  <input type="text" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} placeholder="Player name" onKeyPress={(e) => e.key === 'Enter' && addPlayer(2)} className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500" autoFocus />
                  <button onClick={() => addPlayer(2)} className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded">Add</button>
                  <button onClick={() => { setAddingPlayerTo(null); setNewPlayerName(''); }} className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setAddingPlayerTo(2)} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-6">+ Add Player</button>
              )}
              <div className="space-y-2">
                {team2Players.map((player) => (
                  <div key={player.id} className="bg-slate-700 p-3 rounded flex justify-between items-center">
                    <span className="text-white font-semibold">{player.name}</span>
                    <button onClick={() => removePlayer(2, player.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setRosterSetup(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded transition-colors">Back</button>
            <button onClick={() => { setGameStarted(true); setRosterSetup(false); }} disabled={team1Players.length === 0 || team2Players.length === 0} className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors">Start Scoring</button>
          </div>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-slate-800 border-2 border-slate-700 rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">Scholastic Matches</h1>
          <p className="text-slate-400 text-center mb-8">Score Tracker for Science Bowl Competitions</p>
          <div className="space-y-6">
            <div>
              <label className="block text-slate-300 font-semibold mb-2">Competition Name</label>
              <input type="text" value={competition} onChange={(e) => setCompetition(e.target.value)} placeholder="e.g., Regional Qualifiers 2024" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-2">Team 1 Name</label>
                <input type="text" value={team1Name} onChange={(e) => setTeam1Name(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-2">Team 2 Name</label>
                <input type="text" value={team2Name} onChange={(e) => setTeam2Name(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
            <button onClick={handleStartGame} disabled={!competition.trim()} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors text-lg">Start Scoring</button>
            {localStorage.getItem('scholasticAutoSave') && (
              <button onClick={restoreFromAutoSave} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded transition-colors">Restore from Auto-Save</button>
            )}
            {savedGames.length > 0 && (
              <button onClick={() => setShowLoadMenu(true)} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded transition-colors">Load Previous Game ({savedGames.length})</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{competition}</h1>
            <p className="text-slate-400">Round {currentRound} of 24</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditingRoster(true)} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded transition-colors">Edit Players</button>
            <button onClick={openEditNames} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded transition-colors">Edit Names</button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 border-2 border-blue-600 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4">{team1Name}</h2>
            <div className="text-5xl font-bold text-blue-500 mb-2">{scores.team1Score}</div>
            <p className="text-slate-400 text-sm mb-6">Total Points</p>
            <div className="border-t border-slate-700 pt-4">
              <div className="text-xs text-slate-400 mb-3 font-bold">Toss-up Answers</div>
              <div className="space-y-2">
                {team1Players.map((player) => (
                  <div key={player.id} className="flex justify-between text-sm">
                    <span className="text-slate-300">{player.name}</span>
                    <span className="text-blue-400 font-bold">{getPlayerTossupCount(1, player.id)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-slate-800 border-2 border-red-600 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-red-400 mb-4">{team2Name}</h2>
            <div className="text-5xl font-bold text-red-500 mb-2">{scores.team2Score}</div>
            <p className="text-slate-400 text-sm mb-6">Total Points</p>
            <div className="border-t border-slate-700 pt-4">
              <div className="text-xs text-slate-400 mb-3 font-bold">Toss-up Answers</div>
              <div className="space-y-2">
                {team2Players.map((player) => (
                  <div key={player.id} className="flex justify-between text-sm">
                    <span className="text-slate-300">{player.name}</span>
                    <span className="text-red-400 font-bold">{getPlayerTossupCount(2, player.id)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 border-2 border-slate-700 rounded-lg p-8 mb-8 shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-6">Round {currentRound} Scoring</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-slate-300 mb-4">Toss-up Question</h4>
              <p className="text-sm text-slate-400 mb-6">Who answered correctly? (10 points)</p>
              <div className="mb-8">
                <h5 className="text-blue-400 font-semibold mb-3">{team1Name}</h5>
                <div className="grid grid-cols-1 gap-2">
                  {team1Players.map((player) => (
                    <button key={player.id} onClick={() => recordTossup(1, player.id, player.name)} className={`py-2 px-3 rounded font-semibold transition-all text-sm ${currentRoundData.tossupWinnerId === player.id && currentRoundData.tossupWinnerTeam === 1 ? 'bg-blue-600 text-white border-2 border-blue-400' : 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:border-blue-500'}`}>{player.name}</button>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-700 pt-8 lg:border-0 lg:pt-0">
                <h5 className="text-red-400 font-semibold mb-3">{team2Name}</h5>
                <div className="grid grid-cols-1 gap-2">
                  {team2Players.map((player) => (
                    <button key={player.id} onClick={() => recordTossup(2, player.id, player.name)} className={`py-2 px-3 rounded font-semibold transition-all text-sm ${currentRoundData.tossupWinnerId === player.id && currentRoundData.tossupWinnerTeam === 2 ? 'bg-red-600 text-white border-2 border-red-400' : 'bg-slate-700 text-slate-300 border-2 border-slate-600 hover:border-red-500'}`}>{player.name}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-300 mb-4">Bonus Round Scoring</h4>
              <p className="text-sm text-slate-400 mb-6">{currentRoundData.tossupWinnerId ? `${currentRoundData.tossupWinnerName} got first shot at bonus` : 'Select a tossup winner first'}</p>
              {currentRoundData.tossupWinnerId && (
                <div className="space-y-6">
                  <div className="bg-slate-700/50 border border-blue-600/50 rounded p-4">
                    <label className="text-blue-400 font-semibold block mb-3">{team1Name} Bonus</label>
                    <div className="flex items-center gap-2 mb-3">
                      <button onClick={() => updateTeam1Bonus(currentRoundData.team1BonusScore - 10)} className="bg-slate-600 hover:bg-slate-500 text-white p-2 rounded transition-colors"><Minus size={20} /></button>
                      <input type="number" min="0" max="30" value={currentRoundData.team1BonusScore} onChange={(e) => updateTeam1Bonus(parseInt(e.target.value) || 0)} className="w-20 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-center font-bold focus:outline-none focus:border-blue-500" />
                      <button onClick={() => updateTeam1Bonus(currentRoundData.team1BonusScore + 10)} className="bg-slate-600 hover:bg-slate-500 text-white p-2 rounded transition-colors"><Plus size={20} /></button>
                      <span className="text-slate-400 text-sm">/ 30</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[0, 10, 20, 30].map((score) => (
                        <button key={score} onClick={() => updateTeam1Bonus(score)} className={`px-3 py-1 text-sm rounded font-semibold transition-all ${currentRoundData.team1BonusScore === score ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}>{score}</button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-700/50 border border-red-600/50 rounded p-4">
                    <label className="text-red-400 font-semibold block mb-3">{team2Name} Bonus</label>
                    <div className="flex items-center gap-2 mb-3">
                      <button onClick={() => updateTeam2Bonus(currentRoundData.team2BonusScore - 10)} className="bg-slate-600 hover:bg-slate-500 text-white p-2 rounded transition-colors"><Minus size={20} /></button>
                      <input type="number" min="0" max="30" value={currentRoundData.team2BonusScore} onChange={(e) => updateTeam2Bonus(parseInt(e.target.value) || 0)} className="w-20 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-center font-bold focus:outline-none focus:border-blue-500" />
                      <button onClick={() => updateTeam2Bonus(currentRoundData.team2BonusScore + 10)} className="bg-slate-600 hover:bg-slate-500 text-white p-2 rounded transition-colors"><Plus size={20} /></button>
                      <span className="text-slate-400 text-sm">/ 30</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[0, 10, 20, 30].map((score) => (
                        <button key={score} onClick={() => updateTeam2Bonus(score)} className={`px-3 py-1 text-sm rounded font-semibold transition-all ${currentRoundData.team2BonusScore === score ? 'bg-red-600 text-white' : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}`}>{score}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-8">
          <button onClick={previousRound} disabled={currentRound === 1} className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold py-3 rounded transition-colors">← Previous Round</button>
          <button onClick={nextRound} disabled={currentRound === 24} className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold py-3 rounded transition-colors">Next Round →</button>
          <button onClick={saveGame} className="flex-1 bg-green-700 hover:bg-green-600 text-white font-bold py-3 rounded transition-colors flex items-center justify-center gap-2"><Save size={20} /> Save Game</button>
          <button onClick={resetGame} className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-3 rounded transition-colors flex items-center justify-center gap-2"><RotateCcw size={20} /> Reset</button>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">Round History</h3>
          <div className="max-h-64 overflow-y-auto">
            <div className="grid grid-cols-12 gap-2 text-xs text-slate-400 mb-3 pb-3 border-b border-slate-700">
              <div className="col-span-2 font-bold">Round</div>
              <div className="col-span-2 font-bold">TossUp</div>
              <div className="col-span-2 font-bold">T1 Bonus</div>
              <div className="col-span-2 font-bold">T2 Bonus</div>
              <div className="col-span-2 font-bold">Total</div>
              <div className="col-span-2 font-bold">—</div>
            </div>
            {rounds.map((round, idx) => {
              let roundTotal = 0;
              if (round.tossupWinnerTeam === 1) roundTotal += round.tossupPoints;
              else if (round.tossupWinnerTeam === 2) roundTotal += round.tossupPoints;
              roundTotal += round.team1BonusScore + round.team2BonusScore;
              return (
                <div key={idx} onClick={() => setCurrentRound(idx + 1)} className={`grid grid-cols-12 gap-2 text-sm py-2 px-3 rounded cursor-pointer transition-colors ${idx + 1 === currentRound ? 'bg-blue-600/30 border-l-2 border-blue-500' : round.tossupWinnerId ? 'hover:bg-slate-700/50' : 'text-slate-500'}`}>
                  <div className="col-span-2 font-bold text-white">{idx + 1}</div>
                  <div className="col-span-2">{round.tossupWinnerId ? <span className={round.tossupWinnerTeam === 1 ? 'text-blue-400' : 'text-red-400'}>{round.tossupWinnerName}</span> : <span className="text-slate-600">—</span>}</div>
                  <div className="col-span-2"><span className="text-blue-400">{round.team1BonusScore}</span></div>
                  <div className="col-span-2"><span className="text-red-400">{round.team2BonusScore}</span></div>
                  <div className="col-span-2"><span className="text-white font-bold">{roundTotal}</span></div>
                  <div className="col-span-2">—</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
