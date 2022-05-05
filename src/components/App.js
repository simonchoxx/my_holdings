import React from 'react';
import { Header } from './Header';
import { PanelApp } from './PanelApp';

export const App = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<Header />
			</div>
			<div className="row">
				<PanelApp />
			</div>
		</div>
	);
};

export default App;
