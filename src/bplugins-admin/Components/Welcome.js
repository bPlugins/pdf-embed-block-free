import Overview from '../../../../bpl-tools/Admin/Overview';
import Card from '../../../../bpl-tools/Admin/Blocks/Card';
import Changelog from '../../../../bpl-tools/Admin/Changelog';
import ProAds from '../../../../bpl-tools/Admin/ProAds';
import blocks from '../utils/blocks';
import useBlocksSettings from '../hooks/useBlocksSettings';
import { __ } from '@wordpress/i18n';

const Welcome = (props) => {
	const { isPremium, action, nonce } = props;
	const { data, internalStatus, saveToBackend } = useBlocksSettings(action, nonce);

	return <Overview {...props}>
		<Card
			{...props}
			allBlocks={blocks}
			cardTitle='Blocks'
			seeAllLink='#blocks'
			disabledBlocks={data}
			status={internalStatus}
			onChange={saveToBackend}
		/>

		<div style={{
			display: 'grid',
			gridTemplateColumns: isPremium ? '1fr' : 'repeat(auto-fill, minmax(min(480px, 100%), 1fr))',
			gap: '32px'
		}}>
			<Changelog {...props} limit={1} loadMoreLabel={__('View More Changelogs', 'print-page')} />

			{!isPremium && <ProAds {...props} />}
		</div>
	</Overview>
}
export default Welcome;