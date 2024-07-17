<?php
/**
 * Container Interface.
 *
 * @package Ankit\TemporaryAccess
 * @since   1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\Interfaces;

/**
 * Interface Container
 *
 * @package WpGuruDev\OrderExport\Interfaces
 */
interface Container {


	/**
	 * Retrieve the service from container.
	 *
	 * @param string $service Service name.
	 *
	 * @return mixed
	 */
	public function get( string $service );

	/**
	 * Define services in container.
	 *
	 * @return void
	 */
	public function define_services(): void;
}
