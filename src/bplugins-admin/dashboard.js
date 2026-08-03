import { createRoot } from 'react-dom/client';
import { __ } from '@wordpress/i18n';
import './dashboard.scss';
import App from './Components/App';
import { dashboardInfo } from './utils/data';
import Settings from './Components/Settings';

document.addEventListener('DOMContentLoaded', () => {
	const dashboardEl = document.getElementById('pebCurrentBplDashboard');
	if (dashboardEl && dashboardEl.dataset.info) {
		const info = JSON.parse(dashboardEl.dataset.info);
		createRoot(dashboardEl).render(<App {...dashboardInfo(info)} />);	
		dashboardEl.removeAttribute('data-info');
	}

	const settingsEl = document.getElementById('pebSettingsDashboard');
	if (settingsEl && settingsEl.dataset.info) {
		const info = JSON.parse(settingsEl.dataset.info);
		createRoot(settingsEl).render(
			<div className='bPlDashboard' style={{ padding: '24px' }}>
				<div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
					<h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#0f172a' }}>
						{__('PDF Embed Block - Settings', 'pdf-embed-block')}
					</h1>
				</div>
				<div style={{ maxWidth: '840px' }}>
					<Settings {...info} />
				</div>
			</div>
		);
		settingsEl.removeAttribute('data-info');
	}
});