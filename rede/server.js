import http from 'http';
import { Server } from 'socket.io';
import os from 'os';

const getLocalIpAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const iface in interfaces) {
    for (const alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost';
};

const port = 8080;
const DISCOVERY_EVENT = 'playerDiscovery';
const players = {}; // Armazenar informações dos jogadores

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

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

const ip = getLocalIpAddress();
server.listen(port, ip, () => {
  console.log(`Server is running on http://${ip}:${port}`);
});
