const http = require('http');
const socketIo = require('socket.io');

// Crie o servidor HTTP
const server = http.createServer();
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const port = 8080;
const DISCOVERY_EVENT = 'playerDiscovery';
const players = {}; // Armazenar informações dos jogadores

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Adicionar o jogador à lista
  players[socket.id] = { id: socket.id, name: `Player ${socket.id.substring(0, 6)}` };

  // Notificar todos os jogadores sobre o novo jogador
  io.emit(DISCOVERY_EVENT, players[socket.id]);

  // Receber mensagens dos jogadores
  socket.on('gameMessage', (message) => {
    console.log('Message received:', message);
    socket.broadcast.emit('gameMessage', message);
  });

  // Evento de desconexão
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);

    // Remover o jogador da lista
    delete players[socket.id];

    // Notificar todos os jogadores sobre a desconexão
    io.emit(DISCOVERY_EVENT, { id: socket.id, disconnected: true });
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
