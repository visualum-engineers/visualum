import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardNav from '../dashboard/DashboardNav'

export default function Store() {
	return (
		<div className='store'>
			<DashboardNav />
			<div className='store-content container'>
				<Outlet />
			</div>
		</div>
	)
}
