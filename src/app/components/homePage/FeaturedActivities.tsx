import React from 'react'
import FeaturedActivityCard from './FeaturedActivityCard'

export default function FeaturedActivities() {
	return (
		<>
			<div className='featured-activities' style={{ position: "relative" }}>
				<div className='w-100'>
					<h2 className='text-center' style={{ fontSize: "2rem", color: "#3A3A3A" }}>Check Out Our Activites!</h2>
					<div className='row p-5'>
						<div className='col-4 d-flex justify-content-center'>
							<FeaturedActivityCard />
						</div>
						<div className='col-4 d-flex justify-content-center'>
							<FeaturedActivityCard />
						</div>
						<div className='col-4 d-flex justify-content-center'>
							<FeaturedActivityCard />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
