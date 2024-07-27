/**
 * Notices component.
 */

import { useSelect, useDispatch } from '@wordpress/data';
import { Notice } from '@wordpress/components';
import { STORE_NAME } from '../datastores/constants';

export default function Notices() {
	const { deleteNotice } = useDispatch(STORE_NAME);
	const notices = useSelect((select) => select(STORE_NAME).getNotices());

	if (!notices.length) {
		return null;
	}

	return (
		<div className="tempuser-notices">
			{notices.map((notice) => (
				<Notice
					key={notice.code}
					status={notice.noticeType}
					onRemove={() => deleteNotice(notice)}
				>
					{notice.message}
				</Notice>
			))}
		</div>
	);
}
