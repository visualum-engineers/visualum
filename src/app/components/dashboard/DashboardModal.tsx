import React from 'react'
import PopUpBackground from '../utilities/popUp/PopUpBackground'

export default function DashboardModal(props) {
	const { close } = props;
	return (
		<PopUpBackground onClick={close}>
			<div className="dashboard-modal d-flex flex-column">
				<h2 className="mb-3">Create Your Class</h2>
				<div className="row">
					<div className="col-12">
						<div className="mb-3">
							<label htmlFor="classNameInput" className="form-label">Class Name:</label>
							<input
								type="text"
								className="form-control"
								id="classNameInput"
								placeholder="Input Class Name Here"
							/>
						</div>
					</div>
				</div>
				<div className="mt-auto w-100 d-flex justify-content-end">
					<button className="btn btn-danger" onClick={close}>Cancel</button>
				</div>
			</div>
		</PopUpBackground>
	)
}