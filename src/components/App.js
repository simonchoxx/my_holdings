import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Header } from './Header';
import { PanelApp } from './PanelApp';

export const App = () => {
	return (
		<Container fluid>
			<Row>
				<Header></Header>
			</Row>
			<Row>
				<PanelApp></PanelApp>
			</Row>
		</Container>
	);
};

export default App;
