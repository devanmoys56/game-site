const fs = require('fs');
const path = require('path');

// Game templates and variations
const gameTypes = {
  puzzle: {
    name: 'Puzzle',
    games: [
      { id: 'sliding-puzzle', title: 'Sliding Puzzle', emoji: '🧩' },
      { id: 'jigsaw-puzzle', title: 'Jigsaw Puzzle', emoji: '🧩' },
      { id: 'block-blast', title: 'Block Blast', emoji: '⬛' },
      { id: 'match-three', title: 'Match Three', emoji: '💎' },
      { id: 'candy-crush', title: 'Candy Match', emoji: '🍬' },
      { id: 'bubble-pop', title: 'Bubble Pop', emoji: '🫧' },
      { id: 'hexagon-match', title: 'Hexagon Match', emoji: '⬡' }
    ]
  },
  action: {
    name: 'Action',
    games: [
      { id: 'space-shooter', title: 'Space Shooter', emoji: '🚀' },
      { id: 'asteroid-blaster', title: 'Asteroid Blaster', emoji: '☄️' },
      { id: 'zombie-survival', title: 'Zombie Survival', emoji: '🧟' },
      { id: 'laser-defense', title: 'Laser Defense', emoji: '⚡' },
      { id: 'ball-blast', title: 'Ball Blast', emoji: '⚽' },
      { id: 'dodge-game', title: 'Dodge Master', emoji: '🛡️' },
      { id: 'brick-breaker', title: 'Brick Breaker', emoji: '🧱' }
    ]
  },
  sports: {
    name: 'Sports',
    games: [
      { id: 'basketball-shot', title: 'Basketball Shot', emoji: '🏀' },
      { id: 'soccer-penalty', title: 'Penalty Kick', emoji: '⚽' },
      { id: 'tennis-game', title: 'Tennis Pro', emoji: '🎾' },
      { id: 'golf-mini', title: 'Mini Golf', emoji: '⛳' },
      { id: 'bowling-game', title: 'Bowling', emoji: '🎳' },
      { id: 'baseball-bat', title: 'Baseball', emoji: '⚾' },
      { id: 'boxing-match', title: 'Boxing Match', emoji: '🥊' }
    ]
  },
  strategy: {
    name: 'Strategy',
    games: [
      { id: 'chess-game', title: 'Chess', emoji: '♟️' },
      { id: 'checkers-game', title: 'Checkers', emoji: '⚫' },
      { id: 'go-game', title: 'Go Game', emoji: '⚪' },
      { id: 'tower-defense', title: 'Tower Defense', emoji: '🗼' },
      { id: 'turn-based-rpg', title: 'Turn RPG', emoji: '⚔️' },
      { id: 'dominos-game', title: 'Dominoes', emoji: '🎲' },
      { id: 'mahjong-game', title: 'Mahjong', emoji: '🀄' }
    ]
  },
  arcade: {
    name: 'Arcade',
    games: [
      { id: 'pac-man', title: 'Pac Man', emoji: '👾' },
      { id: 'space-invaders', title: 'Space Invaders', emoji: '👽' },
      { id: 'breakout', title: 'Breakout', emoji: '🎮' },
      { id: 'dig-dug', title: 'Dig Dug', emoji: '⛏️' },
      { id: 'galaga-game', title: 'Galaga', emoji: '🛸' },
      { id: 'missile-command', title: 'Missile Cmd', emoji: '🎯' },
      { id: 'centipede-game', title: 'Centipede', emoji: '🐛' }
    ]
  },
  casual: {
    name: 'Casual',
    games: [
      { id: 'idle-clicker', title: 'Idle Clicker', emoji: '🖱️' },
      { id: 'cookie-clicker', title: 'Cookie Clicker', emoji: '🍪' },
      { id: 'coin-pusher', title: 'Coin Pusher', emoji: '🪙' },
      { id: 'dino-runner', title: 'Dino Runner', emoji: '🦖' },
      { id: 'frogger-game', title: 'Frogger', emoji: '🐸' },
      { id: 'monkey-jump', title: 'Monkey Jump', emoji: '🐒' },
      { id: 'birdie-game', title: 'Birdie', emoji: '🐦' }
    ]
  }
};

// Generate HTML for each game type
function generateGameHTML(gameId, gameTitle, gameType) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${gameTitle}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: Arial, sans-serif;
            flex-direction: column;
        }
        
        .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        
        h1 {
            color: white;
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        
        .game-area {
            width: 400px;
            height: 400px;
            background: #1a1a1a;
            margin: 20px auto;
            border-radius: 10px;
            border: 3px solid #667eea;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2em;
        }
        
        .stats {
            color: white;
            font-size: 1.2em;
            margin: 20px 0;
        }
        
        .controls {
            margin: 20px 0;
        }
        
        button {
            background: #667eea;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 5px;
            font-size: 1em;
            cursor: pointer;
            margin: 5px;
            transition: all 0.3s;
        }
        
        button:hover {
            background: #764ba2;
            transform: scale(1.05);
        }
        
        .back-btn {
            position: absolute;
            top: 20px;
            left: 20px;
            padding: 8px 15px;
            font-size: 0.9em;
        }
        
        .instructions {
            color: white;
            margin-top: 20px;
            font-size: 0.9em;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <a href="../index.html" class="back-btn">← Back</a>
    <div class="container">
        <h1>${gameTitle} 🎮</h1>
        <div class="stats">
            Score: <span id="score">0</span> | Level: <span id="level">1</span>
        </div>
        <div class="game-area" id="gameArea">
            <div style="font-size: 3em; opacity: 0.5;">🎮</div>
        </div>
        <div class="controls">
            <button onclick="startGame()">Start Game</button>
            <button onclick="pauseGame()">Pause</button>
            <button onclick="resetGame()">Reset</button>
        </div>
        <div class="instructions">
            <p>${gameType === 'casual' ? '⬅️ Use arrow keys to move' : '🎯 Use mouse or keyboard to play'}</p>
        </div>
    </div>
    
    <script>
        let score = 0;
        let level = 1;
        let gameRunning = false;
        let gamePaused = false;
        let gameLoop = null;
        
        function startGame() {
            gameRunning = true;
            gamePaused = false;
            if (gameLoop) clearInterval(gameLoop);
            gameLoop = setInterval(updateGame, 50);
        }
        
        function pauseGame() {
            gamePaused = !gamePaused;
        }
        
        function resetGame() {
            gameRunning = false;
            gamePaused = false;
            if (gameLoop) clearInterval(gameLoop);
            score = 0;
            level = 1;
            updateUI();
        }
        
        function updateGame() {
            if (!gameRunning || gamePaused) return;
            score += Math.floor(Math.random() * 10);
            if (score > level * 1000) level++;
            updateUI();
        }
        
        function updateUI() {
            document.getElementById('score').textContent = score;
            document.getElementById('level').textContent = level;
        }
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (gameRunning) {
                console.log('Key pressed:', e.key);
            }
        });
        
        updateUI();
    </script>
</body>
</html>`;
}

// Create games directory if it doesn't exist
const gamesDir = path.join(__dirname, 'public', 'games');
if (!fs.existsSync(gamesDir)) {
  fs.mkdirSync(gamesDir, { recursive: true });
}

// Generate all games
let totalGames = 0;
for (const category in gameTypes) {
  const games = gameTypes[category].games;
  for (const game of games) {
    const filePath = path.join(gamesDir, `${game.id}.html`);
    const html = generateGameHTML(game.id, game.title, category);
    fs.writeFileSync(filePath, html);
    totalGames++;
  }
}

console.log(`✅ Generated ${totalGames} games!`);
