import { WebSocketServer } from "ws";
import { drawHandler } from "../draw/draw";
import { parseCommand } from "../helpers/helpers";
import { mouseHandler } from "../mouse/mouse";
import { psHandler } from "../ps/printScreen";

export const startWsServer = ( port: number ) => {
  const wsServer = new WebSocketServer({ port: port });

  wsServer.on('listening', () => {
    console.log(`\nWebSocket Server: Listening on ws://localhost:${port}\n`);
  });

  wsServer.on('connection', (ws) => {
    console.log(`WebSocket Server: Client connected`);
    ws.on('message', async (data) => {
      console.log('WebSocket Server <- %s', data);

      const [command, arg1, arg2] = parseCommand(data.toString());

      if (command === 'mouse_up' || command === 'mouse_down' || command === 'mouse_left' || command === 'mouse_right') {
        mouseHandler(command, arg1);
        ws.send(`${data}`);

      } else if (command === 'mouse_position') {
        const posStr = (await mouseHandler(command)) as string;
        ws.send(posStr);
        console.log('WebSocket Server -> %s', posStr);

      } else if (command.startsWith('draw')) {
        await drawHandler(command, arg1, arg2);
        ws.send(`${data}`);

      } else if (command === 'prnt_scrn') {
        const base64stringPNG = await psHandler();
        // console.log('🚀 img:', img);
        ws.send(`prnt_scrn ${base64stringPNG}`);
        console.log('WebSocket Server -> prnt_scrn <base64 string (png buf)>');
        // ws.send(`ps`);
      }
    });

    ws.send('Connected');
  });

  wsServer.on('close', () => {});
};
