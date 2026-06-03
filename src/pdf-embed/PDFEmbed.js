import SizedContainer from './Modes/SizedContainer';
import InLine from './Modes/InLine';
import FullWindow from './Modes/FullWindow';
import Lightbox from './Modes/Lightbox';

const PDFEmbed = ({ attributes, clientId, pebAPIKey }) => {
	const { config } = attributes;

	return <div className='pebPDFEmbed'>
		{'SIZED_CONTAINER' === config?.embedMode && <SizedContainer {...{attributes, clientId, pebAPIKey}}  />}
		{'IN_LINE' === config?.embedMode && <InLine {...{attributes, clientId, pebAPIKey}} />}
		{'LIGHTBOX' === config?.embedMode && <Lightbox {...{attributes, clientId, pebAPIKey}} />}
		{'FULL_WINDOW' === config?.embedMode && <FullWindow {...{attributes, clientId, pebAPIKey}} />}
	</div>;
}
export default PDFEmbed;