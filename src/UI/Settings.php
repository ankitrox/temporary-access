<?php
/**
 * Settings class.
 *
 * Registers a submenu page under users menu to manage temporary users.
 *
 * @package Ankit\TemporaryAccess
 * @since   1.0.0
 * @version 1.0.0
 */

declare(strict_types=1);

namespace Ankit\TemporaryAccess\UI;

use Ankit\TemporaryAccess\REST\TempUser;
use function Ankit\TemporaryAccess\plugin;

/**
 * Class Settings
 *
 * @package Ankit\TemporaryAccess\UI
 */
class Settings {


	/**
	 * Initialization actions.
	 *
	 * @return void
	 */
	public function init(): void {
		add_action( 'admin_menu', array( $this, 'submenu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'scripts' ) );
	}

	/**
	 * Add scripts and styles to settings page.
	 *
	 * @param string $page_hook Page hook.
	 */
	public function scripts( string $page_hook ): void {
		if ( 'users_page_wp-temporary-access' !== $page_hook ) {
			return;
		}

		$assets = require trailingslashit( plugin()->path ) . 'assets/build/api.asset.php';

		wp_register_script(
			'wp-temp-access-api',
			trailingslashit( plugin()->url ) . 'assets/build/api.js',
			array(
				'wp-api-fetch',
				'wp-url',
			),
			filemtime( trailingslashit( plugin()->path ) . 'assets/build/temp-access.js', ),
			true
		);

		wp_register_script(
			'wp-temp-access',
			trailingslashit( plugin()->url ) . 'assets/build/temp-access.js',
			array(
				'lodash',
				'wp-api-fetch',
				'wp-components',
				'wp-compose',
				'wp-data',
				'wp-i18n',
				'wp-dom-ready',
				'wp-element',
				'wp-notices',
				'wp-api-fetch',
				'wp-url',
				'wp-temp-access-api',
			),
			$assets['version'],
			true
		);

		$blog_id = is_multisite() ? get_current_blog_id() : null;
		$roles   = wp_list_pluck( wp_roles()->roles, 'name' );
		$data    = array(
			'path'  => get_rest_url( $blog_id, trailingslashit( TempUser::NAMESPACE ) . 'users' ),
			'roles' => $roles,
			'nonce' => wp_create_nonce( 'wp_rest' ),
		);

		wp_add_inline_script(
			'wp-temp-access',
			'const tempAccess = ' . wp_json_encode( $data ),
			'before'
		);

		wp_enqueue_script( 'wp-temp-access-api' );
		wp_enqueue_script( 'wp-temp-access' );
		wp_enqueue_style( 'wp-components' );
	}

	/**
	 * Add a submenu page under settings.
	 */
	public function submenu(): void {
		add_submenu_page(
			'users.php',
			__( 'Temporary Access Settings', 'temporary-access' ),
			__( 'Temporary Access', 'temporary-access' ),
			'edit_users',
			'wp-temporary-access',
			array( $this, 'output' )
		);
	}

	/**
	 * Output the settings page markup.
	 */
	public function output() {
		?>
		<div id="temp-access-settings-page">
			<div class="wrap">
				<h1 class="wp-heading-inline"><?php echo esc_html( __( 'Temporary Access Settings', 'temporary-access' ) ); ?></h1>
				<div id="temp-access-root"></div>
			</div>
		</div>
		<?php
	}
}
