import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import useWPAjax from '../../../../bpl-tools/hooks/useWPAjax';

const Settings = ({
    deleteDataOnUninstall,
    uninstallNonce,
    globalViewerOptions = {},
    globalOptionsNonce
}) => {
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

    // Determine what to render based on page context
    const showGlobalProfileCard = true;
    const showUninstallCard = true;

    return (
        <div className='bPlDashboardContainer bPlDashboardSettingsWrap' style={{ maxWidth: '850px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '100%'
            }}>
                {/* Global PDF Viewer Settings Profile Card */}
                {showGlobalProfileCard && (
                    <div
                        className='bPlDashboardCard'
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '24px',
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            {/* Header */}
                            <div style={{ marginBottom: '20px' }}>
                                <h2 style={{ margin: '0 0 6px', fontSize: '18px', fontWeight: '700', color: '#070127', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    ⚙️ {__('Global PDF Viewer Settings Profile', 'pdf-embed-block')}
                                </h2>
                                <p style={{ margin: 0, fontSize: '13px', color: '#1b2e4b', lineHeight: '1.4' }}>
                                    {__('Configure default viewer options that apply specifically to the PDF Embed block across your website.', 'pdf-embed-block')}
                                </p>
                            </div>

                            {/* Inner Sections Stacked in Card */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                                {/* Toolbar Features Controls */}
                                <div style={{
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '0',
                                    padding: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '14px'
                                }}>
                                    <h3 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#070127', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        🛠️ {__('Toolbar Controls', 'pdf-embed-block')}
                                    </h3>

                                    <div className='settingsControl' style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <label className='toggleControl' style={{ marginTop: '2px' }}>
                                            <input
                                                type='checkbox'
                                                checked={viewerOpts.showDownloadPDF}
                                                onChange={(e) => handleOptionChange('showDownloadPDF', e.target.checked)}
                                                disabled={isGlobalLoading}
                                            />
                                            <span className='toggleSlider' />
                                        </label>
                                        <div style={{ flex: 1 }}>
                                            <span className='toggleLabel' style={{ fontWeight: '600', fontSize: '13px', color: '#070127' }}>
                                                {__('Show Download PDF', 'pdf-embed-block')}
                                            </span>
                                            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
                                                {__('Display download button allowing visitors to save the PDF file.', 'pdf-embed-block')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='settingsControl' style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <label className='toggleControl' style={{ marginTop: '2px' }}>
                                            <input
                                                type='checkbox'
                                                checked={viewerOpts.showPrintPDF}
                                                onChange={(e) => handleOptionChange('showPrintPDF', e.target.checked)}
                                                disabled={isGlobalLoading}
                                            />
                                            <span className='toggleSlider' />
                                        </label>
                                        <div style={{ flex: 1 }}>
                                            <span className='toggleLabel' style={{ fontWeight: '600', fontSize: '13px', color: '#070127' }}>
                                                {__('Show Print PDF', 'pdf-embed-block')}
                                            </span>
                                            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
                                                {__('Display print button on toolbar for direct document printing.', 'pdf-embed-block')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='settingsControl' style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <label className='toggleControl' style={{ marginTop: '2px' }}>
                                            <input
                                                type='checkbox'
                                                checked={viewerOpts.showFullScreen}
                                                onChange={(e) => handleOptionChange('showFullScreen', e.target.checked)}
                                                disabled={isGlobalLoading}
                                            />
                                            <span className='toggleSlider' />
                                        </label>
                                        <div style={{ flex: 1 }}>
                                            <span className='toggleLabel' style={{ fontWeight: '600', fontSize: '13px', color: '#070127' }}>
                                                {__('Show Fullscreen Mode', 'pdf-embed-block')}
                                            </span>
                                            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#64748b' }}>
                                                {__('Allow users to expand the PDF viewer to full screen presentation mode.', 'pdf-embed-block')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Global Enforcement */}
                                <div style={{
                                    background: '#f0f9ff',
                                    border: '1px solid #bae6fd',
                                    borderRadius: '0',
                                    padding: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }}>
                                    <h3 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        🌐 {__('Global Enforcement', 'pdf-embed-block')}
                                    </h3>

                                    <div className='settingsControl' style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <label className='toggleControl' style={{ marginTop: '2px' }}>
                                            <input
                                                type='checkbox'
                                                checked={viewerOpts.forceGlobal}
                                                onChange={(e) => handleOptionChange('forceGlobal', e.target.checked)}
                                                disabled={isGlobalLoading}
                                            />
                                            <span className='toggleSlider' />
                                        </label>
                                        <div style={{ flex: 1 }}>
                                            <span className='toggleLabel' style={{ fontWeight: '700', fontSize: '13px', color: '#0369a1' }}>
                                                {__('Apply Settings Globally to All PDFs', 'pdf-embed-block')}
                                            </span>
                                            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#0c4a6e', lineHeight: '1.45' }}>
                                                {__('Enabling this instantly overrides individual block settings across all posts and pages.', 'pdf-embed-block')}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{
                                        background: '#ffffff',
                                        border: '1px solid #e0f2fe',
                                        borderRadius: '0',
                                        padding: '10px 12px',
                                        fontSize: '12px',
                                        color: '#0284c7',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span>💡</span>
                                        <span style={{ lineHeight: '1.4' }}>
                                            {__('Individual blocks in the Gutenberg editor will automatically inherit these settings.', 'pdf-embed-block')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {globalNotice && (
                            <div className='settingsNotice success'>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    background: '#10b981',
                                    color: '#ffffff',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    flexShrink: 0
                                }}>
                                    ✓
                                </span>
                                <span style={{ flex: 1, lineHeight: '1.4' }}>{globalNotice}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Uninstall Card */}
                {showUninstallCard && (
                    <div
                        className='bPlDashboardCard'
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '24px',
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            <h2 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: '700', color: '#070127', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                🗑️ {__('Delete Data on Uninstall', 'pdf-embed-block')}
                            </h2>

                            <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#1b2e4b', lineHeight: '1.4' }}>
                                {__('When enabled, all plugin data will be permanently deleted when you uninstall (delete) the plugin. This includes:', 'pdf-embed-block')}
                            </p>

                            <ul style={{ margin: '0 0 16px', paddingLeft: '20px', fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                                <li>{__('All PDF Embed posts (pdf_embed post type)', 'pdf-embed-block')}</li>
                                <li>{__('All plugin settings and options', 'pdf-embed-block')}</li>
                            </ul>

                            <div style={{
                                background: '#fffbeb',
                                border: '1px solid #fde68a',
                                borderRadius: '0',
                                padding: '12px 14px',
                                fontSize: '12px',
                                color: '#b45309',
                                marginBottom: '20px',
                                lineHeight: '1.45'
                            }}>
                                ⚠️ <strong>{__('This action cannot be undone.', 'pdf-embed-block')}</strong> {__('Your data will be safe if you only deactivate the plugin.', 'pdf-embed-block')}
                            </div>

                            <div className='settingsControl' style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '0', border: '1px solid #e2e8f0' }}>
                                <label className='toggleControl'>
                                    <input type='checkbox' checked={enabledUninstall} onChange={handleUninstallToggle} disabled={isUninstallLoading} />
                                    <span className='toggleSlider' />
                                </label>

                                <span className='toggleLabel' style={{ fontWeight: '600', fontSize: '13px', color: '#070127' }}>
                                    {enabledUninstall
                                        ? __('Data will be deleted on uninstall', 'pdf-embed-block')
                                        : __('Data will be preserved on uninstall', 'pdf-embed-block')
                                    }
                                </span>
                            </div>
                        </div>

                        {uninstallNotice && (
                            <div className={`settingsNotice ${enabledUninstall ? 'warning' : 'success'}`}>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    background: enabledUninstall ? '#f59e0b' : '#10b981',
                                    color: '#ffffff',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    flexShrink: 0
                                }}>
                                    {enabledUninstall ? '!' : '✓'}
                                </span>
                                <span style={{ flex: 1, lineHeight: '1.4' }}>{uninstallNotice}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
