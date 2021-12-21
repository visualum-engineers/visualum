import React, { useState } from 'react'
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
import AttributeSelector from './AttributeSelector';

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
			if (newVal >= max_length) {
				newVal = 0
			} else if (newVal < 0) {
				newVal = max_length - 1
			}
			curr[key] = newVal;
			return { ...curr };
		})
	}

	return (
		<div className='avatar-creator'>
			<Avatar
				style={{ width: '200px', height: '200px' }}
				avatarStyle='Circle'
				topType={hairstyle[options.topType][0]}
				accessoriesType={accessory[options.accessoriesType][0]}
				hairColor={hairColor[options.hairColor][0]}
				facialHairType={facialHair[options.facialHairType][0]}
				facialHairColor={facialHairColor[options.facialHairColor][0]}
				clotheType={clothes[options.clotheType][0]}
				clotheColor={clotheColor[options.clotheColor][0]}
				eyeType={eyes[options.eyeType][0]}
				eyebrowType={eyebrow[options.eyebrowType][0]}
				mouthType={mouth[options.mouthType][0]}
				skinColor={skinColor[options.skinColor][0]}
			/>
			<div className='row p-3'>
				<div className='col-6'>
					<h6 className="unselectable">Hair:</h6>
					<AttributeSelector
						title={hairstyle[options.topType][1]}
						handleIncrement={() => changeValue("topType", "inc")}
						handleDecrement={() => { changeValue("topType", "dec") }}
					/>
				</div>
				<div className='col-6'>
					<h6 className="unselectable">Hair Color:</h6>
					<AttributeSelector
						title={hairColor[options.hairColor][1]}
						handleIncrement={() => changeValue("hairColor", "inc")}
						handleDecrement={() => { changeValue("hairColor", "dec") }}
					/>
				</div>
				<div className='col-6'>
					<h6 className="unselectable">Accessory:</h6>
					<AttributeSelector
						title={accessory[options.accessoriesType][1]}
						handleIncrement={() => changeValue("accessoriesType", "inc")}
						handleDecrement={() => { changeValue("accessoriesType", "dec") }}
					/>
				</div>
				<div className='col-6'>
					<h6 className="unselectable">Eyes:</h6>
					<AttributeSelector
						title={eyes[options.eyeType][1]}
						handleIncrement={() => changeValue("eyeType", "inc")}
						handleDecrement={() => { changeValue("eyeType", "dec") }}
					/>
				</div>
				<div className='col-6'>
					<h6 className="unselectable">Eyebrows:</h6>
					<AttributeSelector
						title={eyebrow[options.eyebrowType][1]}
						handleIncrement={() => changeValue("eyebrowType", "inc")}
						handleDecrement={() => { changeValue("eyebrowType", "dec") }}
					/>
				</div>
				<div className='col-6'>
					<h6 className="unselectable">Mouth:</h6>
					<AttributeSelector
						title={mouth[options.mouthType][1]}
						handleIncrement={() => changeValue("mouthType", "inc")}
						handleDecrement={() => { changeValue("mouthType", "dec") }}
					/>
				</div>
				<div className='col-6'>
					<h6 className="unselectable">Skin Color:</h6>
					<AttributeSelector
						title={skinColor[options.skinColor][1]}
						handleIncrement={() => changeValue("skinColor", "inc")}
						handleDecrement={() => { changeValue("skinColor", "dec") }}
					/>
				</div>
				<div className='col-6'>
					<h6 className="unselectable">Clothes:</h6>
					<AttributeSelector
						title={clothes[options.clotheType][1]}
						handleIncrement={() => changeValue("clotheType", "inc")}
						handleDecrement={() => { changeValue("clotheType", "dec") }}
					/>
				</div>
				<div className='col-6'>
					<h6 className="unselectable">Clothes Color:</h6>
					<AttributeSelector
						title={clotheColor[options.clotheColor][1]}
						handleIncrement={() => changeValue("clotheColor", "inc")}
						handleDecrement={() => { changeValue("clotheColor", "dec") }}
					/>
				</div>
				<div className='col-6'>
					<h6 className="unselectable">Facial Hair:</h6>
					<AttributeSelector
						title={facialHair[options.facialHairType][1]}
						handleIncrement={() => changeValue("facialHairType", "inc")}
						handleDecrement={() => { changeValue("facialHairType", "dec") }}
					/>
				</div>
				<div className='col-6'>
					<h6 className="unselectable">Facial Hair Color:</h6>
					<AttributeSelector
						title={facialHairColor[options.facialHairColor][1]}
						handleIncrement={() => changeValue("facialHairColor", "inc")}
						handleDecrement={() => { changeValue("facialHairColor", "dec") }}
					/>
				</div>
			</div>
		</div >
	)
}
