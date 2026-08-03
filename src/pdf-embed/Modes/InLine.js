import { useEffect } from 'react';
import ViewSDKClient from '../ViewSDKClient';

const InLine = ({ attributes, clientId, pebAPIKey, globalViewerOptions }) => {
	useEffect(() => {
		const viewSDKClient = new ViewSDKClient();

		viewSDKClient.ready().then(() => {
			viewSDKClient.previewFile(`pebPDFArea_${clientId}`, { embedMode: 'IN_LINE' }, attributes, pebAPIKey, globalViewerOptions);
		});
	}, []);


	return <div className='pebInLine' id={`pebPDFArea_${clientId}`}></div>
}
export default InLine;