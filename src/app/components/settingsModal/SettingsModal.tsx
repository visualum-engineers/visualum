import React, { useState, Fragment } from 'react'
import IndividualSettingModal from './IndividualSettingModal';
import ReactDOM from 'react-dom';
import SettingsControl from './SettingsControl';
import useModal from '../../hooks/useModal'
import ModalContainer from '../utilities/modals/ModalContainer';

export default function SettingsModal({ toggle: toggleThis }) {

	// const [currModal, setCurrModal] = useState(null);
	const { isShowing: open, toggle } = useModal();

	// function setModal() {

	// }

	const deactivateText = "Upon deletion, account can be recovered for up to 30 days. After that, all your data will be removed permanently."

	const [currentTab, setCurrentTab] = useState("General");
	function handleClickTab(tabName) { setCurrentTab(tabName) }

	const tabs = [
		{
			title: "General",
			content: <Fragment>
				<SettingsControl
					title="Email Address"
					value="dwidmer@visualum.com"
					subtitle="Managed by Google"
					linkText="Edit Email"
					action={toggle}
				/>
				<SettingsControl
					title="Full Name"
					value="Johnny Appleseed"
					linkText="Edit Name"
				/>
				<SettingsControl
					title="Password"
					subtitle="Last changed: 10/05/21"
					linkText="Change Password"
				/>
				<div className='deactivate-account-container'>
					<div className='deactivate-account'>
						<h5 className='title'>Deactivate Account</h5>
						<p className='subtitle'>{deactivateText}</p>
						<div className='w-100 d-flex justify-content-center'>
							<button className='btn btn-danger delete-button'>
								Delete Account
							</button>
						</div>
					</div>
				</div>
			</Fragment>
		},
		{ title: "Notifications", content: null },
		{ title: "Accessibility", content: null }
	]

	return ReactDOM.createPortal(
		<ModalContainer title="Settings" toggle={toggleThis} extraClasses={['settings-modal-container-override']}>
			<div className='settings-modal-container'>
				<div className='settings-modal'>
					<div className='body'>
						<div className='tabs'>
							{tabs.map(tab => <div className={`tab ${tab.title === currentTab ? 'active' : ""}`} onClick={() => handleClickTab(tab.title)}><div className='tab-text'>{tab.title}</div></div>)}
						</div>
						<div className='divider' />
						<div className='settings-body'>
							{tabs.filter(tab => tab.title === currentTab)[0].content}
						</div>
					</div>
				</div>
			</div>
			{open && <IndividualSettingModal title="Change Email" toggle={toggle} />}
		</ModalContainer >, document.getElementById('portal'));
}
