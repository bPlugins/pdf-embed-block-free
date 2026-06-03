import { useState, useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { Placeholder, Spinner } from '@wordpress/components';
import { MediaPlaceholder } from '../../../bpl-tools/Components';
import { tabController } from '../../../bpl-tools/utils/functions';
import Style from './Style';
import ViewSDKClient from './ViewSDKClient';
import SettingsSaveForm from './SettingsSaveForm';
import useWPOptionQuery from './hooks/useWPOptionQuery';
import useWPOptionMutation from './hooks/useWPOptionMutation';
import Settings from './Settings';
import { withSelect } from '@wordpress/data';
import ShortCode from './components/ShortCode/ShortCode';

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected, currentPostId, CPTType } = props;
	const { file = {}, config = {}, options = {} } = attributes;

	const [status, setStatus] = useState(null);
	const { data: apiKey, isLoading: dataLoading } = useWPOptionQuery('pebAPIKey', status);
	const { saveData, isLoading } = useWPOptionMutation('pebAPIKey', { type: 'string' }, setStatus);

	const { isPremium } = false;

	const shortcode = `[pdf_embed id=${currentPostId}]`;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]);

	useEffect(() => tabController(), [isSelected]);

	const containerRef = useRef(null);

	// Init ViewSDKClient
	useEffect(() => {
		if (apiKey && file.url && containerRef.current) {
			const targetDocument = containerRef.current.ownerDocument;
			const targetWindow = targetDocument.defaultView || window;
			const cleanId = `pebPDFArea_${clientId.replace(/-/g, '_')}`;
			const viewSDKClient = new ViewSDKClient(targetWindow, targetDocument);

			viewSDKClient.ready().then(() => {
				viewSDKClient.previewFile(cleanId, { embedMode: config?.embedMode }, attributes, apiKey);
			});
		}
	}, [apiKey, file, config?.embedMode, options, containerRef.current]);

	// Check if Adobe API loaded
	if (dataLoading || isLoading) {
		return <div className='pebSpinnerContainer'><Spinner /> {__(' Loading', 'pdf-embed-block')}</div>
	}

	return <>
		<Settings {...{ attributes, setAttributes, dataLoading, saveData, isLoading, data: apiKey, isPremium }} />

		{CPTType === "pdf_embed" && <ShortCode {...{ shortcode }} />}

		{!apiKey ? <Placeholder className='MediaPlaceholder pebPDFPlaceholder' label={__(`API Key (Client ID)`, 'pdf-embed-block')} icon='pdf'>
			<p>
				{__('Generate a PDF Embed API Key (Client ID) from ', 'pdf-embed-block')}

				<a
					href='https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-embed-api'
					target='_blank'
					rel='noreferrer'>
					{__('here', 'pdf-embed-block')}
				</a>

				{__('. Then enter the Client ID in the settings panel on the right.', 'pdf-embed-block')}
			</p>

			<div className='pdfSettingsForm'>
				<SettingsSaveForm {...{ data: apiKey, dataLoading, saveData, isLoading }} />
			</div>
		</Placeholder> :

			file?.url ? <div 
				className={className} 
				id={`pebPDFEmbed_${clientId.replace(/-/g, '_')}`} 
				style={{ 
					position: 'relative', 
					minHeight: attributes.height || '469px',
					width: '100%'
				}}
				onClick={() => {
					if (window.wp && window.wp.data) {
						window.wp.data.dispatch('core/block-editor').selectBlock(clientId);
					}
				}}
			>
				<Style attributes={attributes} clientId={clientId.replace(/-/g, '_')} />

				<div 
					className="bPlBlockBeforeSelect"
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						zIndex: 99999,
						cursor: 'pointer',
						background: 'transparent'
					}}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						if (window.wp && window.wp.data) {
							window.wp.data.dispatch('core/block-editor').selectBlock(clientId);
						}
					}}
				></div>

				<div className='pebPDFEmbed' ref={containerRef}>
					{config?.embedMode === 'SIZED_CONTAINER' && <div className='pebSizedContainer' id={`pebPDFArea_${clientId.replace(/-/g, '_')}`}></div>}
					{config?.embedMode === 'IN_LINE' && <div className='pebInLine' id={`pebPDFArea_${clientId.replace(/-/g, '_')}`}></div>}
					{config?.embedMode === 'LIGHTBOX' && <div className='pebLightbox' id={`pebPDFArea_${clientId.replace(/-/g, '_')}`}></div>}
					{config?.embedMode === 'FULL_WINDOW' && <div className='pebFullWindow' id={`pebPDFArea_${clientId.replace(/-/g, '_')}`}></div>}
				</div>
			</div> : <MediaPlaceholder
				type='application/pdf'
				typeName='PDF'
				icon='pdf'
				onChange={val => setAttributes({ file: val })}
				placeholder={__('Paste or type a PDF URL', 'pdf-embed-block')}
			/>}
	</>;
};


export default withSelect((select) => {
	const { getDeviceType } = select("core/editor");
	const currentPostId = select('core/editor').getCurrentPostId();
	const CPTType = select('core/editor').getCurrentPostType?.();

	return {
		device: getDeviceType()?.toLowerCase(),
		currentPostId,
		CPTType
	};
})(Edit);
