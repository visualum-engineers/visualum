import React from 'react'

export default function SelectRewardImage() {

	const presetImages = [
		'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11', 'test12',
	]

	return (
		<div className='select-reward-image-container'>
			<div className='me-3 mb-3 mb-sm-0 d-flex flex-column justify-content-center align-items-start'>
				<div className='img-thumbnail selected-image'>
					<div className='placeholder w-100 h-100'></div>
				</div>
				<button className='btn btn-primary btn-sm mt-2 upload-image-button'>Upload Image</button>
			</div>
			<div className='preset-images' style={{ flexGrow: 1, minHeight: '200px' }}>
				<div className='preset-images-row'>
					{presetImages.slice(0, 10).map((image) => {
						return (
							<div className='preset-image-container'>
								<div className='preset-image'>
									{image}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
