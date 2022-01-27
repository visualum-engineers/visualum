import { faBookOpen, faChartBar, faCog, faGraduationCap, faUsers, faQuestion } from '@fortawesome/free-solid-svg-icons'

const sidebarValues = [
	{ value: 'home', name: 'Home', description: "An overview of dashboard functions.." },
	{ value: 'classes', name: 'My Classes', description: "Create, edit and delete classes and assignments for those classes.", icon: faUsers },
	{ value: 'assignments', name: 'My Assignments', description: "Create, assign and grade assignments.", icon: faBookOpen },
	{ value: 'insights', name: 'Insights', description: "View detailed metrics and insights about your students.", icon: faChartBar },
	{ value: 'grades', name: 'Grades', description: "Input, edit and delete class grades.", icon: faGraduationCap },
	{ value: 'settings', name: 'Settings', description: "Change your Visualum settings.", icon: faCog },
	{ value: 'help', name: 'Help', description: "Problem with Visualum? Check here for answers.", icon: faQuestion }
];

export default sidebarValues;