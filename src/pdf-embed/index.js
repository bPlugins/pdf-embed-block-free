import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './Edit';
import './editor.scss';
import { pdfIcon } from './utils/icons';

registerBlockType(metadata, {
	icon: pdfIcon,
	edit: Edit,
	save: () => null
});