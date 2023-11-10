import { ADD_AUTHOR, DELETE_AUTHOR, SAVE_AUTHORS } from './types';

export const addAuthorAction = (payload) => ({ type: ADD_AUTHOR, payload });
export const deleteAuthorAction = (payload) => ({
	type: DELETE_AUTHOR,
	payload,
});
export const saveAuthorsAction = (payload) => ({ type: SAVE_AUTHORS, payload });
