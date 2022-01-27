import React from 'react';
import PopUpBg from '../utilities/popUp/PopUpBackground';

export default function SettingsAccountDetailsModal(props) {
	return (
		<PopUpBg onClick={props.handleClose}>
			<div className='dashboard-modal'>
				<div className="input-group mb-3">
					<span className="input-group-text" id="basic-addon1">First</span>
					<input type="text" className="form-control" placeholder="First Name" aria-label="Username" aria-describedby="basic-addon1" />
				</div>
				<div className="input-group mb-3">
					<span className="input-group-text" id="basic-addon2">Last</span>
					<input type="text" className="form-control" placeholder="Last Name" aria-label="Username" aria-describedby="basic-addon2" />
				</div>
				<div className='buttons'>
					<button className='btn btn-danger' onClick={props.handleClose}>Cancel</button>
					<button className='btn btn-primary'>Submit</button>
				</div>
			</div>
		</PopUpBg>
	);
}
