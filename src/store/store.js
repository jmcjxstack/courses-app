import { configureStore } from '@reduxjs/toolkit';

import authorsReducer from './authors/authorsSlice';
import coursesReducer from './courses/coursesSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
	reducer: {
		authors: authorsReducer,
		courses: coursesReducer,
		// user: userReducer,
	},
});
