<?php
/**
 * Manager class for REST endpoints.
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\REST;

use Ankit\TemporaryAccess\Container;
use Ankit\TemporaryAccess\REST\Base;
use function Ankit\TemporaryAccess\plugin;

/**
 * Class Manager
 *
 * @package Ankit\TemporaryAccess\REST
 */
class Manager {

    /**
     * Container instance.
     *
     * @var Container
     */
    private $container;

    /**
     * List of REST endpoints.
     * 
     * @var Base[]
     */
    private $endpoints;

	/**
	 * Manager constructor.
	 *
	 * @param array $endpoints List of REST endpoints.
	 */
	public function __construct() {
        $this->container = plugin()->container();
        $this->endpoints = [
            'tempuser' => $this->container->get( 'temp_user_endpoint' ),
            'settings' => $this->container->get( 'settings_endpoint' ),
        ];
	}

	/**
	 * Register the REST endpoints.
	 */
	public function register() {
		foreach ( $this->endpoints as $endpoint ) {
			$endpoint->register();
		}
	}
}
