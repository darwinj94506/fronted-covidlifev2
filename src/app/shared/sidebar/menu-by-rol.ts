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
			{
				path: '/root/lugares',
				title: 'Lugares',
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
				path: '/apps/users',
				title: 'Pacientes',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{ 
				path: '/doctor/estado-diario',
				title: 'Estado diario',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/apps/fullcalendar',
				title: 'Agenda',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/doctor/video-llamada',
				title: 'Video llamada',
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
		title: 'Administrador',
		icon: 'mdi mdi-gauge',
		class: 'has-arrow',
		label: '3',
    	labelClass: 'side-badge badge badge-info',
		extralink: false,
		submenu: [
			{
				path: '/admin/personal',
				title: 'Personal',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/admin/hospital',
				title: 'Hospital',
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
				title: 'Mapas',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/director/estadisticas',
				title: 'Estadísticas',
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
				title: 'Citas',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/paciente/video-llamada',
				title: 'Video llamada',
				icon: 'mdi mdi-adjust',
				class: '',
				label: '',
				labelClass: '',
				extralink: false,
				submenu: []
			},
			{
				path: '/apps/chat',
				title: 'Chat',
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

