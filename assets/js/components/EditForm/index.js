/**
 * Add/Edit form for the user.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Button,
	Flex,
	Modal,
	Notice,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import steps from './FormSteps';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { STORE_NAME, UI_STORE_NAME } from '../../datastores/constants';

export default function EditForm() {
	const dispatch = useDispatch();
	const { clearErrors, decrementStep, incrementStep, setContext, resetForm } =
		useDispatch(UI_STORE_NAME);
	const { createUser, getUsers, setNotice } = useDispatch(STORE_NAME);

	const currentStep = useSelect((select) =>
		select(UI_STORE_NAME).getCurrentStep()
	);

	const isUserEdit = useSelect((select) =>
		select(UI_STORE_NAME).isUserEdit()
	);

	const errors = useSelect((select) => select(UI_STORE_NAME).getErrors());
	const context = useSelect((select) => select(UI_STORE_NAME).getContext());

	const stepValidationFn = useSelect((select) =>
		select(UI_STORE_NAME).getStepValidationFn()
	);

	const getPageModal = useSelect((select) =>
		select(UI_STORE_NAME).getPageModal()
	);

	const formData = useSelect((select) => select(UI_STORE_NAME).getData());

	if (context !== 'edit') {
		return null;
	}

	// If the current step is greater than the number of steps, return null.
	if (currentStep > steps.length) {
		return null;
	}

	const StepComponent = steps[currentStep]?.component;
	const hasErrors = Object.keys(errors).length > 0;

	const onCloseModal = () => {
		// Reset the form and close the modal.
		resetForm();
		setContext('default');
	};

	const onNext = () => {
		const valid = stepValidationFn();

		if (valid) {
			clearErrors();
			incrementStep();
		}
	};

	const onBack = () => {
		clearErrors();
		decrementStep();
	};

	const onSubmit = async () => {
		const valid = stepValidationFn();
		if (valid) {
			clearErrors();

			const userData = {
				user_email: formData.email,
				first_name: formData.name,
				last_name: formData.surname,
				role: formData.role,
				start_date: formData.startDate,
				end_date: formData.endDate,
				ID: formData?.ID,
			};

			const { error } = await createUser(userData);

			if (!error) {
				setNotice({
					code: 'user_created',
					message: isUserEdit
						? __('User updated successfully', 'passwordless-login')
						: __('User created successfully', 'passwordless-login'),
					noticeType: 'success',
				});

				dispatch(STORE_NAME).invalidateResolution('getUsers', [
					getPageModal,
				]);

				onCloseModal();
				getUsers(getPageModal);
			}
		}
	};

	const isLastStep = currentStep === steps.length - 1;
	const hasPreviousStep = currentStep > 0;
	const CTALabel = isUserEdit
		? __('Update User', 'passwordless-login')
		: __('Create User', 'passwordless-login');

	return (
		<Modal
			className="tempaccess-modal-edit-form"
			shouldCloseOnClickOutside={false}
			shouldCloseOnEsc={false}
			isDismissible
			onRequestClose={onCloseModal}
		>
			<Box sx={{ width: '100%' }}>
				<Stepper activeStep={0} alternativeLabel>
					{steps.map(({ label }, index) => {
						const stepProps = {
							active: index === currentStep,
						};
						const labelProps = {};
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>

				{hasErrors &&
					errors.map(({ code, message }) => (
						<Spacer key={code} marginY={3}>
							<Notice
								key={code}
								status="error"
								isDismissible={false}
							>
								{message}
							</Notice>
						</Spacer>
					))}

				<Spacer marginY={6}>
					<StepComponent />
				</Spacer>
				<Flex>
					{hasPreviousStep && (
						<Button variant="secondary" onClick={onBack}>
							{__('Back', 'passwordless-login')}
						</Button>
					)}
					{!isLastStep && (
						<Button variant="secondary" onClick={onNext}>
							{__('Next', 'passwordless-login')}
						</Button>
					)}
					{isLastStep && (
						<Button variant="primary" onClick={onSubmit}>
							{CTALabel}
						</Button>
					)}
				</Flex>
			</Box>
		</Modal>
	);
}
