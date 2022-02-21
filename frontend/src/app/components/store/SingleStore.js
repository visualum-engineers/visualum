import React from 'react'
import ProgressBar from '../utilities/progressBar/ProgressBar'
import StoreItem from './StoreItem'
import data from './sampleData'
import { useParams } from 'react-router-dom'

export default function SingleStore() {
	const params = useParams();
	const store = data.filter(store => store["class_id"] === parseInt(params["store_id"]))[0]
	let store_items = null;
	if (store) {
		store_items = store.items.map(item =>
			<>
				<div className='col-xl-3 col-lg-4 col-md-6 col-12 mb-4 d-flex justify-content-center align-items-center'>
					<StoreItem title={item.name} price={item.price} />
				</div>
			</>
		)
	}

	return (
		<>
			<h2 className='fw-bold'>Teacher Person's Store</h2>
			<div className='store-main-reward-container mt-3'>
				<h3 className='fw-bold'>Class Prize</h3>
				<h4>{store.class_goal.name}</h4>
				<ProgressBar
					containerClassName="main-reward-progress-bar-container"
					percentage={"50%"}
				/>
			</div>
			<div className='mt-4 h-100 row'>
				{store_items}
			</div>
		</>
	)
}
