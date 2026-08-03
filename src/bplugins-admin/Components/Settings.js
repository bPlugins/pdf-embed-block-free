import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import useWPAjax from '../../../../bpl-tools/hooks/useWPAjax';

const Settings = ({ deleteDataOnUninstall, uninstallNonce, globalViewerOptions = {}, globalOptionsNonce }) => {
    // Uninstall Data Setting state
    const [enabledUninstall, setEnabledUninstall] = useState(deleteDataOnUninstall);
    const [uninstallNotice, setUninstallNotice] = useState('');

    const {
        data: uninstallData,
        saveData: saveUninstallData,
        isLoading: isUninstallLoading,
        error: uninstallError
    } = useWPAjax('pebSaveUninstallOption', { nonce: uninstallNonce }, false);

    useEffect(() => {
        if (uninstallData) {
            setEnabledUninstall(uninstallData.enabled);
            setUninstallNotice(uninstallData.message);
        }
    }, [uninstallData]);

    useEffect(() => {
        if (uninstallError) {
            setUninstallNotice(__('Failed to save setting.', 'pdf-embed-block'));
        }
    }, [uninstallError]);

    const handleUninstallToggle = () => {
        const newValue = !enabledUninstall;

        if (newValue) {
            const confirmed = window.confirm(
                __('Are you sure? This will permanently delete all PDF Embed Block data (API keys, configurations, and settings) when the plugin is uninstalled.', 'pdf-embed-block')
            );

            if (!confirmed) return;
        }

        setUninstallNotice('');
        saveUninstallData({ enabled: String(newValue) });
    };

    // Global Viewer Settings state
    const [viewerOpts, setViewerOpts] = useState({
        showDownloadPDF: globalViewerOptions.showDownloadPDF ?? false,
        showPrintPDF: globalViewerOptions.showPrintPDF ?? false,
        showFullScreen: globalViewerOptions.showFullScreen ?? true,
        forceGlobal: globalViewerOptions.forceGlobal ?? false,
    });
    const [globalNotice, setGlobalNotice] = useState('');

    const {
        data: globalSaveData,
        saveData: saveGlobalOptions,
        isLoading: isGlobalLoading,
        error: globalError
    } = useWPAjax('pebSaveGlobalViewerOptions', { nonce: globalOptionsNonce }, false);

    useEffect(() => {
        if (globalSaveData) {
            if (globalSaveData.options) {
                setViewerOpts(globalSaveData.options);
            }
            if (globalSaveData.message) {
                setGlobalNotice(globalSaveData.message);
            }
        }
    }, [globalSaveData]);

    useEffect(() => {
        if (globalError) {
            setGlobalNotice(__('Failed to save global viewer settings.', 'pdf-embed-block'));
        }
    }, [globalError]);

    const handleOptionChange = (key, value) => {
        const updated = { ...viewerOpts, [key]: value };
        setViewerOpts(updated);
        setGlobalNotice('');
        saveGlobalOptions({ options: JSON.stringify(updated) });
    };

    return (
        <div className='bPlDashboardSettingsWrap'>
            {/* Global PDF Viewer Settings Profile Card */}
            <div className='bPlDashboardSettings bPlDashboardCard mb20' style={{ marginBottom: '24px' }}>
                <h2>{__('Global PDF Viewer Settings Profile', 'pdf-embed-block')}</h2>

                <p>{__('Configure default viewer options that apply to all PDF Embed blocks across your website. Individual PDF blocks will inherit these default settings unless customized.', 'pdf-embed-block')}</p>

                <div className='settingsControlGroup' style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className='settingsControl'>
                        <label className='toggleControl'>
                            <input
                                type='checkbox'
                                checked={viewerOpts.showDownloadPDF}
                                onChange={(e) => handleOptionChange('showDownloadPDF', e.target.checked)}
                                disabled={isGlobalLoading}
                            />
                            <span className='toggleSlider' />
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className='toggleLabel' style={{ fontWeight: '600' }}>
                                {__('Show Download PDF', 'pdf-embed-block')}
                            </span>
                            <span style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                                {__('Default Download option for all PDF embeds across the website.', 'pdf-embed-block')}
                            </span>
                        </div>
                    </div>

                    <div className='settingsControl'>
                        <label className='toggleControl'>
                            <input
                                type='checkbox'
                                checked={viewerOpts.showPrintPDF}
                                onChange={(e) => handleOptionChange('showPrintPDF', e.target.checked)}
                                disabled={isGlobalLoading}
                            />
                            <span className='toggleSlider' />
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className='toggleLabel' style={{ fontWeight: '600' }}>
                                {__('Show Print PDF', 'pdf-embed-block')}
                            </span>
                            <span style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                                {__('Default Print option for all PDF embeds across the website.', 'pdf-embed-block')}
                            </span>
                        </div>
                    </div>

                    <div className='settingsControl'>
                        <label className='toggleControl'>
                            <input
                                type='checkbox'
                                checked={viewerOpts.showFullScreen}
                                onChange={(e) => handleOptionChange('showFullScreen', e.target.checked)}
                                disabled={isGlobalLoading}
                            />
                            <span className='toggleSlider' />
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className='toggleLabel' style={{ fontWeight: '600' }}>
                                {__('Show Fullscreen Mode', 'pdf-embed-block')}
                            </span>
                            <span style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                                {__('Default Fullscreen Mode option for all PDF embeds across the website.', 'pdf-embed-block')}
                            </span>
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #eaeaea', margin: '8px 0' }} />

                    <div className='settingsControl'>
                        <label className='toggleControl'>
                            <input
                                type='checkbox'
                                checked={viewerOpts.forceGlobal}
                                onChange={(e) => handleOptionChange('forceGlobal', e.target.checked)}
                                disabled={isGlobalLoading}
                            />
                            <span className='toggleSlider' />
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className='toggleLabel' style={{ fontWeight: '600' }}>
                                {__('Apply Settings Globally to All PDFs', 'pdf-embed-block')}
                            </span>
                            <span style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                                {__('Enabling this overrides individual block settings across all posts and pages, applying Print & Download options everywhere at once.', 'pdf-embed-block')}
                            </span>
                        </div>
                    </div>
                </div>

                {globalNotice && <div className='settingsNotice success' style={{ marginTop: '16px' }}>{globalNotice}</div>}
            </div>

            {/* Uninstall Card */}
            <div className='bPlDashboardSettings bPlDashboardCard'>
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
                        <input type='checkbox' checked={enabledUninstall} onChange={handleUninstallToggle} disabled={isUninstallLoading} />
                        <span className='toggleSlider' />
                    </label>

                    <span className='toggleLabel'>
                        {enabledUninstall
                            ? __('Data will be deleted on uninstall', 'pdf-embed-block')
                            : __('Data will be preserved on uninstall', 'pdf-embed-block')
                        }
                    </span>
                </div>

                {uninstallNotice && <div className={`settingsNotice ${enabledUninstall ? 'warning' : 'success'}`}>{uninstallNotice}</div>}
            </div>
        </div>
    );
};

export default Settings;
