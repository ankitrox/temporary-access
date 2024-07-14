<?php
/**
 * Settings class.
 *
 * Registers a submenu page under users menu to manage temporary users.
 *
 * @package Ankit\TemporaryAccess
 * @since 1.0.0
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
        add_action( 'admin_menu', [ $this, 'submenu' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'scripts' ] );
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

		wp_register_script(
			'wp-temp-access',
			trailingslashit( plugin()->url ) . 'assets/build/index.js',
			[
				'lodash',
				'wp-api-fetch',
				'wp-components',
				'wp-compose',
				'wp-data',
				'wp-i18n',
				'wp-dom-ready',
				'wp-element',
				'wp-notices',
			],
			filemtime( trailingslashit( plugin()->path ) . 'assets/build/index.js', ),
			true
		);

		$blog_id = is_multisite() ? get_current_blog_id() : null;
		$roles   = wp_list_pluck( wp_roles()->roles, 'name' );
		$data    = [
			'path'  => get_rest_url( $blog_id, trailingslashit( TempUser::NAMESPACE ) . 'users' ),
			'roles' => $roles,
            'nonce' => wp_create_nonce( 'wp_rest' ),
		];

		wp_add_inline_script(
			'wp-temp-access',
			'const tempAccess = ' . json_encode( $data ),
			'before'
		);

		wp_enqueue_script( 'wp-temp-access' );
		wp_enqueue_style( 'wp-components' );
		wp_enqueue_style(
			'temp-access-css',
			trailingslashit( plugin()->url ) . 'assets/build/index.css',
            [],
			filemtime( trailingslashit( plugin()->path ) . 'assets/build/index.css' ),
		);
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
            [ $this, 'output' ]
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
