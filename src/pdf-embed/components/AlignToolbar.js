import { __ } from '@wordpress/i18n';
import { BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { MediaEditControl } from '../../../../bpl-tools/Components';

const AlignToolbar = ({ attributes, setAttributes }) => {
    const { file, alignment } = attributes || {};

    return (
        <BlockControls>
            <MediaEditControl label={__('Edit PDF:', 'pdf-embed-block')} icon='pdf' types={['application/pdf']} value={file} onChange={({ id, url, alt, title }) => setAttributes({ file: { id, url, alt, title } })} />

            <AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('PDF Alignment')} alignmentControls={[
                { title: __('Left', 'pdf-embed-block'), align: 'left', icon: 'align-left' },
                { title: __('Center', 'pdf-embed-block'), align: 'center', icon: 'align-center' },
                { title: __('Right', 'pdf-embed-block'), align: 'right', icon: 'align-right' }
            ]} />
        </BlockControls>
    )
}

export default AlignToolbar;