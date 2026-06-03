import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, PanelRow, Spinner, TextControl } from '@wordpress/components';
import { Label } from '../../../bpl-tools/Components';

const SettingsSaveForm = ({ data, dataLoading, saveData, isLoading }) => {
	const [key, setKey] = useState('');

	useEffect(() => setKey(data), [data, dataLoading]);

	// Check if Adobe API loaded
	if (dataLoading) {
		return <div className='pebSpinnerContainer'><Spinner /> {__(' Loading', 'pdf-embed-block')}</div>
	}

	return <>
		<div className='bplMediaPlaceholder'>
			<Label className='mb5'>{__('Adobe API Key (Client ID):', 'pdf-embed-block')}</Label>

			<PanelRow className='bplUrlInput'>
				<TextControl value={key} onChange={val => setKey(val)} />

				<Button className='saveSettings' onClick={() => saveData(key)} disabled={isLoading}>{__('Save', 'pdf-embed-block')}</Button>


			</PanelRow>
			<small className="helpText">
				{__('Get a free API Key from ')}
				<a
					href='https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-embed-api'
					target='_blank'
					rel='noreferrer'
				>
					{__('Adobe official site', 'pdf-embed-block')}
				</a>
			</small>
		</div>
	</>
}
export default SettingsSaveForm;