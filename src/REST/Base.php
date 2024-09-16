<?php
/**
 * Base class for REST endpoints.
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\REST;

use WP_REST_Server;

/**
 * Class Base
 *
 * @package Ankit\TemporaryAccess\REST
 */

abstract class Base {

	/**
	 * Namespace for the controller.
	 */
	const NAMESPACE = 'tempaccess/v1';

	/**
	 * Register the routes for the objects of the controller.
	 * 
	 * @return void
	 */
	abstract public function register(): void;

	/**
	 * Register the routes for the objects of the controller.
	 *
	 * @param string $route Route.
	 * @param array  $args  Args.
	 */
	protected function register_route( string $route, array $args ) {
		$default = array(
			'permission_callback' => $this->get_permission_callback(),
			'args'                => $this->get_args(),
		);

		$route_args = wp_parse_args( $args, $default );

		register_rest_route(
			self::NAMESPACE,
			$route,
			$route_args
		);
	}

	/**
	 * Get the namespace for the controller.
	 *
	 * @return string
	 */
	public function get_namespace(): string {
		return self::NAMESPACE;
	}

	/**
	 * Get the version for the controller.
	 *
	 * @return string
	 */
	public function get_version(): string {
		return '1';
	}

	/**
	 * Get the method for the controller.
	 *
	 * @return string
	 */
	public function get_method(): string {
		return WP_REST_Server::READABLE;
	}

	/**
	 * Get the permission callback for the controller.
	 *
	 * @return string
	 */
	public function get_permission_callback(): bool {
		return current_user_can( 'edit_users' );
	}

	/**
	 * Get the args for the controller.
	 *
	 * @return array
	 */
	public function get_args(): array {
		return array();
	}
}
