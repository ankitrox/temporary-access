<?php
/**
 * Endpoint to manage temporary user settings.
 *
 * @package Ankit\TemporaryAccess
 * @since   1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\REST;

use WP_REST_Response;
use WP_REST_Server;

/**
 * Class Settings
 *
 * @package Ankit\TemporaryAccess\REST
 */
class Settings extends Base {

	/**
	 * Settings name.
	 */
	const SETTINGS_NAME = 'temporary_access_settings';

	/**
	 * Get settings.
	 *
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return void
	 */
	public function register(): void {
		$this->register_route(
			'/settings',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_settings' ),
				'permission_callback' => array( $this, 'get_permission_callback' ),
			)
		);

		$this->register_route(
			'/settings',
			array(
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'update_settings' ),
				'permission_callback' => array( $this, 'get_permission_callback' ),
			)
		);
	}

	/**
	 * Get settings.
	 */
	protected function get_allowed_settings(): array {
		return array(
			'default_expiry'           => array(
				'type'        => 'integer',
				'description' => __( 'Default expiry time for temporary users in seconds.', 'temporary-access' ),
			),
			'default_role'             => array(
				'type'        => 'string',
				'description' => __( 'Default role for temporary users.', 'temporary-access' ),
				'default'     => 'administrator',
			),
			'default_redirect'         => array(
				'type'        => 'string',
				'description' => __( 'Default redirect URL after login.', 'temporary-access' ),
				'default'     => home_url(),
			),
			'delete_data_on_uninstall' => array(
				'type'        => 'boolean',
				'description' => __( 'Delete all plugin data on uninstall.', 'temporary-access' ),
				'default'     => false,
			),
			'track_usage'              => array(
				'type'        => 'boolean',
				'description' => __( 'Help us to track the usage of plugin anonymously to make it better.', 'temporary-access' ),
				'default'     => false,
			),
		);
	}

	/**
	 * Get settings.
	 *
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return WP_REST_Response
	 */
	public function get_settings( \WP_REST_Request $request ): WP_REST_Response {
		// Check if settings is available in database, if not then return default values of allowed settings.
		$settings = get_option( self::SETTINGS_NAME, array() );

		if ( empty( $settings ) ) {
			$settings = array();
			foreach ( $this->get_allowed_settings() as $key => $setting ) {
				$settings[ $key ] = $setting['default'] ?? null;
			}
		}

		return new WP_REST_Response( $settings, 200 );
	}

	/**
	 * Update settings.
	 *
	 * @param \WP_REST_Request $request Request object.
	 *
	 * @return WP_REST_Response
	 */
	public function update_settings( \WP_REST_Request $request ): WP_REST_Response {
		$settings = get_option( self::SETTINGS_NAME, array() );

		$allowed_settings = $this->get_allowed_settings();

		foreach ( $allowed_settings as $key => $setting ) {
			if ( $request->get_param( $key ) ) {
				$settings[ $key ] = $request->get_param( $key );
			}
		}

		update_option( self::SETTINGS_NAME, $settings );

		return new WP_REST_Response( $settings, 200 );
	}
}
