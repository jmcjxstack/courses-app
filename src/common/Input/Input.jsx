import React from 'react';
import PropTypes from 'prop-types';

import './input.css';

export default function Input(props) {
	return (
		<>
			<label htmlFor={props.htmlFor}>{props.labelText}</label>
			<input
				id={props.id}
				placeholder={props.placeholderText}
				onChange={props.onChange}
				type={props.type}
				value={props.value}
				name={props.name}
				required={props.required}
			/>
		</>
	);
}

Input.propTypes = {
	htmlFor: PropTypes.string,
	labelText: PropTypes.string,
	id: PropTypes.string,
	placeholderText: PropTypes.string,
	onChange: PropTypes.func,
	type: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	required: PropTypes.bool,
};
