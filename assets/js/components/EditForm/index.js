/**
 * Add/Edit form for the user.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Flex, Modal } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import steps from './FormSteps';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { UI_STORE_NAME } from '../../datastores/constants';

export default function EditForm() {
	const { decrementStep, incrementStep, setContext } =
		useDispatch(UI_STORE_NAME);
	const closeModal = () => {
		setContext('default');
	};
	const context = useSelect((select) => select(UI_STORE_NAME).getContext());
	const isOpen = context === 'edit';

	const currentStep = useSelect((select) =>
		select(UI_STORE_NAME).getCurrentStep()
	);

	// If the current step is greater than the number of steps, return null.
	if (currentStep > steps.length) {
		return null;
	}

	const StepComponent = steps[currentStep].component;

	const isLastStep = currentStep === steps.length - 1;
	const hasPreviousStep = currentStep > 0;

	return (
		<>
			{isOpen && (
				<Modal
					className="tempaccess-modal--edit-form"
					shouldCloseOnClickOutside={false}
					isDismissible
					onRequestClose={closeModal}
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
						<StepComponent />
						<Flex>
							{hasPreviousStep && (
								<Button
									variant="secondary"
									onClick={decrementStep}
								>
									{__('Back', 'temporary-access')}
								</Button>
							)}
							{!isLastStep && (
								<Button
									variant="secondary"
									onClick={incrementStep}
								>
									{__('Next', 'temporary-access')}
								</Button>
							)}
							{isLastStep && (
								<Button variant="primary" onClick={() => {}}>
									{__('Create User', 'temporary-access')}
								</Button>
							)}
						</Flex>
					</Box>
				</Modal>
			)}
		</>
	);
}
