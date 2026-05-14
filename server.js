const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint for external requests
app.use('/api/proxy', createProxyMiddleware({
  target: 'http://example.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': ''
  },
  onError: (err, req, res) => {
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Serve the main index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Game Site running on http://localhost:${PORT}`);
});
