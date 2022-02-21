import React from 'react'
import StoreCarouselItem from './StoreCarouselItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import sampleData from './sampleData'

export default function Store() {

	const sections = sampleData.map(store => {
		return (
			<div className='col-12 mb-5'>
				<div className='mb-2'>
					<div className='row'>
						<div className='col-lg-8 col-12'><h2>{store.name}</h2></div>
						<div className='col-lg-4 col-12 d-flex justify-content-lg-end justify-content-between align-items-center'>
							<span className='h6 mb-0'>209 points remaining</span>
							<Link to={`${store.class_id}`} className='btn btn-sm btn-primary ms-3'>
								Show More
							</Link>
						</div>
					</div>
				</div>
				<div className='store-section'>
					<div className='store-item-carousel'>
						<div className='carousel-button-container'>
							<div className='carousel-button'>
								<FontAwesomeIcon icon={faAngleLeft} />
							</div>
						</div>
						<div className='store-item-container'>
							{store.items.map(item => <StoreCarouselItem title={item.name} price={item.price} key={item.id} />)}
						</div>
						<div className='carousel-button-container'>
							<div className='carousel-button'>
								<FontAwesomeIcon icon={faAngleRight} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	})

	return (
		<>
			<div className='row'>
				{/* <div className='col-12'>
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
				</div> */}
				{sections}
			</div>
		</>
	)
}
