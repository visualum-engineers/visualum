import React, { useState } from 'react'
import AvatarCreator from '../avatarCreator/AvatarCreator';
import SettingsCard from './SettingsCard';
import CardContainer from './CardContainer'

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

	const settings = [
		{ title: 'Your Avatar', subtitle: 'Switch Up Your Look!', handleClick: openAvatarModal },
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
