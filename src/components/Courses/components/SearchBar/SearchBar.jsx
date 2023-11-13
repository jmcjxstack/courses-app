import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../common/Input/Input';

export default function SearchBar(props) {
	return (
		<div>
			<Input
				placeholderText='Enter course name or id'
				onChange={props.handleInputChange}
				htmlFor='searchbar'
				type={'text'}
				name={props.name}
				id='searchbar'
				value={props.value}
			/>
		</div>
	);
}

SearchBar.propTypes = {
	handleInputChange: PropTypes.func,
	value: PropTypes.string,
	name: PropTypes.string,
};
