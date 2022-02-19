import React from 'react'
import DashboardNav from '../dashboard/DashboardNav'
import StoreItem from './StoreItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import ProgressBar from '../utilities/progressBar/ProgressBar'

export default function Store() {

	const mainView =
		<div className='row'>
			<div className='col-12'>
				<div className='d-flex align-items-center mb-2'>
					<h2>Teacher 1's Class </h2>
					<span className='h6 mb-0 ms-auto'>209 points remaining</span>
					<button className='btn btn-sm btn-primary ms-3'>
						Show More
					</button>
				</div>
				<div className='store-section'>
					<div className='store-item-carousel'>
						<div className='carousel-button-container'>
							<div className='carousel-button'>
								<FontAwesomeIcon icon={faAngleLeft} />
							</div>
						</div>
						<div className='store-item-container'>
							<StoreItem title="Homework Pass" price={50} />
							<StoreItem title="Homework Pass" price={100} />
							<StoreItem title="Homework Pass" price={1000} />
							<StoreItem title="Homework Pass (1 Week)" price={50} />
						</div>
						<div className='carousel-button-container'>
							<div className='carousel-button'>
								<FontAwesomeIcon icon={faAngleRight} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	const specificStore =
		<>
			<h2 className='fw-bold'>Teacher Teach's Store</h2>
			<div className='store-main-reward-container'>
				<h3 className='fw-bold'>Class Prize</h3>
				<h4>Pizza Party</h4>
				<ProgressBar
					containerClassName="main-reward-progress-bar-container"
					percentage={"50%"}
				/>
			</div>
			<div className='mt-4 h-100 d-flex flex-wrap justify-content-between'>
				<div className='mb-3'><StoreItem /></div>
				<div className='mb-3'><StoreItem /></div>
				<div className='mb-3'><StoreItem /></div>
				<div className='mb-3'><StoreItem /></div>
				<div className='mb-3'><StoreItem /></div>
				<div className='mb-3'><StoreItem /></div>
				<div className='mb-3'><StoreItem /></div>
			</div>
		</>

	return (
		<div className='store vh-100'>
			<DashboardNav />
			<div className='store-content container'>
				{specificStore}
			</div>
		</div>
	)
}
