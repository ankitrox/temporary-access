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

		add_action( 'init', [ $this->container->get( 'user_manager' ), 'init' ] );
		add_action( 'rest_api_init', [ $this->container->get( 'temp_user_endpoint' ), 'register' ] );
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
