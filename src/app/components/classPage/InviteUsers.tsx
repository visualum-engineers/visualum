import React, { useState } from 'react'
import ModalContainer from '../utilities/modals/ModalContainer';
import InviteeTypeahead from './InviteeTypeahead';
import ReactDOM from 'react-dom';

export default function InviteUsers({ classID, inviteType }: any) {

	const [invitees, setInvitees] = useState([]);

	return ReactDOM.createPortal(
		<ModalContainer
			toggle={() => { console.log("Toggle") }}
			title={`Invite ${inviteType.charAt(0).toUpperCase()}${inviteType.slice(1)}`}
			buttons={[<button className='btn btn-primary'>Invite</button>]}
			clickOutToClose={false}
		>
			<div className='px-4'>
				<InviteeTypeahead />
				<label className='form-label mt-3'>Message</label>
				<textarea className='form-control modal-input' rows={4} />
			</div>
		</ModalContainer>, document.body
	)
}
