import { createWebSocketStream, WebSocketServer } from "ws";
import { runCommand } from "../cmd/commands";

export const startWsServer = ( port: number ) => {
  const wsServer = new WebSocketServer({ port: port });

  wsServer.on('listening', () => {
    console.log(`\nWebSocket Server: Listening on ws://localhost:${port}\n`);
  });

  wsServer.on('connection', (ws) => {
    console.log(`WebSocket Server: Client connected`);

    const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

    duplex.on('readable', async () => {
      let data;
      while (null !== (data = duplex.read())) {
        console.log('WebSocket Server <- %s', data);
        const result = await runCommand(data);
        if (result) {
          if (result.startsWith('prnt_scrn')) {
            console.log('WebSocket Server -> prnt_scrn <base64 string (png buf)>');
          } else {
            console.log('WebSocket Server -> %s', result);
          }
          duplex.write(result);

        } else {
          duplex.write(data);
          console.log('WebSocket Server -> %s', data);
        }
      }
    });

    duplex.on('end', () => {
      duplex.end();
    });


    ws.on('close', () => {
      ws.close();
    });

    ws.send('Connected');
  });

  wsServer.on('close', () => {
    console.log('The connection has been closed successfully.');
  });
};
