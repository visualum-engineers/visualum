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
import PopUpBackground from '../utilities/popUp/PopUpBackground'

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

export default function AvatarCreator(props: any) {

	const [options, setOptions] = useState(
		{
			topType: Math.floor(Math.random() * hairstyleLength),
			accessoriesType: 0,
			hairColor: Math.floor(Math.random() * hairColorLength),
			facialHairType: 0,
			clotheType: Math.floor(Math.random() * clothesLength),
			clotheColor: Math.floor(Math.random() * clotheColorLength),
			eyeType: 2,
			eyebrowType: 2,
			mouthType: 1,
			skinColor: Math.floor(Math.random() * skinColorLength),
			facialHairColor: Math.floor(Math.random() * facialHairColorLength),
		}
	)

	const changeValue = (key: any, method = "inc") => {
		setOptions((curr: any) => {
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

	const tabs = <div className="tab-content" id="myTabContent">
		<div className="tab-pane fade show active" id="hair" role="tabpanel" aria-labelledby="hair-tab">
			<div className='row p-3'>
				<div className='col-12'>
					<h5 className="text-center unselectable">Hair</h5>
					<AttributeSelector
						title={hairstyle[options.topType][1]}
						handleIncrement={() => changeValue("topType", "inc")}
						handleDecrement={() => { changeValue("topType", "dec") }}
					/>
				</div>
				<div className='col-12'>
					<h5 className="text-center unselectable">Hair Color</h5>
					<AttributeSelector
						title={hairColor[options.hairColor][1]}
						handleIncrement={() => changeValue("hairColor", "inc")}
						handleDecrement={() => { changeValue("hairColor", "dec") }}
					/>
				</div>
				<div className='col-12'>
					<h5 className="text-center unselectable">Facial Hair</h5>
					<AttributeSelector
						title={facialHair[options.facialHairType][1]}
						handleIncrement={() => changeValue("facialHairType", "inc")}
						handleDecrement={() => { changeValue("facialHairType", "dec") }}
					/>
				</div>
				<div className='col-12'>
					<h5 className="text-center unselectable">Facial Hair Color</h5>
					<AttributeSelector
						title={facialHairColor[options.facialHairColor][1]}
						handleIncrement={() => changeValue("facialHairColor", "inc")}
						handleDecrement={() => { changeValue("facialHairColor", "dec") }}
					/>
				</div>
			</div>
		</div>
		<div className="tab-pane fade" id="face" role="tabpanel" aria-labelledby="face-tab">
			<div className='row p-3'>
				<div className='col-12'>
					<h5 className="text-center unselectable">Skin Color</h5>
					<AttributeSelector
						title={skinColor[options.skinColor][1]}
						handleIncrement={() => changeValue("skinColor", "inc")}
						handleDecrement={() => { changeValue("skinColor", "dec") }}
					/>
				</div>
				<div className='col-12'>
					<h5 className="text-center unselectable">Eyes</h5>
					<AttributeSelector
						title={eyes[options.eyeType][1]}
						handleIncrement={() => changeValue("eyeType", "inc")}
						handleDecrement={() => { changeValue("eyeType", "dec") }}
					/>
				</div>
				<div className='col-12'>
					<h5 className="text-center unselectable">Eyebrows</h5>
					<AttributeSelector
						title={eyebrow[options.eyebrowType][1]}
						handleIncrement={() => changeValue("eyebrowType", "inc")}
						handleDecrement={() => { changeValue("eyebrowType", "dec") }}
					/>
				</div>
				<div className='col-12'>
					<h5 className="text-center unselectable">Mouth</h5>
					<AttributeSelector
						title={mouth[options.mouthType][1]}
						handleIncrement={() => changeValue("mouthType", "inc")}
						handleDecrement={() => { changeValue("mouthType", "dec") }}
					/>
				</div>
			</div>
		</div>
		<div className="tab-pane fade" id="clothes" role="tabpanel" aria-labelledby="clothes-tab">
			<div className='row p-3'>
				<div className='col-12'>
					<h5 className="text-center unselectable">Clothes</h5>
					<AttributeSelector
						title={clothes[options.clotheType][1]}
						handleIncrement={() => changeValue("clotheType", "inc")}
						handleDecrement={() => { changeValue("clotheType", "dec") }}
					/>
				</div>
				<div className='col-12'>
					<h5 className="text-center unselectable">Clothes Color</h5>
					<AttributeSelector
						title={clotheColor[options.clotheColor][1]}
						handleIncrement={() => changeValue("clotheColor", "inc")}
						handleDecrement={() => { changeValue("clotheColor", "dec") }}
					/>
				</div>
				<div className='col-12'>
					<h5 className="text-center unselectable">Accessory</h5>
					<AttributeSelector
						title={accessory[options.accessoriesType][1]}
						handleIncrement={() => changeValue("accessoriesType", "inc")}
						handleDecrement={() => { changeValue("accessoriesType", "dec") }}
					/>
				</div>
			</div>
		</div>
	</div>

	return (
		<PopUpBackground onClick={props.onCancel}>
			<div className='avatar-creator'>
				<div className='avatar-creator-top-section'>
					<div className='row'>
						<div className='col-md-3 col-12'>
							<div className='d-flex flex-column justify-content-center align-items-center'>
								<div className='avatar-creator-avatar-container'>
									<Avatar
										style={{ width: '100%', height: '100%' }}
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
								</div>
								<div className='d-flex flex-column align-items-center'>
									<ul className="nav flex-column align-items-center nav-pills mt-3 avatar-tabs" id="myTab" role="tablist">
										<li className="nav-item" role="presentation">
											<button className="nav-link active unselectable" id="hair-tab" data-bs-toggle="tab" data-bs-target="#hair" type="button" role="tab" aria-controls="home" aria-selected="true">Hair</button>
										</li>
										<li className="nav-item" role="presentation">
											<button className="nav-link unselectable" id="face-tab" data-bs-toggle="tab" data-bs-target="#face" type="button" role="tab" aria-controls="profile" aria-selected="false">Face</button>
										</li>
										<li className="nav-item" role="presentation">
											<button className="nav-link unselectable" id="clothes-tab" data-bs-toggle="tab" data-bs-target="#clothes" type="button" role="tab" aria-controls="contact" aria-selected="false">Clothes</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className='col-md-9 col-12'>
							{tabs}
						</div>
					</div>
				</div>
				<div className='avatar-save-button-container'>
					<button className='btn btn-primary'>Save</button>
					<button className='btn btn-danger ms-3' onClick={props.onCancel}>Cancel</button>
				</div>
			</div>
		</PopUpBackground>
	)
}

