import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

const ApiKeyPlaceholder = ({ data, saveData, isLoading }) => {
	const [key, setKey] = useState('');

	useEffect(() => setKey(data || ''), [data]);

	return (
		<div
			className="pebApiKeyPlaceholder"
			style={{
				maxWidth: '500px',
				margin: '36px auto',
				background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
				borderRadius: '16px',
				border: '1px solid #e2e8f0',
				boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
				padding: '36px 32px 28px',
				textAlign: 'center',
				fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
			}}
		>
			<div
				style={{
					width: '52px',
					height: '52px',
					margin: '0 auto 16px',
					borderRadius: '14px',
					background: '#eff6ff',
					border: '1px solid #dbeafe',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: '#2563eb'
				}}
			>
				<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
					<polyline points="14 2 14 8 20 8"></polyline>
					<line x1="16" y1="13" x2="8" y2="13"></line>
					<line x1="16" y1="17" x2="8" y2="17"></line>
					<polyline points="10 9 9 9 8 9"></polyline>
				</svg>
			</div>

			<h3 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.01em' }}>
				{__('Adobe API Key Required', 'pdf-embed-block')}
			</h3>

			<p style={{ margin: '0 0 24px', fontSize: '13px', color: '#64748b', lineHeight: '1.5', maxWidth: '380px', marginLeft: 'auto', marginRight: 'auto' }}>
				{__('To display PDF files with the official Adobe Embed API, enter your free Client ID below.', 'pdf-embed-block')}
			</p>

			<div style={{ maxWidth: '400px', margin: '0 auto' }}>
				<div style={{
					display: 'flex',
					alignItems: 'stretch',
					borderRadius: '8px',
					overflow: 'hidden',
					boxShadow: '0 2px 5px rgba(0,0,0,0.04)'
				}}>
					<input
						type="text"
						value={key}
						placeholder={__('Enter Adobe Client ID...', 'pdf-embed-block')}
						onChange={(e) => setKey(e.target.value)}
						style={{
							flex: 1,
							height: '42px',
							padding: '0 14px',
							border: '1px solid #cbd5e1',
							borderRight: 'none',
							borderRadius: '8px 0 0 8px',
							fontSize: '13px',
							color: '#0f172a',
							outline: 'none',
							background: '#ffffff'
						}}
					/>
					<button
						type="button"
						onClick={() => saveData(key)}
						disabled={isLoading}
						style={{
							height: '42px',
							padding: '0 20px',
							background: '#2563eb',
							color: '#ffffff',
							fontWeight: '600',
							fontSize: '13px',
							border: 'none',
							borderRadius: '0 8px 8px 0',
							cursor: 'pointer',
							whiteSpace: 'nowrap',
							transition: 'background 0.2s'
						}}
					>
						{isLoading ? __('Saving...', 'pdf-embed-block') : __('Save Key', 'pdf-embed-block')}
					</button>
				</div>

				<div style={{ marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
					{__("Don't have an API key? ", 'pdf-embed-block')}
					<a
						href="https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-embed-api"
						target="_blank"
						rel="noreferrer"
						style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}
					>
						{__('Get a free key from Adobe Official Site', 'pdf-embed-block')} →
					</a>
				</div>
			</div>
		</div>
	);
};

export default ApiKeyPlaceholder;
