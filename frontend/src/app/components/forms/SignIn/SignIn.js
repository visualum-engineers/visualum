import React from 'react';
import PopUpBg from '../../utilities/popUp/PopUpBackground'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom';
import GoogleSignInButton from '../EntryForms/LoginForm/GoogleSignInBtn';
const logo = "./images/VisualumLogo.png"

export default function SignIn({ toggle }) {

	return ReactDOM.createPortal(
		<PopUpBg onClick={toggle} zIndex={1031}>
			<div className='auth-modal'>
				<div className='auth-close'>
					<div className='close-button' onClick={toggle}>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
				<div className='auth-body'>
					<h3 className='auth-title text-center mb-3'>Log In</h3>
					<div className='d-flex justify-content-center'>
						<GoogleSignInButton />
					</div>
					<div className='auth-divider'>
						<div className='line left'>
							<hr />
						</div>
						<span> or </span>
						<div className='line right'>
							<hr />
						</div>
					</div>
					<div className='row'>
						<div className='col-12'>
							<label htmlFor="emailInput" className="form-label mt-3">Email Address</label>
							<input type="email" className="form-control" id="emailInput" placeholder="name@example.com" />
						</div>
					</div>
					<div className='col-12'>
						<label htmlFor="passwordInput" className="form-label mt-3">Password</label>
						<input type="password" className="form-control" id="passwordInput" />
					</div>
					<div className='col-12'>
						<button className='btn btn-primary mt-4 auth-submit'>Submit</button>
					</div>
				</div>
			</div>
		</PopUpBg>, document.getElementById('portal'));
}
