import { RouteInfo } from './sidebar.metadata';

export const ROUTES_ROOT: RouteInfo[] = [
	
	{
		path: '',
		title: 'Root',
		icon: 'mdi mdi-gauge',
		class: 'has-arrow',
		label: '2',
    	labelClass: 'side-badge badge badge-info',
		extralink: false,
		submenu: [
			{
				path: '/root/administradores',
				title: 'Administradores',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/root/hospitales',
				title: 'Hospitales',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			
		]
	},

];


export const ROUTES_DOCTOR: RouteInfo[] = [
	
	{
		path: '',
		title: 'Doctor',
		icon: 'mdi mdi-gauge',
		class: 'has-arrow',
		label: '2',
    	labelClass: 'side-badge badge badge-info',
		extralink: false,
		submenu: [
			{
				path: '/doctor/citas',
				title: 'Citas',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/doctor/pacientes',
				title: 'Pacientes',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/doctor/agenda',
				title: 'Agenda',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			}
			
		]
	},

];





export const ROUTES_ADMIN: RouteInfo[] = [
	
	{
		path: '',
		title: 'Root',
		icon: 'mdi mdi-gauge',
		class: 'has-arrow',
		label: '3',
    	labelClass: 'side-badge badge badge-info',
		extralink: false,
		submenu: [
			{
				path: '/root/administradores',
				title: 'Modern',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/root/hospitales',
				title: 'Classic',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			
		]
	},

];



export const ROUTES_DIRECTOR: RouteInfo[] = [
	
	{
		path: '',
		title: 'Director',
		icon: 'mdi mdi-gauge',
		class: 'has-arrow',
		label: '3',
    	labelClass: 'side-badge badge badge-info',
		extralink: false,
		submenu: [
			{
				path: '/director/mapas',
				title: 'Modern',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/director/estadisticas',
				title: 'Classic',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			
		]
	},

];


export const ROUTES_PATIENT: RouteInfo[] = [
	
	{
		path: '',
		title: 'Paciente',
		icon: 'mdi mdi-gauge',
		class: 'has-arrow',
		label: '3',
    	labelClass: 'side-badge badge badge-info',
		extralink: false,
		submenu: [
			{
				path: '/paciente/citas',
				title: 'Modern',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/director/video-llamada',
				title: 'Classic',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			
		]
	},

];

