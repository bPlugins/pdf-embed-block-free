import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { Label, Notice } from '../../../bpl-tools/Components';
import { pxUnit, perUnit, emUnit, vhUnit } from '../../../bpl-tools/utils/options';
import SettingsSaveForm from './SettingsSaveForm';
import { embedModes } from './utils/options';
import { AdvertiseCard } from '../../../bpl-tools/ProControls';
import PDFFileSelector from './components/PDFFileSelector';

const Settings = ({ attributes, setAttributes, data, dataLoading, saveData, isLoading, siteUrl }) => {
	const { config, options = {}, width, height } = attributes || {};
	const { embedMode = '' } = config;

	const globalOpts = window.PEB_BLOCK_DATA?.globalViewerOptions || window.BPLG_DATA?.globalViewerOptions || {};
	const forceGlobal = globalOpts.forceGlobal ?? false;

	const showDownloadPDF = forceGlobal ? (globalOpts.showDownloadPDF ?? false) : (options.showDownloadPDF ?? globalOpts.showDownloadPDF ?? false);
	const showPrintPDF = forceGlobal ? (globalOpts.showPrintPDF ?? false) : (options.showPrintPDF ?? globalOpts.showPrintPDF ?? false);
	const showFullScreen = forceGlobal ? (globalOpts.showFullScreen ?? true) : (options.showFullScreen ?? globalOpts.showFullScreen ?? true);

	const pricingURL = `${siteUrl}/wp-admin/edit.php?post_type=pdf_embed&page=peb_demo_page#/pricing`;

	const onConfigChange = (type, val) => setAttributes({ config: { ...config, [type]: val } });

	return <>
		<InspectorControls>
			<PanelBody className='bPlPanelBody' title={__('PDF Settings', 'pdf-embed-block')}>
				<SettingsSaveForm data={data} dataLoading={dataLoading} saveData={saveData} isLoading={isLoading} />

				<PDFFileSelector {...{ attributes, setAttributes }} />

				<PanelRow>
					<Label className=''>{__('Embed Mode:', 'pdf-embed-block')}</Label>
					<SelectControl value={embedMode} onChange={val => onConfigChange('embedMode', val)} options={embedModes} />
				</PanelRow>
			</PanelBody>

			<PanelBody className="bPlPanelBody" title={__('Viewer Options', 'pdf-embed-block')}>
				{forceGlobal && (
					<div style={{ padding: '8px 12px', background: '#eef6fc', borderLeft: '3px solid #007cba', fontSize: '12px', marginBottom: '12px' }}>
						{__('Global Settings Profile is active. Options are being controlled globally across all PDFs.', 'pdf-embed-block')}
					</div>
				)}
				<ToggleControl
					className='mt10'
					label={__('Show Download PDF', 'pdf-embed-block')}
					checked={showDownloadPDF}
					onChange={(value) => setAttributes({ options: { ...options, showDownloadPDF: value } })}
					disabled={forceGlobal}
				/>
				<ToggleControl
					className='mt10'
					label={__('Show Print PDF', 'pdf-embed-block')}
					checked={showPrintPDF}
					onChange={(value) => setAttributes({ options: { ...options, showPrintPDF: value } })}
					disabled={forceGlobal}
				/>
				<ToggleControl
					className='mt10'
					label={__('Show Fullscreen Mode', 'pdf-embed-block')}
					checked={showFullScreen}
					onChange={(value) => setAttributes({ options: { ...options, showFullScreen: value } })}
					disabled={forceGlobal}
				/>
			</PanelBody>

			<PanelBody className='bPlPanelBody' title={__('Layout Settings', 'pdf-embed-block')} initialOpen={false}>
				<UnitControl className='mt10' label={__('Width:', 'pdf-embed-block')} labelPosition='left' value={width} onChange={val => setAttributes({ width: val })} units={[pxUnit(650), perUnit(100), emUnit(40)]} isResetValueOnUnitChange={true} />

				{'IN_LINE' !== embedMode && <UnitControl className='mt10' label={__('Height:', 'pdf-embed-block')} labelPosition='left' value={height} onChange={val => setAttributes({ height: val })} units={[pxUnit(459), vhUnit(100), emUnit(28)]} isResetValueOnUnitChange={true} />}

				<Notice status='premium' isIcon={true} className='mt20'>
					{__('Padding, Margin, Border & Shadow settings are available in the Pro version.', 'pdf-embed-block')}
				</Notice>

			</PanelBody>

			<AdvertiseCard planLink={pricingURL || 'https://bplugins.com/products/pdf-embed-block/pricing'} />

		</InspectorControls>
	</>;

};

export default compose(
	withSelect((select) => {
		return {
			siteUrl: select('core').getSite()?.url,
		};
	})
)(Settings);