import React from 'react'
import Dashboard from './Dashboard'

export default function DashboardSettings() {

	const accountType = "student";
	const email = "test@gmail.com"

	const teacherSettings =
		<div className="d-flex flex-column">
			<div className="settings-module">
				<h6>Email</h6>
				<div className="mb-2">Current email: {email}</div>
				<button className="btn btn-sm btn-primary">Change Email</button>
			</div>
			<div className="settings-module">
				<h6>Change Name</h6>
				<div className="row">
					<div className="col-lg-6 col-12">
						<div class="mb-2">
							<label for="first-name-input" class="form-label">First Name</label>
							<input type="input" class="form-control" id="first-name-input" placeholder="First Name" />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6 col-12">
						<div class="mb-3">
							<label for="last-name-input" class="form-label">Last Name</label>
							<input type="input" class="form-control" id="last-name-input" placeholder="Last Name" />
						</div>
					</div>
				</div>
				<button className="btn btn-primary btn-sm">Confirm</button>
			</div>
			<div className="settings-module">
				<h6>Delete Account?</h6>
				<button className="btn btn-danger">Delete Account</button>
			</div>
		</div>

	return (
		<Dashboard page="settings">
			<div className="settings-page overflow-scroll">
				<h3 className="mb-3">Settings</h3>
				<div className="d-flex flex-column">
					<div className="settings-module">
						<h6 className="mb-2">Forgot Your Password?</h6>
						<button className="btn btn-primary">Change Password</button>
					</div>
					<div className="settings-module">
						<h6 className="mb-2">Your Avatar</h6>
						<div className="avatar mb-3" />
						<button className="btn btn-primary btn-sm">Change Avatar</button>
					</div>
				</div>
				{teacherSettings}
			</div>
		</Dashboard>
	)
}
