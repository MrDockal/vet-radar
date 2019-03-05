import * as express from 'express';
import * as http from 'http';

export type ExpressApp = express.Express;

export function createHttpServer(
	options: {
		ports: {
			port: any;
		};
	}
) {
	const app: ExpressApp = express();
	const httpServer = http.createServer(app);

	return {
		app,
		http: httpServer,
		listen() {
			httpServer.listen(options.ports.port, (error: Error) => {
				if (error) {
					console.error(error);
				} else {
					console.info('Server running on server port ' + options.ports.port);
				}
			});
		},
		close() {
			httpServer.close();
		}
	};
}
