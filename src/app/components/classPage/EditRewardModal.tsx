import React from 'react'
import ModalContainer from '../utilities/modals/ModalContainer'
import SelectRewardImage from './SelectRewardImage'

interface Props {
	reward: Reward,
	toggle: any,
}

interface Reward {
	name: string,
	price: number,
	numAvailable: number,
	description: string,
	photoID: string
}

export default function EditRewardModal(props: any) {

	const { toggle, reward }: Props = props;


	return (
		<ModalContainer toggle={toggle} title="Edit Your Reward" buttons={[<button className='btn btn-primary'>Save</button>]}>
			<form className='px-4'>
				<div className='row'>
					<div className='col-12 col-sm-6 mb-3'>
						<label className='form-label'>Name</label>
						<input className='form-control modal-input' value={reward.name || ""} />
					</div>
					<div className='col-6 col-sm-3 mb-3'>
						<label className='form-label'>Point Cost</label>
						<input className='form-control modal-input' type="number" value={reward.price || 0} />
					</div>
					<div className='col-6 col-sm-3 mb-3'>
						<label className='form-label'>Num. Avail.</label>
						<input className='form-control modal-input' type="number" value={reward.numAvailable || 0} />
					</div>
					<div className='col-12 mb-3'>
						<label className='form-label'>Description</label>
						<textarea className='form-control modal-input' rows={4} value={reward.description || ""} />
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
