import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../common/Button/Button';

import './author-item.css';

export default function AuthorItem(props) {
	return (
		<>
			<div className='authors'>
				<p>{props.name}</p>
				<Button buttonName={props.buttonName} onClick={props.onClick} />
			</div>
		</>
	);
}

AuthorItem.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	buttonName: PropTypes.string,
	onClick: PropTypes.func,
};
