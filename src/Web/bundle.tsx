import * as React from 'react';
import { hydrate } from 'react-dom';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';

const config = {
	baseURL: 'http://localhost:8080/api/v1'
}

hydrate(<BrowserRouter><App config={config}/></BrowserRouter>, document.getElementById('app'));
