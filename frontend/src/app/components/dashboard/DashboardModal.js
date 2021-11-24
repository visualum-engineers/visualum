import React from 'react'

export default function DashboardModal(props) {
	const { close } = props;
	return (
		<div className="modal-container">
			<div className="dashboard-modal d-flex flex-column">
				<h2 className="mb-3">Create Your Class</h2>
				<div className="row">
					<div className="col-12">
						<div class="mb-3">
							<label for="classNameInput" class="form-label">Class Name:</label>
							<input type="text" class="form-control" id="classNameInput" placeholder="Input Class Name Here" />
						</div>
					</div>
				</div>
				<div className="mt-auto w-100 d-flex justify-content-end">
					<button className="btn btn-danger" onClick={close}>Cancel</button>
				</div>
			</div>
		</div>
	)
}