import { getBorderCSS, getMultiShadowCSS, getSpaceCSS } from "../../../bpl-tools/utils/getCSS";

const Style = ({ attributes, clientId }) => {
	const { alignment, width, height, padding = {}, margin = {}, border = {}, shadow = [] } = attributes || {};

	const cleanId = typeof clientId === 'string' ? clientId.replace(/-/g, '_') : clientId;
	const pdfEmbedSl = `#pebPDFEmbed_${cleanId} .pebPDFEmbed, #pebPDFEmbed-${clientId} .pebPDFEmbed, .pebPDFEmbed`;
	const sizedContainerSl = `${pdfEmbedSl} .pebSizedContainer, .pebSizedContainer`;
	const areaIdSl = `#pebPDFArea_${cleanId}, #pebPDFArea-${clientId}`;
	const inLineSl = `${pdfEmbedSl} .pebInLine, .pebInLine`;

	const finalHeight = (height && !['0px', '0vh', '0em', '0', 0].includes(height)) ? height : '469px';
	const finalWidth = (width && !['0px', '0%', '0em', '0', 0].includes(width)) ? width : '100%';

	const alignMargin = alignment === 'center' ? '0 auto !important' : alignment === 'right' ? '0 0 0 auto !important' : '0 auto 0 0 !important';
	const alignFlexItems = alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start';
	const alignTextAlign = alignment || 'center';

	return <style dangerouslySetInnerHTML={{
		__html: `
		
			${pdfEmbedSl}{
				display: flex !important;
				flex-direction: column !important;
				align-items: ${alignFlexItems} !important;
				text-align: ${alignTextAlign};
				padding: ${getSpaceCSS(padding)};
				margin: ${getSpaceCSS(margin)};
				box-shadow: ${getMultiShadowCSS(shadow)};
				min-height: ${finalHeight};
				width: 100%;
				${getBorderCSS(border)}
			}

			${sizedContainerSl},
			${areaIdSl}{
				width: ${finalWidth};
				height: ${finalHeight};
				min-height: ${finalHeight};
				margin: ${alignMargin};
			}

			${inLineSl}{
				width: ${finalWidth};
				margin: ${alignMargin};
			}

	`}} />;
}
export default Style;