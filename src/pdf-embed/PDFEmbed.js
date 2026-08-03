import SizedContainer from './Modes/SizedContainer';
import InLine from './Modes/InLine';
import FullWindow from './Modes/FullWindow';
import Lightbox from './Modes/Lightbox';

const PDFEmbed = ({ attributes, clientId, pebAPIKey, globalViewerOptions }) => {
	const { config } = attributes;

	return <div className='pebPDFEmbed'>
		{'SIZED_CONTAINER' === config?.embedMode && <SizedContainer {...{attributes, clientId, pebAPIKey, globalViewerOptions}}  />}
		{'IN_LINE' === config?.embedMode && <InLine {...{attributes, clientId, pebAPIKey, globalViewerOptions}} />}
		{'LIGHTBOX' === config?.embedMode && <Lightbox {...{attributes, clientId, pebAPIKey, globalViewerOptions}} />}
		{'FULL_WINDOW' === config?.embedMode && <FullWindow {...{attributes, clientId, pebAPIKey, globalViewerOptions}} />}
	</div>;
}

export default PDFEmbed;