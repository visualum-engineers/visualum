import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'

export default function StoreItem(props) {
	return (
		<div className='store-item'>
			<div className='store-item-img'>

			</div>
			<div className='d-flex flex-column align-items-center justify-content-between p-4'>
				<h5 className='item-title text-start w-100 mb-3'>{props.title}</h5>
				<button className='btn btn-primary w-100 store-item-button'>
					<FontAwesomeIcon icon={faDollarSign} className="icon me-2" />
					<span className='fw-bold'>{props.price}</span>
				</button>
			</div>
		</div>
	)
}
