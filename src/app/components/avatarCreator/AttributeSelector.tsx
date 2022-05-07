import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default function AttributeSelector(props: any) {
	return (
		<div className='attribute-selector'>
			<div className='attr-selector-button' onClick={props.handleDecrement}>
				<FontAwesomeIcon icon={faChevronLeft} />
			</div>
			<div className='attribute-title-container'>
				<div className='attribute-title mx-1 unselectable'>{props.title}</div>
			</div>
			<div className='attr-selector-button' onClick={props.handleIncrement}>
				<FontAwesomeIcon icon={faChevronRight}  />
			</div>
		</div>
	)
}
