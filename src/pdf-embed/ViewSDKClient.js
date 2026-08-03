class ViewSDKClient {
	constructor(targetWindow = window, targetDocument = document) {
		this.targetWindow = targetWindow;
		this.targetDocument = targetDocument;

		this.readyPromise = new Promise(resolve => {
			if (this.targetWindow.AdobeDC) {
				resolve();
			} else {
				if (!this.targetDocument.getElementById('adobe-dc-sdk-script')) {
					const script = this.targetDocument.createElement('script');
					script.id = 'adobe-dc-sdk-script';
					script.src = 'https://documentcloud.adobe.com/view-sdk/viewer.js';
					this.targetDocument.head.appendChild(script);
				}
				this.targetDocument.addEventListener('adobe_dc_view_sdk.ready', () => resolve());
			}
		});

		this.adobeDCView = undefined;
	}

	ready() {
		return this.readyPromise;
	}

	previewFile(divId, viewerConfig, attributes, pebAPIKey, passedGlobalOptions) {
		const { file, options = {} } = attributes;
		const globalOpts = passedGlobalOptions || this.targetWindow.BPLG_DATA?.globalViewerOptions || this.targetWindow.PEB_BLOCK_DATA?.globalViewerOptions || {};
		const forceGlobal = globalOpts.forceGlobal ?? false;

		const showDownloadPDF = forceGlobal ? (globalOpts.showDownloadPDF ?? false) : (options.showDownloadPDF ?? globalOpts.showDownloadPDF ?? false);
		const showPrintPDF = forceGlobal ? (globalOpts.showPrintPDF ?? false) : (options.showPrintPDF ?? globalOpts.showPrintPDF ?? false);
		const showFullScreen = forceGlobal ? (globalOpts.showFullScreen ?? true) : (options.showFullScreen ?? globalOpts.showFullScreen ?? true);

		const defaultConfig = { clientId: pebAPIKey };
		
		if (divId) {
			defaultConfig.divId = divId;
		}

		this.adobeDCView = new this.targetWindow.AdobeDC.View(defaultConfig);

		const previewFilePromise = this.adobeDCView.previewFile({
			content: { location: { url: file.url } },
			metaData: { fileName: file.title || (file.url ? file.url.split('/').pop() : 'document.pdf'), id: file.id?.toString() }
		}, {
			showDownloadPDF,
			showPrintPDF,
			showFullScreen,
			embedMode: viewerConfig.embedMode,
			...viewerConfig
		});

		return previewFilePromise;
	}

}
export default ViewSDKClient;