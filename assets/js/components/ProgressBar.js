/**
 * Componente ProgressBar.
 */

/**
 * External dependencies
 */
import classnames from 'classnames';
import { LinearProgress } from '@mui/material';
import invariant from 'invariant';

/**
 * Internal dependencies
 */
import {
	BREAKPOINT_DESKTOP,
	BREAKPOINT_SMALL,
	BREAKPOINT_TABLET,
	BREAKPOINT_XLARGE,
	useBreakpoint,
} from '../hooks/useBreakpoint';

export default function ProgressBar({
	className,
	small,
	compress,
	indeterminate,
	height,
	smallHeight,
	tabletHeight,
	desktopHeight,
	progress,
}) {
	const breakpoint = useBreakpoint();

	let progressBarHeight = height;

	if (BREAKPOINT_SMALL === breakpoint && smallHeight !== undefined) {
		progressBarHeight = smallHeight;
	} else if (BREAKPOINT_TABLET === breakpoint && tabletHeight !== undefined) {
		progressBarHeight = tabletHeight;
	} else if (
		(BREAKPOINT_XLARGE === breakpoint ||
			BREAKPOINT_DESKTOP === breakpoint) &&
		desktopHeight !== undefined
	) {
		progressBarHeight = desktopHeight;
	}

	let margin;

	if (progressBarHeight !== undefined) {
		// 4px is the height of the progress bar. Therefore the height must be at least 4px.
		invariant(progressBarHeight >= 4, 'height must be >= 4.');
		margin = Math.round((progressBarHeight - 4) / 2);
	}

	const transform = progress ? `scaleX(${progress})` : undefined;

	return (
		<div
			role="progressbar"
			style={{ marginTop: margin, marginBottom: margin }}
			className={classnames('tempaccess-linear-progress', className, {
				'tempaccess-indeterminate': indeterminate,
				'tempaccess-progress--small': small,
				'tempaccess-progress--compress': compress,
			})}
		>
			<div
				className="tempaccess-progress__bar tempaccess-progress__primary-bar"
				style={{ transform }}
			>
				<LinearProgress />
			</div>
		</div>
	);
}
