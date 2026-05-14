const fs = require('fs');
const path = require('path');

// Game library
const games = [
  // Puzzle Games (50+)
  ...Array(50).fill(0).map((_, i) => ({ id: `puzzle-${i+1}`, title: `Puzzle Quest ${i+1}`, emoji: '🧩', category: 'Puzzle' })),
  
  // Action Games (50+)
  ...Array(50).fill(0).map((_, i) => ({ id: `action-${i+1}`, title: `Action Rush ${i+1}`, emoji: '⚡', category: 'Action' })),
  
  // Sports Games (50+)
  ...Array(50).fill(0).map((_, i) => ({ id: `sport-${i+1}`, title: `Sports ${i+1}`, emoji: '🏆', category: 'Sports' })),
  
  // Strategy Games (50+)
  ...Array(50).fill(0).map((_, i) => ({ id: `strategy-${i+1}`, title: `Strategy Master ${i+1}`, emoji: '♟️', category: 'Strategy' })),
  
  // Arcade Games (50+)
  ...Array(50).fill(0).map((_, i) => ({ id: `arcade-${i+1}`, title: `Arcade Classic ${i+1}`, emoji: '👾', category: 'Arcade' })),
  
  // Adventure Games (50+)
  ...Array(50).fill(0).map((_, i) => ({ id: `adventure-${i+1}`, title: `Adventure ${i+1}`, emoji: '🗺️', category: 'Adventure' })),
  
  // Casual Games (50+)
  ...Array(50).fill(0).map((_, i) => ({ id: `casual-${i+1}`, title: `Casual Fun ${i+1}`, emoji: '🎲', category: 'Casual' })),
  
  // Racing Games (50+)
  ...Array(50).fill(0).map((_, i) => ({ id: `racing-${i+1}`, title: `Race ${i+1}`, emoji: '🏎️', category: 'Racing' })),
  
  // Educational Games (50+)
  ...Array(50).fill(0).map((_, i) => ({ id: `edu-${i+1}`, title: `Learn & Play ${i+1}`, emoji: '📚', category: 'Educational' })),
  
  // Card Games (50+)
  ...Array(50).fill(0).map((_, i) => ({ id: `card-${i+1}`, title: `Card Game ${i+1}`, emoji: '🂡', category: 'Cards' })),
  
  // RPG Games (30+)
  ...Array(30).fill(0).map((_, i) => ({ id: `rpg-${i+1}`, title: `RPG Quest ${i+1}`, emoji: '⚔️', category: 'RPG' })),
  
  // Simulation Games (30+)
  ...Array(30).fill(0).map((_, i) => ({ id: `sim-${i+1}`, title: `Simulator ${i+1}`, emoji: '🎛️', category: 'Simulation' })),
  
  // Music Games (20+)
  ...Array(20).fill(0).map((_, i) => ({ id: `music-${i+1}`, title: `Music Beat ${i+1}`, emoji: '🎵', category: 'Music' })),
  
  // Physics Games (20+)
  ...Array(20).fill(0).map((_, i) => ({ id: `physics-${i+1}`, title: `Physics ${i+1}`, emoji: '⚙️', category: 'Physics' })),
  
  // Trivia Games (20+)
  ...Array(20).fill(0).map((_, i) => ({ id: `trivia-${i+1}`, title: `Trivia ${i+1}`, emoji: '🧠', category: 'Trivia' })),

  // Original Games
  { id: 'tictactoe', title: 'Tic Tac Toe', emoji: '⭕', category: 'Classic' },
  { id: 'snake', title: 'Snake Game', emoji: '🐍', category: 'Classic' },
  { id: 'flappybird', title: 'Flappy Bird', emoji: '🚀', category: 'Classic' },
  { id: 'pong', title: 'Pong', emoji: '🎾', category: 'Classic' },
  { id: 'memory', title: 'Memory Match', emoji: '🧠', category: 'Classic' },
  { id: '2048', title: '2048', emoji: '🎯', category: 'Classic' }
];

// Group games by category
const gamesByCategory = {};
games.forEach(game => {
  if (!gamesByCategory[game.category]) {
    gamesByCategory[game.category] = [];
  }
  gamesByCategory[game.category].push(game);
});

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Site - ${games.length}+ Games!</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            color: white;
            margin-bottom: 40px;
        }
        
        h1 {
            font-size: 3em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .subtitle {
            font-size: 1.2em;
            opacity: 0.9;
            margin-bottom: 20px;
        }
        
        .game-count {
            background: rgba(0,0,0,0.2);
            padding: 15px 30px;
            border-radius: 50px;
            display: inline-block;
            font-size: 1.1em;
        }
        
        .search-container {
            margin: 30px 0;
            text-align: center;
        }
        
        #searchInput {
            width: 100%;
            max-width: 500px;
            padding: 12px 20px;
            font-size: 1em;
            border: none;
            border-radius: 50px;
            outline: none;
        }
        
        .category {
            margin-bottom: 50px;
        }
        
        .category-title {
            color: white;
            font-size: 1.8em;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(255,255,255,0.3);
        }
        
        .games-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 15px;
            margin-bottom: 40px;
        }
        
        .game-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            transition: transform 0.3s, box-shadow 0.3s;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
        }
        
        .game-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 15px rgba(0,0,0,0.3);
        }
        
        .game-icon {
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5em;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .game-info {
            padding: 12px;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .game-info h3 {
            margin-bottom: 8px;
            color: #333;
            font-size: 0.9em;
        }
        
        .play-btn {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 6px 12px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 0.85em;
            text-align: center;
            margin-top: auto;
        }
        
        .play-btn:hover {
            background: #764ba2;
        }
        
        footer {
            text-align: center;
            color: white;
            margin-top: 60px;
            padding-top: 30px;
            border-top: 1px solid rgba(255,255,255,0.3);
        }
        
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🎮 Game Site</h1>
            <p class="subtitle">Ultimate Game Collection</p>
            <div class="game-count">🎯 ${games.length}+ Games Available</div>
        </header>
        
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search games...">
        </div>
        
        <div id="gamesContainer">
${Object.entries(gamesByCategory).map(([category, categoryGames]) => `
            <div class="category" data-category="${category}">
                <h2 class="category-title">${category} (${categoryGames.length})</h2>
                <div class="games-grid">
${categoryGames.map(game => `
                    <a href="games/${game.id}.html" class="game-card" data-title="${game.title.toLowerCase()}">
                        <div class="game-icon">${game.emoji}</div>
                        <div class="game-info">
                            <h3>${game.title}</h3>
                            <a href="games/${game.id}.html" class="play-btn">Play</a>
                        </div>
                    </a>
`).join('')}
                </div>
            </div>
`).join('')}
        </div>
        
        <footer>
            <p>&copy; 2026 Game Site. Enjoy ${games.length}+ amazing games!</p>
        </footer>
    </div>
    
    <script>
        const searchInput = document.getElementById('searchInput');
        const gameCards = document.querySelectorAll('.game-card');
        const categories = document.querySelectorAll('.category');
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            let visibleCategories = 0;
            
            categories.forEach(category => {
                let visibleCards = 0;
                const cards = category.querySelectorAll('.game-card');
                
                cards.forEach(card => {
                    const title = card.dataset.title;
                    if (title.includes(searchTerm)) {
                        card.classList.remove('hidden');
                        visibleCards++;
                    } else {
                        card.classList.add('hidden');
                    }
                });
                
                if (visibleCards > 0) {
                    category.classList.remove('hidden');
                    visibleCategories++;
                } else {
                    category.classList.add('hidden');
                }
            });
        });
    </script>
</body>
</html>`;

// Write to file
fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html);
console.log(`✅ Generated index.html with ${games.length} games organized in ${Object.keys(gamesByCategory).length} categories!`);
