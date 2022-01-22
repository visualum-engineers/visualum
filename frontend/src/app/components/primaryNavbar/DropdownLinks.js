import { faColumns, faBookOpen, faGraduationCap, faSignOutAlt, faStore, faUsers } from '@fortawesome/free-solid-svg-icons'
export const links = {
	teacher: [
		{
			name: "Dashboard",
			value: "dashboard/home",
			icon: faColumns
		},
		{
			name: "Classes",
			value: "dashboard/classes",
			icon: faUsers
		},
		{
			name: "Store",
			value: "store",
			icon: faStore
		},
		{
			name: "Log Out",
			value: "logout",
			icon: faSignOutAlt
		}
	],
	student: [
		{
			name: "Dashboard",
			value: "dashboard/home",
			icon: faColumns
		},
		{
			name: "Assignments",
			value: "dashboard/assignments",
			icon: faBookOpen
		},
		{
			name: "Grades",
			value: "dashboard/grades",
			icon: faGraduationCap
		},
		{
			name: "Log Out",
			value: "logout",
			icon: faSignOutAlt
		}
	]
}