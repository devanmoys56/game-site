const fs = require('fs');
const path = require('path');

const cats = {'Puzzle':50,'Action':50,'Sports':50,'Strategy':50,'Arcade':50,'Adventure':50,'Casual':50,'Racing':50,'Educational':50,'Cards':50,'RPG':30,'Simulation':30,'Music':20,'Physics':20,'Trivia':20};

const dir = path.join(__dirname, 'public', 'games');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});

let count = 0;
let list = [];

for (const c in cats) {
  for (let i = 1; i <= cats[c]; i++) {
    const id = c.toLowerCase().replace(/ /g,'-') + '-' + i;
    const nm = c + ' Game ' + i;
    const html = '<html><head><title>' + nm + '</title><style>body{background:#667eea;display:flex;align-items:center;justify-content:center;height:100vh;font-family:Arial;margin:0}div{background:rgba(255,255,255,0.1);padding:40px;border-radius:10px;text-align:center}h1{color:white}button{background:#667eea;color:white;border:0;padding:10px 20px;margin:5px;border-radius:5px;cursor:pointer}a{color:white;text-decoration:none;position:absolute;top:20px;left:20px}</style></head><body><a href="../index.html">Back</a><div><h1>' + nm + '</h1><button onclick="alert(\'Playing!\')">Start</button></div></body></html>';
    fs.writeFileSync(path.join(dir, id + '.html'), html);
    list.push({id:id, nm:nm, c:c});
    count++;
  }
}

let html2 = '<html><head><title>Game Site</title><style>body{background:#667eea;font-family:Arial;padding:20px}h1{color:white;text-align:center}input{display:block;margin:20px auto;width:90%;max-width:500px;padding:10px;border:0;border-radius:20px}.cat{max-width:1200px;margin:30px auto}h2{color:white}a{background:white;display:inline-block;width:140px;margin:10px;padding:15px;border-radius:10px;text-decoration:none;color:#333;text-align:center;vertical-align:top}.ico{font-size:2.5em;margin-bottom:10px}</style></head><body><h1>Game Site - ' + count + ' Games</h1><input id="q" placeholder="Search..."><div id="c">';

const grp = {};
for (const g of list) {
  if (!grp[g.c]) grp[g.c] = [];
  grp[g.c].push(g);
}

for (const c in grp) {
  html2 += '<div class="cat"><h2>' + c + '</h2>';
  for (const g of grp[c]) {
    html2 += '<a href="games/' + g.id + '.html"><div class="ico">G</div>' + g.nm + '</a>';
  }
  html2 += '</div>';
}

html2 += '</div></body></html>';

fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html2);

console.log('SUCCESS: ' + count + ' games created');
