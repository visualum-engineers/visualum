import React from 'react';
import PopUpBg from '../utilities/popUp/PopUpBackground';

export default function SettingsEmailModal(props) {
	return (
		<PopUpBg onClick={props.handleClose}>
			<div className='dashboard-modal'>
				<div className='mb-3'>
					<label for="exampleFormControlInput1" className="form-label">Email Address</label>
					<input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
				</div>
				<div className='buttons'>
					<button className='btn btn-danger' onClick={props.handleClose}>Cancel</button>
					<button className='btn btn-primary'>Submit</button>
				</div>
			</div>
		</PopUpBg>
	);
}
