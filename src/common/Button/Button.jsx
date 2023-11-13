import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

export default function Button(props) {
	return (
		<>
			<button className='button' onClick={props.onClick}>
				{props.buttonName}
			</button>
		</>
	);
}

Button.propTypes = {
	onClick: PropTypes.func,
	buttonName: PropTypes.string,
};
