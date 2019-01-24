import serverConfig from './config';
import { Server } from './server';

const driver = async () => {
  // Create server
  const server = new Server(serverConfig);

  // Server set up
  await server.initialiseServices();
  await server.configureServer();

  // Start the server
  server.start();
};

// tslint:disable:no-console
driver().catch(console.error);
