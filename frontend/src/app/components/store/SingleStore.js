import React from 'react'
import ProgressBar from '../utilities/progressBar/ProgressBar'
import StoreItem from './StoreItem'

export default function SingleStore() {
	return (
		<>
			<h2 className='fw-bold'>Teacher Person's Store</h2>
			<div className='store-main-reward-container mt-3'>
				<h3 className='fw-bold'>Class Prize</h3>
				<h4>Pizza Party</h4>
				<ProgressBar
					containerClassName="main-reward-progress-bar-container"
					percentage={"50%"}
				/>
			</div>
			<div className='mt-4 h-100 row'>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'><StoreItem /></div>
			</div>
		</>
	)
}
