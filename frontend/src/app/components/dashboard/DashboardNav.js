import React from 'react';

export default function DashboardNav() {
	return (
		<nav className={`dashboard-navbar d-flex justify-content-between align-items-center`}>
			<div className="dashboard-navbar-brand">
				<img class="dashboard-navbar-logo" src="./images/VisualumLogo.png" alt="Visualum logo" />
				<div className='dashboard-navbar-title'>
					visualum
				</div>
			</div>
		</nav>
	);
}
