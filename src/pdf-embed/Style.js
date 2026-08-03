import { getBorderCSS, getMultiShadowCSS, getSpaceCSS } from "../../../bpl-tools/utils/getCSS";

const Style = ({ attributes, clientId }) => {
	const { alignment, width, height, padding = {}, margin = {}, border = {}, shadow = [] } = attributes || {};

	const cleanId = typeof clientId === 'string' ? clientId.replace(/-/g, '_') : clientId;
	const pdfEmbedSl = `#pebPDFEmbed_${cleanId} .pebPDFEmbed`;
	const sizedContainerSl = `${pdfEmbedSl} .pebSizedContainer`;
	const inLineSl = `${pdfEmbedSl} .pebInLine`;
	const areaIdSl = `#pebPDFArea_${cleanId}`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		
			${pdfEmbedSl}{
				text-align: ${alignment};
				padding: ${getSpaceCSS(padding)};
				margin: ${getSpaceCSS(margin)};
				box-shadow: ${getMultiShadowCSS(shadow)};
				min-height: ${['0px', '0vh', '0em'].includes(height) ? '469px' : (height || '469px')};
				${getBorderCSS(border)}
			}

			${sizedContainerSl},
			${areaIdSl}{
				width: ${['0px', '0%', '0em'].includes(width) ? 'auto' : (width || '100%')};
				height: ${['0px', '0vh', '0em'].includes(height) ? '469px' : (height || '469px')};
				min-height: ${['0px', '0vh', '0em'].includes(height) ? '469px' : (height || '469px')};
			}

			${inLineSl}{
				width: ${['0px', '0%', '0em'].includes(width) ? 'auto' : width};
			}

	`}} />;
}
export default Style;