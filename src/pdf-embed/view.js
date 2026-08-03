import { createRoot } from 'react-dom/client';
import './style.scss';
import Style from './Style';
import PDFEmbed from './PDFEmbed';

document.addEventListener('DOMContentLoaded', () => {
	const allPDFEmbed = document.querySelectorAll('.wp-block-peb-pdf-embed');

	allPDFEmbed.forEach(pdfEmbed => {
		const { attributes, pebAPIKey, globalViewerOptions } = JSON.parse(pdfEmbed.dataset.props);
		const { cId, file } = attributes || {};
		const safeCId = cId ? cId.replace(/-/g, '_') : '';

		pebAPIKey && file?.url && createRoot(pdfEmbed).render(
			<div id={`pebPDFEmbed_${safeCId}`}>
				{
					file?.url && <>
						<Style {...{ attributes, clientId: safeCId }} />
						<PDFEmbed {...{ attributes, clientId: safeCId, pebAPIKey, globalViewerOptions }} />
					</>
				}

			</div >
		);


		pdfEmbed?.removeAttribute('data-props');
	});
});