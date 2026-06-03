import { __ } from '@wordpress/i18n';

export const embedModes = [
	{ label: __('Sized Container', 'pdf-embed-block'), value: 'SIZED_CONTAINER' },
	{ label: __('In Line', 'pdf-embed-block'), value: 'IN_LINE' },
	// { label: __('Lightbox', 'pdf-embed-block'), value: 'LIGHTBOX' },
	// { label: __('Full Window', 'pdf-embed-block'), value: 'FULL_WINDOW' },
];


export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'pdf-embed-block') },
	{ name: 'style', title: __('Style', 'pdf-embed-block') }
];



