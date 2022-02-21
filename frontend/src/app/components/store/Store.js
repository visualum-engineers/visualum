import React from 'react'
import DashboardNav from '../dashboard/DashboardNav'
import StoreItem from './StoreItem'
import StoreCarouselItem from './StoreCarouselItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import ProgressBar from '../utilities/progressBar/ProgressBar'

export default function Store() {

	const mainView =
		<div className='row'>
			<div className='col-12'>
				<div className='d-flex align-items-center mb-2'>
					<h2>Mrs. Teacher's Class Store</h2>
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
							<StoreCarouselItem title="Homework Pass" price={50} />
							<StoreCarouselItem title="Homework Pass" price={100} />
							<StoreCarouselItem title="Homework Pass" price={1000} />
							<StoreCarouselItem title="Homework Pass" price={1000} />
							<StoreCarouselItem title="Homework Pass" price={1000} />
							<StoreCarouselItem title="Homework Pass" price={1000} />
							<StoreCarouselItem title="Homework Pass" price={1000} />
							<StoreCarouselItem title="Homework Pass (1 Week)" price={50} />
						</div>
						<div className='carousel-button-container'>
							<div className='carousel-button'>
								<FontAwesomeIcon icon={faAngleRight} />
							</div>
						</div>
					</div>
				</div>
				<div className='d-flex align-items-center mt-5 mb-2'>
					<h2>Teacher 1's Class </h2>
					<span className='h6 mb-0 ms-auto'>209 points remaining</span>
					<button className='btn btn-sm btn-primary ms-3'>
						Show More
					</button>
				</div>
				<div className='store-section mt-3'>
					<div className='store-item-carousel'>
						<div className='carousel-button-container'>
							<div className='carousel-button'>
								<FontAwesomeIcon icon={faAngleLeft} />
							</div>
						</div>
						<div className='store-item-container'>
							<StoreCarouselItem title="Homework Pass" price={50} />
							<StoreCarouselItem title="Homework Pass" price={100} />
							<StoreCarouselItem title="Homework Pass" price={1000} />
							<StoreCarouselItem title="Homework Pass (1 Week)" price={50} />
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

	return (
		<div className='store'>
			<DashboardNav />
			<div className='store-content container'>
				{mainView}
			</div>
		</div>
	)
}
