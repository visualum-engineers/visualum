import React from 'react'

export default function CardContainer(props: any) {
	return (
		<div className="row overflow-scroll card-container">
			{props.children}
		</div>
	)
}
