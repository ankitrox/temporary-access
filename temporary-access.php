<?php
/**
 * Plugin Name: Passwordless Login
 * Version: 1.0.0
 * Author: Ankit Gade
 * Author URI: https://iamank.it
 * License: GNU General Public License v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Requires at least: 5.4.2
 * Requires PHP: 7.3
 * Text-Domain: passwordless-login
 *
 * @package Ankit\TemporaryAccess
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess;

use Pimple\Container as PimpleContainer;

// Prevent direct access.
defined( 'ABSPATH' ) || exit;

$hooks = array(
	'admin_notices',
	'network_admin_notices',
);

/**
 * PHP 7.3+ is required in order to use the plugin.
 */
if ( version_compare( PHP_VERSION, '7.3', '<' ) ) {
	foreach ( $hooks as $hook ) {
		add_action(
			$hook,
			function () {
				$message = __(
					'Temporary Access Plugin requires PHP version 7.3 or higher. <br />Please ask your server administrator to update your environment to latest PHP version',
					'temporary-access'
				);

				printf(
					'<div class="notice notice-error"><span class="notice-title">%1$s</span><p>%2$s</p></div>',
					esc_html__(
						'The plugin Temporary Access has been deactivated',
						'temporary-access'
					),
					wp_kses( $message, array( 'br' => true ) )
				);

				deactivate_plugins( plugin_basename( __FILE__ ) );
			}
		);
	}

	return;
}

/**
 * Autoload the dependencies.
 *
 * @return bool
 */
function autoload(): bool {
	static $done;
	if ( is_bool( $done ) ) {
		return $done;
	}

	if ( is_readable( __DIR__ . '/vendor/autoload.php' ) ) {
		require_once __DIR__ . '/vendor/autoload.php';
		$done = true;

		return true;
	}
	$done = false;

	return false;
}

/**
 * Do not do anything if composer install
 * is not run.
 */
if ( ! autoload() ) {
	return;
}

/**
 * Return the container instance.
 */
function container(): Container {
	static $container;

	if ( null !== $container ) {
		return $container;
	}

	$container = new Container( new PimpleContainer() );

	return $container;
}

/**
 * Return the Plugin instance.
 *
 * @return Plugin
 */
function plugin(): Plugin {
	static $plugin;

	if ( null !== $plugin ) {
		return $plugin;
	}

	$plugin = new Plugin( container() );
	return $plugin;
}

/**
 * Let the magic happen by
 * running the plugin.
 */
add_action(
	'plugins_loaded',
	function () {
		plugin()->run();
	},
	100
);
