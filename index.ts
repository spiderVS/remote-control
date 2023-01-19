import { WebSocketServer } from 'ws';
import { httpServer } from './src/http_server/index';
import { parseCommand } from './src/helpers/helpers';
import { mouseHandler } from './src/mouse/mouse-handler';
import { drawHandler } from './src/draw/draw'
import { mouse } from '@nut-tree/nut-js';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

// ==== WS Server ==== //

const WS_PORT = 8080;

const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on('connection', (ws) => {
  console.log(`WebSocket Server: Someone connected to ws://localhost:${WS_PORT}`);
  ws.on('message', async (data) => {
    console.log('WebSocket Server received: %s', data);

    const [ command, arg1, arg2 ] = parseCommand(data.toString());

    if (command === 'mouse_up' ||
        command === 'mouse_down' ||
        command === 'mouse_left' ||
        command === 'mouse_right'
    ) {
      arg1 && mouseHandler(command, arg1);
      ws.send(`${data}`);
    } else if (command === 'mouse_position') {
      ws.send(await mouseHandler(command) as string);
    } else if (command.startsWith('draw')) {
      await drawHandler(command, arg1, arg2);
    }

  });

  ws.send('Connected');
});

wsServer.on('close', () => {});
