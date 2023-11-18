import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import CourseCard from '../CourseCard';

// Mock the useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn(),
	useSelector: jest.fn(),
}));

// Mock the Button component
jest.mock(
	'../../../../../common/Button/Button',
	() =>
		({ buttonName, onClick }) => (
			<button data-testid={`button-mock-${buttonName}`} onClick={onClick}>
				{buttonName}
			</button>
		)
);

// Mock the helper functions
jest.mock('../../../../../helpers/getCourseDuration', () => ({
	getCourseDuration: jest
		.fn()
		.mockImplementation(
			(duration) =>
				`${Math.floor(duration / 60)}:${(duration % 60)
					.toString()
					.padStart(2, '0')}`
		),
}));

jest.mock('../../../../../helpers/formatCreationDate', () => ({
	formatCreationDate: jest.fn((date) => date),
}));

// Create a mock Redux store
const mockStore = configureStore([]);

describe('CourseCard Component', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			courses: {
				courses: [
					{
						id: '1',
						title: 'Test Course',
						description: 'This is a test course',
						duration: 456,
						creationDate: '18/11/2023',
						authors: ['1', '2'],
					},
				],
			},
			authors: [
				{
					id: '1',
					name: 'author',
				},
				{
					id: '2',
					name: 'author2',
				},
			],
			user: {
				role: 'admin',
			},
		});
	});

	it('should display title of course', () => {
		jest
			.spyOn(require('react-redux'), 'useSelector')
			.mockImplementation((selector) => selector(store.getState()));

		const { getByText } = render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard />
				</MemoryRouter>
			</Provider>
		);

		expect(getByText('Test Course')).toBeInTheDocument();
	});

	it('should display description of course', () => {
		jest
			.spyOn(require('react-redux'), 'useSelector')
			.mockImplementation((selector) => selector(store.getState()));

		const { getByText } = render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard />
				</MemoryRouter>
			</Provider>
		);

		expect(getByText('This is a test course')).toBeInTheDocument();
	});

	it('should display duration in the correct format', () => {
		jest
			.spyOn(require('react-redux'), 'useSelector')
			.mockImplementation((selector) => selector(store.getState()));

		const { getByText } = render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard />
				</MemoryRouter>
			</Provider>
		);

		expect(getByText(/Duration: \d{1,2}:\d{2}/).textContent).toMatch(
			/\d{1,2}:\d{2}/
		);
	});

	it('should display the authors list of each course', () => {
		jest
			.spyOn(require('react-redux'), 'useSelector')
			.mockImplementation((selector) => selector(store.getState()));

		const { getByText } = render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard />
				</MemoryRouter>
			</Provider>
		);

		expect(getByText('Authors: author, author2')).toBeInTheDocument();
	});

	it('should display creationDate in the correct format', () => {
		jest
			.spyOn(require('react-redux'), 'useSelector')
			.mockImplementation((selector) => selector(store.getState()));

		const { getByText } = render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard />
				</MemoryRouter>
			</Provider>
		);

		expect(getByText('Created: 18.11.2023')).toBeInTheDocument();
	});
});
