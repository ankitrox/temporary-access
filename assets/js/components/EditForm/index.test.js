/**
 * Editform component tests.
 */

import { createTestRegistry, render, userEvent } from 'test-utils';
import { act, fireEvent } from '@testing-library/react';
import EditForm from './index';
import { UI_STORE_NAME } from '../../datastores/constants';
import fetchMock from 'fetch-mock-jest';

describe('EditForm', () => {
	let registry;

	const createUserEndpoint = new RegExp('^/tempaccess/v1/users/');

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

	describe('displays errors', () => {
		it('should display email and name errors', async () => {
			registry.dispatch(UI_STORE_NAME).setStep(0);
			registry.dispatch(UI_STORE_NAME).setContext('edit');

			const { getByRole, getByText, waitForRegistry } = render(
				<EditForm />,
				{
					registry,
				}
			);

			await waitForRegistry();

			const createUserCTA = getByRole('button', { name: /Next/i });

			act(() => {
				fireEvent.click(createUserCTA);
			});

			expect(getByText(/Invalid email/)).toBeInTheDocument();
			expect(getByText(/Invalid first name/)).toBeInTheDocument();
		});

		it('should display errors for step 2', async () => {
			registry.dispatch(UI_STORE_NAME).setStep(1);
			registry.dispatch(UI_STORE_NAME).setContext('edit');

			const { getByRole, getByText, waitForRegistry } = render(
				<EditForm />,
				{
					registry,
				}
			);

			await waitForRegistry();

			const createUserCTA = getByRole('button', { name: /Create User/i });

			act(() => {
				fireEvent.click(createUserCTA);
			});

			expect(getByText(/Invalid role/)).toBeInTheDocument();
			expect(getByText(/Invalid start date/)).toBeInTheDocument();
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

		it('should display next step when valid data is entered and next is clicked', async () => {
			registry.dispatch(UI_STORE_NAME).setStep(0);
			registry.dispatch(UI_STORE_NAME).setContext('edit');

			const { getByRole, getByLabelText, getByText, waitForRegistry } =
				render(<EditForm />, {
					registry,
				});

			await waitForRegistry();

			const createUserCTA = getByRole('button', { name: /Next/i });

			act(() => {
				fireEvent.change(getByLabelText(/Email/i), {
					target: { value: 'user@domain.com' },
				});
				fireEvent.change(getByLabelText(/First Name/i), {
					target: { value: 'User' },
				});
				fireEvent.change(getByLabelText(/Last Name/i), {
					target: { value: 'Name' },
				});

				fireEvent.click(createUserCTA);
			});

			const activeStepper = getByText('Access Details');
			expect(activeStepper).toHaveClass('Mui-active');
		});

		it('should display previous step when back is clicked', async () => {
			registry.dispatch(UI_STORE_NAME).setStep(1);
			registry.dispatch(UI_STORE_NAME).setContext('edit');

			const { getByRole, getByText, waitForRegistry } = render(
				<EditForm />,
				{
					registry,
				}
			);

			await waitForRegistry();

			const backButton = getByRole('button', { name: /Back/i });

			act(() => {
				fireEvent.click(backButton);
			});

			const activeStepper = getByText('User Details');
			expect(activeStepper).toHaveClass('Mui-active');
		});

		it('should submit the form when valid data is entered and submit is clicked', async () => {
			let calendar, calendarDays;
			const user = userEvent.setup();

			registry.dispatch(UI_STORE_NAME).setStep(1);
			registry.dispatch(UI_STORE_NAME).setContext('edit');

			const { getByLabelText, getByTestId, getByRole, waitForRegistry } =
				render(<EditForm />, {
					registry,
				});

			await waitForRegistry();

			// Select the role from the dropdown.
			const roleDropdown = getByLabelText(/Role/i);
			act(() => {
				fireEvent.click(roleDropdown, {
					target: { value: 'administrator' },
				});
			});

			const startDateButton = getByRole('button', {
				expanded: false,
				name: /Start Date/,
			});

			const endDateButton = getByRole('button', {
				expanded: false,
				name: /End Date/,
			});

			expect(startDateButton).toBeVisible();

			await user.click(startDateButton);

			calendar = getByTestId('datepickerPopover');
			calendarDays = calendar.querySelectorAll(
				'.components-datetime__date__day'
			);

			await user.click(calendarDays[0]);

			await user.click(endDateButton);

			calendar = getByTestId('datepickerPopover');
			calendarDays = calendar.querySelectorAll(
				'.components-datetime__date__day'
			);

			await user.click(calendarDays[10]);

			act(() => {
				registry
					.dispatch(UI_STORE_NAME)
					.setData('role', 'administrator');

				registry
					.dispatch(UI_STORE_NAME)
					.setData('startDate', '2021-09-01');

				registry
					.dispatch(UI_STORE_NAME)
					.setData('endDate', '2021-09-10');

				registry.dispatch(UI_STORE_NAME).setData('name', 'Test');

				registry.dispatch(UI_STORE_NAME).setData('surname', 'User');

				registry
					.dispatch(UI_STORE_NAME)
					.setData('email', 'test@test.com');

				registry
					.dispatch(UI_STORE_NAME)
					.setStepValidationFn(() => true);
			});

			fetchMock.postOnce(createUserEndpoint, {
				body: {
					user_email: 'test@test.com',
					first_name: 'Test',
					last_name: 'User',
					role: 'administrator',
					start_date: '2021-09-01',
					end_date: '2021-09-10',
					ID: undefined,
				},
				status: 200,
			});

			fetchMock.getOnce(new RegExp('^/tempaccess/v1/users/'), {
				body: {
					users: [],
					total: 0,
				},
				status: 200,
			});

			const createUserCTA = getByRole('button', { name: /Create User/i });
			await user.click(createUserCTA);

			// Make sure that dialog is closed and no longer exist in the document.
			expect(() => getByRole('dialog')).toThrow(
				/Unable to find an accessible element with the role "dialog"/
			);
		});
	});
});
