import * as React from 'react';
import { hydrate } from 'react-dom';
import App from "./App";

const config = {
	baseURL: 'http://localhost:8080/api/v1'
}

hydrate(<App config={config}/>, document.getElementById('app'));
