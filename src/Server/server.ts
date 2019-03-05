import { createHttpServer } from "./serverFactory/createHttpServer";
import { createApplicationRouter } from "./routes/applicationRouter";
const parameters = require('../../configs/parameters');

const httpServer = createHttpServer({ports: {port: parameters.server.port}});

(async function() {
	createApplicationRouter(httpServer.app, parameters.paths.distPath);
	httpServer.listen();
})();

const stopServer = () => {
	console.info('Server is stopping');
	httpServer.close();
	process.exit(0);
};

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);
process.on('uncaughtException', (error: Error) => console.error(error));
process.on('unhandledRejection', (error: Error) => {
	throw error;
});
