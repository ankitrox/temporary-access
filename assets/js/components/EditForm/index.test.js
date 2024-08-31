/**
 * Editform component tests.
 */

import { createTestRegistry, render } from 'test-utils';
import EditForm from './index';
import { UI_STORE_NAME } from '../../datastores/constants';

describe('EditForm', () => {
	let registry;

	beforeAll(() => {
		registry = createTestRegistry();
	});

	it('should render null when the context is not edit', async () => {
		registry.dispatch(UI_STORE_NAME).setStep(2);
		registry.dispatch(UI_STORE_NAME).setContext('default');

		const { queryByRole, waitForRegistry } = render(<EditForm />, {
			registry,
		});

		await waitForRegistry();

		const createUserModal = queryByRole('dialog');
		expect(createUserModal).not.toBeInTheDocument();
	});

	it('should render null when the current step is greater than allowd number of steps', async () => {
		registry.dispatch(UI_STORE_NAME).setStep(3);
		registry.dispatch(UI_STORE_NAME).setContext('edit');

		const { queryByRole, waitForRegistry } = render(<EditForm />, {
			registry,
		});

		await waitForRegistry();

		const createUserModal = queryByRole('dialog');
		expect(createUserModal).not.toBeInTheDocument();
	});

	it('should add the modal to the document', async () => {
		registry.dispatch(UI_STORE_NAME).setStep(0);
		registry.dispatch(UI_STORE_NAME).setContext('edit');

		const { getByRole, waitForRegistry } = render(<EditForm />, {
			registry,
		});

		await waitForRegistry();

		const createUserModal = getByRole('dialog');
		expect(createUserModal).toBeInTheDocument();
	});
});
