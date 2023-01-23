import { createWebSocketStream, WebSocketServer } from "ws";
import { runCommand } from "../cmd/commands";
import { httpServer } from '../http_server/index';

export const startWsServer = ( port: number ) => {
  let isSIGINT = false;

  const wsServer = new WebSocketServer({ port: port });

  wsServer.on('listening', () => {
    console.log(`\nWebSocket Server: Listening on ws://localhost:${port}\n`);
  });

  wsServer.on('close', () => {
    console.log('WebSocketServer has been closed successfully.\n');
    httpServer.close();
  });

  wsServer.on('connection', (ws) => {

    const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
    console.log(`WebSocket Server: Client connected\n`);
    duplex.write('Connected');

    duplex.on('readable', async () => {
      let data;
      while (null !== (data = duplex.read())) {
        console.log('WebSocket Server <- %s', data);
        const result = await runCommand(data);
        if (result) {
          if (result.startsWith('prnt_scrn')) {
            console.log('WebSocket Server -> prnt_scrn <base64 string (png buf)>');
          } else if (result.startsWith('mouse_position')) {
            console.log('WebSocket Server -> %s', result);
          }
          duplex.write(result);

        } else {
          duplex.write(data);
        }
      }
    });

    duplex.on('end', () => {
      duplex.end();
    });

    ws.on('close', (code, reason) => {
      console.log('WebSocket has been closed sucessfully.');
      if (isSIGINT) {
        wsServer.close();
      }
    });

    process.on('SIGINT', () => {
      ws.close();
      isSIGINT = true;
    });
  });

};
