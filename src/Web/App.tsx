import * as React from 'react';
import { CartContext } from './Context/CartContext';
import { HomePage } from './Containers/Pages/HomePage';
import { CartPage } from './Containers/Pages/CartPage';
import { Header } from './Containers/Header/Header';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './Model/theme';
const products = require('../data/products.json');

export interface IAppProps {
	config: {
		baseURL: string;
	}
}

const App = (_props: IAppProps) => {
	return (
		<ThemeProvider theme={theme}>
			<CartContext>
				<Header/>
				<Switch>
					<Route path="/" exact={true}>
						<HomePage products={products} />
					</Route>
					<Route path="/cart" exact={true}>
						<CartPage/>
					</Route>
				</Switch>
			</CartContext>
		</ThemeProvider>
	);
};

export default App;
