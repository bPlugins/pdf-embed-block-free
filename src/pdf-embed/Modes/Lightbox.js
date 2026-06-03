import { useEffect, useState } from 'react';
import ViewSDKClient from '../ViewSDKClient';

const Lightbox = ({ attributes, clientId, pebAPIKey, buttonText = 'View PDF' }) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			const viewSDKClient = new ViewSDKClient();

			viewSDKClient.ready().then(() => {
				viewSDKClient.previewFile(
					`pebPDFArea_${clientId}`,
					{ embedMode: 'LIGHTBOX' },
					attributes,
					pebAPIKey
				);
			});
		}
	}, [isOpen, attributes, clientId, pebAPIKey]);

	return (
		<>
			<button
				type="button"
				className="pebLightboxBtn"
				onClick={() => setIsOpen(true)}
			>
				{buttonText}
			</button>

			{isOpen && (
				<div
					className='pebLightboxOverlay'
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100vw',
						height: '100vh',
						background: 'rgba(0,0,0,0.8)',
						zIndex: 9999,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					onClick={() => setIsOpen(false)}
				>
					<div
						id={`pebPDFArea_${clientId}`}
						style={{
							width: '80%',
							height: '90%',
							background: '#fff',
						}}
						onClick={(e) => e.stopPropagation()}
					></div>
				</div>
			)}
		</>
	);
};

export default Lightbox;
