import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardNothingFound() {
	const navigate = useNavigate();

	return (
		<div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
			<h3 className='text-muted mb-3'>Nothing Found!</h3>
			<button className='btn btn-primary' onClick={() => navigate(-1)}>Go Back</button>
		</div>
	)
}
