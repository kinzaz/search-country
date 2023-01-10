import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOMClient from 'react-dom/client';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
