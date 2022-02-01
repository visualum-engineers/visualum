import React, { useState } from 'react';
import PopUpBg from '../../utilities/popUp/PopUpBackground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import GoogleSignInButton from '../EntryForms/LoginForm/GoogleSignInBtn'
import ReactDOM from 'react-dom';
const logo = "./images/VisualumLogo.png"

export default function SignUp() {

	const [signUpType, setSignUpType] = useState(null);

	const form =
		<>
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
		</>

	let body = null;
	if (signUpType == 'email') {
		body = form;
	}

	return ReactDOM.createPortal(
		<PopUpBg>
			<div className='auth-modal'>
				<div className='auth-close'>
					<div className='close-button'>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
				<div className='auth-body'>
					<h3 className='auth-title mb-3 text-center'>Join Us</h3>
					{body == null ? <div className='d-flex flex-column justify-content-center align-items-center'>
						<GoogleSignInButton />
						<button className='btn btn-primary auth-signup' onClick={() => setSignUpType('email')}>Sign Up with Email and Password</button>
					</div> :
						body
					}
				</div>
			</div>
		</PopUpBg>, document.getElementById('portal'))
}
