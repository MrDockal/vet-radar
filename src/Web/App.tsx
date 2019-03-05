import * as React from 'react';

export interface IAppProps {
	config: {
		baseURL: string;
	}
}

const App = (_props: IAppProps) => {
	return (
		<h1>Hello</h1>
	);
};

export default App;
