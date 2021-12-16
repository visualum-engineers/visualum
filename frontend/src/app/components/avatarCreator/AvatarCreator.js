import React, { useState } from 'react'
import Dashboard from '../dashboard/Dashboard'
import Avatar from 'avataaars'
import {
	hairstyle,
	accessory,
	clothes,
	eyebrow,
	eyes,
	facialHair,
	mouth,
	skinColor,
	hairColor,
	facialHairColor,
	clotheColor
} from './types'

const hairstyleLength = hairstyle.length;
const accessoryLength = accessory.length;
const clothesLength = clothes.length;
const eyebrowLength = eyebrow.length;
const eyesLength = eyes.length;
const facialHairLength = facialHair.length;
const mouthLength = mouth.length;
const skinColorLength = skinColor.length;
const hairColorLength = hairColor.length;
const facialHairColorLength = facialHairColor.length;
const clotheColorLength = clotheColor.length;

export default function AvatarCreator() {

	const [options, setOptions] = useState(
		{
			topType: Math.floor(Math.random() * hairstyleLength),
			accessoriesType: Math.floor(Math.random() * accessoryLength),
			hairColor: Math.floor(Math.random() * hairColorLength),
			facialHairType: Math.floor(Math.random() * facialHairLength),
			clotheType: Math.floor(Math.random() * clothesLength),
			clotheColor: Math.floor(Math.random() * clotheColorLength),
			eyeType: Math.floor(Math.random() * eyesLength),
			eyebrowType: Math.floor(Math.random() * eyebrowLength),
			mouthType: Math.floor(Math.random() * mouthLength),
			skinColor: Math.floor(Math.random() * skinColorLength),
			facialHairColor: Math.floor(Math.random() * facialHairColorLength),
		}
	)

	const changeValue = (key, method = "inc") => {
		setOptions(curr => {
			//set max length to detect overlap
			let max_length = 0;
			if (key === "topType") {
				max_length = hairstyleLength
			} else if (key === "accessoriesType") {
				max_length = accessoryLength;
			} else if (key === "hairColor") {
				max_length = hairColorLength
			} else if (key === "facialHairType") {
				max_length = facialHairLength
			} else if (key === "clotheType") {
				max_length = clothesLength
			} else if (key === "clotheColor") {
				max_length = clotheColorLength
			} else if (key === "eyeType") {
				max_length = eyesLength
			} else if (key === "eyebrowType") {
				max_length = eyebrowLength
			} else if (key === "mouthType") {
				max_length = mouthLength
			} else if (key === "skinColor") {
				max_length = skinColorLength
			} else if (key === "facialHairColor") {
				max_length = facialHairColorLength
			}
			//change the value based on method
			let newVal = 0;
			if (method === "inc") {
				newVal = curr[key] + 1
			} else if (method === "dec") {
				newVal = curr[key] - 1
			}
			//if out of bounds, set to 0
			if (curr[key] >= max_length) {
				newVal = 0
			} else if (curr[key] < 0) {
				newVal = max_length - 1
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
				topType={hairstyle[options.topType]}
				accessoriesType={accessory[options.accessoriesType]}
				hairColor={hairColor[options.hairColor]}
				facialHairType={facialHair[options.facialHairType]}
				facialHairColor={facialHairColor[options.facialHairColor]}
				clotheType={clothes[options.clotheType]}
				clotheColor={clotheColor[options.clotheColor]}
				eyeType={eyes[options.eyeType]}
				eyebrowType={eyebrow[options.eyebrowType]}
				mouthType={mouth[options.mouthType]}
				skinColor={skinColor[options.skinColor]}
			/>
		</Dashboard >
	)
}
