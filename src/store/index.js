import { createStore, applyMiddleware } from 'redux';
import { SET_TOKEN, SET_USER } from './types';
import thunk from 'redux-thunk';

const INITIAL_STATE = {
	token: null,
	user: null,
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_TOKEN:
			return { ...state, token: action.payload };

		case SET_USER:
			return { ...state, user: action.payload };

		default:
			return state;
	}
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
