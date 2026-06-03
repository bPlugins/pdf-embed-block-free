import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import useWPAjax from '../../../../bpl-tools/hooks/useWPAjax';


const Settings = ({ deleteDataOnUninstall, uninstallNonce }) => {
    const [enabled, setEnabled] = useState(deleteDataOnUninstall);
    const [notice, setNotice] = useState('');

    const { data, saveData, isLoading, error } = useWPAjax('pebSaveUninstallOption', { nonce: uninstallNonce }, false);

    useEffect(() => {
        if (data) {
            setEnabled(data.enabled);
            setNotice(data.message);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            setNotice(__('Failed to save setting.', 'pdf-embed-block'));
        }
    }, [error]);

    const handleToggle = () => {
        const newValue = !enabled;

        // Show confirm dialog when enabling (destructive action)
        if (newValue) {
            const confirmed = window.confirm(
                __('Are you sure? This will permanently delete all PDF Embed Block data (API keys, configurations, and settings) when the plugin is uninstalled.', 'pdf-embed-block')
            );

            if (!confirmed) return;
        }

        setNotice('');
        saveData({ enabled: String(newValue) });
    };

    return <div className='bPlDashboardSettings bPlDashboardCard'>
        <h2>{__('Delete Data on Uninstall', 'pdf-embed-block')}</h2>

        <p>{__('When enabled, all plugin data will be permanently deleted when you uninstall (delete) the plugin. This includes:', 'pdf-embed-block')}</p>

        <ul>
            <li>{__('All PDF Embed posts (pdf_embed post type)', 'pdf-embed-block')}</li>
            <li>{__('All plugin settings and options', 'pdf-embed-block')}</li>
        </ul>

        <p className='settingsWarning'>
            {__('⚠️ This action cannot be undone. Your data will be safe if you only deactivate the plugin.', 'pdf-embed-block')}
        </p>

        <div className='settingsControl'>
            <label className='toggleControl'>
                <input type='checkbox' checked={enabled} onChange={handleToggle} disabled={isLoading} />

                <span className='toggleSlider' />
            </label>

            <span className='toggleLabel'>
                {enabled
                    ? __('Data will be deleted on uninstall', 'pdf-embed-block')
                    : __('Data will be preserved on uninstall', 'pdf-embed-block')
                }
            </span>
        </div>

        {notice && <div className={`settingsNotice ${enabled ? 'warning' : 'success'}`}>{notice}</div>}
    </div>;
};
export default Settings;
