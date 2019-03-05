import * as React from 'react';
import App from '../../Web/App';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { html } from '../html';
import * as cors from 'cors';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter, StaticRouterContext } from 'react-router';

export const createApplicationRouter = (
	app: express.Application,
	staticPath: string,
) => {
	app.use(cors());
	app.use(express.static(staticPath));

	const apiRoute = '/api/v1';
	const reactAppRouting = (req: express.Request, res: express.Response) => {
		const sheet = new ServerStyleSheet();
		const context: StaticRouterContext = {};
		const body = renderToString(sheet.collectStyles(
			<StaticRouter
				location={req.url}
				context={context}
			>
				<App config={{ baseURL: apiRoute }} />
			</StaticRouter>
		));
		const styles = sheet.getStyleTags();
		if (context.url) {
			res.writeHead(301, {
				Location: context.url
			});
			res.end();
		} else {
			res.send(
				html({
					body,
					styles,
				})
			);
		}
	};

	const publicRouter = express.Router();
	app.use('/api/v1', publicRouter);

	app.get('/*', reactAppRouting);
};
