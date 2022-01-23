import React from 'react';

export default function SettingsCard(props) {
	const { title, subtitle, handleClick } = props;
	return (
		<div className="card settings-card" onClick={handleClick}>
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<div className='h-100' />
				<h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
			</div>
		</div >
	);
}
