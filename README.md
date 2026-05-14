# Game Site

A fun collection of HTML games with a Node.js proxy server.

## Games Included

1. **Tic Tac Toe** - Classic strategy game against the computer
2. **Snake Game** - Guide the snake and eat food to grow
3. **Flappy Bird** - Tap to fly through the pipes
4. **Pong** - Two-player paddle game
5. **Memory Match** - Test your memory by matching pairs
6. **2048** - Slide and combine tiles to reach 2048

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

The server will run on `http://localhost:3000`

## Project Structure

```
game-site/
├── server.js           # Express server with proxy
├── package.json        # Node dependencies
└── public/
    ├── index.html      # Main landing page
    └── games/
        ├── tictactoe.html
        ├── snake.html
        ├── flappybird.html
        ├── pong.html
        ├── memory.html
        └── 2048.html
```

## Features

- ✅ Multiple working HTML games
- ✅ Express.js server for static hosting
- ✅ CORS enabled proxy middleware
- ✅ Responsive design
- ✅ Easy to extend with more games

## Proxy Usage

The server includes a proxy endpoint at `/api/proxy` for making external requests. You can modify the target in `server.js`.

## License

MIT
