import React from 'react'
import ModalContainer from '../utilities/modals/ModalContainer'
import UserList from './UserList'

export default function CreateClassModal({ toggle }: any) {
	return (
		<ModalContainer toggle={toggle} title="Create Class" buttons={<button className='btn btn-primary'>Create</button>}>
			<form className='px-4'>
				<div className='row'>
					<div className='col-12 col-sm-7 mb-3'>
						<label className='form-label'>Class Name</label>
						<input className='form-control modal-input' />
					</div>
					<div className='col-12 col-sm-5 mb-3'>
						<label className='form-label'>Subject</label>
						<input className='form-control modal-input' type="text" />
					</div>
					<div className='col-12 mb-3'>
						<UserList users={{ students: ['testuser1@gmail.com', 'testuser2@gmail.com'], teachers: ['teacher1@gmail.com', 'teacher2@gmail.com'] }} />
					</div>
				</div>
			</form>
		</ModalContainer>
	)
}
