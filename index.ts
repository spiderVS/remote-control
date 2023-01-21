import { httpServer } from './src/http_server/index';
import { startWsServer } from './src/websocket-server/index'

// -------- Static HTTP Server --------- /

const HTTP_PORT = 8181;

httpServer.listen(HTTP_PORT, () => {
  console.log(`Static HTTP Server: Listening on http://localhost:${HTTP_PORT}`);
});

// -------- WS Server --------- /

const WS_PORT = 8080;

startWsServer(WS_PORT);
