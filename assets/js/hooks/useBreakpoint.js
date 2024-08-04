/**
 * useBreakpoint hook.
 */

/**
 * External dependencies
 */
import { useWindowWidth } from '@react-hook/window-size';

export const BREAKPOINT_XLARGE = 'xlarge';
export const BREAKPOINT_DESKTOP = 'desktop';
export const BREAKPOINT_TABLET = 'tablet';
export const BREAKPOINT_SMALL = 'small';

/**
 * Retrieves the current breakpoint.
 *
 * @since 1.29.0
 *
 * @return {string} The current breakpoint according to the window size.
 */
export function useBreakpoint() {
	const onlyWidth = useWindowWidth();

	if (onlyWidth > 1280) {
		return BREAKPOINT_XLARGE;
	}

	if (onlyWidth > 960) {
		return BREAKPOINT_DESKTOP;
	}

	if (onlyWidth > 600) {
		return BREAKPOINT_TABLET;
	}

	return BREAKPOINT_SMALL;
}
