import React from 'react'
import ModalContainer from '../utilities/modals/ModalContainer'
import SelectRewardImage from './SelectRewardImage'

export default function CreateRewardModal({ toggle }: any) {

	return (
		<ModalContainer toggle={toggle} title="Create Reward" buttons={[<button className='btn btn-primary'>Create</button>]}>
			<form className='px-4'>
				<div className='row'>
					<div className='col-12 col-sm-6 mb-3'>
						<label className='form-label'>Name</label>
						<input className='form-control modal-input' />
					</div>
					<div className='col-6 col-sm-3 mb-3'>
						<label className='form-label'>Point Cost</label>
						<input className='form-control modal-input' type="number" />
					</div>
					<div className='col-6 col-sm-3 mb-3'>
						<label className='form-label'>Num. Avail.</label>
						<input className='form-control modal-input' type="number" />
					</div>
					<div className='col-12 mb-3'>
						<label className='form-label'>Description</label>
						<textarea className='form-control modal-input' rows={4} />
					</div>
					<div className='col-12'>
						<label className='form-label'>Picture</label>
						<SelectRewardImage />
					</div>
				</div>
			</form>
		</ModalContainer>
	)
}
