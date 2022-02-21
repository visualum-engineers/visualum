import React from 'react'
import StoreCarouselItem from './StoreCarouselItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

export default function Store() {

	return (
		<>
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
		</>
	)
}
