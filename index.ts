import { httpServer } from './src/http_server/index';
import { startWsServer } from './src/websocket-server/index';
import dotenv from "dotenv";

// -------- Static HTTP Server --------- /

const HTTP_PORT = 8181;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Static HTTP Server: Listening on http://localhost:${HTTP_PORT}`);
});

httpServer.on('close', () => {
  console.log('- HTTP Server has been closed successfully.\nExiting...');
  process.exit(0);
})

// -------- WS Server --------- /

dotenv.config();
export const WS_PORT = process.env.PORT ? +process.env.PORT : 8080;

startWsServer(WS_PORT);
