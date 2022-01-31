import React from 'react';
import PopUpBackground from '../../utilities/popUp/PopUpBackground'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
const logo = "./images/VisualumLogo.png"

export default function SignIn() {
	return (
		<PopUpBackground>
			<div className='auth-modal'>
				<div className='auth-header'>
					<img className="auth-logo"
						src={logo}
						alt="Visualum logo"
					/>
				</div>
				<div className='auth-close'>
					<FontAwesomeIcon icon={faTimes} />
				</div>
				<div className='auth-body'>
					<h3 className='auth-title mb-3'>Sign In</h3>
					<div className="mb-3">
						<label htmlFor="firstNameInput" className="form-label">First Name</label>
						<input type="text" className="form-control" id="firstNameInput" placeholder="first" />
					</div>
					<div className="mb-3">
						<label htmlFor="lastNameInput" className="form-label">Last Name</label>
						<input type="text" className="form-control" id="lastNameInput" placeholder="last" />
					</div>
					<div className="mb-3">
						<label htmlFor="emailInput" className="form-label">Email Address</label>
						<input type="email" className="form-control" id="emailInput" placeholder="name@example.com" />
					</div>
					<label className='form-label' htmlFor="accountTypeSelect">Account Type</label>
					<select className="form-select mb-3" aria-label="Select Account Type" id="accountTypeSelect">
						<option value="teacher">Teacher</option>
						<option value="student">Student</option>
					</select>
					<div className="mb-3">
						<label htmlFor="classCodeInput" className="form-label">Class Code</label>
						<input type="text" className="form-control" id="classCodeInput" placeholder="#000000" />
					</div>
					<button className='btn btn-primary auth-submit'>Submit</button>
				</div>
			</div>
		</PopUpBackground>
	);
}
