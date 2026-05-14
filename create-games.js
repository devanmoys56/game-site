const fs = require('fs');
const path = require('path');

const categories = {'Puzzle':50,'Action':50,'Sports':50,'Strategy':50,'Arcade':50,'Adventure':50,'Casual':50,'Racing':50,'Educational':50,'Cards':50,'RPG':30,'Simulation':30,'Music':20,'Physics':20,'Trivia':20};
const emojis = {'Puzzle':'🧩','Action':'⚡','Sports':'🏆','Strategy':'♟️','Arcade':'👾','Adventure':'🗺️','Casual':'🎲','Racing':'🏎️','Educational':'📚','Cards':'🃏','RPG':'⚔️','Simulation':'🖥️','Music':'🎵','Physics':'⚙️','Trivia':'🧠'};

function makeGame(id, name, cat) {
  return '<html><head><title>' + name + '</title><style>body{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;justify-content:center;align-items:center;height:100vh;font-family:Arial;margin:0}div{text-align:center;background:rgba(0,0,0,0.2);padding:40px;border-radius:10px}h1{color:white;margin:0}button{background:#667eea;color:white;border:0;padding:10px 20px;margin:5px;border-radius:5px;cursor:pointer}a{color:white;position:absolute;top:20px;left:20px}</style></head><body><a href="../index.html">Back</a><div><h1>' + name + ' ' + emojis[cat] + '</h1><p style="color:white">Score: 0</p><button onclick="alert(\'Game!\')">Start</button></div></body></html>';
}

const dir = path.join(__dirname, 'public', 'games');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});

let count = 0;
let games = [];

for (const cat in categories) {
  for (let i = 1; i <= categories[cat]; i++) {
    const id = cat.toLowerCase().replace(/ /g, '-') + '-' + i;
    const name = cat + ' Game ' + i;
    fs.writeFileSync(path.join(dir, id + '.html'), makeGame(id, name, cat));
    games.push({id, name, emoji: emojis[cat], cat});
    count++;
  }
}

let cats = {};
games.forEach(g => {
  if (!cats[g.cat]) cats[g.cat] = [];
  cats[g.cat].push(g);
});

let idx = '<html><head><title>Game Site</title><style>body{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);font-family:Arial;padding:20px}h1{color:white;text-align:center}input{display:block;margin:20px auto;width:90%;max-width:500px;padding:10px;border-radius:20px;border:0;font-size:1em}.cat{margin:30px 0;max-width:1200px;margin-left:auto;margin-right:auto}h2{color:white;border-bottom:2px solid rgba(255,255,255,0.3);padding-bottom:10px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:15px}a{background:white;padding:15px;border-radius:10px;text-decoration:none;color:#333;text-align:center;transition:all 0.3s}.grid a:hover{transform:translateY(-5px);box-shadow:0 5px 15px rgba(0,0,0,0.3)}.ico{font-size:2em;margin-bottom:10px}footer{text-align:center;color:white;margin-top:50px}</style></head><body><h1>🎮 Game Site - ' + count + '+ Games</h1><input id="s" placeholder="Search..." onkeyup="search()"><div id="c">';

for (const cat in cats) {
  idx += '<div class="cat" data-c="' + cat.toLowerCase() + '"><h2>' + cat + ' (' + cats[cat].length + ')</h2><div class="grid">';
  for (const g of cats[cat]) {
    idx += '<a href="games/' + g.id + '.html"><div class="ico">' + g.emoji + '</div>' + g.name + '</a>';
  }
  idx += '</div></div>';
}

idx += '</div><footer>Created with ' + count + ' games</footer><script>function search(){const v=document.getElementById("s").value.toLowerCase();document.querySelectorAll(".cat").forEach(c=>{let show=0;c.querySelectorAll("a").forEach(a=>{if(a.textContent.toLowerCase().includes(v)){a.style.display="";show++;}else a.style.display="none"});c.style.display=show?"":"none"})}</script></body></html>';

fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), idx);

console.log('Done! ' + count + ' games created');
