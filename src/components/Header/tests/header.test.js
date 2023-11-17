import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Header from '../Header';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: jest.fn(),
	useSelector: jest.fn(),
}));

jest.mock('../components/Logo/Logo', () => () => (
	<div data-testid='logo-mock' />
));

jest.mock('../../../common/Button/Button', () => ({ buttonName, onClick }) => (
	<button data-testid='button-mock' onClick={onClick}>
		{buttonName}
	</button>
));

const mockStore = configureStore([]);

describe('Header Component', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			user: {
				name: 'Jose',
			},
		});
	});

	it('renders logo and user name', () => {
		jest
			.spyOn(require('react-redux'), 'useSelector')
			.mockImplementation((selector) => selector(store.getState()));

		const { getByTestId } = render(
			<Provider store={store}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</Provider>
		);

		expect(getByTestId('logo-mock')).toBeInTheDocument();

		expect(getByTestId('name')).toHaveTextContent('Jose');
	});
});
