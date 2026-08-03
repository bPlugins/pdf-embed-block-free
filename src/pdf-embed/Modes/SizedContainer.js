import { useEffect } from 'react';
import ViewSDKClient from '../ViewSDKClient';

const SizedContainer = ({ attributes, clientId, pebAPIKey, globalViewerOptions }) => {
	useEffect(() => {
		const viewSDKClient = new ViewSDKClient();

		viewSDKClient.ready().then(() => {
			viewSDKClient.previewFile(`pebPDFArea_${clientId}`, { embedMode: 'SIZED_CONTAINER' }, attributes, pebAPIKey, globalViewerOptions);
		});
	}, []);


	return <div className='pebSizedContainer' id={`pebPDFArea_${clientId}`}></div>
}
export default SizedContainer;