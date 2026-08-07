import { __ } from "@wordpress/i18n";
import { useState, useRef } from "@wordpress/element";
import { TextControl } from "@wordpress/components";
import { InlineDetailMediaUpload, Label } from "../../../../bpl-tools/Components";
import { debounce } from "../../../../bpl-tools/utils/functions";

const PDFFileSelector = ({ attributes, setAttributes, pdfType = "embed" }) => {
    const { file = {} } = attributes || {};
    const hasFile = Boolean(file?.url);

    const [title, setTitle] = useState(file.title);

    const updateTitle = useRef(debounce((existingFile, text) => {
        setAttributes({ file: { ...existingFile, title: text } });
    }, 750)).current;

    return (
        <>
            <Label>{__('PDF File:', 'pdf-embed-block')}</Label>
            <InlineDetailMediaUpload
                value={file}
                types={['application/pdf']}
                onChange={val => {
                    setTitle(val.title);
                    setAttributes({ file: val })
                }}
                placeholder={__('Enter PDF URL', 'pdf-embed-block')}
            />

            {hasFile && ["embed"].includes(pdfType) && <>
                <Label className='mt10'>{__('PDF File Name:', 'pdf-embed-block')}</Label>
                <TextControl value={title} onChange={val => {
                    setTitle(val);
                    updateTitle(file, val);
                }} />
            </>}

        </>
    );
};

export default PDFFileSelector;
