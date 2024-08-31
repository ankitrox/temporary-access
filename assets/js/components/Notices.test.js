/**
 * Notices component tests.
 */

import { render } from 'test-utils';
import Notices from './Notices';
import { STORE_NAME } from '../datastores/constants';

describe('Notices', () => {
	it('should render a notice', async () => {
		const setupRegistry = (r) => {
			r.dispatch(STORE_NAME).setNotice({
				code: 'test-notice',
				message: 'This is the information notice',
				noticeType: 'error',
			});
		};

		const { getAllByText, waitForRegistry } = render(<Notices />, {
			setupRegistry,
		});

		await waitForRegistry();

		expect(getAllByText('This is the information notice').length).toBe(2);
	});
});
