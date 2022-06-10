import React, { useState } from 'react'

function TypeaheadItem({ email, removeItem }: any) {
	return (
		<div className='added-item'>
			<div>
				{email}
			</div>
			<button type="button" className="btn-close remove-email-button" onClick={() => removeItem(email)} aria-label="Remove"></button>
		</div>
	)
}

export default function InviteeTypeahead() {

	const [items, setItems] = useState<Array<string>>([]);
	const [value, setValue] = useState('');

	function handleKeyPress(event: any) {
		if (event.key === 'Enter') {
			addItem(value)
			setValue('')
		}
	}

	function addItem(email: string) {
		if (email.length < 1) {
			return;
		}
		if (items.includes(email)) {
			return;
		}
		setItems((curr: Array<string>) => ([...curr, email]));
	}

	function removeItem(email: string) {
		setItems((prev: Array<string>) => {
			const newItems = prev;
			return newItems.filter(item => item !== email);
		});
	}

	const addedItems = items.map(item => <TypeaheadItem key={item} email={item} removeItem={removeItem} />);

	return (
		<div>
			<label className='form-label'>Invitees</label>
			<div className='invitee-typeahead'>
				{addedItems}
				<input
					className='moving-input'
					autoFocus
					placeholder='example@example.com'
					onKeyPress={handleKeyPress}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</div>
		</div>

	)
}
