import React from 'react';

export default function Input(props) {
	return (
		<>
			<label htmlFor='input'>{props.labelText}</label>
			<input
				id='input'
				placeholder={props.placeholderText}
				onChange={props.onChange}
				type='text'
			/>
		</>
	);
}
