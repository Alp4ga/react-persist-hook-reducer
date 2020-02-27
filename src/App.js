import React from 'react';
import logo from './logo.svg';
import './App.css';

import { GlobalContext, usePersistentReducer } from './components/react-persist-hook-reducer';

const initialState = {count: 0};

function reducer(state, action) {
	switch (action.type) {
	  case 'increment':
		return {count: state.count + 1};
	  case 'decrement':
		return {count: state.count - 1};
	  default:
		throw new Error();
	}
}

const user = {
	name: 'user',
	reducer: reducer,
	initialState: initialState,
	storageKey: 'dddddd'
}

const other = {
	name: 'other',
	reducer: reducer,
	initialState: initialState,
	storageKey: 'ssssssssssss'
}


function HelloWorld() {
	const [stateUser, dispatchUser] = usePersistentReducer('user');
	const [stateOther, dispatchOther] = usePersistentReducer('other');
	console.log('user:', stateUser);
	console.log('other:', stateOther);
	return (
		<span>
			<button onClick={() => dispatchUser({type: 'increment'})}>+ 1 user</button>
			<button onClick={() => dispatchUser({type: 'decrement'})}>- 1 user</button>
			<button onClick={() => dispatchOther({type: 'increment'})}>+ 1 other</button>
			<button onClick={() => dispatchOther({type: 'decrement'})}>- 1 other</button>
		</span>
	)
}

function App() {
	return (
		<GlobalContext store={user}>
			<GlobalContext store={other}>
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
					Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
					>
					Learn React
					</a>
					<HelloWorld/>
				</header>
			</div>
			</GlobalContext>
		</GlobalContext>
	);
}

export default App;
