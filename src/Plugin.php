<?php
/**
 * Main plugin file.
 *
 * @package Ankit\TemporaryAccess
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess;

use Ankit\TemporaryAccess\Interfaces\Container as ContainerInterface;
use Ankit\TemporaryAccess\Interfaces\UserManagement;
use Ankit\TemporaryAccess\REST\TempUser;

/**
 * Class Plugin
 *
 * @package Ankit\TemporaryAccess
 * @since 1.0.0
 */
class Plugin {
	/**
	 * Plugin version.
	 *
	 * @var string
	 */
	public $version = '1.0.0';

	/**
	 * Plugin directory path.
	 *
	 * @var string
	 */
	public $path;

	/**
	 * Plugin's url.
	 *
	 * @var string
	 */
	public $url;

	/**
	 * Assets directory path.
	 *
	 * @var string
	 */
	public $assets_dir;

	/**
	 * User manager.
	 *
	 * @var UserManagement
	 */
	private $user_manager;

	/**
	 * Endpoint service.
	 *
	 * @var TempUser
	 */
	private $user_endpoint;

	/**
	 * Authentication service.
	 *
	 * @var Authenticator
	 */
	private $authenticator;

	/**
	 * DI Container.
	 *
	 * @var Container
	 */
	private $container;

	/**
	 * Plugin constructor.
	 *
	 * @param ContainerInterface $container Container instance.
	 */
	public function __construct( ContainerInterface $container ) {
		$this->path       = dirname( __FILE__, 2 );
		$this->url        = plugin_dir_url( trailingslashit( dirname( __FILE__, 2 ) ) . 'temporary-access.php' );
		$this->assets_dir = trailingslashit( $this->path ) . 'assets/';

		$this->container = $container;
	}

	/**
	 * Bootstrapping method.
	 *
	 * @return void
	 *
	 * @since 1.0.0
	 */
	public function run(): void {
		$this->container->define_services();

		$this->user_manager  = $this->container->get( 'user_manager' );
		$this->user_endpoint = $this->container->get( 'temp_user_endpoint' );
		$this->authenticator = $this->container->get( 'authenticator' );

		$this->authenticator->init();

		add_action( 'init', [ $this->user_manager, 'init' ] );
		add_action( 'rest_api_init', [ $this->user_endpoint, 'register' ] );
		add_action( 'init', [ $this, 'load_translations' ] );
	}

	/**
	 *  Load the plugin translation if available.
	 *
	 * @return void
	 */
	public function load_translations(): void {
		load_plugin_textdomain( 'temporary-access', false, basename( plugin()->path ) . '/languages/' . get_locale() );
	}

	/**
	 * Return container object
	 *
	 * @return ContainerInterface
	 */
	public function container(): ContainerInterface {
		return $this->container;
	}
}
