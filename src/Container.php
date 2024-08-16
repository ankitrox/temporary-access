<?php
/**
 * Service container for the plugin.
 *
 * @package Ankit\TemporaryAccess
 * @since   1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess;

use Ankit\TemporaryAccess\Interfaces\Container as ContainerInterface;
use Ankit\TemporaryAccess\UI\Settings;
use Ankit\TemporaryAccess\UI\UsersTable;
use InvalidArgumentException;
use Pimple\Container as PimpleContainer;
use Ankit\TemporaryAccess\REST\TempUser;

/**
 * Class Container
 *
 * @package Ankit\TemporaryAccess
 * @since   1.0.0
 */
class Container implements ContainerInterface {


	/**
	 * Pimple container.
	 *
	 * @var PimpleContainer
	 */
	public $container;

	/**
	 * Container constructor.
	 *
	 * @param PimpleContainer $container Pimple Container.
	 */
	public function __construct( PimpleContainer $container ) {
		$this->container = $container;
	}

	/**
	 * Get the service object.
	 *
	 * @param string $service Service object in need.
	 *
	 * @return object
	 *
	 * @throws InvalidArgumentException Exception for invalid service.
	 */
	public function get( string $service ) {
		if ( ! in_array( $service, $this->container->keys(), true ) ) {
			/* translators: %$s is replaced with requested service name. */
			throw new InvalidArgumentException( sprintf( __( 'Invalid Service %s Passed to the container', 'temporary-access' ), $service ) );
		}

		return $this->container[ $service ];
	}

	/**
	 * Define common services in container.
	 *
	 * All the module specific services will be defined inside
	 * respective module's container.
	 *
	 * @codeCoverageIgnore
	 *
	 * @return void
	 */
	public function define_services(): void {

		/**
		 * User management service.
		 *
		 * @return UserManager
		 */
		$this->container['user_manager'] = function () {
			return new UserManager();
		};

		/**
		 * Authentication service.
		 *
		 * @param PimpleContainer $c
		 *
		 * @return Authenticator
		 */
		$this->container['authenticator'] = function ( PimpleContainer $c ) {
			return new Authenticator( $c['user_manager'] );
		};

		/**
		 * Define REST API endpoint service to add endpoint to WordPress.
		 *
		 * @param PimpleContainer $c Pimple container object.
		 *
		 * @return TempUser
		 */
		$this->container['temp_user_endpoint'] = function ( PimpleContainer $c ) {
			return new TempUser( $c['user_manager'] );
		};

		/**
		 * Settings service.
		 *
		 * @return Settings
		 */
		$this->container['settings'] = function () {
			return new Settings();
		};

		/**
		 * Users list table service.
		 *
		 * @return UsersTable
		 */
		$this->container['users_table'] = function () {
			return new UsersTable();
		};
	}
}
