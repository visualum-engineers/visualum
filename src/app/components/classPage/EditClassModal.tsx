import React from 'react'
import ModalContainer from '../utilities/modals/ModalContainer'
import EditUserList from './EditUserList'

export default function EditClassModal(props: any) {
	const toggle = props.toggle;
	const classData = props.classData;
	return (
		<ModalContainer toggle={toggle} title="Edit Your Class" buttons={<button className='btn btn-primary'>Save</button>}>
			<form className='px-4'>
				<div className='row'>
					<div className='col-12 col-sm-7 mb-3'>
						<label className='form-label'>Class Name</label>
						<input className='form-control modal-input' value={classData.name} />
					</div>
					<div className='col-12 col-sm-5 mb-3'>
						<label className='form-label'>Subject</label>
						<input className='form-control modal-input' type="text" value={classData.subject} />
					</div>
					<div className='col-12 mb-3'>
						<EditUserList users={{ students: classData.students, teachers: classData.teachers }} />
					</div>
				</div>
			</form>
		</ModalContainer>
	)
}
