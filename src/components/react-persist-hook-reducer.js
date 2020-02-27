import React from 'react';

var reducers = {};

const usePersistReducer = (name, reducer, initialState, key) => {
	if (reducers[name] === undefined) {
		const storage = localStorage.getItem(key);
		reducers[name] = storage !== null ? JSON.parse(storage) : initialState;
	}

	const [state, dispatch] = React.useReducer(reducer, reducers[name]);

	React.useEffect(() => { localStorage.setItem(key, JSON.stringify(state)); });

	return [state, dispatch];
};

var contexts = {}

export const GlobalContext = (props) => {
	const { name, reducer, initialState, storageKey } = props.store;
	const [state, dispatch] = usePersistReducer(name, reducer, initialState, storageKey);
	contexts[name] = React.createContext(null);

	return React.createElement(contexts[name].Provider, { value: [state, dispatch] }, props.children);
}

export const usePersistentReducer = (name) => {
	return React.useContext(contexts[name]);
}