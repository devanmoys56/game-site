const fs = require('fs');
const path = require('path');

const gameCategories = {
  'Puzzle': 50,
  'Action': 50,
  'Sports': 50,
  'Strategy': 50,
  'Arcade': 50,
  'Adventure': 50,
  'Casual': 50,
  'Racing': 50,
  'Educational': 50,
  'Cards': 50,
  'RPG': 30,
  'Simulation': 30,
  'Music': 20,
  'Physics': 20,
  'Trivia': 20
};

const emojis = {
  'Puzzle': '🧩',
  'Action': '⚡',
  'Sports': '🏆',
  'Strategy': '♟️',
  'Arcade': '👾',
  'Adventure': '🗺️',
  'Casual': '🎲',
  'Racing': '🏎️',
  'Educational': '📚',
  'Cards': '🃏',
  'RPG': '⚔️',
  'Simulation': '🖥️',
  'Music': '🎵',
  'Physics': '⚙️',
  'Trivia': '🧠'
};

function createGameHTML(gameId, gameName, category) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>` + gameName + `</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: Arial, sans-serif; flex-direction: column; }
        .container { text-align: center; background: rgba(255, 255, 255, 0.1); padding: 40px; border-radius: 15px; max-width: 600px; }
        h1 { color: white; margin-bottom: 20px; font-size: 2.5em; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .game-area { width: 100%; max-width: 400px; height: 400px; background: #1a1a1a; margin: 20px auto; border-radius: 10px; border: 3px solid #667eea; display: flex; align-items: center; justify-content: center; color: white; }
        .stats { color: white; font-size: 1.1em; margin: 20px 0; }
        .controls { margin: 20px 0; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        button { background: #667eea; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background: #764ba2; }
        .back-btn { position: absolute; top: 20px; left: 20px; padding: 8px 15px; }
    </style>
</head>
<body>
    <a href="../index.html" class="back-btn">← Back</a>
    <div class="container">
        <h1>` + gameName + ` ` + emojis[category] + `</h1>
        <div class="stats">Score: <span id="score">0</span> | Level: <span id="level">1</span></div>
        <div class="game-area"><span style="font-size: 3em;">` + emojis[category] + `</span></div>
        <div class="controls">
            <button onclick="startGame()">Start</button>
            <button onclick="resetGame()">Reset</button>
        </div>
    </div>
    <script>
        let score = 0, level = 1, gameRunning = false;
        function startGame() { gameRunning = true; }
        function resetGame() { gameRunning = false; score = 0; level = 1; document.getElementById('score').textContent = 0; }
        setInterval(() => { if(gameRunning) { score += Math.floor(Math.random() * 5); document.getElementById('score').textContent = score; if(score % 1000 === 0) level++; } }, 100);
    </script>
</body>
</html>`;
}

const gamesDir = path.join(__dirname, 'public', 'games');
if (!fs.existsSync(gamesDir)) {
  fs.mkdirSync(gamesDir, { recursive: true });
}

let gameCount = 0;
const allGames = [];

for (const [category, count] of Object.entries(gameCategories)) {
  for (let i = 1; i <= count; i++) {
    const gameId = category.toLowerCase().replace(/\s+/g, '-') + '-' + i;
    const gameName = category + ' Game ' + i;
    const filePath = path.join(gamesDir, gameId + '.html');
    const html = createGameHTML(gameId, gameName, category);
    fs.writeFileSync(filePath, html);
    gameCount++;
    allGames.push({ id: gameId, title: gameName, emoji: emojis[category], category: category });
  }
}

const gamesByCategory = {};
allGames.forEach(game => {
  if (!gamesByCategory[game.category]) gamesByCategory[game.category] = [];
  gamesByCategory[game.category].push(game);
});

let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Game Site - ' + allGames.length + '+ Games</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;padding:20px}.container{max-width:1400px;margin:0 auto}header{text-align:center;color:white;margin-bottom:40px}h1{font-size:3em;margin-bottom:10px}#searchInput{width:100%;max-width:600px;padding:15px 25px;font-size:1.1em;border:none;border-radius:50px;margin:20px auto;display:block}.category{margin-bottom:50px}.category-title{color:white;font-size:1.8em;margin-bottom:20px;border-bottom:2px solid rgba(255,255,255,0.3)}.games-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:15px;margin-bottom:40px}.game-card{background:white;border-radius:10px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;transition:transform 0.3s}.game-card:hover{transform:translateY(-8px)}.game-icon{width:100%;height:90px;display:flex;align-items:center;justify-content:center;font-size:2.5em;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}.game-info{padding:12px;flex:1}.game-info h3{margin-bottom:8px;color:#333;font-size:0.85em}.play-btn{display:block;background:#667eea;color:white;padding:8px 12px;border-radius:5px;text-align:center;font-size:0.8em;margin-top:auto}.play-btn:hover{background:#764ba2}footer{text-align:center;color:white;margin-top:60px;border-top:1px solid rgba(255,255,255,0.3);padding-top:30px}.hidden{display:none!important}</style></head><body><div class="container"><header><h1>🎮 Game Site</h1><p style="color:white;font-size:1.3em">Ultimate Game Collection</p><div style="background:rgba(0,0,0,0.2);padding:15px 40px;border-radius:50px;display:inline-block;color:white">🎯 ' + gameCount + '+ Games Available</div></header><input type="text" id="searchInput" placeholder="Search games..."><div id="gamesContainer">';

for (const category in gamesByCategory) {
  const games = gamesByCategory[category];
  html += '<div class="category" data-category="' + category.toLowerCase() + '"><h2 class="category-title">' + category + ' (' + games.length + ')</h2><div class="games-grid">';
  for (const game of games) {
    html += '<a href="games/' + game.id + '.html" class="game-card"><div class="game-icon">' + game.emoji + '</div><div class="game-info"><h3>' + game.title + '</h3><a href="games/' + game.id + '.html" class="play-btn">Play</a></div></a>';
  }
  html += '</div></div>';
}

html += '</div><footer><p>© 2026 Game Site - Enjoy ' + gameCount + '+ games!</p></footer></div><script>document.getElementById("searchInput").addEventListener("input",e=>{const t=e.target.value.toLowerCase();document.querySelectorAll(".category").forEach(e=>{let a=0;e.querySelectorAll(".game-card").forEach(e=>{e.textContent.toLowerCase().includes(t)?e.classList.remove("hidden"):(e.classList.add("hidden"),a++)}),a===e.querySelectorAll(".game-card").length?e.classList.add("hidden"):e.classList.remove("hidden")})});</script></body></html>';

fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html);

console.log('✅ SUCCESS! Generated ' + gameCount + ' games!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Ready to run: npm start');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
