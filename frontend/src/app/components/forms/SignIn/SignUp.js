import React, { useState } from 'react';
import PopUpBg from '../../utilities/popUp/PopUpBackground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import GoogleSignInButton from '../EntryForms/LoginForm/GoogleSignInBtn'
import ReactDOM from 'react-dom';

export default function SignUp({ toggle, toggleOther }) {

	const [stage, setStage] = useState("acctType");

	const switchMethod = () => {
		toggle()
		toggleOther()
	}

	const otherOptions =
		<div className='mt-3 text-center'>
			<div className='no-account'>
				Already have an account? <span className='sign-up-link' onClick={switchMethod}>Log In.</span>
			</div>
		</div>

	const acctType =
		<div className='acct-type'>
			<div className='row'>
				<div className='col-12'>
					<label className='form-label' htmlFor="accountTypeSelect">Account Type</label>
					<select className="form-select" aria-label="Select Account Type" id="accountTypeSelect">
						<option value="teacher">Teacher</option>
						<option value="student">Student</option>
					</select>
				</div>
				<div className='col-12'>
					<button
						className='btn btn-primary mt-4 auth-submit'
						onClick={() => setStage('signUp')}
					>Submit</button>
				</div>
			</div>

		</div>

	const form =
		<div className='auth-signup-form'>
			<div className='row'>
				<div className='col-md-6 col-12'>
					<label htmlFor="firstNameInput" className="form-label">First Name</label>
					<input type="text" className="form-control" id="firstNameInput" />
				</div>
				<div className='col-md-6 col-12'>
					<label htmlFor="lastNameInput" className="form-label mt-md-0 mt-3">Last Name</label>
					<input type="text" className="form-control" id="lastNameInput" />
				</div>
				<div className='col-12'>
					<label htmlFor="emailInput" className="form-label mt-3">Email Address</label>
					<input type="email" className="form-control" id="emailInput" placeholder="name@example.com" />
				</div>
				<div className='col-12'>
					<label htmlFor="passwordInput" className="form-label mt-3">Password</label>
					<input type="password" className="form-control" id="passwordInput" />
				</div>
				<div className='col-12'>
					<label htmlFor="confirmPasswordInput" className="form-label mt-3">Confirm Password</label>
					<input type="password" className="form-control" id="confirmPasswordInput" />
				</div>
				<div className='col-12'>
					<button className='btn btn-primary mt-4 auth-submit'>Submit</button>
				</div>
			</div>
		</div>

	return ReactDOM.createPortal(
		<PopUpBg onClick={toggle} zIndex={1031}>
			<div className='auth-modal'>
				<div className='auth-close'>
					<div className='close-button' onClick={toggle}>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
				<div className='auth-body'>
					<h3 className='auth-title mb-3 text-center'>Join Us</h3>
					<div className='d-flex flex-column justify-content-center align-items-center'>
						{stage !== "acctType" ? <>
							<GoogleSignInButton />
							<div className='auth-divider'>
								<div className='line left'>
									<hr />
								</div>
								<span> or </span>
								<div className='line right'>
									<hr />
								</div>
							</div>
							{form}
						</>
							:
							acctType
						}
					</div>
					<div className='row'>
						<div className='col-12'>
							{otherOptions}
						</div>
					</div>
				</div>
			</div>
		</PopUpBg>, document.getElementById('portal'))
}
