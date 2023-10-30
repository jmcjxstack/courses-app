import React from 'react';

export default function Input(props) {
	return (
		<>
			<label htmlFor={props.htmlFor}>{props.labelText}&nbsp;</label>
			<input
				id={props.id}
				placeholder={props.placeholderText}
				onChange={props.onChange}
				type={props.type}
				value={props.value}
				name={props.name}
			/>
		</>
	);
}
