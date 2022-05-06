import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import Avatar from 'avataaars'
import { faCog } from '@fortawesome/free-solid-svg-icons';
import useModal from '../../hooks/useModal';
import SettingsModal from '../settingsModal/SettingsModal';

export default function DashboardNav() {
	const { isShowing, toggle } = useModal();
	return (
		<nav className={`dashboard-navbar d-flex justify-content-between align-items-center`}>
			{isShowing && <SettingsModal toggle={toggle} />}
			<a href="/" className="dashboard-navbar-brand">
				<img className="dashboard-navbar-logo" src="./images/VisualumLogo.png" alt="Visualum logo" />
				<div className='dashboard-navbar-title'>
					visualum
				</div>
			</a>
			<div className='dashboard-navbar-buttons'>
				<div className='dashboard-navbar-button'>
					<FontAwesomeIcon icon={faBell} />
				</div>
				<div className='dashboard-navbar-button' onClick={toggle}>
					<FontAwesomeIcon icon={faCog} />
				</div>
				<div className='dashboard-navbar-button'>
					<Avatar style={{ width: '80%', height: '100%' }}
						avatarStyle='Circle' />
				</div>
			</div>
		</nav>
	);
}
