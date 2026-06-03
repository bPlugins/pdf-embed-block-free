import { useEffect } from 'react';
import ViewSDKClient from '../ViewSDKClient';

const InLine = ({ attributes, clientId, pebAPIKey }) => {
	useEffect(() => {
		const viewSDKClient = new ViewSDKClient();

		viewSDKClient.ready().then(() => {
			viewSDKClient.previewFile(`pebPDFArea_${clientId}`, { embedMode: 'IN_LINE' }, attributes, pebAPIKey);
		});
	}, []);

	return <div className='pebInLine' id={`pebPDFArea_${clientId}`}></div>
}
export default InLine;