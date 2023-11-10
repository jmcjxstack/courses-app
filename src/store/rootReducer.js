import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { coursesReducer } from './courses/reducer.js';
import { authorsReducer } from './authors/reducer.js';

export const rootReducer = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer,
});

export const store = configureStore({ reducer: rootReducer });
