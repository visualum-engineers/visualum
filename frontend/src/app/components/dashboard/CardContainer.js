import React from 'react'

export default function CardContainer(props) {
	return (
		<div className="row overflow-scroll card-container">
			{props.children}
		</div>
	)
}
