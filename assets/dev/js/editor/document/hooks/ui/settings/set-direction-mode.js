import After from 'elementor-api/modules/hooks/ui/after';

/**
 * UI hook to set direction mode when changing element's settings.
 * Currently used to determine the direction of the flex icons in the Container element.
 * It should be generic and work with any element, and since each element might use a different
 * setting to determine its direction mode, the hook should listen to any setting change.
 * Therefore, there isn't a `getConditions()` method.
 */
export class SetDirectionMode extends After {
	getCommand() {
		return 'document/elements/settings';
	}

	getId() {
		return 'set-direction-mode--document/elements/settings';
	}

	apply( args ) {
		// Get the direction mode from the view & set the state accordingly.
		const direction = args.container?.view?.getCurrentUiStates?.().directionMode;

		if ( direction ) {
			$e.uiStates.set( 'document/direction-mode', direction );
			return;
		}

		$e.uiStates.remove( 'document/direction-mode' );
	}
}

export default SetDirectionMode;
