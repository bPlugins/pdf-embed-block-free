import {
	docEmbedder, excelEmbedder, excelViewer, flipbookPdfIcon, googleDocsViewer, googleSheets,
	googleSlides, mozilaPDF, nativePdfIcon, pdfIcon, powerpointEmbedder, powerpointViewer, sleekPdfIcon, wordViewer
} from "./icons";

const slug = 'pdf-embed-block';

export const dashboardInfo = (info) => {
	const { version, isPremium, hasPro, deleteDataOnUninstall, uninstallNonce } = info;

	const proSuffix = isPremium ? ' Pro' : '';

	return {
		name: `PDF Embed Block${proSuffix}`,
		displayName: `PDF Embed Block${proSuffix} - Embed PDF Files in Posts or Pages`,
		description: 'Embedding a PDF through the Gutenberg block editor is now a breeze, thanks to the PDF Embed Block plugin. Tackling the once daunting task of PDF integration is made seamless, allowing you to effortlessly embed your PDF files directly into the block editor, ensuring a smooth and consistent experience across all browsers.',
		slug,
		version,
		isPremium,
		hasPro,
		deleteDataOnUninstall,
		uninstallNonce,
		displayOurPlugins: true,
		media: {
			logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
			banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
			thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
		},
		pages: {
			org: `https://wordpress.org/plugins/${slug}/`,
			landing: `https://bplugins.com/products/${slug}/`,
			// docs: `https://bplugins.com/docs/${slug}/`,
			docs: `https://bblockswp.com/docs/${slug}`,
			pricing: `https://bplugins.com/products/${slug}/pricing`,
		},
		freemius: {
			product_id: 21138,
			plan_id: 35270,
			public_key: 'pk_aaf93da06d368386d3fd060373257',
		},
		action: 'pebGetBlocks',

		changelogs: [
			{
				type: 'update',
				version: '1.3.0 - 03 June, 2026',
				list: [
					"Feature: Added \"Delete Data on Uninstall\" setting in the admin settings dashboard to safely clear custom post data and API keys on plugin deletion.",
					"Updated: Redesigned the shortcode copy-to-clipboard UI column in the print CPT admin table for a better user experience.",
					"Improved: Enhanced block editor canvas compatibility. The PDF viewer now loads and renders correctly inside Gutenberg's isolated editor canvas iframe.",
					"Improved: Unlocked previously locked pro fields in the Gutenberg editor and introduced a clean, non-intrusive notices UI to display premium feature requirements.",
					"Fixed: Resolved block focus loss and selection issues inside Gutenberg by preventing the PDF iframe from stealing focus, ensuring the block settings panel remains open.",
					"Fixed: Resolved the \"DivId is not present in HTML document\" console error caused by character sanitization mismatches with the Adobe PDF Embed SDK.",
					"Fixed: Fixed a PHP syntax parsing error inside AdminMenu.php settings serialization."
				]
			},
			{
				type: 'fix',
				version: '1.2.5 - 13 Apr, 2026',
				list: [
					"Fixed: Minor bug fixes and general optimizations for smoother performance."
				]
			}

		],
		proFeatures: [
			'Multiple Document Viewer Blocks',
			'Advanced Viewer Controls',
			'Enhanced Layout Customization',
			'More Display Styles',
			'Better Presentation Options',
			'Enhanced File Compatibility & Rendering',
			'Professional Presentation & Slide Viewing',
		],
		startButton: {
			label: 'Start Now',
			url: 'wp-admin/post-new.php?post_type=pdf_embed'
		}
	}
}

export const demoInfo = {
	// allInOneLabel: 'See All Demos',
	// allInOneLink: 'https://audioplayerwp.com/all-demos-in-one-place/',
	demos: [
		{
			"title": "PDF Embed (Default)",
			"url": 'https://bblockswp.com/demo/pdf-embed/',
			"icon": pdfIcon,
			"type": 'iframe'
		},
		{
			"title": "3D Flipbook Viewer",
			"url": 'https://bblockswp.com/demo/3d-flipbook-viewer/',
			"icon": flipbookPdfIcon,
			"type": 'iframe'
		},
		{
			"title": "Sleek PDF Viewer",
			"url": 'https://bblockswp.com/demo/sleek-pdf-viewer/',
			"icon": sleekPdfIcon,
			"type": 'iframe'
		},
		{
			"title": "Native PDF Viewer",
			"url": 'https://bblockswp.com/demo/native-pdf-viewer/',
			"icon": nativePdfIcon,
			"type": 'iframe'
		},
		{
			"title": "Mozilla PDF Viewer",
			"url": 'https://bblockswp.com/demo/mozila-viewer/',
			"icon": mozilaPDF,
			"type": 'iframe'
		},
		{
			"title": "Doc Embedder",
			"url": 'https://bblockswp.com/demo/doc-embedder/',
			"icon": docEmbedder,
			"type": 'iframe'
		},
		{
			"title": "Word Viewer",
			"url": 'https://bblockswp.com/demo/word-viewer/',
			"icon": wordViewer,
			"type": 'iframe'
		},
		{
			"title": "Excel Embedder",
			"url": 'https://bblockswp.com/demo/excel-embedder/',
			"icon": excelEmbedder,
			"type": 'iframe'
		},
		{
			"title": "Excel Viewer",
			"url": 'https://bblockswp.com/demo/excel-viewer/',
			"icon": excelViewer,
			"type": 'iframe'
		},
		{
			"title": "Google Docs Viewer",
			"url": 'https://bblockswp.com/demo/google-docs-viewer/',
			"icon": googleDocsViewer,
			"type": 'iframe'
		},
		{
			"title": "Google Sheets",
			"url": 'https://bblockswp.com/demo/google-sheets/',
			"icon": googleSheets,
			"type": 'iframe'
		},
		{
			"title": "Google Slides",
			"url": 'https://bblockswp.com/demo/google-slides/',
			"icon": googleSlides,
			"type": 'iframe'
		},
		{
			"title": "PowerPoint Embedder",
			"url": 'https://bblockswp.com/demo/powerpoint-embedder/',
			"icon": powerpointEmbedder,
			"type": 'iframe'
		},
		{
			"title": "PowerPoint Viewer",
			"url": 'https://bblockswp.com/demo/powerpoint-viewer/',
			"icon": powerpointViewer,
			"type": 'iframe'
		}

	]
}

export const pricingInfo = {
	logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
	pluginId: 21138,
	planId: 35270,
	licenses: [
		1,
		3,
		null
	],
	button: {
		label: 'Buy Now ➜'
	},
	featured: {
		selected: 3,
	}
}




