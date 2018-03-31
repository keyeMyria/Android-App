import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import appReducers from './reducers/index';
import thunk from 'redux-thunk';
import AppRedux from './AppRedux';


const store = createStore(
	appReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__.connect,
	applyMiddleware(thunk)
);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<AppRedux />
			</Provider>
		);
	}
}
