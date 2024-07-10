const WebSocket = require('ws');

// Função para iniciar o servidor WebSocket
const startServer = () => {
  const port = 8080; // Considerar usar uma variável de ambiente para configuração
  const server = new WebSocket.Server({ port });
  let clients = [];

  console.log(`WebSocket server is running on ws://localhost:${port}`);

  // Evento de conexão com o WebSocket
  server.on('connection', (ws) => {
    console.log('New client connected');
    clients.push(ws);

    // Evento de recebimento de mensagem
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);

        // Validação simples de mensagem
        if (data.type && data.type === 'CHOICE' && data.choice) {
          // Broadcast the message to all other clients
          clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(data));
            }
          });
        } else {
          console.log('Invalid message format');
        }
      } catch (e) {
        console.error('Error parsing message:', e);
      }
    });

    // Evento de fechamento da conexão
    ws.on('close', () => {
      console.log('Client disconnected');
      clients = clients.filter(client => client !== ws);
    });

    // Evento de erro
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });
};

// Chamar a função para iniciar o servidor
startServer();
