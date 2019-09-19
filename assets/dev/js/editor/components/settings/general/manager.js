import Component from './component';

var BaseSettings = require( 'elementor-editor/components/settings/base/manager' );

module.exports = BaseSettings.extend( {
	onInit: function() {
		BaseSettings.prototype.onInit.apply( this );

		$e.components.register( new Component( { manager: this } ) );
	},

	changeCallbacks: {
		elementor_page_title_selector: function( newValue ) {
			var newSelector = newValue || 'h1.entry-title',
				titleSelectors = elementor.settings.page.model.controls.hide_title.selectors = {};

			titleSelectors[ newSelector ] = 'display: none';

			elementor.settings.page.updateStylesheet();
		},
	},

	getEditedView() {
		const editModel = new Backbone.Model( {
			id: 'general_settings',
			elType: 'general_settings',
			settings: elementor.settings.general.model,
		} );

		const container = new elementorModules.editor.Container( {
			id: editModel.id,
			label: elementor.translate( 'global_settings' ),
			document: elementor.getPreviewContainer(),
			view: '@see general/manager.js',
			model: editModel,
			controls: editModel.controls,
			settings: editModel.get( 'settings' ),
			renderer: false,
		} );

		return {
			getContainer: () => container,
			getEditModel: () => editModel,
			model: editModel,
		};
	},
} );
