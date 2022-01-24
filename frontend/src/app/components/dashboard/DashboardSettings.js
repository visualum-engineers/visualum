import React, { useState } from 'react'
import AvatarCreator from '../avatarCreator/AvatarCreator';
import SettingsCard from './SettingsCard';
import CardContainer from './CardContainer'

export default function DashboardSettings() {

	const [modalOpen, setModalOpen] = useState(false);

	const openAvatarModal = () => {
		setModalOpen(true)
	};

	const settings = [
		{ title: 'Reset Password', subtitle: 'Forgot Your Password? Reset It Here.' },
		{ title: 'Your Avatar', subtitle: 'Switch Up Your Look!', handleClick: openAvatarModal },
		{ title: 'Change Email', subtitle: 'Change which email is associated with your account.' },
		{ title: 'Account Details', subtitle: 'Change the name and personal details associated with your account.' }
	]

	const cards = settings.map(item =>
		<div className="col-md-4 col-12 p-2" key={item.title}>
			<SettingsCard title={item.title} subtitle={item.subtitle} handleClick={item.handleClick} />
		</div>
	);

	return (
		<div>
			{modalOpen ? <AvatarCreator
				onCancel={() => setModalOpen(false)}
				onSubmit={() => console.log('Fill this in!')}
			/> :
				<></>
			}
			<CardContainer>
				{cards}
			</CardContainer>
		</div>
	)
}
