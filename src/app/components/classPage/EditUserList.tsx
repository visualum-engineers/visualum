import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import InviteUsers from './InviteUsers'
import useModal from '../../hooks/useModal'

interface UserListProps {
	users: any
}


export default function EditUserList({ users }: UserListProps) {
	const { students = [], teachers = [] } = users;
	const [selected, setSelected] = useState('students');
	const { toggle, isShowing } = useModal();

	return (
		<div>
			{isShowing && <InviteUsers inviteType={selected} />}
			<div className='d-flex align-items-center'>
				<div className='modal-tabs nav'>
					<div className={`modal-tab nav-item ${selected === "students" ? 'active' : ''}`} onClick={() => setSelected('students')}>Students</div>
					<div className={`modal-tab nav-item ${selected === "teachers" ? 'active' : ''}`} onClick={() => setSelected('teachers')}>Teachers</div>
				</div>
				<div className='modal-userlist-actions'>
					<div className="modal-userlist-action" onClick={toggle}>
						{selected === "students" ? '+ Add Students' : '+ Add Teachers'}
					</div>
				</div>
			</div>
			<div className='modal-userlist' style={{ fontWeight: 400 }}>
				{selected === 'students' ?
					students.map((user: string) => (
						<div key={user} className='py-3 w-100 d-flex align-items-center text-muted'>{user}
							{" "}
							<FontAwesomeIcon className='ms-auto text-muted' icon={faTrash} />
							<FontAwesomeIcon className='ms-3 text-muted' icon={faPaperPlane} />
						</div>))
					:
					teachers.map((user: string) => (
						<div key={user} className='py-3 w-100 d-flex align-items-center text-muted'>{user}
							{" "}
							<FontAwesomeIcon className='ms-auto text-muted' icon={faTrash} />
							<FontAwesomeIcon className='ms-3 text-muted' icon={faPaperPlane} />
						</div>))
				}
			</div>
		</div>
	)
}
