import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

interface UserListProps {
	users: any
}

export default function UserList({ users }: UserListProps) {
	const { students = [], teachers = [] } = users;
	const [selected, setSelected] = useState('students');

	return (
		<div>
			<div className='d-flex align-items-center'>
				<div className='modal-tabs nav'>
					<div className={`modal-tab nav-item ${selected === "students" ? 'active' : ''}`} onClick={() => setSelected('students')}>Students</div>
					<div className={`modal-tab nav-item ${selected === "teachers" ? 'active' : ''}`} onClick={() => setSelected('teachers')}>Teachers</div>
				</div>
				<div className='modal-userlist-actions'>
					<div className="modal-userlist-action">
						+ Add
					</div>
				</div>
			</div>
			<div className='modal-userlist' style={{ fontWeight: 400 }}>
				{selected === 'students' ?
					students.map((user: string) => (<div className='py-3 w-100 d-flex align-items-center text-muted'>{user} <FontAwesomeIcon className='ms-auto text-muted' icon={faPaperPlane} /></div>))
					:
					teachers.map((user: string) => (<div className='py-3 w-100 d-flex align-items-center text-muted'>{user} <FontAwesomeIcon className='ms-auto text-muted' icon={faPaperPlane} /></div>))
				}
			</div>
		</div>
	)
}
