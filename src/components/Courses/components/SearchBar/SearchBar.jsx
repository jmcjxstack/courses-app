import React from 'react';

import Input from '../../../../common/Input/Input';

export default function SearchBar(props) {
	return (
		<div>
			<Input
				placeholderText='Search for a course'
				onChange={props.handleInputChange}
				labelText='Search for a course:'
				htmlFor='searchbar'
				type={'text'}
				name={props.name}
				id='searchbar'
				value={props.value}
			/>
		</div>
	);
}
