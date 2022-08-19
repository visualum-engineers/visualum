import React from 'react'

export default function SelectPicture() {
	return (
		<div className='py-3 select-picture'>
			<div className='main-pic-display'>
				<label className="form-label">Picture</label>
				<div className='pic-container'>
				</div>
				<button className='btn btn-secondary'>
					Upload Photo
				</button>
			</div>
			<div className="other-choices">
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
				<div style={{ display: 'flex', justifyContent: 'end' }}><div className='pic-container'></div></div>
			</div>
		</div >
	)
}
