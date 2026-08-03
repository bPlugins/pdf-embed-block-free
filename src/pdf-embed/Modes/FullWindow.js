import { useEffect } from 'react';
import ViewSDKClient from '../ViewSDKClient';

const FullWindow = ({ attributes, clientId, pebAPIKey, globalViewerOptions }) => {
	useEffect(() => {
		const viewSDKClient = new ViewSDKClient();

		viewSDKClient.ready().then(() => {
			viewSDKClient.previewFile(
				`pebPDFArea_${clientId}`,
				{ embedMode: 'FULL_WINDOW' },
				attributes,
				pebAPIKey,
				globalViewerOptions
			);
		});
	}, [attributes, clientId, pebAPIKey, globalViewerOptions]);


	return (
		<div
			className='pebFullWindow'
			id={`pebPDFArea_${clientId}`}
			style={{
				width: '100%',
				height: '100vh',
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: 9999,
				background: '#fff',
			}}
		></div>
	);
};

export default FullWindow;
