/**
 * Editform component tests.
 */

import { createTestRegistry, render } from 'test-utils';
import EditForm from './index';
import { UI_STORE_NAME } from '../../datastores/constants';
import { prettyDOM } from '@testing-library/dom';

describe('EditForm', () => {
	let registry;

	beforeAll(() => {
		registry = createTestRegistry();
	});

	describe('returns null', () => {
		it('when the context is not edit', async () => {
			registry.dispatch(UI_STORE_NAME).setStep(2);
			registry.dispatch(UI_STORE_NAME).setContext('default');

			const { queryByRole, waitForRegistry } = render(<EditForm />, {
				registry,
			});

			await waitForRegistry();

			const createUserModal = queryByRole('dialog');
			expect(createUserModal).not.toBeInTheDocument();
		});

		it('when the current step is greater than allowd number of steps', async () => {
			registry.dispatch(UI_STORE_NAME).setStep(3);
			registry.dispatch(UI_STORE_NAME).setContext('edit');

			const { queryByRole, waitForRegistry } = render(<EditForm />, {
				registry,
			});

			await waitForRegistry();

			const createUserModal = queryByRole('dialog');
			expect(createUserModal).not.toBeInTheDocument();
		});
	});

	describe('renders the modal', () => {
		it('when context is edit and step count is valid', async () => {
			registry.dispatch(UI_STORE_NAME).setStep(0);
			registry.dispatch(UI_STORE_NAME).setContext('edit');

			const { getByText, getByRole, waitForRegistry } = render(
				<EditForm />,
				{
					registry,
				}
			);

			await waitForRegistry();

			const createUserModal = getByRole('dialog');
			expect(createUserModal).toBeInTheDocument();

			// Check the current step is active in the form.
			const activeStepper = getByText('User Details');
			expect(activeStepper).toHaveClass('Mui-active');

			const inActiveStepper = getByText('Access Details');
			expect(inActiveStepper).not.toHaveClass('Mui-active');
		});
	});
});
