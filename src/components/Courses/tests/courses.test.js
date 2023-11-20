import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Courses from '../Courses';

const mockStore = configureStore([thunk]);

describe('Courses Component Tests', () => {
	it('should display CourseCard amount of CourseCard equal length of courses array', () => {
		const store = mockStore({
			courses: {
				courses: [
					{
						id: '1',
						title: 'Course 1',
						description: 'Description 1',
						duration: 60,
						creationDate: '18/11/2023',
						authors: ['1', '2'],
					},
				],
			},
			authors: {
				authors: [
					{ id: '1', name: 'author1' },
					{ id: '2', name: 'author2' },
				],
			},
			user: {
				role: 'admin',
			},
		});

		render(
			<Provider store={store}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText('Course 1')).toBeInTheDocument();
	});

	it('should show CourseForm after clicking "Add new course" button', () => {
		const store = mockStore({
			courses: {
				courses: [
					{
						id: '1',
						title: 'Course 1',
						description: 'Description 1',
						duration: 60,
						creationDate: '18/11/2023',
						authors: ['1', '2'],
					},
				],
			},
			authors: {
				authors: [
					{ id: '1', name: 'author1' },
					{ id: '2', name: 'author2' },
				],
			},
			user: {
				role: 'admin',
			},
		});

		render(
			<Provider store={store}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);

		const addCourseButton = screen.getByText('Add new course');
		fireEvent.click(addCourseButton);

		expect(screen.getByText('Add new course')).toBeInTheDocument();
	});
});
