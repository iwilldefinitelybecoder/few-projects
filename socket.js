const http = require('http');
const WebSocket = require('ws');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  res.end('This is a WebSocket server');
});

// Create a new WebSocket server
const wss = new WebSocket.Server({ server });

// Handle incoming WebSocket connections
wss.on('connection', (ws) => {
  // Send a message to the client every second
  setInterval(() => {
    ws.send(JSON.stringify({ message: 'Hello, world!' }));
  }, 1000);
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
