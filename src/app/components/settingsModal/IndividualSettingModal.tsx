import React from 'react'
import ModalForm from '../utilities/modals/ModalForm'

export default function IndividualSettingModal({ toggle, title }) {

	const items = [
		{
			name: "email",
			controlType: "TextField",
			inputType: "email",
			displayName: "Email Address",
			placeholderText: "Enter a New Email Address"
		}
	]

	const actions = [
		{
			buttonText: "Submit",
			action: "Submit",
			variant: "primary"
		},
	]


	return (
		<ModalForm toggle={toggle} title={title} items={items} actions={actions} />
	)
}
