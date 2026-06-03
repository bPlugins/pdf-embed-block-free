import { getBorderCSS, getMultiShadowCSS, getSpaceCSS } from "../../../bpl-tools/utils/getCSS";

const Style = ({ attributes, clientId }) => {
	const { alignment, width, height, padding = {}, margin = {}, border = {}, shadow = [] } = attributes || {};

	const pdfEmbedSl = `#pebPDFEmbed_${clientId} .pebPDFEmbed`;
	const sizedContainerSl = `${pdfEmbedSl} .pebSizedContainer`;
	const inLineSl = `${pdfEmbedSl} .pebInLine`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		
			${pdfEmbedSl}{
				text-align: ${alignment};
				padding: ${getSpaceCSS(padding)};
				margin: ${getSpaceCSS(margin)};
				box-shadow: ${getMultiShadowCSS(shadow)};
				${getBorderCSS(border)}
			}

			${sizedContainerSl}{
				width: ${['0px', '0%', '0em'].includes(width) ? 'auto' : width};
				height: ${['0px', '0vh', '0em'].includes(height) ? 'auto' : height};
			}

			${inLineSl}{
				width: ${['0px', '0%', '0em'].includes(width) ? 'auto' : width};
			}

	`}} />;
}
export default Style;