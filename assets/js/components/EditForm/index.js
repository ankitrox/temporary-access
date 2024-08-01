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
import { UI_STORE_NAME } from '../../datastores/constants';

export default function EditForm() {
	const { clearErrors, decrementStep, incrementStep, setContext, resetForm } =
		useDispatch(UI_STORE_NAME);

	const currentStep = useSelect((select) =>
		select(UI_STORE_NAME).getCurrentStep()
	);

	const isUserEdit = useSelect((select) =>
		select(UI_STORE_NAME).isUserEdit()
	);

	const errors = useSelect((select) => select(UI_STORE_NAME).getErrors());
	const context = useSelect((select) => select(UI_STORE_NAME).getContext());
	const isOpen = context === 'edit';

	const stepValidationFn = useSelect((select) =>
		select(UI_STORE_NAME).getStepValidationFn()
	);

	const getUserCrateData = useSelect((select) =>
		select(UI_STORE_NAME).getData()
	);

	// If the current step is greater than the number of steps, return null.
	if (currentStep > steps.length) {
		return null;
	}

	const StepComponent = steps[currentStep].component;
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

	const onSubmit = () => {
		const valid = stepValidationFn();
		if (valid) {
			clearErrors();
			console.log(getUserCrateData);
		}
	};

	const isLastStep = currentStep === steps.length - 1;
	const hasPreviousStep = currentStep > 0;
	const CTALabel = isUserEdit
		? __('Update User', 'temporary-access')
		: __('Create User', 'temporary-access');

	return (
		<>
			{isOpen && (
				<Modal
					className="tempaccess-modal--edit-form"
					shouldCloseOnClickOutside={false}
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
										<StepLabel {...labelProps}>
											{label}
										</StepLabel>
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
									{__('Back', 'temporary-access')}
								</Button>
							)}
							{!isLastStep && (
								<Button variant="secondary" onClick={onNext}>
									{__('Next', 'temporary-access')}
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
			)}
		</>
	);
}
