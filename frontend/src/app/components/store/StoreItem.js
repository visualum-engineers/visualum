import React from 'react'

export default function StoreItem(props) {
	return (
		<div className='store-item'>
			<div className='store-item-img'>
				
			</div>
			<div className='d-flex align-items-center justify-content-between mb-1'>
				<h5 className='mb-0 item-title'>{props.title}</h5>
			</div>
			<button className='btn btn-sm btn-success'>Redeem for <span className='fw-bold'>{props.price}</span></button>
		</div>
	)
}
