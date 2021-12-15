import React, { useEffect, useState } from 'react'
import Dashboard from '../dashboard/Dashboard'
import Avatar from 'avataaars'
import hairStyles from './types'



const hairStylesLength = hairStyles.length;


export default function AvatarCreator() {

	const [options, setOptions] = useState(
		{
			topType: 0,
			accessoriesType: 0,
			hairColor: 0,
			facialHairType: 0,
			clotheType: 0,
			clotheColor: 0,
			eyeType: 0,
			eyebrowType: 0,
			mouthType: 0,
			skinColor: 0
		}
	)

	// useEffect(() => {
	// 	console.log(options)
	// }, [options])

	const incrementValue = (key) => {
		setOptions(curr => {
			//set max length to detect overlap
			let max_length = 0;
			if (key == "topType") {
				max_length = hairStylesLength
			} else if (key = "accessoriesType") {
				max_length = 10;
			}
			//increment the value
			let newVal = curr[key] + 1
			//if out of bounds, set to 0
			if (curr[key] >= max_length) {
				newVal = 0
			}
			curr[key] = newVal;
			return { ...curr };
		})
	}

	return (
		<Dashboard>
			<Avatar
				style={{ width: '150px', height: '150px' }}
				avatarStyle='Circle'
				topType={hairStyles[options.topType]}
				accessoriesType='Prescription02'
				hairColor='BrownDark'
				facialHairType='Blank'
				clotheType='Hoodie'
				clotheColor='PastelBlue'
				eyeType='Happy'
				eyebrowType='Default'
				mouthType='Smile'
				skinColor='Light'
			/>
			<button onClick={() => incrementValue("topType")}>Increment Top</button>


		</Dashboard >
	)
}
