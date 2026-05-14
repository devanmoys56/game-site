const fs = require('fs');
const path = require('path');

// Create public/games directory
const dir = path.join(__dirname, 'public', 'games');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Simple game HTML
function makeGame(name) {
  let html = '<html><head><title>' + name + '</title>';
  html += '<style>body{background:linear-gradient(135deg,#667eea,#764ba2);display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:Arial}';
  html += '.box{background:white;padding:40px;border-radius:10px;text-align:center}h1{margin:0}button{padding:10px 20px;background:#667eea;color:white;border:none;border-radius:5px;cursor:pointer;margin:10px}a{position:absolute;top:20px;left:20px;color:white;text-decoration:none}</style>';
  html += '</head><body><a href="../index.html">Back</a><div class="box"><h1>' + name + '</h1><button>Start Game</button></div></body></html>';
  return html;
}

// Create 625 games
let count = 0;
let games = [];

const categories = ['Puzzle', 'Action', 'Sports', 'Strategy', 'Arcade', 'Adventure', 'Casual', 'Racing', 'Educational', 'Cards', 'RPG', 'Simulation', 'Music', 'Physics', 'Trivia'];
const counts = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 30, 30, 20, 20, 20];

for (let j = 0; j < categories.length; j++) {
  const cat = categories[j];
  const num = counts[j];
  for (let i = 1; i <= num; i++) {
    const id = cat.toLowerCase() + '-' + i;
    const name = cat + ' ' + i;
    const file = path.join(dir, id + '.html');
    fs.writeFileSync(file, makeGame(name));
    games.push({ id: id, name: name, cat: cat });
    count++;
  }
}

// Create index.html
let index = '<html><head><title>Game Site - ' + count + ' Games</title>';
index += '<style>body{background:linear-gradient(135deg,#667eea,#764ba2);font-family:Arial;padding:20px;margin:0}';
index += 'h1{color:white;text-align:center}input{display:block;width:90%;max-width:500px;margin:20px auto;padding:10px;border:none;border-radius:20px;font-size:1em}';
index += '.cat{max-width:1200px;margin:30px auto}h2{color:white;border-bottom:2px solid white}';
index += '.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:15px}';
index += 'a{background:white;padding:15px;border-radius:10px;text-decoration:none;color:#333;text-align:center}a:hover{transform:scale(1.05)}';
index += '</style></head><body>';
index += '<h1>Game Site - ' + count + ' Games</h1>';
index += '<input id="s" placeholder="Search games..." onkeyup="search()">';
index += '<div id="games">';

// Group games by category
let bycat = {};
for (let g of games) {
  if (!bycat[g.cat]) bycat[g.cat] = [];
  bycat[g.cat].push(g);
}

// Add games to index
for (let c in bycat) {
  index += '<div class="cat" data-cat="' + c.toLowerCase() + '">';
  index += '<h2>' + c + '</h2>';
  index += '<div class="grid">';
  for (let g of bycat[c]) {
    index += '<a href="games/' + g.id + '.html" data-name="' + g.name.toLowerCase() + '">' + g.name + '</a>';
  }
  index += '</div></div>';
}

index += '</div>';
index += '<script>function search(){let q=document.getElementById("s").value.toLowerCase();document.querySelectorAll("a[data-name]").forEach(a=>{a.style.display=a.getAttribute("data-name").includes(q)?"":"none"})}</script>';
index += '</body></html>';

fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), index);

console.log('Done! Created ' + count + ' games');
