export type Person = {
	name: string;
	email: string;
	custom_field: string;
	main_image?: {
		href: string;
		description?: string;
	}
}