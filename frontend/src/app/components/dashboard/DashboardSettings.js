import React, { useState } from 'react'
import AvatarCreator from '../avatarCreator/AvatarCreator';
import SettingsCard from './SettingsCard';
import CardContainer from './CardContainer'
import SettingsEmailModal from './SettingsEmailModal';
import SettingsAccountDetailsModal from './SettingsAccountDetailsModal';

export default function DashboardSettings() {

	const [currentModal, setCurrentModal] = useState(null)
	const [modalOpen, setModalOpen] = useState(false);

	const openAvatarModal = () => {
		setCurrentModal(
			<AvatarCreator onCancel={() => setModalOpen(false)}
				onSubmit={() => console.log('Fill this in!')}
			/>
		);
		setModalOpen(true);
	};

	const openEmailModal = () => {
		setCurrentModal(
			<SettingsEmailModal
				handleClose={() => setModalOpen(false)}
			/>
		);
		setModalOpen(true);
	}

	const openAccountDetailsModal = () => {
		setCurrentModal(
			<SettingsAccountDetailsModal
				handleClose={() => setModalOpen(false)}
			/>
		);
		setModalOpen(true);
	}

	const settings = [
		{ title: 'Reset Password', subtitle: 'Forgot Your Password? Click for a reset code.' },
		{ title: 'Your Avatar', subtitle: 'Switch Up Your Look!', handleClick: openAvatarModal },
		{ title: 'Change Email', subtitle: 'Change which email is associated with your account.', handleClick: openEmailModal },
		{ title: 'Account Details', subtitle: 'Change the name and personal details associated with your account.', handleClick: openAccountDetailsModal }
	]

	const cards = settings.map(item =>
		<div className="col-md-4 col-12 p-2" key={item.title}>
			<SettingsCard title={item.title} subtitle={item.subtitle} handleClick={item.handleClick} />
		</div>
	);

	return (
		<div>
			{modalOpen ? currentModal : <></>}
			<CardContainer>
				{cards}
			</CardContainer>
		</div>
	)
}
