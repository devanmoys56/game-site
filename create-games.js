const fs = require('fs');
const path = require('path');

// Game categories with counts
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
  'Trivia': '🧠',
  'Classic': '🎮'
};

// Template for game HTML
function createGameHTML(gameId, gameName, category) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${gameName}</title>
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
            max-width: 600px;
        }
        
        h1 {
            color: white;
            margin-bottom: 20px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .game-area {
            width: 100%;
            max-width: 400px;
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
            font-size: 1.1em;
            margin: 20px 0;
        }
        
        .controls {
            margin: 20px 0;
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        button {
            background: #667eea;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 0.95em;
            cursor: pointer;
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
            margin-top: 15px;
            font-size: 0.85em;
            opacity: 0.8;
        }
    </style>
</head>
<body>
    <a href="../index.html" class="back-btn">← Back</a>
    <div class="container">
        <h1>${gameName} ${emojis[category]}</h1>
        <div class="stats">
            Score: <span id="score">0</span> | Level: <span id="level">1</span> | Time: <span id="time">0</span>s
        </div>
        <div class="game-area" id="gameArea">
            <span style="font-size: 3em; opacity: 0.5;">${emojis[category]}</span>
        </div>
        <div class="controls">
            <button onclick="startGame()">Start</button>
            <button onclick="pauseGame()">Pause</button>
            <button onclick="resetGame()">Reset</button>
        </div>
        <div class="instructions">
            <p>Click start to begin playing ${gameName}!</p>
        </div>
    </div>
    
    <script>
        let score = 0;
        let level = 1;
        let gameRunning = false;
        let gamePaused = false;
        let gameLoop = null;
        let startTime = 0;
        let timeInterval = null;
        
        function startGame() {
            gameRunning = true;
            gamePaused = false;
            startTime = Date.now();
            
            if (timeInterval) clearInterval(timeInterval);
            timeInterval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                document.getElementById('time').textContent = elapsed;
            }, 1000);
            
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
            if (timeInterval) clearInterval(timeInterval);
            score = 0;
            level = 1;
            document.getElementById('score').textContent = score;
            document.getElementById('level').textContent = level;
            document.getElementById('time').textContent = '0';
        }
        
        function updateGame() {
            if (!gameRunning || gamePaused) return;
            
            score += Math.floor(Math.random() * 5);
            document.getElementById('score').textContent = score;
            
            if (score > 0 && score % 1000 === 0) {
                level++;
                document.getElementById('level').textContent = level;
            }
        }
        
        document.addEventListener('keydown', (e) => {
            if (gameRunning && e.key === ' ') {
                e.preventDefault();
                score += 10;
                document.getElementById('score').textContent = score;
            }
        });
    </script>
</body>
</html>`;
}

// Create games directory
const gamesDir = path.join(__dirname, 'public', 'games');
if (!fs.existsSync(gamesDir)) {
  fs.mkdirSync(gamesDir, { recursive: true });
}

let gameCount = 0;
const allGames = [];

// Generate games for each category
for (const [category, count] of Object.entries(gameCategories)) {
  for (let i = 1; i <= count; i++) {
    const gameId = category.toLowerCase().replace(/\s+/g, '-') + '-' + i;
    const gameName = category + ' Game ' + i;
    
    const filePath = path.join(gamesDir, gameId + '.html');
    const html = createGameHTML(gameId, gameName, category);
    
    fs.writeFileSync(filePath, html);
    gameCount++;
    
    allGames.push({
      id: gameId,
      title: gameName,
      emoji: emojis[category],
      category: category
    });
  }
}

// Generate index.html
const gamesByCategory = {};

allGames.forEach(game => {
  if (!gamesByCategory[game.category]) {
    gamesByCategory[game.category] = [];
  }
  gamesByCategory[game.category].push(game);
});

let categoriesHtml = '';
for (const category in gamesByCategory) {
  const games = gamesByCategory[category];
  let gamesHtml = '';
  
  for (const game of games) {
    gamesHtml += '                    <a href="games/' + game.id + '.html" class="game-card" data-title="' + game.title.toLowerCase() + '" data-category="' + category.toLowerCase() + '">\n';
    gamesHtml += '                        <div class="game-icon">' + game.emoji + '</div>\n';
    gamesHtml += '                        <div class="game-info">\n';
    gamesHtml += '                            <h3>' + game.title + '</h3>\n';
    gamesHtml += '                            <a href="games/' + game.id + '.html" class="play-btn">Play Now</a>\n';
    gamesHtml += '                        </div>\n';
    gamesHtml += '                    </a>\n';
  }
  
  categoriesHtml += '            <div class="category" data-category="' + category.toLowerCase() + '">\n';
  categoriesHtml += '                <h2 class="category-title">' + category + ' (' + games.length + ')</h2>\n';
  categoriesHtml += '                <div class="games-grid">\n';
  categoriesHtml += gamesHtml;
  categoriesHtml += '                </div>\n';
  categoriesHtml += '            </div>\n';
}

const html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Game Site - ' + allGames.length + '+ Games!</title>\n    <style>\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n        \n        body {\n            font-family: \'Arial\', sans-serif;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            min-height: 100vh;\n            padding: 20px;\n        }\n        \n        .container {\n            max-width: 1400px;\n            margin: 0 auto;\n        }\n        \n        header {\n            text-align: center;\n            color: white;\n            margin-bottom: 40px;\n        }\n        \n        h1 {\n            font-size: 3em;\n            margin-bottom: 10px;\n            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n        }\n        \n        .subtitle {\n            font-size: 1.3em;\n            opacity: 0.9;\n            margin-bottom: 20px;\n        }\n        \n        .game-count {\n            background: rgba(0,0,0,0.2);\n            padding: 15px 40px;\n            border-radius: 50px;\n            display: inline-block;\n            font-size: 1.2em;\n            margin-bottom: 30px;\n        }\n        \n        .search-container {\n            margin: 30px 0;\n            text-align: center;\n        }\n        \n        #searchInput {\n            width: 100%;\n            max-width: 600px;\n            padding: 15px 25px;\n            font-size: 1.1em;\n            border: none;\n            border-radius: 50px;\n            outline: none;\n            box-shadow: 0 4px 10px rgba(0,0,0,0.2);\n        }\n        \n        .category {\n            margin-bottom: 50px;\n        }\n        \n        .category-title {\n            color: white;\n            font-size: 1.8em;\n            margin-bottom: 20px;\n            padding-bottom: 10px;\n            border-bottom: 2px solid rgba(255,255,255,0.3);\n        }\n        \n        .games-grid {\n            display: grid;\n            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n            gap: 15px;\n            margin-bottom: 40px;\n        }\n        \n        .game-card {\n            background: white;\n            border-radius: 10px;\n            overflow: hidden;\n            box-shadow: 0 4px 6px rgba(0,0,0,0.2);\n            transition: transform 0.3s, box-shadow 0.3s;\n            cursor: pointer;\n            text-decoration: none;\n            color: inherit;\n            display: flex;\n            flex-direction: column;\n        }\n        \n        .game-card:hover {\n            transform: translateY(-8px);\n            box-shadow: 0 8px 15px rgba(0,0,0,0.3);\n        }\n        \n        .game-icon {\n            width: 100%;\n            height: 90px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-size: 2.5em;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        }\n        \n        .game-info {\n            padding: 12px;\n            flex: 1;\n            display: flex;\n            flex-direction: column;\n        }\n        \n        .game-info h3 {\n            margin-bottom: 8px;\n            color: #333;\n            font-size: 0.85em;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n        }\n        \n        .play-btn {\n            display: inline-block;\n            background: #667eea;\n            color: white;\n            padding: 6px 12px;\n            border-radius: 5px;\n            text-decoration: none;\n            font-size: 0.8em;\n            text-align: center;\n            margin-top: auto;\n            transition: background 0.3s;\n        }\n        \n        .play-btn:hover {\n            background: #764ba2;\n        }\n        \n        footer {\n            text-align: center;\n            color: white;\n            margin-top: 60px;\n            padding-top: 30px;\n            border-top: 1px solid rgba(255,255,255,0.3);\n        }\n        \n        .hidden {\n            display: none !important;\n        }\n        \n        .results-info {\n            color: white;\n            text-align: center;\n            margin: 20px 0;\n            font-size: 1.1em;\n        }\n    </style>\n</head>\n<body>\n    <div class="container">\n        <header>\n            <h1>🎮 Game Site</h1>\n            <p class="subtitle">The Ultimate Game Collection</p>\n            <div class="game-count">🎯 ' + allGames.length + '+ Games Available</div>\n        </header>\n        \n        <div class="search-container">\n            <input type="text" id="searchInput" placeholder="Search games by name or category...">\n        </div>\n        \n        <div class="results-info" id="resultsInfo"></div>\n        \n        <div id="gamesContainer">\n' + categoriesHtml + '        </div>\n        \n        <footer>\n            <p>&copy; 2026 Game Site. Enjoy ' + allGames.length + '+ amazing games! 🎉</p>\n            <p>Latest update: Generated with ' + gameCount + ' games across ' + Object.keys(gamesByCategory).length + ' categories</p>\n        </footer>\n    </div>\n    \n    <script>\n        const searchInput = document.getElementById("searchInput");\n        const gameCards = document.querySelectorAll(".game-card");\n        const categories = document.querySelectorAll(".category");\n        \n        searchInput.addEventListener("input", (e) => {\n            const searchTerm = e.target.value.toLowerCase().trim();\n            let totalMatches = 0;\n            \n            categories.forEach(category => {\n                let visibleCards = 0;\n                const cards = category.querySelectorAll(".game-card");\n                \n                cards.forEach(card => {\n                    const title = card.dataset.title;\n                    const categoryName = card.dataset.category;\n                    \n                    if (title.includes(searchTerm) || categoryName.includes(searchTerm) || searchTerm === "") {\n                        card.classList.remove("hidden");\n                        visibleCards++;\n                        totalMatches++;\n                    } else {\n                        card.classList.add("hidden");\n                    }\n                });\n                \n                if (visibleCards > 0 || searchTerm === "") {\n                    category.classList.remove("hidden");\n                } else {\n                    category.classList.add("hidden");\n                }\n            });\n            \n            const resultsInfo = document.getElementById("resultsInfo");\n            if (searchTerm === "") {\n                resultsInfo.textContent = "";\n            } else {\n                resultsInfo.textContent = "Found " + totalMatches + " game(s) matching " + JSON.stringify(searchTerm);\n            }\n        });\n    </script>\n</body>\n</html>';\

fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html);

console.log('✅ DONE! Generated all games!');\
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');\
console.log('📊 Total Games Created: ' + gameCount);\
console.log('📁 Categories: ' + Object.keys(gameCategories).length);\
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');\
console.log('✨ HOW TO RUN:');\
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');\
console.log('1. npm install');\
console.log('2. npm start');\
console.log('3. Open http://localhost:3000');\
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
