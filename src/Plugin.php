<?php
/**
 * Main plugin file.
 *
 * @package Ankit\TemporaryAccess
 * @since   1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess;

use Ankit\TemporaryAccess\Interfaces\Container as ContainerInterface;
use Ankit\TemporaryAccess\Interfaces\UserManagement;
use Ankit\TemporaryAccess\REST\Manager;

/**
 * Class Plugin
 *
 * @package Ankit\TemporaryAccess
 * @since   1.0.0
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
	 * @var Manager
	 */
	private $rest_manager;

	/**
	 * User manager.
	 * 
	 * @var UserManagement
	 */
	private $user_manager;

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
		$this->path       = dirname( __DIR__, 1 );
		$this->url        = plugin_dir_url( trailingslashit( dirname( __DIR__, 1 ) ) . 'temporary-access.php' );
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

		$settings            = $this->container->get( 'settings' );
		$this->user_manager  = $this->container->get( 'user_manager' );
		$this->rest_manager  = $this->container->get( 'rest_manager' );
		$this->authenticator = $this->container->get( 'authenticator' );
		$users_table         = $this->container->get( 'users_table' );

		$this->authenticator->init();
		$settings->init();
		$users_table->init();

		add_action( 'rest_api_init', array( $this->rest_manager, 'register' ) );

		add_action( 'tempaccess.user_authenticated', array( $this->user_manager, 'post_login_actions' ) );
		add_action( 'init', array( $this->user_manager, 'init' ) );

		add_action( 'init', array( $this, 'load_translations' ) );
	}

	/**
	 *  Load the plugin translation if available.
	 *
	 * @return void
	 */
	public function load_translations(): void {
		load_plugin_textdomain( 'passwordless-temporary-login', false, basename( plugin()->path ) . '/languages/' . get_locale() );
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
